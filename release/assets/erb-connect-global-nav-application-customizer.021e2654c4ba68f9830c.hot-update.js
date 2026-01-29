"use strict";
self["webpackHotUpdate_86c9406c_5159_4b29_afbf_ecd922eb5c30_0_0_1"]("erb-connect-global-nav-application-customizer",{

/***/ 867:
/*!****************************************************************************************!*\
  !*** ./lib/extensions/erbConnectGlobalNav/ErbConnectGlobalNavApplicationCustomizer.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ 398);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ 676);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-application-base */ 841);
/* harmony import */ var _microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_3__);





var LOG_SOURCE = 'ErbConnectGlobalNavApplicationCustomizer';
var ErbConnectHeader = function (_a) {
    var webAbsoluteUrl = _a.webAbsoluteUrl;
    var e = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
    var styles = {
        shell: {
            width: '100%',
            background: '#FFFFFF',
            borderBottom: '2px solid #E31E38',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 9999
        },
        accent: {
            width: '10px',
            height: '48px',
            borderRadius: '6px',
            background: '#E31E38',
            marginRight: '16px'
        },
        title: {
            fontSize: '20px',
            fontWeight: 700,
            color: '#1D252C'
        },
        link: {
            marginLeft: 'auto',
            color: '#1D252C',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px'
        }
    };
    return e('header', { style: styles.shell, 'aria-label': 'Erb Connect header' }, e('div', { style: styles.accent, 'aria-hidden': true }), e('div', { style: styles.title }, 'Erb Connect Global Navigation'), e('a', { style: styles.link, href: webAbsoluteUrl }, 'Back to site'));
};
var ErbConnectGlobalNavApplicationCustomizer = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__extends)(ErbConnectGlobalNavApplicationCustomizer, _super);
    function ErbConnectGlobalNavApplicationCustomizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._render = function () {
            if (!_this._topPlaceholder) {
                _this._topPlaceholder = _this.context.placeholderProvider.tryCreateContent(_microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_3__.PlaceholderName.Top, { onDispose: _this._onDispose });
            }
            if (!_this._topPlaceholder || !_this._topPlaceholder.domElement) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__.Log.warn(LOG_SOURCE, 'Top placeholder not available yet.');
                return;
            }
            if (!_this._container) {
                _this._container = document.createElement('div');
                _this._topPlaceholder.domElement.appendChild(_this._container);
            }
            var element = react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErbConnectHeader, {
                webAbsoluteUrl: _this.context.pageContext.web.absoluteUrl
            });
            react_dom__WEBPACK_IMPORTED_MODULE_1__.render(element, _this._container);
        };
        _this._onDispose = function () {
            if (_this._container) {
                react_dom__WEBPACK_IMPORTED_MODULE_1__.unmountComponentAtNode(_this._container);
                _this._container.remove();
                _this._container = undefined;
            }
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__.Log.info(LOG_SOURCE, 'Disposed Erb Connect Global Nav Application Customizer.');
        };
        return _this;
    }
    ErbConnectGlobalNavApplicationCustomizer.prototype.onInit = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__generator)(this, function (_a) {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__.Log.info(LOG_SOURCE, 'Initialized Erb Connect Global Nav Application Customizer');
                this.context.placeholderProvider.changedEvent.add(this, this._render);
                this._render();
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    return ErbConnectGlobalNavApplicationCustomizer;
}(_microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_3__.BaseApplicationCustomizer));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErbConnectGlobalNavApplicationCustomizer);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3561c7f923a3ee8c360d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=erb-connect-global-nav-application-customizer.021e2654c4ba68f9830c.hot-update.js.map