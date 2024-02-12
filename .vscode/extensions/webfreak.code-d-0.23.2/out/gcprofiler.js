"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCProfiler = void 0;
const vscode = require("vscode");
const extension_1 = require("./extension");
class GCProfiler {
    constructor() {
        this.profiles = [];
    }
    static listProfileCache() {
        let entriesPromise = extension_1.served.client.sendRequest("served/getProfileGCEntries");
        let items = entriesPromise.then(gcEntries => gcEntries.map(entry => ({
            description: entry.type,
            detail: entry.bytesAllocated + " bytes allocated / " + entry.allocationCount + " allocations",
            label: entry.displayFile + ":" + entry.line,
            uri: entry.uri,
            line: entry.line
        })));
        vscode.window.showQuickPick(items).then(item => {
            if (item)
                vscode.workspace.openTextDocument(vscode.Uri.parse(item.uri)).then(doc => {
                    vscode.window.showTextDocument(doc).then(editor => {
                        let line = doc.lineAt(item.line - 1);
                        editor.revealRange(line.range, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
                        editor.selection = new vscode.Selection(line.range.start, line.range.start);
                    });
                });
        });
    }
}
exports.GCProfiler = GCProfiler;
//# sourceMappingURL=gcprofiler.js.map