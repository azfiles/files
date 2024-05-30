/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PlotareaBuilderPanel.ts":
/*!*************************************!*\
  !*** ./src/PlotareaBuilderPanel.ts ***!
  \*************************************/
/***/ (function() {

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
var plotareaFormTemplate = document.createElement("template");
plotareaFormTemplate.innerHTML = "\n    <form id=\"form\">\n        <fieldset>\n            <legend>Plotarea Properties</legend>\n            <table>\n                <tr>\n                    <td>Rounded Marker</td>\n                    <td><input id=\"bps_rounded\" type=\"checkbox\" checked></td>\n                </tr>\n                <tr>\n                    <td>Increate Size</td>\n                    <td><input id=\"bps_size_increment\" type=\"number\" value=\"0\">%</td>\n                </tr>\n                <tr>\n                    <td>Axis Label Color</td>\n                    <td><input id=\"bps_axis_label_color\" type=\"text\" size=\"10\" maxlength=\"10\" value=\"#333\"></td>\n                </tr>\n            </table>\n            <input type=\"submit\" style=\"display:none;\">\n        </fieldset>\n    </form>\n    <style>\n    :host {\n        display: block;\n        padding: 1em 1em 1em 1em;\n    }\n    </style>\n";
var VizPlotareaBuilderPanel = /** @class */ (function (_super) {
    __extends(VizPlotareaBuilderPanel, _super);
    function VizPlotareaBuilderPanel() {
        var _this = _super.call(this) || this;
        _this._shadowRoot = _this.attachShadow({ mode: "open" });
        _this._shadowRoot.appendChild(plotareaFormTemplate.content.cloneNode(true));
        _this._shadowRoot.getElementById("form").addEventListener("submit", _this._submit.bind(_this));
        _this._shadowRoot.getElementById('bps_rounded').addEventListener('change', _this._submit.bind(_this));
        _this._shadowRoot.getElementById('bps_size_increment').addEventListener('change', _this._submit.bind(_this));
        _this._shadowRoot.getElementById('bps_axis_label_color').addEventListener('change', _this._submit.bind(_this));
        return _this;
    }
    VizPlotareaBuilderPanel.prototype._submit = function (e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
            detail: {
                properties: {
                    rounded: this.rounded,
                    sizeIncrement: this.sizeIncrement,
                    axisLabelColor: this.axisLabelColor,
                }
            }
        }));
    };
    Object.defineProperty(VizPlotareaBuilderPanel.prototype, "rounded", {
        get: function () {
            return this._shadowRoot.getElementById("bps_rounded").checked;
        },
        set: function (value) {
            this._shadowRoot.getElementById("bps_rounded").checked = !!value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizPlotareaBuilderPanel.prototype, "sizeIncrement", {
        get: function () {
            return this._shadowRoot.getElementById("bps_size_increment").value;
        },
        set: function (value) {
            this._shadowRoot.getElementById("bps_size_increment").value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizPlotareaBuilderPanel.prototype, "axisLabelColor", {
        get: function () {
            return this._shadowRoot.getElementById("bps_axis_label_color").value;
        },
        set: function (value) {
            this._shadowRoot.getElementById("bps_axis_label_color").value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizPlotareaBuilderPanel.prototype, "settings", {
        set: function (settings) {
            this.rounded = (settings === null || settings === void 0 ? void 0 : settings.rounded) || this.rounded;
            this.sizeIncrement = (settings === null || settings === void 0 ? void 0 : settings.sizeIncrement) || this.sizeIncrement;
            this.axisLabelColor = (settings === null || settings === void 0 ? void 0 : settings.axisLabelColor) || this.axisLabelColor;
        },
        enumerable: false,
        configurable: true
    });
    return VizPlotareaBuilderPanel;
}(HTMLElement));
customElements.define("viz-plotarea-build", VizPlotareaBuilderPanel);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/PlotareaBuilderPanel.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml6LXBsb3RhcmVhLWJ1aWxkZXItcGFuZWwuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0Isc0NBQXNDLGtCQUFrQjtBQUN2Riw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxneUJBQWd5QiwrREFBK0QseUJBQXlCLG1DQUFtQyxPQUFPO0FBQ2w2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxjQUFjO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O1VFbEZBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvLi9zcmMvUGxvdGFyZWFCdWlsZGVyUGFuZWwudHMiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgcGxvdGFyZWFGb3JtVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG5wbG90YXJlYUZvcm1UZW1wbGF0ZS5pbm5lckhUTUwgPSBcIlxcbiAgICA8Zm9ybSBpZD1cXFwiZm9ybVxcXCI+XFxuICAgICAgICA8ZmllbGRzZXQ+XFxuICAgICAgICAgICAgPGxlZ2VuZD5QbG90YXJlYSBQcm9wZXJ0aWVzPC9sZWdlbmQ+XFxuICAgICAgICAgICAgPHRhYmxlPlxcbiAgICAgICAgICAgICAgICA8dHI+XFxuICAgICAgICAgICAgICAgICAgICA8dGQ+Um91bmRlZCBNYXJrZXI8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBpZD1cXFwiYnBzX3JvdW5kZWRcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIiBjaGVja2VkPjwvdGQ+XFxuICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5JbmNyZWF0ZSBTaXplPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgaWQ9XFxcImJwc19zaXplX2luY3JlbWVudFxcXCIgdHlwZT1cXFwibnVtYmVyXFxcIiB2YWx1ZT1cXFwiMFxcXCI+JTwvdGQ+XFxuICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5BeGlzIExhYmVsIENvbG9yPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgaWQ9XFxcImJwc19heGlzX2xhYmVsX2NvbG9yXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBzaXplPVxcXCIxMFxcXCIgbWF4bGVuZ3RoPVxcXCIxMFxcXCIgdmFsdWU9XFxcIiMzMzNcXFwiPjwvdGQ+XFxuICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgPC90YWJsZT5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwic3VibWl0XFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lO1xcXCI+XFxuICAgICAgICA8L2ZpZWxkc2V0PlxcbiAgICA8L2Zvcm0+XFxuICAgIDxzdHlsZT5cXG4gICAgOmhvc3Qge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBwYWRkaW5nOiAxZW0gMWVtIDFlbSAxZW07XFxuICAgIH1cXG4gICAgPC9zdHlsZT5cXG5cIjtcbnZhciBWaXpQbG90YXJlYUJ1aWxkZXJQYW5lbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVml6UGxvdGFyZWFCdWlsZGVyUGFuZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVml6UGxvdGFyZWFCdWlsZGVyUGFuZWwoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290ID0gX3RoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHBsb3RhcmVhRm9ybVRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgX3RoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgX3RoaXMuX3N1Ym1pdC5iaW5kKF90aGlzKSk7XG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdicHNfcm91bmRlZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIF90aGlzLl9zdWJtaXQuYmluZChfdGhpcykpO1xuICAgICAgICBfdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnYnBzX3NpemVfaW5jcmVtZW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgX3RoaXMuX3N1Ym1pdC5iaW5kKF90aGlzKSk7XG4gICAgICAgIF90aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdicHNfYXhpc19sYWJlbF9jb2xvcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIF90aGlzLl9zdWJtaXQuYmluZChfdGhpcykpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFZpelBsb3RhcmVhQnVpbGRlclBhbmVsLnByb3RvdHlwZS5fc3VibWl0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwicHJvcGVydGllc0NoYW5nZWRcIiwge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICByb3VuZGVkOiB0aGlzLnJvdW5kZWQsXG4gICAgICAgICAgICAgICAgICAgIHNpemVJbmNyZW1lbnQ6IHRoaXMuc2l6ZUluY3JlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xhYmVsQ29sb3I6IHRoaXMuYXhpc0xhYmVsQ29sb3IsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVml6UGxvdGFyZWFCdWlsZGVyUGFuZWwucHJvdG90eXBlLCBcInJvdW5kZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKFwiYnBzX3JvdW5kZWRcIikuY2hlY2tlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJicHNfcm91bmRlZFwiKS5jaGVja2VkID0gISF2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWaXpQbG90YXJlYUJ1aWxkZXJQYW5lbC5wcm90b3R5cGUsIFwic2l6ZUluY3JlbWVudFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJicHNfc2l6ZV9pbmNyZW1lbnRcIikudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKFwiYnBzX3NpemVfaW5jcmVtZW50XCIpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVml6UGxvdGFyZWFCdWlsZGVyUGFuZWwucHJvdG90eXBlLCBcImF4aXNMYWJlbENvbG9yXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcImJwc19heGlzX2xhYmVsX2NvbG9yXCIpLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcImJwc19heGlzX2xhYmVsX2NvbG9yXCIpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVml6UGxvdGFyZWFCdWlsZGVyUGFuZWwucHJvdG90eXBlLCBcInNldHRpbmdzXCIsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMucm91bmRlZCA9IChzZXR0aW5ncyA9PT0gbnVsbCB8fCBzZXR0aW5ncyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2V0dGluZ3Mucm91bmRlZCkgfHwgdGhpcy5yb3VuZGVkO1xuICAgICAgICAgICAgdGhpcy5zaXplSW5jcmVtZW50ID0gKHNldHRpbmdzID09PSBudWxsIHx8IHNldHRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXR0aW5ncy5zaXplSW5jcmVtZW50KSB8fCB0aGlzLnNpemVJbmNyZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmF4aXNMYWJlbENvbG9yID0gKHNldHRpbmdzID09PSBudWxsIHx8IHNldHRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXR0aW5ncy5heGlzTGFiZWxDb2xvcikgfHwgdGhpcy5heGlzTGFiZWxDb2xvcjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBWaXpQbG90YXJlYUJ1aWxkZXJQYW5lbDtcbn0oSFRNTEVsZW1lbnQpKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInZpei1wbG90YXJlYS1idWlsZFwiLCBWaXpQbG90YXJlYUJ1aWxkZXJQYW5lbCk7XG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL1Bsb3RhcmVhQnVpbGRlclBhbmVsLnRzXCJdKCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=