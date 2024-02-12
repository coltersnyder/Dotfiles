"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const NamespaceDetails_1 = require("../NamespaceDetails");
const Helpers_1 = require("../Helpers");
const Container_1 = require("../Container");
function create(activeEditor, selections, sourceEditor) {
    var _a, _b, _c, _d, _e;
    let selection = selections.shift();
    if (selection) {
        let code = activeEditor.document.getText();
        let container = new Container_1.default(code);
        let funcDetails = container.findFunction(activeEditor.document.offsetAt(selection.start));
        if (funcDetails) { // If was null then selection is not a c++ function declration
            let imp = '\n' + (funcDetails === null || funcDetails === void 0 ? void 0 : funcDetails.generteImplementation(true));
            if (funcDetails && imp) {
                let position;
                if (sourceEditor === activeEditor) { // Implementate under class it self.
                    position = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.positionAt(funcDetails.class ? funcDetails.class.getRootClass().end : 0);
                }
                else { // Implementate in related source file
                    let namespaces = NamespaceDetails_1.default.parseNamespaces(sourceEditor.document.getText());
                    // find functions's namespace in source file for insert position
                    for (let i in namespaces) {
                        if (namespaces[i].fullname() === ((_b = funcDetails.getNamespace()) === null || _b === void 0 ? void 0 : _b.fullname())) {
                            position = sourceEditor.document.positionAt(namespaces[i].contentStart);
                            break;
                        }
                    }
                    // Function's name space does not exists. so creating namespace first.
                    if (position === undefined && funcDetails.getNamespace()) {
                        sourceEditor.insertSnippet(new vscode.SnippetString((_c = funcDetails.getNamespace()) === null || _c === void 0 ? void 0 : _c.generateCode()), sourceEditor.document.positionAt(sourceEditor.document.getText().length))
                            .then(function () {
                            var _a;
                            if (funcDetails && typeof imp === 'string') {
                                let namespaces = NamespaceDetails_1.default.parseNamespaces(sourceEditor.document.getText());
                                // Namespace created so searching for scopes again
                                for (let i in namespaces) {
                                    if (namespaces[i].fullname() === ((_a = funcDetails.getNamespace()) === null || _a === void 0 ? void 0 : _a.fullname())) {
                                        position = sourceEditor.document.positionAt(namespaces[i].contentStart);
                                        imp = imp.replace(/[\r\n]+$/g, '');
                                        sourceEditor.insertSnippet(new vscode.SnippetString(funcDetails.getNamespace() ? Helpers_1.default.indent(imp) : imp), position ? position : sourceEditor.document.positionAt(sourceEditor.document.getText().length))
                                            .then(function () {
                                            if (selections.length > 0) {
                                                create(activeEditor, selections, sourceEditor);
                                            }
                                        });
                                        break;
                                    }
                                }
                            }
                        });
                        return;
                    }
                }
                if (funcDetails.previouses.length > 0) {
                    let index = -1;
                    let previousesReverse = funcDetails.previouses.reverse();
                    for (let i in previousesReverse) {
                        if (index !== -1) {
                            break;
                        }
                        try {
                            let previous = previousesReverse[i];
                            if ((previous.getNamespace() === null && funcDetails.getNamespace() === null) || (((_d = previous.getNamespace()) === null || _d === void 0 ? void 0 : _d.fullname()) === ((_e = funcDetails.getNamespace()) === null || _e === void 0 ? void 0 : _e.fullname()))) {
                                let implementationRegex = (previous.class ? previous.class.name + '\\s*(<[^>]*>)?\\s*::\\s*' : '') + (previous.castOperator ? previous.before + '\\s*' : '') + previous.name + '\\s*\\([^\\)]*\\)[^{]*\\{';
                                let source = sourceEditor.document.getText();
                                let regex = new RegExp(implementationRegex, 'gm');
                                let match = null, match2;
                                while (match = regex.exec(source)) {
                                    let regex2 = new RegExp(Helpers_1.default.scopeRegex, 'gm');
                                    if ((match2 = regex2.exec(source.substr(match.index + match[0].length - 1)))) {
                                        index = match.index + match[0].length + match2[0].length;
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    if (index !== -1) {
                        position = sourceEditor.document.positionAt(index - (sourceEditor.document.eol === vscode.EndOfLine.LF ? 1 : 0));
                        imp = '\n' + imp;
                    }
                    else if (funcDetails.getNamespace() !== null && sourceEditor !== activeEditor) {
                        imp = Helpers_1.default.indent(imp);
                    }
                    if (index === -1) {
                        imp = imp + '\n';
                    }
                }
                else if (funcDetails.getNamespace() !== null && sourceEditor !== activeEditor) {
                    imp = Helpers_1.default.indent(imp);
                }
                if (funcDetails.previouses.length === 0) {
                    imp = imp + '\n';
                }
                sourceEditor.insertSnippet(new vscode.SnippetString(imp), position ? position : sourceEditor.document.positionAt(sourceEditor.document.getText().length))
                    .then(function () {
                    if (selections.length > 0) {
                        create(activeEditor, selections, sourceEditor);
                    }
                });
            }
        }
        else {
            vscode.window.showInformationMessage("Function not detected.");
            if (selections.length > 0) {
                create(activeEditor, selections, sourceEditor);
            }
        }
    }
}
exports.create = create;
/**
 * Generate Implementation Command
 */
function default_1() {
    if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.selection) {
        if (vscode.window.activeTextEditor) {
            var activeEditor = vscode.window.activeTextEditor;
            var selections = activeEditor.selections;
            selections = selections.sort((a, b) => a.start.isAfter(b.start) ? 1 : -1);
            Helpers_1.default.openSourceFile()
                .then(function (doc) {
                create(activeEditor, selections, doc);
            })
                .catch(function (error) {
                let notFoundBehavior = vscode.workspace.getConfiguration("CppHelper").get('SourceNotFoundBehavior');
                if (notFoundBehavior === "Show error") {
                    vscode.window.showErrorMessage(error);
                }
            });
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=CreateImplementation.js.map