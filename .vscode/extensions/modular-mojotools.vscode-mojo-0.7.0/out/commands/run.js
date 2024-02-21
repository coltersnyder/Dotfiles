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
exports.activateRunCommands = void 0;
const shellescape = require("shell-escape");
const vscode = require("vscode");
const disposableContext_1 = require("../utils/disposableContext");
/**
 * This class provides a manager for executing and debugging mojo files.
 */
class ExecutionManager extends disposableContext_1.DisposableContext {
    constructor(context) {
        super();
        this.context = context;
        this.activateRunCommands();
    }
    /**
     * Activate the run commands, used for executing and debugging mojo files.
     */
    activateRunCommands() {
        for (const cmd of ['mojo.execFileInTerminal',
            'mojo.execFileInDedicatedTerminal']) {
            this.pushSubscription(vscode.commands.registerCommand(cmd, (file) => __awaiter(this, void 0, void 0, function* () {
                yield this.executeFileInTerminal(file, 
                /*newTerminalPerFile=*/ cmd ===
                    'mojo.execFileInDedicatedTerminal');
            })));
        }
        for (const cmd of ['mojo.debugFile', 'mojo.debugFileInTerminal']) {
            this.pushSubscription(vscode.commands.registerCommand(cmd, (file) => __awaiter(this, void 0, void 0, function* () {
                yield this.debugFile(file, /*runInTerminal=*/ cmd ===
                    'mojo.debugFileInTerminal');
            })));
        }
    }
    /**
     * Execute the current file in a terminal.
     *
     * @param options Options to consider when executing the file.
     */
    executeFileInTerminal(file, newTerminalPerFile) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc = yield this.getDocumentToExecute(file);
            if (!doc)
                return;
            // Find the config for processing this file.
            let config = yield this.context.sdk.resolveConfig(vscode.workspace.getWorkspaceFolder(doc.uri));
            if (!config)
                return;
            // Execute the file.
            let terminal = this.getTerminalForFile(doc, config, newTerminalPerFile);
            terminal.show();
            terminal.sendText(shellescape([config.mojoDriverPath, doc.fileName]));
            // Focus on the terminal if the user has configured it to do so.
            if (this.shouldTerminalFocusOnStart(doc.uri))
                vscode.commands.executeCommand('workbench.action.terminal.focus');
        });
    }
    /**
     * Debug the current file.
     *
     * @param runInTerminal If true, then a target is launched in a new
     *     terminal, and therefore its stdin and stdout are not managed by the
     *     Debug Console.
     */
    debugFile(file, runInTerminal) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc = yield this.getDocumentToExecute(file);
            if (!doc)
                return;
            let debugConfig = {
                type: "mojo-lldb",
                name: "Mojo",
                request: "launch",
                mojoFile: doc.fileName,
                runInTerminal: runInTerminal,
            };
            yield vscode.debug.startDebugging(vscode.workspace.getWorkspaceFolder(doc.uri), debugConfig);
        });
    }
    /**
     * Get a terminal to use for the given file.
     */
    getTerminalForFile(doc, config, newTerminalPerFile) {
        let terminalName = "Mojo";
        if (newTerminalPerFile)
            terminalName += `: ${doc.fileName}`;
        // Look for an existing terminal.
        let terminal = vscode.window.terminals.find((t) => t.name === terminalName);
        if (terminal)
            return terminal;
        // Build a new terminal.
        let env = process.env;
        env['MODULAR_HOME'] = config.modularHomePath;
        return vscode.window.createTerminal({ name: terminalName, env: env });
    }
    /**
     * Get the vscode.Document to execute, ensuring that it's saved if pending
     * changes exist.
     *
     * This method show a pop up in case of errors.
     *
     * @param file If provided, the document will point to this file, otherwise,
     *     it will point to the currently active document.
     */
    getDocumentToExecute(file) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let doc = file === undefined
                ? (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document
                : yield vscode.workspace.openTextDocument(file);
            if (!doc) {
                vscode.window.showErrorMessage(`Couldn't access the file '${file}' for execution.`);
                return undefined;
            }
            if (doc.isDirty && !(yield doc.save())) {
                vscode.window.showErrorMessage(`Couldn't save file '${file}' before execution.`);
                return undefined;
            }
            return doc;
        });
    }
    /**
     * Returns true if the terminal should be focused on start.
     */
    shouldTerminalFocusOnStart(uri) {
        return vscode.workspace
            .getConfiguration('terminal', vscode.workspace.getWorkspaceFolder(uri))
            .get("focusAfterLaunch", false);
    }
}
/**
 * Activate the run commands, used for executing and debugging mojo files.
 *
 * @param context The MOJO context to use.
 * @returns A disposable connected to the lifetime of the registered run
 *     commands.
 */
function activateRunCommands(context) {
    return new ExecutionManager(context);
}
exports.activateRunCommands = activateRunCommands;
//# sourceMappingURL=run.js.map