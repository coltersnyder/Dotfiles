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
exports.MOJOSDK = exports.MOJOSDKConfig = void 0;
const ini = require("ini");
const path = require("path");
const util = require("util");
const vscode = require("vscode");
const execFile = util.promisify(require('child_process').execFile);
const config = require("./utils/config");
const vscodeVariables_1 = require("./utils/vscodeVariables");
/**
 * This class represents a subset of the Modular config object used by extension
 * for interacting with mojo.
 */
class MOJOSDKConfig {
    constructor(loggingService) {
        /**
         * The MODULAR_HOME path containing the SDK.
         */
        this.modularHomePath = "";
        /**
         * The path to the mojo driver within the SDK installation.
         */
        this.mojoDriverPath = "";
        /**
         * The path to the LLDB vscode debug adapter.
         */
        this.mojoLLDBVSCodePath = "";
        /**
         * The path to the LLDB visualizers.
         */
        this.mojoLLDBVisualizersPath = "";
        /**
         * The path the mojo language server within the SDK installation.
         */
        this.mojoLanguageServerPath = "";
        /**
         * The path to the mojo LLDB plugin.
         */
        this.mojoLLDBPluginPath = "";
        /**
         * The path to the LLDB binary.
         */
        this.lldbPath = "";
        this.loggingService = loggingService;
    }
    /**
     * @returns true if and only if the LLDB binary in this SDK has a working
     *     python scripting feature.
     */
    lldbHasPythonScriptingSupport() {
        // We cache this check because it's not a no-op.
        if (this.lldbHasPythonScriptingSupportResult == undefined)
            this.lldbHasPythonScriptingSupportResult =
                this.doLLDBHasPythonScriptingSupport();
        return this.lldbHasPythonScriptingSupportResult;
    }
    /**
     * Actually determine whether python scripting is functional in LLDB. As there
     * are many reasons why python scripting would fail (e.g. disabled in CMake,
     * wrong SDK installation, etc.), it's more effective to just execute a
     * minimal script to confirm it's operative.
     */
    doLLDBHasPythonScriptingSupport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { stdout, stderr } = yield execFile(this.lldbPath, ["-b", "-o", "script print(100+1)"]);
                stdout = (stdout || "");
                stderr = (stderr || "");
                if (stdout.indexOf("101") != -1) {
                    this.loggingService.logInfo("Python scripting support in LLDB found.");
                    return true;
                }
                else {
                    this.loggingService.logInfo(`Python scripting support in LLDB not found. The test script returned:\n${stdout}\n${stderr}`);
                }
            }
            catch (e) {
                this.loggingService.logError("Python scripting support in LLDB not found. The test script failed with", e);
            }
            return false;
        });
    }
}
exports.MOJOSDKConfig = MOJOSDKConfig;
/**
 *  This class manages interacting with and checking the status of the Mojo SDK.
 */
class MOJOSDK {
    constructor(loggingService) {
        /**
         * The resolved Modular config for a set of workspaces.
         */
        this.workspaceConfigs = new Map();
        this.loggingService = loggingService;
    }
    /**
     * Resolve the Modular config for the given context.
     *
     * - If `context` is a string, then the resolver will use it as the SDK path.
     * - If `context` is a WorkspaceFolder, then the resolver will look for the
     * mojo.modularHomePath the WorkspaceFolder's settings and use it as the SDK
     * path. In case of failures, it'll resort to the global settings for the IDE.
     * - If `context` is undefined, then the resolver will look at the global
     * settings of the IDE.
     * - If the SDK was not found in the previous checks, then the resolver will
     * look for MODULAR_HOME in the environment of the IDE process.
     *
     * @param context The current workspace folder if its type is
     *     vscode.WorkspaceFolder, or the Mojo SDK path if its type is string, or
     *     undefined.
     * @param promptSDKInstall Whether to prompt the user to install the SDK if it
     *     is missing.
     */
    resolveConfig(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = "";
            if (typeof context === "string") {
                key = context;
            }
            else if (context) {
                key = context.uri.fsPath;
            }
            let mojoConfig = this.workspaceConfigs.get(key);
            if (mojoConfig)
                return mojoConfig;
            let modularPath;
            // Check to see if a path was specified explicitly.
            if (typeof (context) == "string") {
                modularPath = context;
                // Check to see if a path was specified in the config.
            }
            else {
                modularPath = yield this.tryGetModularHomePathFromConfig(context);
            }
            // Otherwise, check to see if the environment variable is set.
            if (!modularPath) {
                modularPath = process.env.MODULAR_HOME;
            }
            else {
                this.loggingService.logInfo("MODULAR_HOME found in VS Code settings.");
            }
            // If we still don't have a path, prompt the user to install the SDK.
            if (!modularPath) {
                this.loggingService.logInfo("MODULAR_HOME not found.");
                this.promptInstallSDK();
                return undefined;
            }
            this.loggingService.logInfo(`MODULAR_HOME is ${modularPath}.`);
            // Read in the config file.
            const modularCfg = path.join(modularPath, "modular.cfg");
            let configPath = vscode.Uri.file(modularCfg);
            try {
                let configPathStat = yield vscode.workspace.fs.stat(configPath);
                if (!(configPathStat.type & vscode.FileType.File)) {
                    this.showSDKErrorMessage(`The modular config file '${modularCfg}' is not a file.`);
                    this.promptInstallSDK();
                    return undefined;
                }
            }
            catch (e) {
                this.showSDKErrorMessage(`The modular config file '${modularCfg}' does not exist or VS Code does not have permissions to access it.`, e);
                this.promptInstallSDK();
                return undefined;
            }
            let modularConfig = ini.parse(new TextDecoder().decode(yield vscode.workspace.fs.readFile(configPath)));
            this.loggingService.logInfo("modular.cfg file with contents", modularConfig);
            // Extract out the pieces of the config that we care about.
            mojoConfig = new MOJOSDKConfig(this.loggingService);
            mojoConfig.modularHomePath = modularPath;
            mojoConfig.mojoLLDBVSCodePath = modularConfig.mojo.lldb_vscode_path;
            mojoConfig.mojoLLDBVisualizersPath =
                modularConfig.mojo.lldb_visualizers_path;
            mojoConfig.mojoDriverPath = modularConfig.mojo.driver_path;
            mojoConfig.mojoLanguageServerPath = modularConfig.mojo.lsp_server_path;
            mojoConfig.mojoLLDBPluginPath = modularConfig.mojo.lldb_plugin_path;
            mojoConfig.lldbPath = modularConfig.mojo.lldb_path;
            // Cache the config for the workspace.
            this.workspaceConfigs.set(key, mojoConfig);
            return mojoConfig;
        });
    }
    /**
     * Prompt to the user that the SDK is missing, and provide a link to the
     * installation instructions.
     */
    promptInstallSDK() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggingService.logInfo("Prompting Install SDK.");
            let value = yield vscode.window.showInformationMessage(("The Mojo🔥 development environment was not found. If the Mojo " +
                "SDK is installed, please set the MODULAR_HOME environment variable to the " +
                "appropriate path, or set the `mojo.modularHomePath` configuration. If you do " +
                "not have it installed, would you like to install it?"), "Install", "Open setting");
            if (value === "Install") {
                // TODO: This should resolve to the actual mojo download link when
                // the user console is in place.
                vscode.env.openExternal(vscode.Uri.parse("https://www.modular.com/mojo"));
            }
            else if (value === "Open setting") {
                vscode.commands.executeCommand('workbench.action.openWorkspaceSettings', { openToSide: false, query: `mojo.modularHomePath` });
            }
        });
    }
    /**
     * Attempt to retrieve the modular home path from the config. This will also
     * perform the substitution of some common VSCode variables.
     *
     * If the setting does not exist or the resolved path is not a directory,
     * return undefined.
     */
    tryGetModularHomePathFromConfig(workspaceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            let modularPath = config.get('modularHomePath', workspaceFolder);
            if (!modularPath)
                return undefined;
            const substituted = (0, vscodeVariables_1.substituteVariables)(modularPath, workspaceFolder);
            const showError = (reason) => {
                let message = `The mojo.modularHomePath setting '${modularPath}'`;
                if (substituted !== modularPath)
                    message += `, which resolves to '${substituted}',`;
                message += " " + reason + ".";
                this.showSDKErrorMessage(message);
                return undefined;
            };
            if (substituted.length == 0) {
                return showError("is empty");
            }
            try {
                let configPathStat = yield vscode.workspace.fs.stat(vscode.Uri.file(substituted));
                if (configPathStat.type & vscode.FileType.Directory)
                    return substituted;
                return showError("is not a directory");
            }
            catch (err) {
                return showError("does not exist");
            }
        });
    }
    /**
     * Show an error message as a VSCode notification and log it to the output
     * channel as well.
     */
    showSDKErrorMessage(message, error) {
        message = "Mojo SDK initialization error: " + message;
        this.loggingService.logError(message, error);
        vscode.window.showErrorMessage(message);
    }
}
exports.MOJOSDK = MOJOSDK;
//# sourceMappingURL=mojoSDK.js.map