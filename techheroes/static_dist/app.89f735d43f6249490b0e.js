webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(22);
var isNil = __webpack_require__(50);
var fail = __webpack_require__(1056);
var stringify = __webpack_require__(418);

function assert(guard, message) {
  if (guard !== true) {
    if (isFunction(message)) { // handle lazy messages
      message = message();
    }
    else if (isNil(message)) { // use a default message
      message = 'Assert failed (turn on "Pause on exceptions" in your Source panel)';
    }
    assert.fail(message);
  }
}

assert.fail = fail;
assert.stringify = stringify;

module.exports = assert;

/***/ },
/* 14 */,
/* 15 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

var isType = __webpack_require__(23);
var getFunctionName = __webpack_require__(133);

module.exports = function getTypeName(ctor) {
  if (isType(ctor)) {
    return ctor.displayName;
  }
  return getFunctionName(ctor);
};

/***/ },
/* 21 */,
/* 22 */
/***/ function(module, exports) {

module.exports = function isFunction(x) {
  return typeof x === 'function';
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(22);
var isObject = __webpack_require__(62);

module.exports = function isType(x) {
  return isFunction(x) && isObject(x.meta);
};

/***/ },
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isString = __webpack_require__(178);
var isFunction = __webpack_require__(22);
var forbidNewOperator = __webpack_require__(132);

module.exports = function irreducible(name, predicate) {

  if (true) {
    assert(isString(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to irreducible(name, predicate) (expected a string)'; });
    assert(isFunction(predicate), 'Invalid argument predicate ' + assert.stringify(predicate) + ' supplied to irreducible(name, predicate) (expected a function)');
  }

  function Irreducible(value, path) {

    if (true) {
      forbidNewOperator(this, Irreducible);
      path = path || [name];
      assert(predicate(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    return value;
  }

  Irreducible.meta = {
    kind: 'irreducible',
    name: name,
    predicate: predicate,
    identity: true
  };

  Irreducible.displayName = name;

  Irreducible.is = predicate;

  return Irreducible;
};


/***/ },
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _assign = __webpack_require__(444);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ },
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ function(module, exports, __webpack_require__) {

var isNil = __webpack_require__(50);
var isString = __webpack_require__(178);

module.exports = function isTypeName(name) {
  return isNil(name) || isString(name);
};

/***/ },
/* 38 */,
/* 39 */
/***/ function(module, exports, __webpack_require__) {

var store      = __webpack_require__(193)('wks')
  , uid        = __webpack_require__(142)
  , Symbol     = __webpack_require__(65).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ },
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ function(module, exports) {

module.exports = function isNil(x) {
  return x === null || x === void 0;
};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(65)
  , core      = __webpack_require__(15)
  , ctx       = __webpack_require__(184)
  , hide      = __webpack_require__(96)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
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
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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

/***/ },
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ function(module, exports, __webpack_require__) {

var isType = __webpack_require__(23);
var getFunctionName = __webpack_require__(133);
var assert = __webpack_require__(13);
var stringify = __webpack_require__(418);

// creates an instance of a type, handling the optional new operator
module.exports = function create(type, value, path) {
  if (isType(type)) {
    return !type.meta.identity && typeof value === 'object' && value !== null ? new type(value, path): type(value, path);
  }

  if (true) {
    // here type should be a class constructor and value some instance, just check membership and return the value
    path = path || [getFunctionName(type)];
    assert(value instanceof type, function () { return 'Invalid value ' + stringify(value) + ' supplied to ' + path.join('/'); });
  }

  return value;
};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

var isType = __webpack_require__(23);

// returns true if x is an instance of type
module.exports = function is(x, type) {
  if (isType(type)) {
    return type.is(x);
  }
  return x instanceof type; // type should be a class constructor
};


/***/ },
/* 60 */
/***/ function(module, exports) {

module.exports = function isArray(x) {
  return Array.isArray ? Array.isArray(x) : x instanceof Array;
};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var Boolean = __webpack_require__(409);
var isType = __webpack_require__(23);
var getTypeName = __webpack_require__(20);

// return true if the type constructor behaves like the identity function
module.exports = function isIdentity(type) {
  if (isType(type)) {
    if (true) {
      assert(Boolean.is(type.meta.identity), function () { return 'Invalid meta identity ' + assert.stringify(type.meta.identity) + ' supplied to type ' + getTypeName(type); });
    }
    return type.meta.identity;
  }
  // for tcomb the other constructors, like ES6 classes, are identity-like
  return true;
};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

var isNil = __webpack_require__(50);
var isArray = __webpack_require__(60);

module.exports = function isObject(x) {
  return !isNil(x) && typeof x === 'object' && !isArray(x);
};

/***/ },
/* 63 */,
/* 64 */,
/* 65 */
/***/ function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(76)
  , IE8_DOM_DEFINE = __webpack_require__(284)
  , toPrimitive    = __webpack_require__(195)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(77) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(285)
  , defined = __webpack_require__(185);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ },
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/***/ function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ },
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(97);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(95)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 78 */
/***/ function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */
/***/ function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(792),
    getValue = __webpack_require__(813);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ },
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */
/***/ function(module, exports, __webpack_require__) {

/*! @preserve
 *
 * tcomb.js - Type checking and DDD for JavaScript
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Giulio Canti
 *
 */

// core
var t = __webpack_require__(13);

// types
t.Any = __webpack_require__(268);
t.Array = __webpack_require__(1046);
t.Boolean = __webpack_require__(409);
t.Date = __webpack_require__(1047);
t.Error = __webpack_require__(1048);
t.Function = __webpack_require__(176);
t.Nil = __webpack_require__(410);
t.Number = __webpack_require__(411);
t.Integer = __webpack_require__(1049);
t.IntegerT = t.Integer;
t.Object = __webpack_require__(1050);
t.RegExp = __webpack_require__(1051);
t.String = __webpack_require__(269);
t.Type = __webpack_require__(1052);
t.TypeT = t.Type;

// short alias are deprecated
t.Arr = t.Array;
t.Bool = t.Boolean;
t.Dat = t.Date;
t.Err = t.Error;
t.Func = t.Function;
t.Num = t.Number;
t.Obj = t.Object;
t.Re = t.RegExp;
t.Str = t.String;

// combinators
t.dict = __webpack_require__(270);
t.declare = __webpack_require__(1053);
t.enums = __webpack_require__(1055);
t.irreducible = __webpack_require__(31);
t.list = __webpack_require__(417);
t.maybe = __webpack_require__(1064);
t.refinement = __webpack_require__(272);
t.struct = __webpack_require__(1065);
t.tuple = __webpack_require__(419);
t.union = __webpack_require__(1066);
t.func = __webpack_require__(1057);
t.intersection = __webpack_require__(1059);
t.subtype = t.refinement;
t.inter = __webpack_require__(1058); // IE8 alias
t['interface'] = t.inter;

// functions
t.assert = t;
t.update = __webpack_require__(1067);
t.mixin = __webpack_require__(271);
t.isType = __webpack_require__(23);
t.is = __webpack_require__(59);
t.getTypeName = __webpack_require__(20);
t.match = __webpack_require__(1063);

module.exports = t;


/***/ },
/* 94 */,
/* 95 */
/***/ function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(66)
  , createDesc = __webpack_require__(115);
module.exports = __webpack_require__(77) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ },
/* 97 */
/***/ function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 98 */
/***/ function(module, exports) {

module.exports = {};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(290)
  , enumBugKeys = __webpack_require__(186);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ },
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = shouldPureComponentUpdate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shallowEqual = __webpack_require__(955);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function shouldPureComponentUpdate(nextProps, nextState) {
  return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
}

module.exports = exports['default'];

/***/ },
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(521), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ },
/* 115 */
/***/ function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(185);
module.exports = function(it){
  return Object(defined(it));
};

/***/ },
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tcomb = __webpack_require__(93);

var _tcomb2 = _interopRequireDefault(_tcomb);

var Positive = _tcomb2['default'].refinement(_tcomb2['default'].Number, function (n) {
  return n % 1 === 0 && n >= 0;
}, 'Positive');

var Cols = _tcomb2['default'].tuple([Positive, Positive], 'Cols');

var Breakpoints = _tcomb2['default'].struct({
  xs: _tcomb2['default'].maybe(Cols),
  sm: _tcomb2['default'].maybe(Cols),
  md: _tcomb2['default'].maybe(Cols),
  lg: _tcomb2['default'].maybe(Cols)
}, 'Breakpoints');

function getBreakpointsClassName(breakpoints) {
  var className = {};
  for (var size in breakpoints) {
    if (breakpoints.hasOwnProperty(size)) {
      className['col-' + size + '-' + breakpoints[size]] = true;
    }
  }
  return className;
}

function getOffsetsClassName(breakpoints) {
  var className = {};
  for (var size in breakpoints) {
    if (breakpoints.hasOwnProperty(size)) {
      className['col-' + size + '-offset-' + (12 - breakpoints[size])] = true;
    }
  }
  return className;
}

Breakpoints.prototype.getBreakpoints = function getBreakpoints(colIndex) {
  var breakpoints = {};
  for (var size in this) {
    if (this.hasOwnProperty(size) && !_tcomb2['default'].Nil.is(this[size])) {
      breakpoints[size] = this[size][colIndex];
    }
  }
  return breakpoints;
};

Breakpoints.prototype.getLabelClassName = function getLabelClassName() {
  return getBreakpointsClassName(this.getBreakpoints(0));
};

Breakpoints.prototype.getInputClassName = function getInputClassName() {
  return getBreakpointsClassName(this.getBreakpoints(1));
};

Breakpoints.prototype.getOffsetClassName = function getOffsetClassName() {
  return _tcomb2['default'].mixin(getOffsetsClassName(this.getBreakpoints(1)), getBreakpointsClassName(this.getBreakpoints(1)));
};

exports['default'] = Breakpoints;
module.exports = exports['default'];

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;
exports["default"] = getError;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function getError(_ref) {
  var hasError = _ref.hasError;
  var error = _ref.error;

  if (hasError && error) {
    return _react2["default"].createElement(
      "span",
      { className: "help-block error-block" },
      error
    );
  }
}

module.exports = exports["default"];

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;
exports["default"] = getHelp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function getHelp(_ref) {
  var help = _ref.help;
  var attrs = _ref.attrs;

  if (help) {
    return _react2["default"].createElement(
      "span",
      { className: "help-block", id: attrs.id + "-tip'" },
      help
    );
  }
}

module.exports = exports["default"];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = renderFormGroup;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _FormGroup = __webpack_require__(1032);

var _FormGroup2 = _interopRequireDefault(_FormGroup);

function renderFormGroup(children, _ref) {
  var path = _ref.path;
  var hasError = _ref.hasError;

  var className = 'form-group-depth-' + path.length;
  if (path.length > 0) {
    className += ' form-group-' + path.join('-');
  }
  return _react2['default'].createElement.apply(null, [_FormGroup2['default'], { className: className, hasError: hasError }].concat(children));
}

module.exports = exports['default'];

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var getTypeName = __webpack_require__(20);

module.exports = function forbidNewOperator(x, type) {
  assert(!(x instanceof type), function () { return 'Cannot use the new operator to instantiate the type ' + getTypeName(type); });
};

/***/ },
/* 133 */
/***/ function(module, exports) {

module.exports = function getFunctionName(f) {
  return f.displayName || f.name || '<function' + f.length + '>';
};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.authLoginUserSuccess = authLoginUserSuccess;
exports.authLoginUserFailure = authLoginUserFailure;
exports.authLoginUserRequest = authLoginUserRequest;
exports.authLogout = authLogout;
exports.authLogoutAndRedirect = authLogoutAndRedirect;
exports.authLoginUser = authLoginUser;

var _isomorphicFetch = __webpack_require__(329);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRouterRedux = __webpack_require__(44);

var _config = __webpack_require__(275);

var _utils = __webpack_require__(136);

var _constants = __webpack_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authLoginUserSuccess(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: _constants.AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token: token,
            user: user
        }
    };
}

function authLoginUserFailure(error, message) {
    sessionStorage.removeItem('token');
    return {
        type: _constants.AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

function authLoginUserRequest() {
    return {
        type: _constants.AUTH_LOGIN_USER_REQUEST
    };
}

function authLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return {
        type: _constants.AUTH_LOGOUT_USER
    };
}

function authLogoutAndRedirect() {
    return function (dispatch, state) {
        dispatch(authLogout());
        dispatch((0, _reactRouterRedux.push)('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

function authLoginUser(email, password) {
    var redirect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/';

    return function (dispatch) {
        dispatch(authLoginUserRequest());
        var auth = btoa(email + ':' + password);
        return (0, _isomorphicFetch2.default)(_config.SERVER_URL + '/api/v1/accounts/login/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + auth
            }
        }).then(_utils.checkHttpStatus).then(_utils.parseJSON).then(function (response) {
            dispatch(authLoginUserSuccess(response.token, response.user));
            dispatch((0, _reactRouterRedux.push)(redirect));
        }).catch(function (error) {
            if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                // Invalid authentication credentials
                return error.response.json().then(function (data) {
                    dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                });
            } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                // Server side error
                dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
            } else {
                // Most likely connection issues
                dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
            }

            return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
        });
    };
}

/***/ },
/* 135 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
var AUTH_LOGIN_USER_REQUEST = exports.AUTH_LOGIN_USER_REQUEST = 'AUTH_LOGIN_USER_REQUEST';
var AUTH_LOGIN_USER_FAILURE = exports.AUTH_LOGIN_USER_FAILURE = 'AUTH_LOGIN_USER_FAILURE';
var AUTH_LOGIN_USER_SUCCESS = exports.AUTH_LOGIN_USER_SUCCESS = 'AUTH_LOGIN_USER_SUCCESS';
var AUTH_LOGOUT_USER = exports.AUTH_LOGOUT_USER = 'AUTH_LOGOUT_USER';

var DATA_FETCH_PROTECTED_DATA_REQUEST = exports.DATA_FETCH_PROTECTED_DATA_REQUEST = 'DATA_FETCH_PROTECTED_DATA_REQUEST';
var DATA_RECEIVE_PROTECTED_DATA = exports.DATA_RECEIVE_PROTECTED_DATA = 'DATA_RECEIVE_PROTECTED_DATA';

/***/ },
/* 136 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.__esModule = true;
exports.createReducer = createReducer;
exports.checkHttpStatus = checkHttpStatus;
exports.parseJSON = parseJSON;
function createReducer(initialState, reducerMap) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        var reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}

function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    var error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json();
}

/***/ },
/* 137 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(449);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(445);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(139);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _iterator = __webpack_require__(277);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(450);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ },
/* 140 */
/***/ function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(51)
  , core    = __webpack_require__(15)
  , fails   = __webpack_require__(95);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ },
/* 142 */
/***/ function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var $at  = __webpack_require__(543)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(286)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ },
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */
/***/ function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(824),
    listCacheDelete = __webpack_require__(825),
    listCacheGet = __webpack_require__(826),
    listCacheHas = __webpack_require__(827),
    listCacheSet = __webpack_require__(828);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

var eq = __webpack_require__(349);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(821);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(88);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(235);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ },
/* 163 */
/***/ function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ },
/* 164 */
/***/ function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ },
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = getLabel;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

function getLabel(_ref) {
  var label = _ref.label;
  var breakpoints = _ref.breakpoints;
  var htmlFor = _ref.htmlFor;
  var id = _ref.id;

  if (label) {
    var className = breakpoints ? breakpoints.getLabelClassName() : {};
    className['control-label'] = true;
    return _react2['default'].createElement(
      'label',
      { htmlFor: htmlFor, id: id, className: _classnames2['default'](className) },
      label
    );
  }
}

module.exports = exports['default'];

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);
var isFunction = __webpack_require__(22);

module.exports = irreducible('Function', isFunction);


/***/ },
/* 177 */
/***/ function(module, exports) {

module.exports = function isBoolean(x) {
  return x === true || x === false;
};

/***/ },
/* 178 */
/***/ function(module, exports) {

module.exports = function isString(x) {
  return typeof x === 'string';
};

/***/ },
/* 179 */,
/* 180 */,
/* 181 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(512), __esModule: true };

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _typeof2 = __webpack_require__(139);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ },
/* 183 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(525);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 185 */
/***/ function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 186 */
/***/ function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ },
/* 187 */
/***/ function(module, exports) {

module.exports = true;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(76)
  , dPs         = __webpack_require__(541)
  , enumBugKeys = __webpack_require__(186)
  , IE_PROTO    = __webpack_require__(192)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(283)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(530).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(140)
  , createDesc     = __webpack_require__(115)
  , toIObject      = __webpack_require__(67)
  , toPrimitive    = __webpack_require__(195)
  , has            = __webpack_require__(78)
  , IE8_DOM_DEFINE = __webpack_require__(284)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(77) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ },
/* 190 */
/***/ function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

var def = __webpack_require__(66).f
  , has = __webpack_require__(78)
  , TAG = __webpack_require__(39)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

var shared = __webpack_require__(193)('keys')
  , uid    = __webpack_require__(142);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

var global = __webpack_require__(65)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ },
/* 194 */
/***/ function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(97);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

var global         = __webpack_require__(65)
  , core           = __webpack_require__(15)
  , LIBRARY        = __webpack_require__(187)
  , wksExt         = __webpack_require__(197)
  , defineProperty = __webpack_require__(66).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(39);

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(548);
var global        = __webpack_require__(65)
  , hide          = __webpack_require__(96)
  , Iterators     = __webpack_require__(98)
  , TO_STRING_TAG = __webpack_require__(39)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ },
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(88),
    root = __webpack_require__(56);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(829),
    mapCacheDelete = __webpack_require__(830),
    mapCacheGet = __webpack_require__(831),
    mapCacheHas = __webpack_require__(832),
    mapCacheSet = __webpack_require__(833);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(228),
    setCacheAdd = __webpack_require__(840),
    setCacheHas = __webpack_require__(841);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ },
/* 230 */
/***/ function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(71),
    isSymbol = __webpack_require__(235);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ },
/* 232 */
/***/ function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(788),
    isObjectLike = __webpack_require__(89);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ },
/* 234 */
/***/ function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(105),
    isObjectLike = __webpack_require__(89);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(778),
    baseKeys = __webpack_require__(795),
    isArrayLike = __webpack_require__(350);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ },
/* 237 */
/***/ function(module, exports) {

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

module.exports = clamp;

/***/ },
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _classCallCheck2 = __webpack_require__(137);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(182);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(138);

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _JSONArrow = __webpack_require__(377);

var _JSONArrow2 = _interopRequireDefault(_JSONArrow);

var _getCollectionEntries = __webpack_require__(952);

var _getCollectionEntries2 = _interopRequireDefault(_getCollectionEntries);

var _JSONNode = __webpack_require__(378);

var _JSONNode2 = _interopRequireDefault(_JSONNode);

var _ItemRange = __webpack_require__(946);

var _ItemRange2 = _interopRequireDefault(_ItemRange);

var _function = __webpack_require__(108);

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Renders nested values (eg. objects, arrays, lists, etc.)
 */

function renderChildNodes(props, from, to) {
  var nodeType = props.nodeType;
  var data = props.data;
  var collectionLimit = props.collectionLimit;
  var circularCache = props.circularCache;
  var keyPath = props.keyPath;
  var postprocessValue = props.postprocessValue;
  var sortObjectKeys = props.sortObjectKeys;

  var childNodes = [];

  (0, _getCollectionEntries2['default'])(nodeType, data, sortObjectKeys, collectionLimit, from, to).forEach(function (entry) {
    if (entry.to) {
      childNodes.push(_react2['default'].createElement(_ItemRange2['default'], (0, _extends3['default'])({}, props, {
        key: 'ItemRange--' + entry.from + '-' + entry.to,
        from: entry.from,
        to: entry.to,
        renderChildNodes: renderChildNodes
      })));
    } else {
      var key = entry.key;
      var value = entry.value;

      var isCircular = circularCache.indexOf(value) !== -1;

      var node = _react2['default'].createElement(_JSONNode2['default'], (0, _extends3['default'])({}, props, { postprocessValue: postprocessValue, collectionLimit: collectionLimit }, {
        key: 'Node--' + key,
        keyPath: [key].concat(keyPath),
        value: postprocessValue(value),
        circularCache: [].concat(circularCache, [value]),
        isCircular: isCircular,
        hideRoot: false
      }));

      if (node !== false) {
        childNodes.push(node);
      }
    }
  });

  return childNodes;
}

var JSONNestedNode = (_temp = _class = function (_React$Component) {
  (0, _inherits3['default'])(JSONNestedNode, _React$Component);

  function JSONNestedNode(props) {
    (0, _classCallCheck3['default'])(this, JSONNestedNode);


    // calculate individual node expansion if necessary

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.shouldComponentUpdate = _function2['default'];

    _this.handleClick = function () {
      return _this.setState({ expanded: !_this.state.expanded });
    };

    var expanded = props.shouldExpandNode && !props.isCircular ? props.shouldExpandNode(props.keyPath, props.data, props.level) : false;
    _this.state = {
      expanded: expanded,
      createdChildNodes: false
    };
    return _this;
  }

  JSONNestedNode.prototype.render = function render() {
    var _props = this.props;
    var getItemString = _props.getItemString;
    var nodeTypeIndicator = _props.nodeTypeIndicator;
    var nodeType = _props.nodeType;
    var data = _props.data;
    var hideRoot = _props.hideRoot;
    var createItemString = _props.createItemString;
    var styling = _props.styling;
    var collectionLimit = _props.collectionLimit;
    var keyPath = _props.keyPath;
    var labelRenderer = _props.labelRenderer;
    var expandable = _props.expandable;

    var expanded = this.state.expanded;
    var renderedChildren = expanded ? renderChildNodes((0, _extends3['default'])({}, this.props, { level: this.props.level + 1 })) : null;

    var itemType = _react2['default'].createElement(
      'span',
      styling('nestedNodeItemType', expanded),
      nodeTypeIndicator
    );
    var renderedItemString = getItemString(nodeType, data, itemType, createItemString(data, collectionLimit));
    var stylingArgs = [keyPath, nodeType, expanded, expandable];

    return hideRoot ? _react2['default'].createElement(
      'li',
      styling.apply(undefined, ['rootNode'].concat(stylingArgs)),
      _react2['default'].createElement(
        'ul',
        styling.apply(undefined, ['rootNodeChildren'].concat(stylingArgs)),
        renderedChildren
      )
    ) : _react2['default'].createElement(
      'li',
      styling.apply(undefined, ['nestedNode'].concat(stylingArgs)),
      expandable && _react2['default'].createElement(_JSONArrow2['default'], {
        styling: styling,
        nodeType: nodeType,
        expanded: expanded,
        onClick: this.handleClick
      }),
      _react2['default'].createElement(
        'label',
        (0, _extends3['default'])({}, styling.apply(undefined, [['label', 'nestedNodeLabel']].concat(stylingArgs)), {
          onClick: expandable && this.handleClick
        }),
        labelRenderer.apply(undefined, stylingArgs)
      ),
      _react2['default'].createElement(
        'span',
        (0, _extends3['default'])({}, styling.apply(undefined, ['nestedNodeItemString'].concat(stylingArgs)), {
          onClick: expandable && this.handleClick
        }),
        renderedItemString
      ),
      _react2['default'].createElement(
        'ul',
        styling.apply(undefined, ['nestedNodeChildren'].concat(stylingArgs)),
        renderedChildren
      )
    );
  };

  return JSONNestedNode;
}(_react2['default'].Component), _class.propTypes = {
  getItemString: _react.PropTypes.func.isRequired,
  nodeTypeIndicator: _react.PropTypes.any,
  nodeType: _react.PropTypes.string.isRequired,
  data: _react.PropTypes.any,
  hideRoot: _react.PropTypes.bool.isRequired,
  createItemString: _react.PropTypes.func.isRequired,
  styling: _react.PropTypes.func.isRequired,
  collectionLimit: _react.PropTypes.number,
  keyPath: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])).isRequired,
  labelRenderer: _react.PropTypes.func.isRequired,
  shouldExpandNode: _react.PropTypes.func,
  level: _react.PropTypes.number.isRequired,
  sortObjectKeys: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool]),
  isCircular: _react.PropTypes.bool,
  expandable: _react.PropTypes.bool
}, _class.defaultProps = {
  data: [],
  circularCache: [],
  level: 0,
  expandable: true
}, _temp);
exports['default'] = JSONNestedNode;

/***/ },
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var t = __webpack_require__(93);
var stringify = t.stringify;

var noobj = {};

var ValidationError = t.struct({
  message: t.Any,
  actual: t.Any,
  expected: t.Any,
  path: t.list(t.union([t.String, t.Number]))
}, 'ValidationError');

function getDefaultValidationErrorMessage(actual, expected, path) {
  var expectedName = t.getTypeName(expected);
  var to = path.length ? '/' + path.join('/') + ': ' + expectedName : expectedName;
  return 'Invalid value ' + stringify(actual) + ' supplied to ' + to;
}

function getValidationErrorMessage(actual, expected, path, context) {
  if (t.Function.is(expected.getValidationErrorMessage)) {
    return expected.getValidationErrorMessage(actual, path, context);
  }
  else {
    return getDefaultValidationErrorMessage(actual, expected, path);
  }
}

ValidationError.of = function (actual, expected, path, context) {
  return new ValidationError({
    message: getValidationErrorMessage(actual, expected, path, context),
    actual: actual,
    expected: expected,
    path: path
  });
};

var ValidationResult = t.struct({
  errors: t.list(ValidationError),
  value: t.Any
}, 'ValidationResult');

ValidationResult.prototype.isValid = function () {
  return !(this.errors.length);
};

ValidationResult.prototype.firstError = function () {
  return this.isValid() ? null : this.errors[0];
};

ValidationResult.prototype.toString = function () {
  if (this.isValid()) {
    return '[ValidationResult, true, ' + stringify(this.value) + ']';
  }
  else {
    return '[ValidationResult, false, (' + this.errors.map(function (err) {
      return stringify(err.message);
    }).join(', ') + ')]';
  }
};

function validate(x, type, options) {
  options = options || {};
  var path = t.Array.is(options) ? options : options.path || [];
  return new ValidationResult(recurse(x, type, path, options));
}

function recurse(x, type, path, options) {
  if (t.isType(type)) {
    return validators[type.meta.kind](x, type, path, options);
  }
  else {
    return validators.es6classes(x, type, path, options);
  }
}

var validators = validate.validators = {};

validators.es6classes = function validateES6Classes(x, type, path, options) {
  return {
    value: x,
    errors: x instanceof type ? [] : [ValidationError.of(x, type, path, options.context)]
  };
};

// irreducibles and enums
validators.irreducible =
validators.enums = function validateIrreducible(x, type, path, options) {
  return {
    value: x,
    errors: type.is(x) ? [] : [ValidationError.of(x, type, path, options.context)]
  };
};

validators.list = function validateList(x, type, path, options) {

  // x should be an array
  if (!t.Array.is(x)) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  var ret = {value: [], errors: []};
  // every item should be of type `type.meta.type`
  for (var i = 0, len = x.length; i < len; i++ ) {
    var item = recurse(x[i], type.meta.type, path.concat(i), options);
    ret.value[i] = item.value;
    ret.errors = ret.errors.concat(item.errors);
  }
  return ret;
};

validators.subtype = function validateSubtype(x, type, path, options) {

  // x should be a valid inner type
  var ret = recurse(x, type.meta.type, path, options);
  if (ret.errors.length) {
    return ret;
  }

  // x should satisfy the predicate
  if (!type.meta.predicate(ret.value)) {
    ret.errors = [ValidationError.of(x, type, path, options.context)];
  }

  return ret;

};

validators.maybe = function validateMaybe(x, type, path, options) {
  return t.Nil.is(x) ?
    {value: x, errors: []} :
    recurse(x, type.meta.type, path, options);
};

validators.struct = function validateStruct(x, type, path, options) {

  // x should be an object
  if (!t.Object.is(x)) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  // [optimization]
  if (type.is(x)) {
    return {value: x, errors: []};
  }

  var ret = {value: {}, errors: []};
  var props = type.meta.props;
  var defaultProps = type.meta.defaultProps || noobj;
  // every item should be of type `props[name]`
  for (var name in props) {
    if (props.hasOwnProperty(name)) {
      var actual = x[name];
      // apply defaults
      if (actual === undefined) {
        actual = defaultProps[name];
      }
      var prop = recurse(actual, props[name], path.concat(name), options);
      ret.value[name] = prop.value;
      ret.errors = ret.errors.concat(prop.errors);
    }
  }
  var strict = options.hasOwnProperty('strict') ? options.strict : type.meta.strict;
  if (strict) {
    for (var field in x) {
      if (x.hasOwnProperty(field) && !props.hasOwnProperty(field)) {
        ret.errors.push(ValidationError.of(x[field], t.Nil, path.concat(field), options.context));
      }
    }
  }
  if (!ret.errors.length) {
    ret.value = new type(ret.value);
  }
  return ret;
};

validators.tuple = function validateTuple(x, type, path, options) {

  var types = type.meta.types;
  var len = types.length;

  // x should be an array of at most `len` items
  if (!t.Array.is(x) || x.length > len) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  var ret = {value: [], errors: []};
  // every item should be of type `types[i]`
  for (var i = 0; i < len; i++) {
    var item = recurse(x[i], types[i], path.concat(i), options);
    ret.value[i] = item.value;
    ret.errors = ret.errors.concat(item.errors);
  }
  return ret;
};

validators.dict = function validateDict(x, type, path, options) {

  // x should be an object
  if (!t.Object.is(x)) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  var ret = {value: {}, errors: []};
  // every key should be of type `domain`
  // every value should be of type `codomain`
  for (var k in x) {
    if (x.hasOwnProperty(k)) {
      var subpath = path.concat(k);
      var key = recurse(k, type.meta.domain, subpath, options);
      var item = recurse(x[k], type.meta.codomain, subpath, options);
      ret.value[k] = item.value;
      ret.errors = ret.errors.concat(key.errors, item.errors);
    }
  }
  return ret;
};

validators.union = function validateUnion(x, type, path, options) {
  var ctor = type.dispatch(x);
  return t.Function.is(ctor) ?
    recurse(x, ctor, path.concat(type.meta.types.indexOf(ctor)), options) :
    {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
};

validators.intersection = function validateIntersection(x, type, path, options) {

  var types = type.meta.types;
  var len = types.length;

  var ret = {value: x, errors: []};
  var nrOfStructs = 0;
  // x should be of type `types[i]` for all i
  for (var i = 0; i < len; i++) {
    if (types[i].meta.kind === 'struct') {
      nrOfStructs++;
    }
    var item = recurse(x, types[i], path, options);
    ret.errors = ret.errors.concat(item.errors);
  }
  if (nrOfStructs > 1) {
    ret.errors.push(ValidationError.of(x, type, path, options.context));
  }
  return ret;
};

validators['interface'] = function validateInterface(x, type, path, options) { // eslint-disable-line dot-notation

  // x should be an object
  if (!t.Object.is(x)) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  var ret = {value: {}, errors: []};
  var props = type.meta.props;
  // every item should be of type `props[name]`
  for (var name in props) {
    var prop = recurse(x[name], props[name], path.concat(name), options);
    ret.value[name] = prop.value;
    ret.errors = ret.errors.concat(prop.errors);
  }
  var strict = options.hasOwnProperty('strict') ? options.strict : type.meta.strict;
  if (strict) {
    for (var field in x) {
      if (!props.hasOwnProperty(field) && !t.Nil.is(x[field])) {
        ret.errors.push(ValidationError.of(x[field], t.Nil, path.concat(field), options.context));
      }
    }
  }
  return ret;
};

t.mixin(t, {
  ValidationError: ValidationError,
  ValidationResult: ValidationResult,
  validate: validate
});

module.exports = t;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);

module.exports = irreducible('Any', function () { return true; });


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);
var isString = __webpack_require__(178);

module.exports = irreducible('String', isString);


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var isFunction = __webpack_require__(22);
var getTypeName = __webpack_require__(20);
var isIdentity = __webpack_require__(61);
var isObject = __webpack_require__(62);
var create = __webpack_require__(58);
var is = __webpack_require__(59);

function getDefaultName(domain, codomain) {
  return '{[key: ' + getTypeName(domain) + ']: ' + getTypeName(codomain) + '}';
}

function dict(domain, codomain, name) {

  if (true) {
    assert(isFunction(domain), function () { return 'Invalid argument domain ' + assert.stringify(domain) + ' supplied to dict(domain, codomain, [name]) combinator (expected a type)'; });
    assert(isFunction(codomain), function () { return 'Invalid argument codomain ' + assert.stringify(codomain) + ' supplied to dict(domain, codomain, [name]) combinator (expected a type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to dict(domain, codomain, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(domain, codomain);
  var domainNameCache = getTypeName(domain);
  var codomainNameCache = getTypeName(codomain);
  var identity = isIdentity(domain) && isIdentity(codomain);

  function Dict(value, path) {

    if (false) {
      if (identity) {
        return value; // just trust the input if elements must not be hydrated
      }
    }

    if (true) {
      path = path || [displayName];
      assert(isObject(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    var idempotent = true; // will remain true if I can reutilise the input
    var ret = {}; // make a temporary copy, will be discarded if idempotent remains true
    for (var k in value) {
      if (value.hasOwnProperty(k)) {
        k = create(domain, k, (  true ? path.concat(domainNameCache) : null ));
        var actual = value[k];
        var instance = create(codomain, actual, (  true ? path.concat(k + ': ' + codomainNameCache) : null ));
        idempotent = idempotent && ( actual === instance );
        ret[k] = instance;
      }
    }

    if (idempotent) { // implements idempotency
      ret = value;
    }

    if (true) {
      Object.freeze(ret);
    }

    return ret;
  }

  Dict.meta = {
    kind: 'dict',
    domain: domain,
    codomain: codomain,
    name: name,
    identity: identity
  };

  Dict.displayName = displayName;

  Dict.is = function (x) {
    if (!isObject(x)) {
      return false;
    }
    for (var k in x) {
      if (x.hasOwnProperty(k)) {
        if (!is(k, domain) || !is(x[k], codomain)) {
          return false;
        }
      }
    }
    return true;
  };

  Dict.update = function (instance, patch) {
    return Dict(assert.update(instance, patch));
  };

  return Dict;
}

dict.getDefaultName = getDefaultName;
module.exports = dict;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

var isNil = __webpack_require__(50);
var assert = __webpack_require__(13);

// safe mixin, cannot override props unless specified
module.exports = function mixin(target, source, overwrite) {
  if (isNil(source)) { return target; }
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      if (overwrite !== true) {
        if (true) {
          assert(!target.hasOwnProperty(k) || target[k] === source[k], function () { return 'Invalid call to mixin(target, source, [overwrite]): cannot overwrite property "' + k + '" of target object'; });
        }
      }
      target[k] = source[k];
    }
  }
  return target;
};

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var isFunction = __webpack_require__(22);
var forbidNewOperator = __webpack_require__(132);
var isIdentity = __webpack_require__(61);
var create = __webpack_require__(58);
var is = __webpack_require__(59);
var getTypeName = __webpack_require__(20);
var getFunctionName = __webpack_require__(133);

function getDefaultName(type, predicate) {
  return '{' + getTypeName(type) + ' | ' + getFunctionName(predicate) + '}';
}

function refinement(type, predicate, name) {

  if (true) {
    assert(isFunction(type), function () { return 'Invalid argument type ' + assert.stringify(type) + ' supplied to refinement(type, predicate, [name]) combinator (expected a type)'; });
    assert(isFunction(predicate), function () { return 'Invalid argument predicate supplied to refinement(type, predicate, [name]) combinator (expected a function)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to refinement(type, predicate, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(type, predicate);
  var identity = isIdentity(type);

  function Refinement(value, path) {

    if (true) {
      if (identity) {
        forbidNewOperator(this, Refinement);
      }
      path = path || [displayName];
    }

    var x = create(type, value, path);

    if (true) {
      assert(predicate(x), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    return x;
  }

  Refinement.meta = {
    kind: 'subtype',
    type: type,
    predicate: predicate,
    name: name,
    identity: identity
  };

  Refinement.displayName = displayName;

  Refinement.is = function (x) {
    return is(x, type) && predicate(x);
  };

  Refinement.update = function (instance, patch) {
    return Refinement(assert.update(instance, patch));
  };

  return Refinement;
}

refinement.getDefaultName = getDefaultName;
module.exports = refinement;


/***/ },
/* 273 */,
/* 274 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reduxDevtools = __webpack_require__(402);

var _reduxDevtoolsLogMonitor = __webpack_require__(1006);

var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

var _reduxDevtoolsDockMonitor = __webpack_require__(996);

var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// createDevTools takes a monitor and produces a DevTools component


// Monitors are separate packages, and you can make a custom one
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

var DevTools = (0, _reduxDevtools.createDevTools)(
// Monitors are individually adjustable with props.
// Consult their repositories to learn about those props.
// Here, we put LogMonitor inside a DockMonitor.
_react2.default.createElement(
    _reduxDevtoolsDockMonitor2.default,
    { toggleVisibilityKey: 'ctrl-h',
        changePositionKey: 'ctrl-q',
        defaultIsVisible: false
    },
    _react2.default.createElement(_reduxDevtoolsLogMonitor2.default, { theme: 'tomorrow' })
));

exports.default = DevTools;

/***/ },
/* 275 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
var SERVER_URL = exports.SERVER_URL = 'http://localhost:8000';

// config should use named export as there can be different exports,
// just need to export default also because of eslint rules
exports.default = SERVER_URL;

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(519), __esModule: true };

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(524), __esModule: true };

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(455);

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _from = __webpack_require__(441);

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

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _threezerotwofour = __webpack_require__(491);

exports.threezerotwofour = _interopRequire(_threezerotwofour);

var _apathy = __webpack_require__(458);

exports.apathy = _interopRequire(_apathy);

var _ashes = __webpack_require__(459);

exports.ashes = _interopRequire(_ashes);

var _atelierDune = __webpack_require__(460);

exports.atelierDune = _interopRequire(_atelierDune);

var _atelierForest = __webpack_require__(461);

exports.atelierForest = _interopRequire(_atelierForest);

var _atelierHeath = __webpack_require__(462);

exports.atelierHeath = _interopRequire(_atelierHeath);

var _atelierLakeside = __webpack_require__(463);

exports.atelierLakeside = _interopRequire(_atelierLakeside);

var _atelierSeaside = __webpack_require__(464);

exports.atelierSeaside = _interopRequire(_atelierSeaside);

var _bespin = __webpack_require__(465);

exports.bespin = _interopRequire(_bespin);

var _brewer = __webpack_require__(466);

exports.brewer = _interopRequire(_brewer);

var _bright = __webpack_require__(467);

exports.bright = _interopRequire(_bright);

var _chalk = __webpack_require__(468);

exports.chalk = _interopRequire(_chalk);

var _codeschool = __webpack_require__(469);

exports.codeschool = _interopRequire(_codeschool);

var _colors = __webpack_require__(470);

exports.colors = _interopRequire(_colors);

var _default = __webpack_require__(471);

exports['default'] = _interopRequire(_default);

var _eighties = __webpack_require__(472);

exports.eighties = _interopRequire(_eighties);

var _embers = __webpack_require__(473);

exports.embers = _interopRequire(_embers);

var _flat = __webpack_require__(474);

exports.flat = _interopRequire(_flat);

var _google = __webpack_require__(475);

exports.google = _interopRequire(_google);

var _grayscale = __webpack_require__(476);

exports.grayscale = _interopRequire(_grayscale);

var _greenscreen = __webpack_require__(477);

exports.greenscreen = _interopRequire(_greenscreen);

var _harmonic = __webpack_require__(478);

exports.harmonic = _interopRequire(_harmonic);

var _hopscotch = __webpack_require__(479);

exports.hopscotch = _interopRequire(_hopscotch);

var _isotope = __webpack_require__(480);

exports.isotope = _interopRequire(_isotope);

var _marrakesh = __webpack_require__(481);

exports.marrakesh = _interopRequire(_marrakesh);

var _mocha = __webpack_require__(482);

exports.mocha = _interopRequire(_mocha);

var _monokai = __webpack_require__(483);

exports.monokai = _interopRequire(_monokai);

var _ocean = __webpack_require__(484);

exports.ocean = _interopRequire(_ocean);

var _paraiso = __webpack_require__(485);

exports.paraiso = _interopRequire(_paraiso);

var _pop = __webpack_require__(486);

exports.pop = _interopRequire(_pop);

var _railscasts = __webpack_require__(487);

exports.railscasts = _interopRequire(_railscasts);

var _shapeshifter = __webpack_require__(488);

exports.shapeshifter = _interopRequire(_shapeshifter);

var _solarized = __webpack_require__(489);

exports.solarized = _interopRequire(_solarized);

var _summerfruit = __webpack_require__(490);

exports.summerfruit = _interopRequire(_summerfruit);

var _tomorrow = __webpack_require__(492);

exports.tomorrow = _interopRequire(_tomorrow);

var _tube = __webpack_require__(493);

exports.tube = _interopRequire(_tube);

var _twilight = __webpack_require__(494);

exports.twilight = _interopRequire(_twilight);

/***/ },
/* 281 */
/***/ function(module, exports) {

"use strict";
/**
 * RGB space.
 *
 * @module  color-space/rgb
 */
'use strict'

module.exports = {
	name: 'rgb',
	min: [0,0,0],
	max: [255,255,255],
	channel: ['red', 'green', 'blue'],
	alias: ['RGB']
};


/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(183)
  , TAG = __webpack_require__(39)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(97)
  , document = __webpack_require__(65).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(77) && !__webpack_require__(95)(function(){
  return Object.defineProperty(__webpack_require__(283)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(183);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var LIBRARY        = __webpack_require__(187)
  , $export        = __webpack_require__(51)
  , redefine       = __webpack_require__(291)
  , hide           = __webpack_require__(96)
  , has            = __webpack_require__(78)
  , Iterators      = __webpack_require__(98)
  , $iterCreate    = __webpack_require__(535)
  , setToStringTag = __webpack_require__(191)
  , getPrototypeOf = __webpack_require__(289)
  , ITERATOR       = __webpack_require__(39)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(67)
  , gOPN      = __webpack_require__(288).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(290)
  , hiddenKeys = __webpack_require__(186).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(78)
  , toObject    = __webpack_require__(116)
  , IE_PROTO    = __webpack_require__(192)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

var has          = __webpack_require__(78)
  , toIObject    = __webpack_require__(67)
  , arrayIndexOf = __webpack_require__(527)(false)
  , IE_PROTO     = __webpack_require__(192)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(96);

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(194)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(282)
  , ITERATOR  = __webpack_require__(39)('iterator')
  , Iterators = __webpack_require__(98);
module.exports = __webpack_require__(15).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ },
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */
/***/ function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(1077);
module.exports = self.fetch.bind(self);


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(88),
    root = __webpack_require__(56);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(158),
    stackClear = __webpack_require__(844),
    stackDelete = __webpack_require__(845),
    stackGet = __webpack_require__(846),
    stackHas = __webpack_require__(847),
    stackSet = __webpack_require__(848);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(787);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ },
/* 333 */
/***/ function(module, exports) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ },
/* 334 */
/***/ function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(779),
    isFlattenable = __webpack_require__(820);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(340),
    toKey = __webpack_require__(162);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(789),
    isObject = __webpack_require__(164),
    isObjectLike = __webpack_require__(89);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

var identity = __webpack_require__(163),
    overRest = __webpack_require__(839),
    setToString = __webpack_require__(842);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ },
/* 339 */
/***/ function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(71),
    isKey = __webpack_require__(231),
    stringToPath = __webpack_require__(850),
    toString = __webpack_require__(860);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(88);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(229),
    arraySome = __webpack_require__(780),
    cacheHas = __webpack_require__(230);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ },
/* 343 */,
/* 344 */
/***/ function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(164);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ },
/* 346 */
/***/ function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ },
/* 347 */,
/* 348 */
/***/ function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ },
/* 349 */
/***/ function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(353),
    isLength = __webpack_require__(234);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(350),
    isObjectLike = __webpack_require__(89);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(56),
    stubFalse = __webpack_require__(859);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(273)(module)))

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(105),
    isObject = __webpack_require__(164);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(793),
    baseUnary = __webpack_require__(339),
    nodeUtil = __webpack_require__(837);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ },
/* 355 */
/***/ function(module, exports) {

var component = /-?\d+(\.\d+)?%?/g;
function extractComponents(color) {
  return color.match(component);
}

module.exports = extractComponents;

/***/ },
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var JSONArrow = function JSONArrow(_ref) {
  var styling = _ref.styling;
  var arrowStyle = _ref.arrowStyle;
  var expanded = _ref.expanded;
  var nodeType = _ref.nodeType;
  var onClick = _ref.onClick;
  return _react2['default'].createElement(
    'div',
    (0, _extends3['default'])({}, styling('arrowContainer', arrowStyle), {
      onClick: onClick
    }),
    _react2['default'].createElement(
      'div',
      styling(['arrow', 'arrowSign'], nodeType, expanded, arrowStyle),
      '▶',
      arrowStyle === 'double' && _react2['default'].createElement(
        'div',
        styling(['arrowSign', 'arrowSignInner']),
        '▶'
      )
    )
  );
};

JSONArrow.propTypes = {
  styling: _react.PropTypes.func.isRequired,
  arrowStyle: _react.PropTypes.oneOf(['single', 'double']),
  expanded: _react.PropTypes.bool.isRequired,
  nodeType: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func.isRequired
};

JSONArrow.defaultProps = {
  arrowStyle: 'single'
};

exports['default'] = JSONArrow;

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(114);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _objType = __webpack_require__(953);

var _objType2 = _interopRequireDefault(_objType);

var _JSONObjectNode = __webpack_require__(949);

var _JSONObjectNode2 = _interopRequireDefault(_JSONObjectNode);

var _JSONArrayNode = __webpack_require__(947);

var _JSONArrayNode2 = _interopRequireDefault(_JSONArrayNode);

var _JSONIterableNode = __webpack_require__(948);

var _JSONIterableNode2 = _interopRequireDefault(_JSONIterableNode);

var _JSONValueNode = __webpack_require__(950);

var _JSONValueNode2 = _interopRequireDefault(_JSONValueNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var JSONNode = function JSONNode(_ref) {
  var getItemString = _ref.getItemString;
  var keyPath = _ref.keyPath;
  var labelRenderer = _ref.labelRenderer;
  var styling = _ref.styling;
  var value = _ref.value;
  var valueRenderer = _ref.valueRenderer;
  var isCustomNode = _ref.isCustomNode;
  var rest = (0, _objectWithoutProperties3['default'])(_ref, ['getItemString', 'keyPath', 'labelRenderer', 'styling', 'value', 'valueRenderer', 'isCustomNode']);

  var nodeType = isCustomNode(value) ? 'Custom' : (0, _objType2['default'])(value);

  var simpleNodeProps = {
    getItemString: getItemString,
    key: keyPath[0],
    keyPath: keyPath,
    labelRenderer: labelRenderer,
    nodeType: nodeType,
    styling: styling,
    value: value,
    valueRenderer: valueRenderer
  };

  var nestedNodeProps = (0, _extends3['default'])({}, rest, simpleNodeProps, {
    data: value,
    isCustomNode: isCustomNode
  });

  switch (nodeType) {
    case 'Object':
    case 'Error':
      return _react2['default'].createElement(_JSONObjectNode2['default'], nestedNodeProps);
    case 'Array':
      return _react2['default'].createElement(_JSONArrayNode2['default'], nestedNodeProps);
    case 'Iterable':
      return _react2['default'].createElement(_JSONIterableNode2['default'], nestedNodeProps);
    case 'String':
      return _react2['default'].createElement(_JSONValueNode2['default'], (0, _extends3['default'])({}, simpleNodeProps, { valueGetter: function valueGetter(raw) {
          return '"' + raw + '"';
        } }));
    case 'Number':
      return _react2['default'].createElement(_JSONValueNode2['default'], simpleNodeProps);
    case 'Boolean':
      return _react2['default'].createElement(_JSONValueNode2['default'], (0, _extends3['default'])({}, simpleNodeProps, { valueGetter: function valueGetter(raw) {
          return raw ? 'true' : 'false';
        } }));
    case 'Date':
      return _react2['default'].createElement(_JSONValueNode2['default'], (0, _extends3['default'])({}, simpleNodeProps, { valueGetter: function valueGetter(raw) {
          return raw.toISOString();
        } }));
    case 'Null':
      return _react2['default'].createElement(_JSONValueNode2['default'], (0, _extends3['default'])({}, simpleNodeProps, { valueGetter: function valueGetter() {
          return 'null';
        } }));
    case 'Undefined':
      return _react2['default'].createElement(_JSONValueNode2['default'], (0, _extends3['default'])({}, simpleNodeProps, { valueGetter: function valueGetter() {
          return 'undefined';
        } }));
    case 'Function':
    case 'Symbol':
      return _react2['default'].createElement(_JSONValueNode2['default'], (0, _extends3['default'])({}, simpleNodeProps, { valueGetter: function valueGetter(raw) {
          return raw.toString();
        } }));
    case 'Custom':
      return _react2['default'].createElement(_JSONValueNode2['default'], simpleNodeProps);
    default:
      return null;
  }
};

JSONNode.propTypes = {
  getItemString: _react.PropTypes.func.isRequired,
  keyPath: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])).isRequired,
  labelRenderer: _react.PropTypes.func.isRequired,
  styling: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.any,
  valueRenderer: _react.PropTypes.func.isRequired,
  isCustomNode: _react.PropTypes.func.isRequired
};

exports['default'] = JSONNode;

/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _objectWithoutProperties2 = __webpack_require__(114);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = __webpack_require__(137);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(182);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(138);

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _keys = __webpack_require__(113);

var _keys2 = _interopRequireDefault(_keys);

var _class, _temp; // ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _JSONNode = __webpack_require__(378);

var _JSONNode2 = _interopRequireDefault(_JSONNode);

var _createStylingFromTheme = __webpack_require__(951);

var _createStylingFromTheme2 = _interopRequireDefault(_createStylingFromTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var identity = function identity(value) {
  return value;
};

function checkLegacyTheming(theme, props) {
  var deprecatedStylingMethodsMap = {
    getArrowStyle: 'arrow',
    getListStyle: 'nestedNodeChildren',
    getItemStringStyle: 'nestedNodeItemString',
    getLabelStyle: 'label',
    getValueStyle: 'valueText'
  };

  var deprecatedStylingMethods = (0, _keys2['default'])(deprecatedStylingMethodsMap).filter(function (name) {
    return props[name];
  });

  if (deprecatedStylingMethods.length > 0) {
    if (typeof theme === 'string') {
      theme = {
        extend: theme
      };
    } else {
      theme = (0, _extends3['default'])({}, theme);
    }

    deprecatedStylingMethods.forEach(function (name) {
      console.error( // eslint-disable-line no-console
      'Styling method "' + name + '" is deprecated, use "theme" property instead');

      theme[deprecatedStylingMethodsMap[name]] = function (_ref) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var style = _ref.style;
        return {
          style: (0, _extends3['default'])({}, style, props[name].apply(props, args))
        };
      };
    });
  }

  return theme;
}

var JSONTree = (_temp = _class = function (_React$Component) {
  (0, _inherits3['default'])(JSONTree, _React$Component);

  function JSONTree() {
    (0, _classCallCheck3['default'])(this, JSONTree);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  JSONTree.prototype.render = function render() {
    var _props = this.props;
    var value = _props.data;
    var keyPath = _props.keyPath;
    var postprocessValue = _props.postprocessValue;
    var hideRoot = _props.hideRoot;
    var theme = _props.theme;
    var invertTheme = _props.invertTheme;
    var rest = (0, _objectWithoutProperties3['default'])(_props, ['data', 'keyPath', 'postprocessValue', 'hideRoot', 'theme', 'invertTheme']);


    var styling = (0, _createStylingFromTheme2['default'])(checkLegacyTheming(theme, rest), invertTheme);

    return _react2['default'].createElement(
      'ul',
      styling('tree'),
      _react2['default'].createElement(_JSONNode2['default'], (0, _extends3['default'])({}, (0, _extends3['default'])({ postprocessValue: postprocessValue, hideRoot: hideRoot, styling: styling }, rest), {
        keyPath: hideRoot ? [] : keyPath,
        value: postprocessValue(value)
      }))
    );
  };

  return JSONTree;
}(_react2['default'].Component), _class.propTypes = {
  data: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
  hideRoot: _react.PropTypes.bool,
  theme: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
  invertTheme: _react.PropTypes.bool,
  keyPath: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])),
  postprocessValue: _react.PropTypes.func,
  sortObjectKeys: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool])
}, _class.defaultProps = {
  shouldExpandNode: function shouldExpandNode(keyName, data, level) {
    return level === 0;
  }, // expands root by default,
  hideRoot: false,
  keyPath: ['root'],
  getItemString: function getItemString(type, data, itemType, itemString) {
    return _react2['default'].createElement(
      'span',
      null,
      itemType,
      ' ',
      itemString
    );
  },
  labelRenderer: function labelRenderer(_ref2) {
    var label = _ref2[0];
    return _react2['default'].createElement(
      'span',
      null,
      label,
      ':'
    );
  },
  valueRenderer: identity,
  postprocessValue: identity,
  isCustomNode: function isCustomNode() {
    return false;
  },
  collectionLimit: 50,
  invertTheme: true
}, _temp);
exports['default'] = JSONTree;

/***/ },
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports.toggleVisibility = toggleVisibility;
exports.changePosition = changePosition;
exports.changeSize = changeSize;
exports.changeMonitor = changeMonitor;
var TOGGLE_VISIBILITY = exports.TOGGLE_VISIBILITY = '@@redux-devtools-log-monitor/TOGGLE_VISIBILITY';
function toggleVisibility() {
  return { type: TOGGLE_VISIBILITY };
}

var CHANGE_POSITION = exports.CHANGE_POSITION = '@@redux-devtools-log-monitor/CHANGE_POSITION';
function changePosition() {
  return { type: CHANGE_POSITION };
}

var CHANGE_SIZE = exports.CHANGE_SIZE = '@@redux-devtools-log-monitor/CHANGE_SIZE';
function changeSize(size) {
  return { type: CHANGE_SIZE, size: size };
}

var CHANGE_MONITOR = exports.CHANGE_MONITOR = '@@redux-devtools-log-monitor/CHANGE_MONITOR';
function changeMonitor() {
  return { type: CHANGE_MONITOR };
}

/***/ },
/* 399 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
var POSITIONS = exports.POSITIONS = ['left', 'top', 'right', 'bottom'];

/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.INIT_ACTION = exports.ActionCreators = exports.ActionTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.liftAction = liftAction;
exports.liftReducerWith = liftReducerWith;
exports.unliftState = unliftState;
exports.unliftStore = unliftStore;
exports.default = instrument;

var _difference = __webpack_require__(852);

var _difference2 = _interopRequireDefault(_difference);

var _union = __webpack_require__(861);

var _union2 = _interopRequireDefault(_union);

var _isPlainObject = __webpack_require__(165);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = __webpack_require__(998);

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionTypes = exports.ActionTypes = {
  PERFORM_ACTION: 'PERFORM_ACTION',
  RESET: 'RESET',
  ROLLBACK: 'ROLLBACK',
  COMMIT: 'COMMIT',
  SWEEP: 'SWEEP',
  TOGGLE_ACTION: 'TOGGLE_ACTION',
  SET_ACTIONS_ACTIVE: 'SET_ACTIONS_ACTIVE',
  JUMP_TO_STATE: 'JUMP_TO_STATE',
  IMPORT_STATE: 'IMPORT_STATE',
  LOCK_CHANGES: 'LOCK_CHANGES',
  PAUSE_RECORDING: 'PAUSE_RECORDING'
};

/**
 * Action creators to change the History state.
 */
var ActionCreators = exports.ActionCreators = {
  performAction: function performAction(action) {
    if (!(0, _isPlainObject2.default)(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    return { type: ActionTypes.PERFORM_ACTION, action: action, timestamp: Date.now() };
  },
  reset: function reset() {
    return { type: ActionTypes.RESET, timestamp: Date.now() };
  },
  rollback: function rollback() {
    return { type: ActionTypes.ROLLBACK, timestamp: Date.now() };
  },
  commit: function commit() {
    return { type: ActionTypes.COMMIT, timestamp: Date.now() };
  },
  sweep: function sweep() {
    return { type: ActionTypes.SWEEP };
  },
  toggleAction: function toggleAction(id) {
    return { type: ActionTypes.TOGGLE_ACTION, id: id };
  },
  setActionsActive: function setActionsActive(start, end) {
    var active = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    return { type: ActionTypes.SET_ACTIONS_ACTIVE, start: start, end: end, active: active };
  },
  jumpToState: function jumpToState(index) {
    return { type: ActionTypes.JUMP_TO_STATE, index: index };
  },
  importState: function importState(nextLiftedState, noRecompute) {
    return { type: ActionTypes.IMPORT_STATE, nextLiftedState: nextLiftedState, noRecompute: noRecompute };
  },
  lockChanges: function lockChanges(status) {
    return { type: ActionTypes.LOCK_CHANGES, status: status };
  },
  pauseRecording: function pauseRecording(status) {
    return { type: ActionTypes.PAUSE_RECORDING, status: status };
  }
};

var INIT_ACTION = exports.INIT_ACTION = { type: '@@INIT' };

/**
 * Computes the next entry with exceptions catching.
 */
function computeWithTryCatch(reducer, action, state) {
  var nextState = state;
  var nextError = void 0;
  try {
    nextState = reducer(state, action);
  } catch (err) {
    nextError = err.toString();
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && (typeof window.chrome !== 'undefined' || typeof window.process !== 'undefined' && window.process.type === 'renderer')) {
      // In Chrome, rethrowing provides better source map support
      setTimeout(function () {
        throw err;
      });
    } else {
      console.error(err);
    }
  }

  return {
    state: nextState,
    error: nextError
  };
}

/**
 * Computes the next entry in the log by applying an action.
 */
function computeNextEntry(reducer, action, state, shouldCatchErrors) {
  if (!shouldCatchErrors) {
    return { state: reducer(state, action) };
  }
  return computeWithTryCatch(reducer, action, state);
}

/**
 * Runs the reducer on invalidated actions to get a fresh computation log.
 */
function recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, shouldCatchErrors) {
  // Optimization: exit early and return the same reference
  // if we know nothing could have changed.
  if (!computedStates || minInvalidatedStateIndex === -1 || minInvalidatedStateIndex >= computedStates.length && computedStates.length === stagedActionIds.length) {
    return computedStates;
  }

  var nextComputedStates = computedStates.slice(0, minInvalidatedStateIndex);
  for (var i = minInvalidatedStateIndex; i < stagedActionIds.length; i++) {
    var actionId = stagedActionIds[i];
    var action = actionsById[actionId].action;

    var previousEntry = nextComputedStates[i - 1];
    var previousState = previousEntry ? previousEntry.state : committedState;

    var shouldSkip = skippedActionIds.indexOf(actionId) > -1;
    var entry = void 0;
    if (shouldSkip) {
      entry = previousEntry;
    } else {
      if (shouldCatchErrors && previousEntry && previousEntry.error) {
        entry = {
          state: previousState,
          error: 'Interrupted by an error up the chain'
        };
      } else {
        entry = computeNextEntry(reducer, action, previousState, shouldCatchErrors);
      }
    }
    nextComputedStates.push(entry);
  }

  return nextComputedStates;
}

/**
 * Lifts an app's action into an action on the lifted store.
 */
function liftAction(action) {
  return ActionCreators.performAction(action);
}

/**
 * Creates a history state reducer from an app's reducer.
 */
function liftReducerWith(reducer, initialCommittedState, monitorReducer, options) {
  var initialLiftedState = {
    monitorState: monitorReducer(undefined, {}),
    nextActionId: 1,
    actionsById: { 0: liftAction(INIT_ACTION) },
    stagedActionIds: [0],
    skippedActionIds: [],
    committedState: initialCommittedState,
    currentStateIndex: 0,
    computedStates: [],
    isLocked: options.shouldStartLocked === true,
    isPaused: options.shouldRecordChanges === false
  };

  /**
   * Manages how the history actions modify the history state.
   */
  return function (liftedState, liftedAction) {
    var _ref = liftedState || initialLiftedState;

    var monitorState = _ref.monitorState;
    var actionsById = _ref.actionsById;
    var nextActionId = _ref.nextActionId;
    var stagedActionIds = _ref.stagedActionIds;
    var skippedActionIds = _ref.skippedActionIds;
    var committedState = _ref.committedState;
    var currentStateIndex = _ref.currentStateIndex;
    var computedStates = _ref.computedStates;
    var isLocked = _ref.isLocked;
    var isPaused = _ref.isPaused;


    if (!liftedState) {
      // Prevent mutating initialLiftedState
      actionsById = _extends({}, actionsById);
    }

    function commitExcessActions(n) {
      // Auto-commits n-number of excess actions.
      var excess = n;
      var idsToDelete = stagedActionIds.slice(1, excess + 1);

      for (var i = 0; i < idsToDelete.length; i++) {
        if (computedStates[i + 1].error) {
          // Stop if error is found. Commit actions up to error.
          excess = i;
          idsToDelete = stagedActionIds.slice(1, excess + 1);
          break;
        } else {
          delete actionsById[idsToDelete[i]];
        }
      }

      skippedActionIds = skippedActionIds.filter(function (id) {
        return idsToDelete.indexOf(id) === -1;
      });
      stagedActionIds = [0].concat(stagedActionIds.slice(excess + 1));
      committedState = computedStates[excess].state;
      computedStates = computedStates.slice(excess);
      currentStateIndex = currentStateIndex > excess ? currentStateIndex - excess : 0;
    }

    function computePausedAction(shouldInit) {
      var _extends2;

      var computedState = void 0;
      if (shouldInit) {
        computedState = computedStates[currentStateIndex];
        monitorState = monitorReducer(monitorState, liftedAction);
      } else {
        computedState = computeNextEntry(reducer, liftedAction.action, computedStates[currentStateIndex].state, false);
      }
      if (!options.pauseActionType || nextActionId === 1) {
        return {
          monitorState: monitorState,
          actionsById: { 0: liftAction(INIT_ACTION) },
          nextActionId: 1,
          stagedActionIds: [0],
          skippedActionIds: [],
          committedState: computedState.state,
          currentStateIndex: 0,
          computedStates: [computedState],
          isLocked: isLocked,
          isPaused: true
        };
      }
      if (shouldInit) {
        if (currentStateIndex === stagedActionIds.length - 1) {
          currentStateIndex++;
        }
        stagedActionIds = [].concat(stagedActionIds, [nextActionId]);
        nextActionId++;
      }
      return {
        monitorState: monitorState,
        actionsById: _extends({}, actionsById, (_extends2 = {}, _extends2[nextActionId - 1] = liftAction({ type: options.pauseActionType }), _extends2)),
        nextActionId: nextActionId,
        stagedActionIds: stagedActionIds,
        skippedActionIds: skippedActionIds,
        committedState: committedState,
        currentStateIndex: currentStateIndex,
        computedStates: [].concat(computedStates.slice(0, stagedActionIds.length - 1), [computedState]),
        isLocked: isLocked,
        isPaused: true
      };
    }

    // By default, agressively recompute every state whatever happens.
    // This has O(n) performance, so we'll override this to a sensible
    // value whenever we feel like we don't have to recompute the states.
    var minInvalidatedStateIndex = 0;

    switch (liftedAction.type) {
      case ActionTypes.PERFORM_ACTION:
        {
          if (isLocked) return liftedState || initialLiftedState;
          if (isPaused) return computePausedAction();

          // Auto-commit as new actions come in.
          if (options.maxAge && stagedActionIds.length === options.maxAge) {
            commitExcessActions(1);
          }

          if (currentStateIndex === stagedActionIds.length - 1) {
            currentStateIndex++;
          }
          var actionId = nextActionId++;
          // Mutation! This is the hottest path, and we optimize on purpose.
          // It is safe because we set a new key in a cache dictionary.
          actionsById[actionId] = liftedAction;
          stagedActionIds = [].concat(stagedActionIds, [actionId]);
          // Optimization: we know that only the new action needs computing.
          minInvalidatedStateIndex = stagedActionIds.length - 1;
          break;
        }
      case ActionTypes.RESET:
        {
          // Get back to the state the store was created with.
          actionsById = { 0: liftAction(INIT_ACTION) };
          nextActionId = 1;
          stagedActionIds = [0];
          skippedActionIds = [];
          committedState = initialCommittedState;
          currentStateIndex = 0;
          computedStates = [];
          break;
        }
      case ActionTypes.COMMIT:
        {
          // Consider the last committed state the new starting point.
          // Squash any staged actions into a single committed state.
          actionsById = { 0: liftAction(INIT_ACTION) };
          nextActionId = 1;
          stagedActionIds = [0];
          skippedActionIds = [];
          committedState = computedStates[currentStateIndex].state;
          currentStateIndex = 0;
          computedStates = [];
          break;
        }
      case ActionTypes.ROLLBACK:
        {
          // Forget about any staged actions.
          // Start again from the last committed state.
          actionsById = { 0: liftAction(INIT_ACTION) };
          nextActionId = 1;
          stagedActionIds = [0];
          skippedActionIds = [];
          currentStateIndex = 0;
          computedStates = [];
          break;
        }
      case ActionTypes.TOGGLE_ACTION:
        {
          var _ret = function () {
            // Toggle whether an action with given ID is skipped.
            // Being skipped means it is a no-op during the computation.
            var actionId = liftedAction.id;

            var index = skippedActionIds.indexOf(actionId);
            if (index === -1) {
              skippedActionIds = [actionId].concat(skippedActionIds);
            } else {
              skippedActionIds = skippedActionIds.filter(function (id) {
                return id !== actionId;
              });
            }
            // Optimization: we know history before this action hasn't changed
            minInvalidatedStateIndex = stagedActionIds.indexOf(actionId);
            return 'break';
          }();

          if (_ret === 'break') break;
        }
      case ActionTypes.SET_ACTIONS_ACTIVE:
        {
          // Toggle whether an action with given ID is skipped.
          // Being skipped means it is a no-op during the computation.
          var start = liftedAction.start;
          var end = liftedAction.end;
          var active = liftedAction.active;

          var actionIds = [];
          for (var i = start; i < end; i++) {
            actionIds.push(i);
          }if (active) {
            skippedActionIds = (0, _difference2.default)(skippedActionIds, actionIds);
          } else {
            skippedActionIds = (0, _union2.default)(skippedActionIds, actionIds);
          }

          // Optimization: we know history before this action hasn't changed
          minInvalidatedStateIndex = stagedActionIds.indexOf(start);
          break;
        }
      case ActionTypes.JUMP_TO_STATE:
        {
          // Without recomputing anything, move the pointer that tell us
          // which state is considered the current one. Useful for sliders.
          currentStateIndex = liftedAction.index;
          // Optimization: we know the history has not changed.
          minInvalidatedStateIndex = Infinity;
          break;
        }
      case ActionTypes.SWEEP:
        {
          // Forget any actions that are currently being skipped.
          stagedActionIds = (0, _difference2.default)(stagedActionIds, skippedActionIds);
          skippedActionIds = [];
          currentStateIndex = Math.min(currentStateIndex, stagedActionIds.length - 1);
          break;
        }
      case ActionTypes.IMPORT_STATE:
        {
          if (Array.isArray(liftedAction.nextLiftedState)) {
            // recompute array of actions
            actionsById = { 0: liftAction(INIT_ACTION) };
            nextActionId = 1;
            stagedActionIds = [0];
            skippedActionIds = [];
            currentStateIndex = liftedAction.nextLiftedState.length;
            computedStates = [];
            committedState = liftedAction.preloadedState;
            minInvalidatedStateIndex = 0;
            // iterate through actions
            liftedAction.nextLiftedState.forEach(function (action) {
              actionsById[nextActionId] = liftAction(action);
              stagedActionIds.push(nextActionId);
              nextActionId++;
            });
          } else {
            var _liftedAction$nextLif = liftedAction.nextLiftedState;
            // Completely replace everything.

            monitorState = _liftedAction$nextLif.monitorState;
            actionsById = _liftedAction$nextLif.actionsById;
            nextActionId = _liftedAction$nextLif.nextActionId;
            stagedActionIds = _liftedAction$nextLif.stagedActionIds;
            skippedActionIds = _liftedAction$nextLif.skippedActionIds;
            committedState = _liftedAction$nextLif.committedState;
            currentStateIndex = _liftedAction$nextLif.currentStateIndex;
            computedStates = _liftedAction$nextLif.computedStates;


            if (liftedAction.noRecompute) {
              minInvalidatedStateIndex = Infinity;
            }
          }

          break;
        }
      case ActionTypes.LOCK_CHANGES:
        {
          isLocked = liftedAction.status;
          minInvalidatedStateIndex = Infinity;
          break;
        }
      case ActionTypes.PAUSE_RECORDING:
        {
          isPaused = liftedAction.status;
          if (isPaused) {
            return computePausedAction(true);
          }
          // Commit when unpausing
          actionsById = { 0: liftAction(INIT_ACTION) };
          nextActionId = 1;
          stagedActionIds = [0];
          skippedActionIds = [];
          committedState = computedStates[currentStateIndex].state;
          currentStateIndex = 0;
          computedStates = [];
          break;
        }
      case '@@redux/INIT':
        {
          if (options.shouldHotReload === false && liftedState) {
            return liftedState;
          }

          // Recompute states on hot reload and init.
          minInvalidatedStateIndex = 0;

          if (options.maxAge && stagedActionIds.length > options.maxAge) {
            // States must be recomputed before committing excess.
            computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, options.shouldCatchErrors);

            commitExcessActions(stagedActionIds.length - options.maxAge);

            // Avoid double computation.
            minInvalidatedStateIndex = Infinity;
          }

          break;
        }
      default:
        {
          // If the action is not recognized, it's a monitor action.
          // Optimization: a monitor action can't change history.
          minInvalidatedStateIndex = Infinity;
          break;
        }
    }

    computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, options.shouldCatchErrors);
    monitorState = monitorReducer(monitorState, liftedAction);
    return {
      monitorState: monitorState,
      actionsById: actionsById,
      nextActionId: nextActionId,
      stagedActionIds: stagedActionIds,
      skippedActionIds: skippedActionIds,
      committedState: committedState,
      currentStateIndex: currentStateIndex,
      computedStates: computedStates,
      isLocked: isLocked,
      isPaused: isPaused
    };
  };
}

/**
 * Provides an app's view into the state of the lifted store.
 */
function unliftState(liftedState) {
  var computedStates = liftedState.computedStates;
  var currentStateIndex = liftedState.currentStateIndex;
  var state = computedStates[currentStateIndex].state;

  return state;
}

/**
 * Provides an app's view into the lifted store.
 */
function unliftStore(liftedStore, liftReducer) {
  var _extends3;

  var lastDefinedState = void 0;

  function getState() {
    var state = unliftState(liftedStore.getState());
    if (state !== undefined) {
      lastDefinedState = state;
    }
    return lastDefinedState;
  }

  return _extends({}, liftedStore, (_extends3 = {

    liftedStore: liftedStore,

    dispatch: function dispatch(action) {
      liftedStore.dispatch(liftAction(action));
      return action;
    },


    getState: getState,

    replaceReducer: function replaceReducer(nextReducer) {
      liftedStore.replaceReducer(liftReducer(nextReducer));
    }
  }, _extends3[_symbolObservable2.default] = function () {
    return _extends({}, liftedStore[_symbolObservable2.default](), {
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = liftedStore.subscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    });
  }, _extends3));
}

/**
 * Redux instrumentation store enhancer.
 */
function instrument() {
  var monitorReducer = arguments.length <= 0 || arguments[0] === undefined ? function () {
    return null;
  } : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  /* eslint-disable no-eq-null */
  if (options.maxAge != null && options.maxAge < 2) {
    /* eslint-enable */
    throw new Error('DevTools.instrument({ maxAge }) option, if specified, ' + 'may not be less than 2.');
  }

  return function (createStore) {
    return function (reducer, initialState, enhancer) {

      function liftReducer(r) {
        if (typeof r !== 'function') {
          if (r && typeof r.default === 'function') {
            throw new Error('Expected the reducer to be a function. ' + 'Instead got an object with a "default" field. ' + 'Did you pass a module instead of the default export? ' + 'Try passing require(...).default instead.');
          }
          throw new Error('Expected the reducer to be a function.');
        }
        return liftReducerWith(r, initialState, monitorReducer, options);
      }

      var liftedStore = createStore(liftReducer(reducer), enhancer);
      if (liftedStore.liftedStore) {
        throw new Error('DevTools instrumentation should not be applied more than once. ' + 'Check your store configuration.');
      }

      return unliftStore(liftedStore, liftReducer);
    };
  };
}

/***/ },
/* 401 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports.updateScrollTop = updateScrollTop;
var UPDATE_SCROLL_TOP = exports.UPDATE_SCROLL_TOP = '@@redux-devtools-log-monitor/UPDATE_SCROLL_TOP';
function updateScrollTop(scrollTop) {
  return { type: UPDATE_SCROLL_TOP, scrollTop: scrollTop };
}

/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _reduxDevtoolsInstrument = __webpack_require__(400);

Object.defineProperty(exports, 'instrument', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reduxDevtoolsInstrument).default;
  }
});
Object.defineProperty(exports, 'ActionCreators', {
  enumerable: true,
  get: function get() {
    return _reduxDevtoolsInstrument.ActionCreators;
  }
});
Object.defineProperty(exports, 'ActionTypes', {
  enumerable: true,
  get: function get() {
    return _reduxDevtoolsInstrument.ActionTypes;
  }
});

var _persistState = __webpack_require__(1012);

Object.defineProperty(exports, 'persistState', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_persistState).default;
  }
});

var _createDevTools = __webpack_require__(1011);

Object.defineProperty(exports, 'createDevTools', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createDevTools).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 403 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var repeat = exports.repeat = function repeat(str, times) {
  return new Array(times + 1).join(str);
};

var pad = exports.pad = function pad(num, maxLength) {
  return repeat("0", maxLength - num.toString().length) + num;
};

var formatTime = exports.formatTime = function formatTime(time) {
  return pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
};

// Use performance API if it's available in order to get better precision
var timer = exports.timer = typeof performance !== "undefined" && performance !== null && typeof performance.now === "function" ? performance : Date;

/***/ },
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = getAlert;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function getAlert(type, message) {
  return _react2['default'].createElement(
    'div',
    { className: 'alert alert-' + type },
    message
  );
}

module.exports = exports['default'];

/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = renderFieldset;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

function getClassName(locals) {
  var len = locals.path.length;
  var className = 'fieldset fieldset-depth-' + len;
  if (len > 0) {
    className += ' fieldset-' + locals.path.join('-');
  }
  if (locals.className) {
    className += ' ' + _classnames2['default'](locals.className);
  }
  return className;
}

function renderFieldset(children, locals) {
  var legend = locals.label ? _react2['default'].createElement(
    'legend',
    null,
    locals.label
  ) : null;
  var props = {
    className: getClassName(locals),
    disabled: locals.disabled
  };
  return _react2['default'].createElement.apply(null, ['fieldset', props, legend].concat(children));
}

module.exports = exports['default'];

/***/ },
/* 409 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);
var isBoolean = __webpack_require__(177);

module.exports = irreducible('Boolean', isBoolean);


/***/ },
/* 410 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);
var isNil = __webpack_require__(50);

module.exports = irreducible('Nil', isNil);


/***/ },
/* 411 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);
var isNumber = __webpack_require__(415);

module.exports = irreducible('Number', isNumber);


/***/ },
/* 412 */
/***/ function(module, exports) {

function assign(x, y) {
  for (var k in y) {
    x[k] = y[k];
  }
  return x;
}

module.exports = assign;

/***/ },
/* 413 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isFunction = __webpack_require__(22);
var isArray = __webpack_require__(60);
var mixin = __webpack_require__(271);
var isStruct = __webpack_require__(1062);
var isInterface = __webpack_require__(1060);
var isObject = __webpack_require__(62);
var refinement = __webpack_require__(272);
var decompose = __webpack_require__(1054);

function compose(predicates, unrefinedType) {
  return predicates.reduce(function (type, predicate) {
    return refinement(type, predicate);
  }, unrefinedType);
}

function getProps(type) {
  return isObject(type) ? type : type.meta.props;
}

function getDefaultProps(type) {
  return isObject(type) ? null : type.meta.defaultProps;
}

function pushAll(arr, elements) {
  Array.prototype.push.apply(arr, elements);
}

function extend(combinator, mixins, options) {
  if (true) {
    assert(isFunction(combinator), function () { return 'Invalid argument combinator supplied to extend(combinator, mixins, options), expected a function'; });
    assert(isArray(mixins), function () { return 'Invalid argument mixins supplied to extend(combinator, mixins, options), expected an array'; });
  }
  var props = {};
  var prototype = {};
  var predicates = [];
  var defaultProps = {};
  mixins.forEach(function (x, i) {
    var decomposition = decompose(x);
    var unrefinedType = decomposition.unrefinedType;
    if (true) {
      assert(isObject(unrefinedType) || isStruct(unrefinedType) || isInterface(unrefinedType), function () { return 'Invalid argument mixins[' + i + '] supplied to extend(combinator, mixins, options), expected an object, struct, interface or a refinement (of struct or interface)'; });
    }
    pushAll(predicates, decomposition.predicates);
    mixin(props, getProps(unrefinedType));
    mixin(prototype, unrefinedType.prototype);
    mixin(defaultProps, getDefaultProps(unrefinedType), true);
  });
  options = combinator.getOptions(options);
  options.defaultProps = mixin(defaultProps, options.defaultProps, true);
  var result = compose(predicates, combinator(props, options));
  mixin(result.prototype, prototype);
  return result;
}

module.exports = extend;

/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

var getTypeName = __webpack_require__(20);

function getDefaultInterfaceName(props) {
  return '{' + Object.keys(props).map(function (prop) {
    return prop + ': ' + getTypeName(props[prop]);
  }).join(', ') + '}';
}

module.exports = getDefaultInterfaceName;


/***/ },
/* 415 */
/***/ function(module, exports) {

module.exports = function isNumber(x) {
  return typeof x === 'number' && isFinite(x) && !isNaN(x);
};

/***/ },
/* 416 */
/***/ function(module, exports, __webpack_require__) {

var isType = __webpack_require__(23);

module.exports = function isUnion(x) {
  return isType(x) && ( x.meta.kind === 'union' );
};

/***/ },
/* 417 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var isFunction = __webpack_require__(22);
var getTypeName = __webpack_require__(20);
var isIdentity = __webpack_require__(61);
var create = __webpack_require__(58);
var is = __webpack_require__(59);
var isArray = __webpack_require__(60);

function getDefaultName(type) {
  return 'Array<' + getTypeName(type) + '>';
}

function list(type, name) {

  if (true) {
    assert(isFunction(type), function () { return 'Invalid argument type ' + assert.stringify(type) + ' supplied to list(type, [name]) combinator (expected a type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to list(type, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(type);
  var typeNameCache = getTypeName(type);
  var identity = isIdentity(type); // the list is identity iif type is identity

  function List(value, path) {

    if (false) {
      if (identity) {
        return value; // just trust the input if elements must not be hydrated
      }
    }

    if (true) {
      path = path || [displayName];
      assert(isArray(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected an array of ' + typeNameCache + ')'; });
    }

    var idempotent = true; // will remain true if I can reutilise the input
    var ret = []; // make a temporary copy, will be discarded if idempotent remains true
    for (var i = 0, len = value.length; i < len; i++ ) {
      var actual = value[i];
      var instance = create(type, actual, (  true ? path.concat(i + ': ' + typeNameCache) : null ));
      idempotent = idempotent && ( actual === instance );
      ret.push(instance);
    }

    if (idempotent) { // implements idempotency
      ret = value;
    }

    if (true) {
      Object.freeze(ret);
    }

    return ret;
  }

  List.meta = {
    kind: 'list',
    type: type,
    name: name,
    identity: identity
  };

  List.displayName = displayName;

  List.is = function (x) {
    return isArray(x) && x.every(function (e) {
      return is(e, type);
    });
  };

  List.update = function (instance, patch) {
    return List(assert.update(instance, patch));
  };

  return List;
}

list.getDefaultName = getDefaultName;
module.exports = list;


/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

var getFunctionName = __webpack_require__(133);

function replacer(key, value) {
  if (typeof value === 'function') {
    return getFunctionName(value);
  }
  return value;
}

module.exports = function stringify(x) {
  try { // handle "Converting circular structure to JSON" error
    return JSON.stringify(x, replacer, 2);
  }
  catch (e) {
    return String(x);
  }
};

/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var isFunction = __webpack_require__(22);
var getTypeName = __webpack_require__(20);
var isIdentity = __webpack_require__(61);
var isArray = __webpack_require__(60);
var create = __webpack_require__(58);
var is = __webpack_require__(59);

function getDefaultName(types) {
  return '[' + types.map(getTypeName).join(', ') + ']';
}

function tuple(types, name) {

  if (true) {
    assert(isArray(types) && types.every(isFunction), function () { return 'Invalid argument types ' + assert.stringify(types) + ' supplied to tuple(types, [name]) combinator (expected an array of types)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to tuple(types, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(types);
  var identity = types.every(isIdentity);

  function Tuple(value, path) {

    if (false) {
      if (identity) {
        return value;
      }
    }

    if (true) {
      path = path || [displayName];
      assert(isArray(value) && value.length === types.length, function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected an array of length ' + types.length + ')'; });
    }

    var idempotent = true;
    var ret = [];
    for (var i = 0, len = types.length; i < len; i++) {
      var expected = types[i];
      var actual = value[i];
      var instance = create(expected, actual, (  true ? path.concat(i + ': ' + getTypeName(expected)) : null ));
      idempotent = idempotent && ( actual === instance );
      ret.push(instance);
    }

    if (idempotent) { // implements idempotency
      ret = value;
    }

    if (true) {
      Object.freeze(ret);
    }

    return ret;
  }

  Tuple.meta = {
    kind: 'tuple',
    types: types,
    name: name,
    identity: identity
  };

  Tuple.displayName = displayName;

  Tuple.is = function (x) {
    return isArray(x) &&
      x.length === types.length &&
      types.every(function (type, i) {
        return is(x[i], type);
      });
  };

  Tuple.update = function (instance, patch) {
    return Tuple(assert.update(instance, patch));
  };

  return Tuple;
}

tuple.getDefaultName = getDefaultName;
module.exports = tuple;

/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

if (false) {
    module.exports = require('./Root.prod'); // eslint-disable-line global-require
} else {
    module.exports = __webpack_require__(432); // eslint-disable-line global-require
}

/***/ },
/* 421 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

if (false) {
    module.exports = require('./configureStore.prod'); // eslint-disable-line global-require
} else {
    module.exports = __webpack_require__(439); // eslint-disable-line global-require
}

/***/ },
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.dataReceiveProtectedData = dataReceiveProtectedData;
exports.dataFetchProtectedDataRequest = dataFetchProtectedDataRequest;
exports.dataFetchProtectedData = dataFetchProtectedData;

var _isomorphicFetch = __webpack_require__(329);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRouterRedux = __webpack_require__(44);

var _config = __webpack_require__(275);

var _utils = __webpack_require__(136);

var _constants = __webpack_require__(135);

var _auth = __webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dataReceiveProtectedData(data) {
    return {
        type: _constants.DATA_RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    };
}

function dataFetchProtectedDataRequest() {
    return {
        type: _constants.DATA_FETCH_PROTECTED_DATA_REQUEST
    };
}

function dataFetchProtectedData(token) {
    return function (dispatch, state) {
        dispatch(dataFetchProtectedDataRequest());
        return (0, _isomorphicFetch2.default)(_config.SERVER_URL + '/api/v1/getdata/', {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: 'Token ' + token
            }
        }).then(_utils.checkHttpStatus).then(_utils.parseJSON).then(function (response) {
            dispatch(dataReceiveProtectedData(response.data));
        }).catch(function (error) {
            if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                // Invalid authentication credentials
                return error.response.json().then(function (data) {
                    dispatch((0, _auth.authLoginUserFailure)(401, data.non_field_errors[0]));
                    dispatch((0, _reactRouterRedux.push)('/login'));
                });
            } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                // Server side error
                dispatch((0, _auth.authLoginUserFailure)(500, 'A server error occurred while sending your data!'));
            } else {
                // Most likely connection issues
                dispatch((0, _auth.authLoginUserFailure)('Connection Error', 'An error occurred while sending your data!'));
            }

            dispatch((0, _reactRouterRedux.push)('/login'));
            return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
        });
    };
}

/***/ },
/* 427 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.AppNotConnected = undefined;

var _class, _temp2;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(75);

var _reactRedux = __webpack_require__(64);

var _reactRouterRedux = __webpack_require__(44);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

var _auth = __webpack_require__(134);

__webpack_require__(1027);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = (_temp2 = _class = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        var _temp, _this, _ret;

        _classCallCheck(this, App);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.logout = function () {
            _this.props.dispatch((0, _auth.authLogoutAndRedirect)());
        }, _this.goToIndex = function () {
            _this.props.dispatch((0, _reactRouterRedux.push)('/'));
        }, _this.goToProtected = function () {
            _this.props.dispatch((0, _reactRouterRedux.push)('/protected'));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    App.prototype.render = function render() {
        var homeClass = (0, _classnames2.default)({
            active: this.props.pathName === '/'
        });
        var protectedClass = (0, _classnames2.default)({
            active: this.props.pathName === '/protected'
        });
        var loginClass = (0, _classnames2.default)({
            active: this.props.pathName === '/login'
        });

        return _react2.default.createElement(
            'div',
            { className: 'app' },
            _react2.default.createElement(
                'nav',
                { className: 'navbar navbar-default' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'navbar-header' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button',
                                className: 'navbar-toggle collapsed',
                                'data-toggle': 'collapse',
                                'data-target': '#top-navbar',
                                'aria-expanded': 'false'
                            },
                            _react2.default.createElement(
                                'span',
                                { className: 'sr-only' },
                                'Toggle navigation'
                            ),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' })
                        ),
                        _react2.default.createElement(
                            'a',
                            { className: 'navbar-brand', tabIndex: '0', onClick: this.goToIndex },
                            'Django React Redux Demo'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'collapse navbar-collapse', id: 'top-navbar' },
                        this.props.isAuthenticated ? _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav navbar-right' },
                            _react2.default.createElement(
                                'li',
                                { className: homeClass },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'js-go-to-index-button', tabIndex: '0', onClick: this.goToIndex },
                                    _react2.default.createElement('i', { className: 'fa fa-home' }),
                                    ' Home'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: protectedClass },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'js-go-to-protected-button',
                                        tabIndex: '0',
                                        onClick: this.goToProtected
                                    },
                                    _react2.default.createElement('i', { className: 'fa fa-lock' }),
                                    ' Protected'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { className: 'js-logout-button', tabIndex: '0', onClick: this.logout },
                                    'Logout'
                                )
                            )
                        ) : _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav navbar-right' },
                            _react2.default.createElement(
                                'li',
                                { className: homeClass },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'js-go-to-index-button', tabIndex: '0', onClick: this.goToIndex },
                                    _react2.default.createElement('i', { className: 'fa fa-home' }),
                                    ' Home'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: loginClass },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { className: 'js-login-button', to: '/login' },
                                    'Login'
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                this.props.children
            )
        );
    };

    return App;
}(_react2.default.Component), _class.propTypes = {
    isAuthenticated: _react2.default.PropTypes.bool.isRequired,
    children: _react2.default.PropTypes.shape().isRequired,
    dispatch: _react2.default.PropTypes.func.isRequired,
    pathName: _react2.default.PropTypes.string.isRequired
}, _temp2);


var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathName: ownProps.location.pathname
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);
exports.AppNotConnected = App;

/***/ },
/* 428 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.HomeViewNotConnected = undefined;

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(75);

var _reactRedux = __webpack_require__(64);

__webpack_require__(1026);

var _reactLogo = __webpack_require__(763);

var _reactLogo2 = _interopRequireDefault(_reactLogo);

var _reduxLogo = __webpack_require__(764);

var _reduxLogo2 = _interopRequireDefault(_reduxLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeView = (_temp = _class = function (_React$Component) {
    _inherits(HomeView, _React$Component);

    function HomeView() {
        _classCallCheck(this, HomeView);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    HomeView.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                'div',
                { className: 'margin-top-medium text-center' },
                _react2.default.createElement('img', { className: 'page-logo margin-bottom-medium',
                    src: _reactLogo2.default,
                    alt: 'ReactJs'
                }),
                _react2.default.createElement('img', { className: 'page-logo margin-bottom-medium',
                    src: _reduxLogo2.default,
                    alt: 'Redux'
                })
            ),
            _react2.default.createElement(
                'div',
                { className: 'text-center' },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Django React Redux Demo'
                ),
                _react2.default.createElement(
                    'h4',
                    null,
                    'Hello, ',
                    this.props.userName || 'guest',
                    '.'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'margin-top-medium text-center' },
                _react2.default.createElement(
                    'p',
                    null,
                    'Attempt to access some ',
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/protected' },
                        _react2.default.createElement(
                            'b',
                            null,
                            'protected content'
                        )
                    ),
                    '.'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'margin-top-medium' },
                this.props.statusText ? _react2.default.createElement(
                    'div',
                    { className: 'alert alert-info' },
                    this.props.statusText
                ) : null
            )
        );
    };

    return HomeView;
}(_react2.default.Component), _class.propTypes = {
    statusText: _react2.default.PropTypes.string,
    userName: _react2.default.PropTypes.string
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(HomeView);
exports.HomeViewNotConnected = HomeView;

/***/ },
/* 429 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.LoginViewNotConnected = undefined;

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(94);

var _reactRedux = __webpack_require__(64);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouterRedux = __webpack_require__(44);

var _tcombForm = __webpack_require__(1044);

var _tcombForm2 = _interopRequireDefault(_tcombForm);

var _auth = __webpack_require__(134);

var actionCreators = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = _tcombForm2.default.form.Form;

var Login = _tcombForm2.default.struct({
    email: _tcombForm2.default.String,
    password: _tcombForm2.default.String
});

var LoginFormOptions = {
    auto: 'placeholders',
    help: _react2.default.createElement(
        'i',
        null,
        'Hint: a@a.com / qw'
    ),
    fields: {
        password: {
            type: 'password'
        }
    }
};

var LoginView = (_temp = _class = function (_React$Component) {
    _inherits(LoginView, _React$Component);

    function LoginView(props) {
        _classCallCheck(this, LoginView);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.onFormChange = function (value) {
            _this.setState({ formValues: value });
        };

        _this.login = function (e) {
            e.preventDefault();
            var value = _this.loginForm.getValue();
            if (value) {
                _this.props.actions.authLoginUser(value.email, value.password, _this.state.redirectTo);
            }
        };

        var redirectRoute = _this.props.location ? _this.props.location.query.next || '/' : '/';
        _this.state = {
            formValues: {
                email: '',
                password: ''
            },
            redirectTo: redirectRoute
        };
        return _this;
    }

    LoginView.prototype.componentWillMount = function componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch((0, _reactRouterRedux.push)('/'));
        }
    };

    LoginView.prototype.render = function render() {
        var _this2 = this;

        var statusText = null;
        if (this.props.statusText) {
            var statusTextClassNames = (0, _classnames2.default)({
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
                'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
            });

            statusText = _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    _react2.default.createElement(
                        'div',
                        { className: statusTextClassNames },
                        this.props.statusText
                    )
                )
            );
        }

        return _react2.default.createElement(
            'div',
            { className: 'container login' },
            _react2.default.createElement(
                'h1',
                { className: 'text-center' },
                'Login'
            ),
            _react2.default.createElement(
                'div',
                { className: 'login-container margin-top-medium' },
                statusText,
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.login },
                    _react2.default.createElement(Form, { ref: function ref(_ref) {
                            _this2.loginForm = _ref;
                        },
                        type: Login,
                        options: LoginFormOptions,
                        value: this.state.formValues,
                        onChange: this.onFormChange
                    }),
                    _react2.default.createElement(
                        'button',
                        { disabled: this.props.isAuthenticating,
                            type: 'submit',
                            className: 'btn btn-default btn-block'
                        },
                        'Submit'
                    )
                )
            )
        );
    };

    return LoginView;
}(_react2.default.Component), _class.propTypes = {
    dispatch: _react2.default.PropTypes.func.isRequired,
    isAuthenticated: _react2.default.PropTypes.bool.isRequired,
    isAuthenticating: _react2.default.PropTypes.bool.isRequired,
    statusText: _react2.default.PropTypes.string,
    actions: _react2.default.PropTypes.shape({
        authLoginUser: _react2.default.PropTypes.func.isRequired
    }).isRequired,
    location: _react2.default.PropTypes.shape({
        query: _react2.default.PropTypes.object.isRequired
    })
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        actions: (0, _redux.bindActionCreators)(actionCreators, dispatch)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoginView);
exports.LoginViewNotConnected = LoginView;

/***/ },
/* 430 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFoundView = function (_React$Component) {
    _inherits(NotFoundView, _React$Component);

    function NotFoundView() {
        _classCallCheck(this, NotFoundView);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    NotFoundView.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h1',
                null,
                'NOT FOUND'
            )
        );
    };

    return NotFoundView;
}(_react2.default.Component);

exports.default = NotFoundView;

/***/ },
/* 431 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.ProtectedViewNotConnected = undefined;

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(64);

var _redux = __webpack_require__(94);

var _data = __webpack_require__(426);

var actionCreators = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProtectedView = (_temp = _class = function (_React$Component) {
    _inherits(ProtectedView, _React$Component);

    function ProtectedView() {
        _classCallCheck(this, ProtectedView);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    // Note: have to use componentWillMount, if I add this in constructor will get error:
    // Warning: setState(...): Cannot update during an existing state transition (such as within `render`).
    // Render methods should be a pure function of props and state.
    ProtectedView.prototype.componentWillMount = function componentWillMount() {
        var token = this.props.token;
        this.props.actions.dataFetchProtectedData(token);
    };

    ProtectedView.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { className: 'protected' },
            _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'h1',
                    { className: 'text-center margin-bottom-medium' },
                    'Protected'
                ),
                this.props.isFetching === true ? _react2.default.createElement(
                    'p',
                    { className: 'text-center' },
                    'Loading data...'
                ) : _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'p',
                        null,
                        'Data received from the server:'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'margin-top-small' },
                        _react2.default.createElement(
                            'div',
                            { className: 'alert alert-info' },
                            _react2.default.createElement(
                                'b',
                                null,
                                this.props.data
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'margin-top-medium' },
                        _react2.default.createElement(
                            'h5',
                            { className: 'margin-bottom-small' },
                            _react2.default.createElement(
                                'b',
                                null,
                                'How does this work?'
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'margin-bottom-small' },
                            'On the ',
                            _react2.default.createElement(
                                'code',
                                null,
                                'componentWillMount'
                            ),
                            ' method of the \xA0',
                            _react2.default.createElement(
                                'code',
                                null,
                                'ProtectedView'
                            ),
                            ' component, the action \xA0',
                            _react2.default.createElement(
                                'code',
                                null,
                                'dataFetchProtectedData'
                            ),
                            ' is called. This action will first dispatch a ',
                            _react2.default.createElement(
                                'code',
                                null,
                                'DATA_FETCH_PROTECTED_DATA_REQUEST'
                            ),
                            ' action to the Redux store. When an action is dispatched to the store, an appropriate reducer for that specific action will change the state of the store. After that it will then make an asynchronous request to the server using the ',
                            _react2.default.createElement(
                                'code',
                                null,
                                'isomorphic-fetch'
                            ),
                            ' library. On its response, it will dispatch the ',
                            _react2.default.createElement(
                                'code',
                                null,
                                'DATA_RECEIVE_PROTECTED_DATA'
                            ),
                            ' action to the Redux store. In case of wrong credentials in the request, the\xA0',
                            _react2.default.createElement(
                                'code',
                                null,
                                'AUTH_LOGIN_USER_FAILURE'
                            ),
                            ' action will be dispatched.'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Because the ',
                            _react2.default.createElement(
                                'code',
                                null,
                                'ProtectedView'
                            ),
                            ' is connected to the Redux store, when the value of a property connected to the view is changed, the view is re-rendered with the new data.'
                        )
                    )
                )
            )
        );
    };

    return ProtectedView;
}(_react2.default.Component), _class.propTypes = {
    isFetching: _react2.default.PropTypes.bool.isRequired,
    data: _react2.default.PropTypes.string,
    token: _react2.default.PropTypes.string.isRequired,
    actions: _react2.default.PropTypes.shape({
        dataFetchProtectedData: _react2.default.PropTypes.func.isRequired
    }).isRequired
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return {
        data: state.data.data,
        isFetching: state.data.isFetching
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(actionCreators, dispatch)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProtectedView);
exports.ProtectedViewNotConnected = ProtectedView;

/***/ },
/* 432 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(64);

var _reactRouter = __webpack_require__(75);

var _routes = __webpack_require__(438);

var _routes2 = _interopRequireDefault(_routes);

var _DevTools = __webpack_require__(274);

var _DevTools2 = _interopRequireDefault(_DevTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = (_temp = _class = function (_React$Component) {
    _inherits(Root, _React$Component);

    function Root() {
        _classCallCheck(this, Root);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Root.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _reactRedux.Provider,
                { store: this.props.store },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _reactRouter.Router,
                        { history: this.props.history },
                        _routes2.default
                    ),
                    _react2.default.createElement(_DevTools2.default, null)
                )
            )
        );
    };

    return Root;
}(_react2.default.Component), _class.propTypes = {
    store: _react2.default.PropTypes.shape().isRequired,
    history: _react2.default.PropTypes.shape().isRequired
}, _temp);
exports.default = Root;

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.NotFoundView = exports.ProtectedView = exports.LoginView = exports.HomeView = undefined;

var _index = __webpack_require__(428);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(429);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(431);

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(430);

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.HomeView = _index2.default;
exports.LoginView = _index4.default;
exports.ProtectedView = _index6.default;
exports.NotFoundView = _index8.default;

/***/ },
/* 434 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

__webpack_require__(179);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(180);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(75);

var _reactRouterRedux = __webpack_require__(44);

var _Root = __webpack_require__(420);

var _Root2 = _interopRequireDefault(_Root);

var _configureStore = __webpack_require__(421);

var _configureStore2 = _interopRequireDefault(_configureStore);

var _auth = __webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var target = document.getElementById('root');

var store = (0, _configureStore2.default)(window.INITIAL_STATE, _reactRouter.browserHistory);
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

var node = _react2.default.createElement(_Root2.default, { store: store, history: history });

var token = sessionStorage.getItem('token');
var user = {};
try {
    user = JSON.parse(sessionStorage.getItem('user'));
} catch (e) {
    // Failed to parse
}

if (token !== null) {
    store.dispatch((0, _auth.authLoginUserSuccess)(token, user));
}

_reactDom2.default.render(node, target);

/***/ },
/* 435 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _createReducer;

var _utils = __webpack_require__(136);

var _constants = __webpack_require__(135);

var initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

exports.default = (0, _utils.createReducer)(initialState, (_createReducer = {}, _createReducer[_constants.AUTH_LOGIN_USER_REQUEST] = function (state, payload) {
    return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: null
    });
}, _createReducer[_constants.AUTH_LOGIN_USER_SUCCESS] = function (state, payload) {
    return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: payload.token,
        userName: payload.user.email,
        statusText: 'You have been successfully logged in.'
    });
}, _createReducer[_constants.AUTH_LOGIN_USER_FAILURE] = function (state, payload) {
    return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: 'Authentication Error: ' + payload.status + ' - ' + payload.statusText
    });
}, _createReducer[_constants.AUTH_LOGOUT_USER] = function (state, payload) {
    return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: 'You have been successfully logged out.'
    });
}, _createReducer));

/***/ },
/* 436 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _createReducer;

var _utils = __webpack_require__(136);

var _constants = __webpack_require__(135);

var initialState = {
    data: null,
    isFetching: false
};

exports.default = (0, _utils.createReducer)(initialState, (_createReducer = {}, _createReducer[_constants.DATA_RECEIVE_PROTECTED_DATA] = function (state, payload) {
    return Object.assign({}, state, {
        data: payload.data,
        isFetching: false
    });
}, _createReducer[_constants.DATA_FETCH_PROTECTED_DATA_REQUEST] = function (state, payload) {
    return Object.assign({}, state, {
        isFetching: true
    });
}, _createReducer));

/***/ },
/* 437 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _redux = __webpack_require__(94);

var _reactRouterRedux = __webpack_require__(44);

var _auth = __webpack_require__(435);

var _auth2 = _interopRequireDefault(_auth);

var _data = __webpack_require__(436);

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    auth: _auth2.default,
    data: _data2.default,
    routing: _reactRouterRedux.routerReducer
});

/***/ },
/* 438 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(75);

var _app = __webpack_require__(427);

var _app2 = _interopRequireDefault(_app);

var _containers = __webpack_require__(433);

var _requireAuthentication = __webpack_require__(440);

var _requireAuthentication2 = _interopRequireDefault(_requireAuthentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _app2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _containers.HomeView }),
    _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _containers.LoginView }),
    _react2.default.createElement(_reactRouter.Route, { path: 'protected', component: (0, _requireAuthentication2.default)(_containers.ProtectedView) }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _containers.NotFoundView })
);

/***/ },
/* 439 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = configureStore;

var _reduxThunk = __webpack_require__(1017);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = __webpack_require__(94);

var _reduxLogger = __webpack_require__(1016);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reactRouterRedux = __webpack_require__(44);

var _reducers = __webpack_require__(437);

var _reducers2 = _interopRequireDefault(_reducers);

var _DevTools = __webpack_require__(274);

var _DevTools2 = _interopRequireDefault(_DevTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

function configureStore(initialState, history) {
    var logger = (0, _reduxLogger2.default)();

    // Add so dispatched route actions to the history
    var reduxRouterMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);

    var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, logger, reduxRouterMiddleware);

    var createStoreWithMiddleware = (0, _redux.compose)(middleware, _DevTools2.default.instrument());

    var store = createStoreWithMiddleware(_redux.createStore)(_reducers2.default, initialState);

    if (false) {
        module.hot.accept('../reducers', function () {
            var nextRootReducer = require('../reducers/index'); // eslint-disable-line global-require

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

/***/ },
/* 440 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = requireAuthentication;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(64);

var _reactRouterRedux = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function requireAuthentication(Component) {
    var _class, _temp;

    var AuthenticatedComponent = (_temp = _class = function (_React$Component) {
        _inherits(AuthenticatedComponent, _React$Component);

        function AuthenticatedComponent() {
            _classCallCheck(this, AuthenticatedComponent);

            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        AuthenticatedComponent.prototype.componentWillMount = function componentWillMount() {
            this.checkAuth();
        };

        AuthenticatedComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            this.checkAuth();
        };

        AuthenticatedComponent.prototype.checkAuth = function checkAuth() {
            if (!this.props.isAuthenticated) {
                var redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch((0, _reactRouterRedux.push)('/login?next=' + redirectAfterLogin));
            }
        };

        AuthenticatedComponent.prototype.render = function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.props.isAuthenticated === true ? _react2.default.createElement(Component, this.props) : null
            );
        };

        return AuthenticatedComponent;
    }(_react2.default.Component), _class.propTypes = {
        isAuthenticated: _react2.default.PropTypes.bool.isRequired,
        location: _react2.default.PropTypes.shape({
            pathname: _react2.default.PropTypes.string.isRequired
        }).isRequired,
        dispatch: _react2.default.PropTypes.func.isRequired
    }, _temp);


    var mapStateToProps = function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            token: state.auth.token
        };
    };

    return (0, _reactRedux.connect)(mapStateToProps)(AuthenticatedComponent);
}

/***/ },
/* 441 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(511), __esModule: true };

/***/ },
/* 442 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(513), __esModule: true };

/***/ },
/* 443 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(514), __esModule: true };

/***/ },
/* 444 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(515), __esModule: true };

/***/ },
/* 445 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(516), __esModule: true };

/***/ },
/* 446 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(517), __esModule: true };

/***/ },
/* 447 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(518), __esModule: true };

/***/ },
/* 448 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(520), __esModule: true };

/***/ },
/* 449 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(522), __esModule: true };

/***/ },
/* 450 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(523), __esModule: true };

/***/ },
/* 451 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(137);

/***/ },
/* 452 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(453);

/***/ },
/* 453 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _defineProperty = __webpack_require__(446);

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

/***/ },
/* 454 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(448);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(447);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ },
/* 455 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.__esModule = true;

exports.default = function (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
};

/***/ },
/* 456 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _isIterable2 = __webpack_require__(442);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(181);

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

/***/ },
/* 457 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(279);

/***/ },
/* 458 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'apathy',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#031A16',
  base01: '#0B342D',
  base02: '#184E45',
  base03: '#2B685E',
  base04: '#5F9C92',
  base05: '#81B5AC',
  base06: '#A7CEC8',
  base07: '#D2E7E4',
  base08: '#3E9688',
  base09: '#3E7996',
  base0A: '#3E4C96',
  base0B: '#883E96',
  base0C: '#963E4C',
  base0D: '#96883E',
  base0E: '#4C963E',
  base0F: '#3E965B'
};
module.exports = exports['default'];

/***/ },
/* 459 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'ashes',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#1C2023',
  base01: '#393F45',
  base02: '#565E65',
  base03: '#747C84',
  base04: '#ADB3BA',
  base05: '#C7CCD1',
  base06: '#DFE2E5',
  base07: '#F3F4F5',
  base08: '#C7AE95',
  base09: '#C7C795',
  base0A: '#AEC795',
  base0B: '#95C7AE',
  base0C: '#95AEC7',
  base0D: '#AE95C7',
  base0E: '#C795AE',
  base0F: '#C79595'
};
module.exports = exports['default'];

/***/ },
/* 460 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier dune',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune)',
  base00: '#20201d',
  base01: '#292824',
  base02: '#6e6b5e',
  base03: '#7d7a68',
  base04: '#999580',
  base05: '#a6a28c',
  base06: '#e8e4cf',
  base07: '#fefbec',
  base08: '#d73737',
  base09: '#b65611',
  base0A: '#cfb017',
  base0B: '#60ac39',
  base0C: '#1fad83',
  base0D: '#6684e1',
  base0E: '#b854d4',
  base0F: '#d43552'
};
module.exports = exports['default'];

/***/ },
/* 461 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier forest',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest)',
  base00: '#1b1918',
  base01: '#2c2421',
  base02: '#68615e',
  base03: '#766e6b',
  base04: '#9c9491',
  base05: '#a8a19f',
  base06: '#e6e2e0',
  base07: '#f1efee',
  base08: '#f22c40',
  base09: '#df5320',
  base0A: '#d5911a',
  base0B: '#5ab738',
  base0C: '#00ad9c',
  base0D: '#407ee7',
  base0E: '#6666ea',
  base0F: '#c33ff3'
};
module.exports = exports['default'];

/***/ },
/* 462 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier heath',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath)',
  base00: '#1b181b',
  base01: '#292329',
  base02: '#695d69',
  base03: '#776977',
  base04: '#9e8f9e',
  base05: '#ab9bab',
  base06: '#d8cad8',
  base07: '#f7f3f7',
  base08: '#ca402b',
  base09: '#a65926',
  base0A: '#bb8a35',
  base0B: '#379a37',
  base0C: '#159393',
  base0D: '#516aec',
  base0E: '#7b59c0',
  base0F: '#cc33cc'
};
module.exports = exports['default'];

/***/ },
/* 463 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier lakeside',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside/)',
  base00: '#161b1d',
  base01: '#1f292e',
  base02: '#516d7b',
  base03: '#5a7b8c',
  base04: '#7195a8',
  base05: '#7ea2b4',
  base06: '#c1e4f6',
  base07: '#ebf8ff',
  base08: '#d22d72',
  base09: '#935c25',
  base0A: '#8a8a0f',
  base0B: '#568c3b',
  base0C: '#2d8f6f',
  base0D: '#257fad',
  base0E: '#5d5db1',
  base0F: '#b72dd2'
};
module.exports = exports['default'];

/***/ },
/* 464 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier seaside',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside/)',
  base00: '#131513',
  base01: '#242924',
  base02: '#5e6e5e',
  base03: '#687d68',
  base04: '#809980',
  base05: '#8ca68c',
  base06: '#cfe8cf',
  base07: '#f0fff0',
  base08: '#e6193c',
  base09: '#87711d',
  base0A: '#c3c322',
  base0B: '#29a329',
  base0C: '#1999b3',
  base0D: '#3d62f5',
  base0E: '#ad2bee',
  base0F: '#e619c3'
};
module.exports = exports['default'];

/***/ },
/* 465 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'bespin',
  author: 'jan t. sott',
  base00: '#28211c',
  base01: '#36312e',
  base02: '#5e5d5c',
  base03: '#666666',
  base04: '#797977',
  base05: '#8a8986',
  base06: '#9d9b97',
  base07: '#baae9e',
  base08: '#cf6a4c',
  base09: '#cf7d34',
  base0A: '#f9ee98',
  base0B: '#54be0d',
  base0C: '#afc4db',
  base0D: '#5ea6ea',
  base0E: '#9b859d',
  base0F: '#937121'
};
module.exports = exports['default'];

/***/ },
/* 466 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'brewer',
  author: 'timothée poisot (http://github.com/tpoisot)',
  base00: '#0c0d0e',
  base01: '#2e2f30',
  base02: '#515253',
  base03: '#737475',
  base04: '#959697',
  base05: '#b7b8b9',
  base06: '#dadbdc',
  base07: '#fcfdfe',
  base08: '#e31a1c',
  base09: '#e6550d',
  base0A: '#dca060',
  base0B: '#31a354',
  base0C: '#80b1d3',
  base0D: '#3182bd',
  base0E: '#756bb1',
  base0F: '#b15928'
};
module.exports = exports['default'];

/***/ },
/* 467 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
};
module.exports = exports['default'];

/***/ },
/* 468 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'chalk',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#151515',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#b0b0b0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#f5f5f5',
  base08: '#fb9fb1',
  base09: '#eda987',
  base0A: '#ddb26f',
  base0B: '#acc267',
  base0C: '#12cfc0',
  base0D: '#6fc2ef',
  base0E: '#e1a3ee',
  base0F: '#deaf8f'
};
module.exports = exports['default'];

/***/ },
/* 469 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'codeschool',
  author: 'brettof86',
  base00: '#232c31',
  base01: '#1c3657',
  base02: '#2a343a',
  base03: '#3f4944',
  base04: '#84898c',
  base05: '#9ea7a6',
  base06: '#a7cfa3',
  base07: '#b5d8f6',
  base08: '#2a5491',
  base09: '#43820d',
  base0A: '#a03b1e',
  base0B: '#237986',
  base0C: '#b02f30',
  base0D: '#484d79',
  base0E: '#c59820',
  base0F: '#c98344'
};
module.exports = exports['default'];

/***/ },
/* 470 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'colors',
  author: 'mrmrs (http://clrs.cc)',
  base00: '#111111',
  base01: '#333333',
  base02: '#555555',
  base03: '#777777',
  base04: '#999999',
  base05: '#bbbbbb',
  base06: '#dddddd',
  base07: '#ffffff',
  base08: '#ff4136',
  base09: '#ff851b',
  base0A: '#ffdc00',
  base0B: '#2ecc40',
  base0C: '#7fdbff',
  base0D: '#0074d9',
  base0E: '#b10dc9',
  base0F: '#85144b'
};
module.exports = exports['default'];

/***/ },
/* 471 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'default',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#181818',
  base01: '#282828',
  base02: '#383838',
  base03: '#585858',
  base04: '#b8b8b8',
  base05: '#d8d8d8',
  base06: '#e8e8e8',
  base07: '#f8f8f8',
  base08: '#ab4642',
  base09: '#dc9656',
  base0A: '#f7ca88',
  base0B: '#a1b56c',
  base0C: '#86c1b9',
  base0D: '#7cafc2',
  base0E: '#ba8baf',
  base0F: '#a16946'
};
module.exports = exports['default'];

/***/ },
/* 472 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'eighties',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2d2d2d',
  base01: '#393939',
  base02: '#515151',
  base03: '#747369',
  base04: '#a09f93',
  base05: '#d3d0c8',
  base06: '#e8e6df',
  base07: '#f2f0ec',
  base08: '#f2777a',
  base09: '#f99157',
  base0A: '#ffcc66',
  base0B: '#99cc99',
  base0C: '#66cccc',
  base0D: '#6699cc',
  base0E: '#cc99cc',
  base0F: '#d27b53'
};
module.exports = exports['default'];

/***/ },
/* 473 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'embers',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#16130F',
  base01: '#2C2620',
  base02: '#433B32',
  base03: '#5A5047',
  base04: '#8A8075',
  base05: '#A39A90',
  base06: '#BEB6AE',
  base07: '#DBD6D1',
  base08: '#826D57',
  base09: '#828257',
  base0A: '#6D8257',
  base0B: '#57826D',
  base0C: '#576D82',
  base0D: '#6D5782',
  base0E: '#82576D',
  base0F: '#825757'
};
module.exports = exports['default'];

/***/ },
/* 474 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'flat',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2C3E50',
  base01: '#34495E',
  base02: '#7F8C8D',
  base03: '#95A5A6',
  base04: '#BDC3C7',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ECF0F1',
  base08: '#E74C3C',
  base09: '#E67E22',
  base0A: '#F1C40F',
  base0B: '#2ECC71',
  base0C: '#1ABC9C',
  base0D: '#3498DB',
  base0E: '#9B59B6',
  base0F: '#be643c'
};
module.exports = exports['default'];

/***/ },
/* 475 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED'
};
module.exports = exports['default'];

/***/ },
/* 476 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'grayscale',
  author: 'alexandre gavioli (https://github.com/alexx2/)',
  base00: '#101010',
  base01: '#252525',
  base02: '#464646',
  base03: '#525252',
  base04: '#ababab',
  base05: '#b9b9b9',
  base06: '#e3e3e3',
  base07: '#f7f7f7',
  base08: '#7c7c7c',
  base09: '#999999',
  base0A: '#a0a0a0',
  base0B: '#8e8e8e',
  base0C: '#868686',
  base0D: '#686868',
  base0E: '#747474',
  base0F: '#5e5e5e'
};
module.exports = exports['default'];

/***/ },
/* 477 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'green screen',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#001100',
  base01: '#003300',
  base02: '#005500',
  base03: '#007700',
  base04: '#009900',
  base05: '#00bb00',
  base06: '#00dd00',
  base07: '#00ff00',
  base08: '#007700',
  base09: '#009900',
  base0A: '#007700',
  base0B: '#00bb00',
  base0C: '#005500',
  base0D: '#009900',
  base0E: '#00bb00',
  base0F: '#005500'
};
module.exports = exports['default'];

/***/ },
/* 478 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'harmonic16',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#0b1c2c',
  base01: '#223b54',
  base02: '#405c79',
  base03: '#627e99',
  base04: '#aabcce',
  base05: '#cbd6e2',
  base06: '#e5ebf1',
  base07: '#f7f9fb',
  base08: '#bf8b56',
  base09: '#bfbf56',
  base0A: '#8bbf56',
  base0B: '#56bf8b',
  base0C: '#568bbf',
  base0D: '#8b56bf',
  base0E: '#bf568b',
  base0F: '#bf5656'
};
module.exports = exports['default'];

/***/ },
/* 479 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'hopscotch',
  author: 'jan t. sott',
  base00: '#322931',
  base01: '#433b42',
  base02: '#5c545b',
  base03: '#797379',
  base04: '#989498',
  base05: '#b9b5b8',
  base06: '#d5d3d5',
  base07: '#ffffff',
  base08: '#dd464c',
  base09: '#fd8b19',
  base0A: '#fdcc59',
  base0B: '#8fc13e',
  base0C: '#149b93',
  base0D: '#1290bf',
  base0E: '#c85e7c',
  base0F: '#b33508'
};
module.exports = exports['default'];

/***/ },
/* 480 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'isotope',
  author: 'jan t. sott',
  base00: '#000000',
  base01: '#404040',
  base02: '#606060',
  base03: '#808080',
  base04: '#c0c0c0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#ff0000',
  base09: '#ff9900',
  base0A: '#ff0099',
  base0B: '#33ff00',
  base0C: '#00ffff',
  base0D: '#0066ff',
  base0E: '#cc00ff',
  base0F: '#3300ff'
};
module.exports = exports['default'];

/***/ },
/* 481 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'marrakesh',
  author: 'alexandre gavioli (http://github.com/alexx2/)',
  base00: '#201602',
  base01: '#302e00',
  base02: '#5f5b17',
  base03: '#6c6823',
  base04: '#86813b',
  base05: '#948e48',
  base06: '#ccc37a',
  base07: '#faf0a5',
  base08: '#c35359',
  base09: '#b36144',
  base0A: '#a88339',
  base0B: '#18974e',
  base0C: '#75a738',
  base0D: '#477ca1',
  base0E: '#8868b3',
  base0F: '#b3588e'
};
module.exports = exports['default'];

/***/ },
/* 482 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'mocha',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#3B3228',
  base01: '#534636',
  base02: '#645240',
  base03: '#7e705a',
  base04: '#b8afad',
  base05: '#d0c8c6',
  base06: '#e9e1dd',
  base07: '#f5eeeb',
  base08: '#cb6077',
  base09: '#d28b71',
  base0A: '#f4bc87',
  base0B: '#beb55b',
  base0C: '#7bbda4',
  base0D: '#8ab3b5',
  base0E: '#a89bb9',
  base0F: '#bb9584'
};
module.exports = exports['default'];

/***/ },
/* 483 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};
module.exports = exports['default'];

/***/ },
/* 484 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'ocean',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2b303b',
  base01: '#343d46',
  base02: '#4f5b66',
  base03: '#65737e',
  base04: '#a7adba',
  base05: '#c0c5ce',
  base06: '#dfe1e8',
  base07: '#eff1f5',
  base08: '#bf616a',
  base09: '#d08770',
  base0A: '#ebcb8b',
  base0B: '#a3be8c',
  base0C: '#96b5b4',
  base0D: '#8fa1b3',
  base0E: '#b48ead',
  base0F: '#ab7967'
};
module.exports = exports['default'];

/***/ },
/* 485 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'paraiso',
  author: 'jan t. sott',
  base00: '#2f1e2e',
  base01: '#41323f',
  base02: '#4f424c',
  base03: '#776e71',
  base04: '#8d8687',
  base05: '#a39e9b',
  base06: '#b9b6b0',
  base07: '#e7e9db',
  base08: '#ef6155',
  base09: '#f99b15',
  base0A: '#fec418',
  base0B: '#48b685',
  base0C: '#5bc4bf',
  base0D: '#06b6ef',
  base0E: '#815ba4',
  base0F: '#e96ba8'
};
module.exports = exports['default'];

/***/ },
/* 486 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'pop',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#b0b0b0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#eb008a',
  base09: '#f29333',
  base0A: '#f8ca12',
  base0B: '#37b349',
  base0C: '#00aabb',
  base0D: '#0e5a94',
  base0E: '#b31e8d',
  base0F: '#7a2d00'
};
module.exports = exports['default'];

/***/ },
/* 487 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'railscasts',
  author: 'ryan bates (http://railscasts.com)',
  base00: '#2b2b2b',
  base01: '#272935',
  base02: '#3a4055',
  base03: '#5a647e',
  base04: '#d4cfc9',
  base05: '#e6e1dc',
  base06: '#f4f1ed',
  base07: '#f9f7f3',
  base08: '#da4939',
  base09: '#cc7833',
  base0A: '#ffc66d',
  base0B: '#a5c261',
  base0C: '#519f50',
  base0D: '#6d9cbe',
  base0E: '#b6b3eb',
  base0F: '#bc9458'
};
module.exports = exports['default'];

/***/ },
/* 488 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'shapeshifter',
  author: 'tyler benziger (http://tybenz.com)',
  base00: '#000000',
  base01: '#040404',
  base02: '#102015',
  base03: '#343434',
  base04: '#555555',
  base05: '#ababab',
  base06: '#e0e0e0',
  base07: '#f9f9f9',
  base08: '#e92f2f',
  base09: '#e09448',
  base0A: '#dddd13',
  base0B: '#0ed839',
  base0C: '#23edda',
  base0D: '#3b48e3',
  base0E: '#f996e2',
  base0F: '#69542d'
};
module.exports = exports['default'];

/***/ },
/* 489 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'solarized',
  author: 'ethan schoonover (http://ethanschoonover.com/solarized)',
  base00: '#002b36',
  base01: '#073642',
  base02: '#586e75',
  base03: '#657b83',
  base04: '#839496',
  base05: '#93a1a1',
  base06: '#eee8d5',
  base07: '#fdf6e3',
  base08: '#dc322f',
  base09: '#cb4b16',
  base0A: '#b58900',
  base0B: '#859900',
  base0C: '#2aa198',
  base0D: '#268bd2',
  base0E: '#6c71c4',
  base0F: '#d33682'
};
module.exports = exports['default'];

/***/ },
/* 490 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'summerfruit',
  author: 'christopher corley (http://cscorley.github.io/)',
  base00: '#151515',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#B0B0B0',
  base05: '#D0D0D0',
  base06: '#E0E0E0',
  base07: '#FFFFFF',
  base08: '#FF0086',
  base09: '#FD8900',
  base0A: '#ABA800',
  base0B: '#00C918',
  base0C: '#1faaaa',
  base0D: '#3777E6',
  base0E: '#AD00A1',
  base0F: '#cc6633'
};
module.exports = exports['default'];

/***/ },
/* 491 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'threezerotwofour',
  author: 'jan t. sott (http://github.com/idleberg)',
  base00: '#090300',
  base01: '#3a3432',
  base02: '#4a4543',
  base03: '#5c5855',
  base04: '#807d7c',
  base05: '#a5a2a2',
  base06: '#d6d5d4',
  base07: '#f7f7f7',
  base08: '#db2d20',
  base09: '#e8bbd0',
  base0A: '#fded02',
  base0B: '#01a252',
  base0C: '#b5e4f4',
  base0D: '#01a0e4',
  base0E: '#a16a94',
  base0F: '#cdab53'
};
module.exports = exports['default'];

/***/ },
/* 492 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'tomorrow',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#cc6666',
  base09: '#de935f',
  base0A: '#f0c674',
  base0B: '#b5bd68',
  base0C: '#8abeb7',
  base0D: '#81a2be',
  base0E: '#b294bb',
  base0F: '#a3685a'
};
module.exports = exports['default'];

/***/ },
/* 493 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'london tube',
  author: 'jan t. sott',
  base00: '#231f20',
  base01: '#1c3f95',
  base02: '#5a5758',
  base03: '#737171',
  base04: '#959ca1',
  base05: '#d9d8d8',
  base06: '#e7e7e8',
  base07: '#ffffff',
  base08: '#ee2e24',
  base09: '#f386a1',
  base0A: '#ffd204',
  base0B: '#00853e',
  base0C: '#85cebc',
  base0D: '#009ddc',
  base0E: '#98005d',
  base0F: '#b06110'
};
module.exports = exports['default'];

/***/ },
/* 494 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'twilight',
  author: 'david hart (http://hart-dev.com)',
  base00: '#1e1e1e',
  base01: '#323537',
  base02: '#464b50',
  base03: '#5f5a60',
  base04: '#838184',
  base05: '#a7a7a7',
  base06: '#c3c3c3',
  base07: '#ffffff',
  base08: '#cf6a4c',
  base09: '#cda869',
  base0A: '#f9ee98',
  base0B: '#8f9d6a',
  base0C: '#afc4db',
  base0D: '#7587a6',
  base0E: '#9b859d',
  base0F: '#9b703f'
};
module.exports = exports['default'];

/***/ },
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * YUV https://en.wikipedia.org/?title=YUV
 *
 * @module  color-space/yuv
 */
'use strict'

var rgb = __webpack_require__(281);

var yuv = module.exports = {
	name: 'yuv',
	min: [0,-0.5,-0.5],
	max: [1, 0.5, 0.5],
	channel: ['Y','U','V'],
	alias: ['YUV', 'EBU'],

};

yuv.rgb = function(yuv) {
	var y = yuv[0],
		u = yuv[1],
		v = yuv[2],
		r, g, b;

	r = (y * 1) + (u *  0) + (v * 1.13983);
	g = (y * 1) + (u * -0.39465) + (v * -0.58060);
	b = (y * 1) + (u * 2.02311) + (v * 0);

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
}


//extend rgb
rgb.yuv = function(rgb) {
	var r = rgb[0] / 255,
		g = rgb[1] / 255,
		b = rgb[2] / 255;

	var y = (r * 0.299) + (g * 0.587) + (b * 0.114);
	var u = (r * -0.14713) + (g * -0.28886) + (b * 0.436);
	var v = (r * 0.615) + (g * -0.51499) + (b * -0.10001);

	return [y, u, v];
};


/***/ },
/* 510 */,
/* 511 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(143);
__webpack_require__(547);
module.exports = __webpack_require__(15).Array.from;

/***/ },
/* 512 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(198);
__webpack_require__(143);
module.exports = __webpack_require__(545);

/***/ },
/* 513 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(198);
__webpack_require__(143);
module.exports = __webpack_require__(546);

/***/ },
/* 514 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(549);
module.exports = __webpack_require__(15).Number.isSafeInteger;

/***/ },
/* 515 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(550);
module.exports = __webpack_require__(15).Object.assign;

/***/ },
/* 516 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(551);
var $Object = __webpack_require__(15).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ },
/* 517 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(552);
var $Object = __webpack_require__(15).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ },
/* 518 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(553);
var $Object = __webpack_require__(15).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ },
/* 519 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(554);
var $Object = __webpack_require__(15).Object;
module.exports = function getOwnPropertyNames(it){
  return $Object.getOwnPropertyNames(it);
};

/***/ },
/* 520 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(555);
module.exports = __webpack_require__(15).Object.getPrototypeOf;

/***/ },
/* 521 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(556);
module.exports = __webpack_require__(15).Object.keys;

/***/ },
/* 522 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(557);
module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },
/* 523 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(559);
__webpack_require__(558);
__webpack_require__(560);
__webpack_require__(561);
module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 524 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(143);
__webpack_require__(198);
module.exports = __webpack_require__(197).f('iterator');

/***/ },
/* 525 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 526 */
/***/ function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ },
/* 527 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(67)
  , toLength  = __webpack_require__(292)
  , toIndex   = __webpack_require__(544);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 528 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var $defineProperty = __webpack_require__(66)
  , createDesc      = __webpack_require__(115);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ },
/* 529 */
/***/ function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(99)
  , gOPS    = __webpack_require__(190)
  , pIE     = __webpack_require__(140);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ },
/* 530 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(65).document && document.documentElement;

/***/ },
/* 531 */
/***/ function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(98)
  , ITERATOR   = __webpack_require__(39)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ },
/* 532 */
/***/ function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(183);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ },
/* 533 */
/***/ function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(97)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ },
/* 534 */
/***/ function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(76);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ },
/* 535 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var create         = __webpack_require__(188)
  , descriptor     = __webpack_require__(115)
  , setToStringTag = __webpack_require__(191)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(96)(IteratorPrototype, __webpack_require__(39)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ },
/* 536 */
/***/ function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(39)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ },
/* 537 */
/***/ function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ },
/* 538 */
/***/ function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(99)
  , toIObject = __webpack_require__(67);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ },
/* 539 */
/***/ function(module, exports, __webpack_require__) {

var META     = __webpack_require__(142)('meta')
  , isObject = __webpack_require__(97)
  , has      = __webpack_require__(78)
  , setDesc  = __webpack_require__(66).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(95)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ },
/* 540 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(99)
  , gOPS     = __webpack_require__(190)
  , pIE      = __webpack_require__(140)
  , toObject = __webpack_require__(116)
  , IObject  = __webpack_require__(285)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(95)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ },
/* 541 */
/***/ function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(66)
  , anObject = __webpack_require__(76)
  , getKeys  = __webpack_require__(99);

module.exports = __webpack_require__(77) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ },
/* 542 */
/***/ function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(97)
  , anObject = __webpack_require__(76);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(184)(Function.call, __webpack_require__(189).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ },
/* 543 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(194)
  , defined   = __webpack_require__(185);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ },
/* 544 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(194)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 545 */
/***/ function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(76)
  , get      = __webpack_require__(293);
module.exports = __webpack_require__(15).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ },
/* 546 */
/***/ function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(282)
  , ITERATOR  = __webpack_require__(39)('iterator')
  , Iterators = __webpack_require__(98);
module.exports = __webpack_require__(15).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ },
/* 547 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var ctx            = __webpack_require__(184)
  , $export        = __webpack_require__(51)
  , toObject       = __webpack_require__(116)
  , call           = __webpack_require__(534)
  , isArrayIter    = __webpack_require__(531)
  , toLength       = __webpack_require__(292)
  , createProperty = __webpack_require__(528)
  , getIterFn      = __webpack_require__(293);

$export($export.S + $export.F * !__webpack_require__(536)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ },
/* 548 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var addToUnscopables = __webpack_require__(526)
  , step             = __webpack_require__(537)
  , Iterators        = __webpack_require__(98)
  , toIObject        = __webpack_require__(67);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(286)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ },
/* 549 */
/***/ function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(51)
  , isInteger = __webpack_require__(533)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ },
/* 550 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(51);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(540)});

/***/ },
/* 551 */
/***/ function(module, exports, __webpack_require__) {

var $export = __webpack_require__(51)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(188)});

/***/ },
/* 552 */
/***/ function(module, exports, __webpack_require__) {

var $export = __webpack_require__(51);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(77), 'Object', {defineProperty: __webpack_require__(66).f});

/***/ },
/* 553 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(67)
  , $getOwnPropertyDescriptor = __webpack_require__(189).f;

__webpack_require__(141)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ },
/* 554 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(141)('getOwnPropertyNames', function(){
  return __webpack_require__(287).f;
});

/***/ },
/* 555 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(116)
  , $getPrototypeOf = __webpack_require__(289);

__webpack_require__(141)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ },
/* 556 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(116)
  , $keys    = __webpack_require__(99);

__webpack_require__(141)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ },
/* 557 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(51);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(542).set});

/***/ },
/* 558 */
/***/ function(module, exports) {



/***/ },
/* 559 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// ECMAScript 6 symbols shim
var global         = __webpack_require__(65)
  , has            = __webpack_require__(78)
  , DESCRIPTORS    = __webpack_require__(77)
  , $export        = __webpack_require__(51)
  , redefine       = __webpack_require__(291)
  , META           = __webpack_require__(539).KEY
  , $fails         = __webpack_require__(95)
  , shared         = __webpack_require__(193)
  , setToStringTag = __webpack_require__(191)
  , uid            = __webpack_require__(142)
  , wks            = __webpack_require__(39)
  , wksExt         = __webpack_require__(197)
  , wksDefine      = __webpack_require__(196)
  , keyOf          = __webpack_require__(538)
  , enumKeys       = __webpack_require__(529)
  , isArray        = __webpack_require__(532)
  , anObject       = __webpack_require__(76)
  , toIObject      = __webpack_require__(67)
  , toPrimitive    = __webpack_require__(195)
  , createDesc     = __webpack_require__(115)
  , _create        = __webpack_require__(188)
  , gOPNExt        = __webpack_require__(287)
  , $GOPD          = __webpack_require__(189)
  , $DP            = __webpack_require__(66)
  , $keys          = __webpack_require__(99)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(288).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(140).f  = $propertyIsEnumerable;
  __webpack_require__(190).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(187)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
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
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(96)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 560 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(196)('asyncIterator');

/***/ },
/* 561 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(196)('observable');

/***/ },
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */,
/* 691 */,
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */,
/* 712 */,
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */,
/* 728 */,
/* 729 */,
/* 730 */,
/* 731 */,
/* 732 */,
/* 733 */,
/* 734 */,
/* 735 */,
/* 736 */,
/* 737 */,
/* 738 */,
/* 739 */,
/* 740 */,
/* 741 */,
/* 742 */,
/* 743 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(155)();
// imports


// module
exports.push([module.i, ".page-logo {\n  max-width: 200px; }\n", ""]);

// exports


/***/ },
/* 744 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(155)();
// imports


// module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: none;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\nbody {\n  line-height: 1; }\nol, ul {\n  list-style: none; }\nblockquote, q {\n  quotes: none; }\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none; }\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\na {\n  text-decoration: none; }\n/*\n@font-face {\n  font-family: \"Font name\";\n  src: url(\"../../fonts/path\");\n}\n*/\nh1 {\n  font-family: Arial;\n  font-size: 3rem;\n  color: #828282;\n  padding-bottom: .6rem; }\nh2 {\n  font-family: Arial;\n  font-size: 2.5rem;\n  color: #828282; }\nh3 {\n  font-family: Arial;\n  font-size: 2rem;\n  color: #828282; }\nh4 {\n  font-family: Arial;\n  font-size: 1.5rem;\n  color: #828282; }\nh5 {\n  font-family: Arial;\n  font-size: 1rem;\n  color: #828282; }\np {\n  font-family: Arial;\n  font-size: 1rem;\n  line-height: 2rem;\n  color: #828282; }\na {\n  font-family: Arial;\n  font-size: 1rem;\n  text-decoration: underline; }\na:hover {\n    color: #828282;\n    cursor: pointer; }\nb, strong {\n  font-weight: bold; }\ncode {\n  padding: 2px 4px; }\nlabel {\n  font-family: Arial;\n  color: #828282; }\nhtml {\n  width: 100%;\n  height: 100%;\n  font-size: 100%;\n  font-family: Arial; }\n.login .login-container {\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 20px; }\n.navbar {\n  border-radius: 0px; }\n.navbar a {\n    text-decoration: none; }\n.margin-none {\n  margin: 0; }\n.margin-top-none {\n  margin-top: 0; }\n.margin-top-small {\n  margin-top: .6rem; }\n.margin-top-medium {\n  margin-top: 1.875rem; }\n.margin-top-large {\n  margin-top: 3.7rem; }\n.margin-bottom-none {\n  margin-bottom: 0; }\n.margin-bottom-small {\n  margin-bottom: .6rem; }\n.margin-bottom-medium {\n  margin-bottom: 1.875rem; }\n.margin-bottom-large {\n  margin-bottom: 3.7rem; }\n", ""]);

// exports


/***/ },
/* 745 */,
/* 746 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * deep-diff.
 * Licensed under the MIT License.
 */
;(function(root, factory) {
  'use strict';
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return factory();
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.DeepDiff = factory();
  }
}(this, function(undefined) {
  'use strict';

  var $scope, conflict, conflictResolution = [];
  if (typeof global === 'object' && global) {
    $scope = global;
  } else if (typeof window !== 'undefined') {
    $scope = window;
  } else {
    $scope = {};
  }
  conflict = $scope.DeepDiff;
  if (conflict) {
    conflictResolution.push(
      function() {
        if ('undefined' !== typeof conflict && $scope.DeepDiff === accumulateDiff) {
          $scope.DeepDiff = conflict;
          conflict = undefined;
        }
      });
  }

  // nodejs compatible on server side and in the browser.
  function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }

  function Diff(kind, path) {
    Object.defineProperty(this, 'kind', {
      value: kind,
      enumerable: true
    });
    if (path && path.length) {
      Object.defineProperty(this, 'path', {
        value: path,
        enumerable: true
      });
    }
  }

  function DiffEdit(path, origin, value) {
    DiffEdit.super_.call(this, 'E', path);
    Object.defineProperty(this, 'lhs', {
      value: origin,
      enumerable: true
    });
    Object.defineProperty(this, 'rhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffEdit, Diff);

  function DiffNew(path, value) {
    DiffNew.super_.call(this, 'N', path);
    Object.defineProperty(this, 'rhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffNew, Diff);

  function DiffDeleted(path, value) {
    DiffDeleted.super_.call(this, 'D', path);
    Object.defineProperty(this, 'lhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffDeleted, Diff);

  function DiffArray(path, index, item) {
    DiffArray.super_.call(this, 'A', path);
    Object.defineProperty(this, 'index', {
      value: index,
      enumerable: true
    });
    Object.defineProperty(this, 'item', {
      value: item,
      enumerable: true
    });
  }
  inherits(DiffArray, Diff);

  function arrayRemove(arr, from, to) {
    var rest = arr.slice((to || from) + 1 || arr.length);
    arr.length = from < 0 ? arr.length + from : from;
    arr.push.apply(arr, rest);
    return arr;
  }

  function realTypeOf(subject) {
    var type = typeof subject;
    if (type !== 'object') {
      return type;
    }

    if (subject === Math) {
      return 'math';
    } else if (subject === null) {
      return 'null';
    } else if (Array.isArray(subject)) {
      return 'array';
    } else if (Object.prototype.toString.call(subject) === '[object Date]') {
      return 'date';
    } else if (typeof subject.toString !== 'undefined' && /^\/.*\//.test(subject.toString())) {
      return 'regexp';
    }
    return 'object';
  }

  function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
    path = path || [];
    var currentPath = path.slice(0);
    if (typeof key !== 'undefined') {
      if (prefilter) {
        if (typeof(prefilter) === 'function' && prefilter(currentPath, key)) { return; }
        else if (typeof(prefilter) === 'object') {
          if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) { return; }
          if (prefilter.normalize) {
            var alt = prefilter.normalize(currentPath, key, lhs, rhs);
            if (alt) {
              lhs = alt[0];
              rhs = alt[1];
            }
          }
        }
      }
      currentPath.push(key);
    }

    // Use string comparison for regexes
    if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
      lhs = lhs.toString();
      rhs = rhs.toString();
    }

    var ltype = typeof lhs;
    var rtype = typeof rhs;
    if (ltype === 'undefined') {
      if (rtype !== 'undefined') {
        changes(new DiffNew(currentPath, rhs));
      }
    } else if (rtype === 'undefined') {
      changes(new DiffDeleted(currentPath, lhs));
    } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
      changes(new DiffEdit(currentPath, lhs, rhs));
    } else if (Object.prototype.toString.call(lhs) === '[object Date]' && Object.prototype.toString.call(rhs) === '[object Date]' && ((lhs - rhs) !== 0)) {
      changes(new DiffEdit(currentPath, lhs, rhs));
    } else if (ltype === 'object' && lhs !== null && rhs !== null) {
      stack = stack || [];
      if (stack.indexOf(lhs) < 0) {
        stack.push(lhs);
        if (Array.isArray(lhs)) {
          var i, len = lhs.length;
          for (i = 0; i < lhs.length; i++) {
            if (i >= rhs.length) {
              changes(new DiffArray(currentPath, i, new DiffDeleted(undefined, lhs[i])));
            } else {
              deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
            }
          }
          while (i < rhs.length) {
            changes(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i++])));
          }
        } else {
          var akeys = Object.keys(lhs);
          var pkeys = Object.keys(rhs);
          akeys.forEach(function(k, i) {
            var other = pkeys.indexOf(k);
            if (other >= 0) {
              deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack);
              pkeys = arrayRemove(pkeys, other);
            } else {
              deepDiff(lhs[k], undefined, changes, prefilter, currentPath, k, stack);
            }
          });
          pkeys.forEach(function(k) {
            deepDiff(undefined, rhs[k], changes, prefilter, currentPath, k, stack);
          });
        }
        stack.length = stack.length - 1;
      }
    } else if (lhs !== rhs) {
      if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
        changes(new DiffEdit(currentPath, lhs, rhs));
      }
    }
  }

  function accumulateDiff(lhs, rhs, prefilter, accum) {
    accum = accum || [];
    deepDiff(lhs, rhs,
      function(diff) {
        if (diff) {
          accum.push(diff);
        }
      },
      prefilter);
    return (accum.length) ? accum : undefined;
  }

  function applyArrayChange(arr, index, change) {
    if (change.path && change.path.length) {
      var it = arr[index],
          i, u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          applyArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          delete it[change.path[i]];
          break;
        case 'E':
        case 'N':
          it[change.path[i]] = change.rhs;
          break;
      }
    } else {
      switch (change.kind) {
        case 'A':
          applyArrayChange(arr[index], change.index, change.item);
          break;
        case 'D':
          arr = arrayRemove(arr, index);
          break;
        case 'E':
        case 'N':
          arr[index] = change.rhs;
          break;
      }
    }
    return arr;
  }

  function applyChange(target, source, change) {
    if (target && source && change && change.kind) {
      var it = target,
          i = -1,
          last = change.path ? change.path.length - 1 : 0;
      while (++i < last) {
        if (typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = (typeof change.path[i] === 'number') ? [] : {};
        }
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          applyArrayChange(change.path ? it[change.path[i]] : it, change.index, change.item);
          break;
        case 'D':
          delete it[change.path[i]];
          break;
        case 'E':
        case 'N':
          it[change.path[i]] = change.rhs;
          break;
      }
    }
  }

  function revertArrayChange(arr, index, change) {
    if (change.path && change.path.length) {
      // the structure of the object at the index has changed...
      var it = arr[index],
          i, u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          revertArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          it[change.path[i]] = change.lhs;
          break;
        case 'E':
          it[change.path[i]] = change.lhs;
          break;
        case 'N':
          delete it[change.path[i]];
          break;
      }
    } else {
      // the array item is different...
      switch (change.kind) {
        case 'A':
          revertArrayChange(arr[index], change.index, change.item);
          break;
        case 'D':
          arr[index] = change.lhs;
          break;
        case 'E':
          arr[index] = change.lhs;
          break;
        case 'N':
          arr = arrayRemove(arr, index);
          break;
      }
    }
    return arr;
  }

  function revertChange(target, source, change) {
    if (target && source && change && change.kind) {
      var it = target,
          i, u;
      u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        if (typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = {};
        }
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          // Array was modified...
          // it will be an array...
          revertArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          // Item was deleted...
          it[change.path[i]] = change.lhs;
          break;
        case 'E':
          // Item was edited...
          it[change.path[i]] = change.lhs;
          break;
        case 'N':
          // Item is new...
          delete it[change.path[i]];
          break;
      }
    }
  }

  function applyDiff(target, source, filter) {
    if (target && source) {
      var onChange = function(change) {
        if (!filter || filter(target, source, change)) {
          applyChange(target, source, change);
        }
      };
      deepDiff(target, source, onChange);
    }
  }

  Object.defineProperties(accumulateDiff, {

    diff: {
      value: accumulateDiff,
      enumerable: true
    },
    observableDiff: {
      value: deepDiff,
      enumerable: true
    },
    applyDiff: {
      value: applyDiff,
      enumerable: true
    },
    applyChange: {
      value: applyChange,
      enumerable: true
    },
    revertChange: {
      value: revertChange,
      enumerable: true
    },
    isConflict: {
      value: function() {
        return 'undefined' !== typeof conflict;
      },
      enumerable: true
    },
    noConflict: {
      value: function() {
        if (conflictResolution) {
          conflictResolution.forEach(function(it) {
            it();
          });
          conflictResolution = null;
        }
        return accumulateDiff;
      },
      enumerable: true
    }
  });

  return accumulateDiff;
}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ },
/* 747 */,
/* 748 */,
/* 749 */,
/* 750 */,
/* 751 */,
/* 752 */,
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */,
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/react-logo.png?bf6e7aa4366ba93442e42038897d683d";

/***/ },
/* 764 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/redux-logo.png?59c467536111a981d904a050d335c2be";

/***/ },
/* 765 */,
/* 766 */,
/* 767 */,
/* 768 */
/***/ function(module, exports) {

/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;


/***/ },
/* 769 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 128,
    REARG_FLAG = 256,
    FLIP_FLAG = 512;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', ARY_FLAG],
  ['bind', BIND_FLAG],
  ['bindKey', BIND_KEY_FLAG],
  ['curry', CURRY_FLAG],
  ['curryRight', CURRY_RIGHT_FLAG],
  ['flip', FLIP_FLAG],
  ['partial', PARTIAL_FLAG],
  ['partialRight', PARTIAL_RIGHT_FLAG],
  ['rearg', REARG_FLAG]
];

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
    reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      result++;
    }
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var objectCreate = Object.create;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/* Used to set `toString` methods. */
var defineProperty = (function() {
  var func = getNative(Object, 'defineProperty'),
      name = getNative.name;

  return (name && name.length > 2) ? func : undefined;
}());

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
      isFlip = bitmask & FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

  if (!(bitmask & CURRY_BOUND_FLAG)) {
    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
  }

  var result = wrapFunc(func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity);
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 *   512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] == null
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  return setWrapToString(result, func, bitmask);
}

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length,
      lastIndex = length - 1;

  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
var setWrapToString = !defineProperty ? identity : function(wrapper, reference, bitmask) {
  var source = (reference + '');
  return defineProperty(wrapper, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
  });
};

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */
function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

// Assign default placeholders.
curry.placeholder = {};

module.exports = curry;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ },
/* 770 */
/***/ function(module, exports, __webpack_require__) {

/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = __webpack_require__(768);

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeNow = getNative(Date, 'now');

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Date
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = nativeNow || function() {
  return new Date().getTime();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed invocations. Provide an options object to indicate that `func`
 * should be invoked on the leading and/or trailing edge of the `wait` timeout.
 * Subsequent calls to the debounced function return the result of the last
 * `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading
 *  edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
 *  delayed before it is invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // ensure `batchLog` is invoked once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }));
 *
 * // cancel a debounced call
 * var todoChanges = _.debounce(batchLog, 1000);
 * Object.observe(models.todo, todoChanges);
 *
 * Object.observe(models, function(changes) {
 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
 *     todoChanges.cancel();
 *   }
 * }, ['delete']);
 *
 * // ...at some point `models.todo` is changed
 * models.todo.completed = true;
 *
 * // ...before 1 second has passed `models.todo` is deleted
 * // which cancels the debounced `todoChanges` call
 * delete models.todo;
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = wait < 0 ? 0 : (+wait || 0);
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = !!options.leading;
    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    lastCalled = 0;
    maxTimeoutId = timeoutId = trailingCall = undefined;
  }

  function complete(isCalled, id) {
    if (id) {
      clearTimeout(id);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (isCalled) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = undefined;
      }
    }
  }

  function delayed() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0 || remaining > wait) {
      complete(trailingCall, maxTimeoutId);
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  }

  function maxDelayed() {
    complete(trailing, timeoutId);
  }

  function debounced() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0 || remaining > maxWait;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = undefined;
    }
    return result;
  }
  debounced.cancel = cancel;
  return debounced;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = debounce;


/***/ },
/* 771 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
  return baseRest(function(funcs) {
    funcs = baseFlatten(funcs, 1);

    var length = funcs.length,
        index = length;

    if (fromRight) {
      funcs.reverse();
    }
    while (index--) {
      if (typeof funcs[index] != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
    }
    return function() {
      var index = 0,
          result = length ? funcs[index].apply(this, arguments) : arguments[0];

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  });
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {...(Function|Function[])} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see _.flowRight
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flow([_.add, square]);
 * addSquare(1, 2);
 * // => 9
 */
var flow = createFlow();

module.exports = flow;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ },
/* 772 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(88),
    root = __webpack_require__(56);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ },
/* 773 */
/***/ function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(815),
    hashDelete = __webpack_require__(816),
    hashGet = __webpack_require__(817),
    hashHas = __webpack_require__(818),
    hashSet = __webpack_require__(819);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ },
/* 774 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(88),
    root = __webpack_require__(56);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ },
/* 775 */
/***/ function(module, exports, __webpack_require__) {

var root = __webpack_require__(56);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ },
/* 776 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(88),
    root = __webpack_require__(56);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ },
/* 777 */
/***/ function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ },
/* 778 */
/***/ function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(801),
    isArguments = __webpack_require__(233),
    isArray = __webpack_require__(71),
    isBuffer = __webpack_require__(352),
    isIndex = __webpack_require__(344),
    isTypedArray = __webpack_require__(354);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ },
/* 779 */
/***/ function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ },
/* 780 */
/***/ function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ },
/* 781 */
/***/ function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(341);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ },
/* 782 */
/***/ function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(229),
    arrayIncludes = __webpack_require__(332),
    arrayIncludesWith = __webpack_require__(333),
    arrayMap = __webpack_require__(334),
    baseUnary = __webpack_require__(339),
    cacheHas = __webpack_require__(230);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ },
/* 783 */
/***/ function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ },
/* 784 */
/***/ function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(805);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ },
/* 785 */
/***/ function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(784),
    keys = __webpack_require__(236);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ },
/* 786 */
/***/ function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ },
/* 787 */
/***/ function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(783),
    baseIsNaN = __webpack_require__(791),
    strictIndexOf = __webpack_require__(849);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ },
/* 788 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(105),
    isObjectLike = __webpack_require__(89);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ },
/* 789 */
/***/ function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(331),
    equalArrays = __webpack_require__(342),
    equalByTag = __webpack_require__(807),
    equalObjects = __webpack_require__(808),
    getTag = __webpack_require__(812),
    isArray = __webpack_require__(71),
    isBuffer = __webpack_require__(352),
    isTypedArray = __webpack_require__(354);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ },
/* 790 */
/***/ function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(331),
    baseIsEqual = __webpack_require__(337);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ },
/* 791 */
/***/ function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ },
/* 792 */
/***/ function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(353),
    isMasked = __webpack_require__(822),
    isObject = __webpack_require__(164),
    toSource = __webpack_require__(348);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ },
/* 793 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(105),
    isLength = __webpack_require__(234),
    isObjectLike = __webpack_require__(89);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ },
/* 794 */
/***/ function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(796),
    baseMatchesProperty = __webpack_require__(797),
    identity = __webpack_require__(163),
    isArray = __webpack_require__(71),
    property = __webpack_require__(858);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ },
/* 795 */
/***/ function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(823),
    nativeKeys = __webpack_require__(836);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ },
/* 796 */
/***/ function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(790),
    getMatchData = __webpack_require__(809),
    matchesStrictComparable = __webpack_require__(346);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ },
/* 797 */
/***/ function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(337),
    get = __webpack_require__(853),
    hasIn = __webpack_require__(854),
    isKey = __webpack_require__(231),
    isStrictComparable = __webpack_require__(345),
    matchesStrictComparable = __webpack_require__(346),
    toKey = __webpack_require__(162);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ },
/* 798 */
/***/ function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ },
/* 799 */
/***/ function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(336);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ },
/* 800 */
/***/ function(module, exports, __webpack_require__) {

var constant = __webpack_require__(851),
    defineProperty = __webpack_require__(341),
    identity = __webpack_require__(163);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ },
/* 801 */
/***/ function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ },
/* 802 */
/***/ function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(121),
    arrayMap = __webpack_require__(334),
    isArray = __webpack_require__(71),
    isSymbol = __webpack_require__(235);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ },
/* 803 */
/***/ function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(229),
    arrayIncludes = __webpack_require__(332),
    arrayIncludesWith = __webpack_require__(333),
    cacheHas = __webpack_require__(230),
    createSet = __webpack_require__(806),
    setToArray = __webpack_require__(232);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ },
/* 804 */
/***/ function(module, exports, __webpack_require__) {

var root = __webpack_require__(56);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ },
/* 805 */
/***/ function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ },
/* 806 */
/***/ function(module, exports, __webpack_require__) {

var Set = __webpack_require__(330),
    noop = __webpack_require__(857),
    setToArray = __webpack_require__(232);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;


/***/ },
/* 807 */
/***/ function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(121),
    Uint8Array = __webpack_require__(775),
    eq = __webpack_require__(349),
    equalArrays = __webpack_require__(342),
    mapToArray = __webpack_require__(834),
    setToArray = __webpack_require__(232);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ },
/* 808 */
/***/ function(module, exports, __webpack_require__) {

var keys = __webpack_require__(236);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ },
/* 809 */
/***/ function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(345),
    keys = __webpack_require__(236);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ },
/* 810 */,
/* 811 */,
/* 812 */
/***/ function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(772),
    Map = __webpack_require__(227),
    Promise = __webpack_require__(774),
    Set = __webpack_require__(330),
    WeakMap = __webpack_require__(776),
    baseGetTag = __webpack_require__(105),
    toSource = __webpack_require__(348);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ },
/* 813 */
/***/ function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ },
/* 814 */
/***/ function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(340),
    isArguments = __webpack_require__(233),
    isArray = __webpack_require__(71),
    isIndex = __webpack_require__(344),
    isLength = __webpack_require__(234),
    toKey = __webpack_require__(162);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ },
/* 815 */
/***/ function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(161);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ },
/* 816 */
/***/ function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ },
/* 817 */
/***/ function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(161);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ },
/* 818 */
/***/ function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(161);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ },
/* 819 */
/***/ function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(161);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ },
/* 820 */
/***/ function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(121),
    isArguments = __webpack_require__(233),
    isArray = __webpack_require__(71);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ },
/* 821 */
/***/ function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ },
/* 822 */
/***/ function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(804);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ },
/* 823 */
/***/ function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ },
/* 824 */
/***/ function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ },
/* 825 */
/***/ function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(159);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ },
/* 826 */
/***/ function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(159);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ },
/* 827 */
/***/ function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(159);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ },
/* 828 */
/***/ function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(159);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ },
/* 829 */
/***/ function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(773),
    ListCache = __webpack_require__(158),
    Map = __webpack_require__(227);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ },
/* 830 */
/***/ function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(160);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ },
/* 831 */
/***/ function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(160);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ },
/* 832 */
/***/ function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(160);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ },
/* 833 */
/***/ function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(160);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ },
/* 834 */
/***/ function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ },
/* 835 */
/***/ function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(856);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ },
/* 836 */
/***/ function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(347);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ },
/* 837 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(343);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(273)(module)))

/***/ },
/* 838 */,
/* 839 */
/***/ function(module, exports, __webpack_require__) {

var apply = __webpack_require__(777);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ },
/* 840 */
/***/ function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ },
/* 841 */
/***/ function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ },
/* 842 */
/***/ function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(800),
    shortOut = __webpack_require__(843);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ },
/* 843 */
/***/ function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ },
/* 844 */
/***/ function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(158);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ },
/* 845 */
/***/ function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ },
/* 846 */
/***/ function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ },
/* 847 */
/***/ function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ },
/* 848 */
/***/ function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(158),
    Map = __webpack_require__(227),
    MapCache = __webpack_require__(228);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ },
/* 849 */
/***/ function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ },
/* 850 */
/***/ function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(835);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ },
/* 851 */
/***/ function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ },
/* 852 */
/***/ function(module, exports, __webpack_require__) {

var baseDifference = __webpack_require__(782),
    baseFlatten = __webpack_require__(335),
    baseRest = __webpack_require__(338),
    isArrayLikeObject = __webpack_require__(351);

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */
var difference = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : [];
});

module.exports = difference;


/***/ },
/* 853 */
/***/ function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(336);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ },
/* 854 */
/***/ function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(786),
    hasPath = __webpack_require__(814);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ },
/* 855 */
/***/ function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(781),
    baseForOwn = __webpack_require__(785),
    baseIteratee = __webpack_require__(794);

/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapKeys
 * @example
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * _.mapValues(users, function(o) { return o.age; });
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 *
 * // The `_.property` iteratee shorthand.
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee, 3);

  baseForOwn(object, function(value, key, object) {
    baseAssignValue(result, key, iteratee(value, key, object));
  });
  return result;
}

module.exports = mapValues;


/***/ },
/* 856 */
/***/ function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(228);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ },
/* 857 */
/***/ function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ },
/* 858 */
/***/ function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(798),
    basePropertyDeep = __webpack_require__(799),
    isKey = __webpack_require__(231),
    toKey = __webpack_require__(162);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ },
/* 859 */
/***/ function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ },
/* 860 */
/***/ function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(802);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ },
/* 861 */
/***/ function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(335),
    baseRest = __webpack_require__(338),
    baseUniq = __webpack_require__(803),
    isArrayLikeObject = __webpack_require__(351);

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = baseRest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});

module.exports = union;


/***/ },
/* 862 */
/***/ function(module, exports) {

// Most of these are according to this table: http://www.ssicom.org/js/x171166.htm
// However where nodejs readline diverges, they are adjusted to conform to it
module.exports = {
  nomod: {
      escape: '\u001b'
    , space: ' ' // actually '\u0020'
    }
  , ctrl: {
        ' ': '\u0000'
      , 'a': '\u0001'
      , 'b': '\u0002'
      , 'c': '\u0003'
      , 'd': '\u0004'
      , 'e': '\u0005'
      , 'f': '\u0006'
      , 'g': '\u0007'
      , 'h': '\u0008'
      , 'i': '\u0009'
      , 'j': '\u000a'
      , 'k': '\u000b'
      , 'm': '\u000c'
      , 'n': '\u000d'
      , 'l': '\u000e'
      , 'o': '\u000f'
      , 'p': '\u0010'
      , 'q': '\u0011'
      , 'r': '\u0012'
      , 's': '\u0013'
      , 't': '\u0014'
      , 'u': '\u0015'
      , 'v': '\u0016'
      , 'w': '\u0017'
      , 'x': '\u0018'
      , 'y': '\u0019'
      , 'z': '\u001a'
      , '[': '\u001b'
      , '\\':'\u001c'
      , ']': '\u001d'
      , '^': '\u001e'
      , '_': '\u001f'

      , 'space': '\u0000'
    }
};


/***/ },
/* 863 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var keycodes = __webpack_require__(862);

function assertKeyString(s) {
  if (!/^(ctrl-|shift-|alt-|meta-){0,4}\w+$/.test(s))
    throw new Error('The string to parse needs to be of the format "c", "ctrl-c", "shift-ctrl-c".');
}

module.exports = function parse(s) {
  var keyString = s.trim().toLowerCase();

  assertKeyString(keyString);

  var key = {
      name     :  undefined
    , ctrl     :  false
    , meta     :  false
    , shift    :  false
    , alt      :  false
    , sequence :  undefined
  }
  , parts = keyString.split('-')
  , c;

  key.name = parts.pop();
  while((c = parts.pop())) key[c] = true;
  key.sequence = key.ctrl 
    ? keycodes.ctrl[key.name] || key.name
    : keycodes.nomod[key.name] || key.name;

  // uppercase sequence for single chars when shift was pressed
  if (key.shift && key.sequence && key.sequence.length === 1)
    key.sequence = key.sequence.toUpperCase();

  return key;
};


/***/ },
/* 864 */
/***/ function(module, exports) {

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

module.exports = hsl2rgb;

/***/ },
/* 865 */
/***/ function(module, exports, __webpack_require__) {

var clamp = __webpack_require__(237);

function componentToHex(c) {
  var value = Math.round(clamp(c, 0, 255));
  var hex   = value.toString(16);

  return hex.length == 1 ? "0" + hex : hex;
}

function rgb2hex(rgb) {
  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

module.exports = rgb2hex;

/***/ },
/* 866 */
/***/ function(module, exports) {

function hex(hex) {
  if (hex.length === 4) {
    hex = '#' + hex.charAt(1) + hex.charAt(1) +
      hex.charAt(2) + hex.charAt(2) + 
      hex.charAt(3) + hex.charAt(3);
  }
  return [
    parseInt(hex.substring(1,3), 16),
    parseInt(hex.substring(3,5), 16),
    parseInt(hex.substring(5,7), 16)
  ];
}

module.exports = hex;

/***/ },
/* 867 */
/***/ function(module, exports, __webpack_require__) {

var extractComponents = __webpack_require__(355);
var clamp = __webpack_require__(237);

function parseHslComponent(component, i) {
  component = parseFloat(component);

  switch(i) {
    case 0:
      return clamp(component, 0, 360);
    case 1:
    case 2:
      return clamp(component, 0, 100);
    case 3:
      return clamp(component, 0, 1);
  }
}

function hsl(color) {
  return extractComponents(color).map(parseHslComponent);
}

module.exports = hsl;

/***/ },
/* 868 */
/***/ function(module, exports, __webpack_require__) {

var hsl = __webpack_require__(867);
var hex = __webpack_require__(866);
var rgb = __webpack_require__(869);
var hsl2rgb = __webpack_require__(864);

function hsl2rgbParse(color) {
  var h = hsl(color);
  var r = hsl2rgb(h);

  // handle alpha since hsl2rgb doesn't know (or care!) about it
  if(h.length === 4) {
    r.push(h[3]);
  }

  return r;
}

var space2parser = {
  "#" : hex,
  "hsl" : hsl2rgbParse,
  "rgb" : rgb
};

function parse(color) {
  for(var scheme in space2parser) {
    if(color.indexOf(scheme) === 0) {
      return space2parser[scheme](color);
    }
  }
}

parse.rgb = rgb;
parse.hsl = hsl;
parse.hex = hex;

module.exports = parse;

/***/ },
/* 869 */
/***/ function(module, exports, __webpack_require__) {

var extractComponents = __webpack_require__(355);
var clamp = __webpack_require__(237);

function parseRgbComponent(component, i) {
  if (i < 3) {
    if (component.indexOf('%') != -1) {
      return Math.round(255 * clamp(parseInt(component, 10), 0, 100)/100);
    } else {
      return clamp(parseInt(component, 10), 0, 255);
    }
  } else {
    return clamp(parseFloat(component), 0, 1);
  } 
}

function rgb(color) {
  return extractComponents(color).map(parseRgbComponent);
}

module.exports = rgb;

/***/ },
/* 870 */,
/* 871 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBase16Theme = exports.createStyling = undefined;

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = __webpack_require__(139);

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = __webpack_require__(279);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(456);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = __webpack_require__(113);

var _keys2 = _interopRequireDefault(_keys);

var _lodash = __webpack_require__(769);

var _lodash2 = _interopRequireDefault(_lodash);

var _base = __webpack_require__(280);

var base16 = _interopRequireWildcard(_base);

var _rgb2hex = __webpack_require__(865);

var _rgb2hex2 = _interopRequireDefault(_rgb2hex);

var _parse = __webpack_require__(868);

var _parse2 = _interopRequireDefault(_parse);

var _lodash3 = __webpack_require__(771);

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rgb = __webpack_require__(281);
var yuv = __webpack_require__(509);

var truthy = function truthy(x) {
  return x;
};
var DEFAULT_BASE16 = base16.default;

var BASE16_KEYS = (0, _keys2.default)(DEFAULT_BASE16);

// we need a correcting factor, so that a dark, but not black background color
// converts to bright enough inversed color
var flip = function flip(x) {
  return x < 0.25 ? 1 : x < 0.5 ? 0.9 - x : 1.1 - x;
};

var invertColor = (0, _lodash4.default)(_parse2.default, rgb.yuv, function (_ref) {
  var _ref2 = (0, _slicedToArray3.default)(_ref, 3);

  var y = _ref2[0];
  var u = _ref2[1];
  var v = _ref2[2];
  return [flip(y), u, v];
}, yuv.rgb, _rgb2hex2.default);

var invertThemeColors = function invertThemeColors(theme) {
  return (0, _keys2.default)(theme).reduce(function (t, key) {
    return (/^base/.test(key) ? (t[key] = invertColor(theme[key]), t) : t
    );
  }, {});
};

var getStylingByKeys = function getStylingByKeys(customStyling, defaultStyling, keys) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  if (keys === null) {
    return defaultStyling;
  }

  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  var styles = keys.reduce(function (s, key) {
    return [].concat((0, _toConsumableArray3.default)(s), [defaultStyling[key], customStyling[key]]);
  }, []).filter(truthy);

  var props = styles.reduce(function (obj, s) {
    if (typeof s === 'string') {
      obj.className = [obj.className, s].filter(function (c) {
        return c;
      }).join(' ');
    } else if ((typeof s === 'undefined' ? 'undefined' : (0, _typeof3.default)(s)) === 'object') {
      obj.style = (0, _extends3.default)({}, obj.style, s);
    } else if (typeof s === 'function') {
      obj = (0, _extends3.default)({}, obj, s.apply(undefined, [obj].concat(args)));
    }

    return obj;
  }, { className: '', style: {} });

  if (!props.className) {
    delete props.className;
  }

  if ((0, _keys2.default)(props.style).length === 0) {
    delete props.style;
  }

  return props;
};

var createStyling = exports.createStyling = (0, _lodash2.default)(function (getStylingFromBase16) {
  for (var _len2 = arguments.length, args = Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
    args[_key2 - 4] = arguments[_key2];
  }

  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var themeOrStyling = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var invertTheme = arguments[3];
  var _options$defaultBase = options.defaultBase16;
  var defaultBase16 = _options$defaultBase === undefined ? DEFAULT_BASE16 : _options$defaultBase;
  var _options$base16Themes = options.base16Themes;
  var base16Themes = _options$base16Themes === undefined ? null : _options$base16Themes;


  var base16Theme = getBase16Theme(themeOrStyling, base16Themes);
  if (base16Theme) {
    themeOrStyling = (0, _extends3.default)({}, base16Theme, themeOrStyling);
  }

  var theme = BASE16_KEYS.reduce(function (t, key) {
    return t[key] = themeOrStyling[key] || defaultBase16[key], t;
  }, {});

  var customStyling = (0, _keys2.default)(themeOrStyling).reduce(function (s, key) {
    return BASE16_KEYS.indexOf(key) === -1 ? (s[key] = themeOrStyling[key], s) : s;
  }, {});

  var defaultStyling = getStylingFromBase16(invertTheme ? invertThemeColors(theme) : theme);

  return (0, _lodash2.default)(getStylingByKeys, 3).apply(undefined, [customStyling, defaultStyling].concat(args));
}, 4);

var getBase16Theme = exports.getBase16Theme = function getBase16Theme(theme, base16Themes) {
  if (theme && theme.extend) {
    theme = theme.extend;
  }

  if (typeof theme === 'string') {
    theme = (base16Themes || {})[theme] || base16[theme];
  }

  return theme && theme.hasOwnProperty('base00') ? theme : undefined;
};

/***/ },
/* 872 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _get = __webpack_require__(454)['default'];

var _inherits = __webpack_require__(138)['default'];

var _createClass = __webpack_require__(452)['default'];

var _classCallCheck = __webpack_require__(451)['default'];

var _extends = __webpack_require__(33)['default'];

var _toConsumableArray = __webpack_require__(457)['default'];

var _Object$keys = __webpack_require__(113)['default'];

var _interopRequireDefault = __webpack_require__(278)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodashDebounce = __webpack_require__(770);

var _lodashDebounce2 = _interopRequireDefault(_lodashDebounce);

var _objectAssign = __webpack_require__(9);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _autoprefix = __webpack_require__(873);

var _autoprefix2 = _interopRequireDefault(_autoprefix);

function autoprefixes(styles) {
  return _Object$keys(styles).reduce(function (obj, key) {
    return (obj[key] = (0, _autoprefix2['default'])(styles[key]), obj);
  }, {});
}

var styles = autoprefixes({
  wrapper: {
    position: 'fixed',
    width: 0,
    height: 0,
    top: 0,
    left: 0
  },

  dim: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
    background: 'rgba(0, 0, 0, 0.2)',
    opacity: 1
  },

  dimAppear: {
    opacity: 0
  },

  dimTransparent: {
    pointerEvents: 'none'
  },

  dimHidden: {
    opacity: 0
  },

  dock: {
    position: 'fixed',
    zIndex: 1,
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
    background: 'white',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },

  dockHidden: {
    opacity: 0
  },

  dockResizing: {
    transition: 'none'
  },

  dockContent: {
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },

  resizer: {
    position: 'absolute',
    zIndex: 2,
    opacity: 0
  }
});

function getTransitions(duration) {
  return ['left', 'top', 'width', 'height'].map(function (p) {
    return p + ' ' + duration / 1000 + 's ease-out';
  });
}

function getDockStyles(_ref, _ref2) {
  var fluid = _ref.fluid;
  var dockStyle = _ref.dockStyle;
  var dockHiddenStyle = _ref.dockHiddenStyle;
  var duration = _ref.duration;
  var position = _ref.position;
  var isVisible = _ref.isVisible;
  var size = _ref2.size;
  var isResizing = _ref2.isResizing;
  var fullWidth = _ref2.fullWidth;
  var fullHeight = _ref2.fullHeight;

  var posStyle = undefined;
  var absSize = fluid ? size * 100 + '%' : size + 'px';

  function getRestSize(fullSize) {
    return fluid ? 100 - size * 100 + '%' : fullSize - size + 'px';
  }

  switch (position) {
    case 'left':
      posStyle = {
        width: absSize,
        left: isVisible ? 0 : '-' + absSize
      };
      break;
    case 'right':
      posStyle = {
        left: isVisible ? getRestSize(fullWidth) : fullWidth,
        width: absSize
      };
      break;
    case 'top':
      posStyle = {
        top: isVisible ? 0 : '-' + absSize,
        height: absSize
      };
      break;
    case 'bottom':
      posStyle = {
        top: isVisible ? getRestSize(fullHeight) : fullHeight,
        height: absSize
      };
      break;
  }

  var transitions = getTransitions(duration);

  return [styles.dock, (0, _autoprefix2['default'])({
    transition: [].concat(_toConsumableArray(transitions), [!isVisible && 'opacity 0.01s linear ' + duration / 1000 + 's']).filter(function (t) {
      return t;
    }).join(',')
  }), dockStyle, (0, _autoprefix2['default'])(posStyle), isResizing && styles.dockResizing, !isVisible && styles.dockHidden, !isVisible && dockHiddenStyle];
}

function getDimStyles(_ref3, _ref4) {
  var dimMode = _ref3.dimMode;
  var dimStyle = _ref3.dimStyle;
  var duration = _ref3.duration;
  var isVisible = _ref3.isVisible;
  var isTransitionStarted = _ref4.isTransitionStarted;

  return [styles.dim, (0, _autoprefix2['default'])({
    transition: 'opacity ' + duration / 1000 + 's ease-out'
  }), dimStyle, dimMode === 'transparent' && styles.dimTransparent, !isVisible && styles.dimHidden, isTransitionStarted && isVisible && styles.dimAppear, isTransitionStarted && !isVisible && styles.dimDisappear];
}

function getResizerStyles(position) {
  var resizerStyle = undefined;
  var size = 10;

  switch (position) {
    case 'left':
      resizerStyle = {
        right: -size / 2,
        width: size,
        top: 0,
        height: '100%',
        cursor: 'col-resize'
      };
      break;
    case 'right':
      resizerStyle = {
        left: -size / 2,
        width: size,
        top: 0,
        height: '100%',
        cursor: 'col-resize'
      };
      break;
    case 'top':
      resizerStyle = {
        bottom: -size / 2,
        height: size,
        left: 0,
        width: '100%',
        cursor: 'row-resize'
      };
      break;
    case 'bottom':
      resizerStyle = {
        top: -size / 2,
        height: size,
        left: 0,
        width: '100%',
        cursor: 'row-resize'
      };
      break;
  }

  return [styles.resizer, (0, _autoprefix2['default'])(resizerStyle)];
}

function getFullSize(position, fullWidth, fullHeight) {
  return position === 'left' || position === 'right' ? fullWidth : fullHeight;
}

var Dock = (function (_Component) {
  _inherits(Dock, _Component);

  function Dock(props) {
    var _this = this;

    _classCallCheck(this, Dock);

    _get(Object.getPrototypeOf(Dock.prototype), 'constructor', this).call(this, props);

    this.transitionEnd = function () {
      _this.setState({ isTransitionStarted: false });
    };

    this.hideDim = function () {
      if (!_this.props.isVisible) {
        _this.setState({ isDimHidden: true });
      }
    };

    this.handleDimClick = function () {
      if (_this.props.dimMode === 'opaque') {
        _this.props.onVisibleChange && _this.props.onVisibleChange(false);
      }
    };

    this.handleResize = function () {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(_this.updateWindowSize.bind(_this, true));
      } else {
        _this.updateWindowSize(true);
      }
    };

    this.updateWindowSize = function (windowResize) {
      var sizeState = {
        fullWidth: window.innerWidth,
        fullHeight: window.innerHeight
      };

      if (windowResize) {
        _this.setState(_extends({}, sizeState, {
          isResizing: true,
          isWindowResizing: windowResize
        }));

        _this.debouncedUpdateWindowSizeEnd();
      } else {
        _this.setState(sizeState);
      }
    };

    this.updateWindowSizeEnd = function () {
      _this.setState({
        isResizing: false,
        isWindowResizing: false
      });
    };

    this.debouncedUpdateWindowSizeEnd = (0, _lodashDebounce2['default'])(this.updateWindowSizeEnd, 30);

    this.handleWrapperLeave = function () {
      _this.setState({ isResizing: false });
    };

    this.handleMouseDown = function () {
      _this.setState({ isResizing: true });
    };

    this.handleMouseUp = function () {
      _this.setState({ isResizing: false });
    };

    this.handleMouseMove = function (e) {
      if (!_this.state.isResizing || _this.state.isWindowResizing) return;
      e.preventDefault();

      var _props = _this.props;
      var position = _props.position;
      var fluid = _props.fluid;
      var _state = _this.state;
      var fullWidth = _state.fullWidth;
      var fullHeight = _state.fullHeight;
      var isControlled = _state.isControlled;
      var x = e.clientX;
      var y = e.clientY;

      var size = undefined;

      switch (position) {
        case 'left':
          size = fluid ? x / fullWidth : x;
          break;
        case 'right':
          size = fluid ? (fullWidth - x) / fullWidth : fullWidth - x;
          break;
        case 'top':
          size = fluid ? y / fullHeight : y;
          break;
        case 'bottom':
          size = fluid ? (fullHeight - y) / fullHeight : fullHeight - y;
          break;
      }

      _this.props.onSizeChange && _this.props.onSizeChange(size);

      if (!isControlled) {
        _this.setState({ size: size });
      }
    };

    this.state = {
      isControlled: typeof props.size !== 'undefined',
      size: props.size || props.defaultSize,
      isDimHidden: !props.isVisible,
      fullWidth: typeof window !== 'undefined' && window.innerWidth,
      fullHeight: typeof window !== 'undefined' && window.innerHeight,
      isTransitionStarted: false,
      isWindowResizing: false
    };
  }

  _createClass(Dock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('mouseup', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('resize', this.handleResize);

      if (!window.fullWidth) {
        this.updateWindowSize();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mouseup', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var isControlled = typeof nextProps.size !== 'undefined';

      this.setState({ isControlled: isControlled });

      if (isControlled && this.props.size !== nextProps.size) {
        this.setState({ size: nextProps.size });
      } else if (this.props.fluid !== nextProps.fluid) {
        this.updateSize(nextProps);
      }

      if (this.props.isVisible !== nextProps.isVisible) {
        this.setState({
          isTransitionStarted: true
        });
      }
    }
  }, {
    key: 'updateSize',
    value: function updateSize(props) {
      var _state2 = this.state;
      var fullWidth = _state2.fullWidth;
      var fullHeight = _state2.fullHeight;

      this.setState({
        size: props.fluid ? this.state.size / getFullSize(props.position, fullWidth, fullHeight) : getFullSize(props.position, fullWidth, fullHeight) * this.state.size
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (this.props.isVisible !== prevProps.isVisible) {
        if (!this.props.isVisible) {
          window.setTimeout(function () {
            return _this2.hideDim();
          }, this.props.duration);
        } else {
          this.setState({ isDimHidden: false });
        }

        window.setTimeout(function () {
          return _this2.setState({ isTransitionStarted: false });
        }, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var zIndex = _props2.zIndex;
      var dimMode = _props2.dimMode;
      var position = _props2.position;
      var isVisible = _props2.isVisible;
      var _state3 = this.state;
      var isResizing = _state3.isResizing;
      var size = _state3.size;
      var isDimHidden = _state3.isDimHidden;

      var dimStyles = _objectAssign2['default'].apply(undefined, [{}].concat(_toConsumableArray(getDimStyles(this.props, this.state))));
      var dockStyles = _objectAssign2['default'].apply(undefined, [{}].concat(_toConsumableArray(getDockStyles(this.props, this.state))));
      var resizerStyles = _objectAssign2['default'].apply(undefined, [{}].concat(_toConsumableArray(getResizerStyles(position))));

      return _react2['default'].createElement(
        'div',
        { style: (0, _objectAssign2['default'])({}, styles.wrapper, { zIndex: zIndex }) },
        dimMode !== 'none' && !isDimHidden && _react2['default'].createElement('div', { style: dimStyles, onClick: this.handleDimClick }),
        _react2['default'].createElement(
          'div',
          { style: dockStyles },
          _react2['default'].createElement('div', { style: resizerStyles,
            onMouseDown: this.handleMouseDown }),
          _react2['default'].createElement(
            'div',
            { style: styles.dockContent },
            typeof children === 'function' ? children({
              position: position,
              isResizing: isResizing,
              size: size,
              isVisible: isVisible
            }) : children
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      position: _react.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
      zIndex: _react.PropTypes.number,
      fluid: _react.PropTypes.bool,
      size: _react.PropTypes.number,
      defaultSize: _react.PropTypes.number,
      dimMode: _react.PropTypes.oneOf(['none', 'transparent', 'opaque']),
      isVisible: _react.PropTypes.bool,
      onVisibleChange: _react.PropTypes.func,
      onSizeChange: _react.PropTypes.func,
      dimStyle: _react.PropTypes.object,
      dockStyle: _react.PropTypes.object,
      duration: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      position: 'left',
      zIndex: 99999999,
      fluid: true,
      defaultSize: 0.3,
      dimMode: 'opaque',
      duration: 200
    },
    enumerable: true
  }]);

  return Dock;
})(_react.Component);

exports['default'] = Dock;
module.exports = exports['default'];

/***/ },
/* 873 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// Same as https://github.com/SimenB/react-vendor-prefixes/blob/master/src/index.js,
// but dumber

'use strict';

var _extends = __webpack_require__(33)['default'];

var _Object$keys = __webpack_require__(113)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = autoprefix;
var vendorSpecificProperties = ['animation', 'animationDelay', 'animationDirection', 'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'appearance', 'backfaceVisibility', 'backgroundClip', 'borderImage', 'borderImageSlice', 'boxSizing', 'boxShadow', 'contentColumns', 'transform', 'transformOrigin', 'transformStyle', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction', 'perspective', 'perspectiveOrigin', 'userSelect'];

var prefixes = ['Moz', 'Webkit', 'ms', 'O'];

function prefixProp(key, value) {
  return prefixes.reduce(function (obj, pre) {
    return (obj[pre + key[0].toUpperCase() + key.substr(1)] = value, obj);
  }, {});
}

function autoprefix(style) {
  return _Object$keys(style).reduce(function (obj, key) {
    return vendorSpecificProperties.indexOf(key) !== -1 ? _extends({}, obj, prefixProp(key, style[key])) : obj;
  }, style);
}

module.exports = exports['default'];

/***/ },
/* 874 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _interopRequireDefault = __webpack_require__(278)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Dock = __webpack_require__(872);

var _Dock2 = _interopRequireDefault(_Dock);

exports['default'] = _Dock2['default'];
module.exports = exports['default'];

/***/ },
/* 875 */,
/* 876 */,
/* 877 */,
/* 878 */,
/* 879 */,
/* 880 */,
/* 881 */,
/* 882 */,
/* 883 */,
/* 884 */,
/* 885 */,
/* 886 */,
/* 887 */,
/* 888 */,
/* 889 */,
/* 890 */,
/* 891 */,
/* 892 */,
/* 893 */,
/* 894 */,
/* 895 */,
/* 896 */,
/* 897 */,
/* 898 */,
/* 899 */,
/* 900 */,
/* 901 */,
/* 902 */,
/* 903 */,
/* 904 */,
/* 905 */,
/* 906 */,
/* 907 */,
/* 908 */,
/* 909 */,
/* 910 */,
/* 911 */,
/* 912 */,
/* 913 */,
/* 914 */,
/* 915 */,
/* 916 */,
/* 917 */,
/* 918 */,
/* 919 */,
/* 920 */,
/* 921 */,
/* 922 */,
/* 923 */,
/* 924 */,
/* 925 */,
/* 926 */,
/* 927 */,
/* 928 */,
/* 929 */,
/* 930 */,
/* 931 */,
/* 932 */,
/* 933 */,
/* 934 */,
/* 935 */,
/* 936 */,
/* 937 */,
/* 938 */,
/* 939 */,
/* 940 */,
/* 941 */,
/* 942 */,
/* 943 */,
/* 944 */,
/* 945 */,
/* 946 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(137);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(182);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(138);

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _function = __webpack_require__(108);

var _function2 = _interopRequireDefault(_function);

var _JSONArrow = __webpack_require__(377);

var _JSONArrow2 = _interopRequireDefault(_JSONArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ItemRange = (_temp = _class = function (_Component) {
  (0, _inherits3['default'])(ItemRange, _Component);

  function ItemRange(props) {
    (0, _classCallCheck3['default'])(this, ItemRange);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _function2['default'];

    _this.state = { expanded: false };

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  ItemRange.prototype.render = function render() {
    var _props = this.props;
    var styling = _props.styling;
    var from = _props.from;
    var to = _props.to;
    var renderChildNodes = _props.renderChildNodes;
    var nodeType = _props.nodeType;


    return this.state.expanded ? _react2['default'].createElement(
      'div',
      styling('itemRange', this.state.expanded),
      renderChildNodes(this.props, from, to)
    ) : _react2['default'].createElement(
      'div',
      (0, _extends3['default'])({}, styling('itemRange', this.state.expanded), {
        onClick: this.handleClick
      }),
      _react2['default'].createElement(_JSONArrow2['default'], {
        nodeType: nodeType,
        styling: styling,
        expanded: false,
        onClick: this.handleClick,
        arrowStyle: 'double'
      }),
      from + ' ... ' + to
    );
  };

  ItemRange.prototype.handleClick = function handleClick() {
    this.setState({ expanded: !this.state.expanded });
  };

  return ItemRange;
}(_react.Component), _class.propTypes = {
  styling: _react.PropTypes.func.isRequired,
  from: _react.PropTypes.number.isRequired,
  to: _react.PropTypes.number.isRequired,
  renderChildNodes: _react.PropTypes.func.isRequired,
  nodeType: _react.PropTypes.string.isRequired
}, _temp);
exports['default'] = ItemRange;

/***/ },
/* 947 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(114);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _JSONNestedNode = __webpack_require__(253);

var _JSONNestedNode2 = _interopRequireDefault(_JSONNestedNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.
function createItemString(data) {
  return data.length + ' ' + (data.length !== 1 ? 'items' : 'item');
}

// Configures <JSONNestedNode> to render an Array
var JSONArrayNode = function JSONArrayNode(_ref) {
  var data = _ref.data;
  var props = (0, _objectWithoutProperties3['default'])(_ref, ['data']);
  return _react2['default'].createElement(_JSONNestedNode2['default'], (0, _extends3['default'])({}, props, {
    data: data,
    nodeType: 'Array',
    nodeTypeIndicator: '[]',
    createItemString: createItemString,
    expandable: data.length > 0
  }));
};

JSONArrayNode.propTypes = {
  data: _react.PropTypes.array
};

exports['default'] = JSONArrayNode;

/***/ },
/* 948 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(114);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getIterator2 = __webpack_require__(181);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _isSafeInteger = __webpack_require__(443);

var _isSafeInteger2 = _interopRequireDefault(_isSafeInteger);

exports['default'] = JSONIterableNode;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _JSONNestedNode = __webpack_require__(253);

var _JSONNestedNode2 = _interopRequireDefault(_JSONNestedNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.
function createItemString(data, limit) {
  var count = 0;
  var hasMore = false;
  if ((0, _isSafeInteger2['default'])(data.size)) {
    count = data.size;
  } else {
    for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3['default'])(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var entry = _ref;
      // eslint-disable-line no-unused-vars
      if (limit && count + 1 > limit) {
        hasMore = true;
        break;
      }
      count += 1;
    }
  }
  return '' + (hasMore ? '>' : '') + count + ' ' + (count !== 1 ? 'entries' : 'entry');
}

// Configures <JSONNestedNode> to render an iterable
function JSONIterableNode(_ref2) {
  var props = (0, _objectWithoutProperties3['default'])(_ref2, []);

  return _react2['default'].createElement(_JSONNestedNode2['default'], (0, _extends3['default'])({}, props, {
    nodeType: 'Iterable',
    nodeTypeIndicator: '()',
    createItemString: createItemString
  }));
}

/***/ },
/* 949 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(114);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getOwnPropertyNames = __webpack_require__(276);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _JSONNestedNode = __webpack_require__(253);

var _JSONNestedNode2 = _interopRequireDefault(_JSONNestedNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.
function createItemString(data) {
  var len = (0, _getOwnPropertyNames2['default'])(data).length;
  return len + ' ' + (len !== 1 ? 'keys' : 'key');
}

// Configures <JSONNestedNode> to render an Object
var JSONObjectNode = function JSONObjectNode(_ref) {
  var data = _ref.data;
  var props = (0, _objectWithoutProperties3['default'])(_ref, ['data']);
  return _react2['default'].createElement(_JSONNestedNode2['default'], (0, _extends3['default'])({}, props, {
    data: data,
    nodeType: 'Object',
    nodeTypeIndicator: '{}',
    createItemString: createItemString,
    expandable: (0, _getOwnPropertyNames2['default'])(data).length > 0
  }));
};

JSONObjectNode.propTypes = {
  data: _react.PropTypes.object
};

exports['default'] = JSONObjectNode;

/***/ },
/* 950 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

var JSONValueNode = function JSONValueNode(_ref) {
  var nodeType = _ref.nodeType;
  var styling = _ref.styling;
  var labelRenderer = _ref.labelRenderer;
  var keyPath = _ref.keyPath;
  var valueRenderer = _ref.valueRenderer;
  var value = _ref.value;
  var valueGetter = _ref.valueGetter;
  return _react2['default'].createElement(
    'li',
    styling('value', nodeType, keyPath),
    _react2['default'].createElement(
      'label',
      styling(['label', 'valueLabel'], nodeType, keyPath),
      labelRenderer(keyPath, nodeType, false, false)
    ),
    _react2['default'].createElement(
      'span',
      styling('valueText', nodeType, keyPath),
      valueRenderer.apply(undefined, [valueGetter(value), value].concat(keyPath))
    )
  );
};

JSONValueNode.propTypes = {
  nodeType: _react.PropTypes.string.isRequired,
  styling: _react.PropTypes.func.isRequired,
  labelRenderer: _react.PropTypes.func.isRequired,
  keyPath: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])).isRequired,
  valueRenderer: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.any,
  valueGetter: _react.PropTypes.func
};

JSONValueNode.defaultProps = {
  valueGetter: function valueGetter(value) {
    return value;
  }
};

exports['default'] = JSONValueNode;

/***/ },
/* 951 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends2 = __webpack_require__(33);

var _extends3 = _interopRequireDefault(_extends2);

var _solarized = __webpack_require__(954);

var _solarized2 = _interopRequireDefault(_solarized);

var _reactBase16Styling = __webpack_require__(871);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var colorMap = function colorMap(theme) {
  return {
    BACKGROUND_COLOR: theme.base00,
    TEXT_COLOR: theme.base07,
    STRING_COLOR: theme.base0B,
    DATE_COLOR: theme.base0B,
    NUMBER_COLOR: theme.base09,
    BOOLEAN_COLOR: theme.base09,
    NULL_COLOR: theme.base08,
    UNDEFINED_COLOR: theme.base08,
    FUNCTION_COLOR: theme.base08,
    SYMBOL_COLOR: theme.base08,
    LABEL_COLOR: theme.base0D,
    ARROW_COLOR: theme.base0D,
    ITEM_STRING_COLOR: theme.base0B,
    ITEM_STRING_EXPANDED_COLOR: theme.base03
  };
};

var valueColorMap = function valueColorMap(colors) {
  return {
    String: colors.STRING_COLOR,
    Date: colors.DATE_COLOR,
    Number: colors.NUMBER_COLOR,
    Boolean: colors.BOOLEAN_COLOR,
    Null: colors.NULL_COLOR,
    Undefined: colors.UNDEFINED_COLOR,
    Function: colors.FUNCTION_COLOR,
    Symbol: colors.SYMBOL_COLOR
  };
};

var getDefaultThemeStyling = function getDefaultThemeStyling(theme) {
  var colors = colorMap(theme);

  return {
    tree: {
      border: 0,
      padding: 0,
      marginTop: '0.5em',
      marginBottom: '0.5em',
      marginLeft: '0.125em',
      marginRight: 0,
      listStyle: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      backgroundColor: colors.BACKGROUND_COLOR
    },

    value: function value(_ref, nodeType, keyPath) {
      var style = _ref.style;
      return {
        style: (0, _extends3['default'])({}, style, {
          paddingTop: '0.25em',
          paddingRight: 0,
          marginLeft: '0.875em',
          WebkitUserSelect: 'text',
          MozUserSelect: 'text',
          wordWrap: 'break-word',
          paddingLeft: keyPath.length > 1 ? '2.125em' : '1.25em',
          textIndent: '-0.5em',
          wordBreak: 'break-all'
        })
      };
    },

    label: {
      display: 'inline-block',
      color: colors.LABEL_COLOR
    },

    valueLabel: {
      margin: '0 0.5em 0 0'
    },

    valueText: function valueText(_ref2, nodeType) {
      var style = _ref2.style;
      return {
        style: (0, _extends3['default'])({}, style, {
          color: valueColorMap(colors)[nodeType]
        })
      };
    },

    itemRange: function itemRange(_ref3, expanded) {
      var style = _ref3.style;
      return {
        style: {
          paddingTop: expanded ? 0 : '0.25em',
          cursor: 'pointer',
          color: colors.LABEL_COLOR
        }
      };
    },

    arrow: function arrow(_ref4, nodeType, expanded) {
      var style = _ref4.style;
      return {
        style: (0, _extends3['default'])({}, style, {
          marginLeft: 0,
          transition: '150ms',
          WebkitTransition: '150ms',
          MozTransition: '150ms',
          WebkitTransform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          MozTransform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          transform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          transformOrigin: '45% 50%',
          WebkitTransformOrigin: '45% 50%',
          MozTransformOrigin: '45% 50%',
          position: 'relative',
          lineHeight: '1.1em',
          fontSize: '0.75em'
        })
      };
    },

    arrowContainer: function arrowContainer(_ref5, arrowStyle) {
      var style = _ref5.style;
      return {
        style: (0, _extends3['default'])({}, style, {
          display: 'inline-block',
          paddingRight: '0.5em',
          paddingLeft: arrowStyle === 'double' ? '1em' : 0,
          cursor: 'pointer'
        })
      };
    },

    arrowSign: {
      color: colors.ARROW_COLOR
    },

    arrowSignInner: {
      position: 'absolute',
      top: 0,
      left: '-0.4em'
    },

    nestedNode: function nestedNode(_ref6, keyPath, nodeType, expanded, expandable) {
      var style = _ref6.style;
      return {
        style: (0, _extends3['default'])({}, style, {
          position: 'relative',
          paddingTop: '0.25em',
          marginLeft: keyPath.length > 1 ? '0.875em' : 0,
          paddingLeft: !expandable ? '1.125em' : 0
        })
      };
    },

    rootNode: {
      padding: 0,
      margin: 0
    },

    nestedNodeLabel: function nestedNodeLabel(_ref7, keyPath, nodeType, expanded, expandable) {
      var style = _ref7.style;
      return {
        style: (0, _extends3['default'])({}, style, {
          margin: 0,
          padding: 0,
          WebkitUserSelect: expandable ? 'inherit' : 'text',
          MozUserSelect: expandable ? 'inherit' : 'text',
          cursor: expandable ? 'pointer' : 'default'
        })
      };
    },

    nestedNodeItemString: function nestedNodeItemString(_ref8, keyPath, nodeType, expanded) {
      var style = _ref8.style;
      return {
        style: (0, _extends3['default'])({}, style, {
          paddingLeft: '0.5em',
          cursor: 'default',
          color: expanded ? colors.ITEM_STRING_EXPANDED_COLOR : colors.ITEM_STRING_COLOR
        })
      };
    },

    nestedNodeItemType: {
      marginLeft: '0.3em',
      marginRight: '0.3em'
    },

    nestedNodeChildren: function nestedNodeChildren(_ref9, nodeType, expanded) {
      var style = _ref9.style;
      return {
        style: (0, _extends3['default'])({}, style, {
          padding: 0,
          margin: 0,
          listStyle: 'none',
          display: expanded ? 'block' : 'none'
        })
      };
    },

    rootNodeChildren: {
      padding: 0,
      margin: 0,
      listStyle: 'none'
    }
  };
};

exports['default'] = (0, _reactBase16Styling.createStyling)(getDefaultThemeStyling, {
  defaultBase16: _solarized2['default']
});

/***/ },
/* 952 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _getIterator2 = __webpack_require__(181);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getOwnPropertyNames = __webpack_require__(276);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _keys = __webpack_require__(113);

var _keys2 = _interopRequireDefault(_keys);

exports['default'] = getCollectionEntries;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getLength(type, collection) {
  if (type === 'Object') {
    return (0, _keys2['default'])(collection).length;
  } else if (type === 'Array') {
    return collection.length;
  }

  return Infinity;
}

function isIterableMap(collection) {
  return typeof collection.set === 'function';
}

function getEntries(type, collection, sortObjectKeys) {
  var from = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
  var to = arguments.length <= 4 || arguments[4] === undefined ? Infinity : arguments[4];

  var res = void 0;

  if (type === 'Object') {
    var keys = (0, _getOwnPropertyNames2['default'])(collection);

    if (typeof sortObjectKeys !== 'undefined') {
      keys.sort(sortObjectKeys);
    }

    keys = keys.slice(from, to + 1);

    res = {
      entries: keys.map(function (key) {
        return { key: key, value: collection[key] };
      })
    };
  } else if (type === 'Array') {
    res = {
      entries: collection.slice(from, to + 1).map(function (val, idx) {
        return { key: idx + from, value: val };
      })
    };
  } else {
    var idx = 0;
    var entries = [];
    var done = true;

    var isMap = isIterableMap(collection);

    for (var _iterator = collection, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3['default'])(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      if (idx > to) {
        done = false;
        break;
      }if (from <= idx) {
        if (isMap && Array.isArray(item)) {
          entries.push({ key: item[0], value: item[1] });
        } else {
          entries.push({ key: idx, value: item });
        }
      }
      idx++;
    }

    res = {
      hasMore: !done,
      entries: entries
    };
  }

  return res;
}

function getRanges(from, to, limit) {
  var ranges = [];
  while (to - from > limit * limit) {
    limit = limit * limit;
  }
  for (var i = from; i <= to; i += limit) {
    ranges.push({ from: i, to: Math.min(to, i + limit - 1) });
  }

  return ranges;
}

function getCollectionEntries(type, collection, sortObjectKeys, limit) {
  var from = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
  var to = arguments.length <= 5 || arguments[5] === undefined ? Infinity : arguments[5];

  var getEntriesBound = getEntries.bind(null, type, collection, sortObjectKeys);

  if (!limit) {
    return getEntriesBound().entries;
  }

  var isSubset = to < Infinity;
  var length = Math.min(to - from, getLength(type, collection));

  if (type !== 'Iterable') {
    if (length <= limit || limit < 7) {
      return getEntriesBound(from, to).entries;
    }
  } else {
    if (length <= limit && !isSubset) {
      return getEntriesBound(from, to).entries;
    }
  }

  var limitedEntries = void 0;
  if (type === 'Iterable') {
    var _getEntriesBound = getEntriesBound(from, from + limit - 1);

    var hasMore = _getEntriesBound.hasMore;
    var entries = _getEntriesBound.entries;


    limitedEntries = hasMore ? [].concat(entries, getRanges(from + limit, from + 2 * limit - 1, limit)) : entries;
  } else {
    limitedEntries = isSubset ? getRanges(from, to, limit) : [].concat(getEntriesBound(0, limit - 5).entries, getRanges(limit - 4, length - 5, limit), getEntriesBound(length - 4, length - 1).entries);
  }

  return limitedEntries;
}

/***/ },
/* 953 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _iterator = __webpack_require__(277);

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof2 = __webpack_require__(139);

var _typeof3 = _interopRequireDefault(_typeof2);

exports['default'] = objType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function objType(obj) {
  if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3['default'])(obj)) === 'object' && !Array.isArray(obj) && typeof obj[_iterator2['default']] === 'function') {
    return 'Iterable';
  }
  return Object.prototype.toString.call(obj).slice(8, -1);
}

/***/ },
/* 954 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'solarized',
  author: 'ethan schoonover (http://ethanschoonover.com/solarized)',
  base00: '#002b36',
  base01: '#073642',
  base02: '#586e75',
  base03: '#657b83',
  base04: '#839496',
  base05: '#93a1a1',
  base06: '#eee8d5',
  base07: '#fdf6e3',
  base08: '#dc322f',
  base09: '#cb4b16',
  base0A: '#b58900',
  base0B: '#859900',
  base0C: '#2aa198',
  base0D: '#268bd2',
  base0E: '#6c71c4',
  base0F: '#d33682'
};

/***/ },
/* 955 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = shallowEqual;

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = exports['default'];

/***/ },
/* 956 */,
/* 957 */,
/* 958 */,
/* 959 */,
/* 960 */,
/* 961 */,
/* 962 */,
/* 963 */,
/* 964 */,
/* 965 */,
/* 966 */,
/* 967 */,
/* 968 */,
/* 969 */,
/* 970 */,
/* 971 */,
/* 972 */,
/* 973 */,
/* 974 */,
/* 975 */,
/* 976 */,
/* 977 */,
/* 978 */,
/* 979 */,
/* 980 */,
/* 981 */,
/* 982 */,
/* 983 */,
/* 984 */,
/* 985 */,
/* 986 */,
/* 987 */,
/* 988 */,
/* 989 */,
/* 990 */,
/* 991 */,
/* 992 */,
/* 993 */,
/* 994 */,
/* 995 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDock = __webpack_require__(874);

var _reactDock2 = _interopRequireDefault(_reactDock);

var _constants = __webpack_require__(399);

var _actions = __webpack_require__(398);

var _reducers = __webpack_require__(997);

var _reducers2 = _interopRequireDefault(_reducers);

var _parseKey = __webpack_require__(863);

var _parseKey2 = _interopRequireDefault(_parseKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DockMonitor = function (_Component) {
  _inherits(DockMonitor, _Component);

  function DockMonitor(props) {
    _classCallCheck(this, DockMonitor);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleSizeChange = _this.handleSizeChange.bind(_this);

    var childrenCount = _react.Children.count(props.children);
    if (childrenCount === 0) {
      console.error('<DockMonitor> requires at least one monitor inside. ' + 'Why don’t you try <LogMonitor>? You can get it at ' + 'https://github.com/gaearon/redux-devtools-log-monitor.');
    } else if (childrenCount > 1 && !props.changeMonitorKey) {
      console.error('You specified multiple monitors inside <DockMonitor> ' + 'but did not provide `changeMonitorKey` prop to change them. ' + 'Try specifying <DockMonitor changeMonitorKey="ctrl-m" /> ' + 'and then press Ctrl-M.');
    }
    return _this;
  }

  DockMonitor.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  DockMonitor.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  DockMonitor.prototype.matchesKey = function matchesKey(key, event) {
    if (!key) {
      return false;
    }

    var charCode = event.keyCode || event.which;
    var char = String.fromCharCode(charCode);
    return key.name.toUpperCase() === char.toUpperCase() && key.alt === event.altKey && key.ctrl === event.ctrlKey && key.meta === event.metaKey && key.shift === event.shiftKey;
  };

  DockMonitor.prototype.handleKeyDown = function handleKeyDown(e) {
    // Ignore regular keys when focused on a field
    // and no modifiers are active.
    if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) {
      return;
    }

    var visibilityKey = (0, _parseKey2.default)(this.props.toggleVisibilityKey);
    var positionKey = (0, _parseKey2.default)(this.props.changePositionKey);

    var monitorKey = void 0;
    if (this.props.changeMonitorKey) {
      monitorKey = (0, _parseKey2.default)(this.props.changeMonitorKey);
    }

    if (this.matchesKey(visibilityKey, e)) {
      e.preventDefault();
      this.props.dispatch((0, _actions.toggleVisibility)());
    } else if (this.matchesKey(positionKey, e)) {
      e.preventDefault();
      this.props.dispatch((0, _actions.changePosition)());
    } else if (this.matchesKey(monitorKey, e)) {
      e.preventDefault();
      this.props.dispatch((0, _actions.changeMonitor)());
    }
  };

  DockMonitor.prototype.handleSizeChange = function handleSizeChange(requestedSize) {
    this.props.dispatch((0, _actions.changeSize)(requestedSize));
  };

  DockMonitor.prototype.renderChild = function renderChild(child, index, otherProps) {
    var monitorState = this.props.monitorState;
    var childMonitorIndex = monitorState.childMonitorIndex;
    var childMonitorStates = monitorState.childMonitorStates;


    if (index !== childMonitorIndex) {
      return null;
    }

    return (0, _react.cloneElement)(child, _extends({
      monitorState: childMonitorStates[index]
    }, otherProps));
  };

  DockMonitor.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var monitorState = _props.monitorState;
    var children = _props.children;
    var fluid = _props.fluid;

    var rest = _objectWithoutProperties(_props, ['monitorState', 'children', 'fluid']);

    var position = monitorState.position;
    var isVisible = monitorState.isVisible;
    var size = monitorState.size;


    return _react2.default.createElement(
      _reactDock2.default,
      { position: position,
        isVisible: isVisible,
        size: size,
        fluid: fluid,
        onSizeChange: this.handleSizeChange,
        dimMode: 'none' },
      _react.Children.map(children, function (child, index) {
        return _this2.renderChild(child, index, rest);
      })
    );
  };

  return DockMonitor;
}(_react.Component);

DockMonitor.update = _reducers2.default;
DockMonitor.propTypes = {
  defaultPosition: _react.PropTypes.oneOf(_constants.POSITIONS).isRequired,
  defaultIsVisible: _react.PropTypes.bool.isRequired,
  defaultSize: _react.PropTypes.number.isRequired,
  toggleVisibilityKey: _react.PropTypes.string.isRequired,
  changePositionKey: _react.PropTypes.string.isRequired,
  changeMonitorKey: _react.PropTypes.string,
  fluid: _react.PropTypes.bool,

  dispatch: _react.PropTypes.func,
  monitorState: _react.PropTypes.shape({
    position: _react.PropTypes.oneOf(_constants.POSITIONS).isRequired,
    size: _react.PropTypes.number.isRequired,
    isVisible: _react.PropTypes.bool.isRequired,
    childMonitorState: _react.PropTypes.any
  })
};
DockMonitor.defaultProps = {
  defaultIsVisible: true,
  defaultPosition: 'right',
  defaultSize: 0.3,
  fluid: true
};
exports.default = DockMonitor;

/***/ },
/* 996 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = undefined;

var _DockMonitor = __webpack_require__(995);

var _DockMonitor2 = _interopRequireDefault(_DockMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DockMonitor2.default;

/***/ },
/* 997 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = reducer;

var _actions = __webpack_require__(398);

var _constants = __webpack_require__(399);

var _react = __webpack_require__(1);

function position(props) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? props.defaultPosition : arguments[1];
  var action = arguments[2];

  return action.type === _actions.CHANGE_POSITION ? _constants.POSITIONS[(_constants.POSITIONS.indexOf(state) + 1) % _constants.POSITIONS.length] : state;
}

function size(props) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? props.defaultSize : arguments[1];
  var action = arguments[2];

  return action.type === _actions.CHANGE_SIZE ? action.size : state;
}

function isVisible(props) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? props.defaultIsVisible : arguments[1];
  var action = arguments[2];

  return action.type === _actions.TOGGLE_VISIBILITY ? !state : state;
}

function childMonitorStates(props) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var action = arguments[2];

  return _react.Children.map(props.children, function (child, index) {
    return child.type.update(child.props, state[index], action);
  });
}

function childMonitorIndex(props) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var action = arguments[2];

  switch (action.type) {
    case _actions.CHANGE_MONITOR:
      return (state + 1) % _react.Children.count(props.children);
    default:
      return state;
  }
}

function reducer(props) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var action = arguments[2];

  if (!state.childMonitorStates) {
    _react.Children.forEach(props.children, function (child, index) {
      if (typeof child.type.update !== 'function') {
        console.error('Child of <DockMonitor> with the index ' + index + ' ' + ('(' + (child.type.displayName || child.type.name || child.type) + ') ') + 'does not appear to be a valid Redux DevTools monitor.');
      }
    });
  }

  return {
    position: position(props, state.position, action),
    isVisible: isVisible(props, state.isVisible, action),
    size: size(props, state.size, action),
    childMonitorIndex: childMonitorIndex(props, state.childMonitorIndex, action),
    childMonitorStates: childMonitorStates(props, state.childMonitorStates, action)
  };
}

/***/ },
/* 998 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */
'use strict';

module.exports = __webpack_require__(999)(global || window || this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ },
/* 999 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ },
/* 1000 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _LogMonitorButton = __webpack_require__(1001);

var _LogMonitorButton2 = _interopRequireDefault(_LogMonitorButton);

var _function = __webpack_require__(108);

var _function2 = _interopRequireDefault(_function);

var _reduxDevtoolsThemes = __webpack_require__(1009);

var themes = _interopRequireWildcard(_reduxDevtoolsThemes);

var _reduxDevtools = __webpack_require__(402);

var _actions = __webpack_require__(401);

var _reducers = __webpack_require__(1007);

var _reducers2 = _interopRequireDefault(_reducers);

var _LogMonitorEntryList = __webpack_require__(1004);

var _LogMonitorEntryList2 = _interopRequireDefault(_LogMonitorEntryList);

var _lodash = __webpack_require__(1008);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reset = _reduxDevtools.ActionCreators.reset;
var rollback = _reduxDevtools.ActionCreators.rollback;
var commit = _reduxDevtools.ActionCreators.commit;
var sweep = _reduxDevtools.ActionCreators.sweep;
var toggleAction = _reduxDevtools.ActionCreators.toggleAction;


var styles = {
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    position: 'relative',
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    minWidth: 300,
    direction: 'ltr'
  },
  buttonBar: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: 'transparent',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  elements: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 38,
    bottom: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
};

var LogMonitor = function (_Component) {
  _inherits(LogMonitor, _Component);

  function LogMonitor(props) {
    _classCallCheck(this, LogMonitor);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _function2.default;
    _this.updateScrollTop = (0, _lodash2.default)(function () {
      var node = _this.refs.container;
      _this.props.dispatch((0, _actions.updateScrollTop)(node ? node.scrollTop : 0));
    }, 500);

    _this.handleToggleAction = _this.handleToggleAction.bind(_this);
    _this.handleReset = _this.handleReset.bind(_this);
    _this.handleRollback = _this.handleRollback.bind(_this);
    _this.handleSweep = _this.handleSweep.bind(_this);
    _this.handleCommit = _this.handleCommit.bind(_this);
    return _this;
  }

  LogMonitor.prototype.scroll = function scroll() {
    var node = this.refs.container;
    if (!node) {
      return;
    }
    if (this.scrollDown) {
      var offsetHeight = node.offsetHeight;
      var scrollHeight = node.scrollHeight;

      node.scrollTop = scrollHeight - offsetHeight;
      this.scrollDown = false;
    }
  };

  LogMonitor.prototype.componentDidMount = function componentDidMount() {
    var node = this.refs.container;
    if (!node || !this.props.monitorState) {
      return;
    }

    if (this.props.preserveScrollTop) {
      node.scrollTop = this.props.monitorState.initialScrollTop;
      node.addEventListener('scroll', this.updateScrollTop);
    } else {
      this.scrollDown = true;
      this.scroll();
    }
  };

  LogMonitor.prototype.componentWillUnmount = function componentWillUnmount() {
    var node = this.refs.container;
    if (node && this.props.preserveScrollTop) {
      node.removeEventListener('scroll', this.updateScrollTop);
    }
  };

  LogMonitor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var node = this.refs.container;
    if (!node) {
      this.scrollDown = true;
    } else if (this.props.stagedActionIds.length < nextProps.stagedActionIds.length) {
      var scrollTop = node.scrollTop;
      var offsetHeight = node.offsetHeight;
      var scrollHeight = node.scrollHeight;


      this.scrollDown = Math.abs(scrollHeight - (scrollTop + offsetHeight)) < 20;
    } else {
      this.scrollDown = false;
    }
  };

  LogMonitor.prototype.componentDidUpdate = function componentDidUpdate() {
    this.scroll();
  };

  LogMonitor.prototype.handleRollback = function handleRollback() {
    this.props.dispatch(rollback());
  };

  LogMonitor.prototype.handleSweep = function handleSweep() {
    this.props.dispatch(sweep());
  };

  LogMonitor.prototype.handleCommit = function handleCommit() {
    this.props.dispatch(commit());
  };

  LogMonitor.prototype.handleToggleAction = function handleToggleAction(id) {
    this.props.dispatch(toggleAction(id));
  };

  LogMonitor.prototype.handleReset = function handleReset() {
    this.props.dispatch(reset());
  };

  LogMonitor.prototype.getTheme = function getTheme() {
    var theme = this.props.theme;

    if (typeof theme !== 'string') {
      return theme;
    }

    if (typeof themes[theme] !== 'undefined') {
      return themes[theme];
    }

    console.warn('DevTools theme ' + theme + ' not found, defaulting to nicinabox');
    return themes.nicinabox;
  };

  LogMonitor.prototype.render = function render() {
    var theme = this.getTheme();
    var _props = this.props;
    var actionsById = _props.actionsById;
    var skippedActionIds = _props.skippedActionIds;
    var stagedActionIds = _props.stagedActionIds;
    var computedStates = _props.computedStates;
    var currentStateIndex = _props.currentStateIndex;
    var select = _props.select;
    var expandActionRoot = _props.expandActionRoot;
    var expandStateRoot = _props.expandStateRoot;
    var markStateDiff = _props.markStateDiff;


    var entryListProps = {
      theme: theme,
      actionsById: actionsById,
      skippedActionIds: skippedActionIds,
      stagedActionIds: stagedActionIds,
      computedStates: computedStates,
      currentStateIndex: currentStateIndex,
      select: select,
      expandActionRoot: expandActionRoot,
      expandStateRoot: expandStateRoot,
      markStateDiff: markStateDiff,
      onActionClick: this.handleToggleAction
    };

    return _react2.default.createElement(
      'div',
      { style: _extends({}, styles.container, { backgroundColor: theme.base00 }) },
      _react2.default.createElement(
        'div',
        { style: _extends({}, styles.buttonBar, { borderColor: theme.base02 }) },
        _react2.default.createElement(
          _LogMonitorButton2.default,
          {
            theme: theme,
            onClick: this.handleReset,
            enabled: true },
          'Reset'
        ),
        _react2.default.createElement(
          _LogMonitorButton2.default,
          {
            theme: theme,
            onClick: this.handleRollback,
            enabled: computedStates.length > 1 },
          'Revert'
        ),
        _react2.default.createElement(
          _LogMonitorButton2.default,
          {
            theme: theme,
            onClick: this.handleSweep,
            enabled: skippedActionIds.length > 0 },
          'Sweep'
        ),
        _react2.default.createElement(
          _LogMonitorButton2.default,
          {
            theme: theme,
            onClick: this.handleCommit,
            enabled: computedStates.length > 1 },
          'Commit'
        )
      ),
      _react2.default.createElement(
        'div',
        { style: styles.elements, ref: 'container' },
        _react2.default.createElement(_LogMonitorEntryList2.default, entryListProps)
      )
    );
  };

  return LogMonitor;
}(_react.Component);

LogMonitor.update = _reducers2.default;
LogMonitor.propTypes = {
  dispatch: _react.PropTypes.func,
  computedStates: _react.PropTypes.array,
  actionsById: _react.PropTypes.object,
  stagedActionIds: _react.PropTypes.array,
  skippedActionIds: _react.PropTypes.array,
  monitorState: _react.PropTypes.shape({
    initialScrollTop: _react.PropTypes.number
  }),

  preserveScrollTop: _react.PropTypes.bool,
  select: _react.PropTypes.func,
  theme: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
  expandActionRoot: _react.PropTypes.bool,
  expandStateRoot: _react.PropTypes.bool,
  markStateDiff: _react.PropTypes.bool
};
LogMonitor.defaultProps = {
  select: function select(state) {
    return state;
  },
  theme: 'nicinabox',
  preserveScrollTop: true,
  expandActionRoot: true,
  expandStateRoot: true,
  markStateDiff: false
};
exports.default = LogMonitor;

/***/ },
/* 1001 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _brighten = __webpack_require__(1005);

var _brighten2 = _interopRequireDefault(_brighten);

var _function = __webpack_require__(108);

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  base: {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: 3,
    padding: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 5,
    marginBottom: 5,
    flexGrow: 1,
    display: 'inline-block',
    fontSize: '0.8em',
    color: 'white',
    textDecoration: 'none'
  }
};

var LogMonitorButton = function (_React$Component) {
  _inherits(LogMonitorButton, _React$Component);

  function LogMonitorButton(props) {
    _classCallCheck(this, LogMonitorButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.shouldComponentUpdate = _function2.default;


    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.onClick = _this.onClick.bind(_this);

    _this.state = {
      hovered: false,
      active: false
    };
    return _this;
  }

  LogMonitorButton.prototype.handleMouseEnter = function handleMouseEnter() {
    this.setState({ hovered: true });
  };

  LogMonitorButton.prototype.handleMouseLeave = function handleMouseLeave() {
    this.setState({ hovered: false });
  };

  LogMonitorButton.prototype.handleMouseDown = function handleMouseDown() {
    this.setState({ active: true });
  };

  LogMonitorButton.prototype.handleMouseUp = function handleMouseUp() {
    this.setState({ active: false });
  };

  LogMonitorButton.prototype.onClick = function onClick() {
    if (!this.props.enabled) {
      return;
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  LogMonitorButton.prototype.render = function render() {
    var style = _extends({}, styles.base, {
      backgroundColor: this.props.theme.base02
    });
    if (this.props.enabled && this.state.hovered) {
      style = _extends({}, style, {
        backgroundColor: (0, _brighten2.default)(this.props.theme.base02, 0.2)
      });
    }
    if (!this.props.enabled) {
      style = _extends({}, style, {
        opacity: 0.2,
        cursor: 'text',
        backgroundColor: 'transparent'
      });
    }
    return _react2.default.createElement(
      'a',
      { onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onClick: this.onClick,
        style: style },
      this.props.children
    );
  };

  return LogMonitorButton;
}(_react2.default.Component);

exports.default = LogMonitorButton;

/***/ },
/* 1002 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactJsonTree = __webpack_require__(379);

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _LogMonitorEntryAction = __webpack_require__(1003);

var _LogMonitorEntryAction2 = _interopRequireDefault(_LogMonitorEntryAction);

var _function = __webpack_require__(108);

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  entry: {
    display: 'block',
    WebkitUserSelect: 'none'
  },

  root: {
    marginLeft: 0
  },

  changedData: {
    backgroundColor: 'rgba(128, 128, 128, 0.3)'
  }
};

var getDeepItem = function getDeepItem(data, path) {
  return path.reduce(function (obj, key) {
    return obj && obj[key];
  }, data);
};
var dataIsEqual = function dataIsEqual(data, previousData, keyPath) {
  var path = [].concat(keyPath).reverse().slice(1);

  return getDeepItem(data, path) === getDeepItem(previousData, path);
};

var LogMonitorEntry = function (_Component) {
  _inherits(LogMonitorEntry, _Component);

  function LogMonitorEntry(props) {
    _classCallCheck(this, LogMonitorEntry);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _function2.default;

    _this.handleActionClick = _this.handleActionClick.bind(_this);
    _this.shouldExpandNode = _this.shouldExpandNode.bind(_this);
    return _this;
  }

  LogMonitorEntry.prototype.printState = function printState(state, error) {
    var _this2 = this;

    var errorText = error;
    if (!errorText) {
      try {
        var _ret = function () {
          var data = _this2.props.select(state);
          var theme = _this2.props.theme;

          if (_this2.props.markStateDiff) {
            (function () {
              var previousData = typeof _this2.props.previousState !== 'undefined' ? _this2.props.select(_this2.props.previousState) : undefined;
              var getValueStyle = function getValueStyle(_ref, nodeType, keyPath) {
                var style = _ref.style;
                return {
                  style: _extends({}, style, dataIsEqual(data, previousData, keyPath) ? {} : styles.changedData)
                };
              };
              var getNestedNodeStyle = function getNestedNodeStyle(_ref2, keyPath) {
                var style = _ref2.style;
                return {
                  style: _extends({}, style, keyPath.length > 1 ? {} : styles.root)
                };
              };
              theme = {
                extend: _this2.props.theme,
                tree: styles.tree,
                value: getValueStyle,
                nestedNode: getNestedNodeStyle
              };
            })();
          }

          return {
            v: _react2.default.createElement(_reactJsonTree2.default, {
              theme: theme,
              data: data,
              invertTheme: false,
              keyPath: ['state'],
              shouldExpandNode: _this2.shouldExpandNode })
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } catch (err) {
        errorText = 'Error selecting state.';
      }
    }

    return _react2.default.createElement(
      'div',
      { style: {
          color: this.props.theme.base08,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 35
        } },
      errorText
    );
  };

  LogMonitorEntry.prototype.handleActionClick = function handleActionClick() {
    var _props = this.props;
    var actionId = _props.actionId;
    var onActionClick = _props.onActionClick;

    if (actionId > 0) {
      onActionClick(actionId);
    }
  };

  LogMonitorEntry.prototype.shouldExpandNode = function shouldExpandNode(keyName, data, level) {
    return this.props.expandStateRoot && level === 0;
  };

  LogMonitorEntry.prototype.render = function render() {
    var _props2 = this.props;
    var actionId = _props2.actionId;
    var error = _props2.error;
    var action = _props2.action;
    var state = _props2.state;
    var collapsed = _props2.collapsed;
    var inFuture = _props2.inFuture;

    var styleEntry = {
      opacity: collapsed || inFuture ? 0.5 : 1,
      cursor: actionId > 0 ? 'pointer' : 'default'
    };

    return _react2.default.createElement(
      'div',
      { style: {
          textDecoration: collapsed ? 'line-through' : 'none',
          color: this.props.theme.base06
        } },
      _react2.default.createElement(_LogMonitorEntryAction2.default, {
        theme: this.props.theme,
        collapsed: collapsed,
        action: action,
        expandActionRoot: this.props.expandActionRoot,
        onClick: this.handleActionClick,
        style: _extends({}, styles.entry, styleEntry) }),
      !collapsed && _react2.default.createElement(
        'div',
        { style: { paddingLeft: 16 } },
        this.printState(state, error)
      )
    );
  };

  return LogMonitorEntry;
}(_react.Component);

LogMonitorEntry.propTypes = {
  state: _react.PropTypes.object.isRequired,
  action: _react.PropTypes.object.isRequired,
  actionId: _react.PropTypes.number.isRequired,
  select: _react.PropTypes.func.isRequired,
  inFuture: _react.PropTypes.bool,
  error: _react.PropTypes.string,
  onActionClick: _react.PropTypes.func.isRequired,
  collapsed: _react.PropTypes.bool,
  expandActionRoot: _react.PropTypes.bool,
  expandStateRoot: _react.PropTypes.bool
};
exports.default = LogMonitorEntry;

/***/ },
/* 1003 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactJsonTree = __webpack_require__(379);

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  actionBar: {
    paddingTop: 8,
    paddingBottom: 7,
    paddingLeft: 16
  },
  payload: {
    margin: 0,
    paddingLeft: 16,
    overflow: 'auto'
  }
};

var LogMonitorAction = function (_Component) {
  _inherits(LogMonitorAction, _Component);

  function LogMonitorAction(props) {
    _classCallCheck(this, LogMonitorAction);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldExpandNode = _this.shouldExpandNode.bind(_this);
    return _this;
  }

  LogMonitorAction.prototype.renderPayload = function renderPayload(payload) {
    return _react2.default.createElement(
      'div',
      { style: _extends({}, styles.payload, {
          backgroundColor: this.props.theme.base00
        }) },
      Object.keys(payload).length > 0 ? _react2.default.createElement(_reactJsonTree2.default, { theme: this.props.theme,
        invertTheme: false,
        keyPath: ['action'],
        data: payload,
        shouldExpandNode: this.shouldExpandNode }) : ''
    );
  };

  LogMonitorAction.prototype.shouldExpandNode = function shouldExpandNode(keyName, data, level) {
    return this.props.expandActionRoot && level === 0;
  };

  LogMonitorAction.prototype.render = function render() {
    var _props$action = this.props.action;
    var type = _props$action.type;

    var payload = _objectWithoutProperties(_props$action, ['type']);

    return _react2.default.createElement(
      'div',
      { style: _extends({
          backgroundColor: this.props.theme.base02,
          color: this.props.theme.base06
        }, this.props.style) },
      _react2.default.createElement(
        'div',
        { style: styles.actionBar,
          onClick: this.props.onClick },
        type !== null && type.toString()
      ),
      !this.props.collapsed ? this.renderPayload(payload) : ''
    );
  };

  return LogMonitorAction;
}(_react.Component);

exports.default = LogMonitorAction;

/***/ },
/* 1004 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _LogMonitorEntry = __webpack_require__(1002);

var _LogMonitorEntry2 = _interopRequireDefault(_LogMonitorEntry);

var _function = __webpack_require__(108);

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogMonitorEntryList = function (_Component) {
  _inherits(LogMonitorEntryList, _Component);

  function LogMonitorEntryList() {
    var _temp, _this, _ret;

    _classCallCheck(this, LogMonitorEntryList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.shouldComponentUpdate = _function2.default, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LogMonitorEntryList.prototype.render = function render() {
    var elements = [];
    var _props = this.props;
    var theme = _props.theme;
    var actionsById = _props.actionsById;
    var computedStates = _props.computedStates;
    var currentStateIndex = _props.currentStateIndex;
    var select = _props.select;
    var skippedActionIds = _props.skippedActionIds;
    var stagedActionIds = _props.stagedActionIds;
    var expandActionRoot = _props.expandActionRoot;
    var expandStateRoot = _props.expandStateRoot;
    var markStateDiff = _props.markStateDiff;
    var onActionClick = _props.onActionClick;


    for (var i = 0; i < stagedActionIds.length; i++) {
      var actionId = stagedActionIds[i];
      var action = actionsById[actionId].action;
      var _computedStates$i = computedStates[i];
      var state = _computedStates$i.state;
      var error = _computedStates$i.error;

      var previousState = void 0;
      if (i > 0) {
        previousState = computedStates[i - 1].state;
      }
      elements.push(_react2.default.createElement(_LogMonitorEntry2.default, { key: actionId,
        theme: theme,
        select: select,
        action: action,
        actionId: actionId,
        state: state,
        previousState: previousState,
        collapsed: skippedActionIds.indexOf(actionId) > -1,
        inFuture: i > currentStateIndex,
        error: error,
        expandActionRoot: expandActionRoot,
        expandStateRoot: expandStateRoot,
        markStateDiff: markStateDiff,
        onActionClick: onActionClick }));
    }

    return _react2.default.createElement(
      'div',
      null,
      elements
    );
  };

  return LogMonitorEntryList;
}(_react.Component);

LogMonitorEntryList.propTypes = {
  actionsById: _react.PropTypes.object,
  computedStates: _react.PropTypes.array,
  stagedActionIds: _react.PropTypes.array,
  skippedActionIds: _react.PropTypes.array,
  currentStateIndex: _react.PropTypes.number,

  select: _react.PropTypes.func.isRequired,
  onActionClick: _react.PropTypes.func.isRequired,
  theme: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
  expandActionRoot: _react.PropTypes.bool,
  expandStateRoot: _react.PropTypes.bool
};
exports.default = LogMonitorEntryList;

/***/ },
/* 1005 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;

exports.default = function (hexColor, lightness) {
  var hex = String(hexColor).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  var lum = lightness || 0;

  var rgb = '#';
  var c = void 0;
  for (var i = 0; i < 3; ++i) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb;
};

/***/ },
/* 1006 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = undefined;

var _LogMonitor = __webpack_require__(1000);

var _LogMonitor2 = _interopRequireDefault(_LogMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LogMonitor2.default;

/***/ },
/* 1007 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = reducer;

var _actions = __webpack_require__(401);

function initialScrollTop(props) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var action = arguments[2];

  if (!props.preserveScrollTop) {
    return 0;
  }

  return action.type === _actions.UPDATE_SCROLL_TOP ? action.scrollTop : state;
}

function reducer(props) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var action = arguments[2];

  return {
    initialScrollTop: initialScrollTop(props, state.initialScrollTop, action)
  };
}

/***/ },
/* 1008 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ },
/* 1009 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _base16 = __webpack_require__(280);

_defaults(exports, _interopExportWildcard(_base16, _defaults));

var _nicinabox = __webpack_require__(1010);

exports.nicinabox = _interopRequire(_nicinabox);

/***/ },
/* 1010 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'nicinabox',
  author: 'nicinabox (http://github.com/nicinabox)',
  base00: '#2A2F3A',
  base01: '#3C444F',
  base02: '#4F5A65',
  base03: '#BEBEBE',
  base04: '#b0b0b0', // based on ocean theme
  base05: '#d0d0d0', // based on ocean theme
  base06: '#FFFFFF',
  base07: '#f5f5f5', // based on ocean theme
  base08: '#fb9fb1', // based on ocean theme
  base09: '#FC6D24',
  base0A: '#ddb26f', // based on ocean theme
  base0B: '#A1C659',
  base0C: '#12cfc0', // based on ocean theme
  base0D: '#6FB3D2',
  base0E: '#D381C3',
  base0F: '#deaf8f' // based on ocean theme
};
module.exports = exports['default'];

/***/ },
/* 1011 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createDevTools;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(64);

var _reduxDevtoolsInstrument = __webpack_require__(400);

var _reduxDevtoolsInstrument2 = _interopRequireDefault(_reduxDevtoolsInstrument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createDevTools(children) {
  var _class, _temp;

  var monitorElement = _react.Children.only(children);
  var monitorProps = monitorElement.props;
  var Monitor = monitorElement.type;
  var ConnectedMonitor = (0, _reactRedux.connect)(function (state) {
    return state;
  })(Monitor);

  return _temp = _class = function (_Component) {
    _inherits(DevTools, _Component);

    function DevTools(props, context) {
      _classCallCheck(this, DevTools);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      if (!props.store && !context.store) {
        console.error('Redux DevTools could not render. You must pass the Redux store ' + 'to <DevTools> either as a "store" prop or by wrapping it in a ' + '<Provider store={store}>.');
        return _possibleConstructorReturn(_this);
      }

      if (context.store) {
        _this.liftedStore = context.store.liftedStore;
      } else {
        _this.liftedStore = props.store.liftedStore;
      }

      if (!_this.liftedStore) {
        console.error('Redux DevTools could not render. Did you forget to include ' + 'DevTools.instrument() in your store enhancer chain before ' + 'using createStore()?');
      }
      return _this;
    }

    DevTools.prototype.render = function render() {
      if (!this.liftedStore) {
        return null;
      }

      return _react2.default.createElement(ConnectedMonitor, _extends({}, monitorProps, {
        store: this.liftedStore }));
    };

    return DevTools;
  }(_react.Component), _class.contextTypes = {
    store: _react.PropTypes.object
  }, _class.propTypes = {
    store: _react.PropTypes.object
  }, _class.instrument = function (options) {
    return (0, _reduxDevtoolsInstrument2.default)(function (state, action) {
      return Monitor.update(monitorProps, state, action);
    }, options);
  }, _temp;
}

/***/ },
/* 1012 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = persistState;

var _mapValues = __webpack_require__(855);

var _mapValues2 = _interopRequireDefault(_mapValues);

var _identity = __webpack_require__(163);

var _identity2 = _interopRequireDefault(_identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function persistState(sessionId) {
  var deserializeState = arguments.length <= 1 || arguments[1] === undefined ? _identity2.default : arguments[1];
  var deserializeAction = arguments.length <= 2 || arguments[2] === undefined ? _identity2.default : arguments[2];

  if (!sessionId) {
    return function (next) {
      return function () {
        return next.apply(undefined, arguments);
      };
    };
  }

  function deserialize(state) {
    return _extends({}, state, {
      actionsById: (0, _mapValues2.default)(state.actionsById, function (liftedAction) {
        return _extends({}, liftedAction, {
          action: deserializeAction(liftedAction.action)
        });
      }),
      committedState: deserializeState(state.committedState),
      computedStates: state.computedStates.map(function (computedState) {
        return _extends({}, computedState, {
          state: deserializeState(computedState.state)
        });
      })
    });
  }

  return function (next) {
    return function (reducer, initialState, enhancer) {
      var key = 'redux-dev-session-' + sessionId;

      var finalInitialState = void 0;
      try {
        var json = localStorage.getItem(key);
        if (json) {
          finalInitialState = deserialize(JSON.parse(json)) || initialState;
          next(reducer, initialState);
        }
      } catch (e) {
        console.warn('Could not read debug session from localStorage:', e);
        try {
          localStorage.removeItem(key);
        } finally {
          finalInitialState = undefined;
        }
      }

      var store = next(reducer, finalInitialState, enhancer);

      return _extends({}, store, {
        dispatch: function dispatch(action) {
          store.dispatch(action);

          try {
            localStorage.setItem(key, JSON.stringify(store.getState()));
          } catch (e) {
            console.warn('Could not write debug session to localStorage:', e);
          }

          return action;
        }
      });
    };
  };
}

/***/ },
/* 1013 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printBuffer = printBuffer;

var _helpers = __webpack_require__(403);

var _diff = __webpack_require__(1015);

var _diff2 = _interopRequireDefault(_diff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * Get log level string based on supplied params
 *
 * @param {string | function | object} level - console[level]
 * @param {object} action - selected action
 * @param {array} payload - selected payload
 * @param {string} type - log entry type
 *
 * @returns {string} level
 */
function getLogLevel(level, action, payload, type) {
  switch (typeof level === 'undefined' ? 'undefined' : _typeof(level)) {
    case 'object':
      return typeof level[type] === 'function' ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
    case 'function':
      return level(action);
    default:
      return level;
  }
}

function defaultTitleFormatter(options) {
  var timestamp = options.timestamp;
  var duration = options.duration;

  return function (action, time, took) {
    var parts = ['action'];
    if (timestamp) {
      parts.push('@ ' + time);
    }
    parts.push(action.type);
    if (duration) {
      parts.push('(in ' + took.toFixed(2) + ' ms)');
    }
    return parts.join(' ');
  };
}

function printBuffer(buffer, options) {
  var logger = options.logger;
  var actionTransformer = options.actionTransformer;
  var _options$titleFormatt = options.titleFormatter;
  var titleFormatter = _options$titleFormatt === undefined ? defaultTitleFormatter(options) : _options$titleFormatt;
  var collapsed = options.collapsed;
  var colors = options.colors;
  var level = options.level;
  var diff = options.diff;

  buffer.forEach(function (logEntry, key) {
    var started = logEntry.started;
    var startedTime = logEntry.startedTime;
    var action = logEntry.action;
    var prevState = logEntry.prevState;
    var error = logEntry.error;
    var took = logEntry.took;
    var nextState = logEntry.nextState;

    var nextEntry = buffer[key + 1];

    if (nextEntry) {
      nextState = nextEntry.prevState;
      took = nextEntry.started - started;
    }

    // Message
    var formattedAction = actionTransformer(action);
    var isCollapsed = typeof collapsed === 'function' ? collapsed(function () {
      return nextState;
    }, action) : collapsed;

    var formattedTime = (0, _helpers.formatTime)(startedTime);
    var titleCSS = colors.title ? 'color: ' + colors.title(formattedAction) + ';' : null;
    var title = titleFormatter(formattedAction, formattedTime, took);

    // Render
    try {
      if (isCollapsed) {
        if (colors.title) logger.groupCollapsed('%c ' + title, titleCSS);else logger.groupCollapsed(title);
      } else {
        if (colors.title) logger.group('%c ' + title, titleCSS);else logger.group(title);
      }
    } catch (e) {
      logger.log(title);
    }

    var prevStateLevel = getLogLevel(level, formattedAction, [prevState], 'prevState');
    var actionLevel = getLogLevel(level, formattedAction, [formattedAction], 'action');
    var errorLevel = getLogLevel(level, formattedAction, [error, prevState], 'error');
    var nextStateLevel = getLogLevel(level, formattedAction, [nextState], 'nextState');

    if (prevStateLevel) {
      if (colors.prevState) logger[prevStateLevel]('%c prev state', 'color: ' + colors.prevState(prevState) + '; font-weight: bold', prevState);else logger[prevStateLevel]('prev state', prevState);
    }

    if (actionLevel) {
      if (colors.action) logger[actionLevel]('%c action', 'color: ' + colors.action(formattedAction) + '; font-weight: bold', formattedAction);else logger[actionLevel]('action', formattedAction);
    }

    if (error && errorLevel) {
      if (colors.error) logger[errorLevel]('%c error', 'color: ' + colors.error(error, prevState) + '; font-weight: bold', error);else logger[errorLevel]('error', error);
    }

    if (nextStateLevel) {
      if (colors.nextState) logger[nextStateLevel]('%c next state', 'color: ' + colors.nextState(nextState) + '; font-weight: bold', nextState);else logger[nextStateLevel]('next state', nextState);
    }

    if (diff) {
      (0, _diff2.default)(prevState, nextState, logger, isCollapsed);
    }

    try {
      logger.groupEnd();
    } catch (e) {
      logger.log('—— log end ——');
    }
  });
}

/***/ },
/* 1014 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  level: "log",
  logger: console,
  logErrors: true,
  collapsed: undefined,
  predicate: undefined,
  duration: false,
  timestamp: true,
  stateTransformer: function stateTransformer(state) {
    return state;
  },
  actionTransformer: function actionTransformer(action) {
    return action;
  },
  errorTransformer: function errorTransformer(error) {
    return error;
  },
  colors: {
    title: function title() {
      return "inherit";
    },
    prevState: function prevState() {
      return "#9E9E9E";
    },
    action: function action() {
      return "#03A9F4";
    },
    nextState: function nextState() {
      return "#4CAF50";
    },
    error: function error() {
      return "#F20404";
    }
  },
  diff: false,
  diffPredicate: undefined,

  // Deprecated options
  transformer: undefined
};
module.exports = exports['default'];

/***/ },
/* 1015 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diffLogger;

var _deepDiff = __webpack_require__(746);

var _deepDiff2 = _interopRequireDefault(_deepDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/flitbit/diff#differences
var dictionary = {
  'E': {
    color: '#2196F3',
    text: 'CHANGED:'
  },
  'N': {
    color: '#4CAF50',
    text: 'ADDED:'
  },
  'D': {
    color: '#F44336',
    text: 'DELETED:'
  },
  'A': {
    color: '#2196F3',
    text: 'ARRAY:'
  }
};

function style(kind) {
  return 'color: ' + dictionary[kind].color + '; font-weight: bold';
}

function render(diff) {
  var kind = diff.kind;
  var path = diff.path;
  var lhs = diff.lhs;
  var rhs = diff.rhs;
  var index = diff.index;
  var item = diff.item;

  switch (kind) {
    case 'E':
      return path.join('.') + ' ' + lhs + ' → ' + rhs;
    case 'N':
      return path.join('.') + ' ' + rhs;
    case 'D':
      return '' + path.join('.');
    case 'A':
      return [path.join('.') + '[' + index + ']', item];
    default:
      return null;
  }
}

function diffLogger(prevState, newState, logger, isCollapsed) {
  var diff = (0, _deepDiff2.default)(prevState, newState);

  try {
    if (isCollapsed) {
      logger.groupCollapsed('diff');
    } else {
      logger.group('diff');
    }
  } catch (e) {
    logger.log('diff');
  }

  if (diff) {
    diff.forEach(function (elem) {
      var kind = elem.kind;

      var output = render(elem);

      logger.log('%c ' + dictionary[kind].text, style(kind), output);
    });
  } else {
    logger.log('—— no diff ——');
  }

  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— diff end —— ');
  }
}
module.exports = exports['default'];

/***/ },
/* 1016 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(1013);

var _helpers = __webpack_require__(403);

var _defaults = __webpack_require__(1014);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates logger with following options
 *
 * @namespace
 * @param {object} options - options for logger
 * @param {string | function | object} options.level - console[level]
 * @param {boolean} options.duration - print duration of each action?
 * @param {boolean} options.timestamp - print timestamp with each action?
 * @param {object} options.colors - custom colors
 * @param {object} options.logger - implementation of the `console` API
 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
 * @param {boolean} options.collapsed - is group collapsed?
 * @param {boolean} options.predicate - condition which resolves logger behavior
 * @param {function} options.stateTransformer - transform state before print
 * @param {function} options.actionTransformer - transform action before print
 * @param {function} options.errorTransformer - transform error before print
 *
 * @returns {function} logger middleware
 */
function createLogger() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var loggerOptions = _extends({}, _defaults2.default, options);

  var logger = loggerOptions.logger;
  var transformer = loggerOptions.transformer;
  var stateTransformer = loggerOptions.stateTransformer;
  var errorTransformer = loggerOptions.errorTransformer;
  var predicate = loggerOptions.predicate;
  var logErrors = loggerOptions.logErrors;
  var diffPredicate = loggerOptions.diffPredicate;

  // Return if 'console' object is not defined

  if (typeof logger === 'undefined') {
    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }

  if (transformer) {
    console.error('Option \'transformer\' is deprecated, use \'stateTransformer\' instead!'); // eslint-disable-line no-console
  }

  var logBuffer = [];

  return function (_ref) {
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        // Exit early if predicate function returns 'false'
        if (typeof predicate === 'function' && !predicate(getState, action)) {
          return next(action);
        }

        var logEntry = {};
        logBuffer.push(logEntry);

        logEntry.started = _helpers.timer.now();
        logEntry.startedTime = new Date();
        logEntry.prevState = stateTransformer(getState());
        logEntry.action = action;

        var returnedValue = undefined;
        if (logErrors) {
          try {
            returnedValue = next(action);
          } catch (e) {
            logEntry.error = errorTransformer(e);
          }
        } else {
          returnedValue = next(action);
        }

        logEntry.took = _helpers.timer.now() - logEntry.started;
        logEntry.nextState = stateTransformer(getState());

        var diff = loggerOptions.diff && typeof diffPredicate === 'function' ? diffPredicate(getState, action) : loggerOptions.diff;

        (0, _core.printBuffer)(logBuffer, _extends({}, loggerOptions, { diff: diff }));
        logBuffer.length = 0;

        if (logEntry.error) throw logEntry.error;
        return returnedValue;
      };
    };
  };
}

exports.default = createLogger;
module.exports = exports['default'];

/***/ },
/* 1017 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;

/***/ },
/* 1018 */,
/* 1019 */,
/* 1020 */,
/* 1021 */,
/* 1022 */,
/* 1023 */,
/* 1024 */,
/* 1025 */,
/* 1026 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(743);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(174)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?localIdentName=[path][name]--[local]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/index.js!./style.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?localIdentName=[path][name]--[local]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/index.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 1027 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(744);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(174)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../node_modules/css-loader/index.js?localIdentName=[path][name]--[local]!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/sass-loader/index.js!./main.scss", function() {
			var newContent = require("!!./../../../node_modules/css-loader/index.js?localIdentName=[path][name]--[local]!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/sass-loader/index.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 1028 */,
/* 1029 */,
/* 1030 */,
/* 1031 */,
/* 1032 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = FormGroup;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

function FormGroup(props) {
  var className = {
    'form-group': true,
    'has-error': props.hasError
  };
  if (props.className) {
    className[props.className] = true;
  }
  return _react2['default'].createElement(
    'div',
    { className: _classnames2['default'](className) },
    props.children
  );
}

module.exports = exports['default'];

/***/ },
/* 1033 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _tcomb = __webpack_require__(93);

var _tcomb2 = _interopRequireDefault(_tcomb);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

var _Breakpoints = __webpack_require__(128);

var _Breakpoints2 = _interopRequireDefault(_Breakpoints);

var _getError = __webpack_require__(129);

var _getError2 = _interopRequireDefault(_getError);

var _getHelp = __webpack_require__(130);

var _getHelp2 = _interopRequireDefault(_getHelp);

var _renderFormGroup = __webpack_require__(131);

var _renderFormGroup2 = _interopRequireDefault(_renderFormGroup);

var CheckboxConfig = _tcomb2['default'].struct({
  horizontal: _tcomb2['default'].maybe(_Breakpoints2['default'])
}, 'CheckboxConfig');

function create() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  function checkbox(locals) {
    locals.config = checkbox.getConfig(locals);

    var children = locals.config.horizontal ? checkbox.renderHorizontal(locals) : checkbox.renderVertical(locals);

    return checkbox.renderFormGroup(children, locals);
  }

  checkbox.getConfig = overrides.getConfig || function getConfig(locals) {
    return new CheckboxConfig(locals.config || {});
  };

  checkbox.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    var attrs = _tcomb2['default'].mixin({}, locals.attrs);
    attrs.type = 'checkbox';
    attrs.disabled = locals.disabled;
    attrs.checked = locals.value;
    attrs.onChange = function (evt) {
      return locals.onChange(evt.target.checked);
    };
    if (locals.help) {
      attrs['aria-describedby'] = attrs['aria-describedby'] || attrs.id + '-tip';
    }
    return attrs;
  };

  checkbox.renderCheckbox = overrides.renderCheckbox || function renderCheckbox(locals) {
    var attrs = checkbox.getAttrs(locals);
    var className = {
      checkbox: true,
      disabled: attrs.disabled
    };
    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className) },
      _react2['default'].createElement(
        'label',
        { htmlFor: attrs.id },
        _react2['default'].createElement('input', attrs),
        ' ',
        locals.label
      )
    );
  };

  checkbox.renderError = overrides.renderError || function renderError(locals) {
    return _getError2['default'](locals);
  };

  checkbox.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return _getHelp2['default'](locals);
  };

  checkbox.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [checkbox.renderCheckbox(locals), checkbox.renderError(locals), checkbox.renderHelp(locals)];
  };

  checkbox.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var className = locals.config.horizontal.getOffsetClassName();
    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className) },
      checkbox.renderCheckbox(locals),
      checkbox.renderError(locals),
      checkbox.renderHelp(locals)
    );
  };

  checkbox.renderFormGroup = overrides.renderFormGroup || _renderFormGroup2['default'];

  checkbox.clone = function clone() {
    var newOverrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return create(_extends({}, overrides, newOverrides));
  };

  return checkbox;
}

exports['default'] = create();
module.exports = exports['default'];

/***/ },
/* 1034 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _tcomb = __webpack_require__(93);

var _tcomb2 = _interopRequireDefault(_tcomb);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

var _Breakpoints = __webpack_require__(128);

var _Breakpoints2 = _interopRequireDefault(_Breakpoints);

var _getLabel = __webpack_require__(175);

var _getLabel2 = _interopRequireDefault(_getLabel);

var _getError = __webpack_require__(129);

var _getError2 = _interopRequireDefault(_getError);

var _getHelp = __webpack_require__(130);

var _getHelp2 = _interopRequireDefault(_getHelp);

var _renderFormGroup = __webpack_require__(131);

var _renderFormGroup2 = _interopRequireDefault(_renderFormGroup);

var DateConfig = _tcomb2['default'].struct({
  horizontal: _tcomb2['default'].maybe(_Breakpoints2['default'])
}, 'DateConfig');

function range(n) {
  var result = [];
  for (var i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
}

function padLeft(x, len) {
  var str = String(x);
  var times = len - str.length;
  for (var i = 0; i < times; i++) {
    str = '0' + str;
  }
  return str;
}

function toOption(value, text) {
  return _react2['default'].createElement(
    'option',
    { key: value, value: value + '' },
    text
  );
}

var nullOption = [toOption('', '-')];

var days = nullOption.concat(range(31).map(function (i) {
  return toOption(i, padLeft(i, 2));
}));

var months = nullOption.concat(range(12).map(function (i) {
  return toOption(i - 1, padLeft(i, 2));
}));

function create() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  function date(locals) {
    locals.config = date.getConfig(locals);
    locals.attrs = date.getAttrs(locals);

    var children = locals.config.horizontal ? date.renderHorizontal(locals) : date.renderVertical(locals);

    return date.renderFormGroup(children, locals);
  }

  date.getConfig = overrides.getConfig || function getConfig(locals) {
    return new DateConfig(locals.config || {});
  };

  date.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    return _tcomb2['default'].mixin({}, locals.attrs);
  };

  date.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return _getLabel2['default']({
      label: locals.label,
      breakpoints: locals.config.horizontal
    });
  };

  date.renderError = overrides.renderError || function renderError(locals) {
    return _getError2['default'](locals);
  };

  date.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return _getHelp2['default'](locals);
  };

  date.renderDate = overrides.renderDate || function renderDate(locals) {
    var value = locals.value.map(function (x) {
      return x || '';
    });

    function onDayChange(evt) {
      value[2] = evt.target.value === '-' ? null : evt.target.value;
      locals.onChange(value);
    }

    function onMonthChange(evt) {
      value[1] = evt.target.value === '-' ? null : evt.target.value;
      locals.onChange(value);
    }

    function onYearChange(evt) {
      value[0] = evt.target.value.trim() === '' ? null : evt.target.value.trim();
      locals.onChange(value);
    }

    var parts = {
      D: _react2['default'].createElement(
        'li',
        { key: 'D' },
        _react2['default'].createElement(
          'select',
          { disabled: locals.disabled, className: 'form-control', value: value[2], onChange: onDayChange },
          days
        )
      ),
      M: _react2['default'].createElement(
        'li',
        { key: 'M' },
        _react2['default'].createElement(
          'select',
          { disabled: locals.disabled, className: 'form-control', value: value[1], onChange: onMonthChange },
          months
        )
      ),
      YY: _react2['default'].createElement(
        'li',
        { key: 'YY' },
        _react2['default'].createElement('input', { type: 'text', size: '5', disabled: locals.disabled, className: 'form-control', value: value[0], onChange: onYearChange })
      )
    };

    return _react2['default'].createElement(
      'ul',
      { className: 'nav nav-pills' },
      locals.order.map(function (id) {
        return parts[id];
      })
    );
  };

  date.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [date.renderLabel(locals), date.renderDate(locals), date.renderError(locals), date.renderHelp(locals)];
  };

  date.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = date.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className) },
      date.renderDate(locals),
      date.renderError(locals),
      date.renderHelp(locals)
    )];
  };

  date.renderFormGroup = overrides.renderFormGroup || _renderFormGroup2['default'];

  date.clone = function clone() {
    var newOverrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return create(_extends({}, overrides, newOverrides));
  };

  return date;
}

exports['default'] = create();
module.exports = exports['default'];

/***/ },
/* 1035 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _checkbox = __webpack_require__(1033);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _date = __webpack_require__(1034);

var _date2 = _interopRequireDefault(_date);

var _list = __webpack_require__(1036);

var _list2 = _interopRequireDefault(_list);

var _radio = __webpack_require__(1037);

var _radio2 = _interopRequireDefault(_radio);

var _select = __webpack_require__(1038);

var _select2 = _interopRequireDefault(_select);

var _struct = __webpack_require__(1039);

var _struct2 = _interopRequireDefault(_struct);

var _textbox = __webpack_require__(1040);

var _textbox2 = _interopRequireDefault(_textbox);

exports['default'] = {
  checkbox: _checkbox2['default'],
  date: _date2['default'],
  list: _list2['default'],
  radio: _radio2['default'],
  select: _select2['default'],
  struct: _struct2['default'],
  textbox: _textbox2['default']
};
module.exports = exports['default'];

/***/ },
/* 1036 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

var _getAlert = __webpack_require__(407);

var _getAlert2 = _interopRequireDefault(_getAlert);

var _renderFieldset = __webpack_require__(408);

var _renderFieldset2 = _interopRequireDefault(_renderFieldset);

function getBreakpoints(breakpoints) {
  var className = {};
  for (var size in breakpoints) {
    if (breakpoints.hasOwnProperty(size)) {
      className['col-' + size + '-' + breakpoints[size]] = true;
    }
  }
  return className;
}

function getCol(breakpoints, content) {
  var className = _classnames2['default'](getBreakpoints(breakpoints));
  return _react2['default'].createElement(
    'div',
    { className: className },
    content
  );
}

function create() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  function list(locals) {
    var children = [];

    if (locals.help) {
      children.push(list.renderHelp(locals));
    }

    if (locals.error && locals.hasError) {
      children.push(list.renderError(locals));
    }

    children = children.concat(locals.items.map(function (item) {
      return item.buttons.length === 0 ? list.renderRowWithoutButtons(item, locals) : list.renderRow(item, locals);
    }));

    if (locals.add) {
      children.push(list.renderAddButton(locals));
    }

    return list.renderFieldset(children, locals);
  }

  list.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return _getAlert2['default']('info', locals.help);
  };

  list.renderError = overrides.renderError || function renderError(locals) {
    return _getAlert2['default']('danger', locals.error);
  };

  list.renderRowWithoutButtons = overrides.renderRowWithoutButtons || function renderRowWithoutButtons(item /* , locals*/) {
    return _react2['default'].createElement(
      'div',
      { className: 'row', key: item.key },
      getCol({ xs: 12 }, item.input)
    );
  };

  list.renderRowButton = overrides.renderRowButton || function renderRowButton(button) {
    return _react2['default'].createElement(
      'button',
      { key: button.type, type: 'button', className: 'btn btn-default btn-' + button.type, onClick: button.click },
      button.label
    );
  };

  list.renderButtonGroup = overrides.renderButtonGroup || function renderButtonGroup(buttons /* , locals*/) {
    return _react2['default'].createElement(
      'div',
      { className: 'btn-group' },
      buttons.map(list.renderRowButton)
    );
  };

  list.renderRow = overrides.renderRow || function renderRow(row, locals) {
    return _react2['default'].createElement(
      'div',
      { className: 'row' },
      getCol({ sm: 8, xs: 6 }, row.input),
      getCol({ sm: 4, xs: 6 }, list.renderButtonGroup(row.buttons, locals))
    );
  };

  list.renderAddButton = overrides.renderAddButton || function renderAddButton(locals) {
    var button = locals.add;
    return _react2['default'].createElement(
      'div',
      { className: 'row' },
      _react2['default'].createElement(
        'div',
        { className: 'col-lg-12' },
        _react2['default'].createElement(
          'div',
          { style: { marginBottom: '15px' } },
          _react2['default'].createElement(
            'button',
            { type: 'button', className: 'btn btn-default btn-' + button.type, onClick: button.click },
            button.label
          )
        )
      )
    );
  };

  list.renderFieldset = overrides.renderFieldset || _renderFieldset2['default'];

  list.clone = function clone() {
    var newOverrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return create(_extends({}, overrides, newOverrides));
  };

  return list;
}

exports['default'] = create();
module.exports = exports['default'];

/***/ },
/* 1037 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _tcomb = __webpack_require__(93);

var _tcomb2 = _interopRequireDefault(_tcomb);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

var _Breakpoints = __webpack_require__(128);

var _Breakpoints2 = _interopRequireDefault(_Breakpoints);

var _getLabel = __webpack_require__(175);

var _getLabel2 = _interopRequireDefault(_getLabel);

var _getError = __webpack_require__(129);

var _getError2 = _interopRequireDefault(_getError);

var _getHelp = __webpack_require__(130);

var _getHelp2 = _interopRequireDefault(_getHelp);

var _renderFormGroup = __webpack_require__(131);

var _renderFormGroup2 = _interopRequireDefault(_renderFormGroup);

var RadioConfig = _tcomb2['default'].struct({
  horizontal: _tcomb2['default'].maybe(_Breakpoints2['default'])
}, 'RadioConfig');

function getRadio(attrs, text, key) {
  var className = _classnames2['default']({
    radio: true,
    disabled: attrs.disabled
  });
  return _react2['default'].createElement(
    'div',
    { key: key, className: className },
    _react2['default'].createElement(
      'label',
      { htmlFor: attrs.id },
      _react2['default'].createElement('input', attrs),
      ' ',
      text
    )
  );
}

function create() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  function radio(locals) {
    locals.config = radio.getConfig(locals);

    var children = locals.config.horizontal ? radio.renderHorizontal(locals) : radio.renderVertical(locals);

    return radio.renderFormGroup(children, locals);
  }

  radio.getConfig = overrides.getConfig || function getConfig(locals) {
    return new RadioConfig(locals.config || {});
  };

  radio.renderRadios = overrides.renderRadios || function renderRadios(locals) {
    var id = locals.attrs.id;
    var onChange = function onChange(evt) {
      return locals.onChange(evt.target.value);
    };
    return locals.options.map(function (option, i) {
      var attrs = _tcomb2['default'].mixin({}, locals.attrs);
      attrs.type = 'radio';
      attrs.checked = option.value === locals.value;
      attrs.disabled = locals.disabled;
      attrs.value = option.value;
      attrs.autoFocus = attrs.autoFocus && i === 0;
      attrs.id = id + '_' + i;
      attrs['aria-describedby'] = attrs['aria-describedby'] || (locals.label ? id : null);
      attrs.onChange = onChange;
      return getRadio(attrs, option.text, option.value);
    });
  };

  radio.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return _getLabel2['default']({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    });
  };

  radio.renderError = overrides.renderError || function renderError(locals) {
    return _getError2['default'](locals);
  };

  radio.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return _getHelp2['default'](locals);
  };

  radio.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [radio.renderLabel(locals), radio.renderRadios(locals), radio.renderError(locals), radio.renderHelp(locals)];
  };

  radio.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = radio.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className) },
      radio.renderRadios(locals),
      radio.renderError(locals),
      radio.renderHelp(locals)
    )];
  };

  radio.renderFormGroup = overrides.renderFormGroup || _renderFormGroup2['default'];

  radio.clone = function clone() {
    var newOverrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return create(_extends({}, overrides, newOverrides));
  };

  return radio;
}

exports['default'] = create();
module.exports = exports['default'];

/***/ },
/* 1038 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _tcomb = __webpack_require__(93);

var _tcomb2 = _interopRequireDefault(_tcomb);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

var _Breakpoints = __webpack_require__(128);

var _Breakpoints2 = _interopRequireDefault(_Breakpoints);

var _getLabel = __webpack_require__(175);

var _getLabel2 = _interopRequireDefault(_getLabel);

var _getError = __webpack_require__(129);

var _getError2 = _interopRequireDefault(_getError);

var _getHelp = __webpack_require__(130);

var _getHelp2 = _interopRequireDefault(_getHelp);

var _renderFormGroup = __webpack_require__(131);

var _renderFormGroup2 = _interopRequireDefault(_renderFormGroup);

var SelectConfig = _tcomb2['default'].struct({
  horizontal: _tcomb2['default'].maybe(_Breakpoints2['default'])
}, 'SelectConfig');

function getOption(props) {
  return _react2['default'].createElement(
    'option',
    { disabled: props.disabled, value: props.value, key: props.value },
    props.text
  );
}

function getOptGroup(props) {
  var options = props.options.map(getOption);
  return _react2['default'].createElement(
    'optgroup',
    { disabled: props.disabled, label: props.label, key: props.label },
    options
  );
}

function create() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  function select(locals) {
    locals.config = select.getConfig(locals);
    locals.attrs = select.getAttrs(locals);

    var children = locals.config.horizontal ? select.renderHorizontal(locals) : select.renderVertical(locals);

    return select.renderFormGroup(children, locals);
  }

  select.getConfig = overrides.getConfig || function getConfig(locals) {
    return new SelectConfig(locals.config || {});
  };

  select.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    var attrs = _tcomb2['default'].mixin({}, locals.attrs);
    attrs.className = _classnames2['default'](attrs.className);
    attrs.className += (attrs.className ? ' ' : '') + 'form-control';
    attrs.multiple = locals.isMultiple;
    attrs.disabled = locals.disabled;
    attrs.value = locals.value;
    attrs.onChange = function (evt) {
      var value = locals.isMultiple ? Array.prototype.slice.call(evt.target.options).filter(function (option) {
        return option.selected;
      }).map(function (option) {
        return option.value;
      }) : evt.target.value;
      locals.onChange(value);
    };
    if (locals.help) {
      attrs['aria-describedby'] = attrs['aria-describedby'] || attrs.id + '-tip';
    }
    return attrs;
  };

  select.renderOptions = overrides.renderOptions || function renderOptions(locals) {
    return locals.options.map(function (x) {
      return x.label ? getOptGroup(x) : getOption(x);
    });
  };

  select.renderSelect = overrides.renderSelect || function renderSelect(locals) {
    return _react2['default'].createElement(
      'select',
      locals.attrs,
      select.renderOptions(locals)
    );
  };

  select.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return _getLabel2['default']({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    });
  };

  select.renderError = overrides.renderError || function renderError(locals) {
    return _getError2['default'](locals);
  };

  select.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return _getHelp2['default'](locals);
  };

  select.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [select.renderLabel(locals), select.renderSelect(locals), select.renderError(locals), select.renderHelp(locals)];
  };

  select.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = select.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className) },
      select.renderSelect(locals),
      select.renderError(locals),
      select.renderHelp(locals)
    )];
  };

  select.renderFormGroup = overrides.renderFormGroup || _renderFormGroup2['default'];

  select.clone = function clone() {
    var newOverrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return create(_extends({}, overrides, newOverrides));
  };

  return select;
}

exports['default'] = create();
module.exports = exports['default'];

/***/ },
/* 1039 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getAlert = __webpack_require__(407);

var _getAlert2 = _interopRequireDefault(_getAlert);

var _renderFieldset = __webpack_require__(408);

var _renderFieldset2 = _interopRequireDefault(_renderFieldset);

function create() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  function struct(locals) {
    var children = [];

    if (locals.help) {
      children.push(struct.renderHelp(locals));
    }

    if (locals.error && locals.hasError) {
      children.push(struct.renderError(locals));
    }

    children = children.concat(locals.order.map(function (name) {
      return locals.inputs[name];
    }));

    return struct.renderFieldset(children, locals);
  }

  struct.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return _getAlert2['default']('info', locals.help);
  };

  struct.renderError = overrides.renderError || function renderError(locals) {
    return _getAlert2['default']('danger', locals.error);
  };

  struct.renderFieldset = overrides.renderFieldset || _renderFieldset2['default'];

  struct.clone = function clone() {
    var newOverrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return create(_extends({}, overrides, newOverrides));
  };

  return struct;
}

exports['default'] = create();
module.exports = exports['default'];

/***/ },
/* 1040 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _tcomb = __webpack_require__(93);

var _tcomb2 = _interopRequireDefault(_tcomb);

var _classnames = __webpack_require__(32);

var _classnames2 = _interopRequireDefault(_classnames);

var _Breakpoints = __webpack_require__(128);

var _Breakpoints2 = _interopRequireDefault(_Breakpoints);

var _getLabel = __webpack_require__(175);

var _getLabel2 = _interopRequireDefault(_getLabel);

var _getError = __webpack_require__(129);

var _getError2 = _interopRequireDefault(_getError);

var _getHelp = __webpack_require__(130);

var _getHelp2 = _interopRequireDefault(_getHelp);

var _renderFormGroup = __webpack_require__(131);

var _renderFormGroup2 = _interopRequireDefault(_renderFormGroup);

var TextboxConfig = _tcomb2['default'].struct({
  addonBefore: _tcomb2['default'].Any,
  addonAfter: _tcomb2['default'].Any,
  horizontal: _tcomb2['default'].maybe(_Breakpoints2['default']),
  buttonBefore: _tcomb2['default'].Any,
  buttonAfter: _tcomb2['default'].Any
}, 'TextboxConfig');

function getInputGroupButton(button) {
  return _react2['default'].createElement(
    'div',
    { className: 'input-group-btn' },
    button
  );
}

function getInputGroup(children) {
  return _react2['default'].createElement.apply(null, ['div', { className: 'input-group' }].concat(children));
}

function getAddon(addon) {
  return _react2['default'].createElement(
    'span',
    { className: 'input-group-addon' },
    addon
  );
}

function create() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  function textbox(locals) {
    locals.config = textbox.getConfig(locals);
    locals.attrs = textbox.getAttrs(locals);

    if (locals.type === 'hidden') {
      return textbox.renderHiddenTextbox(locals);
    }

    var children = locals.config.horizontal ? textbox.renderHorizontal(locals) : textbox.renderVertical(locals);

    return textbox.renderFormGroup(children, locals);
  }

  textbox.getConfig = overrides.getConfig || function getConfig(locals) {
    return new TextboxConfig(locals.config || {});
  };

  textbox.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    var attrs = _tcomb2['default'].mixin({}, locals.attrs);
    attrs.type = locals.type;
    attrs.className = _classnames2['default'](attrs.className);
    attrs.className += (attrs.className ? ' ' : '') + 'form-control';
    attrs.disabled = locals.disabled;
    if (locals.type !== 'file') {
      attrs.value = locals.value;
    }
    attrs.onChange = locals.type === 'file' ? function (evt) {
      return locals.onChange(evt.target.files[0]);
    } : function (evt) {
      return locals.onChange(evt.target.value);
    };

    if (locals.help) {
      attrs['aria-describedby'] = attrs['aria-describedby'] || attrs.id + '-tip';
    }
    return attrs;
  };

  textbox.renderHiddenTextbox = overrides.renderHiddenTextbox || function renderHiddenTextbox(locals) {
    return _react2['default'].createElement('input', { type: 'hidden', value: locals.value, name: locals.attrs.name });
  };

  textbox.renderStatic = overrides.renderStatic || function renderStatic(locals) {
    return _react2['default'].createElement(
      'p',
      { className: 'form-control-static' },
      locals.value
    );
  };

  textbox.renderTextbox = overrides.renderTextbox || function renderTextbox(locals) {
    if (locals.type === 'static') {
      return textbox.renderStatic(locals);
    }
    var ret = locals.type !== 'textarea' ? textbox.renderInput(locals) : textbox.renderTextarea(locals);
    if (locals.config.addonBefore || locals.config.addonAfter || locals.config.buttonBefore || locals.config.buttonAfter) {
      ret = textbox.renderInputGroup(ret, locals);
    }
    return ret;
  };

  textbox.renderInputGroup = overrides.renderInputGroup || function renderInputGroup(input, locals) {
    return getInputGroup([locals.config.buttonBefore ? getInputGroupButton(locals.config.buttonBefore) : null, locals.config.addonBefore ? getAddon(locals.config.addonBefore) : null, input, locals.config.addonAfter ? getAddon(locals.config.addonAfter) : null, locals.config.buttonAfter ? getInputGroupButton(locals.config.buttonAfter) : null]);
  };

  textbox.renderInput = overrides.renderInput || function renderInput(locals) {
    return _react2['default'].createElement('input', locals.attrs);
  };

  textbox.renderTextarea = overrides.renderTextarea || function renderTextarea(locals) {
    return _react2['default'].createElement('textarea', locals.attrs);
  };

  textbox.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return _getLabel2['default']({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    });
  };

  textbox.renderError = overrides.renderError || function renderError(locals) {
    return _getError2['default'](locals);
  };

  textbox.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return _getHelp2['default'](locals);
  };

  textbox.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [textbox.renderLabel(locals), textbox.renderTextbox(locals), textbox.renderError(locals), textbox.renderHelp(locals)];
  };

  textbox.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = textbox.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className) },
      textbox.renderTextbox(locals),
      textbox.renderError(locals),
      textbox.renderHelp(locals)
    )];
  };

  textbox.renderFormGroup = overrides.renderFormGroup || _renderFormGroup2['default'];

  textbox.clone = function clone() {
    var newOverrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return create(_extends({}, overrides, newOverrides));
  };

  return textbox;
}

exports['default'] = create();
module.exports = exports['default'];

/***/ },
/* 1041 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _tcombValidation = __webpack_require__(267);

var _tcombValidation2 = _interopRequireDefault(_tcombValidation);

var _util = __webpack_require__(1045);

var Nil = _tcombValidation2['default'].Nil;
var assert = _tcombValidation2['default'].assert;
var SOURCE = 'tcomb-form';
var noobj = Object.freeze({});
var noarr = Object.freeze([]);
var noop = function noop() {};

function getFormComponent(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var type = _x,
        options = _x2;
    _again = false;

    if (options.factory) {
      return options.factory;
    }
    if (type.getTcombFormFactory) {
      return type.getTcombFormFactory(options);
    }
    var name = _tcombValidation2['default'].getTypeName(type);
    switch (type.meta.kind) {
      case 'irreducible':
        if (type === _tcombValidation2['default'].Boolean) {
          return Checkbox; // eslint-disable-line no-use-before-define
        } else if (type === _tcombValidation2['default'].Date) {
            return Datetime; // eslint-disable-line no-use-before-define
          }
        return Textbox; // eslint-disable-line no-use-before-define
      case 'struct':
      case 'interface':
        return Struct; // eslint-disable-line no-use-before-define
      case 'list':
        return List; // eslint-disable-line no-use-before-define
      case 'enums':
        return Select; // eslint-disable-line no-use-before-define
      case 'maybe':
      case 'subtype':
        _x = type.meta.type;
        _x2 = options;
        _again = true;
        name = undefined;
        continue _function;

      default:
        _tcombValidation2['default'].fail('[' + SOURCE + '] unsupported kind ' + type.meta.kind + ' for type ' + name);
    }
  }
}

exports.getComponent = getFormComponent;

function sortByText(a, b) {
  if (a.text < b.text) {
    return -1;
  } else if (a.text > b.text) {
    return 1;
  }
  return 0;
}

function getComparator(order) {
  return ({
    asc: sortByText,
    desc: function desc(a, b) {
      return -sortByText(a, b);
    }
  })[order];
}

var decorators = {

  template: function template(name) {
    return function (Component) {
      Component.prototype.getTemplate = function getTemplate() {
        return this.props.options.template || this.props.ctx.templates[name];
      };
    };
  },

  attrs: function attrs(Component) {
    Component.prototype.getAttrs = function getAttrs() {
      var attrs = _tcombValidation2['default'].mixin({}, this.props.options.attrs);
      attrs.id = this.getId();
      attrs.name = this.getName();
      return attrs;
    };
  },

  templates: function templates(Component) {
    Component.prototype.getTemplates = function getTemplates() {
      return _util.merge(this.props.ctx.templates, this.props.options.templates);
    };
  }

};

exports.decorators = decorators;

var Component = (function (_React$Component) {
  _inherits(Component, _React$Component);

  _createClass(Component, null, [{
    key: 'transformer',
    value: {
      format: function format(value) {
        return Nil.is(value) ? null : value;
      },
      parse: function parse(value) {
        return value;
      }
    },
    enumerable: true
  }]);

  function Component(props) {
    var _this = this;

    _classCallCheck(this, Component);

    _React$Component.call(this, props);

    this.onChange = function (value) {
      _this.setState({ value: value, isPristine: false }, function () {
        _this.props.onChange(value, _this.props.ctx.path);
      });
    };

    this.typeInfo = _util.getTypeInfo(props.type);
    this.state = {
      isPristine: true,
      hasError: false,
      value: this.getTransformer().format(props.value)
    };
  }

  Component.prototype.getTransformer = function getTransformer() {
    return this.props.options.transformer || this.constructor.transformer;
  };

  Component.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var should = nextState.value !== this.state.value || nextState.hasError !== this.state.hasError || nextProps.options !== this.props.options || nextProps.type !== this.props.type;
    // console.log(nextState.value !== this.state.value,
    //   nextState.hasError !== this.state.hasError,
    //   nextProps.options !== this.props.options,
    //   nextProps.type !== this.props.type,
    //   should)
    return should;
  };

  Component.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (props.type !== this.props.type) {
      this.typeInfo = _util.getTypeInfo(props.type);
    }
    var value = this.getTransformer().format(props.value);
    this.setState({ value: value });
  };

  Component.prototype.getValidationOptions = function getValidationOptions() {
    var context = this.props.context || this.props.ctx.context;
    return {
      path: this.props.ctx.path,
      context: _tcombValidation2['default'].mixin(_tcombValidation2['default'].mixin({}, context), { options: this.props.options })
    };
  };

  Component.prototype.getValue = function getValue() {
    return this.getTransformer().parse(this.state.value);
  };

  Component.prototype.isValueNully = function isValueNully() {
    return Nil.is(this.getValue());
  };

  Component.prototype.removeErrors = function removeErrors() {
    this.setState({ hasError: false });
  };

  Component.prototype.validate = function validate() {
    var result = _tcombValidation2['default'].validate(this.getValue(), this.props.type, this.getValidationOptions());
    this.setState({ hasError: !result.isValid() });
    return result;
  };

  Component.prototype.getAuto = function getAuto() {
    return this.props.options.auto || this.props.ctx.auto;
  };

  Component.prototype.getI18n = function getI18n() {
    return this.props.options.i18n || this.props.ctx.i18n;
  };

  Component.prototype.getDefaultLabel = function getDefaultLabel() {
    var label = this.props.ctx.label;
    if (label) {
      var suffix = this.typeInfo.isMaybe ? this.getI18n().optional : this.getI18n().required;
      return label + suffix;
    }
  };

  Component.prototype.getLabel = function getLabel() {
    var label = this.props.options.label || this.props.options.legend;
    if (Nil.is(label) && this.getAuto() === 'labels') {
      label = this.getDefaultLabel();
    }
    return label;
  };

  Component.prototype.getError = function getError() {
    if (this.hasError()) {
      var error = this.props.options.error || this.typeInfo.getValidationErrorMessage;
      if (_tcombValidation2['default'].Function.is(error)) {
        var _getValidationOptions = this.getValidationOptions();

        var path = _getValidationOptions.path;
        var context = _getValidationOptions.context;

        return error(this.getValue(), path, context);
      }
      return error;
    }
  };

  Component.prototype.hasError = function hasError() {
    return this.props.options.hasError || this.state.hasError;
  };

  Component.prototype.getConfig = function getConfig() {
    return _util.merge(this.props.ctx.config, this.props.options.config);
  };

  Component.prototype.getId = function getId() {
    var attrs = this.props.options.attrs || noobj;
    if (attrs.id) {
      return attrs.id;
    }
    if (!this.uid) {
      this.uid = this.props.ctx.uidGenerator.next();
    }
    return this.uid;
  };

  Component.prototype.getName = function getName() {
    return this.props.options.name || this.props.ctx.name || this.getId();
  };

  Component.prototype.getLocals = function getLocals() {
    var options = this.props.options;
    var value = this.state.value;
    return {
      typeInfo: this.typeInfo,
      path: this.props.ctx.path,
      isPristine: this.state.isPristine,
      error: this.getError(),
      hasError: this.hasError(),
      label: this.getLabel(),
      onChange: this.onChange,
      config: this.getConfig(),
      value: value,
      disabled: options.disabled,
      help: options.help,
      context: this.props.ctx.context
    };
  };

  Component.prototype.render = function render() {
    var locals = this.getLocals();
    if (true) {
      // getTemplate is the only required implementation when extending Component
      assert(_tcombValidation2['default'].Function.is(this.getTemplate), '[' + SOURCE + '] missing getTemplate method of component ' + this.constructor.name);
    }
    var template = this.getTemplate();
    return template(locals);
  };

  return Component;
})(_react2['default'].Component);

exports.Component = Component;

function toNull(value) {
  return _tcombValidation2['default'].String.is(value) && value.trim() === '' || Nil.is(value) ? null : value;
}

function parseNumber(value) {
  var n = parseFloat(value);
  var isNumeric = value - n + 1 >= 0;
  return isNumeric ? n : toNull(value);
}

var Textbox = (function (_Component) {
  _inherits(Textbox, _Component);

  function Textbox() {
    _classCallCheck(this, _Textbox);

    _Component.apply(this, arguments);
  }

  Textbox.prototype.getTransformer = function getTransformer() {
    var options = this.props.options;
    if (options.transformer) {
      return options.transformer;
    } else if (this.typeInfo.innerType === _tcombValidation2['default'].Number) {
      return Textbox.numberTransformer;
    }
    return Textbox.transformer;
  };

  Textbox.prototype.getPlaceholder = function getPlaceholder() {
    var attrs = this.props.options.attrs || noobj;
    var placeholder = attrs.placeholder;
    if (Nil.is(placeholder) && this.getAuto() === 'placeholders') {
      placeholder = this.getDefaultLabel();
    }
    return placeholder;
  };

  Textbox.prototype.getLocals = function getLocals() {
    var locals = _Component.prototype.getLocals.call(this);
    locals.attrs = this.getAttrs();
    locals.attrs.placeholder = this.getPlaceholder();
    locals.type = this.props.options.type || 'text';
    return locals;
  };

  _createClass(Textbox, null, [{
    key: 'transformer',
    value: {
      format: function format(value) {
        return Nil.is(value) ? '' : value;
      },
      parse: toNull
    },
    enumerable: true
  }, {
    key: 'numberTransformer',
    value: {
      format: function format(value) {
        return Nil.is(value) ? '' : String(value);
      },
      parse: parseNumber
    },
    enumerable: true
  }]);

  var _Textbox = Textbox;
  Textbox = decorators.template('textbox')(Textbox) || Textbox;
  Textbox = decorators.attrs(Textbox) || Textbox;
  return Textbox;
})(Component);

exports.Textbox = Textbox;

var Checkbox = (function (_Component2) {
  _inherits(Checkbox, _Component2);

  function Checkbox() {
    _classCallCheck(this, _Checkbox);

    _Component2.apply(this, arguments);
  }

  Checkbox.prototype.getLocals = function getLocals() {
    var locals = _Component2.prototype.getLocals.call(this);
    locals.attrs = this.getAttrs();
    // checkboxes must always have a label
    locals.label = locals.label || this.getDefaultLabel();
    return locals;
  };

  _createClass(Checkbox, null, [{
    key: 'transformer',
    value: {
      format: function format(value) {
        return Nil.is(value) ? false : value;
      },
      parse: function parse(value) {
        return value;
      }
    },
    enumerable: true
  }]);

  var _Checkbox = Checkbox;
  Checkbox = decorators.template('checkbox')(Checkbox) || Checkbox;
  Checkbox = decorators.attrs(Checkbox) || Checkbox;
  return Checkbox;
})(Component);

exports.Checkbox = Checkbox;

var Select = (function (_Component3) {
  _inherits(Select, _Component3);

  function Select() {
    _classCallCheck(this, _Select);

    _Component3.apply(this, arguments);
  }

  Select.prototype.getTransformer = function getTransformer() {
    var options = this.props.options;
    if (options.transformer) {
      return options.transformer;
    }
    if (this.isMultiple()) {
      return Select.multipleTransformer;
    }
    return Select.transformer(this.getNullOption());
  };

  Select.prototype.getNullOption = function getNullOption() {
    return this.props.options.nullOption || { value: '', text: '-' };
  };

  Select.prototype.isMultiple = function isMultiple() {
    return this.typeInfo.innerType.meta.kind === 'list';
  };

  Select.prototype.getEnum = function getEnum() {
    return this.isMultiple() ? _util.getTypeInfo(this.typeInfo.innerType.meta.type).innerType : this.typeInfo.innerType;
  };

  Select.prototype.getOptions = function getOptions() {
    var options = this.props.options;
    var items = options.options ? options.options.slice() : _util.getOptionsOfEnum(this.getEnum());
    if (options.order) {
      items.sort(getComparator(options.order));
    }
    var nullOption = this.getNullOption();
    if (!this.isMultiple() && options.nullOption !== false) {
      items.unshift(nullOption);
    }
    return items;
  };

  Select.prototype.getLocals = function getLocals() {
    var locals = _Component3.prototype.getLocals.call(this);
    locals.attrs = this.getAttrs();
    locals.options = this.getOptions();
    locals.isMultiple = this.isMultiple();
    return locals;
  };

  _createClass(Select, null, [{
    key: 'transformer',
    value: function value(nullOption) {
      return {
        format: function format(value) {
          return Nil.is(value) && nullOption ? nullOption.value : value;
        },
        parse: function parse(value) {
          return nullOption && nullOption.value === value ? null : value;
        }
      };
    },
    enumerable: true
  }, {
    key: 'multipleTransformer',
    value: {
      format: function format(value) {
        return Nil.is(value) ? noarr : value;
      },
      parse: function parse(value) {
        return value;
      }
    },
    enumerable: true
  }]);

  var _Select = Select;
  Select = decorators.template('select')(Select) || Select;
  Select = decorators.attrs(Select) || Select;
  return Select;
})(Component);

exports.Select = Select;

var Radio = (function (_Component4) {
  _inherits(Radio, _Component4);

  function Radio() {
    _classCallCheck(this, _Radio);

    _Component4.apply(this, arguments);
  }

  Radio.prototype.getOptions = function getOptions() {
    var options = this.props.options;
    var items = options.options ? options.options.slice() : _util.getOptionsOfEnum(this.typeInfo.innerType);
    if (options.order) {
      items.sort(getComparator(options.order));
    }
    return items;
  };

  Radio.prototype.getLocals = function getLocals() {
    var locals = _Component4.prototype.getLocals.call(this);
    locals.attrs = this.getAttrs();
    locals.options = this.getOptions();
    return locals;
  };

  _createClass(Radio, null, [{
    key: 'transformer',
    value: {
      format: function format(value) {
        return Nil.is(value) ? null : value;
      },
      parse: function parse(value) {
        return value;
      }
    },
    enumerable: true
  }]);

  var _Radio = Radio;
  Radio = decorators.template('radio')(Radio) || Radio;
  Radio = decorators.attrs(Radio) || Radio;
  return Radio;
})(Component);

exports.Radio = Radio;

var defaultDatetimeValue = Object.freeze([null, null, null]);

var Datetime = (function (_Component5) {
  _inherits(Datetime, _Component5);

  function Datetime() {
    _classCallCheck(this, _Datetime);

    _Component5.apply(this, arguments);
  }

  Datetime.prototype.getOrder = function getOrder() {
    return this.props.options.order || ['M', 'D', 'YY'];
  };

  Datetime.prototype.getLocals = function getLocals() {
    var locals = _Component5.prototype.getLocals.call(this);
    locals.attrs = this.getAttrs();
    locals.order = this.getOrder();
    return locals;
  };

  _createClass(Datetime, null, [{
    key: 'transformer',
    value: {
      format: function format(value) {
        if (_tcombValidation2['default'].Array.is(value)) {
          return value;
        } else if (_tcombValidation2['default'].Date.is(value)) {
          return [value.getFullYear(), value.getMonth(), value.getDate()].map(String);
        }
        return defaultDatetimeValue;
      },
      parse: function parse(value) {
        var numbers = value.map(parseNumber);
        if (numbers.every(_tcombValidation2['default'].Number.is)) {
          return new Date(numbers[0], numbers[1], numbers[2]);
        } else if (numbers.every(Nil.is)) {
          return null;
        }
        return numbers;
      }
    },
    enumerable: true
  }]);

  var _Datetime = Datetime;
  Datetime = decorators.template('date')(Datetime) || Datetime;
  Datetime = decorators.attrs(Datetime) || Datetime;
  return Datetime;
})(Component);

exports.Datetime = Datetime;

var Struct = (function (_Component6) {
  _inherits(Struct, _Component6);

  function Struct() {
    var _this2 = this;

    _classCallCheck(this, _Struct);

    _Component6.apply(this, arguments);

    this.onChange = function (fieldName, fieldValue, path, kind) {
      var value = _tcombValidation2['default'].mixin({}, _this2.state.value);
      value[fieldName] = fieldValue;
      _this2.setState({ value: value, isPristine: false }, function () {
        _this2.props.onChange(value, path, kind);
      });
    };
  }

  Struct.prototype.isValueNully = function isValueNully() {
    var _this3 = this;

    return Object.keys(this.refs).every(function (ref) {
      return _this3.refs[ref].isValueNully();
    });
  };

  Struct.prototype.removeErrors = function removeErrors() {
    var _this4 = this;

    this.setState({ hasError: false });
    Object.keys(this.refs).forEach(function (ref) {
      return _this4.refs[ref].removeErrors();
    });
  };

  Struct.prototype.validate = function validate() {
    var value = {};
    var errors = [];
    var result = undefined;

    if (this.typeInfo.isMaybe && this.isValueNully()) {
      this.removeErrors();
      return new _tcombValidation2['default'].ValidationResult({ errors: [], value: null });
    }

    var props = this.getTypeProps();
    for (var ref in props) {
      if (this.refs.hasOwnProperty(ref)) {
        result = this.refs[ref].validate();
        errors = errors.concat(result.errors);
        value[ref] = result.value;
      }
    }

    if (errors.length === 0) {
      var InnerType = this.typeInfo.innerType;
      value = this.getTransformer().parse(value);
      value = new InnerType(value);
      if (this.typeInfo.isSubtype) {
        result = _tcombValidation2['default'].validate(value, this.props.type, this.getValidationOptions());
        errors = result.errors;
      }
    }

    this.setState({ hasError: errors.length > 0 });
    return new _tcombValidation2['default'].ValidationResult({ errors: errors, value: value });
  };

  Struct.prototype.getTemplate = function getTemplate() {
    return this.props.options.template || this.getTemplates().struct;
  };

  Struct.prototype.getTypeProps = function getTypeProps() {
    return this.typeInfo.innerType.meta.props;
  };

  Struct.prototype.getOrder = function getOrder() {
    return this.props.options.order || Object.keys(this.getTypeProps());
  };

  Struct.prototype.getInputs = function getInputs() {
    var _props = this.props;
    var options = _props.options;
    var ctx = _props.ctx;

    var props = this.getTypeProps();
    var auto = this.getAuto();
    var i18n = this.getI18n();
    var config = this.getConfig();
    var templates = this.getTemplates();
    var value = this.state.value;
    var inputs = {};

    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        var type = props[prop];
        var propValue = value[prop];
        var propType = _util.getTypeFromUnion(type, propValue);
        var fieldsOptions = options.fields || noobj;
        var propOptions = _util.getComponentOptions(fieldsOptions[prop], noobj, propValue, type);
        inputs[prop] = _react2['default'].createElement(getFormComponent(propType, propOptions), {
          key: prop,
          ref: prop,
          type: propType,
          options: propOptions,
          value: propValue,
          onChange: this.onChange.bind(this, prop),
          ctx: {
            context: ctx.context,
            uidGenerator: ctx.uidGenerator,
            auto: auto,
            config: config,
            name: ctx.name ? ctx.name + '[' + prop + ']' : prop,
            label: _util.humanize(prop),
            i18n: i18n,
            templates: templates,
            path: ctx.path.concat(prop)
          }
        });
      }
    }
    return inputs;
  };

  Struct.prototype.getLocals = function getLocals() {
    var options = this.props.options;
    var locals = _Component6.prototype.getLocals.call(this);
    locals.order = this.getOrder();
    locals.inputs = this.getInputs();
    locals.className = options.className;
    return locals;
  };

  _createClass(Struct, null, [{
    key: 'transformer',
    value: {
      format: function format(value) {
        return Nil.is(value) ? noobj : value;
      },
      parse: function parse(value) {
        return value;
      }
    },
    enumerable: true
  }]);

  var _Struct = Struct;
  Struct = decorators.templates(Struct) || Struct;
  return Struct;
})(Component);

exports.Struct = Struct;

function toSameLength(value, keys, uidGenerator) {
  if (value.length === keys.length) {
    return keys;
  }
  var ret = [];
  for (var i = 0, len = value.length; i < len; i++) {
    ret[i] = keys[i] || uidGenerator.next();
  }
  return ret;
}

var List = (function (_Component7) {
  _inherits(List, _Component7);

  _createClass(List, null, [{
    key: 'transformer',
    value: {
      format: function format(value) {
        return Nil.is(value) ? noarr : value;
      },
      parse: function parse(value) {
        return value;
      }
    },
    enumerable: true
  }]);

  function List(props) {
    var _this5 = this;

    _classCallCheck(this, _List);

    _Component7.call(this, props);

    this.onChange = function (value, keys, path, kind) {
      var allkeys = toSameLength(value, keys, _this5.props.ctx.uidGenerator);
      _this5.setState({ value: value, keys: allkeys, isPristine: false }, function () {
        _this5.props.onChange(value, path, kind);
      });
    };

    this.addItem = function () {
      var value = _this5.state.value.concat(undefined);
      var keys = _this5.state.keys.concat(_this5.props.ctx.uidGenerator.next());
      _this5.onChange(value, keys, _this5.props.ctx.path.concat(value.length - 1), 'add');
    };

    this.state.keys = this.state.value.map(function () {
      return props.ctx.uidGenerator.next();
    });
  }

  List.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (props.type !== this.props.type) {
      this.typeInfo = _util.getTypeInfo(props.type);
    }
    var value = this.getTransformer().format(props.value);
    this.setState({
      value: value,
      keys: toSameLength(value, this.state.keys, props.ctx.uidGenerator)
    });
  };

  List.prototype.isValueNully = function isValueNully() {
    return this.state.value.length === 0;
  };

  List.prototype.removeErrors = function removeErrors() {
    var _this6 = this;

    this.setState({ hasError: false });
    Object.keys(this.refs).forEach(function (ref) {
      return _this6.refs[ref].removeErrors();
    });
  };

  List.prototype.validate = function validate() {
    var value = [];
    var errors = [];
    var result = undefined;

    if (this.typeInfo.isMaybe && this.isValueNully()) {
      this.removeErrors();
      return new _tcombValidation2['default'].ValidationResult({ errors: [], value: null });
    }

    for (var i = 0, len = this.state.value.length; i < len; i++) {
      result = this.refs[i].validate();
      errors = errors.concat(result.errors);
      value.push(result.value);
    }

    // handle subtype
    if (this.typeInfo.isSubtype && errors.length === 0) {
      value = this.getTransformer().parse(value);
      result = _tcombValidation2['default'].validate(value, this.props.type, this.getValidationOptions());
      errors = result.errors;
    }

    this.setState({ hasError: errors.length > 0 });
    return new _tcombValidation2['default'].ValidationResult({ errors: errors, value: value });
  };

  List.prototype.onItemChange = function onItemChange(itemIndex, itemValue, path, kind) {
    var value = this.state.value.slice();
    value[itemIndex] = itemValue;
    this.onChange(value, this.state.keys, path, kind);
  };

  List.prototype.removeItem = function removeItem(i) {
    var value = this.state.value.slice();
    value.splice(i, 1);
    var keys = this.state.keys.slice();
    keys.splice(i, 1);
    this.onChange(value, keys, this.props.ctx.path.concat(i), 'remove');
  };

  List.prototype.moveUpItem = function moveUpItem(i) {
    if (i > 0) {
      this.onChange(_util.move(this.state.value.slice(), i, i - 1), _util.move(this.state.keys.slice(), i, i - 1), this.props.ctx.path.concat(i), 'moveUp');
    }
  };

  List.prototype.moveDownItem = function moveDownItem(i) {
    if (i < this.state.value.length - 1) {
      this.onChange(_util.move(this.state.value.slice(), i, i + 1), _util.move(this.state.keys.slice(), i, i + 1), this.props.ctx.path.concat(i), 'moveDown');
    }
  };

  List.prototype.getTemplate = function getTemplate() {
    return this.props.options.template || this.getTemplates().list;
  };

  List.prototype.getItems = function getItems() {
    var _this7 = this;

    var _props2 = this.props;
    var options = _props2.options;
    var ctx = _props2.ctx;

    var auto = this.getAuto();
    var i18n = this.getI18n();
    var config = this.getConfig();
    var templates = this.getTemplates();
    var value = this.state.value;
    return value.map(function (itemValue, i) {
      var type = _this7.typeInfo.innerType.meta.type;
      var itemType = _util.getTypeFromUnion(type, itemValue);
      var itemOptions = _util.getComponentOptions(options.item, noobj, itemValue, type);
      var ItemComponent = getFormComponent(itemType, itemOptions);
      var buttons = [];
      if (!options.disableRemove) {
        buttons.push({
          type: 'remove',
          label: i18n.remove,
          click: _this7.removeItem.bind(_this7, i)
        });
      }
      if (!options.disableOrder) {
        buttons.push({
          type: 'move-up',
          label: i18n.up,
          click: _this7.moveUpItem.bind(_this7, i)
        });
      }
      if (!options.disableOrder) {
        buttons.push({
          type: 'move-down',
          label: i18n.down,
          click: _this7.moveDownItem.bind(_this7, i)
        });
      }
      return {
        input: _react2['default'].createElement(ItemComponent, {
          ref: i,
          type: itemType,
          options: itemOptions,
          value: itemValue,
          onChange: _this7.onItemChange.bind(_this7, i),
          ctx: {
            context: ctx.context,
            uidGenerator: ctx.uidGenerator,
            auto: auto,
            config: config,
            i18n: i18n,
            name: ctx.name ? ctx.name + '[' + i + ']' : String(i),
            templates: templates,
            path: ctx.path.concat(i)
          }
        }),
        key: _this7.state.keys[i],
        buttons: buttons
      };
    });
  };

  List.prototype.getLocals = function getLocals() {
    var options = this.props.options;
    var i18n = this.getI18n();
    var locals = _Component7.prototype.getLocals.call(this);
    locals.add = options.disableAdd ? null : {
      type: 'add',
      label: i18n.add,
      click: this.addItem
    };
    locals.items = this.getItems();
    locals.className = options.className;
    return locals;
  };

  var _List = List;
  List = decorators.templates(List) || List;
  return List;
})(Component);

exports.List = List;

var Form = (function (_React$Component2) {
  _inherits(Form, _React$Component2);

  function Form() {
    _classCallCheck(this, Form);

    _React$Component2.apply(this, arguments);
  }

  Form.prototype.validate = function validate() {
    return this.refs.input.validate();
  };

  Form.prototype.getValue = function getValue() {
    var result = this.validate();
    return result.isValid() ? result.value : null;
  };

  Form.prototype.getComponent = function getComponent(path) {
    var points = _tcombValidation2['default'].String.is(path) ? path.split('.') : path;
    return points.reduce(function (input, name) {
      return input.refs[name];
    }, this.refs.input);
  };

  Form.prototype.getSeed = function getSeed() {
    var rii = this._reactInternalInstance;
    if (rii) {
      if (rii._hostContainerInfo) {
        return rii._hostContainerInfo._idCounter;
      }
      if (rii._nativeContainerInfo) {
        return rii._nativeContainerInfo._idCounter;
      }
      if (rii._rootNodeID) {
        return rii._rootNodeID;
      }
    }
    return '0';
  };

  Form.prototype.getUIDGenerator = function getUIDGenerator() {
    this.uidGenerator = this.uidGenerator || new _util.UIDGenerator(this.getSeed());
    return this.uidGenerator;
  };

  Form.prototype.render = function render() {
    var i18n = Form.i18n;
    var templates = Form.templates;

    if (true) {
      assert(_tcombValidation2['default'].isType(this.props.type), '[' + SOURCE + '] missing required prop type');
      assert(_tcombValidation2['default'].maybe(_tcombValidation2['default'].Object).is(this.props.options) || _tcombValidation2['default'].Function.is(this.props.options) || _tcombValidation2['default'].list(_tcombValidation2['default'].maybe(_tcombValidation2['default'].Object)).is(this.props.options), '[' + SOURCE + '] prop options, if specified, must be an object, a function returning the options or a list of options for unions');
      assert(_tcombValidation2['default'].Object.is(templates), '[' + SOURCE + '] missing templates config');
      assert(_tcombValidation2['default'].Object.is(i18n), '[' + SOURCE + '] missing i18n config');
    }

    var value = this.props.value;
    var type = _util.getTypeFromUnion(this.props.type, value);
    var options = _util.getComponentOptions(this.props.options, noobj, value, this.props.type);

    // this is in the render method because I need this._reactInternalInstance._rootNodeID in React ^0.14.0
    // and this._reactInternalInstance._nativeContainerInfo._idCounter in React ^15.0.0
    var uidGenerator = this.getUIDGenerator();

    return _react2['default'].createElement(getFormComponent(type, options), {
      ref: 'input',
      type: type,
      options: options,
      value: value,
      onChange: this.props.onChange || noop,
      ctx: this.props.ctx || {
        context: this.props.context,
        uidGenerator: uidGenerator,
        auto: 'labels',
        templates: templates,
        i18n: i18n,
        path: []
      }
    });
  };

  return Form;
})(_react2['default'].Component);

exports.Form = Form;

/***/ },
/* 1042 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports['default'] = {
  optional: ' (optional)',
  required: '',
  add: 'Add',
  remove: 'Remove',
  up: 'Up',
  down: 'Down'
};
module.exports = exports['default'];

/***/ },
/* 1043 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* global File */
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tcombValidation = __webpack_require__(267);

var _tcombValidation2 = _interopRequireDefault(_tcombValidation);

var _components = __webpack_require__(1041);

var components = _interopRequireWildcard(_components);

_tcombValidation2['default'].form = components;
_tcombValidation2['default'].form.File = _tcombValidation2['default'].irreducible('File', function (x) {
  return x instanceof File;
});

module.exports = _tcombValidation2['default'];

/***/ },
/* 1044 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/*! @preserve
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Giulio Canti
 *
 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _indexJs = __webpack_require__(1043);

var _indexJs2 = _interopRequireDefault(_indexJs);

var _tcombFormTemplatesBootstrap = __webpack_require__(1035);

var _tcombFormTemplatesBootstrap2 = _interopRequireDefault(_tcombFormTemplatesBootstrap);

var _i18nEn = __webpack_require__(1042);

var _i18nEn2 = _interopRequireDefault(_i18nEn);

_indexJs2['default'].form.Form.templates = _tcombFormTemplatesBootstrap2['default'];
_indexJs2['default'].form.Form.i18n = _i18nEn2['default'];

exports['default'] = _indexJs2['default'];
module.exports = exports['default'];

/***/ },
/* 1045 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.getOptionsOfEnum = getOptionsOfEnum;
exports.getTypeInfo = getTypeInfo;
exports.humanize = humanize;
exports.merge = merge;
exports.move = move;
exports.getTypeFromUnion = getTypeFromUnion;
exports.getComponentOptions = getComponentOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tcombValidation = __webpack_require__(267);

var _tcombValidation2 = _interopRequireDefault(_tcombValidation);

function getOptionsOfEnum(type) {
  var enums = type.meta.map;
  return Object.keys(enums).map(function (value) {
    return {
      value: value,
      text: enums[value]
    };
  });
}

function getTypeInfo(type) {
  var innerType = type;
  var isMaybe = false;
  var isSubtype = false;
  var kind = undefined;
  var innerGetValidationErrorMessage = undefined;

  while (innerType) {
    kind = innerType.meta.kind;
    if (_tcombValidation2['default'].Function.is(innerType.getValidationErrorMessage)) {
      innerGetValidationErrorMessage = innerType.getValidationErrorMessage;
    }
    if (kind === 'maybe') {
      isMaybe = true;
      innerType = innerType.meta.type;
      continue;
    }
    if (kind === 'subtype') {
      isSubtype = true;
      innerType = innerType.meta.type;
      continue;
    }
    break;
  }

  var getValidationErrorMessage = innerGetValidationErrorMessage ? function (value, path, context) {
    var result = _tcombValidation2['default'].validate(value, type, { path: path, context: context });
    if (!result.isValid()) {
      for (var i = 0, len = result.errors.length; i < len; i++) {
        if (_tcombValidation2['default'].Function.is(result.errors[i].expected.getValidationErrorMessage)) {
          return result.errors[i].message;
        }
      }
      return innerGetValidationErrorMessage(value, path, context);
    }
  } : undefined;

  return {
    type: type,
    isMaybe: isMaybe,
    isSubtype: isSubtype,
    innerType: innerType,
    getValidationErrorMessage: getValidationErrorMessage
  };
}

// thanks to https://github.com/epeli/underscore.string

function underscored(s) {
  return s.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function humanize(s) {
  return capitalize(underscored(s).replace(/_id$/, '').replace(/_/g, ' '));
}

function merge(a, b) {
  return _tcombValidation.mixin(_tcombValidation.mixin({}, a), b, true);
}

function move(arr, fromIndex, toIndex) {
  var element = arr.splice(fromIndex, 1)[0];
  arr.splice(toIndex, 0, element);
  return arr;
}

var UIDGenerator = (function () {
  function UIDGenerator(seed) {
    _classCallCheck(this, UIDGenerator);

    this.seed = 'tfid-' + seed + '-';
    this.counter = 0;
  }

  UIDGenerator.prototype.next = function next() {
    return this.seed + this.counter++;
  };

  return UIDGenerator;
})();

exports.UIDGenerator = UIDGenerator;

function containsUnion(_x) {
  var _again = true;

  _function: while (_again) {
    var type = _x;
    _again = false;

    switch (type.meta.kind) {
      case 'union':
        return true;
      case 'maybe':
      case 'subtype':
        _x = type.meta.type;
        _again = true;
        continue _function;

      default:
        return false;
    }
  }
}

function getUnionConcreteType(type, value) {
  var kind = type.meta.kind;
  if (kind === 'union') {
    var concreteType = type.dispatch(value);
    if (true) {
      _tcombValidation2['default'].assert(_tcombValidation2['default'].isType(concreteType), function () {
        return 'Invalid value ' + _tcombValidation2['default'].assert.stringify(value) + ' supplied to ' + _tcombValidation2['default'].getTypeName(type) + ' (no constructor returned by dispatch)';
      });
    }
    return concreteType;
  } else if (kind === 'maybe') {
    var maybeConcrete = _tcombValidation2['default'].maybe(getUnionConcreteType(type.meta.type, value), type.meta.name);
    maybeConcrete.getValidationErrorMessage = type.getValidationErrorMessage;
    maybeConcrete.getTcombFormFactory = type.getTcombFormFactory;
    return maybeConcrete;
  } else if (kind === 'subtype') {
    var subtypeConcrete = _tcombValidation2['default'].subtype(getUnionConcreteType(type.meta.type, value), type.meta.predicate, type.meta.name);
    subtypeConcrete.getValidationErrorMessage = type.getValidationErrorMessage;
    subtypeConcrete.getTcombFormFactory = type.getTcombFormFactory;
    return subtypeConcrete;
  }
}

function getTypeFromUnion(type, value) {
  if (containsUnion(type)) {
    return getUnionConcreteType(type, value);
  }
  return type;
}

function getUnion(_x2) {
  var _again2 = true;

  _function2: while (_again2) {
    var type = _x2;
    _again2 = false;

    if (type.meta.kind === 'union') {
      return type;
    }
    _x2 = type.meta.type;
    _again2 = true;
    continue _function2;
  }
}

function findIndex(arr, element) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === element) {
      return i;
    }
  }
  return -1;
}

function getComponentOptions(_x3, _x4, _x5, _x6) {
  var _again3 = true;

  _function3: while (_again3) {
    var options = _x3,
        defaultOptions = _x4,
        value = _x5,
        type = _x6;
    _again3 = false;

    if (_tcombValidation2['default'].Nil.is(options)) {
      return defaultOptions;
    }
    if (_tcombValidation2['default'].Function.is(options)) {
      return options(value);
    }
    if (_tcombValidation2['default'].Array.is(options) && containsUnion(type)) {
      var union = getUnion(type);
      var concreteType = union.dispatch(value);
      var index = findIndex(union.meta.types, concreteType);
      // recurse
      _x3 = options[index];
      _x4 = defaultOptions;
      _x5 = value;
      _x6 = concreteType;
      _again3 = true;
      union = concreteType = index = undefined;
      continue _function3;
    }
    return options;
  }
}

/***/ },
/* 1046 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);
var isArray = __webpack_require__(60);

module.exports = irreducible('Array', isArray);


/***/ },
/* 1047 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);

module.exports = irreducible('Date', function (x) { return x instanceof Date; });


/***/ },
/* 1048 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);

module.exports = irreducible('Error', function (x) { return x instanceof Error; });


/***/ },
/* 1049 */
/***/ function(module, exports, __webpack_require__) {

var refinement = __webpack_require__(272);
var Number = __webpack_require__(411);

module.exports = refinement(Number, function (x) { return x % 1 === 0; }, 'Integer');


/***/ },
/* 1050 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);
var isObject = __webpack_require__(62);

module.exports = irreducible('Object', isObject);


/***/ },
/* 1051 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);

module.exports = irreducible('RegExp', function (x) { return x instanceof RegExp; });


/***/ },
/* 1052 */
/***/ function(module, exports, __webpack_require__) {

var irreducible = __webpack_require__(31);
var isType = __webpack_require__(23);

module.exports = irreducible('Type', isType);

/***/ },
/* 1053 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var isType = __webpack_require__(23);
var isNil = __webpack_require__(50);
var mixin = __webpack_require__(271);
var getTypeName = __webpack_require__(20);
var isUnion = __webpack_require__(416);

// All the .declare-d types should be clearly different from each other thus they should have
// different names when a name was not explicitly provided.
var nextDeclareUniqueId = 1;

module.exports = function declare(name) {
  if (true) {
    assert(isTypeName(name), function () { return 'Invalid argument name ' + name + ' supplied to declare([name]) (expected a string)'; });
  }

  var type;

  function Declare(value, path) {
    if (true) {
      assert(!isNil(type), function () { return 'Type declared but not defined, don\'t forget to call .define on every declared type'; });
      if (isUnion(type)) {
        assert(type.dispatch === Declare.dispatch, function () { return 'Please define the custom ' + name + '.dispatch function before calling ' + name + '.define()'; });
      }
    }
    return type(value, path);
  }

  Declare.define = function (spec) {
    if (true) {
      assert(isType(spec), function () { return 'Invalid argument type ' + assert.stringify(spec) +  ' supplied to define(type) (expected a type)'; });
      assert(isNil(type), function () { return 'Declare.define(type) can only be invoked once'; });
      assert(isNil(spec.meta.name) && Object.keys(spec.prototype).length === 0, function () { return 'Invalid argument type ' + assert.stringify(spec) + ' supplied to define(type) (expected a fresh, unnamed type)'; });
    }

    if (isUnion(spec) && Declare.hasOwnProperty('dispatch')) {
      spec.dispatch = Declare.dispatch;
    }
    type = spec;
    mixin(Declare, type, true); // true because it overwrites Declare.displayName
    if (name) {
      type.displayName = Declare.displayName = name;
      Declare.meta.name = name;
    }
    Declare.meta.identity = type.meta.identity;
    Declare.prototype = type.prototype;
    return Declare;
  };

  Declare.displayName = name || ( getTypeName(Declare) + "$" + nextDeclareUniqueId++ );
  // in general I can't say if this type will be an identity, for safety setting to false
  Declare.meta = { identity: false };
  Declare.prototype = null;
  return Declare;
};


/***/ },
/* 1054 */
/***/ function(module, exports, __webpack_require__) {

var isType = __webpack_require__(23);

function isRefinement(type) {
  return isType(type) && type.meta.kind === 'subtype';
}

function getPredicates(type) {
  return isRefinement(type) ?
    [type.meta.predicate].concat(getPredicates(type.meta.type)) :
    [];
}

function getUnrefinedType(type) {
  return isRefinement(type) ?
    getUnrefinedType(type.meta.type) :
    type;
}

function decompose(type) {
  return {
    predicates: getPredicates(type),
    unrefinedType: getUnrefinedType(type)
  };
}

module.exports = decompose;

/***/ },
/* 1055 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var forbidNewOperator = __webpack_require__(132);
var isString = __webpack_require__(178);
var isObject = __webpack_require__(62);

function getDefaultName(map) {
  return Object.keys(map).map(function (k) { return assert.stringify(k); }).join(' | ');
}

function enums(map, name) {

  if (true) {
    assert(isObject(map), function () { return 'Invalid argument map ' + assert.stringify(map) + ' supplied to enums(map, [name]) combinator (expected a dictionary of String -> String | Number)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to enums(map, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(map);

  function Enums(value, path) {

    if (true) {
      forbidNewOperator(this, Enums);
      path = path || [displayName];
      assert(Enums.is(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected one of ' + assert.stringify(Object.keys(map)) + ')'; });
    }

    return value;
  }

  Enums.meta = {
    kind: 'enums',
    map: map,
    name: name,
    identity: true
  };

  Enums.displayName = displayName;

  Enums.is = function (x) {
    return map.hasOwnProperty(x);
  };

  return Enums;
}

enums.of = function (keys, name) {
  keys = isString(keys) ? keys.split(' ') : keys;
  var value = {};
  keys.forEach(function (k) {
    value[k] = k;
  });
  return enums(value, name);
};

enums.getDefaultName = getDefaultName;
module.exports = enums;



/***/ },
/* 1056 */
/***/ function(module, exports) {

module.exports = function fail(message) {
  throw new TypeError('[tcomb] ' + message);
};

/***/ },
/* 1057 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var FunctionType = __webpack_require__(176);
var isArray = __webpack_require__(60);
var list = __webpack_require__(417);
var isObject = __webpack_require__(62);
var create = __webpack_require__(58);
var isNil = __webpack_require__(50);
var isBoolean = __webpack_require__(177);
var tuple = __webpack_require__(419);
var getFunctionName = __webpack_require__(133);
var getTypeName = __webpack_require__(20);
var isType = __webpack_require__(23);

function getDefaultName(domain, codomain) {
  return '(' + domain.map(getTypeName).join(', ') + ') => ' + getTypeName(codomain);
}

function isInstrumented(f) {
  return FunctionType.is(f) && isObject(f.instrumentation);
}

function getOptionalArgumentsIndex(types) {
  var end = types.length;
  var areAllMaybes = false;
  for (var i = end - 1; i >= 0; i--) {
    var type = types[i];
    if (!isType(type) || type.meta.kind !== 'maybe') {
      return (i + 1);
    } else {
      areAllMaybes = true;
    }
  }
  return areAllMaybes ? 0 : end;
}

function func(domain, codomain, name) {

  domain = isArray(domain) ? domain : [domain]; // handle handy syntax for unary functions

  if (true) {
    assert(list(FunctionType).is(domain), function () { return 'Invalid argument domain ' + assert.stringify(domain) + ' supplied to func(domain, codomain, [name]) combinator (expected an array of types)'; });
    assert(FunctionType.is(codomain), function () { return 'Invalid argument codomain ' + assert.stringify(codomain) + ' supplied to func(domain, codomain, [name]) combinator (expected a type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to func(domain, codomain, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(domain, codomain);
  var domainLength = domain.length;
  var optionalArgumentsIndex = getOptionalArgumentsIndex(domain);

  function FuncType(value, path) {

    if (!isInstrumented(value)) { // automatically instrument the function
      return FuncType.of(value);
    }

    if (true) {
      path = path || [displayName];
      assert(FuncType.is(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    return value;
  }

  FuncType.meta = {
    kind: 'func',
    domain: domain,
    codomain: codomain,
    name: name,
    identity: true
  };

  FuncType.displayName = displayName;

  FuncType.is = function (x) {
    return isInstrumented(x) &&
      x.instrumentation.domain.length === domainLength &&
      x.instrumentation.domain.every(function (type, i) {
        return type === domain[i];
      }) &&
      x.instrumentation.codomain === codomain;
  };

  FuncType.of = function (f, curried) {

    if (true) {
      assert(FunctionType.is(f), function () { return 'Invalid argument f supplied to func.of ' + displayName + ' (expected a function)'; });
      assert(isNil(curried) || isBoolean(curried), function () { return 'Invalid argument curried ' + assert.stringify(curried) + ' supplied to func.of ' + displayName + ' (expected a boolean)'; });
    }

    if (FuncType.is(f)) { // makes FuncType.of idempotent
      return f;
    }

    function fn() {
      var args = Array.prototype.slice.call(arguments);
      var argsLength = args.length;

      if (true) {
        // type-check arguments
        var tupleLength = curried ? argsLength : Math.max(argsLength, optionalArgumentsIndex);
        tuple(domain.slice(0, tupleLength), 'arguments of function ' + displayName)(args);
      }

      if (curried && argsLength < domainLength) {
        if (true) {
          assert(argsLength > 0, 'Invalid arguments.length = 0 for curried function ' + displayName);
        }
        var g = Function.prototype.bind.apply(f, [this].concat(args));
        var newDomain = func(domain.slice(argsLength), codomain);
        return newDomain.of(g, true);
      }
      else {
        return create(codomain, f.apply(this, args));
      }
    }

    fn.instrumentation = {
      domain: domain,
      codomain: codomain,
      f: f
    };

    fn.displayName = getFunctionName(f);

    return fn;

  };

  return FuncType;

}

func.getDefaultName = getDefaultName;
func.getOptionalArgumentsIndex = getOptionalArgumentsIndex;
module.exports = func;


/***/ },
/* 1058 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var String = __webpack_require__(269);
var Function = __webpack_require__(176);
var isBoolean = __webpack_require__(177);
var isObject = __webpack_require__(62);
var isNil = __webpack_require__(50);
var create = __webpack_require__(58);
var getTypeName = __webpack_require__(20);
var dict = __webpack_require__(270);
var getDefaultInterfaceName = __webpack_require__(414);
var isIdentity = __webpack_require__(61);
var is = __webpack_require__(59);
var extend = __webpack_require__(413);
var assign = __webpack_require__(412);

function extendInterface(mixins, name) {
  return extend(inter, mixins, name);
}

function getOptions(options) {
  if (!isObject(options)) {
    options = isNil(options) ? {} : { name: options };
  }
  if (!options.hasOwnProperty('strict')) {
    options.strict = inter.strict;
  }
  return options;
}

function inter(props, options) {

  options = getOptions(options);
  var name = options.name;
  var strict = options.strict;

  if (true) {
    assert(dict(String, Function).is(props), function () { return 'Invalid argument props ' + assert.stringify(props) + ' supplied to interface(props, [options]) combinator (expected a dictionary String -> Type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to interface(props, [options]) combinator (expected a string)'; });
    assert(isBoolean(strict), function () { return 'Invalid argument strict ' + assert.stringify(strict) + ' supplied to struct(props, [options]) combinator (expected a boolean)'; });
  }

  var displayName = name || getDefaultInterfaceName(props);
  var identity = Object.keys(props).map(function (prop) { return props[prop]; }).every(isIdentity);

  function Interface(value, path) {

    if (false) {
      if (identity) {
        return value; // just trust the input if elements must not be hydrated
      }
    }

    if (true) {
      path = path || [displayName];
      assert(!isNil(value), function () { return 'Invalid value ' + value + ' supplied to ' + path.join('/'); });
      // strictness
      if (strict) {
        for (var k in value) {
          assert(props.hasOwnProperty(k), function () { return 'Invalid additional prop "' + k + '" supplied to ' + path.join('/'); });
        }
      }
    }

    var idempotent = true;
    var ret = identity ? {} : assign({}, value);
    for (var prop in props) {
      var expected = props[prop];
      var actual = value[prop];
      var instance = create(expected, actual, (  true ? path.concat(prop + ': ' + getTypeName(expected)) : null ));
      idempotent = idempotent && ( actual === instance );
      ret[prop] = instance;
    }

    if (idempotent) { // implements idempotency
      ret = value;
    }

    if (true) {
      Object.freeze(ret);
    }

    return ret;

  }

  Interface.meta = {
    kind: 'interface',
    props: props,
    name: name,
    identity: identity,
    strict: strict
  };

  Interface.displayName = displayName;

  Interface.is = function (x) {
    if (isNil(x)) {
      return false;
    }
    if (strict) {
      for (var k in x) {
        if (!props.hasOwnProperty(k)) {
          return false;
        }
      }
    }
    for (var prop in props) {
      if (!is(x[prop], props[prop])) {
        return false;
      }
    }
    return true;
  };

  Interface.update = function (instance, patch) {
    return Interface(assert.update(instance, patch));
  };

  Interface.extend = function (xs, name) {
    return extendInterface([Interface].concat(xs), name);
  };

  return Interface;
}

inter.strict = false;
inter.getOptions = getOptions;
inter.getDefaultName = getDefaultInterfaceName;
inter.extend = extendInterface;
module.exports = inter;


/***/ },
/* 1059 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var isFunction = __webpack_require__(22);
var isArray = __webpack_require__(60);
var forbidNewOperator = __webpack_require__(61);
var is = __webpack_require__(59);
var getTypeName = __webpack_require__(20);
var isIdentity = __webpack_require__(61);

function getDefaultName(types) {
  return types.map(getTypeName).join(' & ');
}

function intersection(types, name) {

  if (true) {
    assert(isArray(types) && types.every(isFunction) && types.length >= 2, function () { return 'Invalid argument types ' + assert.stringify(types) + ' supplied to intersection(types, [name]) combinator (expected an array of at least 2 types)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to intersection(types, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(types);
  var identity = types.every(isIdentity);

  function Intersection(value, path) {

    if (true) {
      if (identity) {
        forbidNewOperator(this, Intersection);
      }
      path = path || [displayName];
      assert(Intersection.is(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    return value;
  }

  Intersection.meta = {
    kind: 'intersection',
    types: types,
    name: name,
    identity: identity
  };

  Intersection.displayName = displayName;

  Intersection.is = function (x) {
    return types.every(function (type) {
      return is(x, type);
    });
  };

  Intersection.update = function (instance, patch) {
    return Intersection(assert.update(instance, patch));
  };

  return Intersection;
}

intersection.getDefaultName = getDefaultName;
module.exports = intersection;



/***/ },
/* 1060 */
/***/ function(module, exports, __webpack_require__) {

var isType = __webpack_require__(23);

module.exports = function isInterface(x) {
  return isType(x) && ( x.meta.kind === 'interface' );
};

/***/ },
/* 1061 */
/***/ function(module, exports, __webpack_require__) {

var isType = __webpack_require__(23);

module.exports = function isMaybe(x) {
  return isType(x) && ( x.meta.kind === 'maybe' );
};

/***/ },
/* 1062 */
/***/ function(module, exports, __webpack_require__) {

var isType = __webpack_require__(23);

module.exports = function isStruct(x) {
  return isType(x) && ( x.meta.kind === 'struct' );
};

/***/ },
/* 1063 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isFunction = __webpack_require__(22);
var isType = __webpack_require__(23);
var Any = __webpack_require__(268);

module.exports = function match(x) {
  var type, guard, f, count;
  for (var i = 1, len = arguments.length; i < len; ) {
    type = arguments[i];
    guard = arguments[i + 1];
    f = arguments[i + 2];

    if (isFunction(f) && !isType(f)) {
      i = i + 3;
    }
    else {
      f = guard;
      guard = Any.is;
      i = i + 2;
    }

    if (true) {
      count = (count || 0) + 1;
      assert(isType(type), function () { return 'Invalid type in clause #' + count; });
      assert(isFunction(guard), function () { return 'Invalid guard in clause #' + count; });
      assert(isFunction(f), function () { return 'Invalid block in clause #' + count; });
    }

    if (type.is(x) && guard(x)) {
      return f(x);
    }
  }
  assert.fail('Match error');
};


/***/ },
/* 1064 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var isFunction = __webpack_require__(22);
var isMaybe = __webpack_require__(1061);
var isIdentity = __webpack_require__(61);
var Any = __webpack_require__(268);
var create = __webpack_require__(58);
var Nil = __webpack_require__(410);
var forbidNewOperator = __webpack_require__(132);
var is = __webpack_require__(59);
var getTypeName = __webpack_require__(20);

function getDefaultName(type) {
  return '?' + getTypeName(type);
}

function maybe(type, name) {

  if (isMaybe(type) || type === Any || type === Nil) { // makes the combinator idempotent and handle Any, Nil
    return type;
  }

  if (true) {
    assert(isFunction(type), function () { return 'Invalid argument type ' + assert.stringify(type) + ' supplied to maybe(type, [name]) combinator (expected a type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to maybe(type, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(type);
  var identity = isIdentity(type);

  function Maybe(value, path) {
    if (true) {
      if (identity) {
        forbidNewOperator(this, Maybe);
      }
    }
    return Nil.is(value) ? value : create(type, value, path);
  }

  Maybe.meta = {
    kind: 'maybe',
    type: type,
    name: name,
    identity: identity
  };

  Maybe.displayName = displayName;

  Maybe.is = function (x) {
    return Nil.is(x) || is(x, type);
  };

  return Maybe;
}

maybe.getDefaultName = getDefaultName;
module.exports = maybe;


/***/ },
/* 1065 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var String = __webpack_require__(269);
var Function = __webpack_require__(176);
var isBoolean = __webpack_require__(177);
var isObject = __webpack_require__(62);
var isNil = __webpack_require__(50);
var create = __webpack_require__(58);
var getTypeName = __webpack_require__(20);
var dict = __webpack_require__(270);
var getDefaultInterfaceName = __webpack_require__(414);
var extend = __webpack_require__(413);

function getDefaultName(props) {
  return 'Struct' + getDefaultInterfaceName(props);
}

function extendStruct(mixins, name) {
  return extend(struct, mixins, name);
}

function getOptions(options) {
  if (!isObject(options)) {
    options = isNil(options) ? {} : { name: options };
  }
  if (!options.hasOwnProperty('strict')) {
    options.strict = struct.strict;
  }
  if (!options.hasOwnProperty('defaultProps')) {
    options.defaultProps = {};
  }
  return options;
}

function struct(props, options) {

  options = getOptions(options);
  var name = options.name;
  var strict = options.strict;
  var defaultProps = options.defaultProps;

  if (true) {
    assert(dict(String, Function).is(props), function () { return 'Invalid argument props ' + assert.stringify(props) + ' supplied to struct(props, [options]) combinator (expected a dictionary String -> Type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to struct(props, [options]) combinator (expected a string)'; });
    assert(isBoolean(strict), function () { return 'Invalid argument strict ' + assert.stringify(strict) + ' supplied to struct(props, [options]) combinator (expected a boolean)'; });
    assert(isObject(defaultProps), function () { return 'Invalid argument defaultProps ' + assert.stringify(defaultProps) + ' supplied to struct(props, [options]) combinator (expected an object)'; });
  }

  var displayName = name || getDefaultName(props);

  function Struct(value, path) {

    if (Struct.is(value)) { // implements idempotency
      return value;
    }

    if (true) {
      path = path || [displayName];
      assert(isObject(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected an object)'; });
      // strictness
      if (strict) {
        for (k in value) {
          if (value.hasOwnProperty(k)) {
            assert(props.hasOwnProperty(k), function () { return 'Invalid additional prop "' + k + '" supplied to ' + path.join('/'); });
          }
        }
      }
    }

    if (!(this instanceof Struct)) { // `new` is optional
      return new Struct(value, path);
    }

    for (var k in props) {
      if (props.hasOwnProperty(k)) {
        var expected = props[k];
        var actual = value[k];
        // apply defaults
        if (actual === undefined) {
          actual = defaultProps[k];
        }
        this[k] = create(expected, actual, (  true ? path.concat(k + ': ' + getTypeName(expected)) : null ));
      }
    }

    if (true) {
      Object.freeze(this);
    }

  }

  Struct.meta = {
    kind: 'struct',
    props: props,
    name: name,
    identity: false,
    strict: strict,
    defaultProps: defaultProps
  };

  Struct.displayName = displayName;

  Struct.is = function (x) {
    return x instanceof Struct;
  };

  Struct.update = function (instance, patch) {
    return new Struct(assert.update(instance, patch));
  };

  Struct.extend = function (xs, name) {
    return extendStruct([Struct].concat(xs), name);
  };

  return Struct;
}

struct.strict = false;
struct.getOptions = getOptions;
struct.getDefaultName = getDefaultName;
struct.extend = extendStruct;
module.exports = struct;


/***/ },
/* 1066 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isTypeName = __webpack_require__(37);
var isFunction = __webpack_require__(22);
var getTypeName = __webpack_require__(20);
var isIdentity = __webpack_require__(61);
var isArray = __webpack_require__(60);
var create = __webpack_require__(58);
var is = __webpack_require__(59);
var forbidNewOperator = __webpack_require__(132);
var isUnion = __webpack_require__(416);
var isNil = __webpack_require__(50);

function getDefaultName(types) {
  return types.map(getTypeName).join(' | ');
}

function union(types, name) {

  if (true) {
    assert(isArray(types) && types.every(isFunction) && types.length >= 2, function () { return 'Invalid argument types ' + assert.stringify(types) + ' supplied to union(types, [name]) combinator (expected an array of at least 2 types)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to union(types, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(types);
  var identity = types.every(isIdentity);

  function Union(value, path) {

    if (false) {
      if (identity) {
        return value;
      }
    }

    var type = Union.dispatch(value);
    if (!type && Union.is(value)) {
      return value;
    }

    if (true) {
      if (identity) {
        forbidNewOperator(this, Union);
      }
      path = path || [displayName];
      assert(isFunction(type), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (no constructor returned by dispatch)'; });
      path[path.length - 1] += '(' + getTypeName(type) + ')';
    }

    return create(type, value, path);
  }

  Union.meta = {
    kind: 'union',
    types: types,
    name: name,
    identity: identity
  };

  Union.displayName = displayName;

  Union.is = function (x) {
    return types.some(function (type) {
      return is(x, type);
    });
  };

  Union.dispatch = function (x) { // default dispatch implementation
    for (var i = 0, len = types.length; i < len; i++ ) {
      var type = types[i];
      if (isUnion(type)) { // handle union of unions
        var t = type.dispatch(x);
        if (!isNil(t)) {
          return t;
        }
      }
      else if (is(x, type)) {
        return type;
      }
    }
  };

  Union.update = function (instance, patch) {
    return Union(assert.update(instance, patch));
  };

  return Union;
}

union.getDefaultName = getDefaultName;
module.exports = union;



/***/ },
/* 1067 */
/***/ function(module, exports, __webpack_require__) {

var assert = __webpack_require__(13);
var isObject = __webpack_require__(62);
var isFunction = __webpack_require__(22);
var isArray = __webpack_require__(60);
var isNumber = __webpack_require__(415);
var assign = __webpack_require__(412);

function getShallowCopy(x) {
  if (isObject(x)) {
    if (x instanceof Date || x instanceof RegExp) {
      return x;
    }
    return assign({}, x);
  }
  if (isArray(x)) {
    return x.concat();
  }
  return x;
}

function isCommand(k) {
  return update.commands.hasOwnProperty(k);
}

function getCommand(k) {
  return update.commands[k];
}

function update(instance, patch) {

  if (true) {
    assert(isObject(patch), function () { return 'Invalid argument patch ' + assert.stringify(patch) + ' supplied to function update(instance, patch): expected an object containing commands'; });
  }

  var value = instance;
  var isChanged = false;
  var newValue;
  for (var k in patch) {
    if (patch.hasOwnProperty(k)) {
      if (isCommand(k)) {
        newValue = getCommand(k)(patch[k], value);
        if (newValue !== instance) {
          isChanged = true;
          value = newValue;
        } else {
          value = instance;
        }
      }
      else {
        if (value === instance) {
          value = getShallowCopy(instance);
        }
        newValue = update(value[k], patch[k]);
        isChanged = isChanged || ( newValue !== value[k] );
        value[k] = newValue;
      }
    }
  }
  return isChanged ? value : instance;
}

// built-in commands

function $apply(f, value) {
  if (true) {
    assert(isFunction(f), 'Invalid argument f supplied to immutability helper { $apply: f } (expected a function)');
  }
  return f(value);
}

function $push(elements, arr) {
  if (true) {
    assert(isArray(elements), 'Invalid argument elements supplied to immutability helper { $push: elements } (expected an array)');
    assert(isArray(arr), 'Invalid value supplied to immutability helper $push (expected an array)');
  }
  if (elements.length > 0) {
    return arr.concat(elements);
  }
  return arr;
}

function $remove(keys, obj) {
  if (true) {
    assert(isArray(keys), 'Invalid argument keys supplied to immutability helper { $remove: keys } (expected an array)');
    assert(isObject(obj), 'Invalid value supplied to immutability helper $remove (expected an object)');
  }
  if (keys.length > 0) {
    obj = getShallowCopy(obj);
    for (var i = 0, len = keys.length; i < len; i++ ) {
      delete obj[keys[i]];
    }
  }
  return obj;
}

function $set(value) {
  return value;
}

function $splice(splices, arr) {
  if (true) {
    assert(isArray(splices) && splices.every(isArray), 'Invalid argument splices supplied to immutability helper { $splice: splices } (expected an array of arrays)');
    assert(isArray(arr), 'Invalid value supplied to immutability helper $splice (expected an array)');
  }
  if (splices.length > 0) {
    arr = getShallowCopy(arr);
    return splices.reduce(function (acc, splice) {
      acc.splice.apply(acc, splice);
      return acc;
    }, arr);
  }
  return arr;
}

function $swap(config, arr) {
  if (true) {
    assert(isObject(config), 'Invalid argument config supplied to immutability helper { $swap: config } (expected an object)');
    assert(isNumber(config.from), 'Invalid argument config.from supplied to immutability helper { $swap: config } (expected a number)');
    assert(isNumber(config.to), 'Invalid argument config.to supplied to immutability helper { $swap: config } (expected a number)');
    assert(isArray(arr), 'Invalid value supplied to immutability helper $swap (expected an array)');
  }
  if (config.from !== config.to) {
    arr = getShallowCopy(arr);
    var element = arr[config.to];
    arr[config.to] = arr[config.from];
    arr[config.from] = element;
  }
  return arr;
}

function $unshift(elements, arr) {
  if (true) {
    assert(isArray(elements), 'Invalid argument elements supplied to immutability helper {$unshift: elements} (expected an array)');
    assert(isArray(arr), 'Invalid value supplied to immutability helper $unshift (expected an array)');
  }
  if (elements.length > 0) {
    return elements.concat(arr);
  }
  return arr;
}

function $merge(whatToMerge, value) {
  var isChanged = false;
  var result = getShallowCopy(value);
  for (var k in whatToMerge) {
    if (whatToMerge.hasOwnProperty(k)) {
      result[k] = whatToMerge[k];
      isChanged = isChanged || ( result[k] !== value[k] );
    }
  }
  return isChanged ? result : value;
}

update.commands = {
  $apply: $apply,
  $push: $push,
  $remove: $remove,
  $set: $set,
  $splice: $splice,
  $swap: $swap,
  $unshift: $unshift,
  $merge: $merge
};

module.exports = update;


/***/ },
/* 1068 */,
/* 1069 */,
/* 1070 */,
/* 1071 */,
/* 1072 */,
/* 1073 */,
/* 1074 */,
/* 1075 */,
/* 1076 */,
/* 1077 */
/***/ function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (typeof input === 'string') {
      this.url = input
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split('\r\n').forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }
],[434]);
//# sourceMappingURL=app.89f735d43f6249490b0e.js.map