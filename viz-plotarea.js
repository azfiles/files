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
OverlayContainerTemplate.innerHTML = "\n    <style>\n        .chart-overlay-container {\n            position: relative;\n            pointer-events: none;\n            overflow: hidden;\n        }\n        .chart-legend-overlay-container {\n            position: absolute;\n            pointer-events: none;\n            overflow: hidden;\n        }\n        .series-bar-column-container {\n            background-color: transparent;\n        }\n        .series-bar-column {\n            width: 100%;\n            height: 100%;\n        }\n        .axis-label-container {\n            position: absolute;\n            display: flex;\n            height: 18px;\n            flex-flow: row nowrap;\n            align-items: center;\n            justify-content: flex-end;\n            background-color: transparent;\n        }\n        .axis-label {\n            text-overflow: ellipsis;\n        }\n        .axis-label-icon {\n            padding-left: 4px;\n        }\n        .common-label {\n            position: absolute;\n            display: flex;\n            flex-flow: row nowrap;\n            align-items: center;\n        }\n    </style>\n    <div class=\"chart-overlay-container\"></div>\n    <div class=\"chart-legend-overlay-container\"></div>\n";
var BarColumnTemplate = document.createElement('template');
BarColumnTemplate.innerHTML = "<div class=\"series-bar-column-container\">\n</div>";
var AxisLabelTemplate = document.createElement('template');
AxisLabelTemplate.innerHTML = "\n    <span class=\"axis-label-container\">\n        <span class=\"axis-label\"></span>\n        <img class=\"axis-label-icon\"\n            width=\"22\"\n            height=\"22\"\n        >\n    </span>\n";
var iconMap = {
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
var isColor = function (str) {
    var s = new Option().style;
    s.color = str;
    return s.color !== '';
};
var findFirstColor = function (str) {
    if (isColor(str)) {
        return str;
    }
    var words = str.split(/\s+/);
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        if (isColor(word)) {
            return word;
        }
    }
    return null;
};
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
        this._legendScrollContainerElement = document.createElement('div');
        ;
        this._legendContainerElement.appendChild(this._legendScrollContainerElement);
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
            this._legendContainerElement.style.position = "absolute";
            this._legendContainerElement.style.pointerEvents = "none";
            this._legendContainerElement.style.overflow = "hidden";
            this._legendContainerElement.style.width = "".concat(chartWidth, "px");
            this._legendContainerElement.style.height = "".concat(chartHeight, "px");
            if (this._legendContainer.clipPath) {
                var _d = this._legendContainer.clipPath, legendClipX = _d.x, legendClipY = _d.y, legendClipHeight = _d.height, legendClipWidth = _d.width;
                this._legendContainerElement.style.clipPath = "inset(".concat(legendClipY, "px ") +
                    "".concat(chartWidth - legendClipX - legendClipWidth, "px ") +
                    "".concat(chartHeight - legendClipY - legendClipHeight, "px ") +
                    "".concat(legendClipX, "px)");
            }
            else {
                this._legendContainerElement.style.clipPath = "inset(".concat(legendY, "px                    ").concat(chartWidth - legendX - legendWidth, "px                    ").concat(chartHeight - legendY - legendHeight, "px                    ").concat(legendX, "px)");
            }
            this._legendScrollContainerElement.setAttribute('style', "position: absolute; pointer-events: none; overflow: hidden;                width: ".concat(chartWidth, "px; height: ").concat(chartHeight, "px;"));
        }
        this._series.forEach(function (singleSeries, index) {
            var options = {
                color: findFirstColor(singleSeries.color),
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
            this.renderLegend(singleSeries.legendInfo, options);
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
            this.renderLegendLine(legendInfo.line, options);
        }
    };
    ChartOverlayComponent.prototype.renderLegendLabel = function (legendLabel, options) {
        var x = legendLabel.x, y = legendLabel.y, width = legendLabel.width, height = legendLabel.height, textStr = legendLabel.textStr, fontSize = legendLabel.fontSize, styles = legendLabel.styles;
        var labelSpan = document.createElement('span');
        var bgColor = 'transparent';
        var labelColor = options.color;
        labelSpan.classList.add('common-label');
        labelSpan.style.backgroundColor = bgColor;
        labelSpan.style.position = "absolute";
        labelSpan.style.top = "".concat(y, "px");
        labelSpan.style.left = "".concat(x, "px");
        labelSpan.style.width = "".concat(width + 10, "px");
        labelSpan.style.height = "".concat(height, "px");
        labelSpan.style.color = labelColor;
        labelSpan.style.fontSize = fontSize;
        labelSpan.style.fontFamily = styles.fontFamily;
        labelSpan.innerHTML = textStr;
        this._legendScrollContainerElement.appendChild(labelSpan);
    };
    ChartOverlayComponent.prototype.renderLegendSymbol = function (legendSymbol, options) {
        var x = legendSymbol.x, y = legendSymbol.y, width = legendSymbol.width, height = legendSymbol.height;
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
        symbolDiv.setAttribute('style', "".concat(symbolStyle, "            position: absolute;            top: ").concat(y, "px;            left: ").concat(x, "px;            width: ").concat(width, "px;            height: ").concat(height, "px;            "));
        this._legendScrollContainerElement.appendChild(symbolDiv);
    };
    ChartOverlayComponent.prototype.renderLegendLine = function (legendLine, options) {
        var x = legendLine.x, y = legendLine.y, width = legendLine.width, height = legendLine.height;
        var lineDiv = document.createElement('div');
        lineDiv.setAttribute('style', "border-bottom: 2px solid ".concat(options.color, ";            position: absolute;            top: ").concat(y - 1, "px;            left: ").concat(x, "px;            width: ").concat(width, "px;            height: ").concat(height, "px;            transform: rotate(-20deg);"));
        this._legendScrollContainerElement.appendChild(lineDiv);
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
        var color = dataInfo.color ? findFirstColor(dataInfo.color) : options.color;
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
        var iconImg = labelContainer.querySelector('img');
        iconImg.setAttribute('src', iconMap[pointValue] || iconMap.City || iconMap.Info);
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
customElements.define('viz-overlay', ChartOverlayComponent);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O1VFcFhBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvLi9zcmMvUGxvdGFyZWFPdmVybGF5LnRzIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIE92ZXJsYXlDb250YWluZXJUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5PdmVybGF5Q29udGFpbmVyVGVtcGxhdGUuaW5uZXJIVE1MID0gXCJcXG4gICAgPHN0eWxlPlxcbiAgICAgICAgLmNoYXJ0LW92ZXJsYXktY29udGFpbmVyIHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIH1cXG4gICAgICAgIC5jaGFydC1sZWdlbmQtb3ZlcmxheS1jb250YWluZXIge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgfVxcbiAgICAgICAgLnNlcmllcy1iYXItY29sdW1uLWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB9XFxuICAgICAgICAuc2VyaWVzLWJhci1jb2x1bW4ge1xcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgIH1cXG4gICAgICAgIC5heGlzLWxhYmVsLWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgICAgaGVpZ2h0OiAxOHB4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB9XFxuICAgICAgICAuYXhpcy1sYWJlbCB7XFxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgICB9XFxuICAgICAgICAuYXhpcy1sYWJlbC1pY29uIHtcXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDRweDtcXG4gICAgICAgIH1cXG4gICAgICAgIC5jb21tb24tbGFiZWwge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgfVxcbiAgICA8L3N0eWxlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjaGFydC1vdmVybGF5LWNvbnRhaW5lclxcXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNoYXJ0LWxlZ2VuZC1vdmVybGF5LWNvbnRhaW5lclxcXCI+PC9kaXY+XFxuXCI7XG52YXIgQmFyQ29sdW1uVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuQmFyQ29sdW1uVGVtcGxhdGUuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPVxcXCJzZXJpZXMtYmFyLWNvbHVtbi1jb250YWluZXJcXFwiPlxcbjwvZGl2PlwiO1xudmFyIEF4aXNMYWJlbFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbkF4aXNMYWJlbFRlbXBsYXRlLmlubmVySFRNTCA9IFwiXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJheGlzLWxhYmVsLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYXhpcy1sYWJlbFxcXCI+PC9zcGFuPlxcbiAgICAgICAgPGltZyBjbGFzcz1cXFwiYXhpcy1sYWJlbC1pY29uXFxcIlxcbiAgICAgICAgICAgIHdpZHRoPVxcXCIyMlxcXCJcXG4gICAgICAgICAgICBoZWlnaHQ9XFxcIjIyXFxcIlxcbiAgICAgICAgPlxcbiAgICA8L3NwYW4+XFxuXCI7XG52YXIgaWNvbk1hcCA9IHtcbiAgICAnQ2FsaWZvcm5pYSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Mb2NhdGlvbi5wbmcnLFxuICAgICdOZXZhZGEnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvTG9jYXRpb24ucG5nJyxcbiAgICAnT3JlZ29uJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0xvY2F0aW9uLnBuZycsXG4gICAgJ0NhcmJvbmF0ZWQgRHJpbmtzJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0NhcmJvbmF0ZWREcmlua3MucG5nJyxcbiAgICAnSnVpY2VzJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0p1aWNlcy5wbmcnLFxuICAgICdBbGNvaG9sJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0FsY29ob2wucG5nJyxcbiAgICAnT3RoZXJzJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL090aGVycy5wbmcnLFxuICAgICdHcm9zcyBNYXJnaW4nOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvR3Jvc3NNYXJnaW4ucG5nJyxcbiAgICAnRGlzY291bnQnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvRGlzY291bnQucG5nJyxcbiAgICAnT3JpZ2luYWwgU2FsZXMgUHJpY2UnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvUHJpY2UucG5nJyxcbiAgICAnQ2l0eSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9DaXR5LnBuZycsXG4gICAgJ0luZm8nOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvSW5mby5wbmcnLFxufTtcbnZhciBpc0NvbG9yID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBzID0gbmV3IE9wdGlvbigpLnN0eWxlO1xuICAgIHMuY29sb3IgPSBzdHI7XG4gICAgcmV0dXJuIHMuY29sb3IgIT09ICcnO1xufTtcbnZhciBmaW5kRmlyc3RDb2xvciA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBpZiAoaXNDb2xvcihzdHIpKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHZhciB3b3JkcyA9IHN0ci5zcGxpdCgvXFxzKy8pO1xuICAgIGZvciAodmFyIF9pID0gMCwgd29yZHNfMSA9IHdvcmRzOyBfaSA8IHdvcmRzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciB3b3JkID0gd29yZHNfMVtfaV07XG4gICAgICAgIGlmIChpc0NvbG9yKHdvcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gd29yZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG52YXIgQ2hhcnRPdmVybGF5Q29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDaGFydE92ZXJsYXlDb21wb25lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2hhcnRPdmVybGF5Q29tcG9uZW50KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fcm91bmRlZCA9IHRydWU7XG4gICAgICAgIF90aGlzLl9zaXplSW5jcmVtZW50ID0gMDtcbiAgICAgICAgX3RoaXMuX2F4aXNMYWJlbENvbG9yID0gJyMzMzMnO1xuICAgICAgICBfdGhpcy5zaGFkb3dSb290ID0gX3RoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gT3ZlcmxheUNvbnRhaW5lclRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBfdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2hhcnQtb3ZlcmxheS1jb250YWluZXInKTtcbiAgICAgICAgX3RoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNoYXJ0LWxlZ2VuZC1vdmVybGF5LWNvbnRhaW5lcicpO1xuICAgICAgICBfdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX2xlZ2VuZFNjcm9sbENvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgO1xuICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2xlZ2VuZFNjcm9sbENvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgICB2YXIgc3VwcG9ydGVkQ2hhcnRUeXBlcyA9IFtcbiAgICAgICAgICAgICdiYXJjb2x1bW4nLFxuICAgICAgICAgICAgJ3N0YWNrZWRiYXInLFxuICAgICAgICAgICAgJ2xpbmUnLFxuICAgICAgICAgICAgJ2FyZWEnLFxuICAgICAgICBdO1xuICAgICAgICBpZiAoIXN1cHBvcnRlZENoYXJ0VHlwZXMuaW5jbHVkZXModGhpcy5fY2hhcnRUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMuX3NpemUsIGNoYXJ0V2lkdGggPSBfYS53aWR0aCwgY2hhcnRIZWlnaHQgPSBfYS5oZWlnaHQ7XG4gICAgICAgIHZhciBfYiA9IHRoaXMuX2NsaXBQYXRoLCBjbGlwUGF0aFkgPSBfYi55LCBjbGlwUGF0aEhlaWdodCA9IF9iLmhlaWdodDtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJwb3NpdGlvbjogYWJzb2x1dGU7IHBvaW50ZXItZXZlbnRzOiBub25lOyBvdmVyZmxvdzogaGlkZGVuOyB3aWR0aDogXCIuY29uY2F0KGNoYXJ0V2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChjaGFydEhlaWdodCwgXCJweDsgY2xpcC1wYXRoOiBpbnNldChcIikuY29uY2F0KGNsaXBQYXRoWSwgXCJweCAwIFwiKS5jb25jYXQoY2hhcnRIZWlnaHQgLSBjbGlwUGF0aFkgLSBjbGlwUGF0aEhlaWdodCwgXCJweCAwKTtcIikpO1xuICAgICAgICBpZiAodGhpcy5fbGVnZW5kQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgX2MgPSB0aGlzLl9sZWdlbmRDb250YWluZXIsIGxlZ2VuZFggPSBfYy54LCBsZWdlbmRZID0gX2MueSwgbGVnZW5kSGVpZ2h0ID0gX2MuaGVpZ2h0LCBsZWdlbmRXaWR0aCA9IF9jLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQoY2hhcnRXaWR0aCwgXCJweFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCJcIi5jb25jYXQoY2hhcnRIZWlnaHQsIFwicHhcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGVnZW5kQ29udGFpbmVyLmNsaXBQYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gdGhpcy5fbGVnZW5kQ29udGFpbmVyLmNsaXBQYXRoLCBsZWdlbmRDbGlwWCA9IF9kLngsIGxlZ2VuZENsaXBZID0gX2QueSwgbGVnZW5kQ2xpcEhlaWdodCA9IF9kLmhlaWdodCwgbGVnZW5kQ2xpcFdpZHRoID0gX2Qud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5zdHlsZS5jbGlwUGF0aCA9IFwiaW5zZXQoXCIuY29uY2F0KGxlZ2VuZENsaXBZLCBcInB4IFwiKSArXG4gICAgICAgICAgICAgICAgICAgIFwiXCIuY29uY2F0KGNoYXJ0V2lkdGggLSBsZWdlbmRDbGlwWCAtIGxlZ2VuZENsaXBXaWR0aCwgXCJweCBcIikgK1xuICAgICAgICAgICAgICAgICAgICBcIlwiLmNvbmNhdChjaGFydEhlaWdodCAtIGxlZ2VuZENsaXBZIC0gbGVnZW5kQ2xpcEhlaWdodCwgXCJweCBcIikgK1xuICAgICAgICAgICAgICAgICAgICBcIlwiLmNvbmNhdChsZWdlbmRDbGlwWCwgXCJweClcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LnN0eWxlLmNsaXBQYXRoID0gXCJpbnNldChcIi5jb25jYXQobGVnZW5kWSwgXCJweCAgICAgICAgICAgICAgICAgICAgXCIpLmNvbmNhdChjaGFydFdpZHRoIC0gbGVnZW5kWCAtIGxlZ2VuZFdpZHRoLCBcInB4ICAgICAgICAgICAgICAgICAgICBcIikuY29uY2F0KGNoYXJ0SGVpZ2h0IC0gbGVnZW5kWSAtIGxlZ2VuZEhlaWdodCwgXCJweCAgICAgICAgICAgICAgICAgICAgXCIpLmNvbmNhdChsZWdlbmRYLCBcInB4KVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xlZ2VuZFNjcm9sbENvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwicG9zaXRpb246IGFic29sdXRlOyBwb2ludGVyLWV2ZW50czogbm9uZTsgb3ZlcmZsb3c6IGhpZGRlbjsgICAgICAgICAgICAgICAgd2lkdGg6IFwiLmNvbmNhdChjaGFydFdpZHRoLCBcInB4OyBoZWlnaHQ6IFwiKS5jb25jYXQoY2hhcnRIZWlnaHQsIFwicHg7XCIpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAoc2luZ2xlU2VyaWVzLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY29sb3I6IGZpbmRGaXJzdENvbG9yKHNpbmdsZVNlcmllcy5jb2xvciksXG4gICAgICAgICAgICAgICAgc2hvd0FzVHJpYW5nbGU6IHNpbmdsZVNlcmllcy5zaG93QXNUcmlhbmdsZSxcbiAgICAgICAgICAgICAgICBpc0xhc3Q6IGluZGV4ID09PSAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckFTZXJpZXMoc2luZ2xlU2VyaWVzLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyQXhpc0xhYmVscyh0aGlzLl94QXhpc0xhYmVscyk7XG4gICAgICAgIHRoaXMucmVuZGVyQXhpc0xhYmVscyh0aGlzLl95QXhpc0xhYmVscyk7XG4gICAgICAgIHRoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWxzKHRoaXMuX3hBeGlzU3RhY2tMYWJlbHMpO1xuICAgICAgICB0aGlzLnJlbmRlckF4aXNTdGFja0xhYmVscyh0aGlzLl95QXhpc1N0YWNrTGFiZWxzKTtcbiAgICB9O1xuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQVNlcmllcyA9IGZ1bmN0aW9uIChzaW5nbGVTZXJpZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc2luZ2xlU2VyaWVzLmRhdGFQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoZGF0YVBvaW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YUluZm8gPSBkYXRhUG9pbnQuZGF0YUluZm8sIGxhYmVsSW5mbyA9IGRhdGFQb2ludC5sYWJlbEluZm87XG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJEYXRhKGRhdGFJbmZvLCBvcHRpb25zKTtcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckxhYmVsKGxhYmVsSW5mbywgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2luZ2xlU2VyaWVzLmxlZ2VuZEluZm8pIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kKHNpbmdsZVNlcmllcy5sZWdlbmRJbmZvLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmQgPSBmdW5jdGlvbiAobGVnZW5kSW5mbywgb3B0aW9ucykge1xuICAgICAgICBpZiAobGVnZW5kSW5mby5sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmRMYWJlbChsZWdlbmRJbmZvLmxhYmVsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVnZW5kSW5mby5zeW1ib2wpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kU3ltYm9sKGxlZ2VuZEluZm8uc3ltYm9sLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVnZW5kSW5mby5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxlZ2VuZExpbmUobGVnZW5kSW5mby5saW5lLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmRMYWJlbCA9IGZ1bmN0aW9uIChsZWdlbmRMYWJlbCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgeCA9IGxlZ2VuZExhYmVsLngsIHkgPSBsZWdlbmRMYWJlbC55LCB3aWR0aCA9IGxlZ2VuZExhYmVsLndpZHRoLCBoZWlnaHQgPSBsZWdlbmRMYWJlbC5oZWlnaHQsIHRleHRTdHIgPSBsZWdlbmRMYWJlbC50ZXh0U3RyLCBmb250U2l6ZSA9IGxlZ2VuZExhYmVsLmZvbnRTaXplLCBzdHlsZXMgPSBsZWdlbmRMYWJlbC5zdHlsZXM7XG4gICAgICAgIHZhciBsYWJlbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHZhciBiZ0NvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgdmFyIGxhYmVsQ29sb3IgPSBvcHRpb25zLmNvbG9yO1xuICAgICAgICBsYWJlbFNwYW4uY2xhc3NMaXN0LmFkZCgnY29tbW9uLWxhYmVsJyk7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuICAgICAgICBsYWJlbFNwYW4uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS50b3AgPSBcIlwiLmNvbmNhdCh5LCBcInB4XCIpO1xuICAgICAgICBsYWJlbFNwYW4uc3R5bGUubGVmdCA9IFwiXCIuY29uY2F0KHgsIFwicHhcIik7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS53aWR0aCA9IFwiXCIuY29uY2F0KHdpZHRoICsgMTAsIFwicHhcIik7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS5oZWlnaHQgPSBcIlwiLmNvbmNhdChoZWlnaHQsIFwicHhcIik7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS5jb2xvciA9IGxhYmVsQ29sb3I7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplO1xuICAgICAgICBsYWJlbFNwYW4uc3R5bGUuZm9udEZhbWlseSA9IHN0eWxlcy5mb250RmFtaWx5O1xuICAgICAgICBsYWJlbFNwYW4uaW5uZXJIVE1MID0gdGV4dFN0cjtcbiAgICAgICAgdGhpcy5fbGVnZW5kU2Nyb2xsQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbFNwYW4pO1xuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmRTeW1ib2wgPSBmdW5jdGlvbiAobGVnZW5kU3ltYm9sLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB4ID0gbGVnZW5kU3ltYm9sLngsIHkgPSBsZWdlbmRTeW1ib2wueSwgd2lkdGggPSBsZWdlbmRTeW1ib2wud2lkdGgsIGhlaWdodCA9IGxlZ2VuZFN5bWJvbC5oZWlnaHQ7XG4gICAgICAgIHZhciBzeW1ib2xEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdmFyIHJvdW5kZWRTdHlsZSA9ICcnO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3dBc1RyaWFuZ2xlKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgd2lkdGggPSBoZWlnaHQgPSAoTWF0aC5taW4ob3JpZ2luYWxXaWR0aCwgb3JpZ2luYWxIZWlnaHQpIC8gMik7XG4gICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdChoZWlnaHQgLyAyICsgMywgXCJweDtcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2NoYXJ0VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JhcmNvbHVtbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhY2tlZGJhcic6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogMCBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweCBcIikuY29uY2F0KGhlaWdodCAvIDIsIFwicHggMDtcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdCh3aWR0aCAvIDIsIFwicHggXCIpLmNvbmNhdCh3aWR0aCAvIDIsIFwicHggMCAwO1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhcmVhJzpcbiAgICAgICAgICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweDtcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjb2xvciA9IG9wdGlvbnMuY29sb3I7XG4gICAgICAgIHZhciBiYWNrZ3JvdW5kU3R5bGUgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3dBc1RyaWFuZ2xlKSA/XG4gICAgICAgICAgICBcImJvcmRlcjogXCIuY29uY2F0KGNvbG9yLCBcIiBzb2xpZCAzcHg7XCIpIDpcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGNvbG9yLCBcIjtcIik7XG4gICAgICAgIHZhciBzeW1ib2xTdHlsZSA9IHRoaXMuX3JvdW5kZWQgPyBcIlwiLmNvbmNhdChiYWNrZ3JvdW5kU3R5bGUsIFwiIFwiKS5jb25jYXQocm91bmRlZFN0eWxlKSA6IGJhY2tncm91bmRTdHlsZTtcbiAgICAgICAgc3ltYm9sRGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcIlwiLmNvbmNhdChzeW1ib2xTdHlsZSwgXCIgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7ICAgICAgICAgICAgdG9wOiBcIikuY29uY2F0KHksIFwicHg7ICAgICAgICAgICAgbGVmdDogXCIpLmNvbmNhdCh4LCBcInB4OyAgICAgICAgICAgIHdpZHRoOiBcIikuY29uY2F0KHdpZHRoLCBcInB4OyAgICAgICAgICAgIGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7ICAgICAgICAgICAgXCIpKTtcbiAgICAgICAgdGhpcy5fbGVnZW5kU2Nyb2xsQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChzeW1ib2xEaXYpO1xuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmRMaW5lID0gZnVuY3Rpb24gKGxlZ2VuZExpbmUsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHggPSBsZWdlbmRMaW5lLngsIHkgPSBsZWdlbmRMaW5lLnksIHdpZHRoID0gbGVnZW5kTGluZS53aWR0aCwgaGVpZ2h0ID0gbGVnZW5kTGluZS5oZWlnaHQ7XG4gICAgICAgIHZhciBsaW5lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxpbmVEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIFwiLmNvbmNhdChvcHRpb25zLmNvbG9yLCBcIjsgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7ICAgICAgICAgICAgdG9wOiBcIikuY29uY2F0KHkgLSAxLCBcInB4OyAgICAgICAgICAgIGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgICAgICAgICAgICB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgICAgICAgICAgICBoZWlnaHQ6IFwiKS5jb25jYXQoaGVpZ2h0LCBcInB4OyAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yMGRlZyk7XCIpKTtcbiAgICAgICAgdGhpcy5fbGVnZW5kU2Nyb2xsQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsaW5lRGl2KTtcbiAgICB9O1xuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhSW5mbywgb3B0aW9ucykge1xuICAgICAgICBpZiAoIWRhdGFJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSBkYXRhSW5mby54LCB5ID0gZGF0YUluZm8ueSwgd2lkdGggPSBkYXRhSW5mby53aWR0aCwgaGVpZ2h0ID0gZGF0YUluZm8uaGVpZ2h0O1xuICAgICAgICB2YXIgZGF0YUVsZW1lbnQgPSBCYXJDb2x1bW5UZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdmFyIGJhckNvbHVtbkNvbnRhaW5lciA9IGRhdGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXJpZXMtYmFyLWNvbHVtbi1jb250YWluZXInKTtcbiAgICAgICAgdmFyIGluY3JlbWVudCA9IHRoaXMuX3NpemVJbmNyZW1lbnQgLyAxMDA7XG4gICAgICAgIHZhciByb3VuZGVkU3R5bGUgPSAnJztcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG93QXNUcmlhbmdsZSkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsV2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ID0gKE1hdGgubWluKG9yaWdpbmFsV2lkdGgsIG9yaWdpbmFsSGVpZ2h0KSAvIDIpICogKDEgKyBpbmNyZW1lbnQpO1xuICAgICAgICAgICAgeCA9IHdpZHRoID09PSBvcmlnaW5hbFdpZHRoID8geCA6IHggKyAob3JpZ2luYWxXaWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgICAgICAgICB5ID0gaGVpZ2h0ID09PSBvcmlnaW5hbEhlaWdodCA/IHkgOiB5ICsgKG9yaWdpbmFsSGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdChoZWlnaHQgLyAyICsgMywgXCJweDtcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2NoYXJ0VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JhcmNvbHVtbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhY2tlZGJhcic6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCAqICgxICsgaW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB5IC0gaGVpZ2h0ICogaW5jcmVtZW50IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGFydFR5cGUgPT09ICdzdGFja2VkYmFyJyAmJiAhb3B0aW9ucy5pc0xhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogMCBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweCBcIikuY29uY2F0KGhlaWdodCAvIDIsIFwicHggMDtcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoICogKDEgKyBpbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHggLSB3aWR0aCAqIGluY3JlbWVudCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hhcnRUeXBlID09PSAnc3RhY2tlZGJhcicgJiYgIW9wdGlvbnMuaXNMYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdCh3aWR0aCAvIDIsIFwicHggXCIpLmNvbmNhdCh3aWR0aCAvIDIsIFwicHggMCAwO1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhcmVhJzpcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB3aWR0aCAqICgxICsgaW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0ICogKDEgKyBpbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB4ID0geCAtIHdpZHRoICogaW5jcmVtZW50IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgeSA9IHkgLSBoZWlnaHQgKiBpbmNyZW1lbnQgLyAyO1xuICAgICAgICAgICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdChoZWlnaHQgLyAyLCBcInB4O1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbG9yID0gZGF0YUluZm8uY29sb3IgPyBmaW5kRmlyc3RDb2xvcihkYXRhSW5mby5jb2xvcikgOiBvcHRpb25zLmNvbG9yO1xuICAgICAgICB2YXIgYmFja2dyb3VuZFN0eWxlID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG93QXNUcmlhbmdsZSkgP1xuICAgICAgICAgICAgXCJib3JkZXI6IFwiLmNvbmNhdChjb2xvciwgXCIgc29saWQgM3B4O1wiKSA6XG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IFwiLmNvbmNhdChjb2xvciwgXCI7XCIpO1xuICAgICAgICB2YXIgYmFyU3R5bGUgPSB0aGlzLl9yb3VuZGVkID8gXCJcIi5jb25jYXQoYmFja2dyb3VuZFN0eWxlLCBcIiBcIikuY29uY2F0KHJvdW5kZWRTdHlsZSkgOiBiYWNrZ3JvdW5kU3R5bGU7XG4gICAgICAgIGJhckNvbHVtbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJcIi5jb25jYXQoYmFyU3R5bGUsIFwiIHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiBcIikuY29uY2F0KHksIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7XCIpLmNvbmNhdChkYXRhSW5mby5vcGFjaXR5ICE9PSB1bmRlZmluZWQgPyBcIm9wYWNpdHk6IFwiLmNvbmNhdChkYXRhSW5mby5vcGFjaXR5LCBcIjtcIikgOiAnJykpO1xuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGRhdGFFbGVtZW50KTtcbiAgICB9O1xuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyTGFiZWwgPSBmdW5jdGlvbiAobGFiZWxJbmZvLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghbGFiZWxJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGFiZWxJbmZvKSkge1xuICAgICAgICAgICAgbGFiZWxJbmZvLmZvckVhY2goZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyTGFiZWwobGFiZWwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSBsYWJlbEluZm8ueCwgeSA9IGxhYmVsSW5mby55LCB3aWR0aCA9IGxhYmVsSW5mby53aWR0aCwgaGVpZ2h0ID0gbGFiZWxJbmZvLmhlaWdodCwgdmFyaWFuY2VMYWJlbFR5cGUgPSBsYWJlbEluZm8udmFyaWFuY2VMYWJlbFR5cGUsIGNvbG9yID0gbGFiZWxJbmZvLmNvbG9yLCBmb250U2l6ZSA9IGxhYmVsSW5mby5mb250U2l6ZTtcbiAgICAgICAgdmFyIGxhYmVsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgdmFyIGJnQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICB2YXIgbGFiZWxDb2xvciA9IHRoaXMuX2NoYXJ0VHlwZS5zdGFydHNXaXRoKCdzdGFja2VkJykgPyAnIzY2NicgOiBvcHRpb25zLmNvbG9yO1xuICAgICAgICBpZiAodmFyaWFuY2VMYWJlbFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGFiZWxDb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGxhYmVsU3Bhbi5jbGFzc0xpc3QuYWRkKCdjb21tb24tbGFiZWwnKTtcbiAgICAgICAgbGFiZWxTcGFuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImJhY2tncm91bmQtY29sb3I6IFwiLmNvbmNhdChiZ0NvbG9yLCBcIjsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IFwiKS5jb25jYXQoeSwgXCJweDsgbGVmdDogXCIpLmNvbmNhdCh4LCBcInB4OyB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDsgY29sb3I6IFwiKS5jb25jYXQobGFiZWxDb2xvciwgXCI7IGZvbnQtc2l6ZTogXCIpLmNvbmNhdChmb250U2l6ZSwgXCI7XCIpKTtcbiAgICAgICAgbGFiZWxTcGFuLmlubmVySFRNTCA9IGxhYmVsSW5mby5mb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbFNwYW4pO1xuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyQXhpc0xhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgIGlmICghbGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IGxhYmVsLngsIHkgPSBsYWJlbC55LCB3aWR0aCA9IGxhYmVsLndpZHRoLCBoZWlnaHQgPSBsYWJlbC5oZWlnaHQsIHBvaW50VmFsdWUgPSBsYWJlbC5wb2ludFZhbHVlLCBmb3JtYXR0ZWRWYWx1ZSA9IGxhYmVsLmZvcm1hdHRlZFZhbHVlLCBmb250U2l6ZSA9IGxhYmVsLmZvbnRTaXplO1xuICAgICAgICB2YXIgbGFiZWxFbCA9IEF4aXNMYWJlbFRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB2YXIgbGFiZWxDb250YWluZXIgPSBsYWJlbEVsLnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWxhYmVsLWNvbnRhaW5lcicpO1xuICAgICAgICB2YXIgYmdDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgIGxhYmVsQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImJhY2tncm91bmQtY29sb3I6IFwiLmNvbmNhdChiZ0NvbG9yLCBcIjsgd2lkdGg6IFwiKS5jb25jYXQod2lkdGggKyAzNiwgXCJweDsgbGVmdDogXCIpLmNvbmNhdCh4IC0gMzAsIFwicHg7IHRvcDogXCIpLmNvbmNhdCh5IC0gMiwgXCJweDsgZm9udC1zaXplOiBcIikuY29uY2F0KGZvbnRTaXplLCBcIjtcIikpO1xuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWwpO1xuICAgICAgICB2YXIgbGFiZWxTcGFuID0gbGFiZWxDb250YWluZXIucXVlcnlTZWxlY3RvcignLmF4aXMtbGFiZWwnKTtcbiAgICAgICAgdmFyIF9heGlzTGFiZWxDb2xvciA9IHRoaXMuX2F4aXNMYWJlbENvbG9yO1xuICAgICAgICBsYWJlbFNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiY29sb3I6IFwiLmNvbmNhdChfYXhpc0xhYmVsQ29sb3IpKTtcbiAgICAgICAgbGFiZWxTcGFuLmlubmVySFRNTCA9IGZvcm1hdHRlZFZhbHVlO1xuICAgICAgICB2YXIgaWNvbkltZyA9IGxhYmVsQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuICAgICAgICBpY29uSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaWNvbk1hcFtwb2ludFZhbHVlXSB8fCBpY29uTWFwLkNpdHkgfHwgaWNvbk1hcC5JbmZvKTtcbiAgICB9O1xuICAgIDtcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckF4aXNMYWJlbHMgPSBmdW5jdGlvbiAoYXhpc0xhYmVscykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoYXhpc0xhYmVscyAmJiAhQXJyYXkuaXNBcnJheShheGlzTGFiZWxzKSkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyQXhpc0xhYmVsKGF4aXNMYWJlbHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXhpc0xhYmVscy5mb3JFYWNoKGZ1bmN0aW9uIChsYWJlbHMpIHsgcmV0dXJuIF90aGlzLnJlbmRlckF4aXNMYWJlbHMobGFiZWxzKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQXhpc1N0YWNrTGFiZWwgPSBmdW5jdGlvbiAoc3RhY2tMYWJlbEluZm8pIHtcbiAgICAgICAgaWYgKCFzdGFja0xhYmVsSW5mbykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFja0xhYmVsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhY2tMYWJlbFNwYW4uY2xhc3NMaXN0LmFkZCgnY29tbW9uLWxhYmVsJyk7XG4gICAgICAgIHZhciBheGlzTGFiZWxDb2xvciA9IHRoaXMuX2F4aXNMYWJlbENvbG9yO1xuICAgICAgICB2YXIgYmdDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgIHZhciB4ID0gc3RhY2tMYWJlbEluZm8ueCwgeSA9IHN0YWNrTGFiZWxJbmZvLnksIHdpZHRoID0gc3RhY2tMYWJlbEluZm8ud2lkdGgsIGhlaWdodCA9IHN0YWNrTGFiZWxJbmZvLmhlaWdodCwgZm9ybWF0dGVkVmFsdWUgPSBzdGFja0xhYmVsSW5mby5mb3JtYXR0ZWRWYWx1ZSwgZm9udFNpemUgPSBzdGFja0xhYmVsSW5mby5mb250U2l6ZTtcbiAgICAgICAgc3RhY2tMYWJlbFNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGJnQ29sb3IsIFwiOyBjb2xvcjogXCIpLmNvbmNhdChheGlzTGFiZWxDb2xvciwgXCI7IHRvcDogXCIpLmNvbmNhdCh5LCBcInB4OyBsZWZ0OiBcIikuY29uY2F0KHgsIFwicHg7IHdpZHRoOiBcIikuY29uY2F0KHdpZHRoLCBcInB4OyBoZWlnaHQ6IFwiKS5jb25jYXQoaGVpZ2h0LCBcInB4OyBmb250LXNpemU6IFwiKS5jb25jYXQoZm9udFNpemUsIFwiO1wiKSk7XG4gICAgICAgIHN0YWNrTGFiZWxTcGFuLnRleHRDb250ZW50ID0gZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoc3RhY2tMYWJlbFNwYW4pO1xuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJBeGlzU3RhY2tMYWJlbHMgPSBmdW5jdGlvbiAoYXhpc1N0YWNrTGFiZWxzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghYXhpc1N0YWNrTGFiZWxzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF4aXNTdGFja0xhYmVscyAmJiAhQXJyYXkuaXNBcnJheShheGlzU3RhY2tMYWJlbHMpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckF4aXNTdGFja0xhYmVsKGF4aXNTdGFja0xhYmVscyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBheGlzU3RhY2tMYWJlbHMuZm9yRWFjaChmdW5jdGlvbiAoc3RhY2tMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJBeGlzU3RhY2tMYWJlbHMoc3RhY2tMYWJlbHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUuc2V0RXh0ZW5zaW9uRGF0YSA9IGZ1bmN0aW9uIChleHRlbnNpb25EYXRhKSB7XG4gICAgICAgIHZhciBjaGFydFR5cGUgPSBleHRlbnNpb25EYXRhLmNoYXJ0VHlwZSwgaXNIb3Jpem9udGFsID0gZXh0ZW5zaW9uRGF0YS5pc0hvcml6b250YWwsIGNoYXJ0U2l6ZSA9IGV4dGVuc2lvbkRhdGEuY2hhcnRTaXplLCBjbGlwUGF0aCA9IGV4dGVuc2lvbkRhdGEuY2xpcFBhdGgsIHNlcmllcyA9IGV4dGVuc2lvbkRhdGEuc2VyaWVzLCB4QXhpc0xhYmVscyA9IGV4dGVuc2lvbkRhdGEueEF4aXNMYWJlbHMsIHhBeGlzU3RhY2tMYWJlbHMgPSBleHRlbnNpb25EYXRhLnhBeGlzU3RhY2tMYWJlbHMsIHlBeGlzTGFiZWxzID0gZXh0ZW5zaW9uRGF0YS55QXhpc0xhYmVscywgeUF4aXNTdGFja0xhYmVscyA9IGV4dGVuc2lvbkRhdGEueUF4aXNTdGFja0xhYmVscywgbGVnZW5kQ29udGFpbmVyID0gZXh0ZW5zaW9uRGF0YS5sZWdlbmRDb250YWluZXI7XG4gICAgICAgIHRoaXMuX3NpemUgPSBjaGFydFNpemU7XG4gICAgICAgIHRoaXMuX2NsaXBQYXRoID0gY2xpcFBhdGg7XG4gICAgICAgIHRoaXMuX3NlcmllcyA9IHNlcmllcztcbiAgICAgICAgdGhpcy5feEF4aXNMYWJlbHMgPSB4QXhpc0xhYmVscztcbiAgICAgICAgdGhpcy5feUF4aXNMYWJlbHMgPSB5QXhpc0xhYmVscztcbiAgICAgICAgdGhpcy5feEF4aXNTdGFja0xhYmVscyA9IHhBeGlzU3RhY2tMYWJlbHM7XG4gICAgICAgIHRoaXMuX3lBeGlzU3RhY2tMYWJlbHMgPSB5QXhpc1N0YWNrTGFiZWxzO1xuICAgICAgICB0aGlzLl9jaGFydFR5cGUgPSBjaGFydFR5cGU7XG4gICAgICAgIHRoaXMuX2lzSG9yaXpvbnRhbCA9IGlzSG9yaXpvbnRhbDtcbiAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyID0gbGVnZW5kQ29udGFpbmVyO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUsIFwicm91bmRlZFwiLCB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3VuZGVkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUsIFwic2l6ZUluY3JlbWVudFwiLCB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9zaXplSW5jcmVtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUsIFwiYXhpc0xhYmVsQ29sb3JcIiwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fYXhpc0xhYmVsQ29sb3IgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQ2hhcnRPdmVybGF5Q29tcG9uZW50O1xufShIVE1MRWxlbWVudCkpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2aXotb3ZlcmxheScsIENoYXJ0T3ZlcmxheUNvbXBvbmVudCk7XG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL1Bsb3RhcmVhT3ZlcmxheS50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9