(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["IpfsRepo"] = factory();
	else
		root["IpfsRepo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */

/* eslint-disable no-proto */


var base64 = __webpack_require__(32);

var ieee754 = __webpack_require__(33);

var isArray = __webpack_require__(34);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */

Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
/*
 * Export kMaxLength after typed array support is determined.
 */

exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function foo() {
        return 42;
      }
    };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }

    that.length = length;
  }

  return that;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */


function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return allocUnsafe(this, arg);
  }

  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/


Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }

  return createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }

  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }

  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(31)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Key = __webpack_require__(14);

const MemoryDatastore = __webpack_require__(39);

const utils = __webpack_require__(15);

const Errors = __webpack_require__(16);

exports.Key = Key;
exports.MemoryDatastore = MemoryDatastore;
exports.utils = utils;
exports.Errors = Errors;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log(...args) {
  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return typeof console === 'object' && console.log && console.log(...args);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  let r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = {"npm_config_save_dev":"","npm_config_legacy_bundling":"","npm_config_dry_run":"","npm_package_contributors_4_name":"Stephen Whitmore","npm_package_engines_npm":">=3.0.0","npm_package_scripts_dep_check":"aegir dep-check","npm_config_viewer":"man","npm_config_only":"","npm_config_commit_hooks":"true","npm_config_browser":"","npm_package_gitHead":"99df42bbf4bd4bcb238ef4e3a5fa5b5522221762","MANPATH":"/Users/alex/.nvm/versions/node/v12.16.1/share/man:/usr/local/share/man:/usr/local/scala/man:/usr/share/man:/opt/X11/share/man:/Users/alex/.rvm/rubies/ruby-2.1.6/share/man:/Users/alex/.rvm/share/man:/Library/Apple/usr/share/man:/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/usr/share/man:/Applications/Xcode.app/Contents/Developer/usr/share/man:/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/share/man","npm_config_also":"","npm_package_dependencies_datastore_fs":"~0.9.0","npm_config_sign_git_commit":"","npm_config_rollback":"true","npm_package_contributors_5_name":"Hugo Dias","npm_package_contributors_4_email":"stephen.whitmore@gmail.com","TERM_PROGRAM":"Apple_Terminal","rvm_bin_path":"/Users/alex/.rvm/bin","NODE":"/Users/alex/.nvm/versions/node/v12.16.1/bin/node","npm_config_usage":"","npm_config_audit":"true","INIT_CWD":"/Users/alex/Documents/Workspaces/ipfs/js-ipfs-repo","npm_package_contributors_15_email":"victorbjelkholm@gmail.com","npm_package_devDependencies_sinon":"^9.0.2","npm_package_homepage":"https://github.com/ipfs/js-ipfs-repo","GEM_HOME":"/Users/alex/.rvm/gems/ruby-2.1.6","NVM_CD_FLAGS":"","npm_config_globalignorefile":"/Users/alex/.nvm/versions/node/v12.16.1/etc/npmignore","npm_package_contributors_11_name":"Francisco Baio Dias","npm_package_contributors_9_email":"makaretu@gmail.com","TERM":"xterm-color","SHELL":"/bin/bash","npm_config_shell":"/bin/bash","npm_config_maxsockets":"50","npm_config_init_author_url":"","npm_package_devDependencies_rimraf":"^3.0.0","npm_config_shrinkwrap":"true","npm_config_parseable":"","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_package_contributors_10_email":"masylum@gmail.com","TMPDIR":"/var/folders/ht/kcd74ltd0f760bm7zvrt9zf40000gn/T/","IRBRC":"/Users/alex/.rvm/rubies/ruby-2.1.6/.irbrc","npm_config_timing":"","npm_config_init_license":"ISC","npm_package_contributors_11_email":"xicombd@gmail.com","npm_package_scripts_release":"aegir release --docs","npm_package_scripts_lint":"aegir lint","npm_package_browser_rimraf":"false","NVM_PATH":"/Users/alex/.nvm/versions/node/v12.16.1/lib/node","npm_config_if_present":"","npm_package_contributors_15_name":"ᴠɪᴄᴛᴏʀ ʙᴊᴇʟᴋʜᴏʟᴍ","npm_package_dependencies_debug":"^4.1.0","TERM_PROGRAM_VERSION":"433","GVM_ROOT":"/Users/alex/.gvm","npm_config_sign_git_tag":"","npm_config_init_author_email":"","npm_config_cache_max":"Infinity","npm_package_contributors_25_email":"steefmin@gmail.com","npm_package_devDependencies_aegir":"^21.8.1","npm_config_preid":"","npm_config_long":"","npm_config_local_address":"","npm_config_git_tag_version":"true","npm_config_cert":"","TERM_SESSION_ID":"A0E9EF4A-606A-41DD-998C-7AC72ECD087F","MY_RUBY_HOME":"/Users/alex/.rvm/rubies/ruby-2.1.6","npm_config_registry":"https://registry.npmjs.org/","npm_config_noproxy":"","npm_config_fetch_retries":"2","npm_package_contributors_20_name":"Justin Chase","npm_package_contributors_19_name":"Jonathan","npm_package_dependencies_bytes":"^3.1.0","npm_config_ipfs_url":"/ip4/127.0.0.1/tcp/5001","npm_package_contributors_8_email":"vasco.santos@moxy.studio","npm_package_dependencies_multibase":"^0.7.0","npm_package_repository_url":"git+https://github.com/ipfs/js-ipfs-repo.git","npm_config_versions":"","npm_config_message":"%s","npm_config_key":"","npm_package_readmeFilename":"README.md","npm_package_description":"IPFS Repo implementation","USER":"alex","NVM_DIR":"/Users/alex/.nvm","npm_package_contributors_24_name":"Richard Littauer","npm_package_license":"MIT","npm_package_dependencies_err_code":"^2.0.0","npm_package_contributors_17_email":"hacdias@gmail.com","npm_package_devDependencies_multihashes":"~0.4.15","npm_config_globalconfig":"/Users/alex/.nvm/versions/node/v12.16.1/etc/npmrc","npm_package_contributors_22_name":"Marcus Bernales","npm_package_contributors_7_email":"adam@uhlir.dev","npm_package_devDependencies_just_range":"^2.1.0","npm_config_prefer_online":"","npm_config_logs_max":"10","npm_config_always_auth":"","npm_package_contributors_14_name":"Pedro Santos","npm_package_scripts_test_node":"aegir test -t node","rvm_path":"/Users/alex/.rvm","npm_package_contributors_23_email":"i@pgte.me","npm_package_contributors_2_name":"dignifiedquire","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.ssg2nI1a6X/Listeners","npm_config_spin":"","npm_package_contributors_23_name":"Pedro Teixeira","npm_package_dependencies_buffer":"^5.5.0","__CF_USER_TEXT_ENCODING":"0x1F5:0x0:0x2","npm_execpath":"/Users/alex/.nvm/versions/node/v12.16.1/lib/node_modules/npm/bin/npm-cli.js","npm_config_global_style":"","npm_config_cache_lock_retries":"10","npm_package_scripts_coverage":"nyc -s npm run test:node && nyc report --reporter=html","npm_config_update_notifier":"true","npm_config_cafile":"","npm_package_contributors_6_name":"Alan Shaw","npm_config_heading":"npm","npm_config_audit_level":"low","npm_package_contributors_27_name":"nginnever","npm_package_dependencies_p_queue":"^6.0.0","npm_config_searchlimit":"20","npm_config_read_only":"","npm_config_offline":"","npm_config_fetch_retry_mintimeout":"10000","npm_package_dependencies_interface_datastore":"^0.8.3","rvm_prefix":"/Users/alex","npm_config_json":"","npm_config_access":"","npm_config_argv":"{\"remain\":[],\"cooked\":[\"run\",\"release-major\"],\"original\":[\"run\",\"release-major\"]}","PATH":"/Users/alex/Documents/Workspaces/ipfs/js-ipfs-repo/node_modules/aegir/node_modules/.bin:/Users/alex/Documents/Workspaces/ipfs/js-ipfs-repo/node_modules/node_modules/.bin:/Users/alex/Documents/Workspaces/ipfs/js-ipfs-repo/node_modules/.bin:/Users/alex/Documents/Workspaces/ipfs/node_modules/.bin:/Users/alex/Documents/Workspaces/node_modules/.bin:/Users/alex/Documents/node_modules/.bin:/Users/alex/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/alex/.nvm/versions/node/v12.16.1/bin:/Users/alex/.nvm/versions/node/v12.16.1/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/alex/Documents/Workspaces/ipfs/js-ipfs-repo/node_modules/.bin:/Users/alex/.nvm/versions/node/v12.16.1/bin:/usr/local/heroku/bin:/Users/alex/.gvm/pkgsets/go1.13/global/bin:/Users/alex/.gvm/gos/go1.13/bin:/Users/alex/.gvm/pkgsets/go1.13/global/overlay/bin:/Users/alex/.gvm/bin:/Users/alex/.gvm/bin:/Users/alex/Qt5.5.1/5.5/clang_64/bin:/usr/local/bin:/usr/local/maven/bin:/usr/local/ant/bin:/usr/local/scala/bin:/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/minicom/2.2/bin:/opt/local/bin:/Applications/VMware Fusion.app/Contents/Public:/usr/local/go/bin:/opt/X11/bin:/Applications/Wireshark.app/Contents/MacOS:/Users/alex/Qt5.5.1/5.5/clang_64/bin:/Users/alex/.rvm/gems/ruby-2.1.6/bin:/Users/alex/.rvm/gems/ruby-2.1.6@global/bin:/Users/alex/.rvm/rubies/ruby-2.1.6/bin:/usr/local/maven/bin:/usr/local/ant/bin:/usr/local/scala/bin:/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands:/Users/alex/.rvm/bin:/Users/alex/.rvm/bin","AEGIR_GHTOKEN":"72e51ba17379e7ac973217ca6a00d6f9741b5b6e","npm_config_allow_same_version":"","npm_config_spinner":"","npm_package_contributors_1_email":"jacobheun@gmail.com","npm_config_https_proxy":"","npm_config_engine_strict":"","npm_config_description":"true","npm_package_contributors_22_email":"mboperator@gmail.com","npm_package_devDependencies_memdown":"^5.1.0","_":"/Users/alex/Documents/Workspaces/ipfs/js-ipfs-repo/node_modules/.bin/aegir","npm_config_userconfig":"/Users/alex/.npmrc","npm_config_init_module":"/Users/alex/.npm-init.js","npm_package_dependencies_bignumber_js":"^9.0.0","NVM_NODEJS_ORG_MIRROR":"https://nodejs.org/dist","ATLAS_USERNAME":"achingbrain","npm_config_cidr":"","npm_package_contributors_10_name":"Pau Ramon Revilla","PWD":"/Users/alex/Documents/Workspaces/ipfs/js-ipfs-repo","GVM_VERSION":"1.0.22","npm_config_user":"501","npm_config_node_version":"12.16.1","npm_package_bugs_url":"https://github.com/ipfs/js-ipfs-repo/issues","npm_package_contributors_27_email":"ginneversource@gmail.com","npm_lifecycle_event":"release-major","npm_package_devDependencies_chai":"^4.2.0","npm_package_scripts_release_major":"aegir release --type major --docs","npm_config_save":"true","npm_config_ignore_prepublish":"","npm_config_editor":"vi","npm_config_auth_type":"legacy","npm_package_contributors_14_email":"pedro.santos@moxy.studio","npm_package_contributors_8_name":"Vasco Santos","npm_package_dependencies_ipld_block":"^0.9.1","npm_package_keywords_0":"IPFS","npm_package_repository_type":"git","npm_package_name":"ipfs-repo","LANG":"en_GB.UTF-8","npm_config_tag":"latest","npm_config_script_shell":"","npm_package_contributors_7_name":"Adam Uhlíř","npm_package_dependencies_ipfs_utils":"^2.2.0","npm_package_keywords_1":"libp2p","gvm_pkgset_name":"global","npm_config_global":"","npm_config_before":"","npm_config_progress":"","npm_package_keywords_2":"datastore","npm_package_scripts_build":"aegir build","npm_config_searchstaleness":"900","npm_config_optional":"true","npm_config_ham_it_up":"","npm_package_contributors_9_name":"Richard Schneider","npm_package_contributors_0_email":"daviddias.p@gmail.com","npm_package_scripts_docs":"aegir docs","XPC_FLAGS":"0x0","npm_config_save_prod":"","npm_config_force":"","npm_config_bin_links":"true","npm_config_searchopts":"","npm_package_contributors_21_name":"Linus Unnebäck","npm_package_contributors_18_name":"Jonah Weissman","npm_package_engines_node":">=10.0.0","npm_config_node_gyp":"/Users/alex/.nvm/versions/node/v12.16.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js","npm_config_depth":"Infinity","npm_package_contributors_5_email":"mail@hugodias.me","npm_package_dependencies_cids":"^0.8.0","npm_package_main":"src/index.js","npm_config_sso_poll_frequency":"500","npm_config_rebuild_bundle":"true","npm_package_version":"1.0.1","XPC_SERVICE_NAME":"0","npm_config_unicode":"true","npm_package_contributors_13_name":"Dmitriy Ryajov","rvm_version":"1.29.9 (latest)","npm_package_contributors_24_email":"richard.littauer@gmail.com","npm_package_leadMaintainer":"Alex Potsides <alex@achingbrain.net>","HOME":"/Users/alex","SHLVL":"2","npm_config_fetch_retry_maxtimeout":"60000","npm_package_contributors_12_email":"ralphtheninja@riseup.net","npm_package_scripts_test":"aegir test","GOROOT":"/Users/alex/.gvm/gos/go1.13","npm_config_tag_version_prefix":"v","npm_config_strict_ssl":"true","npm_config_sso_type":"oauth","npm_config_scripts_prepend_node_path":"warn-only","npm_config_save_prefix":"^","npm_config_ca":"","npm_config_loglevel":"info","npm_package_contributors_12_name":"Lars-Magnus Skog","npm_package_devDependencies_ncp":"^2.0.0","npm_config_save_exact":"","npm_config_group":"20","npm_config_fetch_retry_factor":"10","npm_config_dev":"","npm_package_contributors_21_email":"linus@folkdatorn.se","npm_package_contributors_18_email":"jonahrweissman@gmail.com","npm_package_contributors_17_name":"Henrique Dias","npm_package_dependencies_just_safe_set":"^2.1.0","npm_package_devDependencies_multihashing_async":"~0.8.0","npm_config_version":"","npm_config_prefer_offline":"","npm_config_cache_lock_stale":"60000","npm_package_contributors_20_email":"justin.m.chase@gmail.com","npm_package_contributors_19_email":"jkrone@vt.edu","npm_package_contributors_3_name":"Alex Potsides","npm_package_browser_datastore_fs":"datastore-idb","IPFS_CONTRIBUTORS_GITHUB_TOKEN":"e21b59138d5c4c16a67419302505d8b3fef8aa5a","gvm_go_name":"go1.13","npm_config_otp":"","npm_config_cache_min":"10","npm_package_dependencies_datastore_core":"^1.0.0","npm_config_searchexclude":"","npm_config_cache":"/Users/alex/.npm","npm_package_contributors_16_name":"Andrew Nesbitt","LOGNAME":"alex","npm_lifecycle_script":"aegir release --type major --docs","npm_config_color":"true","npm_package_dependencies_sort_keys":"^4.0.0","npm_package_dependencies_just_safe_get":"^2.0.0","GVM_OVERLAY_PREFIX":"/Users/alex/.gvm/pkgsets/go1.13/global/overlay","npm_config_proxy":"","npm_config_package_lock":"true","npm_package_contributors_6_email":"alan.shaw@protocol.ai","npm_package_dependencies_proper_lockfile":"^4.0.0","GEM_PATH":"/Users/alex/.rvm/gems/ruby-2.1.6:/Users/alex/.rvm/gems/ruby-2.1.6@global","npm_config_package_lock_only":"","npm_config_fund":"true","npm_package_browser___src_lock_js":"./src/lock-memory.js","npm_config_save_optional":"","npm_package_contributors_13_email":"dryajov@gmail.com","npm_package_dependencies_datastore_level":"~0.14.0","npm_package_scripts_test_browser":"aegir test -t browser","npm_package_browser___src_default_options_js":"./src/default-options-browser.js","QT_DIR":"/Users/alex/Qt5.5.1/5.5/clang_64","PKG_CONFIG_PATH":"/Users/alex/.gvm/pkgsets/go1.13/global/overlay/lib/pkgconfig:/Users/alex/.gvm/pkgsets/go1.13/global/overlay/lib/pkgconfig:","GOPATH":"/Users/alex/.gvm/pkgsets/go1.13/global","NVM_BIN":"/Users/alex/.nvm/versions/node/v12.16.1/bin","npm_config_ignore_scripts":"","npm_config_user_agent":"npm/6.14.1 node/v12.16.1 darwin x64","npm_package_contributors_26_name":"Volker Mische","npm_package_contributors_3_email":"alex@achingbrain.net","npm_package_devDependencies_dirty_chai":"^2.0.1","NVM_IOJS_ORG_MIRROR":"https://iojs.org/dist","npm_config_cache_lock_wait":"10000","npm_package_contributors_2_email":"dignifiedquire@gmail.com","npm_config_production":"","npm_package_contributors_16_email":"andrewnez@gmail.com","npm_package_dependencies_datastore_idb":"^1.0.0","npm_package_files_1":"dist","DISPLAY":"/private/tmp/com.apple.launchd.sslsLQCMwr/org.macosforge.xquartz:0","npm_config_send_metrics":"","npm_config_save_bundle":"","npm_package_contributors_26_email":"volker.mische@gmail.com","npm_package_files_0":"src","npm_config_umask":"0022","npm_config_node_options":"","npm_config_init_version":"1.0.0","npm_package_contributors_0_name":"David Dias","npm_config_init_author_name":"","npm_config_git":"git","npm_config_scope":"","npm_package_contributors_25_name":"Steef Min","RUBY_VERSION":"ruby-2.1.6","npm_config_unsafe_perm":"true","npm_config_tmp":"/var/folders/ht/kcd74ltd0f760bm7zvrt9zf40000gn/T","npm_config_onload_script":"","npm_package_dependencies_ipfs_repo_migrations":"^0.2.0","npm_node_execpath":"/Users/alex/.nvm/versions/node/v12.16.1/bin/node","npm_config_prefix":"/Users/alex/.nvm/versions/node/v12.16.1","npm_config_link":"","npm_config_format_package_lock":"true","npm_package_contributors_1_name":"Jacob Heun","npm_package_scripts_release_minor":"aegir release --type minor --docs","npm_package_scripts_test_webworker":"aegir test -t webworker","GH_TOKEN":"72e51ba17379e7ac973217ca6a00d6f9741b5b6e","GVM_PATH_BACKUP":"/Users/alex/.gvm/bin:/Users/alex/Qt5.5.1/5.5/clang_64/bin:/usr/local/bin:/usr/local/maven/bin:/usr/local/ant/bin:/usr/local/scala/bin:/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/minicom/2.2/bin:/opt/local/bin:/Applications/VMware Fusion.app/Contents/Public:/usr/local/go/bin:/opt/X11/bin:/Applications/Wireshark.app/Contents/MacOS:/Users/alex/Qt5.5.1/5.5/clang_64/bin:/Users/alex/.rvm/gems/ruby-2.1.6/bin:/Users/alex/.rvm/gems/ruby-2.1.6@global/bin:/Users/alex/.rvm/rubies/ruby-2.1.6/bin:/usr/local/maven/bin:/usr/local/ant/bin:/usr/local/scala/bin:/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands:/Users/alex/.rvm/bin:/Users/alex/.rvm/bin","ATLAS_TOKEN":"R9Flr20ZVbekmg.atlasv1.7mluz4FXrUd4A9yOlFMcylm1kWKXhphyJ3JcMrXRu7Ob4FKdoh9AvJ2VV6RyzLtLeI8","NODE_ENV":"production"}.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(25)(exports);
const {
  formatters
} = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

const {
  Buffer
} = __webpack_require__(0);

const {
  openDB,
  deleteDB
} = __webpack_require__(36);

const {
  Key,
  Errors,
  utils
} = __webpack_require__(1);

const {
  filter,
  sortAll
} = utils;

const isStrictTypedArray = arr => {
  return arr instanceof Int8Array || arr instanceof Int16Array || arr instanceof Int32Array || arr instanceof Uint8Array || arr instanceof Uint8ClampedArray || arr instanceof Uint16Array || arr instanceof Uint32Array || arr instanceof Float32Array || arr instanceof Float64Array;
};

const typedarrayToBuffer = arr => {
  if (isStrictTypedArray(arr)) {
    // To avoid a copy, use the typed array's underlying ArrayBuffer to back new Buffer
    let buf = Buffer.from(arr.buffer);

    if (arr.byteLength !== arr.buffer.byteLength) {
      // Respect the "view", i.e. byteOffset and byteLength, without doing a copy
      buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    }

    return buf;
  } else {
    // Pass through all other types to `Buffer.from`
    return Buffer.from(arr);
  }
};

const str2ab = str => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);

  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
};

const queryIt = /*#__PURE__*/function () {
  var _ref = _wrapAsyncGenerator(function* (q, store, location) {
    const range = q.prefix ? self.IDBKeyRange.bound(str2ab(q.prefix), str2ab(q.prefix + '\xFF'), false, true) : undefined;
    let cursor = yield _awaitAsyncGenerator(store.transaction(location).store.openCursor(range));
    let limit = 0;

    if (cursor && q.offset && q.offset > 0) {
      cursor = yield _awaitAsyncGenerator(cursor.advance(q.offset));
    }

    while (cursor) {
      // limit
      if (q.limit !== undefined && q.limit === limit) {
        return;
      }

      limit++;
      const key = new Key(Buffer.from(cursor.key));

      if (q.keysOnly) {
        yield {
          key
        };
      } else {
        const value = Buffer.from(cursor.value);
        yield {
          key,
          value
        };
      }

      cursor = yield _awaitAsyncGenerator(cursor.continue());
    }
  });

  return function queryIt(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

class IdbDatastore {
  constructor(location, options = {}) {
    this.store = null;
    this.options = options;
    this.location = options.prefix + location;
    this.version = options.version || 1;
  }

  async open() {
    const location = this.location;

    try {
      this.store = await openDB(this.location, this.version, {
        upgrade(db) {
          db.createObjectStore(location);
        }

      });
    } catch (err) {
      throw Errors.dbOpenFailedError(err);
    }
  }

  async put(key, val) {
    if (this.store === null) {
      throw new Error('Datastore needs to be opened.');
    }

    try {
      await this.store.put(this.location, val, key.toBuffer());
    } catch (err) {
      throw Errors.dbWriteFailedError(err);
    }
  }

  async get(key) {
    if (this.store === null) {
      throw new Error('Datastore needs to be opened.');
    }

    let value;

    try {
      value = await this.store.get(this.location, key.toBuffer());
    } catch (err) {
      throw Errors.dbWriteFailedError(err);
    }

    if (!value) {
      throw Errors.notFoundError();
    }

    return typedarrayToBuffer(value);
  }

  async has(key) {
    if (this.store === null) {
      throw new Error('Datastore needs to be opened.');
    }

    try {
      await this.get(key);
    } catch (err) {
      if (err.code === 'ERR_NOT_FOUND') return false;
      throw err;
    }

    return true;
  }

  async delete(key) {
    if (this.store === null) {
      throw new Error('Datastore needs to be opened.');
    }

    try {
      await this.store.delete(this.location, key.toBuffer());
    } catch (err) {
      throw Errors.dbDeleteFailedError(err);
    }
  }

  batch() {
    const puts = [];
    const dels = [];
    return {
      put(key, value) {
        puts.push([key.toBuffer(), value]);
      },

      delete(key) {
        dels.push(key.toBuffer());
      },

      commit: async () => {
        if (this.store === null) {
          throw new Error('Datastore needs to be opened.');
        }

        const tx = this.store.transaction(this.location, 'readwrite');
        const store = tx.store;
        await Promise.all(puts.map(p => store.put(p[1], p[0])));
        await Promise.all(dels.map(p => store.delete(p)));
        await tx.done;
      }
    };
  }

  query(q) {
    if (this.store === null) {
      throw new Error('Datastore needs to be opened.');
    }

    let it = queryIt(q, this.store, this.location);

    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it, f) => filter(it, f), it);
    }

    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it, f) => sortAll(it, f), it);
    }

    return it;
  }

  close() {
    if (this.store === null) {
      throw new Error('Datastore needs to be opened.');
    }

    return this.store.close();
  }

  destroy() {
    return deleteDB(this.location);
  }

}

module.exports = IdbDatastore;

/***/ }),
/* 4 */
/***/ (function(module) {

module.exports = JSON.parse("{\"identity\":0,\"ip4\":4,\"tcp\":6,\"sha1\":17,\"sha2-256\":18,\"sha2-512\":19,\"sha3-512\":20,\"sha3-384\":21,\"sha3-256\":22,\"sha3-224\":23,\"shake-128\":24,\"shake-256\":25,\"keccak-224\":26,\"keccak-256\":27,\"keccak-384\":28,\"keccak-512\":29,\"dccp\":33,\"murmur3-128\":34,\"murmur3-32\":35,\"ip6\":41,\"ip6zone\":42,\"path\":47,\"multicodec\":48,\"multihash\":49,\"multiaddr\":50,\"multibase\":51,\"dns\":53,\"dns4\":54,\"dns6\":55,\"dnsaddr\":56,\"protobuf\":80,\"cbor\":81,\"raw\":85,\"dbl-sha2-256\":86,\"rlp\":96,\"bencode\":99,\"dag-pb\":112,\"dag-cbor\":113,\"libp2p-key\":114,\"git-raw\":120,\"torrent-info\":123,\"torrent-file\":124,\"leofcoin-block\":129,\"leofcoin-tx\":130,\"leofcoin-pr\":131,\"sctp\":132,\"eth-block\":144,\"eth-block-list\":145,\"eth-tx-trie\":146,\"eth-tx\":147,\"eth-tx-receipt-trie\":148,\"eth-tx-receipt\":149,\"eth-state-trie\":150,\"eth-account-snapshot\":151,\"eth-storage-trie\":152,\"bitcoin-block\":176,\"bitcoin-tx\":177,\"zcash-block\":192,\"zcash-tx\":193,\"stellar-block\":208,\"stellar-tx\":209,\"md4\":212,\"md5\":213,\"bmt\":214,\"decred-block\":224,\"decred-tx\":225,\"ipld-ns\":226,\"ipfs-ns\":227,\"swarm-ns\":228,\"ipns-ns\":229,\"zeronet\":230,\"ed25519-pub\":237,\"dash-block\":240,\"dash-tx\":241,\"swarm-manifest\":250,\"swarm-feed\":251,\"udp\":273,\"p2p-webrtc-star\":275,\"p2p-webrtc-direct\":276,\"p2p-stardust\":277,\"p2p-circuit\":290,\"dag-json\":297,\"udt\":301,\"utp\":302,\"unix\":400,\"p2p\":421,\"ipfs\":421,\"https\":443,\"onion\":444,\"onion3\":445,\"garlic64\":446,\"garlic32\":447,\"tls\":448,\"quic\":460,\"ws\":477,\"wss\":478,\"p2p-websocket-star\":479,\"http\":480,\"json\":512,\"messagepack\":513,\"x11\":4352,\"blake2b-8\":45569,\"blake2b-16\":45570,\"blake2b-24\":45571,\"blake2b-32\":45572,\"blake2b-40\":45573,\"blake2b-48\":45574,\"blake2b-56\":45575,\"blake2b-64\":45576,\"blake2b-72\":45577,\"blake2b-80\":45578,\"blake2b-88\":45579,\"blake2b-96\":45580,\"blake2b-104\":45581,\"blake2b-112\":45582,\"blake2b-120\":45583,\"blake2b-128\":45584,\"blake2b-136\":45585,\"blake2b-144\":45586,\"blake2b-152\":45587,\"blake2b-160\":45588,\"blake2b-168\":45589,\"blake2b-176\":45590,\"blake2b-184\":45591,\"blake2b-192\":45592,\"blake2b-200\":45593,\"blake2b-208\":45594,\"blake2b-216\":45595,\"blake2b-224\":45596,\"blake2b-232\":45597,\"blake2b-240\":45598,\"blake2b-248\":45599,\"blake2b-256\":45600,\"blake2b-264\":45601,\"blake2b-272\":45602,\"blake2b-280\":45603,\"blake2b-288\":45604,\"blake2b-296\":45605,\"blake2b-304\":45606,\"blake2b-312\":45607,\"blake2b-320\":45608,\"blake2b-328\":45609,\"blake2b-336\":45610,\"blake2b-344\":45611,\"blake2b-352\":45612,\"blake2b-360\":45613,\"blake2b-368\":45614,\"blake2b-376\":45615,\"blake2b-384\":45616,\"blake2b-392\":45617,\"blake2b-400\":45618,\"blake2b-408\":45619,\"blake2b-416\":45620,\"blake2b-424\":45621,\"blake2b-432\":45622,\"blake2b-440\":45623,\"blake2b-448\":45624,\"blake2b-456\":45625,\"blake2b-464\":45626,\"blake2b-472\":45627,\"blake2b-480\":45628,\"blake2b-488\":45629,\"blake2b-496\":45630,\"blake2b-504\":45631,\"blake2b-512\":45632,\"blake2s-8\":45633,\"blake2s-16\":45634,\"blake2s-24\":45635,\"blake2s-32\":45636,\"blake2s-40\":45637,\"blake2s-48\":45638,\"blake2s-56\":45639,\"blake2s-64\":45640,\"blake2s-72\":45641,\"blake2s-80\":45642,\"blake2s-88\":45643,\"blake2s-96\":45644,\"blake2s-104\":45645,\"blake2s-112\":45646,\"blake2s-120\":45647,\"blake2s-128\":45648,\"blake2s-136\":45649,\"blake2s-144\":45650,\"blake2s-152\":45651,\"blake2s-160\":45652,\"blake2s-168\":45653,\"blake2s-176\":45654,\"blake2s-184\":45655,\"blake2s-192\":45656,\"blake2s-200\":45657,\"blake2s-208\":45658,\"blake2s-216\":45659,\"blake2s-224\":45660,\"blake2s-232\":45661,\"blake2s-240\":45662,\"blake2s-248\":45663,\"blake2s-256\":45664,\"skein256-8\":45825,\"skein256-16\":45826,\"skein256-24\":45827,\"skein256-32\":45828,\"skein256-40\":45829,\"skein256-48\":45830,\"skein256-56\":45831,\"skein256-64\":45832,\"skein256-72\":45833,\"skein256-80\":45834,\"skein256-88\":45835,\"skein256-96\":45836,\"skein256-104\":45837,\"skein256-112\":45838,\"skein256-120\":45839,\"skein256-128\":45840,\"skein256-136\":45841,\"skein256-144\":45842,\"skein256-152\":45843,\"skein256-160\":45844,\"skein256-168\":45845,\"skein256-176\":45846,\"skein256-184\":45847,\"skein256-192\":45848,\"skein256-200\":45849,\"skein256-208\":45850,\"skein256-216\":45851,\"skein256-224\":45852,\"skein256-232\":45853,\"skein256-240\":45854,\"skein256-248\":45855,\"skein256-256\":45856,\"skein512-8\":45857,\"skein512-16\":45858,\"skein512-24\":45859,\"skein512-32\":45860,\"skein512-40\":45861,\"skein512-48\":45862,\"skein512-56\":45863,\"skein512-64\":45864,\"skein512-72\":45865,\"skein512-80\":45866,\"skein512-88\":45867,\"skein512-96\":45868,\"skein512-104\":45869,\"skein512-112\":45870,\"skein512-120\":45871,\"skein512-128\":45872,\"skein512-136\":45873,\"skein512-144\":45874,\"skein512-152\":45875,\"skein512-160\":45876,\"skein512-168\":45877,\"skein512-176\":45878,\"skein512-184\":45879,\"skein512-192\":45880,\"skein512-200\":45881,\"skein512-208\":45882,\"skein512-216\":45883,\"skein512-224\":45884,\"skein512-232\":45885,\"skein512-240\":45886,\"skein512-248\":45887,\"skein512-256\":45888,\"skein512-264\":45889,\"skein512-272\":45890,\"skein512-280\":45891,\"skein512-288\":45892,\"skein512-296\":45893,\"skein512-304\":45894,\"skein512-312\":45895,\"skein512-320\":45896,\"skein512-328\":45897,\"skein512-336\":45898,\"skein512-344\":45899,\"skein512-352\":45900,\"skein512-360\":45901,\"skein512-368\":45902,\"skein512-376\":45903,\"skein512-384\":45904,\"skein512-392\":45905,\"skein512-400\":45906,\"skein512-408\":45907,\"skein512-416\":45908,\"skein512-424\":45909,\"skein512-432\":45910,\"skein512-440\":45911,\"skein512-448\":45912,\"skein512-456\":45913,\"skein512-464\":45914,\"skein512-472\":45915,\"skein512-480\":45916,\"skein512-488\":45917,\"skein512-496\":45918,\"skein512-504\":45919,\"skein512-512\":45920,\"skein1024-8\":45921,\"skein1024-16\":45922,\"skein1024-24\":45923,\"skein1024-32\":45924,\"skein1024-40\":45925,\"skein1024-48\":45926,\"skein1024-56\":45927,\"skein1024-64\":45928,\"skein1024-72\":45929,\"skein1024-80\":45930,\"skein1024-88\":45931,\"skein1024-96\":45932,\"skein1024-104\":45933,\"skein1024-112\":45934,\"skein1024-120\":45935,\"skein1024-128\":45936,\"skein1024-136\":45937,\"skein1024-144\":45938,\"skein1024-152\":45939,\"skein1024-160\":45940,\"skein1024-168\":45941,\"skein1024-176\":45942,\"skein1024-184\":45943,\"skein1024-192\":45944,\"skein1024-200\":45945,\"skein1024-208\":45946,\"skein1024-216\":45947,\"skein1024-224\":45948,\"skein1024-232\":45949,\"skein1024-240\":45950,\"skein1024-248\":45951,\"skein1024-256\":45952,\"skein1024-264\":45953,\"skein1024-272\":45954,\"skein1024-280\":45955,\"skein1024-288\":45956,\"skein1024-296\":45957,\"skein1024-304\":45958,\"skein1024-312\":45959,\"skein1024-320\":45960,\"skein1024-328\":45961,\"skein1024-336\":45962,\"skein1024-344\":45963,\"skein1024-352\":45964,\"skein1024-360\":45965,\"skein1024-368\":45966,\"skein1024-376\":45967,\"skein1024-384\":45968,\"skein1024-392\":45969,\"skein1024-400\":45970,\"skein1024-408\":45971,\"skein1024-416\":45972,\"skein1024-424\":45973,\"skein1024-432\":45974,\"skein1024-440\":45975,\"skein1024-448\":45976,\"skein1024-456\":45977,\"skein1024-464\":45978,\"skein1024-472\":45979,\"skein1024-480\":45980,\"skein1024-488\":45981,\"skein1024-496\":45982,\"skein1024-504\":45983,\"skein1024-512\":45984,\"skein1024-520\":45985,\"skein1024-528\":45986,\"skein1024-536\":45987,\"skein1024-544\":45988,\"skein1024-552\":45989,\"skein1024-560\":45990,\"skein1024-568\":45991,\"skein1024-576\":45992,\"skein1024-584\":45993,\"skein1024-592\":45994,\"skein1024-600\":45995,\"skein1024-608\":45996,\"skein1024-616\":45997,\"skein1024-624\":45998,\"skein1024-632\":45999,\"skein1024-640\":46000,\"skein1024-648\":46001,\"skein1024-656\":46002,\"skein1024-664\":46003,\"skein1024-672\":46004,\"skein1024-680\":46005,\"skein1024-688\":46006,\"skein1024-696\":46007,\"skein1024-704\":46008,\"skein1024-712\":46009,\"skein1024-720\":46010,\"skein1024-728\":46011,\"skein1024-736\":46012,\"skein1024-744\":46013,\"skein1024-752\":46014,\"skein1024-760\":46015,\"skein1024-768\":46016,\"skein1024-776\":46017,\"skein1024-784\":46018,\"skein1024-792\":46019,\"skein1024-800\":46020,\"skein1024-808\":46021,\"skein1024-816\":46022,\"skein1024-824\":46023,\"skein1024-832\":46024,\"skein1024-840\":46025,\"skein1024-848\":46026,\"skein1024-856\":46027,\"skein1024-864\":46028,\"skein1024-872\":46029,\"skein1024-880\":46030,\"skein1024-888\":46031,\"skein1024-896\":46032,\"skein1024-904\":46033,\"skein1024-912\":46034,\"skein1024-920\":46035,\"skein1024-928\":46036,\"skein1024-936\":46037,\"skein1024-944\":46038,\"skein1024-952\":46039,\"skein1024-960\":46040,\"skein1024-968\":46041,\"skein1024-976\":46042,\"skein1024-984\":46043,\"skein1024-992\":46044,\"skein1024-1000\":46045,\"skein1024-1008\":46046,\"skein1024-1016\":46047,\"skein1024-1024\":46048,\"holochain-adr-v0\":8417572,\"holochain-adr-v1\":8483108,\"holochain-key-v0\":9728292,\"holochain-key-v1\":9793828,\"holochain-sig-v0\":10645796,\"holochain-sig-v1\":10711332}");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function createError(err, code, props) {
  var key;

  if (!(err instanceof Error)) {
    throw new TypeError('Please pass an Error to err-code');
  }

  if (typeof code === 'object') {
    props = code;
  } else if (code != null) {
    err.code = code;
  }

  if (props) {
    for (key in props) {
      err[key] = props[key];
    }
  }

  return err;
}

module.exports = createError;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const utils = __webpack_require__(1).utils;

const map = utils.map;
/**
 * A datastore shim, that wraps around a given datastore, changing
 * the way keys look to the user, for example namespacing
 * keys, reversing them, etc.
 */

class KeyTransformDatastore {
  constructor(child, transform) {
    this.child = child;
    this.transform = transform;
  }

  open() {
    return this.child.open();
  }

  put(key, val) {
    return this.child.put(this.transform.convert(key), val);
  }

  get(key) {
    return this.child.get(this.transform.convert(key));
  }

  has(key) {
    return this.child.has(this.transform.convert(key));
  }

  delete(key) {
    return this.child.delete(this.transform.convert(key));
  }

  batch() {
    const b = this.child.batch();
    return {
      put: (key, value) => {
        b.put(this.transform.convert(key), value);
      },
      delete: key => {
        b.delete(this.transform.convert(key));
      },
      commit: () => {
        return b.commit();
      }
    };
  }

  query(q) {
    return map(this.child.query(q), e => {
      e.key = this.transform.invert(e.key);
      return e;
    });
  }

  close() {
    return this.child.close();
  }

}

module.exports = KeyTransformDatastore;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function withIs(Class, {
  className,
  symbolName
}) {
  const symbol = Symbol.for(symbolName);
  const ClassIsWrapper = {
    // The code below assigns the class wrapper to an object to trick
    // JavaScript engines to show the name of the extended class when
    // logging an instances.
    // We are assigning an anonymous class (class wrapper) to the object
    // with key `className` to keep the correct name.
    // If this is not supported it falls back to logging `ClassIsWrapper`.
    [className]: class extends Class {
      constructor(...args) {
        super(...args);
        Object.defineProperty(this, symbol, {
          value: true
        });
      }

      get [Symbol.toStringTag]() {
        return className;
      }

    }
  }[className];

  ClassIsWrapper["is".concat(className)] = obj => !!(obj && obj[symbol]);

  return ClassIsWrapper;
}

function withIsProto(Class, {
  className,
  symbolName,
  withoutNew
}) {
  const symbol = Symbol.for(symbolName);
  /* eslint-disable object-shorthand */

  const ClassIsWrapper = {
    [className]: function (...args) {
      if (withoutNew && !(this instanceof ClassIsWrapper)) {
        return new ClassIsWrapper(...args);
      }

      const _this = Class.call(this, ...args) || this;

      if (_this && !_this[symbol]) {
        Object.defineProperty(_this, symbol, {
          value: true
        });
      }

      return _this;
    }
  }[className];
  /* eslint-enable object-shorthand */

  ClassIsWrapper.prototype = Object.create(Class.prototype);
  ClassIsWrapper.prototype.constructor = ClassIsWrapper;
  Object.defineProperty(ClassIsWrapper.prototype, Symbol.toStringTag, {
    get() {
      return className;
    }

  });

  ClassIsWrapper["is".concat(className)] = obj => !!(obj && obj[symbol]);

  return ClassIsWrapper;
}

module.exports = withIs;
module.exports.proto = withIsProto;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Error raised when there is lock already in place when repo is being opened.
 */

class LockExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LockExistsError';
    this.code = LockExistsError.code;
  }

}

LockExistsError.code = 'ERR_LOCK_EXISTS';
exports.LockExistsError = LockExistsError;
/**
 * Error raised when requested item is not found.
 */

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.code = NotFoundError.code;
  }

}

NotFoundError.code = 'ERR_NOT_FOUND';
exports.NotFoundError = NotFoundError;
/**
 * Error raised when version of the stored repo is not compatible with version of this package.
 */

class InvalidRepoVersionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidRepoVersionError';
    this.code = InvalidRepoVersionError.code;
  }

}

InvalidRepoVersionError.code = 'ERR_INVALID_REPO_VERSION';
exports.InvalidRepoVersionError = InvalidRepoVersionError;
exports.ERR_REPO_NOT_INITIALIZED = 'ERR_REPO_NOT_INITIALIZED';
exports.ERR_REPO_ALREADY_OPEN = 'ERR_REPO_ALREADY_OPEN';
exports.ERR_REPO_ALREADY_CLOSED = 'ERR_REPO_ALREADY_CLOSED';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const mh = __webpack_require__(18);

const multibase = __webpack_require__(10);

const multicodec = __webpack_require__(79);

const codecs = __webpack_require__(4);

const CIDUtil = __webpack_require__(84);

const withIs = __webpack_require__(7);
/**
 * @typedef {Object} SerializedCID
 * @param {string} codec
 * @param {number} version
 * @param {Buffer} multihash
 */

/**
 * Test if the given input is a CID.
 * @function isCID
 * @memberof CID
 * @static
 * @param {any} other
 * @returns {bool}
 */

/**
 * Class representing a CID `<mbase><version><mcodec><mhash>`
 * , as defined in [ipld/cid](https://github.com/multiformats/cid).
 * @class CID
 */


class CID {
  /**
   * Create a new CID.
   *
   * The algorithm for argument input is roughly:
   * ```
   * if (cid)
   *   -> create a copy
   * else if (str)
   *   if (1st char is on multibase table) -> CID String
   *   else -> bs58 encoded multihash
   * else if (Buffer)
   *   if (1st byte is 0 or 1) -> CID
   *   else -> multihash
   * else if (Number)
   *   -> construct CID by parts
   * ```
   *
   * @param {string|Buffer|CID} version
   * @param {string} [codec]
   * @param {Buffer} [multihash]
   * @param {string} [multibaseName]
   *
   * @example
   * new CID(<version>, <codec>, <multihash>, <multibaseName>)
   * new CID(<cidStr>)
   * new CID(<cid.buffer>)
   * new CID(<multihash>)
   * new CID(<bs58 encoded multihash>)
   * new CID(<cid>)
   */
  constructor(version, codec, multihash, multibaseName) {
    if (_CID.isCID(version)) {
      // version is an exising CID instance
      const cid = version;
      this.version = cid.version;
      this.codec = cid.codec;
      this.multihash = Buffer.from(cid.multihash); // Default guard for when a CID < 0.7 is passed with no multibaseName

      this.multibaseName = cid.multibaseName || (cid.version === 0 ? 'base58btc' : 'base32');
      return;
    }

    if (typeof version === 'string') {
      // e.g. 'base32' or false
      const baseName = multibase.isEncoded(version);

      if (baseName) {
        // version is a CID String encoded with multibase, so v1
        const cid = multibase.decode(version);
        this.version = parseInt(cid.slice(0, 1).toString('hex'), 16);
        this.codec = multicodec.getCodec(cid.slice(1));
        this.multihash = multicodec.rmPrefix(cid.slice(1));
        this.multibaseName = baseName;
      } else {
        // version is a base58btc string multihash, so v0
        this.version = 0;
        this.codec = 'dag-pb';
        this.multihash = mh.fromB58String(version);
        this.multibaseName = 'base58btc';
      }

      CID.validateCID(this);
      Object.defineProperty(this, 'string', {
        value: version
      });
      return;
    }

    if (Buffer.isBuffer(version)) {
      const firstByte = version.slice(0, 1);
      const v = parseInt(firstByte.toString('hex'), 16);

      if (v === 1) {
        // version is a CID buffer
        const cid = version;
        this.version = v;
        this.codec = multicodec.getCodec(cid.slice(1));
        this.multihash = multicodec.rmPrefix(cid.slice(1));
        this.multibaseName = 'base32';
      } else {
        // version is a raw multihash buffer, so v0
        this.version = 0;
        this.codec = 'dag-pb';
        this.multihash = version;
        this.multibaseName = 'base58btc';
      }

      CID.validateCID(this);
      return;
    } // otherwise, assemble the CID from the parameters

    /**
     * @type {number}
     */


    this.version = version;
    /**
     * @type {string}
     */

    this.codec = codec;
    /**
     * @type {Buffer}
     */

    this.multihash = multihash;
    /**
     * @type {string}
     */

    this.multibaseName = multibaseName || (version === 0 ? 'base58btc' : 'base32');
    CID.validateCID(this);
  }
  /**
   * The CID as a `Buffer`
   *
   * @return {Buffer}
   * @readonly
   *
   * @memberOf CID
   */


  get buffer() {
    let buffer = this._buffer;

    if (!buffer) {
      if (this.version === 0) {
        buffer = this.multihash;
      } else if (this.version === 1) {
        buffer = Buffer.concat([Buffer.from('01', 'hex'), multicodec.getCodeVarint(this.codec), this.multihash]);
      } else {
        throw new Error('unsupported version');
      } // Cache this buffer so it doesn't have to be recreated


      Object.defineProperty(this, '_buffer', {
        value: buffer
      });
    }

    return buffer;
  }
  /**
   * Get the prefix of the CID.
   *
   * @returns {Buffer}
   * @readonly
   */


  get prefix() {
    return Buffer.concat([Buffer.from("0".concat(this.version), 'hex'), multicodec.getCodeVarint(this.codec), mh.prefix(this.multihash)]);
  }
  /**
   * Convert to a CID of version `0`.
   *
   * @returns {CID}
   */


  toV0() {
    if (this.codec !== 'dag-pb') {
      throw new Error('Cannot convert a non dag-pb CID to CIDv0');
    }

    const {
      name,
      length
    } = mh.decode(this.multihash);

    if (name !== 'sha2-256') {
      throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
    }

    if (length !== 32) {
      throw new Error('Cannot convert non 32 byte multihash CID to CIDv0');
    }

    return new _CID(0, this.codec, this.multihash);
  }
  /**
   * Convert to a CID of version `1`.
   *
   * @returns {CID}
   */


  toV1() {
    return new _CID(1, this.codec, this.multihash);
  }
  /**
   * Encode the CID into a string.
   *
   * @param {string} [base=this.multibaseName] - Base encoding to use.
   * @returns {string}
   */


  toBaseEncodedString(base = this.multibaseName) {
    if (this.string && base === this.multibaseName) {
      return this.string;
    }

    let str = null;

    if (this.version === 0) {
      if (base !== 'base58btc') {
        throw new Error('not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()');
      }

      str = mh.toB58String(this.multihash);
    } else if (this.version === 1) {
      str = multibase.encode(base, this.buffer).toString();
    } else {
      throw new Error('unsupported version');
    }

    if (base === this.multibaseName) {
      // cache the string value
      Object.defineProperty(this, 'string', {
        value: str
      });
    }

    return str;
  }
  /**
   * CID(QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n)
   *
   * @returns {String}
   */


  [Symbol.for('nodejs.util.inspect.custom')]() {
    return 'CID(' + this.toString() + ')';
  }

  toString(base) {
    return this.toBaseEncodedString(base);
  }
  /**
   * Serialize to a plain object.
   *
   * @returns {SerializedCID}
   */


  toJSON() {
    return {
      codec: this.codec,
      version: this.version,
      hash: this.multihash
    };
  }
  /**
   * Compare equality with another CID.
   *
   * @param {CID} other
   * @returns {bool}
   */


  equals(other) {
    return this.codec === other.codec && this.version === other.version && this.multihash.equals(other.multihash);
  }
  /**
   * Test if the given input is a valid CID object.
   * Throws if it is not.
   *
   * @param {any} other
   * @returns {void}
   */


  static validateCID(other) {
    const errorMsg = CIDUtil.checkCIDComponents(other);

    if (errorMsg) {
      throw new Error(errorMsg);
    }
  }

}

const _CID = withIs(CID, {
  className: 'CID',
  symbolName: '@ipld/js-cid/CID'
});

_CID.codecs = codecs;
module.exports = _CID;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 * @module Multibase
 */


const {
  Buffer
} = __webpack_require__(0);

const constants = __webpack_require__(68);

exports = module.exports = multibase;
exports.encode = encode;
exports.decode = decode;
exports.isEncoded = isEncoded;
exports.names = Object.freeze(Object.keys(constants.names));
exports.codes = Object.freeze(Object.keys(constants.codes));
/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be prefixed with multibase.
 * @memberof Multibase
 * @returns {Buffer}
 */

function multibase(nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer');
  }

  const base = getBase(nameOrCode);
  const codeBuf = Buffer.from(base.code);
  const name = base.name;
  validEncode(name, buf);
  return Buffer.concat([codeBuf, buf]);
}
/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be encoded.
 * @returns {Buffer}
 * @memberof Multibase
 */


function encode(nameOrCode, buf) {
  const base = getBase(nameOrCode);
  const name = base.name;
  return multibase(name, Buffer.from(base.encode(buf)));
}
/**
 * Takes a buffer or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Buffer|string} bufOrString
 * @returns {Buffer}
 * @memberof Multibase
 *
 */


function decode(bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString();
  }

  const code = bufOrString.substring(0, 1);
  bufOrString = bufOrString.substring(1, bufOrString.length);

  if (typeof bufOrString === 'string') {
    bufOrString = Buffer.from(bufOrString);
  }

  const base = getBase(code);
  return Buffer.from(base.decode(bufOrString.toString()));
}
/**
 * Is the given data multibase encoded?
 *
 * @param {Buffer|string} bufOrString
 * @returns {boolean}
 * @memberof Multibase
 */


function isEncoded(bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString();
  } // Ensure bufOrString is a string


  if (Object.prototype.toString.call(bufOrString) !== '[object String]') {
    return false;
  }

  const code = bufOrString.substring(0, 1);

  try {
    const base = getBase(code);
    return base.name;
  } catch (err) {
    return false;
  }
}
/**
 * @param {string} name
 * @param {Buffer} buf
 * @private
 * @returns {undefined}
 */


function validEncode(name, buf) {
  const base = getBase(name);
  base.decode(buf.toString());
}

function getBase(nameOrCode) {
  let base;

  if (constants.names[nameOrCode]) {
    base = constants.names[nameOrCode];
  } else if (constants.codes[nameOrCode]) {
    base = constants.codes[nameOrCode];
  } else {
    throw new Error('Unsupported encoding');
  }

  if (!base.isImplemented()) {
    throw new Error('Base ' + nameOrCode + ' is not implemented yet');
  }

  return base;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  encode: __webpack_require__(75),
  decode: __webpack_require__(76),
  encodingLength: __webpack_require__(77)
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = get;
/*
  const obj = {a: {aa: {aaa: 2}}, b: 4};

  get(obj, 'a.aa.aaa'); // 2
  get(obj, ['a', 'aa', 'aaa']); // 2

  get(obj, 'b.bb.bbb'); // undefined
  get(obj, ['b', 'bb', 'bbb']); // undefined

  get(obj.a, 'aa.aaa'); // 2
  get(obj.a, ['aa', 'aaa']); // 2

  get(obj.b, 'bb.bbb'); // undefined
  get(obj.b, ['bb', 'bbb']); // undefined

  get(obj.b, 'bb.bbb', 42); // 42
  get(obj.b, ['bb', 'bbb'], 42); // 42

  get(null, 'a'); // undefined
  get(undefined, ['a']); // undefined

  get(null, 'a', 42); // 42
  get(undefined, ['a'], 42); // 42

  const obj = {a: {}};
  const sym = Symbol();
  obj.a[sym] = 4;
  get(obj.a, sym); // 4
*/

function get(obj, propsArg, defaultValue) {
  if (!obj) {
    return defaultValue;
  }

  var props, prop;

  if (Array.isArray(propsArg)) {
    props = propsArg.slice(0);
  }

  if (typeof propsArg == 'string') {
    props = propsArg.split('.');
  }

  if (typeof propsArg == 'symbol') {
    props = [propsArg];
  }

  if (!Array.isArray(props)) {
    throw new Error('props arg must be an array, a string or a symbol');
  }

  while (props.length) {
    prop = props.shift();

    if (!obj) {
      return defaultValue;
    }

    obj = obj[prop];

    if (obj === undefined) {
      return defaultValue;
    }
  }

  return obj;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Exception raised when trying to revert migration that is not possible
 * to revert.
 */

class NonReversibleMigrationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NonReversibleMigrationError';
    this.code = 'ERR_NON_REVERSIBLE_MIGRATION';
    this.message = message;
  }

}

NonReversibleMigrationError.code = 'ERR_NON_REVERSIBLE_MIGRATION';
exports.NonReversibleMigrationError = NonReversibleMigrationError;
/**
 * Exception raised when repo is not initialized.
 */

class NotInitializedRepoError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotInitializedRepoError';
    this.code = 'ERR_NOT_INITIALIZED_REPO';
    this.message = message;
  }

}

NotInitializedRepoError.code = 'ERR_NOT_INITIALIZED_REPO';
exports.NotInitializedRepoError = NotInitializedRepoError;
/**
 * Exception raised when required parameter is not provided.
 */

class RequiredParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequiredParameterError';
    this.code = 'ERR_REQUIRED_PARAMETER';
    this.message = message;
  }

}

RequiredParameterError.code = 'ERR_REQUIRED_PARAMETER';
exports.RequiredParameterError = RequiredParameterError;
/**
 * Exception raised when value is not valid.
 */

class InvalidValueError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidValueError';
    this.code = 'ERR_INVALID_VALUE';
    this.message = message;
  }

}

InvalidValueError.code = 'ERR_INVALID_VALUE';
exports.InvalidValueError = InvalidValueError;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const {
  nanoid
} = __webpack_require__(38);

const withIs = __webpack_require__(7);

const pathSepS = '/';
const pathSepB = Buffer.from(pathSepS);
const pathSep = pathSepB[0];
/**
 * A Key represents the unique identifier of an object.
 * Our Key scheme is inspired by file systems and Google App Engine key model.
 * Keys are meant to be unique across a system. Keys are hierarchical,
 * incorporating more and more specific namespaces. Thus keys can be deemed
 * 'children' or 'ancestors' of other keys:
 * - `new Key('/Comedy')`
 * - `new Key('/Comedy/MontyPython')`
 * Also, every namespace can be parametrized to embed relevant object
 * information. For example, the Key `name` (most specific namespace) could
 * include the object type:
 * - `new Key('/Comedy/MontyPython/Actor:JohnCleese')`
 * - `new Key('/Comedy/MontyPython/Sketch:CheeseShop')`
 * - `new Key('/Comedy/MontyPython/Sketch:CheeseShop/Character:Mousebender')`
 *
 */

class Key {
  constructor(s, clean) {
    if (typeof s === 'string') {
      this._buf = Buffer.from(s);
    } else if (Buffer.isBuffer(s)) {
      this._buf = s;
    }

    if (clean == null) {
      clean = true;
    }

    if (clean) {
      this.clean();
    }

    if (this._buf.length === 0 || this._buf[0] !== pathSep) {
      throw new Error('Invalid key');
    }
  }
  /**
   * Convert to the string representation
   *
   * @param {string} [encoding='utf8']
   * @returns {string}
   */


  toString(encoding) {
    return this._buf.toString(encoding || 'utf8');
  }
  /**
   * Return the buffer representation of the key
   *
   * @returns {Buffer}
   */


  toBuffer() {
    return this._buf;
  }
  /**
   * @returns {String}
   */


  get [Symbol.toStringTag]() {
    return "[Key ".concat(this.toString(), "]");
  }
  /**
   * Constructs a key out of a namespace array.
   *
   * @param {Array<string>} list
   * @returns {Key}
   *
   * @example
   * Key.withNamespaces(['one', 'two'])
   * // => Key('/one/two')
   *
   */


  static withNamespaces(list) {
    return new _Key(list.join(pathSepS));
  }
  /**
   * Returns a randomly (uuid) generated key.
   *
   * @returns {Key}
   *
   * @example
   * Key.random()
   * // => Key('/f98719ea086343f7b71f32ea9d9d521d')
   *
   */


  static random() {
    return new _Key(nanoid().replace(/-/g, ''));
  }
  /**
   * Cleanup the current key
   *
   * @returns {void}
   */


  clean() {
    if (!this._buf || this._buf.length === 0) {
      this._buf = Buffer.from(pathSepS);
    }

    if (this._buf[0] !== pathSep) {
      this._buf = Buffer.concat([pathSepB, this._buf]);
    } // normalize does not remove trailing slashes


    while (this._buf.length > 1 && this._buf[this._buf.length - 1] === pathSep) {
      this._buf = this._buf.slice(0, -1);
    }
  }
  /**
   * Check if the given key is sorted lower than ourself.
   *
   * @param {Key} key
   * @returns {bool}
   */


  less(key) {
    const list1 = this.list();
    const list2 = key.list();

    for (let i = 0; i < list1.length; i++) {
      if (list2.length < i + 1) {
        return false;
      }

      const c1 = list1[i];
      const c2 = list2[i];

      if (c1 < c2) {
        return true;
      } else if (c1 > c2) {
        return false;
      }
    }

    return list1.length < list2.length;
  }
  /**
   * Returns the key with all parts in reversed order.
   *
   * @returns {Key}
   *
   * @example
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').reverse()
   * // => Key('/Actor:JohnCleese/MontyPython/Comedy')
   */


  reverse() {
    return Key.withNamespaces(this.list().slice().reverse());
  }
  /**
   * Returns the `namespaces` making up this Key.
   *
   * @returns {Array<string>}
   */


  namespaces() {
    return this.list();
  }
  /** Returns the "base" namespace of this key.
   *
   * @returns {string}
   *
   * @example
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').baseNamespace()
   * // => 'Actor:JohnCleese'
   *
   */


  baseNamespace() {
    const ns = this.namespaces();
    return ns[ns.length - 1];
  }
  /**
   * Returns the `list` representation of this key.
   *
   * @returns {Array<string>}
   *
   * @example
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').list()
   * // => ['Comedy', 'MontyPythong', 'Actor:JohnCleese']
   *
   */


  list() {
    return this.toString().split(pathSepS).slice(1);
  }
  /**
   * Returns the "type" of this key (value of last namespace).
   *
   * @returns {string}
   *
   * @example
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').type()
   * // => 'Actor'
   *
   */


  type() {
    return namespaceType(this.baseNamespace());
  }
  /**
   * Returns the "name" of this key (field of last namespace).
   *
   * @returns {string}
   *
   * @example
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').name()
   * // => 'JohnCleese'
   */


  name() {
    return namespaceValue(this.baseNamespace());
  }
  /**
   * Returns an "instance" of this type key (appends value to namespace).
   *
   * @param {string} s
   * @returns {Key}
   *
   * @example
   * new Key('/Comedy/MontyPython/Actor').instance('JohnClesse')
   * // => Key('/Comedy/MontyPython/Actor:JohnCleese')
   */


  instance(s) {
    return new _Key(this.toString() + ':' + s);
  }
  /**
   * Returns the "path" of this key (parent + type).
   *
   * @returns {Key}
   *
   * @example
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').path()
   * // => Key('/Comedy/MontyPython/Actor')
   *
   */


  path() {
    let p = this.parent().toString();

    if (!p.endsWith(pathSepS)) {
      p += pathSepS;
    }

    p += this.type();
    return new _Key(p);
  }
  /**
   * Returns the `parent` Key of this Key.
   *
   * @returns {Key}
   *
   * @example
   * new Key("/Comedy/MontyPython/Actor:JohnCleese").parent()
   * // => Key("/Comedy/MontyPython")
   *
   */


  parent() {
    const list = this.list();

    if (list.length === 1) {
      return new _Key(pathSepS);
    }

    return new _Key(list.slice(0, -1).join(pathSepS));
  }
  /**
   * Returns the `child` Key of this Key.
   *
   * @param {Key} key
   * @returns {Key}
   *
   * @example
   * new Key('/Comedy/MontyPython').child(new Key('Actor:JohnCleese'))
   * // => Key('/Comedy/MontyPython/Actor:JohnCleese')
   *
   */


  child(key) {
    if (this.toString() === pathSepS) {
      return key;
    } else if (key.toString() === pathSepS) {
      return this;
    }

    return new _Key(this.toString() + key.toString(), false);
  }
  /**
   * Returns whether this key is a prefix of `other`
   *
   * @param {Key} other
   * @returns {bool}
   *
   * @example
   * new Key('/Comedy').isAncestorOf('/Comedy/MontyPython')
   * // => true
   *
   */


  isAncestorOf(other) {
    if (other.toString() === this.toString()) {
      return false;
    }

    return other.toString().startsWith(this.toString());
  }
  /**
   * Returns whether this key is a contains another as prefix.
   *
   * @param {Key} other
   * @returns {bool}
   *
   * @example
   * new Key('/Comedy/MontyPython').isDecendantOf('/Comedy')
   * // => true
   *
   */


  isDecendantOf(other) {
    if (other.toString() === this.toString()) {
      return false;
    }

    return this.toString().startsWith(other.toString());
  }
  /**
   * Returns wether this key has only one namespace.
   *
   * @returns {bool}
   *
   */


  isTopLevel() {
    return this.list().length === 1;
  }
  /**
   * Concats one or more Keys into one new Key.
   *
   * @param {Array<Key>} keys
   * @returns {Key}
   */


  concat(...keys) {
    return Key.withNamespaces([...this.namespaces(), ...flatten(keys.map(key => key.namespaces()))]);
  }

}
/**
 * The first component of a namespace. `foo` in `foo:bar`
 *
 * @param {string} ns
 * @returns {string}
 */


function namespaceType(ns) {
  const parts = ns.split(':');

  if (parts.length < 2) {
    return '';
  }

  return parts.slice(0, -1).join(':');
}
/**
 * The last component of a namespace, `baz` in `foo:bar:baz`.
 *
 * @param {string} ns
 * @returns {string}
 */


function namespaceValue(ns) {
  const parts = ns.split(':');
  return parts[parts.length - 1];
}
/**
 * Flatten array of arrays (only one level)
 * @param {Array<Array>} arr
 * @return {*}
 */


function flatten(arr) {
  return [].concat(...arr);
}

const _Key = withIs(Key, {
  className: 'Key',
  symbolName: '@ipfs/interface-datastore/key'
});

module.exports = _Key;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

const tempdir = __webpack_require__(40);

exports.filter = (iterable, filterer) => {
  return _wrapAsyncGenerator(function* () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = _asyncIterator(iterable), _step, _value; _step = yield _awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield _awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
        const value = _value;
        const keep = yield _awaitAsyncGenerator(filterer(value));
        if (!keep) continue;
        yield value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          yield _awaitAsyncGenerator(_iterator.return());
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  })();
}; // Not just sort, because the sorter is given all the values and should return
// them all sorted


exports.sortAll = (iterable, sorter) => {
  return _wrapAsyncGenerator(function* () {
    let values = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;

    var _iteratorError2;

    try {
      for (var _iterator2 = _asyncIterator(iterable), _step2, _value2; _step2 = yield _awaitAsyncGenerator(_iterator2.next()), _iteratorNormalCompletion2 = _step2.done, _value2 = yield _awaitAsyncGenerator(_step2.value), !_iteratorNormalCompletion2; _iteratorNormalCompletion2 = true) {
        const value = _value2;
        values.push(value);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          yield _awaitAsyncGenerator(_iterator2.return());
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    values = yield _awaitAsyncGenerator(sorter(values));

    for (const value of values) yield value;
  })();
};

exports.take = (iterable, n) => {
  return _wrapAsyncGenerator(function* () {
    if (n <= 0) return;
    let i = 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;

    var _iteratorError3;

    try {
      for (var _iterator3 = _asyncIterator(iterable), _step3, _value3; _step3 = yield _awaitAsyncGenerator(_iterator3.next()), _iteratorNormalCompletion3 = _step3.done, _value3 = yield _awaitAsyncGenerator(_step3.value), !_iteratorNormalCompletion3; _iteratorNormalCompletion3 = true) {
        const value = _value3;
        yield value;
        i++;
        if (i >= n) return;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          yield _awaitAsyncGenerator(_iterator3.return());
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  })();
};

exports.map = (iterable, mapper) => {
  return _wrapAsyncGenerator(function* () {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;

    var _iteratorError4;

    try {
      for (var _iterator4 = _asyncIterator(iterable), _step4, _value4; _step4 = yield _awaitAsyncGenerator(_iterator4.next()), _iteratorNormalCompletion4 = _step4.done, _value4 = yield _awaitAsyncGenerator(_step4.value), !_iteratorNormalCompletion4; _iteratorNormalCompletion4 = true) {
        const value = _value4;
        yield mapper(value);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          yield _awaitAsyncGenerator(_iterator4.return());
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  })();
};

exports.replaceStartWith = function (s, r) {
  const matcher = new RegExp('^' + r);
  return s.replace(matcher, '');
};

exports.tmpdir = tempdir;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const errcode = __webpack_require__(5);

module.exports.dbOpenFailedError = err => {
  err = err || new Error('Cannot open database');
  return errcode(err, 'ERR_DB_OPEN_FAILED');
};

module.exports.dbDeleteFailedError = err => {
  err = err || new Error('Delete failed');
  return errcode(err, 'ERR_DB_DELETE_FAILED');
};

module.exports.dbWriteFailedError = err => {
  err = err || new Error('Write failed');
  return errcode(err, 'ERR_DB_WRITE_FAILED');
};

module.exports.notFoundError = err => {
  err = err || new Error('Not Found');
  return errcode(err, 'ERR_NOT_FOUND');
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* @flow */


const Key = __webpack_require__(1).Key;

const readme = __webpack_require__(63); // eslint-disable-next-line

/*:: import type {Datastore, Callback} from 'interface-datastore'

export interface ShardV1 {
  name: string;
  param: number;
  fun(string): string;
  toString(): string;
}
*/


const PREFIX = exports.PREFIX = '/repo/flatfs/shard/';
const SHARDING_FN = exports.SHARDING_FN = 'SHARDING';
exports.README_FN = '_README';

class Shard {
  /* :: name: string */

  /* :: param: number */

  /* :: _padding: string */
  constructor(param
  /* : number */
  ) {
    this.param = param;
  }

  fun(str
  /* : string */
  )
  /* : string */
  {
    throw new Error('implement me');
  }

  toString()
  /* : string */
  {
    return "".concat(PREFIX, "v1/").concat(this.name, "/").concat(this.param);
  }

}

class Prefix extends Shard {
  constructor(prefixLen
  /* : number */
  ) {
    super(prefixLen);
    this._padding = ''.padStart(prefixLen, '_');
    this.name = 'prefix';
  }

  fun(noslash
  /* : string */
  )
  /* : string */
  {
    return (noslash + this._padding).slice(0, this.param);
  }

}

class Suffix extends Shard {
  constructor(suffixLen
  /* : number */
  ) {
    super(suffixLen);
    this._padding = ''.padStart(suffixLen, '_');
    this.name = 'suffix';
  }

  fun(noslash
  /* : string */
  )
  /* : string */
  {
    const s = this._padding + noslash;
    return s.slice(s.length - this.param);
  }

}

class NextToLast extends Shard {
  constructor(suffixLen
  /* : number */
  ) {
    super(suffixLen);
    this._padding = ''.padStart(suffixLen + 1, '_');
    this.name = 'next-to-last';
  }

  fun(noslash
  /* : string */
  )
  /* : string */
  {
    const s = this._padding + noslash;
    const offset = s.length - this.param - 1;
    return s.slice(offset, offset + this.param);
  }

}
/**
 * Convert a given string to the matching sharding function.
 *
 * @param {string} str
 * @returns {ShardV1}
 */


function parseShardFun(str
/* : string */
) {
  str = str.trim();

  if (str.length === 0) {
    throw new Error('empty shard string');
  }

  if (!str.startsWith(PREFIX)) {
    throw new Error("invalid or no path prefix: ".concat(str));
  }

  const parts = str.slice(PREFIX.length).split('/');
  const version = parts[0];

  if (version !== 'v1') {
    throw new Error("expect 'v1' version, got '".concat(version, "'"));
  }

  const name = parts[1];

  if (!parts[2]) {
    throw new Error('missing param');
  }

  const param = parseInt(parts[2], 10);

  switch (name) {
    case 'prefix':
      return new Prefix(param);

    case 'suffix':
      return new Suffix(param);

    case 'next-to-last':
      return new NextToLast(param);

    default:
      throw new Error("unkown sharding function: ".concat(name));
  }
}

exports.readShardFun = async (path
/* : string */
, store) =>
/* : Promise<ShardV1> */
{
  const key = new Key(path).child(new Key(SHARDING_FN));
  const get = typeof store.getRaw === 'function' ? store.getRaw.bind(store) : store.get.bind(store);
  const res = await get(key);
  return parseShardFun((res || '').toString().trim());
};

exports.readme = readme;
exports.parseShardFun = parseShardFun;
exports.Prefix = Prefix;
exports.Suffix = Suffix;
exports.NextToLast = NextToLast;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Multihash implementation in JavaScript.
 *
 * @module multihash
 */


const {
  Buffer
} = __webpack_require__(0);

const multibase = __webpack_require__(10);

const varint = __webpack_require__(11);

const cs = __webpack_require__(78);

exports.names = cs.names;
exports.codes = cs.codes;
exports.defaultLengths = cs.defaultLengths;
/**
 * Convert the given multihash to a hex encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */

exports.toHexString = function toHexString(hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer');
  }

  return hash.toString('hex');
};
/**
 * Convert the given hex encoded string to a multihash.
 *
 * @param {string} hash
 * @returns {Buffer}
 */


exports.fromHexString = function fromHexString(hash) {
  return Buffer.from(hash, 'hex');
};
/**
 * Convert the given multihash to a base58 encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */


exports.toB58String = function toB58String(hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer');
  }

  return multibase.encode('base58btc', hash).toString().slice(1);
};
/**
 * Convert the given base58 encoded string to a multihash.
 *
 * @param {string|Buffer} hash
 * @returns {Buffer}
 */


exports.fromB58String = function fromB58String(hash) {
  let encoded = hash;

  if (Buffer.isBuffer(hash)) {
    encoded = hash.toString();
  }

  return multibase.decode('z' + encoded);
};
/**
 * Decode a hash from the given multihash.
 *
 * @param {Buffer} buf
 * @returns {{code: number, name: string, length: number, digest: Buffer}} result
 */


exports.decode = function decode(buf) {
  if (!Buffer.isBuffer(buf)) {
    throw new Error('multihash must be a Buffer');
  }

  if (buf.length < 3) {
    throw new Error('multihash too short. must be > 3 bytes.');
  }

  const code = varint.decode(buf);

  if (!exports.isValidCode(code)) {
    throw new Error("multihash unknown function code: 0x".concat(code.toString(16)));
  }

  buf = buf.slice(varint.decode.bytes);
  const len = varint.decode(buf);

  if (len < 1) {
    throw new Error("multihash invalid length: 0x".concat(len.toString(16)));
  }

  buf = buf.slice(varint.decode.bytes);

  if (buf.length !== len) {
    throw new Error("multihash length inconsistent: 0x".concat(buf.toString('hex')));
  }

  return {
    code: code,
    name: cs.codes[code],
    length: len,
    digest: buf
  };
};
/**
 *  Encode a hash digest along with the specified function code.
 *
 * > **Note:** the length is derived from the length of the digest itself.
 *
 * @param {Buffer} digest
 * @param {string|number} code
 * @param {number} [length]
 * @returns {Buffer}
 */


exports.encode = function encode(digest, code, length) {
  if (!digest || code === undefined) {
    throw new Error('multihash encode requires at least two args: digest, code');
  } // ensure it's a hashfunction code.


  const hashfn = exports.coerceCode(code);

  if (!Buffer.isBuffer(digest)) {
    throw new Error('digest should be a Buffer');
  }

  if (length == null) {
    length = digest.length;
  }

  if (length && digest.length !== length) {
    throw new Error('digest length should be equal to specified length.');
  }

  return Buffer.concat([Buffer.from(varint.encode(hashfn)), Buffer.from(varint.encode(length)), digest]);
};
/**
 * Converts a hash function name into the matching code.
 * If passed a number it will return the number if it's a valid code.
 * @param {string|number} name
 * @returns {number}
 */


exports.coerceCode = function coerceCode(name) {
  let code = name;

  if (typeof name === 'string') {
    if (cs.names[name] === undefined) {
      throw new Error("Unrecognized hash function named: ".concat(name));
    }

    code = cs.names[name];
  }

  if (typeof code !== 'number') {
    throw new Error("Hash function code should be a number. Got: ".concat(code));
  }

  if (cs.codes[code] === undefined && !exports.isAppCode(code)) {
    throw new Error("Unrecognized function code: ".concat(code));
  }

  return code;
};
/**
 * Checks wether a code is part of the app range
 *
 * @param {number} code
 * @returns {boolean}
 */


exports.isAppCode = function appCode(code) {
  return code > 0 && code < 0x10;
};
/**
 * Checks whether a multihash code is valid.
 *
 * @param {number} code
 * @returns {boolean}
 */


exports.isValidCode = function validCode(code) {
  if (exports.isAppCode(code)) {
    return true;
  }

  if (cs.codes[code]) {
    return true;
  }

  return false;
};
/**
 * Check if the given buffer is a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */


function validate(multihash) {
  exports.decode(multihash); // throws if bad.
}

exports.validate = validate;
/**
 * Returns a prefix from a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */

exports.prefix = function prefix(multihash) {
  validate(multihash);
  return multihash.slice(0, 2);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const varint = __webpack_require__(11);

const {
  Buffer
} = __webpack_require__(0);

module.exports = {
  numberToBuffer,
  bufferToNumber,
  varintBufferEncode,
  varintBufferDecode,
  varintEncode
};

function bufferToNumber(buf) {
  return parseInt(buf.toString('hex'), 16);
}

function numberToBuffer(num) {
  let hexString = num.toString(16);

  if (hexString.length % 2 === 1) {
    hexString = '0' + hexString;
  }

  return Buffer.from(hexString, 'hex');
}

function varintBufferEncode(input) {
  return Buffer.from(varint.encode(bufferToNumber(input)));
}

function varintBufferDecode(input) {
  return numberToBuffer(varint.decode(input));
}

function varintEncode(num) {
  return Buffer.from(varint.encode(num));
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Key
} = __webpack_require__(1);

const CID = __webpack_require__(9);

const multibase = __webpack_require__(10);
/**
 * Transform a cid to the appropriate datastore key.
 *
 * @param {CID} cid
 * @returns {Key}
 */


exports.cidToKey = cid => {
  return new Key('/' + multibase.encode('base32', cid.buffer).toString().slice(1).toUpperCase(), false);
};
/**
 * Transform a datastore Key instance to a CID
 *
 * @param {Key} key
 * @returns {CID}
 */


exports.keyToCid = key => {
  return new CID(multibase.decode('b' + key.toString().slice(1).toLowerCase()));
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const errors = __webpack_require__(8);

const debug = __webpack_require__(2);

const log = debug('repo:lock');
const lockFile = 'repo.lock';
const LOCKS = {};
/**
 * Lock the repo in the given dir.
 *
 * @param {string} dir
 * @returns {Promise<Object>}
 */

exports.lock = async dir => {
  // eslint-disable-line require-await
  const file = dir + '/' + lockFile;
  log('locking %s', file);

  if (LOCKS[file] === true) {
    throw new errors.LockExistsError("Lock already being held for file: ".concat(file));
  }

  LOCKS[file] = true;
  const closer = {
    async close() {
      // eslint-disable-line require-await
      if (LOCKS[file]) {
        delete LOCKS[file];
      }
    }

  };
  return closer;
};
/**
 * Check if the repo in the given directory is locked.
 *
 * @param {string} dir
 * @returns {bool}
 */


exports.locked = async dir => {
  // eslint-disable-line require-await
  const file = dir + '/' + lockFile;
  log("checking lock: ".concat(file));
  return Boolean(LOCKS[file]);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

const _get = __webpack_require__(12);

const debug = __webpack_require__(2);

const Big = __webpack_require__(27);

const errcode = __webpack_require__(5);

const migrator = __webpack_require__(28);

const bytes = __webpack_require__(43);

const pathJoin = __webpack_require__(44);

const constants = __webpack_require__(45);

const backends = __webpack_require__(46);

const version = __webpack_require__(47);

const config = __webpack_require__(48);

const spec = __webpack_require__(56);

const apiAddr = __webpack_require__(59);

const blockstore = __webpack_require__(60);

const defaultOptions = __webpack_require__(85);

const defaultDatastore = __webpack_require__(86);

const ERRORS = __webpack_require__(8);

const log = debug('repo');
const noLimit = Number.MAX_SAFE_INTEGER;
const AUTO_MIGRATE_CONFIG_KEY = 'repoAutoMigrate';
const lockers = {
  memory: __webpack_require__(21),
  fs: __webpack_require__(21)
};
/**
 * IpfsRepo implements all required functionality to read and write to an ipfs repo.
 *
 */

class IpfsRepo {
  /**
   * @param {string} repoPath - path where the repo is stored
   * @param {object} options - Configuration
   */
  constructor(repoPath, options) {
    if (typeof repoPath !== 'string') {
      throw new Error('missing repoPath');
    }

    this.options = buildOptions(options);
    this.closed = true;
    this.path = repoPath;
    this._locker = this._getLocker();
    this.root = backends.create('root', this.path, this.options);
    this.version = version(this.root);
    this.config = config(this.root);
    this.spec = spec(this.root);
    this.apiAddr = apiAddr(this.root);
  }
  /**
   * Initialize a new repo.
   *
   * @param {Object} config - config to write into `config`.
   * @returns {Promise<void>}
   */


  async init(config) {
    log('initializing at: %s', this.path);
    await this._openRoot();
    await this.config.set(buildConfig(config));
    await this.spec.set(buildDatastoreSpec(config));
    await this.version.set(constants.repoVersion);
  }
  /**
   * Check if the repo is already initialized.
   * @returns {Promise<Boolean>}
   */


  async isInitialized() {
    if (!this.closed) {
      // repo is open, must be initialized
      return true;
    }

    try {
      // have to open the root datastore in the browser before
      // we can check whether it's been initialized
      await this._openRoot();
      await this._checkInitialized();
      await this.root.close();
      return true;
    } catch (err) {
      // FIXME: do not use exceptions for flow control
      return false;
    }
  }
  /**
   * Open the repo. If the repo is already open an error will be thrown.
   * If the repo is not initialized it will throw an error.
   *
   * @returns {Promise<void>}
   */


  async open() {
    if (!this.closed) {
      throw errcode(new Error('repo is already open'), ERRORS.ERR_REPO_ALREADY_OPEN);
    }

    log('opening at: %s', this.path); // check if the repo is already initialized

    try {
      await this._openRoot();
      await this._checkInitialized();
      this.lockfile = await this._openLock(this.path);
      log('acquired repo.lock');
      log('creating datastore');
      this.datastore = backends.create('datastore', pathJoin(this.path, 'datastore'), this.options);
      await this.datastore.open();
      log('creating blocks');
      const blocksBaseStore = backends.create('blocks', pathJoin(this.path, 'blocks'), this.options);
      await blocksBaseStore.open();
      this.blocks = await blockstore(blocksBaseStore, this.options.storageBackendOptions.blocks);
      log('creating keystore');
      this.keys = backends.create('keys', pathJoin(this.path, 'keys'), this.options);
      await this.keys.open();
      const isCompatible = await this.version.check(constants.repoVersion);

      if (!isCompatible) {
        if (await this._isAutoMigrationEnabled()) {
          await this._migrate(constants.repoVersion);
        } else {
          throw new ERRORS.InvalidRepoVersionError('Incompatible repo versions. Automatic migrations disabled. Please migrate the repo manually.');
        }
      }

      this.closed = false;
      log('all opened');
    } catch (err) {
      if (this.lockfile) {
        try {
          await this._closeLock();
          this.lockfile = null;
        } catch (err2) {
          log('error removing lock', err2);
        }
      }

      throw err;
    }
  }
  /**
   * Returns the repo locker to be used. Null will be returned if no locker is requested
   *
   * @private
   * @returns {Locker}
   */


  _getLocker() {
    if (typeof this.options.lock === 'string') {
      if (!lockers[this.options.lock]) {
        throw new Error('Unknown lock type: ' + this.options.lock);
      }

      return lockers[this.options.lock];
    }

    if (!this.options.lock) {
      throw new Error('No lock provided');
    }

    return this.options.lock;
  }
  /**
   * Opens the root backend, catching and ignoring an 'Already open' error
   * @returns {Promise}
   */


  async _openRoot() {
    try {
      await this.root.open();
    } catch (err) {
      if (err.message !== 'Already open') {
        throw err;
      }
    }
  }
  /**
   * Creates a lock on the repo if a locker is specified. The lockfile object will
   * be returned in the callback if one has been created.
   *
   * @param {string} path
   * @returns {Promise<lockfile>}
   */


  async _openLock(path) {
    const lockfile = await this._locker.lock(path);

    if (typeof lockfile.close !== 'function') {
      throw errcode(new Error('Locks must have a close method'), 'ERR_NO_CLOSE_FUNCTION');
    }

    return lockfile;
  }
  /**
   * Closes the lock on the repo
   *
   * @returns {Promise<void>}
   */


  _closeLock() {
    return this.lockfile.close();
  }
  /**
   * Check if the repo is already initialized.
   * @private
   * @returns {Promise}
   */


  async _checkInitialized() {
    log('init check');
    let config;

    try {
      [config] = await Promise.all([this.config.exists(), this.spec.exists(), this.version.exists()]);
    } catch (err) {
      if (err.code === 'ERR_NOT_FOUND') {
        throw errcode(new Error('repo is not initialized yet'), ERRORS.ERR_REPO_NOT_INITIALIZED, {
          path: this.path
        });
      }

      throw err;
    }

    if (!config) {
      throw errcode(new Error('repo is not initialized yet'), ERRORS.ERR_REPO_NOT_INITIALIZED, {
        path: this.path
      });
    }
  }
  /**
   * Close the repo and cleanup.
   *
   * @returns {Promise<void>}
   */


  async close() {
    if (this.closed) {
      throw errcode(new Error('repo is already closed'), ERRORS.ERR_REPO_ALREADY_CLOSED);
    }

    log('closing at: %s', this.path);

    try {
      // Delete api, ignoring irrelevant errors
      await this.apiAddr.delete();
    } catch (err) {
      if (err.code !== ERRORS.ERR_REPO_NOT_INITIALIZED && !err.message.startsWith('ENOENT')) {
        throw err;
      }
    }

    await Promise.all([this.root, this.blocks, this.keys, this.datastore].map(store => store.close()));
    log('unlocking');
    this.closed = true;
    await this._closeLock();
    this.lockfile = null;
  }
  /**
   * Check if a repo exists.
   *
   * @returns {Promise<bool>}
   */


  async exists() {
    // eslint-disable-line require-await
    return this.version.exists();
  }
  /**
   * Get repo status.
   *
   * @returns {Object}
   */


  async stat() {
    const [storageMax, blocks, version, datastore, keys] = await Promise.all([this._storageMaxStat(), this._blockStat(), this.version.get(), getSize(this.datastore), getSize(this.keys)]);
    const size = blocks.size.plus(datastore).plus(keys);
    return {
      repoPath: this.path,
      storageMax,
      version: version,
      numObjects: blocks.count,
      repoSize: size
    };
  }

  async _isAutoMigrationEnabled() {
    if (this.options.autoMigrate !== undefined) {
      return this.options.autoMigrate;
    }

    let autoMigrateConfig;

    try {
      autoMigrateConfig = await this.config.get(AUTO_MIGRATE_CONFIG_KEY);
    } catch (e) {
      if (e.code === ERRORS.NotFoundError.code) {
        autoMigrateConfig = true; // Config's default value is True
      } else {
        throw e;
      }
    }

    return autoMigrateConfig;
  }

  async _migrate(toVersion) {
    const currentRepoVersion = await this.version.get();

    if (currentRepoVersion > toVersion) {
      log('reverting to version ' + toVersion);
      return migrator.revert(this.path, toVersion, {
        ignoreLock: true,
        repoOptions: this.options
      });
    } else {
      log('migrating to version ' + toVersion);
      return migrator.migrate(this.path, toVersion, {
        ignoreLock: true,
        repoOptions: this.options
      });
    }
  }

  async _storageMaxStat() {
    try {
      const max = await this.config.get('Datastore.StorageMax');
      return new Big(bytes(max));
    } catch (err) {
      return new Big(noLimit);
    }
  }

  async _blockStat() {
    let count = new Big(0);
    let size = new Big(0);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = _asyncIterator(this.blocks.query({})), _step, _value; _step = await _iterator.next(), _iteratorNormalCompletion = _step.done, _value = await _step.value, !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
        const block = _value;
        count = count.plus(1);
        size = size.plus(block.value.byteLength).plus(block.key._buf.byteLength);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          await _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return {
      count,
      size
    };
  }

}

async function getSize(queryFn) {
  const sum = new Big(0);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;

  var _iteratorError2;

  try {
    for (var _iterator2 = _asyncIterator(queryFn.query({})), _step2, _value2; _step2 = await _iterator2.next(), _iteratorNormalCompletion2 = _step2.done, _value2 = await _step2.value, !_iteratorNormalCompletion2; _iteratorNormalCompletion2 = true) {
      const block = _value2;
      sum.plus(block.value.byteLength).plus(block.key._buf.byteLength);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        await _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return sum;
}

module.exports = IpfsRepo;
module.exports.utils = {
  blockstore: __webpack_require__(20)
};
module.exports.repoVersion = constants.repoVersion;
module.exports.errors = ERRORS;

function buildOptions(_options) {
  const options = Object.assign({}, defaultOptions, _options);
  options.storageBackends = Object.assign({}, defaultOptions.storageBackends, options.storageBackends);
  options.storageBackendOptions = Object.assign({}, defaultOptions.storageBackendOptions, options.storageBackendOptions);
  return options;
} // TODO this should come from js-ipfs instead


function buildConfig(_config) {
  _config.datastore = Object.assign({}, defaultDatastore, _get(_config, 'datastore', {}));
  return _config;
}

function buildDatastoreSpec(_config) {
  const spec = Object.assign({}, defaultDatastore.Spec, _get(_config, 'datastore.Spec', {}));
  return {
    type: spec.type,
    mounts: spec.mounts.map(mounting => ({
      mountpoint: mounting.mountpoint,
      type: mounting.child.type,
      path: mounting.child.path,
      shardFunc: mounting.child.shardFunc
    }))
  };
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(26);
  Object.keys(env).forEach(key => {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    let hash = 0;

    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    let prevTime;

    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      const self = debug; // Set `diff` timestamp

      const curr = Number(new Date());
      const ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        const formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          const val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    const index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    const len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      const instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */


  function disable() {
    const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
    createDebug.enable('');
    return namespaces;
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    let i;
    let len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */


  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;

    case 'weeks':
    case 'week':
    case 'w':
      return n * w;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }

  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }

  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }

  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }

  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }

  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }

  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }

  return ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

;

(function (globalObject) {
  'use strict';
  /*
   *      bignumber.js v9.0.0
   *      A JavaScript library for arbitrary-precision arithmetic.
   *      https://github.com/MikeMcl/bignumber.js
   *      Copyright (c) 2019 Michael Mclaughlin <M8ch88l@gmail.com>
   *      MIT Licensed.
   *
   *      BigNumber.prototype methods     |  BigNumber methods
   *                                      |
   *      absoluteValue            abs    |  clone
   *      comparedTo                      |  config               set
   *      decimalPlaces            dp     |      DECIMAL_PLACES
   *      dividedBy                div    |      ROUNDING_MODE
   *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
   *      exponentiatedBy          pow    |      RANGE
   *      integerValue                    |      CRYPTO
   *      isEqualTo                eq     |      MODULO_MODE
   *      isFinite                        |      POW_PRECISION
   *      isGreaterThan            gt     |      FORMAT
   *      isGreaterThanOrEqualTo   gte    |      ALPHABET
   *      isInteger                       |  isBigNumber
   *      isLessThan               lt     |  maximum              max
   *      isLessThanOrEqualTo      lte    |  minimum              min
   *      isNaN                           |  random
   *      isNegative                      |  sum
   *      isPositive                      |
   *      isZero                          |
   *      minus                           |
   *      modulo                   mod    |
   *      multipliedBy             times  |
   *      negated                         |
   *      plus                            |
   *      precision                sd     |
   *      shiftedBy                       |
   *      squareRoot               sqrt   |
   *      toExponential                   |
   *      toFixed                         |
   *      toFormat                        |
   *      toFraction                      |
   *      toJSON                          |
   *      toNumber                        |
   *      toPrecision                     |
   *      toString                        |
   *      valueOf                         |
   *
   */

  var BigNumber,
      isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      mathceil = Math.ceil,
      mathfloor = Math.floor,
      bignumberError = '[BigNumber Error] ',
      tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',
      BASE = 1e14,
      LOG_BASE = 14,
      MAX_SAFE_INTEGER = 0x1fffffffffffff,
      // 2^53 - 1
  // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
  POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
      SQRT_BASE = 1e7,
      // EDITABLE
  // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
  // the arguments to toExponential, toFixed, toFormat, and toPrecision.
  MAX = 1E9; // 0 to MAX_INT32

  /*
   * Create and return a BigNumber constructor.
   */

  function clone(configObject) {
    var div,
        convertBase,
        parseNumeric,
        P = BigNumber.prototype = {
      constructor: BigNumber,
      toString: null,
      valueOf: null
    },
        ONE = new BigNumber(1),
        //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------
    // The default values below must be integers within the inclusive ranges stated.
    // The values can also be changed at run-time using BigNumber.set.
    // The maximum number of decimal places for operations involving division.
    DECIMAL_PLACES = 20,
        // 0 to MAX
    // The rounding mode used when rounding to the above decimal places, and when using
    // toExponential, toFixed, toFormat and toPrecision, and round (default value).
    // UP         0 Away from zero.
    // DOWN       1 Towards zero.
    // CEIL       2 Towards +Infinity.
    // FLOOR      3 Towards -Infinity.
    // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    ROUNDING_MODE = 4,
        // 0 to 8
    // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]
    // The exponent value at and beneath which toString returns exponential notation.
    // Number type: -7
    TO_EXP_NEG = -7,
        // 0 to -MAX
    // The exponent value at and above which toString returns exponential notation.
    // Number type: 21
    TO_EXP_POS = 21,
        // 0 to MAX
    // RANGE : [MIN_EXP, MAX_EXP]
    // The minimum exponent value, beneath which underflow to zero occurs.
    // Number type: -324  (5e-324)
    MIN_EXP = -1e7,
        // -1 to -MAX
    // The maximum exponent value, above which overflow to Infinity occurs.
    // Number type:  308  (1.7976931348623157e+308)
    // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
    MAX_EXP = 1e7,
        // 1 to MAX
    // Whether to use cryptographically-secure random number generation, if available.
    CRYPTO = false,
        // true or false
    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP        0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN      1 The remainder has the same sign as the dividend.
    //             This modulo mode is commonly known as 'truncated division' and is
    //             equivalent to (a % n) in JavaScript.
    // FLOOR     3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
    // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
    //             The remainder is always positive.
    //
    // The truncated division, floored division, Euclidian division and IEEE 754 remainder
    // modes are commonly used for the modulus operation.
    // Although the other rounding modes can also be used, they may not give useful results.
    MODULO_MODE = 1,
        // 0 to 9
    // The maximum number of significant digits of the result of the exponentiatedBy operation.
    // If POW_PRECISION is 0, there will be unlimited significant digits.
    POW_PRECISION = 0,
        // 0 to MAX
    // The format specification used by the BigNumber.prototype.toFormat method.
    FORMAT = {
      prefix: '',
      groupSize: 3,
      secondaryGroupSize: 0,
      groupSeparator: ',',
      decimalSeparator: '.',
      fractionGroupSize: 0,
      fractionGroupSeparator: '\xA0',
      // non-breaking space
      suffix: ''
    },
        // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
    // '-', '.', whitespace, or repeated character.
    // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
    ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'; //------------------------------------------------------------------------------------------
    // CONSTRUCTOR

    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */

    function BigNumber(v, b) {
      var alphabet,
          c,
          caseChanged,
          e,
          i,
          isNum,
          len,
          str,
          x = this; // Enable constructor call without `new`.

      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

      if (b == null) {
        if (v && v._isBigNumber === true) {
          x.s = v.s;

          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }

          return;
        }

        if ((isNum = typeof v == 'number') && v * 0 == 0) {
          // Use `1 / n` to handle minus zero also.
          x.s = 1 / v < 0 ? (v = -v, -1) : 1; // Fast path for integers, where n < 2147483648 (2**31).

          if (v === ~~v) {
            for (e = 0, i = v; i >= 10; i /= 10, e++);

            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }

            return;
          }

          str = String(v);
        } else {
          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        } // Decimal point?


        if ((e = str.indexOf('.')) > -1) str = str.replace('.', ''); // Exponential form?

        if ((i = str.search(/e/i)) > 0) {
          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {
          // Integer.
          e = str.length;
        }
      } else {
        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base'); // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.

        if (b == 10) {
          x = new BigNumber(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        str = String(v);

        if (isNum = typeof v == 'number') {
          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1; // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'

          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error(tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0; // Check that str is a valid base b number.
        // Don't use RegExp, so alphabet can contain special characters.

        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {
              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {
              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, String(v), isNum, b);
          }
        } // Prevent later check for length on converted number.


        isNum = false;
        str = convertBase(str, b, 10, x.s); // Decimal point?

        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');else e = str.length;
      } // Determine leading zeros.


      for (i = 0; str.charCodeAt(i) === 48; i++); // Determine trailing zeros.


      for (len = str.length; str.charCodeAt(--len) === 48;);

      if (str = str.slice(i, ++len)) {
        len -= i; // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'

        if (isNum && BigNumber.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
          throw Error(tooManyDigits + x.s * v);
        } // Overflow?


        if ((e = e - i - 1) > MAX_EXP) {
          // Infinity.
          x.c = x.e = null; // Underflow?
        } else if (e < MIN_EXP) {
          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = []; // Transform base
          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.

          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE; // i < 1

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            i = LOG_BASE - (str = str.slice(i)).length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');

          x.c.push(+str);
        }
      } else {
        // Zero.
        x.c = [x.e = 0];
      }
    } // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;
    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;
    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */

    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {
        if (typeof obj == 'object') {
          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          } // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          } // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];

            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          } // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'


          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];

            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);

              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error(bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          } // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'


          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];

            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error(bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error(bignumberError + p + ' not true or false: ' + v);
            }
          } // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          } // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          } // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'


          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;else throw Error(bignumberError + p + ' not an object: ' + v);
          } // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'


          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p]; // Disallow if only one character,
            // or if it contains '+', '-', '.', whitespace, or a repeated character.

            if (typeof v == 'string' && !/^.$|[+-.\s]|(.).*\1/.test(v)) {
              ALPHABET = v;
            } else {
              throw Error(bignumberError + p + ' invalid: ' + v);
            }
          }
        } else {
          // '[BigNumber Error] Object expected: {v}'
          throw Error(bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };
    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */


    BigNumber.isBigNumber = function (v) {
      if (!v || v._isBigNumber !== true) return false;
      if (!BigNumber.DEBUG) return true;
      var i,
          n,
          c = v.c,
          e = v.e,
          s = v.s;

      out: if ({}.toString.call(c) == '[object Array]') {
        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
          // If the first element is zero, the BigNumber value must be zero.
          if (c[0] === 0) {
            if (e === 0 && c.length === 1) return true;
            break out;
          } // Calculate number of digits that c[0] should have, based on the exponent.


          i = (e + 1) % LOG_BASE;
          if (i < 1) i += LOG_BASE; // Calculate number of digits of c[0].
          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {

          if (String(c[0]).length == i) {
            for (i = 0; i < c.length; i++) {
              n = c[i];
              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
            } // Last element cannot be zero, unless it is the only element.


            if (n !== 0) return true;
          }
        } // Infinity/NaN

      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
        return true;
      }

      throw Error(bignumberError + 'Invalid BigNumber: ' + v);
    };
    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */


    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, P.lt);
    };
    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */


    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, P.gt);
    };
    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */


    BigNumber.random = function () {
      var pow2_53 = 0x20000000000000; // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.

      var random53bitInt = Math.random() * pow2_53 & 0x1fffff ? function () {
        return mathfloor(Math.random() * pow2_53);
      } : function () {
        return (Math.random() * 0x40000000 | 0) * 0x800000 + (Math.random() * 0x800000 | 0);
      };
      return function (dp) {
        var a,
            b,
            e,
            k,
            v,
            i = 0,
            c = [],
            rand = new BigNumber(ONE);
        if (dp == null) dp = DECIMAL_PLACES;else intCheck(dp, 0, MAX);
        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {
          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {
            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {
              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11); // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251

              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {
                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }

            i = k / 2; // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {
            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {
              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = (a[i] & 31) * 0x1000000000000 + a[i + 1] * 0x10000000000 + a[i + 2] * 0x100000000 + a[i + 3] * 0x1000000 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }

            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error(bignumberError + 'crypto unavailable');
          }
        } // Use Math.random.


        if (!CRYPTO) {
          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE; // Convert trailing digits to zeros according to dp.

        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        } // Remove trailing elements which are zero.


        for (; c[i] === 0; c.pop(), i--); // Zero?


        if (i < 0) {
          c = [e = 0];
        } else {
          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE); // Count the digits of the first element of c to determine leading zeros, and...


          for (i = 1, v = c[0]; v >= 10; v /= 10, i++); // adjust the exponent accordingly.


          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    }();
    /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */


    BigNumber.sum = function () {
      var i = 1,
          args = arguments,
          sum = new BigNumber(args[0]);

      for (; i < args.length;) sum = sum.plus(args[i++]);

      return sum;
    }; // PRIVATE FUNCTIONS
    // Called by BigNumber and BigNumber.prototype.toString.


    convertBase = function () {
      var decimal = '0123456789';
      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */

      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {
            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      } // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.


      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet,
            d,
            e,
            k,
            r,
            x,
            xc,
            y,
            i = str.indexOf('.'),
            dp = DECIMAL_PLACES,
            rm = ROUNDING_MODE; // Non-integer.

        if (i >= 0) {
          k = POW_PRECISION; // Unlimited precision.

          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k; // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'), 10, baseOut, decimal);
          y.e = y.c.length;
        } // Convert the number as integer.


        xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET)); // xc now represents str as an integer and converted to baseOut. e is the exponent.

        e = k = xc.length; // Remove trailing zeros.

        for (; xc[--k] == 0; xc.pop()); // Zero?


        if (!xc[0]) return alphabet.charAt(0); // Does str represent an integer? If so, no need for the division.

        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e; // The sign is needed for correct rounding.

          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        } // xc now represents str converted to baseOut.
        // THe index of the rounding digit.


        d = e + dp + 1; // The rounding digit: the digit to the right of the digit that may be rounded up.

        i = xc[d]; // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;
        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7)); // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.

        if (d < 1 || !xc[0]) {
          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {
          // Truncate xc to the required number of decimal places.
          xc.length = d; // Round up?

          if (r) {
            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          } // Determine trailing zeros.


          for (k = xc.length; !xc[--k];); // E.g. [4, 11, 15] becomes 4bf.


          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++])); // Add leading zeros, decimal point and trailing zeros as required.


          str = toFixedPoint(str, e, alphabet.charAt(0));
        } // The caller will add the sign.


        return str;
      };
    }(); // Perform division in the specified base. Called by div and convertBase.


    div = function () {
      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m,
            temp,
            xlo,
            xhi,
            carry = 0,
            i = x.length,
            klo = k % SQRT_BASE,
            khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);
        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {
          for (i = cmp = 0; i < aL; i++) {
            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0; // Subtract b from a.

        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        } // Remove leading zeros.


        for (; !a[0] && a.length > 1; a.splice(0, 1));
      } // x: dividend, y: divisor.


      return function (x, y, dp, rm, base) {
        var cmp,
            e,
            i,
            more,
            n,
            prod,
            prodL,
            q,
            qc,
            rem,
            remL,
            rem0,
            xi,
            xL,
            yc0,
            yL,
            yz,
            s = x.s == y.s ? 1 : -1,
            xc = x.c,
            yc = y.c; // Either NaN, Infinity or 0?

        if (!xc || !xc[0] || !yc || !yc[0]) {
          return new BigNumber( // Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
          xc && xc[0] == 0 || !yc ? s * 0 : s / 0);
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        } // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.


        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2; // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1)); // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {

          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length; // Add zeros to make remainder as long as divisor.

          for (; remL < yL; rem[remL++] = 0);

          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++; // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0; // Compare divisor and remainder.

            cmp = compare(yc, rem, yL, remL); // If divisor < remainder.

            if (cmp < 0) {
              // Calculate trial digit, n.
              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0); // n is how many times the divisor goes into the current remainder.

              n = mathfloor(rem0 / yc0); //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {
                // n may be > base only when base is 3.
                if (n >= base) n = base - 1; // product = divisor * trial digit.

                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length; // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.

                while (compare(prod, rem, prodL, remL) == 1) {
                  n--; // Subtract divisor from product.

                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {
                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {
                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                } // product = divisor


                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod); // Subtract product from remainder.

              subtract(rem, prod, remL, base);
              remL = rem.length; // If product was < remainder.

              if (cmp == -1) {
                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++; // Subtract divisor from remainder.

                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0
            // Add the next digit, n, to the result array.


            qc[i++] = n; // Update the remainder.

            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null; // Leading zero?

          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {
          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more); // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    }();
    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */


    function format(n, i, rm, id) {
      var c0, e, ne, len, str;
      if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
      if (!n.c) return n.toString();
      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm); // n.e may have changed if the value was rounded up.

        e = n.e;
        str = coeffToString(n.c);
        len = str.length; // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.
        // Exponential notation.

        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
          // Append zeros?
          for (; len < i; str += '0', len++);

          str = toExponential(str, e); // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0'); // Append zeros?

          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;

            if (i > 0) {
              if (e + 1 == len) str += '.';

              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    } // Handle BigNumber.max and BigNumber.min.


    function maxOrMin(args, method) {
      var n,
          i = 1,
          m = new BigNumber(args[0]);

      for (; i < args.length; i++) {
        n = new BigNumber(args[i]); // If any number is NaN, return NaN.

        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }

      return m;
    }
    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */


    function normalise(n, c, e) {
      var i = 1,
          j = c.length; // Remove trailing zeros.

      for (; !c[--j]; c.pop()); // Calculate the base 10 exponent. First get the number of digits of c[0].


      for (j = c[0]; j >= 10; j /= 10, i++); // Overflow?


      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
        // Infinity.
        n.c = n.e = null; // Underflow?
      } else if (e < MIN_EXP) {
        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    } // Handle values that fail the validity test in BigNumber.


    parseNumeric = function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          dotAfter = /^([^.]+)\.$/,
          dotBefore = /^\.([^.]+)$/,
          isInfinityOrNaN = /^-?(Infinity|NaN)$/,
          whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function (x, str, isNum, b) {
        var base,
            s = isNum ? str : str.replace(whitespaceOrPlus, ''); // No exception on ±Infinity or NaN.

        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {
            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b; // E.g. '1.' to '1', '.1' to '0.1'

              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          } // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'


          if (BigNumber.DEBUG) {
            throw Error(bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          } // NaN


          x.s = null;
        }

        x.c = x.e = null;
      };
    }();
    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */


    function round(x, sd, rm, r) {
      var d,
          i,
          j,
          k,
          n,
          ni,
          rd,
          xc = x.c,
          pows10 = POWS_TEN; // if x is not Infinity or NaN...

      if (xc) {
        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {
          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);

          i = sd - d; // If the rounding digit is in the first element of xc...

          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0]; // Get the rounding digit at index j of n.

            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {
              if (r) {
                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));

                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni]; // Get the number of digits of n.

              for (d = 1; k >= 10; k /= 10, d++); // Get the index of rd within n.


              i %= LOG_BASE; // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.

              j = i - LOG_BASE + d; // Get the rounding digit at index j of n.

              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }

          r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
          xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
          r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
          (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {
              // Convert sd to decimal places.
              sd -= x.e + 1; // 1, 0.1, 0.01, 0.001, 0.0001 etc.

              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {
              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          } // Remove excess digits.


          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i]; // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.

            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          } // Round up?


          if (r) {
            for (;;) {
              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {
                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);

                j = xc[0] += k;

                for (k = 1; j >= 10; j /= 10, k++); // if i != k the length has increased.


                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          } // Remove trailing zeros.


          for (i = xc.length; xc[--i] === 0; xc.pop());
        } // Overflow? Infinity.


        if (x.e > MAX_EXP) {
          x.c = x.e = null; // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }

    function valueOf(n) {
      var str,
          e = n.e;
      if (e === null) return n.toString();
      str = coeffToString(n.c);
      str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, '0');
      return n.s < 0 ? '-' + str : str;
    } // PROTOTYPE/INSTANCE METHODS

    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */


    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };
    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */


    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };
    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.decimalPlaces = P.dp = function (dp, rm) {
      var c,
          n,
          v,
          x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE; // Subtract the number of trailing zeros of the last number.

      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;
      return n;
    };
    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */


    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };
    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */


    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };
    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */


    P.exponentiatedBy = P.pow = function (n, m) {
      var half,
          isModExp,
          i,
          k,
          more,
          nIsBig,
          nIsNeg,
          nIsOdd,
          y,
          x = this;
      n = new BigNumber(n); // Allow NaN and ±Infinity, but not other non-integers.

      if (n.c && !n.isInteger()) {
        throw Error(bignumberError + 'Exponent not an integer: ' + valueOf(n));
      }

      if (m != null) m = new BigNumber(m); // Exponent of MAX_SAFE_INTEGER is 15.

      nIsBig = n.e > 14; // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.

      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {
        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);
        isModExp = !nIsNeg && x.isInteger() && m.isInteger();
        if (isModExp) x = x.mod(m); // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
        // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 // [1, 240000000]
      ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 // [80000000000000]  [99999750000000]
      : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0; // If x >= 1, k = ±Infinity.

        if (x.e > -1) k = 1 / k; // If n is negative return ±0, else return ±Infinity.

        return new BigNumber(nIsNeg ? 1 / k : k);
      } else if (POW_PRECISION) {
        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        if (nIsNeg) n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i = Math.abs(+valueOf(n));
        nIsOdd = i % 2;
      }

      y = new BigNumber(ONE); // Performs 54 loop iterations for n of 9007199254740991.

      for (;;) {
        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m); //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (i) {
          i = mathfloor(i / 2);
          if (i === 0) break;
          nIsOdd = i % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);

          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i = +valueOf(n);
            if (i === 0) break;
            nIsOdd = i % 2;
          }
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m); //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);
      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */


    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };
    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };
    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */


    P.isFinite = function () {
      return !!this.c;
    };
    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };
    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */


    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;
    };
    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */


    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };
    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };
    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */


    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };
    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */


    P.isNaN = function () {
      return !this.s;
    };
    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */


    P.isNegative = function () {
      return this.s < 0;
    };
    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */


    P.isPositive = function () {
      return this.s > 0;
    };
    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */


    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };
    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */


    P.minus = function (y, b) {
      var i,
          j,
          t,
          xLTy,
          x = this,
          a = x.s;
      y = new BigNumber(y, b);
      b = y.s; // Either NaN?

      if (!a || !b) return new BigNumber(NaN); // Signs differ?

      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
          ye = y.e / LOG_BASE,
          xc = x.c,
          yc = y.c;

      if (!xe || !ye) {
        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN); // Either zero?

        if (!xc[0] || !yc[0]) {
          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x : // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice(); // Determine which is the bigger number.

      if (a = xe - ye) {
        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse(); // Prepend zeros to equalise exponents.

        for (b = a; b--; t.push(0));

        t.reverse();
      } else {
        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {
          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      } // x < y? Point xc to the array of the bigger number.


      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;
      b = (j = yc.length) - (i = xc.length); // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.

      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1; // Subtract yc from xc.

      for (; j > a;) {
        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);

          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      } // Remove leading zeros and adjust exponent accordingly.


      for (; xc[0] == 0; xc.splice(0, 1), --ye); // Zero?


      if (!xc[0]) {
        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      } // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.


      return normalise(y, xc, ye);
    };
    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */


    P.modulo = P.mod = function (y, b) {
      var q,
          s,
          x = this;
      y = new BigNumber(y, b); // Return NaN if x is Infinity or NaN, or y is NaN or zero.

      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN); // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {
        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y)); // To match JavaScript %, ensure sign of zero is sign of dividend.

      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
      return y;
    };
    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */


    P.multipliedBy = P.times = function (y, b) {
      var c,
          e,
          i,
          j,
          k,
          m,
          xcL,
          xlo,
          xhi,
          ycL,
          ylo,
          yhi,
          zc,
          base,
          sqrtBase,
          x = this,
          xc = x.c,
          yc = (y = new BigNumber(y, b)).c; // Either NaN, ±Infinity or ±0?

      if (!xc || !yc || !xc[0] || !yc[0]) {
        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s; // Return ±Infinity if either is ±Infinity.

          if (!xc || !yc) {
            y.c = y.e = null; // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length; // Ensure xc points to longer array and xcL to its length.

      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i; // Initialise the result array with zeros.

      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */


    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };
    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */


    P.plus = function (y, b) {
      var t,
          x = this,
          a = x.s;
      y = new BigNumber(y, b);
      b = y.s; // Either NaN?

      if (!a || !b) return new BigNumber(NaN); // Signs differ?

      if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
          ye = y.e / LOG_BASE,
          xc = x.c,
          yc = y.c;

      if (!xe || !ye) {
        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0); // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.

        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice(); // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.

      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();

        for (; a--; t.push(0));

        t.reverse();
      }

      a = xc.length;
      b = yc.length; // Point xc to the longer array, and b to the shorter length.

      if (a - b < 0) t = yc, yc = xc, xc = t, b = a; // Only start adding at yc.length - 1 as the further digits of xc can be ignored.

      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      } // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible


      return normalise(y, xc, ye);
    };
    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */


    P.precision = P.sd = function (sd, rm) {
      var c,
          n,
          v,
          x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {
        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--); // Add the number of digits of the first element.


        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;
      return n;
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */


    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };
    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */


    P.squareRoot = P.sqrt = function () {
      var m,
          n,
          r,
          rep,
          t,
          x = this,
          c = x.c,
          s = x.s,
          e = x.e,
          dp = DECIMAL_PLACES + 4,
          half = new BigNumber('0.5'); // Negative/NaN/Infinity/zero?

      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      } // Initial estimate.


      s = Math.sqrt(+valueOf(x)); // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.

      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '1e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      } // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.


      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0; // Newton-Raphson iteration.

        for (;;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1); // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.

            if (n == '9999' || !rep && n == '4999') {
              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {
              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };
    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }

      return format(this, dp, rm, 1);
    };
    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }

      return format(this, dp, rm);
    };
    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */


    P.toFormat = function (dp, rm, format) {
      var str,
          x = this;

      if (format == null) {
        if (dp != null && rm && typeof rm == 'object') {
          format = rm;
          rm = null;
        } else if (dp && typeof dp == 'object') {
          format = dp;
          dp = rm = null;
        } else {
          format = FORMAT;
        }
      } else if (typeof format != 'object') {
        throw Error(bignumberError + 'Argument not an object: ' + format);
      }

      str = x.toFixed(dp, rm);

      if (x.c) {
        var i,
            arr = str.split('.'),
            g1 = +format.groupSize,
            g2 = +format.secondaryGroupSize,
            groupSeparator = format.groupSeparator || '',
            intPart = arr[0],
            fractionPart = arr[1],
            isNeg = x.s < 0,
            intDigits = isNeg ? intPart.slice(1) : intPart,
            len = intDigits.length;
        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);

          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);

          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize) ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'), '$&' + (format.fractionGroupSeparator || '')) : fractionPart) : intPart;
      }

      return (format.prefix || '') + str + (format.suffix || '');
    };
    /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */


    P.toFraction = function (md) {
      var d,
          d0,
          d1,
          d2,
          e,
          exp,
          n,
          n0,
          n1,
          q,
          r,
          s,
          x = this,
          xc = x.c;

      if (md != null) {
        n = new BigNumber(md); // Throw if md is less than one or is not an integer, unless it is Infinity.

        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error(bignumberError + 'Argument ' + (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
        }
      }

      if (!xc) return new BigNumber(x);
      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc); // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.

      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s); // n0 = d1 = 0

      n0.c[0] = 0;

      for (;;) {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2; // Determine which fraction is closer to x, n0/d0 or n1/d1

      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
      MAX_EXP = exp;
      return r;
    };
    /*
     * Return the value of this BigNumber converted to a number primitive.
     */


    P.toNumber = function () {
      return +valueOf(this);
    };
    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */


    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };
    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */


    P.toString = function (b) {
      var str,
          n = this,
          s = n.s,
          e = n.e; // Infinity or NaN?

      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, '0');
        } else if (b === 10) {
          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };
    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */


    P.valueOf = P.toJSON = function () {
      return valueOf(this);
    };

    P._isBigNumber = true;
    if (configObject != null) BigNumber.set(configObject);
    return BigNumber;
  } // PRIVATE HELPER FUNCTIONS
  // These functions don't need access to variables,
  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  } // Return a coefficient array as a string of base 10 digits.


  function coeffToString(a) {
    var s,
        z,
        i = 1,
        j = a.length,
        r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;

      for (; z--; s = '0' + s);

      r += s;
    } // Determine trailing zeros.


    for (j = r.length; r.charCodeAt(--j) === 48;);

    return r.slice(0, j + 1 || 1);
  } // Compare the value of BigNumbers x and y.


  function compare(x, y) {
    var a,
        b,
        xc = x.c,
        yc = y.c,
        i = x.s,
        j = y.s,
        k = x.e,
        l = y.e; // Either NaN?

    if (!i || !j) return null;
    a = xc && !xc[0];
    b = yc && !yc[0]; // Either zero?

    if (a || b) return a ? b ? 0 : -j : i; // Signs differ?

    if (i != j) return i;
    a = i < 0;
    b = k == l; // Either Infinity?

    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1; // Compare exponents.

    if (!b) return k > l ^ a ? 1 : -1;
    j = (k = xc.length) < (l = yc.length) ? k : l; // Compare digit by digit.

    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1; // Compare lengths.


    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }
  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */


  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error(bignumberError + (name || 'Argument') + (typeof n == 'number' ? n < min || n > max ? ' out of range: ' : ' not an integer: ' : ' not a primitive number: ') + String(n));
    }
  } // Assumes finite n.


  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }

  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) + (e < 0 ? 'e' : 'e+') + e;
  }

  function toFixedPoint(str, e, z) {
    var len, zs; // Negative exponent?

    if (e < 0) {
      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);

      str = zs + str; // Positive exponent
    } else {
      len = str.length; // Append zeros.

      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);

        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  } // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber; // AMD.

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return BigNumber;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // Node.js and other environments that support module.exports.
  } else {}
})(void 0);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const defaultMigrations = __webpack_require__(29);

const repoVersion = __webpack_require__(30);

const repoLock = __webpack_require__(42);

const errors = __webpack_require__(13);

const log = __webpack_require__(2)('repo-migrations:migrator');

exports.getCurrentRepoVersion = repoVersion.getVersion;
exports.errors = errors;
/**
 * Returns the version of latest migration.
 * If no migrations are present returns 0.
 *
 * @param {array?} migrations - Array of migrations to consider. If undefined, the bundled migrations are used. Mainly for testing purpose.
 * @returns {int}
 */

function getLatestMigrationVersion(migrations) {
  migrations = migrations || defaultMigrations;

  if (!Array.isArray(migrations) || migrations.length === 0) {
    return 0;
  }

  return migrations[migrations.length - 1].version;
}

exports.getLatestMigrationVersion = getLatestMigrationVersion;
/**
 * Main function to execute forward migrations.
 * It acquire lock on the provided path before doing any migrations.
 *
 * Signature of the progress callback is: function(migrationObject: object, currentMigrationNumber: int, totalMigrationsCount: int)
 *
 * @param {string} path - Path to initialized (!) JS-IPFS repo
 * @param {int} toVersion - Version to which the repo should be migrated.
 * @param {Object} options - Options for migration
 * @param {boolean?} options.ignoreLock - Won't lock the repo for applying the migrations. Use with caution.
 * @param {object?} options.repoOptions - Options that are passed to migrations, that can use them to correctly construct datastore. Options are same like for IPFSRepo.
 * @param {function?} options.onProgress - Callback which will be called after each executed migration to report progress
 * @param {boolean?} options.isDryRun - Allows to simulate the execution of the migrations without any effect.
 * @param {array?} options.migrations - Array of migrations to migrate. If undefined, the bundled migrations are used. Mainly for testing purpose.
 * @returns {Promise<void>}
 */

async function migrate(path, toVersion, {
  ignoreLock = false,
  repoOptions,
  onProgress,
  isDryRun = false,
  migrations
}) {
  migrations = migrations || defaultMigrations;

  onProgress = onProgress || (() => {});

  if (!path) {
    throw new errors.RequiredParameterError('Path argument is required!');
  }

  if (!toVersion) {
    throw new errors.RequiredParameterError('toVersion argument is required!');
  }

  if (!Number.isInteger(toVersion) || toVersion <= 0) {
    throw new errors.InvalidValueError('Version has to be positive integer!');
  }

  const currentVersion = await repoVersion.getVersion(path);

  if (currentVersion === toVersion) {
    log('Nothing to migrate.');
    return;
  }

  if (currentVersion > toVersion) {
    throw new errors.InvalidValueError("Current repo's version (".concat(currentVersion, ") is higher then toVersion (").concat(toVersion, "), you probably wanted to revert it?"));
  }

  verifyAvailableMigrations(migrations, currentVersion, toVersion);
  let lock;
  if (!isDryRun && !ignoreLock) lock = await repoLock.lock(currentVersion, path);

  try {
    let counter = 0;
    const totalMigrations = toVersion - currentVersion;

    for (const migration of migrations) {
      if (toVersion !== undefined && migration.version > toVersion) {
        break;
      }

      if (migration.version <= currentVersion) {
        continue;
      }

      counter++;
      log("Migrating version ".concat(migration.version));

      try {
        if (!isDryRun) await migration.migrate(path, repoOptions);
      } catch (e) {
        const lastSuccessfullyMigratedVersion = migration.version - 1;
        log("An exception was raised during execution of migration. Setting the repo's version to last successfully migrated version: ".concat(lastSuccessfullyMigratedVersion));
        await repoVersion.setVersion(path, lastSuccessfullyMigratedVersion);
        e.message = "During migration to version ".concat(migration.version, " exception was raised: ").concat(e.message);
        throw e;
      }

      onProgress(migration, counter, totalMigrations); // Reports on migration process

      log("Migrating to version ".concat(migration.version, " finished"));
    }

    if (!isDryRun) await repoVersion.setVersion(path, toVersion || getLatestMigrationVersion(migrations));
    log('Repo successfully migrated ', toVersion !== undefined ? "to version ".concat(toVersion, "!") : 'to latest version!');
  } finally {
    if (!isDryRun && !ignoreLock) await lock.close();
  }
}

exports.migrate = migrate;
/**
 * Main function to execute backward migration (reversion).
 * It acquire lock on the provided path before doing any migrations.
 *
 * Signature of the progress callback is: function(migrationObject: object, currentMigrationNumber: int, totalMigrationsCount: int)
 *
 * @param {string} path - Path to initialized (!) JS-IPFS repo
 * @param {int} toVersion - Version to which the repo will be reverted.
 * @param {Object} options - Options for the reversion
 * @param {function?} options.onProgress - Callback which will be called after each reverted migration to report progress
 * @param {object?} options.repoOptions - Options that are passed to migrations, that can use them to correctly construct datastore. Options are same like for IPFSRepo.
 * @param {boolean?} options.isDryRun - Allows to simulate the execution of the reversion without any effects. Make sense to utilize onProgress with this argument.
 * @param {boolean?} options.ignoreLock - Won't lock the repo for reverting the migrations. Use with caution.
 * @param {array?} options.migrations - Array of migrations to migrate. If undefined, the bundled migrations are used. Mainly for testing purpose.
 * @returns {Promise<void>}
 */

async function revert(path, toVersion, {
  ignoreLock = false,
  repoOptions,
  onProgress,
  isDryRun = false,
  migrations
}) {
  migrations = migrations || defaultMigrations;

  onProgress = onProgress || (() => {});

  if (!path) {
    throw new errors.RequiredParameterError('Path argument is required!');
  }

  if (!toVersion) {
    throw new errors.RequiredParameterError('When reverting migrations, you have to specify to which version to revert!');
  }

  if (!Number.isInteger(toVersion) || toVersion <= 0) {
    throw new errors.InvalidValueError('Version has to be positive integer!');
  }

  const currentVersion = await repoVersion.getVersion(path);

  if (currentVersion === toVersion) {
    log('Nothing to revert.');
    return;
  }

  if (currentVersion < toVersion) {
    throw new errors.InvalidValueError("Current repo's version (".concat(currentVersion, ") is lower then toVersion (").concat(toVersion, "), you probably wanted to migrate it?"));
  }

  verifyAvailableMigrations(migrations, toVersion, currentVersion, true);
  let lock;
  if (!isDryRun && !ignoreLock) lock = await repoLock.lock(currentVersion, path);
  log("Reverting from version ".concat(currentVersion, " to ").concat(toVersion));

  try {
    let counter = 0;
    const totalMigrations = currentVersion - toVersion;
    const reversedMigrationArray = migrations.slice().reverse();

    for (const migration of reversedMigrationArray) {
      if (migration.version <= toVersion) {
        break;
      }

      if (migration.version > currentVersion) {
        continue;
      }

      counter++;
      log("Reverting migration version ".concat(migration.version));

      try {
        if (!isDryRun) await migration.revert(path, repoOptions);
      } catch (e) {
        const lastSuccessfullyRevertedVersion = migration.version;
        log("An exception was raised during execution of migration. Setting the repo's version to last successfully reverted version: ".concat(lastSuccessfullyRevertedVersion));
        await repoVersion.setVersion(path, lastSuccessfullyRevertedVersion);
        e.message = "During reversion to version ".concat(migration.version, " exception was raised: ").concat(e.message);
        throw e;
      }

      onProgress(migration, counter, totalMigrations); // Reports on migration process

      log("Reverting to version ".concat(migration.version, " finished"));
    }

    if (!isDryRun) await repoVersion.setVersion(path, toVersion);
    log("All migrations successfully reverted to version ".concat(toVersion, "!"));
  } finally {
    if (!isDryRun && !ignoreLock) await lock.close();
  }
}

exports.revert = revert;
/**
 * Function checks if all migrations in given range are available.
 *
 * @param {array} migrations
 * @param {int} fromVersion
 * @param {int} toVersion
 * @param {boolean} checkReversibility - Will additionally checks if all the migrations in the range are reversible
 * @returns {void}
 */

function verifyAvailableMigrations(migrations, fromVersion, toVersion, checkReversibility = false) {
  let migrationCounter = 0;

  for (const migration of migrations) {
    if (migration.version > toVersion) {
      break;
    }

    if (migration.version > fromVersion) {
      if (checkReversibility && !migration.revert) {
        throw new errors.NonReversibleMigrationError("It is not possible to revert to version ".concat(fromVersion, " because migration version ").concat(migration.version, " is not reversible. Cancelling reversion."));
      }

      migrationCounter++;
    }
  }

  if (migrationCounter !== toVersion - fromVersion) {
    throw new errors.InvalidValueError("The ipfs-repo-migrations package does not have all migration to migrate from version ".concat(fromVersion, " to ").concat(toVersion));
  }
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Do not modify this file manually as it will be overridden when running 'add' CLI command.
// Modify migration-templates.js file

const emptyMigration = {
  description: 'Empty migration.',
  migrate: () => {},
  revert: () => {},
  empty: true
};
module.exports = [Object.assign({}, emptyMigration, {
  version: 7,
  revert: undefined
}), Object.assign({}, emptyMigration, {
  version: 6,
  revert: undefined
}), Object.assign({}, emptyMigration, {
  version: 5,
  revert: undefined
}), Object.assign({}, emptyMigration, {
  version: 4,
  revert: undefined
}), Object.assign({}, emptyMigration, {
  version: 3,
  revert: undefined
}), Object.assign({}, emptyMigration, {
  version: 2,
  revert: undefined
}), Object.assign({}, emptyMigration, {
  version: 1,
  revert: undefined
})];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const errors = __webpack_require__(13);

const repoInit = __webpack_require__(35);

const Datastore = __webpack_require__(3);

const Key = __webpack_require__(1).Key;

const versionKey = new Key('version');
exports.getVersion = getVersion;
/**
 * Function that has responsibility to retrieve version of repo from its root datastore's instance.
 * This function needs to be cross-repo-version functional to be able to fetch any version number,
 * even in case of change of repo's versioning.
 *
 * @param {string} path
 * @returns {Promise<int>}
 */

async function getVersion(path) {
  if (!(await repoInit.isRepoInitialized(path))) {
    throw new errors.NotInitializedRepoError("Repo in path ".concat(path, " is not initialized!"));
  }

  const store = new Datastore(path, {
    extension: '',
    createIfMissing: false
  });
  await store.open();
  const version = parseInt((await store.get(versionKey)));
  await store.close();
  return version;
}
/**
 * Function for setting a version in cross-repo-version manner.
 *
 * @param {string} path
 * @param {int} version
 * @returns {Promise<void>}
 */


async function setVersion(path, version) {
  const store = new Datastore(path, {
    extension: '',
    createIfMissing: false
  });
  await store.open();
  await store.put(versionKey, Buffer.from(String(version)));
  await store.close();
}

exports.setVersion = setVersion;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;

  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Datastore = __webpack_require__(3);

const log = __webpack_require__(2)('repo-migrations:repo:init');

const Key = __webpack_require__(1).Key;

const versionKey = new Key('/version');
const configKey = new Key('/config');

exports.isRepoInitialized = async function isRepoInitialized(path) {
  let root;

  try {
    root = new Datastore(path, {
      extension: '',
      createIfMissing: false
    });
    await root.open();
    const versionCheck = await root.has(versionKey);
    const configCheck = await root.has(configKey);

    if (!versionCheck || !configCheck) {
      log("Version entry present: ".concat(versionCheck));
      log("Config entry present: ".concat(configCheck));
      return false;
    }

    return true;
  } catch (e) {
    log('While checking if repo is initialized error was thrown: ' + e.message);
    return false;
  } finally {
    if (root !== undefined) await root.close();
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDB = deleteDB;
exports.openDB = openDB;
Object.defineProperty(exports, "unwrap", {
  enumerable: true,
  get: function get() {
    return _wrapIdbValue.u;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function get() {
    return _wrapIdbValue.w;
  }
});

var _wrapIdbValue = __webpack_require__(37);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = (0, _wrapIdbValue.w)(request);

  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade((0, _wrapIdbValue.w)(request.result), event.oldVersion, event.newVersion, (0, _wrapIdbValue.w)(request.transaction));
    });
  }

  if (blocked) request.addEventListener('blocked', () => blocked());
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) db.addEventListener('versionchange', () => blocking());
  }).catch(() => {});
  return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */


function deleteDB(name, {
  blocked
} = {}) {
  const request = indexedDB.deleteDatabase(name);
  if (blocked) request.addEventListener('blocked', () => blocked());
  return (0, _wrapIdbValue.w)(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();

function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }

  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);

  if ( // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }

  const method = async function method(storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift());
    const returnVal = target[targetFuncName](...args);
    if (isWrite) await tx.done;
    return returnVal;
  };

  cachedMethods.set(prop, method);
  return method;
}

(0, _wrapIdbValue.r)(oldTraps => _objectSpread({}, oldTraps, {
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.r = replaceTraps;
exports.w = wrap;
exports.u = exports.i = exports.a = void 0;

const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);

exports.i = instanceOfAny;
let idbProxyableTypes;
let cursorAdvanceMethods; // This is a function to prevent it throwing up in node environments.

function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
} // This is a function to prevent it throwing up in node environments.


function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}

const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
exports.a = reverseTransformCache;

function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };

    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };

    const error = () => {
      reject(request.error);
      unlisten();
    };

    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  promise.then(value => {
    // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
    // (see wrapFunction).
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    } // Catching to avoid "Uncaught Promise exceptions"

  }).catch(() => {}); // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.

  reverseTransformCache.set(promise, request);
  return promise;
}

function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };

    const complete = () => {
      resolve();
      unlisten();
    };

    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };

    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  }); // Cache it for later retrieval.

  transactionDoneMap.set(tx, done);
}

let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target); // Polyfill for objectStoreNames because of Edge.

      if (prop === 'objectStoreNames') {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      } // Make tx.store return the only store in the transaction, or undefined if there are many.


      if (prop === 'store') {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    } // Else transform whatever we get back.


    return wrap(target[prop]);
  },

  set(target, prop, value) {
    target[prop] = value;
    return true;
  },

  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
      return true;
    }

    return prop in target;
  }

};

function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}

function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
  if (func === IDBDatabase.prototype.transaction && !('objectStoreNames' in IDBTransaction.prototype)) {
    return function (storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  } // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.


  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }

  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}

function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value); // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).

  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps); // Return the same value back if we're not going to transform it.

  return value;
}

function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value); // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.

  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value); // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.

  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }

  return newValue;
}

const unwrap = value => reverseTransformCache.get(value);

exports.u = unwrap;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = exports.urlAlphabet = exports.customRandom = exports.customAlphabet = exports.nanoid = void 0;

// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.
if (false) {} // This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.


let urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';
exports.urlAlphabet = urlAlphabet;

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes));

exports.random = random;

let customRandom = (alphabet, size, getRandom) => {
  // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
  // values closer to the alphabet size. The bitmask calculates the closest
  // `2^31 - 1` number, which exceeds the alphabet size.
  // For example, the bitmask for the alphabet size 30 is 31 (00011111).
  // `Math.clz32` is not used, because it is not available in browsers.
  let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1; // Though, the bitmask solution is not perfect since the bytes exceeding
  // the alphabet size are refused. Therefore, to reliably generate the ID,
  // the random bytes redundancy has to be satisfied.
  // Note: every hardware random generator call is performance expensive,
  // because the system call for entropy collection takes a lot of time.
  // So, to avoid additional system calls, extra bytes are requested in advance.
  // Next, a step determines how many random bytes to generate.
  // The number of random bytes gets decided upon the ID size, mask,
  // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
  // according to benchmarks).
  // `-~f => Math.ceil(f)` if f is a float
  // `-~i => i + 1` if i is an integer

  let step = -~(1.6 * mask * size / alphabet.length);
  return () => {
    let id = '';

    while (true) {
      let bytes = getRandom(step); // A compact alternative for `for (var i = 0; i < step; i++)`.

      let j = step;

      while (j--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[j] & mask] || ''; // `id.length + 1 === size` is a more compact option.

        if (id.length === +size) return id;
      }
    }
  };
};

exports.customRandom = customRandom;

let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random);

exports.customAlphabet = customAlphabet;

let nanoid = (size = 21) => {
  let id = '';
  let bytes = crypto.getRandomValues(new Uint8Array(size)); // A compact alternative for `for (var i = 0; i < step; i++)`.

  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    let byte = bytes[size] & 63;

    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36);
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }

  return id;
};

exports.nanoid = nanoid;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  filter,
  sortAll,
  take,
  map
} = __webpack_require__(15);

const Key = __webpack_require__(14); // Errors


const Errors = __webpack_require__(16);

class MemoryDatastore {
  constructor() {
    this.data = {};
  }

  async open() {}

  async put(key, val) {
    // eslint-disable-line require-await
    this.data[key.toString()] = val;
  }

  async get(key) {
    const exists = await this.has(key);
    if (!exists) throw Errors.notFoundError();
    return this.data[key.toString()];
  }

  async has(key) {
    // eslint-disable-line require-await
    return this.data[key.toString()] !== undefined;
  }

  async delete(key) {
    // eslint-disable-line require-await
    delete this.data[key.toString()];
  }

  batch() {
    let puts = [];
    let dels = [];
    return {
      put(key, value) {
        puts.push([key, value]);
      },

      delete(key) {
        dels.push(key);
      },

      commit: async () => {
        // eslint-disable-line require-await
        puts.forEach(v => {
          this.data[v[0].toString()] = v[1];
        });
        puts = [];
        dels.forEach(key => {
          delete this.data[key.toString()];
        });
        dels = [];
      }
    };
  }

  query(q) {
    let it = Object.entries(this.data);
    it = map(it, entry => ({
      key: new Key(entry[0]),
      value: entry[1]
    }));

    if (q.prefix != null) {
      it = filter(it, e => e.key.toString().startsWith(q.prefix));
    }

    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it, f) => filter(it, f), it);
    }

    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it, f) => sortAll(it, f), it);
    }

    if (q.offset != null) {
      let i = 0;
      it = filter(it, () => i++ >= q.offset);
    }

    if (q.limit != null) {
      it = take(it, q.limit);
    }

    if (q.keysOnly === true) {
      it = map(it, e => ({
        key: e.key
      }));
    }

    return it;
  }

  async close() {}

}

module.exports = MemoryDatastore;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const nanoid = __webpack_require__(41);
/**
 * Temporary folder
 *
 * @param {function(string): string} transform - Transform function to add prefixes or sufixes to the unique id
 * @returns {string} - Full real path to a temporary folder
 */


const tempdir = (transform = d => d) => {
  return transform(nanoid());
};

module.exports = tempdir;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.
if (false) {}

var crypto = self.crypto || self.msCrypto; // This alphabet uses a-z A-Z 0-9 _- symbols.
// Symbols are generated for smaller size.
// -_zyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA

var url = '-_'; // Loop from 36 to 0 (from z to a and 9 to 0 in Base36).

var i = 36;

while (i--) {
  // 36 is radix. Number.prototype.toString(36) returns number
  // in Base36 representation. Base36 is like hex, but it uses 0–9 and a-z.
  url += i.toString(36);
} // Loop from 36 to 10 (from Z to A in Base36).


i = 36;

while (i-- - 10) {
  url += i.toString(36).toUpperCase();
}

module.exports = function (size) {
  var id = '';
  var bytes = crypto.getRandomValues(new Uint8Array(size || 21));
  i = size || 21; // Compact alternative for `for (var i = 0; i < size; i++)`

  while (i--) {
    // We can’t use bytes bigger than the alphabet. 63 is 00111111 bitmask.
    // This mask reduces random byte 0-255 to 0-63 values.
    // There is no need in `|| ''` and `* 1.6` hacks in here,
    // because bitmask trim bytes exact to alphabet size.
    id += url[bytes[i] & 63];
  }

  return id;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const debug = __webpack_require__(2);

const log = debug('repo-migrations:repo_mem_lock');
const lockFile = 'repo.lock';
const LOCKS = {};
/**
 * Lock the repo in the given dir and for given repo version.
 * @param {int} version
 * @param {string} dir
 * @returns {Promise<Object>}
 */

exports.lock = async function lock(version, dir) {
  // eslint-disable-line require-await
  const file = dir + '/' + lockFile;
  log('locking %s', file);

  if (LOCKS[file] === true) {
    throw Error("There is already present lock for: ".concat(file));
  }

  LOCKS[file] = true;
  return {
    close() {
      if (LOCKS[file]) {
        log('releasing lock %s', file);
        delete LOCKS[file];
      }
    }

  };
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

module.exports = bytes;
module.exports.format = format;
module.exports.parse = parse;
/**
 * Module variables.
 * @private
 */

var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;
var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;
var map = {
  b: 1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: Math.pow(1024, 4),
  pb: Math.pow(1024, 5)
};
var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
/**
 * Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|number} value
 * @param {{
 *  case: [string],
 *  decimalPlaces: [number]
 *  fixedDecimals: [boolean]
 *  thousandsSeparator: [string]
 *  unitSeparator: [string]
 *  }} [options] bytes options.
 *
 * @returns {string|number|null}
 */

function bytes(value, options) {
  if (typeof value === 'string') {
    return parse(value);
  }

  if (typeof value === 'number') {
    return format(value, options);
  }

  return null;
}
/**
 * Format the given value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float,
 * it is rounded.
 *
 * @param {number} value
 * @param {object} [options]
 * @param {number} [options.decimalPlaces=2]
 * @param {number} [options.fixedDecimals=false]
 * @param {string} [options.thousandsSeparator=]
 * @param {string} [options.unit=]
 * @param {string} [options.unitSeparator=]
 *
 * @returns {string|null}
 * @public
 */


function format(value, options) {
  if (!Number.isFinite(value)) {
    return null;
  }

  var mag = Math.abs(value);
  var thousandsSeparator = options && options.thousandsSeparator || '';
  var unitSeparator = options && options.unitSeparator || '';
  var decimalPlaces = options && options.decimalPlaces !== undefined ? options.decimalPlaces : 2;
  var fixedDecimals = Boolean(options && options.fixedDecimals);
  var unit = options && options.unit || '';

  if (!unit || !map[unit.toLowerCase()]) {
    if (mag >= map.pb) {
      unit = 'PB';
    } else if (mag >= map.tb) {
      unit = 'TB';
    } else if (mag >= map.gb) {
      unit = 'GB';
    } else if (mag >= map.mb) {
      unit = 'MB';
    } else if (mag >= map.kb) {
      unit = 'KB';
    } else {
      unit = 'B';
    }
  }

  var val = value / map[unit.toLowerCase()];
  var str = val.toFixed(decimalPlaces);

  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, '$1');
  }

  if (thousandsSeparator) {
    str = str.replace(formatThousandsRegExp, thousandsSeparator);
  }

  return str + unitSeparator + unit;
}
/**
 * Parse the string value into an integer in bytes.
 *
 * If no unit is given, it is assumed the value is in bytes.
 *
 * @param {number|string} val
 *
 * @returns {number|null}
 * @public
 */


function parse(val) {
  if (typeof val === 'number' && !isNaN(val)) {
    return val;
  }

  if (typeof val !== 'string') {
    return null;
  } // Test if the string passed is valid


  var results = parseRegExp.exec(val);
  var floatValue;
  var unit = 'b';

  if (!results) {
    // Nothing could be extracted from the given string
    floatValue = parseInt(val, 10);
    unit = 'b';
  } else {
    // Retrieve the value and the unit
    floatValue = parseFloat(results[1]);
    unit = results[4].toLowerCase();
  }

  return Math.floor(map[unit] * floatValue);
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function join(...args) {
  if (args.length === 0) {
    return '.';
  }

  return args.join('/');
}

module.exports = join;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  repoVersion: 7
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.create = function createBackend(name, path, options) {
  const Ctor = options.storageBackends[name];
  const backendOptions = Object.assign({}, options.storageBackendOptions[name] || {});
  return new Ctor(path, backendOptions);
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const Key = __webpack_require__(1).Key;

const debug = __webpack_require__(2);

const log = debug('repo:version');
const versionKey = new Key('version');

module.exports = store => {
  return {
    /**
     * Check if a version file exists.
     *
     * @returns {Promise<bool>}
     */
    async exists() {
      // eslint-disable-line require-await
      return store.has(versionKey);
    },

    /**
     * Get the current version.
     *
     * @returns {Promise<Integer>}
     */
    async get() {
      const buf = await store.get(versionKey);
      return parseInt(buf.toString().trim(), 10);
    },

    /**
     * Set the version of the repo, writing it to the underlying store.
     *
     * @param {number} version
     * @returns {Promise<void>}
     */
    async set(version) {
      // eslint-disable-line require-await
      return store.put(versionKey, Buffer.from(String(version)));
    },

    /**
     * Check the current version, and returns true if versions matches
     * @param {number} expected
     * @returns {boolean}
     */
    async check(expected) {
      const version = await this.get();
      log('comparing version: %s and %s', version, expected); // Version 6 and 7 are the same
      // TODO: Clean up the compatibility logic. Repo feature detection would be ideal, or a better version schema

      const compatibleVersion = version === 6 && expected === 7 || expected === 6 && version === 7;
      return version === expected || compatibleVersion;
    }

  };
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const Key = __webpack_require__(1).Key;

const {
  default: Queue
} = __webpack_require__(49);

const _get = __webpack_require__(12);

const _set = __webpack_require__(55);

const errcode = __webpack_require__(5);

const errors = __webpack_require__(8);

const configKey = new Key('config');

module.exports = store => {
  const setQueue = new Queue({
    concurrency: 1
  });
  const configStore = {
    /**
     * Get the current configuration from the repo.
     *
     * @param {String} key - the config key to get
     * @returns {Promise<Object>}
     */
    async get(key) {
      if (!key) {
        key = undefined;
      }

      const encodedValue = await store.get(configKey);
      const config = JSON.parse(encodedValue.toString());

      if (key !== undefined && _get(config, key) === undefined) {
        throw new errors.NotFoundError("Key ".concat(key, " does not exist in config"));
      }

      const value = key !== undefined ? _get(config, key) : config;
      return value;
    },

    /**
     * Set the current configuration for this repo.
     *
     * @param {String} key - the config key to be written
     * @param {Object} value - the config value to be written
     * @returns {void}
     */
    async set(key, value) {
      // eslint-disable-line require-await
      if (arguments.length === 1) {
        value = key;
        key = undefined;
      } else if (!key || typeof key !== 'string') {
        throw errcode(new Error('Invalid key type: ' + typeof key), 'ERR_INVALID_KEY');
      }

      if (value === undefined || Buffer.isBuffer(value)) {
        throw errcode(new Error('Invalid value type: ' + typeof value), 'ERR_INVALID_VALUE');
      }

      return setQueue.add(() => _doSet({
        key: key,
        value: value
      }));
    },

    /**
     * Check if a config file exists.
     *
     * @returns {Promise<bool>}
     */
    async exists() {
      // eslint-disable-line require-await
      return store.has(configKey);
    }

  };
  return configStore;

  async function _doSet(m) {
    const key = m.key;
    const value = m.value;

    if (key) {
      const config = await configStore.get();

      _set(config, key, value);

      return _saveAll(config);
    }

    return _saveAll(value);
  }

  function _saveAll(config) {
    const buf = Buffer.from(JSON.stringify(config, null, 2));
    return store.put(configKey, buf);
  }
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const EventEmitter = __webpack_require__(50);

const p_timeout_1 = __webpack_require__(51);

const priority_queue_1 = __webpack_require__(53);

const empty = () => {};

const timeoutError = new p_timeout_1.TimeoutError();
/**
Promise queue with concurrency control.
*/

class PQueue extends EventEmitter {
  constructor(options) {
    super();
    Object.defineProperty(this, "_carryoverConcurrencyCount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_isIntervalIgnored", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_intervalCount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_intervalCap", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_interval", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_intervalEnd", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_intervalId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_timeoutId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_queue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_queueClass", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_pendingCount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    }); // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194

    Object.defineProperty(this, "_concurrency", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_isPaused", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_resolveEmpty", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: empty
    });
    Object.defineProperty(this, "_resolveIdle", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: empty
    });
    Object.defineProperty(this, "_timeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_throwOnTimeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    }); // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion

    options = Object.assign({
      carryoverConcurrencyCount: false,
      intervalCap: Infinity,
      interval: 0,
      concurrency: Infinity,
      autoStart: true,
      queueClass: priority_queue_1.default
    }, options // TODO: Remove this `as`.
    );

    if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
      throw new TypeError("Expected `intervalCap` to be a number from 1 and up, got `".concat(options.intervalCap, "` (").concat(typeof options.intervalCap, ")"));
    }

    if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError("Expected `interval` to be a finite number >= 0, got `".concat(options.interval, "` (").concat(typeof options.interval, ")"));
    }

    this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
    this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
    this._intervalCap = options.intervalCap;
    this._interval = options.interval;
    this._queue = new options.queueClass();
    this._queueClass = options.queueClass;
    this.concurrency = options.concurrency;
    this._timeout = options.timeout;
    this._throwOnTimeout = options.throwOnTimeout === true;
    this._isPaused = options.autoStart === false;
  }

  get _doesIntervalAllowAnother() {
    return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
  }

  get _doesConcurrentAllowAnother() {
    return this._pendingCount < this._concurrency;
  }

  _next() {
    this._pendingCount--;

    this._tryToStartAnother();
  }

  _resolvePromises() {
    this._resolveEmpty();

    this._resolveEmpty = empty;

    if (this._pendingCount === 0) {
      this._resolveIdle();

      this._resolveIdle = empty;
    }
  }

  _onResumeInterval() {
    this._onInterval();

    this._initializeIntervalIfNeeded();

    this._timeoutId = undefined;
  }

  _isIntervalPaused() {
    const now = Date.now();

    if (this._intervalId === undefined) {
      const delay = this._intervalEnd - now;

      if (delay < 0) {
        // Act as the interval was done
        // We don't need to resume it here because it will be resumed on line 160
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
      } else {
        // Act as the interval is pending
        if (this._timeoutId === undefined) {
          this._timeoutId = setTimeout(() => {
            this._onResumeInterval();
          }, delay);
        }

        return true;
      }
    }

    return false;
  }

  _tryToStartAnother() {
    if (this._queue.size === 0) {
      // We can clear the interval ("pause")
      // Because we can redo it later ("resume")
      if (this._intervalId) {
        clearInterval(this._intervalId);
      }

      this._intervalId = undefined;

      this._resolvePromises();

      return false;
    }

    if (!this._isPaused) {
      const canInitializeInterval = !this._isIntervalPaused();

      if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
        this.emit('active');

        this._queue.dequeue()();

        if (canInitializeInterval) {
          this._initializeIntervalIfNeeded();
        }

        return true;
      }
    }

    return false;
  }

  _initializeIntervalIfNeeded() {
    if (this._isIntervalIgnored || this._intervalId !== undefined) {
      return;
    }

    this._intervalId = setInterval(() => {
      this._onInterval();
    }, this._interval);
    this._intervalEnd = Date.now() + this._interval;
  }

  _onInterval() {
    if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = undefined;
    }

    this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;

    this._processQueue();
  }
  /**
  Executes all queued functions until it reaches the limit.
  */


  _processQueue() {
    // eslint-disable-next-line no-empty
    while (this._tryToStartAnother()) {}
  }

  get concurrency() {
    return this._concurrency;
  }

  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
      throw new TypeError("Expected `concurrency` to be a number from 1 and up, got `".concat(newConcurrency, "` (").concat(typeof newConcurrency, ")"));
    }

    this._concurrency = newConcurrency;

    this._processQueue();
  }
  /**
  Adds a sync or async task to the queue. Always returns a promise.
  */


  async add(fn, options = {}) {
    return new Promise((resolve, reject) => {
      const run = async () => {
        this._pendingCount++;
        this._intervalCount++;

        try {
          const operation = this._timeout === undefined && options.timeout === undefined ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === undefined ? this._timeout : options.timeout, () => {
            if (options.throwOnTimeout === undefined ? this._throwOnTimeout : options.throwOnTimeout) {
              reject(timeoutError);
            }

            return undefined;
          });
          resolve((await operation));
        } catch (error) {
          reject(error);
        }

        this._next();
      };

      this._queue.enqueue(run, options);

      this._tryToStartAnother();
    });
  }
  /**
  Same as `.add()`, but accepts an array of sync or async functions.
   @returns A promise that resolves when all functions are resolved.
  */


  async addAll(functions, options) {
    return Promise.all(functions.map(async function_ => this.add(function_, options)));
  }
  /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */


  start() {
    if (!this._isPaused) {
      return this;
    }

    this._isPaused = false;

    this._processQueue();

    return this;
  }
  /**
  Put queue execution on hold.
  */


  pause() {
    this._isPaused = true;
  }
  /**
  Clear the queue.
  */


  clear() {
    this._queue = new this._queueClass();
  }
  /**
  Can be called multiple times. Useful if you for example add additional items at a later time.
   @returns A promise that settles when the queue becomes empty.
  */


  async onEmpty() {
    // Instantly resolve if the queue is empty
    if (this._queue.size === 0) {
      return;
    }

    return new Promise(resolve => {
      const existingResolve = this._resolveEmpty;

      this._resolveEmpty = () => {
        existingResolve();
        resolve();
      };
    });
  }
  /**
  The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
   @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
  */


  async onIdle() {
    // Instantly resolve if none pending and if nothing else is queued
    if (this._pendingCount === 0 && this._queue.size === 0) {
      return;
    }

    return new Promise(resolve => {
      const existingResolve = this._resolveIdle;

      this._resolveIdle = () => {
        existingResolve();
        resolve();
      };
    });
  }
  /**
  Size of the queue.
  */


  get size() {
    return this._queue.size;
  }
  /**
  Number of pending promises.
  */


  get pending() {
    return this._pendingCount;
  }
  /**
  Whether the queue is currently paused.
  */


  get isPaused() {
    return this._isPaused;
  }
  /**
  Set the timeout for future operations.
  */


  set timeout(milliseconds) {
    this._timeout = milliseconds;
  }

  get timeout() {
    return this._timeout;
  }

}

exports.default = PQueue;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty,
    prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */

function Events() {} //
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//


if (Object.create) {
  Events.prototype = Object.create(null); //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //

  if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */


function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */


function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once),
      evt = prefix ? prefix + event : event;
  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];
  return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */


function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */


function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */


EventEmitter.prototype.eventNames = function eventNames() {
  var names = [],
      events,
      name;
  if (this._eventsCount === 0) return names;

  for (name in events = this._events) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */


EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event,
      handlers = this._events[evt];
  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */


EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event,
      listeners = this._events[evt];
  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */


EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return false;
  var listeners = this._events[evt],
      len = arguments.length,
      args,
      i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1:
        return listeners.fn.call(listeners.context), true;

      case 2:
        return listeners.fn.call(listeners.context, a1), true;

      case 3:
        return listeners.fn.call(listeners.context, a1, a2), true;

      case 4:
        return listeners.fn.call(listeners.context, a1, a2, a3), true;

      case 5:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

      case 6:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len - 1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length,
        j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1:
          listeners[i].fn.call(listeners[i].context);
          break;

        case 2:
          listeners[i].fn.call(listeners[i].context, a1);
          break;

        case 3:
          listeners[i].fn.call(listeners[i].context, a1, a2);
          break;

        case 4:
          listeners[i].fn.call(listeners[i].context, a1, a2, a3);
          break;

        default:
          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
            args[j - 1] = arguments[j];
          }
          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return this;

  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
        events.push(listeners[i]);
      }
    } //
    // Reset the array, or remove it completely if we have no more listeners.
    //


    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);
  }

  return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
}; //
// Alias methods names because people roll like that.
//


EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on; //
// Expose the prefix.
//

EventEmitter.prefixed = prefix; //
// Allow `EventEmitter` to be imported as module namespace.
//

EventEmitter.EventEmitter = EventEmitter; //
// Expose the module.
//

if (true) {
  module.exports = EventEmitter;
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const pFinally = __webpack_require__(52);

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }

}

const pTimeout = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
  if (typeof milliseconds !== 'number' || milliseconds < 0) {
    throw new TypeError('Expected `milliseconds` to be a positive number');
  }

  if (milliseconds === Infinity) {
    resolve(promise);
    return;
  }

  const timer = setTimeout(() => {
    if (typeof fallback === 'function') {
      try {
        resolve(fallback());
      } catch (error) {
        reject(error);
      }

      return;
    }

    const message = typeof fallback === 'string' ? fallback : "Promise timed out after ".concat(milliseconds, " milliseconds");
    const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);

    if (typeof promise.cancel === 'function') {
      promise.cancel();
    }

    reject(timeoutError);
  }, milliseconds); // TODO: Use native `finally` keyword when targeting Node.js 10

  pFinally( // eslint-disable-next-line promise/prefer-await-to-then
  promise.then(resolve, reject), () => {
    clearTimeout(timer);
  });
});

module.exports = pTimeout; // TODO: Remove this for the next major release

module.exports.default = pTimeout;
module.exports.TimeoutError = TimeoutError;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (promise, onFinally) => {
  onFinally = onFinally || (() => {});

  return promise.then(val => new Promise(resolve => {
    resolve(onFinally());
  }).then(() => val), err => new Promise(resolve => {
    resolve(onFinally());
  }).then(() => {
    throw err;
  }));
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const lower_bound_1 = __webpack_require__(54);

class PriorityQueue {
  constructor() {
    Object.defineProperty(this, "_queue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
  }

  enqueue(run, options) {
    options = Object.assign({
      priority: 0
    }, options);
    const element = {
      priority: options.priority,
      run
    };

    if (this.size && this._queue[this.size - 1].priority >= options.priority) {
      this._queue.push(element);

      return;
    }

    const index = lower_bound_1.default(this._queue, element, (a, b) => b.priority - a.priority);

    this._queue.splice(index, 0, element);
  }

  dequeue() {
    const item = this._queue.shift();

    return item && item.run;
  }

  get size() {
    return this._queue.length;
  }

}

exports.default = PriorityQueue;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Port of lower_bound from http://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion

function lowerBound(array, value, comparator) {
  let first = 0;
  let count = array.length;

  while (count > 0) {
    const step = count / 2 | 0;
    let it = first + step;

    if (comparator(array[it], value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }

  return first;
}

exports.default = lowerBound;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = set;
/*
  var obj1 = {};
  set(obj1, 'a.aa.aaa', 4}); // true
  obj1; // {a: {aa: {aaa: 4}}}

  var obj2 = {};
  set(obj2, [a, aa, aaa], 4}); // true
  obj2; // {a: {aa: {aaa: 4}}}

  var obj3 = {a: {aa: {aaa: 2}}};
  set(obj3, 'a.aa.aaa', 3); // true
  obj3; // {a: {aa: {aaa: 3}}}

  // don't clobber existing
  var obj4 = {a: {aa: {aaa: 2}}};
  set(obj4, 'a.aa', {bbb: 7}); // false

  const obj5 = {a: {}};
  const sym = Symbol();
  set(obj5.a, sym, 7); // true
  obj5; // {a: {Symbol(): 7}}
*/

function set(obj, props, value) {
  if (typeof props == 'string') {
    props = props.split('.');
  }

  if (typeof props == 'symbol') {
    props = [props];
  }

  var lastProp = props.pop();

  if (!lastProp) {
    return false;
  }

  var thisProp;

  while (thisProp = props.shift()) {
    if (typeof obj[thisProp] == 'undefined') {
      obj[thisProp] = {};
    }

    obj = obj[thisProp];

    if (!obj || typeof obj != 'object') {
      return false;
    }
  }

  obj[lastProp] = value;
  return true;
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const Key = __webpack_require__(1).Key;

const sortKeys = __webpack_require__(57);

const specKey = new Key('datastore_spec');

module.exports = store => {
  return {
    /**
     * Check if a datastore spec file exists.
     *
     * @returns {Promise<bool>}
     */
    async exists() {
      // eslint-disable-line require-await
      return store.has(specKey);
    },

    /**
     * Get the current datastore spec.
     *
     * @returns {Promise<Buffer>}
     */
    async get() {
      const buf = await store.get(specKey);
      return JSON.parse(buf.toString());
    },

    /**
     * Set the datastore spec of the repo, writing it to the underlying store.
     * TODO unclear on what the type should be or if it's required
     * @param {number} spec
     * @returns {Promise<void>}
     */
    async set(spec) {
      // eslint-disable-line require-await
      return store.put(specKey, Buffer.from(JSON.stringify(sortKeys(spec, {
        deep: true
      }))));
    }

  };
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const isPlainObject = __webpack_require__(58);

module.exports = (object, options = {}) => {
  if (!isPlainObject(object)) {
    throw new TypeError('Expected a plain object');
  }

  const {
    deep
  } = options;
  const seenInput = [];
  const seenOutput = [];

  const deepSortArray = array => {
    const seenIndex = seenInput.indexOf(array);

    if (seenIndex !== -1) {
      return seenOutput[seenIndex];
    }

    const result = [];
    seenInput.push(array);
    seenOutput.push(result);
    result.push(...array.map(item => {
      if (Array.isArray(item)) {
        return deepSortArray(item);
      }

      if (isPlainObject(item)) {
        return sortKeys(item);
      }

      return item;
    }));
    return result;
  };

  const sortKeys = object => {
    const seenIndex = seenInput.indexOf(object);

    if (seenIndex !== -1) {
      return seenOutput[seenIndex];
    }

    const result = {};
    const keys = Object.keys(object).sort(options.compare);
    seenInput.push(object);
    seenOutput.push(result);

    for (const key of keys) {
      const value = object[key];

      if (deep && Array.isArray(value)) {
        result[key] = deepSortArray(value);
        continue;
      }

      result[key] = deep && isPlainObject(value) ? sortKeys(value) : value;
    }

    return result;
  };

  return sortKeys(object);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = value => {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const Key = __webpack_require__(1).Key;

const apiFile = new Key('api');

module.exports = store => {
  return {
    /**
     * Get the current configuration from the repo.
     *
     * @returns {Promise<String>}
     */
    async get() {
      const value = await store.get(apiFile);
      return value && value.toString();
    },

    /**
     * Set the current configuration for this repo.
     *
     * @param {Object} value - the api address to be written
     * @returns {Promise<?>}
     */
    async set(value) {
      // eslint-disable-line require-await
      return store.put(apiFile, Buffer.from(value.toString()));
    },

    /**
     * Deletes api file
     *
     * @returns {Promise<void>}
     */
    async delete() {
      // eslint-disable-line require-await
      return store.delete(apiFile);
    }

  };
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

const core = __webpack_require__(61);

const ShardingStore = core.ShardingDatastore;

const Block = __webpack_require__(67);

const CID = __webpack_require__(9);

const errcode = __webpack_require__(5);

const {
  cidToKey
} = __webpack_require__(20);

module.exports = async (filestore, options) => {
  const store = await maybeWithSharding(filestore, options);
  return createBaseStore(store);
};

function maybeWithSharding(filestore, options) {
  if (options.sharding) {
    const shard = new core.shard.NextToLast(2);
    return ShardingStore.createOrOpen(filestore, shard);
  }

  return filestore;
}

function createBaseStore(store) {
  return {
    /**
     * Query the store.
     *
     * @param {object} query
     * @return {Iterable}
     */
    query(query) {
      return _wrapAsyncGenerator(function* () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;

        var _iteratorError;

        try {
          for (var _iterator = _asyncIterator(store.query(query)), _step, _value; _step = yield _awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield _awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
            const block = _value;
            yield block;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              yield _awaitAsyncGenerator(_iterator.return());
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      })();
    },

    /**
     * Get a single block by CID.
     *
     * @param {CID} cid
     * @returns {Promise<Block>}
     */
    async get(cid) {
      if (!CID.isCID(cid)) {
        throw errcode(new Error('Not a valid cid'), 'ERR_INVALID_CID');
      }

      const key = cidToKey(cid);
      let blockData;

      try {
        blockData = await store.get(key);
        return new Block(blockData, cid);
      } catch (err) {
        if (err.code === 'ERR_NOT_FOUND') {
          const otherCid = cidToOtherVersion(cid);

          if (!otherCid) {
            throw err;
          }

          const otherKey = cidToKey(otherCid);
          const blockData = await store.get(otherKey);
          await store.put(key, blockData);
          return new Block(blockData, cid);
        }

        throw err;
      }
    },

    /**
     * Write a single block to the store.
     *
     * @param {Block} block
     * @returns {Promise<void>}
     */
    async put(block) {
      if (!Block.isBlock(block)) {
        throw new Error('invalid block');
      }

      const k = cidToKey(block.cid);
      const exists = await store.has(k);
      if (exists) return;
      return store.put(k, block.data);
    },

    /**
     * Like put, but for more.
     *
     * @param {AsyncIterable<Block>|Iterable<Block>} blocks
     * @returns {Promise<void>}
     */
    async putMany(blocks) {
      const batch = store.batch();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;

      var _iteratorError2;

      try {
        for (var _iterator2 = _asyncIterator(blocks), _step2, _value2; _step2 = await _iterator2.next(), _iteratorNormalCompletion2 = _step2.done, _value2 = await _step2.value, !_iteratorNormalCompletion2; _iteratorNormalCompletion2 = true) {
          const block = _value2;
          const key = cidToKey(block.cid);

          if (await store.has(key)) {
            continue;
          }

          batch.put(key, block.data);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            await _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return batch.commit();
    },

    /**
     * Does the store contain block with this cid?
     *
     * @param {CID} cid
     * @returns {Promise<bool>}
     */
    async has(cid) {
      if (!CID.isCID(cid)) {
        throw errcode(new Error('Not a valid cid'), 'ERR_INVALID_CID');
      }

      const exists = await store.has(cidToKey(cid));
      if (exists) return exists;
      const otherCid = cidToOtherVersion(cid);
      if (!otherCid) return false;
      return store.has(cidToKey(otherCid));
    },

    /**
     * Delete a block from the store
     *
     * @param {CID} cid
     * @returns {Promise<void>}
     */
    async delete(cid) {
      // eslint-disable-line require-await
      if (!CID.isCID(cid)) {
        throw errcode(new Error('Not a valid cid'), 'ERR_INVALID_CID');
      }

      return store.delete(cidToKey(cid));
    },

    /**
     * Close the store
     *
     * @returns {Promise<void>}
     */
    async close() {
      // eslint-disable-line require-await
      return store.close();
    }

  };
}

function cidToOtherVersion(cid) {
  try {
    return cid.version === 0 ? cid.toV1() : cid.toV0();
  } catch (err) {
    return null;
  }
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const KeytransformDatastore = __webpack_require__(6);

const ShardingDatastore = __webpack_require__(62);

const MountDatastore = __webpack_require__(64);

const TieredDatastore = __webpack_require__(65);

const NamespaceDatastore = __webpack_require__(66);

const shard = __webpack_require__(17);

exports.KeytransformDatastore = KeytransformDatastore;
exports.ShardingDatastore = ShardingDatastore;
exports.MountDatastore = MountDatastore;
exports.TieredDatastore = TieredDatastore;
exports.NamespaceDatastore = NamespaceDatastore;
exports.shard = shard;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const Key = __webpack_require__(1).Key;

const sh = __webpack_require__(17);

const KeytransformStore = __webpack_require__(6);

const shardKey = new Key(sh.SHARDING_FN);
const shardReadmeKey = new Key(sh.README_FN);
/**
 * Backend independent abstraction of go-ds-flatfs.
 *
 * Wraps another datastore such that all values are stored
 * sharded according to the given sharding function.
 */

class ShardingDatastore {
  constructor(store, shard) {
    this.child = new KeytransformStore(store, {
      convert: this._convertKey.bind(this),
      invert: this._invertKey.bind(this)
    });
    this.shard = shard;
  }

  open() {
    return this.child.open();
  }

  _convertKey(key) {
    const s = key.toString();

    if (s === shardKey.toString() || s === shardReadmeKey.toString()) {
      return key;
    }

    const parent = new Key(this.shard.fun(s));
    return parent.child(key);
  }

  _invertKey(key) {
    const s = key.toString();

    if (s === shardKey.toString() || s === shardReadmeKey.toString()) {
      return key;
    }

    return Key.withNamespaces(key.list().slice(1));
  }

  static async createOrOpen(store, shard) {
    try {
      await ShardingDatastore.create(store, shard);
    } catch (err) {
      if (err && err.message !== 'datastore exists') throw err;
    }

    return ShardingDatastore.open(store);
  }

  static async open(store) {
    const shard = await sh.readShardFun('/', store);
    return new ShardingDatastore(store, shard);
  }

  static async create(store, shard) {
    const exists = await store.has(shardKey);

    if (!exists) {
      const put = typeof store.putRaw === 'function' ? store.putRaw.bind(store) : store.put.bind(store);
      return Promise.all([put(shardKey, Buffer.from(shard.toString() + '\n')), put(shardReadmeKey, Buffer.from(sh.readme))]);
    }

    const diskShard = await sh.readShardFun('/', store);
    const a = (diskShard || '').toString();
    const b = shard.toString();
    if (a !== b) throw new Error("specified fun ".concat(b, " does not match repo shard fun ").concat(a));
    throw new Error('datastore exists');
  }

  put(key, val) {
    return this.child.put(key, val);
  }

  get(key) {
    return this.child.get(key);
  }

  has(key) {
    return this.child.has(key);
  }

  delete(key) {
    return this.child.delete(key);
  }

  batch() {
    return this.child.batch();
  }

  query(q) {
    const tq = {
      keysOnly: q.keysOnly,
      offset: q.offset,
      limit: q.limit,
      filters: [e => e.key.toString() !== shardKey.toString(), e => e.key.toString() !== shardReadmeKey.toString()]
    };

    if (q.prefix != null) {
      tq.filters.push(e => {
        return this._invertKey(e.key).toString().startsWith(q.prefix);
      });
    }

    if (q.filters != null) {
      const filters = q.filters.map(f => e => {
        return f(Object.assign({}, e, {
          key: this._invertKey(e.key)
        }));
      });
      tq.filters = tq.filters.concat(filters);
    }

    if (q.orders != null) {
      tq.orders = q.orders.map(o => async res => {
        res.forEach(e => {
          e.key = this._invertKey(e.key);
        });
        const ordered = await o(res);
        ordered.forEach(e => {
          e.key = this._convertKey(e.key);
        });
        return ordered;
      });
    }

    return this.child.query(tq);
  }

  close() {
    return this.child.close();
  }

}

module.exports = ShardingDatastore;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "This is a repository of IPLD objects. Each IPLD object is in a single file,\nnamed <base32 encoding of cid>.data. Where <base32 encoding of cid> is the\n\"base32\" encoding of the CID (as specified in\nhttps://github.com/multiformats/multibase) without the 'B' prefix.\nAll the object files are placed in a tree of directories, based on a\nfunction of the CID. This is a form of sharding similar to\nthe objects directory in git repositories. Previously, we used\nprefixes, we now use the next-to-last two charters.\n    func NextToLast(base32cid string) {\n      nextToLastLen := 2\n      offset := len(base32cid) - nextToLastLen - 1\n      return str[offset : offset+nextToLastLen]\n    }\nFor example, an object with a base58 CIDv1 of\n    zb2rhYSxw4ZjuzgCnWSt19Q94ERaeFhu9uSqRgjSdx9bsgM6f\nhas a base32 CIDv1 of\n    BAFKREIA22FLID5AJ2KU7URG47MDLROZIH6YF2KALU2PWEFPVI37YLKRSCA\nand will be placed at\n    SC/AFKREIA22FLID5AJ2KU7URG47MDLROZIH6YF2KALU2PWEFPVI37YLKRSCA.data\nwith 'SC' being the last-to-next two characters and the 'B' at the\nbeginning of the CIDv1 string is the multibase prefix that is not\nstored in the filename.\n";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* @flow */


function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

const Key = __webpack_require__(1).Key;

const Errors = __webpack_require__(1).Errors;

const utils = __webpack_require__(1).utils;

const filter = utils.filter;
const take = utils.take;
const sortAll = utils.sortAll;
const replaceStartWith = utils.replaceStartWith;

const Keytransform = __webpack_require__(6);
/**
 * A datastore that can combine multiple stores inside various
 * key prefixs.
 */


class MountDatastore {
  constructor(mounts) {
    this.mounts = mounts.slice();
  }

  open() {
    return Promise.all(this.mounts.map(m => m.datastore.open()));
  }
  /**
   * Lookup the matching datastore for the given key.
   *
   * @private
   * @param {Key} key
   * @returns {{Datastore, Key, Key}}
   */


  _lookup(key) {
    for (const mount of this.mounts) {
      if (mount.prefix.toString() === key.toString() || mount.prefix.isAncestorOf(key)) {
        const s = replaceStartWith(key.toString(), mount.prefix.toString());
        return {
          datastore: mount.datastore,
          mountpoint: mount.prefix,
          rest: new Key(s)
        };
      }
    }
  }

  put(key, value) {
    const match = this._lookup(key);

    if (match == null) {
      throw Errors.dbWriteFailedError(new Error('No datastore mounted for this key'));
    }

    return match.datastore.put(match.rest, value);
  }

  get(key) {
    const match = this._lookup(key);

    if (match == null) {
      throw Errors.notFoundError(new Error('No datastore mounted for this key'));
    }

    return match.datastore.get(match.rest);
  }

  has(key) {
    const match = this._lookup(key);

    if (match == null) {
      return false;
    }

    return match.datastore.has(match.rest);
  }

  delete(key) {
    const match = this._lookup(key);

    if (match == null) {
      throw Errors.dbDeleteFailedError(new Error('No datastore mounted for this key'));
    }

    return match.datastore.delete(match.rest);
  }

  close() {
    return Promise.all(this.mounts.map(m => {
      return m.datastore.close();
    }));
  }

  batch() {
    const batchMounts = {};

    const lookup = key => {
      const match = this._lookup(key);

      if (match == null) {
        throw new Error('No datastore mounted for this key');
      }

      const m = match.mountpoint.toString();

      if (batchMounts[m] == null) {
        batchMounts[m] = match.datastore.batch();
      }

      return {
        batch: batchMounts[m],
        rest: match.rest
      };
    };

    return {
      put: (key, value) => {
        const match = lookup(key);
        match.batch.put(match.rest, value);
      },
      delete: key => {
        const match = lookup(key);
        match.batch.delete(match.rest);
      },
      commit: () => {
        return Promise.all(Object.keys(batchMounts).map(p => batchMounts[p].commit()));
      }
    };
  }

  query(q) {
    const qs = this.mounts.map(m => {
      const ks = new Keytransform(m.datastore, {
        convert: key => {
          throw new Error('should never be called');
        },
        invert: key => {
          return m.prefix.child(key);
        }
      });
      let prefix;

      if (q.prefix != null) {
        prefix = replaceStartWith(q.prefix, m.prefix.toString());
      }

      return ks.query({
        prefix: prefix,
        filters: q.filters,
        keysOnly: q.keysOnly
      });
    });

    let it = _many(qs);

    if (q.filters) q.filters.forEach(f => {
      it = filter(it, f);
    });
    if (q.orders) q.orders.forEach(o => {
      it = sortAll(it, o);
    });

    if (q.offset != null) {
      let i = 0;
      it = filter(it, () => i++ >= q.offset);
    }

    if (q.limit != null) it = take(it, q.limit);
    return it;
  }

}

function _many(iterable) {
  return _wrapAsyncGenerator(function* () {
    for (let i = 0; i < iterable.length; i++) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;

      var _iteratorError;

      try {
        for (var _iterator = _asyncIterator(iterable[i]), _step, _value; _step = yield _awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield _awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
          const v = _value;
          yield v;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            yield _awaitAsyncGenerator(_iterator.return());
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  })();
}

module.exports = MountDatastore;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Errors = __webpack_require__(1).Errors;

const log = __webpack_require__(2)('datastore:core:tiered');
/**
 * A datastore that can combine multiple stores. Puts and deletes
 * will write through to all datastores. Has and get will
 * try each store sequentially. Query will always try the
 * last one first.
 *
 */


class TieredDatastore {
  constructor(stores) {
    this.stores = stores.slice();
  }

  async open() {
    try {
      await Promise.all(this.stores.map(store => store.open()));
    } catch (err) {
      throw Errors.dbOpenFailedError();
    }
  }

  async put(key, value) {
    try {
      await Promise.all(this.stores.map(store => store.put(key, value)));
    } catch (err) {
      throw Errors.dbWriteFailedError();
    }
  }

  async get(key) {
    for (const store of this.stores) {
      try {
        const res = await store.get(key);
        if (res) return res;
      } catch (err) {
        log(err);
      }
    }

    throw Errors.notFoundError();
  }

  async has(key) {
    for (const s of this.stores) {
      if (await s.has(key)) {
        return true;
      }
    }

    return false;
  }

  async delete(key) {
    try {
      await Promise.all(this.stores.map(store => store.delete(key)));
    } catch (err) {
      throw Errors.dbDeleteFailedError();
    }
  }

  async close() {
    await Promise.all(this.stores.map(store => store.close()));
  }

  batch() {
    const batches = this.stores.map(store => store.batch());
    return {
      put: (key, value) => {
        batches.forEach(b => b.put(key, value));
      },
      delete: key => {
        batches.forEach(b => b.delete(key));
      },
      commit: async () => {
        for (const batch of batches) {
          await batch.commit();
        }
      }
    };
  }

  query(q) {
    return this.stores[this.stores.length - 1].query(q);
  }

}

module.exports = TieredDatastore;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Key = __webpack_require__(1).Key;

const KeytransformDatastore = __webpack_require__(6);
/**
 * Wraps a given datastore into a keytransform which
 * makes a given prefix transparent.
 *
 * For example, if the prefix is `new Key(/hello)` a call
 * to `store.put(new Key('/world'), mydata)` would store the data under
 * `/hello/world`.
 *
 */


class NamespaceDatastore extends KeytransformDatastore {
  constructor(child, prefix) {
    super(child, {
      convert(key) {
        return prefix.child(key);
      },

      invert(key) {
        if (prefix.toString() === '/') {
          return key;
        }

        if (!prefix.isAncestorOf(key)) {
          throw new Error("Expected prefix: (".concat(prefix.toString(), ") in key: ").concat(key.toString()));
        }

        return new Key(key.toString().slice(prefix.toString().length), false);
      }

    });
    this.prefix = prefix;
  }

  query(q) {
    if (q.prefix && this.prefix.toString() !== '/') {
      return super.query(Object.assign({}, q, {
        prefix: this.prefix.child(new Key(q.prefix)).toString()
      }));
    }

    return super.query(q);
  }

}

module.exports = NamespaceDatastore;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

const CID = __webpack_require__(9);

const withIs = __webpack_require__(7);
/**
 * Represents an immutable block of data that is uniquely referenced with a cid.
 *
 * @constructor
 * @param {Buffer} data - The data to be stored in the block as a buffer.
 * @param {CID} cid - The cid of the data
 *
 * @example
 * const block = new Block(new Buffer('a012d83b20f9371...'))
 */


class Block {
  constructor(data, cid) {
    if (!data || !Buffer.isBuffer(data)) {
      throw new Error('first argument  must be a buffer');
    }

    if (!cid || !CID.isCID(cid)) {
      throw new Error('second argument must be a CID');
    }

    this._data = data;
    this._cid = cid;
  }
  /**
   * The data of this block.
   *
   * @type {Buffer}
   */


  get data() {
    return this._data;
  }

  set data(val) {
    throw new Error('Tried to change an immutable block');
  }
  /**
   * The cid of the data this block represents.
   *
   * @type {CID}
   */


  get cid() {
    return this._cid;
  }

  set cid(val) {
    throw new Error('Tried to change an immutable block');
  }

}

module.exports = withIs(Block, {
  className: 'Block',
  symbolName: '@ipld/js-ipld-block/block'
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Base = __webpack_require__(69);

const baseX = __webpack_require__(70);

const base16 = __webpack_require__(72);

const base32 = __webpack_require__(73);

const base64 = __webpack_require__(74); // name, code, implementation, alphabet


const constants = [['base1', '1', '', '1'], ['base2', '0', baseX, '01'], ['base8', '7', baseX, '01234567'], ['base10', '9', baseX, '0123456789'], ['base16', 'f', base16, '0123456789abcdef'], ['base32', 'b', base32, 'abcdefghijklmnopqrstuvwxyz234567'], ['base32pad', 'c', base32, 'abcdefghijklmnopqrstuvwxyz234567='], ['base32hex', 'v', base32, '0123456789abcdefghijklmnopqrstuv'], ['base32hexpad', 't', base32, '0123456789abcdefghijklmnopqrstuv='], ['base32z', 'h', base32, 'ybndrfg8ejkmcpqxot1uwisza345h769'], ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'], ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'], ['base64', 'm', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'], ['base64pad', 'M', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='], ['base64url', 'u', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'], ['base64urlpad', 'U', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=']];
const names = constants.reduce((prev, tupple) => {
  prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3]);
  return prev;
}, {});
const codes = constants.reduce((prev, tupple) => {
  prev[tupple[1]] = names[tupple[0]];
  return prev;
}, {});
module.exports = {
  names: names,
  codes: codes
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Base {
  constructor(name, code, implementation, alphabet) {
    this.name = name;
    this.code = code;
    this.alphabet = alphabet;

    if (implementation && alphabet) {
      this.engine = implementation(alphabet);
    }
  }

  encode(stringOrBuffer) {
    return this.engine.encode(stringOrBuffer);
  }

  decode(stringOrBuffer) {
    return this.engine.decode(stringOrBuffer);
  }

  isImplemented() {
    return this.engine;
  }

}

module.exports = Base;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
// @ts-ignore

var _Buffer = __webpack_require__(71).Buffer;

function base(ALPHABET) {
  if (ALPHABET.length >= 255) {
    throw new TypeError('Alphabet too long');
  }

  var BASE_MAP = new Uint8Array(256);

  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }

  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);

    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + ' is ambiguous');
    }

    BASE_MAP[xc] = i;
  }

  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up

  var iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up

  function encode(source) {
    if (Array.isArray(source) || source instanceof Uint8Array) {
      source = _Buffer.from(source);
    }

    if (!_Buffer.isBuffer(source)) {
      throw new TypeError('Expected Buffer');
    }

    if (source.length === 0) {
      return '';
    } // Skip & count leading zeroes.


    var zeroes = 0;
    var length = 0;
    var pbegin = 0;
    var pend = source.length;

    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    } // Allocate enough space in big-endian base58 representation.


    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size); // Process the bytes.

    while (pbegin !== pend) {
      var carry = source[pbegin]; // Apply "b58 = b58 * 256 + ch".

      var i = 0;

      for (var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }

      if (carry !== 0) {
        throw new Error('Non-zero carry');
      }

      length = i;
      pbegin++;
    } // Skip leading zeroes in base58 result.


    var it2 = size - length;

    while (it2 !== size && b58[it2] === 0) {
      it2++;
    } // Translate the result into a string.


    var str = LEADER.repeat(zeroes);

    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }

    return str;
  }

  function decodeUnsafe(source) {
    if (typeof source !== 'string') {
      throw new TypeError('Expected String');
    }

    if (source.length === 0) {
      return _Buffer.alloc(0);
    }

    var psz = 0; // Skip leading spaces.

    if (source[psz] === ' ') {
      return;
    } // Skip and count leading '1's.


    var zeroes = 0;
    var length = 0;

    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    } // Allocate enough space in big-endian base256 representation.


    var size = (source.length - psz) * FACTOR + 1 >>> 0; // log(58) / log(256), rounded up.

    var b256 = new Uint8Array(size); // Process the characters.

    while (source[psz]) {
      // Decode character
      var carry = BASE_MAP[source.charCodeAt(psz)]; // Invalid character

      if (carry === 255) {
        return;
      }

      var i = 0;

      for (var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }

      if (carry !== 0) {
        throw new Error('Non-zero carry');
      }

      length = i;
      psz++;
    } // Skip trailing spaces.


    if (source[psz] === ' ') {
      return;
    } // Skip leading zeroes in b256.


    var it4 = size - length;

    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }

    var vch = _Buffer.allocUnsafe(zeroes + (size - it4));

    vch.fill(0x00, 0, zeroes);
    var j = zeroes;

    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }

    return vch;
  }

  function decode(string) {
    var buffer = decodeUnsafe(string);

    if (buffer) {
      return buffer;
    }

    throw new Error('Non-base' + BASE + ' character');
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  };
}

module.exports = base;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(0);

var Buffer = buffer.Buffer; // alternative to using Object.keys for old browsers

function copyProps(src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}

if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer(arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length);
} // Copy static methods from Buffer


copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number');
  }

  return Buffer(arg, encodingOrOffset, length);
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  var buf = Buffer(size);

  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }

  return buf;
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return Buffer(size);
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return buffer.SlowBuffer(size);
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

module.exports = function base16(alphabet) {
  return {
    encode(input) {
      if (typeof input === 'string') {
        return Buffer.from(input).toString('hex');
      }

      return input.toString('hex');
    },

    decode(input) {
      for (const char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base16 character');
        }
      }

      return Buffer.from(input, 'hex');
    }

  };
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function decode(input, alphabet) {
  input = input.replace(new RegExp('=', 'g'), '');
  const length = input.length;
  let bits = 0;
  let value = 0;
  let index = 0;
  const output = new Uint8Array(length * 5 / 8 | 0);

  for (let i = 0; i < length; i++) {
    value = value << 5 | alphabet.indexOf(input[i]);
    bits += 5;

    if (bits >= 8) {
      output[index++] = value >>> bits - 8 & 255;
      bits -= 8;
    }
  }

  return output.buffer;
}

function encode(buffer, alphabet) {
  const length = buffer.byteLength;
  const view = new Uint8Array(buffer);
  const padding = alphabet.indexOf('=') === alphabet.length - 1;

  if (padding) {
    alphabet = alphabet.substring(0, alphabet.length - 1);
  }

  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < length; i++) {
    value = value << 8 | view[i];
    bits += 8;

    while (bits >= 5) {
      output += alphabet[value >>> bits - 5 & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += alphabet[value << 5 - bits & 31];
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += '=';
    }
  }

  return output;
}

module.exports = function base32(alphabet) {
  return {
    encode(input) {
      if (typeof input === 'string') {
        return encode(Uint8Array.from(input), alphabet);
      }

      return encode(input, alphabet);
    },

    decode(input) {
      for (const char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base32 character');
        }
      }

      return decode(input, alphabet);
    }

  };
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  Buffer
} = __webpack_require__(0);

module.exports = function base64(alphabet) {
  // The alphabet is only used to know:
  //   1. If padding is enabled (must contain '=')
  //   2. If the output must be url-safe (must contain '-' and '_')
  //   3. If the input of the output function is valid
  // The alphabets from RFC 4648 are always used.
  const padding = alphabet.indexOf('=') > -1;
  const url = alphabet.indexOf('-') > -1 && alphabet.indexOf('_') > -1;
  return {
    encode(input) {
      let output = '';

      if (typeof input === 'string') {
        output = Buffer.from(input).toString('base64');
      } else {
        output = input.toString('base64');
      }

      if (url) {
        output = output.replace(/\+/g, '-').replace(/\//g, '_');
      }

      const pad = output.indexOf('=');

      if (pad > 0 && !padding) {
        output = output.substring(0, pad);
      }

      return output;
    },

    decode(input) {
      for (const char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base64 character');
        }
      }

      return Buffer.from(input, 'base64');
    }

  };
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = encode;
var MSB = 0x80,
    REST = 0x7F,
    MSBALL = ~REST,
    INT = Math.pow(2, 31);

function encode(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;

  while (num >= INT) {
    out[offset++] = num & 0xFF | MSB;
    num /= 128;
  }

  while (num & MSBALL) {
    out[offset++] = num & 0xFF | MSB;
    num >>>= 7;
  }

  out[offset] = num | 0;
  encode.bytes = offset - oldOffset + 1;
  return out;
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = read;
var MSB = 0x80,
    REST = 0x7F;

function read(buf, offset) {
  var res = 0,
      offset = offset || 0,
      shift = 0,
      counter = offset,
      b,
      l = buf.length;

  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError('Could not decode varint');
    }

    b = buf[counter++];
    res += shift < 28 ? (b & REST) << shift : (b & REST) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB);

  read.bytes = counter - offset;
  return res;
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);

module.exports = function (value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint quote-props: off */

/* eslint key-spacing: off */


exports.names = Object.freeze({
  'identity': 0x0,
  'sha1': 0x11,
  'sha2-256': 0x12,
  'sha2-512': 0x13,
  'dbl-sha2-256': 0x56,
  'sha3-224': 0x17,
  'sha3-256': 0x16,
  'sha3-384': 0x15,
  'sha3-512': 0x14,
  'shake-128': 0x18,
  'shake-256': 0x19,
  'keccak-224': 0x1A,
  'keccak-256': 0x1B,
  'keccak-384': 0x1C,
  'keccak-512': 0x1D,
  'murmur3-128': 0x22,
  'murmur3-32': 0x23,
  'blake2b-8': 0xb201,
  'blake2b-16': 0xb202,
  'blake2b-24': 0xb203,
  'blake2b-32': 0xb204,
  'blake2b-40': 0xb205,
  'blake2b-48': 0xb206,
  'blake2b-56': 0xb207,
  'blake2b-64': 0xb208,
  'blake2b-72': 0xb209,
  'blake2b-80': 0xb20a,
  'blake2b-88': 0xb20b,
  'blake2b-96': 0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8': 0xb241,
  'blake2s-16': 0xb242,
  'blake2s-24': 0xb243,
  'blake2s-32': 0xb244,
  'blake2s-40': 0xb245,
  'blake2s-48': 0xb246,
  'blake2s-56': 0xb247,
  'blake2s-64': 0xb248,
  'blake2s-72': 0xb249,
  'blake2s-80': 0xb24a,
  'blake2s-88': 0xb24b,
  'blake2s-96': 0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'Skein256-8': 0xb301,
  'Skein256-16': 0xb302,
  'Skein256-24': 0xb303,
  'Skein256-32': 0xb304,
  'Skein256-40': 0xb305,
  'Skein256-48': 0xb306,
  'Skein256-56': 0xb307,
  'Skein256-64': 0xb308,
  'Skein256-72': 0xb309,
  'Skein256-80': 0xb30a,
  'Skein256-88': 0xb30b,
  'Skein256-96': 0xb30c,
  'Skein256-104': 0xb30d,
  'Skein256-112': 0xb30e,
  'Skein256-120': 0xb30f,
  'Skein256-128': 0xb310,
  'Skein256-136': 0xb311,
  'Skein256-144': 0xb312,
  'Skein256-152': 0xb313,
  'Skein256-160': 0xb314,
  'Skein256-168': 0xb315,
  'Skein256-176': 0xb316,
  'Skein256-184': 0xb317,
  'Skein256-192': 0xb318,
  'Skein256-200': 0xb319,
  'Skein256-208': 0xb31a,
  'Skein256-216': 0xb31b,
  'Skein256-224': 0xb31c,
  'Skein256-232': 0xb31d,
  'Skein256-240': 0xb31e,
  'Skein256-248': 0xb31f,
  'Skein256-256': 0xb320,
  'Skein512-8': 0xb321,
  'Skein512-16': 0xb322,
  'Skein512-24': 0xb323,
  'Skein512-32': 0xb324,
  'Skein512-40': 0xb325,
  'Skein512-48': 0xb326,
  'Skein512-56': 0xb327,
  'Skein512-64': 0xb328,
  'Skein512-72': 0xb329,
  'Skein512-80': 0xb32a,
  'Skein512-88': 0xb32b,
  'Skein512-96': 0xb32c,
  'Skein512-104': 0xb32d,
  'Skein512-112': 0xb32e,
  'Skein512-120': 0xb32f,
  'Skein512-128': 0xb330,
  'Skein512-136': 0xb331,
  'Skein512-144': 0xb332,
  'Skein512-152': 0xb333,
  'Skein512-160': 0xb334,
  'Skein512-168': 0xb335,
  'Skein512-176': 0xb336,
  'Skein512-184': 0xb337,
  'Skein512-192': 0xb338,
  'Skein512-200': 0xb339,
  'Skein512-208': 0xb33a,
  'Skein512-216': 0xb33b,
  'Skein512-224': 0xb33c,
  'Skein512-232': 0xb33d,
  'Skein512-240': 0xb33e,
  'Skein512-248': 0xb33f,
  'Skein512-256': 0xb340,
  'Skein512-264': 0xb341,
  'Skein512-272': 0xb342,
  'Skein512-280': 0xb343,
  'Skein512-288': 0xb344,
  'Skein512-296': 0xb345,
  'Skein512-304': 0xb346,
  'Skein512-312': 0xb347,
  'Skein512-320': 0xb348,
  'Skein512-328': 0xb349,
  'Skein512-336': 0xb34a,
  'Skein512-344': 0xb34b,
  'Skein512-352': 0xb34c,
  'Skein512-360': 0xb34d,
  'Skein512-368': 0xb34e,
  'Skein512-376': 0xb34f,
  'Skein512-384': 0xb350,
  'Skein512-392': 0xb351,
  'Skein512-400': 0xb352,
  'Skein512-408': 0xb353,
  'Skein512-416': 0xb354,
  'Skein512-424': 0xb355,
  'Skein512-432': 0xb356,
  'Skein512-440': 0xb357,
  'Skein512-448': 0xb358,
  'Skein512-456': 0xb359,
  'Skein512-464': 0xb35a,
  'Skein512-472': 0xb35b,
  'Skein512-480': 0xb35c,
  'Skein512-488': 0xb35d,
  'Skein512-496': 0xb35e,
  'Skein512-504': 0xb35f,
  'Skein512-512': 0xb360,
  'Skein1024-8': 0xb361,
  'Skein1024-16': 0xb362,
  'Skein1024-24': 0xb363,
  'Skein1024-32': 0xb364,
  'Skein1024-40': 0xb365,
  'Skein1024-48': 0xb366,
  'Skein1024-56': 0xb367,
  'Skein1024-64': 0xb368,
  'Skein1024-72': 0xb369,
  'Skein1024-80': 0xb36a,
  'Skein1024-88': 0xb36b,
  'Skein1024-96': 0xb36c,
  'Skein1024-104': 0xb36d,
  'Skein1024-112': 0xb36e,
  'Skein1024-120': 0xb36f,
  'Skein1024-128': 0xb370,
  'Skein1024-136': 0xb371,
  'Skein1024-144': 0xb372,
  'Skein1024-152': 0xb373,
  'Skein1024-160': 0xb374,
  'Skein1024-168': 0xb375,
  'Skein1024-176': 0xb376,
  'Skein1024-184': 0xb377,
  'Skein1024-192': 0xb378,
  'Skein1024-200': 0xb379,
  'Skein1024-208': 0xb37a,
  'Skein1024-216': 0xb37b,
  'Skein1024-224': 0xb37c,
  'Skein1024-232': 0xb37d,
  'Skein1024-240': 0xb37e,
  'Skein1024-248': 0xb37f,
  'Skein1024-256': 0xb380,
  'Skein1024-264': 0xb381,
  'Skein1024-272': 0xb382,
  'Skein1024-280': 0xb383,
  'Skein1024-288': 0xb384,
  'Skein1024-296': 0xb385,
  'Skein1024-304': 0xb386,
  'Skein1024-312': 0xb387,
  'Skein1024-320': 0xb388,
  'Skein1024-328': 0xb389,
  'Skein1024-336': 0xb38a,
  'Skein1024-344': 0xb38b,
  'Skein1024-352': 0xb38c,
  'Skein1024-360': 0xb38d,
  'Skein1024-368': 0xb38e,
  'Skein1024-376': 0xb38f,
  'Skein1024-384': 0xb390,
  'Skein1024-392': 0xb391,
  'Skein1024-400': 0xb392,
  'Skein1024-408': 0xb393,
  'Skein1024-416': 0xb394,
  'Skein1024-424': 0xb395,
  'Skein1024-432': 0xb396,
  'Skein1024-440': 0xb397,
  'Skein1024-448': 0xb398,
  'Skein1024-456': 0xb399,
  'Skein1024-464': 0xb39a,
  'Skein1024-472': 0xb39b,
  'Skein1024-480': 0xb39c,
  'Skein1024-488': 0xb39d,
  'Skein1024-496': 0xb39e,
  'Skein1024-504': 0xb39f,
  'Skein1024-512': 0xb3a0,
  'Skein1024-520': 0xb3a1,
  'Skein1024-528': 0xb3a2,
  'Skein1024-536': 0xb3a3,
  'Skein1024-544': 0xb3a4,
  'Skein1024-552': 0xb3a5,
  'Skein1024-560': 0xb3a6,
  'Skein1024-568': 0xb3a7,
  'Skein1024-576': 0xb3a8,
  'Skein1024-584': 0xb3a9,
  'Skein1024-592': 0xb3aa,
  'Skein1024-600': 0xb3ab,
  'Skein1024-608': 0xb3ac,
  'Skein1024-616': 0xb3ad,
  'Skein1024-624': 0xb3ae,
  'Skein1024-632': 0xb3af,
  'Skein1024-640': 0xb3b0,
  'Skein1024-648': 0xb3b1,
  'Skein1024-656': 0xb3b2,
  'Skein1024-664': 0xb3b3,
  'Skein1024-672': 0xb3b4,
  'Skein1024-680': 0xb3b5,
  'Skein1024-688': 0xb3b6,
  'Skein1024-696': 0xb3b7,
  'Skein1024-704': 0xb3b8,
  'Skein1024-712': 0xb3b9,
  'Skein1024-720': 0xb3ba,
  'Skein1024-728': 0xb3bb,
  'Skein1024-736': 0xb3bc,
  'Skein1024-744': 0xb3bd,
  'Skein1024-752': 0xb3be,
  'Skein1024-760': 0xb3bf,
  'Skein1024-768': 0xb3c0,
  'Skein1024-776': 0xb3c1,
  'Skein1024-784': 0xb3c2,
  'Skein1024-792': 0xb3c3,
  'Skein1024-800': 0xb3c4,
  'Skein1024-808': 0xb3c5,
  'Skein1024-816': 0xb3c6,
  'Skein1024-824': 0xb3c7,
  'Skein1024-832': 0xb3c8,
  'Skein1024-840': 0xb3c9,
  'Skein1024-848': 0xb3ca,
  'Skein1024-856': 0xb3cb,
  'Skein1024-864': 0xb3cc,
  'Skein1024-872': 0xb3cd,
  'Skein1024-880': 0xb3ce,
  'Skein1024-888': 0xb3cf,
  'Skein1024-896': 0xb3d0,
  'Skein1024-904': 0xb3d1,
  'Skein1024-912': 0xb3d2,
  'Skein1024-920': 0xb3d3,
  'Skein1024-928': 0xb3d4,
  'Skein1024-936': 0xb3d5,
  'Skein1024-944': 0xb3d6,
  'Skein1024-952': 0xb3d7,
  'Skein1024-960': 0xb3d8,
  'Skein1024-968': 0xb3d9,
  'Skein1024-976': 0xb3da,
  'Skein1024-984': 0xb3db,
  'Skein1024-992': 0xb3dc,
  'Skein1024-1000': 0xb3dd,
  'Skein1024-1008': 0xb3de,
  'Skein1024-1016': 0xb3df,
  'Skein1024-1024': 0xb3e0
});
exports.codes = Object.freeze({
  0x0: 'identity',
  // sha family
  0x11: 'sha1',
  0x12: 'sha2-256',
  0x13: 'sha2-512',
  0x56: 'dbl-sha2-256',
  0x17: 'sha3-224',
  0x16: 'sha3-256',
  0x15: 'sha3-384',
  0x14: 'sha3-512',
  0x18: 'shake-128',
  0x19: 'shake-256',
  0x1A: 'keccak-224',
  0x1B: 'keccak-256',
  0x1C: 'keccak-384',
  0x1D: 'keccak-512',
  0x22: 'murmur3-128',
  0x23: 'murmur3-32',
  // blake2
  0xb201: 'blake2b-8',
  0xb202: 'blake2b-16',
  0xb203: 'blake2b-24',
  0xb204: 'blake2b-32',
  0xb205: 'blake2b-40',
  0xb206: 'blake2b-48',
  0xb207: 'blake2b-56',
  0xb208: 'blake2b-64',
  0xb209: 'blake2b-72',
  0xb20a: 'blake2b-80',
  0xb20b: 'blake2b-88',
  0xb20c: 'blake2b-96',
  0xb20d: 'blake2b-104',
  0xb20e: 'blake2b-112',
  0xb20f: 'blake2b-120',
  0xb210: 'blake2b-128',
  0xb211: 'blake2b-136',
  0xb212: 'blake2b-144',
  0xb213: 'blake2b-152',
  0xb214: 'blake2b-160',
  0xb215: 'blake2b-168',
  0xb216: 'blake2b-176',
  0xb217: 'blake2b-184',
  0xb218: 'blake2b-192',
  0xb219: 'blake2b-200',
  0xb21a: 'blake2b-208',
  0xb21b: 'blake2b-216',
  0xb21c: 'blake2b-224',
  0xb21d: 'blake2b-232',
  0xb21e: 'blake2b-240',
  0xb21f: 'blake2b-248',
  0xb220: 'blake2b-256',
  0xb221: 'blake2b-264',
  0xb222: 'blake2b-272',
  0xb223: 'blake2b-280',
  0xb224: 'blake2b-288',
  0xb225: 'blake2b-296',
  0xb226: 'blake2b-304',
  0xb227: 'blake2b-312',
  0xb228: 'blake2b-320',
  0xb229: 'blake2b-328',
  0xb22a: 'blake2b-336',
  0xb22b: 'blake2b-344',
  0xb22c: 'blake2b-352',
  0xb22d: 'blake2b-360',
  0xb22e: 'blake2b-368',
  0xb22f: 'blake2b-376',
  0xb230: 'blake2b-384',
  0xb231: 'blake2b-392',
  0xb232: 'blake2b-400',
  0xb233: 'blake2b-408',
  0xb234: 'blake2b-416',
  0xb235: 'blake2b-424',
  0xb236: 'blake2b-432',
  0xb237: 'blake2b-440',
  0xb238: 'blake2b-448',
  0xb239: 'blake2b-456',
  0xb23a: 'blake2b-464',
  0xb23b: 'blake2b-472',
  0xb23c: 'blake2b-480',
  0xb23d: 'blake2b-488',
  0xb23e: 'blake2b-496',
  0xb23f: 'blake2b-504',
  0xb240: 'blake2b-512',
  0xb241: 'blake2s-8',
  0xb242: 'blake2s-16',
  0xb243: 'blake2s-24',
  0xb244: 'blake2s-32',
  0xb245: 'blake2s-40',
  0xb246: 'blake2s-48',
  0xb247: 'blake2s-56',
  0xb248: 'blake2s-64',
  0xb249: 'blake2s-72',
  0xb24a: 'blake2s-80',
  0xb24b: 'blake2s-88',
  0xb24c: 'blake2s-96',
  0xb24d: 'blake2s-104',
  0xb24e: 'blake2s-112',
  0xb24f: 'blake2s-120',
  0xb250: 'blake2s-128',
  0xb251: 'blake2s-136',
  0xb252: 'blake2s-144',
  0xb253: 'blake2s-152',
  0xb254: 'blake2s-160',
  0xb255: 'blake2s-168',
  0xb256: 'blake2s-176',
  0xb257: 'blake2s-184',
  0xb258: 'blake2s-192',
  0xb259: 'blake2s-200',
  0xb25a: 'blake2s-208',
  0xb25b: 'blake2s-216',
  0xb25c: 'blake2s-224',
  0xb25d: 'blake2s-232',
  0xb25e: 'blake2s-240',
  0xb25f: 'blake2s-248',
  0xb260: 'blake2s-256',
  // skein
  0xb301: 'Skein256-8',
  0xb302: 'Skein256-16',
  0xb303: 'Skein256-24',
  0xb304: 'Skein256-32',
  0xb305: 'Skein256-40',
  0xb306: 'Skein256-48',
  0xb307: 'Skein256-56',
  0xb308: 'Skein256-64',
  0xb309: 'Skein256-72',
  0xb30a: 'Skein256-80',
  0xb30b: 'Skein256-88',
  0xb30c: 'Skein256-96',
  0xb30d: 'Skein256-104',
  0xb30e: 'Skein256-112',
  0xb30f: 'Skein256-120',
  0xb310: 'Skein256-128',
  0xb311: 'Skein256-136',
  0xb312: 'Skein256-144',
  0xb313: 'Skein256-152',
  0xb314: 'Skein256-160',
  0xb315: 'Skein256-168',
  0xb316: 'Skein256-176',
  0xb317: 'Skein256-184',
  0xb318: 'Skein256-192',
  0xb319: 'Skein256-200',
  0xb31a: 'Skein256-208',
  0xb31b: 'Skein256-216',
  0xb31c: 'Skein256-224',
  0xb31d: 'Skein256-232',
  0xb31e: 'Skein256-240',
  0xb31f: 'Skein256-248',
  0xb320: 'Skein256-256',
  0xb321: 'Skein512-8',
  0xb322: 'Skein512-16',
  0xb323: 'Skein512-24',
  0xb324: 'Skein512-32',
  0xb325: 'Skein512-40',
  0xb326: 'Skein512-48',
  0xb327: 'Skein512-56',
  0xb328: 'Skein512-64',
  0xb329: 'Skein512-72',
  0xb32a: 'Skein512-80',
  0xb32b: 'Skein512-88',
  0xb32c: 'Skein512-96',
  0xb32d: 'Skein512-104',
  0xb32e: 'Skein512-112',
  0xb32f: 'Skein512-120',
  0xb330: 'Skein512-128',
  0xb331: 'Skein512-136',
  0xb332: 'Skein512-144',
  0xb333: 'Skein512-152',
  0xb334: 'Skein512-160',
  0xb335: 'Skein512-168',
  0xb336: 'Skein512-176',
  0xb337: 'Skein512-184',
  0xb338: 'Skein512-192',
  0xb339: 'Skein512-200',
  0xb33a: 'Skein512-208',
  0xb33b: 'Skein512-216',
  0xb33c: 'Skein512-224',
  0xb33d: 'Skein512-232',
  0xb33e: 'Skein512-240',
  0xb33f: 'Skein512-248',
  0xb340: 'Skein512-256',
  0xb341: 'Skein512-264',
  0xb342: 'Skein512-272',
  0xb343: 'Skein512-280',
  0xb344: 'Skein512-288',
  0xb345: 'Skein512-296',
  0xb346: 'Skein512-304',
  0xb347: 'Skein512-312',
  0xb348: 'Skein512-320',
  0xb349: 'Skein512-328',
  0xb34a: 'Skein512-336',
  0xb34b: 'Skein512-344',
  0xb34c: 'Skein512-352',
  0xb34d: 'Skein512-360',
  0xb34e: 'Skein512-368',
  0xb34f: 'Skein512-376',
  0xb350: 'Skein512-384',
  0xb351: 'Skein512-392',
  0xb352: 'Skein512-400',
  0xb353: 'Skein512-408',
  0xb354: 'Skein512-416',
  0xb355: 'Skein512-424',
  0xb356: 'Skein512-432',
  0xb357: 'Skein512-440',
  0xb358: 'Skein512-448',
  0xb359: 'Skein512-456',
  0xb35a: 'Skein512-464',
  0xb35b: 'Skein512-472',
  0xb35c: 'Skein512-480',
  0xb35d: 'Skein512-488',
  0xb35e: 'Skein512-496',
  0xb35f: 'Skein512-504',
  0xb360: 'Skein512-512',
  0xb361: 'Skein1024-8',
  0xb362: 'Skein1024-16',
  0xb363: 'Skein1024-24',
  0xb364: 'Skein1024-32',
  0xb365: 'Skein1024-40',
  0xb366: 'Skein1024-48',
  0xb367: 'Skein1024-56',
  0xb368: 'Skein1024-64',
  0xb369: 'Skein1024-72',
  0xb36a: 'Skein1024-80',
  0xb36b: 'Skein1024-88',
  0xb36c: 'Skein1024-96',
  0xb36d: 'Skein1024-104',
  0xb36e: 'Skein1024-112',
  0xb36f: 'Skein1024-120',
  0xb370: 'Skein1024-128',
  0xb371: 'Skein1024-136',
  0xb372: 'Skein1024-144',
  0xb373: 'Skein1024-152',
  0xb374: 'Skein1024-160',
  0xb375: 'Skein1024-168',
  0xb376: 'Skein1024-176',
  0xb377: 'Skein1024-184',
  0xb378: 'Skein1024-192',
  0xb379: 'Skein1024-200',
  0xb37a: 'Skein1024-208',
  0xb37b: 'Skein1024-216',
  0xb37c: 'Skein1024-224',
  0xb37d: 'Skein1024-232',
  0xb37e: 'Skein1024-240',
  0xb37f: 'Skein1024-248',
  0xb380: 'Skein1024-256',
  0xb381: 'Skein1024-264',
  0xb382: 'Skein1024-272',
  0xb383: 'Skein1024-280',
  0xb384: 'Skein1024-288',
  0xb385: 'Skein1024-296',
  0xb386: 'Skein1024-304',
  0xb387: 'Skein1024-312',
  0xb388: 'Skein1024-320',
  0xb389: 'Skein1024-328',
  0xb38a: 'Skein1024-336',
  0xb38b: 'Skein1024-344',
  0xb38c: 'Skein1024-352',
  0xb38d: 'Skein1024-360',
  0xb38e: 'Skein1024-368',
  0xb38f: 'Skein1024-376',
  0xb390: 'Skein1024-384',
  0xb391: 'Skein1024-392',
  0xb392: 'Skein1024-400',
  0xb393: 'Skein1024-408',
  0xb394: 'Skein1024-416',
  0xb395: 'Skein1024-424',
  0xb396: 'Skein1024-432',
  0xb397: 'Skein1024-440',
  0xb398: 'Skein1024-448',
  0xb399: 'Skein1024-456',
  0xb39a: 'Skein1024-464',
  0xb39b: 'Skein1024-472',
  0xb39c: 'Skein1024-480',
  0xb39d: 'Skein1024-488',
  0xb39e: 'Skein1024-496',
  0xb39f: 'Skein1024-504',
  0xb3a0: 'Skein1024-512',
  0xb3a1: 'Skein1024-520',
  0xb3a2: 'Skein1024-528',
  0xb3a3: 'Skein1024-536',
  0xb3a4: 'Skein1024-544',
  0xb3a5: 'Skein1024-552',
  0xb3a6: 'Skein1024-560',
  0xb3a7: 'Skein1024-568',
  0xb3a8: 'Skein1024-576',
  0xb3a9: 'Skein1024-584',
  0xb3aa: 'Skein1024-592',
  0xb3ab: 'Skein1024-600',
  0xb3ac: 'Skein1024-608',
  0xb3ad: 'Skein1024-616',
  0xb3ae: 'Skein1024-624',
  0xb3af: 'Skein1024-632',
  0xb3b0: 'Skein1024-640',
  0xb3b1: 'Skein1024-648',
  0xb3b2: 'Skein1024-656',
  0xb3b3: 'Skein1024-664',
  0xb3b4: 'Skein1024-672',
  0xb3b5: 'Skein1024-680',
  0xb3b6: 'Skein1024-688',
  0xb3b7: 'Skein1024-696',
  0xb3b8: 'Skein1024-704',
  0xb3b9: 'Skein1024-712',
  0xb3ba: 'Skein1024-720',
  0xb3bb: 'Skein1024-728',
  0xb3bc: 'Skein1024-736',
  0xb3bd: 'Skein1024-744',
  0xb3be: 'Skein1024-752',
  0xb3bf: 'Skein1024-760',
  0xb3c0: 'Skein1024-768',
  0xb3c1: 'Skein1024-776',
  0xb3c2: 'Skein1024-784',
  0xb3c3: 'Skein1024-792',
  0xb3c4: 'Skein1024-800',
  0xb3c5: 'Skein1024-808',
  0xb3c6: 'Skein1024-816',
  0xb3c7: 'Skein1024-824',
  0xb3c8: 'Skein1024-832',
  0xb3c9: 'Skein1024-840',
  0xb3ca: 'Skein1024-848',
  0xb3cb: 'Skein1024-856',
  0xb3cc: 'Skein1024-864',
  0xb3cd: 'Skein1024-872',
  0xb3ce: 'Skein1024-880',
  0xb3cf: 'Skein1024-888',
  0xb3d0: 'Skein1024-896',
  0xb3d1: 'Skein1024-904',
  0xb3d2: 'Skein1024-912',
  0xb3d3: 'Skein1024-920',
  0xb3d4: 'Skein1024-928',
  0xb3d5: 'Skein1024-936',
  0xb3d6: 'Skein1024-944',
  0xb3d7: 'Skein1024-952',
  0xb3d8: 'Skein1024-960',
  0xb3d9: 'Skein1024-968',
  0xb3da: 'Skein1024-976',
  0xb3db: 'Skein1024-984',
  0xb3dc: 'Skein1024-992',
  0xb3dd: 'Skein1024-1000',
  0xb3de: 'Skein1024-1008',
  0xb3df: 'Skein1024-1016',
  0xb3e0: 'Skein1024-1024'
});
exports.defaultLengths = Object.freeze({
  0x11: 20,
  0x12: 32,
  0x13: 64,
  0x56: 32,
  0x17: 28,
  0x16: 32,
  0x15: 48,
  0x14: 64,
  0x18: 32,
  0x19: 64,
  0x1A: 28,
  0x1B: 32,
  0x1C: 48,
  0x1D: 64,
  0x22: 32,
  0xb201: 0x01,
  0xb202: 0x02,
  0xb203: 0x03,
  0xb204: 0x04,
  0xb205: 0x05,
  0xb206: 0x06,
  0xb207: 0x07,
  0xb208: 0x08,
  0xb209: 0x09,
  0xb20a: 0x0a,
  0xb20b: 0x0b,
  0xb20c: 0x0c,
  0xb20d: 0x0d,
  0xb20e: 0x0e,
  0xb20f: 0x0f,
  0xb210: 0x10,
  0xb211: 0x11,
  0xb212: 0x12,
  0xb213: 0x13,
  0xb214: 0x14,
  0xb215: 0x15,
  0xb216: 0x16,
  0xb217: 0x17,
  0xb218: 0x18,
  0xb219: 0x19,
  0xb21a: 0x1a,
  0xb21b: 0x1b,
  0xb21c: 0x1c,
  0xb21d: 0x1d,
  0xb21e: 0x1e,
  0xb21f: 0x1f,
  0xb220: 0x20,
  0xb221: 0x21,
  0xb222: 0x22,
  0xb223: 0x23,
  0xb224: 0x24,
  0xb225: 0x25,
  0xb226: 0x26,
  0xb227: 0x27,
  0xb228: 0x28,
  0xb229: 0x29,
  0xb22a: 0x2a,
  0xb22b: 0x2b,
  0xb22c: 0x2c,
  0xb22d: 0x2d,
  0xb22e: 0x2e,
  0xb22f: 0x2f,
  0xb230: 0x30,
  0xb231: 0x31,
  0xb232: 0x32,
  0xb233: 0x33,
  0xb234: 0x34,
  0xb235: 0x35,
  0xb236: 0x36,
  0xb237: 0x37,
  0xb238: 0x38,
  0xb239: 0x39,
  0xb23a: 0x3a,
  0xb23b: 0x3b,
  0xb23c: 0x3c,
  0xb23d: 0x3d,
  0xb23e: 0x3e,
  0xb23f: 0x3f,
  0xb240: 0x40,
  0xb241: 0x01,
  0xb242: 0x02,
  0xb243: 0x03,
  0xb244: 0x04,
  0xb245: 0x05,
  0xb246: 0x06,
  0xb247: 0x07,
  0xb248: 0x08,
  0xb249: 0x09,
  0xb24a: 0x0a,
  0xb24b: 0x0b,
  0xb24c: 0x0c,
  0xb24d: 0x0d,
  0xb24e: 0x0e,
  0xb24f: 0x0f,
  0xb250: 0x10,
  0xb251: 0x11,
  0xb252: 0x12,
  0xb253: 0x13,
  0xb254: 0x14,
  0xb255: 0x15,
  0xb256: 0x16,
  0xb257: 0x17,
  0xb258: 0x18,
  0xb259: 0x19,
  0xb25a: 0x1a,
  0xb25b: 0x1b,
  0xb25c: 0x1c,
  0xb25d: 0x1d,
  0xb25e: 0x1e,
  0xb25f: 0x1f,
  0xb260: 0x20,
  0xb301: 0x01,
  0xb302: 0x02,
  0xb303: 0x03,
  0xb304: 0x04,
  0xb305: 0x05,
  0xb306: 0x06,
  0xb307: 0x07,
  0xb308: 0x08,
  0xb309: 0x09,
  0xb30a: 0x0a,
  0xb30b: 0x0b,
  0xb30c: 0x0c,
  0xb30d: 0x0d,
  0xb30e: 0x0e,
  0xb30f: 0x0f,
  0xb310: 0x10,
  0xb311: 0x11,
  0xb312: 0x12,
  0xb313: 0x13,
  0xb314: 0x14,
  0xb315: 0x15,
  0xb316: 0x16,
  0xb317: 0x17,
  0xb318: 0x18,
  0xb319: 0x19,
  0xb31a: 0x1a,
  0xb31b: 0x1b,
  0xb31c: 0x1c,
  0xb31d: 0x1d,
  0xb31e: 0x1e,
  0xb31f: 0x1f,
  0xb320: 0x20,
  0xb321: 0x01,
  0xb322: 0x02,
  0xb323: 0x03,
  0xb324: 0x04,
  0xb325: 0x05,
  0xb326: 0x06,
  0xb327: 0x07,
  0xb328: 0x08,
  0xb329: 0x09,
  0xb32a: 0x0a,
  0xb32b: 0x0b,
  0xb32c: 0x0c,
  0xb32d: 0x0d,
  0xb32e: 0x0e,
  0xb32f: 0x0f,
  0xb330: 0x10,
  0xb331: 0x11,
  0xb332: 0x12,
  0xb333: 0x13,
  0xb334: 0x14,
  0xb335: 0x15,
  0xb336: 0x16,
  0xb337: 0x17,
  0xb338: 0x18,
  0xb339: 0x19,
  0xb33a: 0x1a,
  0xb33b: 0x1b,
  0xb33c: 0x1c,
  0xb33d: 0x1d,
  0xb33e: 0x1e,
  0xb33f: 0x1f,
  0xb340: 0x20,
  0xb341: 0x21,
  0xb342: 0x22,
  0xb343: 0x23,
  0xb344: 0x24,
  0xb345: 0x25,
  0xb346: 0x26,
  0xb347: 0x27,
  0xb348: 0x28,
  0xb349: 0x29,
  0xb34a: 0x2a,
  0xb34b: 0x2b,
  0xb34c: 0x2c,
  0xb34d: 0x2d,
  0xb34e: 0x2e,
  0xb34f: 0x2f,
  0xb350: 0x30,
  0xb351: 0x31,
  0xb352: 0x32,
  0xb353: 0x33,
  0xb354: 0x34,
  0xb355: 0x35,
  0xb356: 0x36,
  0xb357: 0x37,
  0xb358: 0x38,
  0xb359: 0x39,
  0xb35a: 0x3a,
  0xb35b: 0x3b,
  0xb35c: 0x3c,
  0xb35d: 0x3d,
  0xb35e: 0x3e,
  0xb35f: 0x3f,
  0xb360: 0x40,
  0xb361: 0x01,
  0xb362: 0x02,
  0xb363: 0x03,
  0xb364: 0x04,
  0xb365: 0x05,
  0xb366: 0x06,
  0xb367: 0x07,
  0xb368: 0x08,
  0xb369: 0x09,
  0xb36a: 0x0a,
  0xb36b: 0x0b,
  0xb36c: 0x0c,
  0xb36d: 0x0d,
  0xb36e: 0x0e,
  0xb36f: 0x0f,
  0xb370: 0x10,
  0xb371: 0x11,
  0xb372: 0x12,
  0xb373: 0x13,
  0xb374: 0x14,
  0xb375: 0x15,
  0xb376: 0x16,
  0xb377: 0x17,
  0xb378: 0x18,
  0xb379: 0x19,
  0xb37a: 0x1a,
  0xb37b: 0x1b,
  0xb37c: 0x1c,
  0xb37d: 0x1d,
  0xb37e: 0x1e,
  0xb37f: 0x1f,
  0xb380: 0x20,
  0xb381: 0x21,
  0xb382: 0x22,
  0xb383: 0x23,
  0xb384: 0x24,
  0xb385: 0x25,
  0xb386: 0x26,
  0xb387: 0x27,
  0xb388: 0x28,
  0xb389: 0x29,
  0xb38a: 0x2a,
  0xb38b: 0x2b,
  0xb38c: 0x2c,
  0xb38d: 0x2d,
  0xb38e: 0x2e,
  0xb38f: 0x2f,
  0xb390: 0x30,
  0xb391: 0x31,
  0xb392: 0x32,
  0xb393: 0x33,
  0xb394: 0x34,
  0xb395: 0x35,
  0xb396: 0x36,
  0xb397: 0x37,
  0xb398: 0x38,
  0xb399: 0x39,
  0xb39a: 0x3a,
  0xb39b: 0x3b,
  0xb39c: 0x3c,
  0xb39d: 0x3d,
  0xb39e: 0x3e,
  0xb39f: 0x3f,
  0xb3a0: 0x40,
  0xb3a1: 0x41,
  0xb3a2: 0x42,
  0xb3a3: 0x43,
  0xb3a4: 0x44,
  0xb3a5: 0x45,
  0xb3a6: 0x46,
  0xb3a7: 0x47,
  0xb3a8: 0x48,
  0xb3a9: 0x49,
  0xb3aa: 0x4a,
  0xb3ab: 0x4b,
  0xb3ac: 0x4c,
  0xb3ad: 0x4d,
  0xb3ae: 0x4e,
  0xb3af: 0x4f,
  0xb3b0: 0x50,
  0xb3b1: 0x51,
  0xb3b2: 0x52,
  0xb3b3: 0x53,
  0xb3b4: 0x54,
  0xb3b5: 0x55,
  0xb3b6: 0x56,
  0xb3b7: 0x57,
  0xb3b8: 0x58,
  0xb3b9: 0x59,
  0xb3ba: 0x5a,
  0xb3bb: 0x5b,
  0xb3bc: 0x5c,
  0xb3bd: 0x5d,
  0xb3be: 0x5e,
  0xb3bf: 0x5f,
  0xb3c0: 0x60,
  0xb3c1: 0x61,
  0xb3c2: 0x62,
  0xb3c3: 0x63,
  0xb3c4: 0x64,
  0xb3c5: 0x65,
  0xb3c6: 0x66,
  0xb3c7: 0x67,
  0xb3c8: 0x68,
  0xb3c9: 0x69,
  0xb3ca: 0x6a,
  0xb3cb: 0x6b,
  0xb3cc: 0x6c,
  0xb3cd: 0x6d,
  0xb3ce: 0x6e,
  0xb3cf: 0x6f,
  0xb3d0: 0x70,
  0xb3d1: 0x71,
  0xb3d2: 0x72,
  0xb3d3: 0x73,
  0xb3d4: 0x74,
  0xb3d5: 0x75,
  0xb3d6: 0x76,
  0xb3d7: 0x77,
  0xb3d8: 0x78,
  0xb3d9: 0x79,
  0xb3da: 0x7a,
  0xb3db: 0x7b,
  0xb3dc: 0x7c,
  0xb3dd: 0x7d,
  0xb3de: 0x7e,
  0xb3df: 0x7f,
  0xb3e0: 0x80
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Implementation of the multicodec specification.
 *
 * @module multicodec
 * @example
 * const multicodec = require('multicodec')
 *
 * const prefixedProtobuf = multicodec.addPrefix('protobuf', protobufBuffer)
 * // prefixedProtobuf 0x50...
 *
 */


const {
  Buffer
} = __webpack_require__(0);

const varint = __webpack_require__(11);

const intTable = __webpack_require__(80);

const codecNameToCodeVarint = __webpack_require__(81);

const util = __webpack_require__(19);

exports = module.exports;
/**
 * Prefix a buffer with a multicodec-packed.
 *
 * @param {string|number} multicodecStrOrCode
 * @param {Buffer} data
 * @returns {Buffer}
 */

exports.addPrefix = (multicodecStrOrCode, data) => {
  let prefix;

  if (Buffer.isBuffer(multicodecStrOrCode)) {
    prefix = util.varintBufferEncode(multicodecStrOrCode);
  } else {
    if (codecNameToCodeVarint[multicodecStrOrCode]) {
      prefix = codecNameToCodeVarint[multicodecStrOrCode];
    } else {
      throw new Error('multicodec not recognized');
    }
  }

  return Buffer.concat([prefix, data]);
};
/**
 * Decapsulate the multicodec-packed prefix from the data.
 *
 * @param {Buffer} data
 * @returns {Buffer}
 */


exports.rmPrefix = data => {
  varint.decode(data);
  return data.slice(varint.decode.bytes);
};
/**
 * Get the codec of the prefixed data.
 * @param {Buffer} prefixedData
 * @returns {string}
 */


exports.getCodec = prefixedData => {
  const code = varint.decode(prefixedData);
  const codecName = intTable.get(code);

  if (codecName === undefined) {
    throw new Error("Code ".concat(code, " not found"));
  }

  return codecName;
};
/**
 * Get the name of the codec.
 * @param {number} codec
 * @returns {string}
 */


exports.getName = codec => {
  return intTable.get(codec);
};
/**
 * Get the code of the codec
 * @param {string} name
 * @returns {number}
 */


exports.getNumber = name => {
  const code = codecNameToCodeVarint[name];

  if (code === undefined) {
    throw new Error('Codec `' + name + '` not found');
  }

  return util.varintBufferDecode(code)[0];
};
/**
 * Get the code of the prefixed data.
 * @param {Buffer} prefixedData
 * @returns {number}
 */


exports.getCode = prefixedData => {
  return varint.decode(prefixedData);
};
/**
 * Get the code as varint of a codec name.
 * @param {string} codecName
 * @returns {Buffer}
 */


exports.getCodeVarint = codecName => {
  const code = codecNameToCodeVarint[codecName];

  if (code === undefined) {
    throw new Error('Codec `' + codecName + '` not found');
  }

  return code;
};
/**
 * Get the varint of a code.
 * @param {Number} code
 * @returns {Array.<number>}
 */


exports.getVarint = code => {
  return varint.encode(code);
}; // Make the constants top-level constants


const constants = __webpack_require__(82);

Object.assign(exports, constants); // Human friendly names for printing, e.g. in error messages

exports.print = __webpack_require__(83);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const baseTable = __webpack_require__(4); // map for hexString -> codecName


const nameTable = new Map();

for (const encodingName in baseTable) {
  const code = baseTable[encodingName];
  nameTable.set(code, encodingName);
}

module.exports = Object.freeze(nameTable);

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const baseTable = __webpack_require__(4);

const varintEncode = __webpack_require__(19).varintEncode; // map for codecName -> codeVarintBuffer


const varintTable = {};

for (const encodingName in baseTable) {
  const code = baseTable[encodingName];
  varintTable[encodingName] = varintEncode(code);
}

module.exports = Object.freeze(varintTable);

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const table = __webpack_require__(4); // map for codecConstant -> code


const constants = {};

for (const [name, code] of Object.entries(table)) {
  constants[name.toUpperCase().replace(/-/g, '_')] = code;
}

module.exports = Object.freeze(constants);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const table = __webpack_require__(4); // map for code -> print friendly name


const tableByCode = {};

for (const [name, code] of Object.entries(table)) {
  if (tableByCode[code] === undefined) tableByCode[code] = name;
}

module.exports = Object.freeze(tableByCode);

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mh = __webpack_require__(18);

const {
  Buffer
} = __webpack_require__(0);

var CIDUtil = {
  /**
   * Test if the given input is a valid CID object.
   * Returns an error message if it is not.
   * Returns undefined if it is a valid CID.
   *
   * @param {any} other
   * @returns {string}
   */
  checkCIDComponents: function checkCIDComponents(other) {
    if (other == null) {
      return 'null values are not valid CIDs';
    }

    if (!(other.version === 0 || other.version === 1)) {
      return 'Invalid version, must be a number equal to 1 or 0';
    }

    if (typeof other.codec !== 'string') {
      return 'codec must be string';
    }

    if (other.version === 0) {
      if (other.codec !== 'dag-pb') {
        return "codec must be 'dag-pb' for CIDv0";
      }

      if (other.multibaseName !== 'base58btc') {
        return "multibaseName must be 'base58btc' for CIDv0";
      }
    }

    if (!Buffer.isBuffer(other.multihash)) {
      return 'multihash must be a Buffer';
    }

    try {
      mh.validate(other.multihash);
    } catch (err) {
      let errorMsg = err.message;

      if (!errorMsg) {
        // Just in case mh.validate() throws an error with empty error message
        errorMsg = 'Multihash validation failed';
      }

      return errorMsg;
    }
  }
};
module.exports = CIDUtil;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Default configuration for a repo in the browser

module.exports = {
  lock: 'memory',
  storageBackends: {
    root: __webpack_require__(3),
    blocks: __webpack_require__(3),
    keys: __webpack_require__(3),
    datastore: __webpack_require__(3)
  },
  storageBackendOptions: {
    root: {
      extension: '',
      prefix: '',
      version: 2
    },
    blocks: {
      sharding: false,
      prefix: '',
      version: 2
    },
    keys: {
      sharding: false,
      prefix: '',
      version: 2
    },
    datastore: {
      sharding: false,
      prefix: '',
      version: 2
    }
  }
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Default configuration for the datastore spec in node.js

module.exports = {
  Spec: {
    type: 'mount',
    mounts: [{
      mountpoint: '/blocks',
      type: 'measure',
      prefix: 'flatfs.datastore',
      child: {
        type: 'flatfs',
        path: 'blocks',
        sync: true,
        shardFunc: '/repo/flatfs/shard/v1/next-to-last/2'
      }
    }, {
      mountpoint: '/',
      type: 'measure',
      prefix: 'leveldb.datastore',
      child: {
        type: 'levelds',
        path: 'datastore',
        compression: 'none'
      }
    }]
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map