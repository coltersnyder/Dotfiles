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
exports.DubTasksProvider = void 0;
const vscode = require("vscode");
const extension_1 = require("./extension");
class DubTasksProvider {
    constructor(served) {
        this.served = served;
    }
    provideTasks(token) {
        let dubLint = (0, extension_1.config)(null).get("enableDubLinting", true);
        return this.served.sendRequest("served/buildTasks").then(tasks => {
            var ret = [];
            tasks.forEach(task => {
                var target;
                let cwd = "";
                if (task.scope == "global")
                    target = vscode.TaskScope.Global;
                else if (task.scope == "workspace")
                    target = vscode.TaskScope.Workspace;
                else {
                    let uri = vscode.Uri.parse(task.scope);
                    target = vscode.workspace.getWorkspaceFolder(uri);
                    cwd = (target === null || target === void 0 ? void 0 : target.uri.fsPath) || uri.fsPath;
                }
                if (!target)
                    return undefined;
                var proc = task.exec.shift() || "exit";
                var args = task.exec;
                if (task.definition.cwd)
                    cwd = task.definition.cwd;
                if (typeof target == "object" && target.uri)
                    cwd = cwd.replace("${workspaceFolder}", target.uri.fsPath);
                // set more flexible run args for UI import
                task.definition.compiler = "$current";
                task.definition.archType = "$current";
                task.definition.buildType = "$current";
                task.definition.configuration = "$current";
                if (!dubLint && !Array.isArray(task.problemMatchers) || task.problemMatchers.length == 0)
                    task.problemMatchers = ["$dmd"];
                var t = new vscode.Task(task.definition, target, task.name, task.source, makeExecutor(proc, args, cwd), task.problemMatchers);
                t.isBackground = task.isBackground;
                t.presentationOptions = {
                    focus: !!task.definition.run
                };
                t.detail = "dub " + args.join(" ");
                switch (task.group) {
                    case "clean":
                        t.group = vscode.TaskGroup.Clean;
                        break;
                    case "build":
                        t.group = vscode.TaskGroup.Build;
                        break;
                    case "rebuild":
                        t.group = vscode.TaskGroup.Rebuild;
                        break;
                    case "test":
                        t.group = vscode.TaskGroup.Test;
                        break;
                }
                ret.push(t);
            });
            return ret;
        });
    }
    resolveTask(task, token) {
        return __awaiter(this, void 0, void 0, function* () {
            function replaceCurrent(str, servedFetchCommand) {
                if (str == "$current")
                    return extension_1.served.client.sendRequest(servedFetchCommand);
                else
                    return str;
            }
            const dubLint = (0, extension_1.config)(null).get("enableDubLinting", true);
            const args = [(0, extension_1.config)(null).get("dubPath", "dub")];
            args.push(task.definition.test ? "test" : task.definition.run ? "run" : "build");
            if (task.definition.root)
                args.push("--root=" + task.definition.root);
            if (task.definition.overrides)
                task.definition.overrides.forEach(override => {
                    args.push("--override-config=" + override);
                });
            if (task.definition.force)
                args.push("--force");
            if (task.definition.compiler)
                args.push("--compiler=" + (yield replaceCurrent(task.definition.compiler, "served/getCompiler")));
            if (task.definition.archType)
                args.push("--arch=" + (yield replaceCurrent(task.definition.archType, "served/getArchType")));
            if (task.definition.buildType)
                args.push("--build=" + (yield replaceCurrent(task.definition.buildType, "served/getBuildType")));
            if (task.definition.configuration)
                args.push("--config=" + (yield replaceCurrent(task.definition.configuration, "served/getConfig")));
            if (Array.isArray(task.definition.dub_args))
                args.push.apply(args, task.definition.dub_args);
            if (Array.isArray(task.definition.args)) {
                args.push.apply(args, task.definition.args);
                vscode.window.showWarningMessage("Your task definition is using the deprecated \"args\" field and will be ignored in an upcoming release.\nPlease change \"args\": to \"dub_args\": to keep old behavior.");
            }
            if (Array.isArray(task.definition.target_args) && (task.definition.test || task.definition.run)) {
                // want to validate test/run in JSON schema but tasks schema doesn't allow advanced JSON schema things to be put on the object validator, only on properties
                args.push("--");
                args.push.apply(args, task.definition.target_args);
            }
            let options = task.scope && task.scope.uri;
            let exec = makeExecutor(args.shift() || "exit", args, (options && options.fsPath) || task.definition.cwd || undefined);
            let ret = new vscode.Task(task.definition, task.scope || vscode.TaskScope.Global, task.name || `dub ${task.definition.test ? "Test" : task.definition.run ? "Run" : "Build"}`, "dub", exec, dubLint ? task.problemMatchers : ["$dmd"]);
            ret.isBackground = task.isBackground;
            if (task.presentationOptions) {
                ret.presentationOptions = task.presentationOptions;
            }
            else {
                ret.presentationOptions = {
                    focus: !!task.definition.run
                };
            }
            ret.detail = "dub " + args.join(" ");
            return ret;
        });
    }
}
exports.DubTasksProvider = DubTasksProvider;
function makeExecutor(proc, args, cwd) {
    let options = cwd ? { cwd: cwd } : undefined;
    //return new vscode.ProcessExecution(proc, args, options);
    return new vscode.ShellExecution({
        value: proc,
        quoting: vscode.ShellQuoting.Strong
    }, args.map(arg => ({
        value: arg,
        quoting: vscode.ShellQuoting.Strong
    })), options);
}
//# sourceMappingURL=dub-tasks.js.map