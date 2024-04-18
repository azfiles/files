/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PlotareaOverlay.ts":
/*!********************************!*\
  !*** ./src/PlotareaOverlay.ts ***!
  \********************************/
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
var OverlayContainerTemplate = document.createElement('template');
OverlayContainerTemplate.innerHTML = "\n    <style>\n        .chart-overlay-container {\n            position: absolute;\n            pointer-events: none;\n            overflow: hidden;\n        }\n        .chart-legend-overlay-container {\n            position: absolute;\n            pointer-events: none;\n            overflow: hidden;\n        }\n        .series-bar-column-container {\n            background-color: transparent;\n        }\n        .series-bar-column {\n            width: 100%;\n            height: 100%;\n        }\n        .axis-label-container {\n            position: absolute;\n            display: flex;\n            height: 18px;\n            flex-flow: row nowrap;\n            align-items: center;\n            justify-content: flex-end;\n            background-color: transparent;\n        }\n        .axis-label {\n            text-overflow: ellipsis;\n        }\n        .common-label {\n            position: absolute;\n            display: flex;\n            flex-flow: row nowrap;\n            align-items: center;\n        }\n    </style>\n    <div class=\"chart-overlay-container\"></div>\n    <div class=\"chart-legend-overlay-container\"></div>\n";
var BarColumnTemplate = document.createElement('template');
BarColumnTemplate.innerHTML = "<div class=\"series-bar-column-container\">\n</div>";
var AxisLabelTemplate = document.createElement('template');
AxisLabelTemplate.innerHTML = "\n    <span class=\"axis-label-container\">\n        <span class=\"axis-label\"></span>\n    </span>\n";
// For PoC
var ChartOverlayComponent = /** @class */ (function (_super) {
    __extends(ChartOverlayComponent, _super);
    function ChartOverlayComponent() {
        var _this = _super.call(this) || this;
        _this._rounded = true;
        _this._sizeIncrement = 0;
        _this._axisLabelColor = '#333';
        _this.shadowRoot = _this.attachShadow({ mode: 'open' });
        var container = OverlayContainerTemplate.content.cloneNode(true);
        _this._containerElement = container.querySelector('.chart-overlay-container');
        _this._legendContainerElement = container.querySelector('.chart-legend-overlay-container');
        _this.shadowRoot.appendChild(container);
        return _this;
    }
    ChartOverlayComponent.prototype.render = function () {
        var _this = this;
        this._containerElement.innerHTML = '';
        this._legendContainerElement.innerHTML = '';
        var supportedChartTypes = [
            'barcolumn',
            'stackedbar',
            'line',
            'area',
        ];
        if (!supportedChartTypes.includes(this._chartType)) {
            return;
        }
        var _a = this._size, chartWidth = _a.width, chartHeight = _a.height;
        var _b = this._clipPath, clipPathY = _b.y, clipPathHeight = _b.height;
        this._containerElement.setAttribute('style', "position: absolute; pointer-events: none; overflow: hidden; width: ".concat(chartWidth, "px; height: ").concat(chartHeight, "px; clip-path: inset(").concat(clipPathY, "px 0 ").concat(chartHeight - clipPathY - clipPathHeight, "px 0);"));
        if (this._legendContainer) {
            var _c = this._legendContainer, legendX = _c.x, legendY = _c.y, legendHeight = _c.height, legendWidth = _c.width;
            this._legendContainerElement.setAttribute('style', "position: absolute; pointer-events: none; overflow: hidden;                width: ".concat(chartWidth, "px; height: ").concat(chartHeight, "px;                clip-path: inset(").concat(legendY, "px                    ").concat(chartWidth - legendX - legendWidth, "px                    ").concat(chartHeight - legendY - legendHeight, "px                    ").concat(legendX, "px);"));
        }
        this._series.forEach(function (singleSeries, index) {
            var options = {
                color: singleSeries.color,
                showAsTriangle: singleSeries.showAsTriangle,
                isLast: index === 0,
            };
            _this.renderASeries(singleSeries, options);
        });
        this.renderAxisLabels(this._xAxisLabels);
        this.renderAxisLabels(this._yAxisLabels);
        this.renderAxisStackLabels(this._xAxisStackLabels);
        this.renderAxisStackLabels(this._yAxisStackLabels);
    };
    ChartOverlayComponent.prototype.renderASeries = function (singleSeries, options) {
        var _this = this;
        singleSeries.dataPoints.forEach(function (dataPoint) {
            var dataInfo = dataPoint.dataInfo, labelInfo = dataPoint.labelInfo;
            _this.renderData(dataInfo, options);
            _this.renderLabel(labelInfo, options);
        });
        if (singleSeries.legendInfo) {
            this.renderLegend(singleSeries.legendInfo, {
                color: singleSeries.color,
                showAsTriangle: singleSeries.showAsTriangle
            });
        }
    };
    ChartOverlayComponent.prototype.renderLegend = function (legendInfo, options) {
        if (legendInfo.label) {
            this.renderLegendLabel(legendInfo.label, options);
        }
        if (legendInfo.symbol) {
            this.renderLegendSymbol(legendInfo.symbol, options);
        }
        if (legendInfo.line) {
            this.renderLegendline(legendInfo.line, options);
        }
    };
    ChartOverlayComponent.prototype.renderLegendLabel = function (lengendLabel, options) {
        var x = lengendLabel.x, y = lengendLabel.y, width = lengendLabel.width, height = lengendLabel.height, textStr = lengendLabel.textStr, styles = lengendLabel.styles;
        var labelSpan = document.createElement('span');
        var bgColor = 'transparent';
        var labelColor = options.color;
        labelSpan.classList.add('common-label');
        labelSpan.setAttribute('style', "background-color: ".concat(bgColor, "; position: absolute; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px; color: ").concat(labelColor, "; font-size: ").concat(styles.fontSize, ";"));
        labelSpan.innerHTML = textStr;
        this._legendContainerElement.appendChild(labelSpan);
    };
    ChartOverlayComponent.prototype.renderLegendSymbol = function (lengendSymbol, options) {
        var x = lengendSymbol.x, y = lengendSymbol.y, width = lengendSymbol.width, height = lengendSymbol.height, styles = lengendSymbol.styles;
        var symbolDiv = document.createElement('div');
        var roundedStyle = '';
        if (options === null || options === void 0 ? void 0 : options.showAsTriangle) {
            var originalWidth = width;
            var originalHeight = height;
            width = height = (Math.min(originalWidth, originalHeight) / 2);
            roundedStyle = "border-radius: ".concat(height / 2 + 3, "px;");
        }
        else {
            switch (this._chartType) {
                case 'barcolumn':
                case 'stackedbar':
                    if (this._isHorizontal) {
                        roundedStyle = "border-radius: 0 ".concat(height / 2, "px ").concat(height / 2, "px 0;");
                    }
                    else {
                        roundedStyle = "border-radius: ".concat(width / 2, "px ").concat(width / 2, "px 0 0;");
                    }
                    break;
                case 'line':
                case 'area':
                    roundedStyle = "border-radius: ".concat(height / 2, "px;");
                    break;
            }
        }
        var color = options.color;
        var backgroundStyle = (options === null || options === void 0 ? void 0 : options.showAsTriangle) ?
            "border: ".concat(color, " solid 3px;") :
            "background-color: ".concat(color, ";");
        var symbolStyle = this._rounded ? "".concat(backgroundStyle, " ").concat(roundedStyle) : backgroundStyle;
        symbolDiv.setAttribute('style', "".concat(symbolStyle, "            position: absolute;            top: ").concat(y, "px;            left: ").concat(x, "px;            width: ").concat(width, "px;            height: ").concat(height, "px;            cursor: ").concat(styles.cursor, ";"));
        this._legendContainerElement.appendChild(symbolDiv);
    };
    ChartOverlayComponent.prototype.renderLegendline = function (lengendLine, options) {
        var x = lengendLine.x, y = lengendLine.y, width = lengendLine.width, height = lengendLine.height, styles = lengendLine.styles;
        var lineDiv = document.createElement('div');
        lineDiv.setAttribute('style', "border-bottom: 2px solid ".concat(options.color, ";            position: absolute;            top: ").concat(y - 1, "px;            left: ").concat(x, "px;            width: ").concat(width, "px;            height: ").concat(height, "px;            transform: rotate(-20deg);"));
        this._legendContainerElement.appendChild(lineDiv);
    };
    ChartOverlayComponent.prototype.renderData = function (dataInfo, options) {
        if (!dataInfo) {
            return;
        }
        var x = dataInfo.x, y = dataInfo.y, width = dataInfo.width, height = dataInfo.height;
        var dataElement = BarColumnTemplate.content.cloneNode(true);
        var barColumnContainer = dataElement.querySelector('.series-bar-column-container');
        var increment = this._sizeIncrement / 100;
        var roundedStyle = '';
        if (options === null || options === void 0 ? void 0 : options.showAsTriangle) {
            var originalWidth = width;
            var originalHeight = height;
            width = height = (Math.min(originalWidth, originalHeight) / 2) * (1 + increment);
            x = width === originalWidth ? x : x + (originalWidth - width) / 2;
            y = height === originalHeight ? y : y + (originalHeight - height) / 2;
            roundedStyle = "border-radius: ".concat(height / 2 + 3, "px;");
        }
        else {
            switch (this._chartType) {
                case 'barcolumn':
                case 'stackedbar':
                    if (this._isHorizontal) {
                        height = height * (1 + increment);
                        y = y - height * increment / 2;
                        if (this._chartType === 'stackedbar' && !options.isLast) {
                            break;
                        }
                        roundedStyle = "border-radius: 0 ".concat(height / 2, "px ").concat(height / 2, "px 0;");
                    }
                    else {
                        width = width * (1 + increment);
                        x = x - width * increment / 2;
                        if (this._chartType === 'stackedbar' && !options.isLast) {
                            break;
                        }
                        roundedStyle = "border-radius: ".concat(width / 2, "px ").concat(width / 2, "px 0 0;");
                    }
                    break;
                case 'line':
                case 'area':
                    width = width * (1 + increment);
                    height = height * (1 + increment);
                    x = x - width * increment / 2;
                    y = y - height * increment / 2;
                    roundedStyle = "border-radius: ".concat(height / 2, "px;");
                    break;
            }
        }
        var color = dataInfo.color || options.color;
        var backgroundStyle = (options === null || options === void 0 ? void 0 : options.showAsTriangle) ?
            "border: ".concat(color, " solid 3px;") :
            "background-color: ".concat(color, ";");
        var barStyle = this._rounded ? "".concat(backgroundStyle, " ").concat(roundedStyle) : backgroundStyle;
        barColumnContainer.setAttribute('style', "".concat(barStyle, " position: absolute; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px;").concat(dataInfo.opacity !== undefined ? "opacity: ".concat(dataInfo.opacity, ";") : ''));
        this._containerElement.appendChild(dataElement);
    };
    ChartOverlayComponent.prototype.renderLabel = function (labelInfo, options) {
        var _this = this;
        if (!labelInfo) {
            return;
        }
        if (Array.isArray(labelInfo)) {
            labelInfo.forEach(function (label) {
                _this.renderLabel(label, options);
            });
            return;
        }
        var x = labelInfo.x, y = labelInfo.y, width = labelInfo.width, height = labelInfo.height, varianceLabelType = labelInfo.varianceLabelType, color = labelInfo.color, fontSize = labelInfo.fontSize;
        var labelSpan = document.createElement('span');
        var bgColor = 'transparent';
        var labelColor = this._chartType.startsWith('stacked') ? '#666' : options.color;
        if (varianceLabelType !== undefined) {
            labelColor = color;
        }
        labelSpan.classList.add('common-label');
        labelSpan.setAttribute('style', "background-color: ".concat(bgColor, "; position: absolute; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px; color: ").concat(labelColor, "; font-size: ").concat(fontSize, ";"));
        labelSpan.innerHTML = labelInfo.formattedValue;
        this._containerElement.appendChild(labelSpan);
    };
    ChartOverlayComponent.prototype._renderAxisLabel = function (label) {
        if (!label) {
            return;
        }
        var x = label.x, y = label.y, width = label.width, height = label.height, pointValue = label.pointValue, formattedValue = label.formattedValue, fontSize = label.fontSize;
        var labelEl = AxisLabelTemplate.content.cloneNode(true);
        var labelContainer = labelEl.querySelector('.axis-label-container');
        var bgColor = 'transparent';
        labelContainer.setAttribute('style', "background-color: ".concat(bgColor, "; width: ").concat(width + 36, "px; left: ").concat(x - 30, "px; top: ").concat(y - 2, "px; font-size: ").concat(fontSize, ";"));
        this._containerElement.appendChild(labelEl);
        var labelSpan = labelContainer.querySelector('.axis-label');
        var _axisLabelColor = this._axisLabelColor;
        labelSpan.setAttribute('style', "color: ".concat(_axisLabelColor));
        labelSpan.innerHTML = formattedValue;
    };
    ;
    ChartOverlayComponent.prototype.renderAxisLabels = function (axisLabels) {
        var _this = this;
        if (axisLabels && !Array.isArray(axisLabels)) {
            this._renderAxisLabel(axisLabels);
        }
        else {
            axisLabels.forEach(function (labels) { return _this.renderAxisLabels(labels); });
        }
    };
    ChartOverlayComponent.prototype.renderAxisStackLabel = function (stackLabelInfo) {
        if (!stackLabelInfo) {
            return;
        }
        var stackLabelSpan = document.createElement('span');
        stackLabelSpan.classList.add('common-label');
        var axisLabelColor = this._axisLabelColor;
        var bgColor = 'transparent';
        var x = stackLabelInfo.x, y = stackLabelInfo.y, width = stackLabelInfo.width, height = stackLabelInfo.height, formattedValue = stackLabelInfo.formattedValue, fontSize = stackLabelInfo.fontSize;
        stackLabelSpan.setAttribute('style', "background-color: ".concat(bgColor, "; color: ").concat(axisLabelColor, "; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px; font-size: ").concat(fontSize, ";"));
        stackLabelSpan.textContent = formattedValue;
        this._containerElement.appendChild(stackLabelSpan);
    };
    ChartOverlayComponent.prototype.renderAxisStackLabels = function (axisStackLabels) {
        var _this = this;
        if (!axisStackLabels) {
            return;
        }
        if (axisStackLabels && !Array.isArray(axisStackLabels)) {
            this.renderAxisStackLabel(axisStackLabels);
        }
        else {
            axisStackLabels.forEach(function (stackLabels) {
                _this.renderAxisStackLabels(stackLabels);
            });
        }
    };
    ChartOverlayComponent.prototype.setExtensionData = function (extensionData) {
        var chartType = extensionData.chartType, isHorizontal = extensionData.isHorizontal, chartSize = extensionData.chartSize, clipPath = extensionData.clipPath, series = extensionData.series, xAxisLabels = extensionData.xAxisLabels, xAxisStackLabels = extensionData.xAxisStackLabels, yAxisLabels = extensionData.yAxisLabels, yAxisStackLabels = extensionData.yAxisStackLabels, legendContainer = extensionData.legendContainer;
        this._size = chartSize;
        this._clipPath = clipPath;
        this._series = series;
        this._xAxisLabels = xAxisLabels;
        this._yAxisLabels = yAxisLabels;
        this._xAxisStackLabels = xAxisStackLabels;
        this._yAxisStackLabels = yAxisStackLabels;
        this._chartType = chartType;
        this._isHorizontal = isHorizontal;
        this._legendContainer = legendContainer;
        this.render();
    };
    Object.defineProperty(ChartOverlayComponent.prototype, "rounded", {
        set: function (value) {
            this._rounded = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartOverlayComponent.prototype, "sizeIncrement", {
        set: function (value) {
            this._sizeIncrement = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartOverlayComponent.prototype, "axisLabelColor", {
        set: function (value) {
            this._axisLabelColor = value;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    return ChartOverlayComponent;
}(HTMLElement));
customElements.define('legend-viz-overlay', ChartOverlayComponent);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/PlotareaOverlay.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLG9CQUFvQix1QkFBdUIsd0JBQXdCLDZCQUE2QiwrQkFBK0IsZ0NBQWdDLGlDQUFpQztBQUNoUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQXFGLGtDQUFrQyw2QkFBNkIsMkJBQTJCLGlDQUFpQztBQUNoTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCx3Q0FBd0M7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRixvQ0FBb0MsdUJBQXVCLHdCQUF3Qiw2QkFBNkIsK0JBQStCLGlDQUFpQztBQUNyUTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O1VFNVRBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvLi9zcmMvUGxvdGFyZWFPdmVybGF5LnRzIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIE92ZXJsYXlDb250YWluZXJUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbk92ZXJsYXlDb250YWluZXJUZW1wbGF0ZS5pbm5lckhUTUwgPSBcIlxcbiAgICA8c3R5bGU+XFxuICAgICAgICAuY2hhcnQtb3ZlcmxheS1jb250YWluZXIge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgfVxcbiAgICAgICAgLmNoYXJ0LWxlZ2VuZC1vdmVybGF5LWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICB9XFxuICAgICAgICAuc2VyaWVzLWJhci1jb2x1bW4tY29udGFpbmVyIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIH1cXG4gICAgICAgIC5zZXJpZXMtYmFyLWNvbHVtbiB7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgfVxcbiAgICAgICAgLmF4aXMtbGFiZWwtY29udGFpbmVyIHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICBoZWlnaHQ6IDE4cHg7XFxuICAgICAgICAgICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIH1cXG4gICAgICAgIC5heGlzLWxhYmVsIHtcXG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICAgIH1cXG4gICAgICAgIC5jb21tb24tbGFiZWwge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgfVxcbiAgICA8L3N0eWxlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjaGFydC1vdmVybGF5LWNvbnRhaW5lclxcXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNoYXJ0LWxlZ2VuZC1vdmVybGF5LWNvbnRhaW5lclxcXCI+PC9kaXY+XFxuXCI7XHJcbnZhciBCYXJDb2x1bW5UZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbkJhckNvbHVtblRlbXBsYXRlLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz1cXFwic2VyaWVzLWJhci1jb2x1bW4tY29udGFpbmVyXFxcIj5cXG48L2Rpdj5cIjtcclxudmFyIEF4aXNMYWJlbFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxuQXhpc0xhYmVsVGVtcGxhdGUuaW5uZXJIVE1MID0gXCJcXG4gICAgPHNwYW4gY2xhc3M9XFxcImF4aXMtbGFiZWwtY29udGFpbmVyXFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJheGlzLWxhYmVsXFxcIj48L3NwYW4+XFxuICAgIDwvc3Bhbj5cXG5cIjtcclxuLy8gRm9yIFBvQ1xyXG52YXIgQ2hhcnRPdmVybGF5Q29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENoYXJ0T3ZlcmxheUNvbXBvbmVudCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENoYXJ0T3ZlcmxheUNvbXBvbmVudCgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9yb3VuZGVkID0gdHJ1ZTtcclxuICAgICAgICBfdGhpcy5fc2l6ZUluY3JlbWVudCA9IDA7XHJcbiAgICAgICAgX3RoaXMuX2F4aXNMYWJlbENvbG9yID0gJyMzMzMnO1xyXG4gICAgICAgIF90aGlzLnNoYWRvd1Jvb3QgPSBfdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IE92ZXJsYXlDb250YWluZXJUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBfdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2hhcnQtb3ZlcmxheS1jb250YWluZXInKTtcclxuICAgICAgICBfdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2hhcnQtbGVnZW5kLW92ZXJsYXktY29udGFpbmVyJyk7XHJcbiAgICAgICAgX3RoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHZhciBzdXBwb3J0ZWRDaGFydFR5cGVzID0gW1xyXG4gICAgICAgICAgICAnYmFyY29sdW1uJyxcclxuICAgICAgICAgICAgJ3N0YWNrZWRiYXInLFxyXG4gICAgICAgICAgICAnbGluZScsXHJcbiAgICAgICAgICAgICdhcmVhJyxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmICghc3VwcG9ydGVkQ2hhcnRUeXBlcy5pbmNsdWRlcyh0aGlzLl9jaGFydFR5cGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5fc2l6ZSwgY2hhcnRXaWR0aCA9IF9hLndpZHRoLCBjaGFydEhlaWdodCA9IF9hLmhlaWdodDtcclxuICAgICAgICB2YXIgX2IgPSB0aGlzLl9jbGlwUGF0aCwgY2xpcFBhdGhZID0gX2IueSwgY2xpcFBhdGhIZWlnaHQgPSBfYi5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJwb3NpdGlvbjogYWJzb2x1dGU7IHBvaW50ZXItZXZlbnRzOiBub25lOyBvdmVyZmxvdzogaGlkZGVuOyB3aWR0aDogXCIuY29uY2F0KGNoYXJ0V2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChjaGFydEhlaWdodCwgXCJweDsgY2xpcC1wYXRoOiBpbnNldChcIikuY29uY2F0KGNsaXBQYXRoWSwgXCJweCAwIFwiKS5jb25jYXQoY2hhcnRIZWlnaHQgLSBjbGlwUGF0aFkgLSBjbGlwUGF0aEhlaWdodCwgXCJweCAwKTtcIikpO1xyXG4gICAgICAgIGlmICh0aGlzLl9sZWdlbmRDb250YWluZXIpIHtcclxuICAgICAgICAgICAgdmFyIF9jID0gdGhpcy5fbGVnZW5kQ29udGFpbmVyLCBsZWdlbmRYID0gX2MueCwgbGVnZW5kWSA9IF9jLnksIGxlZ2VuZEhlaWdodCA9IF9jLmhlaWdodCwgbGVnZW5kV2lkdGggPSBfYy53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJwb3NpdGlvbjogYWJzb2x1dGU7IHBvaW50ZXItZXZlbnRzOiBub25lOyBvdmVyZmxvdzogaGlkZGVuOyAgICAgICAgICAgICAgICB3aWR0aDogXCIuY29uY2F0KGNoYXJ0V2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChjaGFydEhlaWdodCwgXCJweDsgICAgICAgICAgICAgICAgY2xpcC1wYXRoOiBpbnNldChcIikuY29uY2F0KGxlZ2VuZFksIFwicHggICAgICAgICAgICAgICAgICAgIFwiKS5jb25jYXQoY2hhcnRXaWR0aCAtIGxlZ2VuZFggLSBsZWdlbmRXaWR0aCwgXCJweCAgICAgICAgICAgICAgICAgICAgXCIpLmNvbmNhdChjaGFydEhlaWdodCAtIGxlZ2VuZFkgLSBsZWdlbmRIZWlnaHQsIFwicHggICAgICAgICAgICAgICAgICAgIFwiKS5jb25jYXQobGVnZW5kWCwgXCJweCk7XCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzLmZvckVhY2goZnVuY3Rpb24gKHNpbmdsZVNlcmllcywgaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2luZ2xlU2VyaWVzLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgc2hvd0FzVHJpYW5nbGU6IHNpbmdsZVNlcmllcy5zaG93QXNUcmlhbmdsZSxcclxuICAgICAgICAgICAgICAgIGlzTGFzdDogaW5kZXggPT09IDAsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckFTZXJpZXMoc2luZ2xlU2VyaWVzLCBvcHRpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlbmRlckF4aXNMYWJlbHModGhpcy5feEF4aXNMYWJlbHMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQXhpc0xhYmVscyh0aGlzLl95QXhpc0xhYmVscyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBeGlzU3RhY2tMYWJlbHModGhpcy5feEF4aXNTdGFja0xhYmVscyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBeGlzU3RhY2tMYWJlbHModGhpcy5feUF4aXNTdGFja0xhYmVscyk7XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJBU2VyaWVzID0gZnVuY3Rpb24gKHNpbmdsZVNlcmllcywgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgc2luZ2xlU2VyaWVzLmRhdGFQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoZGF0YVBvaW50KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhSW5mbyA9IGRhdGFQb2ludC5kYXRhSW5mbywgbGFiZWxJbmZvID0gZGF0YVBvaW50LmxhYmVsSW5mbztcclxuICAgICAgICAgICAgX3RoaXMucmVuZGVyRGF0YShkYXRhSW5mbywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckxhYmVsKGxhYmVsSW5mbywgb3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHNpbmdsZVNlcmllcy5sZWdlbmRJbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kKHNpbmdsZVNlcmllcy5sZWdlbmRJbmZvLCB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2luZ2xlU2VyaWVzLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgc2hvd0FzVHJpYW5nbGU6IHNpbmdsZVNlcmllcy5zaG93QXNUcmlhbmdsZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmQgPSBmdW5jdGlvbiAobGVnZW5kSW5mbywgb3B0aW9ucykge1xyXG4gICAgICAgIGlmIChsZWdlbmRJbmZvLmxhYmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kTGFiZWwobGVnZW5kSW5mby5sYWJlbCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsZWdlbmRJbmZvLnN5bWJvbCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckxlZ2VuZFN5bWJvbChsZWdlbmRJbmZvLnN5bWJvbCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsZWdlbmRJbmZvLmxpbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmRsaW5lKGxlZ2VuZEluZm8ubGluZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyTGVnZW5kTGFiZWwgPSBmdW5jdGlvbiAobGVuZ2VuZExhYmVsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHggPSBsZW5nZW5kTGFiZWwueCwgeSA9IGxlbmdlbmRMYWJlbC55LCB3aWR0aCA9IGxlbmdlbmRMYWJlbC53aWR0aCwgaGVpZ2h0ID0gbGVuZ2VuZExhYmVsLmhlaWdodCwgdGV4dFN0ciA9IGxlbmdlbmRMYWJlbC50ZXh0U3RyLCBzdHlsZXMgPSBsZW5nZW5kTGFiZWwuc3R5bGVzO1xyXG4gICAgICAgIHZhciBsYWJlbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgdmFyIGJnQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgICAgIHZhciBsYWJlbENvbG9yID0gb3B0aW9ucy5jb2xvcjtcclxuICAgICAgICBsYWJlbFNwYW4uY2xhc3NMaXN0LmFkZCgnY29tbW9uLWxhYmVsJyk7XHJcbiAgICAgICAgbGFiZWxTcGFuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImJhY2tncm91bmQtY29sb3I6IFwiLmNvbmNhdChiZ0NvbG9yLCBcIjsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IFwiKS5jb25jYXQoeSwgXCJweDsgbGVmdDogXCIpLmNvbmNhdCh4LCBcInB4OyB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDsgY29sb3I6IFwiKS5jb25jYXQobGFiZWxDb2xvciwgXCI7IGZvbnQtc2l6ZTogXCIpLmNvbmNhdChzdHlsZXMuZm9udFNpemUsIFwiO1wiKSk7XHJcbiAgICAgICAgbGFiZWxTcGFuLmlubmVySFRNTCA9IHRleHRTdHI7XHJcbiAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbFNwYW4pO1xyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyTGVnZW5kU3ltYm9sID0gZnVuY3Rpb24gKGxlbmdlbmRTeW1ib2wsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgeCA9IGxlbmdlbmRTeW1ib2wueCwgeSA9IGxlbmdlbmRTeW1ib2wueSwgd2lkdGggPSBsZW5nZW5kU3ltYm9sLndpZHRoLCBoZWlnaHQgPSBsZW5nZW5kU3ltYm9sLmhlaWdodCwgc3R5bGVzID0gbGVuZ2VuZFN5bWJvbC5zdHlsZXM7XHJcbiAgICAgICAgdmFyIHN5bWJvbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHZhciByb3VuZGVkU3R5bGUgPSAnJztcclxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3dBc1RyaWFuZ2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgd2lkdGggPSBoZWlnaHQgPSAoTWF0aC5taW4ob3JpZ2luYWxXaWR0aCwgb3JpZ2luYWxIZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogXCIuY29uY2F0KGhlaWdodCAvIDIgKyAzLCBcInB4O1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdiYXJjb2x1bW4nOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhY2tlZGJhcic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IDAgXCIuY29uY2F0KGhlaWdodCAvIDIsIFwicHggXCIpLmNvbmNhdChoZWlnaHQgLyAyLCBcInB4IDA7XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQod2lkdGggLyAyLCBcInB4IFwiKS5jb25jYXQod2lkdGggLyAyLCBcInB4IDAgMDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGluZSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdhcmVhJzpcclxuICAgICAgICAgICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdChoZWlnaHQgLyAyLCBcInB4O1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29sb3IgPSBvcHRpb25zLmNvbG9yO1xyXG4gICAgICAgIHZhciBiYWNrZ3JvdW5kU3R5bGUgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3dBc1RyaWFuZ2xlKSA/XHJcbiAgICAgICAgICAgIFwiYm9yZGVyOiBcIi5jb25jYXQoY29sb3IsIFwiIHNvbGlkIDNweDtcIikgOlxyXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IFwiLmNvbmNhdChjb2xvciwgXCI7XCIpO1xyXG4gICAgICAgIHZhciBzeW1ib2xTdHlsZSA9IHRoaXMuX3JvdW5kZWQgPyBcIlwiLmNvbmNhdChiYWNrZ3JvdW5kU3R5bGUsIFwiIFwiKS5jb25jYXQocm91bmRlZFN0eWxlKSA6IGJhY2tncm91bmRTdHlsZTtcclxuICAgICAgICBzeW1ib2xEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiXCIuY29uY2F0KHN5bWJvbFN0eWxlLCBcIiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgICAgICAgICAgICB0b3A6IFwiKS5jb25jYXQoeSwgXCJweDsgICAgICAgICAgICBsZWZ0OiBcIikuY29uY2F0KHgsIFwicHg7ICAgICAgICAgICAgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7ICAgICAgICAgICAgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDsgICAgICAgICAgICBjdXJzb3I6IFwiKS5jb25jYXQoc3R5bGVzLmN1cnNvciwgXCI7XCIpKTtcclxuICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHN5bWJvbERpdik7XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmRsaW5lID0gZnVuY3Rpb24gKGxlbmdlbmRMaW5lLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHggPSBsZW5nZW5kTGluZS54LCB5ID0gbGVuZ2VuZExpbmUueSwgd2lkdGggPSBsZW5nZW5kTGluZS53aWR0aCwgaGVpZ2h0ID0gbGVuZ2VuZExpbmUuaGVpZ2h0LCBzdHlsZXMgPSBsZW5nZW5kTGluZS5zdHlsZXM7XHJcbiAgICAgICAgdmFyIGxpbmVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsaW5lRGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImJvcmRlci1ib3R0b206IDJweCBzb2xpZCBcIi5jb25jYXQob3B0aW9ucy5jb2xvciwgXCI7ICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOyAgICAgICAgICAgIHRvcDogXCIpLmNvbmNhdCh5IC0gMSwgXCJweDsgICAgICAgICAgICBsZWZ0OiBcIikuY29uY2F0KHgsIFwicHg7ICAgICAgICAgICAgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7ICAgICAgICAgICAgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDsgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjBkZWcpO1wiKSk7XHJcbiAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsaW5lRGl2KTtcclxuICAgIH07XHJcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckRhdGEgPSBmdW5jdGlvbiAoZGF0YUluZm8sIG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoIWRhdGFJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHggPSBkYXRhSW5mby54LCB5ID0gZGF0YUluZm8ueSwgd2lkdGggPSBkYXRhSW5mby53aWR0aCwgaGVpZ2h0ID0gZGF0YUluZm8uaGVpZ2h0O1xyXG4gICAgICAgIHZhciBkYXRhRWxlbWVudCA9IEJhckNvbHVtblRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHZhciBiYXJDb2x1bW5Db250YWluZXIgPSBkYXRhRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VyaWVzLWJhci1jb2x1bW4tY29udGFpbmVyJyk7XHJcbiAgICAgICAgdmFyIGluY3JlbWVudCA9IHRoaXMuX3NpemVJbmNyZW1lbnQgLyAxMDA7XHJcbiAgICAgICAgdmFyIHJvdW5kZWRTdHlsZSA9ICcnO1xyXG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2hvd0FzVHJpYW5nbGUpIHtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB3aWR0aCA9IGhlaWdodCA9IChNYXRoLm1pbihvcmlnaW5hbFdpZHRoLCBvcmlnaW5hbEhlaWdodCkgLyAyKSAqICgxICsgaW5jcmVtZW50KTtcclxuICAgICAgICAgICAgeCA9IHdpZHRoID09PSBvcmlnaW5hbFdpZHRoID8geCA6IHggKyAob3JpZ2luYWxXaWR0aCAtIHdpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIHkgPSBoZWlnaHQgPT09IG9yaWdpbmFsSGVpZ2h0ID8geSA6IHkgKyAob3JpZ2luYWxIZWlnaHQgLSBoZWlnaHQpIC8gMjtcclxuICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQoaGVpZ2h0IC8gMiArIDMsIFwicHg7XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9jaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JhcmNvbHVtbic6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFja2VkYmFyJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCAqICgxICsgaW5jcmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHkgLSBoZWlnaHQgKiBpbmNyZW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hhcnRUeXBlID09PSAnc3RhY2tlZGJhcicgJiYgIW9wdGlvbnMuaXNMYXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IDAgXCIuY29uY2F0KGhlaWdodCAvIDIsIFwicHggXCIpLmNvbmNhdChoZWlnaHQgLyAyLCBcInB4IDA7XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB3aWR0aCAqICgxICsgaW5jcmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHggLSB3aWR0aCAqIGluY3JlbWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGFydFR5cGUgPT09ICdzdGFja2VkYmFyJyAmJiAhb3B0aW9ucy5pc0xhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogXCIuY29uY2F0KHdpZHRoIC8gMiwgXCJweCBcIikuY29uY2F0KHdpZHRoIC8gMiwgXCJweCAwIDA7XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xpbmUnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXJlYSc6XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB3aWR0aCAqICgxICsgaW5jcmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgKiAoMSArIGluY3JlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IHggLSB3aWR0aCAqIGluY3JlbWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IHkgLSBoZWlnaHQgKiBpbmNyZW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogXCIuY29uY2F0KGhlaWdodCAvIDIsIFwicHg7XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb2xvciA9IGRhdGFJbmZvLmNvbG9yIHx8IG9wdGlvbnMuY29sb3I7XHJcbiAgICAgICAgdmFyIGJhY2tncm91bmRTdHlsZSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2hvd0FzVHJpYW5nbGUpID9cclxuICAgICAgICAgICAgXCJib3JkZXI6IFwiLmNvbmNhdChjb2xvciwgXCIgc29saWQgM3B4O1wiKSA6XHJcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGNvbG9yLCBcIjtcIik7XHJcbiAgICAgICAgdmFyIGJhclN0eWxlID0gdGhpcy5fcm91bmRlZCA/IFwiXCIuY29uY2F0KGJhY2tncm91bmRTdHlsZSwgXCIgXCIpLmNvbmNhdChyb3VuZGVkU3R5bGUpIDogYmFja2dyb3VuZFN0eWxlO1xyXG4gICAgICAgIGJhckNvbHVtbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJcIi5jb25jYXQoYmFyU3R5bGUsIFwiIHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiBcIikuY29uY2F0KHksIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7XCIpLmNvbmNhdChkYXRhSW5mby5vcGFjaXR5ICE9PSB1bmRlZmluZWQgPyBcIm9wYWNpdHk6IFwiLmNvbmNhdChkYXRhSW5mby5vcGFjaXR5LCBcIjtcIikgOiAnJykpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZGF0YUVsZW1lbnQpO1xyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyTGFiZWwgPSBmdW5jdGlvbiAobGFiZWxJbmZvLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIWxhYmVsSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxhYmVsSW5mbykpIHtcclxuICAgICAgICAgICAgbGFiZWxJbmZvLmZvckVhY2goZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJMYWJlbChsYWJlbCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB4ID0gbGFiZWxJbmZvLngsIHkgPSBsYWJlbEluZm8ueSwgd2lkdGggPSBsYWJlbEluZm8ud2lkdGgsIGhlaWdodCA9IGxhYmVsSW5mby5oZWlnaHQsIHZhcmlhbmNlTGFiZWxUeXBlID0gbGFiZWxJbmZvLnZhcmlhbmNlTGFiZWxUeXBlLCBjb2xvciA9IGxhYmVsSW5mby5jb2xvciwgZm9udFNpemUgPSBsYWJlbEluZm8uZm9udFNpemU7XHJcbiAgICAgICAgdmFyIGxhYmVsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB2YXIgYmdDb2xvciA9ICd0cmFuc3BhcmVudCc7XHJcbiAgICAgICAgdmFyIGxhYmVsQ29sb3IgPSB0aGlzLl9jaGFydFR5cGUuc3RhcnRzV2l0aCgnc3RhY2tlZCcpID8gJyM2NjYnIDogb3B0aW9ucy5jb2xvcjtcclxuICAgICAgICBpZiAodmFyaWFuY2VMYWJlbFR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsYWJlbENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhYmVsU3Bhbi5jbGFzc0xpc3QuYWRkKCdjb21tb24tbGFiZWwnKTtcclxuICAgICAgICBsYWJlbFNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGJnQ29sb3IsIFwiOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogXCIpLmNvbmNhdCh5LCBcInB4OyBsZWZ0OiBcIikuY29uY2F0KHgsIFwicHg7IHdpZHRoOiBcIikuY29uY2F0KHdpZHRoLCBcInB4OyBoZWlnaHQ6IFwiKS5jb25jYXQoaGVpZ2h0LCBcInB4OyBjb2xvcjogXCIpLmNvbmNhdChsYWJlbENvbG9yLCBcIjsgZm9udC1zaXplOiBcIikuY29uY2F0KGZvbnRTaXplLCBcIjtcIikpO1xyXG4gICAgICAgIGxhYmVsU3Bhbi5pbm5lckhUTUwgPSBsYWJlbEluZm8uZm9ybWF0dGVkVmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbFNwYW4pO1xyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUuX3JlbmRlckF4aXNMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIGlmICghbGFiZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgeCA9IGxhYmVsLngsIHkgPSBsYWJlbC55LCB3aWR0aCA9IGxhYmVsLndpZHRoLCBoZWlnaHQgPSBsYWJlbC5oZWlnaHQsIHBvaW50VmFsdWUgPSBsYWJlbC5wb2ludFZhbHVlLCBmb3JtYXR0ZWRWYWx1ZSA9IGxhYmVsLmZvcm1hdHRlZFZhbHVlLCBmb250U2l6ZSA9IGxhYmVsLmZvbnRTaXplO1xyXG4gICAgICAgIHZhciBsYWJlbEVsID0gQXhpc0xhYmVsVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgdmFyIGxhYmVsQ29udGFpbmVyID0gbGFiZWxFbC5xdWVyeVNlbGVjdG9yKCcuYXhpcy1sYWJlbC1jb250YWluZXInKTtcclxuICAgICAgICB2YXIgYmdDb2xvciA9ICd0cmFuc3BhcmVudCc7XHJcbiAgICAgICAgbGFiZWxDb250YWluZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGJnQ29sb3IsIFwiOyB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCArIDM2LCBcInB4OyBsZWZ0OiBcIikuY29uY2F0KHggLSAzMCwgXCJweDsgdG9wOiBcIikuY29uY2F0KHkgLSAyLCBcInB4OyBmb250LXNpemU6IFwiKS5jb25jYXQoZm9udFNpemUsIFwiO1wiKSk7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsKTtcclxuICAgICAgICB2YXIgbGFiZWxTcGFuID0gbGFiZWxDb250YWluZXIucXVlcnlTZWxlY3RvcignLmF4aXMtbGFiZWwnKTtcclxuICAgICAgICB2YXIgX2F4aXNMYWJlbENvbG9yID0gdGhpcy5fYXhpc0xhYmVsQ29sb3I7XHJcbiAgICAgICAgbGFiZWxTcGFuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImNvbG9yOiBcIi5jb25jYXQoX2F4aXNMYWJlbENvbG9yKSk7XHJcbiAgICAgICAgbGFiZWxTcGFuLmlubmVySFRNTCA9IGZvcm1hdHRlZFZhbHVlO1xyXG4gICAgfTtcclxuICAgIDtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQXhpc0xhYmVscyA9IGZ1bmN0aW9uIChheGlzTGFiZWxzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoYXhpc0xhYmVscyAmJiAhQXJyYXkuaXNBcnJheShheGlzTGFiZWxzKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJBeGlzTGFiZWwoYXhpc0xhYmVscyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBheGlzTGFiZWxzLmZvckVhY2goZnVuY3Rpb24gKGxhYmVscykgeyByZXR1cm4gX3RoaXMucmVuZGVyQXhpc0xhYmVscyhsYWJlbHMpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJBeGlzU3RhY2tMYWJlbCA9IGZ1bmN0aW9uIChzdGFja0xhYmVsSW5mbykge1xyXG4gICAgICAgIGlmICghc3RhY2tMYWJlbEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhY2tMYWJlbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgc3RhY2tMYWJlbFNwYW4uY2xhc3NMaXN0LmFkZCgnY29tbW9uLWxhYmVsJyk7XHJcbiAgICAgICAgdmFyIGF4aXNMYWJlbENvbG9yID0gdGhpcy5fYXhpc0xhYmVsQ29sb3I7XHJcbiAgICAgICAgdmFyIGJnQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgICAgIHZhciB4ID0gc3RhY2tMYWJlbEluZm8ueCwgeSA9IHN0YWNrTGFiZWxJbmZvLnksIHdpZHRoID0gc3RhY2tMYWJlbEluZm8ud2lkdGgsIGhlaWdodCA9IHN0YWNrTGFiZWxJbmZvLmhlaWdodCwgZm9ybWF0dGVkVmFsdWUgPSBzdGFja0xhYmVsSW5mby5mb3JtYXR0ZWRWYWx1ZSwgZm9udFNpemUgPSBzdGFja0xhYmVsSW5mby5mb250U2l6ZTtcclxuICAgICAgICBzdGFja0xhYmVsU3Bhbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoYmdDb2xvciwgXCI7IGNvbG9yOiBcIikuY29uY2F0KGF4aXNMYWJlbENvbG9yLCBcIjsgdG9wOiBcIikuY29uY2F0KHksIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7IGZvbnQtc2l6ZTogXCIpLmNvbmNhdChmb250U2l6ZSwgXCI7XCIpKTtcclxuICAgICAgICBzdGFja0xhYmVsU3Bhbi50ZXh0Q29udGVudCA9IGZvcm1hdHRlZFZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoc3RhY2tMYWJlbFNwYW4pO1xyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQXhpc1N0YWNrTGFiZWxzID0gZnVuY3Rpb24gKGF4aXNTdGFja0xhYmVscykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFheGlzU3RhY2tMYWJlbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXhpc1N0YWNrTGFiZWxzICYmICFBcnJheS5pc0FycmF5KGF4aXNTdGFja0xhYmVscykpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJBeGlzU3RhY2tMYWJlbChheGlzU3RhY2tMYWJlbHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXhpc1N0YWNrTGFiZWxzLmZvckVhY2goZnVuY3Rpb24gKHN0YWNrTGFiZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJBeGlzU3RhY2tMYWJlbHMoc3RhY2tMYWJlbHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5zZXRFeHRlbnNpb25EYXRhID0gZnVuY3Rpb24gKGV4dGVuc2lvbkRhdGEpIHtcclxuICAgICAgICB2YXIgY2hhcnRUeXBlID0gZXh0ZW5zaW9uRGF0YS5jaGFydFR5cGUsIGlzSG9yaXpvbnRhbCA9IGV4dGVuc2lvbkRhdGEuaXNIb3Jpem9udGFsLCBjaGFydFNpemUgPSBleHRlbnNpb25EYXRhLmNoYXJ0U2l6ZSwgY2xpcFBhdGggPSBleHRlbnNpb25EYXRhLmNsaXBQYXRoLCBzZXJpZXMgPSBleHRlbnNpb25EYXRhLnNlcmllcywgeEF4aXNMYWJlbHMgPSBleHRlbnNpb25EYXRhLnhBeGlzTGFiZWxzLCB4QXhpc1N0YWNrTGFiZWxzID0gZXh0ZW5zaW9uRGF0YS54QXhpc1N0YWNrTGFiZWxzLCB5QXhpc0xhYmVscyA9IGV4dGVuc2lvbkRhdGEueUF4aXNMYWJlbHMsIHlBeGlzU3RhY2tMYWJlbHMgPSBleHRlbnNpb25EYXRhLnlBeGlzU3RhY2tMYWJlbHMsIGxlZ2VuZENvbnRhaW5lciA9IGV4dGVuc2lvbkRhdGEubGVnZW5kQ29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBjaGFydFNpemU7XHJcbiAgICAgICAgdGhpcy5fY2xpcFBhdGggPSBjbGlwUGF0aDtcclxuICAgICAgICB0aGlzLl9zZXJpZXMgPSBzZXJpZXM7XHJcbiAgICAgICAgdGhpcy5feEF4aXNMYWJlbHMgPSB4QXhpc0xhYmVscztcclxuICAgICAgICB0aGlzLl95QXhpc0xhYmVscyA9IHlBeGlzTGFiZWxzO1xyXG4gICAgICAgIHRoaXMuX3hBeGlzU3RhY2tMYWJlbHMgPSB4QXhpc1N0YWNrTGFiZWxzO1xyXG4gICAgICAgIHRoaXMuX3lBeGlzU3RhY2tMYWJlbHMgPSB5QXhpc1N0YWNrTGFiZWxzO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0VHlwZSA9IGNoYXJ0VHlwZTtcclxuICAgICAgICB0aGlzLl9pc0hvcml6b250YWwgPSBpc0hvcml6b250YWw7XHJcbiAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyID0gbGVnZW5kQ29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUsIFwicm91bmRlZFwiLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcm91bmRlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLCBcInNpemVJbmNyZW1lbnRcIiwge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpemVJbmNyZW1lbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZSwgXCJheGlzTGFiZWxDb2xvclwiLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXhpc0xhYmVsQ29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gQ2hhcnRPdmVybGF5Q29tcG9uZW50O1xyXG59KEhUTUxFbGVtZW50KSk7XHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbGVnZW5kLXZpei1vdmVybGF5JywgQ2hhcnRPdmVybGF5Q29tcG9uZW50KTtcclxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9QbG90YXJlYU92ZXJsYXkudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==