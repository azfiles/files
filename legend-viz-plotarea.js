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
        var _c = this._legendContainer, legendX = _c.x, legendY = _c.y, legendHeight = _c.height, legendWidth = _c.width;
        this._legendContainerElement.setAttribute('style', "position: absolute; pointer-events: none; overflow: hidden;            width: ".concat(chartWidth, "px; height: ").concat(chartHeight, "px;            clip-path: inset(").concat(legendY, "px                ").concat(chartWidth - legendX - legendWidth, "px                ").concat(chartHeight - legendY - legendHeight, "px                ").concat(legendX, "px);"));
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
        this.renderLegend(singleSeries.legendInfo, {
            color: singleSeries.color,
            showAsTriangle: singleSeries.showAsTriangle
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRixvQkFBb0IsdUJBQXVCLHdCQUF3Qiw2QkFBNkIsK0JBQStCLGdDQUFnQyxpQ0FBaUM7QUFDaFI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRixrQ0FBa0MsNkJBQTZCLDJCQUEyQixpQ0FBaUM7QUFDaE47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsd0NBQXdDO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRkFBcUYsb0NBQW9DLHVCQUF1Qix3QkFBd0IsNkJBQTZCLCtCQUErQixpQ0FBaUM7QUFDclE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztVRXhUQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzLy4vc3JjL1Bsb3RhcmVhT3ZlcmxheS50cyIsIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbnZhciBPdmVybGF5Q29udGFpbmVyVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xyXG5PdmVybGF5Q29udGFpbmVyVGVtcGxhdGUuaW5uZXJIVE1MID0gXCJcXG4gICAgPHN0eWxlPlxcbiAgICAgICAgLmNoYXJ0LW92ZXJsYXktY29udGFpbmVyIHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIH1cXG4gICAgICAgIC5jaGFydC1sZWdlbmQtb3ZlcmxheS1jb250YWluZXIge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgfVxcbiAgICAgICAgLnNlcmllcy1iYXItY29sdW1uLWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB9XFxuICAgICAgICAuc2VyaWVzLWJhci1jb2x1bW4ge1xcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgIH1cXG4gICAgICAgIC5heGlzLWxhYmVsLWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgICAgaGVpZ2h0OiAxOHB4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB9XFxuICAgICAgICAuYXhpcy1sYWJlbCB7XFxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgICB9XFxuICAgICAgICAuY29tbW9uLWxhYmVsIHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAgIH1cXG4gICAgPC9zdHlsZT5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY2hhcnQtb3ZlcmxheS1jb250YWluZXJcXFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjaGFydC1sZWdlbmQtb3ZlcmxheS1jb250YWluZXJcXFwiPjwvZGl2PlxcblwiO1xyXG52YXIgQmFyQ29sdW1uVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xyXG5CYXJDb2x1bW5UZW1wbGF0ZS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9XFxcInNlcmllcy1iYXItY29sdW1uLWNvbnRhaW5lclxcXCI+XFxuPC9kaXY+XCI7XHJcbnZhciBBeGlzTGFiZWxUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbkF4aXNMYWJlbFRlbXBsYXRlLmlubmVySFRNTCA9IFwiXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJheGlzLWxhYmVsLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYXhpcy1sYWJlbFxcXCI+PC9zcGFuPlxcbiAgICA8L3NwYW4+XFxuXCI7XHJcbi8vIEZvciBQb0NcclxudmFyIENoYXJ0T3ZlcmxheUNvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDaGFydE92ZXJsYXlDb21wb25lbnQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDaGFydE92ZXJsYXlDb21wb25lbnQoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fcm91bmRlZCA9IHRydWU7XHJcbiAgICAgICAgX3RoaXMuX3NpemVJbmNyZW1lbnQgPSAwO1xyXG4gICAgICAgIF90aGlzLl9heGlzTGFiZWxDb2xvciA9ICcjMzMzJztcclxuICAgICAgICBfdGhpcy5zaGFkb3dSb290ID0gX3RoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBPdmVybGF5Q29udGFpbmVyVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgX3RoaXMuX2NvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNoYXJ0LW92ZXJsYXktY29udGFpbmVyJyk7XHJcbiAgICAgICAgX3RoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNoYXJ0LWxlZ2VuZC1vdmVybGF5LWNvbnRhaW5lcicpO1xyXG4gICAgICAgIF90aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB2YXIgc3VwcG9ydGVkQ2hhcnRUeXBlcyA9IFtcclxuICAgICAgICAgICAgJ2JhcmNvbHVtbicsXHJcbiAgICAgICAgICAgICdzdGFja2VkYmFyJyxcclxuICAgICAgICAgICAgJ2xpbmUnLFxyXG4gICAgICAgICAgICAnYXJlYScsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAoIXN1cHBvcnRlZENoYXJ0VHlwZXMuaW5jbHVkZXModGhpcy5fY2hhcnRUeXBlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfYSA9IHRoaXMuX3NpemUsIGNoYXJ0V2lkdGggPSBfYS53aWR0aCwgY2hhcnRIZWlnaHQgPSBfYS5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIF9iID0gdGhpcy5fY2xpcFBhdGgsIGNsaXBQYXRoWSA9IF9iLnksIGNsaXBQYXRoSGVpZ2h0ID0gX2IuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwicG9zaXRpb246IGFic29sdXRlOyBwb2ludGVyLWV2ZW50czogbm9uZTsgb3ZlcmZsb3c6IGhpZGRlbjsgd2lkdGg6IFwiLmNvbmNhdChjaGFydFdpZHRoLCBcInB4OyBoZWlnaHQ6IFwiKS5jb25jYXQoY2hhcnRIZWlnaHQsIFwicHg7IGNsaXAtcGF0aDogaW5zZXQoXCIpLmNvbmNhdChjbGlwUGF0aFksIFwicHggMCBcIikuY29uY2F0KGNoYXJ0SGVpZ2h0IC0gY2xpcFBhdGhZIC0gY2xpcFBhdGhIZWlnaHQsIFwicHggMCk7XCIpKTtcclxuICAgICAgICB2YXIgX2MgPSB0aGlzLl9sZWdlbmRDb250YWluZXIsIGxlZ2VuZFggPSBfYy54LCBsZWdlbmRZID0gX2MueSwgbGVnZW5kSGVpZ2h0ID0gX2MuaGVpZ2h0LCBsZWdlbmRXaWR0aCA9IF9jLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwicG9zaXRpb246IGFic29sdXRlOyBwb2ludGVyLWV2ZW50czogbm9uZTsgb3ZlcmZsb3c6IGhpZGRlbjsgICAgICAgICAgICB3aWR0aDogXCIuY29uY2F0KGNoYXJ0V2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChjaGFydEhlaWdodCwgXCJweDsgICAgICAgICAgICBjbGlwLXBhdGg6IGluc2V0KFwiKS5jb25jYXQobGVnZW5kWSwgXCJweCAgICAgICAgICAgICAgICBcIikuY29uY2F0KGNoYXJ0V2lkdGggLSBsZWdlbmRYIC0gbGVnZW5kV2lkdGgsIFwicHggICAgICAgICAgICAgICAgXCIpLmNvbmNhdChjaGFydEhlaWdodCAtIGxlZ2VuZFkgLSBsZWdlbmRIZWlnaHQsIFwicHggICAgICAgICAgICAgICAgXCIpLmNvbmNhdChsZWdlbmRYLCBcInB4KTtcIikpO1xyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChzaW5nbGVTZXJpZXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHNpbmdsZVNlcmllcy5jb2xvcixcclxuICAgICAgICAgICAgICAgIHNob3dBc1RyaWFuZ2xlOiBzaW5nbGVTZXJpZXMuc2hvd0FzVHJpYW5nbGUsXHJcbiAgICAgICAgICAgICAgICBpc0xhc3Q6IGluZGV4ID09PSAwLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJBU2VyaWVzKHNpbmdsZVNlcmllcywgb3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBeGlzTGFiZWxzKHRoaXMuX3hBeGlzTGFiZWxzKTtcclxuICAgICAgICB0aGlzLnJlbmRlckF4aXNMYWJlbHModGhpcy5feUF4aXNMYWJlbHMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWxzKHRoaXMuX3hBeGlzU3RhY2tMYWJlbHMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWxzKHRoaXMuX3lBeGlzU3RhY2tMYWJlbHMpO1xyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQVNlcmllcyA9IGZ1bmN0aW9uIChzaW5nbGVTZXJpZXMsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHNpbmdsZVNlcmllcy5kYXRhUG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKGRhdGFQb2ludCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YUluZm8gPSBkYXRhUG9pbnQuZGF0YUluZm8sIGxhYmVsSW5mbyA9IGRhdGFQb2ludC5sYWJlbEluZm87XHJcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckRhdGEoZGF0YUluZm8sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJMYWJlbChsYWJlbEluZm8sIG9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVuZGVyTGVnZW5kKHNpbmdsZVNlcmllcy5sZWdlbmRJbmZvLCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBzaW5nbGVTZXJpZXMuY29sb3IsXHJcbiAgICAgICAgICAgIHNob3dBc1RyaWFuZ2xlOiBzaW5nbGVTZXJpZXMuc2hvd0FzVHJpYW5nbGVcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckxlZ2VuZCA9IGZ1bmN0aW9uIChsZWdlbmRJbmZvLCBvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKGxlZ2VuZEluZm8ubGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmRMYWJlbChsZWdlbmRJbmZvLmxhYmVsLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlZ2VuZEluZm8uc3ltYm9sKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kU3ltYm9sKGxlZ2VuZEluZm8uc3ltYm9sLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlZ2VuZEluZm8ubGluZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckxlZ2VuZGxpbmUobGVnZW5kSW5mby5saW5lLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmRMYWJlbCA9IGZ1bmN0aW9uIChsZW5nZW5kTGFiZWwsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgeCA9IGxlbmdlbmRMYWJlbC54LCB5ID0gbGVuZ2VuZExhYmVsLnksIHdpZHRoID0gbGVuZ2VuZExhYmVsLndpZHRoLCBoZWlnaHQgPSBsZW5nZW5kTGFiZWwuaGVpZ2h0LCB0ZXh0U3RyID0gbGVuZ2VuZExhYmVsLnRleHRTdHIsIHN0eWxlcyA9IGxlbmdlbmRMYWJlbC5zdHlsZXM7XHJcbiAgICAgICAgdmFyIGxhYmVsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB2YXIgYmdDb2xvciA9ICd0cmFuc3BhcmVudCc7XHJcbiAgICAgICAgdmFyIGxhYmVsQ29sb3IgPSBvcHRpb25zLmNvbG9yO1xyXG4gICAgICAgIGxhYmVsU3Bhbi5jbGFzc0xpc3QuYWRkKCdjb21tb24tbGFiZWwnKTtcclxuICAgICAgICBsYWJlbFNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGJnQ29sb3IsIFwiOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogXCIpLmNvbmNhdCh5LCBcInB4OyBsZWZ0OiBcIikuY29uY2F0KHgsIFwicHg7IHdpZHRoOiBcIikuY29uY2F0KHdpZHRoLCBcInB4OyBoZWlnaHQ6IFwiKS5jb25jYXQoaGVpZ2h0LCBcInB4OyBjb2xvcjogXCIpLmNvbmNhdChsYWJlbENvbG9yLCBcIjsgZm9udC1zaXplOiBcIikuY29uY2F0KHN0eWxlcy5mb250U2l6ZSwgXCI7XCIpKTtcclxuICAgICAgICBsYWJlbFNwYW4uaW5uZXJIVE1MID0gdGV4dFN0cjtcclxuICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsU3Bhbik7XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmRTeW1ib2wgPSBmdW5jdGlvbiAobGVuZ2VuZFN5bWJvbCwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciB4ID0gbGVuZ2VuZFN5bWJvbC54LCB5ID0gbGVuZ2VuZFN5bWJvbC55LCB3aWR0aCA9IGxlbmdlbmRTeW1ib2wud2lkdGgsIGhlaWdodCA9IGxlbmdlbmRTeW1ib2wuaGVpZ2h0LCBzdHlsZXMgPSBsZW5nZW5kU3ltYm9sLnN0eWxlcztcclxuICAgICAgICB2YXIgc3ltYm9sRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdmFyIHJvdW5kZWRTdHlsZSA9ICcnO1xyXG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2hvd0FzVHJpYW5nbGUpIHtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB3aWR0aCA9IGhlaWdodCA9IChNYXRoLm1pbihvcmlnaW5hbFdpZHRoLCBvcmlnaW5hbEhlaWdodCkgLyAyKTtcclxuICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQoaGVpZ2h0IC8gMiArIDMsIFwicHg7XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9jaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JhcmNvbHVtbic6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFja2VkYmFyJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogMCBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweCBcIikuY29uY2F0KGhlaWdodCAvIDIsIFwicHggMDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdCh3aWR0aCAvIDIsIFwicHggXCIpLmNvbmNhdCh3aWR0aCAvIDIsIFwicHggMCAwO1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5lJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2FyZWEnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogXCIuY29uY2F0KGhlaWdodCAvIDIsIFwicHg7XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb2xvciA9IG9wdGlvbnMuY29sb3I7XHJcbiAgICAgICAgdmFyIGJhY2tncm91bmRTdHlsZSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2hvd0FzVHJpYW5nbGUpID9cclxuICAgICAgICAgICAgXCJib3JkZXI6IFwiLmNvbmNhdChjb2xvciwgXCIgc29saWQgM3B4O1wiKSA6XHJcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGNvbG9yLCBcIjtcIik7XHJcbiAgICAgICAgdmFyIHN5bWJvbFN0eWxlID0gdGhpcy5fcm91bmRlZCA/IFwiXCIuY29uY2F0KGJhY2tncm91bmRTdHlsZSwgXCIgXCIpLmNvbmNhdChyb3VuZGVkU3R5bGUpIDogYmFja2dyb3VuZFN0eWxlO1xyXG4gICAgICAgIHN5bWJvbERpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJcIi5jb25jYXQoc3ltYm9sU3R5bGUsIFwiICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOyAgICAgICAgICAgIHRvcDogXCIpLmNvbmNhdCh5LCBcInB4OyAgICAgICAgICAgIGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgICAgICAgICAgICB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgICAgICAgICAgICBoZWlnaHQ6IFwiKS5jb25jYXQoaGVpZ2h0LCBcInB4OyAgICAgICAgICAgIGN1cnNvcjogXCIpLmNvbmNhdChzdHlsZXMuY3Vyc29yLCBcIjtcIikpO1xyXG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoc3ltYm9sRGl2KTtcclxuICAgIH07XHJcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckxlZ2VuZGxpbmUgPSBmdW5jdGlvbiAobGVuZ2VuZExpbmUsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgeCA9IGxlbmdlbmRMaW5lLngsIHkgPSBsZW5nZW5kTGluZS55LCB3aWR0aCA9IGxlbmdlbmRMaW5lLndpZHRoLCBoZWlnaHQgPSBsZW5nZW5kTGluZS5oZWlnaHQsIHN0eWxlcyA9IGxlbmdlbmRMaW5lLnN0eWxlcztcclxuICAgICAgICB2YXIgbGluZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxpbmVEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIFwiLmNvbmNhdChvcHRpb25zLmNvbG9yLCBcIjsgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7ICAgICAgICAgICAgdG9wOiBcIikuY29uY2F0KHkgLSAxLCBcInB4OyAgICAgICAgICAgIGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgICAgICAgICAgICB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgICAgICAgICAgICBoZWlnaHQ6IFwiKS5jb25jYXQoaGVpZ2h0LCBcInB4OyAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yMGRlZyk7XCIpKTtcclxuICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGxpbmVEaXYpO1xyXG4gICAgfTtcclxuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhSW5mbywgb3B0aW9ucykge1xyXG4gICAgICAgIGlmICghZGF0YUluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgeCA9IGRhdGFJbmZvLngsIHkgPSBkYXRhSW5mby55LCB3aWR0aCA9IGRhdGFJbmZvLndpZHRoLCBoZWlnaHQgPSBkYXRhSW5mby5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIGRhdGFFbGVtZW50ID0gQmFyQ29sdW1uVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgdmFyIGJhckNvbHVtbkNvbnRhaW5lciA9IGRhdGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXJpZXMtYmFyLWNvbHVtbi1jb250YWluZXInKTtcclxuICAgICAgICB2YXIgaW5jcmVtZW50ID0gdGhpcy5fc2l6ZUluY3JlbWVudCAvIDEwMDtcclxuICAgICAgICB2YXIgcm91bmRlZFN0eWxlID0gJyc7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG93QXNUcmlhbmdsZSkge1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ID0gKE1hdGgubWluKG9yaWdpbmFsV2lkdGgsIG9yaWdpbmFsSGVpZ2h0KSAvIDIpICogKDEgKyBpbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICB4ID0gd2lkdGggPT09IG9yaWdpbmFsV2lkdGggPyB4IDogeCArIChvcmlnaW5hbFdpZHRoIC0gd2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgeSA9IGhlaWdodCA9PT0gb3JpZ2luYWxIZWlnaHQgPyB5IDogeSArIChvcmlnaW5hbEhlaWdodCAtIGhlaWdodCkgLyAyO1xyXG4gICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdChoZWlnaHQgLyAyICsgMywgXCJweDtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2NoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYmFyY29sdW1uJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YWNrZWRiYXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0hvcml6b250YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0ICogKDEgKyBpbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0geSAtIGhlaWdodCAqIGluY3JlbWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGFydFR5cGUgPT09ICdzdGFja2VkYmFyJyAmJiAhb3B0aW9ucy5pc0xhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogMCBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweCBcIikuY29uY2F0KGhlaWdodCAvIDIsIFwicHggMDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoICogKDEgKyBpbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0geCAtIHdpZHRoICogaW5jcmVtZW50IC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJ0VHlwZSA9PT0gJ3N0YWNrZWRiYXInICYmICFvcHRpb25zLmlzTGFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQod2lkdGggLyAyLCBcInB4IFwiKS5jb25jYXQod2lkdGggLyAyLCBcInB4IDAgMDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGluZSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdhcmVhJzpcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoICogKDEgKyBpbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCAqICgxICsgaW5jcmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB4ID0geCAtIHdpZHRoICogaW5jcmVtZW50IC8gMjtcclxuICAgICAgICAgICAgICAgICAgICB5ID0geSAtIGhlaWdodCAqIGluY3JlbWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbG9yID0gZGF0YUluZm8uY29sb3IgfHwgb3B0aW9ucy5jb2xvcjtcclxuICAgICAgICB2YXIgYmFja2dyb3VuZFN0eWxlID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG93QXNUcmlhbmdsZSkgP1xyXG4gICAgICAgICAgICBcImJvcmRlcjogXCIuY29uY2F0KGNvbG9yLCBcIiBzb2xpZCAzcHg7XCIpIDpcclxuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoY29sb3IsIFwiO1wiKTtcclxuICAgICAgICB2YXIgYmFyU3R5bGUgPSB0aGlzLl9yb3VuZGVkID8gXCJcIi5jb25jYXQoYmFja2dyb3VuZFN0eWxlLCBcIiBcIikuY29uY2F0KHJvdW5kZWRTdHlsZSkgOiBiYWNrZ3JvdW5kU3R5bGU7XHJcbiAgICAgICAgYmFyQ29sdW1uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcIlwiLmNvbmNhdChiYXJTdHlsZSwgXCIgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IFwiKS5jb25jYXQoeSwgXCJweDsgbGVmdDogXCIpLmNvbmNhdCh4LCBcInB4OyB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDtcIikuY29uY2F0KGRhdGFJbmZvLm9wYWNpdHkgIT09IHVuZGVmaW5lZCA/IFwib3BhY2l0eTogXCIuY29uY2F0KGRhdGFJbmZvLm9wYWNpdHksIFwiO1wiKSA6ICcnKSk7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChkYXRhRWxlbWVudCk7XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbEluZm8sIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghbGFiZWxJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGFiZWxJbmZvKSkge1xyXG4gICAgICAgICAgICBsYWJlbEluZm8uZm9yRWFjaChmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlbmRlckxhYmVsKGxhYmVsLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHggPSBsYWJlbEluZm8ueCwgeSA9IGxhYmVsSW5mby55LCB3aWR0aCA9IGxhYmVsSW5mby53aWR0aCwgaGVpZ2h0ID0gbGFiZWxJbmZvLmhlaWdodCwgdmFyaWFuY2VMYWJlbFR5cGUgPSBsYWJlbEluZm8udmFyaWFuY2VMYWJlbFR5cGUsIGNvbG9yID0gbGFiZWxJbmZvLmNvbG9yLCBmb250U2l6ZSA9IGxhYmVsSW5mby5mb250U2l6ZTtcclxuICAgICAgICB2YXIgbGFiZWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHZhciBiZ0NvbG9yID0gJ3RyYW5zcGFyZW50JztcclxuICAgICAgICB2YXIgbGFiZWxDb2xvciA9IHRoaXMuX2NoYXJ0VHlwZS5zdGFydHNXaXRoKCdzdGFja2VkJykgPyAnIzY2NicgOiBvcHRpb25zLmNvbG9yO1xyXG4gICAgICAgIGlmICh2YXJpYW5jZUxhYmVsVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxhYmVsQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFiZWxTcGFuLmNsYXNzTGlzdC5hZGQoJ2NvbW1vbi1sYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsU3Bhbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoYmdDb2xvciwgXCI7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiBcIikuY29uY2F0KHksIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7IGNvbG9yOiBcIikuY29uY2F0KGxhYmVsQ29sb3IsIFwiOyBmb250LXNpemU6IFwiKS5jb25jYXQoZm9udFNpemUsIFwiO1wiKSk7XHJcbiAgICAgICAgbGFiZWxTcGFuLmlubmVySFRNTCA9IGxhYmVsSW5mby5mb3JtYXR0ZWRWYWx1ZTtcclxuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsU3Bhbik7XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyQXhpc0xhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgaWYgKCFsYWJlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB4ID0gbGFiZWwueCwgeSA9IGxhYmVsLnksIHdpZHRoID0gbGFiZWwud2lkdGgsIGhlaWdodCA9IGxhYmVsLmhlaWdodCwgcG9pbnRWYWx1ZSA9IGxhYmVsLnBvaW50VmFsdWUsIGZvcm1hdHRlZFZhbHVlID0gbGFiZWwuZm9ybWF0dGVkVmFsdWUsIGZvbnRTaXplID0gbGFiZWwuZm9udFNpemU7XHJcbiAgICAgICAgdmFyIGxhYmVsRWwgPSBBeGlzTGFiZWxUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICB2YXIgbGFiZWxDb250YWluZXIgPSBsYWJlbEVsLnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWxhYmVsLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIHZhciBiZ0NvbG9yID0gJ3RyYW5zcGFyZW50JztcclxuICAgICAgICBsYWJlbENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoYmdDb2xvciwgXCI7IHdpZHRoOiBcIikuY29uY2F0KHdpZHRoICsgMzYsIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCAtIDMwLCBcInB4OyB0b3A6IFwiKS5jb25jYXQoeSAtIDIsIFwicHg7IGZvbnQtc2l6ZTogXCIpLmNvbmNhdChmb250U2l6ZSwgXCI7XCIpKTtcclxuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWwpO1xyXG4gICAgICAgIHZhciBsYWJlbFNwYW4gPSBsYWJlbENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYXhpcy1sYWJlbCcpO1xyXG4gICAgICAgIHZhciBfYXhpc0xhYmVsQ29sb3IgPSB0aGlzLl9heGlzTGFiZWxDb2xvcjtcclxuICAgICAgICBsYWJlbFNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiY29sb3I6IFwiLmNvbmNhdChfYXhpc0xhYmVsQ29sb3IpKTtcclxuICAgICAgICBsYWJlbFNwYW4uaW5uZXJIVE1MID0gZm9ybWF0dGVkVmFsdWU7XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJBeGlzTGFiZWxzID0gZnVuY3Rpb24gKGF4aXNMYWJlbHMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChheGlzTGFiZWxzICYmICFBcnJheS5pc0FycmF5KGF4aXNMYWJlbHMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckF4aXNMYWJlbChheGlzTGFiZWxzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF4aXNMYWJlbHMuZm9yRWFjaChmdW5jdGlvbiAobGFiZWxzKSB7IHJldHVybiBfdGhpcy5yZW5kZXJBeGlzTGFiZWxzKGxhYmVscyk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckF4aXNTdGFja0xhYmVsID0gZnVuY3Rpb24gKHN0YWNrTGFiZWxJbmZvKSB7XHJcbiAgICAgICAgaWYgKCFzdGFja0xhYmVsSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFja0xhYmVsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBzdGFja0xhYmVsU3Bhbi5jbGFzc0xpc3QuYWRkKCdjb21tb24tbGFiZWwnKTtcclxuICAgICAgICB2YXIgYXhpc0xhYmVsQ29sb3IgPSB0aGlzLl9heGlzTGFiZWxDb2xvcjtcclxuICAgICAgICB2YXIgYmdDb2xvciA9ICd0cmFuc3BhcmVudCc7XHJcbiAgICAgICAgdmFyIHggPSBzdGFja0xhYmVsSW5mby54LCB5ID0gc3RhY2tMYWJlbEluZm8ueSwgd2lkdGggPSBzdGFja0xhYmVsSW5mby53aWR0aCwgaGVpZ2h0ID0gc3RhY2tMYWJlbEluZm8uaGVpZ2h0LCBmb3JtYXR0ZWRWYWx1ZSA9IHN0YWNrTGFiZWxJbmZvLmZvcm1hdHRlZFZhbHVlLCBmb250U2l6ZSA9IHN0YWNrTGFiZWxJbmZvLmZvbnRTaXplO1xyXG4gICAgICAgIHN0YWNrTGFiZWxTcGFuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImJhY2tncm91bmQtY29sb3I6IFwiLmNvbmNhdChiZ0NvbG9yLCBcIjsgY29sb3I6IFwiKS5jb25jYXQoYXhpc0xhYmVsQ29sb3IsIFwiOyB0b3A6IFwiKS5jb25jYXQoeSwgXCJweDsgbGVmdDogXCIpLmNvbmNhdCh4LCBcInB4OyB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDsgZm9udC1zaXplOiBcIikuY29uY2F0KGZvbnRTaXplLCBcIjtcIikpO1xyXG4gICAgICAgIHN0YWNrTGFiZWxTcGFuLnRleHRDb250ZW50ID0gZm9ybWF0dGVkVmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChzdGFja0xhYmVsU3Bhbik7XHJcbiAgICB9O1xyXG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJBeGlzU3RhY2tMYWJlbHMgPSBmdW5jdGlvbiAoYXhpc1N0YWNrTGFiZWxzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIWF4aXNTdGFja0xhYmVscykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChheGlzU3RhY2tMYWJlbHMgJiYgIUFycmF5LmlzQXJyYXkoYXhpc1N0YWNrTGFiZWxzKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckF4aXNTdGFja0xhYmVsKGF4aXNTdGFja0xhYmVscyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBheGlzU3RhY2tMYWJlbHMuZm9yRWFjaChmdW5jdGlvbiAoc3RhY2tMYWJlbHMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlbmRlckF4aXNTdGFja0xhYmVscyhzdGFja0xhYmVscyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnNldEV4dGVuc2lvbkRhdGEgPSBmdW5jdGlvbiAoZXh0ZW5zaW9uRGF0YSkge1xyXG4gICAgICAgIHZhciBjaGFydFR5cGUgPSBleHRlbnNpb25EYXRhLmNoYXJ0VHlwZSwgaXNIb3Jpem9udGFsID0gZXh0ZW5zaW9uRGF0YS5pc0hvcml6b250YWwsIGNoYXJ0U2l6ZSA9IGV4dGVuc2lvbkRhdGEuY2hhcnRTaXplLCBjbGlwUGF0aCA9IGV4dGVuc2lvbkRhdGEuY2xpcFBhdGgsIHNlcmllcyA9IGV4dGVuc2lvbkRhdGEuc2VyaWVzLCB4QXhpc0xhYmVscyA9IGV4dGVuc2lvbkRhdGEueEF4aXNMYWJlbHMsIHhBeGlzU3RhY2tMYWJlbHMgPSBleHRlbnNpb25EYXRhLnhBeGlzU3RhY2tMYWJlbHMsIHlBeGlzTGFiZWxzID0gZXh0ZW5zaW9uRGF0YS55QXhpc0xhYmVscywgeUF4aXNTdGFja0xhYmVscyA9IGV4dGVuc2lvbkRhdGEueUF4aXNTdGFja0xhYmVscywgbGVnZW5kQ29udGFpbmVyID0gZXh0ZW5zaW9uRGF0YS5sZWdlbmRDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IGNoYXJ0U2l6ZTtcclxuICAgICAgICB0aGlzLl9jbGlwUGF0aCA9IGNsaXBQYXRoO1xyXG4gICAgICAgIHRoaXMuX3NlcmllcyA9IHNlcmllcztcclxuICAgICAgICB0aGlzLl94QXhpc0xhYmVscyA9IHhBeGlzTGFiZWxzO1xyXG4gICAgICAgIHRoaXMuX3lBeGlzTGFiZWxzID0geUF4aXNMYWJlbHM7XHJcbiAgICAgICAgdGhpcy5feEF4aXNTdGFja0xhYmVscyA9IHhBeGlzU3RhY2tMYWJlbHM7XHJcbiAgICAgICAgdGhpcy5feUF4aXNTdGFja0xhYmVscyA9IHlBeGlzU3RhY2tMYWJlbHM7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRUeXBlID0gY2hhcnRUeXBlO1xyXG4gICAgICAgIHRoaXMuX2lzSG9yaXpvbnRhbCA9IGlzSG9yaXpvbnRhbDtcclxuICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXIgPSBsZWdlbmRDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZSwgXCJyb3VuZGVkXCIsIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yb3VuZGVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUsIFwic2l6ZUluY3JlbWVudFwiLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2l6ZUluY3JlbWVudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLCBcImF4aXNMYWJlbENvbG9yXCIsIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9heGlzTGFiZWxDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBDaGFydE92ZXJsYXlDb21wb25lbnQ7XHJcbn0oSFRNTEVsZW1lbnQpKTtcclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdsZWdlbmQtdml6LW92ZXJsYXknLCBDaGFydE92ZXJsYXlDb21wb25lbnQpO1xyXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL1Bsb3RhcmVhT3ZlcmxheS50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9