/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/VizTooltipBuilderPanel.ts":
/*!***************************************!*\
  !*** ./src/VizTooltipBuilderPanel.ts ***!
  \***************************************/
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
var tooltipFormTemplate = document.createElement("template");
tooltipFormTemplate.innerHTML = "\n    <form id=\"form\">\n        <fieldset>\n            <legend>Tooltip Header Properties</legend>\n            <table>\n                <tr>\n                    <td>Max</td>\n                    <td><input id=\"bps_max\" type=\"number\" size=\"10\" maxlength=\"10\">Millian</td>\n                </tr>\n                <tr>\n                    <td>Color</td>\n                    <td><input id=\"bps_color\" type=\"text\" size=\"10\" maxlength=\"10\"></td>\n                </tr>\n            </table>\n            <input type=\"submit\" style=\"display:none;\">\n        </fieldset>\n    </form>\n    <style>\n    :host {\n        display: block;\n        padding: 1em 1em 1em 1em;\n    }\n    </style>\n";
var VizTooltipBuilderPanel = /** @class */ (function (_super) {
    __extends(VizTooltipBuilderPanel, _super);
    function VizTooltipBuilderPanel() {
        var _this = _super.call(this) || this;
        _this._shadowRoot = _this.attachShadow({ mode: "open" });
        _this._shadowRoot.appendChild(tooltipFormTemplate.content.cloneNode(true));
        _this._shadowRoot.getElementById("form").addEventListener("submit", _this._submit.bind(_this));
        return _this;
    }
    VizTooltipBuilderPanel.prototype._submit = function (e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
            detail: {
                properties: {
                    color: this.color,
                    max: this.max
                }
            }
        }));
    };
    Object.defineProperty(VizTooltipBuilderPanel.prototype, "color", {
        get: function () {
            return this._shadowRoot.getElementById("bps_color").value;
        },
        set: function (newColor) {
            this._shadowRoot.getElementById("bps_color").value = newColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizTooltipBuilderPanel.prototype, "max", {
        get: function () {
            return this._shadowRoot.getElementById("bps_max").value;
        },
        set: function (value) {
            this._shadowRoot.getElementById("bps_max").value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VizTooltipBuilderPanel.prototype, "settings", {
        set: function (settings) {
            this.color = (settings === null || settings === void 0 ? void 0 : settings.color) || this.color;
            this.max = (settings === null || settings === void 0 ? void 0 : settings.max) || this.max;
        },
        enumerable: false,
        configurable: true
    });
    return VizTooltipBuilderPanel;
}(HTMLElement));
customElements.define("viz-tooltip-build", VizTooltipBuilderPanel);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/VizTooltipBuilderPanel.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml6LXRvb2x0aXAtYnVpbGRlci1wYW5lbC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdCQUFnQixzQ0FBc0Msa0JBQWtCO0FBQ3ZGLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHFsQkFBcWxCLCtEQUErRCx5QkFBeUIsbUNBQW1DLE9BQU87QUFDdnRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGNBQWM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7VUVuRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy8uL3NyYy9WaXpUb29sdGlwQnVpbGRlclBhbmVsLnRzIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIHRvb2x0aXBGb3JtVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50b29sdGlwRm9ybVRlbXBsYXRlLmlubmVySFRNTCA9IFwiXFxuICAgIDxmb3JtIGlkPVxcXCJmb3JtXFxcIj5cXG4gICAgICAgIDxmaWVsZHNldD5cXG4gICAgICAgICAgICA8bGVnZW5kPlRvb2x0aXAgSGVhZGVyIFByb3BlcnRpZXM8L2xlZ2VuZD5cXG4gICAgICAgICAgICA8dGFibGU+XFxuICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5NYXg8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBpZD1cXFwiYnBzX21heFxcXCIgdHlwZT1cXFwibnVtYmVyXFxcIiBzaXplPVxcXCIxMFxcXCIgbWF4bGVuZ3RoPVxcXCIxMFxcXCI+TWlsbGlhbjwvdGQ+XFxuICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5Db2xvcjwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IGlkPVxcXCJicHNfY29sb3JcXFwiIHR5cGU9XFxcInRleHRcXFwiIHNpemU9XFxcIjEwXFxcIiBtYXhsZW5ndGg9XFxcIjEwXFxcIj48L3RkPlxcbiAgICAgICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgICAgIDwvdGFibGU+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInN1Ym1pdFxcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZTtcXFwiPlxcbiAgICAgICAgPC9maWVsZHNldD5cXG4gICAgPC9mb3JtPlxcbiAgICA8c3R5bGU+XFxuICAgIDpob3N0IHtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgcGFkZGluZzogMWVtIDFlbSAxZW0gMWVtO1xcbiAgICB9XFxuICAgIDwvc3R5bGU+XFxuXCI7XG52YXIgVml6VG9vbHRpcEJ1aWxkZXJQYW5lbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVml6VG9vbHRpcEJ1aWxkZXJQYW5lbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBWaXpUb29sdGlwQnVpbGRlclBhbmVsKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fc2hhZG93Um9vdCA9IF90aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgICAgICBfdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0b29sdGlwRm9ybVRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgX3RoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgX3RoaXMuX3N1Ym1pdC5iaW5kKF90aGlzKSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgVml6VG9vbHRpcEJ1aWxkZXJQYW5lbC5wcm90b3R5cGUuX3N1Ym1pdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInByb3BlcnRpZXNDaGFuZ2VkXCIsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWaXpUb29sdGlwQnVpbGRlclBhbmVsLnByb3RvdHlwZSwgXCJjb2xvclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJicHNfY29sb3JcIikudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKFwiYnBzX2NvbG9yXCIpLnZhbHVlID0gbmV3Q29sb3I7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVml6VG9vbHRpcEJ1aWxkZXJQYW5lbC5wcm90b3R5cGUsIFwibWF4XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcImJwc19tYXhcIikudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKFwiYnBzX21heFwiKS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpelRvb2x0aXBCdWlsZGVyUGFuZWwucHJvdG90eXBlLCBcInNldHRpbmdzXCIsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAoc2V0dGluZ3MgPT09IG51bGwgfHwgc2V0dGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNldHRpbmdzLmNvbG9yKSB8fCB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5tYXggPSAoc2V0dGluZ3MgPT09IG51bGwgfHwgc2V0dGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNldHRpbmdzLm1heCkgfHwgdGhpcy5tYXg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gVml6VG9vbHRpcEJ1aWxkZXJQYW5lbDtcbn0oSFRNTEVsZW1lbnQpKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInZpei10b29sdGlwLWJ1aWxkXCIsIFZpelRvb2x0aXBCdWlsZGVyUGFuZWwpO1xuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9WaXpUb29sdGlwQnVpbGRlclBhbmVsLnRzXCJdKCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=