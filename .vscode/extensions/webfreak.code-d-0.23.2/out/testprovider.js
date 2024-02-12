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
exports.ServeDTestProvider = exports.TestAdapterGenerator = void 0;
const vscode = require("vscode");
const path = require("path");
class TestAdapterGenerator {
    constructor(served, testHub) {
        this.served = served;
        this.testHub = testHub;
        this.adapters = {};
    }
    updateTests(tests) {
        if (tests.needsLoad)
            return; // no lazy load in TestAdapter API
        let adapter = this.adapters[tests.workspaceUri];
        if (!adapter) {
            const uri = vscode.Uri.parse(tests.workspaceUri);
            adapter = this.adapters[tests.workspaceUri] = new ServeDTestProvider(this.served, tests.workspaceUri, tests.name || path.basename(uri.fsPath), vscode.workspace.getWorkspaceFolder(uri), tests.needsLoad);
            this.testHub.registerTestAdapter(adapter);
        }
        adapter.updateModules(tests.needsLoad, tests.modules);
    }
    dispose() {
        vscode.Disposable.from(...Object.values(this.adapters)).dispose();
    }
}
exports.TestAdapterGenerator = TestAdapterGenerator;
class ServeDTestProvider {
    constructor(served, folderId, folderName, workspace, needsLoad) {
        this.served = served;
        this.folderId = folderId;
        this.folderName = folderName;
        this.workspace = workspace;
        this.needsLoad = needsLoad;
        this.disposables = [];
        this.testsEmitter = new vscode.EventEmitter();
        this.testStatesEmitter = new vscode.EventEmitter();
        this.autorunEmitter = new vscode.EventEmitter();
        this.modules = [];
        this.firstLoad = true;
    }
    get tests() { return this.testsEmitter.event; }
    get testStates() { return this.testStatesEmitter.event; }
    get autorun() { return this.autorunEmitter.event; }
    updateModules(needsLoad, modules) {
        this.needsLoad = needsLoad;
        this.modules = modules;
        let suite = {
            id: "project_" + this.folderId,
            label: this.folderName,
            type: "suite",
            debuggable: true,
            children: []
        };
        modules.forEach(module => {
            const file = vscode.Uri.parse(module.uri).fsPath;
            let moduleInfo = {
                type: "suite",
                debuggable: true,
                id: "module_" + module.uri,
                label: module.moduleName.startsWith("(file)")
                    ? "File " + module.moduleName.substring(6).trim()
                    : "Module " + module.moduleName,
                children: [],
                file: file
            };
            module.tests.forEach(test => {
                moduleInfo.children.push({
                    type: "test",
                    id: "test_" + test.id,
                    label: test.name,
                    description: test.containerName
                        ? `in ${test.containerName}`
                        : undefined,
                    debuggable: true,
                    file: file,
                    line: test.range.start.line
                });
            });
            suite.children.push(moduleInfo);
        });
        this.testsEmitter.fire({
            type: "finished",
            suite: suite
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.firstLoad) {
                this.firstLoad = false;
                // skip first load (already emitting loaded)
                // only do reloads
                return;
            }
            this.served.client.sendRequest("served/rescanTests", { uri: this.folderId });
        });
    }
    run(tests) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    debug(tests) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    cancel() {
        // in a "real" TestAdapter this would kill the child process for the current test run (if there is any)
        throw new Error("Method not implemented.");
    }
    dispose() {
        this.cancel();
        for (const disposable of this.disposables) {
            disposable.dispose();
        }
        this.disposables = [];
    }
}
exports.ServeDTestProvider = ServeDTestProvider;
//# sourceMappingURL=testprovider.js.map