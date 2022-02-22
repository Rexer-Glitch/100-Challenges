/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets.ts":
/*!***********************!*\
  !*** ./src/assets.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"screen\": () => (/* binding */ screen),\n/* harmony export */   \"screenIndicator\": () => (/* binding */ screenIndicator),\n/* harmony export */   \"screenAnswer\": () => (/* binding */ screenAnswer),\n/* harmony export */   \"buttons\": () => (/* binding */ buttons),\n/* harmony export */   \"onBtn\": () => (/* binding */ onBtn),\n/* harmony export */   \"secFBtn\": () => (/* binding */ secFBtn),\n/* harmony export */   \"alphaBtn\": () => (/* binding */ alphaBtn)\n/* harmony export */ });\nvar screen = document.querySelector(\".screen .expressions\");\nvar screenIndicator = document.querySelector(\".screen .indicators\");\nvar screenAnswer = document.querySelector(\".screen .ans\");\nvar buttons = document.querySelector(\".operationContainer\");\nvar onBtn = document.querySelector(\".onBtn\");\nvar secFBtn = document.querySelector(\".sec-btn\");\nvar alphaBtn = document.querySelector(\".alphaBtn\");\n\n//# sourceURL=webpack://calculator/./src/assets.ts?");

/***/ }),

/***/ "./src/buttonsData.ts":
/*!****************************!*\
  !*** ./src/buttonsData.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar numbers = function numbers() {\n  var nums = [];\n\n  for (var i = 0; i < 10; i++) {\n    nums.push({\n      name: \"\".concat(i),\n      func: \"\".concat(i)\n    });\n  }\n\n  return nums;\n};\n\nvar variables = function variables() {\n  var vars = [\"A\", \"B\", \"C\", \"D\", \"E\", \"F\", \"X\", \"Y\", \"M\"];\n  var varList = [];\n  vars.forEach(function (v) {\n    varList.push({\n      name: v,\n      func: v\n    });\n  });\n  return varList;\n};\n\nvar data = [].concat(_toConsumableArray(numbers()), _toConsumableArray(variables()), [{\n  name: \"·\",\n  func: \".\"\n}, {\n  name: \"±\",\n  func: \"±\"\n}, {\n  name: \"(\",\n  func: \"(\"\n}, {\n  name: \")\",\n  func: \")\"\n}, {\n  name: \"×\",\n  func: \" × \"\n}, {\n  name: \"÷\",\n  func: \" ÷ \"\n}, {\n  name: \"+\",\n  func: \" + \"\n}, {\n  name: \"−\",\n  func: \" − \"\n}, {\n  name: \"=\",\n  func: \"=\"\n}, {\n  name: \"sin\",\n  func: \"sin()\"\n}, {\n  name: \"tan\",\n  func: \"tan()\"\n}, {\n  name: \"cos\",\n  func: \"cos()\"\n}, {\n  name: \"√\",\n  func: \"√()\"\n}, {\n  name: \"←\",\n  func: \"←\"\n}, {\n  name: \"→\",\n  func: \"→\"\n}, {\n  name: \"log\",\n  func: \"log10()\"\n}, {\n  name: \"π\",\n  func: \"π\"\n}, {\n  name: \"ln\",\n  func: \"ln()\"\n}, {\n  name: \"DEL\",\n  func: \"del\"\n}, {\n  name: \"x<sup>2</sup>\",\n  func: \"^(2)\"\n}, {\n  name: \"cos⁻¹\",\n  func: \"cos⁻¹()\"\n}, {\n  name: \"sin⁻¹\",\n  func: \"sin⁻¹()\"\n}, {\n  name: \"tan⁻¹\",\n  func: \"tan⁻¹()\"\n}, {\n  name: \"x^-1\",\n  func: \"^(-1)\"\n}, {\n  name: \"cuberoot\",\n  func: \"³√()\"\n}, {\n  name: \"10^x\",\n  func: \"10^()\"\n}, {\n  name: \"e^x\",\n  func: \"e^()\"\n}, {\n  name: \"ANS\",\n  func: \"ANS\"\n}, {\n  name: \"STO\",\n  func: \"STO\"\n}, {\n  name: \"2nd F\",\n  func: \"2nd F\"\n}]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);\n\n//# sourceURL=webpack://calculator/./src/buttonsData.ts?");

/***/ }),

/***/ "./src/calculator.ts":
/*!***************************!*\
  !*** ./src/calculator.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _buttonsData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttonsData */ \"./src/buttonsData.ts\");\n/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets */ \"./src/assets.ts\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }\n\nfunction _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError(\"Cannot initialize the same private elements twice on an object\"); } }\n\nfunction _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError(\"attempted to get private field on non-instance\"); } return fn; }\n\n\n\n\nvar _processButtonClicks = /*#__PURE__*/new WeakSet();\n\nvar Calculator = /*#__PURE__*/function () {\n  function Calculator() {\n    _classCallCheck(this, Calculator);\n\n    _classPrivateMethodInitSpec(this, _processButtonClicks);\n\n    this.handleClicks();\n  }\n\n  _createClass(Calculator, [{\n    key: \"handleClicks\",\n    value: function handleClicks() {\n      var _this = this;\n\n      _assets__WEBPACK_IMPORTED_MODULE_1__.buttons.addEventListener(\"click\", function (e) {\n        var target = e.target;\n        var _target$dataset = target.dataset,\n            sec = _target$dataset.sec,\n            ter = _target$dataset.ter;\n        var data = _buttonsData__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(function (d) {\n          return d.name === target.innerHTML || d.name === sec || d.name === ter;\n        });\n        if (data) _classPrivateMethodGet(_this, _processButtonClicks, _processButtonClicks2).call(_this, data.func);\n      });\n    }\n  }]);\n\n  return Calculator;\n}();\n\nfunction _processButtonClicks2(func) {\n  console.log(func);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Calculator);\n\n//# sourceURL=webpack://calculator/./src/calculator.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator */ \"./src/calculator.ts\");\n\nvar calculator = new _calculator__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n//# sourceURL=webpack://calculator/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;