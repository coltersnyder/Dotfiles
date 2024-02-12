"use strict";
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
exports.CodedAPIServedImpl = void 0;
const vscode = require("vscode");
/**
 * Implementation of the code-d API using serve-d
 */
class CodedAPIServedImpl {
    constructor() {
        this.dependencySnippetsToRegister = [];
        // ------------------------------------------------------------------------
        //          Implementation details starting here, no stable API
        // ------------------------------------------------------------------------
        this._onInternalImplementationReady = new vscode.EventEmitter();
        this.onInternalImplementationReady = this._onInternalImplementationReady.event;
    }
    registerDependencyBasedSnippet(requiredDependencies, snippet) {
        var _a;
        this.dependencySnippetsToRegister.push([requiredDependencies, snippet]);
        (_a = this.served) === null || _a === void 0 ? void 0 : _a.addDependencySnippet({
            requiredDependencies: requiredDependencies,
            snippet: snippet
        });
    }
    registerDependencyBasedSnippets(requiredDependencies, snippets) {
        snippets.forEach(snippet => {
            this.registerDependencyBasedSnippet(requiredDependencies, snippet);
        });
    }
    refreshDependencies() {
        if (this.served) {
            this.served.refreshDependencies();
            return true;
        }
        else {
            return false;
        }
    }
    triggerDscanner(uri) {
        if (this.served) {
            if (typeof uri == "string")
                uri = vscode.Uri.parse(uri);
            this.served.triggerDscanner(uri);
            return true;
        }
        else {
            return false;
        }
    }
    listDscannerConfig(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof uri == "string")
                uri = vscode.Uri.parse(uri);
            const served = yield this.waitForInternalImplementation();
            return yield served.listDScannerConfig(uri);
        });
    }
    findFiles(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const served = yield this.waitForInternalImplementation();
            return yield served.findFiles(query);
        });
    }
    findFilesByModule(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const served = yield this.waitForInternalImplementation();
            return yield served.findFilesByModule(query);
        });
    }
    getActiveDubConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const served = yield this.waitForInternalImplementation();
            return yield served.getActiveDubConfig();
        });
    }
    get isActive() {
        return !!this.served;
    }
    started(served) {
        this.served = served;
        let promises = [];
        this.dependencySnippetsToRegister.forEach(snip => {
            promises.push(served.addDependencySnippet({
                requiredDependencies: snip[0],
                snippet: snip[1]
            }));
        });
        Promise.all(promises).then((all) => {
            // done
        });
    }
    waitForInternalImplementation() {
        if (this.served)
            return Promise.resolve(this.served);
        else
            return new Promise((resolve) => {
                if (this.served)
                    resolve(this.served);
                else
                    this.onInternalImplementationReady(resolve);
            });
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        else
            return this.instance = new CodedAPIServedImpl();
    }
}
exports.CodedAPIServedImpl = CodedAPIServedImpl;
//# sourceMappingURL=api_impl.js.map