"use strict";
//===----------------------------------------------------------------------===//
//
// This file is Modular Inc proprietary.
//
//===----------------------------------------------------------------------===//
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOpenMojoFiles = exports.WorkspaceAwareFile = void 0;
const path = require("path");
const vscode = require("vscode");
/**
 * Utility class for handling files relative to their containing workspace
 * folder.
 */
class WorkspaceAwareFile {
    constructor(uri) {
        this.uri = uri;
        this.baseName = path.basename(uri.fsPath);
        this.relativePath = vscode.workspace.asRelativePath(this.uri, /*includeWorkspaceFolder=*/ true);
    }
}
exports.WorkspaceAwareFile = WorkspaceAwareFile;
/**
 * @returns All the currently open Mojo files as tuple, where the first element
 *     is the active document if it's a mojo file, and the second element are
 *     all other mojo files in no particular order.
 */
function getAllOpenMojoFiles() {
    var _a;
    const mojoUriFilter = (uri) => uri && (uri.fsPath.endsWith(".mojo") || uri.fsPath.endsWith(".🔥"));
    const activeRawUri = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri;
    const activeFile = activeRawUri && mojoUriFilter(activeRawUri)
        ? new WorkspaceAwareFile(activeRawUri)
        : undefined;
    let otherOpenFiles = vscode.window.tabGroups.all.flatMap(tabGroup => tabGroup.tabs)
        .map(tab => { var _a; return (_a = tab.input) === null || _a === void 0 ? void 0 : _a.uri; })
        .filter(mojoUriFilter)
        .map(uri => new WorkspaceAwareFile(uri))
        // We remove the active file from this list.
        .filter(file => !activeFile ||
        file.uri.toString() != activeFile.uri.toString());
    return [activeFile, otherOpenFiles];
}
exports.getAllOpenMojoFiles = getAllOpenMojoFiles;
//# sourceMappingURL=files.js.map