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
exports.registerCommands = exports.registerClientCommands = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const dub_editor_1 = require("./dub-editor");
const extension_1 = require("./extension");
const project_creator_1 = require("./project-creator");
const dub_api_1 = require("./dub-api");
const dub_tasks_1 = require("./dub-tasks");
const dpldocs_1 = require("./dpldocs");
const multiTokenWordPattern = /[^\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+(?:\.[^\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)*/;
var gClient;
function registerClientCommands(context, client, served) {
    var subscriptions = context.subscriptions;
    served.tasksProvider = new dub_tasks_1.DubTasksProvider(client);
    subscriptions.push(vscode.tasks.registerTaskProvider("dub", served.tasksProvider));
    gClient = client;
    subscriptions.push(vscode.commands.registerCommand("code-d.switchConfiguration", () => {
        vscode.window.showQuickPick(client.sendRequest("served/listConfigurations")).then((config) => {
            if (config)
                client.sendRequest("served/switchConfig", config).then(success => {
                    if (success)
                        served.emit("config-change", config);
                });
        });
    }, (err) => {
        client.outputChannel.appendLine(err.toString());
        vscode.window.showErrorMessage("Failed to switch configuration. See extension output for details.");
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.switchArchType", () => {
        vscode.window.showQuickPick(client.sendRequest("served/listArchTypes")).then((arch) => {
            if (arch)
                client.sendRequest("served/switchArchType", arch).then(success => {
                    if (success)
                        served.emit("arch-type-change", arch);
                });
        });
    }, (err) => {
        client.outputChannel.appendLine(err.toString());
        vscode.window.showErrorMessage("Failed to switch arch type. See extension output for details.");
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.switchBuildType", () => {
        vscode.window.showQuickPick(client.sendRequest("served/listBuildTypes")).then((type) => {
            if (type)
                client.sendRequest("served/switchBuildType", type).then(success => {
                    if (success)
                        served.emit("build-type-change", type);
                });
        });
    }, (err) => {
        client.outputChannel.appendLine(err.toString());
        vscode.window.showErrorMessage("Failed to switch build type. See extension output for details.");
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.switchCompiler", () => {
        client.sendRequest("served/getCompiler").then(compiler => {
            vscode.window.showInputBox({ value: compiler, prompt: "Enter compiler identifier. (e.g. dmd, ldc2, gdc)" }).then(compiler => {
                if (compiler)
                    client.sendRequest("served/switchCompiler", compiler).then(success => {
                        if (success)
                            served.emit("compiler-change", compiler);
                    });
            });
        }, (err) => {
            client.outputChannel.appendLine(err.toString());
            vscode.window.showErrorMessage("Failed to switch compiler. See extension output for details.");
        });
    }));
    subscriptions.push(vscode.commands.registerTextEditorCommand("code-d.sortImports", (editor, edit, location) => {
        if (typeof location !== "number")
            location = editor.document.offsetAt(editor.selection.start);
        client.sendRequest("served/sortImports", {
            textDocument: {
                uri: editor.document.uri.toString()
            },
            location: location
        }).then((change) => {
            if (!change.length)
                return;
            editor.edit((edit) => {
                var s = change[0].range.start;
                var e = change[0].range.end;
                var start = new vscode.Position(s.line, s.character);
                var end = new vscode.Position(e.line, e.character);
                edit.replace(new vscode.Range(start, end), change[0].newText);
            });
        }, (err) => {
            vscode.window.showErrorMessage("Could not sort imports");
            client.outputChannel.appendLine(err.toString());
        });
    }));
    subscriptions.push(vscode.commands.registerTextEditorCommand("code-d.implementMethods", (editor, edit, location) => {
        if (typeof location !== "number")
            location = editor.document.offsetAt(editor.selection.start);
        client.sendRequest("served/implementMethods", {
            textDocument: {
                uri: editor.document.uri.toString()
            },
            location: location
        }).then((change) => {
            if (!change.length)
                return;
            var s = change[0].range.start;
            var start = new vscode.Position(s.line, s.character);
            editor.insertSnippet(new vscode.SnippetString(change[0].newText), start);
        }, (err) => {
            vscode.window.showErrorMessage("Could not implement methods");
            client.outputChannel.appendLine(err.toString());
        });
    }));
    subscriptions.push(vscode.commands.registerTextEditorCommand("code-d.ignoreDscannerKey", (editor, edit, key, mode) => {
        var ignored = vscode.workspace.getConfiguration("dscanner", editor.document.uri).get("ignoredKeys");
        if (!ignored)
            ignored = vscode.workspace.getConfiguration("dscanner", null).get("ignoredKeys");
        var doChange = function (key, global) {
            if (Array.isArray(ignored))
                ignored.push(key);
            else
                ignored = [key];
            vscode.workspace.getConfiguration("dscanner", editor.document.uri).update("ignoredKeys", ignored, global ? vscode.ConfigurationTarget.Global : vscode.ConfigurationTarget.WorkspaceFolder).then(() => {
                served.triggerDscanner(editor.document.uri);
            });
        };
        if (typeof key !== "string" || !key.length) {
            var available = [
                "dscanner.bugs.backwards_slices",
                "dscanner.bugs.if_else_same",
                "dscanner.bugs.logic_operator_operands",
                "dscanner.bugs.self_assignment",
                "dscanner.confusing.argument_parameter_mismatch",
                "dscanner.confusing.brexp",
                "dscanner.confusing.builtin_property_names",
                "dscanner.confusing.constructor_args",
                "dscanner.confusing.function_attributes",
                "dscanner.confusing.lambda_returns_lambda",
                "dscanner.confusing.logical_precedence",
                "dscanner.confusing.struct_constructor_default_args",
                "dscanner.deprecated.delete_keyword",
                "dscanner.deprecated.floating_point_operators",
                "dscanner.if_statement",
                "dscanner.performance.enum_array_literal",
                "dscanner.style.allman",
                "dscanner.style.alias_syntax",
                "dscanner.style.doc_missing_params",
                "dscanner.style.doc_missing_returns",
                "dscanner.style.doc_non_existing_params",
                "dscanner.style.explicitly_annotated_unittest",
                "dscanner.style.has_public_example",
                "dscanner.style.imports_sortedness",
                "dscanner.style.long_line",
                "dscanner.style.number_literals",
                "dscanner.style.phobos_naming_convention",
                "dscanner.style.undocumented_declaration",
                "dscanner.suspicious.auto_ref_assignment",
                "dscanner.suspicious.catch_em_all",
                "dscanner.suspicious.comma_expression",
                "dscanner.suspicious.incomplete_operator_overloading",
                "dscanner.suspicious.incorrect_infinite_range",
                "dscanner.suspicious.label_var_same_name",
                "dscanner.suspicious.length_subtraction",
                "dscanner.suspicious.local_imports",
                "dscanner.suspicious.missing_return",
                "dscanner.suspicious.object_const",
                "dscanner.suspicious.redundant_attributes",
                "dscanner.suspicious.redundant_parens",
                "dscanner.suspicious.static_if_else",
                "dscanner.suspicious.unmodified",
                "dscanner.suspicious.unused_label",
                "dscanner.suspicious.unused_parameter",
                "dscanner.suspicious.unused_variable",
                "dscanner.suspicious.useless_assert",
                "dscanner.unnecessary.duplicate_attribute",
                "dscanner.useless.final",
                "dscanner.useless-initializer",
                "dscanner.vcall_ctor",
                "dscanner.syntax"
            ];
            if (Array.isArray(ignored)) {
                ignored.forEach(element => {
                    var i = available.indexOf(element);
                    if (i != -1)
                        available.splice(i, 1);
                });
            }
            vscode.window.showQuickPick(available, {
                placeHolder: "Select which key to ignore"
            }).then(key => {
                if (key) {
                    if (typeof mode == "string") {
                        editor.edit(edit => {
                            edit.insert(editor.document.lineAt(editor.selection.end).range.end, " // @suppress(" + key + ")");
                            served.triggerDscanner(editor.document.uri);
                        });
                    }
                    else
                        doChange(key, mode);
                }
            });
        }
        else {
            if (typeof mode == "string") {
                edit.insert(editor.document.lineAt(editor.selection.end).range.end, " // @suppress(" + key + ")");
                served.triggerDscanner(editor.document.uri);
            }
            else
                doChange(key, mode);
        }
    }));
    subscriptions.push(vscode.commands.registerTextEditorCommand("code-d.addImport", (editor, edit, name, location) => {
        client.sendRequest("served/addImport", {
            textDocument: {
                uri: editor.document.uri.toString()
            },
            name: name,
            location: location
        }).then((change) => {
            client.outputChannel.appendLine("Importer resolve: " + JSON.stringify(change));
            if (change.rename) // no renames from addImport command
                return;
            editor.edit((edit) => {
                for (var i = change.replacements.length - 1; i >= 0; i--) {
                    var r = change.replacements[i];
                    if (r.range[0] == r.range[1])
                        edit.insert(editor.document.positionAt(r.range[0]), r.content);
                    else if (r.content == "")
                        edit.delete(new vscode.Range(editor.document.positionAt(r.range[0]), editor.document.positionAt(r.range[1])));
                    else
                        edit.replace(new vscode.Range(editor.document.positionAt(r.range[0]), editor.document.positionAt(r.range[1])), r.content);
                }
                client.outputChannel.appendLine("Done");
            });
        }, (err) => {
            vscode.window.showErrorMessage("Could not add import");
            client.outputChannel.appendLine(err.toString());
        });
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.killServer", () => {
        client.sendNotification("served/killServer");
        vscode.window.showInformationMessage("Killed DCD-Server", "Restart").then((pick) => {
            if (pick == "Restart")
                vscode.commands.executeCommand("code-d.restartServer");
        });
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.restartServer", () => {
        client.sendRequest("served/restartServer").then((success) => {
            if (success)
                vscode.window.showInformationMessage("Restarted DCD-Server");
            else
                vscode.window.showErrorMessage("Failed to restart DCD-Server");
        });
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.reloadImports", () => {
        client.sendRequest("served/updateImports").then((success) => {
            if (success)
                vscode.window.showInformationMessage("Successfully reloaded import paths");
            else
                vscode.window.showWarningMessage("Import paths are empty!");
        }, (err) => {
            client.outputChannel.appendLine(err.toString());
            vscode.window.showErrorMessage("Could not update imports. dub might not be initialized yet!");
        });
    }));
    subscriptions.push(vscode.commands.registerTextEditorCommand("code-d.convertDubRecipe", (editor, edit) => {
        if (editor.document.isDirty || editor.document.isUntitled) {
            vscode.window.showErrorMessage("Please save the file first");
            return;
        }
        var uri = editor.document.uri.toString();
        client.sendNotification("served/convertDubFormat", {
            textDocument: { uri: uri },
            newFormat: uri.toLowerCase().endsWith(".sdl") ? "json" : "sdl"
        });
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.addDependency", () => {
        vscode.window.showQuickPick((0, dub_api_1.listPackageOptions)(), {
            matchOnDescription: false,
            matchOnDetail: true,
            placeHolder: "Dependency Name"
        }).then(pkg => {
            if (pkg) {
                client.sendNotification("served/installDependency", {
                    name: pkg.label,
                    version: pkg.description
                });
            }
        });
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.updateDependency", (node) => {
        if (node.info)
            (0, dub_api_1.getLatestPackageInfo)(node.info.name).then((info) => {
                if (node.info)
                    client.sendNotification("served/updateDependency", {
                        name: node.info.name,
                        version: info.version
                    });
            });
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.removeDependency", (node) => {
        if (node.info)
            client.sendNotification("served/uninstallDependency", {
                name: node.info.name
            });
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.insertDscanner", () => {
        const defaultDscannerIni = "[analysis.config.StaticAnalysisConfig]\nstyle_check=\"enabled\"\n";
        if (!vscode.window.activeTextEditor)
            return vscode.window.showErrorMessage("No text editor active");
        served.listDScannerConfig(vscode.window.activeTextEditor.document.uri).then((ini) => {
            var text = "";
            ini.forEach(section => {
                text += "; " + section.description + "\n";
                text += "[" + section.name + "]\n";
                section.features.forEach(feature => {
                    text += "; " + feature.description + "\n";
                    text += feature.name + "=\"" + feature.enabled + "\"\n";
                });
                text += "\n";
            });
            return text || defaultDscannerIni;
        }, (err) => {
            return defaultDscannerIni;
        }).then((text) => {
            if (!vscode.window.activeTextEditor)
                return;
            vscode.window.activeTextEditor.edit((bld) => {
                if (!vscode.window.activeTextEditor)
                    return;
                bld.insert(vscode.window.activeTextEditor.selection.start, text);
            });
        });
    }));
}
exports.registerClientCommands = registerClientCommands;
function registerCommands(context) {
    var subscriptions = context.subscriptions;
    {
        let editor = new dub_editor_1.DubEditor(context);
        subscriptions.push(vscode.workspace.registerTextDocumentContentProvider("dubsettings", editor));
        subscriptions.push(vscode.commands.registerCommand("dub.openSettingsEditor", editor.open, editor));
        subscriptions.push(vscode.commands.registerCommand("dub.closeSettingsEditor", editor.close, editor));
    }
    vscode.commands.executeCommand("setContext", "d.isActive", true);
    var evalCounter = 0;
    subscriptions.push(vscode.commands.registerCommand("code-d.rdmdCurrent", (file) => __awaiter(this, void 0, void 0, function* () {
        var args = [];
        if (!vscode.window.activeTextEditor)
            return vscode.window.showErrorMessage("No text editor active");
        const doc = vscode.window.activeTextEditor.document;
        if (!file && doc.isDirty && !doc.isUntitled) {
            const btnSave = "Save file";
            const btnDisk = "Run from disk";
            const btnCancel = "Abort";
            const choice = yield vscode.window.showWarningMessage("The file is not saved, do you want to proceed?", btnSave, btnDisk, btnCancel);
            switch (choice) {
                case btnSave:
                    if (!(yield vscode.window.activeTextEditor.document.save())) {
                        vscode.window.showErrorMessage("Aborting RDMD run because save failed");
                        return;
                    }
                    break;
                case btnDisk:
                    break;
                case btnCancel:
                default:
                    return;
            }
        }
        file = file || (doc.isUntitled ? undefined : doc.uri);
        var cwd = file ? path.dirname(file.fsPath) : vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
        if (file)
            args = [{ value: file.fsPath, quoting: vscode.ShellQuoting.Strong }];
        else
            args = [{
                    value: "--eval=" + doc.getText(),
                    quoting: vscode.ShellQuoting.Strong
                }];
        const shell = new vscode.ShellExecution({ value: "rdmd", quoting: vscode.ShellQuoting.Strong }, args, { cwd: cwd });
        const task = new vscode.Task({ type: "rdmd" }, vscode.TaskScope.Workspace, "RDMD " + (file || ("eval code " + (++evalCounter))), "code-d", shell);
        task.isBackground = false;
        task.presentationOptions = { echo: !!file };
        vscode.tasks.executeTask(task);
    })));
    function withProject(fn) {
        return function (config) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!extension_1.served)
                    throw new Error("serve-d is not yet started, can't read DUB config");
                const project = yield extension_1.served.getActiveDubConfig();
                return fn.apply(this, [config, project]);
            });
        };
    }
    subscriptions.push(vscode.commands.registerCommand("code-d.getActiveDubPackageName", withProject((config, project) => {
        return project.packageName;
    })));
    subscriptions.push(vscode.commands.registerCommand("code-d.getActiveDubPackagePath", withProject((config, project) => {
        return project.packagePath;
    })));
    subscriptions.push(vscode.commands.registerCommand("code-d.getActiveDubWorkingDirectory", withProject((config, project) => {
        return path.join(project.packagePath, project.workingDirectory);
    })));
    subscriptions.push(vscode.commands.registerCommand("code-d.getActiveDubTarget", withProject((config, project) => {
        return path.join(project.targetPath, project.targetName);
    })));
    subscriptions.push(vscode.commands.registerCommand("code-d.getActiveDubTargetPath", withProject((config, project) => {
        return project.targetPath;
    })));
    subscriptions.push(vscode.commands.registerCommand("code-d.getActiveDubTargetName", withProject((config, project) => {
        return project.targetName;
    })));
    subscriptions.push(vscode.commands.registerCommand("code-d.createProject", () => {
        (0, project_creator_1.showProjectCreator)(context);
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.viewDubPackage", (root) => {
        if (root) {
            fs.readdir(root, (err, files) => {
                if (err)
                    return;
                var mostLikely = "";
                files.forEach(file => {
                    if (file.toLowerCase().startsWith("readme")) {
                        mostLikely = file;
                    }
                });
                if (!mostLikely)
                    return;
                var readme = path.join(root, mostLikely);
                var uri = vscode.Uri.file(readme);
                var extension = path.extname(readme).toLowerCase();
                if (extension == ".md" || extension == ".markdown")
                    vscode.commands.executeCommand("markdown.showPreview", uri, { locked: true });
                else if (extension == ".html" || extension == ".htm")
                    vscode.commands.executeCommand("vscode.previewHtml", uri);
                else
                    vscode.commands.executeCommand("vscode.open", uri);
            });
        }
    }));
    if (context.globalState.get("create-template", "")) {
        var id = context.globalState.get("create-template", "");
        context.globalState.update("create-template", undefined);
        fs.readFile(path.join(context.extensionPath, "templates", "info.json"), function (err, data) {
            if (err)
                return vscode.window.showErrorMessage("Failed to parse templates");
            var templates = JSON.parse(data.toString());
            for (var i = 0; i < templates.length; i++)
                if (templates[i].path == id) {
                    var path = "";
                    if (!vscode.workspace.workspaceFolders)
                        return vscode.window.showErrorMessage("No workspace folder open");
                    path = vscode.workspace.workspaceFolders[0].uri.path;
                    fs.readdir(path, function (err, files) {
                        if (files.length == 0)
                            (0, project_creator_1.performTemplateCopy)(context, id, templates[i].dub, path, function () {
                                vscode.commands.executeCommand("workbench.action.reloadWindow");
                            });
                        else
                            vscode.window.showWarningMessage("The current workspace is not empty!", "Select other Folder", "Merge into Folder").then(r => {
                                if (r == "Select other Folder") {
                                    context.globalState.update("create-template", id);
                                    (0, project_creator_1.openFolderWithExtension)(context);
                                }
                                else if (r == "Merge into Folder") {
                                    (0, project_creator_1.performTemplateCopy)(context, id, templates[i].dub, path, function () {
                                        vscode.commands.executeCommand("workbench.action.reloadWindow");
                                    });
                                }
                            });
                    });
                    return undefined;
                }
            return undefined;
        });
    }
    subscriptions.push(vscode.commands.registerCommand("code-d.searchDocs", () => {
        var query = "";
        if (vscode.window.activeTextEditor)
            query = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
        (0, dpldocs_1.showDpldocsSearch)(query);
    }));
    subscriptions.push(vscode.commands.registerTextEditorCommand("code-d.openDocsAtCursor", (editor, edit) => {
        // TODO: we can probably add local ddoc rendering if we can jump to the symbol anyway
        var query = "";
        if (editor.selection.isEmpty) {
            const range = editor.document.getWordRangeAtPosition(editor.selection.active, multiTokenWordPattern);
            if (range)
                (0, dpldocs_1.showDpldocsSearch)(editor.document.getText(range), true);
            else
                (0, dpldocs_1.showDpldocsSearch)("");
        }
        else
            (0, dpldocs_1.showDpldocsSearch)(editor.document.getText(editor.selection), true);
    }));
    subscriptions.push(vscode.commands.registerCommand("code-d.viewUserGuide", () => {
        vscode.commands.executeCommand("markdown.showPreview", vscode.Uri.file(context.asAbsolutePath("docs/index.md")), { locked: true });
    }));
}
exports.registerCommands = registerCommands;
//# sourceMappingURL=commands.js.map