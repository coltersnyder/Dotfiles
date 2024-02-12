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
exports.linkDebuggersWithServed = exports.registerDebuggers = void 0;
const vscode = require("vscode");
const util_1 = require("./util");
const which = require("which");
const path = require("path");
const string_argv_1 = require("string-argv");
function registerDebuggers(context) {
    var webfreakDebug = vscode.extensions.getExtension("webfreak.debug");
    var cppDebug = vscode.extensions.getExtension("ms-vscode.cpptools");
    var codeLLDB = vscode.extensions.getExtension("vadimcn.vscode-lldb");
    if (webfreakDebug || cppDebug || codeLLDB) {
        debugProvider = new DDebugProvider(context, webfreakDebug, cppDebug, codeLLDB);
        context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider("code-d", debugProvider));
    }
}
exports.registerDebuggers = registerDebuggers;
var debugProvider;
function linkDebuggersWithServed(served) {
    debugProvider.served = served;
}
exports.linkDebuggersWithServed = linkDebuggersWithServed;
function hasDebugger(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return !!(yield which(name));
        }
        catch (e) {
            return false;
        }
    });
}
class DDebugProvider {
    constructor(context, webfreakDebug, cppDebug, codeLLDB) {
        this.context = context;
        this.webfreakDebug = webfreakDebug;
        this.cppDebug = cppDebug;
        this.codeLLDB = codeLLDB;
    }
    get hasWebfreakDebug() {
        return !!this.webfreakDebug;
    }
    get hasCppDebug() {
        return !!this.cppDebug;
    }
    get hasCodeLLDB() {
        return !!this.codeLLDB;
    }
    get pyLLDBEntrypoint() {
        return this.context.asAbsolutePath("dlang-debug/lldb_dlang.py");
    }
    get pyGDBEntrypoint() {
        return this.context.asAbsolutePath("dlang-debug/gdb_dlang.py");
    }
    get vsdbgNatvis() {
        return this.context.asAbsolutePath("dlang-debug/dlang_cpp.natvis");
    }
    makeNativeDebugConfiguration(type, debugConfiguration) {
        const platform = debugConfiguration.platform || process.platform;
        const args = debugConfiguration.args;
        var config = {
            name: "code-d " + debugConfiguration.name,
            request: "launch",
            type: type,
            target: debugConfiguration.program,
            cwd: debugConfiguration.cwd,
            valuesFormatting: "prettyPrinters"
        };
        if (type == "gdb")
            config.autorun = [`source ${this.pyGDBEntrypoint}`];
        else if (type == "lldb-mi")
            config.autorun = [`command script import "${this.pyLLDBEntrypoint}"`];
        if (Array.isArray(args) && args.length > 0) {
            config.arguments = args
                .map(platform == "win32" ? util_1.win32EscapeShellParam : util_1.unixEscapeShellParam)
                .join(' ');
        }
        else if (typeof args == "string" && args.length > 0) {
            config.arguments = args;
        }
        return config;
    }
    makeCodeLLDBConfiguration(debugConfiguration) {
        const args = debugConfiguration.args;
        var config = {
            name: "code-d " + debugConfiguration.name,
            request: "launch",
            type: "lldb",
            program: debugConfiguration.program,
            cwd: debugConfiguration.cwd,
            initCommands: [`command script import "${this.pyLLDBEntrypoint}"`]
        };
        if (Array.isArray(args) && args.length > 0) {
            config.args = args;
        }
        else if (typeof args == "string" && args.length > 0) {
            config.args = (0, string_argv_1.default)(args);
        }
        return config;
    }
    makeCppMiConfiguration(type, debugConfiguration) {
        const args = debugConfiguration.args;
        var config = {
            name: "code-d " + debugConfiguration.name,
            request: "launch",
            type: "cppdbg",
            program: debugConfiguration.program,
            cwd: debugConfiguration.cwd,
            setupCommands: [
                {
                    description: "Enable python pretty printing for D extensions",
                    ignoreFailures: true,
                    text: "-enable-pretty-printing"
                }
            ],
            MIMode: type
        };
        if (!type || type == "gdb") {
            config.setupCommands.push({
                description: "Enable python pretty printing for D extensions",
                ignoreFailures: true,
                text: `-interpreter-exec console "source ${this.pyGDBEntrypoint}"`
            });
        }
        if (!type || type == "lldb") {
            config.setupCommands.push({
                description: "Enable python pretty printing for D extensions",
                ignoreFailures: true,
                text: `-interpreter-exec console "command script import ${this.pyLLDBEntrypoint}"`
            });
        }
        if (Array.isArray(args) && args.length > 0) {
            config.args = args;
        }
        else if (typeof args == "string" && args.length > 0) {
            config.args = (0, string_argv_1.default)(args);
        }
        return config;
    }
    makeCppVsdbgConfiguration(debugConfiguration) {
        const platform = debugConfiguration.platform || process.platform;
        const args = debugConfiguration.args;
        var config = {
            name: "code-d " + debugConfiguration.name,
            request: "launch",
            type: "cppvsdbg",
            program: debugConfiguration.program,
            cwd: debugConfiguration.cwd,
            visualizerFile: this.vsdbgNatvis
        };
        if (Array.isArray(args) && args.length > 0) {
            config.args = args;
        }
        else if (typeof args == "string" && args.length > 0) {
            config.args = (0, string_argv_1.default)(args);
        }
        return config;
    }
    makeDebugConfiguration(debugConfiguration) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = debugConfiguration.config;
            const platform = debugConfiguration.platform || process.platform;
            if (!path.isAbsolute(debugConfiguration.program) && debugConfiguration.cwd)
                debugConfiguration.program = path.join(debugConfiguration.cwd, debugConfiguration.program);
            let debugType = debugConfiguration.debugger || "autodetect";
            let config = debugConfiguration;
            if (debugType == "autodetect") {
                debugType = "no-ext";
                if (this.hasCodeLLDB && debugType.startsWith("no-") && platform != "win32") {
                    debugType = "code-lldb";
                }
                if (this.hasCppDebug && debugType.startsWith("no-")) {
                    debugType = "no-dbg";
                    if (process.platform == "win32") {
                        // https://github.com/microsoft/vscode-cpptools/blob/76e427fdb24014399497f0598727f2fd2a097454/Extension/package.json#L2751-L2757
                        // always available on these platforms, so let's default to it
                        if (process.arch == "x64" || process.arch == "ia32") {
                            debugType = "vsdbg";
                        }
                        else {
                            debugType = "cpp-auto";
                        }
                    }
                    else {
                        debugType = "cpp-auto";
                    }
                }
                if (this.hasWebfreakDebug && debugType.startsWith("no-")) {
                    debugType = "no-dbg";
                    if (process.platform == "win32") {
                        if (yield hasDebugger("mago-mi"))
                            debugType = "mago";
                        else if (yield hasDebugger("gdb"))
                            debugType = "nd-gdb";
                        else if (yield hasDebugger("lldb-mi"))
                            debugType = "nd-lldb";
                    }
                    else if (process.platform == "darwin") {
                        // prefer LLDB on OSX
                        if (yield hasDebugger("lldb-mi"))
                            debugType = "nd-lldb";
                        else if (yield hasDebugger("gdb"))
                            debugType = "nd-gdb";
                    }
                    else {
                        if (yield hasDebugger("gdb"))
                            debugType = "nd-gdb";
                        else if (yield hasDebugger("lldb-mi"))
                            debugType = "nd-lldb";
                    }
                }
                if (this.hasCodeLLDB && debugType.startsWith("no-") && platform == "win32") {
                    debugType = "code-lldb";
                }
                if (debugType == "no-ext") {
                    throw new Error("No debugging extension installed. Please install ms-vscode.cpptools and/or webfreak.debug! To force a debugger, explicitly specify `debugger` in the debug launch config.");
                }
                if (debugType == "no-dbg") {
                    if (process.platform == "win32") {
                        throw new Error("No debugger installed. Please install Visual Studio, GDB, LLDB or mago-mi or force a debugger by specifying `debugger` in the debug launch config!");
                    }
                    else {
                        throw new Error("No debugger installed. Please install GDB or LLDB or force a debugger by specifying `debugger` in the debug launch config!");
                    }
                }
            }
            if (debugType == "gdb") {
                if (this.hasCppDebug) {
                    debugType = "cpp-gdb";
                }
                else if (this.hasWebfreakDebug) {
                    debugType = "nd-gdb";
                }
                else {
                    throw new Error("No debugging extension installed. Please install ms-vscode.cpptools and/or webfreak.debug! To force a debugger, explicitly specify `debugger` in the debug launch config.");
                }
            }
            if (debugType == "lldb") {
                if (this.hasCodeLLDB && platform != "win32") {
                    debugType = "code-lldb";
                }
                else if (this.hasCppDebug) {
                    debugType = "cpp-lldb";
                }
                else if (this.hasWebfreakDebug) {
                    debugType = "nd-lldb";
                }
                else {
                    throw new Error("No debugging extension installed. Please install ms-vscode.cpptools and/or webfreak.debug! To force a debugger, explicitly specify `debugger` in the debug launch config.");
                }
            }
            switch (debugType) {
                case "code-lldb":
                    config = this.makeCodeLLDBConfiguration(debugConfiguration);
                    break;
                case "cpp-auto":
                    config = this.makeCppMiConfiguration(undefined, debugConfiguration);
                    break;
                case "cpp-gdb":
                    config = this.makeCppMiConfiguration("gdb", debugConfiguration);
                    break;
                case "cpp-lldb":
                    config = this.makeCppMiConfiguration("lldb", debugConfiguration);
                    break;
                case "vsdbg":
                    config = this.makeCppVsdbgConfiguration(debugConfiguration);
                    break;
                case "nd-gdb":
                    config = this.makeNativeDebugConfiguration("gdb", debugConfiguration);
                    break;
                case "nd-lldb":
                    config = this.makeNativeDebugConfiguration("lldb-mi", debugConfiguration);
                    break;
                case "mago":
                    config = this.makeNativeDebugConfiguration("mago-mi", debugConfiguration);
                    break;
                default:
                    throw new Error("Unrecognized debug type '" + debugType + "'");
            }
            if (debugType.startsWith("cpp-") || debugType == "vsdbg")
                yield ((_a = this.cppDebug) === null || _a === void 0 ? void 0 : _a.activate());
            else if (debugType.startsWith("nd-") || debugType == "mago")
                yield ((_b = this.webfreakDebug) === null || _b === void 0 ? void 0 : _b.activate());
            else if (debugType == "code-lldb")
                yield ((_c = this.codeLLDB) === null || _c === void 0 ? void 0 : _c.activate());
            if (overwrite) {
                for (const key in overwrite) {
                    if (overwrite.hasOwnProperty(key)) {
                        config[key] = overwrite[key];
                    }
                }
            }
            return config;
        });
    }
    resolveDebugConfigurationWithSubstitutedVariables(folder, debugConfiguration, token) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.makeDebugConfiguration(debugConfiguration);
            (_b = (_a = this.served) === null || _a === void 0 ? void 0 : _a.outputChannel) === null || _b === void 0 ? void 0 : _b.appendLine("Generated debugging configuration:\n\n" + JSON.stringify(config, null, "\t"));
            if (!debugConfiguration.dubBuild)
                return config;
            var dubconfig = yield ((_c = this.served) === null || _c === void 0 ? void 0 : _c.getActiveDubConfig());
            var hasCDebugInfo = ((_e = (_d = dubconfig === null || dubconfig === void 0 ? void 0 : dubconfig.buildOptions) === null || _d === void 0 ? void 0 : _d.indexOf("debugInfoC")) !== null && _e !== void 0 ? _e : -1) != -1
                || ((_g = (_f = dubconfig === null || dubconfig === void 0 ? void 0 : dubconfig.dflags) === null || _f === void 0 ? void 0 : _f.indexOf("-gc")) !== null && _g !== void 0 ? _g : -1) != -1;
            var isSDL = ((_h = dubconfig === null || dubconfig === void 0 ? void 0 : dubconfig.recipePath) === null || _h === void 0 ? void 0 : _h.endsWith(".sdl")) == true;
            console.log(dubconfig);
            (_k = (_j = this.served) === null || _j === void 0 ? void 0 : _j.outputChannel) === null || _k === void 0 ? void 0 : _k.appendLine("Active DUB project info:\n\n" + JSON.stringify(dubconfig, null, "\t"));
            function warnBuildSettings(msg) {
                let ignore = "Ignore";
                let edit = isSDL ? "Edit dub.sdl" : "Edit dub.json";
                let workspace = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined;
                let config = vscode.workspace.getConfiguration("d", workspace);
                let ignoreAlways = workspace ? "Always Ignore (Workspace)" : "Always Ignore (Global)";
                if (config.get("ignoreDebugHints", false))
                    return true;
                return vscode.window.showWarningMessage(msg, ignore, edit, ignoreAlways).then((btn) => {
                    if (btn == ignoreAlways) {
                        config.update("ignoreDebugHints", true);
                        btn = ignore;
                    }
                    if (btn == edit) {
                        if ((dubconfig === null || dubconfig === void 0 ? void 0 : dubconfig.recipePath) == undefined)
                            throw new Error("Unable to open recipe, please open manually");
                        var path = dubconfig.recipePath;
                        vscode.workspace.openTextDocument(path).then(vscode.window.showTextDocument);
                    }
                    return btn == ignore;
                }, undefined);
            }
            if (config.type == "cppvsdbg" && !hasCDebugInfo) {
                if (!(yield warnBuildSettings(isSDL
                    ? "C Debug Information (`-gc`) has not been enabled. This is however recommended for use with the C++ VSDBG debugger.\n\nPlease add `buildOptions \"debugInfoC\" platform=\"windows\"` to your dub.sdl (globally or best placed inside the debug configuration or a special configuration) and retry debugging or disable dub building."
                    : "C Debug Information (`-gc`) has not been enabled. This is however recommended for use with the C++ VSDBG debugger.\n\nPlease add `\"buildOptions-windows\": [\"debugInfoC\"]` to your dub.json (globally or best placed inside the debug configuration or a special configuration) and retry debugging or disable dub building.")))
                    return undefined;
            }
            else if ((config.type == "cppdbg" || config.type == "gdb" || config.type == "lldb" || config.type == "lldb-mi") && hasCDebugInfo) {
                if (!(yield warnBuildSettings("C Debug Information (`-gc`) has been enabled. For the best experience with GDB/LLDB debuggers it is recommended to omit this option.\n\nTo fix this, remove or restrict the affecting `buildOptions` (debugInfoC) or `dflags` to e.g. Windows only, create a new build configuration or disable dub building.")))
                    return undefined;
            }
            let exitCode = yield new Promise((done) => __awaiter(this, void 0, void 0, function* () {
                var _l, _m;
                let task = yield ((_m = (_l = this.served) === null || _l === void 0 ? void 0 : _l.tasksProvider) === null || _m === void 0 ? void 0 : _m.resolveTask({
                    definition: {
                        type: "dub",
                        run: false,
                        compiler: "$current",
                        archType: "$current",
                        buildType: "$current",
                        configuration: "$current",
                        name: "debug dub build",
                        _id: "coded-debug-id-" + Math.random().toString(36)
                    },
                    isBackground: false,
                    name: "debug dub build",
                    source: "code-d debug",
                    runOptions: {
                        reevaluateOnRerun: false
                    },
                    presentationOptions: {
                        clear: true,
                        echo: true,
                        panel: vscode.TaskPanelKind.Dedicated,
                        reveal: vscode.TaskRevealKind.Silent,
                        showReuseMessage: false
                    },
                    problemMatchers: ["$dmd"],
                    group: vscode.TaskGroup.Build
                }, undefined));
                // hacky wait until finished task
                let finished = false;
                let waiter = vscode.tasks.onDidEndTask((e) => {
                    if (!finished && e.execution.task.definition._id == task.definition._id) {
                        setTimeout(() => {
                            if (!finished) {
                                finished = true;
                                waiter.dispose();
                                procWaiter.dispose();
                                done(-1);
                            }
                        }, 100);
                    }
                });
                let procWaiter = vscode.tasks.onDidEndTaskProcess((e) => {
                    if (!finished && e.execution.task.definition._id == task.definition._id) {
                        finished = true;
                        waiter.dispose();
                        procWaiter.dispose();
                        done(typeof e.exitCode == "undefined" ? -1 : e.exitCode);
                    }
                });
                yield vscode.tasks.executeTask(task);
            }));
            if (exitCode == -1) {
                vscode.window.showErrorMessage("Could not start dub build task before debugging!");
                return null;
            }
            else if (exitCode != 0) {
                vscode.window.showErrorMessage("dub build exited with error code " + exitCode);
                return undefined;
            }
            return config;
        });
    }
}
//# sourceMappingURL=debug.js.map