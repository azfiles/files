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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        var legendOptions = __assign(__assign({}, options), { opacity: legendInfo.containerOpacity });
        if (legendInfo.label) {
            this.renderLegendLabel(legendInfo.label, legendOptions);
        }
        if (legendInfo.symbol) {
            this.renderLegendSymbol(legendInfo.symbol, legendOptions);
        }
        if (legendInfo.line) {
            this.renderLegendLine(legendInfo.line, legendOptions);
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
        labelSpan.style.opacity = options.opacity;
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
        symbolDiv.setAttribute('style', "".concat(symbolStyle, "            position: absolute;            top: ").concat(y, "px;            left: ").concat(x, "px;            width: ").concat(width, "px;            height: ").concat(height, "px;            opacity: ").concat(options.opacity, ";            "));
        this._legendScrollContainerElement.appendChild(symbolDiv);
    };
    ChartOverlayComponent.prototype.renderLegendLine = function (legendLine, options) {
        var x = legendLine.x, y = legendLine.y, width = legendLine.width, height = legendLine.height;
        var lineDiv = document.createElement('div');
        lineDiv.setAttribute('style', "border-bottom: 2px solid ".concat(options.color, ";            position: absolute;            top: ").concat(y - 1, "px;            left: ").concat(x, "px;            width: ").concat(width, "px;            height: ").concat(height, "px;            transform: rotate(-20deg);            opacity: ").concat(options.opacity, ";"));
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
        var x = labelInfo.x, y = labelInfo.y, width = labelInfo.width, height = labelInfo.height, varianceLabelType = labelInfo.varianceLabelType, color = labelInfo.color, fontSize = labelInfo.fontSize, containerOpacity = labelInfo.containerOpacity;
        var labelSpan = document.createElement('span');
        var bgColor = 'transparent';
        var labelColor = this._chartType.startsWith('stacked') ? '#666' : options.color;
        if (varianceLabelType !== undefined) {
            labelColor = color;
        }
        labelSpan.classList.add('common-label');
        labelSpan.setAttribute('style', "background-color: ".concat(bgColor, "; position: absolute; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px; color: ").concat(labelColor, "; font-size: ").concat(fontSize, "; opacity: ").concat(containerOpacity));
        labelSpan.innerHTML = labelInfo.formattedValue;
        this._containerElement.appendChild(labelSpan);
    };
    ChartOverlayComponent.prototype._renderAxisLabel = function (label) {
        if (!label) {
            return;
        }
        var x = label.x, y = label.y, width = label.width, height = label.height, pointValue = label.pointValue, formattedValue = label.formattedValue, fontSize = label.fontSize, opacity = label.opacity;
        var labelEl = AxisLabelTemplate.content.cloneNode(true);
        var labelContainer = labelEl.querySelector('.axis-label-container');
        var bgColor = 'transparent';
        labelContainer.setAttribute('style', "background-color: ".concat(bgColor, "; width: ").concat(width + 36, "px; left: ").concat(x - 30, "px; top: ").concat(y - 2, "px; font-size: ").concat(fontSize, "; opacity: ").concat(opacity, ";"));
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
        var x = stackLabelInfo.x, y = stackLabelInfo.y, width = stackLabelInfo.width, height = stackLabelInfo.height, formattedValue = stackLabelInfo.formattedValue, fontSize = stackLabelInfo.fontSize, opacity = stackLabelInfo.opacity;
        stackLabelSpan.setAttribute('style', "background-color: ".concat(bgColor, "; color: ").concat(axisLabelColor, "; top: ").concat(y, "px; left: ").concat(x, "px; width: ").concat(width, "px; height: ").concat(height, "px; font-size: ").concat(fontSize, "; opacity: ").concat(opacity));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7VUVqWUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dpZGdldC1hZGQtb24tc2FtcGxlcy8uL3NyYy9QbG90YXJlYU92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2lkZ2V0LWFkZC1vbi1zYW1wbGVzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93aWRnZXQtYWRkLW9uLXNhbXBsZXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIE92ZXJsYXlDb250YWluZXJUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5PdmVybGF5Q29udGFpbmVyVGVtcGxhdGUuaW5uZXJIVE1MID0gXCJcXG4gICAgPHN0eWxlPlxcbiAgICAgICAgLmNoYXJ0LW92ZXJsYXktY29udGFpbmVyIHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIH1cXG4gICAgICAgIC5jaGFydC1sZWdlbmQtb3ZlcmxheS1jb250YWluZXIge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgfVxcbiAgICAgICAgLnNlcmllcy1iYXItY29sdW1uLWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB9XFxuICAgICAgICAuc2VyaWVzLWJhci1jb2x1bW4ge1xcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgIH1cXG4gICAgICAgIC5heGlzLWxhYmVsLWNvbnRhaW5lciB7XFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgICAgaGVpZ2h0OiAxOHB4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB9XFxuICAgICAgICAuYXhpcy1sYWJlbCB7XFxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgICB9XFxuICAgICAgICAuYXhpcy1sYWJlbC1pY29uIHtcXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDRweDtcXG4gICAgICAgIH1cXG4gICAgICAgIC5jb21tb24tbGFiZWwge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgfVxcbiAgICA8L3N0eWxlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjaGFydC1vdmVybGF5LWNvbnRhaW5lclxcXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNoYXJ0LWxlZ2VuZC1vdmVybGF5LWNvbnRhaW5lclxcXCI+PC9kaXY+XFxuXCI7XG52YXIgQmFyQ29sdW1uVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuQmFyQ29sdW1uVGVtcGxhdGUuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPVxcXCJzZXJpZXMtYmFyLWNvbHVtbi1jb250YWluZXJcXFwiPlxcbjwvZGl2PlwiO1xudmFyIEF4aXNMYWJlbFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbkF4aXNMYWJlbFRlbXBsYXRlLmlubmVySFRNTCA9IFwiXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJheGlzLWxhYmVsLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYXhpcy1sYWJlbFxcXCI+PC9zcGFuPlxcbiAgICAgICAgPGltZyBjbGFzcz1cXFwiYXhpcy1sYWJlbC1pY29uXFxcIlxcbiAgICAgICAgICAgIHdpZHRoPVxcXCIyMlxcXCJcXG4gICAgICAgICAgICBoZWlnaHQ9XFxcIjIyXFxcIlxcbiAgICAgICAgPlxcbiAgICA8L3NwYW4+XFxuXCI7XG52YXIgaWNvbk1hcCA9IHtcbiAgICAnQ2FsaWZvcm5pYSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9Mb2NhdGlvbi5wbmcnLFxuICAgICdOZXZhZGEnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvTG9jYXRpb24ucG5nJyxcbiAgICAnT3JlZ29uJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0xvY2F0aW9uLnBuZycsXG4gICAgJ0NhcmJvbmF0ZWQgRHJpbmtzJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0NhcmJvbmF0ZWREcmlua3MucG5nJyxcbiAgICAnSnVpY2VzJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0p1aWNlcy5wbmcnLFxuICAgICdBbGNvaG9sJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL0FsY29ob2wucG5nJyxcbiAgICAnT3RoZXJzJzogJ2h0dHBzOi8vZnA2OHN0YXRpYy5jZmFwcHMuZXUxMC0wMDQuaGFuYS5vbmRlbWFuZC5jb20vc2FwLWljb25zL090aGVycy5wbmcnLFxuICAgICdHcm9zcyBNYXJnaW4nOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvR3Jvc3NNYXJnaW4ucG5nJyxcbiAgICAnRGlzY291bnQnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvRGlzY291bnQucG5nJyxcbiAgICAnT3JpZ2luYWwgU2FsZXMgUHJpY2UnOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvUHJpY2UucG5nJyxcbiAgICAnQ2l0eSc6ICdodHRwczovL2ZwNjhzdGF0aWMuY2ZhcHBzLmV1MTAtMDA0LmhhbmEub25kZW1hbmQuY29tL3NhcC1pY29ucy9DaXR5LnBuZycsXG4gICAgJ0luZm8nOiAnaHR0cHM6Ly9mcDY4c3RhdGljLmNmYXBwcy5ldTEwLTAwNC5oYW5hLm9uZGVtYW5kLmNvbS9zYXAtaWNvbnMvSW5mby5wbmcnLFxufTtcbnZhciBpc0NvbG9yID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBzID0gbmV3IE9wdGlvbigpLnN0eWxlO1xuICAgIHMuY29sb3IgPSBzdHI7XG4gICAgcmV0dXJuIHMuY29sb3IgIT09ICcnO1xufTtcbnZhciBmaW5kRmlyc3RDb2xvciA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBpZiAoaXNDb2xvcihzdHIpKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHZhciB3b3JkcyA9IHN0ci5zcGxpdCgvXFxzKy8pO1xuICAgIGZvciAodmFyIF9pID0gMCwgd29yZHNfMSA9IHdvcmRzOyBfaSA8IHdvcmRzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciB3b3JkID0gd29yZHNfMVtfaV07XG4gICAgICAgIGlmIChpc0NvbG9yKHdvcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gd29yZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG52YXIgQ2hhcnRPdmVybGF5Q29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDaGFydE92ZXJsYXlDb21wb25lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2hhcnRPdmVybGF5Q29tcG9uZW50KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fcm91bmRlZCA9IHRydWU7XG4gICAgICAgIF90aGlzLl9zaXplSW5jcmVtZW50ID0gMDtcbiAgICAgICAgX3RoaXMuX2F4aXNMYWJlbENvbG9yID0gJyMzMzMnO1xuICAgICAgICBfdGhpcy5zaGFkb3dSb290ID0gX3RoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gT3ZlcmxheUNvbnRhaW5lclRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBfdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2hhcnQtb3ZlcmxheS1jb250YWluZXInKTtcbiAgICAgICAgX3RoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNoYXJ0LWxlZ2VuZC1vdmVybGF5LWNvbnRhaW5lcicpO1xuICAgICAgICBfdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX2xlZ2VuZFNjcm9sbENvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgO1xuICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2xlZ2VuZFNjcm9sbENvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgICB2YXIgc3VwcG9ydGVkQ2hhcnRUeXBlcyA9IFtcbiAgICAgICAgICAgICdiYXJjb2x1bW4nLFxuICAgICAgICAgICAgJ3N0YWNrZWRiYXInLFxuICAgICAgICAgICAgJ2xpbmUnLFxuICAgICAgICAgICAgJ2FyZWEnLFxuICAgICAgICBdO1xuICAgICAgICBpZiAoIXN1cHBvcnRlZENoYXJ0VHlwZXMuaW5jbHVkZXModGhpcy5fY2hhcnRUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMuX3NpemUsIGNoYXJ0V2lkdGggPSBfYS53aWR0aCwgY2hhcnRIZWlnaHQgPSBfYS5oZWlnaHQ7XG4gICAgICAgIHZhciBfYiA9IHRoaXMuX2NsaXBQYXRoLCBjbGlwUGF0aFkgPSBfYi55LCBjbGlwUGF0aEhlaWdodCA9IF9iLmhlaWdodDtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJwb3NpdGlvbjogYWJzb2x1dGU7IHBvaW50ZXItZXZlbnRzOiBub25lOyBvdmVyZmxvdzogaGlkZGVuOyB3aWR0aDogXCIuY29uY2F0KGNoYXJ0V2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChjaGFydEhlaWdodCwgXCJweDsgY2xpcC1wYXRoOiBpbnNldChcIikuY29uY2F0KGNsaXBQYXRoWSwgXCJweCAwIFwiKS5jb25jYXQoY2hhcnRIZWlnaHQgLSBjbGlwUGF0aFkgLSBjbGlwUGF0aEhlaWdodCwgXCJweCAwKTtcIikpO1xuICAgICAgICBpZiAodGhpcy5fbGVnZW5kQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgX2MgPSB0aGlzLl9sZWdlbmRDb250YWluZXIsIGxlZ2VuZFggPSBfYy54LCBsZWdlbmRZID0gX2MueSwgbGVnZW5kSGVpZ2h0ID0gX2MuaGVpZ2h0LCBsZWdlbmRXaWR0aCA9IF9jLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQoY2hhcnRXaWR0aCwgXCJweFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCJcIi5jb25jYXQoY2hhcnRIZWlnaHQsIFwicHhcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGVnZW5kQ29udGFpbmVyLmNsaXBQYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gdGhpcy5fbGVnZW5kQ29udGFpbmVyLmNsaXBQYXRoLCBsZWdlbmRDbGlwWCA9IF9kLngsIGxlZ2VuZENsaXBZID0gX2QueSwgbGVnZW5kQ2xpcEhlaWdodCA9IF9kLmhlaWdodCwgbGVnZW5kQ2xpcFdpZHRoID0gX2Qud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGFpbmVyRWxlbWVudC5zdHlsZS5jbGlwUGF0aCA9IFwiaW5zZXQoXCIuY29uY2F0KGxlZ2VuZENsaXBZLCBcInB4IFwiKSArXG4gICAgICAgICAgICAgICAgICAgIFwiXCIuY29uY2F0KGNoYXJ0V2lkdGggLSBsZWdlbmRDbGlwWCAtIGxlZ2VuZENsaXBXaWR0aCwgXCJweCBcIikgK1xuICAgICAgICAgICAgICAgICAgICBcIlwiLmNvbmNhdChjaGFydEhlaWdodCAtIGxlZ2VuZENsaXBZIC0gbGVnZW5kQ2xpcEhlaWdodCwgXCJweCBcIikgK1xuICAgICAgICAgICAgICAgICAgICBcIlwiLmNvbmNhdChsZWdlbmRDbGlwWCwgXCJweClcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sZWdlbmRDb250YWluZXJFbGVtZW50LnN0eWxlLmNsaXBQYXRoID0gXCJpbnNldChcIi5jb25jYXQobGVnZW5kWSwgXCJweCAgICAgICAgICAgICAgICAgICAgXCIpLmNvbmNhdChjaGFydFdpZHRoIC0gbGVnZW5kWCAtIGxlZ2VuZFdpZHRoLCBcInB4ICAgICAgICAgICAgICAgICAgICBcIikuY29uY2F0KGNoYXJ0SGVpZ2h0IC0gbGVnZW5kWSAtIGxlZ2VuZEhlaWdodCwgXCJweCAgICAgICAgICAgICAgICAgICAgXCIpLmNvbmNhdChsZWdlbmRYLCBcInB4KVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xlZ2VuZFNjcm9sbENvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwicG9zaXRpb246IGFic29sdXRlOyBwb2ludGVyLWV2ZW50czogbm9uZTsgb3ZlcmZsb3c6IGhpZGRlbjsgICAgICAgICAgICAgICAgd2lkdGg6IFwiLmNvbmNhdChjaGFydFdpZHRoLCBcInB4OyBoZWlnaHQ6IFwiKS5jb25jYXQoY2hhcnRIZWlnaHQsIFwicHg7XCIpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAoc2luZ2xlU2VyaWVzLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY29sb3I6IGZpbmRGaXJzdENvbG9yKHNpbmdsZVNlcmllcy5jb2xvciksXG4gICAgICAgICAgICAgICAgc2hvd0FzVHJpYW5nbGU6IHNpbmdsZVNlcmllcy5zaG93QXNUcmlhbmdsZSxcbiAgICAgICAgICAgICAgICBpc0xhc3Q6IGluZGV4ID09PSAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckFTZXJpZXMoc2luZ2xlU2VyaWVzLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyQXhpc0xhYmVscyh0aGlzLl94QXhpc0xhYmVscyk7XG4gICAgICAgIHRoaXMucmVuZGVyQXhpc0xhYmVscyh0aGlzLl95QXhpc0xhYmVscyk7XG4gICAgICAgIHRoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWxzKHRoaXMuX3hBeGlzU3RhY2tMYWJlbHMpO1xuICAgICAgICB0aGlzLnJlbmRlckF4aXNTdGFja0xhYmVscyh0aGlzLl95QXhpc1N0YWNrTGFiZWxzKTtcbiAgICB9O1xuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQVNlcmllcyA9IGZ1bmN0aW9uIChzaW5nbGVTZXJpZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc2luZ2xlU2VyaWVzLmRhdGFQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoZGF0YVBvaW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YUluZm8gPSBkYXRhUG9pbnQuZGF0YUluZm8sIGxhYmVsSW5mbyA9IGRhdGFQb2ludC5sYWJlbEluZm87XG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJEYXRhKGRhdGFJbmZvLCBvcHRpb25zKTtcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckxhYmVsKGxhYmVsSW5mbywgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2luZ2xlU2VyaWVzLmxlZ2VuZEluZm8pIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kKHNpbmdsZVNlcmllcy5sZWdlbmRJbmZvLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmQgPSBmdW5jdGlvbiAobGVnZW5kSW5mbywgb3B0aW9ucykge1xuICAgICAgICB2YXIgbGVnZW5kT3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBvcGFjaXR5OiBsZWdlbmRJbmZvLmNvbnRhaW5lck9wYWNpdHkgfSk7XG4gICAgICAgIGlmIChsZWdlbmRJbmZvLmxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxlZ2VuZExhYmVsKGxlZ2VuZEluZm8ubGFiZWwsIGxlZ2VuZE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZWdlbmRJbmZvLnN5bWJvbCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmRTeW1ib2wobGVnZW5kSW5mby5zeW1ib2wsIGxlZ2VuZE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZWdlbmRJbmZvLmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kTGluZShsZWdlbmRJbmZvLmxpbmUsIGxlZ2VuZE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckxlZ2VuZExhYmVsID0gZnVuY3Rpb24gKGxlZ2VuZExhYmVsLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB4ID0gbGVnZW5kTGFiZWwueCwgeSA9IGxlZ2VuZExhYmVsLnksIHdpZHRoID0gbGVnZW5kTGFiZWwud2lkdGgsIGhlaWdodCA9IGxlZ2VuZExhYmVsLmhlaWdodCwgdGV4dFN0ciA9IGxlZ2VuZExhYmVsLnRleHRTdHIsIGZvbnRTaXplID0gbGVnZW5kTGFiZWwuZm9udFNpemUsIHN0eWxlcyA9IGxlZ2VuZExhYmVsLnN0eWxlcztcbiAgICAgICAgdmFyIGxhYmVsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgdmFyIGJnQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICB2YXIgbGFiZWxDb2xvciA9IG9wdGlvbnMuY29sb3I7XG4gICAgICAgIGxhYmVsU3Bhbi5jbGFzc0xpc3QuYWRkKCdjb21tb24tbGFiZWwnKTtcbiAgICAgICAgbGFiZWxTcGFuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgbGFiZWxTcGFuLnN0eWxlLnRvcCA9IFwiXCIuY29uY2F0KHksIFwicHhcIik7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS5sZWZ0ID0gXCJcIi5jb25jYXQoeCwgXCJweFwiKTtcbiAgICAgICAgbGFiZWxTcGFuLnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQod2lkdGggKyAxMCwgXCJweFwiKTtcbiAgICAgICAgbGFiZWxTcGFuLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KGhlaWdodCwgXCJweFwiKTtcbiAgICAgICAgbGFiZWxTcGFuLnN0eWxlLmNvbG9yID0gbGFiZWxDb2xvcjtcbiAgICAgICAgbGFiZWxTcGFuLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemU7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS5mb250RmFtaWx5ID0gc3R5bGVzLmZvbnRGYW1pbHk7XG4gICAgICAgIGxhYmVsU3Bhbi5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5vcGFjaXR5O1xuICAgICAgICBsYWJlbFNwYW4uaW5uZXJIVE1MID0gdGV4dFN0cjtcbiAgICAgICAgdGhpcy5fbGVnZW5kU2Nyb2xsQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbFNwYW4pO1xuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMZWdlbmRTeW1ib2wgPSBmdW5jdGlvbiAobGVnZW5kU3ltYm9sLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB4ID0gbGVnZW5kU3ltYm9sLngsIHkgPSBsZWdlbmRTeW1ib2wueSwgd2lkdGggPSBsZWdlbmRTeW1ib2wud2lkdGgsIGhlaWdodCA9IGxlZ2VuZFN5bWJvbC5oZWlnaHQ7XG4gICAgICAgIHZhciBzeW1ib2xEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdmFyIHJvdW5kZWRTdHlsZSA9ICcnO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3dBc1RyaWFuZ2xlKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgd2lkdGggPSBoZWlnaHQgPSAoTWF0aC5taW4ob3JpZ2luYWxXaWR0aCwgb3JpZ2luYWxIZWlnaHQpIC8gMik7XG4gICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdChoZWlnaHQgLyAyICsgMywgXCJweDtcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2NoYXJ0VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JhcmNvbHVtbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhY2tlZGJhcic6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogMCBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweCBcIikuY29uY2F0KGhlaWdodCAvIDIsIFwicHggMDtcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZGVkU3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IFwiLmNvbmNhdCh3aWR0aCAvIDIsIFwicHggXCIpLmNvbmNhdCh3aWR0aCAvIDIsIFwicHggMCAwO1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhcmVhJzpcbiAgICAgICAgICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiBcIi5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweDtcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjb2xvciA9IG9wdGlvbnMuY29sb3I7XG4gICAgICAgIHZhciBiYWNrZ3JvdW5kU3R5bGUgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3dBc1RyaWFuZ2xlKSA/XG4gICAgICAgICAgICBcImJvcmRlcjogXCIuY29uY2F0KGNvbG9yLCBcIiBzb2xpZCAzcHg7XCIpIDpcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGNvbG9yLCBcIjtcIik7XG4gICAgICAgIHZhciBzeW1ib2xTdHlsZSA9IHRoaXMuX3JvdW5kZWQgPyBcIlwiLmNvbmNhdChiYWNrZ3JvdW5kU3R5bGUsIFwiIFwiKS5jb25jYXQocm91bmRlZFN0eWxlKSA6IGJhY2tncm91bmRTdHlsZTtcbiAgICAgICAgc3ltYm9sRGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcIlwiLmNvbmNhdChzeW1ib2xTdHlsZSwgXCIgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7ICAgICAgICAgICAgdG9wOiBcIikuY29uY2F0KHksIFwicHg7ICAgICAgICAgICAgbGVmdDogXCIpLmNvbmNhdCh4LCBcInB4OyAgICAgICAgICAgIHdpZHRoOiBcIikuY29uY2F0KHdpZHRoLCBcInB4OyAgICAgICAgICAgIGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7ICAgICAgICAgICAgb3BhY2l0eTogXCIpLmNvbmNhdChvcHRpb25zLm9wYWNpdHksIFwiOyAgICAgICAgICAgIFwiKSk7XG4gICAgICAgIHRoaXMuX2xlZ2VuZFNjcm9sbENvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoc3ltYm9sRGl2KTtcbiAgICB9O1xuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyTGVnZW5kTGluZSA9IGZ1bmN0aW9uIChsZWdlbmRMaW5lLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB4ID0gbGVnZW5kTGluZS54LCB5ID0gbGVnZW5kTGluZS55LCB3aWR0aCA9IGxlZ2VuZExpbmUud2lkdGgsIGhlaWdodCA9IGxlZ2VuZExpbmUuaGVpZ2h0O1xuICAgICAgICB2YXIgbGluZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaW5lRGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImJvcmRlci1ib3R0b206IDJweCBzb2xpZCBcIi5jb25jYXQob3B0aW9ucy5jb2xvciwgXCI7ICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOyAgICAgICAgICAgIHRvcDogXCIpLmNvbmNhdCh5IC0gMSwgXCJweDsgICAgICAgICAgICBsZWZ0OiBcIikuY29uY2F0KHgsIFwicHg7ICAgICAgICAgICAgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7ICAgICAgICAgICAgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDsgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjBkZWcpOyAgICAgICAgICAgIG9wYWNpdHk6IFwiKS5jb25jYXQob3B0aW9ucy5vcGFjaXR5LCBcIjtcIikpO1xuICAgICAgICB0aGlzLl9sZWdlbmRTY3JvbGxDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGxpbmVEaXYpO1xuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJEYXRhID0gZnVuY3Rpb24gKGRhdGFJbmZvLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghZGF0YUluZm8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IGRhdGFJbmZvLngsIHkgPSBkYXRhSW5mby55LCB3aWR0aCA9IGRhdGFJbmZvLndpZHRoLCBoZWlnaHQgPSBkYXRhSW5mby5oZWlnaHQ7XG4gICAgICAgIHZhciBkYXRhRWxlbWVudCA9IEJhckNvbHVtblRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB2YXIgYmFyQ29sdW1uQ29udGFpbmVyID0gZGF0YUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlcmllcy1iYXItY29sdW1uLWNvbnRhaW5lcicpO1xuICAgICAgICB2YXIgaW5jcmVtZW50ID0gdGhpcy5fc2l6ZUluY3JlbWVudCAvIDEwMDtcbiAgICAgICAgdmFyIHJvdW5kZWRTdHlsZSA9ICcnO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3dBc1RyaWFuZ2xlKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgd2lkdGggPSBoZWlnaHQgPSAoTWF0aC5taW4ob3JpZ2luYWxXaWR0aCwgb3JpZ2luYWxIZWlnaHQpIC8gMikgKiAoMSArIGluY3JlbWVudCk7XG4gICAgICAgICAgICB4ID0gd2lkdGggPT09IG9yaWdpbmFsV2lkdGggPyB4IDogeCArIChvcmlnaW5hbFdpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICAgICAgICAgIHkgPSBoZWlnaHQgPT09IG9yaWdpbmFsSGVpZ2h0ID8geSA6IHkgKyAob3JpZ2luYWxIZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogXCIuY29uY2F0KGhlaWdodCAvIDIgKyAzLCBcInB4O1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fY2hhcnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYmFyY29sdW1uJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFja2VkYmFyJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0ICogKDEgKyBpbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHkgLSBoZWlnaHQgKiBpbmNyZW1lbnQgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoYXJ0VHlwZSA9PT0gJ3N0YWNrZWRiYXInICYmICFvcHRpb25zLmlzTGFzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRlZFN0eWxlID0gXCJib3JkZXItcmFkaXVzOiAwIFwiLmNvbmNhdChoZWlnaHQgLyAyLCBcInB4IFwiKS5jb25jYXQoaGVpZ2h0IC8gMiwgXCJweCAwO1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggKiAoMSArIGluY3JlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0geCAtIHdpZHRoICogaW5jcmVtZW50IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGFydFR5cGUgPT09ICdzdGFja2VkYmFyJyAmJiAhb3B0aW9ucy5pc0xhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogXCIuY29uY2F0KHdpZHRoIC8gMiwgXCJweCBcIikuY29uY2F0KHdpZHRoIC8gMiwgXCJweCAwIDA7XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2FyZWEnOlxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpZHRoICogKDEgKyBpbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgKiAoMSArIGluY3JlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHggPSB4IC0gd2lkdGggKiBpbmNyZW1lbnQgLyAyO1xuICAgICAgICAgICAgICAgICAgICB5ID0geSAtIGhlaWdodCAqIGluY3JlbWVudCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kZWRTdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogXCIuY29uY2F0KGhlaWdodCAvIDIsIFwicHg7XCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY29sb3IgPSBkYXRhSW5mby5jb2xvciA/IGZpbmRGaXJzdENvbG9yKGRhdGFJbmZvLmNvbG9yKSA6IG9wdGlvbnMuY29sb3I7XG4gICAgICAgIHZhciBiYWNrZ3JvdW5kU3R5bGUgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3dBc1RyaWFuZ2xlKSA/XG4gICAgICAgICAgICBcImJvcmRlcjogXCIuY29uY2F0KGNvbG9yLCBcIiBzb2xpZCAzcHg7XCIpIDpcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIuY29uY2F0KGNvbG9yLCBcIjtcIik7XG4gICAgICAgIHZhciBiYXJTdHlsZSA9IHRoaXMuX3JvdW5kZWQgPyBcIlwiLmNvbmNhdChiYWNrZ3JvdW5kU3R5bGUsIFwiIFwiKS5jb25jYXQocm91bmRlZFN0eWxlKSA6IGJhY2tncm91bmRTdHlsZTtcbiAgICAgICAgYmFyQ29sdW1uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcIlwiLmNvbmNhdChiYXJTdHlsZSwgXCIgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IFwiKS5jb25jYXQoeSwgXCJweDsgbGVmdDogXCIpLmNvbmNhdCh4LCBcInB4OyB3aWR0aDogXCIpLmNvbmNhdCh3aWR0aCwgXCJweDsgaGVpZ2h0OiBcIikuY29uY2F0KGhlaWdodCwgXCJweDtcIikuY29uY2F0KGRhdGFJbmZvLm9wYWNpdHkgIT09IHVuZGVmaW5lZCA/IFwib3BhY2l0eTogXCIuY29uY2F0KGRhdGFJbmZvLm9wYWNpdHksIFwiO1wiKSA6ICcnKSk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZGF0YUVsZW1lbnQpO1xuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbEluZm8sIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFsYWJlbEluZm8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsYWJlbEluZm8pKSB7XG4gICAgICAgICAgICBsYWJlbEluZm8uZm9yRWFjaChmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJMYWJlbChsYWJlbCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IGxhYmVsSW5mby54LCB5ID0gbGFiZWxJbmZvLnksIHdpZHRoID0gbGFiZWxJbmZvLndpZHRoLCBoZWlnaHQgPSBsYWJlbEluZm8uaGVpZ2h0LCB2YXJpYW5jZUxhYmVsVHlwZSA9IGxhYmVsSW5mby52YXJpYW5jZUxhYmVsVHlwZSwgY29sb3IgPSBsYWJlbEluZm8uY29sb3IsIGZvbnRTaXplID0gbGFiZWxJbmZvLmZvbnRTaXplLCBjb250YWluZXJPcGFjaXR5ID0gbGFiZWxJbmZvLmNvbnRhaW5lck9wYWNpdHk7XG4gICAgICAgIHZhciBsYWJlbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHZhciBiZ0NvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgdmFyIGxhYmVsQ29sb3IgPSB0aGlzLl9jaGFydFR5cGUuc3RhcnRzV2l0aCgnc3RhY2tlZCcpID8gJyM2NjYnIDogb3B0aW9ucy5jb2xvcjtcbiAgICAgICAgaWYgKHZhcmlhbmNlTGFiZWxUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxhYmVsQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBsYWJlbFNwYW4uY2xhc3NMaXN0LmFkZCgnY29tbW9uLWxhYmVsJyk7XG4gICAgICAgIGxhYmVsU3Bhbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoYmdDb2xvciwgXCI7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiBcIikuY29uY2F0KHksIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7IGNvbG9yOiBcIikuY29uY2F0KGxhYmVsQ29sb3IsIFwiOyBmb250LXNpemU6IFwiKS5jb25jYXQoZm9udFNpemUsIFwiOyBvcGFjaXR5OiBcIikuY29uY2F0KGNvbnRhaW5lck9wYWNpdHkpKTtcbiAgICAgICAgbGFiZWxTcGFuLmlubmVySFRNTCA9IGxhYmVsSW5mby5mb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbFNwYW4pO1xuICAgIH07XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyQXhpc0xhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgIGlmICghbGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IGxhYmVsLngsIHkgPSBsYWJlbC55LCB3aWR0aCA9IGxhYmVsLndpZHRoLCBoZWlnaHQgPSBsYWJlbC5oZWlnaHQsIHBvaW50VmFsdWUgPSBsYWJlbC5wb2ludFZhbHVlLCBmb3JtYXR0ZWRWYWx1ZSA9IGxhYmVsLmZvcm1hdHRlZFZhbHVlLCBmb250U2l6ZSA9IGxhYmVsLmZvbnRTaXplLCBvcGFjaXR5ID0gbGFiZWwub3BhY2l0eTtcbiAgICAgICAgdmFyIGxhYmVsRWwgPSBBeGlzTGFiZWxUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdmFyIGxhYmVsQ29udGFpbmVyID0gbGFiZWxFbC5xdWVyeVNlbGVjdG9yKCcuYXhpcy1sYWJlbC1jb250YWluZXInKTtcbiAgICAgICAgdmFyIGJnQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICBsYWJlbENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoYmdDb2xvciwgXCI7IHdpZHRoOiBcIikuY29uY2F0KHdpZHRoICsgMzYsIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCAtIDMwLCBcInB4OyB0b3A6IFwiKS5jb25jYXQoeSAtIDIsIFwicHg7IGZvbnQtc2l6ZTogXCIpLmNvbmNhdChmb250U2l6ZSwgXCI7IG9wYWNpdHk6IFwiKS5jb25jYXQob3BhY2l0eSwgXCI7XCIpKTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsKTtcbiAgICAgICAgdmFyIGxhYmVsU3BhbiA9IGxhYmVsQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWxhYmVsJyk7XG4gICAgICAgIHZhciBfYXhpc0xhYmVsQ29sb3IgPSB0aGlzLl9heGlzTGFiZWxDb2xvcjtcbiAgICAgICAgbGFiZWxTcGFuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImNvbG9yOiBcIi5jb25jYXQoX2F4aXNMYWJlbENvbG9yKSk7XG4gICAgICAgIGxhYmVsU3Bhbi5pbm5lckhUTUwgPSBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgdmFyIGljb25JbWcgPSBsYWJlbENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgICAgICAgaWNvbkltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGljb25NYXBbcG9pbnRWYWx1ZV0gfHwgaWNvbk1hcC5DaXR5IHx8IGljb25NYXAuSW5mbyk7XG4gICAgfTtcbiAgICA7XG4gICAgQ2hhcnRPdmVybGF5Q29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJBeGlzTGFiZWxzID0gZnVuY3Rpb24gKGF4aXNMYWJlbHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGF4aXNMYWJlbHMgJiYgIUFycmF5LmlzQXJyYXkoYXhpc0xhYmVscykpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckF4aXNMYWJlbChheGlzTGFiZWxzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF4aXNMYWJlbHMuZm9yRWFjaChmdW5jdGlvbiAobGFiZWxzKSB7IHJldHVybiBfdGhpcy5yZW5kZXJBeGlzTGFiZWxzKGxhYmVscyk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckF4aXNTdGFja0xhYmVsID0gZnVuY3Rpb24gKHN0YWNrTGFiZWxJbmZvKSB7XG4gICAgICAgIGlmICghc3RhY2tMYWJlbEluZm8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhY2tMYWJlbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YWNrTGFiZWxTcGFuLmNsYXNzTGlzdC5hZGQoJ2NvbW1vbi1sYWJlbCcpO1xuICAgICAgICB2YXIgYXhpc0xhYmVsQ29sb3IgPSB0aGlzLl9heGlzTGFiZWxDb2xvcjtcbiAgICAgICAgdmFyIGJnQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICB2YXIgeCA9IHN0YWNrTGFiZWxJbmZvLngsIHkgPSBzdGFja0xhYmVsSW5mby55LCB3aWR0aCA9IHN0YWNrTGFiZWxJbmZvLndpZHRoLCBoZWlnaHQgPSBzdGFja0xhYmVsSW5mby5oZWlnaHQsIGZvcm1hdHRlZFZhbHVlID0gc3RhY2tMYWJlbEluZm8uZm9ybWF0dGVkVmFsdWUsIGZvbnRTaXplID0gc3RhY2tMYWJlbEluZm8uZm9udFNpemUsIG9wYWNpdHkgPSBzdGFja0xhYmVsSW5mby5vcGFjaXR5O1xuICAgICAgICBzdGFja0xhYmVsU3Bhbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIi5jb25jYXQoYmdDb2xvciwgXCI7IGNvbG9yOiBcIikuY29uY2F0KGF4aXNMYWJlbENvbG9yLCBcIjsgdG9wOiBcIikuY29uY2F0KHksIFwicHg7IGxlZnQ6IFwiKS5jb25jYXQoeCwgXCJweDsgd2lkdGg6IFwiKS5jb25jYXQod2lkdGgsIFwicHg7IGhlaWdodDogXCIpLmNvbmNhdChoZWlnaHQsIFwicHg7IGZvbnQtc2l6ZTogXCIpLmNvbmNhdChmb250U2l6ZSwgXCI7IG9wYWNpdHk6IFwiKS5jb25jYXQob3BhY2l0eSkpO1xuICAgICAgICBzdGFja0xhYmVsU3Bhbi50ZXh0Q29udGVudCA9IGZvcm1hdHRlZFZhbHVlO1xuICAgICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHN0YWNrTGFiZWxTcGFuKTtcbiAgICB9O1xuICAgIENoYXJ0T3ZlcmxheUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQXhpc1N0YWNrTGFiZWxzID0gZnVuY3Rpb24gKGF4aXNTdGFja0xhYmVscykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIWF4aXNTdGFja0xhYmVscykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChheGlzU3RhY2tMYWJlbHMgJiYgIUFycmF5LmlzQXJyYXkoYXhpc1N0YWNrTGFiZWxzKSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJBeGlzU3RhY2tMYWJlbChheGlzU3RhY2tMYWJlbHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXhpc1N0YWNrTGFiZWxzLmZvckVhY2goZnVuY3Rpb24gKHN0YWNrTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyQXhpc1N0YWNrTGFiZWxzKHN0YWNrTGFiZWxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLnNldEV4dGVuc2lvbkRhdGEgPSBmdW5jdGlvbiAoZXh0ZW5zaW9uRGF0YSkge1xuICAgICAgICB2YXIgY2hhcnRUeXBlID0gZXh0ZW5zaW9uRGF0YS5jaGFydFR5cGUsIGlzSG9yaXpvbnRhbCA9IGV4dGVuc2lvbkRhdGEuaXNIb3Jpem9udGFsLCBjaGFydFNpemUgPSBleHRlbnNpb25EYXRhLmNoYXJ0U2l6ZSwgY2xpcFBhdGggPSBleHRlbnNpb25EYXRhLmNsaXBQYXRoLCBzZXJpZXMgPSBleHRlbnNpb25EYXRhLnNlcmllcywgeEF4aXNMYWJlbHMgPSBleHRlbnNpb25EYXRhLnhBeGlzTGFiZWxzLCB4QXhpc1N0YWNrTGFiZWxzID0gZXh0ZW5zaW9uRGF0YS54QXhpc1N0YWNrTGFiZWxzLCB5QXhpc0xhYmVscyA9IGV4dGVuc2lvbkRhdGEueUF4aXNMYWJlbHMsIHlBeGlzU3RhY2tMYWJlbHMgPSBleHRlbnNpb25EYXRhLnlBeGlzU3RhY2tMYWJlbHMsIGxlZ2VuZENvbnRhaW5lciA9IGV4dGVuc2lvbkRhdGEubGVnZW5kQ29udGFpbmVyO1xuICAgICAgICB0aGlzLl9zaXplID0gY2hhcnRTaXplO1xuICAgICAgICB0aGlzLl9jbGlwUGF0aCA9IGNsaXBQYXRoO1xuICAgICAgICB0aGlzLl9zZXJpZXMgPSBzZXJpZXM7XG4gICAgICAgIHRoaXMuX3hBeGlzTGFiZWxzID0geEF4aXNMYWJlbHM7XG4gICAgICAgIHRoaXMuX3lBeGlzTGFiZWxzID0geUF4aXNMYWJlbHM7XG4gICAgICAgIHRoaXMuX3hBeGlzU3RhY2tMYWJlbHMgPSB4QXhpc1N0YWNrTGFiZWxzO1xuICAgICAgICB0aGlzLl95QXhpc1N0YWNrTGFiZWxzID0geUF4aXNTdGFja0xhYmVscztcbiAgICAgICAgdGhpcy5fY2hhcnRUeXBlID0gY2hhcnRUeXBlO1xuICAgICAgICB0aGlzLl9pc0hvcml6b250YWwgPSBpc0hvcml6b250YWw7XG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbnRhaW5lciA9IGxlZ2VuZENvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLCBcInJvdW5kZWRcIiwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcm91bmRlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLCBcInNpemVJbmNyZW1lbnRcIiwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2l6ZUluY3JlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaGFydE92ZXJsYXlDb21wb25lbnQucHJvdG90eXBlLCBcImF4aXNMYWJlbENvbG9yXCIsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2F4aXNMYWJlbENvbG9yID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIENoYXJ0T3ZlcmxheUNvbXBvbmVudDtcbn0oSFRNTEVsZW1lbnQpKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndml6LW92ZXJsYXknLCBDaGFydE92ZXJsYXlDb21wb25lbnQpO1xuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9QbG90YXJlYU92ZXJsYXkudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==