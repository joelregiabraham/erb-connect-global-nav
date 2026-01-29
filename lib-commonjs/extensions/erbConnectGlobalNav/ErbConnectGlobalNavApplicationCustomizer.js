"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_application_base_1 = require("@microsoft/sp-application-base");
var LOG_SOURCE = 'ErbConnectGlobalNavApplicationCustomizer';
var STYLE_ELEMENT_ID = 'erb-connect-global-nav-styles';
var ErbConnectGlobalNavApplicationCustomizer = /** @class */ (function (_super) {
    tslib_1.__extends(ErbConnectGlobalNavApplicationCustomizer, _super);
    function ErbConnectGlobalNavApplicationCustomizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._eventsBound = false;
        _this._render = function () {
            if (!_this._topPlaceholder) {
                _this._topPlaceholder = _this.context.placeholderProvider.tryCreateContent(sp_application_base_1.PlaceholderName.Top, { onDispose: _this._onDispose });
            }
            if (!_this._topPlaceholder || !_this._topPlaceholder.domElement) {
                sp_core_library_1.Log.warn(LOG_SOURCE, 'Top placeholder not available yet.');
                return;
            }
            if (!_this._container) {
                _this._container = document.createElement('div');
                _this._topPlaceholder.domElement.appendChild(_this._container);
            }
            _this._ensureStyles();
            _this._renderMarkup();
            if (!_this._eventsBound) {
                _this._bindEvents();
            }
        };
        _this._handleContainerClick = function (event) {
            var target = event.target;
            if (!_this._container) {
                return;
            }
            if (target.closest('.erb-connect-dropbtn')) {
                event.preventDefault();
                event.stopPropagation();
                var dropdown = _this._container.querySelector('.erb-connect-dropdown');
                _this._setDropdown(!(dropdown === null || dropdown === void 0 ? void 0 : dropdown.classList.contains('is-open')));
                return;
            }
            if (target.closest('.erb-connect-hamburger')) {
                event.preventDefault();
                event.stopPropagation();
                var shell = _this._container.querySelector('.erb-connect-shell');
                _this._setDrawer(!(shell === null || shell === void 0 ? void 0 : shell.classList.contains('is-drawer-open')));
                return;
            }
            if (target.closest('.erb-connect-drawer-close') || target.closest('.erb-connect-overlay')) {
                event.preventDefault();
                _this._setDrawer(false);
                return;
            }
            if (target.closest('.erb-connect-dropmenu a')) {
                _this._setDropdown(false);
                return;
            }
            if (target.closest('.erb-connect-drawer a')) {
                _this._setDrawer(false);
            }
        };
        _this._handleDocumentClick = function (event) {
            if (!_this._container) {
                return;
            }
            var target = event.target;
            var dropdown = _this._container.querySelector('.erb-connect-dropdown');
            if ((dropdown === null || dropdown === void 0 ? void 0 : dropdown.classList.contains('is-open')) && !target.closest('.erb-connect-dropdown')) {
                _this._setDropdown(false);
            }
            var shell = _this._container.querySelector('.erb-connect-shell');
            if ((shell === null || shell === void 0 ? void 0 : shell.classList.contains('is-drawer-open')) &&
                !target.closest('.erb-connect-drawer') &&
                !target.closest('.erb-connect-hamburger')) {
                _this._setDrawer(false);
            }
        };
        _this._handleKeydown = function (event) {
            if (event.key === 'Escape') {
                _this._setDropdown(false);
                _this._setDrawer(false);
            }
        };
        _this._onDispose = function () {
            if (_this._container) {
                if (_this._eventsBound) {
                    _this._container.removeEventListener('click', _this._handleContainerClick);
                    document.removeEventListener('click', _this._handleDocumentClick);
                    document.removeEventListener('keydown', _this._handleKeydown);
                    _this._eventsBound = false;
                }
                _this._container.remove();
                _this._container = undefined;
            }
            sp_core_library_1.Log.info(LOG_SOURCE, 'Disposed Erb Connect Global Nav Application Customizer.');
        };
        return _this;
    }
    ErbConnectGlobalNavApplicationCustomizer.prototype.onInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                sp_core_library_1.Log.info(LOG_SOURCE, 'Initialized Erb Connect Global Nav Application Customizer');
                this.context.placeholderProvider.changedEvent.add(this, this._render);
                this._render();
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    ErbConnectGlobalNavApplicationCustomizer.prototype._renderMarkup = function () {
        if (!this._container) {
            return;
        }
        var homeUrl = this.context.pageContext.web.absoluteUrl;
        this._container.innerHTML = "\n      <div class=\"erb-connect-shell\" role=\"navigation\" aria-label=\"Erb Connect Global Navigation\">\n        <div class=\"erb-connect-inner\">\n          <a class=\"erb-connect-brand\" href=\"".concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">\n            <span class=\"erb-connect-accent\" aria-hidden=\"true\"></span>\n            <span class=\"erb-connect-title\">Erb Connect</span>\n          </a>\n          <button class=\"erb-connect-hamburger\" type=\"button\" aria-label=\"Open navigation\" aria-expanded=\"false\" aria-controls=\"erb-connect-drawer\">\n            <span></span>\n            <span></span>\n            <span></span>\n          </button>\n          <ul class=\"erb-connect-links\" role=\"menubar\">\n            <li role=\"none\">\n              <a class=\"erb-connect-link\" role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">HOME</a>\n            </li>\n            <li role=\"none\">\n              <a class=\"erb-connect-link\" role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">DAYFORCE</a>\n            </li>\n            <li class=\"erb-connect-dropdown\" role=\"none\">\n              <button class=\"erb-connect-dropbtn\" type=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                DEPARTMENTS <span class=\"erb-connect-caret\" aria-hidden=\"true\"></span>\n              </button>\n              <ul class=\"erb-connect-dropmenu\" role=\"menu\">\n                <li role=\"none\"><a role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">HR</a></li>\n                <li role=\"none\"><a role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">Marketing</a></li>\n                <li role=\"none\"><a role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">Driver Services</a></li>\n                <li role=\"none\"><a role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">Health &amp; Safety</a></li>\n              </ul>\n            </li>\n            <li role=\"none\">\n              <a class=\"erb-connect-link\" role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">PERKS</a>\n            </li>\n            <li role=\"none\">\n              <a class=\"erb-connect-link\" role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">ISAAC</a>\n            </li>\n            <li role=\"none\">\n              <a class=\"erb-connect-link\" role=\"menuitem\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">ADDITIONAL RESOURCES</a>\n            </li>\n          </ul>\n        </div>\n        <div class=\"erb-connect-drawer\" id=\"erb-connect-drawer\" aria-hidden=\"true\">\n          <div class=\"erb-connect-drawer-header\">\n            <span class=\"erb-connect-drawer-title\">Erb Connect</span>\n            <button class=\"erb-connect-drawer-close\" type=\"button\" aria-label=\"Close navigation\">\u00D7</button>\n          </div>\n          <nav class=\"erb-connect-drawer-nav\" aria-label=\"Erb Connect mobile navigation\">\n            <a class=\"erb-connect-drawer-link\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">HOME</a>\n            <a class=\"erb-connect-drawer-link\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">DAYFORCE</a>\n            <div class=\"erb-connect-drawer-section\">\n              <span class=\"erb-connect-drawer-section-title\">DEPARTMENTS</span>\n              <div class=\"erb-connect-drawer-sub\">\n                <a href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">HR</a>\n                <a href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">Marketing</a>\n                <a href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">Driver Services</a>\n                <a href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">Health &amp; Safety</a>\n              </div>\n            </div>\n            <a class=\"erb-connect-drawer-link\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">PERKS</a>\n            <a class=\"erb-connect-drawer-link\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">ISAAC</a>\n            <a class=\"erb-connect-drawer-link\" href=\"").concat(homeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\">ADDITIONAL RESOURCES</a>\n          </nav>\n        </div>\n        <div class=\"erb-connect-overlay\" aria-hidden=\"true\"></div>\n      </div>\n    ");
        this._setDropdown(false);
        this._setDrawer(false);
    };
    ErbConnectGlobalNavApplicationCustomizer.prototype._ensureStyles = function () {
        if (document.getElementById(STYLE_ELEMENT_ID)) {
            return;
        }
        var style = document.createElement('style');
        style.id = STYLE_ELEMENT_ID;
        style.textContent = "\n      .erb-connect-shell {\n        width: 100%;\n        background: #FFFFFF;\n        border-bottom: 2px solid #E31E38;\n        box-sizing: border-box;\n      }\n      .erb-connect-inner {\n        height: 80px;\n        display: flex;\n        align-items: center;\n        gap: 24px;\n        padding: 0 24px;\n        box-sizing: border-box;\n      }\n      .erb-connect-brand {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        text-decoration: none;\n        color: #1D252C;\n        font-weight: 700;\n        font-size: 20px;\n        letter-spacing: 0.2px;\n      }\n      .erb-connect-brand:focus-visible {\n        outline: 2px solid #E31E38;\n        outline-offset: 4px;\n      }\n      .erb-connect-accent {\n        width: 10px;\n        height: 48px;\n        border-radius: 6px;\n        background: #E31E38;\n      }\n      .erb-connect-links {\n        list-style: none;\n        display: flex;\n        align-items: center;\n        gap: 20px;\n        margin: 0 0 0 auto;\n        padding: 0;\n      }\n      .erb-connect-link,\n      .erb-connect-dropbtn {\n        color: #1D252C;\n        font-size: 14px;\n        font-weight: 600;\n        text-decoration: none;\n        padding: 10px 6px;\n        border-radius: 6px;\n      }\n      .erb-connect-link:hover,\n      .erb-connect-dropbtn:hover {\n        background: #F6F7F8;\n      }\n      .erb-connect-dropbtn {\n        background: none;\n        border: none;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        gap: 6px;\n      }\n      .erb-connect-caret {\n        border: solid #1D252C;\n        border-width: 0 2px 2px 0;\n        display: inline-block;\n        padding: 3px;\n        transform: rotate(45deg);\n        transition: transform 0.2s ease;\n        margin-top: -2px;\n      }\n      .erb-connect-dropdown {\n        position: relative;\n      }\n      .erb-connect-dropmenu {\n        display: none;\n        position: absolute;\n        top: calc(100% + 6px);\n        left: 0;\n        background: #FFFFFF;\n        border: 1px solid #E5E7EB;\n        border-radius: 8px;\n        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);\n        min-width: 220px;\n        padding: 6px 0;\n        z-index: 10002;\n      }\n      .erb-connect-dropmenu a {\n        display: block;\n        padding: 10px 16px;\n        color: #1D252C;\n        text-decoration: none;\n        font-size: 14px;\n      }\n      .erb-connect-dropmenu a:hover {\n        background: #F3F4F6;\n      }\n      .erb-connect-dropdown.is-open .erb-connect-dropmenu {\n        display: block;\n      }\n      .erb-connect-dropdown.is-open .erb-connect-caret {\n        transform: rotate(-135deg);\n      }\n      .erb-connect-hamburger {\n        display: none;\n        margin-left: auto;\n        background: #FFFFFF;\n        border: 1px solid #E5E7EB;\n        border-radius: 8px;\n        width: 44px;\n        height: 40px;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n      }\n      .erb-connect-hamburger span {\n        display: block;\n        width: 20px;\n        height: 2px;\n        background: #1D252C;\n        margin: 3px 0;\n      }\n      .erb-connect-drawer {\n        position: fixed;\n        top: 0;\n        left: 0;\n        height: 100vh;\n        width: 280px;\n        background: #FFFFFF;\n        transform: translateX(-100%);\n        transition: transform 0.25s ease;\n        box-shadow: 2px 0 20px rgba(0, 0, 0, 0.15);\n        z-index: 10001;\n        padding: 20px;\n        box-sizing: border-box;\n        display: flex;\n        flex-direction: column;\n        gap: 16px;\n      }\n      .erb-connect-drawer-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n      }\n      .erb-connect-drawer-title {\n        font-size: 18px;\n        font-weight: 700;\n        color: #1D252C;\n      }\n      .erb-connect-drawer-close {\n        background: none;\n        border: none;\n        font-size: 26px;\n        cursor: pointer;\n        color: #1D252C;\n      }\n      .erb-connect-drawer-nav {\n        display: flex;\n        flex-direction: column;\n        gap: 6px;\n      }\n      .erb-connect-drawer-link {\n        text-decoration: none;\n        color: #1D252C;\n        font-weight: 600;\n        padding: 8px 0;\n      }\n      .erb-connect-drawer-section-title {\n        font-size: 13px;\n        letter-spacing: 1px;\n        color: #6B7280;\n        font-weight: 700;\n        padding: 12px 0 6px 0;\n      }\n      .erb-connect-drawer-sub {\n        border-left: 2px solid #E31E38;\n        padding-left: 12px;\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n      .erb-connect-drawer-sub a {\n        text-decoration: none;\n        color: #1D252C;\n        font-weight: 500;\n        font-size: 14px;\n        padding: 6px 0;\n      }\n      .erb-connect-overlay {\n        position: fixed;\n        inset: 0;\n        background: rgba(0, 0, 0, 0.25);\n        opacity: 0;\n        pointer-events: none;\n        transition: opacity 0.2s ease;\n        z-index: 10000;\n      }\n      .erb-connect-shell.is-drawer-open .erb-connect-drawer {\n        transform: translateX(0);\n      }\n      .erb-connect-shell.is-drawer-open .erb-connect-overlay {\n        opacity: 1;\n        pointer-events: auto;\n      }\n      @media (max-width: 1024px) {\n        .erb-connect-links {\n          display: none;\n        }\n        .erb-connect-hamburger {\n          display: flex;\n        }\n        .erb-connect-inner {\n          gap: 12px;\n        }\n      }\n    ";
        document.head.appendChild(style);
    };
    ErbConnectGlobalNavApplicationCustomizer.prototype._bindEvents = function () {
        if (!this._container) {
            return;
        }
        this._container.addEventListener('click', this._handleContainerClick);
        document.addEventListener('click', this._handleDocumentClick);
        document.addEventListener('keydown', this._handleKeydown);
        this._eventsBound = true;
    };
    ErbConnectGlobalNavApplicationCustomizer.prototype._setDropdown = function (open) {
        if (!this._container) {
            return;
        }
        var dropdown = this._container.querySelector('.erb-connect-dropdown');
        var button = this._container.querySelector('.erb-connect-dropbtn');
        if (!dropdown || !button) {
            return;
        }
        dropdown.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    ErbConnectGlobalNavApplicationCustomizer.prototype._setDrawer = function (open) {
        if (!this._container) {
            return;
        }
        var shell = this._container.querySelector('.erb-connect-shell');
        var drawer = this._container.querySelector('.erb-connect-drawer');
        var hamburger = this._container.querySelector('.erb-connect-hamburger');
        if (!shell || !drawer || !hamburger) {
            return;
        }
        shell.classList.toggle('is-drawer-open', open);
        drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
            this._bodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
        else if (this._bodyOverflow !== undefined) {
            document.body.style.overflow = this._bodyOverflow;
            this._bodyOverflow = undefined;
        }
    };
    return ErbConnectGlobalNavApplicationCustomizer;
}(sp_application_base_1.BaseApplicationCustomizer));
exports.default = ErbConnectGlobalNavApplicationCustomizer;
//# sourceMappingURL=ErbConnectGlobalNavApplicationCustomizer.js.map