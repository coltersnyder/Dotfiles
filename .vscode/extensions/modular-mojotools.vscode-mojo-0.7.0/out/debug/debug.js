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
exports.MojoDebugContext = void 0;
const vscode = require("vscode");
const config = require("../utils/config");
const disposableContext_1 = require("../utils/disposableContext");
const files_1 = require("../utils/files");
const attachQuickPick_1 = require("./attachQuickPick");
const externalDebugLauncher_1 = require("./externalDebugLauncher");
const inlineVariables_1 = require("./inlineVariables");
/**
 * The "type" for debug configurations.
 */
const DEBUG_TYPE = "mojo-lldb";
/**
 * This class defines a factory used to find the lldb-vscode binary to use
 * depending on the session configuration.
 */
class MojoDebugAdapterDescriptorFactory {
    constructor(context) { this.context = context; }
    createDebugAdapterDescriptor(session, _executable) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = yield this.context.sdk.resolveConfig(session.configuration.modularHomePath || session.workspaceFolder ||
                session.configuration.mojoFile);
            // We don't need to show error messages here because `resolveConfig` does
            // that.
            if (!config)
                return undefined;
            return new vscode.DebugAdapterExecutable(config.mojoLLDBVSCodePath, ["--repl-mode", "variable"]);
        });
    }
}
/**
 * This class modifies the debug configuration right before the debug adapter is
 * launched. In other words, this is where we configure lldb-vscode.
 */
class MojoDebugConfigurationResolver {
    constructor(context) { this.context = context; }
    resolveDebugConfigurationWithSubstitutedVariables(folder, debugConfiguration, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Load the MojoLLDB plugin. The SDK must be present because otherwise we
            // can't get access to the debug adapter.
            let config = yield this.context.sdk.resolveConfig(debugConfiguration.modularHomePath || folder ||
                debugConfiguration.mojoFile);
            // We don't need to show error messages here because `resolveConfig` does
            // that.
            if (!config)
                return undefined;
            if (typeof (debugConfiguration.pid) === "string") {
                debugConfiguration.pid = parseInt(debugConfiguration.pid);
            }
            if (debugConfiguration.mojoFile) {
                if (!debugConfiguration.mojoFile.endsWith('.🔥') &&
                    !debugConfiguration.mojoFile.endsWith('.mojo')) {
                    const message = `Mojo Debug error: the file '${debugConfiguration
                        .mojoFile}' doesn't have the .🔥 or .mojo extension.`;
                    this.context.loggingService.logError(message);
                    vscode.window.showErrorMessage(message);
                    return undefined;
                }
                debugConfiguration.args = [
                    "run", "--no-optimization", "--debug-level", "full",
                    debugConfiguration.mojoFile, ...(debugConfiguration.args || [])
                ];
                debugConfiguration.program = config.mojoDriverPath;
            }
            // We give preference to the init commands specified by the user.
            // The timeout that will be used by LLDB when initializing the target in
            // different scenarios. We use 5 minutes as a very conservative timeout when
            // debugging massive LLVM targets.
            const initializationTimeoutSec = 5 * 60;
            if (debugConfiguration.customFrameFormat === undefined) {
                // FIXME(#23274): include {${function.is-optimized} [opt]} when we don't
                // emit opt for -O0.
                debugConfiguration.customFrameFormat =
                    "${function.name-with-args}{${frame.is-artificial} [artificial]}";
            }
            // This setting indicates LLDB to generate a useful summary for each
            // non-primitive type that is displayed right away in the IDE.
            if (debugConfiguration.enableAutoVariableSummaries === undefined)
                debugConfiguration.enableAutoVariableSummaries = true;
            // This setting indicates LLDB to use the `:` prefix in the Debug Console to
            // disambiguate variable printing from regular LLDB commands.
            if (debugConfiguration.commandEscapePrefix === undefined)
                debugConfiguration.commandEscapePrefix = ':';
            // This timeout affects targets created with "attachCommands" or
            // "launchCommands".
            if (debugConfiguration.timeout === undefined)
                debugConfiguration.timeout = initializationTimeoutSec;
            // This setting shortens the length of address strings.
            const initCommands = [
                "?settings set target.show-hex-variable-values-with-leading-zeroes false",
                // FIXME(#23274): remove this when we properly emit the opt flag.
                "?settings set target.process.optimization-warnings false",
            ];
            initCommands.push(`?!plugin load '${config.mojoLLDBPluginPath}'`);
            debugConfiguration.initCommands = [
                ...initCommands,
                ...(debugConfiguration.initCommands || []),
            ];
            // Pull in the additional visualizers within the lldb-visualizers dir.
            if (yield config.lldbHasPythonScriptingSupport()) {
                let visualizersDir = config.mojoLLDBVisualizersPath;
                let visualizers = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(visualizersDir));
                let visualizerCommands = visualizers.map(([name, _type]) => `?command script import ${visualizersDir}/${name}`);
                debugConfiguration.initCommands.push(...visualizerCommands);
            }
            const env = [
                `LLDB_VSCODE_RIT_TIMEOUT_IN_MS=${initializationTimeoutSec *
                    1000}` // runInTerminal initialization timeout.
            ];
            // We add the MODULAR_HOME env var to enable debugging of SDK artifacts,
            // giving preference to the env specified by the user.
            if (config)
                env.push(`MODULAR_HOME=${config.modularHomePath}`);
            debugConfiguration.env = [...env, ...(debugConfiguration.env || [])];
            return debugConfiguration;
        });
    }
    resolveDebugConfiguration(folder, debugConfiguration, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // The `Debug: Start Debugging` command (aka F5 or the `Run and Debug`
            // button if no launch.json files are present), invoke this method with a
            // totally empty debugConfiguration, so we have to fill it in.
            if (!debugConfiguration.request) {
                debugConfiguration.type = DEBUG_TYPE;
                debugConfiguration.request = "launch";
                // This will get replaced with the currently active document.
                debugConfiguration.mojoFile = "${file}";
            }
            return debugConfiguration;
        });
    }
}
/**
 * Provides debug configurations dynamically depending on the currently open
 * workspaces and files.
 */
class MojoDebugDynamicConfigurationProvider {
    provideDebugConfigurations(_folder, _token) {
        return __awaiter(this, void 0, void 0, function* () {
            const [activeFile, otherOpenFiles] = (0, files_1.getAllOpenMojoFiles)();
            return [activeFile, ...otherOpenFiles]
                .filter((file) => !!file)
                .map(file => {
                var _a;
                return {
                    type: DEBUG_TYPE,
                    request: "launch",
                    name: `Mojo: Debug ${file.baseName} ⸱ ${file.relativePath}`,
                    mojoFile: file.uri.fsPath,
                    args: [],
                    env: [],
                    cwd: (_a = file.workspaceFolder) === null || _a === void 0 ? void 0 : _a.uri.fsPath,
                    runInTerminal: false,
                };
            });
        });
    }
}
/**
 * Class used to register and manage all the necessary constructs to support
 * mojo debugging.
 */
class MojoDebugContext extends disposableContext_1.DisposableContext {
    constructor(context) {
        super();
        this.rpcServers = new Map();
        this.context = context;
        // Register the lldb-vscode debug adapter.
        this.pushSubscription(vscode.debug.registerDebugAdapterDescriptorFactory(DEBUG_TYPE, new MojoDebugAdapterDescriptorFactory(context)));
        this.pushSubscription(vscode.debug.onDidStartDebugSession((listener) => __awaiter(this, void 0, void 0, function* () {
            if (listener.configuration.type != DEBUG_TYPE)
                return;
            if (!listener.configuration.runInTerminal)
                yield vscode.commands.executeCommand("workbench.debug.action.focusRepl");
        })));
        this.pushSubscription((0, inlineVariables_1.initializeInlineLocalVariablesProvider)(context));
        this.pushSubscription(vscode.debug.registerDebugConfigurationProvider(DEBUG_TYPE, new MojoDebugConfigurationResolver(context)));
        this.pushSubscription(vscode.debug.registerDebugConfigurationProvider(DEBUG_TYPE, new MojoDebugDynamicConfigurationProvider(), vscode.DebugConfigurationProviderTriggerKind.Dynamic));
        this.pushSubscription((0, attachQuickPick_1.activatePickProcessToAttachCommand)(this.context));
        this.pushSubscription(vscode.commands.registerCommand("mojo.attachToProcess", () => {
            return vscode.debug.startDebugging(undefined, {
                type: "mojo-lldb",
                request: "attach",
                name: "Mojo: Attach to process command",
                pid: "${command:pickProcessToAttach}"
            });
        }));
        // Register the URI-based debug launcher.
        this.pushSubscription(vscode.window.registerUriHandler(new externalDebugLauncher_1.UriLaunchServer(context.loggingService)));
        // Register the RPC-based debug launcher.
        this.pushSubscription(vscode.workspace.onDidChangeWorkspaceFolders((event) => {
            // We fully restart all the servers after a workspace event for
            // simplicity.
            for (const [_, rpcServer] of this.rpcServers) {
                rpcServer.dispose();
            }
            this.rpcServers.clear();
            this.launchRpcServers();
        }));
        // Initialize the RPC servers.
        this.launchRpcServers();
    }
    launchRpcServers() {
        // It's not possible to ask VS Code for the settings that are specific to a
        // given workspace or to the user. In fact, you can only provide some
        // "context" and then VS Code will return a set of settings that might come
        // from different places all merged together. Because of this, we need to
        // fetch settings from different contexts and reuse servers whenever
        // possible.
        for (const folder of vscode.workspace.workspaceFolders || []) {
            this.updateOrCreateRpcServer(folder);
        }
        this.updateOrCreateRpcServer();
    }
    /**
     * Create a debug rpc server using the config from the given workspace. If the
     * workspace is undefined, then a global config is used instead.
     */
    updateOrCreateRpcServer(workspaceFolder) {
        let options = config.get('lldb.rpcServer', workspaceFolder);
        if (!options || Object.keys(options).length == 0)
            return;
        const port = options.port;
        if (port === undefined) {
            this.context.loggingService.logInfo(`The 'port' key was not found in the mojo.lldb.rpcServer settings.`, options);
            return;
        }
        const key = `${port}`;
        const existingServer = this.rpcServers.get(key);
        if (existingServer) {
            existingServer.addServerToken(options.token);
        }
        else {
            let rpcServer = new externalDebugLauncher_1.RpcLaunchServer(this.context.loggingService, port, options.token);
            this.context.loggingService.logInfo(`Starting RPC server for port:`, port);
            this.pushSubscription(rpcServer);
            rpcServer.listen();
            this.rpcServers.set(key, rpcServer);
        }
    }
}
exports.MojoDebugContext = MojoDebugContext;
//# sourceMappingURL=debug.js.map