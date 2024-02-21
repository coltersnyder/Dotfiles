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
exports.activatePickProcessToAttachCommand = void 0;
const vscode = require("vscode");
const esmImporter_1 = require("../utils/esmImporter");
class RefreshButton {
    get iconPath() {
        return new vscode.ThemeIcon("extensions-refresh");
    }
    get tooltip() { return "Refresh process list"; }
}
function getProcessItems() {
    return __awaiter(this, void 0, void 0, function* () {
        // We need to load ps-list dynamically because it's not compatible with
        // regular typescript modules.
        const psList = (yield (0, esmImporter_1.esmImporter)("ps-list")).default;
        let processes = yield psList();
        processes.filter(p => p.pid !== undefined);
        processes.sort((a, b) => {
            if (a.name === undefined) {
                if (b.name === undefined) {
                    return 0;
                }
                return 1;
            }
            if (b.name === undefined) {
                return -1;
            }
            const aLower = a.name.toLowerCase();
            const bLower = b.name.toLowerCase();
            if (aLower === bLower) {
                return 0;
            }
            return aLower < bLower ? -1 : 1;
        });
        return processes.map((process) => {
            return {
                label: process.name,
                description: `${process.pid}`,
                detail: process.cmd,
                id: process.pid
            };
        });
    });
}
/**
 * Show a QuickPick that selects a process to attach.
 *
 * @param context
 * @param debugConfig The debug config this action originates from. Its name is
 *     used as cache key for persisting the filter the user used to find the
 *     process to attach.
 * @returns The pid of the selected process as string. If the user cancelled, an
 *     exception is thrown.
 */
function showQuickPick(context, debugConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const processItems = yield getProcessItems();
        const memento = context.extensionContext.workspaceState;
        const filterMementoKey = ("searchProgramToAttach" + debugConfig.name);
        const previousFilter = memento.get(filterMementoKey);
        return new Promise((resolve, reject) => {
            const quickPick = vscode.window.createQuickPick();
            quickPick.value = previousFilter || "";
            quickPick.title = "Attach to process";
            quickPick.canSelectMany = false;
            quickPick.matchOnDescription = true;
            quickPick.matchOnDetail = true;
            quickPick.placeholder = "Select the process to attach to";
            quickPick.buttons = [new RefreshButton()];
            quickPick.items = processItems;
            let textFilter = "";
            const disposables = [];
            quickPick.onDidTriggerButton(() => __awaiter(this, void 0, void 0, function* () { quickPick.items = yield getProcessItems(); }), undefined, disposables);
            quickPick.onDidChangeValue((e) => { textFilter = e; });
            quickPick.onDidAccept(() => {
                if (quickPick.selectedItems.length !== 1) {
                    reject(new Error("Process not selected."));
                }
                const selectedId = `${quickPick.selectedItems[0].id}`;
                disposables.forEach(item => item.dispose());
                quickPick.dispose();
                memento.update(filterMementoKey, textFilter);
                resolve(selectedId);
            }, undefined, disposables);
            quickPick.onDidHide(() => {
                disposables.forEach(item => item.dispose());
                quickPick.dispose();
                reject(new Error("Process not selected."));
            }, undefined, disposables);
            quickPick.show();
        });
    });
}
function activatePickProcessToAttachCommand(context) {
    return vscode.commands.registerCommand("mojo.pickProcessToAttach", (debugConfig) => __awaiter(this, void 0, void 0, function* () { return showQuickPick(context, debugConfig); }));
}
exports.activatePickProcessToAttachCommand = activatePickProcessToAttachCommand;
//# sourceMappingURL=attachQuickPick.js.map