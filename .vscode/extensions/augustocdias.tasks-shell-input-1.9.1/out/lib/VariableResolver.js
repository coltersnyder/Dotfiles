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
exports.VariableResolver = void 0;
const vscode = require("vscode");
const path = require("path");
class VariableResolver {
    constructor(input, userInputContext, rememberedValue) {
        this.expressionRegex = /\$\{(.*?)\}/gm;
        this.workspaceIndexedRegex = /workspaceFolder\[(\d+)\]/gm;
        this.workspaceNamedRegex = /workspaceFolder:([^}]+)/gm;
        this.configVarRegex = /config:(.+)/m;
        this.envVarRegex = /env:(.+)/m;
        this.inputVarRegex = /input:(.+)/m;
        this.commandVarRegex = /command:(.+)/m;
        this.userInputContext = userInputContext;
        this.rememberedValue = rememberedValue;
        this.input = input;
    }
    resolve(str) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            // Process the synchronous string interpolations
            let result = str.replace(this.expressionRegex, (_, value) => {
                if (this.workspaceIndexedRegex.test(value)) {
                    return this.bindIndexedFolder(value);
                }
                if (this.workspaceNamedRegex.test(value)) {
                    return this.bindNamedFolder(value);
                }
                if (this.configVarRegex.test(value)) {
                    return this.bindWorkspaceConfigVariable(value);
                }
                if (this.envVarRegex.test(value)) {
                    return this.bindEnvVariable(value);
                }
                if (this.userInputContext && this.inputVarRegex.test(value)) {
                    return this.bindInputVariable(value, this.userInputContext);
                }
                if (this.commandVarRegex.test(value)) {
                    // We don't replace these yet, they have to be done asynchronously
                    promises.push(this.bindCommandVariable(value));
                    return _;
                }
                return this.bindConfiguration(value);
            });
            // Process the async string interpolations
            const data = yield Promise.all(promises);
            result = result.replace(this.expressionRegex, () => { var _a; return (_a = data.shift()) !== null && _a !== void 0 ? _a : ''; });
            return result === '' ? undefined : result;
        });
    }
    bindCommandVariable(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = this.commandVarRegex.exec(value);
            if (!match) {
                return '';
            }
            const command = match[1];
            const result = yield vscode.commands.executeCommand(command);
            return result;
        });
    }
    bindIndexedFolder(value) {
        return value.replace(this.workspaceIndexedRegex, (_, index) => {
            var _a, _b, _c;
            const idx = Number.parseInt(index);
            return (_c = (_b = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[idx]) === null || _b === void 0 ? void 0 : _b.uri.fsPath) !== null && _c !== void 0 ? _c : '';
        });
    }
    bindNamedFolder(value) {
        return value.replace(this.workspaceNamedRegex, (_, name) => {
            var _a;
            for (const folder of (_a = vscode.workspace.workspaceFolders) !== null && _a !== void 0 ? _a : []) {
                if (folder.name == name) {
                    return folder.uri.fsPath;
                }
            }
            return '';
        });
    }
    bindConfiguration(value) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        switch (value) {
            case 'workspaceFolder':
                return (_b = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[this.input.workspaceIndex].uri.fsPath) !== null && _b !== void 0 ? _b : '';
            case 'workspaceFolderBasename':
                return (_d = (_c = vscode.workspace.workspaceFolders) === null || _c === void 0 ? void 0 : _c[this.input.workspaceIndex].name) !== null && _d !== void 0 ? _d : '';
            case 'fileBasenameNoExtension':
                return path.parse((_f = (_e = vscode.window.activeTextEditor) === null || _e === void 0 ? void 0 : _e.document.fileName) !== null && _f !== void 0 ? _f : '').name;
            case 'fileBasename':
                return path.parse((_h = (_g = vscode.window.activeTextEditor) === null || _g === void 0 ? void 0 : _g.document.fileName) !== null && _h !== void 0 ? _h : '').base;
            case 'file':
                return (_k = (_j = vscode.window.activeTextEditor) === null || _j === void 0 ? void 0 : _j.document.fileName) !== null && _k !== void 0 ? _k : '';
            case 'lineNumber':
                return (_m = (_l = vscode.window.activeTextEditor) === null || _l === void 0 ? void 0 : _l.selection.active.line.toString()) !== null && _m !== void 0 ? _m : '';
            case 'extension':
                if (vscode.window.activeTextEditor !== null) {
                    const filePath = path.parse((_p = (_o = vscode.window.activeTextEditor) === null || _o === void 0 ? void 0 : _o.document.fileName) !== null && _p !== void 0 ? _p : '');
                    return filePath.ext;
                }
                return '';
            case 'fileDirName':
                return (vscode.window.activeTextEditor !== null)
                    ? path.dirname((_r = (_q = vscode.window.activeTextEditor) === null || _q === void 0 ? void 0 : _q.document.uri.fsPath) !== null && _r !== void 0 ? _r : '')
                    : '';
            case 'rememberedValue':
                return (_s = this.rememberedValue) !== null && _s !== void 0 ? _s : '';
        }
        return '';
    }
    bindWorkspaceConfigVariable(value) {
        var _a, _b, _c;
        const matchResult = this.configVarRegex.exec(value);
        if (!matchResult) {
            return '';
        }
        // Get value from workspace configuration "settings" dictionary
        const workspaceResult = vscode.workspace.getConfiguration().get(matchResult[1], '');
        if (workspaceResult) {
            return workspaceResult;
        }
        const activeFolderResult = vscode.workspace.getConfiguration("", (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri).get(matchResult[1], '');
        if (activeFolderResult) {
            return activeFolderResult;
        }
        for (const w of (_b = vscode.workspace.workspaceFolders) !== null && _b !== void 0 ? _b : []) {
            const currentFolderResult = vscode.workspace.getConfiguration("", w.uri).get((_c = matchResult[1]) !== null && _c !== void 0 ? _c : '', '');
            if (currentFolderResult) {
                return currentFolderResult;
            }
        }
        return "";
    }
    bindEnvVariable(value) {
        var _a, _b;
        const result = this.envVarRegex.exec(value);
        if (!result) {
            return '';
        }
        const key = result[1];
        const configuredEnv = this.input.env;
        return (_b = (_a = configuredEnv[key]) !== null && _a !== void 0 ? _a : process.env[key]) !== null && _b !== void 0 ? _b : '';
    }
    bindInputVariable(value, userInputContext) {
        const result = this.inputVarRegex.exec(value);
        if (!result) {
            return '';
        }
        return userInputContext.lookupInputValue(result[1]) || '';
    }
}
exports.VariableResolver = VariableResolver;
//# sourceMappingURL=VariableResolver.js.map