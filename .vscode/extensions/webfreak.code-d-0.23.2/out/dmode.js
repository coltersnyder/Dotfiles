"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFILEGC_MODE = exports.DIET_MODE = exports.DSCANNER_INI_MODE = exports.DUB_MODE = exports.SDL_MODE = exports.DSCRIPT_MODE = exports.DML_MODE = exports.D_MODE = void 0;
exports.D_MODE = { language: "d", scheme: "file" };
exports.DML_MODE = { language: "dml", scheme: "file" };
exports.DSCRIPT_MODE = { language: "dscript", scheme: "file" };
exports.SDL_MODE = { language: "sdl", scheme: "file" };
exports.DUB_MODE = { pattern: "**/dub.{sdl,json}", scheme: "file" };
exports.DSCANNER_INI_MODE = { pattern: "**/dscanner.ini", scheme: "file" };
exports.DIET_MODE = { language: "diet", scheme: "file" };
exports.PROFILEGC_MODE = { pattern: "**/profilegc.log", scheme: "file" };
//# sourceMappingURL=dmode.js.map