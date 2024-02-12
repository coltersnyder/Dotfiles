"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const CommandHandler_1 = require("./lib/CommandHandler");
const UserInputContext_1 = require("./lib/UserInputContext");
const exceptions_1 = require("./util/exceptions");
function activate(context) {
    const command = 'shellCommand.execute';
    const userInputContext = new UserInputContext_1.UserInputContext();
    const callback = (args) => {
        try {
            const handler = new CommandHandler_1.CommandHandler(args, userInputContext, context);
            return handler.handle();
        }
        catch (error) {
            const message = (error instanceof exceptions_1.ShellCommandException)
                ? error.message
                : 'Error executing shell command: ' + error;
            console.error(error);
            vscode.window.showErrorMessage(message);
        }
    };
    context.subscriptions.push(vscode.commands.registerCommand(command, callback, this));
    // Triggers a reset of the userInput context
    context.subscriptions.push(vscode.tasks.onDidStartTask(() => userInputContext.reset()));
    context.subscriptions.push(vscode.debug.onDidStartDebugSession(() => userInputContext.reset()));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map