"use strict";
//===----------------------------------------------------------------------===//
//
// This file is Modular Inc proprietary.
//
//===----------------------------------------------------------------------===//
Object.defineProperty(exports, "__esModule", { value: true });
exports.esmImporter = void 0;
/**
 * This utility allows importing from ESM modules, which are otherwise non
 * importable by typescript.
 */
exports.esmImporter = new Function("specifier", 'return import(specifier)');
//# sourceMappingURL=esmImporter.js.map