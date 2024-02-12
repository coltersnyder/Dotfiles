"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unixEscapeShellParam = exports.win32EscapeShellParam = exports.reqText = exports.reqJson = exports.reqType = exports.axios = void 0;
const vscode = require("vscode");
const axiosLib = require("axios");
const extension_1 = require("./extension");
exports.axios = axiosLib.default;
function reqType(type, baseURL, timeout = 10000) {
    let proxy = vscode.workspace.getConfiguration("http").get("proxy", "");
    if (proxy)
        process.env["http_proxy"] = proxy;
    return exports.axios.create({
        baseURL,
        responseType: type,
        timeout: timeout,
        headers: {
            "User-Agent": "code-d/" + extension_1.currentVersion + " (github:Pure-D/code-d)"
        }
    });
}
exports.reqType = reqType;
function reqJson(baseURL, timeout = 10000) {
    return reqType("json", baseURL, timeout);
}
exports.reqJson = reqJson;
function reqText(baseURL, timeout = 10000) {
    return reqType("text", baseURL, timeout);
}
exports.reqText = reqText;
// the shell quoting functions should only be used if really necessary! vscode
// tasks should be used if something is actually executed.
/**
 * Escapes a parameter for appending to win32 process info object. The returned
 * string reverses back to the input param using the Win32 CommandLineToArgvW
 * method on the application side.
 */
function win32EscapeShellParam(param) {
    if (param.length == 0)
        return '""';
    if (param.indexOf(' ') == -1 && param.indexOf('"') == -1)
        return param;
    var ret = '"';
    var backslash = 0;
    for (let i = 0; i < param.length; i++) {
        const c = param[i];
        if (c == '"') {
            ret += '\\'.repeat(backslash + 1) + '"';
            backslash = 0;
        }
        else {
            if (c == '\\')
                backslash++;
            else
                backslash = 0;
            ret += c;
        }
    }
    return ret + '"';
}
exports.win32EscapeShellParam = win32EscapeShellParam;
/**
 * https://stackoverflow.com/a/22827128
 * thx Alex Yaroshevich
 */
function unixEscapeShellParam(param) {
    return `'${param.replace(/'/g, `'\\''`)}'`;
}
exports.unixEscapeShellParam = unixEscapeShellParam;
//# sourceMappingURL=util.js.map