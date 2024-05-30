/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/VizTooltip.ts":
/*!***************************!*\
  !*** ./src/VizTooltip.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var rowTemplate = document.createElement('template');
rowTemplate.innerHTML = "\n    <div class=\"tooltip-row\">\n        <img class=\"entry-icon\"\n            width=\"22\"\n            height=\"22\"\n        >\n        <div class=\"tooltip-row-label\">\n            <span class=\"entry-label\"></span>\n        </div>\n    </div>\n";
var containerTemplate = document.createElement('template');
containerTemplate.innerHTML = "\n    <style>\n        :host {\n            display: block;\n            min-width: 80px;\n            max-width: 250px;\n            min-height: 24px;\n        }\n\n        .tooltip-container {\n            padding: 12px;\n            display: flex;\n            min-width: 80px;\n            min-height: 24px;\n            flex-flow: column nowrap;\n        }\n\n        .price::before {\n            font-family: SAP-icons;\n            content: \"\\E026\";\n        }\n\n        .manager::before {\n            font-family: SAP-icons;\n            content: \"\\E036\";\n        }\n\n        .product::before {\n            font-family: SAP-icons;\n            content \"\\E16D\";\n        }\n\n        .location::before {\n            font-family: SAP-icons;\n            content \"\\E021\";\n        }\n\n        .store::before {\n            font-family: SAP-icons;\n            content \"\\E00F\";\n        }\n\n        .tooltip-row {\n            display: flex;\n            min-height: 30px;\n            flex-flow: row nowrap;\n            align-items: center;\n        }\n\n        .tooltip-row-label {\n            display: flex;\n            flex-flow: column nowrap;\n            flex: auto;\n        }\n\n        .tooltip-row-label progress {\n            height: 6px;\n            width: 100%;\n            border-radius: 0;\n        }\n\n        .tooltip-row-label progress::-webkit-progress-bar {\n            color: lightblue;\n            background-color: #eee;\n        }\n\n        .tooltip-row-label progress::-webkit-progress-value {\n            background-color: red;\n        }\n\n        .tooltip-row:not(:last-of-type) {\n            border-bottom: solid 1px #e6e7e8;\n        }\n\n        .entry-icon {\n            display: inline-block;\n            padding-right: 12px;\n        }\n\n        .entry-label {\n            display: inline-block;\n            flex: auto;\n            vertical-align: middle;\n        }\n    </style>\n    <div class=\"tooltip-container\">\n    </div>\n\n";
var iconMap = {
    'Location': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Location.png',
    'Product': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Product.png',
    'Sales Manager': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/SalesManager.png',
    'Date': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Date.png',
    'Store': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Store.png',
    'Category': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Category.png',
    'Price (fixed)': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Price.png',
    'Quantity Sold': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Quantity.png',
    'California': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Location.png',
    'Nevada': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Location.png',
    'Oregon': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Location.png',
    'Carbonated Drinks': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/CarbonatedDrinks.png',
    'Juices': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Juices.png',
    'Alcohol': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Alcohol.png',
    'Others': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Others.png',
    'Gross Margin': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/GrossMargin.png',
    'Discount': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Discount.png',
    'Original Sales Price': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Price.png',
    'City': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/City.png',
    'Info': 'https://fp68static.cfapps.eu10-004.hana.ondemand.com/sap-icons/Info.png',
};
var tooltipEntryToRow = function (entry, withPercentageBar, max) {
    if (withPercentageBar === void 0) { withPercentageBar = false; }
    if (max === void 0) { max = 100; }
    var rowElement = rowTemplate.content.cloneNode(true);
    var iconEl = rowElement.querySelector('.entry-icon');
    var labelEl = rowElement.querySelector('.entry-label');
    iconEl.setAttribute('src', iconMap[entry.value] || iconMap[entry.title] || iconMap['Info']);
    iconEl.setAttribute('title', entry.title);
    labelEl.textContent = entry.value;
    if (withPercentageBar) {
        var numberRegexp = /[.0-9]+/;
        if (!numberRegexp.test(entry.value)) {
            return;
        }
        var percentageBar = document.createElement('progress');
        percentageBar.value = Number(/[.0-9]+/.exec(entry.value)[0]);
        percentageBar.max = max;
        var rowLabelDiv = rowElement.querySelector('.tooltip-row-label');
        // (percentageBar as HTMLElement).style['width'] = '100%';
        rowLabelDiv.appendChild(percentageBar);
    }
    return rowElement;
};
var VizTooltip = /** @class */ (function (_super) {
    __extends(VizTooltip, _super);
    function VizTooltip() {
        var _this = _super.call(this) || this;
        _this._max = 100;
        _this._color = 'lightblue';
        _this._shadowRoot = _this.attachShadow({ mode: 'open' });
        _this._shadowRoot.appendChild(containerTemplate.content.cloneNode(true));
        _this._tooltipContainer = _this._shadowRoot.querySelector('.tooltip-container');
        _this._props = {};
        _this.render();
        return _this;
    }
    VizTooltip.prototype.render = function () {
        var _this = this;
        var _a;
        this._tooltipContainer.innerHTML = '';
        if (this._props.header) {
            this._tooltipContainer.appendChild(tooltipEntryToRow(this._props.header, true, this._max));
        }
        if (this._props.details) {
            (_a = this._props.details) === null || _a === void 0 ? void 0 : _a.forEach(function (detailsRow) {
                _this._tooltipContainer.appendChild(tooltipEntryToRow(detailsRow));
            });
        }
        if (this._color) {
            var percentageColorReg = /progress::\-webkit\-progress\-value\s+\{\s+background-color:\s+[#a-z0-9]+\s?;\s+}/;
            var styleElement = this._shadowRoot.querySelector('style');
            var styleContent = styleElement.textContent.replace(percentageColorReg, "progress::-webkit-progress-value { background-color: ".concat(this._color, "; }"));
            styleElement.innerHTML = styleContent;
        }
    };
    VizTooltip.prototype.setExtensionData = function (value) {
        this._props = value;
        this.render();
    };
    Object.defineProperty(VizTooltip.prototype, "max", {
        set: function (value) {
            this._max = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizTooltip.prototype, "color", {
        set: function (value) {
            this._color = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    return VizTooltip;
}(HTMLElement));
customElements.define('viz-tooltip', VizTooltip);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/VizTooltip.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml6LXRvb2x0aXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0Isc0NBQXNDLGtCQUFrQjtBQUN2Riw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCw2QkFBNkIsOEJBQThCLCtCQUErQiwrQkFBK0IsV0FBVyxnQ0FBZ0MsNEJBQTRCLDRCQUE0Qiw4QkFBOEIsK0JBQStCLHVDQUF1QyxXQUFXLDRCQUE0QixxQ0FBcUMsa0NBQWtDLFdBQVcsOEJBQThCLHFDQUFxQyxrQ0FBa0MsV0FBVyw4QkFBOEIscUNBQXFDLGlDQUFpQyxXQUFXLCtCQUErQixxQ0FBcUMsaUNBQWlDLFdBQVcsNEJBQTRCLHFDQUFxQyxpQ0FBaUMsV0FBVywwQkFBMEIsNEJBQTRCLCtCQUErQixvQ0FBb0Msa0NBQWtDLFdBQVcsZ0NBQWdDLDRCQUE0Qix1Q0FBdUMseUJBQXlCLFdBQVcseUNBQXlDLDBCQUEwQiwwQkFBMEIsK0JBQStCLFdBQVcsK0RBQStELCtCQUErQixxQ0FBcUMsV0FBVyxpRUFBaUUsb0NBQW9DLFdBQVcsNkNBQTZDLCtDQUErQyxXQUFXLHlCQUF5QixvQ0FBb0Msa0NBQWtDLFdBQVcsMEJBQTBCLG9DQUFvQyx5QkFBeUIscUNBQXFDLFdBQVc7QUFDNTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsY0FBYztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsOEVBQThFLHFDQUFxQyxJQUFJO0FBQ3ZIO0FBQ0Esd0hBQXdILDRDQUE0QztBQUNwSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7VUV4SEE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy8uL3NyYy9WaXpUb29sdGlwLnRzIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcm93VGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xucm93VGVtcGxhdGUuaW5uZXJIVE1MID0gXCJcXG4gICAgPGRpdiBjbGFzcz1cXFwidG9vbHRpcC1yb3dcXFwiPlxcbiAgICAgICAgPGltZyBjbGFzcz1cXFwiZW50cnktaWNvblxcXCJcXG4gICAgICAgICAgICB3aWR0aD1cXFwiMjJcXFwiXFxuICAgICAgICAgICAgaGVpZ2h0PVxcXCIyMlxcXCJcXG4gICAgICAgID5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRvb2x0aXAtcm93LWxhYmVsXFxcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiZW50cnktbGFiZWxcXFwiPjwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cIjtcbnZhciBjb250YWluZXJUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5jb250YWluZXJUZW1wbGF0ZS5pbm5lckhUTUwgPSBcIlxcbiAgICA8c3R5bGU+XFxuICAgICAgICA6aG9zdCB7XFxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgICAgbWluLXdpZHRoOiA4MHB4O1xcbiAgICAgICAgICAgIG1heC13aWR0aDogMjUwcHg7XFxuICAgICAgICAgICAgbWluLWhlaWdodDogMjRweDtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC50b29sdGlwLWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgcGFkZGluZzogMTJweDtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIG1pbi13aWR0aDogODBweDtcXG4gICAgICAgICAgICBtaW4taGVpZ2h0OiAyNHB4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5wcmljZTo6YmVmb3JlIHtcXG4gICAgICAgICAgICBmb250LWZhbWlseTogU0FQLWljb25zO1xcbiAgICAgICAgICAgIGNvbnRlbnQ6IFxcXCJcXFxcRTAyNlxcXCI7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAubWFuYWdlcjo6YmVmb3JlIHtcXG4gICAgICAgICAgICBmb250LWZhbWlseTogU0FQLWljb25zO1xcbiAgICAgICAgICAgIGNvbnRlbnQ6IFxcXCJcXFxcRTAzNlxcXCI7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAucHJvZHVjdDo6YmVmb3JlIHtcXG4gICAgICAgICAgICBmb250LWZhbWlseTogU0FQLWljb25zO1xcbiAgICAgICAgICAgIGNvbnRlbnQgXFxcIlxcXFxFMTZEXFxcIjtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5sb2NhdGlvbjo6YmVmb3JlIHtcXG4gICAgICAgICAgICBmb250LWZhbWlseTogU0FQLWljb25zO1xcbiAgICAgICAgICAgIGNvbnRlbnQgXFxcIlxcXFxFMDIxXFxcIjtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5zdG9yZTo6YmVmb3JlIHtcXG4gICAgICAgICAgICBmb250LWZhbWlseTogU0FQLWljb25zO1xcbiAgICAgICAgICAgIGNvbnRlbnQgXFxcIlxcXFxFMDBGXFxcIjtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC50b29sdGlwLXJvdyB7XFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICBtaW4taGVpZ2h0OiAzMHB4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLnRvb2x0aXAtcm93LWxhYmVsIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICAgICAgICBmbGV4OiBhdXRvO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLnRvb2x0aXAtcm93LWxhYmVsIHByb2dyZXNzIHtcXG4gICAgICAgICAgICBoZWlnaHQ6IDZweDtcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLnRvb2x0aXAtcm93LWxhYmVsIHByb2dyZXNzOjotd2Via2l0LXByb2dyZXNzLWJhciB7XFxuICAgICAgICAgICAgY29sb3I6IGxpZ2h0Ymx1ZTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgLnRvb2x0aXAtcm93LWxhYmVsIHByb2dyZXNzOjotd2Via2l0LXByb2dyZXNzLXZhbHVlIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAudG9vbHRpcC1yb3c6bm90KDpsYXN0LW9mLXR5cGUpIHtcXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggI2U2ZTdlODtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5lbnRyeS1pY29uIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMTJweDtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5lbnRyeS1sYWJlbCB7XFxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgICAgIGZsZXg6IGF1dG87XFxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgIH1cXG4gICAgPC9zdHlsZT5cXG4gICAgPGRpdiBjbGFzcz1cXFwidG9vbHRpcC1jb250YWluZXJcXFwiPlxcbiAgICA8L2Rpdj5cXG5cXG5cIjtcbnZhciBpY29uTWFwID0ge1xuICAgICdMb2NhdGlvbic6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Mb2NhdGlvbi5wbmcnLFxuICAgICdQcm9kdWN0JzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL1Byb2R1Y3QucG5nJyxcbiAgICAnU2FsZXMgTWFuYWdlcic6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9TYWxlc01hbmFnZXIucG5nJyxcbiAgICAnRGF0ZSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9EYXRlLnBuZycsXG4gICAgJ1N0b3JlJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL1N0b3JlLnBuZycsXG4gICAgJ0NhdGVnb3J5JzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0NhdGVnb3J5LnBuZycsXG4gICAgJ1ByaWNlIChmaXhlZCknOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvUHJpY2UucG5nJyxcbiAgICAnUXVhbnRpdHkgU29sZCc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9RdWFudGl0eS5wbmcnLFxuICAgICdDYWxpZm9ybmlhJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0xvY2F0aW9uLnBuZycsXG4gICAgJ05ldmFkYSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Mb2NhdGlvbi5wbmcnLFxuICAgICdPcmVnb24nOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvTG9jYXRpb24ucG5nJyxcbiAgICAnQ2FyYm9uYXRlZCBEcmlua3MnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvQ2FyYm9uYXRlZERyaW5rcy5wbmcnLFxuICAgICdKdWljZXMnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvSnVpY2VzLnBuZycsXG4gICAgJ0FsY29ob2wnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvQWxjb2hvbC5wbmcnLFxuICAgICdPdGhlcnMnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvT3RoZXJzLnBuZycsXG4gICAgJ0dyb3NzIE1hcmdpbic6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Hcm9zc01hcmdpbi5wbmcnLFxuICAgICdEaXNjb3VudCc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9EaXNjb3VudC5wbmcnLFxuICAgICdPcmlnaW5hbCBTYWxlcyBQcmljZSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9QcmljZS5wbmcnLFxuICAgICdDaXR5JzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0NpdHkucG5nJyxcbiAgICAnSW5mbyc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9JbmZvLnBuZycsXG59O1xudmFyIHRvb2x0aXBFbnRyeVRvUm93ID0gZnVuY3Rpb24gKGVudHJ5LCB3aXRoUGVyY2VudGFnZUJhciwgbWF4KSB7XG4gICAgaWYgKHdpdGhQZXJjZW50YWdlQmFyID09PSB2b2lkIDApIHsgd2l0aFBlcmNlbnRhZ2VCYXIgPSBmYWxzZTsgfVxuICAgIGlmIChtYXggPT09IHZvaWQgMCkgeyBtYXggPSAxMDA7IH1cbiAgICB2YXIgcm93RWxlbWVudCA9IHJvd1RlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgIHZhciBpY29uRWwgPSByb3dFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnRyeS1pY29uJyk7XG4gICAgdmFyIGxhYmVsRWwgPSByb3dFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnRyeS1sYWJlbCcpO1xuICAgIGljb25FbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGljb25NYXBbZW50cnkudmFsdWVdIHx8IGljb25NYXBbZW50cnkudGl0bGVdIHx8IGljb25NYXBbJ0luZm8nXSk7XG4gICAgaWNvbkVsLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBlbnRyeS50aXRsZSk7XG4gICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGVudHJ5LnZhbHVlO1xuICAgIGlmICh3aXRoUGVyY2VudGFnZUJhcikge1xuICAgICAgICB2YXIgbnVtYmVyUmVnZXhwID0gL1suMC05XSsvO1xuICAgICAgICBpZiAoIW51bWJlclJlZ2V4cC50ZXN0KGVudHJ5LnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwZXJjZW50YWdlQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJvZ3Jlc3MnKTtcbiAgICAgICAgcGVyY2VudGFnZUJhci52YWx1ZSA9IE51bWJlcigvWy4wLTldKy8uZXhlYyhlbnRyeS52YWx1ZSlbMF0pO1xuICAgICAgICBwZXJjZW50YWdlQmFyLm1heCA9IG1heDtcbiAgICAgICAgdmFyIHJvd0xhYmVsRGl2ID0gcm93RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHRpcC1yb3ctbGFiZWwnKTtcbiAgICAgICAgLy8gKHBlcmNlbnRhZ2VCYXIgYXMgSFRNTEVsZW1lbnQpLnN0eWxlWyd3aWR0aCddID0gJzEwMCUnO1xuICAgICAgICByb3dMYWJlbERpdi5hcHBlbmRDaGlsZChwZXJjZW50YWdlQmFyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0VsZW1lbnQ7XG59O1xudmFyIFZpelRvb2x0aXAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFZpelRvb2x0aXAsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVml6VG9vbHRpcCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX21heCA9IDEwMDtcbiAgICAgICAgX3RoaXMuX2NvbG9yID0gJ2xpZ2h0Ymx1ZSc7XG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290ID0gX3RoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgICAgICBfdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXJUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgIF90aGlzLl90b29sdGlwQ29udGFpbmVyID0gX3RoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnRvb2x0aXAtY29udGFpbmVyJyk7XG4gICAgICAgIF90aGlzLl9wcm9wcyA9IHt9O1xuICAgICAgICBfdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBWaXpUb29sdGlwLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5fdG9vbHRpcENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHRoaXMuX3Byb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b29sdGlwRW50cnlUb1Jvdyh0aGlzLl9wcm9wcy5oZWFkZXIsIHRydWUsIHRoaXMuX21heCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wcm9wcy5kZXRhaWxzKSB7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLl9wcm9wcy5kZXRhaWxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChmdW5jdGlvbiAoZGV0YWlsc1Jvdykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90b29sdGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvb2x0aXBFbnRyeVRvUm93KGRldGFpbHNSb3cpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jb2xvcikge1xuICAgICAgICAgICAgdmFyIHBlcmNlbnRhZ2VDb2xvclJlZyA9IC9wcm9ncmVzczo6XFwtd2Via2l0XFwtcHJvZ3Jlc3NcXC12YWx1ZVxccytcXHtcXHMrYmFja2dyb3VuZC1jb2xvcjpcXHMrWyNhLXowLTldK1xccz87XFxzK30vO1xuICAgICAgICAgICAgdmFyIHN0eWxlRWxlbWVudCA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcignc3R5bGUnKTtcbiAgICAgICAgICAgIHZhciBzdHlsZUNvbnRlbnQgPSBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQucmVwbGFjZShwZXJjZW50YWdlQ29sb3JSZWcsIFwicHJvZ3Jlc3M6Oi13ZWJraXQtcHJvZ3Jlc3MtdmFsdWUgeyBiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQodGhpcy5fY29sb3IsIFwiOyB9XCIpKTtcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBzdHlsZUNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZpelRvb2x0aXAucHJvdG90eXBlLnNldEV4dGVuc2lvbkRhdGEgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcHJvcHMgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWaXpUb29sdGlwLnByb3RvdHlwZSwgXCJtYXhcIiwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWF4ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpelRvb2x0aXAucHJvdG90eXBlLCBcImNvbG9yXCIsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIFZpelRvb2x0aXA7XG59KEhUTUxFbGVtZW50KSk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3Zpei10b29sdGlwJywgVml6VG9vbHRpcCk7XG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL1ZpelRvb2x0aXAudHNcIl0oMCwgX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=