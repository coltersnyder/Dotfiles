(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 93);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(53)('wks');
var uid = __webpack_require__(36);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(10);
var hide = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NonDeclaredType */
/* unused harmony export Any */
/* unused harmony export Unit */
/* harmony export (immutable) */ __webpack_exports__["b"] = Option;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FableArray; });
/* unused harmony export Tuple */
/* unused harmony export Function */
/* unused harmony export GenericParam */
/* unused harmony export Interface */
/* unused harmony export makeGeneric */
/* unused harmony export isGeneric */
/* unused harmony export getDefinition */
/* unused harmony export extendInfo */
/* unused harmony export hasInterface */
/* unused harmony export getPropertyNames */
/* unused harmony export isArray */
/* harmony export (immutable) */ __webpack_exports__["h"] = toString;
/* unused harmony export ObjectRef */
/* unused harmony export getHashCode */
/* unused harmony export hash */
/* harmony export (immutable) */ __webpack_exports__["f"] = equals;
/* unused harmony export comparePrimitives */
/* harmony export (immutable) */ __webpack_exports__["c"] = compare;
/* unused harmony export lessThan */
/* unused harmony export lessOrEqual */
/* unused harmony export greaterThan */
/* unused harmony export greaterOrEqual */
/* harmony export (immutable) */ __webpack_exports__["g"] = equalsRecords;
/* harmony export (immutable) */ __webpack_exports__["d"] = compareRecords;
/* unused harmony export equalsUnions */
/* harmony export (immutable) */ __webpack_exports__["e"] = compareUnions;
/* unused harmony export createDisposable */
/* unused harmony export createAtom */
/* unused harmony export createObj */
/* unused harmony export toPlainJsObj */
/* unused harmony export jsOptions */
/* unused harmony export round */
/* unused harmony export sign */
/* unused harmony export randomNext */
/* unused harmony export applyOperator */
/* unused harmony export unescapeDataString */
/* unused harmony export escapeDataString */
/* unused harmony export escapeUriString */
/* unused harmony export clear */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_weak_map__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_weak_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_weak_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_array_from__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_json_stringify__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_object_assign__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_get_own_property_names__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_get_own_property_names___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_get_own_property_names__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Date__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Symbol__ = __webpack_require__(17);
















var NonDeclaredType = function () {
    function NonDeclaredType(kind, definition, generics) {
        __WEBPACK_IMPORTED_MODULE_12_babel_runtime_helpers_classCallCheck___default()(this, NonDeclaredType);

        this.kind = kind;
        this.definition = definition;
        this.generics = generics;
    }

    __WEBPACK_IMPORTED_MODULE_13_babel_runtime_helpers_createClass___default()(NonDeclaredType, [{
        key: "Equals",
        value: function Equals(other) {
            if (this.kind === other.kind && this.definition === other.definition) {
                return __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(this.generics) === "object"
                // equalsRecords should also work for Type[] (tuples)
                ? equalsRecords(this.generics, other.generics) : this.generics === other.generics;
            }
            return false;
        }
    }]);

    return NonDeclaredType;
}();
var Any = new NonDeclaredType("Any");
var Unit = new NonDeclaredType("Unit");
function Option(t) {
    return new NonDeclaredType("Option", null, [t]);
}
function FableArray(t) {
    var isTypedArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var def = null;
    var genArg = null;
    if (isTypedArray) {
        def = t;
    } else {
        genArg = t;
    }
    return new NonDeclaredType("Array", def, [genArg]);
}

function Tuple(types) {
    return new NonDeclaredType("Tuple", null, types);
}
function FableFunction(types) {
    return new NonDeclaredType("Function", null, types);
}

function GenericParam(definition) {
    return new NonDeclaredType("GenericParam", definition);
}
function Interface(definition) {
    return new NonDeclaredType("Interface", definition);
}
function makeGeneric(typeDef, genArgs) {
    return new NonDeclaredType("GenericType", typeDef, genArgs);
}
function isGeneric(typ) {
    return typ instanceof NonDeclaredType && typ.kind === "GenericType";
}
/**
 * Returns the parent if this is a declared generic type or the argument otherwise.
 * Attention: Unlike .NET this doesn't throw an exception if type is not generic.
 */
function getDefinition(typ) {
    return isGeneric(typ) ? typ.definition : typ;
}
function extendInfo(cons, info) {
    var parent = __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default()(cons.prototype);
    if (typeof parent[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection] === "function") {
        var newInfo = {};
        var parentInfo = parent[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection]();
        __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_get_own_property_names___default()(info).forEach(function (k) {
            var i = info[k];
            if ((typeof i === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(i)) === "object") {
                newInfo[k] = Array.isArray(i) ? (parentInfo[k] || []).concat(i) : __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_object_assign___default()(parentInfo[k] || {}, i);
            } else {
                newInfo[k] = i;
            }
        });
        return newInfo;
    }
    return info;
}
function hasInterface(obj, interfaceName) {
    if (interfaceName === "System.Collections.Generic.IEnumerable") {
        return typeof obj[__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_symbol_iterator___default.a] === "function";
    } else if (typeof obj[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection] === "function") {
        var interfaces = obj[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection]().interfaces;
        return Array.isArray(interfaces) && interfaces.indexOf(interfaceName) > -1;
    }
    return false;
}
/**
 * Returns:
 * - Records: array with names of fields
 * - Classes: array with names of getters
 * - Nulls and unions: empty array
 * - JS Objects: The result of calling Object.getOwnPropertyNames
 */
function getPropertyNames(obj) {
    if (obj == null) {
        return [];
    }
    var propertyMap = typeof obj[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection] === "function" ? obj[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection]().properties || [] : obj;
    return __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_get_own_property_names___default()(propertyMap);
}
function isArray(obj) {
    return Array.isArray(obj) || ArrayBuffer.isView(obj);
}
function toString(obj) {
    var quoteStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    function isObject(x) {
        return x !== null && (typeof x === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(x)) === "object" && !(x instanceof Number) && !(x instanceof String) && !(x instanceof Boolean);
    }
    if (obj == null || typeof obj === "number") {
        return String(obj);
    }
    if (typeof obj === "string") {
        return quoteStrings ? __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_json_stringify___default()(obj) : obj;
    }
    if (obj instanceof Date) {
        return Object(__WEBPACK_IMPORTED_MODULE_14__Date__["b" /* toString */])(obj);
    }
    if (typeof obj.ToString === "function") {
        return obj.ToString();
    }
    if (hasInterface(obj, "FSharpUnion")) {
        var info = obj[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection]();
        var uci = info.cases[obj.tag];
        switch (uci.length) {
            case 1:
                return uci[0];
            case 2:
                // For simplicity let's always use parens, in .NET they're ommitted in some cases
                return uci[0] + " (" + toString(obj.data, true) + ")";
            default:
                return uci[0] + " (" + obj.data.map(function (x) {
                    return toString(x, true);
                }).join(",") + ")";
        }
    }
    try {
        return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_json_stringify___default()(obj, function (k, v) {
            return v && v[__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_symbol_iterator___default.a] && !Array.isArray(v) && isObject(v) ? __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_array_from___default()(v) : v && typeof v.ToString === "function" ? toString(v) : v;
        });
    } catch (err) {
        // Fallback for objects with circular references
        return "{" + __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_get_own_property_names___default()(obj).map(function (k) {
            return k + ": " + String(obj[k]);
        }).join(", ") + "}";
    }
}
var ObjectRef = function () {
    function ObjectRef() {
        __WEBPACK_IMPORTED_MODULE_12_babel_runtime_helpers_classCallCheck___default()(this, ObjectRef);
    }

    __WEBPACK_IMPORTED_MODULE_13_babel_runtime_helpers_createClass___default()(ObjectRef, null, [{
        key: "id",
        value: function id(o) {
            if (!ObjectRef.idMap.has(o)) {
                ObjectRef.idMap.set(o, ++ObjectRef.count);
            }
            return ObjectRef.idMap.get(o);
        }
    }]);

    return ObjectRef;
}();
ObjectRef.idMap = new __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_weak_map___default.a();
ObjectRef.count = 0;
function getHashCode(x) {
    return ObjectRef.id(x) * 2654435761 | 0;
}
function hash(x) {
    if ((typeof x === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(x)) === __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(1)) {
        return x * 2654435761 | 0;
    }
    if (x != null && typeof x.GetHashCode === "function") {
        return x.GetHashCode();
    } else {
        var s = toString(x);
        var h = 5381;
        var i = 0;
        var len = s.length;
        while (i < len) {
            h = h * 33 ^ s.charCodeAt(i++);
        }
        return h;
    }
}
function equals(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return true;
    } else if (x == null) {
        return y == null;
    } else if (y == null) {
        return false;
    } else if ((typeof x === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(x)) !== "object" || (typeof y === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(y)) !== "object") {
        return x === y;
        // Equals override or IEquatable implementation
    } else if (typeof x.Equals === "function") {
        return x.Equals(y);
    } else if (typeof y.Equals === "function") {
        return y.Equals(x);
    } else if (__WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default()(x) !== __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default()(y)) {
        return false;
    } else if (Array.isArray(x)) {
        if (x.length !== y.length) {
            return false;
        }
        for (var i = 0; i < x.length; i++) {
            if (!equals(x[i], y[i])) {
                return false;
            }
        }
        return true;
    } else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength) {
            return false;
        }
        var dv1 = new DataView(x.buffer);
        var dv2 = new DataView(y.buffer);
        for (var _i = 0; _i < x.byteLength; _i++) {
            if (dv1.getUint8(_i) !== dv2.getUint8(_i)) {
                return false;
            }
        }
        return true;
    } else if (x instanceof Date) {
        return x.getTime() === y.getTime();
    } else {
        return false;
    }
}
function comparePrimitives(x, y) {
    return x === y ? 0 : x < y ? -1 : 1;
}
function compare(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return 0;
    } else if (x == null) {
        return y == null ? 0 : -1;
    } else if (y == null) {
        return 1; // everything is bigger than null
    } else if ((typeof x === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(x)) !== "object" || (typeof y === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(y)) !== "object") {
        return x === y ? 0 : x < y ? -1 : 1;
        // Some types (see Long.ts) may just implement the function and not the interface
        // else if (hasInterface(x, "System.IComparable"))
    } else if (typeof x.CompareTo === "function") {
        return x.CompareTo(y);
    } else if (typeof y.CompareTo === "function") {
        return y.CompareTo(x) * -1;
    } else if (__WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default()(x) !== __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default()(y)) {
        return -1;
    } else if (Array.isArray(x)) {
        if (x.length !== y.length) {
            return x.length < y.length ? -1 : 1;
        }
        for (var i = 0, j = 0; i < x.length; i++) {
            j = compare(x[i], y[i]);
            if (j !== 0) {
                return j;
            }
        }
        return 0;
    } else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength) {
            return x.byteLength < y.byteLength ? -1 : 1;
        }
        var dv1 = new DataView(x.buffer);
        var dv2 = new DataView(y.buffer);
        for (var _i2 = 0, b1 = 0, b2 = 0; _i2 < x.byteLength; _i2++) {
            b1 = dv1.getUint8(_i2), b2 = dv2.getUint8(_i2);
            if (b1 < b2) {
                return -1;
            }
            if (b1 > b2) {
                return 1;
            }
        }
        return 0;
    } else if (x instanceof Date) {
        return Object(__WEBPACK_IMPORTED_MODULE_14__Date__["a" /* compare */])(x, y);
    } else if ((typeof x === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(x)) === "object") {
        var xhash = hash(x);
        var yhash = hash(y);
        if (xhash === yhash) {
            return equals(x, y) ? 0 : -1;
        } else {
            return xhash < yhash ? -1 : 1;
        }
    } else {
        return x < y ? -1 : 1;
    }
}
function lessThan(x, y) {
    return compare(x, y) < 0;
}
function lessOrEqual(x, y) {
    return compare(x, y) <= 0;
}
function greaterThan(x, y) {
    return compare(x, y) > 0;
}
function greaterOrEqual(x, y) {
    return compare(x, y) >= 0;
}
function equalsRecords(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return true;
    } else {
        var keys = getPropertyNames(x);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator___default()(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (!equals(x[key], y[key])) {
                    return false;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return true;
    }
}
function compareRecords(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return 0;
    } else {
        var keys = getPropertyNames(x);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator___default()(keys), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var key = _step2.value;

                var res = compare(x[key], y[key]);
                if (res !== 0) {
                    return res;
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return 0;
    }
}
function equalsUnions(x, y) {
    return x === y || x.tag === y.tag && equals(x.data, y.data);
}
function compareUnions(x, y) {
    if (x === y) {
        return 0;
    } else {
        var res = x.tag < y.tag ? -1 : x.tag > y.tag ? 1 : 0;
        return res !== 0 ? res : compare(x.data, y.data);
    }
}
function createDisposable(f) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({
        Dispose: f
    }, __WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection, function () {
        return { interfaces: ["System.IDisposable"] };
    });
}
// tslint forbids non-arrow functions, but it's
// necessary here to use the arguments object
/* tslint:disable */
function createAtom(value) {
    var atom = value;
    return function () {
        return arguments.length === 0 ? atom : (atom = arguments[0], void 0);
    };
}
/* tslint:enable */
var CaseRules = {
    None: 0,
    LowerFirst: 1
};
function isList(o) {
    if (o != null) {
        if (typeof o[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection] === "function") {
            return o[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection]().type === "Microsoft.FSharp.Collections.FSharpList";
        }
    }
    return false;
}
function createObj(fields) {
    var caseRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CaseRules.None;
    var casesCache = arguments[2];

    var iter = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator___default()(fields);
    var cur = iter.next();
    var o = {};
    while (!cur.done) {
        var value = cur.value;
        if (Array.isArray(value)) {
            o[value[0]] = value[1];
        } else {
            casesCache = casesCache || new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a();
            var proto = __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default()(value);
            var cases = casesCache.get(proto);
            if (cases == null) {
                if (typeof proto[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection] === "function") {
                    cases = proto[__WEBPACK_IMPORTED_MODULE_15__Symbol__["a" /* default */].reflection]().cases;
                    casesCache.set(proto, cases);
                }
            }
            var caseInfo = cases != null ? cases[value.tag] : null;
            if (Array.isArray(caseInfo)) {
                var key = caseInfo[0];
                if (caseRule === CaseRules.LowerFirst) {
                    key = key[0].toLowerCase() + key.substr(1);
                }
                o[key] = caseInfo.length === 1 ? true : isList(value.data) ? createObj(value.data, caseRule, casesCache) : value.data;
            } else {
                throw new Error("Cannot infer key and value of " + value);
            }
        }
        cur = iter.next();
    }
    return o;
}
function toPlainJsObj(source) {
    if (source != null && source.constructor !== Object) {
        var target = {};
        var props = __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_get_own_property_names___default()(source);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator___default()(props), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _p = _step3.value;

                target[_p] = source[_p];
            }
            // Copy also properties from prototype, see #192
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        var proto = __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default()(source);
        if (proto != null) {
            props = __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_get_own_property_names___default()(proto);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_get_iterator___default()(props), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var p = _step4.value;

                    var prop = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(proto, p);
                    if (prop.value) {
                        target[p] = prop.value;
                    } else if (prop.get) {
                        target[p] = prop.get.apply(source);
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
        return target;
    } else {
        return source;
    }
}
function jsOptions(mutator) {
    var opts = {};
    mutator(opts);
    return opts;
}
function round(value) {
    var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var m = Math.pow(10, digits);
    var n = +(digits ? value * m : value).toFixed(8);
    var i = Math.floor(n);
    var f = n - i;
    var e = 1e-8;
    var r = f > 0.5 - e && f < 0.5 + e ? i % 2 === 0 ? i : i + 1 : Math.round(n);
    return digits ? r / m : r;
}
function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}
function randomNext(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function applyOperator(x, y, operator) {
    function getMethod(obj) {
        if ((typeof obj === "undefined" ? "undefined" : __WEBPACK_IMPORTED_MODULE_11_babel_runtime_helpers_typeof___default()(obj)) === "object") {
            var cons = __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_get_prototype_of___default()(obj).constructor;
            if (typeof cons[operator] === "function") {
                return cons[operator];
            }
        }
        return null;
    }
    var meth = getMethod(x);
    if (meth != null) {
        return meth(x, y);
    }
    meth = getMethod(y);
    if (meth != null) {
        return meth(x, y);
    }
    switch (operator) {
        case "op_Addition":
            return x + y;
        case "op_Subtraction":
            return x - y;
        case "op_Multiply":
            return x * y;
        case "op_Division":
            return x / y;
        case "op_Modulus":
            return x % y;
        case "op_LeftShift":
            return x << y;
        case "op_RightShift":
            return x >> y;
        case "op_BitwiseAnd":
            return x & y;
        case "op_BitwiseOr":
            return x | y;
        case "op_ExclusiveOr":
            return x ^ y;
        case "op_LogicalNot":
            return x + y;
        case "op_UnaryNegation":
            return !x;
        case "op_BooleanAnd":
            return x && y;
        case "op_BooleanOr":
            return x || y;
        default:
            return null;
    }
}
function unescapeDataString(s) {
    // https://stackoverflow.com/a/4458580/524236
    return decodeURIComponent(s.replace(/\+/g, "%20"));
}
function escapeDataString(s) {
    return encodeURIComponent(s).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
}
function escapeUriString(s) {
    return encodeURI(s);
}
// ICollection.Clear method can be called on IDictionary
// too so we need to make a runtime check (see #1120)
function clear(col) {
    if (Array.isArray(col)) {
        col.splice(0);
    } else {
        col.clear();
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(64);
var toPrimitive = __webpack_require__(45);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Enumerator */
/* unused harmony export getEnumerator */
/* unused harmony export toIterator */
/* harmony export (immutable) */ __webpack_exports__["k"] = toList;
/* unused harmony export ofList */
/* unused harmony export ofArray */
/* harmony export (immutable) */ __webpack_exports__["a"] = append;
/* unused harmony export average */
/* unused harmony export averageBy */
/* unused harmony export concat */
/* harmony export (immutable) */ __webpack_exports__["b"] = collect;
/* unused harmony export choose */
/* harmony export (immutable) */ __webpack_exports__["c"] = compareWith;
/* harmony export (immutable) */ __webpack_exports__["d"] = delay;
/* harmony export (immutable) */ __webpack_exports__["e"] = empty;
/* unused harmony export enumerateWhile */
/* unused harmony export enumerateThenFinally */
/* unused harmony export enumerateUsing */
/* unused harmony export exactlyOne */
/* unused harmony export except */
/* unused harmony export exists */
/* unused harmony export exists2 */
/* unused harmony export filter */
/* unused harmony export where */
/* harmony export (immutable) */ __webpack_exports__["f"] = fold;
/* harmony export (immutable) */ __webpack_exports__["g"] = foldBack;
/* unused harmony export fold2 */
/* unused harmony export foldBack2 */
/* unused harmony export forAll */
/* unused harmony export forAll2 */
/* unused harmony export tryHead */
/* unused harmony export head */
/* unused harmony export initialize */
/* unused harmony export initializeInfinite */
/* unused harmony export tryItem */
/* unused harmony export item */
/* unused harmony export iterate */
/* unused harmony export iterate2 */
/* unused harmony export iterateIndexed */
/* unused harmony export iterateIndexed2 */
/* unused harmony export isEmpty */
/* unused harmony export tryLast */
/* unused harmony export last */
/* unused harmony export count */
/* harmony export (immutable) */ __webpack_exports__["h"] = map;
/* unused harmony export mapIndexed */
/* unused harmony export indexed */
/* unused harmony export map2 */
/* unused harmony export mapIndexed2 */
/* unused harmony export map3 */
/* unused harmony export chunkBySize */
/* unused harmony export mapFold */
/* unused harmony export mapFoldBack */
/* unused harmony export max */
/* unused harmony export maxBy */
/* unused harmony export min */
/* unused harmony export minBy */
/* unused harmony export pairwise */
/* unused harmony export permute */
/* unused harmony export rangeStep */
/* unused harmony export rangeChar */
/* unused harmony export range */
/* unused harmony export readOnly */
/* unused harmony export reduce */
/* unused harmony export reduceBack */
/* unused harmony export replicate */
/* unused harmony export reverse */
/* unused harmony export scan */
/* unused harmony export scanBack */
/* harmony export (immutable) */ __webpack_exports__["j"] = singleton;
/* unused harmony export skip */
/* unused harmony export skipWhile */
/* unused harmony export sortWith */
/* unused harmony export sum */
/* unused harmony export sumBy */
/* unused harmony export tail */
/* unused harmony export take */
/* unused harmony export truncate */
/* unused harmony export takeWhile */
/* harmony export (immutable) */ __webpack_exports__["l"] = tryFind;
/* unused harmony export find */
/* unused harmony export tryFindBack */
/* unused harmony export findBack */
/* unused harmony export tryFindIndex */
/* unused harmony export findIndex */
/* unused harmony export tryFindIndexBack */
/* unused harmony export findIndexBack */
/* harmony export (immutable) */ __webpack_exports__["m"] = tryPick;
/* harmony export (immutable) */ __webpack_exports__["i"] = pick;
/* unused harmony export unfold */
/* unused harmony export zip */
/* unused harmony export zip3 */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Array__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ListClass__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Option__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Util__ = __webpack_require__(4);












var Enumerator = function () {
    function Enumerator(iter) {
        __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, Enumerator);

        this.iter = iter;
    }

    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(Enumerator, [{
        key: "MoveNext",
        value: function MoveNext() {
            var cur = this.iter.next();
            this.current = cur.value;
            return !cur.done;
        }
    }, {
        key: "Reset",
        value: function Reset() {
            throw new Error("JS iterators cannot be reset");
        }
    }, {
        key: "Dispose",
        value: function Dispose() {
            return;
        }
    }, {
        key: "Current",
        get: function get() {
            return this.current;
        }
    }, {
        key: "get_Current",
        get: function get() {
            return this.current;
        }
    }]);

    return Enumerator;
}();
function getEnumerator(o) {
    return typeof o.GetEnumerator === "function" ? o.GetEnumerator() : new Enumerator(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(o));
}
function toIterator(en) {
    return {
        next: function next() {
            return en.MoveNext() ? { done: false, value: en.Current } : { done: true, value: null };
        }
    };
}
function __failIfNone(res) {
    if (res == null) {
        throw new Error("Seq did not contain any matching element");
    }
    return Object(__WEBPACK_IMPORTED_MODULE_9__Option__["b" /* getValue */])(res);
}
function toList(xs) {
    return foldBack(function (x, acc) {
        return new __WEBPACK_IMPORTED_MODULE_8__ListClass__["a" /* default */](x, acc);
    }, xs, new __WEBPACK_IMPORTED_MODULE_8__ListClass__["a" /* default */]());
}
function ofList(xs) {
    return delay(function () {
        return unfold(function (x) {
            return x.tail != null ? [x.head, x.tail] : null;
        }, xs);
    });
}
function ofArray(xs) {
    return delay(function () {
        return unfold(function (i) {
            return i < xs.length ? [xs[i], i + 1] : null;
        }, 0);
    });
}
function append(xs, ys) {
    return delay(function () {
        var firstDone = false;
        var i = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        var iters = [i, null];
        return unfold(function () {
            var cur = void 0;
            if (!firstDone) {
                cur = iters[0].next();
                if (!cur.done) {
                    return [cur.value, iters];
                } else {
                    firstDone = true;
                    iters = [null, __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(ys)];
                }
            }
            cur = iters[1].next();
            return !cur.done ? [cur.value, iters] : null;
        }, iters);
    });
}
function average(xs) {
    var count = 1;
    var sum = reduce(function (acc, x) {
        count++;
        return acc + x;
    }, xs);
    return sum / count;
}
function averageBy(f, xs) {
    var count = 1;
    var sum = reduce(function (acc, x) {
        count++;
        return (count === 2 ? f(acc) : acc) + f(x);
    }, xs);
    return sum / count;
}
function concat(xs) {
    return delay(function () {
        var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        var output = { value: null };
        return unfold(function (innerIter) {
            var hasFinished = false;
            while (!hasFinished) {
                if (innerIter == null) {
                    var cur = iter.next();
                    if (!cur.done) {
                        innerIter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(cur.value);
                    } else {
                        hasFinished = true;
                    }
                } else {
                    var _cur = innerIter.next();
                    if (!_cur.done) {
                        output = { value: _cur.value };
                        hasFinished = true;
                    } else {
                        innerIter = null;
                    }
                }
            }
            return innerIter != null && output != null ? [output.value, innerIter] : null;
        }, null);
    });
}
function collect(f, xs) {
    return concat(map(f, xs));
}
function choose(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            while (!cur.done) {
                var y = f(cur.value);
                if (y != null) {
                    return [Object(__WEBPACK_IMPORTED_MODULE_9__Option__["b" /* getValue */])(y), iter];
                }
                cur = iter.next();
            }
            return null;
        }, __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs));
    });
}
function compareWith(f, xs, ys) {
    var nonZero = tryFind(function (i) {
        return i !== 0;
    }, map2(function (x, y) {
        return f(x, y);
    }, xs, ys));
    return nonZero != null ? Object(__WEBPACK_IMPORTED_MODULE_9__Option__["b" /* getValue */])(nonZero) : count(xs) - count(ys);
}
function delay(f) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator___default.a, function () {
        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(f());
    });
}
function empty() {
    return unfold(function () {
        return void 0;
    });
}
function enumerateWhile(cond, xs) {
    return concat(unfold(function () {
        return cond() ? [xs, true] : null;
    }));
}
function enumerateThenFinally(xs, finalFn) {
    return delay(function () {
        var iter = void 0;
        try {
            iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        } catch (err) {
            return void 0;
        } finally {
            finalFn();
        }
        return unfold(function (it) {
            try {
                var cur = it.next();
                return !cur.done ? [cur.value, it] : null;
            } catch (err) {
                return void 0;
            } finally {
                finalFn();
            }
        }, iter);
    });
}
function enumerateUsing(disp, work) {
    var isDisposed = false;
    var disposeOnce = function disposeOnce() {
        if (!isDisposed) {
            isDisposed = true;
            disp.Dispose();
        }
    };
    try {
        return enumerateThenFinally(work(disp), disposeOnce);
    } catch (err) {
        return void 0;
    } finally {
        disposeOnce();
    }
}
function exactlyOne(xs) {
    var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
    var fst = iter.next();
    if (fst.done) {
        throw new Error("Seq was empty");
    }
    var snd = iter.next();
    if (!snd.done) {
        throw new Error("Seq had multiple items");
    }
    return fst.value;
}
function except(itemsToExclude, source) {
    var exclusionItems = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(itemsToExclude);
    var testIsNotInExclusionItems = function testIsNotInExclusionItems(element) {
        return !exclusionItems.some(function (excludedItem) {
            return Object(__WEBPACK_IMPORTED_MODULE_10__Util__["f" /* equals */])(excludedItem, element);
        });
    };
    return filter(testIsNotInExclusionItems, source);
}
function exists(f, xs) {
    var cur = void 0;
    for (var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);;) {
        cur = iter.next();
        if (cur.done) {
            break;
        }
        if (f(cur.value)) {
            return true;
        }
    }
    return false;
}
function exists2(f, xs, ys) {
    var cur1 = void 0;
    var cur2 = void 0;
    for (var iter1 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs), iter2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(ys);;) {
        cur1 = iter1.next();
        cur2 = iter2.next();
        if (cur1.done || cur2.done) {
            break;
        }
        if (f(cur1.value, cur2.value)) {
            return true;
        }
    }
    return false;
}
function filter(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            while (!cur.done) {
                if (f(cur.value)) {
                    return [cur.value, iter];
                }
                cur = iter.next();
            }
            return null;
        }, __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs));
    });
}
function where(f, xs) {
    return filter(f, xs);
}
function fold(f, acc, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f, acc);
    } else {
        var cur = void 0;
        for (var i = 0, iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);; i++) {
            cur = iter.next();
            if (cur.done) {
                break;
            }
            acc = f(acc, cur.value, i);
        }
        return acc;
    }
}
function foldBack(f, xs, acc) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs);
    for (var i = arr.length - 1; i >= 0; i--) {
        acc = f(arr[i], acc, i);
    }
    return acc;
}
function fold2(f, acc, xs, ys) {
    var iter1 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
    var iter2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(ys);
    var cur1 = void 0;
    var cur2 = void 0;
    for (var i = 0;; i++) {
        cur1 = iter1.next();
        cur2 = iter2.next();
        if (cur1.done || cur2.done) {
            break;
        }
        acc = f(acc, cur1.value, cur2.value, i);
    }
    return acc;
}
function foldBack2(f, xs, ys, acc) {
    var ar1 = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs);
    var ar2 = Array.isArray(ys) || ArrayBuffer.isView(ys) ? ys : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(ys);
    for (var i = ar1.length - 1; i >= 0; i--) {
        acc = f(ar1[i], ar2[i], acc, i);
    }
    return acc;
}
function forAll(f, xs) {
    return fold(function (acc, x) {
        return acc && f(x);
    }, true, xs);
}
function forAll2(f, xs, ys) {
    return fold2(function (acc, x, y) {
        return acc && f(x, y);
    }, true, xs, ys);
}
function tryHead(xs) {
    var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
    var cur = iter.next();
    return cur.done ? null : Object(__WEBPACK_IMPORTED_MODULE_9__Option__["c" /* makeSome */])(cur.value);
}
function head(xs) {
    return __failIfNone(tryHead(xs));
}
function initialize(n, f) {
    return delay(function () {
        return unfold(function (i) {
            return i < n ? [f(i), i + 1] : null;
        }, 0);
    });
}
function initializeInfinite(f) {
    return delay(function () {
        return unfold(function (i) {
            return [f(i), i + 1];
        }, 0);
    });
}
function tryItem(i, xs) {
    if (i < 0) {
        return null;
    }
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return i < xs.length ? Object(__WEBPACK_IMPORTED_MODULE_9__Option__["c" /* makeSome */])(xs[i]) : null;
    }
    for (var j = 0, iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);; j++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        if (j === i) {
            return Object(__WEBPACK_IMPORTED_MODULE_9__Option__["c" /* makeSome */])(cur.value);
        }
    }
    return null;
}
function item(i, xs) {
    return __failIfNone(tryItem(i, xs));
}
function iterate(f, xs) {
    fold(function (_, x) {
        return f(x);
    }, null, xs);
}
function iterate2(f, xs, ys) {
    fold2(function (_, x, y) {
        return f(x, y);
    }, null, xs, ys);
}
function iterateIndexed(f, xs) {
    fold(function (_, x, i) {
        return f(i, x);
    }, null, xs);
}
function iterateIndexed2(f, xs, ys) {
    fold2(function (_, x, y, i) {
        return f(i, x, y);
    }, null, xs, ys);
}
function isEmpty(xs) {
    var i = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
    return i.next().done;
}
function tryLast(xs) {
    try {
        return Object(__WEBPACK_IMPORTED_MODULE_9__Option__["c" /* makeSome */])(reduce(function (_, x) {
            return x;
        }, xs));
    } catch (err) {
        return null;
    }
}
function last(xs) {
    return __failIfNone(tryLast(xs));
}
// A export function 'length' method causes problems in JavaScript -- https://github.com/Microsoft/TypeScript/issues/442
function count(xs) {
    return Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.length : fold(function (acc, x) {
        return acc + 1;
    }, 0, xs);
}
function map(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            return !cur.done ? [f(cur.value), iter] : null;
        }, __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs));
    });
}
function mapIndexed(f, xs) {
    return delay(function () {
        var i = 0;
        return unfold(function (iter) {
            var cur = iter.next();
            return !cur.done ? [f(i++, cur.value), iter] : null;
        }, __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs));
    });
}
function indexed(xs) {
    return mapIndexed(function (i, x) {
        return [i, x];
    }, xs);
}
function map2(f, xs, ys) {
    return delay(function () {
        var iter1 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        var iter2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(ys);
        return unfold(function () {
            var cur1 = iter1.next();
            var cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
        });
    });
}
function mapIndexed2(f, xs, ys) {
    return delay(function () {
        var i = 0;
        var iter1 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        var iter2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(ys);
        return unfold(function () {
            var cur1 = iter1.next();
            var cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(i++, cur1.value, cur2.value), null] : null;
        });
    });
}
function map3(f, xs, ys, zs) {
    return delay(function () {
        var iter1 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        var iter2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(ys);
        var iter3 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(zs);
        return unfold(function () {
            var cur1 = iter1.next();
            var cur2 = iter2.next();
            var cur3 = iter3.next();
            return !cur1.done && !cur2.done && !cur3.done ? [f(cur1.value, cur2.value, cur3.value), null] : null;
        });
    });
}
function chunkBySize(size, xs) {
    var result = Object(__WEBPACK_IMPORTED_MODULE_7__Array__["a" /* chunkBySize */])(size, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs));
    return ofArray(result);
}
function mapFold(f, acc, xs, transform) {
    var result = [];
    var r = void 0;
    var cur = void 0;
    for (var i = 0, iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);; i++) {
        cur = iter.next();
        if (cur.done) {
            break;
        }

        var _f = f(acc, cur.value);

        var _f2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_f, 2);

        r = _f2[0];
        acc = _f2[1];

        result.push(r);
    }
    return transform !== void 0 ? [transform(result), acc] : [result, acc];
}
function mapFoldBack(f, xs, acc, transform) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs);
    var result = [];
    var r = void 0;
    for (var i = arr.length - 1; i >= 0; i--) {
        var _f3 = f(arr[i], acc);

        var _f4 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_f3, 2);

        r = _f4[0];
        acc = _f4[1];

        result.push(r);
    }
    return transform !== void 0 ? [transform(result), acc] : [result, acc];
}
function max(xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_10__Util__["c" /* compare */])(acc, x) === 1 ? acc : x;
    }, xs);
}
function maxBy(f, xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_10__Util__["c" /* compare */])(f(acc), f(x)) === 1 ? acc : x;
    }, xs);
}
function min(xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_10__Util__["c" /* compare */])(acc, x) === -1 ? acc : x;
    }, xs);
}
function minBy(f, xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_10__Util__["c" /* compare */])(f(acc), f(x)) === -1 ? acc : x;
    }, xs);
}
function pairwise(xs) {
    return skip(2, scan(function (last, next) {
        return [last[1], next];
    }, [0, 0], xs));
}
function permute(f, xs) {
    return ofArray(Object(__WEBPACK_IMPORTED_MODULE_7__Array__["b" /* permute */])(f, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs)));
}
function rangeStep(first, step, last) {
    if (step === 0) {
        throw new Error("Step cannot be 0");
    }
    return delay(function () {
        return unfold(function (x) {
            return step > 0 && x <= last || step < 0 && x >= last ? [x, x + step] : null;
        }, first);
    });
}
function rangeChar(first, last) {
    return delay(function () {
        return unfold(function (x) {
            return x <= last ? [x, String.fromCharCode(x.charCodeAt(0) + 1)] : null;
        }, first);
    });
}
function range(first, last) {
    return rangeStep(first, 1, last);
}
function readOnly(xs) {
    return map(function (x) {
        return x;
    }, xs);
}
function reduce(f, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f);
    }
    var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
    var cur = iter.next();
    if (cur.done) {
        throw new Error("Seq was empty");
    }
    var acc = cur.value;
    while (true) {
        cur = iter.next();
        if (cur.done) {
            break;
        }
        acc = f(acc, cur.value);
    }
    return acc;
}
function reduceBack(f, xs) {
    var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs);
    if (ar.length === 0) {
        throw new Error("Seq was empty");
    }
    var acc = ar[ar.length - 1];
    for (var i = ar.length - 2; i >= 0; i--) {
        acc = f(ar[i], acc, i);
    }
    return acc;
}
function replicate(n, x) {
    return initialize(n, function () {
        return x;
    });
}
function reverse(xs) {
    var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs);
    return ofArray(ar.reverse());
}
function scan(f, seed, xs) {
    return delay(function () {
        var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        return unfold(function (acc) {
            if (acc == null) {
                return [seed, seed];
            }
            var cur = iter.next();
            if (!cur.done) {
                acc = f(acc, cur.value);
                return [acc, acc];
            }
            return void 0;
        }, null);
    });
}
function scanBack(f, xs, seed) {
    return reverse(scan(function (acc, x) {
        return f(x, acc);
    }, seed, reverse(xs)));
}
function singleton(y) {
    return unfold(function (x) {
        return x != null ? [x, null] : null;
    }, y);
}
function skip(n, xs) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator___default.a, function () {
        var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        for (var i = 1; i <= n; i++) {
            if (iter.next().done) {
                throw new Error("Seq has not enough elements");
            }
        }
        return iter;
    });
}
function skipWhile(f, xs) {
    return delay(function () {
        var hasPassed = false;
        return filter(function (x) {
            return hasPassed || (hasPassed = !f(x));
        }, xs);
    });
}
function sortWith(f, xs) {
    var ys = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs);
    return ofArray(ys.sort(f));
}
function sum(xs) {
    return fold(function (acc, x) {
        return acc + x;
    }, 0, xs);
}
function sumBy(f, xs) {
    return fold(function (acc, x) {
        return acc + f(x);
    }, 0, xs);
}
function tail(xs) {
    var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
    var cur = iter.next();
    if (cur.done) {
        throw new Error("Seq was empty");
    }
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator___default.a, function () {
        return iter;
    });
}
function take(n, xs) {
    var truncate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return delay(function () {
        var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        return unfold(function (i) {
            if (i < n) {
                var cur = iter.next();
                if (!cur.done) {
                    return [cur.value, i + 1];
                }
                if (!truncate) {
                    throw new Error("Seq has not enough elements");
                }
            }
            return void 0;
        }, 0);
    });
}
function truncate(n, xs) {
    return take(n, xs, true);
}
function takeWhile(f, xs) {
    return delay(function () {
        var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
        return unfold(function (i) {
            var cur = iter.next();
            if (!cur.done && f(cur.value)) {
                return [cur.value, null];
            }
            return void 0;
        }, 0);
    });
}
function tryFind(f, xs, defaultValue) {
    for (var i = 0, iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);; i++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        if (f(cur.value, i)) {
            return Object(__WEBPACK_IMPORTED_MODULE_9__Option__["c" /* makeSome */])(cur.value);
        }
    }
    return defaultValue === void 0 ? null : Object(__WEBPACK_IMPORTED_MODULE_9__Option__["c" /* makeSome */])(defaultValue);
}
function find(f, xs) {
    return __failIfNone(tryFind(f, xs));
}
function tryFindBack(f, xs, defaultValue) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs);
    return tryFind(f, arr.reverse(), defaultValue);
}
function findBack(f, xs) {
    return __failIfNone(tryFindBack(f, xs));
}
function tryFindIndex(f, xs) {
    for (var i = 0, iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);; i++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        if (f(cur.value, i)) {
            return i;
        }
    }
    return null;
}
function findIndex(f, xs) {
    return __failIfNone(tryFindIndex(f, xs));
}
function tryFindIndexBack(f, xs) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(xs);
    for (var i = arr.length - 1; i >= 0; i--) {
        if (f(arr[i], i)) {
            return i;
        }
    }
    return null;
}
function findIndexBack(f, xs) {
    return __failIfNone(tryFindIndexBack(f, xs));
}
function tryPick(f, xs) {
    for (var i = 0, iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);; i++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        var y = f(cur.value, i);
        if (y != null) {
            return y;
        }
    }
    return null;
}
function pick(f, xs) {
    return __failIfNone(tryPick(f, xs));
}
function unfold(f, fst) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol_iterator___default.a, function () {
        // Capture a copy of the first value in the closure
        // so the sequence is restarted every time, see #1230
        var acc = fst;
        return {
            next: function next() {
                var res = f(acc);
                if (res != null) {
                    acc = res[1];
                    return { done: false, value: res[0] };
                }
                return { done: true };
            }
        };
    });
}
function zip(xs, ys) {
    return map2(function (x, y) {
        return [x, y];
    }, xs, ys);
}
function zip3(xs, ys, zs) {
    return map3(function (x, y, z) {
        return [x, y, z];
    }, xs, ys, zs);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(24);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(25);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(63);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setType;
/* unused harmony export getType */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__);


var types = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a();
function setType(fullName, cons) {
    types.set(fullName, cons);
}
function getType(fullName) {
    return types.get(fullName);
}
/* harmony default export */ __webpack_exports__["a"] = ({
    reflection: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default()("reflection")
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(51);
var defined = __webpack_require__(47);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(98)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(48)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(20);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(10);
var call = __webpack_require__(68);
var isArrayIter = __webpack_require__(69);
var anObject = __webpack_require__(8);
var toLength = __webpack_require__(35);
var getIterFn = __webpack_require__(55);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(47);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(36)('meta');
var isObject = __webpack_require__(6);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = ofArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Symbol__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Util__ = __webpack_require__(4);








// This module is split from List.ts to prevent cyclic dependencies
function ofArray(args, base) {
    var acc = base || new List();
    for (var i = args.length - 1; i >= 0; i--) {
        acc = new List(args[i], acc);
    }
    return acc;
}

var List = function () {
    function List(head, tail) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, List);

        this.head = head;
        this.tail = tail;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(List, [{
        key: "ToString",
        value: function ToString() {
            return "[" + __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(this).map(function (x) {
                return Object(__WEBPACK_IMPORTED_MODULE_5__Util__["h" /* toString */])(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            // Optimization if they are referencially equal
            if (this === other) {
                return true;
            } else {
                var cur1 = this;
                var cur2 = other;
                while (Object(__WEBPACK_IMPORTED_MODULE_5__Util__["f" /* equals */])(cur1.head, cur2.head)) {
                    cur1 = cur1.tail;
                    cur2 = cur2.tail;
                    if (cur1 == null) {
                        return cur2 == null;
                    }
                }
                return false;
            }
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            // Optimization if they are referencially equal
            if (this === other) {
                return 0;
            } else {
                var cur1 = this;
                var cur2 = other;
                var res = Object(__WEBPACK_IMPORTED_MODULE_5__Util__["c" /* compare */])(cur1.head, cur2.head);
                while (res === 0) {
                    cur1 = cur1.tail;
                    cur2 = cur2.tail;
                    if (cur1 == null) {
                        return cur2 == null ? 0 : -1;
                    }
                    res = Object(__WEBPACK_IMPORTED_MODULE_5__Util__["c" /* compare */])(cur1.head, cur2.head);
                }
                return res;
            }
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator___default.a,
        value: function value() {
            var cur = this;
            return {
                next: function next() {
                    var tmp = cur;
                    cur = cur.tail;
                    return { done: tmp.tail == null, value: tmp.head };
                }
            };
        }
        //   append(ys: List<T>): List<T> {
        //     return append(this, ys);
        //   }
        //   choose<U>(f: (x: T) => U, xs: List<T>): List<U> {
        //     return choose(f, this);
        //   }
        //   collect<U>(f: (x: T) => List<U>): List<U> {
        //     return collect(f, this);
        //   }
        //   filter(f: (x: T) => boolean): List<T> {
        //     return filter(f, this);
        //   }
        //   where(f: (x: T) => boolean): List<T> {
        //     return filter(f, this);
        //   }
        //   map<U>(f: (x: T) => U): List<U> {
        //     return map(f, this);
        //   }
        //   mapIndexed<U>(f: (i: number, x: T) => U): List<U> {
        //     return mapIndexed(f, this);
        //   }
        //   partition(f: (x: T) => boolean): [List<T>, List<T>] {
        //     return partition(f, this) as [List<T>, List<T>];
        //   }
        //   reverse(): List<T> {
        //     return reverse(this);
        //   }
        //   slice(lower: number, upper: number): List<T> {
        //     return slice(lower, upper, this);
        //   }

    }, {
        key: __WEBPACK_IMPORTED_MODULE_4__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpList",
                interfaces: ["System.IEquatable", "System.IComparable"]
            };
        }
    }, {
        key: "length",
        get: function get() {
            var cur = this;
            var acc = 0;
            while (cur.tail != null) {
                cur = cur.tail;
                acc++;
            }
            return acc;
        }
    }]);

    return List;
}();

/* harmony default export */ __webpack_exports__["a"] = (List);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Some */
/* harmony export (immutable) */ __webpack_exports__["c"] = makeSome;
/* harmony export (immutable) */ __webpack_exports__["b"] = getValue;
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultArg;
/* unused harmony export defaultArgWith */
/* unused harmony export filter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util__ = __webpack_require__(4);



var Some = function () {
    function Some(value) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Some);

        this.value = value;
    }
    // We don't prefix it with "Some" for consistency with erased options


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Some, [{
        key: "ToString",
        value: function ToString() {
            return Object(__WEBPACK_IMPORTED_MODULE_2__Util__["h" /* toString */])(this.value);
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            if (other == null) {
                return false;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_2__Util__["f" /* equals */])(this.value, other instanceof Some ? other.value : other);
            }
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            if (other == null) {
                return 1;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_2__Util__["c" /* compare */])(this.value, other instanceof Some ? other.value : other);
            }
        }
    }]);

    return Some;
}();
function makeSome(x) {
    return x == null || x instanceof Some ? new Some(x) : x;
}
function getValue(x, acceptNull) {
    if (x == null) {
        if (!acceptNull) {
            throw new Error("Option has no value");
        }
        return null;
    } else {
        return x instanceof Some ? x.value : x;
    }
}
function defaultArg(arg, defaultValue, f) {
    return arg == null ? defaultValue : f != null ? f(getValue(arg)) : getValue(arg);
}
function defaultArgWith(arg, defThunk) {
    return arg == null ? defThunk() : getValue(arg);
}
function filter(predicate, arg) {
    return arg != null ? !predicate(getValue(arg)) ? null : arg : arg;
}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(65);
var enumBugKeys = __webpack_require__(54);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(46);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(26);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {



/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(11);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(63);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(49);
var hide = __webpack_require__(11);
var has = __webpack_require__(14);
var Iterators = __webpack_require__(20);
var $iterCreate = __webpack_require__(99);
var setToStringTag = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(67);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(100);
var enumBugKeys = __webpack_require__(54);
var IE_PROTO = __webpack_require__(52)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(44)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(66).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(26);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(53)('keys');
var uid = __webpack_require__(36);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(37);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(20);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(24);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(33);
var wksExt = __webpack_require__(57);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(10);
var IObject = __webpack_require__(51);
var toObject = __webpack_require__(28);
var toLength = __webpack_require__(35);
var asc = __webpack_require__(123);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export append */
/* unused harmony export choose */
/* unused harmony export collect */
/* unused harmony export concat */
/* unused harmony export filter */
/* unused harmony export where */
/* unused harmony export initialize */
/* harmony export (immutable) */ __webpack_exports__["b"] = map;
/* unused harmony export mapIndexed */
/* unused harmony export indexed */
/* unused harmony export partition */
/* unused harmony export replicate */
/* harmony export (immutable) */ __webpack_exports__["d"] = reverse;
/* unused harmony export singleton */
/* unused harmony export slice */
/* unused harmony export unzip */
/* unused harmony export unzip3 */
/* unused harmony export groupBy */
/* unused harmony export splitAt */
/* unused harmony export head */
/* unused harmony export tail */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListClass__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Map__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Option__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Seq__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__ListClass__["b"]; });








/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]);

function append(xs, ys) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc);
    }, ys, reverse(xs));
}
function choose(f, xs) {
    var r = Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        var y = f(x);
        return y != null ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_2__Option__["b" /* getValue */])(y), acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
    return reverse(r);
}
function collect(f, xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return append(acc, f(x));
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
}
// TODO: should be xs: Iterable<List<T>>
function concat(xs) {
    return collect(function (x) {
        return x;
    }, xs);
}
function filter(f, xs) {
    return reverse(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return f(x) ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function where(f, xs) {
    return filter(f, xs);
}
function initialize(n, f) {
    if (n < 0) {
        throw new Error("List length must be non-negative");
    }
    var xs = new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]();
    for (var i = 1; i <= n; i++) {
        xs = new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(n - i), xs);
    }
    return xs;
}
function map(f, xs) {
    return reverse(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(x), acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function mapIndexed(f, xs) {
    return reverse(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x, i) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(i, x), acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function indexed(xs) {
    return mapIndexed(function (i, x) {
        return [i, x];
    }, xs);
}
function partition(f, xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        var lacc = acc[0];
        var racc = acc[1];
        return f(x) ? [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, lacc), racc] : [lacc, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, racc)];
    }, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()], reverse(xs));
}
function replicate(n, x) {
    return initialize(n, function () {
        return x;
    });
}
function reverse(xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
}
function singleton(x) {
    return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]());
}
function slice(lower, upper, xs) {
    var noLower = lower == null;
    var noUpper = upper == null;
    return reverse(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x, i) {
        return (noLower || lower <= i) && (noUpper || i <= upper) ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
/* ToDo: instance unzip() */
function unzip(xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["g" /* foldBack */])(function (xy, acc) {
        return [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xy[0], acc[0]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xy[1], acc[1])];
    }, xs, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()]);
}
/* ToDo: instance unzip3() */
function unzip3(xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["g" /* foldBack */])(function (xyz, acc) {
        return [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[0], acc[0]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[1], acc[1]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[2], acc[2])];
    }, xs, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()]);
}
function groupBy(f, xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["k" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["h" /* map */])(function (k) {
        return [k[0], Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["k" /* toList */])(k[1])];
    }, Object(__WEBPACK_IMPORTED_MODULE_1__Map__["a" /* groupBy */])(f, xs)));
}
function splitAt(index, xs) {
    if (index < 0) {
        throw new Error("The input must be non-negative.");
    }
    var i = 0;
    var last = xs;
    var first = new Array(index);
    while (i < index) {
        if (last.tail == null) {
            throw new Error("The input sequence has an insufficient number of elements.");
        }
        first[i] = last.head;
        last = last.tail;
        i++;
    }
    return [Object(__WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* ofArray */])(first), last];
}
function head(xs) {
    if (xs.head !== undefined) {
        return xs.head;
    } else {
        throw new Error("The input list was empty.");
    }
}
function tail(xs) {
    if (xs.tail !== undefined) {
        return xs.tail;
    } else {
        throw new Error("The input list was empty.");
    }
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(12);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(44)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(18);
var arrayIndexOf = __webpack_require__(101)(false);
var IE_PROTO = __webpack_require__(52)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(28);
var IE_PROTO = __webpack_require__(52)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(20);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(8);
var aFunction = __webpack_require__(24);
var SPECIES = __webpack_require__(1)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(10);
var invoke = __webpack_require__(111);
var html = __webpack_require__(66);
var cel = __webpack_require__(44);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(26)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var isObject = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(56);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(9);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(26);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(18);
var gOPN = __webpack_require__(80).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(65);
var hiddenKeys = __webpack_require__(54).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(41);
var createDesc = __webpack_require__(25);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(45);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(64);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(3);
var meta = __webpack_require__(29);
var fails = __webpack_require__(12);
var hide = __webpack_require__(11);
var redefineAll = __webpack_require__(40);
var forOf = __webpack_require__(22);
var anInstance = __webpack_require__(39);
var isObject = __webpack_require__(6);
var setToStringTag = __webpack_require__(27);
var dP = __webpack_require__(5).f;
var each = __webpack_require__(60)(0);
var DESCRIPTORS = __webpack_require__(9);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);
var aFunction = __webpack_require__(24);
var ctx = __webpack_require__(10);
var forOf = __webpack_require__(22);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(41);
var toObject = __webpack_require__(28);
var IObject = __webpack_require__(51);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export offsetRegex */
/* unused harmony export padWithZeros */
/* unused harmony export offsetToString */
/* unused harmony export toHalfUTCString */
/* unused harmony export toStringWithOffset */
/* unused harmony export toStringWithKind */
/* harmony export (immutable) */ __webpack_exports__["b"] = toString;
/* unused harmony export default */
/* unused harmony export minValue */
/* unused harmony export maxValue */
/* unused harmony export parseRaw */
/* unused harmony export parse */
/* unused harmony export tryParse */
/* unused harmony export offset */
/* unused harmony export create */
/* unused harmony export now */
/* unused harmony export utcNow */
/* unused harmony export today */
/* unused harmony export isLeapYear */
/* unused harmony export daysInMonth */
/* unused harmony export toUniversalTime */
/* unused harmony export toLocalTime */
/* unused harmony export timeOfDay */
/* unused harmony export date */
/* unused harmony export day */
/* unused harmony export hour */
/* unused harmony export millisecond */
/* unused harmony export minute */
/* unused harmony export month */
/* unused harmony export second */
/* unused harmony export year */
/* unused harmony export dayOfWeek */
/* unused harmony export dayOfYear */
/* unused harmony export add */
/* unused harmony export addDays */
/* unused harmony export addHours */
/* unused harmony export addMinutes */
/* unused harmony export addSeconds */
/* unused harmony export addMilliseconds */
/* unused harmony export addYears */
/* unused harmony export addMonths */
/* unused harmony export subtract */
/* unused harmony export toLongDateString */
/* unused harmony export toShortDateString */
/* unused harmony export toLongTimeString */
/* unused harmony export toShortTimeString */
/* unused harmony export equals */
/* harmony export (immutable) */ __webpack_exports__["a"] = compare;
/* unused harmony export compareTo */
/* unused harmony export op_Addition */
/* unused harmony export op_Subtraction */
/* unused harmony export isDaylightSavingTime */
var offsetRegex = /(?:Z|[+-](\d{2}):?(\d{2})?)$/;
function padWithZeros(i, length) {
    var str = i.toString(10);
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}
function offsetToString(offset) {
    var isMinus = offset < 0;
    offset = Math.abs(offset);
    var hours = ~~(offset / 3600000);
    var minutes = offset % 3600000 / 60000;
    return (isMinus ? "-" : "+") + padWithZeros(hours, 2) + ":" + padWithZeros(minutes, 2);
}
function toHalfUTCString(date, half) {
    var str = date.toISOString();
    return half === "first" ? str.substring(0, str.indexOf("T")) : str.substring(str.indexOf("T") + 1, str.length - 1);
}
function toISOString(d, utc) {
    if (utc) {
        return d.toISOString();
    } else {
        // JS Date is always local
        var printOffset = d.kind == null ? true : d.kind === 2 /* Local */;
        return padWithZeros(d.getFullYear(), 4) + "-" + padWithZeros(d.getMonth() + 1, 2) + "-" + padWithZeros(d.getDate(), 2) + "T" + padWithZeros(d.getHours(), 2) + ":" + padWithZeros(d.getMinutes(), 2) + ":" + padWithZeros(d.getSeconds(), 2) + "." + padWithZeros(d.getMilliseconds(), 3) + (printOffset ? offsetToString(d.getTimezoneOffset() * -60000) : "");
    }
}
function toISOStringWithOffset(dateWithOffset, offset) {
    var str = dateWithOffset.toISOString();
    return str.substring(0, str.length - 1) + offsetToString(offset);
}
function toStringWithCustomFormat(date, format, utc) {
    return format.replace(/(\w)\1*/g, function (match) {
        var rep = match;
        switch (match.substring(0, 1)) {
            case "y":
                var y = utc ? date.getUTCFullYear() : date.getFullYear();
                rep = match.length < 4 ? y % 100 : y;
                break;
            case "M":
                rep = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
                break;
            case "d":
                rep = utc ? date.getUTCDate() : date.getDate();
                break;
            case "H":
                rep = utc ? date.getUTCHours() : date.getHours();
                break;
            case "h":
                var h = utc ? date.getUTCHours() : date.getHours();
                rep = h > 12 ? h % 12 : h;
                break;
            case "m":
                rep = utc ? date.getUTCMinutes() : date.getMinutes();
                break;
            case "s":
                rep = utc ? date.getUTCSeconds() : date.getSeconds();
                break;
        }
        if (rep !== match && rep < 10 && match.length > 1) {
            rep = "0" + rep;
        }
        return rep;
    });
}
function toStringWithOffset(date, format) {
    var d = new Date(date.getTime() + date.offset);
    if (!format) {
        return d.toISOString().replace(/\.\d+/, "").replace(/[A-Z]|\.\d+/g, " ") + offsetToString(date.offset);
    } else if (format.length === 1) {
        switch (format) {
            case "D":
            case "d":
                return toHalfUTCString(d, "first");
            case "T":
            case "t":
                return toHalfUTCString(d, "second");
            case "O":
            case "o":
                return toISOStringWithOffset(d, date.offset);
            default:
                throw new Error("Unrecognized Date print format");
        }
    } else {
        return toStringWithCustomFormat(d, format, true);
    }
}
function toStringWithKind(date, format) {
    var utc = date.kind === 1 /* UTC */;
    if (!format) {
        return utc ? date.toUTCString() : date.toLocaleString();
    } else if (format.length === 1) {
        switch (format) {
            case "D":
            case "d":
                return utc ? toHalfUTCString(date, "first") : date.toLocaleDateString();
            case "T":
            case "t":
                return utc ? toHalfUTCString(date, "second") : date.toLocaleTimeString();
            case "O":
            case "o":
                return toISOString(date, utc);
            default:
                throw new Error("Unrecognized Date print format");
        }
    } else {
        return toStringWithCustomFormat(date, format, utc);
    }
}
function toString(date, format) {
    return date.offset != null ? toStringWithOffset(date, format) : toStringWithKind(date, format);
}
function DateTime(value, kind) {
    kind = kind == null ? 0 /* Unspecified */ : kind;
    var d = new Date(value);
    d.kind = kind | 0;
    return d;
}
function minValue() {
    // This is "0001-01-01T00:00:00.000Z", actual JS min value is -8640000000000000
    return DateTime(-62135596800000, 0 /* Unspecified */);
}
function maxValue() {
    // This is "9999-12-31T23:59:59.999Z", actual JS max value is 8640000000000000
    return DateTime(253402300799999, 0 /* Unspecified */);
}
function parseRaw(str) {
    var date = new Date(str);
    if (isNaN(date.getTime())) {
        // Check if this is a time-only string, which JS Date parsing cannot handle (see #1045)
        if (/^(?:[01]?\d|2[0-3]):(?:[0-5]?\d)(?::[0-5]?\d(?:\.\d+)?)?(?:\s*[AaPp][Mm])?$/.test(str)) {
            var d = new Date();
            date = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + str);
        } else {
            throw new Error("The string is not a valid Date.");
        }
    }
    return date;
}
function parse(str) {
    var detectUTC = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var date = parseRaw(str);
    var offset = offsetRegex.exec(str);
    // .NET always parses DateTime as Local if there's offset info (even "Z")
    // Newtonsoft.Json uses UTC if the offset is "Z"
    var kind = offset != null ? detectUTC && offset[0] === "Z" ? 1 /* UTC */ : 2 /* Local */ : 0 /* Unspecified */;
    return DateTime(date.getTime(), kind);
}
function tryParse(v) {
    try {
        return [true, parse(v)];
    } catch (_err) {
        return [false, minValue()];
    }
}
function offset(date) {
    var date1 = date;
    return typeof date1.offset === "number" ? date1.offset : date.kind === 1 /* UTC */
    ? 0 : date.getTimezoneOffset() * -60000;
}
function create(year, month, day) {
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var ms = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var kind = arguments[7];

    var dateValue = kind === 1 /* UTC */
    ? Date.UTC(year, month - 1, day, h, m, s, ms) : new Date(year, month - 1, day, h, m, s, ms).getTime();
    if (isNaN(dateValue)) {
        throw new Error("The parameters describe an unrepresentable Date.");
    }
    var date = DateTime(dateValue, kind);
    if (year <= 99) {
        date.setFullYear(year, month - 1, day);
    }
    return date;
}
function now() {
    return DateTime(Date.now(), 2 /* Local */);
}
function utcNow() {
    return DateTime(Date.now(), 1 /* UTC */);
}
function today() {
    return date(now());
}
function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function daysInMonth(year, month) {
    return month === 2 ? isLeapYear(year) ? 29 : 28 : month >= 8 ? month % 2 === 0 ? 31 : 30 : month % 2 === 0 ? 30 : 31;
}
function toUniversalTime(date) {
    return date.kind === 1 /* UTC */ ? date : DateTime(date.getTime(), 1 /* UTC */);
}
function toLocalTime(date) {
    return date.kind === 2 /* Local */ ? date : DateTime(date.getTime(), 2 /* Local */);
}
function timeOfDay(d) {
    return hour(d) * 3600000 + minute(d) * 60000 + second(d) * 1000 + millisecond(d);
}
function date(d) {
    return create(year(d), month(d), day(d), 0, 0, 0, 0, d.kind);
}
function day(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCDate() : d.getDate();
}
function hour(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCHours() : d.getHours();
}
function millisecond(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCMilliseconds() : d.getMilliseconds();
}
function minute(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCMinutes() : d.getMinutes();
}
function month(d) {
    return (d.kind === 1 /* UTC */ ? d.getUTCMonth() : d.getMonth()) + 1;
}
function second(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCSeconds() : d.getSeconds();
}
function year(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCFullYear() : d.getFullYear();
}
function dayOfWeek(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCDay() : d.getDay();
}
function dayOfYear(d) {
    var _year = year(d);
    var _month = month(d);
    var _day = day(d);
    for (var i = 1; i < _month; i++) {
        _day += daysInMonth(_year, i);
    }
    return _day;
}
function add(d, ts) {
    return DateTime(d.getTime() + ts, d.kind);
}
function addDays(d, v) {
    return DateTime(d.getTime() + v * 86400000, d.kind);
}
function addHours(d, v) {
    return DateTime(d.getTime() + v * 3600000, d.kind);
}
function addMinutes(d, v) {
    return DateTime(d.getTime() + v * 60000, d.kind);
}
function addSeconds(d, v) {
    return DateTime(d.getTime() + v * 1000, d.kind);
}
function addMilliseconds(d, v) {
    return DateTime(d.getTime() + v, d.kind);
}
function addYears(d, v) {
    var newMonth = month(d);
    var newYear = year(d) + v;
    var _daysInMonth = daysInMonth(newYear, newMonth);
    var newDay = Math.min(_daysInMonth, day(d));
    return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
}
function addMonths(d, v) {
    var newMonth = month(d) + v;
    var newMonth_ = 0;
    var yearOffset = 0;
    if (newMonth > 12) {
        newMonth_ = newMonth % 12;
        yearOffset = Math.floor(newMonth / 12);
        newMonth = newMonth_;
    } else if (newMonth < 1) {
        newMonth_ = 12 + newMonth % 12;
        yearOffset = Math.floor(newMonth / 12) + (newMonth_ === 12 ? -1 : 0);
        newMonth = newMonth_;
    }
    var newYear = year(d) + yearOffset;
    var _daysInMonth = daysInMonth(newYear, newMonth);
    var newDay = Math.min(_daysInMonth, day(d));
    return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
}
function subtract(d, that) {
    return typeof that === "number" ? DateTime(d.getTime() - that, d.kind) : d.getTime() - that.getTime();
}
function toLongDateString(d) {
    return d.toDateString();
}
function toShortDateString(d) {
    return d.toLocaleDateString();
}
function toLongTimeString(d) {
    return d.toLocaleTimeString();
}
function toShortTimeString(d) {
    return d.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
}
function equals(d1, d2) {
    return d1.getTime() === d2.getTime();
}
function compare(x, y) {
    var xtime = x.getTime();
    var ytime = y.getTime();
    return xtime === ytime ? 0 : xtime < ytime ? -1 : 1;
}
var compareTo = compare;
function op_Addition(x, y) {
    return add(x, y);
}
function op_Subtraction(x, y) {
    return subtract(x, y);
}
function isDaylightSavingTime(x) {
    var jan = new Date(x.getFullYear(), 0, 1);
    var jul = new Date(x.getFullYear(), 6, 1);
    return isDST(jan.getTimezoneOffset(), jul.getTimezoneOffset(), x.getTimezoneOffset());
}
function isDST(janOffset, julOffset, tOffset) {
    return Math.min(janOffset, julOffset) === tOffset;
}

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = groupBy;
/* unused harmony export countBy */
/* unused harmony export MapTree */
/* unused harmony export create */
/* unused harmony export add */
/* unused harmony export remove */
/* unused harmony export containsValue */
/* unused harmony export tryGetValue */
/* unused harmony export exists */
/* unused harmony export find */
/* unused harmony export tryFind */
/* unused harmony export filter */
/* unused harmony export fold */
/* unused harmony export foldBack */
/* unused harmony export forAll */
/* unused harmony export isEmpty */
/* unused harmony export iterate */
/* unused harmony export map */
/* unused harmony export partition */
/* unused harmony export findKey */
/* unused harmony export tryFindKey */
/* unused harmony export pick */
/* unused harmony export tryPick */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Comparer__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ListClass__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Option__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Seq__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Symbol__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Util__ = __webpack_require__(4);


















// ----------------------------------------------
// These functions belong to Seq.ts but are
// implemented here to prevent cyclic dependencies
function groupBy(f, xs) {
    var keys = [];
    var iter = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(xs);
    var acc = create();
    var cur = iter.next();
    while (!cur.done) {
        var k = f(cur.value);
        var vs = tryFind(k, acc);
        if (vs == null) {
            keys.push(k);
            acc = add(k, [cur.value], acc);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_7__Option__["b" /* getValue */])(vs).push(cur.value);
        }
        cur = iter.next();
    }
    return keys.map(function (k) {
        return [k, acc.get(k)];
    });
}
function countBy(f, xs) {
    return groupBy(f, xs).map(function (kv) {
        return [kv[0], kv[1].length];
    });
}
var MapTree = function MapTree(tag, data) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, MapTree);

    this.tag = tag | 0;
    this.data = data;
};
function tree_sizeAux(acc, m) {
    sizeAux: while (true) {
        if (m.tag === 1) {
            return acc + 1 | 0;
        } else if (m.tag === 2) {
            acc = tree_sizeAux(acc + 1, m.data[2]);
            m = m.data[3];
            continue sizeAux;
        } else {
            return acc | 0;
        }
    }
}
function tree_size(x) {
    return tree_sizeAux(0, x);
}
function tree_empty() {
    return new MapTree(0);
}
function tree_height(_arg1) {
    return _arg1.tag === 1 ? 1 : _arg1.tag === 2 ? _arg1.data[4] : 0;
}
function tree_isEmpty(m) {
    return m.tag === 0 ? true : false;
}
function tree_mk(l, k, v, r) {
    var matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
    switch (matchValue) {
        case 0:
            return new MapTree(1, [k, v]);
        case 1:
            var hl = tree_height(l) | 0;
            var hr = tree_height(r) | 0;
            var m = (hl < hr ? hr : hl) | 0;
            return new MapTree(2, [k, v, l, r, m + 1]);
    }
    throw new Error("internal error: Map.tree_mk");
}
function tree_rebalance(t1, k, v, t2) {
    var t1h = tree_height(t1);
    var t2h = tree_height(t2);
    if (t2h > t1h + 2) {
        if (t2.tag === 2) {
            if (tree_height(t2.data[2]) > t1h + 1) {
                if (t2.data[2].tag === 2) {
                    return tree_mk(tree_mk(t1, k, v, t2.data[2].data[2]), t2.data[2].data[0], t2.data[2].data[1], tree_mk(t2.data[2].data[3], t2.data[0], t2.data[1], t2.data[3]));
                } else {
                    throw new Error("rebalance");
                }
            } else {
                return tree_mk(tree_mk(t1, k, v, t2.data[2]), t2.data[0], t2.data[1], t2.data[3]);
            }
        } else {
            throw new Error("rebalance");
        }
    } else {
        if (t1h > t2h + 2) {
            if (t1.tag === 2) {
                if (tree_height(t1.data[3]) > t2h + 1) {
                    if (t1.data[3].tag === 2) {
                        return tree_mk(tree_mk(t1.data[2], t1.data[0], t1.data[1], t1.data[3].data[2]), t1.data[3].data[0], t1.data[3].data[1], tree_mk(t1.data[3].data[3], k, v, t2));
                    } else {
                        throw new Error("rebalance");
                    }
                } else {
                    return tree_mk(t1.data[2], t1.data[0], t1.data[1], tree_mk(t1.data[3], k, v, t2));
                }
            } else {
                throw new Error("rebalance");
            }
        } else {
            return tree_mk(t1, k, v, t2);
        }
    }
}
function tree_add(comparer, k, v, m) {
    if (m.tag === 1) {
        var c = comparer.Compare(k, m.data[0]);
        if (c < 0) {
            return new MapTree(2, [k, v, new MapTree(0), m, 2]);
        } else if (c === 0) {
            return new MapTree(1, [k, v]);
        }
        return new MapTree(2, [k, v, m, new MapTree(0), 2]);
    } else if (m.tag === 2) {
        var _c = comparer.Compare(k, m.data[0]);
        if (_c < 0) {
            return tree_rebalance(tree_add(comparer, k, v, m.data[2]), m.data[0], m.data[1], m.data[3]);
        } else if (_c === 0) {
            return new MapTree(2, [k, v, m.data[2], m.data[3], m.data[4]]);
        }
        return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_add(comparer, k, v, m.data[3]));
    }
    return new MapTree(1, [k, v]);
}
function tree_find(comparer, k, m) {
    var res = tree_tryFind(comparer, k, m);
    if (res == null) {
        throw new Error("key not found: " + k);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_7__Option__["b" /* getValue */])(res);
}
function tree_tryFind(comparer, k, m) {
    tryFind: while (true) {
        if (m.tag === 1) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_7__Option__["c" /* makeSome */])(m.data[1]);
            } else {
                return null;
            }
        } else if (m.tag === 2) {
            var c_1 = comparer.Compare(k, m.data[0]) | 0;
            if (c_1 < 0) {
                comparer = comparer;
                k = k;
                m = m.data[2];
                continue tryFind;
            } else if (c_1 === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_7__Option__["c" /* makeSome */])(m.data[1]);
            } else {
                comparer = comparer;
                k = k;
                m = m.data[3];
                continue tryFind;
            }
        } else {
            return null;
        }
    }
}
function tree_partition1(comparer, f, k, v, acc1, acc2) {
    return f(k, v) ? [tree_add(comparer, k, v, acc1), acc2] : [acc1, tree_add(comparer, k, v, acc2)];
}
function tree_partitionAux(comparer, f, s, acc_0, acc_1) {
    var acc = [acc_0, acc_1];
    if (s.tag === 1) {
        return tree_partition1(comparer, f, s.data[0], s.data[1], acc[0], acc[1]);
    } else if (s.tag === 2) {
        var acc_2 = tree_partitionAux(comparer, f, s.data[3], acc[0], acc[1]);
        var acc_3 = tree_partition1(comparer, f, s.data[0], s.data[1], acc_2[0], acc_2[1]);
        return tree_partitionAux(comparer, f, s.data[2], acc_3[0], acc_3[1]);
    }
    return acc;
}
function tree_partition(comparer, f, s) {
    return tree_partitionAux(comparer, f, s, tree_empty(), tree_empty());
}
function tree_filter1(comparer, f, k, v, acc) {
    return f(k, v) ? tree_add(comparer, k, v, acc) : acc;
}
function tree_filterAux(comparer, f, s, acc) {
    return s.tag === 1 ? tree_filter1(comparer, f, s.data[0], s.data[1], acc) : s.tag === 2 ? tree_filterAux(comparer, f, s.data[3], tree_filter1(comparer, f, s.data[0], s.data[1], tree_filterAux(comparer, f, s.data[2], acc))) : acc;
}
function tree_filter(comparer, f, s) {
    return tree_filterAux(comparer, f, s, tree_empty());
}
function tree_spliceOutSuccessor(m) {
    if (m.tag === 1) {
        return [m.data[0], m.data[1], new MapTree(0)];
    } else if (m.tag === 2) {
        if (m.data[2].tag === 0) {
            return [m.data[0], m.data[1], m.data[3]];
        } else {
            var kvl = tree_spliceOutSuccessor(m.data[2]);
            return [kvl[0], kvl[1], tree_mk(kvl[2], m.data[0], m.data[1], m.data[3])];
        }
    }
    throw new Error("internal error: Map.spliceOutSuccessor");
}
function tree_remove(comparer, k, m) {
    if (m.tag === 1) {
        var c = comparer.Compare(k, m.data[0]);
        if (c === 0) {
            return new MapTree(0);
        } else {
            return m;
        }
    } else if (m.tag === 2) {
        var _c2 = comparer.Compare(k, m.data[0]);
        if (_c2 < 0) {
            return tree_rebalance(tree_remove(comparer, k, m.data[2]), m.data[0], m.data[1], m.data[3]);
        } else if (_c2 === 0) {
            if (m.data[2].tag === 0) {
                return m.data[3];
            } else {
                if (m.data[3].tag === 0) {
                    return m.data[2];
                } else {
                    var input = tree_spliceOutSuccessor(m.data[3]);
                    return tree_mk(m.data[2], input[0], input[1], input[2]);
                }
            }
        } else {
            return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_remove(comparer, k, m.data[3]));
        }
    } else {
        return tree_empty();
    }
}
function tree_mem(comparer, k, m) {
    mem: while (true) {
        if (m.tag === 1) {
            return comparer.Compare(k, m.data[0]) === 0;
        } else if (m.tag === 2) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c < 0) {
                comparer = comparer;
                k = k;
                m = m.data[2];
                continue mem;
            } else if (c === 0) {
                return true;
            } else {
                comparer = comparer;
                k = k;
                m = m.data[3];
                continue mem;
            }
        } else {
            return false;
        }
    }
}
function tree_iter(f, m) {
    if (m.tag === 1) {
        f(m.data[0], m.data[1]);
    } else if (m.tag === 2) {
        tree_iter(f, m.data[2]);
        f(m.data[0], m.data[1]);
        tree_iter(f, m.data[3]);
    }
}
function tree_tryPick(f, m) {
    if (m.tag === 1) {
        return f(m.data[0], m.data[1]);
    } else if (m.tag === 2) {
        var matchValue = tree_tryPick(f, m.data[2]);
        if (matchValue == null) {
            var matchValue_1 = f(m.data[0], m.data[1]);
            if (matchValue_1 == null) {
                return tree_tryPick(f, m.data[3]);
            } else {
                var res = matchValue_1;
                return res;
            }
        } else {
            return matchValue;
        }
    } else {
        return null;
    }
}
function tree_exists(f, m) {
    return m.tag === 1 ? f(m.data[0], m.data[1]) : m.tag === 2 ? (tree_exists(f, m.data[2]) ? true : f(m.data[0], m.data[1])) ? true : tree_exists(f, m.data[3]) : false;
}
function tree_forall(f, m) {
    return m.tag === 1 ? f(m.data[0], m.data[1]) : m.tag === 2 ? (tree_forall(f, m.data[2]) ? f(m.data[0], m.data[1]) : false) ? tree_forall(f, m.data[3]) : false : true;
}
function tree_mapi(f, m) {
    return m.tag === 1 ? new MapTree(1, [m.data[0], f(m.data[0], m.data[1])]) : m.tag === 2 ? new MapTree(2, [m.data[0], f(m.data[0], m.data[1]), tree_mapi(f, m.data[2]), tree_mapi(f, m.data[3]), m.data[4]]) : tree_empty();
}
function tree_foldBack(f, m, x) {
    return m.tag === 1 ? f(m.data[0], m.data[1], x) : m.tag === 2 ? tree_foldBack(f, m.data[2], f(m.data[0], m.data[1], tree_foldBack(f, m.data[3], x))) : x;
}
function tree_fold(f, x, m) {
    return m.tag === 1 ? f(x, m.data[0], m.data[1]) : m.tag === 2 ? tree_fold(f, f(tree_fold(f, x, m.data[2]), m.data[0], m.data[1]), m.data[3]) : x;
}
// function tree_foldFromTo(
//     comparer: IComparer<any>, lo: any, hi: any,
//     f: (k:any, v: any, acc: any) => any, m: MapTree, x: any): any {
//   if (m.tag === 1) {
//     var cLoKey = comparer.Compare(lo, m.data[0]);
//     var cKeyHi = comparer.Compare(m.data[0], hi);
//     var x_1 = (cLoKey <= 0 ? cKeyHi <= 0 : false) ? f(m.data[0], m.data[1], x) : x;
//     return x_1;
//   } else if (m.tag === 2) {
//     var cLoKey = comparer.Compare(lo, m.data[0]);
//     var cKeyHi = comparer.Compare(m.data[0], hi);
//     var x_1 = cLoKey < 0 ? tree_foldFromTo(comparer, lo, hi, f, m.data[2], x) : x;
//     var x_2 = (cLoKey <= 0 ? cKeyHi <= 0 : false) ? f(m.data[0], m.data[1], x_1) : x_1;
//     var x_3 = cKeyHi < 0 ? tree_foldFromTo(comparer, lo, hi, f, m.data[3], x_2) : x_2;
//     return x_3;
//   }
//   return x;
// }
// function tree_foldSection(
//     comparer: IComparer<any>, lo: any, hi: any,
//     f: (k: any, v: any, acc: any) => any, m: MapTree, x: any) {
//   return comparer.Compare(lo, hi) === 1 ? x : tree_foldFromTo(comparer, lo, hi, f, m, x);
// }
// function tree_loop(m: MapTree, acc: any): List<[any,any]> {
//   return m.tag === 1
//     ? new List([m.data[0], m.data[1]], acc)
//     : m.tag === 2
//       ? tree_loop(m.data[2], new List([m.data[0], m.data[1]], tree_loop(m.data[3], acc)))
//       : acc;
// }
// function tree_toList(m: MapTree) {
//   return tree_loop(m, new List());
// }
// function tree_toArray(m: MapTree) {
//   return Array.from(tree_toList(m));
// }
// function tree_ofList(comparer: IComparer<any>, l: List<[any,any]>) {
//   return Seq.fold((acc: MapTree, tupledArg: [any, any]) => {
//     return tree_add(comparer, tupledArg[0], tupledArg[1], acc);
//   }, tree_empty(), l);
// }
function tree_mkFromEnumerator(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add(comparer, cur.value[0], cur.value[1], acc);
        cur = e.next();
    }
    return acc;
}
// function tree_ofArray(comparer: IComparer<any>, arr: ArrayLike<[any,any]>) {
//   var res = tree_empty();
//   for (var i = 0; i <= arr.length - 1; i++) {
//     res = tree_add(comparer, arr[i][0], arr[i][1], res);
//   }
//   return res;
// }
function tree_ofSeq(comparer, c) {
    var ie = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(c);
    return tree_mkFromEnumerator(comparer, tree_empty(), ie);
}
// function tree_copyToArray(s: MapTree, arr: ArrayLike<any>, i: number) {
//   tree_iter((x, y) => { arr[i++] = [x, y]; }, s);
// }
function tree_collapseLHS(stack) {
    if (stack.tail != null) {
        if (stack.head.tag === 1) {
            return stack;
        } else if (stack.head.tag === 2) {
            return tree_collapseLHS(Object(__WEBPACK_IMPORTED_MODULE_6__ListClass__["b" /* ofArray */])([stack.head.data[2], new MapTree(1, [stack.head.data[0], stack.head.data[1]]), stack.head.data[3]], stack.tail));
        } else {
            return tree_collapseLHS(stack.tail);
        }
    } else {
        return new __WEBPACK_IMPORTED_MODULE_6__ListClass__["a" /* default */]();
    }
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new __WEBPACK_IMPORTED_MODULE_6__ListClass__["a" /* default */](s, new __WEBPACK_IMPORTED_MODULE_6__ListClass__["a" /* default */]())), started: false };
}
function tree_moveNext(i) {
    function current(it) {
        if (it.stack.tail == null) {
            return null;
        } else if (it.stack.head.tag === 1) {
            return [it.stack.head.data[0], it.stack.head.data[1]];
        }
        throw new Error("Please report error: Map iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        } else {
            if (i.stack.head.tag === 1) {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            } else {
                throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
            }
        }
    } else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
}

var FableMap = function () {
    /** Do not call, use Map.create instead. */
    function FableMap() {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, FableMap);

        return;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(FableMap, [{
        key: "ToString",
        value: function ToString() {
            return "map [" + __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(this).map(function (x) {
                return Object(__WEBPACK_IMPORTED_MODULE_10__Util__["h" /* toString */])(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(m2) {
            return this.CompareTo(m2) === 0;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(m2) {
            var _this = this;

            return this === m2 ? 0 : Object(__WEBPACK_IMPORTED_MODULE_8__Seq__["c" /* compareWith */])(function (kvp1, kvp2) {
                var c = _this.comparer.Compare(kvp1[0], kvp2[0]);
                return c !== 0 ? c : Object(__WEBPACK_IMPORTED_MODULE_10__Util__["c" /* compare */])(kvp1[1], kvp2[1]);
            }, this, m2);
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator___default.a,
        value: function value() {
            var i = tree_mkIterator(this.tree);
            return {
                next: function next() {
                    return tree_moveNext(i);
                }
            };
        }
    }, {
        key: "entries",
        value: function entries() {
            return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(this);
        }
    }, {
        key: "keys",
        value: function keys() {
            return Object(__WEBPACK_IMPORTED_MODULE_8__Seq__["h" /* map */])(function (kv) {
                return kv[0];
            }, this);
        }
    }, {
        key: "values",
        value: function values() {
            return Object(__WEBPACK_IMPORTED_MODULE_8__Seq__["h" /* map */])(function (kv) {
                return kv[1];
            }, this);
        }
    }, {
        key: "get",
        value: function get(k) {
            return tree_find(this.comparer, k, this.tree);
        }
    }, {
        key: "has",
        value: function has(k) {
            return tree_mem(this.comparer, k, this.tree);
        }
        /** Mutating method */

    }, {
        key: "set",
        value: function set(k, v) {
            this.tree = tree_add(this.comparer, k, v, this.tree);
        }
        /** Mutating method */

    }, {
        key: "delete",
        value: function _delete(k) {
            // TODO: Is calculating the size twice is more performant than calling tree_mem?
            var oldSize = tree_size(this.tree);
            this.tree = tree_remove(this.comparer, k, this.tree);
            return oldSize > tree_size(this.tree);
        }
        /** Mutating method */

    }, {
        key: "clear",
        value: function clear() {
            this.tree = tree_empty();
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_9__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpMap",
                interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
            };
        }
    }, {
        key: "size",
        get: function get() {
            return tree_size(this.tree);
        }
    }]);

    return FableMap;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (FableMap);

function from(comparer, tree) {
    var map = new FableMap();
    map.tree = tree;
    map.comparer = comparer || new __WEBPACK_IMPORTED_MODULE_5__Comparer__["a" /* default */]();
    return map;
}
function create(ie, comparer) {
    comparer = comparer || new __WEBPACK_IMPORTED_MODULE_5__Comparer__["a" /* default */]();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
}
function add(k, v, map) {
    return from(map.comparer, tree_add(map.comparer, k, v, map.tree));
}
function remove(item, map) {
    return from(map.comparer, tree_remove(map.comparer, item, map.tree));
}
function containsValue(v, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_8__Seq__["f" /* fold */])(function (acc, k) {
        return acc || Object(__WEBPACK_IMPORTED_MODULE_10__Util__["f" /* equals */])(map.get(k), v);
    }, false, map.keys());
}
function tryGetValue(map, key, defaultValue) {
    return map.has(key) ? [true, map.get(key)] : [false, defaultValue];
}
function exists(f, map) {
    return tree_exists(f, map.tree);
}
function find(k, map) {
    return tree_find(map.comparer, k, map.tree);
}
function tryFind(k, map) {
    return tree_tryFind(map.comparer, k, map.tree);
}
function filter(f, map) {
    return from(map.comparer, tree_filter(map.comparer, f, map.tree));
}
function fold(f, seed, map) {
    return tree_fold(f, seed, map.tree);
}
function foldBack(f, map, seed) {
    return tree_foldBack(f, map.tree, seed);
}
function forAll(f, map) {
    return tree_forall(f, map.tree);
}
function isEmpty(map) {
    return tree_isEmpty(map.tree);
}
function iterate(f, map) {
    tree_iter(f, map.tree);
}
function map(f, map) {
    return from(map.comparer, tree_mapi(f, map.tree));
}
function partition(f, map) {
    var rs = tree_partition(map.comparer, f, map.tree);
    return [from(map.comparer, rs[0]), from(map.comparer, rs[1])];
}
function findKey(f, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_8__Seq__["i" /* pick */])(function (kv) {
        return f(kv[0], kv[1]) ? Object(__WEBPACK_IMPORTED_MODULE_7__Option__["c" /* makeSome */])(kv[0]) : null;
    }, map);
}
function tryFindKey(f, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_8__Seq__["m" /* tryPick */])(function (kv) {
        return f(kv[0], kv[1]) ? Object(__WEBPACK_IMPORTED_MODULE_7__Option__["c" /* makeSome */])(kv[0]) : null;
    }, map);
}
function pick(f, map) {
    var res = tryPick(f, map);
    if (res != null) {
        return Object(__WEBPACK_IMPORTED_MODULE_7__Option__["b" /* getValue */])(res);
    }
    throw new Error("key not found");
}
function tryPick(f, map) {
    return tree_tryPick(f, map.tree);
}

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export map */
/* unused harmony export mapIndexed */
/* unused harmony export indexed */
/* unused harmony export addRangeInPlace */
/* unused harmony export copyTo */
/* unused harmony export partition */
/* harmony export (immutable) */ __webpack_exports__["b"] = permute;
/* unused harmony export removeInPlace */
/* unused harmony export setSlice */
/* unused harmony export sortInPlaceBy */
/* unused harmony export unzip */
/* unused harmony export unzip3 */
/* harmony export (immutable) */ __webpack_exports__["a"] = chunkBySize;
/* unused harmony export getSubArray */
/* unused harmony export fill */
/* unused harmony export splitAt */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);

function map(f, source, TargetCons) {
    var target = new TargetCons(source.length);
    for (var i = 0; i < source.length; i++) {
        target[i] = f(source[i]);
    }
    return target;
}
function mapIndexed(f, source, TargetCons) {
    var target = new TargetCons(source.length);
    for (var i = 0; i < source.length; i++) {
        target[i] = f(i, source[i]);
    }
    return target;
}
function indexed(source) {
    return mapIndexed(function (i, x) {
        return [i, x];
    }, source, Array);
}
function addRangeInPlace(range, xs) {
    var iter = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(range);
    var cur = iter.next();
    while (!cur.done) {
        xs.push(cur.value);
        cur = iter.next();
    }
}
function copyTo(source, sourceIndex, target, targetIndex, count) {
    while (count--) {
        target[targetIndex++] = source[sourceIndex++];
    }
}
function partition(f, xs) {
    var ys = [];
    var zs = [];
    var j = 0;
    var k = 0;
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i])) {
            ys[j++] = xs[i];
        } else {
            zs[k++] = xs[i];
        }
    }
    return [ys, zs];
}
function permute(f, xs) {
    // Keep the type of the array
    var ys = xs.map(function () {
        return null;
    });
    var checkFlags = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        var j = f(i);
        if (j < 0 || j >= xs.length) {
            throw new Error("Not a valid permutation");
        }
        ys[j] = xs[i];
        checkFlags[j] = 1;
    }
    for (var _i = 0; _i < xs.length; _i++) {
        if (checkFlags[_i] !== 1) {
            throw new Error("Not a valid permutation");
        }
    }
    return ys;
}
function removeInPlace(item, xs) {
    var i = xs.indexOf(item);
    if (i > -1) {
        xs.splice(i, 1);
        return true;
    }
    return false;
}
function setSlice(target, lower, upper, source) {
    var length = (upper || target.length - 1) - lower;
    if (ArrayBuffer.isView(target) && source.length <= length) {
        target.set(source, lower);
    } else {
        for (var i = lower | 0, j = 0; j <= length; i++, j++) {
            target[i] = source[j];
        }
    }
}
function sortInPlaceBy(f, xs) {
    var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    return xs.sort(function (x, y) {
        x = f(x);
        y = f(y);
        return (x < y ? -1 : x === y ? 0 : 1) * dir;
    });
}
function unzip(xs) {
    var bs = new Array(xs.length);
    var cs = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        bs[i] = xs[i][0];
        cs[i] = xs[i][1];
    }
    return [bs, cs];
}
function unzip3(xs) {
    var bs = new Array(xs.length);
    var cs = new Array(xs.length);
    var ds = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        bs[i] = xs[i][0];
        cs[i] = xs[i][1];
        ds[i] = xs[i][2];
    }
    return [bs, cs, ds];
}
function chunkBySize(size, xs) {
    if (size < 1) {
        throw new Error("The input must be positive. parameter name: chunkSize");
    }
    if (xs.length === 0) {
        return [[]];
    }
    var result = [];
    // add each chunk to the result
    for (var x = 0; x < Math.ceil(xs.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(xs.slice(start, end));
    }
    return result;
}
function getSubArray(xs, startIndex, count) {
    return xs.slice(startIndex, startIndex + count);
}
function fill(target, targetIndex, count, value) {
    target.fill(value, targetIndex, targetIndex + count);
}
function splitAt(index, xs) {
    if (index < 0) {
        throw new Error("The input must be non-negative.");
    }
    if (index > xs.length) {
        throw new Error("The input sequence has an insufficient number of elements.");
    }
    return [xs.slice(0, index), xs.slice(index)];
}

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export compare */
/* unused harmony export compareTo */
/* unused harmony export startsWith */
/* unused harmony export indexOfAny */
/* harmony export (immutable) */ __webpack_exports__["d"] = printf;
/* unused harmony export toConsole */
/* unused harmony export toConsoleError */
/* harmony export (immutable) */ __webpack_exports__["g"] = toText;
/* unused harmony export toFail */
/* unused harmony export fsFormat */
/* unused harmony export format */
/* harmony export (immutable) */ __webpack_exports__["a"] = endsWith;
/* unused harmony export initialize */
/* unused harmony export insert */
/* harmony export (immutable) */ __webpack_exports__["b"] = isNullOrEmpty;
/* unused harmony export isNullOrWhiteSpace */
/* harmony export (immutable) */ __webpack_exports__["c"] = join;
/* unused harmony export validateGuid */
/* unused harmony export newGuid */
/* unused harmony export guidToArray */
/* unused harmony export arrayToGuid */
/* unused harmony export toBase64String */
/* unused harmony export fromBase64String */
/* unused harmony export padLeft */
/* unused harmony export padRight */
/* unused harmony export remove */
/* harmony export (immutable) */ __webpack_exports__["e"] = replace;
/* unused harmony export replicate */
/* unused harmony export getCharAtIndex */
/* harmony export (immutable) */ __webpack_exports__["f"] = split;
/* harmony export (immutable) */ __webpack_exports__["h"] = trim;
/* unused harmony export filter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Date__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__RegExp__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Util__ = __webpack_require__(4);





var fsFormatRegExp = /(^|[^%])%([0+ ]*)(-?\d+)?(?:\.(\d+))?(\w)/;
var formatRegExp = /\{(\d+)(,-?\d+)?(?:\:(.+?))?\}/g;
// From https://stackoverflow.com/a/13653180/3922220
var guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var StringComparison = {
    CurrentCulture: 0,
    CurrentCultureIgnoreCase: 1,
    InvariantCulture: 2,
    InvariantCultureIgnoreCase: 3,
    Ordinal: 4,
    OrdinalIgnoreCase: 5
};
function cmp(x, y, ic) {
    function isIgnoreCase(i) {
        return i === true || i === StringComparison.CurrentCultureIgnoreCase || i === StringComparison.InvariantCultureIgnoreCase || i === StringComparison.OrdinalIgnoreCase;
    }
    function isOrdinal(i) {
        return i === StringComparison.Ordinal || i === StringComparison.OrdinalIgnoreCase;
    }
    if (x == null) {
        return y == null ? 0 : -1;
    }
    if (y == null) {
        return 1;
    } // everything is bigger than null
    if (isOrdinal(ic)) {
        if (isIgnoreCase(ic)) {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }
        return x === y ? 0 : x < y ? -1 : 1;
    } else {
        if (isIgnoreCase(ic)) {
            x = x.toLocaleLowerCase();
            y = y.toLocaleLowerCase();
        }
        return x.localeCompare(y);
    }
}
function compare() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    switch (args.length) {
        case 2:
            return cmp(args[0], args[1], false);
        case 3:
            return cmp(args[0], args[1], args[2]);
        case 4:
            return cmp(args[0], args[1], args[2] === true);
        case 5:
            return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), false);
        case 6:
            return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5]);
        case 7:
            return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5] === true);
        default:
            throw new Error("String.compare: Unsupported number of parameters");
    }
}
function compareTo(x, y) {
    return cmp(x, y, false);
}
function startsWith(str, pattern, ic) {
    if (str.length >= pattern.length) {
        return cmp(str.substr(0, pattern.length), pattern, ic) === 0;
    }
    return false;
}
function indexOfAny(str, anyOf) {
    if (str == null || str === "") {
        return -1;
    }
    var startIndex = (arguments.length <= 2 ? 0 : arguments.length - 2) > 0 ? arguments.length <= 2 ? undefined : arguments[2] : 0;
    if (startIndex < 0) {
        throw new Error("String.indexOfAny: Start index cannot be negative");
    }
    var length = (arguments.length <= 2 ? 0 : arguments.length - 2) > 1 ? arguments.length <= 3 ? undefined : arguments[3] : str.length - startIndex;
    if (length < 0) {
        throw new Error("String.indexOfAny: Length cannot be negative");
    }
    if (length > str.length - startIndex) {
        throw new Error("String.indexOfAny: Invalid startIndex and length");
    }
    str = str.substr(startIndex, length);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(anyOf), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var c = _step.value;

            var index = str.indexOf(c);
            if (index > -1) {
                return index + startIndex;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return -1;
}
function toHex(value) {
    return value < 0 ? "ff" + (16777215 - (Math.abs(value) - 1)).toString(16) : value.toString(16);
}
function printf(input) {
    return {
        input: input,
        cont: fsFormat(input)
    };
}
function toConsole(arg) {
    // Don't remove the lambda here, see #1357
    return arg.cont(function (x) {
        console.log(x);
    });
}
function toConsoleError(arg) {
    return arg.cont(function (x) {
        console.error(x);
    });
}
function toText(arg) {
    return arg.cont(function (x) {
        return x;
    });
}
function toFail(arg) {
    return arg.cont(function (x) {
        throw new Error(x);
    });
}
function formatOnce(str2, rep) {
    return str2.replace(fsFormatRegExp, function (_, prefix, flags, pad, precision, format) {
        switch (format) {
            case "f":
            case "F":
                rep = rep.toFixed(precision || 6);
                break;
            case "g":
            case "G":
                rep = rep.toPrecision(precision);
                break;
            case "e":
            case "E":
                rep = rep.toExponential(precision);
                break;
            case "O":
                rep = Object(__WEBPACK_IMPORTED_MODULE_4__Util__["h" /* toString */])(rep);
                break;
            case "A":
                rep = Object(__WEBPACK_IMPORTED_MODULE_4__Util__["h" /* toString */])(rep, true);
                break;
            case "x":
                rep = toHex(Number(rep));
                break;
            case "X":
                rep = toHex(Number(rep)).toUpperCase();
                break;
        }
        var plusPrefix = flags.indexOf("+") >= 0 && parseInt(rep, 10) >= 0;
        pad = parseInt(pad, 10);
        if (!isNaN(pad)) {
            var ch = pad >= 0 && flags.indexOf("0") >= 0 ? "0" : " ";
            rep = padLeft(rep, Math.abs(pad) - (plusPrefix ? 1 : 0), ch, pad < 0);
        }
        var once = prefix + (plusPrefix ? "+" + rep : rep);
        return once.replace(/%/g, "%%");
    });
}
function createPrinter(str, cont) {
    var printer = function printer() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        // Make a copy as the function may be used several times
        var strCopy = str;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(args), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var arg = _step2.value;

                strCopy = formatOnce(strCopy, arg);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return fsFormatRegExp.test(strCopy) ? createPrinter(strCopy, cont) : cont(strCopy.replace(/%%/g, "%"));
    };
    // Mark it as curried so it doesn't
    // get wrapped by CurriedLambda
    printer.curried = true;
    return printer;
}
function fsFormat(str) {
    return function (cont) {
        return fsFormatRegExp.test(str) ? createPrinter(str, cont) : cont(str);
    };
}
function format(str) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
    }

    return str.replace(formatRegExp, function (match, idx, pad, pattern) {
        var rep = args[idx];
        var padSymbol = " ";
        if (typeof rep === "number") {
            switch ((pattern || "").substring(0, 1)) {
                case "f":
                case "F":
                    rep = pattern.length > 1 ? rep.toFixed(pattern.substring(1)) : rep.toFixed(2);
                    break;
                case "g":
                case "G":
                    rep = pattern.length > 1 ? rep.toPrecision(pattern.substring(1)) : rep.toPrecision();
                    break;
                case "e":
                case "E":
                    rep = pattern.length > 1 ? rep.toExponential(pattern.substring(1)) : rep.toExponential();
                    break;
                case "p":
                case "P":
                    rep = (pattern.length > 1 ? (rep * 100).toFixed(pattern.substring(1)) : (rep * 100).toFixed(2)) + " %";
                    break;
                case "x":
                    rep = toHex(Number(rep));
                    break;
                case "X":
                    rep = toHex(Number(rep)).toUpperCase();
                    break;
                default:
                    var m = /^(0+)(\.0+)?$/.exec(pattern);
                    if (m != null) {
                        var decs = 0;
                        if (m[2] != null) {
                            rep = rep.toFixed(decs = m[2].length - 1);
                        }
                        pad = "," + (m[1].length + (decs ? decs + 1 : 0)).toString();
                        padSymbol = "0";
                    } else if (pattern) {
                        rep = pattern;
                    }
            }
        } else if (typeof rep.ToString === "function") {
            rep = rep.ToString(pattern);
        } else if (rep instanceof Date) {
            rep = Object(__WEBPACK_IMPORTED_MODULE_2__Date__["b" /* toString */])(rep, pattern);
        }
        pad = parseInt((pad || "").substring(1), 10);
        if (!isNaN(pad)) {
            rep = padLeft(rep, Math.abs(pad), padSymbol, pad < 0);
        }
        return rep;
    });
}
function endsWith(str, search) {
    var idx = str.lastIndexOf(search);
    return idx >= 0 && idx === str.length - search.length;
}
function initialize(n, f) {
    if (n < 0) {
        throw new Error("String length must be non-negative");
    }
    var xs = new Array(n);
    for (var i = 0; i < n; i++) {
        xs[i] = f(i);
    }
    return xs.join("");
}
function insert(str, startIndex, value) {
    if (startIndex < 0 || startIndex > str.length) {
        throw new Error("startIndex is negative or greater than the length of this instance.");
    }
    return str.substring(0, startIndex) + value + str.substring(startIndex);
}
function isNullOrEmpty(str) {
    return typeof str !== "string" || str.length === 0;
}
function isNullOrWhiteSpace(str) {
    return typeof str !== "string" || /^\s*$/.test(str);
}
function join(delimiter, xs) {
    var xs2 = typeof xs === "string" ? [xs] : xs;
    var len = arguments.length;
    if (len > 2) {
        xs2 = Array(len - 1);
        for (var key = 1; key < len; key++) {
            xs2[key - 1] = arguments[key];
        }
    } else if (!Array.isArray(xs2)) {
        xs2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(xs2);
    }
    return xs2.map(function (x) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__Util__["h" /* toString */])(x);
    }).join(delimiter);
}
/** Validates UUID as specified in RFC4122 (versions 1-5). Trims braces. */
function validateGuid(str, doNotThrow) {
    var trimmed = trim(str, "both", "{", "}");
    if (guidRegex.test(trimmed)) {
        return doNotThrow ? [true, trimmed] : trimmed;
    } else if (doNotThrow) {
        return [false, "00000000-0000-0000-0000-000000000000"];
    }
    throw new Error("Guid should contain 32 digits with 4 dashes: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
}
/* tslint:disable */
// From https://gist.github.com/LeverOne/1308368
function newGuid() {
    var b = "";
    for (var a = 0; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : "-") {}
    return b;
}
// Maps for number <-> hex string conversion
var _convertMapsInitialized = false;
var _byteToHex = void 0;
var _hexToByte = void 0;
function initConvertMaps() {
    _byteToHex = new Array(256);
    _hexToByte = {};
    for (var i = 0; i < 256; i++) {
        _byteToHex[i] = (i + 0x100).toString(16).substr(1);
        _hexToByte[_byteToHex[i]] = i;
    }
    _convertMapsInitialized = true;
}
/** Parse a UUID into it's component bytes */
// Adapted from https://github.com/zefferus/uuid-parse
function guidToArray(s) {
    if (!_convertMapsInitialized) {
        initConvertMaps();
    }
    var i = 0;
    var buf = new Uint8Array(16);
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function (oct) {
        switch (i) {
            // .NET saves first three byte groups with differten endianness
            // See https://stackoverflow.com/a/16722909/3922220
            case 0:
            case 1:
            case 2:
            case 3:
                buf[3 - i++] = _hexToByte[oct];
                break;
            case 4:
            case 5:
                buf[9 - i++] = _hexToByte[oct];
                break;
            case 6:
            case 7:
                buf[13 - i++] = _hexToByte[oct];
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                buf[i++] = _hexToByte[oct];
                break;
        }
    });
    // Zero out remaining bytes if string was short
    while (i < 16) {
        buf[i++] = 0;
    }
    return buf;
}
/** Convert UUID byte array into a string */
function arrayToGuid(buf) {
    if (buf.length !== 16) {
        throw new Error("Byte array for GUID must be exactly 16 bytes long");
    }
    if (!_convertMapsInitialized) {
        initConvertMaps();
    }
    return _byteToHex[buf[3]] + _byteToHex[buf[2]] + _byteToHex[buf[1]] + _byteToHex[buf[0]] + "-" + _byteToHex[buf[5]] + _byteToHex[buf[4]] + "-" + _byteToHex[buf[7]] + _byteToHex[buf[6]] + "-" + _byteToHex[buf[8]] + _byteToHex[buf[9]] + "-" + _byteToHex[buf[10]] + _byteToHex[buf[11]] + _byteToHex[buf[12]] + _byteToHex[buf[13]] + _byteToHex[buf[14]] + _byteToHex[buf[15]];
}
/* tslint:enable */
function notSupported(name) {
    throw new Error("The environment doesn't support '" + name + "', please use a polyfill.");
}
function toBase64String(inArray) {
    var str = "";
    for (var i = 0; i < inArray.length; i++) {
        str += String.fromCharCode(inArray[i]);
    }
    return typeof btoa === "function" ? btoa(str) : notSupported("btoa");
}
function fromBase64String(b64Encoded) {
    var binary = typeof atob === "function" ? atob(b64Encoded) : notSupported("atob");
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}
function padLeft(str, len, ch, isRight) {
    ch = ch || " ";
    str = String(str);
    len = len - str.length;
    for (var i = 0; i < len; i++) {
        str = isRight ? str + ch : ch + str;
    }
    return str;
}
function padRight(str, len, ch) {
    return padLeft(str, len, ch, true);
}
function remove(str, startIndex, count) {
    if (startIndex >= str.length) {
        throw new Error("startIndex must be less than length of string");
    }
    if (typeof count === "number" && startIndex + count > str.length) {
        throw new Error("Index and count must refer to a location within the string.");
    }
    return str.slice(0, startIndex) + (typeof count === "number" ? str.substr(startIndex + count) : "");
}
function replace(str, search, replace) {
    return str.replace(new RegExp(Object(__WEBPACK_IMPORTED_MODULE_3__RegExp__["a" /* escape */])(search), "g"), replace);
}
function replicate(n, x) {
    return initialize(n, function () {
        return x;
    });
}
function getCharAtIndex(input, index) {
    if (index < 0 || index > input.length) {
        throw new Error("System.IndexOutOfRangeException: Index was outside the bounds of the array.");
    }
    return input[index];
}
function split(str, splitters, count, removeEmpty) {
    count = typeof count === "number" ? count : null;
    removeEmpty = typeof removeEmpty === "number" ? removeEmpty : null;
    if (count < 0) {
        throw new Error("Count cannot be less than zero");
    }
    if (count === 0) {
        return [];
    }
    var splitters2 = splitters;
    if (!Array.isArray(splitters)) {
        var len = arguments.length;
        splitters2 = Array(len - 1);
        for (var key = 1; key < len; key++) {
            splitters2[key - 1] = arguments[key];
        }
    }
    splitters2 = splitters2.map(function (x) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__RegExp__["a" /* escape */])(x);
    });
    splitters2 = splitters2.length > 0 ? splitters2 : [" "];
    var i = 0;
    var splits = [];
    var reg = new RegExp(splitters2.join("|"), "g");
    while (count == null || count > 1) {
        var m = reg.exec(str);
        if (m === null) {
            break;
        }
        if (!removeEmpty || m.index - i > 0) {
            count = count != null ? count - 1 : count;
            splits.push(str.substring(i, m.index));
        }
        i = reg.lastIndex;
    }
    if (!removeEmpty || str.length - i > 0) {
        splits.push(str.substring(i));
    }
    return splits;
}
function trim(str, side) {
    for (var _len4 = arguments.length, chars = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        chars[_key4 - 2] = arguments[_key4];
    }

    if (side === "both" && chars.length === 0) {
        return str.trim();
    }
    if (side === "start" || side === "both") {
        var reg = chars.length === 0 ? /^\s+/ : new RegExp("^[" + Object(__WEBPACK_IMPORTED_MODULE_3__RegExp__["a" /* escape */])(chars.join("")) + "]+");
        str = str.replace(reg, "");
    }
    if (side === "end" || side === "both") {
        var _reg = chars.length === 0 ? /\s+$/ : new RegExp("[" + Object(__WEBPACK_IMPORTED_MODULE_3__RegExp__["a" /* escape */])(chars.join("")) + "]+$");
        str = str.replace(_reg, "");
    }
    return str;
}
function filter(pred, x) {
    return x.split("").filter(pred).join("");
}

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paket_fs__ = __webpack_require__(94);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "op_LessDivideGreater", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["D"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isProject", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["C"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "globalToolPath", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["A"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "potentialDirectories", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["G"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "findBinary", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PaketType", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getPaketPath", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getBootstrapperPath", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "outputChannel", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["E"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UpdatePaketIfNeeded", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "runWithPaketLocation", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["H"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Init", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GenerateLoadScripts", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Update", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Install", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Outdated", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Restore", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AutoRestoreOn", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AutoRestoreOff", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ConvertFromNuget", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Simplify", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "inputOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["B"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Add", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Why", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AddToCurrent", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UpdateGroup", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UpdatePackage", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UpdatePackageCurrent", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RemovePackage", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RemovePackageCurrent", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InstalledPackage", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "parsePaketList", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["F"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "activate", function() { return __WEBPACK_IMPORTED_MODULE_0__paket_fs__["v"]; });


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["D"] = op_LessDivideGreater;
/* harmony export (immutable) */ __webpack_exports__["C"] = isProject;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return globalToolPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return potentialDirectories; });
/* harmony export (immutable) */ __webpack_exports__["w"] = findBinary;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return PaketType; });
/* harmony export (immutable) */ __webpack_exports__["z"] = getPaketPath;
/* harmony export (immutable) */ __webpack_exports__["x"] = getBootstrapperPath;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return outputChannel; });
/* harmony export (immutable) */ __webpack_exports__["y"] = getConfig;
/* harmony export (immutable) */ __webpack_exports__["t"] = UpdatePaketIfNeeded;
/* harmony export (immutable) */ __webpack_exports__["H"] = runWithPaketLocation;
/* harmony export (immutable) */ __webpack_exports__["g"] = Init;
/* harmony export (immutable) */ __webpack_exports__["f"] = GenerateLoadScripts;
/* harmony export (immutable) */ __webpack_exports__["p"] = Update;
/* harmony export (immutable) */ __webpack_exports__["h"] = Install;
/* harmony export (immutable) */ __webpack_exports__["j"] = Outdated;
/* harmony export (immutable) */ __webpack_exports__["n"] = Restore;
/* harmony export (immutable) */ __webpack_exports__["d"] = AutoRestoreOn;
/* harmony export (immutable) */ __webpack_exports__["c"] = AutoRestoreOff;
/* harmony export (immutable) */ __webpack_exports__["e"] = ConvertFromNuget;
/* harmony export (immutable) */ __webpack_exports__["o"] = Simplify;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return inputOptions; });
/* harmony export (immutable) */ __webpack_exports__["a"] = Add;
/* harmony export (immutable) */ __webpack_exports__["u"] = Why;
/* harmony export (immutable) */ __webpack_exports__["b"] = AddToCurrent;
/* harmony export (immutable) */ __webpack_exports__["q"] = UpdateGroup;
/* harmony export (immutable) */ __webpack_exports__["r"] = UpdatePackage;
/* harmony export (immutable) */ __webpack_exports__["s"] = UpdatePackageCurrent;
/* harmony export (immutable) */ __webpack_exports__["l"] = RemovePackage;
/* harmony export (immutable) */ __webpack_exports__["m"] = RemovePackageCurrent;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return InstalledPackage; });
/* harmony export (immutable) */ __webpack_exports__["F"] = parsePaketList;
/* harmony export (immutable) */ __webpack_exports__["v"] = activate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vscode__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vscode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_vscode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_fs__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Map__ = __webpack_require__(89);















function op_LessDivideGreater(a, b) {
    if (__WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].isWin()) {
        return a + "\\" + b;
    } else {
        return a + "/" + b;
    }
}
function isProject(fileName) {
    if (Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["a" /* endsWith */])(fileName, ".fsproj") ? true : Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["a" /* endsWith */])(fileName, ".csproj")) {
        return true;
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["a" /* endsWith */])(fileName, ".vbproj");
    }
}
var globalToolPath = function () {
    var getGlobalToolSubPath = function getGlobalToolSubPath(root) {
        return op_LessDivideGreater(op_LessDivideGreater(root, ".dotnet"), "tools");
    };

    var pathOption = void 0;
    var matchValue = __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].isWin();

    if (matchValue) {
        pathOption = function (option) {
            return Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["a" /* defaultArg */])(option, null, getGlobalToolSubPath);
        }(process.env.USERPROFILE);
    } else {
        pathOption = function (option_1) {
            return Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["a" /* defaultArg */])(option_1, null, getGlobalToolSubPath);
        }(process.env.HOME);
    }

    return pathOption;
}();
var potentialDirectories = Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])([__WEBPACK_IMPORTED_MODULE_8_vscode__["workspace"].rootPath, op_LessDivideGreater(__WEBPACK_IMPORTED_MODULE_8_vscode__["workspace"].rootPath, ".paket")]);
function findBinary(name) {
    return Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["l" /* tryFind */])(function ($var1) {
        return __WEBPACK_IMPORTED_MODULE_10_fs__["existsSync"].bind(__WEBPACK_IMPORTED_MODULE_10_fs__)(function (arg0) {
            return arg0;
        }($var1));
    }, Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["b" /* map */])(function (dir) {
        return op_LessDivideGreater(dir, name);
    }, potentialDirectories));
}
var PaketType = function () {
    function PaketType(tag, data) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, PaketType);

        this.tag = tag | 0;
        this.data = data;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(PaketType, [{
        key: __WEBPACK_IMPORTED_MODULE_11_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Ionide.VSCode.PaketServiceModule.PaketType",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Old", "string"], ["Global"], ["LocalTool"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_12_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["f" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_12_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["e" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return PaketType;
}();
Object(__WEBPACK_IMPORTED_MODULE_11_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["b" /* setType */])("Ionide.VSCode.PaketServiceModule.PaketType", PaketType);
function getPaketPath() {
    var checkGlobal = function checkGlobal() {
        if (globalToolPath == null) {
            return null;
        } else {
            var toolPath = Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(globalToolPath);
            var fn = __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].isWin() ? "paket.exe" : "paket";
            var path = op_LessDivideGreater(toolPath, fn);

            if (__WEBPACK_IMPORTED_MODULE_10_fs__["existsSync"](path)) {
                return new PaketType(1);
            } else {
                return null;
            }
        }
    };

    var matchValue = findBinary("paket.exe");

    if (matchValue == null) {
        var configPath = op_LessDivideGreater(op_LessDivideGreater(__WEBPACK_IMPORTED_MODULE_8_vscode__["workspace"].rootPath, ".config"), "dotnet-tools.json");

        if (__WEBPACK_IMPORTED_MODULE_10_fs__["existsSync"](configPath)) {
            var file = __WEBPACK_IMPORTED_MODULE_10_fs__["readFileSync"](configPath).toString();

            if (file.indexOf("paket") >= 0) {
                return new PaketType(2);
            } else {
                return checkGlobal();
            }
        } else {
            return checkGlobal();
        }
    } else {
        return new PaketType(0, Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue));
    }
}
function getBootstrapperPath() {
    return findBinary("paket.bootstrapper.exe");
}
var outputChannel = __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].createOutputChannel("Paket");
function getConfig() {
    var cfg = __WEBPACK_IMPORTED_MODULE_8_vscode__["workspace"].getConfiguration();
    return cfg.get("Paket.autoshow", true);
}
function UpdatePaketIfNeeded() {
    var matchValue = [getBootstrapperPath(), getPaketPath()];

    if (matchValue[0] == null) {
        if (matchValue[1] == null) {
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].bind(function (_arg1) {
                return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].empty();
            }, __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("Neither Paket nor its bootstrapper were found. Install paket as local or global tool with `dotnet` CLI"));
        } else if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue[1]).tag === 1) {
            outputChannel.appendLine("Paket is used as global tool.");
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].empty();
        } else if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue[1]).tag === 2) {
            outputChannel.appendLine("Paket is used as local tool.");
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].empty();
        } else {
            outputChannel.appendLine("Paket is in magic mode. Location: " + Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue[1]).data);
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].empty();
        }
    } else {
        outputChannel.appendLine("Paket bootstrapper exists at " + Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue[0]));
        return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].toPromise(__WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].spawnWithNotification(Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue[0]), "mono", "", outputChannel));
    }
}
function runWithPaketLocation(oldHandler, globalHandler, localHandler) {
    var matchValue = getPaketPath();

    if (matchValue == null) {
        return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].bind(function (_arg1) {
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].reject("Unable to find Paket");
        }, __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("Unable to find Paket"));
    } else if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue).tag === 2) {
        return localHandler();
    } else if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue).tag === 1) {
        return globalHandler();
    } else {
        return oldHandler(Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(matchValue).data);
    }
}

function spawnPaket(cmd) {
    if (__WEBPACK_IMPORTED_MODULE_8_vscode__["workspace"].rootPath == null) {
        __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("Paket can be run only if folder is open"), void 0;
    } else {
        __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].bind(function (_arg6) {
            return runWithPaketLocation(function (location) {
                outputChannel.clear();
                outputChannel.appendLine(location);

                var startedMessage = __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].setStatusBarMessage("Paket started");

                if (getConfig()) {
                    outputChannel.show();
                }

                __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].onExit(function (code, _arg1) {
                    startedMessage.dispose(), void 0;

                    if (Object(__WEBPACK_IMPORTED_MODULE_12_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["h" /* toString */])(code) === "0") {
                        __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].setStatusBarMessage("Paket completed", 10000), void 0;
                    } else {
                        __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
                            if (n === "Show") {
                                outputChannel.show();
                            }
                        }, __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("Paket failed", "Show")), void 0;
                    }
                }, __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].spawnWithNotification(location, "mono", cmd, outputChannel)), void 0;
                return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].empty();
            }, function () {
                outputChannel.clear();
                outputChannel.appendLine("Running paket as global tool");

                var startedMessage_1 = __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].setStatusBarMessage("Paket started");

                if (getConfig()) {
                    outputChannel.show();
                }

                __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].onExit(function (code_1, _arg2) {
                    startedMessage_1.dispose(), void 0;

                    if (Object(__WEBPACK_IMPORTED_MODULE_12_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["h" /* toString */])(code_1) === "0") {
                        __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].setStatusBarMessage("Paket completed", 10000), void 0;
                    } else {
                        __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n_1) {
                            if (n_1 === "Show") {
                                outputChannel.show();
                            }
                        }, __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("Paket failed", "Show")), void 0;
                    }
                }, __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].spawnWithNotification("paket", "", cmd, outputChannel)), void 0;
                return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].empty();
            }, function () {
                outputChannel.clear();
                outputChannel.appendLine("Running paket as local tool");

                var startedMessage_2 = __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].setStatusBarMessage("Paket started");

                if (getConfig()) {
                    outputChannel.show();
                }

                __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].onExit(function (code_2, _arg4) {
                    startedMessage_2.dispose(), void 0;

                    if (Object(__WEBPACK_IMPORTED_MODULE_12_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["h" /* toString */])(code_2) === "0") {
                        __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].setStatusBarMessage("Paket completed", 10000), void 0;
                    } else {
                        __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n_2) {
                            if (n_2 === "Show") {
                                outputChannel.show();
                            }
                        }, __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("Paket failed", "Show")), void 0;
                    }
                }, __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].spawnWithNotification("dotnet", "", "paket " + cmd, outputChannel)), void 0;
                return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].empty();
            });
        }, UpdatePaketIfNeeded()), void 0;
    }
}

function execPaket(cmd) {
    return function (builder_) {
        if (!(__WEBPACK_IMPORTED_MODULE_8_vscode__["workspace"].rootPath == null)) {
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].bind(function (_arg1) {
                return runWithPaketLocation(function (location) {
                    return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].exec(location, "mono", cmd);
                }, function () {
                    return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].exec("paket", "", cmd);
                }, function () {
                    return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["a" /* Process */].exec("dotnet", "", "paket " + cmd);
                });
            }, UpdatePaketIfNeeded());
        } else {
            __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("Paket can be run only if folder is open"), void 0;
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].reject("Paket can be run only if folder is open");
        }
    }(__WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["c" /* PromiseBuilderImp */].promise);
}

function handlePaketList(error, stdout, stderr) {
    if (stdout === "") {
        return [];
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(stdout, "\n").filter(function (y) {
            return "" !== y;
        });
    }
}

function Init() {
    spawnPaket("init");
}
function GenerateLoadScripts() {
    spawnPaket("generate-load-scripts");
}
function Update() {
    spawnPaket("update");
}
function Install() {
    spawnPaket("install");
}
function Outdated() {
    spawnPaket("outdated");
}
function Restore() {
    spawnPaket("restore");
}
function AutoRestoreOn() {
    spawnPaket("auto-restore on");
}
function AutoRestoreOff() {
    spawnPaket("auto-restore off");
}
function ConvertFromNuget() {
    spawnPaket("convert-from-nuget");
}
function Simplify() {
    spawnPaket("simplify");
}
var inputOptions = {};
function Add() {
    __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
        if (n != undefined) {
            spawnPaket(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("add nuget %s"))(n));
        }
    }, __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showInputBox(inputOptions)), void 0;
}
function Why() {
    __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
        if (n != undefined) {
            spawnPaket(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("why %s"))(n));
        }
    }, __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showInputBox(inputOptions)), void 0;
}
function AddToCurrent() {
    var fn = __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].activeTextEditor.document.fileName;

    if (isProject(fn)) {
        __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
            if (n != undefined) {
                spawnPaket(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("add nuget %s project \"%s\""))(n, fn));
            }
        }, __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showInputBox(inputOptions)), void 0;
    } else {
        __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("project file needs to be opened"), void 0;
    }
}
function UpdateGroup() {
    __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
        if (n != undefined) {
            spawnPaket(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("update group %s"))(n));
        }
    }, function ($var2) {
        return __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showQuickPick.bind(__WEBPACK_IMPORTED_MODULE_8_vscode__["window"])(function (value) {
            return value;
        }($var2));
    }(function (pr) {
        return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (tupledArg) {
            return handlePaketList(tupledArg[0], tupledArg[1], tupledArg[2]);
        }, pr);
    }(execPaket("show-groups -s")))), void 0;
}
function UpdatePackage() {
    __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
        if (n != undefined) {
            var group = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(n, " ")[0], "both");
            var name = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(n, " ")[1], "both");
            spawnPaket(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("update nuget %s group %s"))(name, group));
        }
    }, function ($var3) {
        return __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showQuickPick.bind(__WEBPACK_IMPORTED_MODULE_8_vscode__["window"])(function (value) {
            return value;
        }($var3));
    }(function (pr) {
        return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (tupledArg) {
            return handlePaketList(tupledArg[0], tupledArg[1], tupledArg[2]);
        }, pr);
    }(execPaket("show-installed-packages -s")))), void 0;
}
function UpdatePackageCurrent() {
    var fn = __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].activeTextEditor.document.fileName;

    if (isProject(fn)) {
        __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
            if (n != undefined) {
                var group = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(n, " ")[0], "both");
                var name = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(n, " ")[1], "both");
                spawnPaket(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("update nuget %s project \"%s\" group %s"))(name, fn, group));
            }
        }, function ($var4) {
            return __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showQuickPick.bind(__WEBPACK_IMPORTED_MODULE_8_vscode__["window"])(function (value) {
                return value;
            }($var4));
        }(function (pr) {
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (tupledArg) {
                return handlePaketList(tupledArg[0], tupledArg[1], tupledArg[2]);
            }, pr);
        }(execPaket("show-installed-packages -s")))), void 0;
    } else {
        __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("project file needs to be opened"), void 0;
    }
}
function RemovePackage() {
    __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
        if (n != undefined) {
            var group = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(n, " ")[0], "both");
            var name = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(n, " ")[1], "both");
            spawnPaket(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("remove nuget %s group %s"))(name, group));
        }
    }, function ($var5) {
        return __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showQuickPick.bind(__WEBPACK_IMPORTED_MODULE_8_vscode__["window"])(function (value) {
            return value;
        }($var5));
    }(function (pr) {
        return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (tupledArg) {
            return handlePaketList(tupledArg[0], tupledArg[1], tupledArg[2]);
        }, pr);
    }(execPaket("show-installed-packages -s")))), void 0;
}
function RemovePackageCurrent() {
    var fn = __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].activeTextEditor.document.fileName;

    if (isProject(fn)) {
        __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (n) {
            if (n != undefined) {
                var group = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(n, " ")[0], "both");
                var name = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(n, " ")[1], "both");
                spawnPaket(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("remove nuget %s project \"%s\" group %s"))(name, fn, group));
            }
        }, function ($var6) {
            return __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showQuickPick.bind(__WEBPACK_IMPORTED_MODULE_8_vscode__["window"])(function (value) {
                return value;
            }($var6));
        }(function (pr) {
            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].map(function (tupledArg) {
                return handlePaketList(tupledArg[0], tupledArg[1], tupledArg[2]);
            }, pr);
        }(execPaket("show-installed-packages -s")))), void 0;
    } else {
        __WEBPACK_IMPORTED_MODULE_8_vscode__["window"].showErrorMessage("project file needs to be opened"), void 0;
    }
}

function createDependenciesProvider() {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
        provideCompletionItems: function provideCompletionItems(doc, pos, ct) {
            return function (builder_) {
                var range = doc.getWordRangeAtPosition(pos);
                var line = doc.getText(new __WEBPACK_IMPORTED_MODULE_8_vscode__["Range"](pos.line, 0, pos.line, 1000));
                var tags = Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["k" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(line, " ").filter(function (y) {
                    return "" !== y;
                }));
                var word = doc.getText(range);
                return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].bind(function (_arg1) {
                    return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].lift(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["h" /* map */])(function (n) {
                        return new __WEBPACK_IMPORTED_MODULE_8_vscode__["CompletionItem"](Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(n, "both"));
                    }, Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(_arg1, "\n"))));
                }, function () {
                    var isRangeDefined = range != undefined;

                    var _PaketTag___ = function _PaketTag___(items) {
                        var matchValue = [items, isRangeDefined];
                        var $var7 = matchValue[0].tail != null ? matchValue[0].tail.tail != null ? matchValue[0].tail.tail.tail == null ? matchValue[1] ? [0, matchValue[0].head] : [1] : [1] : [1] : [1];

                        switch ($var7[0]) {
                            case 0:
                                return Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["c" /* makeSome */])($var7[1]);

                            case 1:
                                return null;
                        }
                    };

                    var concatAndLift = function concatAndLift($var8) {
                        return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].lift(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["c" /* join */])("\n", $var8));
                    };

                    var $var9 = void 0;

                    if (tags.tail != null) {
                        if (tags.tail.tail == null) {
                            $var9 = [0];
                        } else {
                            var activePatternResult1270 = _PaketTag___(tags);

                            if (activePatternResult1270 != null) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1270) === "source") {
                                    $var9 = [1];
                                } else {
                                    $var9 = [2];
                                }
                            } else {
                                $var9 = [2];
                            }
                        }
                    } else {
                        var activePatternResult1271 = _PaketTag___(tags);

                        if (activePatternResult1271 != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1271) === "source") {
                                $var9 = [1];
                            } else {
                                $var9 = [2];
                            }
                        } else {
                            $var9 = [2];
                        }
                    }

                    switch ($var9[0]) {
                        case 0:
                            return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["nuget", "git", "github", "http", "gist", "clitool", "versions", "source", "version", "group", "references: strict", "framework:", "content: none", "copy_content_to_output_dir: always", "import_targets:", "copy_local:", "redirects:", "strategy:", "storage:", "lowest_matching:", "generate_load_scripts", "restriction:"]));

                        case 1:
                            return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["https://api.nuget.org/v3/index.json", "https://nuget.org/api/v2"]));

                        case 2:
                            var $var10 = void 0;

                            var activePatternResult1269 = _PaketTag___(tags);

                            if (activePatternResult1269 != null) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1269) === "framework:") {
                                    $var10 = [0];
                                } else {
                                    $var10 = [1];
                                }
                            } else {
                                $var10 = [1];
                            }

                            switch ($var10[0]) {
                                case 0:
                                    return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["net35", "net40", "net472", "netstandard2.0", "netstandard2.1", "netcoreapp2.1", "netcoreapp3.0", "netcoreapp3.1", "uap10.0", "auto-detect"]));

                                case 1:
                                    var $var11 = void 0;

                                    var activePatternResult1268 = _PaketTag___(tags);

                                    if (activePatternResult1268 != null) {
                                        if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1268) === "redirects:") {
                                            $var11 = [0];
                                        } else {
                                            $var11 = [1];
                                        }
                                    } else {
                                        $var11 = [1];
                                    }

                                    switch ($var11[0]) {
                                        case 0:
                                            return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["on", "off", "force"]));

                                        case 1:
                                            var $var12 = void 0;

                                            var activePatternResult1267 = _PaketTag___(tags);

                                            if (activePatternResult1267 != null) {
                                                if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1267) === "strategy:") {
                                                    $var12 = [0];
                                                } else {
                                                    $var12 = [1];
                                                }
                                            } else {
                                                $var12 = [1];
                                            }

                                            switch ($var12[0]) {
                                                case 0:
                                                    return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["min", "max"]));

                                                case 1:
                                                    var $var13 = void 0;

                                                    var activePatternResult1266 = _PaketTag___(tags);

                                                    if (activePatternResult1266 != null) {
                                                        if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1266) === "storage:") {
                                                            $var13 = [0];
                                                        } else {
                                                            $var13 = [1];
                                                        }
                                                    } else {
                                                        $var13 = [1];
                                                    }

                                                    switch ($var13[0]) {
                                                        case 0:
                                                            return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["none", "symlink", "packages"]));

                                                        case 1:
                                                            var $var14 = void 0;

                                                            var activePatternResult1265 = _PaketTag___(tags);

                                                            if (activePatternResult1265 != null) {
                                                                if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1265) === "generate_load_scripts:") {
                                                                    $var14 = [0];
                                                                } else {
                                                                    $var14 = [1];
                                                                }
                                                            } else {
                                                                $var14 = [1];
                                                            }

                                                            switch ($var14[0]) {
                                                                case 0:
                                                                    return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["true", "false"]));

                                                                case 1:
                                                                    var $var15 = void 0;

                                                                    var activePatternResult1264 = _PaketTag___(tags);

                                                                    if (activePatternResult1264 != null) {
                                                                        if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1264) === "lowest_matching:") {
                                                                            $var15 = [0];
                                                                        } else {
                                                                            $var15 = [1];
                                                                        }
                                                                    } else {
                                                                        $var15 = [1];
                                                                    }

                                                                    switch ($var15[0]) {
                                                                        case 0:
                                                                            return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["true", "false"]));

                                                                        case 1:
                                                                            var $var16 = void 0;

                                                                            var activePatternResult1263 = _PaketTag___(tags);

                                                                            if (activePatternResult1263 != null) {
                                                                                if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1263) === "import_targets:") {
                                                                                    $var16 = [0];
                                                                                } else {
                                                                                    $var16 = [1];
                                                                                }
                                                                            } else {
                                                                                $var16 = [1];
                                                                            }

                                                                            switch ($var16[0]) {
                                                                                case 0:
                                                                                    return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["true", "false"]));

                                                                                case 1:
                                                                                    var $var17 = void 0;

                                                                                    var activePatternResult1262 = _PaketTag___(tags);

                                                                                    if (activePatternResult1262 != null) {
                                                                                        if (Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(activePatternResult1262) === "copy_local:") {
                                                                                            $var17 = [0];
                                                                                        } else {
                                                                                            $var17 = [1];
                                                                                        }
                                                                                    } else {
                                                                                        $var17 = [1];
                                                                                    }

                                                                                    switch ($var17[0]) {
                                                                                        case 0:
                                                                                            return concatAndLift(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["c" /* ofArray */])(["true", "false"]));

                                                                                        case 1:
                                                                                            return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].lift("");
                                                                                    }

                                                                            }

                                                                    }

                                                            }

                                                    }

                                            }

                                    }

                            }

                    }
                }());
            }(__WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["c" /* PromiseBuilderImp */].promise);
        },
        resolveCompletionItem: function resolveCompletionItem(sug, ct) {
            return function (builder_) {
                return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].lift(sug);
            }(__WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["c" /* PromiseBuilderImp */].promise);
        }
    }, __WEBPACK_IMPORTED_MODULE_11_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection, function () {
        return {
            interfaces: ["Fable.Import.vscode.CompletionItemProvider"]
        };
    });
}

var InstalledPackage = function () {
    function InstalledPackage(group, name, version) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, InstalledPackage);

        this.group = group;
        this.name = name;
        this.version = version;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(InstalledPackage, [{
        key: __WEBPACK_IMPORTED_MODULE_11_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Ionide.VSCode.PaketServiceModule.InstalledPackage",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    group: "string",
                    name: "string",
                    version: "string"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_12_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["g" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_12_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["d" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return InstalledPackage;
}();
Object(__WEBPACK_IMPORTED_MODULE_11_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["b" /* setType */])("Ionide.VSCode.PaketServiceModule.InstalledPackage", InstalledPackage);
function parsePaketList(lines) {
    return Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["d" /* delay */])(function () {
        return Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["b" /* collect */])(function (line) {
            var parts = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["h" /* trim */])(line, "both"), " ");

            if (parts.length === 4) {
                return Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["j" /* singleton */])(new InstalledPackage(parts[0], parts[1], parts[3]));
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["e" /* empty */])();
            }
        }, lines);
    });
}

function createReferencesProvider() {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
        provideCompletionItems: function provideCompletionItems(doc, pos, ct) {
            return function (builder_) {
                return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].bind(function (_arg1) {
                    var installedPackages = parsePaketList(handlePaketList(_arg1[0], _arg1[1], _arg1[2]));
                    return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].lift(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["d" /* delay */])(function () {
                        return Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["b" /* collect */])(function (matchValue) {
                            var groups = Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["c" /* join */])(",", Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["h" /* map */])(function (p) {
                                return p.group;
                            }, matchValue[1]));
                            var item = new __WEBPACK_IMPORTED_MODULE_8_vscode__["CompletionItem"](matchValue[0]);
                            item.detail = groups;
                            return Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["j" /* singleton */])(item);
                        }, Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Map__["a" /* groupBy */])(function (p_1) {
                            return p_1.name;
                        }, installedPackages));
                    })));
                }, execPaket("show-installed-packages -s"));
            }(__WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["c" /* PromiseBuilderImp */].promise);
        },
        resolveCompletionItem: function resolveCompletionItem(sug, ct) {
            return function (builder_) {
                return __WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["b" /* Promise */].lift(sug);
            }(__WEBPACK_IMPORTED_MODULE_4__paket_files_Ionide_ionide_vscode_helpers_src_Helpers_fs__["c" /* PromiseBuilderImp */].promise);
        }
    }, __WEBPACK_IMPORTED_MODULE_11_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection, function () {
        return {
            interfaces: ["Fable.Import.vscode.CompletionItemProvider"]
        };
    });
}

function saveHandler(doc) {
    var config = void 0;
    var cfg = __WEBPACK_IMPORTED_MODULE_8_vscode__["workspace"].getConfiguration();
    config = cfg.get("Paket.autoInstall", false);

    if ((Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["a" /* endsWith */])(doc.fileName, "paket.references") ? true : Object(__WEBPACK_IMPORTED_MODULE_5_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["a" /* endsWith */])(doc.fileName, "paket.dependencies")) ? config : false) {
        Install();
    }
}

function activate(context) {
    var registerCommand = function registerCommand(com, f) {
        var objectArg;
        (objectArg = context.subscriptions, objectArg.push.bind(objectArg))(__WEBPACK_IMPORTED_MODULE_8_vscode__["commands"].registerCommand(com, f));
    };

    var df = {};
    df.language = "paket-dependencies";
    var selector = df;
    var df_1 = {};
    df_1.language = "paket-references";
    var referencesSelector = df_1;
    __WEBPACK_IMPORTED_MODULE_8_vscode__["languages"].registerCompletionItemProvider(selector, createDependenciesProvider()), void 0;
    __WEBPACK_IMPORTED_MODULE_8_vscode__["languages"].registerCompletionItemProvider(referencesSelector, createReferencesProvider()), void 0;
    __WEBPACK_IMPORTED_MODULE_8_vscode__["workspace"].onDidSaveTextDocument(saveHandler, null, context.subscriptions), void 0;
    registerCommand("paket.Init", Init);
    registerCommand("paket.Install", Install);
    registerCommand("paket.Update", Update);
    registerCommand("paket.Outdated", Outdated);
    registerCommand("paket.Restore", Restore);
    registerCommand("paket.AutoRestoreOn", AutoRestoreOn);
    registerCommand("paket.AutoRestoreOff", AutoRestoreOff);
    registerCommand("paket.ConvertFromNuget", ConvertFromNuget);
    registerCommand("paket.Simplify", Simplify);
    registerCommand("paket.Add", Add);
    registerCommand("paket.Why", Why);
    registerCommand("paket.AddToCurrent", AddToCurrent);
    registerCommand("paket.UpdateGroup", UpdateGroup);
    registerCommand("paket.UpdatePackage", UpdatePackage);
    registerCommand("paket.UpdatePackageCurrent", UpdatePackageCurrent);
    registerCommand("paket.RemovePackage", RemovePackage);
    registerCommand("paket.RemovePackageCurrent", RemovePackageCurrent);
    registerCommand("paket.GenerateLoadScripts", GenerateLoadScripts);
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(103);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46);
var defined = __webpack_require__(47);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(50);
var descriptor = __webpack_require__(25);
var setToStringTag = __webpack_require__(27);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(34);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(35);
var toAbsoluteIndex = __webpack_require__(102);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(10);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(28);
var call = __webpack_require__(68);
var isArrayIter = __webpack_require__(69);
var toLength = __webpack_require__(35);
var createProperty = __webpack_require__(104);
var getIterFn = __webpack_require__(55);

$export($export.S + $export.F * !__webpack_require__(70)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(25);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _Promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PromiseBuilderImp; });
/* unused harmony export VSCode */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Process; });
/* unused harmony export Settings */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vscode__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vscode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vscode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_CurriedLambda__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_child_process__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_child_process___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_child_process__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_path__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_fs__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_fs__);


















var _Promise = function (__exports) {
    var create = __exports.create = function (body) {
        return new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a(body);
    };

    var map = __exports.map = function (a, pr) {
        return pr.then(a, null);
    };

    var bind = __exports.bind = function (a, pr) {
        return pr.then(a, null);
    };

    var _catch = __exports.catch = function (a, pr) {
        return pr.then(null, a);
    };

    var either = __exports.either = function (a, b, pr) {
        return pr.then(a, b);
    };

    var lift = __exports.lift = function (a) {
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a.resolve(a);
    };

    var reject = __exports.reject = function (reason) {
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a.reject(reason);
    };

    var onSuccess = __exports.onSuccess = function (a, pr) {
        return pr.then(function (value) {
            a(value);
            return value;
        }, null);
    };

    var onFail = __exports.onFail = function (a, pr) {
        return pr.catch(function (reason) {
            a(reason), void 0;
            return reject(reason);
        });
    };

    var all = __exports.all = function (prs) {
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a.all(prs);
    };

    var empty = __exports.empty = function () {
        return lift(null);
    };

    var PromiseBuilder = __exports.PromiseBuilder = function () {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PromiseBuilder, [{
            key: __WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection,
            value: function value() {
                return {
                    type: "Ionide.VSCode.Helpers.Promise.PromiseBuilder",
                    properties: {}
                };
            }
        }]);

        function PromiseBuilder() {
            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PromiseBuilder);
        }

        return PromiseBuilder;
    }();

    Object(__WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["b" /* setType */])("Ionide.VSCode.Helpers.Promise.PromiseBuilder", PromiseBuilder);
    return __exports;
}({});


var PromiseBuilderImp = function (__exports) {
    var promise = __exports.promise = new _Promise.PromiseBuilder();
    return __exports;
}({});
var VSCode = function (__exports) {
    var getPluginPath = __exports.getPluginPath = function (pluginName) {
        var ext = __WEBPACK_IMPORTED_MODULE_5_vscode__["extensions"].getExtension(pluginName);
        return ext.extensionPath;
    };

    return __exports;
}({});
var Process = function (__exports) {
    var splitArgs = __exports.splitArgs = function (cmd) {
        if (cmd === "") {
            return [];
        } else {
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(Object(__WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["d" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["f" /* fold */])(function (tupledArg, e) {
                return Object(__WEBPACK_IMPORTED_MODULE_8_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_CurriedLambda__["a" /* default */])(function () {
                    return tupledArg[0] != null;
                })() ? Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["a" /* endsWith */])(e, "\"") ? [null, new __WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["e" /* replace */])(Object(__WEBPACK_IMPORTED_MODULE_10_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(tupledArg[0]) + " " + e, "\"", ""), tupledArg[1])] : [Object(__WEBPACK_IMPORTED_MODULE_10_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Option__["b" /* getValue */])(tupledArg[0]) + " " + e, tupledArg[1]] : (e.indexOf("\"") === 0 ? Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["a" /* endsWith */])(e, "\"") : false) ? [null, new __WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["e" /* replace */])(e, "\"", ""), tupledArg[1])] : e.indexOf("\"") === 0 ? [e, tupledArg[1]] : Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["b" /* isNullOrEmpty */])(e) ? [null, tupledArg[1]] : [null, new __WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["a" /* default */](e, tupledArg[1])];
            }, [null, new __WEBPACK_IMPORTED_MODULE_6_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_List__["a" /* default */]()], Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["k" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["f" /* split */])(cmd, " ")))[1]));
        }
    };

    var isWin = __exports.isWin = function () {
        return process.platform === "win32";
    };

    var isMono = __exports.isMono = function () {
        return process.platform !== "win32";
    };

    var onExit = __exports.onExit = function (f, proc) {
        proc.on("exit", Object(__WEBPACK_IMPORTED_MODULE_8_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_CurriedLambda__["a" /* default */])(function (value) {
            return value;
        })(f)), void 0;
        return proc;
    };

    var onOutput = __exports.onOutput = function (f, proc) {
        proc.stdout.on("data", f), void 0;
        return proc;
    };

    var onErrorOutput = __exports.onErrorOutput = function (f, proc) {
        proc.stderr.on("data", f), void 0;
        return proc;
    };

    var onError = __exports.onError = function (f, proc) {
        proc.on("error", f), void 0;
        return proc;
    };

    var spawn = __exports.spawn = function (location, linuxCmd, cmd) {
        var cmd_ = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(splitArgs(cmd));

        var options = {
            cwd: __WEBPACK_IMPORTED_MODULE_5_vscode__["workspace"].rootPath
        };

        if (isWin() ? true : linuxCmd === "") {
            return __WEBPACK_IMPORTED_MODULE_11_child_process__["spawn"](location, cmd_, options);
        } else {
            var prms = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["d" /* delay */])(function () {
                return Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["a" /* append */])(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["j" /* singleton */])(location), Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["d" /* delay */])(function () {
                    return cmd_;
                }));
            }));

            return __WEBPACK_IMPORTED_MODULE_11_child_process__["spawn"](linuxCmd, prms, options);
        }
    };

    var spawnInDir = __exports.spawnInDir = function (location, linuxCmd, cmd) {
        var cmd_ = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(splitArgs(cmd));

        var options = {
            cwd: __WEBPACK_IMPORTED_MODULE_12_path__["dirname"](location)
        };

        if (isWin() ? true : linuxCmd === "") {
            return __WEBPACK_IMPORTED_MODULE_11_child_process__["spawn"](location, cmd_, options);
        } else {
            var prms = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["d" /* delay */])(function () {
                return Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["a" /* append */])(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["j" /* singleton */])(location), Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["d" /* delay */])(function () {
                    return cmd_;
                }));
            }));

            return __WEBPACK_IMPORTED_MODULE_11_child_process__["spawn"](linuxCmd, prms, options);
        }
    };

    var spawnWithShell = __exports.spawnWithShell = function (location, linuxCmd, cmd) {
        var cmd_ = isWin() ? __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["h" /* map */])(function (c) {
            return c.indexOf(" ") >= 0 ? Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_9_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_String__["d" /* printf */])("\"%s\""))(c) : c;
        }, splitArgs(cmd))) : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(splitArgs(cmd));
        var options = {
            cwd: __WEBPACK_IMPORTED_MODULE_5_vscode__["workspace"].rootPath,
            detached: true,
            shell: true
        };

        if (isWin() ? true : linuxCmd === "") {
            return __WEBPACK_IMPORTED_MODULE_11_child_process__["spawn"](location, cmd_, options);
        } else {
            var prms = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["d" /* delay */])(function () {
                return Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["a" /* append */])(Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["j" /* singleton */])(location), Object(__WEBPACK_IMPORTED_MODULE_7_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Seq__["d" /* delay */])(function () {
                    return cmd_;
                }));
            }));

            return __WEBPACK_IMPORTED_MODULE_11_child_process__["spawn"](linuxCmd, prms, options);
        }
    };

    var spawnWithNotification = __exports.spawnWithNotification = function (location, linuxCmd, cmd, outputChannel) {
        return onErrorOutput(function (e) {
            outputChannel.append.bind(outputChannel)(e.toString());
        }, onError(function (e_1) {
            outputChannel.append.bind(outputChannel)(Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["h" /* toString */])(e_1));
        }, onOutput(function (e_2) {
            outputChannel.append.bind(outputChannel)(e_2.toString());
        }, spawn(location, linuxCmd, cmd))));
    };

    var spawnWithNotificationInDir = __exports.spawnWithNotificationInDir = function (location, linuxCmd, cmd, outputChannel) {
        return onErrorOutput(function (e) {
            outputChannel.append.bind(outputChannel)(e.toString());
        }, onError(function (e_1) {
            outputChannel.append.bind(outputChannel)(Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["h" /* toString */])(e_1));
        }, onOutput(function (e_2) {
            outputChannel.append.bind(outputChannel)(e_2.toString());
        }, spawnInDir(location, linuxCmd, cmd))));
    };

    var ChildProcessExit = __exports.ChildProcessExit = function () {
        function ChildProcessExit(code, signal) {
            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ChildProcessExit);

            this.Code = code;
            this.Signal = signal;
        }

        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ChildProcessExit, [{
            key: __WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection,
            value: function value() {
                return {
                    type: "Ionide.VSCode.Helpers.Process.ChildProcessExit",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        Code: Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["b" /* Option */])("number"),
                        Signal: Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["b" /* Option */])("string")
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["g" /* equalsRecords */])(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["d" /* compareRecords */])(this, other) | 0;
            }
        }]);

        return ChildProcessExit;
    }();

    Object(__WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["b" /* setType */])("Ionide.VSCode.Helpers.Process.ChildProcessExit", ChildProcessExit);

    var toPromise = __exports.toPromise = function (proc) {
        return new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a(function (resolve, _error) {
            onExit(function (code, signal) {
                resolve(new ChildProcessExit(code, signal));
            }, proc), void 0;
        });
    };

    var exec = __exports.exec = function (location, linuxCmd, cmd) {
        var options = {};
        options.cwd = __WEBPACK_IMPORTED_MODULE_5_vscode__["workspace"].rootPath;
        return new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a(function (resolve, error) {
            var execCmd = isWin() ? location + " " + cmd : linuxCmd + " " + location + " " + cmd;
            __WEBPACK_IMPORTED_MODULE_11_child_process__["exec"](execCmd, options, function (e, i, o) {
                var arg = [e, i, o];
                resolve(arg);
            }), void 0;
        });
    };

    return __exports;
}({});
var Settings = function (__exports) {
    var FakeSettings = __exports.FakeSettings = function () {
        function FakeSettings(linuxPrefix, command, build, parameters, test) {
            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, FakeSettings);

            this.linuxPrefix = linuxPrefix;
            this.command = command;
            this.build = build;
            this.parameters = parameters;
            this.test = test;
        }

        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(FakeSettings, [{
            key: __WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection,
            value: function value() {
                return {
                    type: "Ionide.VSCode.Helpers.Settings.FakeSettings",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        linuxPrefix: "string",
                        command: "string",
                        build: "string",
                        parameters: Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["a" /* Array */])("string"),
                        test: "string"
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["g" /* equalsRecords */])(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["d" /* compareRecords */])(this, other) | 0;
            }
        }]);

        return FakeSettings;
    }();

    Object(__WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["b" /* setType */])("Ionide.VSCode.Helpers.Settings.FakeSettings", FakeSettings);

    var WebPreviewSettings = __exports.WebPreviewSettings = function () {
        function WebPreviewSettings(linuxPrefix, command, host, port, script, build, startString, parameters, startingPage) {
            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, WebPreviewSettings);

            this.linuxPrefix = linuxPrefix;
            this.command = command;
            this.host = host;
            this.port = port | 0;
            this.script = script;
            this.build = build;
            this.startString = startString;
            this.parameters = parameters;
            this.startingPage = startingPage;
        }

        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(WebPreviewSettings, [{
            key: __WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection,
            value: function value() {
                return {
                    type: "Ionide.VSCode.Helpers.Settings.WebPreviewSettings",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        linuxPrefix: "string",
                        command: "string",
                        host: "string",
                        port: "number",
                        script: "string",
                        build: "string",
                        startString: "string",
                        parameters: Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["a" /* Array */])("string"),
                        startingPage: "string"
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["g" /* equalsRecords */])(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["d" /* compareRecords */])(this, other) | 0;
            }
        }]);

        return WebPreviewSettings;
    }();

    Object(__WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["b" /* setType */])("Ionide.VSCode.Helpers.Settings.WebPreviewSettings", WebPreviewSettings);

    var Settings = __exports.Settings = function () {
        function Settings(fake, webPreview) {
            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Settings);

            this.Fake = fake;
            this.WebPreview = webPreview;
        }

        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Settings, [{
            key: __WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["a" /* default */].reflection,
            value: function value() {
                return {
                    type: "Ionide.VSCode.Helpers.Settings.Settings",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        Fake: FakeSettings,
                        WebPreview: WebPreviewSettings
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["g" /* equalsRecords */])(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return Object(__WEBPACK_IMPORTED_MODULE_13_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Util__["d" /* compareRecords */])(this, other) | 0;
            }
        }]);

        return Settings;
    }();

    Object(__WEBPACK_IMPORTED_MODULE_4_C_Users_Krzysztof_nuget_packages_fable_core_1_3_17_fable_core_Symbol__["b" /* setType */])("Ionide.VSCode.Helpers.Settings.Settings", Settings);

    var loadOrDefault = __exports.loadOrDefault = function (map_1, def) {
        try {
            var path = __WEBPACK_IMPORTED_MODULE_5_vscode__["workspace"].rootPath + "/.ionide";
            var t = map_1(toml.parse(__WEBPACK_IMPORTED_MODULE_14_fs__["readFileSync"](path).toString()));

            if (t != undefined) {
                return t;
            } else {
                return def;
            }
        } catch (matchValue) {
            return def;
        }
    };

    return __exports;
}({});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
__webpack_require__(19);
__webpack_require__(21);
__webpack_require__(110);
__webpack_require__(113);
__webpack_require__(114);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(109);
var step = __webpack_require__(71);
var Iterators = __webpack_require__(20);
var toIObject = __webpack_require__(18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(48)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var global = __webpack_require__(2);
var ctx = __webpack_require__(10);
var classof = __webpack_require__(37);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(6);
var aFunction = __webpack_require__(24);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(22);
var speciesConstructor = __webpack_require__(72);
var task = __webpack_require__(73).set;
var microtask = __webpack_require__(112)();
var newPromiseCapabilityModule = __webpack_require__(56);
var perform = __webpack_require__(74);
var promiseResolve = __webpack_require__(75);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(40)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(27)($Promise, PROMISE);
__webpack_require__(76)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(70)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 111 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(73).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(26)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(72);
var promiseResolve = __webpack_require__(75);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(56);
var perform = __webpack_require__(74);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(116);
__webpack_require__(38);
__webpack_require__(118);
__webpack_require__(119);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(9);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(49);
var META = __webpack_require__(29).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(53);
var setToStringTag = __webpack_require__(27);
var uid = __webpack_require__(36);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(57);
var wksDefine = __webpack_require__(58);
var enumKeys = __webpack_require__(117);
var isArray = __webpack_require__(78);
var anObject = __webpack_require__(8);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(45);
var createDesc = __webpack_require__(25);
var _create = __webpack_require__(50);
var gOPNExt = __webpack_require__(79);
var $GOPD = __webpack_require__(81);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(34);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(80).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(41).f = $propertyIsEnumerable;
  __webpack_require__(59).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(33)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(41);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58)('asyncIterator');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58)('observable');


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
__webpack_require__(19);
__webpack_require__(21);
__webpack_require__(121);
__webpack_require__(125);
__webpack_require__(128);
__webpack_require__(129);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(122);
var validate = __webpack_require__(42);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(83)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(5).f;
var create = __webpack_require__(50);
var redefineAll = __webpack_require__(40);
var ctx = __webpack_require__(10);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(22);
var $iterDefine = __webpack_require__(48);
var step = __webpack_require__(71);
var setSpecies = __webpack_require__(76);
var DESCRIPTORS = __webpack_require__(9);
var fastKey = __webpack_require__(29).fastKey;
var validate = __webpack_require__(42);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(124);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var isArray = __webpack_require__(78);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(3);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(126)('Map') });


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(37);
var from = __webpack_require__(127);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(22);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(84)('Map');


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(85)('Map');


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(21);
module.exports = __webpack_require__(57).f('iterator');


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(18);
var $getOwnPropertyDescriptor = __webpack_require__(81).f;

__webpack_require__(62)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(19);
module.exports = __webpack_require__(135);


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var get = __webpack_require__(55);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
__webpack_require__(21);
__webpack_require__(138);
__webpack_require__(140);
__webpack_require__(141);
module.exports = __webpack_require__(0).WeakMap;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(60)(0);
var redefine = __webpack_require__(49);
var meta = __webpack_require__(29);
var assign = __webpack_require__(87);
var weak = __webpack_require__(139);
var isObject = __webpack_require__(6);
var fails = __webpack_require__(12);
var validate = __webpack_require__(42);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(83)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(40);
var getWeak = __webpack_require__(29).getWeak;
var anObject = __webpack_require__(8);
var isObject = __webpack_require__(6);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(22);
var createArrayMethod = __webpack_require__(60);
var $has = __webpack_require__(14);
var validate = __webpack_require__(42);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(84)('WeakMap');


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(85)('WeakMap');


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(87) });


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyNames(it) {
  return $Object.getOwnPropertyNames(it);
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(62)('getOwnPropertyNames', function () {
  return __webpack_require__(79).f;
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(152);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(28);
var $getPrototypeOf = __webpack_require__(67);

__webpack_require__(62)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(31);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(77);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fromEqualityComparer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Symbol__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Util__ = __webpack_require__(4);





var Comparer = function () {
    function Comparer(f) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Comparer);

        this.Compare = f || __WEBPACK_IMPORTED_MODULE_3__Util__["c" /* compare */];
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Comparer, [{
        key: __WEBPACK_IMPORTED_MODULE_2__Symbol__["a" /* default */].reflection,
        value: function value() {
            return { interfaces: ["System.IComparer"] };
        }
    }]);

    return Comparer;
}();

/* harmony default export */ __webpack_exports__["a"] = (Comparer);

function fromEqualityComparer(comparer) {
    // Sometimes IEqualityComparer also implements IComparer
    if (typeof comparer.Compare === "function") {
        return new Comparer(comparer.Compare);
    } else {
        return new Comparer(function (x, y) {
            var xhash = comparer.GetHashCode(x);
            var yhash = comparer.GetHashCode(y);
            if (xhash === yhash) {
                return comparer.Equals(x, y) ? 0 : -1;
            } else {
                return xhash < yhash ? -1 : 1;
            }
        });
    }
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(156);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(23);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(157), __esModule: true };

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(19);
module.exports = __webpack_require__(158);


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(37);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(20);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = CurriedLambda;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);

function CurriedLambda(f, expectedArgsLength) {
    if (f.curried === true) {
        return f;
    }
    var curriedFn = function curriedFn() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var args2 = args.map(function (x) {
            return typeof x === "function" ? CurriedLambda(x) : x;
        });
        var actualArgsLength = Math.max(args2.length, 1);
        expectedArgsLength = Math.max(expectedArgsLength || f.length, 1);
        if (actualArgsLength >= expectedArgsLength) {
            var restArgs = args2.splice(expectedArgsLength);
            var res = f.apply(undefined, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(args2));
            if (typeof res === "function") {
                var newLambda = CurriedLambda(res);
                return restArgs.length === 0 ? newLambda : newLambda.apply(undefined, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(restArgs));
            } else {
                return res;
            }
        } else {
            return CurriedLambda(function () {
                for (var _len2 = arguments.length, args3 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args3[_key2] = arguments[_key2];
                }

                return f.apply(undefined, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(args2.concat(args3)));
            }, expectedArgsLength - actualArgsLength);
        }
    };
    curriedFn.curried = true;
    return curriedFn;
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(13);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export create */
/* harmony export (immutable) */ __webpack_exports__["a"] = escape;
/* unused harmony export unescape */
/* unused harmony export isMatch */
/* unused harmony export match */
/* unused harmony export matches */
/* unused harmony export options */
/* unused harmony export replace */
/* unused harmony export split */
function create(pattern, options) {
    var flags = "g";
    flags += options & 1 ? "i" : "";
    flags += options & 2 ? "m" : "";
    return new RegExp(pattern, flags);
}
// From http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escape(str) {
    return str.replace(/[\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function unescape(str) {
    return str.replace(/\\([\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|])/g, "$1");
}
function isMatch(str, pattern) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var reg = void 0;
    reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = create(pattern, options);
    return reg.test(str);
}
function match(str, pattern) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var reg = void 0;
    reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = create(pattern, options);
    return reg.exec(str);
}
function matches(str, pattern) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var reg = void 0;
    reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = create(pattern, options);
    if (!reg.global) {
        throw new Error("Non-global RegExp"); // Prevent infinite loop
    }
    var m = reg.exec(str);
    var matches = [];
    while (m !== null) {
        matches.push(m);
        m = reg.exec(str);
    }
    return matches;
}
function options(reg) {
    var options = 256; // ECMAScript
    options |= reg.ignoreCase ? 1 : 0;
    options |= reg.multiline ? 2 : 0;
    return options;
}
function replace(reg, input, replacement, limit) {
    var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    function replacer() {
        var res = arguments[0];
        if (limit !== 0) {
            limit--;
            var _match = [];
            var len = arguments.length;
            for (var i = 0; i < len - 2; i++) {
                _match.push(arguments[i]);
            }
            _match.index = arguments[len - 2];
            _match.input = arguments[len - 1];
            res = replacement(_match);
        }
        return res;
    }
    if (typeof reg === "string") {
        var tmp = reg;
        reg = create(input, limit);
        input = tmp;
        limit = undefined;
    }
    if (typeof replacement === "function") {
        limit = limit == null ? -1 : limit;
        return input.substring(0, offset) + input.substring(offset).replace(reg, replacer);
    } else {
        // $0 doesn't work with JS regex, see #1155
        replacement = replacement.replace(/\$0/g, function (s) {
            return "$&";
        });
        if (limit != null) {
            var m = void 0;
            var sub1 = input.substring(offset);
            var _matches = matches(reg, sub1);
            var sub2 = matches.length > limit ? (m = _matches[limit - 1], sub1.substring(0, m.index + m[0].length)) : sub1;
            return input.substring(0, offset) + sub2.replace(reg, replacement) + input.substring(offset + sub2.length);
        } else {
            return input.replace(reg, replacement);
        }
    }
}
function split(reg, input, limit) {
    var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (typeof reg === "string") {
        var tmp = reg;
        reg = create(input, limit);
        input = tmp;
        limit = undefined;
    }
    input = input.substring(offset);
    return input.split(reg, limit);
}

/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ])));
//# sourceMappingURL=paket.js.map