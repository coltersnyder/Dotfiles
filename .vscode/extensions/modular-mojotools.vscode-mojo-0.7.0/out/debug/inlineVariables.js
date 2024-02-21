"use strict";
//===----------------------------------------------------------------------===//
//
// This file is Modular Inc proprietary.
//
//===----------------------------------------------------------------------===//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeInlineLocalVariablesProvider = exports.InlineLocalVariablesProvider = exports.LocalVariablesTracker = void 0;
const vscode = require("vscode");
const disposableContext_1 = require("../utils/disposableContext");
const constants_1 = require("./constants");
/**
 * Class that tracks the local variables of every frame by inspecting the DAP
 * messages.
 *
 * The only interesting detail is that the "variables" request doesn't have a
 * `frameId`. Instead, this request is followed by the "scopes" request, which
 * does have a `frameId`, so we keep an eye on this successive pair of requests
 * to produce the appropriate mapping.
 */
class LocalVariablesTracker {
    constructor() {
        /**
         * The current `frameId` gotten from the last "scopes" request.
         */
        this.currentFrameId = -1;
        /**
         * A mapping from frameId to a grouped list of variables. These groups
         * represent shadowed variables.
         */
        this.frameToVariables = new Map();
        /**
         * A mapping that helps us identify which frameId corresponds to a given
         * variables request.
         */
        this.variablesRequestIdToFrameId = new Map();
        this.onFrameGotVariables = new vscode.EventEmitter();
    }
    waitForFrameVariables(frameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.frameToVariables.get(frameId);
            if (result !== undefined)
                return result;
            return new Promise((resolve, reject) => {
                this.onFrameGotVariables.event(([eventFrameId, variables]) => {
                    if (eventFrameId == frameId)
                        resolve(variables);
                });
            });
        });
    }
    onWillReceiveMessage(message) {
        if (message.command === "scopes") {
            this.currentFrameId = message.arguments.frameId;
        }
        else if (message.command === "variables") {
            const request = message;
            if (request.arguments.variablesReference ===
                LocalVariablesTracker.LOCAL_SCOPE_ID) {
                this.variablesRequestIdToFrameId.set(request.seq, this.currentFrameId);
            }
        }
    }
    onDidSendMessage(message) {
        if (message.event === "stopped") {
            this.currentFrameId = -1;
            this.frameToVariables.clear();
            this.variablesRequestIdToFrameId.clear();
        }
        if (message.command === "variables") {
            const response = message;
            const variablesMap = new Map();
            for (const variable of response.body.variables) {
                if (!variablesMap.has(variable.evaluateName))
                    variablesMap.set(variable.evaluateName, []);
                variablesMap.get(variable.evaluateName).push(variable);
            }
            const frameId = this.variablesRequestIdToFrameId.get(response.request_seq);
            this.frameToVariables.set(frameId, variablesMap);
            this.onFrameGotVariables.fire([frameId, variablesMap]);
        }
    }
}
exports.LocalVariablesTracker = LocalVariablesTracker;
/**
 * This is a hardcoded value in lldb-dap that represents the list of local
 * variables.
 */
LocalVariablesTracker.LOCAL_SCOPE_ID = 1;
/**
 * Provides inline local variables during a debug session.
 */
class InlineLocalVariablesProvider {
    constructor(context, localVariablesTrackers) {
        this.context = context;
        this.localVariablesTrackers = localVariablesTrackers;
    }
    /**
     * Create the inline text to show for the given variable.
     */
    createInlineVariableValue(line, column, variable) {
        let displayName = variable.evaluateName;
        const range = new vscode.Range(line, column, line, column + variable.evaluateName.length);
        return new vscode.InlineValueText(range, `${displayName} = ${variable.value}`);
    }
    /**
     * Find the column in the document where the given variable is declared.
     * Currently DWARF doesn't have columns (#29230), so we have to look for the
     * declaration column using text search in the document.
     */
    findDeclColumn(document, line, variable) {
        const text = document.lineAt(line).text;
        let index = -1;
        // This is used to verify that a candidate declaration for our variable
        // cannot be expanded into a larger variable name.
        const forbiddenBoundary = (char) => char !== undefined && /^[a-zA-Z0-9_]$/.test(char);
        do {
            index = text.indexOf(variable.evaluateName, index + 1);
            if (index == -1)
                break;
            const prev = text[index - 1];
            const next = text[index + variable.evaluateName.length];
            if (!forbiddenBoundary(prev) && !forbiddenBoundary(next))
                return index;
        } while (true);
        return undefined;
    }
    /**
     * Create the list of inline values for a given variable using the LSP's index
     * of references.
     */
    getInlineValuesForVariable(document, stoppedLocation, variable) {
        return __awaiter(this, void 0, void 0, function* () {
            const decl = variable.$__lldb_extensions.declaration;
            const error = variable.$__lldb_extensions.error || "";
            const path = (decl === null || decl === void 0 ? void 0 : decl.path) || "";
            if ((decl === null || decl === void 0 ? void 0 : decl.line) === undefined || path.length == 0 || error.length > 0)
                return [];
            const line = decl.line - 1;
            // If the decl line is where we are stopped or later, we don't inline the
            // variable to prevent printing dirty memory.
            if (line >= stoppedLocation.start.line)
                return [];
            let column = this.findDeclColumn(document, line, variable);
            // If there's no column information, we can at least show the variable in
            // the decl line.
            if (column === undefined) {
                return [this.createInlineVariableValue(line, 0, variable)];
            }
            const uri = vscode.Uri.file(path);
            const lspServer = yield this.context.getOrActivateLanguageClient(uri, /*launchLanguageServerSuspended=*/ false);
            if (lspServer === undefined)
                return [];
            const references = yield lspServer.sendRequest("textDocument/references", {
                textDocument: {
                    uri: uri.toString(),
                },
                context: { includeDeclaration: true },
                position: {
                    line: line,
                    character: column,
                }
            });
            return (references || [])
                .map(ref => this.createInlineVariableValue(ref.range.start.line, ref.range.start.character, variable))
                .filter(
            // We only keep the references that are on the stop line or above.
            inlineVar => inlineVar.range.start.line <= stoppedLocation.start.line);
        });
    }
    provideInlineValues(document, _viewport, context) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const tracker = this.localVariablesTrackers.get(((_a = vscode.debug.activeDebugSession) === null || _a === void 0 ? void 0 : _a.id) || "");
            if (tracker === undefined) {
                // This could be a non-bug if there are two simultaneous debug sessions
                // with different debuggers.
                this.context.loggingService.logError(`Couldn't find the local variable tracker for sessionId ${(_b = vscode.debug.activeDebugSession) === null || _b === void 0 ? void 0 : _b.id} and frameId ${context.frameId}.`);
                return [];
            }
            const variableGroups = yield tracker.waitForFrameVariables(context.frameId);
            const allValues = [];
            for (const variables of variableGroups.values()) {
                for (const variable of variables) {
                    allValues.push(...yield this.getInlineValuesForVariable(document, context.stoppedLocation, variable));
                }
            }
            return allValues;
        });
    }
}
exports.InlineLocalVariablesProvider = InlineLocalVariablesProvider;
function initializeInlineLocalVariablesProvider(context) {
    const localVariablesTrackers = new Map();
    const disposables = new disposableContext_1.DisposableContext();
    disposables.pushSubscription(vscode.debug.registerDebugAdapterTrackerFactory(constants_1.DEBUG_TYPE, {
        createDebugAdapterTracker(session) {
            const tracker = new LocalVariablesTracker();
            localVariablesTrackers.set(session.id, tracker);
            return tracker;
        }
    }));
    disposables.pushSubscription(vscode.debug.onDidTerminateDebugSession((session) => { localVariablesTrackers.delete(session.id); }));
    disposables.pushSubscription(vscode.languages.registerInlineValuesProvider("*", new InlineLocalVariablesProvider(context, localVariablesTrackers)));
    return disposables;
}
exports.initializeInlineLocalVariablesProvider = initializeInlineLocalVariablesProvider;
//# sourceMappingURL=inlineVariables.js.map