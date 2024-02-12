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
exports.CommandHandler = void 0;
const vscode = require("vscode");
const subprocess = require("child_process");
const VariableResolver_1 = require("./VariableResolver");
const exceptions_1 = require("../util/exceptions");
class CommandHandler {
    constructor(args, userInputContext, context) {
        this.EOL = /\r\n|\r|\n/;
        if (!Object.prototype.hasOwnProperty.call(args, "command")) {
            throw new exceptions_1.ShellCommandException('Please specify the "command" property.');
        }
        const command = Array.isArray(args.command)
            ? args.command.join(' ')
            : args.command;
        if (typeof command !== "string") {
            throw new exceptions_1.ShellCommandException(`The "command" property should be a string or an array of string but got "${typeof args.command}".`);
        }
        this.command = command;
        this.input = this.resolveTaskToInput(args.taskId);
        this.userInputContext = userInputContext;
        this.args = args;
        this.context = context;
    }
    resolveArgs() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const resolver = new VariableResolver_1.VariableResolver(this.input, this.userInputContext, this.getDefault());
            const command = yield resolver.resolve(this.command);
            if (command === undefined) {
                throw new exceptions_1.ShellCommandException("Your command is badly formatted and variables could not be resolved");
            }
            else {
                this.command = command;
            }
            if (this.args.rememberPrevious && this.args.taskId === undefined) {
                throw new exceptions_1.ShellCommandException("You need to specify a taskId when using rememberPrevious=true");
            }
            if (this.args.env !== undefined) {
                for (const key in (_a = this.args.env) !== null && _a !== void 0 ? _a : []) {
                    if (Object.prototype.hasOwnProperty.call(this.args.env, key)) {
                        this.args.env[key] = (yield resolver.resolve(this.args.env[key])) || "";
                    }
                }
            }
            this.args.cwd = this.args.cwd
                ? yield resolver.resolve((_b = this.args.cwd) !== null && _b !== void 0 ? _b : '')
                : (_c = vscode.workspace.workspaceFolders) === null || _c === void 0 ? void 0 : _c[this.input.workspaceIndex].uri.fsPath;
        });
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.resolveArgs();
            const result = this.runCommand();
            const nonEmptyInput = this.parseResult(result);
            const useFirstResult = this.args.useFirstResult || (this.args.useSingleResult && nonEmptyInput.length === 1);
            if (useFirstResult) {
                if (this.input.id && this.userInputContext) {
                    this.userInputContext.recordInput(this.input.id, nonEmptyInput[0].value);
                }
                return nonEmptyInput[0].value;
            }
            else {
                return this.quickPick(nonEmptyInput);
            }
        });
    }
    runCommand() {
        const options = {
            encoding: "utf8",
            cwd: this.args.cwd,
            env: this.args.env,
            maxBuffer: this.args.maxBuffer,
        };
        return subprocess.execSync(this.command, options);
    }
    parseResult(result) {
        return result
            .split(this.EOL)
            .map((value) => {
            var _a;
            const values = value.trim().split(this.args.fieldSeparator, 4);
            return {
                value: values[0],
                label: (_a = values[1]) !== null && _a !== void 0 ? _a : value,
                description: values[2],
                detail: values[3],
            };
        })
            .filter((item) => item.label && item.label.trim().length > 0);
    }
    getDefault() {
        if (this.args.rememberPrevious && this.args.taskId) {
            return this.context.workspaceState.get(this.args.taskId, "");
        }
    }
    setDefault(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.context.workspaceState.update(id, value);
        });
    }
    quickPick(input) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (input.length === 0) {
                input = (_b = (_a = this.args.defaultOptions) === null || _a === void 0 ? void 0 : _a.map(o => {
                    return {
                        value: o,
                        label: o
                    };
                })) !== null && _b !== void 0 ? _b : [];
            }
            const defaultValue = this.getDefault();
            return new Promise((resolve) => {
                const picker = vscode.window.createQuickPick();
                picker.canSelectMany = false;
                picker.matchOnDescription = true;
                picker.matchOnDetail = true;
                if (this.args.description !== undefined) {
                    picker.placeholder = this.args.description;
                }
                const disposable = vscode.Disposable.from(picker, picker.onDidAccept(() => {
                    resolve(picker.selectedItems[0].value);
                    disposable.dispose();
                }), picker.onDidHide(() => {
                    var _a, _b;
                    const didCancelQuickPickSession = (_b = ((_a = picker === null || picker === void 0 ? void 0 : picker.selectedItems) === null || _a === void 0 ? void 0 : _a.length) === 0) !== null && _b !== void 0 ? _b : true;
                    if (didCancelQuickPickSession) {
                        this.userInputContext.reset();
                        resolve(undefined);
                    }
                    else if (this.input.id) {
                        const selection = picker.selectedItems[0].value;
                        this.userInputContext.recordInput(this.input.id, selection);
                        if (this.args.rememberPrevious && this.args.taskId) {
                            this.setDefault(this.args.taskId, selection);
                        }
                        resolve(selection);
                    }
                    disposable.dispose();
                }));
                picker.items = input.map((item) => ({
                    label: item.label,
                    description: item.value === defaultValue ? `${item.description} (Default)` : item.description,
                    detail: item.detail,
                    value: item.value,
                }));
                for (const item of picker.items) {
                    if (item.value === defaultValue) {
                        picker.activeItems = [item];
                        break;
                    }
                }
                picker.show();
            });
        });
    }
    resolveTaskToInput(taskId) {
        var _a, _b;
        // Find all objects where command is shellCommand.execute nested anywhere in the input object.
        // It could be that the actual input being run is nested inside an input from another extension.
        // See https://github.com/augustocdias/vscode-shell-command/issues/79
        function* deepSearch(obj) {
            if (obj.command === "shellCommand.execute") {
                yield obj;
            }
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    yield* deepSearch(obj[key]);
                }
            }
        }
        function* getSectionInputs(section, folder) {
            var _a, _b, _c, _d, _e;
            const keys = folder
                ? ["workspaceFolderValue"]
                : ["workspaceValue", "globalValue"];
            for (const key of keys) {
                const conf = vscode.workspace.getConfiguration(section, folder === null || folder === void 0 ? void 0 : folder.uri);
                const env = (_c = (_b = (_a = conf.inspect("options")) === null || _a === void 0 ? void 0 : _a[key]) === null || _b === void 0 ? void 0 : _b.env) !== null && _c !== void 0 ? _c : {};
                for (const input of ((_d = conf.inspect("inputs")) === null || _d === void 0 ? void 0 : _d[key]) || []) {
                    // Go through all the nested shellCommand.execute inputs.
                    for (const shellInput of deepSearch(input)) {
                        // Yield the input and assign the workspaceIndex.
                        yield Object.assign(Object.assign({}, shellInput), { workspaceIndex: (_e = folder === null || folder === void 0 ? void 0 : folder.index) !== null && _e !== void 0 ? _e : 0, env });
                    }
                }
            }
        }
        function* getAllInputs() {
            var _a;
            for (const folder of (_a = vscode.workspace.workspaceFolders) !== null && _a !== void 0 ? _a : []) {
                yield* getSectionInputs("launch", folder);
                yield* getSectionInputs("tasks", folder);
            }
            yield* getSectionInputs("launch");
            yield* getSectionInputs("tasks");
        }
        // Go through the generator and return the first match
        for (const input of getAllInputs()) {
            if (((_a = input === null || input === void 0 ? void 0 : input.args) === null || _a === void 0 ? void 0 : _a.command) === this.command &&
                ((_b = input === null || input === void 0 ? void 0 : input.args) === null || _b === void 0 ? void 0 : _b.taskId) === taskId) {
                return input;
            }
        }
        throw new exceptions_1.ShellCommandException(`Could not find input with command '${this.command}' and taskId '${taskId}'.`);
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map