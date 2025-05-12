/******/ var __webpack_modules__ = ({

/***/ 2770:
/***/ (function() {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true });
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default');
    }
  } catch (e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      origPrevent = evt.preventDefault;
      evt.preventDefault = function() {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return true;
            }
          });
        } catch (e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();


/***/ }),

/***/ 8573:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var arrow = function (_, classNames) { return "<div class=\"" + classNames.arrow + "\" role=\"presentation\"></div>"; };
exports["default"] = arrow;
//# sourceMappingURL=arrow.js.map

/***/ }),

/***/ 5714:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var composeClassName_1 = __webpack_require__(3471);
var group_1 = __webpack_require__(847);
function body(state, classNames) {
    var className = composeClassName_1.default([
        classNames.body,
        [state.isAtTop, classNames.bodyAtTop],
        [state.isAtBottom, classNames.bodyAtBottom],
        [state.isScrollable, classNames.bodyScrollable]
    ]);
    var styleAttr = state.isOpen ?
        "style=\"max-height: " + state.maxBodyHeight + "px;\"" : '';
    return ("\n        <div\n            class=\"" + className + "\"\n            data-ref=\"body\"\n            role=\"listbox\"\n            " + (state.isOpen ? '' : 'aria-hidden') + "\n        >\n            <div class=\"" + classNames.itemsList + "\"\n                data-ref=\"itemsList\"\n                " + styleAttr + ">\n                " + state.groups.map(function (groupState) { return group_1.default(groupState, state, classNames); }).join('') + "\n            </div>\n            <div class=" + classNames.gradientTop + " role=\"presentation\"></div>\n            <div class=" + classNames.gradientBottom + " role=\"presentation\"></div>\n        </div>\n    ");
}
exports["default"] = body;
//# sourceMappingURL=body.js.map

/***/ }),

/***/ 847:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var composeClassName_1 = __webpack_require__(3471);
var option_1 = __webpack_require__(2295);
var group = function (groupState, state, classNames) {
    var className = composeClassName_1.default([
        classNames.group,
        [groupState.isDisabled, classNames.groupDisabled],
        [groupState.hasLabel, classNames.groupHasLabel]
    ]);
    return ("\n        <div class=\"" + className + "\" data-ref=\"group\" role=\"group\">\n            " + (groupState.hasLabel ?
        "<div class=\"" + classNames.groupLabel + "\" data-ref=\"item\">" + groupState.label + "</div>" : '') + "\n            " + groupState.options.map(function (optionState) { return option_1.default(optionState, state, classNames); }).join('') + "\n        </div>\n    ");
};
exports["default"] = group;
//# sourceMappingURL=group.js.map

/***/ }),

/***/ 3348:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var arrow_1 = __webpack_require__(8573);
var value_1 = __webpack_require__(8441);
var head = function (state, classNames) { return ("\n    <div class=\"" + classNames.head + "\" data-ref=\"head\">\n        " + value_1.default(state, classNames) + "\n        " + arrow_1.default(state, classNames) + "\n        <select class=\"" + classNames.select + "\" data-ref=\"select\"></select>\n    </div>\n"); };
exports["default"] = head;
//# sourceMappingURL=head.js.map

/***/ }),

/***/ 2295:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var composeClassName_1 = __webpack_require__(3471);
function option(optionState, state, classNames) {
    var isSelected = state.selectedOption === optionState;
    var className = composeClassName_1.default([
        classNames.option,
        [isSelected, classNames.optionSelected],
        [optionState === state.focusedOption, classNames.optionFocused],
        [optionState.isDisabled, classNames.optionDisabled]
    ]);
    return ("\n        <div\n            class=\"" + className + "\"\n            data-ref=\"option item\"\n            role=\"option\"\n            title=\"" + optionState.label + "\"\n            " + (isSelected ? 'aria-selected="true"' : '') + "\n            " + (optionState.isDisabled ? 'aria-disabled="true"' : '') + "\n            >\n                " + optionState.label + "\n        </div>\n    ");
}
exports["default"] = option;
//# sourceMappingURL=option.js.map

/***/ }),

/***/ 7138:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var composeClassName_1 = __webpack_require__(3471);
var body_1 = __webpack_require__(5714);
var head_1 = __webpack_require__(3348);
var root = function (state, classNames) {
    var className = composeClassName_1.default([
        classNames.root,
        [state.isDisabled, classNames.rootDisabled],
        [state.isInvalid, classNames.rootInvalid],
        [state.isOpen, classNames.rootOpen],
        [state.isFocused, classNames.rootFocused],
        [state.hasValue, classNames.rootHasValue],
        [state.isOpenAbove, classNames.rootOpenAbove],
        [state.isOpenBelow, classNames.rootOpenBelow],
        [state.isUseNativeMode, classNames.rootNative]
    ]);
    return ("\n        <div\n            class=\"" + className + "\"\n            role=\"widget combobox\"\n            aria-haspopup=\"listbox\"\n            " + (state.isOpen ? 'aria-expanded="true"' : '') + "\n            " + (state.isRequired ? 'aria-required="true"' : '') + "\n            " + (state.isDisabled ? 'aria-disabled="true"' : '') + "\n            " + (state.isInvalid ? 'aria-invalid="true"' : '') + "\n        >\n            " + head_1.default(state, classNames) + "\n            " + (state.isUseNativeMode ? '' : body_1.default(state, classNames)) + "\n        </div>\n    ");
};
exports["default"] = root;
//# sourceMappingURL=root.js.map

/***/ }),

/***/ 8441:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var value = function (state, classNames) {
    return ("\n        <div\n            class=\"" + classNames.value + "\"\n            data-ref=\"value\"\n            " + (state.isPlaceholderShown ? "aria-placeholder=\"" + state.humanReadableValue + "\"" : '') + "\n        >\n            " + state.humanReadableValue + "\n        </div>\n    ");
};
exports["default"] = value;
//# sourceMappingURL=value.js.map

/***/ }),

/***/ 686:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Behavior = /** @class */ (function () {
    function Behavior() {
        this.showPlaceholderWhenOpen = false;
        this.openOnFocus = false;
        this.closeOnSelect = true;
        this.useNativeUiOnMobile = true;
        this.loop = false;
        this.clampMaxVisibleItems = true;
        this.liveUpdates = false;
        this.maxVisibleItems = 15;
        Object.seal(this);
    }
    return Behavior;
}());
exports["default"] = Behavior;
//# sourceMappingURL=Behavior.js.map

/***/ }),

/***/ 7558:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Callbacks = /** @class */ (function () {
    function Callbacks() {
        this.onOpen = null;
        this.onClose = null;
        this.onSelect = null;
        this.onOptionClick = null;
        Object.seal(this);
    }
    return Callbacks;
}());
exports["default"] = Callbacks;
//# sourceMappingURL=Callbacks.js.map

/***/ }),

/***/ 9324:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var ClassNames = /** @class */ (function () {
    function ClassNames() {
        this.root = 'edd-root';
        this.rootOpen = 'edd-root-open';
        this.rootOpenAbove = 'edd-root-open-above';
        this.rootOpenBelow = 'edd-root-open-below';
        this.rootDisabled = 'edd-root-disabled';
        this.rootInvalid = 'edd-root-invalid';
        this.rootFocused = 'edd-root-focused';
        this.rootHasValue = 'edd-root-has-value';
        this.rootNative = 'edd-root-native';
        this.gradientTop = 'edd-gradient-top';
        this.gradientBottom = 'edd-gradient-bottom';
        this.head = 'edd-head';
        this.value = 'edd-value';
        this.arrow = 'edd-arrow';
        this.select = 'edd-select';
        this.body = 'edd-body';
        this.bodyScrollable = 'edd-body-scrollable';
        this.bodyAtTop = 'edd-body-at-top';
        this.bodyAtBottom = 'edd-body-at-bottom';
        this.itemsList = 'edd-items-list';
        this.group = 'edd-group';
        this.groupDisabled = 'edd-group-disabled';
        this.groupHasLabel = 'edd-group-has-label';
        this.groupLabel = 'edd-group-label';
        this.option = 'edd-option';
        this.optionDisabled = 'edd-option-disabled';
        this.optionFocused = 'edd-option-focused';
        this.optionSelected = 'edd-option-selected';
        Object.seal(this);
    }
    return ClassNames;
}());
exports["default"] = ClassNames;
//# sourceMappingURL=ClassNames.js.map

/***/ }),

/***/ 7178:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Behavior_1 = __webpack_require__(686);
var Callbacks_1 = __webpack_require__(7558);
var ClassNames_1 = __webpack_require__(9324);
var Config = /** @class */ (function () {
    function Config() {
        this.callbacks = new Callbacks_1.default();
        this.classNames = new ClassNames_1.default();
        this.behavior = new Behavior_1.default();
        Object.seal(this);
    }
    return Config;
}());
exports["default"] = Config;
//# sourceMappingURL=Config.js.map

/***/ }),

/***/ 204:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var helpful_merge_1 = __webpack_require__(9117);
var Config_1 = __webpack_require__(7178);
var bindEvents_1 = __webpack_require__(8175);
var Renderer_1 = __webpack_require__(2124);
var dispatchOpen_1 = __webpack_require__(9146);
var pollForSelectChange_1 = __webpack_require__(6358);
var pollForSelectMutation_1 = __webpack_require__(2101);
var closeOthers_1 = __webpack_require__(1174);
var scrollToView_1 = __webpack_require__(8436);
var StateManager_1 = __webpack_require__(9837);
var StateMapper_1 = __webpack_require__(8421);
var cache_1 = __webpack_require__(6461);
var Timers_1 = __webpack_require__(9897);
var Easydropdown = /** @class */ (function () {
    function Easydropdown(selectElement, options) {
        this.config = helpful_merge_1.default(new Config_1.default(), options, true);
        this.state = StateMapper_1.default.mapFromSelect(selectElement, this.config);
        this.renderer = new Renderer_1.default(this.config.classNames);
        this.dom = this.renderer.render(this.state, selectElement);
        this.timers = new Timers_1.default();
        this.actions = StateManager_1.default.proxyActions(this.state, {
            closeOthers: closeOthers_1.default.bind(null, this, cache_1.default),
            scrollToView: scrollToView_1.default.bind(null, this.dom, this.timers)
        }, this.handleStateUpdate.bind(this));
        this.eventBindings = bindEvents_1.default({
            actions: this.actions,
            config: this.config,
            dom: this.dom,
            state: this.state,
            timers: this.timers
        });
        this.timers.pollChangeIntervalId = pollForSelectChange_1.default(this.dom.select, this.state, this.actions, this.config);
        if (this.config.behavior.liveUpdates) {
            this.timers.pollMutationIntervalId = pollForSelectMutation_1.default(this.dom.select, this.state, this.refresh.bind(this));
        }
    }
    Object.defineProperty(Easydropdown.prototype, "selectElement", {
        get: function () {
            return this.dom.select;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Easydropdown.prototype, "value", {
        get: function () {
            return this.state.value;
        },
        set: function (nextValue) {
            if (typeof nextValue !== 'string') {
                throw new TypeError('[EasyDropDown] Provided value not a valid string');
            }
            this.dom.select.value = nextValue;
        },
        enumerable: true,
        configurable: true
    });
    Easydropdown.prototype.open = function () {
        dispatchOpen_1.default(this.actions, this.config, this.dom);
    };
    Easydropdown.prototype.close = function () {
        this.actions.close();
    };
    Easydropdown.prototype.refresh = function () {
        this.state = helpful_merge_1.default(this.state, StateMapper_1.default.mapFromSelect(this.dom.select, this.config));
        this.renderer.update(this.state);
        this.dom.group.length = this.dom.option.length = this.dom.item.length = 0;
        Renderer_1.default.queryDomRefs(this.dom, ['group', 'option', 'item']);
    };
    Easydropdown.prototype.validate = function () {
        if (!this.state.isRequired || this.state.hasValue) {
            return true;
        }
        this.actions.invalidate();
        return false;
    };
    Easydropdown.prototype.destroy = function () {
        this.timers.clear();
        this.eventBindings.forEach(function (binding) { return binding.unbind(); });
        this.renderer.destroy();
        var cacheIndex = cache_1.default.indexOf(this);
        cache_1.default.splice(cacheIndex, 1);
    };
    Easydropdown.prototype.handleStateUpdate = function (state, key) {
        var callbacks = this.config.callbacks;
        this.renderer.update(state, key);
        switch (key) {
            case 'bodyStatus': {
                var cb = void 0;
                if (state.isOpen) {
                    cb = callbacks.onOpen;
                }
                else {
                    cb = callbacks.onClose;
                }
                if (typeof cb === 'function')
                    cb();
                break;
            }
            case 'selectedIndex': {
                var cb = callbacks.onSelect;
                if (typeof cb === 'function')
                    cb(state.value);
                break;
            }
            case 'isClickSelecting': {
                var cb = callbacks.onOptionClick;
                if (state[key] === false) {
                    var nextValue = state.getOptionFromIndex(state.focusedIndex).value;
                    if (typeof cb === 'function')
                        cb(nextValue);
                }
            }
        }
    };
    return Easydropdown;
}());
exports["default"] = Easydropdown;
//# sourceMappingURL=Easydropdown.js.map

/***/ }),

/***/ 1086:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var EasydropdownFacade = /** @class */ (function () {
    function EasydropdownFacade(implementation) {
        this.open = implementation.open.bind(implementation);
        this.close = implementation.close.bind(implementation);
        this.refresh = implementation.refresh.bind(implementation);
        this.destroy = implementation.destroy.bind(implementation);
        this.validate = implementation.validate.bind(implementation);
        Object.defineProperties(this, {
            value: {
                get: function () { return implementation.value; },
                set: function (nextValue) { return implementation.value = nextValue; }
            }
        });
    }
    return EasydropdownFacade;
}());
exports["default"] = EasydropdownFacade;
//# sourceMappingURL=EasydropdownFacade.js.map

/***/ }),

/***/ 9897:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Timers = /** @class */ (function () {
    function Timers() {
    }
    Timers.prototype.clear = function () {
        var _this = this;
        Object.keys(this).forEach(function (key) { return window.clearInterval(_this[key]); });
    };
    return Timers;
}());
exports["default"] = Timers;
//# sourceMappingURL=Timers.js.map

/***/ }),

/***/ 6461:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var cache = [];
exports["default"] = cache;
//# sourceMappingURL=cache.js.map

/***/ }),

/***/ 3065:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var cache_1 = __webpack_require__(6461);
var Easydropdown_1 = __webpack_require__(204);
var EasydropdownFacade_1 = __webpack_require__(1086);
function factory(selectElementOrSelector, options) {
    if (options === void 0) { options = {}; }
    var selectElement = selectElementOrSelector;
    if (typeof selectElementOrSelector === 'string') {
        selectElement = document.querySelector(selectElementOrSelector);
    }
    if (!(selectElement instanceof HTMLSelectElement)) {
        throw new TypeError('[EasyDropDown] Invalid select element provided');
    }
    if (selectElement.multiple) {
        throw new Error('[EasyDropDown] EasyDropDown does not support the `multiple`' +
            ' attribute on select elements.');
    }
    for (var _i = 0, cache_2 = cache_1.default; _i < cache_2.length; _i++) {
        var cachedInstance = cache_2[_i];
        if (cachedInstance.selectElement === selectElement) {
            return new EasydropdownFacade_1.default(cachedInstance);
        }
    }
    var instance = new Easydropdown_1.default(selectElement, options);
    // @ts-ignore
    cache_1.default.push(instance);
    return new EasydropdownFacade_1.default(instance);
}
function decorateFactory(factoryFn) {
    factoryFn.all = function (options) {
        if (options === void 0) { options = {}; }
        var selects = document.querySelectorAll('select');
        Array.prototype.forEach.call(selects, function (select) {
            var instance = factory(select, options);
            return instance;
        });
    };
    factoryFn.destroy = function () {
        var cacheCopy = cache_1.default.slice();
        cacheCopy.forEach(function (instance) { return instance.destroy(); });
    };
    return factoryFn;
}
var decoratedFactory = decorateFactory(factory);
exports["default"] = decoratedFactory;
//# sourceMappingURL=factory.js.map

/***/ }),

/***/ 7472:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UP = 38;
exports.DOWN = 40;
exports.SPACE = 32;
exports.ENTER = 13;
exports.ESC = 27;
//# sourceMappingURL=KeyCodes.js.map

/***/ }),

/***/ 385:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OPTION = '[data-ref~="option"]';
//# sourceMappingURL=Selectors.js.map

/***/ }),

/***/ 4080:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var helpful_merge_1 = __webpack_require__(9117);
var EventBinding = /** @class */ (function () {
    function EventBinding(eventBindingRaw) {
        this.type = '';
        this.target = null;
        this.debounce = 0;
        this.throttle = 0;
        this.handler = null;
        this.boundHandler = null;
        this.passive = false;
        helpful_merge_1.default(this, eventBindingRaw);
        Object.seal(this);
    }
    EventBinding.prototype.unbind = function () {
        if (!this.target)
            return;
        this.target.removeEventListener(this.type, this.boundHandler);
    };
    return EventBinding;
}());
exports["default"] = EventBinding;
//# sourceMappingURL=EventBinding.js.map

/***/ }),

/***/ 7569:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var closestParent_1 = __webpack_require__(8061);
var Selectors = __webpack_require__(385);
function handleBodyClick(e, _a) {
    var state = _a.state, actions = _a.actions, dom = _a.dom, config = _a.config;
    e.stopPropagation();
    var option = closestParent_1.default(e.target, Selectors.OPTION, true);
    if (!option)
        return;
    var optionIndex = Array.prototype.indexOf.call(dom.option, option);
    actions.selectOption(optionIndex, config.behavior.closeOnSelect);
}
exports["default"] = handleBodyClick;
//# sourceMappingURL=handleBodyClick.js.map

/***/ }),

/***/ 2630:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var closestParent_1 = __webpack_require__(8061);
var Selectors = __webpack_require__(385);
function handleBodyMousedown(e, _a) {
    var actions = _a.actions;
    e.stopPropagation();
    var option = closestParent_1.default(e.target, Selectors.OPTION, true);
    if (!option)
        return;
    actions.startClickSelecting();
}
exports["default"] = handleBodyMousedown;
//# sourceMappingURL=handleBodyMousedown.js.map

/***/ }),

/***/ 1492:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var closestParent_1 = __webpack_require__(8061);
var Selectors = __webpack_require__(385);
function handleBodyMouseover(e, _a) {
    var state = _a.state, actions = _a.actions, dom = _a.dom;
    e.stopPropagation();
    var option = closestParent_1.default(e.target, Selectors.OPTION, true);
    if (!option || state.isKeying)
        return;
    var optionIndex = Array.prototype.indexOf.call(dom.option, option);
    actions.focusOption(optionIndex);
}
exports["default"] = handleBodyMouseover;
//# sourceMappingURL=handleBodyMouseover.js.map

/***/ }),

/***/ 507:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var dispatchOpen_1 = __webpack_require__(9146);
var getIsMobilePlatform_1 = __webpack_require__(4867);
function handleHeadClick(injectedGetIsMobilePlatform, e, _a) {
    var state = _a.state, actions = _a.actions, dom = _a.dom, config = _a.config;
    if (state.isUseNativeMode)
        return;
    var isMobilePlatform = injectedGetIsMobilePlatform(window.navigator.userAgent);
    e.stopPropagation();
    if (state.isClosed) {
        dispatchOpen_1.default(actions, config, dom);
        if (isMobilePlatform) {
            actions.focus();
        }
        else {
            dom.select.focus();
        }
    }
    else {
        actions.close();
    }
}
exports.handleHeadClick = handleHeadClick;
var boundHandleHeadClick = handleHeadClick.bind(null, getIsMobilePlatform_1.default);
exports["default"] = boundHandleHeadClick;
//# sourceMappingURL=handleHeadClick.js.map

/***/ }),

/***/ 1456:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function handleItemsListScroll(e, _a) {
    var state = _a.state, actions = _a.actions, dom = _a.dom;
    e.stopPropagation();
    var _b = dom.itemsList, offsetHeight = _b.offsetHeight, scrollHeight = _b.scrollHeight, scrollTop = _b.scrollTop;
    if (scrollTop === 0) {
        actions.topOut();
    }
    else if (scrollTop === scrollHeight - offsetHeight) {
        actions.bottomOut();
    }
    else {
        actions.scroll();
    }
}
exports["default"] = handleItemsListScroll;
//# sourceMappingURL=handleItemsListScroll.js.map

/***/ }),

/***/ 6704:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function handleSelectBlur(e, _a) {
    var actions = _a.actions, state = _a.state, config = _a.config;
    if (state.isKeying)
        return;
    actions.blur();
    if (config.behavior.openOnFocus && !state.isClickSelecting)
        actions.close();
}
exports["default"] = handleSelectBlur;
//# sourceMappingURL=handleSelectBlur.js.map

/***/ }),

/***/ 6969:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var dispatchOpen_1 = __webpack_require__(9146);
function handleSelectFocus(e, _a) {
    var actions = _a.actions, config = _a.config, dom = _a.dom, state = _a.state;
    actions.focus();
    if (config.behavior.openOnFocus && !state.isUseNativeMode) {
        dispatchOpen_1.default(actions, config, dom);
    }
}
exports["default"] = handleSelectFocus;
//# sourceMappingURL=handleSelectFocus.js.map

/***/ }),

/***/ 5010:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function handleSelectInvalid(e, _a) {
    var actions = _a.actions, config = _a.config, dom = _a.dom;
    actions.invalidate();
}
exports["default"] = handleSelectInvalid;
//# sourceMappingURL=handleSelectInvalid.js.map

/***/ }),

/***/ 2218:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var dispatchOpen_1 = __webpack_require__(9146);
var killSelectReaction_1 = __webpack_require__(8563);
var KeyCodes = __webpack_require__(7472);
var handleSelectKeydownDown_1 = __webpack_require__(1482);
var handleSelectKeydownUp_1 = __webpack_require__(9411);
function handleSelectKeydown(e, handlerParams) {
    var keyCode = e.keyCode, target = e.target;
    var state = handlerParams.state, actions = handlerParams.actions, dom = handlerParams.dom, config = handlerParams.config;
    if (state.isUseNativeMode || state.isDisabled)
        return;
    switch (keyCode) {
        case KeyCodes.DOWN:
            handleSelectKeydownDown_1.default(e, handlerParams);
            break;
        case KeyCodes.UP:
            handleSelectKeydownUp_1.default(e, handlerParams);
            break;
        case KeyCodes.SPACE:
            if (state.isSearching) {
                e.stopPropagation();
                return;
            }
        case KeyCodes.ENTER:
            e.stopPropagation();
            e.preventDefault();
            killSelectReaction_1.default(target, handlerParams);
            if (state.isOpen) {
                actions.selectOption(state.focusedIndex, config.behavior.closeOnSelect);
            }
            else {
                dispatchOpen_1.default(actions, config, dom);
            }
            break;
        case KeyCodes.ESC:
            actions.close();
            break;
    }
}
exports["default"] = handleSelectKeydown;
//# sourceMappingURL=handleSelectKeydown.js.map

/***/ }),

/***/ 1482:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var dispatchOpen_1 = __webpack_require__(9146);
var killSelectReaction_1 = __webpack_require__(8563);
function handleSelectKeydownDown(e, handlerParams) {
    var metaKey = e.metaKey, target = e.target;
    var state = handlerParams.state, dom = handlerParams.dom, actions = handlerParams.actions, config = handlerParams.config;
    var focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;
    var iterations = 0;
    var incrementAmount = 1;
    e.preventDefault();
    killSelectReaction_1.default(target, handlerParams);
    if (metaKey) {
        incrementAmount = Math.round(Math.max(state.totalOptions / 2, config.behavior.maxVisibleItems));
    }
    do {
        focusedIndex += incrementAmount;
        incrementAmount = 1;
        if (focusedIndex >= state.totalOptions) {
            focusedIndex = config.behavior.loop ? 0 : state.totalOptions - 1;
        }
        actions.focusOption(focusedIndex, true);
        iterations++;
    } while (state.focusedOption &&
        state.focusedOption.isDisabled &&
        iterations <= state.totalOptions);
    if (state.isClosed) {
        dispatchOpen_1.default(actions, config, dom);
        return;
    }
}
exports["default"] = handleSelectKeydownDown;
//# sourceMappingURL=handleSelectKeydownDown.js.map

/***/ }),

/***/ 9411:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var dispatchOpen_1 = __webpack_require__(9146);
var killSelectReaction_1 = __webpack_require__(8563);
function handleSelectKeydownUp(e, handlerParams) {
    var metaKey = e.metaKey, target = e.target;
    var state = handlerParams.state, config = handlerParams.config, dom = handlerParams.dom, actions = handlerParams.actions;
    var focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;
    var iterations = 0;
    var incrementAmount = 1;
    e.preventDefault();
    killSelectReaction_1.default(target, handlerParams);
    if (metaKey) {
        incrementAmount = Math.round(Math.max(state.totalOptions / 2, config.behavior.maxVisibleItems));
    }
    do {
        focusedIndex -= incrementAmount;
        incrementAmount = 1;
        if (focusedIndex < 0) {
            focusedIndex = config.behavior.loop ? state.totalOptions - 1 : 0;
        }
        actions.focusOption(focusedIndex, true);
        iterations++;
    } while (state.focusedOption &&
        state.focusedOption.isDisabled &&
        iterations < state.totalOptions);
    if (state.isClosed) {
        dispatchOpen_1.default(actions, config, dom);
    }
}
exports["default"] = handleSelectKeydownUp;
//# sourceMappingURL=handleSelectKeydownUp.js.map

/***/ }),

/***/ 3775:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var KeyCodes = __webpack_require__(7472);
var SEARCH_RESET_DURATION = 1200;
function handleSelectKeypress(_a, _b, searchResetDuration) {
    var keyCode = _a.keyCode;
    var actions = _b.actions, timers = _b.timers, state = _b.state;
    if (searchResetDuration === void 0) { searchResetDuration = SEARCH_RESET_DURATION; }
    if (state.isUseNativeMode || [KeyCodes.UP, KeyCodes.DOWN].includes(keyCode))
        return;
    window.clearTimeout(timers.searchTimeoutId);
    actions.search();
    timers.searchTimeoutId = window.setTimeout(function () { return actions.resetSearch(); }, searchResetDuration);
}
exports["default"] = handleSelectKeypress;
//# sourceMappingURL=handleSelectKeypress.js.map

/***/ }),

/***/ 7841:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function handleWindowClick(_, _a) {
    var state = _a.state, actions = _a.actions, dom = _a.dom;
    if (!state.isOpen)
        return;
    actions.close();
    dom.select.blur();
}
exports["default"] = handleWindowClick;
//# sourceMappingURL=handleWindowClick.js.map

/***/ }),

/***/ 8175:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var throttle_1 = __webpack_require__(8900);
var EventBinding_1 = __webpack_require__(4080);
var getEventsList_1 = __webpack_require__(1920);
function bindEvent(handlerParams, eventBindingRaw) {
    var eventBinding = new EventBinding_1.default(eventBindingRaw);
    if (!eventBinding.target)
        return eventBinding;
    var boundHandler = function (e) { return eventBinding.handler(e, handlerParams); };
    if (eventBinding.throttle > 0) {
        eventBinding.boundHandler = throttle_1.default(boundHandler, eventBinding.throttle);
    }
    else {
        eventBinding.boundHandler = boundHandler;
    }
    eventBinding.target.addEventListener(eventBinding.type, eventBinding.boundHandler);
    return eventBinding;
}
exports.bindEvent = bindEvent;
function bindEvents(handlerParams) {
    return getEventsList_1.default(handlerParams.dom).map(bindEvent.bind(null, handlerParams));
}
exports["default"] = bindEvents;
//# sourceMappingURL=bindEvents.js.map

/***/ }),

/***/ 1920:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var handleBodyClick_1 = __webpack_require__(7569);
var handleBodyMousedown_1 = __webpack_require__(2630);
var handleBodyMouseover_1 = __webpack_require__(1492);
var handleHeadClick_1 = __webpack_require__(507);
var handleItemsListScroll_1 = __webpack_require__(1456);
var handleSelectBlur_1 = __webpack_require__(6704);
var handleSelectFocus_1 = __webpack_require__(6969);
var handleSelectInvalid_1 = __webpack_require__(5010);
var handleSelectKeydown_1 = __webpack_require__(2218);
var handleSelectKeypress_1 = __webpack_require__(3775);
var handleWindowClick_1 = __webpack_require__(7841);
var handleWindowClick_2 = __webpack_require__(7841);
var getEventsList = function (dom) { return [
    {
        target: dom.head,
        type: 'click',
        handler: handleHeadClick_1.default
    },
    {
        target: dom.body,
        type: 'mousedown',
        handler: handleBodyMousedown_1.default
    },
    {
        target: dom.body,
        type: 'click',
        handler: handleBodyClick_1.default
    },
    {
        target: dom.body,
        type: 'mouseover',
        handler: handleBodyMouseover_1.default
    },
    {
        target: dom.itemsList,
        type: 'scroll',
        handler: handleItemsListScroll_1.default
    },
    {
        target: dom.select,
        type: 'keydown',
        handler: handleSelectKeydown_1.default
    },
    {
        target: dom.select,
        type: 'invalid',
        handler: handleSelectInvalid_1.default
    },
    {
        target: dom.select,
        type: 'keypress',
        handler: handleSelectKeypress_1.default
    },
    {
        target: dom.select,
        type: 'focus',
        handler: handleSelectFocus_1.default
    },
    {
        target: dom.select,
        type: 'blur',
        handler: handleSelectBlur_1.default
    },
    {
        target: document.documentElement,
        type: 'click',
        handler: handleWindowClick_1.default
    },
    {
        target: window,
        type: 'resize',
        handler: handleWindowClick_2.default,
        throttle: 100
    }
]; };
exports["default"] = getEventsList;
//# sourceMappingURL=getEventsList.js.map

/***/ }),

/***/ 5473:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var AttributeChangeType;
(function (AttributeChangeType) {
    AttributeChangeType["ADD"] = "ADD";
    AttributeChangeType["EDIT"] = "EDIT";
    AttributeChangeType["REMOVE"] = "REMOVE";
})(AttributeChangeType || (AttributeChangeType = {}));
exports["default"] = AttributeChangeType;
//# sourceMappingURL=AttributeChangeType.js.map

/***/ }),

/***/ 2289:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var DomChangeType;
(function (DomChangeType) {
    DomChangeType["NONE"] = "NONE";
    DomChangeType["FULL"] = "FULL";
    DomChangeType["REPLACE"] = "REPLACE";
    DomChangeType["INNER"] = "INNER";
    DomChangeType["OUTER"] = "OUTER";
})(DomChangeType = exports.DomChangeType || (exports.DomChangeType = {}));
exports["default"] = DomChangeType;
//# sourceMappingURL=DomChangeType.js.map

/***/ }),

/***/ 3955:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Dom = /** @class */ (function () {
    function Dom() {
        this.select = null;
        this.root = null;
        this.head = null;
        this.value = null;
        this.body = null;
        this.arrow = null;
        this.itemsList = null;
        this.item = [];
        this.group = [];
        this.option = [];
    }
    Dom.prototype.sumItemsHeight = function (max) {
        if (max === void 0) { max = Infinity; }
        var totalHeight = 0;
        for (var i = 0, item = void 0; (item = this.item[i]); i++) {
            if (i === max)
                break;
            totalHeight += item.offsetHeight;
        }
        return totalHeight;
    };
    return Dom;
}());
exports["default"] = Dom;
//# sourceMappingURL=Dom.js.map

/***/ }),

/***/ 1612:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var PatchCommand = /** @class */ (function () {
    function PatchCommand() {
        this.newNode = null;
        this.newInnerHtml = '';
        this.newTextContent = '';
        this.attributeChanges = [];
        this.childCommands = [];
        this.index = null;
    }
    return PatchCommand;
}());
exports["default"] = PatchCommand;
//# sourceMappingURL=PatchCommand.js.map

/***/ }),

/***/ 2124:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var root_1 = __webpack_require__(7138);
var createDomElementFromHtml_1 = __webpack_require__(193);
var Dom_1 = __webpack_require__(3955);
var domDiff_1 = __webpack_require__(8440);
var domPatch_1 = __webpack_require__(8509);
var Renderer = /** @class */ (function () {
    function Renderer(classNames) {
        this.dom = new Dom_1.default();
        this.classNames = classNames;
    }
    Renderer.prototype.render = function (state, selectElement) {
        var html = root_1.default(state, this.classNames);
        var rootElement = createDomElementFromHtml_1.default(html);
        this.dom = new Dom_1.default();
        this.dom.root = rootElement;
        this.dom.option.length = this.dom.group.length = 0;
        Renderer.queryDomRefs(this.dom);
        this.injectSelect(selectElement);
        return this.dom;
    };
    Renderer.prototype.update = function (state, key) {
        var nextHtml = root_1.default(state, this.classNames);
        var nextRoot = createDomElementFromHtml_1.default(nextHtml);
        var diffCommand = domDiff_1.default(this.dom.root, nextRoot);
        domPatch_1.default(this.dom.root, diffCommand);
        if (key === 'selectedIndex') {
            this.syncSelectWithValue(state.value);
        }
    };
    Renderer.prototype.destroy = function () {
        this.dom.select.classList.remove(this.classNames.select);
        try {
            this.dom.root.parentElement.replaceChild(this.dom.select, this.dom.root);
        }
        catch (err) { /**/ }
    };
    Renderer.prototype.injectSelect = function (selectElement) {
        var parent = selectElement.parentElement;
        var tempSelect = this.dom.select;
        if (!parent)
            throw new Error('[EasyDropDown] The provided `<select>` element must exist within a document');
        parent.replaceChild(this.dom.root, selectElement);
        tempSelect.parentElement.replaceChild(selectElement, tempSelect);
        selectElement.className = this.classNames.select;
        selectElement.setAttribute('aria-hidden', 'true');
        this.dom.select = selectElement;
    };
    Renderer.prototype.syncSelectWithValue = function (value) {
        if (this.dom.select.value === value)
            return;
        var event = new CustomEvent('change', {
            bubbles: true
        });
        this.dom.select.value = value;
        this.dom.select.dispatchEvent(event);
    };
    Renderer.queryDomRefs = function (dom, keys) {
        if (keys === void 0) { keys = Object.keys(dom); }
        return keys
            .reduce(function (localDom, ref) {
            var selector = "[data-ref~=\"" + ref + "\"]";
            var elements = localDom.root.querySelectorAll(selector);
            if (elements.length < 1 || ref === 'root')
                return localDom;
            var element = elements[0];
            var value = localDom[ref];
            if (value === null) {
                localDom[ref] = element;
            }
            else if (Array.isArray(value)) {
                Array.prototype.push.apply(value, elements);
            }
            return localDom;
        }, dom);
    };
    return Renderer;
}());
exports["default"] = Renderer;
//# sourceMappingURL=Renderer.js.map

/***/ }),

/***/ 8440:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var helpful_merge_1 = __webpack_require__(9117);
var AttributeChangeType_1 = __webpack_require__(5473);
var DomChangeType_1 = __webpack_require__(2289);
var PatchCommand_1 = __webpack_require__(1612);
function domDiff(prev, next) {
    var totalChildNodes = -1;
    var command = new PatchCommand_1.default();
    if (prev instanceof HTMLSelectElement) {
        command.type = DomChangeType_1.default.NONE;
        return command;
    }
    if (prev instanceof Text && next instanceof Text) {
        if (prev.textContent === next.textContent) {
            command.type = DomChangeType_1.default.NONE;
        }
        else {
            command.type = DomChangeType_1.default.INNER;
            command.newTextContent = next.textContent;
        }
    }
    else if (prev instanceof HTMLElement && next instanceof HTMLElement) {
        if (prev.tagName !== next.tagName) {
            command.type = DomChangeType_1.default.REPLACE;
            command.newNode = next;
        }
        else if (prev.outerHTML === next.outerHTML) {
            command.type = DomChangeType_1.default.NONE;
        }
        else if (prev.innerHTML === next.innerHTML) {
            helpful_merge_1.default(command, diffAttributeChanges(prev, next));
        }
        else {
            helpful_merge_1.default(command, diffAttributeChanges(prev, next));
            if (command.attributeChanges.length > 0) {
                command.type = DomChangeType_1.default.FULL;
            }
            else {
                command.type = DomChangeType_1.default.INNER;
            }
            if ((totalChildNodes = prev.childNodes.length) > 0 && totalChildNodes === next.childNodes.length) {
                for (var i = 0, childNode = void 0; (childNode = prev.childNodes[i]); i++) {
                    command.childCommands.push(domDiff(childNode, next.childNodes[i]));
                }
            }
            else {
                command.newInnerHtml = next.innerHTML;
            }
        }
    }
    else {
        command.type = DomChangeType_1.default.REPLACE;
        command.newNode = next;
    }
    return command;
}
function diffAttributeChanges(prev, next) {
    var totalAttributes = Math.max(prev.attributes.length, next.attributes.length);
    var attributesMap = {};
    var undef = void (0);
    var attributeChanges = [];
    for (var i = 0; i < totalAttributes; i++) {
        var attr1 = prev.attributes[i];
        var attr2 = next.attributes[i];
        if (attr1 && attributesMap[attr1.name] === undef) {
            attributesMap[attr1.name] = [];
        }
        if (attr2 && attributesMap[attr2.name] === undef) {
            attributesMap[attr2.name] = [];
        }
        if (attr1)
            attributesMap[attr1.name][0] = attr1.value;
        if (attr2)
            attributesMap[attr2.name][1] = attr2.value;
    }
    var keys = Object.keys(attributesMap);
    if (keys.length > 1) {
        keys.sort();
    }
    for (var i = 0, key = void 0; (key = keys[i]); i++) {
        var attr = attributesMap[key];
        var change = {
            type: null,
            name: key,
            value: null
        };
        if (attr[0] === attr[1])
            continue;
        if (attr[0] === undef) {
            change.type = AttributeChangeType_1.default.ADD;
            change.value = attr[1];
        }
        else if (attr[1] === undef) {
            change.type = AttributeChangeType_1.default.REMOVE,
                change.value = '';
        }
        else {
            change.type = AttributeChangeType_1.default.EDIT,
                change.value = attr[1];
        }
        attributeChanges.push(change);
    }
    return {
        type: DomChangeType_1.default.OUTER,
        attributeChanges: attributeChanges
    };
}
exports["default"] = domDiff;
//# sourceMappingURL=domDiff.js.map

/***/ }),

/***/ 8509:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var AttributeChangeType_1 = __webpack_require__(5473);
var DomChangeType_1 = __webpack_require__(2289);
function domPatch(node, command) {
    switch (command.type) {
        case DomChangeType_1.default.NONE:
            return node;
        case DomChangeType_1.default.REPLACE:
            node.parentElement.replaceChild(command.newNode, node);
            return command.newNode;
        case DomChangeType_1.default.INNER:
            if (node instanceof Text) {
                node.textContent = command.newTextContent;
            }
            else if (command.childCommands.length > 0) {
                command.childCommands.forEach(function (childCommand, i) { return domPatch(node.childNodes[i], childCommand); });
            }
            else {
                node.innerHTML = command.newInnerHtml;
            }
            return node;
        case DomChangeType_1.default.OUTER:
            patchAttributes(node, command.attributeChanges);
            return node;
        case DomChangeType_1.default.FULL:
            if (command.childCommands.length > 0) {
                command.childCommands.forEach(function (childCommand, i) { return domPatch(node.childNodes[i], childCommand); });
            }
            else {
                node.innerHTML = command.newInnerHtml;
            }
            patchAttributes(node, command.attributeChanges);
            return node;
    }
}
function patchAttributes(el, attributeChanges) {
    var raf = window.requestAnimationFrame;
    attributeChanges.forEach(function (change) {
        if (raf && ['class', 'style'].indexOf(change.name) > -1) {
            raf(function () { return patchAttribute(el, change); });
        }
        else {
            patchAttribute(el, change);
        }
    });
}
function patchAttribute(el, change) {
    switch (change.type) {
        case AttributeChangeType_1.default.ADD:
        case AttributeChangeType_1.default.EDIT:
            el.setAttribute(change.name, change.value);
            break;
        case AttributeChangeType_1.default.REMOVE:
            el.removeAttribute(change.name);
            break;
    }
}
exports["default"] = domPatch;
//# sourceMappingURL=domPatch.js.map

/***/ }),

/***/ 8845:
/***/ (function() {

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}
//# sourceMappingURL=Element.matches.js.map

/***/ }),

/***/ 1428:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var CollisionType;
(function (CollisionType) {
    CollisionType["NONE"] = "NONE";
    CollisionType["TOP"] = "TOP";
    CollisionType["BOTTOM"] = "BOTTOM";
})(CollisionType || (CollisionType = {}));
exports["default"] = CollisionType;
//# sourceMappingURL=CollisionType.js.map

/***/ }),

/***/ 8061:
/***/ (function(__unused_webpack_module, exports) {


/**
 * Returns the closest parent of a given element matching the
 * provided selector, optionally including the element itself.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
function closestParent(el, selector, includeSelf) {
    if (includeSelf === void 0) { includeSelf = false; }
    var parent = el.parentNode;
    if (includeSelf && el.matches(selector)) {
        return el;
    }
    while (parent && parent !== document.body) {
        if (parent.matches && parent.matches(selector)) {
            return parent;
        }
        else if (parent.parentNode) {
            parent = parent.parentNode;
        }
        else {
            return null;
        }
    }
    return null;
}
exports["default"] = closestParent;
//# sourceMappingURL=closestParent.js.map

/***/ }),

/***/ 3471:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function composeClassName(tokens) {
    return tokens
        .reduce(function (classNames, token) {
        if (typeof token === 'string')
            classNames.push(token);
        else {
            var predicate = token[0], className = token[1];
            if (predicate)
                classNames.push(className);
        }
        return classNames;
    }, [])
        .join(' ');
}
exports["default"] = composeClassName;
//# sourceMappingURL=composeClassName.js.map

/***/ }),

/***/ 193:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function createDomElementFromHtml(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.firstElementChild;
}
exports["default"] = createDomElementFromHtml;
//# sourceMappingURL=createDomElementFromHtml.js.map

/***/ }),

/***/ 4219:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var CollisionType_1 = __webpack_require__(1428);
var CLEARSPACE = 10;
function mapCollisionData(deltaTop, deltaBottom, maxHeight, itemHeight) {
    var type = CollisionType_1.default.NONE;
    var maxVisibleItemsOverride = -1;
    if (deltaTop <= maxHeight && deltaBottom <= maxHeight) {
        var largestDelta = Math.max(deltaBottom, deltaTop);
        type = deltaTop < deltaBottom ? CollisionType_1.default.TOP : CollisionType_1.default.BOTTOM;
        maxVisibleItemsOverride = Math.floor(largestDelta / itemHeight);
    }
    else if (deltaTop <= maxHeight) {
        type = CollisionType_1.default.TOP;
    }
    else if (deltaBottom <= maxHeight) {
        type = CollisionType_1.default.BOTTOM;
    }
    return { type: type, maxVisibleItemsOverride: maxVisibleItemsOverride };
}
exports.mapCollisionData = mapCollisionData;
function detectBodyCollision(dom, config) {
    var bbHead = dom.head.getBoundingClientRect();
    var wh = window.innerHeight;
    var deltaTop = bbHead.top - CLEARSPACE;
    var deltaBottom = wh - bbHead.bottom - CLEARSPACE;
    if (dom.option.length < 1)
        return {
            type: CollisionType_1.default.NONE,
            maxVisibleItemsOverride: -1
        };
    var maxVisibleItems = Math.min(config.behavior.maxVisibleItems, dom.item.length);
    var maxHeight = dom.sumItemsHeight(maxVisibleItems);
    var itemHeight = dom.sumItemsHeight(1);
    return mapCollisionData(deltaTop, deltaBottom, maxHeight, itemHeight);
}
exports["default"] = detectBodyCollision;
//# sourceMappingURL=detectBodyCollision.js.map

/***/ }),

/***/ 9146:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var detectBodyCollision_1 = __webpack_require__(4219);
function dispatchOpen(injectedDetectBodyCollision, actions, config, dom) {
    var collisionData = injectedDetectBodyCollision(dom, config);
    var maxVisibleItems = collisionData.maxVisibleItemsOverride > -1 ?
        collisionData.maxVisibleItemsOverride : config.behavior.maxVisibleItems;
    var isScrollable = dom.item.length > maxVisibleItems;
    var maxBodyHeight = dom.sumItemsHeight(maxVisibleItems);
    actions.open(maxBodyHeight, collisionData.type, isScrollable);
}
exports.dispatchOpen = dispatchOpen;
var boundDispatchOpen = dispatchOpen.bind(null, detectBodyCollision_1.default);
exports["default"] = boundDispatchOpen;
//# sourceMappingURL=dispatchOpen.js.map

/***/ }),

/***/ 4867:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function getIsMobilePlatform(userAgent) {
    var isIos = /(ipad|iphone|ipod)/gi.test(userAgent);
    var isAndroid = /android/gi.test(userAgent);
    var isOperaMini = /opera mini/gi.test(userAgent);
    var isWindowsPhone = /windows phone/gi.test(userAgent);
    if (isIos || isAndroid || isOperaMini || isWindowsPhone) {
        return true;
    }
    return false;
}
exports["default"] = getIsMobilePlatform;
//# sourceMappingURL=getIsMobilePlatform.js.map

/***/ }),

/***/ 8563:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var killSelectReaction = function (select, _a) {
    var actions = _a.actions, timers = _a.timers;
    var keyingResetDuration = 100;
    window.clearTimeout(timers.keyingTimeoutId);
    actions.keying();
    timers.keyingTimeoutId = window.setTimeout(function () { return actions.resetKeying(); }, keyingResetDuration);
    select.disabled = true;
    setTimeout(function () {
        select.disabled = false;
        select.focus();
    });
};
exports["default"] = killSelectReaction;
//# sourceMappingURL=killSelectReaction.js.map

/***/ }),

/***/ 6358:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var POLL_INTERVAL_DURATION = 100;
function pollForSelectChange(selectElement, state, actions, config) {
    var lastValue = selectElement.value;
    var pollIntervalId = window.setInterval(function () {
        if (selectElement.value !== lastValue) {
            var selectedIndex = state.getOptionIndexFromValue(selectElement.value);
            actions.selectOption(selectedIndex, config.behavior.closeOnSelect);
            actions.focusOption(selectedIndex, true);
        }
        lastValue = selectElement.value;
    }, POLL_INTERVAL_DURATION);
    return pollIntervalId;
}
exports["default"] = pollForSelectChange;
//# sourceMappingURL=pollForSelectChange.js.map

/***/ }),

/***/ 2101:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var POLL_INTERVAL_DURATION = 300;
function pollForSelectMutation(selectElement, state, handleMutation) {
    var lastOuterHtml = selectElement.outerHTML;
    var pollIntervalId = window.setInterval(function () {
        var outerHTML = selectElement.outerHTML;
        if (outerHTML !== lastOuterHtml && !state.isKeying) {
            handleMutation();
        }
        lastOuterHtml = outerHTML;
    }, POLL_INTERVAL_DURATION);
    return pollIntervalId;
}
exports["default"] = pollForSelectMutation;
//# sourceMappingURL=pollForSelectMutation.js.map

/***/ }),

/***/ 8900:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function throttle(handler, delay) {
    var timerId = null;
    var last = -Infinity;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        var later = function () {
            timerId = null;
            handler.apply(_this, args);
            last = now;
        };
        var difference = now - last;
        if (difference >= delay) {
            later();
        }
        else {
            clearTimeout(timerId);
            timerId = setTimeout(later, delay - difference);
        }
    };
}
exports["default"] = throttle;
//# sourceMappingURL=throttle.js.map

/***/ }),

/***/ 8713:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var BodyStatus;
(function (BodyStatus) {
    BodyStatus["CLOSED"] = "CLOSED";
    BodyStatus["OPEN_ABOVE"] = "OPEN_ABOVE";
    BodyStatus["OPEN_BELOW"] = "OPEN_BELOW";
})(BodyStatus || (BodyStatus = {}));
exports["default"] = BodyStatus;
//# sourceMappingURL=BodyStatus.js.map

/***/ }),

/***/ 3160:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var ScrollStatus;
(function (ScrollStatus) {
    ScrollStatus["AT_TOP"] = "AT_TOP";
    ScrollStatus["SCROLLED"] = "SCROLLED";
    ScrollStatus["AT_BOTTOM"] = "AT_BOTTOM";
})(ScrollStatus || (ScrollStatus = {}));
exports["default"] = ScrollStatus;
//# sourceMappingURL=ScrollStatus.js.map

/***/ }),

/***/ 138:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Group = /** @class */ (function () {
    function Group() {
        this.label = '';
        this.options = [];
        this.isDisabled = false;
    }
    Object.defineProperty(Group.prototype, "totalOptions", {
        get: function () {
            return this.options.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "hasLabel", {
        get: function () {
            return this.label !== '';
        },
        enumerable: true,
        configurable: true
    });
    return Group;
}());
exports["default"] = Group;
//# sourceMappingURL=Group.js.map

/***/ }),

/***/ 1174:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function closeOthers(thisInstance, cache) {
    for (var _i = 0, cache_1 = cache; _i < cache_1.length; _i++) {
        var instance = cache_1[_i];
        if (instance !== thisInstance)
            instance.actions.close();
    }
}
exports["default"] = closeOthers;
//# sourceMappingURL=closeOthers.js.map

/***/ }),

/***/ 8436:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function getScrollTop(currentScrollTop, optionOffsetTop, optionHeight, bodyHeight, scrollOffset) {
    var max = currentScrollTop + bodyHeight;
    var remainder;
    if (optionOffsetTop < currentScrollTop) {
        return optionOffsetTop - scrollOffset;
    }
    else if ((remainder = (optionOffsetTop + optionHeight) - max) > 0) {
        return currentScrollTop + remainder + scrollOffset;
    }
    return currentScrollTop;
}
exports.getScrollTop = getScrollTop;
function scrollToView(dom, timers, state, scrollToMiddle) {
    if (scrollToMiddle === void 0) { scrollToMiddle = false; }
    var index = Math.max(0, state.focusedIndex > -1 ? state.focusedIndex : state.selectedIndex);
    var option = dom.option[index];
    if (!option)
        return;
    var offset = scrollToMiddle ? (state.maxBodyHeight / 2) - (option.offsetHeight / 2) : 0;
    var scrollTop = getScrollTop(dom.itemsList.scrollTop, option.offsetTop, option.offsetHeight, state.maxBodyHeight, offset);
    if (scrollTop === dom.itemsList.scrollTop)
        return;
    dom.itemsList.scrollTop = scrollTop;
}
exports["default"] = scrollToView;
//# sourceMappingURL=scrollToView.js.map

/***/ }),

/***/ 3112:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Option = /** @class */ (function () {
    function Option() {
        this.label = '';
        this.value = '';
        this.isDisabled = false;
    }
    return Option;
}());
exports["default"] = Option;
//# sourceMappingURL=Option.js.map

/***/ }),

/***/ 248:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var helpful_merge_1 = __webpack_require__(9117);
var Config_1 = __webpack_require__(7178);
var BodyStatus_1 = __webpack_require__(8713);
var ScrollStatus_1 = __webpack_require__(3160);
var Group_1 = __webpack_require__(138);
var Option_1 = __webpack_require__(3112);
var State = /** @class */ (function () {
    function State(stateRaw, config) {
        if (stateRaw === void 0) { stateRaw = null; }
        if (config === void 0) { config = new Config_1.default(); }
        this.groups = [];
        this.focusedIndex = -1;
        this.selectedIndex = -1;
        this.maxVisibleItemsOverride = -1;
        this.maxBodyHeight = -1;
        this.name = '';
        this.placeholder = '';
        this.scrollStatus = ScrollStatus_1.default.AT_TOP;
        this.bodyStatus = BodyStatus_1.default.CLOSED;
        this.isDisabled = false;
        this.isRequired = false;
        this.isInvalid = false;
        this.isFocused = false;
        this.isUseNativeMode = false;
        this.isScrollable = false;
        this.isClickSelecting = false;
        this.isSearching = false;
        this.isKeying = false;
        this.config = config;
        if (!stateRaw)
            return;
        helpful_merge_1.default(this, stateRaw);
        this.groups = this.groups.map(function (groupRaw) {
            var group = helpful_merge_1.default(new Group_1.default(), groupRaw);
            group.options = group.options.map(function (optionRaw) { return helpful_merge_1.default(new Option_1.default(), optionRaw); });
            return group;
        });
    }
    Object.defineProperty(State.prototype, "totalGroups", {
        get: function () {
            return this.groups.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "lastGroup", {
        get: function () {
            return this.groups[this.groups.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "totalOptions", {
        get: function () {
            return this.groups.reduce(function (total, group) { return total + group.totalOptions; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "selectedOption", {
        get: function () {
            return this.getOptionFromIndex(this.selectedIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "focusedOption", {
        get: function () {
            return this.getOptionFromIndex(this.focusedIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "value", {
        get: function () {
            return this.selectedOption ? this.selectedOption.value : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "humanReadableValue", {
        get: function () {
            if ((!this.hasValue && this.hasPlaceholder) ||
                (this.config.behavior.showPlaceholderWhenOpen &&
                    this.hasPlaceholder &&
                    this.isOpen)) {
                return this.placeholder;
            }
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "label", {
        get: function () {
            return this.selectedOption ? this.selectedOption.label : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "hasPlaceholder", {
        get: function () {
            return this.placeholder !== '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isPlaceholderShown", {
        get: function () {
            return this.hasPlaceholder && !this.hasValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "hasValue", {
        get: function () {
            return this.value !== '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isGrouped", {
        get: function () {
            return Boolean(this.groups.find(function (group) { return group.hasLabel; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isOpen", {
        get: function () {
            return this.bodyStatus !== BodyStatus_1.default.CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isClosed", {
        get: function () {
            return this.bodyStatus === BodyStatus_1.default.CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isOpenAbove", {
        get: function () {
            return this.bodyStatus === BodyStatus_1.default.OPEN_ABOVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isOpenBelow", {
        get: function () {
            return this.bodyStatus === BodyStatus_1.default.OPEN_BELOW;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isAtTop", {
        get: function () {
            return this.scrollStatus === ScrollStatus_1.default.AT_TOP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isAtBottom", {
        get: function () {
            return this.scrollStatus === ScrollStatus_1.default.AT_BOTTOM;
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.getOptionFromIndex = function (index) {
        var groupStartIndex = 0;
        for (var _i = 0, _a = this.groups; _i < _a.length; _i++) {
            var group = _a[_i];
            if (index < 0)
                break;
            var groupEndIndex = Math.max(0, groupStartIndex + group.totalOptions - 1);
            if (index <= groupEndIndex) {
                var option = group.options[index - groupStartIndex];
                return option;
            }
            groupStartIndex += group.totalOptions;
        }
        return null;
    };
    State.prototype.getOptionIndexFromValue = function (value) {
        var index = -1;
        for (var _i = 0, _a = this.groups; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.options; _b < _c.length; _b++) {
                var option = _c[_b];
                index++;
                if (option.value === value) {
                    return index;
                }
            }
        }
        return -1;
    };
    return State;
}());
exports["default"] = State;
//# sourceMappingURL=State.js.map

/***/ }),

/***/ 9837:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var helpful_merge_1 = __webpack_require__(9117);
var resolveActions_1 = __webpack_require__(3942);
var StateManager = /** @class */ (function () {
    function StateManager() {
    }
    StateManager.proxyActions = function (state, injectedActions, onAction) {
        var stateProxy = StateManager.createStateProxy(state, onAction);
        var actions = resolveActions_1.default(stateProxy);
        helpful_merge_1.default(actions, injectedActions);
        return actions;
    };
    StateManager.createStateProxy = function (state, onAction) {
        return Object.seal(StateManager
            .getPropertyDescriptorsFromValue(state, onAction)
            .reduce(function (proxy, _a) {
            var key = _a.key, get = _a.get, set = _a.set;
            return Object.defineProperty(proxy, key, {
                enumerable: true,
                get: get,
                set: set
            });
        }, {}));
    };
    StateManager.getPropertyDescriptorsFromValue = function (state, onAction) {
        var prototype = Object.getPrototypeOf(state);
        var allKeys = Object.keys(state).concat(Object.keys(prototype));
        return allKeys
            .reduce(function (localDescriptors, key) {
            var propertyDescriptor = Object.getOwnPropertyDescriptor(state, key) ||
                Object.getOwnPropertyDescriptor(prototype, key);
            var isAccessorProperty = typeof propertyDescriptor.get === 'function';
            localDescriptors.push({
                get: StateManager.readPropertyValue.bind(null, state, key),
                set: isAccessorProperty ?
                    void 0 : StateManager.updatePropertyValue.bind(null, state, key, onAction),
                key: key
            });
            return localDescriptors;
        }, []);
    };
    StateManager.readPropertyValue = function (state, key) {
        return state[key];
    };
    StateManager.updatePropertyValue = function (state, key, onAction, value) {
        if (state[key] === value)
            return;
        state[key] = value;
        onAction(state, key);
    };
    return StateManager;
}());
exports["default"] = StateManager;
//# sourceMappingURL=StateManager.js.map

/***/ }),

/***/ 8421:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var helpful_merge_1 = __webpack_require__(9117);
var getIsMobilePlatform_1 = __webpack_require__(4867);
var Group_1 = __webpack_require__(138);
var Option_1 = __webpack_require__(3112);
var State_1 = __webpack_require__(248);
var StateMapper = /** @class */ (function () {
    function StateMapper() {
    }
    StateMapper.mapFromSelect = function (selectElement, config) {
        var state = new State_1.default(null, config);
        var isWithinGroup = false;
        state.name = selectElement.name;
        state.isDisabled = selectElement.disabled;
        state.isRequired = selectElement.required;
        state.isUseNativeMode = (config.behavior.useNativeUiOnMobile &&
            getIsMobilePlatform_1.default(window.navigator.userAgent));
        for (var i = 0, child = void 0; (child = selectElement.children[i]); i++) {
            if (i === 0 && child.getAttribute('data-placeholder') !== null) {
                state.placeholder = child.textContent;
                child.value = '';
                continue;
            }
            if (child instanceof HTMLOptionElement) {
                if (isWithinGroup === false) {
                    state.groups.push(StateMapper.mapGroup());
                    isWithinGroup = true;
                }
                state.lastGroup.options.push(StateMapper.mapOption(child));
                if (child.selected)
                    state.selectedIndex = state.totalOptions - 1;
            }
            else if (child instanceof HTMLOptGroupElement) {
                isWithinGroup = true;
                state.groups.push(StateMapper.mapGroup(child));
                for (var j = 0, groupChild = void 0; (groupChild = child.children[j]); j++) {
                    state.lastGroup.options.push(StateMapper.mapOption(groupChild, child));
                    if (groupChild.selected)
                        state.selectedIndex = state.totalOptions - 1;
                }
                isWithinGroup = false;
            }
            else {
                throw new TypeError("[EasyDropDown] Invalid child tag \"" + child.tagName + "\" found in provided `<select>` element");
            }
        }
        return Object.seal(state);
    };
    StateMapper.mapGroup = function (group) {
        if (group === void 0) { group = null; }
        return helpful_merge_1.default(new Group_1.default(), {
            label: group ? group.label : '',
            isDisabled: group ? group.disabled : false
        });
    };
    StateMapper.mapOption = function (option, group) {
        if (group === void 0) { group = null; }
        if (!(option instanceof HTMLOptionElement))
            throw new TypeError('[EasyDropDown] Invalid markup structure');
        var isParentGroupDisabled = group !== null && group.disabled;
        return helpful_merge_1.default(new Option_1.default(), {
            label: option.textContent,
            value: option.value,
            isDisabled: option.disabled || isParentGroupDisabled
        });
    };
    return StateMapper;
}());
exports["default"] = StateMapper;
//# sourceMappingURL=StateMapper.js.map

/***/ }),

/***/ 3942:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var CollisionType_1 = __webpack_require__(1428);
var BodyStatus_1 = __webpack_require__(8713);
var ScrollStatus_1 = __webpack_require__(3160);
var resolveActions = function (state) { return ({
    focus: function () {
        state.isFocused = true;
    },
    blur: function () {
        state.isFocused = false;
    },
    invalidate: function () {
        state.isInvalid = true;
    },
    validate: function () {
        state.isInvalid = false;
    },
    topOut: function () {
        state.scrollStatus = ScrollStatus_1.default.AT_TOP;
    },
    bottomOut: function () {
        state.scrollStatus = ScrollStatus_1.default.AT_BOTTOM;
    },
    scroll: function () {
        state.scrollStatus = ScrollStatus_1.default.SCROLLED;
    },
    makeScrollable: function () {
        state.isScrollable = true;
    },
    makeUnscrollable: function () {
        state.isScrollable = false;
    },
    open: function (maxBodyHeight, collisionType, isScrollable) {
        if (state.isDisabled)
            return;
        this.closeOthers();
        switch (collisionType) {
            case CollisionType_1.default.NONE:
            case CollisionType_1.default.TOP:
                state.bodyStatus = BodyStatus_1.default.OPEN_BELOW;
                break;
            case CollisionType_1.default.BOTTOM:
                state.bodyStatus = BodyStatus_1.default.OPEN_ABOVE;
                break;
        }
        state.isScrollable = isScrollable;
        state.maxBodyHeight = maxBodyHeight;
        this.scrollToView(state, true);
    },
    close: function () {
        state.bodyStatus = BodyStatus_1.default.CLOSED;
        state.focusedIndex = -1;
        this.blur();
    },
    startClickSelecting: function () {
        state.isClickSelecting = true;
    },
    selectOption: function (index, close) {
        if (close === void 0) { close = true; }
        var optionAtIndex = state.getOptionFromIndex(index);
        state.isClickSelecting = false;
        if (index > -1 && (!optionAtIndex || optionAtIndex.isDisabled))
            return;
        state.selectedIndex = index;
        if (state.isInvalid && state.hasValue) {
            this.validate();
        }
        if (state.isSearching) {
            this.scrollToView(state);
        }
        else if (close) {
            this.close();
        }
    },
    focusOption: function (index, shouldScrollToView) {
        if (shouldScrollToView === void 0) { shouldScrollToView = false; }
        var scrollToMiddle = Math.abs(index - state.focusedIndex) > 1;
        state.focusedIndex = index;
        if (shouldScrollToView) {
            this.scrollToView(state, scrollToMiddle);
        }
    },
    search: function () {
        state.isSearching = true;
    },
    resetSearch: function () {
        state.isSearching = false;
    },
    keying: function () {
        state.isKeying = true;
    },
    resetKeying: function () {
        state.isKeying = false;
    },
    useNative: function () {
        state.isUseNativeMode = true;
    }
}); };
exports["default"] = resolveActions;
//# sourceMappingURL=resolveActions.js.map

/***/ }),

/***/ 7379:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_require__(2770);
__webpack_require__(8845);
var factory_1 = __webpack_require__(3065);
exports.A = factory_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6128:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";function e(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(t,i){for(var n=0;n<i.length;n++){var s=i[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,e(s.key),s)}}function s(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var l=Date.now();function o(){var e={},t=!0,i=0,n=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],i++);for(var s=function(i){for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t&&"[object Object]"===Object.prototype.toString.call(i[n])?e[n]=o(!0,e[n],i[n]):e[n]=i[n])};i<n;i++){var l=arguments[i];s(l)}return e}function r(e,t){if((E(e)||e===window||e===document)&&(e=[e]),L(e)||I(e)||(e=[e]),0!=M(e))if(L(e)&&!I(e))for(var i=e.length,n=0;n<i&&!1!==t.call(e[n],e[n],n,e);n++);else if(I(e))for(var s in e)if(P(e,s)&&!1===t.call(e[s],e[s],s,e))break}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=e[l]=e[l]||[],s={all:n,evt:null,found:null};return t&&i&&M(n)>0&&r(n,(function(e,n){if(e.eventName==t&&e.fn.toString()==i.toString())return s.found=!0,s.evt=n,!1})),s}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.onElement,n=t.withCallback,s=t.avoidDuplicate,l=void 0===s||s,o=t.once,h=void 0!==o&&o,d=t.useCapture,c=void 0!==d&&d,u=arguments.length>2?arguments[2]:void 0,g=i||[];function v(e){C(n)&&n.call(u,e,this),h&&v.destroy()}return k(g)&&(g=document.querySelectorAll(g)),v.destroy=function(){r(g,(function(t){var i=a(t,e,v);i.found&&i.all.splice(i.evt,1),t.removeEventListener&&t.removeEventListener(e,v,c)}))},r(g,(function(t){var i=a(t,e,v);(t.addEventListener&&l&&!i.found||!l)&&(t.addEventListener(e,v,c),i.all.push({eventName:e,fn:v}))})),v}function d(e,t){r(t.split(" "),(function(t){return e.classList.add(t)}))}function c(e,t){r(t.split(" "),(function(t){return e.classList.remove(t)}))}function u(e,t){return e.classList.contains(t)}function g(e,t){for(;e!==document.body;){if(!(e=e.parentElement))return!1;if("function"==typeof e.matches?e.matches(t):e.msMatchesSelector(t))return e}}function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e||""===t)return!1;if("none"===t)return C(i)&&i(),!1;var n=b(),s=t.split(" ");r(s,(function(t){d(e,"g"+t)})),h(n,{onElement:e,avoidDuplicate:!1,once:!0,withCallback:function(e,t){r(s,(function(e){c(t,"g"+e)})),C(i)&&i()}})}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(""===t)return e.style.webkitTransform="",e.style.MozTransform="",e.style.msTransform="",e.style.OTransform="",e.style.transform="",!1;e.style.webkitTransform=t,e.style.MozTransform=t,e.style.msTransform=t,e.style.OTransform=t,e.style.transform=t}function p(e){e.style.display="block"}function m(e){e.style.display="none"}function y(e){var t=document.createDocumentFragment(),i=document.createElement("div");for(i.innerHTML=e;i.firstChild;)t.appendChild(i.firstChild);return t}function x(){return{width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}}function b(){var e,t=document.createElement("fakeelement"),i={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(e in i)if(void 0!==t.style[e])return i[e]}function S(e,t,i,n){if(e())t();else{var s;i||(i=100);var l=setInterval((function(){e()&&(clearInterval(l),s&&clearTimeout(s),t())}),i);n&&(s=setTimeout((function(){clearInterval(l)}),n))}}function w(e,t,i){if(O(e))console.error("Inject assets error");else if(C(t)&&(i=t,t=!1),k(t)&&t in window)C(i)&&i();else{var n;if(-1!==e.indexOf(".css")){if((n=document.querySelectorAll('link[href="'+e+'"]'))&&n.length>0)return void(C(i)&&i());var s=document.getElementsByTagName("head")[0],l=s.querySelectorAll('link[rel="stylesheet"]'),o=document.createElement("link");return o.rel="stylesheet",o.type="text/css",o.href=e,o.media="all",l?s.insertBefore(o,l[0]):s.appendChild(o),void(C(i)&&i())}if((n=document.querySelectorAll('script[src="'+e+'"]'))&&n.length>0){if(C(i)){if(k(t))return S((function(){return void 0!==window[t]}),(function(){i()})),!1;i()}}else{var r=document.createElement("script");r.type="text/javascript",r.src=e,r.onload=function(){if(C(i)){if(k(t))return S((function(){return void 0!==window[t]}),(function(){i()})),!1;i()}},document.body.appendChild(r)}}}function T(){return"navigator"in window&&window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)}function C(e){return"function"==typeof e}function k(e){return"string"==typeof e}function E(e){return!(!e||!e.nodeType||1!=e.nodeType)}function A(e){return Array.isArray(e)}function L(e){return e&&e.length&&isFinite(e.length)}function I(e){return"object"===t(e)&&null!=e&&!C(e)&&!A(e)}function O(e){return null==e}function P(e,t){return null!==e&&hasOwnProperty.call(e,t)}function M(e){if(I(e)){if(e.keys)return e.keys().length;var t=0;for(var i in e)P(e,i)&&t++;return t}return e.length}function z(e){return!isNaN(parseFloat(e))&&isFinite(e)}function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,t=document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");if(!t.length)return!1;if(1==t.length)return t[0];"string"==typeof e&&(e=parseInt(e));var i=[];r(t,(function(e){i.push(e.getAttribute("data-taborder"))}));var n=Math.max.apply(Math,i.map((function(e){return parseInt(e)}))),s=e<0?1:e+1;s>n&&(s="1");var l=i.filter((function(e){return e>=parseInt(s)})),o=l.sort()[0];return document.querySelector('.gbtn[data-taborder="'.concat(o,'"]'))}function Y(e){if(e.events.hasOwnProperty("keyboard"))return!1;e.events.keyboard=h("keydown",{onElement:window,withCallback:function(t,i){var n=(t=t||window.event).keyCode;if(9==n){var s=document.querySelector(".gbtn.focused");if(!s){var l=!(!document.activeElement||!document.activeElement.nodeName)&&document.activeElement.nodeName.toLocaleLowerCase();if("input"==l||"textarea"==l||"button"==l)return}t.preventDefault();var o=document.querySelectorAll(".gbtn[data-taborder]");if(!o||o.length<=0)return;if(!s){var r=X();return void(r&&(r.focus(),d(r,"focused")))}var a=X(s.getAttribute("data-taborder"));c(s,"focused"),a&&(a.focus(),d(a,"focused"))}39==n&&e.nextSlide(),37==n&&e.prevSlide(),27==n&&e.close()}})}var q=s((function e(t,n){var s=this,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(i(this,e),this.img=t,this.slide=n,this.onclose=l,this.img.setZoomEvents)return!1;this.active=!1,this.zoomedIn=!1,this.dragging=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.img.addEventListener("mousedown",(function(e){return s.dragStart(e)}),!1),this.img.addEventListener("mouseup",(function(e){return s.dragEnd(e)}),!1),this.img.addEventListener("mousemove",(function(e){return s.drag(e)}),!1),this.img.addEventListener("click",(function(e){return s.slide.classList.contains("dragging-nav")?(s.zoomOut(),!1):s.zoomedIn?void(s.zoomedIn&&!s.dragging&&s.zoomOut()):s.zoomIn()}),!1),this.img.setZoomEvents=!0}),[{key:"zoomIn",value:function(){var e=this.widowWidth();if(!(this.zoomedIn||e<=768)){var t=this.img;if(t.setAttribute("data-style",t.getAttribute("style")),t.style.maxWidth=t.naturalWidth+"px",t.style.maxHeight=t.naturalHeight+"px",t.naturalWidth>e){var i=e/2-t.naturalWidth/2;this.setTranslate(this.img.parentNode,i,0)}this.slide.classList.add("zoomed"),this.zoomedIn=!0}}},{key:"zoomOut",value:function(){this.img.parentNode.setAttribute("style",""),this.img.setAttribute("style",this.img.getAttribute("data-style")),this.slide.classList.remove("zoomed"),this.zoomedIn=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.onclose&&"function"==typeof this.onclose&&this.onclose()}},{key:"dragStart",value:function(e){e.preventDefault(),this.zoomedIn?("touchstart"===e.type?(this.initialX=e.touches[0].clientX-this.xOffset,this.initialY=e.touches[0].clientY-this.yOffset):(this.initialX=e.clientX-this.xOffset,this.initialY=e.clientY-this.yOffset),e.target===this.img&&(this.active=!0,this.img.classList.add("dragging"))):this.active=!1}},{key:"dragEnd",value:function(e){var t=this;e.preventDefault(),this.initialX=this.currentX,this.initialY=this.currentY,this.active=!1,setTimeout((function(){t.dragging=!1,t.img.isDragging=!1,t.img.classList.remove("dragging")}),100)}},{key:"drag",value:function(e){this.active&&(e.preventDefault(),"touchmove"===e.type?(this.currentX=e.touches[0].clientX-this.initialX,this.currentY=e.touches[0].clientY-this.initialY):(this.currentX=e.clientX-this.initialX,this.currentY=e.clientY-this.initialY),this.xOffset=this.currentX,this.yOffset=this.currentY,this.img.isDragging=!0,this.dragging=!0,this.setTranslate(this.img,this.currentX,this.currentY))}},{key:"onMove",value:function(e){if(this.zoomedIn){var t=e.clientX-this.img.naturalWidth/2,i=e.clientY-this.img.naturalHeight/2;this.setTranslate(this.img,t,i)}}},{key:"setTranslate",value:function(e,t,i){e.style.transform="translate3d("+t+"px, "+i+"px, 0)"}},{key:"widowWidth",value:function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth}}]),N=s((function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var s=n.dragEl,l=n.toleranceX,o=void 0===l?40:l,r=n.toleranceY,a=void 0===r?65:r,h=n.slide,d=void 0===h?null:h,c=n.instance,u=void 0===c?null:c;this.el=s,this.active=!1,this.dragging=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.direction=null,this.lastDirection=null,this.toleranceX=o,this.toleranceY=a,this.toleranceReached=!1,this.dragContainer=this.el,this.slide=d,this.instance=u,this.el.addEventListener("mousedown",(function(e){return t.dragStart(e)}),!1),this.el.addEventListener("mouseup",(function(e){return t.dragEnd(e)}),!1),this.el.addEventListener("mousemove",(function(e){return t.drag(e)}),!1)}),[{key:"dragStart",value:function(e){if(this.slide.classList.contains("zoomed"))this.active=!1;else{"touchstart"===e.type?(this.initialX=e.touches[0].clientX-this.xOffset,this.initialY=e.touches[0].clientY-this.yOffset):(this.initialX=e.clientX-this.xOffset,this.initialY=e.clientY-this.yOffset);var t=e.target.nodeName.toLowerCase();e.target.classList.contains("nodrag")||g(e.target,".nodrag")||-1!==["input","select","textarea","button","a"].indexOf(t)?this.active=!1:(e.preventDefault(),(e.target===this.el||"img"!==t&&g(e.target,".gslide-inline"))&&(this.active=!0,this.el.classList.add("dragging"),this.dragContainer=g(e.target,".ginner-container")))}}},{key:"dragEnd",value:function(e){var t=this;e&&e.preventDefault(),this.initialX=0,this.initialY=0,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.active=!1,this.doSlideChange&&(this.instance.preventOutsideClick=!0,"right"==this.doSlideChange&&this.instance.prevSlide(),"left"==this.doSlideChange&&this.instance.nextSlide()),this.doSlideClose&&this.instance.close(),this.toleranceReached||this.setTranslate(this.dragContainer,0,0,!0),setTimeout((function(){t.instance.preventOutsideClick=!1,t.toleranceReached=!1,t.lastDirection=null,t.dragging=!1,t.el.isDragging=!1,t.el.classList.remove("dragging"),t.slide.classList.remove("dragging-nav"),t.dragContainer.style.transform="",t.dragContainer.style.transition=""}),100)}},{key:"drag",value:function(e){if(this.active){e.preventDefault(),this.slide.classList.add("dragging-nav"),"touchmove"===e.type?(this.currentX=e.touches[0].clientX-this.initialX,this.currentY=e.touches[0].clientY-this.initialY):(this.currentX=e.clientX-this.initialX,this.currentY=e.clientY-this.initialY),this.xOffset=this.currentX,this.yOffset=this.currentY,this.el.isDragging=!0,this.dragging=!0,this.doSlideChange=!1,this.doSlideClose=!1;var t=Math.abs(this.currentX),i=Math.abs(this.currentY);if(t>0&&t>=Math.abs(this.currentY)&&(!this.lastDirection||"x"==this.lastDirection)){this.yOffset=0,this.lastDirection="x",this.setTranslate(this.dragContainer,this.currentX,0);var n=this.shouldChange();if(!this.instance.settings.dragAutoSnap&&n&&(this.doSlideChange=n),this.instance.settings.dragAutoSnap&&n)return this.instance.preventOutsideClick=!0,this.toleranceReached=!0,this.active=!1,this.instance.preventOutsideClick=!0,this.dragEnd(null),"right"==n&&this.instance.prevSlide(),void("left"==n&&this.instance.nextSlide())}if(this.toleranceY>0&&i>0&&i>=t&&(!this.lastDirection||"y"==this.lastDirection)){this.xOffset=0,this.lastDirection="y",this.setTranslate(this.dragContainer,0,this.currentY);var s=this.shouldClose();return!this.instance.settings.dragAutoSnap&&s&&(this.doSlideClose=!0),void(this.instance.settings.dragAutoSnap&&s&&this.instance.close())}}}},{key:"shouldChange",value:function(){var e=!1;if(Math.abs(this.currentX)>=this.toleranceX){var t=this.currentX>0?"right":"left";("left"==t&&this.slide!==this.slide.parentNode.lastChild||"right"==t&&this.slide!==this.slide.parentNode.firstChild)&&(e=t)}return e}},{key:"shouldClose",value:function(){var e=!1;return Math.abs(this.currentY)>=this.toleranceY&&(e=!0),e}},{key:"setTranslate",value:function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e.style.transition=n?"all .2s ease":"",e.style.transform="translate3d(".concat(t,"px, ").concat(i,"px, 0)")}}]);function D(e,t,i,n){var s=e.querySelector(".gslide-media"),l=new Image,o="gSlideTitle_"+i,r="gSlideDesc_"+i;l.addEventListener("load",(function(){C(n)&&n()}),!1),l.src=t.href,""!=t.sizes&&""!=t.srcset&&(l.sizes=t.sizes,l.srcset=t.srcset),l.alt="",O(t.alt)||""===t.alt||(l.alt=t.alt),""!==t.title&&l.setAttribute("aria-labelledby",o),""!==t.description&&l.setAttribute("aria-describedby",r),t.hasOwnProperty("_hasCustomWidth")&&t._hasCustomWidth&&(l.style.width=t.width),t.hasOwnProperty("_hasCustomHeight")&&t._hasCustomHeight&&(l.style.height=t.height),s.insertBefore(l,s.firstChild)}function _(e,t,i,n){var s=this,l=e.querySelector(".ginner-container"),o="gvideo"+i,r=e.querySelector(".gslide-media"),a=this.getAllPlayers();d(l,"gvideo-container"),r.insertBefore(y('<div class="gvideo-wrapper"></div>'),r.firstChild);var h=e.querySelector(".gvideo-wrapper");w(this.settings.plyr.css,"Plyr");var c=t.href,u=null==t?void 0:t.videoProvider,g=!1;r.style.maxWidth=t.width,w(this.settings.plyr.js,"Plyr",(function(){if(!u&&c.match(/vimeo\.com\/([0-9]*)/)&&(u="vimeo"),!u&&(c.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/)||c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)||c.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)||c.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/))&&(u="youtube"),"local"===u||!u){u="local";var l='<video id="'+o+'" ';l+='style="background:#000; max-width: '.concat(t.width,';" '),l+='preload="metadata" ',l+='x-webkit-airplay="allow" ',l+="playsinline ",l+="controls ",l+='class="gvideo-local">',l+='<source src="'.concat(c,'">'),g=y(l+="</video>")}var r=g||y('<div id="'.concat(o,'" data-plyr-provider="').concat(u,'" data-plyr-embed-id="').concat(c,'"></div>'));d(h,"".concat(u,"-video gvideo")),h.appendChild(r),h.setAttribute("data-id",o),h.setAttribute("data-index",i);var v=P(s.settings.plyr,"config")?s.settings.plyr.config:{},f=new Plyr("#"+o,v);f.on("ready",(function(e){a[o]=e.detail.plyr,C(n)&&n()})),S((function(){return e.querySelector("iframe")&&"true"==e.querySelector("iframe").dataset.ready}),(function(){s.resize(e)})),f.on("enterfullscreen",W),f.on("exitfullscreen",W)}))}function W(e){var t=g(e.target,".gslide-media");"enterfullscreen"===e.type&&d(t,"fullscreen"),"exitfullscreen"===e.type&&c(t,"fullscreen")}function B(e,t,i,n){var s,l=this,o=e.querySelector(".gslide-media"),r=!(!P(t,"href")||!t.href)&&t.href.split("#").pop().trim(),a=!(!P(t,"content")||!t.content)&&t.content;if(a&&(k(a)&&(s=y('<div class="ginlined-content">'.concat(a,"</div>"))),E(a))){"none"==a.style.display&&(a.style.display="block");var c=document.createElement("div");c.className="ginlined-content",c.appendChild(a),s=c}if(r){var u=document.getElementById(r);if(!u)return!1;var g=u.cloneNode(!0);g.style.height=t.height,g.style.maxWidth=t.width,d(g,"ginlined-content"),s=g}if(!s)return console.error("Unable to append inline slide content",t),!1;o.style.height=t.height,o.style.width=t.width,o.appendChild(s),this.events["inlineclose"+r]=h("click",{onElement:o.querySelectorAll(".gtrigger-close"),withCallback:function(e){e.preventDefault(),l.close()}}),C(n)&&n()}function H(e,t,i,n){var s=e.querySelector(".gslide-media"),l=function(e){var t=e.url,i=e.allow,n=e.callback,s=e.appendTo,l=document.createElement("iframe");return l.className="vimeo-video gvideo",l.src=t,l.style.width="100%",l.style.height="100%",i&&l.setAttribute("allow",i),l.onload=function(){l.onload=null,d(l,"node-ready"),C(n)&&n()},s&&s.appendChild(l),l}({url:t.href,callback:n});s.parentNode.style.maxWidth=t.width,s.parentNode.style.height=t.height,s.appendChild(l)}var j=s((function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.defaults={href:"",sizes:"",srcset:"",title:"",type:"",videoProvider:"",description:"",alt:"",descPosition:"bottom",effect:"",width:"",height:"",content:!1,zoomable:!0,draggable:!0},I(t)&&(this.defaults=o(this.defaults,t))}),[{key:"sourceType",value:function(e){var t=e;return null!==(e=e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/)?"image":e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/)||e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)||e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)||e.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/)||e.match(/vimeo\.com\/([0-9]*)/)||null!==e.match(/\.(mp4|ogg|webm|mov)/)?"video":null!==e.match(/\.(mp3|wav|wma|aac|ogg)/)?"audio":e.indexOf("#")>-1&&""!==t.split("#").pop().trim()?"inline":e.indexOf("goajax=true")>-1?"ajax":"external"}},{key:"parseConfig",value:function(e,t){var i=this,n=o({descPosition:t.descPosition},this.defaults);if(I(e)&&!E(e)){P(e,"type")||(P(e,"content")&&e.content?e.type="inline":P(e,"href")&&(e.type=this.sourceType(e.href)));var s=o(n,e);return this.setSize(s,t),s}var l="",a=e.getAttribute("data-glightbox"),h=e.nodeName.toLowerCase();if("a"===h&&(l=e.href),"img"===h&&(l=e.src,n.alt=e.alt),n.href=l,r(n,(function(s,l){P(t,l)&&"width"!==l&&(n[l]=t[l]);var o=e.dataset[l];O(o)||(n[l]=i.sanitizeValue(o))})),n.content&&(n.type="inline"),!n.type&&l&&(n.type=this.sourceType(l)),O(a)){if(!n.title&&"a"==h){var d=e.title;O(d)||""===d||(n.title=d)}if(!n.title&&"img"==h){var c=e.alt;O(c)||""===c||(n.title=c)}}else{var u=[];r(n,(function(e,t){u.push(";\\s?"+t)})),u=u.join("\\s?:|"),""!==a.trim()&&r(n,(function(e,t){var s=a,l=new RegExp("s?"+t+"s?:s?(.*?)("+u+"s?:|$)"),o=s.match(l);if(o&&o.length&&o[1]){var r=o[1].trim().replace(/;\s*$/,"");n[t]=i.sanitizeValue(r)}}))}if(n.description&&"."===n.description.substring(0,1)){var g;try{g=document.querySelector(n.description).innerHTML}catch(e){if(!(e instanceof DOMException))throw e}g&&(n.description=g)}if(!n.description){var v=e.querySelector(".glightbox-desc");v&&(n.description=v.innerHTML)}return this.setSize(n,t,e),this.slideConfig=n,n}},{key:"setSize",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n="video"==e.type?this.checkSize(t.videosWidth):this.checkSize(t.width),s=this.checkSize(t.height);return e.width=P(e,"width")&&""!==e.width?this.checkSize(e.width):n,e.height=P(e,"height")&&""!==e.height?this.checkSize(e.height):s,i&&"image"==e.type&&(e._hasCustomWidth=!!i.dataset.width,e._hasCustomHeight=!!i.dataset.height),e}},{key:"checkSize",value:function(e){return z(e)?"".concat(e,"px"):e}},{key:"sanitizeValue",value:function(e){return"true"!==e&&"false"!==e?e:"true"===e}}]),V=s((function e(t,n,s){i(this,e),this.element=t,this.instance=n,this.index=s}),[{key:"setContent",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(u(t,"loaded"))return!1;var n=this.instance.settings,s=this.slideConfig,l=T();C(n.beforeSlideLoad)&&n.beforeSlideLoad({index:this.index,slide:t,player:!1});var o=s.type,r=s.descPosition,a=t.querySelector(".gslide-media"),h=t.querySelector(".gslide-title"),c=t.querySelector(".gslide-desc"),g=t.querySelector(".gdesc-inner"),v=i,f="gSlideTitle_"+this.index,p="gSlideDesc_"+this.index;if(C(n.afterSlideLoad)&&(v=function(){C(i)&&i(),n.afterSlideLoad({index:e.index,slide:t,player:e.instance.getSlidePlayerInstance(e.index)})}),""==s.title&&""==s.description?g&&g.parentNode.parentNode.removeChild(g.parentNode):(h&&""!==s.title?(h.id=f,h.innerHTML=s.title):h.parentNode.removeChild(h),c&&""!==s.description?(c.id=p,l&&n.moreLength>0?(s.smallDescription=this.slideShortDesc(s.description,n.moreLength,n.moreText),c.innerHTML=s.smallDescription,this.descriptionEvents(c,s)):c.innerHTML=s.description):c.parentNode.removeChild(c),d(a.parentNode,"desc-".concat(r)),d(g.parentNode,"description-".concat(r))),d(a,"gslide-".concat(o)),d(t,"loaded"),"video"!==o){if("external"!==o)return"inline"===o?(B.apply(this.instance,[t,s,this.index,v]),void(s.draggable&&new N({dragEl:t.querySelector(".gslide-inline"),toleranceX:n.dragToleranceX,toleranceY:n.dragToleranceY,slide:t,instance:this.instance}))):void("image"!==o?C(v)&&v():D(t,s,this.index,(function(){var i=t.querySelector("img");s.draggable&&new N({dragEl:i,toleranceX:n.dragToleranceX,toleranceY:n.dragToleranceY,slide:t,instance:e.instance}),s.zoomable&&i.naturalWidth>i.offsetWidth&&(d(i,"zoomable"),new q(i,t,(function(){e.instance.resize()}))),C(v)&&v()})));H.apply(this,[t,s,this.index,v])}else _.apply(this.instance,[t,s,this.index,v])}},{key:"slideShortDesc",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=document.createElement("div");n.innerHTML=e;var s=n.innerText,l=i;if((e=s.trim()).length<=t)return e;var o=e.substr(0,t-1);return l?(n=null,o+'... <a href="#" class="desc-more">'+i+"</a>"):o}},{key:"descriptionEvents",value:function(e,t){var i=this,n=e.querySelector(".desc-more");if(!n)return!1;h("click",{onElement:n,withCallback:function(e,n){e.preventDefault();var s=document.body,l=g(n,".gslide-desc");if(!l)return!1;l.innerHTML=t.description,d(s,"gdesc-open");var o=h("click",{onElement:[s,g(l,".gslide-description")],withCallback:function(e,n){"a"!==e.target.nodeName.toLowerCase()&&(c(s,"gdesc-open"),d(s,"gdesc-closed"),l.innerHTML=t.smallDescription,i.descriptionEvents(l,t),setTimeout((function(){c(s,"gdesc-closed")}),400),o.destroy())}})}})}},{key:"create",value:function(){return y(this.instance.settings.slideHTML)}},{key:"getConfig",value:function(){E(this.element)||this.element.hasOwnProperty("draggable")||(this.element.draggable=this.instance.settings.draggable);var e=new j(this.instance.settings.slideExtraAttributes);return this.slideConfig=e.parseConfig(this.element,this.instance.settings),this.slideConfig}}]);function F(e){return Math.sqrt(e.x*e.x+e.y*e.y)}function R(e,t){var i=function(e,t){var i=F(e)*F(t);if(0===i)return 0;var n=function(e,t){return e.x*t.x+e.y*t.y}(e,t)/i;return n>1&&(n=1),Math.acos(n)}(e,t);return function(e,t){return e.x*t.y-t.x*e.y}(e,t)>0&&(i*=-1),180*i/Math.PI}var G=s((function e(t){i(this,e),this.handlers=[],this.el=t}),[{key:"add",value:function(e){this.handlers.push(e)}},{key:"del",value:function(e){e||(this.handlers=[]);for(var t=this.handlers.length;t>=0;t--)this.handlers[t]===e&&this.handlers.splice(t,1)}},{key:"dispatch",value:function(){for(var e=0,t=this.handlers.length;e<t;e++){var i=this.handlers[e];"function"==typeof i&&i.apply(this.el,arguments)}}}]);function Z(e,t){var i=new G(e);return i.add(t),i}var U=s((function e(t,n){i(this,e),this.element="string"==typeof t?document.querySelector(t):t,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;var s=function(){};this.rotate=Z(this.element,n.rotate||s),this.touchStart=Z(this.element,n.touchStart||s),this.multipointStart=Z(this.element,n.multipointStart||s),this.multipointEnd=Z(this.element,n.multipointEnd||s),this.pinch=Z(this.element,n.pinch||s),this.swipe=Z(this.element,n.swipe||s),this.tap=Z(this.element,n.tap||s),this.doubleTap=Z(this.element,n.doubleTap||s),this.longTap=Z(this.element,n.longTap||s),this.singleTap=Z(this.element,n.singleTap||s),this.pressMove=Z(this.element,n.pressMove||s),this.twoFingerPressMove=Z(this.element,n.twoFingerPressMove||s),this.touchMove=Z(this.element,n.touchMove||s),this.touchEnd=Z(this.element,n.touchEnd||s),this.touchCancel=Z(this.element,n.touchCancel||s),this.translateContainer=this.element,this._cancelAllHandler=this.cancelAll.bind(this),window.addEventListener("scroll",this._cancelAllHandler),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null}}),[{key:"start",value:function(e){if(e.touches)if(e.target&&e.target.nodeName&&["a","button","input"].indexOf(e.target.nodeName.toLowerCase())>=0)console.log("ignore drag for this touched element",e.target.nodeName.toLowerCase());else{this.now=Date.now(),this.x1=e.touches[0].pageX,this.y1=e.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(e,this.element),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30,this.isDoubleTap&&clearTimeout(this.singleTapTimeout)),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var t=this.preV;if(e.touches.length>1){this._cancelLongTap(),this._cancelSingleTap();var i={x:e.touches[1].pageX-this.x1,y:e.touches[1].pageY-this.y1};t.x=i.x,t.y=i.y,this.pinchStartLen=F(t),this.multipointStart.dispatch(e,this.element)}this._preventTap=!1,this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(e,this.element),this._preventTap=!0}.bind(this),750)}}},{key:"move",value:function(e){if(e.touches){var t=this.preV,i=e.touches.length,n=e.touches[0].pageX,s=e.touches[0].pageY;if(this.isDoubleTap=!1,i>1){var l=e.touches[1].pageX,o=e.touches[1].pageY,r={x:e.touches[1].pageX-n,y:e.touches[1].pageY-s};null!==t.x&&(this.pinchStartLen>0&&(e.zoom=F(r)/this.pinchStartLen,this.pinch.dispatch(e,this.element)),e.angle=R(r,t),this.rotate.dispatch(e,this.element)),t.x=r.x,t.y=r.y,null!==this.x2&&null!==this.sx2?(e.deltaX=(n-this.x2+l-this.sx2)/2,e.deltaY=(s-this.y2+o-this.sy2)/2):(e.deltaX=0,e.deltaY=0),this.twoFingerPressMove.dispatch(e,this.element),this.sx2=l,this.sy2=o}else{if(null!==this.x2){e.deltaX=n-this.x2,e.deltaY=s-this.y2;var a=Math.abs(this.x1-this.x2),h=Math.abs(this.y1-this.y2);(a>10||h>10)&&(this._preventTap=!0)}else e.deltaX=0,e.deltaY=0;this.pressMove.dispatch(e,this.element)}this.touchMove.dispatch(e,this.element),this._cancelLongTap(),this.x2=n,this.y2=s,i>1&&e.preventDefault()}}},{key:"end",value:function(e){if(e.changedTouches){this._cancelLongTap();var t=this;e.touches.length<2&&(this.multipointEnd.dispatch(e,this.element),this.sx2=this.sy2=null),this.x2&&Math.abs(this.x1-this.x2)>30||this.y2&&Math.abs(this.y1-this.y2)>30?(e.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout((function(){t.swipe.dispatch(e,t.element)}),0)):(this.tapTimeout=setTimeout((function(){t._preventTap||t.tap.dispatch(e,t.element),t.isDoubleTap&&(t.doubleTap.dispatch(e,t.element),t.isDoubleTap=!1)}),0),t.isDoubleTap||(t.singleTapTimeout=setTimeout((function(){t.singleTap.dispatch(e,t.element)}),250))),this.touchEnd.dispatch(e,this.element),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null}}},{key:"cancelAll",value:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout)}},{key:"cancel",value:function(e){this.cancelAll(),this.touchCancel.dispatch(e,this.element)}},{key:"_cancelLongTap",value:function(){clearTimeout(this.longTapTimeout)}},{key:"_cancelSingleTap",value:function(){clearTimeout(this.singleTapTimeout)}},{key:"_swipeDirection",value:function(e,t,i,n){return Math.abs(e-t)>=Math.abs(i-n)?e-t>0?"Left":"Right":i-n>0?"Up":"Down"}},{key:"on",value:function(e,t){this[e]&&this[e].add(t)}},{key:"off",value:function(e,t){this[e]&&this[e].del(t)}},{key:"destroy",value:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.twoFingerPressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=this.twoFingerPressMove=null,window.removeEventListener("scroll",this._cancelAllHandler),null}}]);function $(e){var t=function(){var e,t=document.createElement("fakeelement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in i)if(void 0!==t.style[e])return i[e]}(),i=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n=u(e,"gslide-media")?e:e.querySelector(".gslide-media"),s=g(n,".ginner-container"),l=e.querySelector(".gslide-description");i>769&&(n=s),d(n,"greset"),f(n,"translate3d(0, 0, 0)"),h(t,{onElement:n,once:!0,withCallback:function(e,t){c(n,"greset")}}),n.style.opacity="",l&&(l.style.opacity="")}function J(e){if(e.events.hasOwnProperty("touch"))return!1;var t,i,n,s=x(),l=s.width,o=s.height,r=!1,a=null,h=null,v=null,p=!1,m=1,y=1,b=!1,S=!1,w=null,T=null,C=null,k=null,E=0,A=0,L=!1,I=!1,O={},P={},M=0,z=0,X=document.getElementById("glightbox-slider"),Y=document.querySelector(".goverlay"),q=new U(X,{touchStart:function(t){if(r=!0,(u(t.targetTouches[0].target,"ginner-container")||g(t.targetTouches[0].target,".gslide-desc")||"a"==t.targetTouches[0].target.nodeName.toLowerCase())&&(r=!1),g(t.targetTouches[0].target,".gslide-inline")&&!u(t.targetTouches[0].target.parentNode,"gslide-inline")&&(r=!1),r){if(P=t.targetTouches[0],O.pageX=t.targetTouches[0].pageX,O.pageY=t.targetTouches[0].pageY,M=t.targetTouches[0].clientX,z=t.targetTouches[0].clientY,a=e.activeSlide,h=a.querySelector(".gslide-media"),n=a.querySelector(".gslide-inline"),v=null,u(h,"gslide-image")&&(v=h.querySelector("img")),(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>769&&(h=a.querySelector(".ginner-container")),c(Y,"greset"),t.pageX>20&&t.pageX<window.innerWidth-20)return;t.preventDefault()}},touchMove:function(s){if(r&&(P=s.targetTouches[0],!b&&!S)){if(n&&n.offsetHeight>o){var a=O.pageX-P.pageX;if(Math.abs(a)<=13)return!1}p=!0;var d,c=s.targetTouches[0].clientX,u=s.targetTouches[0].clientY,g=M-c,m=z-u;if(Math.abs(g)>Math.abs(m)?(L=!1,I=!0):(I=!1,L=!0),t=P.pageX-O.pageX,E=100*t/l,i=P.pageY-O.pageY,A=100*i/o,L&&v&&(d=1-Math.abs(i)/o,Y.style.opacity=d,e.settings.touchFollowAxis&&(E=0)),I&&(d=1-Math.abs(t)/l,h.style.opacity=d,e.settings.touchFollowAxis&&(A=0)),!v)return f(h,"translate3d(".concat(E,"%, 0, 0)"));f(h,"translate3d(".concat(E,"%, ").concat(A,"%, 0)"))}},touchEnd:function(){if(r){if(p=!1,S||b)return C=w,void(k=T);var t=Math.abs(parseInt(A)),i=Math.abs(parseInt(E));if(!(t>29&&v))return t<29&&i<25?(d(Y,"greset"),Y.style.opacity=1,$(h)):void 0;e.close()}},multipointEnd:function(){setTimeout((function(){b=!1}),50)},multipointStart:function(){b=!0,m=y||1},pinch:function(e){if(!v||p)return!1;b=!0,v.scaleX=v.scaleY=m*e.zoom;var t=m*e.zoom;if(S=!0,t<=1)return S=!1,t=1,k=null,C=null,w=null,T=null,void v.setAttribute("style","");t>4.5&&(t=4.5),v.style.transform="scale3d(".concat(t,", ").concat(t,", 1)"),y=t},pressMove:function(e){if(S&&!b){var t=P.pageX-O.pageX,i=P.pageY-O.pageY;C&&(t+=C),k&&(i+=k),w=t,T=i;var n="translate3d(".concat(t,"px, ").concat(i,"px, 0)");y&&(n+=" scale3d(".concat(y,", ").concat(y,", 1)")),f(v,n)}},swipe:function(t){if(!S)if(b)b=!1;else{if("Left"==t.direction){if(e.index==e.elements.length-1)return $(h);e.nextSlide()}if("Right"==t.direction){if(0==e.index)return $(h);e.prevSlide()}}}});e.events.touch=q}var K=T(),Q=null!==T()||void 0!==document.createTouch||"ontouchstart"in window||"onmsgesturechange"in window||navigator.msMaxTouchPoints,ee=document.getElementsByTagName("html")[0],te={selector:".glightbox",elements:null,skin:"clean",theme:"clean",closeButton:!0,startAt:null,autoplayVideos:!0,autofocusVideos:!0,descPosition:"bottom",width:"900px",height:"506px",videosWidth:"960px",beforeSlideChange:null,afterSlideChange:null,beforeSlideLoad:null,afterSlideLoad:null,slideInserted:null,slideRemoved:null,slideExtraAttributes:null,onOpen:null,onClose:null,loop:!1,zoomable:!0,draggable:!0,dragAutoSnap:!1,dragToleranceX:40,dragToleranceY:65,preload:!0,oneSlidePerOpen:!1,touchNavigation:!0,touchFollowAxis:!0,keyboardNavigation:!0,closeOnOutsideClick:!0,plugins:!1,plyr:{css:"https://cdn.plyr.io/3.6.12/plyr.css",js:"https://cdn.plyr.io/3.6.12/plyr.js",config:{ratio:"16:9",fullscreen:{enabled:!0,iosNative:!0},youtube:{noCookie:!0,rel:0,showinfo:0,iv_load_policy:3},vimeo:{byline:!1,portrait:!1,title:!1,transparent:!1}}},openEffect:"zoom",closeEffect:"zoom",slideEffect:"slide",moreText:"See more",moreLength:60,cssEfects:{fade:{in:"fadeIn",out:"fadeOut"},zoom:{in:"zoomIn",out:"zoomOut"},slide:{in:"slideInRight",out:"slideOutLeft"},slideBack:{in:"slideInLeft",out:"slideOutRight"},none:{in:"none",out:"none"}},svg:{close:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',next:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',prev:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'},slideHTML:'<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',lightboxHTML:'<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>'},ie=s((function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.customOptions=t,this.settings=o(te,t),this.effectsClasses=this.getAnimationClasses(),this.videoPlayers={},this.apiEvents=[],this.fullElementsList=!1}),[{key:"init",value:function(){var e=this,t=this.getSelector();t&&(this.baseEvents=h("click",{onElement:t,withCallback:function(t,i){t.preventDefault(),e.open(i)}})),this.elements=this.getElements()}},{key:"open",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(0===this.elements.length)return!1;this.activeSlide=null,this.prevActiveSlideIndex=null,this.prevActiveSlide=null;var i=z(t)?t:this.settings.startAt;if(E(e)){var n=e.getAttribute("data-gallery");n&&(this.fullElementsList=this.elements,this.elements=this.getGalleryElements(this.elements,n)),O(i)&&(i=this.getElementIndex(e))<0&&(i=0)}z(i)||(i=0),this.build(),v(this.overlay,"none"===this.settings.openEffect?"none":this.settings.cssEfects.fade.in);var s=document.body,l=window.innerWidth-document.documentElement.clientWidth;if(l>0){var o=document.createElement("style");o.type="text/css",o.className="gcss-styles",o.innerText=".gscrollbar-fixer {margin-right: ".concat(l,"px}"),document.head.appendChild(o),d(s,"gscrollbar-fixer")}d(s,"glightbox-open"),d(ee,"glightbox-open"),K&&(d(document.body,"glightbox-mobile"),this.settings.slideEffect="slide"),this.showSlide(i,!0),1===this.elements.length?(d(this.prevButton,"glightbox-button-hidden"),d(this.nextButton,"glightbox-button-hidden")):(c(this.prevButton,"glightbox-button-hidden"),c(this.nextButton,"glightbox-button-hidden")),this.lightboxOpen=!0,this.trigger("open"),C(this.settings.onOpen)&&this.settings.onOpen(),Q&&this.settings.touchNavigation&&J(this),this.settings.keyboardNavigation&&Y(this)}},{key:"openAt",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.open(null,e)}},{key:"showSlide",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];p(this.loader),this.index=parseInt(t);var n=this.slidesContainer.querySelector(".current");n&&c(n,"current"),this.slideAnimateOut();var s=this.slidesContainer.querySelectorAll(".gslide")[t];if(u(s,"loaded"))this.slideAnimateIn(s,i),m(this.loader);else{p(this.loader);var l=this.elements[t],o={index:this.index,slide:s,slideNode:s,slideConfig:l.slideConfig,slideIndex:this.index,trigger:l.node,player:null};this.trigger("slide_before_load",o),l.instance.setContent(s,(function(){m(e.loader),e.resize(),e.slideAnimateIn(s,i),e.trigger("slide_after_load",o)}))}this.slideDescription=s.querySelector(".gslide-description"),this.slideDescriptionContained=this.slideDescription&&u(this.slideDescription.parentNode,"gslide-media"),this.settings.preload&&(this.preloadSlide(t+1),this.preloadSlide(t-1)),this.updateNavigationClasses(),this.activeSlide=s}},{key:"preloadSlide",value:function(e){var t=this;if(e<0||e>this.elements.length-1)return!1;if(O(this.elements[e]))return!1;var i=this.slidesContainer.querySelectorAll(".gslide")[e];if(u(i,"loaded"))return!1;var n=this.elements[e],s=n.type,l={index:e,slide:i,slideNode:i,slideConfig:n.slideConfig,slideIndex:e,trigger:n.node,player:null};this.trigger("slide_before_load",l),"video"===s||"external"===s?setTimeout((function(){n.instance.setContent(i,(function(){t.trigger("slide_after_load",l)}))}),200):n.instance.setContent(i,(function(){t.trigger("slide_after_load",l)}))}},{key:"prevSlide",value:function(){this.goToSlide(this.index-1)}},{key:"nextSlide",value:function(){this.goToSlide(this.index+1)}},{key:"goToSlide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.prevActiveSlide=this.activeSlide,this.prevActiveSlideIndex=this.index,!this.loop()&&(e<0||e>this.elements.length-1))return!1;e<0?e=this.elements.length-1:e>=this.elements.length&&(e=0),this.showSlide(e)}},{key:"insertSlide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;t<0&&(t=this.elements.length);var i=new V(e,this,t),n=i.getConfig(),s=o({},n),l=i.create(),r=this.elements.length-1;s.index=t,s.node=!1,s.instance=i,s.slideConfig=n,this.elements.splice(t,0,s);var a=null,h=null;if(this.slidesContainer){if(t>r)this.slidesContainer.appendChild(l);else{var d=this.slidesContainer.querySelectorAll(".gslide")[t];this.slidesContainer.insertBefore(l,d)}(this.settings.preload&&0==this.index&&0==t||this.index-1==t||this.index+1==t)&&this.preloadSlide(t),0===this.index&&0===t&&(this.index=1),this.updateNavigationClasses(),a=this.slidesContainer.querySelectorAll(".gslide")[t],h=this.getSlidePlayerInstance(t),s.slideNode=a}this.trigger("slide_inserted",{index:t,slide:a,slideNode:a,slideConfig:n,slideIndex:t,trigger:null,player:h}),C(this.settings.slideInserted)&&this.settings.slideInserted({index:t,slide:a,player:h})}},{key:"removeSlide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;if(e<0||e>this.elements.length-1)return!1;var t=this.slidesContainer&&this.slidesContainer.querySelectorAll(".gslide")[e];t&&(this.getActiveSlideIndex()==e&&(e==this.elements.length-1?this.prevSlide():this.nextSlide()),t.parentNode.removeChild(t)),this.elements.splice(e,1),this.trigger("slide_removed",e),C(this.settings.slideRemoved)&&this.settings.slideRemoved(e)}},{key:"slideAnimateIn",value:function(e,t){var i=this,n=e.querySelector(".gslide-media"),s=e.querySelector(".gslide-description"),l={index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,slideNode:this.prevActiveSlide,slideIndex:this.prevActiveSlide,slideConfig:O(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].slideConfig,trigger:O(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].node,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},o={index:this.index,slide:this.activeSlide,slideNode:this.activeSlide,slideConfig:this.elements[this.index].slideConfig,slideIndex:this.index,trigger:this.elements[this.index].node,player:this.getSlidePlayerInstance(this.index)};if(n.offsetWidth>0&&s&&(m(s),s.style.display=""),c(e,this.effectsClasses),t)v(e,this.settings.cssEfects[this.settings.openEffect].in,(function(){i.settings.autoplayVideos&&i.slidePlayerPlay(e),i.trigger("slide_changed",{prev:l,current:o}),C(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[l,o])}));else{var r=this.settings.slideEffect,a="none"!==r?this.settings.cssEfects[r].in:r;this.prevActiveSlideIndex>this.index&&"slide"==this.settings.slideEffect&&(a=this.settings.cssEfects.slideBack.in),v(e,a,(function(){i.settings.autoplayVideos&&i.slidePlayerPlay(e),i.trigger("slide_changed",{prev:l,current:o}),C(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[l,o])}))}setTimeout((function(){i.resize(e)}),100),d(e,"current")}},{key:"slideAnimateOut",value:function(){if(!this.prevActiveSlide)return!1;var e=this.prevActiveSlide;c(e,this.effectsClasses),d(e,"prev");var t=this.settings.slideEffect,i="none"!==t?this.settings.cssEfects[t].out:t;this.slidePlayerPause(e),this.trigger("slide_before_change",{prev:{index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,slideNode:this.prevActiveSlide,slideIndex:this.prevActiveSlideIndex,slideConfig:O(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].slideConfig,trigger:O(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].node,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},current:{index:this.index,slide:this.activeSlide,slideNode:this.activeSlide,slideIndex:this.index,slideConfig:this.elements[this.index].slideConfig,trigger:this.elements[this.index].node,player:this.getSlidePlayerInstance(this.index)}}),C(this.settings.beforeSlideChange)&&this.settings.beforeSlideChange.apply(this,[{index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},{index:this.index,slide:this.activeSlide,player:this.getSlidePlayerInstance(this.index)}]),this.prevActiveSlideIndex>this.index&&"slide"==this.settings.slideEffect&&(i=this.settings.cssEfects.slideBack.out),v(e,i,(function(){var t=e.querySelector(".ginner-container"),i=e.querySelector(".gslide-media"),n=e.querySelector(".gslide-description");t.style.transform="",i.style.transform="",c(i,"greset"),i.style.opacity="",n&&(n.style.opacity=""),c(e,"prev")}))}},{key:"getAllPlayers",value:function(){return this.videoPlayers}},{key:"getSlidePlayerInstance",value:function(e){var t="gvideo"+e,i=this.getAllPlayers();return!(!P(i,t)||!i[t])&&i[t]}},{key:"stopSlideVideo",value:function(e){if(E(e)){var t=e.querySelector(".gvideo-wrapper");t&&(e=t.getAttribute("data-index"))}console.log("stopSlideVideo is deprecated, use slidePlayerPause");var i=this.getSlidePlayerInstance(e);i&&i.playing&&i.pause()}},{key:"slidePlayerPause",value:function(e){if(E(e)){var t=e.querySelector(".gvideo-wrapper");t&&(e=t.getAttribute("data-index"))}var i=this.getSlidePlayerInstance(e);i&&i.playing&&i.pause()}},{key:"playSlideVideo",value:function(e){if(E(e)){var t=e.querySelector(".gvideo-wrapper");t&&(e=t.getAttribute("data-index"))}console.log("playSlideVideo is deprecated, use slidePlayerPlay");var i=this.getSlidePlayerInstance(e);i&&!i.playing&&i.play()}},{key:"slidePlayerPlay",value:function(e){var t;if(!K||null!==(t=this.settings.plyr.config)&&void 0!==t&&t.muted){if(E(e)){var i=e.querySelector(".gvideo-wrapper");i&&(e=i.getAttribute("data-index"))}var n=this.getSlidePlayerInstance(e);n&&!n.playing&&(n.play(),this.settings.autofocusVideos&&n.elements.container.focus())}}},{key:"setElements",value:function(e){var t=this;this.settings.elements=!1;var i=[];e&&e.length&&r(e,(function(e,n){var s=new V(e,t,n),l=s.getConfig(),r=o({},l);r.slideConfig=l,r.instance=s,r.index=n,i.push(r)})),this.elements=i,this.lightboxOpen&&(this.slidesContainer.innerHTML="",this.elements.length&&(r(this.elements,(function(){var e=y(t.settings.slideHTML);t.slidesContainer.appendChild(e)})),this.showSlide(0,!0)))}},{key:"getElementIndex",value:function(e){var t=!1;return r(this.elements,(function(i,n){if(P(i,"node")&&i.node==e)return t=n,!0})),t}},{key:"getElements",value:function(){var e=this,t=[];this.elements=this.elements?this.elements:[],!O(this.settings.elements)&&A(this.settings.elements)&&this.settings.elements.length&&r(this.settings.elements,(function(i,n){var s=new V(i,e,n),l=s.getConfig(),r=o({},l);r.node=!1,r.index=n,r.instance=s,r.slideConfig=l,t.push(r)}));var i=!1;return this.getSelector()&&(i=document.querySelectorAll(this.getSelector())),i?(r(i,(function(i,n){var s=new V(i,e,n),l=s.getConfig(),r=o({},l);r.node=i,r.index=n,r.instance=s,r.slideConfig=l,r.gallery=i.getAttribute("data-gallery"),t.push(r)})),t):t}},{key:"getGalleryElements",value:function(e,t){return e.filter((function(e){return e.gallery==t}))}},{key:"getSelector",value:function(){return!this.settings.elements&&(this.settings.selector&&"data-"==this.settings.selector.substring(0,5)?"*[".concat(this.settings.selector,"]"):this.settings.selector)}},{key:"getActiveSlide",value:function(){return this.slidesContainer.querySelectorAll(".gslide")[this.index]}},{key:"getActiveSlideIndex",value:function(){return this.index}},{key:"getAnimationClasses",value:function(){var e=[];for(var t in this.settings.cssEfects)if(this.settings.cssEfects.hasOwnProperty(t)){var i=this.settings.cssEfects[t];e.push("g".concat(i.in)),e.push("g".concat(i.out))}return e.join(" ")}},{key:"build",value:function(){var e=this;if(this.built)return!1;var t=document.body.childNodes,i=[];r(t,(function(e){e.parentNode==document.body&&"#"!==e.nodeName.charAt(0)&&e.hasAttribute&&!e.hasAttribute("aria-hidden")&&(i.push(e),e.setAttribute("aria-hidden","true"))}));var n=P(this.settings.svg,"next")?this.settings.svg.next:"",s=P(this.settings.svg,"prev")?this.settings.svg.prev:"",l=P(this.settings.svg,"close")?this.settings.svg.close:"",o=this.settings.lightboxHTML;o=y(o=(o=(o=o.replace(/{nextSVG}/g,n)).replace(/{prevSVG}/g,s)).replace(/{closeSVG}/g,l)),document.body.appendChild(o);var a=document.getElementById("glightbox-body");this.modal=a;var c=a.querySelector(".gclose");this.prevButton=a.querySelector(".gprev"),this.nextButton=a.querySelector(".gnext"),this.overlay=a.querySelector(".goverlay"),this.loader=a.querySelector(".gloader"),this.slidesContainer=document.getElementById("glightbox-slider"),this.bodyHiddenChildElms=i,this.events={},d(this.modal,"glightbox-"+this.settings.skin),this.settings.closeButton&&c&&(this.events.close=h("click",{onElement:c,withCallback:function(t,i){t.preventDefault(),e.close()}})),c&&!this.settings.closeButton&&c.parentNode.removeChild(c),this.nextButton&&(this.events.next=h("click",{onElement:this.nextButton,withCallback:function(t,i){t.preventDefault(),e.nextSlide()}})),this.prevButton&&(this.events.prev=h("click",{onElement:this.prevButton,withCallback:function(t,i){t.preventDefault(),e.prevSlide()}})),this.settings.closeOnOutsideClick&&(this.events.outClose=h("click",{onElement:a,withCallback:function(t,i){e.preventOutsideClick||u(document.body,"glightbox-mobile")||g(t.target,".ginner-container")||g(t.target,".gbtn")||u(t.target,"gnext")||u(t.target,"gprev")||e.close()}})),r(this.elements,(function(t,i){e.slidesContainer.appendChild(t.instance.create()),t.slideNode=e.slidesContainer.querySelectorAll(".gslide")[i]})),Q&&d(document.body,"glightbox-touch"),this.events.resize=h("resize",{onElement:window,withCallback:function(){e.resize()}}),this.built=!0}},{key:"resize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if((e=e||this.activeSlide)&&!u(e,"zoomed")){var t=x(),i=e.querySelector(".gvideo-wrapper"),n=e.querySelector(".gslide-image"),s=this.slideDescription,l=t.width,o=t.height;if(l<=768?d(document.body,"glightbox-mobile"):c(document.body,"glightbox-mobile"),i||n){var r=!1;if(s&&(u(s,"description-bottom")||u(s,"description-top"))&&!u(s,"gabsolute")&&(r=!0),n)if(l<=768)n.querySelector("img");else if(r){var a,h=s.offsetHeight,g=n.querySelector("img"),v=this.elements[this.index].node,f=null!==(a=v.getAttribute("data-height"))&&void 0!==a?a:"100vh";g.setAttribute("style","max-height: calc(".concat(f," - ").concat(h,"px)")),s.setAttribute("style","max-width: ".concat(g.offsetWidth,"px;"))}if(i){var p=P(this.settings.plyr.config,"ratio")?this.settings.plyr.config.ratio:"";if(!p){var m=i.clientWidth,y=i.clientHeight,b=m/y;p="".concat(m/b,":").concat(y/b)}var S=p.split(":"),w=this.settings.videosWidth,T=this.settings.videosWidth,C=(T=z(w)||-1!==w.indexOf("px")?parseInt(w):-1!==w.indexOf("vw")?l*parseInt(w)/100:-1!==w.indexOf("vh")?o*parseInt(w)/100:-1!==w.indexOf("%")?l*parseInt(w)/100:parseInt(i.clientWidth))/(parseInt(S[0])/parseInt(S[1]));if(C=Math.floor(C),r&&(o-=s.offsetHeight),T>l||C>o||o<C&&l>T){var k=i.offsetWidth,E=i.offsetHeight,A=o/E,L={width:k*A,height:E*A};i.parentNode.setAttribute("style","max-width: ".concat(L.width,"px")),r&&s.setAttribute("style","max-width: ".concat(L.width,"px;"))}else i.parentNode.style.maxWidth="".concat(w),r&&s.setAttribute("style","max-width: ".concat(w,";"))}}}}},{key:"reload",value:function(){this.init()}},{key:"updateNavigationClasses",value:function(){var e=this.loop();c(this.nextButton,"disabled"),c(this.prevButton,"disabled"),0==this.index&&this.elements.length-1==0?(d(this.prevButton,"disabled"),d(this.nextButton,"disabled")):0!==this.index||e?this.index!==this.elements.length-1||e||d(this.nextButton,"disabled"):d(this.prevButton,"disabled")}},{key:"loop",value:function(){var e=P(this.settings,"loopAtEnd")?this.settings.loopAtEnd:null;return e=P(this.settings,"loop")?this.settings.loop:e,e}},{key:"close",value:function(){var e=this;if(!this.lightboxOpen){if(this.events){for(var t in this.events)this.events.hasOwnProperty(t)&&this.events[t].destroy();this.events=null}return!1}if(this.closing)return!1;this.closing=!0,this.slidePlayerPause(this.activeSlide),this.fullElementsList&&(this.elements=this.fullElementsList),this.bodyHiddenChildElms.length&&r(this.bodyHiddenChildElms,(function(e){e.removeAttribute("aria-hidden")})),d(this.modal,"glightbox-closing"),v(this.overlay,"none"==this.settings.openEffect?"none":this.settings.cssEfects.fade.out),v(this.activeSlide,this.settings.cssEfects[this.settings.closeEffect].out,(function(){if(e.activeSlide=null,e.prevActiveSlideIndex=null,e.prevActiveSlide=null,e.built=!1,e.events){for(var t in e.events)e.events.hasOwnProperty(t)&&e.events[t].destroy();e.events=null}var i=document.body;c(ee,"glightbox-open"),c(i,"glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"),e.modal.parentNode.removeChild(e.modal),e.trigger("close"),C(e.settings.onClose)&&e.settings.onClose();var n=document.querySelector(".gcss-styles");n&&n.parentNode.removeChild(n),e.lightboxOpen=!1,e.closing=null}))}},{key:"destroy",value:function(){this.close(),this.clearAllEvents(),this.baseEvents&&this.baseEvents.destroy()}},{key:"on",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e||!C(t))throw new TypeError("Event name and callback must be defined");this.apiEvents.push({evt:e,once:i,callback:t})}},{key:"once",value:function(e,t){this.on(e,t,!0)}},{key:"trigger",value:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=[];r(this.apiEvents,(function(t,s){var l=t.evt,o=t.once,r=t.callback;l==e&&(r(i),o&&n.push(s))})),n.length&&r(n,(function(e){return t.apiEvents.splice(e,1)}))}},{key:"clearAllEvents",value:function(){this.apiEvents.splice(0,this.apiEvents.length)}},{key:"version",value:function(){return"3.3.0"}}]);return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new ie(e);return t.init(),t}}));

/***/ }),

/***/ 4415:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var ArrayStrategy_1 = __webpack_require__(4243);
var Messages = __webpack_require__(4581);
var Config = /** @class */ (function () {
    function Config() {
        this.deep = false;
        this.useReferenceIfTargetUnset = false;
        this.useReferenceIfArray = false;
        this.preserveTypeIfTargetUnset = false;
        this.includeReadOnly = false;
        this.includeNonEmurable = false;
        this.arrayStrategy = ArrayStrategy_1.default.REPLACE;
        this.errorMessage = Messages.MERGE_ERROR;
        Object.seal(this);
    }
    return Config;
}());
exports["default"] = Config;
//# sourceMappingURL=Config.js.map

/***/ }),

/***/ 4243:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var ArrayStrategy;
(function (ArrayStrategy) {
    ArrayStrategy["PUSH"] = "PUSH";
    ArrayStrategy["REPLACE"] = "REPLACE";
})(ArrayStrategy || (ArrayStrategy = {}));
exports["default"] = ArrayStrategy;
//# sourceMappingURL=ArrayStrategy.js.map

/***/ }),

/***/ 9691:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var merge_1 = __webpack_require__(3849);
var FluentMerge = /** @class */ (function () {
    function FluentMerge() {
        this.target = null;
        this.sources = [];
        this.config = {};
    }
    /**
     * Supplies a fluent merge instance with a target object to merge into and return.
     */
    FluentMerge.prototype.to = function (target) {
        this.target = target;
        return this;
    };
    /**
     * Supplies a fluent merge instance with one or more source objects to merge from, in right to left order.
     */
    FluentMerge.prototype.from = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        this.sources = sources;
        return this;
    };
    /**
     * Supplies a fluent merge instance with a configuration object of one or more options.
     */
    FluentMerge.prototype.with = function (options) {
        this.config = options;
        return this;
    };
    /**
     * Executes a fluent merge instance, merging all provided sources into the
     * target, as per any provided configuration, and returning a reference to
     * the target.
     */
    FluentMerge.prototype.exec = function () {
        var _this = this;
        return this.sources.reduce(function (target, source) { return merge_1.default(target, source, _this.config); }, this.target || {});
    };
    return FluentMerge;
}());
exports["default"] = FluentMerge;
//# sourceMappingURL=FluentMerge.js.map

/***/ }),

/***/ 4581:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MERGE_ERROR = function (offender, suggestion) {
    if (suggestion === void 0) { suggestion = ''; }
    return "Unknown property \"" + offender + "\"" + (suggestion ? ". Did you mean \"" + suggestion + "\"?" : '');
};
exports.TYPE_ERROR_TARGET = function (target) {
    return "[Helpful Merge] Target \"" + target + "\" must be a valid object";
};
exports.TYPE_ERROR_SOURCE = function (source) {
    return "[Helpful Merge] Source \"" + source + "\" must be a valid object";
};
exports.INVALID_ARRAY_STRATEGY = function (strategy) {
    return "[Helpful Merge] Invalid array strategy \"" + strategy + "\"";
};
//# sourceMappingURL=Messages.js.map

/***/ }),

/***/ 5386:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function deriveCustoTypeInstance(_a) {
    var constructor = _a.constructor;
    if (typeof constructor === 'function' && constructor !== Object) {
        return new constructor();
    }
    return {};
}
exports["default"] = deriveCustoTypeInstance;
//# sourceMappingURL=deriveCustomTypeInstance.js.map

/***/ }),

/***/ 2253:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function handleMergeError(err, target, offendingKey, message) {
    // Rethrow if any of the following:
    // - offending key already exists on target
    // - object not sealed
    // - is extensible
    // - error not a TypeError
    if (Object.hasOwnProperty.call(target, offendingKey) ||
        !Object.isSealed(target) ||
        Object.isExtensible(target) ||
        !(err instanceof TypeError))
        throw err;
    var reducer = reduceBestMatch.bind(null, offendingKey, offendingKey.toLowerCase());
    var primer = { key: '', delta: Infinity, totalMatching: 0 };
    // Iterate through keys in target, for each key, compare with
    // the offending key. Greatest number of matching characters wins.
    var bestMatch = Object.keys(target).reduce(reducer, primer);
    var suggestion = bestMatch && bestMatch.totalMatching > 1 ? bestMatch.key : '';
    throw new TypeError(message(offendingKey, suggestion));
}
/**
 * Compares current key with current best match.
 */
function reduceBestMatch(offendingKeyLower, offendingKey, currBestMatch, currKey) {
    var totalMatching = getTotalMatching(currKey.toLowerCase(), offendingKeyLower);
    var delta = Math.abs(currKey.length - offendingKey.length);
    if (totalMatching > currBestMatch.totalMatching ||
        (totalMatching === currBestMatch.totalMatching && delta < currBestMatch.delta)) {
        // If a greater number of matching characters, or the same
        // number, but a lesser delta, usurp the best match
        return { key: currKey, delta: delta, totalMatching: totalMatching };
    }
    return currBestMatch;
}
/**
 * Returns the number of common, consecutive characters
 * between two strings.
 */
function getTotalMatching(possibleKey, offendingKey) {
    var longer = possibleKey.length > offendingKey.length ? possibleKey : offendingKey;
    var shorter = longer === possibleKey ? offendingKey : possibleKey;
    var leftPointer = 0;
    var leftInnerPointer = 0;
    var leftTotalMatching = 0;
    var lastCommonIndex = -1;
    for (; leftPointer < longer.length; leftPointer++) {
        while (leftTotalMatching === 0 &&
            longer[leftPointer] !== shorter[leftInnerPointer] &&
            leftInnerPointer < shorter.length) {
            // No match at present, move innerPointer through all possible
            // indices until a match is found
            leftInnerPointer++;
        }
        if (longer[leftPointer] === shorter[leftInnerPointer]) {
            // Match found
            if (lastCommonIndex !== leftPointer - 1) {
                // If beginning of a new match, reset total common
                leftTotalMatching = 0;
            }
            lastCommonIndex = leftPointer;
            leftTotalMatching++;
            leftInnerPointer++;
            // Whole word matched, end
            if (leftTotalMatching === shorter.length)
                break;
        }
        else if (leftTotalMatching > 1) {
            // No match, but at least two common characters found, end
            break;
        }
        else {
            // No match at this index, reset
            leftTotalMatching = leftInnerPointer = 0;
        }
    }
    lastCommonIndex = -1;
    var rightPointer = 0;
    var rightInnerPointer = 0;
    var rightTotalMatching = 0;
    var longerLastIndex = longer.length - 1;
    var shorterLastIndex = shorter.length - 1;
    // As above, but from right to left
    for (; rightPointer < longer.length - leftPointer; rightPointer++) {
        while (rightTotalMatching === 0 &&
            longer[longerLastIndex - rightPointer] !== shorter[shorterLastIndex - rightInnerPointer] &&
            rightInnerPointer < shorter.length) {
            rightInnerPointer++;
        }
        if (longer[longerLastIndex - rightPointer] === shorter[shorterLastIndex - rightInnerPointer]) {
            if (lastCommonIndex !== rightPointer - 1)
                rightTotalMatching = 0;
            lastCommonIndex = rightPointer;
            rightTotalMatching++;
            rightInnerPointer++;
        }
        else if (rightTotalMatching > 1) {
            break;
        }
        else {
            rightTotalMatching = rightInnerPointer = 0;
        }
    }
    return Math.min(shorter.length, leftTotalMatching + rightTotalMatching);
}
exports.getTotalMatching = getTotalMatching;
exports["default"] = handleMergeError;
//# sourceMappingURL=handleMergeError.js.map

/***/ }),

/***/ 9117:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var merge_1 = __webpack_require__(3849);
var ArrayStrategy_1 = __webpack_require__(4243);
exports.ArrayStrategy = ArrayStrategy_1.default;
exports["default"] = merge_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3849:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Config_1 = __webpack_require__(4415);
var ArrayStrategy_1 = __webpack_require__(4243);
var deriveCustomTypeInstance_1 = __webpack_require__(5386);
var FluentMerge_1 = __webpack_require__(9691);
var handleMergeError_1 = __webpack_require__(2253);
var Messages = __webpack_require__(4581);
function merge(target, source, options) {
    if (options === void 0) { options = null; }
    var isClientSide = typeof window !== 'undefined';
    var sourceKeys = [];
    var config;
    if (options instanceof Config_1.default) {
        config = options;
    }
    else {
        config = new Config_1.default();
    }
    if (typeof options === 'boolean' && options === true) {
        config.deep = true;
    }
    else if (options && config !== options && typeof options === 'object') {
        merge(config, options);
        if ([ArrayStrategy_1.default.PUSH, ArrayStrategy_1.default.REPLACE].indexOf(config.arrayStrategy) < 0) {
            throw RangeError(Messages.INVALID_ARRAY_STRATEGY(config.arrayStrategy));
        }
    }
    if (!target || typeof target !== 'object') {
        throw new TypeError(Messages.TYPE_ERROR_TARGET(target));
    }
    if (!source || typeof source !== 'object') {
        throw new TypeError(Messages.TYPE_ERROR_SOURCE(source));
    }
    if (Array.isArray(source)) {
        if (config.arrayStrategy === ArrayStrategy_1.default.PUSH) {
            // Merge arrays via push()
            target.push.apply(target, source);
            return target;
        }
        for (var i = 0; i < source.length; i++) {
            sourceKeys.push(i.toString());
        }
    }
    else {
        sourceKeys = Object.getOwnPropertyNames(source);
    }
    for (var _i = 0, sourceKeys_1 = sourceKeys; _i < sourceKeys_1.length; _i++) {
        var key = sourceKeys_1[_i];
        var descriptor = Object.getOwnPropertyDescriptor(source, key);
        // Skip read-only properties
        if (typeof descriptor.get === 'function' && !descriptor.set && !config.includeReadOnly)
            continue;
        // Skip non-enumerable properties
        if (!descriptor.enumerable && !config.includeNonEmurable)
            continue;
        if (!config.deep ||
            typeof source[key] !== 'object' ||
            (isClientSide && source[key] instanceof window.Node) ||
            (isClientSide && source[key] === window.document.body) ||
            (isClientSide && source[key] === window.document.documentElement) ||
            source[key] === null ||
            (Array.isArray(source[key]) && config.useReferenceIfArray) ||
            (!target[key] && config.useReferenceIfTargetUnset)) {
            // If:
            // - Shallow merge
            // - All non-object primatives
            // - <html>, <body>, or DOM Nodes
            // - Null pointers
            // - Arrays, if `useReferenceIfArray` set
            // - Target prop null or undefined and `useRererenceIfTargetUnset` set
            try {
                target[key] = source[key];
            }
            catch (err) {
                handleMergeError_1.default(err, target, key, config.errorMessage);
            }
        }
        else {
            // Deep merge objects/arrays
            if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] === null) {
                // If property does not exist on target, instantiate an empty
                // object, custom type or array to merge into
                try {
                    target[key] = Array.isArray(source[key]) ?
                        [] : config.preserveTypeIfTargetUnset ?
                        deriveCustomTypeInstance_1.default(source[key]) : {};
                }
                catch (err) {
                    handleMergeError_1.default(err, target, key, config.errorMessage);
                }
            }
            // Recursively deep copy objects or arrays
            merge(target[key], source[key], config);
        }
    }
    return target;
}
var createFluent = function (method) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = new FluentMerge_1.default())[method].apply(_a, args);
    var _a;
}; };
Object
    .keys(FluentMerge_1.default.prototype)
    .forEach(function (method) { return merge[method] = createFluent(method); });
exports["default"] = merge;
//# sourceMappingURL=merge.js.map

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ !function() {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function() { return module['default']; } :
/******/ 			function() { return module; };
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ }();
/******/
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {

;// CONCATENATED MODULE: ./src/assets/js/modules/_popups.js
class Popup {
    constructor(name) {
        this.openedClass = 'opened'
        this.noscrollClass = 'data-noscroll'
        this.overlayClass = 'data-not-overlay'

        this.name = name
        this.target = name.getAttribute('data-popup')

        this.opener = document.querySelectorAll(`[data-opener="${this.target}"]`)
        this.toggler = document.querySelector(`[data-toggler="${this.target}"]`)
        this.popup = document.querySelector(`[data-popup="${this.target}"]`)
        this.closer = document.querySelectorAll(`[data-closer="${this.target}"]`)
        this.overlay = document.querySelector('.overlay')

        this.initControllers()
    }

    togglePopup(event) {
        this.popup.classList.toggle(this.openedClass)

        if (this.popup.hasAttribute(this.noscrollClass)) {
            this.toggleNoscrollBody(true)
        }

        if (!this.popup.hasAttribute(this.overlayClass)) {
            if (this.toggler.classList.contains('opened')) {
                this.overlay.classList.remove(this.openedClass)
            }
        }

        this.updateControllers()
    }

    openPopup(event) {
        this.popup.classList.add(this.openedClass)

        if (this.popup.hasAttribute(this.noscrollClass)) {
            this.toggleNoscrollBody(true)
        }

        if (!this.popup.hasAttribute(this.overlayClass)) {
            this.overlay.classList.add(this.openedClass)
        }

        this.updateControllers()
    }

    closePopup(event) {
        this.popup.classList.remove(this.openedClass)

        if (document.body.classList.contains('noscroll')) {
            this.toggleNoscrollBody()
        }

        if (this.overlay.classList.contains(this.openedClass)) {
            this.overlay.classList.remove(this.openedClass)
        }

        this.updateControllers()
    }

    toggleNoscrollBody() {
        if (document.body.classList.contains('noscroll')) {
            document.body.classList.remove('noscroll')
            document.querySelector('html').classList.remove('noscroll')
        } else {
            document.body.classList.add('noscroll')
            document.querySelector('html').classList.add('noscroll')
        }
    }

    // чек контроллеров
    updateControllers() {
        if (this.popup.classList.contains(this.openedClass)) {
            if (this.opener.length) {
                this.opener.forEach(x => x.classList.add(this.openedClass))
            } else if (this.toggler) {
                this.toggler.classList.add(this.openedClass)
            }
        } else {
            if (this.opener.length) {
                this.opener.forEach(x => x.classList.remove(this.openedClass))
            } else if (this.toggler) {
                this.toggler.classList.remove(this.openedClass)
            }
        }
    }

    // инициализация контроллеров
    initControllers() {
        if (this.opener.length) {
            this.opener.forEach(x => x.addEventListener('click', (e) => {
                e.stopPropagation()
                this.openPopup()

                if (!this.popup.classList.contains('inited')) {
                    this.popup.addEventListener('click', e => {
                        e.stopPropagation()
                    })

                    this.overlay.addEventListener('click', () => {
                        document.querySelector('[data-popup].opened') && document.querySelector('[data-popup].opened [data-closer]').click()
                    })

                    this.popup.classList.add('inited')
                }
            }))
        }

        if (this.toggler) {
            this.toggler.addEventListener('click', (e) => {
                e.stopPropagation()
                this.togglePopup()
            })
        }

        if (this.closer.length) {
            this.closer.forEach(x => x.addEventListener('click', (e) => {
                e.stopPropagation()
                this.closePopup()
            }))
        }
    }

    // глобальные бинды
    // пример: openPopup_xx()
    bindGlobalControls() {
        window[`closePopup_${this.target}`] = this.closePopup.bind(this)
        window[`openPopup_${this.target}`] = this.openPopup.bind(this)
    }
}
;// CONCATENATED MODULE: ./node_modules/imask/esm/core/utils.js
/** Checks if value is string */
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

/** Checks if value is object */
function isObject(obj) {
  var _obj$constructor;
  return typeof obj === 'object' && obj != null && (obj == null || (_obj$constructor = obj.constructor) == null ? void 0 : _obj$constructor.name) === 'Object';
}
function pick(obj, keys) {
  if (Array.isArray(keys)) return pick(obj, (_, k) => keys.includes(k));
  return Object.entries(obj).reduce((acc, _ref) => {
    let [k, v] = _ref;
    if (keys(v, k)) acc[k] = v;
    return acc;
  }, {});
}

/** Direction */
const DIRECTION = {
  NONE: 'NONE',
  LEFT: 'LEFT',
  FORCE_LEFT: 'FORCE_LEFT',
  RIGHT: 'RIGHT',
  FORCE_RIGHT: 'FORCE_RIGHT'
};

/** Direction */

function forceDirection(direction) {
  switch (direction) {
    case DIRECTION.LEFT:
      return DIRECTION.FORCE_LEFT;
    case DIRECTION.RIGHT:
      return DIRECTION.FORCE_RIGHT;
    default:
      return direction;
  }
}

/** Escapes regular expression control chars */
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

// cloned from https://github.com/epoberezkin/fast-deep-equal with small changes
function objectIncludes(b, a) {
  if (a === b) return true;
  const arrA = Array.isArray(a),
    arrB = Array.isArray(b);
  let i;
  if (arrA && arrB) {
    if (a.length != b.length) return false;
    for (i = 0; i < a.length; i++) if (!objectIncludes(a[i], b[i])) return false;
    return true;
  }
  if (arrA != arrB) return false;
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const dateA = a instanceof Date,
      dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;
    const regexpA = a instanceof RegExp,
      regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;
    const keys = Object.keys(a);
    // if (keys.length !== Object.keys(b).length) return false;

    for (i = 0; i < keys.length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = 0; i < keys.length; i++) if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
    return true;
  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }
  return false;
}

/** Selection range */



;// CONCATENATED MODULE: ./node_modules/imask/esm/core/action-details.js


/** Provides details of changing input */
class ActionDetails {
  /** Current input value */

  /** Current cursor position */

  /** Old input value */

  /** Old selection */

  constructor(opts) {
    Object.assign(this, opts);

    // double check if left part was changed (autofilling, other non-standard input triggers)
    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
      --this.oldSelection.start;
    }
    if (this.insertedCount) {
      // double check right part
      while (this.value.slice(this.cursorPos) !== this.oldValue.slice(this.oldSelection.end)) {
        if (this.value.length - this.cursorPos < this.oldValue.length - this.oldSelection.end) ++this.oldSelection.end;else ++this.cursorPos;
      }
    }
  }

  /** Start changing position */
  get startChangePos() {
    return Math.min(this.cursorPos, this.oldSelection.start);
  }

  /** Inserted symbols count */
  get insertedCount() {
    return this.cursorPos - this.startChangePos;
  }

  /** Inserted symbols */
  get inserted() {
    return this.value.substr(this.startChangePos, this.insertedCount);
  }

  /** Removed symbols count */
  get removedCount() {
    // Math.max for opposite operation
    return Math.max(this.oldSelection.end - this.startChangePos ||
    // for Delete
    this.oldValue.length - this.value.length, 0);
  }

  /** Removed symbols */
  get removed() {
    return this.oldValue.substr(this.startChangePos, this.removedCount);
  }

  /** Unchanged head symbols */
  get head() {
    return this.value.substring(0, this.startChangePos);
  }

  /** Unchanged tail symbols */
  get tail() {
    return this.value.substring(this.startChangePos + this.insertedCount);
  }

  /** Remove direction */
  get removeDirection() {
    if (!this.removedCount || this.insertedCount) return DIRECTION.NONE;

    // align right if delete at right
    return (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) &&
    // if not range removed (event with backspace)
    this.oldSelection.end === this.oldSelection.start ? DIRECTION.RIGHT : DIRECTION.LEFT;
  }
}



;// CONCATENATED MODULE: ./node_modules/imask/esm/core/holder.js
/** Applies mask on element */
function IMask(el, opts) {
  // currently available only for input-like elements
  return new IMask.InputMask(el, opts);
}



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/factory.js



// TODO can't use overloads here because of https://github.com/microsoft/TypeScript/issues/50754
// export function maskedClass(mask: string): typeof MaskedPattern;
// export function maskedClass(mask: DateConstructor): typeof MaskedDate;
// export function maskedClass(mask: NumberConstructor): typeof MaskedNumber;
// export function maskedClass(mask: Array<any> | ArrayConstructor): typeof MaskedDynamic;
// export function maskedClass(mask: MaskedDate): typeof MaskedDate;
// export function maskedClass(mask: MaskedNumber): typeof MaskedNumber;
// export function maskedClass(mask: MaskedEnum): typeof MaskedEnum;
// export function maskedClass(mask: MaskedRange): typeof MaskedRange;
// export function maskedClass(mask: MaskedRegExp): typeof MaskedRegExp;
// export function maskedClass(mask: MaskedFunction): typeof MaskedFunction;
// export function maskedClass(mask: MaskedPattern): typeof MaskedPattern;
// export function maskedClass(mask: MaskedDynamic): typeof MaskedDynamic;
// export function maskedClass(mask: Masked): typeof Masked;
// export function maskedClass(mask: typeof Masked): typeof Masked;
// export function maskedClass(mask: typeof MaskedDate): typeof MaskedDate;
// export function maskedClass(mask: typeof MaskedNumber): typeof MaskedNumber;
// export function maskedClass(mask: typeof MaskedEnum): typeof MaskedEnum;
// export function maskedClass(mask: typeof MaskedRange): typeof MaskedRange;
// export function maskedClass(mask: typeof MaskedRegExp): typeof MaskedRegExp;
// export function maskedClass(mask: typeof MaskedFunction): typeof MaskedFunction;
// export function maskedClass(mask: typeof MaskedPattern): typeof MaskedPattern;
// export function maskedClass(mask: typeof MaskedDynamic): typeof MaskedDynamic;
// export function maskedClass<Mask extends typeof Masked> (mask: Mask): Mask;
// export function maskedClass(mask: RegExp): typeof MaskedRegExp;
// export function maskedClass(mask: (value: string, ...args: any[]) => boolean): typeof MaskedFunction;

/** Get Masked class by mask type */
function maskedClass(mask) /* TODO */{
  if (mask == null) throw new Error('mask property should be defined');
  if (mask instanceof RegExp) return IMask.MaskedRegExp;
  if (isString(mask)) return IMask.MaskedPattern;
  if (mask === Date) return IMask.MaskedDate;
  if (mask === Number) return IMask.MaskedNumber;
  if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic;
  if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask;
  if (IMask.Masked && mask instanceof IMask.Masked) return mask.constructor;
  if (mask instanceof Function) return IMask.MaskedFunction;
  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
  return IMask.Masked;
}
function normalizeOpts(opts) {
  if (!opts) throw new Error('Options in not defined');
  if (IMask.Masked) {
    if (opts.prototype instanceof IMask.Masked) return {
      mask: opts
    };

    /*
      handle cases like:
      1) opts = Masked
      2) opts = { mask: Masked, ...instanceOpts }
    */
    const {
      mask = undefined,
      ...instanceOpts
    } = opts instanceof IMask.Masked ? {
      mask: opts
    } : isObject(opts) && opts.mask instanceof IMask.Masked ? opts : {};
    if (mask) {
      const _mask = mask.mask;
      return {
        ...pick(mask, (_, k) => !k.startsWith('_')),
        mask: mask.constructor,
        _mask,
        ...instanceOpts
      };
    }
  }
  if (!isObject(opts)) return {
    mask: opts
  };
  return {
    ...opts
  };
}

// TODO can't use overloads here because of https://github.com/microsoft/TypeScript/issues/50754

// From masked
// export default function createMask<Opts extends Masked, ReturnMasked=Opts> (opts: Opts): ReturnMasked;
// // From masked class
// export default function createMask<Opts extends MaskedOptions<typeof Masked>, ReturnMasked extends Masked=InstanceType<Opts['mask']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedDate>, ReturnMasked extends MaskedDate=MaskedDate<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedNumber>, ReturnMasked extends MaskedNumber=MaskedNumber<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedEnum>, ReturnMasked extends MaskedEnum=MaskedEnum<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedRange>, ReturnMasked extends MaskedRange=MaskedRange<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedRegExp>, ReturnMasked extends MaskedRegExp=MaskedRegExp<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedFunction>, ReturnMasked extends MaskedFunction=MaskedFunction<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedPattern>, ReturnMasked extends MaskedPattern=MaskedPattern<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedDynamic>, ReturnMasked extends MaskedDynamic=MaskedDynamic<Opts['parent']>> (opts: Opts): ReturnMasked;
// // From mask opts
// export default function createMask<Opts extends MaskedOptions<Masked>, ReturnMasked=Opts extends MaskedOptions<infer M> ? M : never> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedNumberOptions, ReturnMasked extends MaskedNumber=MaskedNumber<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedDateFactoryOptions, ReturnMasked extends MaskedDate=MaskedDate<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedEnumOptions, ReturnMasked extends MaskedEnum=MaskedEnum<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedRangeOptions, ReturnMasked extends MaskedRange=MaskedRange<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedPatternOptions, ReturnMasked extends MaskedPattern=MaskedPattern<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedDynamicOptions, ReturnMasked extends MaskedDynamic=MaskedDynamic<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<RegExp>, ReturnMasked extends MaskedRegExp=MaskedRegExp<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<Function>, ReturnMasked extends MaskedFunction=MaskedFunction<Opts['parent']>> (opts: Opts): ReturnMasked;

/** Creates new {@link Masked} depending on mask type */
function createMask(opts) {
  if (IMask.Masked && opts instanceof IMask.Masked) return opts;
  const nOpts = normalizeOpts(opts);
  const MaskedClass = maskedClass(nOpts.mask);
  if (!MaskedClass) throw new Error("Masked class is not found for provided mask " + nOpts.mask + ", appropriate module needs to be imported manually before creating mask.");
  if (nOpts.mask === MaskedClass) delete nOpts.mask;
  if (nOpts._mask) {
    nOpts.mask = nOpts._mask;
    delete nOpts._mask;
  }
  return new MaskedClass(nOpts);
}
IMask.createMask = createMask;



;// CONCATENATED MODULE: ./node_modules/imask/esm/controls/mask-element.js


/**  Generic element API to use with mask */
class MaskElement {
  /** */

  /** */

  /** */

  /** Safely returns selection start */
  get selectionStart() {
    let start;
    try {
      start = this._unsafeSelectionStart;
    } catch {}
    return start != null ? start : this.value.length;
  }

  /** Safely returns selection end */
  get selectionEnd() {
    let end;
    try {
      end = this._unsafeSelectionEnd;
    } catch {}
    return end != null ? end : this.value.length;
  }

  /** Safely sets element selection */
  select(start, end) {
    if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;
    try {
      this._unsafeSelect(start, end);
    } catch {}
  }

  /** */
  get isActive() {
    return false;
  }
  /** */

  /** */

  /** */
}
IMask.MaskElement = MaskElement;



;// CONCATENATED MODULE: ./node_modules/imask/esm/controls/html-mask-element.js



const KEY_Z = 90;
const KEY_Y = 89;

/** Bridge between HTMLElement and {@link Masked} */
class HTMLMaskElement extends MaskElement {
  /** HTMLElement to use mask on */

  constructor(input) {
    super();
    this.input = input;
    this._onKeydown = this._onKeydown.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onBeforeinput = this._onBeforeinput.bind(this);
    this._onCompositionEnd = this._onCompositionEnd.bind(this);
  }
  get rootElement() {
    var _this$input$getRootNo, _this$input$getRootNo2, _this$input;
    return (_this$input$getRootNo = (_this$input$getRootNo2 = (_this$input = this.input).getRootNode) == null ? void 0 : _this$input$getRootNo2.call(_this$input)) != null ? _this$input$getRootNo : document;
  }

  /** Is element in focus */
  get isActive() {
    return this.input === this.rootElement.activeElement;
  }

  /** Binds HTMLElement events to mask internal events */
  bindEvents(handlers) {
    this.input.addEventListener('keydown', this._onKeydown);
    this.input.addEventListener('input', this._onInput);
    this.input.addEventListener('beforeinput', this._onBeforeinput);
    this.input.addEventListener('compositionend', this._onCompositionEnd);
    this.input.addEventListener('drop', handlers.drop);
    this.input.addEventListener('click', handlers.click);
    this.input.addEventListener('focus', handlers.focus);
    this.input.addEventListener('blur', handlers.commit);
    this._handlers = handlers;
  }
  _onKeydown(e) {
    if (this._handlers.redo && (e.keyCode === KEY_Z && e.shiftKey && (e.metaKey || e.ctrlKey) || e.keyCode === KEY_Y && e.ctrlKey)) {
      e.preventDefault();
      return this._handlers.redo(e);
    }
    if (this._handlers.undo && e.keyCode === KEY_Z && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      return this._handlers.undo(e);
    }
    if (!e.isComposing) this._handlers.selectionChange(e);
  }
  _onBeforeinput(e) {
    if (e.inputType === 'historyUndo' && this._handlers.undo) {
      e.preventDefault();
      return this._handlers.undo(e);
    }
    if (e.inputType === 'historyRedo' && this._handlers.redo) {
      e.preventDefault();
      return this._handlers.redo(e);
    }
  }
  _onCompositionEnd(e) {
    this._handlers.input(e);
  }
  _onInput(e) {
    if (!e.isComposing) this._handlers.input(e);
  }

  /** Unbinds HTMLElement events to mask internal events */
  unbindEvents() {
    this.input.removeEventListener('keydown', this._onKeydown);
    this.input.removeEventListener('input', this._onInput);
    this.input.removeEventListener('beforeinput', this._onBeforeinput);
    this.input.removeEventListener('compositionend', this._onCompositionEnd);
    this.input.removeEventListener('drop', this._handlers.drop);
    this.input.removeEventListener('click', this._handlers.click);
    this.input.removeEventListener('focus', this._handlers.focus);
    this.input.removeEventListener('blur', this._handlers.commit);
    this._handlers = {};
  }
}
IMask.HTMLMaskElement = HTMLMaskElement;



;// CONCATENATED MODULE: ./node_modules/imask/esm/controls/html-input-mask-element.js




/** Bridge between InputElement and {@link Masked} */
class HTMLInputMaskElement extends HTMLMaskElement {
  /** InputElement to use mask on */

  constructor(input) {
    super(input);
    this.input = input;
  }

  /** Returns InputElement selection start */
  get _unsafeSelectionStart() {
    return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
  }

  /** Returns InputElement selection end */
  get _unsafeSelectionEnd() {
    return this.input.selectionEnd;
  }

  /** Sets InputElement selection */
  _unsafeSelect(start, end) {
    this.input.setSelectionRange(start, end);
  }
  get value() {
    return this.input.value;
  }
  set value(value) {
    this.input.value = value;
  }
}
IMask.HTMLMaskElement = HTMLMaskElement;



;// CONCATENATED MODULE: ./node_modules/imask/esm/controls/html-contenteditable-mask-element.js




class HTMLContenteditableMaskElement extends HTMLMaskElement {
  /** Returns HTMLElement selection start */
  get _unsafeSelectionStart() {
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    const anchorOffset = selection && selection.anchorOffset;
    const focusOffset = selection && selection.focusOffset;
    if (focusOffset == null || anchorOffset == null || anchorOffset < focusOffset) {
      return anchorOffset;
    }
    return focusOffset;
  }

  /** Returns HTMLElement selection end */
  get _unsafeSelectionEnd() {
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    const anchorOffset = selection && selection.anchorOffset;
    const focusOffset = selection && selection.focusOffset;
    if (focusOffset == null || anchorOffset == null || anchorOffset > focusOffset) {
      return anchorOffset;
    }
    return focusOffset;
  }

  /** Sets HTMLElement selection */
  _unsafeSelect(start, end) {
    if (!this.rootElement.createRange) return;
    const range = this.rootElement.createRange();
    range.setStart(this.input.firstChild || this.input, start);
    range.setEnd(this.input.lastChild || this.input, end);
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /** HTMLElement value */
  get value() {
    return this.input.textContent || '';
  }
  set value(value) {
    this.input.textContent = value;
  }
}
IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;



;// CONCATENATED MODULE: ./node_modules/imask/esm/controls/input-history.js
class InputHistory {
  constructor() {
    this.states = [];
    this.currentIndex = 0;
  }
  get currentState() {
    return this.states[this.currentIndex];
  }
  get isEmpty() {
    return this.states.length === 0;
  }
  push(state) {
    // if current index points before the last element then remove the future
    if (this.currentIndex < this.states.length - 1) this.states.length = this.currentIndex + 1;
    this.states.push(state);
    if (this.states.length > InputHistory.MAX_LENGTH) this.states.shift();
    this.currentIndex = this.states.length - 1;
  }
  go(steps) {
    this.currentIndex = Math.min(Math.max(this.currentIndex + steps, 0), this.states.length - 1);
    return this.currentState;
  }
  undo() {
    return this.go(-1);
  }
  redo() {
    return this.go(+1);
  }
  clear() {
    this.states.length = 0;
    this.currentIndex = 0;
  }
}
InputHistory.MAX_LENGTH = 100;



;// CONCATENATED MODULE: ./node_modules/imask/esm/controls/input.js










/** Listens to element events and controls changes between element and {@link Masked} */
class InputMask {
  /**
    View element
  */

  /** Internal {@link Masked} model */

  constructor(el, opts) {
    this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new HTMLContenteditableMaskElement(el) : new HTMLInputMaskElement(el);
    this.masked = createMask(opts);
    this._listeners = {};
    this._value = '';
    this._unmaskedValue = '';
    this._rawInputValue = '';
    this.history = new InputHistory();
    this._saveSelection = this._saveSelection.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onUndo = this._onUndo.bind(this);
    this._onRedo = this._onRedo.bind(this);
    this.alignCursor = this.alignCursor.bind(this);
    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
    this._bindEvents();

    // refresh
    this._onChange();
  }
  maskEquals(mask) {
    var _this$masked;
    return mask == null || ((_this$masked = this.masked) == null ? void 0 : _this$masked.maskEquals(mask));
  }

  /** Masked */
  get mask() {
    return this.masked.mask;
  }
  set mask(mask) {
    if (this.maskEquals(mask)) return;
    if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
      // TODO "any" no idea
      this.masked.updateOptions({
        mask
      });
      return;
    }
    const masked = mask instanceof IMask.Masked ? mask : createMask({
      mask
    });
    masked.unmaskedValue = this.masked.unmaskedValue;
    this.masked = masked;
  }

  /** Raw value */
  get value() {
    return this._value;
  }
  set value(str) {
    if (this.value === str) return;
    this.masked.value = str;
    this.updateControl('auto');
  }

  /** Unmasked value */
  get unmaskedValue() {
    return this._unmaskedValue;
  }
  set unmaskedValue(str) {
    if (this.unmaskedValue === str) return;
    this.masked.unmaskedValue = str;
    this.updateControl('auto');
  }

  /** Raw input value */
  get rawInputValue() {
    return this._rawInputValue;
  }
  set rawInputValue(str) {
    if (this.rawInputValue === str) return;
    this.masked.rawInputValue = str;
    this.updateControl();
    this.alignCursor();
  }

  /** Typed unmasked value */
  get typedValue() {
    return this.masked.typedValue;
  }
  set typedValue(val) {
    if (this.masked.typedValueEquals(val)) return;
    this.masked.typedValue = val;
    this.updateControl('auto');
  }

  /** Display value */
  get displayValue() {
    return this.masked.displayValue;
  }

  /** Starts listening to element events */
  _bindEvents() {
    this.el.bindEvents({
      selectionChange: this._saveSelection,
      input: this._onInput,
      drop: this._onDrop,
      click: this._onClick,
      focus: this._onFocus,
      commit: this._onChange,
      undo: this._onUndo,
      redo: this._onRedo
    });
  }

  /** Stops listening to element events */
  _unbindEvents() {
    if (this.el) this.el.unbindEvents();
  }

  /** Fires custom event */
  _fireEvent(ev, e) {
    const listeners = this._listeners[ev];
    if (!listeners) return;
    listeners.forEach(l => l(e));
  }

  /** Current selection start */
  get selectionStart() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
  }

  /** Current cursor position */
  get cursorPos() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
  }
  set cursorPos(pos) {
    if (!this.el || !this.el.isActive) return;
    this.el.select(pos, pos);
    this._saveSelection();
  }

  /** Stores current selection */
  _saveSelection( /* ev */
  ) {
    if (this.displayValue !== this.el.value) {
      console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
    }
    this._selection = {
      start: this.selectionStart,
      end: this.cursorPos
    };
  }

  /** Syncronizes model value from view */
  updateValue() {
    this.masked.value = this.el.value;
    this._value = this.masked.value;
    this._unmaskedValue = this.masked.unmaskedValue;
    this._rawInputValue = this.masked.rawInputValue;
  }

  /** Syncronizes view from model value, fires change events */
  updateControl(cursorPos) {
    const newUnmaskedValue = this.masked.unmaskedValue;
    const newValue = this.masked.value;
    const newRawInputValue = this.masked.rawInputValue;
    const newDisplayValue = this.displayValue;
    const isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue || this._rawInputValue !== newRawInputValue;
    this._unmaskedValue = newUnmaskedValue;
    this._value = newValue;
    this._rawInputValue = newRawInputValue;
    if (this.el.value !== newDisplayValue) this.el.value = newDisplayValue;
    if (cursorPos === 'auto') this.alignCursor();else if (cursorPos != null) this.cursorPos = cursorPos;
    if (isChanged) this._fireChangeEvents();
    if (!this._historyChanging && (isChanged || this.history.isEmpty)) this.history.push({
      unmaskedValue: newUnmaskedValue,
      selection: {
        start: this.selectionStart,
        end: this.cursorPos
      }
    });
  }

  /** Updates options with deep equal check, recreates {@link Masked} model if mask type changes */
  updateOptions(opts) {
    const {
      mask,
      ...restOpts
    } = opts; // TODO types, yes, mask is optional

    const updateMask = !this.maskEquals(mask);
    const updateOpts = this.masked.optionsIsChanged(restOpts);
    if (updateMask) this.mask = mask;
    if (updateOpts) this.masked.updateOptions(restOpts); // TODO

    if (updateMask || updateOpts) this.updateControl();
  }

  /** Updates cursor */
  updateCursor(cursorPos) {
    if (cursorPos == null) return;
    this.cursorPos = cursorPos;

    // also queue change cursor for mobile browsers
    this._delayUpdateCursor(cursorPos);
  }

  /** Delays cursor update to support mobile browsers */
  _delayUpdateCursor(cursorPos) {
    this._abortUpdateCursor();
    this._changingCursorPos = cursorPos;
    this._cursorChanging = setTimeout(() => {
      if (!this.el) return; // if was destroyed
      this.cursorPos = this._changingCursorPos;
      this._abortUpdateCursor();
    }, 10);
  }

  /** Fires custom events */
  _fireChangeEvents() {
    this._fireEvent('accept', this._inputEvent);
    if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
  }

  /** Aborts delayed cursor update */
  _abortUpdateCursor() {
    if (this._cursorChanging) {
      clearTimeout(this._cursorChanging);
      delete this._cursorChanging;
    }
  }

  /** Aligns cursor to nearest available position */
  alignCursor() {
    this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT));
  }

  /** Aligns cursor only if selection is empty */
  alignCursorFriendly() {
    if (this.selectionStart !== this.cursorPos) return; // skip if range is selected
    this.alignCursor();
  }

  /** Adds listener on custom event */
  on(ev, handler) {
    if (!this._listeners[ev]) this._listeners[ev] = [];
    this._listeners[ev].push(handler);
    return this;
  }

  /** Removes custom event listener */
  off(ev, handler) {
    if (!this._listeners[ev]) return this;
    if (!handler) {
      delete this._listeners[ev];
      return this;
    }
    const hIndex = this._listeners[ev].indexOf(handler);
    if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
    return this;
  }

  /** Handles view input event */
  _onInput(e) {
    this._inputEvent = e;
    this._abortUpdateCursor();
    const details = new ActionDetails({
      // new state
      value: this.el.value,
      cursorPos: this.cursorPos,
      // old state
      oldValue: this.displayValue,
      oldSelection: this._selection
    });
    const oldRawValue = this.masked.rawInputValue;
    const offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection, {
      input: true,
      raw: true
    }).offset;

    // force align in remove direction only if no input chars were removed
    // otherwise we still need to align with NONE (to get out from fixed symbols for instance)
    const removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
    let cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
    if (removeDirection !== DIRECTION.NONE) cursorPos = this.masked.nearestInputPos(cursorPos, DIRECTION.NONE);
    this.updateControl(cursorPos);
    delete this._inputEvent;
  }

  /** Handles view change event and commits model value */
  _onChange() {
    if (this.displayValue !== this.el.value) this.updateValue();
    this.masked.doCommit();
    this.updateControl();
    this._saveSelection();
  }

  /** Handles view drop event, prevents by default */
  _onDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  /** Restore last selection on focus */
  _onFocus(ev) {
    this.alignCursorFriendly();
  }

  /** Restore last selection on focus */
  _onClick(ev) {
    this.alignCursorFriendly();
  }
  _onUndo() {
    this._applyHistoryState(this.history.undo());
  }
  _onRedo() {
    this._applyHistoryState(this.history.redo());
  }
  _applyHistoryState(state) {
    if (!state) return;
    this._historyChanging = true;
    this.unmaskedValue = state.unmaskedValue;
    this.el.select(state.selection.start, state.selection.end);
    this._saveSelection();
    this._historyChanging = false;
  }

  /** Unbind view events and removes element reference */
  destroy() {
    this._unbindEvents();
    this._listeners.length = 0;
    delete this.el;
  }
}
IMask.InputMask = InputMask;



;// CONCATENATED MODULE: ./node_modules/imask/esm/core/change-details.js


/** Provides details of changing model value */
class ChangeDetails {
  /** Inserted symbols */

  /** Additional offset if any changes occurred before tail */

  /** Raw inserted is used by dynamic mask */

  /** Can skip chars */

  static normalize(prep) {
    return Array.isArray(prep) ? prep : [prep, new ChangeDetails()];
  }
  constructor(details) {
    Object.assign(this, {
      inserted: '',
      rawInserted: '',
      tailShift: 0,
      skip: false
    }, details);
  }

  /** Aggregate changes */
  aggregate(details) {
    this.inserted += details.inserted;
    this.rawInserted += details.rawInserted;
    this.tailShift += details.tailShift;
    this.skip = this.skip || details.skip;
    return this;
  }

  /** Total offset considering all changes */
  get offset() {
    return this.tailShift + this.inserted.length;
  }
  get consumed() {
    return Boolean(this.rawInserted) || this.skip;
  }
  equals(details) {
    return this.inserted === details.inserted && this.tailShift === details.tailShift && this.rawInserted === details.rawInserted && this.skip === details.skip;
  }
}
IMask.ChangeDetails = ChangeDetails;



;// CONCATENATED MODULE: ./node_modules/imask/esm/core/continuous-tail-details.js
/** Provides details of continuous extracted tail */
class ContinuousTailDetails {
  /** Tail value as string */

  /** Tail start position */

  /** Start position */

  constructor(value, from, stop) {
    if (value === void 0) {
      value = '';
    }
    if (from === void 0) {
      from = 0;
    }
    this.value = value;
    this.from = from;
    this.stop = stop;
  }
  toString() {
    return this.value;
  }
  extend(tail) {
    this.value += String(tail);
  }
  appendTo(masked) {
    return masked.append(this.toString(), {
      tail: true
    }).aggregate(masked._appendPlaceholder());
  }
  get state() {
    return {
      value: this.value,
      from: this.from,
      stop: this.stop
    };
  }
  set state(state) {
    Object.assign(this, state);
  }
  unshift(beforePos) {
    if (!this.value.length || beforePos != null && this.from >= beforePos) return '';
    const shiftChar = this.value[0];
    this.value = this.value.slice(1);
    return shiftChar;
  }
  shift() {
    if (!this.value.length) return '';
    const shiftChar = this.value[this.value.length - 1];
    this.value = this.value.slice(0, -1);
    return shiftChar;
  }
}



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/base.js





/** Append flags */

/** Extract flags */

// see https://github.com/microsoft/TypeScript/issues/6223

/** Provides common masking stuff */
class Masked {
  /** */

  /** */

  /** Transforms value before mask processing */

  /** Transforms each char before mask processing */

  /** Validates if value is acceptable */

  /** Does additional processing at the end of editing */

  /** Format typed value to string */

  /** Parse string to get typed value */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  /** */

  constructor(opts) {
    this._value = '';
    this._update({
      ...Masked.DEFAULTS,
      ...opts
    });
    this._initialized = true;
  }

  /** Sets and applies new options */
  updateOptions(opts) {
    if (!this.optionsIsChanged(opts)) return;
    this.withValueRefresh(this._update.bind(this, opts));
  }

  /** Sets new options */
  _update(opts) {
    Object.assign(this, opts);
  }

  /** Mask state */
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(state) {
    this._value = state._value;
  }

  /** Resets value */
  reset() {
    this._value = '';
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this.resolve(value, {
      input: true
    });
  }

  /** Resolve new value */
  resolve(value, flags) {
    if (flags === void 0) {
      flags = {
        input: true
      };
    }
    this.reset();
    this.append(value, flags, '');
    this.doCommit();
  }
  get unmaskedValue() {
    return this.value;
  }
  set unmaskedValue(value) {
    this.resolve(value, {});
  }
  get typedValue() {
    return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
  }
  set typedValue(value) {
    if (this.format) {
      this.value = this.format(value, this);
    } else {
      this.unmaskedValue = String(value);
    }
  }

  /** Value that includes raw user input */
  get rawInputValue() {
    return this.extractInput(0, this.displayValue.length, {
      raw: true
    });
  }
  set rawInputValue(value) {
    this.resolve(value, {
      raw: true
    });
  }
  get displayValue() {
    return this.value;
  }
  get isComplete() {
    return true;
  }
  get isFilled() {
    return this.isComplete;
  }

  /** Finds nearest input position in direction */
  nearestInputPos(cursorPos, direction) {
    return cursorPos;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return Math.min(this.displayValue.length, toPos - fromPos);
  }

  /** Extracts value in range considering flags */
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return this.displayValue.slice(fromPos, toPos);
  }

  /** Extracts tail in range */
  extractTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
  }

  /** Appends tail */
  appendTail(tail) {
    if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
    return tail.appendTo(this);
  }

  /** Appends char */
  _appendCharRaw(ch, flags) {
    if (!ch) return new ChangeDetails();
    this._value += ch;
    return new ChangeDetails({
      inserted: ch,
      rawInserted: ch
    });
  }

  /** Appends char */
  _appendChar(ch, flags, checkTail) {
    if (flags === void 0) {
      flags = {};
    }
    const consistentState = this.state;
    let details;
    [ch, details] = this.doPrepareChar(ch, flags);
    if (ch) {
      details = details.aggregate(this._appendCharRaw(ch, flags));

      // TODO handle `skip`?

      // try `autofix` lookahead
      if (!details.rawInserted && this.autofix === 'pad') {
        const noFixState = this.state;
        this.state = consistentState;
        let fixDetails = this.pad(flags);
        const chDetails = this._appendCharRaw(ch, flags);
        fixDetails = fixDetails.aggregate(chDetails);

        // if fix was applied or
        // if details are equal use skip restoring state optimization
        if (chDetails.rawInserted || fixDetails.equals(details)) {
          details = fixDetails;
        } else {
          this.state = noFixState;
        }
      }
    }
    if (details.inserted) {
      let consistentTail;
      let appended = this.doValidate(flags) !== false;
      if (appended && checkTail != null) {
        // validation ok, check tail
        const beforeTailState = this.state;
        if (this.overwrite === true) {
          consistentTail = checkTail.state;
          for (let i = 0; i < details.rawInserted.length; ++i) {
            checkTail.unshift(this.displayValue.length - details.tailShift);
          }
        }
        let tailDetails = this.appendTail(checkTail);
        appended = tailDetails.rawInserted.length === checkTail.toString().length;

        // not ok, try shift
        if (!(appended && tailDetails.inserted) && this.overwrite === 'shift') {
          this.state = beforeTailState;
          consistentTail = checkTail.state;
          for (let i = 0; i < details.rawInserted.length; ++i) {
            checkTail.shift();
          }
          tailDetails = this.appendTail(checkTail);
          appended = tailDetails.rawInserted.length === checkTail.toString().length;
        }

        // if ok, rollback state after tail
        if (appended && tailDetails.inserted) this.state = beforeTailState;
      }

      // revert all if something went wrong
      if (!appended) {
        details = new ChangeDetails();
        this.state = consistentState;
        if (checkTail && consistentTail) checkTail.state = consistentTail;
      }
    }
    return details;
  }

  /** Appends optional placeholder at the end */
  _appendPlaceholder() {
    return new ChangeDetails();
  }

  /** Appends optional eager placeholder at the end */
  _appendEager() {
    return new ChangeDetails();
  }

  /** Appends symbols considering flags */
  append(str, flags, tail) {
    if (!isString(str)) throw new Error('value should be string');
    const checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
    if (flags != null && flags.tail) flags._beforeTailState = this.state;
    let details;
    [str, details] = this.doPrepare(str, flags);
    for (let ci = 0; ci < str.length; ++ci) {
      const d = this._appendChar(str[ci], flags, checkTail);
      if (!d.rawInserted && !this.doSkipInvalid(str[ci], flags, checkTail)) break;
      details.aggregate(d);
    }
    if ((this.eager === true || this.eager === 'append') && flags != null && flags.input && str) {
      details.aggregate(this._appendEager());
    }

    // append tail but aggregate only tailShift
    if (checkTail != null) {
      details.tailShift += this.appendTail(checkTail).tailShift;
      // TODO it's a good idea to clear state after appending ends
      // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
      // this._resetBeforeTailState();
    }
    return details;
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    this._value = this.displayValue.slice(0, fromPos) + this.displayValue.slice(toPos);
    return new ChangeDetails();
  }

  /** Calls function and reapplies current value */
  withValueRefresh(fn) {
    if (this._refreshing || !this._initialized) return fn();
    this._refreshing = true;
    const rawInput = this.rawInputValue;
    const value = this.value;
    const ret = fn();
    this.rawInputValue = rawInput;
    // append lost trailing chars at the end
    if (this.value && this.value !== value && value.indexOf(this.value) === 0) {
      this.append(value.slice(this.displayValue.length), {}, '');
      this.doCommit();
    }
    delete this._refreshing;
    return ret;
  }
  runIsolated(fn) {
    if (this._isolated || !this._initialized) return fn(this);
    this._isolated = true;
    const state = this.state;
    const ret = fn(this);
    this.state = state;
    delete this._isolated;
    return ret;
  }
  doSkipInvalid(ch, flags, checkTail) {
    return Boolean(this.skipInvalid);
  }

  /** Prepares string before mask processing */
  doPrepare(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    return ChangeDetails.normalize(this.prepare ? this.prepare(str, this, flags) : str);
  }

  /** Prepares each char before mask processing */
  doPrepareChar(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    return ChangeDetails.normalize(this.prepareChar ? this.prepareChar(str, this, flags) : str);
  }

  /** Validates if value is acceptable */
  doValidate(flags) {
    return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
  }

  /** Does additional processing at the end of editing */
  doCommit() {
    if (this.commit) this.commit(this.value, this);
  }
  splice(start, deleteCount, inserted, removeDirection, flags) {
    if (inserted === void 0) {
      inserted = '';
    }
    if (removeDirection === void 0) {
      removeDirection = DIRECTION.NONE;
    }
    if (flags === void 0) {
      flags = {
        input: true
      };
    }
    const tailPos = start + deleteCount;
    const tail = this.extractTail(tailPos);
    const eagerRemove = this.eager === true || this.eager === 'remove';
    let oldRawValue;
    if (eagerRemove) {
      removeDirection = forceDirection(removeDirection);
      oldRawValue = this.extractInput(0, tailPos, {
        raw: true
      });
    }
    let startChangePos = start;
    const details = new ChangeDetails();

    // if it is just deletion without insertion
    if (removeDirection !== DIRECTION.NONE) {
      startChangePos = this.nearestInputPos(start, deleteCount > 1 && start !== 0 && !eagerRemove ? DIRECTION.NONE : removeDirection);

      // adjust tailShift if start was aligned
      details.tailShift = startChangePos - start;
    }
    details.aggregate(this.remove(startChangePos));
    if (eagerRemove && removeDirection !== DIRECTION.NONE && oldRawValue === this.rawInputValue) {
      if (removeDirection === DIRECTION.FORCE_LEFT) {
        let valLength;
        while (oldRawValue === this.rawInputValue && (valLength = this.displayValue.length)) {
          details.aggregate(new ChangeDetails({
            tailShift: -1
          })).aggregate(this.remove(valLength - 1));
        }
      } else if (removeDirection === DIRECTION.FORCE_RIGHT) {
        tail.unshift();
      }
    }
    return details.aggregate(this.append(inserted, flags, tail));
  }
  maskEquals(mask) {
    return this.mask === mask;
  }
  optionsIsChanged(opts) {
    return !objectIncludes(this, opts);
  }
  typedValueEquals(value) {
    const tval = this.typedValue;
    return value === tval || Masked.EMPTY_VALUES.includes(value) && Masked.EMPTY_VALUES.includes(tval) || (this.format ? this.format(value, this) === this.format(this.typedValue, this) : false);
  }
  pad(flags) {
    return new ChangeDetails();
  }
}
Masked.DEFAULTS = {
  skipInvalid: true
};
Masked.EMPTY_VALUES = [undefined, null, ''];
IMask.Masked = Masked;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/pattern/chunk-tail-details.js





class ChunksTailDetails {
  /** */

  constructor(chunks, from) {
    if (chunks === void 0) {
      chunks = [];
    }
    if (from === void 0) {
      from = 0;
    }
    this.chunks = chunks;
    this.from = from;
  }
  toString() {
    return this.chunks.map(String).join('');
  }
  extend(tailChunk) {
    if (!String(tailChunk)) return;
    tailChunk = isString(tailChunk) ? new ContinuousTailDetails(String(tailChunk)) : tailChunk;
    const lastChunk = this.chunks[this.chunks.length - 1];
    const extendLast = lastChunk && (
    // if stops are same or tail has no stop
    lastChunk.stop === tailChunk.stop || tailChunk.stop == null) &&
    // if tail chunk goes just after last chunk
    tailChunk.from === lastChunk.from + lastChunk.toString().length;
    if (tailChunk instanceof ContinuousTailDetails) {
      // check the ability to extend previous chunk
      if (extendLast) {
        // extend previous chunk
        lastChunk.extend(tailChunk.toString());
      } else {
        // append new chunk
        this.chunks.push(tailChunk);
      }
    } else if (tailChunk instanceof ChunksTailDetails) {
      if (tailChunk.stop == null) {
        // unwrap floating chunks to parent, keeping `from` pos
        let firstTailChunk;
        while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
          firstTailChunk = tailChunk.chunks.shift(); // not possible to be `undefined` because length was checked above
          firstTailChunk.from += tailChunk.from;
          this.extend(firstTailChunk);
        }
      }

      // if tail chunk still has value
      if (tailChunk.toString()) {
        // if chunks contains stops, then popup stop to container
        tailChunk.stop = tailChunk.blockIndex;
        this.chunks.push(tailChunk);
      }
    }
  }
  appendTo(masked) {
    if (!(masked instanceof IMask.MaskedPattern)) {
      const tail = new ContinuousTailDetails(this.toString());
      return tail.appendTo(masked);
    }
    const details = new ChangeDetails();
    for (let ci = 0; ci < this.chunks.length; ++ci) {
      const chunk = this.chunks[ci];
      const lastBlockIter = masked._mapPosToBlock(masked.displayValue.length);
      const stop = chunk.stop;
      let chunkBlock;
      if (stop != null && (
      // if block not found or stop is behind lastBlock
      !lastBlockIter || lastBlockIter.index <= stop)) {
        if (chunk instanceof ChunksTailDetails ||
        // for continuous block also check if stop is exist
        masked._stops.indexOf(stop) >= 0) {
          details.aggregate(masked._appendPlaceholder(stop));
        }
        chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
      }
      if (chunkBlock) {
        const tailDetails = chunkBlock.appendTail(chunk);
        details.aggregate(tailDetails);

        // get not inserted chars
        const remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
        if (remainChars) details.aggregate(masked.append(remainChars, {
          tail: true
        }));
      } else {
        details.aggregate(masked.append(chunk.toString(), {
          tail: true
        }));
      }
    }
    return details;
  }
  get state() {
    return {
      chunks: this.chunks.map(c => c.state),
      from: this.from,
      stop: this.stop,
      blockIndex: this.blockIndex
    };
  }
  set state(state) {
    const {
      chunks,
      ...props
    } = state;
    Object.assign(this, props);
    this.chunks = chunks.map(cstate => {
      const chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails();
      chunk.state = cstate;
      return chunk;
    });
  }
  unshift(beforePos) {
    if (!this.chunks.length || beforePos != null && this.from >= beforePos) return '';
    const chunkShiftPos = beforePos != null ? beforePos - this.from : beforePos;
    let ci = 0;
    while (ci < this.chunks.length) {
      const chunk = this.chunks[ci];
      const shiftChar = chunk.unshift(chunkShiftPos);
      if (chunk.toString()) {
        // chunk still contains value
        // but not shifted - means no more available chars to shift
        if (!shiftChar) break;
        ++ci;
      } else {
        // clean if chunk has no value
        this.chunks.splice(ci, 1);
      }
      if (shiftChar) return shiftChar;
    }
    return '';
  }
  shift() {
    if (!this.chunks.length) return '';
    let ci = this.chunks.length - 1;
    while (0 <= ci) {
      const chunk = this.chunks[ci];
      const shiftChar = chunk.shift();
      if (chunk.toString()) {
        // chunk still contains value
        // but not shifted - means no more available chars to shift
        if (!shiftChar) break;
        --ci;
      } else {
        // clean if chunk has no value
        this.chunks.splice(ci, 1);
      }
      if (shiftChar) return shiftChar;
    }
    return '';
  }
}



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/pattern/cursor.js


class PatternCursor {
  constructor(masked, pos) {
    this.masked = masked;
    this._log = [];
    const {
      offset,
      index
    } = masked._mapPosToBlock(pos) || (pos < 0 ?
    // first
    {
      index: 0,
      offset: 0
    } :
    // last
    {
      index: this.masked._blocks.length,
      offset: 0
    });
    this.offset = offset;
    this.index = index;
    this.ok = false;
  }
  get block() {
    return this.masked._blocks[this.index];
  }
  get pos() {
    return this.masked._blockStartPos(this.index) + this.offset;
  }
  get state() {
    return {
      index: this.index,
      offset: this.offset,
      ok: this.ok
    };
  }
  set state(s) {
    Object.assign(this, s);
  }
  pushState() {
    this._log.push(this.state);
  }
  popState() {
    const s = this._log.pop();
    if (s) this.state = s;
    return s;
  }
  bindBlock() {
    if (this.block) return;
    if (this.index < 0) {
      this.index = 0;
      this.offset = 0;
    }
    if (this.index >= this.masked._blocks.length) {
      this.index = this.masked._blocks.length - 1;
      this.offset = this.block.displayValue.length; // TODO this is stupid type error, `block` depends on index that was changed above
    }
  }
  _pushLeft(fn) {
    this.pushState();
    for (this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((_this$block = this.block) == null ? void 0 : _this$block.displayValue.length) || 0) {
      var _this$block;
      if (fn()) return this.ok = true;
    }
    return this.ok = false;
  }
  _pushRight(fn) {
    this.pushState();
    for (this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0) {
      if (fn()) return this.ok = true;
    }
    return this.ok = false;
  }
  pushLeftBeforeFilled() {
    return this._pushLeft(() => {
      if (this.block.isFixed || !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.FORCE_LEFT);
      if (this.offset !== 0) return true;
    });
  }
  pushLeftBeforeInput() {
    // cases:
    // filled input: 00|
    // optional empty input: 00[]|
    // nested block: XX<[]>|
    return this._pushLeft(() => {
      if (this.block.isFixed) return;
      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.LEFT);
      return true;
    });
  }
  pushLeftBeforeRequired() {
    return this._pushLeft(() => {
      if (this.block.isFixed || this.block.isOptional && !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.LEFT);
      return true;
    });
  }
  pushRightBeforeFilled() {
    return this._pushRight(() => {
      if (this.block.isFixed || !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.FORCE_RIGHT);
      if (this.offset !== this.block.value.length) return true;
    });
  }
  pushRightBeforeInput() {
    return this._pushRight(() => {
      if (this.block.isFixed) return;

      // const o = this.offset;
      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.NONE);
      // HACK cases like (STILL DOES NOT WORK FOR NESTED)
      // aa|X
      // aa<X|[]>X_    - this will not work
      // if (o && o === this.offset && this.block instanceof PatternInputDefinition) continue;
      return true;
    });
  }
  pushRightBeforeRequired() {
    return this._pushRight(() => {
      if (this.block.isFixed || this.block.isOptional && !this.block.value) return;

      // TODO check |[*]XX_
      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.NONE);
      return true;
    });
  }
}



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/pattern/fixed-definition.js





class PatternFixedDefinition {
  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  constructor(opts) {
    Object.assign(this, opts);
    this._value = '';
    this.isFixed = true;
  }
  get value() {
    return this._value;
  }
  get unmaskedValue() {
    return this.isUnmasking ? this.value : '';
  }
  get rawInputValue() {
    return this._isRawInput ? this.value : '';
  }
  get displayValue() {
    return this.value;
  }
  reset() {
    this._isRawInput = false;
    this._value = '';
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
    if (!this._value) this._isRawInput = false;
    return new ChangeDetails();
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = DIRECTION.NONE;
    }
    const minPos = 0;
    const maxPos = this._value.length;
    switch (direction) {
      case DIRECTION.LEFT:
      case DIRECTION.FORCE_LEFT:
        return minPos;
      case DIRECTION.NONE:
      case DIRECTION.RIGHT:
      case DIRECTION.FORCE_RIGHT:
      default:
        return maxPos;
    }
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    return this._isRawInput ? toPos - fromPos : 0;
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    if (flags === void 0) {
      flags = {};
    }
    return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
  }
  get isComplete() {
    return true;
  }
  get isFilled() {
    return Boolean(this._value);
  }
  _appendChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    if (this.isFilled) return new ChangeDetails();
    const appendEager = this.eager === true || this.eager === 'append';
    const appended = this.char === ch;
    const isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && (!flags.raw || !appendEager) && !flags.tail;
    const details = new ChangeDetails({
      inserted: this.char,
      rawInserted: isResolved ? this.char : ''
    });
    this._value = this.char;
    this._isRawInput = isResolved && (flags.raw || flags.input);
    return details;
  }
  _appendEager() {
    return this._appendChar(this.char, {
      tail: true
    });
  }
  _appendPlaceholder() {
    const details = new ChangeDetails();
    if (this.isFilled) return details;
    this._value = details.inserted = this.char;
    return details;
  }
  extractTail() {
    return new ContinuousTailDetails('');
  }
  appendTail(tail) {
    if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
    return tail.appendTo(this);
  }
  append(str, flags, tail) {
    const details = this._appendChar(str[0], flags);
    if (tail != null) {
      details.tailShift += this.appendTail(tail).tailShift;
    }
    return details;
  }
  doCommit() {}
  get state() {
    return {
      _value: this._value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(state) {
    this._value = state._value;
    this._isRawInput = Boolean(state._rawInputValue);
  }
  pad(flags) {
    return this._appendPlaceholder();
  }
}



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/pattern/input-definition.js





class PatternInputDefinition {
  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  constructor(opts) {
    const {
      parent,
      isOptional,
      placeholderChar,
      displayChar,
      lazy,
      eager,
      ...maskOpts
    } = opts;
    this.masked = createMask(maskOpts);
    Object.assign(this, {
      parent,
      isOptional,
      placeholderChar,
      displayChar,
      lazy,
      eager
    });
  }
  reset() {
    this.isFilled = false;
    this.masked.reset();
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    if (fromPos === 0 && toPos >= 1) {
      this.isFilled = false;
      return this.masked.remove(fromPos, toPos);
    }
    return new ChangeDetails();
  }
  get value() {
    return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : '');
  }
  get unmaskedValue() {
    return this.masked.unmaskedValue;
  }
  get rawInputValue() {
    return this.masked.rawInputValue;
  }
  get displayValue() {
    return this.masked.value && this.displayChar || this.value;
  }
  get isComplete() {
    return Boolean(this.masked.value) || this.isOptional;
  }
  _appendChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    if (this.isFilled) return new ChangeDetails();
    const state = this.masked.state;
    // simulate input
    let details = this.masked._appendChar(ch, this.currentMaskFlags(flags));
    if (details.inserted && this.doValidate(flags) === false) {
      details = new ChangeDetails();
      this.masked.state = state;
    }
    if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
      details.inserted = this.placeholderChar;
    }
    details.skip = !details.inserted && !this.isOptional;
    this.isFilled = Boolean(details.inserted);
    return details;
  }
  append(str, flags, tail) {
    // TODO probably should be done via _appendChar
    return this.masked.append(str, this.currentMaskFlags(flags), tail);
  }
  _appendPlaceholder() {
    if (this.isFilled || this.isOptional) return new ChangeDetails();
    this.isFilled = true;
    return new ChangeDetails({
      inserted: this.placeholderChar
    });
  }
  _appendEager() {
    return new ChangeDetails();
  }
  extractTail(fromPos, toPos) {
    return this.masked.extractTail(fromPos, toPos);
  }
  appendTail(tail) {
    return this.masked.appendTail(tail);
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    return this.masked.extractInput(fromPos, toPos, flags);
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = DIRECTION.NONE;
    }
    const minPos = 0;
    const maxPos = this.value.length;
    const boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
    switch (direction) {
      case DIRECTION.LEFT:
      case DIRECTION.FORCE_LEFT:
        return this.isComplete ? boundPos : minPos;
      case DIRECTION.RIGHT:
      case DIRECTION.FORCE_RIGHT:
        return this.isComplete ? boundPos : maxPos;
      case DIRECTION.NONE:
      default:
        return boundPos;
    }
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    return this.value.slice(fromPos, toPos).length;
  }
  doValidate(flags) {
    return this.masked.doValidate(this.currentMaskFlags(flags)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(flags)));
  }
  doCommit() {
    this.masked.doCommit();
  }
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue,
      masked: this.masked.state,
      isFilled: this.isFilled
    };
  }
  set state(state) {
    this.masked.state = state.masked;
    this.isFilled = state.isFilled;
  }
  currentMaskFlags(flags) {
    var _flags$_beforeTailSta;
    return {
      ...flags,
      _beforeTailState: (flags == null || (_flags$_beforeTailSta = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta.masked) || (flags == null ? void 0 : flags._beforeTailState)
    };
  }
  pad(flags) {
    return new ChangeDetails();
  }
}
PatternInputDefinition.DEFAULT_DEFINITIONS = {
  '0': /\d/,
  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  // http://stackoverflow.com/a/22075070
  '*': /./
};



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/regexp.js






/** Masking by RegExp */
class MaskedRegExp extends Masked {
  /** */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const mask = opts.mask;
    if (mask) opts.validate = value => value.search(mask) >= 0;
    super._update(opts);
  }
}
IMask.MaskedRegExp = MaskedRegExp;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/pattern.js












/** Pattern mask */
class MaskedPattern extends Masked {
  /** */

  /** */

  /** Single char for empty input */

  /** Single char for filled input */

  /** Show placeholder only when needed */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  constructor(opts) {
    super({
      ...MaskedPattern.DEFAULTS,
      ...opts,
      definitions: Object.assign({}, PatternInputDefinition.DEFAULT_DEFINITIONS, opts == null ? void 0 : opts.definitions)
    });
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    opts.definitions = Object.assign({}, this.definitions, opts.definitions);
    super._update(opts);
    this._rebuildMask();
  }
  _rebuildMask() {
    const defs = this.definitions;
    this._blocks = [];
    this.exposeBlock = undefined;
    this._stops = [];
    this._maskedBlocks = {};
    const pattern = this.mask;
    if (!pattern || !defs) return;
    let unmaskingBlock = false;
    let optionalBlock = false;
    for (let i = 0; i < pattern.length; ++i) {
      if (this.blocks) {
        const p = pattern.slice(i);
        const bNames = Object.keys(this.blocks).filter(bName => p.indexOf(bName) === 0);
        // order by key length
        bNames.sort((a, b) => b.length - a.length);
        // use block name with max length
        const bName = bNames[0];
        if (bName) {
          const {
            expose,
            repeat,
            ...bOpts
          } = normalizeOpts(this.blocks[bName]); // TODO type Opts<Arg & Extra>
          const blockOpts = {
            lazy: this.lazy,
            eager: this.eager,
            placeholderChar: this.placeholderChar,
            displayChar: this.displayChar,
            overwrite: this.overwrite,
            autofix: this.autofix,
            ...bOpts,
            repeat,
            parent: this
          };
          const maskedBlock = repeat != null ? new IMask.RepeatBlock(blockOpts /* TODO */) : createMask(blockOpts);
          if (maskedBlock) {
            this._blocks.push(maskedBlock);
            if (expose) this.exposeBlock = maskedBlock;

            // store block index
            if (!this._maskedBlocks[bName]) this._maskedBlocks[bName] = [];
            this._maskedBlocks[bName].push(this._blocks.length - 1);
          }
          i += bName.length - 1;
          continue;
        }
      }
      let char = pattern[i];
      let isInput = (char in defs);
      if (char === MaskedPattern.STOP_CHAR) {
        this._stops.push(this._blocks.length);
        continue;
      }
      if (char === '{' || char === '}') {
        unmaskingBlock = !unmaskingBlock;
        continue;
      }
      if (char === '[' || char === ']') {
        optionalBlock = !optionalBlock;
        continue;
      }
      if (char === MaskedPattern.ESCAPE_CHAR) {
        ++i;
        char = pattern[i];
        if (!char) break;
        isInput = false;
      }
      const def = isInput ? new PatternInputDefinition({
        isOptional: optionalBlock,
        lazy: this.lazy,
        eager: this.eager,
        placeholderChar: this.placeholderChar,
        displayChar: this.displayChar,
        ...normalizeOpts(defs[char]),
        parent: this
      }) : new PatternFixedDefinition({
        char,
        eager: this.eager,
        isUnmasking: unmaskingBlock
      });
      this._blocks.push(def);
    }
  }
  get state() {
    return {
      ...super.state,
      _blocks: this._blocks.map(b => b.state)
    };
  }
  set state(state) {
    if (!state) {
      this.reset();
      return;
    }
    const {
      _blocks,
      ...maskedState
    } = state;
    this._blocks.forEach((b, bi) => b.state = _blocks[bi]);
    super.state = maskedState;
  }
  reset() {
    super.reset();
    this._blocks.forEach(b => b.reset());
  }
  get isComplete() {
    return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every(b => b.isComplete);
  }
  get isFilled() {
    return this._blocks.every(b => b.isFilled);
  }
  get isFixed() {
    return this._blocks.every(b => b.isFixed);
  }
  get isOptional() {
    return this._blocks.every(b => b.isOptional);
  }
  doCommit() {
    this._blocks.forEach(b => b.doCommit());
    super.doCommit();
  }
  get unmaskedValue() {
    return this.exposeBlock ? this.exposeBlock.unmaskedValue : this._blocks.reduce((str, b) => str += b.unmaskedValue, '');
  }
  set unmaskedValue(unmaskedValue) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.unmaskedValue = unmaskedValue;
      this.appendTail(tail);
      this.doCommit();
    } else super.unmaskedValue = unmaskedValue;
  }
  get value() {
    return this.exposeBlock ? this.exposeBlock.value :
    // TODO return _value when not in change?
    this._blocks.reduce((str, b) => str += b.value, '');
  }
  set value(value) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.value = value;
      this.appendTail(tail);
      this.doCommit();
    } else super.value = value;
  }
  get typedValue() {
    return this.exposeBlock ? this.exposeBlock.typedValue : super.typedValue;
  }
  set typedValue(value) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.typedValue = value;
      this.appendTail(tail);
      this.doCommit();
    } else super.typedValue = value;
  }
  get displayValue() {
    return this._blocks.reduce((str, b) => str += b.displayValue, '');
  }
  appendTail(tail) {
    return super.appendTail(tail).aggregate(this._appendPlaceholder());
  }
  _appendEager() {
    var _this$_mapPosToBlock;
    const details = new ChangeDetails();
    let startBlockIndex = (_this$_mapPosToBlock = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : _this$_mapPosToBlock.index;
    if (startBlockIndex == null) return details;

    // TODO test if it works for nested pattern masks
    if (this._blocks[startBlockIndex].isFilled) ++startBlockIndex;
    for (let bi = startBlockIndex; bi < this._blocks.length; ++bi) {
      const d = this._blocks[bi]._appendEager();
      if (!d.inserted) break;
      details.aggregate(d);
    }
    return details;
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const blockIter = this._mapPosToBlock(this.displayValue.length);
    const details = new ChangeDetails();
    if (!blockIter) return details;
    for (let bi = blockIter.index, block; block = this._blocks[bi]; ++bi) {
      var _flags$_beforeTailSta;
      const blockDetails = block._appendChar(ch, {
        ...flags,
        _beforeTailState: (_flags$_beforeTailSta = flags._beforeTailState) == null || (_flags$_beforeTailSta = _flags$_beforeTailSta._blocks) == null ? void 0 : _flags$_beforeTailSta[bi]
      });
      details.aggregate(blockDetails);
      if (blockDetails.consumed) break; // go next char
    }
    return details;
  }
  extractTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const chunkTail = new ChunksTailDetails();
    if (fromPos === toPos) return chunkTail;
    this._forEachBlocksInRange(fromPos, toPos, (b, bi, bFromPos, bToPos) => {
      const blockChunk = b.extractTail(bFromPos, bToPos);
      blockChunk.stop = this._findStopBefore(bi);
      blockChunk.from = this._blockStartPos(bi);
      if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
      chunkTail.extend(blockChunk);
    });
    return chunkTail;
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    if (flags === void 0) {
      flags = {};
    }
    if (fromPos === toPos) return '';
    let input = '';
    this._forEachBlocksInRange(fromPos, toPos, (b, _, fromPos, toPos) => {
      input += b.extractInput(fromPos, toPos, flags);
    });
    return input;
  }
  _findStopBefore(blockIndex) {
    let stopBefore;
    for (let si = 0; si < this._stops.length; ++si) {
      const stop = this._stops[si];
      if (stop <= blockIndex) stopBefore = stop;else break;
    }
    return stopBefore;
  }

  /** Appends placeholder depending on laziness */
  _appendPlaceholder(toBlockIndex) {
    const details = new ChangeDetails();
    if (this.lazy && toBlockIndex == null) return details;
    const startBlockIter = this._mapPosToBlock(this.displayValue.length);
    if (!startBlockIter) return details;
    const startBlockIndex = startBlockIter.index;
    const endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
    this._blocks.slice(startBlockIndex, endBlockIndex).forEach(b => {
      if (!b.lazy || toBlockIndex != null) {
        var _blocks2;
        details.aggregate(b._appendPlaceholder((_blocks2 = b._blocks) == null ? void 0 : _blocks2.length));
      }
    });
    return details;
  }

  /** Finds block in pos */
  _mapPosToBlock(pos) {
    let accVal = '';
    for (let bi = 0; bi < this._blocks.length; ++bi) {
      const block = this._blocks[bi];
      const blockStartPos = accVal.length;
      accVal += block.displayValue;
      if (pos <= accVal.length) {
        return {
          index: bi,
          offset: pos - blockStartPos
        };
      }
    }
  }
  _blockStartPos(blockIndex) {
    return this._blocks.slice(0, blockIndex).reduce((pos, b) => pos += b.displayValue.length, 0);
  }
  _forEachBlocksInRange(fromPos, toPos, fn) {
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const fromBlockIter = this._mapPosToBlock(fromPos);
    if (fromBlockIter) {
      const toBlockIter = this._mapPosToBlock(toPos);
      // process first block
      const isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
      const fromBlockStartPos = fromBlockIter.offset;
      const fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].displayValue.length;
      fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
      if (toBlockIter && !isSameBlock) {
        // process intermediate blocks
        for (let bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
          fn(this._blocks[bi], bi, 0, this._blocks[bi].displayValue.length);
        }

        // process last block
        fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
      }
    }
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const removeDetails = super.remove(fromPos, toPos);
    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      removeDetails.aggregate(b.remove(bFromPos, bToPos));
    });
    return removeDetails;
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = DIRECTION.NONE;
    }
    if (!this._blocks.length) return 0;
    const cursor = new PatternCursor(this, cursorPos);
    if (direction === DIRECTION.NONE) {
      // -------------------------------------------------
      // NONE should only go out from fixed to the right!
      // -------------------------------------------------
      if (cursor.pushRightBeforeInput()) return cursor.pos;
      cursor.popState();
      if (cursor.pushLeftBeforeInput()) return cursor.pos;
      return this.displayValue.length;
    }

    // FORCE is only about a|* otherwise is 0
    if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
      // try to break fast when *|a
      if (direction === DIRECTION.LEFT) {
        cursor.pushRightBeforeFilled();
        if (cursor.ok && cursor.pos === cursorPos) return cursorPos;
        cursor.popState();
      }

      // forward flow
      cursor.pushLeftBeforeInput();
      cursor.pushLeftBeforeRequired();
      cursor.pushLeftBeforeFilled();

      // backward flow
      if (direction === DIRECTION.LEFT) {
        cursor.pushRightBeforeInput();
        cursor.pushRightBeforeRequired();
        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
        cursor.popState();
        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
        cursor.popState();
      }
      if (cursor.ok) return cursor.pos;
      if (direction === DIRECTION.FORCE_LEFT) return 0;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      return 0;
    }
    if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
      // forward flow
      cursor.pushRightBeforeInput();
      cursor.pushRightBeforeRequired();
      if (cursor.pushRightBeforeFilled()) return cursor.pos;
      if (direction === DIRECTION.FORCE_RIGHT) return this.displayValue.length;

      // backward flow
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      return this.nearestInputPos(cursorPos, DIRECTION.LEFT);
    }
    return cursorPos;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    let total = 0;
    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      total += b.totalInputPositions(bFromPos, bToPos);
    });
    return total;
  }

  /** Get block by name */
  maskedBlock(name) {
    return this.maskedBlocks(name)[0];
  }

  /** Get all blocks by name */
  maskedBlocks(name) {
    const indices = this._maskedBlocks[name];
    if (!indices) return [];
    return indices.map(gi => this._blocks[gi]);
  }
  pad(flags) {
    const details = new ChangeDetails();
    this._forEachBlocksInRange(0, this.displayValue.length, b => details.aggregate(b.pad(flags)));
    return details;
  }
}
MaskedPattern.DEFAULTS = {
  ...Masked.DEFAULTS,
  lazy: true,
  placeholderChar: '_'
};
MaskedPattern.STOP_CHAR = '`';
MaskedPattern.ESCAPE_CHAR = '\\';
MaskedPattern.InputDefinition = PatternInputDefinition;
MaskedPattern.FixedDefinition = PatternFixedDefinition;
IMask.MaskedPattern = MaskedPattern;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/range.js













/** Pattern which accepts ranges */
class MaskedRange extends MaskedPattern {
  /**
    Optionally sets max length of pattern.
    Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
  */

  /** Min bound */

  /** Max bound */

  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }
  constructor(opts) {
    super(opts); // mask will be created in _update
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      to = this.to || 0,
      from = this.from || 0,
      maxLength = this.maxLength || 0,
      autofix = this.autofix,
      ...patternOpts
    } = opts;
    this.to = to;
    this.from = from;
    this.maxLength = Math.max(String(to).length, maxLength);
    this.autofix = autofix;
    const fromStr = String(this.from).padStart(this.maxLength, '0');
    const toStr = String(this.to).padStart(this.maxLength, '0');
    let sameCharsCount = 0;
    while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) ++sameCharsCount;
    patternOpts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(this.maxLength - sameCharsCount);
    super._update(patternOpts);
  }
  get isComplete() {
    return super.isComplete && Boolean(this.value);
  }
  boundaries(str) {
    let minstr = '';
    let maxstr = '';
    const [, placeholder, num] = str.match(/^(\D*)(\d*)(\D*)/) || [];
    if (num) {
      minstr = '0'.repeat(placeholder.length) + num;
      maxstr = '9'.repeat(placeholder.length) + num;
    }
    minstr = minstr.padEnd(this.maxLength, '0');
    maxstr = maxstr.padEnd(this.maxLength, '9');
    return [minstr, maxstr];
  }
  doPrepareChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let details;
    [ch, details] = super.doPrepareChar(ch.replace(/\D/g, ''), flags);
    if (!ch) details.skip = !this.isComplete;
    return [ch, details];
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    if (!this.autofix || this.value.length + 1 > this.maxLength) return super._appendCharRaw(ch, flags);
    const fromStr = String(this.from).padStart(this.maxLength, '0');
    const toStr = String(this.to).padStart(this.maxLength, '0');
    const [minstr, maxstr] = this.boundaries(this.value + ch);
    if (Number(maxstr) < this.from) return super._appendCharRaw(fromStr[this.value.length], flags);
    if (Number(minstr) > this.to) {
      if (!flags.tail && this.autofix === 'pad' && this.value.length + 1 < this.maxLength) {
        return super._appendCharRaw(fromStr[this.value.length], flags).aggregate(this._appendCharRaw(ch, flags));
      }
      return super._appendCharRaw(toStr[this.value.length], flags);
    }
    return super._appendCharRaw(ch, flags);
  }
  doValidate(flags) {
    const str = this.value;
    const firstNonZero = str.search(/[^0]/);
    if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
    const [minstr, maxstr] = this.boundaries(str);
    return this.from <= Number(maxstr) && Number(minstr) <= this.to && super.doValidate(flags);
  }
  pad(flags) {
    const details = new ChangeDetails();
    if (this.value.length === this.maxLength) return details;
    const value = this.value;
    const padLength = this.maxLength - this.value.length;
    if (padLength) {
      this.reset();
      for (let i = 0; i < padLength; ++i) {
        details.aggregate(super._appendCharRaw('0', flags));
      }

      // append tail
      value.split('').forEach(ch => this._appendCharRaw(ch));
    }
    return details;
  }
}
IMask.MaskedRange = MaskedRange;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/date.js














/** Date mask */
class MaskedDate extends MaskedPattern {
  static extractPatternOptions(opts) {
    const {
      mask,
      pattern,
      ...patternOpts
    } = opts;
    return {
      ...patternOpts,
      mask: isString(mask) ? mask : pattern
    };
  }

  /** Pattern mask for date according to {@link MaskedDate#format} */

  /** Start date */

  /** End date */

  /** Format typed value to string */

  /** Parse string to get typed value */

  constructor(opts) {
    super(MaskedDate.extractPatternOptions({
      ...MaskedDate.DEFAULTS,
      ...opts
    }));
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      mask,
      pattern,
      blocks,
      ...patternOpts
    } = {
      ...MaskedDate.DEFAULTS,
      ...opts
    };
    const patternBlocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS());
    // adjust year block
    if (opts.min) patternBlocks.Y.from = opts.min.getFullYear();
    if (opts.max) patternBlocks.Y.to = opts.max.getFullYear();
    if (opts.min && opts.max && patternBlocks.Y.from === patternBlocks.Y.to) {
      patternBlocks.m.from = opts.min.getMonth() + 1;
      patternBlocks.m.to = opts.max.getMonth() + 1;
      if (patternBlocks.m.from === patternBlocks.m.to) {
        patternBlocks.d.from = opts.min.getDate();
        patternBlocks.d.to = opts.max.getDate();
      }
    }
    Object.assign(patternBlocks, this.blocks, blocks);
    super._update({
      ...patternOpts,
      mask: isString(mask) ? mask : pattern,
      blocks: patternBlocks
    });
  }
  doValidate(flags) {
    const date = this.date;
    return super.doValidate(flags) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
  }

  /** Checks if date is exists */
  isDateExist(str) {
    return this.format(this.parse(str, this), this).indexOf(str) >= 0;
  }

  /** Parsed Date */
  get date() {
    return this.typedValue;
  }
  set date(date) {
    this.typedValue = date;
  }
  get typedValue() {
    return this.isComplete ? super.typedValue : null;
  }
  set typedValue(value) {
    super.typedValue = value;
  }
  maskEquals(mask) {
    return mask === Date || super.maskEquals(mask);
  }
  optionsIsChanged(opts) {
    return super.optionsIsChanged(MaskedDate.extractPatternOptions(opts));
  }
}
MaskedDate.GET_DEFAULT_BLOCKS = () => ({
  d: {
    mask: MaskedRange,
    from: 1,
    to: 31,
    maxLength: 2
  },
  m: {
    mask: MaskedRange,
    from: 1,
    to: 12,
    maxLength: 2
  },
  Y: {
    mask: MaskedRange,
    from: 1900,
    to: 9999
  }
});
MaskedDate.DEFAULTS = {
  ...MaskedPattern.DEFAULTS,
  mask: Date,
  pattern: 'd{.}`m{.}`Y',
  format: (date, masked) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return [day, month, year].join('.');
  },
  parse: (str, masked) => {
    const [day, month, year] = str.split('.').map(Number);
    return new Date(year, month - 1, day);
  }
};
IMask.MaskedDate = MaskedDate;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/dynamic.js







/** Dynamic mask for choosing appropriate mask in run-time */
class MaskedDynamic extends Masked {
  constructor(opts) {
    super({
      ...MaskedDynamic.DEFAULTS,
      ...opts
    });
    this.currentMask = undefined;
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update(opts);
    if ('mask' in opts) {
      this.exposeMask = undefined;
      // mask could be totally dynamic with only `dispatch` option
      this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(m => {
        const {
          expose,
          ...maskOpts
        } = normalizeOpts(m);
        const masked = createMask({
          overwrite: this._overwrite,
          eager: this._eager,
          skipInvalid: this._skipInvalid,
          ...maskOpts
        });
        if (expose) this.exposeMask = masked;
        return masked;
      }) : [];

      // this.currentMask = this.doDispatch(''); // probably not needed but lets see
    }
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const details = this._applyDispatch(ch, flags);
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendChar(ch, this.currentMaskFlags(flags)));
    }
    return details;
  }
  _applyDispatch(appended, flags, tail) {
    if (appended === void 0) {
      appended = '';
    }
    if (flags === void 0) {
      flags = {};
    }
    if (tail === void 0) {
      tail = '';
    }
    const prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
    const inputValue = this.rawInputValue;
    const insertValue = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._rawInputValue : inputValue;
    const tailValue = inputValue.slice(insertValue.length);
    const prevMask = this.currentMask;
    const details = new ChangeDetails();
    const prevMaskState = prevMask == null ? void 0 : prevMask.state;

    // clone flags to prevent overwriting `_beforeTailState`
    this.currentMask = this.doDispatch(appended, {
      ...flags
    }, tail);

    // restore state after dispatch
    if (this.currentMask) {
      if (this.currentMask !== prevMask) {
        // if mask changed reapply input
        this.currentMask.reset();
        if (insertValue) {
          this.currentMask.append(insertValue, {
            raw: true
          });
          details.tailShift = this.currentMask.value.length - prevValueBeforeTail.length;
        }
        if (tailValue) {
          details.tailShift += this.currentMask.append(tailValue, {
            raw: true,
            tail: true
          }).tailShift;
        }
      } else if (prevMaskState) {
        // Dispatch can do something bad with state, so
        // restore prev mask state
        this.currentMask.state = prevMaskState;
      }
    }
    return details;
  }
  _appendPlaceholder() {
    const details = this._applyDispatch();
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendPlaceholder());
    }
    return details;
  }
  _appendEager() {
    const details = this._applyDispatch();
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendEager());
    }
    return details;
  }
  appendTail(tail) {
    const details = new ChangeDetails();
    if (tail) details.aggregate(this._applyDispatch('', {}, tail));
    return details.aggregate(this.currentMask ? this.currentMask.appendTail(tail) : super.appendTail(tail));
  }
  currentMaskFlags(flags) {
    var _flags$_beforeTailSta, _flags$_beforeTailSta2;
    return {
      ...flags,
      _beforeTailState: ((_flags$_beforeTailSta = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta.currentMaskRef) === this.currentMask && ((_flags$_beforeTailSta2 = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta2.currentMask) || flags._beforeTailState
    };
  }
  doDispatch(appended, flags, tail) {
    if (flags === void 0) {
      flags = {};
    }
    if (tail === void 0) {
      tail = '';
    }
    return this.dispatch(appended, this, flags, tail);
  }
  doValidate(flags) {
    return super.doValidate(flags) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(flags)));
  }
  doPrepare(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let [s, details] = super.doPrepare(str, flags);
    if (this.currentMask) {
      let currentDetails;
      [s, currentDetails] = super.doPrepare(s, this.currentMaskFlags(flags));
      details = details.aggregate(currentDetails);
    }
    return [s, details];
  }
  doPrepareChar(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let [s, details] = super.doPrepareChar(str, flags);
    if (this.currentMask) {
      let currentDetails;
      [s, currentDetails] = super.doPrepareChar(s, this.currentMaskFlags(flags));
      details = details.aggregate(currentDetails);
    }
    return [s, details];
  }
  reset() {
    var _this$currentMask;
    (_this$currentMask = this.currentMask) == null || _this$currentMask.reset();
    this.compiledMasks.forEach(m => m.reset());
  }
  get value() {
    return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : '';
  }
  set value(value) {
    if (this.exposeMask) {
      this.exposeMask.value = value;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
    } else super.value = value;
  }
  get unmaskedValue() {
    return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : '';
  }
  set unmaskedValue(unmaskedValue) {
    if (this.exposeMask) {
      this.exposeMask.unmaskedValue = unmaskedValue;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
    } else super.unmaskedValue = unmaskedValue;
  }
  get typedValue() {
    return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : '';
  }
  set typedValue(typedValue) {
    if (this.exposeMask) {
      this.exposeMask.typedValue = typedValue;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
      return;
    }
    let unmaskedValue = String(typedValue);

    // double check it
    if (this.currentMask) {
      this.currentMask.typedValue = typedValue;
      unmaskedValue = this.currentMask.unmaskedValue;
    }
    this.unmaskedValue = unmaskedValue;
  }
  get displayValue() {
    return this.currentMask ? this.currentMask.displayValue : '';
  }
  get isComplete() {
    var _this$currentMask2;
    return Boolean((_this$currentMask2 = this.currentMask) == null ? void 0 : _this$currentMask2.isComplete);
  }
  get isFilled() {
    var _this$currentMask3;
    return Boolean((_this$currentMask3 = this.currentMask) == null ? void 0 : _this$currentMask3.isFilled);
  }
  remove(fromPos, toPos) {
    const details = new ChangeDetails();
    if (this.currentMask) {
      details.aggregate(this.currentMask.remove(fromPos, toPos))
      // update with dispatch
      .aggregate(this._applyDispatch());
    }
    return details;
  }
  get state() {
    var _this$currentMask4;
    return {
      ...super.state,
      _rawInputValue: this.rawInputValue,
      compiledMasks: this.compiledMasks.map(m => m.state),
      currentMaskRef: this.currentMask,
      currentMask: (_this$currentMask4 = this.currentMask) == null ? void 0 : _this$currentMask4.state
    };
  }
  set state(state) {
    const {
      compiledMasks,
      currentMaskRef,
      currentMask,
      ...maskedState
    } = state;
    if (compiledMasks) this.compiledMasks.forEach((m, mi) => m.state = compiledMasks[mi]);
    if (currentMaskRef != null) {
      this.currentMask = currentMaskRef;
      this.currentMask.state = currentMask;
    }
    super.state = maskedState;
  }
  extractInput(fromPos, toPos, flags) {
    return this.currentMask ? this.currentMask.extractInput(fromPos, toPos, flags) : '';
  }
  extractTail(fromPos, toPos) {
    return this.currentMask ? this.currentMask.extractTail(fromPos, toPos) : super.extractTail(fromPos, toPos);
  }
  doCommit() {
    if (this.currentMask) this.currentMask.doCommit();
    super.doCommit();
  }
  nearestInputPos(cursorPos, direction) {
    return this.currentMask ? this.currentMask.nearestInputPos(cursorPos, direction) : super.nearestInputPos(cursorPos, direction);
  }
  get overwrite() {
    return this.currentMask ? this.currentMask.overwrite : this._overwrite;
  }
  set overwrite(overwrite) {
    this._overwrite = overwrite;
  }
  get eager() {
    return this.currentMask ? this.currentMask.eager : this._eager;
  }
  set eager(eager) {
    this._eager = eager;
  }
  get skipInvalid() {
    return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
  }
  set skipInvalid(skipInvalid) {
    this._skipInvalid = skipInvalid;
  }
  get autofix() {
    return this.currentMask ? this.currentMask.autofix : this._autofix;
  }
  set autofix(autofix) {
    this._autofix = autofix;
  }
  maskEquals(mask) {
    return Array.isArray(mask) ? this.compiledMasks.every((m, mi) => {
      if (!mask[mi]) return;
      const {
        mask: oldMask,
        ...restOpts
      } = mask[mi];
      return objectIncludes(m, restOpts) && m.maskEquals(oldMask);
    }) : super.maskEquals(mask);
  }
  typedValueEquals(value) {
    var _this$currentMask5;
    return Boolean((_this$currentMask5 = this.currentMask) == null ? void 0 : _this$currentMask5.typedValueEquals(value));
  }
}
/** Currently chosen mask */
/** Currently chosen mask */
/** Compliled {@link Masked} options */
/** Chooses {@link Masked} depending on input value */
MaskedDynamic.DEFAULTS = {
  ...Masked.DEFAULTS,
  dispatch: (appended, masked, flags, tail) => {
    if (!masked.compiledMasks.length) return;
    const inputValue = masked.rawInputValue;

    // simulate input
    const inputs = masked.compiledMasks.map((m, index) => {
      const isCurrent = masked.currentMask === m;
      const startInputPos = isCurrent ? m.displayValue.length : m.nearestInputPos(m.displayValue.length, DIRECTION.FORCE_LEFT);
      if (m.rawInputValue !== inputValue) {
        m.reset();
        m.append(inputValue, {
          raw: true
        });
      } else if (!isCurrent) {
        m.remove(startInputPos);
      }
      m.append(appended, masked.currentMaskFlags(flags));
      m.appendTail(tail);
      return {
        index,
        weight: m.rawInputValue.length,
        totalInputPositions: m.totalInputPositions(0, Math.max(startInputPos, m.nearestInputPos(m.displayValue.length, DIRECTION.FORCE_LEFT)))
      };
    });

    // pop masks with longer values first
    inputs.sort((i1, i2) => i2.weight - i1.weight || i2.totalInputPositions - i1.totalInputPositions);
    return masked.compiledMasks[inputs[0].index];
  }
};
IMask.MaskedDynamic = MaskedDynamic;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/enum.js













/** Pattern which validates enum values */
class MaskedEnum extends MaskedPattern {
  constructor(opts) {
    super({
      ...MaskedEnum.DEFAULTS,
      ...opts
    }); // mask will be created in _update
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      enum: enum_,
      ...eopts
    } = opts;
    if (enum_) {
      const lengths = enum_.map(e => e.length);
      const requiredLength = Math.min(...lengths);
      const optionalLength = Math.max(...lengths) - requiredLength;
      eopts.mask = '*'.repeat(requiredLength);
      if (optionalLength) eopts.mask += '[' + '*'.repeat(optionalLength) + ']';
      this.enum = enum_;
    }
    super._update(eopts);
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const matchFrom = Math.min(this.nearestInputPos(0, DIRECTION.FORCE_RIGHT), this.value.length);
    const matches = this.enum.filter(e => this.matchValue(e, this.unmaskedValue + ch, matchFrom));
    if (matches.length) {
      if (matches.length === 1) {
        this._forEachBlocksInRange(0, this.value.length, (b, bi) => {
          const mch = matches[0][bi];
          if (bi >= this.value.length || mch === b.value) return;
          b.reset();
          b._appendChar(mch, flags);
        });
      }
      const d = super._appendCharRaw(matches[0][this.value.length], flags);
      if (matches.length === 1) {
        matches[0].slice(this.unmaskedValue.length).split('').forEach(mch => d.aggregate(super._appendCharRaw(mch)));
      }
      return d;
    }
    return new ChangeDetails({
      skip: !this.isComplete
    });
  }
  extractTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    // just drop tail
    return new ContinuousTailDetails('', fromPos);
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    if (fromPos === toPos) return new ChangeDetails();
    const matchFrom = Math.min(super.nearestInputPos(0, DIRECTION.FORCE_RIGHT), this.value.length);
    let pos;
    for (pos = fromPos; pos >= 0; --pos) {
      const matches = this.enum.filter(e => this.matchValue(e, this.value.slice(matchFrom, pos), matchFrom));
      if (matches.length > 1) break;
    }
    const details = super.remove(pos, toPos);
    details.tailShift += pos - fromPos;
    return details;
  }
  get isComplete() {
    return this.enum.indexOf(this.value) >= 0;
  }
}
/** Match enum value */
MaskedEnum.DEFAULTS = {
  ...MaskedPattern.DEFAULTS,
  matchValue: (estr, istr, matchFrom) => estr.indexOf(istr, matchFrom) === matchFrom
};
IMask.MaskedEnum = MaskedEnum;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/function.js






/** Masking by custom Function */
class MaskedFunction extends Masked {
  /** */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update({
      ...opts,
      validate: opts.mask
    });
  }
}
IMask.MaskedFunction = MaskedFunction;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/number.js






var _MaskedNumber;
/** Number mask */
class MaskedNumber extends Masked {
  /** Single char */

  /** Single char */

  /** Array of single chars */

  /** */

  /** */

  /** Digits after point */

  /** Flag to remove leading and trailing zeros in the end of editing */

  /** Flag to pad trailing zeros after point in the end of editing */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  /** Format typed value to string */

  /** Parse string to get typed value */

  constructor(opts) {
    super({
      ...MaskedNumber.DEFAULTS,
      ...opts
    });
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update(opts);
    this._updateRegExps();
  }
  _updateRegExps() {
    const start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
    const mid = '\\d*';
    const end = (this.scale ? "(" + escapeRegExp(this.radix) + "\\d{0," + this.scale + "})?" : '') + '$';
    this._numberRegExp = new RegExp(start + mid + end);
    this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(escapeRegExp).join('') + "]", 'g');
    this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
  }
  _removeThousandsSeparators(value) {
    return value.replace(this._thousandsSeparatorRegExp, '');
  }
  _insertThousandsSeparators(value) {
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    const parts = value.split(this.radix);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    return parts.join(this.radix);
  }
  doPrepareChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const [prepCh, details] = super.doPrepareChar(this._removeThousandsSeparators(this.scale && this.mapToRadix.length && (
    /*
      radix should be mapped when
      1) input is done from keyboard = flags.input && flags.raw
      2) unmasked value is set = !flags.input && !flags.raw
      and should not be mapped when
      1) value is set = flags.input && !flags.raw
      2) raw value is set = !flags.input && flags.raw
    */
    flags.input && flags.raw || !flags.input && !flags.raw) ? ch.replace(this._mapToRadixRegExp, this.radix) : ch), flags);
    if (ch && !prepCh) details.skip = true;
    if (prepCh && !this.allowPositive && !this.value && prepCh !== '-') details.aggregate(this._appendChar('-'));
    return [prepCh, details];
  }
  _separatorsCount(to, extendOnSeparators) {
    if (extendOnSeparators === void 0) {
      extendOnSeparators = false;
    }
    let count = 0;
    for (let pos = 0; pos < to; ++pos) {
      if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
        ++count;
        if (extendOnSeparators) to += this.thousandsSeparator.length;
      }
    }
    return count;
  }
  _separatorsCountFromSlice(slice) {
    if (slice === void 0) {
      slice = this._value;
    }
    return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
    return this._removeThousandsSeparators(super.extractInput(fromPos, toPos, flags));
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
    const prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
    this._value = this._removeThousandsSeparators(this.value);
    const oldValue = this._value;
    this._value += ch;
    const num = this.number;
    let accepted = !isNaN(num);
    let skip = false;
    if (accepted) {
      let fixedNum;
      if (this.min != null && this.min < 0 && this.number < this.min) fixedNum = this.min;
      if (this.max != null && this.max > 0 && this.number > this.max) fixedNum = this.max;
      if (fixedNum != null) {
        if (this.autofix) {
          this._value = this.format(fixedNum, this).replace(MaskedNumber.UNMASKED_RADIX, this.radix);
          skip || (skip = oldValue === this._value && !flags.tail); // if not changed on tail it's still ok to proceed
        } else {
          accepted = false;
        }
      }
      accepted && (accepted = Boolean(this._value.match(this._numberRegExp)));
    }
    let appendDetails;
    if (!accepted) {
      this._value = oldValue;
      appendDetails = new ChangeDetails();
    } else {
      appendDetails = new ChangeDetails({
        inserted: this._value.slice(oldValue.length),
        rawInserted: skip ? '' : ch,
        skip
      });
    }
    this._value = this._insertThousandsSeparators(this._value);
    const beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
    const beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
    appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
    return appendDetails;
  }
  _findSeparatorAround(pos) {
    if (this.thousandsSeparator) {
      const searchFrom = pos - this.thousandsSeparator.length + 1;
      const separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
      if (separatorPos <= pos) return separatorPos;
    }
    return -1;
  }
  _adjustRangeWithSeparators(from, to) {
    const separatorAroundFromPos = this._findSeparatorAround(from);
    if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;
    const separatorAroundToPos = this._findSeparatorAround(to);
    if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
    return [from, to];
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
    const valueBeforePos = this.value.slice(0, fromPos);
    const valueAfterPos = this.value.slice(toPos);
    const prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
    const beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
    return new ChangeDetails({
      tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
    });
  }
  nearestInputPos(cursorPos, direction) {
    if (!this.thousandsSeparator) return cursorPos;
    switch (direction) {
      case DIRECTION.NONE:
      case DIRECTION.LEFT:
      case DIRECTION.FORCE_LEFT:
        {
          const separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
          if (separatorAtLeftPos >= 0) {
            const separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
            if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
              return separatorAtLeftPos;
            }
          }
          break;
        }
      case DIRECTION.RIGHT:
      case DIRECTION.FORCE_RIGHT:
        {
          const separatorAtRightPos = this._findSeparatorAround(cursorPos);
          if (separatorAtRightPos >= 0) {
            return separatorAtRightPos + this.thousandsSeparator.length;
          }
        }
    }
    return cursorPos;
  }
  doCommit() {
    if (this.value) {
      const number = this.number;
      let validnum = number;

      // check bounds
      if (this.min != null) validnum = Math.max(validnum, this.min);
      if (this.max != null) validnum = Math.min(validnum, this.max);
      if (validnum !== number) this.unmaskedValue = this.format(validnum, this);
      let formatted = this.value;
      if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
      if (this.padFractionalZeros && this.scale > 0) formatted = this._padFractionalZeros(formatted);
      this._value = formatted;
    }
    super.doCommit();
  }
  _normalizeZeros(value) {
    const parts = this._removeThousandsSeparators(value).split(this.radix);

    // remove leading zeros
    parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, (match, sign, zeros, num) => sign + num);
    // add leading zero
    if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';
    if (parts.length > 1) {
      parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros
      if (!parts[1].length) parts.length = 1; // remove fractional
    }
    return this._insertThousandsSeparators(parts.join(this.radix));
  }
  _padFractionalZeros(value) {
    if (!value) return value;
    const parts = value.split(this.radix);
    if (parts.length < 2) parts.push('');
    parts[1] = parts[1].padEnd(this.scale, '0');
    return parts.join(this.radix);
  }
  doSkipInvalid(ch, flags, checkTail) {
    if (flags === void 0) {
      flags = {};
    }
    const dropFractional = this.scale === 0 && ch !== this.thousandsSeparator && (ch === this.radix || ch === MaskedNumber.UNMASKED_RADIX || this.mapToRadix.includes(ch));
    return super.doSkipInvalid(ch, flags, checkTail) && !dropFractional;
  }
  get unmaskedValue() {
    return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, MaskedNumber.UNMASKED_RADIX);
  }
  set unmaskedValue(unmaskedValue) {
    super.unmaskedValue = unmaskedValue;
  }
  get typedValue() {
    return this.parse(this.unmaskedValue, this);
  }
  set typedValue(n) {
    this.rawInputValue = this.format(n, this).replace(MaskedNumber.UNMASKED_RADIX, this.radix);
  }

  /** Parsed Number */
  get number() {
    return this.typedValue;
  }
  set number(number) {
    this.typedValue = number;
  }
  get allowNegative() {
    return this.min != null && this.min < 0 || this.max != null && this.max < 0;
  }
  get allowPositive() {
    return this.min != null && this.min > 0 || this.max != null && this.max > 0;
  }
  typedValueEquals(value) {
    // handle  0 -> '' case (typed = 0 even if value = '')
    // for details see https://github.com/uNmAnNeR/imaskjs/issues/134
    return (super.typedValueEquals(value) || MaskedNumber.EMPTY_VALUES.includes(value) && MaskedNumber.EMPTY_VALUES.includes(this.typedValue)) && !(value === 0 && this.value === '');
  }
}
_MaskedNumber = MaskedNumber;
MaskedNumber.UNMASKED_RADIX = '.';
MaskedNumber.EMPTY_VALUES = [...Masked.EMPTY_VALUES, 0];
MaskedNumber.DEFAULTS = {
  ...Masked.DEFAULTS,
  mask: Number,
  radix: ',',
  thousandsSeparator: '',
  mapToRadix: [_MaskedNumber.UNMASKED_RADIX],
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  scale: 2,
  normalizeZeros: true,
  padFractionalZeros: false,
  parse: Number,
  format: n => n.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits: 20
  })
};
IMask.MaskedNumber = MaskedNumber;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/pipe.js




/** Mask pipe source and destination types */
const PIPE_TYPE = {
  MASKED: 'value',
  UNMASKED: 'unmaskedValue',
  TYPED: 'typedValue'
};
/** Creates new pipe function depending on mask type, source and destination options */
function createPipe(arg, from, to) {
  if (from === void 0) {
    from = PIPE_TYPE.MASKED;
  }
  if (to === void 0) {
    to = PIPE_TYPE.MASKED;
  }
  const masked = createMask(arg);
  return value => masked.runIsolated(m => {
    m[from] = value;
    return m[to];
  });
}

/** Pipes value through mask depending on mask type, source and destination options */
function pipe(value, mask, from, to) {
  return createPipe(mask, from, to)(value);
}
IMask.PIPE_TYPE = PIPE_TYPE;
IMask.createPipe = createPipe;
IMask.pipe = pipe;



;// CONCATENATED MODULE: ./node_modules/imask/esm/masked/repeat.js













/** Pattern mask */
class RepeatBlock extends MaskedPattern {
  get repeatFrom() {
    var _ref;
    return (_ref = Array.isArray(this.repeat) ? this.repeat[0] : this.repeat === Infinity ? 0 : this.repeat) != null ? _ref : 0;
  }
  get repeatTo() {
    var _ref2;
    return (_ref2 = Array.isArray(this.repeat) ? this.repeat[1] : this.repeat) != null ? _ref2 : Infinity;
  }
  constructor(opts) {
    super(opts);
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    var _ref3, _ref4, _this$_blocks;
    const {
      repeat,
      ...blockOpts
    } = normalizeOpts(opts); // TODO type
    this._blockOpts = Object.assign({}, this._blockOpts, blockOpts);
    const block = createMask(this._blockOpts);
    this.repeat = (_ref3 = (_ref4 = repeat != null ? repeat : block.repeat) != null ? _ref4 : this.repeat) != null ? _ref3 : Infinity; // TODO type

    super._update({
      mask: 'm'.repeat(Math.max(this.repeatTo === Infinity && ((_this$_blocks = this._blocks) == null ? void 0 : _this$_blocks.length) || 0, this.repeatFrom)),
      blocks: {
        m: block
      },
      eager: block.eager,
      overwrite: block.overwrite,
      skipInvalid: block.skipInvalid,
      lazy: block.lazy,
      placeholderChar: block.placeholderChar,
      displayChar: block.displayChar
    });
  }
  _allocateBlock(bi) {
    if (bi < this._blocks.length) return this._blocks[bi];
    if (this.repeatTo === Infinity || this._blocks.length < this.repeatTo) {
      this._blocks.push(createMask(this._blockOpts));
      this.mask += 'm';
      return this._blocks[this._blocks.length - 1];
    }
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const details = new ChangeDetails();
    for (let bi = (_this$_mapPosToBlock$ = (_this$_mapPosToBlock = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : _this$_mapPosToBlock.index) != null ? _this$_mapPosToBlock$ : Math.max(this._blocks.length - 1, 0), block, allocated;
    // try to get a block or
    // try to allocate a new block if not allocated already
    block = (_this$_blocks$bi = this._blocks[bi]) != null ? _this$_blocks$bi : allocated = !allocated && this._allocateBlock(bi); ++bi) {
      var _this$_mapPosToBlock$, _this$_mapPosToBlock, _this$_blocks$bi, _flags$_beforeTailSta;
      const blockDetails = block._appendChar(ch, {
        ...flags,
        _beforeTailState: (_flags$_beforeTailSta = flags._beforeTailState) == null || (_flags$_beforeTailSta = _flags$_beforeTailSta._blocks) == null ? void 0 : _flags$_beforeTailSta[bi]
      });
      if (blockDetails.skip && allocated) {
        // remove the last allocated block and break
        this._blocks.pop();
        this.mask = this.mask.slice(1);
        break;
      }
      details.aggregate(blockDetails);
      if (blockDetails.consumed) break; // go next char
    }
    return details;
  }
  _trimEmptyTail(fromPos, toPos) {
    var _this$_mapPosToBlock2, _this$_mapPosToBlock3;
    if (fromPos === void 0) {
      fromPos = 0;
    }
    const firstBlockIndex = Math.max(((_this$_mapPosToBlock2 = this._mapPosToBlock(fromPos)) == null ? void 0 : _this$_mapPosToBlock2.index) || 0, this.repeatFrom, 0);
    let lastBlockIndex;
    if (toPos != null) lastBlockIndex = (_this$_mapPosToBlock3 = this._mapPosToBlock(toPos)) == null ? void 0 : _this$_mapPosToBlock3.index;
    if (lastBlockIndex == null) lastBlockIndex = this._blocks.length - 1;
    let removeCount = 0;
    for (let blockIndex = lastBlockIndex; firstBlockIndex <= blockIndex; --blockIndex, ++removeCount) {
      if (this._blocks[blockIndex].unmaskedValue) break;
    }
    if (removeCount) {
      this._blocks.splice(lastBlockIndex - removeCount + 1, removeCount);
      this.mask = this.mask.slice(removeCount);
    }
  }
  reset() {
    super.reset();
    this._trimEmptyTail();
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const removeDetails = super.remove(fromPos, toPos);
    this._trimEmptyTail(fromPos, toPos);
    return removeDetails;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos == null && this.repeatTo === Infinity) return Infinity;
    return super.totalInputPositions(fromPos, toPos);
  }
  get state() {
    return super.state;
  }
  set state(state) {
    this._blocks.length = state._blocks.length;
    this.mask = this.mask.slice(0, this._blocks.length);
    super.state = state;
  }
}
IMask.RepeatBlock = RepeatBlock;



;// CONCATENATED MODULE: ./node_modules/imask/esm/index.js




























try {
  globalThis.IMask = IMask;
} catch {}



// EXTERNAL MODULE: ./node_modules/easydropdown/dist/index.js
var dist = __webpack_require__(7379);
;// CONCATENATED MODULE: ./node_modules/just-extend/index.esm.js
var objectExtend = extend;

/*
  var obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 4, b: 5, c: 8}

  var obj = {a: 3, b: 5};
  extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 3, b: 5}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3]}

  extend({a: 4, b: 5}); // {a: 4, b: 5}
  extend({a: 4, b: 5}, 3); {a: 4, b: 5}
  extend({a: 4, b: 5}, true); {a: 4, b: 5}
  extend('hello', {a: 4, b: 5}); // throws
  extend(3, {a: 4, b: 5}); // throws
*/

function extend(/* [deep], obj1, obj2, [objn] */) {
  var args = [].slice.call(arguments);
  var deep = false;
  if (typeof args[0] == 'boolean') {
    deep = args.shift();
  }
  var result = args[0];
  if (isUnextendable(result)) {
    throw new Error('extendee must be an object');
  }
  var extenders = args.slice(1);
  var len = extenders.length;
  for (var i = 0; i < len; i++) {
    var extender = extenders[i];
    for (var key in extender) {
      if (Object.prototype.hasOwnProperty.call(extender, key)) {
        var value = extender[key];
        if (deep && isCloneable(value)) {
          var base = Array.isArray(value) ? [] : {};
          result[key] = extend(
            true,
            Object.prototype.hasOwnProperty.call(result, key) && !isUnextendable(result[key])
              ? result[key]
              : base,
            value
          );
        } else {
          result[key] = value;
        }
      }
    }
  }
  return result;
}

function isCloneable(obj) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}

function isUnextendable(val) {
  return !val || (typeof val != 'object' && typeof val != 'function');
}



;// CONCATENATED MODULE: ./node_modules/dropzone/dist/dropzone.mjs


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

class $4040acfd8584338d$export$2e2bcd8739ae039 {
    // Add an event listener for given event
    on(event, fn) {
        this._callbacks = this._callbacks || {
        };
        // Create namespace for this event
        if (!this._callbacks[event]) this._callbacks[event] = [];
        this._callbacks[event].push(fn);
        return this;
    }
    emit(event, ...args) {
        this._callbacks = this._callbacks || {
        };
        let callbacks = this._callbacks[event];
        if (callbacks) for (let callback of callbacks)callback.apply(this, args);
        // trigger a corresponding DOM event
        if (this.element) this.element.dispatchEvent(this.makeEvent("dropzone:" + event, {
            args: args
        }));
        return this;
    }
    makeEvent(eventName, detail) {
        let params = {
            bubbles: true,
            cancelable: true,
            detail: detail
        };
        if (typeof window.CustomEvent === "function") return new CustomEvent(eventName, params);
        else {
            // IE 11 support
            // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
    }
    // Remove event listener for given event. If fn is not provided, all event
    // listeners for that event will be removed. If neither is provided, all
    // event listeners will be removed.
    off(event, fn) {
        if (!this._callbacks || arguments.length === 0) {
            this._callbacks = {
            };
            return this;
        }
        // specific event
        let callbacks = this._callbacks[event];
        if (!callbacks) return this;
        // remove all handlers
        if (arguments.length === 1) {
            delete this._callbacks[event];
            return this;
        }
        // remove specific handler
        for(let i = 0; i < callbacks.length; i++){
            let callback = callbacks[i];
            if (callback === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }
        return this;
    }
}



var $fd6031f88dce2e32$exports = {};
$fd6031f88dce2e32$exports = "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail=\"\"></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size=\"\"></span></div>\n    <div class=\"dz-filename\"><span data-dz-name=\"\"></span></div>\n  </div>\n  <div class=\"dz-progress\">\n    <span class=\"dz-upload\" data-dz-uploadprogress=\"\"></span>\n  </div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage=\"\"></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M10.2071 29.7929L14.2929 25.7071C14.6834 25.3166 15.3166 25.3166 15.7071 25.7071L21.2929 31.2929C21.6834 31.6834 22.3166 31.6834 22.7071 31.2929L38.2929 15.7071C38.6834 15.3166 39.3166 15.3166 39.7071 15.7071L43.7929 19.7929C44.1834 20.1834 44.1834 20.8166 43.7929 21.2071L22.7071 42.2929C22.3166 42.6834 21.6834 42.6834 21.2929 42.2929L10.2071 31.2071C9.81658 30.8166 9.81658 30.1834 10.2071 29.7929Z\"></path>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z\"></path>\n    </svg>\n  </div>\n</div>\n";


let $4ca367182776f80b$var$defaultOptions = {
    /**
   * Has to be specified on elements other than form (or when the form doesn't
   * have an `action` attribute).
   *
   * You can also provide a function that will be called with `files` and
   * `dataBlocks`  and must return the url as string.
   */ url: null,
    /**
   * Can be changed to `"put"` if necessary. You can also provide a function
   * that will be called with `files` and must return the method (since `v3.12.0`).
   */ method: "post",
    /**
   * Will be set on the XHRequest.
   */ withCredentials: false,
    /**
   * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
   * If set to null or 0, no timeout is going to be set.
   */ timeout: null,
    /**
   * How many file uploads to process in parallel (See the
   * Enqueuing file uploads documentation section for more info)
   */ parallelUploads: 2,
    /**
   * Whether to send multiple files in one request. If
   * this it set to true, then the fallback file input element will
   * have the `multiple` attribute as well. This option will
   * also trigger additional events (like `processingmultiple`). See the events
   * documentation section for more information.
   */ uploadMultiple: false,
    /**
   * Whether you want files to be uploaded in chunks to your server. This can't be
   * used in combination with `uploadMultiple`.
   *
   * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
   */ chunking: false,
    /**
   * If `chunking` is enabled, this defines whether **every** file should be chunked,
   * even if the file size is below chunkSize. This means, that the additional chunk
   * form data will be submitted and the `chunksUploaded` callback will be invoked.
   */ forceChunking: false,
    /**
   * If `chunking` is `true`, then this defines the chunk size in bytes.
   */ chunkSize: 2097152,
    /**
   * If `true`, the individual chunks of a file are being uploaded simultaneously.
   */ parallelChunkUploads: false,
    /**
   * Whether a chunk should be retried if it fails.
   */ retryChunks: false,
    /**
   * If `retryChunks` is true, how many times should it be retried.
   */ retryChunksLimit: 3,
    /**
   * The maximum filesize (in MiB) that is allowed to be uploaded.
   */ maxFilesize: 256,
    /**
   * The name of the file param that gets transferred.
   * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
   * Dropzone will append `[]` to the name.
   */ paramName: "file",
    /**
   * Whether thumbnails for images should be generated
   */ createImageThumbnails: true,
    /**
   * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
   */ maxThumbnailFilesize: 10,
    /**
   * If `null`, the ratio of the image will be used to calculate it.
   */ thumbnailWidth: 120,
    /**
   * The same as `thumbnailWidth`. If both are null, images will not be resized.
   */ thumbnailHeight: 120,
    /**
   * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
   * Can be either `contain` or `crop`.
   */ thumbnailMethod: "crop",
    /**
   * If set, images will be resized to these dimensions before being **uploaded**.
   * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
   * ratio of the file will be preserved.
   *
   * The `options.transformFile` function uses these options, so if the `transformFile` function
   * is overridden, these options don't do anything.
   */ resizeWidth: null,
    /**
   * See `resizeWidth`.
   */ resizeHeight: null,
    /**
   * The mime type of the resized image (before it gets uploaded to the server).
   * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
   * See `resizeWidth` for more information.
   */ resizeMimeType: null,
    /**
   * The quality of the resized images. See `resizeWidth`.
   */ resizeQuality: 0.8,
    /**
   * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
   * Can be either `contain` or `crop`.
   */ resizeMethod: "contain",
    /**
   * The base that is used to calculate the **displayed** filesize. You can
   * change this to 1024 if you would rather display kibibytes, mebibytes,
   * etc... 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte`
   * not `1 kilobyte`. You can change this to `1024` if you don't care about
   * validity.
   */ filesizeBase: 1000,
    /**
   * If not `null` defines how many files this Dropzone handles. If it exceeds,
   * the event `maxfilesexceeded` will be called. The dropzone element gets the
   * class `dz-max-files-reached` accordingly so you can provide visual
   * feedback.
   */ maxFiles: null,
    /**
   * An optional object to send additional headers to the server. Eg:
   * `{ "My-Awesome-Header": "header value" }`
   */ headers: null,
    /**
   * Should the default headers be set or not?
   * Accept: application/json <- for requesting json response
   * Cache-Control: no-cache <- Request shouldnt be cached
   * X-Requested-With: XMLHttpRequest <- We sent the request via XMLHttpRequest
   */ defaultHeaders: true,
    /**
   * If `true`, the dropzone element itself will be clickable, if `false`
   * nothing will be clickable.
   *
   * You can also pass an HTML element, a CSS selector (for multiple elements)
   * or an array of those. In that case, all of those elements will trigger an
   * upload when clicked.
   */ clickable: true,
    /**
   * Whether hidden files in directories should be ignored.
   */ ignoreHiddenFiles: true,
    /**
   * The default implementation of `accept` checks the file's mime type or
   * extension against this list. This is a comma separated list of mime
   * types or file extensions.
   *
   * Eg.: `image/*,application/pdf,.psd`
   *
   * If the Dropzone is `clickable` this option will also be used as
   * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
   * parameter on the hidden file input as well.
   */ acceptedFiles: null,
    /**
   * **Deprecated!**
   * Use acceptedFiles instead.
   */ acceptedMimeTypes: null,
    /**
   * If false, files will be added to the queue but the queue will not be
   * processed automatically.
   * This can be useful if you need some additional user input before sending
   * files (or if you want want all files sent at once).
   * If you're ready to send the file simply call `myDropzone.processQueue()`.
   *
   * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
   * section for more information.
   */ autoProcessQueue: true,
    /**
   * If false, files added to the dropzone will not be queued by default.
   * You'll have to call `enqueueFile(file)` manually.
   */ autoQueue: true,
    /**
   * If `true`, this will add a link to every file preview to remove or cancel (if
   * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
   * and `dictRemoveFile` options are used for the wording.
   */ addRemoveLinks: false,
    /**
   * Defines where to display the file previews – if `null` the
   * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
   * selector. The element should have the `dropzone-previews` class so
   * the previews are displayed properly.
   */ previewsContainer: null,
    /**
   * Set this to `true` if you don't want previews to be shown.
   */ disablePreviews: false,
    /**
   * This is the element the hidden input field (which is used when clicking on the
   * dropzone to trigger file selection) will be appended to. This might
   * be important in case you use frameworks to switch the content of your page.
   *
   * Can be a selector string, or an element directly.
   */ hiddenInputContainer: "body",
    /**
   * If null, no capture type will be specified
   * If camera, mobile devices will skip the file selection and choose camera
   * If microphone, mobile devices will skip the file selection and choose the microphone
   * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
   * On apple devices multiple must be set to false.  AcceptedFiles may need to
   * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
   */ capture: null,
    /**
   * **Deprecated**. Use `renameFile` instead.
   */ renameFilename: null,
    /**
   * A function that is invoked before the file is uploaded to the server and renames the file.
   * This function gets the `File` as argument and can use the `file.name`. The actual name of the
   * file that gets used during the upload can be accessed through `file.upload.filename`.
   */ renameFile: null,
    /**
   * If `true` the fallback will be forced. This is very useful to test your server
   * implementations first and make sure that everything works as
   * expected without dropzone if you experience problems, and to test
   * how your fallbacks will look.
   */ forceFallback: false,
    /**
   * The text used before any files are dropped.
   */ dictDefaultMessage: "Drop files here to upload",
    /**
   * The text that replaces the default message text it the browser is not supported.
   */ dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
    /**
   * The text that will be added before the fallback form.
   * If you provide a  fallback element yourself, or if this option is `null` this will
   * be ignored.
   */ dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
    /**
   * If the filesize is too big.
   * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
   */ dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
    /**
   * If the file doesn't match the file type.
   */ dictInvalidFileType: "You can't upload files of this type.",
    /**
   * If the server response was invalid.
   * `{{statusCode}}` will be replaced with the servers status code.
   */ dictResponseError: "Server responded with {{statusCode}} code.",
    /**
   * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
   */ dictCancelUpload: "Cancel upload",
    /**
   * The text that is displayed if an upload was manually canceled
   */ dictUploadCanceled: "Upload canceled.",
    /**
   * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
   */ dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
    /**
   * If `addRemoveLinks` is true, the text to be used to remove a file.
   */ dictRemoveFile: "Remove file",
    /**
   * If this is not null, then the user will be prompted before removing a file.
   */ dictRemoveFileConfirmation: null,
    /**
   * Displayed if `maxFiles` is st and exceeded.
   * The string `{{maxFiles}}` will be replaced by the configuration value.
   */ dictMaxFilesExceeded: "You can not upload any more files.",
    /**
   * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
   * `b` for bytes.
   */ dictFileSizeUnits: {
        tb: "TB",
        gb: "GB",
        mb: "MB",
        kb: "KB",
        b: "b"
    },
    /**
   * Called when dropzone initialized
   * You can add event listeners here
   */ init () {
    },
    /**
   * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
   * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
   * of a function, this needs to return a map.
   *
   * The default implementation does nothing for normal uploads, but adds relevant information for
   * chunked uploads.
   *
   * This is the same as adding hidden input fields in the form element.
   */ params (files, xhr, chunk) {
        if (chunk) return {
            dzuuid: chunk.file.upload.uuid,
            dzchunkindex: chunk.index,
            dztotalfilesize: chunk.file.size,
            dzchunksize: this.options.chunkSize,
            dztotalchunkcount: chunk.file.upload.totalChunkCount,
            dzchunkbyteoffset: chunk.index * this.options.chunkSize
        };
    },
    /**
   * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
   * and a `done` function as parameters.
   *
   * If the done function is invoked without arguments, the file is "accepted" and will
   * be processed. If you pass an error message, the file is rejected, and the error
   * message will be displayed.
   * This function will not be called if the file is too big or doesn't match the mime types.
   */ accept (file, done) {
        return done();
    },
    /**
   * The callback that will be invoked when all chunks have been uploaded for a file.
   * It gets the file for which the chunks have been uploaded as the first parameter,
   * and the `done` function as second. `done()` needs to be invoked when everything
   * needed to finish the upload process is done.
   */ chunksUploaded: function(file, done) {
        done();
    },
    /**
   * Sends the file as binary blob in body instead of form data.
   * If this is set, the `params` option will be ignored.
   * It's an error to set this to `true` along with `uploadMultiple` since
   * multiple files cannot be in a single binary body.
   */ binaryBody: false,
    /**
   * Gets called when the browser is not supported.
   * The default implementation shows the fallback input field and adds
   * a text.
   */ fallback () {
        // This code should pass in IE7... :(
        let messageElement;
        this.element.className = `${this.element.className} dz-browser-not-supported`;
        for (let child of this.element.getElementsByTagName("div"))if (/(^| )dz-message($| )/.test(child.className)) {
            messageElement = child;
            child.className = "dz-message"; // Removes the 'dz-default' class
            break;
        }
        if (!messageElement) {
            messageElement = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement('<div class="dz-message"><span></span></div>');
            this.element.appendChild(messageElement);
        }
        let span = messageElement.getElementsByTagName("span")[0];
        if (span) {
            if (span.textContent != null) span.textContent = this.options.dictFallbackMessage;
            else if (span.innerText != null) span.innerText = this.options.dictFallbackMessage;
        }
        return this.element.appendChild(this.getFallbackForm());
    },
    /**
   * Gets called to calculate the thumbnail dimensions.
   *
   * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
   *
   *  - `srcWidth` & `srcHeight` (required)
   *  - `trgWidth` & `trgHeight` (required)
   *  - `srcX` & `srcY` (optional, default `0`)
   *  - `trgX` & `trgY` (optional, default `0`)
   *
   * Those values are going to be used by `ctx.drawImage()`.
   */ resize (file, width, height, resizeMethod) {
        let info = {
            srcX: 0,
            srcY: 0,
            srcWidth: file.width,
            srcHeight: file.height
        };
        let srcRatio = file.width / file.height;
        // Automatically calculate dimensions if not specified
        if (width == null && height == null) {
            width = info.srcWidth;
            height = info.srcHeight;
        } else if (width == null) width = height * srcRatio;
        else if (height == null) height = width / srcRatio;
        // Make sure images aren't upscaled
        width = Math.min(width, info.srcWidth);
        height = Math.min(height, info.srcHeight);
        let trgRatio = width / height;
        if (info.srcWidth > width || info.srcHeight > height) {
            // Image is bigger and needs rescaling
            if (resizeMethod === "crop") {
                if (srcRatio > trgRatio) {
                    info.srcHeight = file.height;
                    info.srcWidth = info.srcHeight * trgRatio;
                } else {
                    info.srcWidth = file.width;
                    info.srcHeight = info.srcWidth / trgRatio;
                }
            } else if (resizeMethod === "contain") {
                // Method 'contain'
                if (srcRatio > trgRatio) height = width / srcRatio;
                else width = height * srcRatio;
            } else throw new Error(`Unknown resizeMethod '${resizeMethod}'`);
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        info.trgWidth = width;
        info.trgHeight = height;
        return info;
    },
    /**
   * Can be used to transform the file (for example, resize an image if necessary).
   *
   * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
   * images according to those dimensions.
   *
   * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
   * to be invoked with the file when the transformation is done.
   */ transformFile (file, done) {
        if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
        else return done(file);
    },
    /**
   * A string that contains the template used for each dropped
   * file. Change it to fulfill your needs but make sure to properly
   * provide all elements.
   *
   * If you want to use an actual HTML element instead of providing a String
   * as a config option, you could create a div with the id `tpl`,
   * put the template inside it and provide the element like this:
   *
   *     document
   *       .querySelector('#tpl')
   *       .innerHTML
   *
   */ previewTemplate: (/*@__PURE__*/$parcel$interopDefault($fd6031f88dce2e32$exports)),
    /*
   Those functions register themselves to the events on init and handle all
   the user interface specific stuff. Overwriting them won't break the upload
   but can break the way it's displayed.
   You can overwrite them if you don't like the default behavior. If you just
   want to add an additional event handler, register it on the dropzone object
   and don't overwrite those options.
   */ // Those are self explanatory and simply concern the DragnDrop.
    drop (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    dragstart (e) {
    },
    dragend (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    dragenter (e) {
        return this.element.classList.add("dz-drag-hover");
    },
    dragover (e) {
        return this.element.classList.add("dz-drag-hover");
    },
    dragleave (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    paste (e) {
    },
    // Called whenever there are no files left in the dropzone anymore, and the
    // dropzone should be displayed as if in the initial state.
    reset () {
        return this.element.classList.remove("dz-started");
    },
    // Called when a file is added to the queue
    // Receives `file`
    addedfile (file) {
        if (this.element === this.previewsContainer) this.element.classList.add("dz-started");
        if (this.previewsContainer && !this.options.disablePreviews) {
            file.previewElement = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(this.options.previewTemplate.trim());
            file.previewTemplate = file.previewElement; // Backwards compatibility
            this.previewsContainer.appendChild(file.previewElement);
            for (var node of file.previewElement.querySelectorAll("[data-dz-name]"))node.textContent = file.name;
            for (node of file.previewElement.querySelectorAll("[data-dz-size]"))node.innerHTML = this.filesize(file.size);
            if (this.options.addRemoveLinks) {
                file._removeLink = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<a class="dz-remove" href="javascript:undefined;" data-dz-remove>${this.options.dictRemoveFile}</a>`);
                file.previewElement.appendChild(file._removeLink);
            }
            let removeFileEvent = (e)=>{
                e.preventDefault();
                e.stopPropagation();
                if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm(this.options.dictCancelUploadConfirmation, ()=>this.removeFile(file)
                );
                else {
                    if (this.options.dictRemoveFileConfirmation) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm(this.options.dictRemoveFileConfirmation, ()=>this.removeFile(file)
                    );
                    else return this.removeFile(file);
                }
            };
            for (let removeLink of file.previewElement.querySelectorAll("[data-dz-remove]"))removeLink.addEventListener("click", removeFileEvent);
        }
    },
    // Called whenever a file is removed.
    removedfile (file) {
        if (file.previewElement != null && file.previewElement.parentNode != null) file.previewElement.parentNode.removeChild(file.previewElement);
        return this._updateMaxFilesReachedClass();
    },
    // Called when a thumbnail has been generated
    // Receives `file` and `dataUrl`
    thumbnail (file, dataUrl) {
        if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");
            for (let thumbnailElement of file.previewElement.querySelectorAll("[data-dz-thumbnail]")){
                thumbnailElement.alt = file.name;
                thumbnailElement.src = dataUrl;
            }
            return setTimeout(()=>file.previewElement.classList.add("dz-image-preview")
            , 1);
        }
    },
    // Called whenever an error occurs
    // Receives `file` and `message`
    error (file, message) {
        if (file.previewElement) {
            file.previewElement.classList.add("dz-error");
            if (typeof message !== "string" && message.error) message = message.error;
            for (let node of file.previewElement.querySelectorAll("[data-dz-errormessage]"))node.textContent = message;
        }
    },
    errormultiple () {
    },
    // Called when a file gets processed. Since there is a cue, not all added
    // files are processed immediately.
    // Receives `file`
    processing (file) {
        if (file.previewElement) {
            file.previewElement.classList.add("dz-processing");
            if (file._removeLink) return file._removeLink.innerHTML = this.options.dictCancelUpload;
        }
    },
    processingmultiple () {
    },
    // Called whenever the upload progress gets updated.
    // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
    // To get the total number of bytes of the file, use `file.size`
    uploadprogress (file, progress, bytesSent) {
        if (file.previewElement) for (let node of file.previewElement.querySelectorAll("[data-dz-uploadprogress]"))node.nodeName === "PROGRESS" ? node.value = progress : node.style.width = `${progress}%`;
    },
    // Called whenever the total upload progress gets updated.
    // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
    totaluploadprogress () {
    },
    // Called just before the file is sent. Gets the `xhr` object as second
    // parameter, so you can modify it (for example to add a CSRF token) and a
    // `formData` object to add additional information.
    sending () {
    },
    sendingmultiple () {
    },
    // When the complete upload is finished and successful
    // Receives `file`
    success (file) {
        if (file.previewElement) return file.previewElement.classList.add("dz-success");
    },
    successmultiple () {
    },
    // When the upload is canceled.
    canceled (file) {
        return this.emit("error", file, this.options.dictUploadCanceled);
    },
    canceledmultiple () {
    },
    // When the upload is finished, either with success or an error.
    // Receives `file`
    complete (file) {
        if (file._removeLink) file._removeLink.innerHTML = this.options.dictRemoveFile;
        if (file.previewElement) return file.previewElement.classList.add("dz-complete");
    },
    completemultiple () {
    },
    maxfilesexceeded () {
    },
    maxfilesreached () {
    },
    queuecomplete () {
    },
    addedfiles () {
    }
};
var $4ca367182776f80b$export$2e2bcd8739ae039 = $4ca367182776f80b$var$defaultOptions;


class $3ed269f2f0fb224b$export$2e2bcd8739ae039 extends $4040acfd8584338d$export$2e2bcd8739ae039 {
    static initClass() {
        // Exposing the emitter class, mainly for tests
        this.prototype.Emitter = $4040acfd8584338d$export$2e2bcd8739ae039;
        /*
     This is a list of all available events you can register on a dropzone object.

     You can register an event handler like this:

     dropzone.on("dragEnter", function() { });

     */ this.prototype.events = [
            "drop",
            "dragstart",
            "dragend",
            "dragenter",
            "dragover",
            "dragleave",
            "addedfile",
            "addedfiles",
            "removedfile",
            "thumbnail",
            "error",
            "errormultiple",
            "processing",
            "processingmultiple",
            "uploadprogress",
            "totaluploadprogress",
            "sending",
            "sendingmultiple",
            "success",
            "successmultiple",
            "canceled",
            "canceledmultiple",
            "complete",
            "completemultiple",
            "reset",
            "maxfilesexceeded",
            "maxfilesreached",
            "queuecomplete",
        ];
        this.prototype._thumbnailQueue = [];
        this.prototype._processingThumbnail = false;
    }
    // Returns all files that have been accepted
    getAcceptedFiles() {
        return this.files.filter((file)=>file.accepted
        ).map((file)=>file
        );
    }
    // Returns all files that have been rejected
    // Not sure when that's going to be useful, but added for completeness.
    getRejectedFiles() {
        return this.files.filter((file)=>!file.accepted
        ).map((file)=>file
        );
    }
    getFilesWithStatus(status) {
        return this.files.filter((file)=>file.status === status
        ).map((file)=>file
        );
    }
    // Returns all files that are in the queue
    getQueuedFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED);
    }
    getUploadingFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING);
    }
    getAddedFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED);
    }
    // Files that are either queued or uploading
    getActiveFiles() {
        return this.files.filter((file)=>file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING || file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED
        ).map((file)=>file
        );
    }
    // The function that gets called when Dropzone is initialized. You
    // can (and should) setup event listeners inside this function.
    init() {
        // In case it isn't set already
        if (this.element.tagName === "form") this.element.setAttribute("enctype", "multipart/form-data");
        if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) this.element.appendChild($3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<div class="dz-default dz-message"><button class="dz-button" type="button">${this.options.dictDefaultMessage}</button></div>`));
        if (this.clickableElements.length) {
            let setupHiddenFileInput = ()=>{
                if (this.hiddenFileInput) this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
                this.hiddenFileInput = document.createElement("input");
                this.hiddenFileInput.setAttribute("type", "file");
                if (this.options.maxFiles === null || this.options.maxFiles > 1) this.hiddenFileInput.setAttribute("multiple", "multiple");
                this.hiddenFileInput.className = "dz-hidden-input";
                if (this.options.acceptedFiles !== null) this.hiddenFileInput.setAttribute("accept", this.options.acceptedFiles);
                if (this.options.capture !== null) this.hiddenFileInput.setAttribute("capture", this.options.capture);
                // Making sure that no one can "tab" into this field.
                this.hiddenFileInput.setAttribute("tabindex", "-1");
                // Not setting `display="none"` because some browsers don't accept clicks
                // on elements that aren't displayed.
                this.hiddenFileInput.style.visibility = "hidden";
                this.hiddenFileInput.style.position = "absolute";
                this.hiddenFileInput.style.top = "0";
                this.hiddenFileInput.style.left = "0";
                this.hiddenFileInput.style.height = "0";
                this.hiddenFileInput.style.width = "0";
                $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement(this.options.hiddenInputContainer, "hiddenInputContainer").appendChild(this.hiddenFileInput);
                this.hiddenFileInput.addEventListener("change", ()=>{
                    let { files: files  } = this.hiddenFileInput;
                    if (files.length) for (let file of files)this.addFile(file);
                    this.emit("addedfiles", files);
                    setupHiddenFileInput();
                });
            };
            setupHiddenFileInput();
        }
        this.URL = window.URL !== null ? window.URL : window.webkitURL;
        // Setup all event listeners on the Dropzone object itself.
        // They're not in @setupEventListeners() because they shouldn't be removed
        // again when the dropzone gets disabled.
        for (let eventName of this.events)this.on(eventName, this.options[eventName]);
        this.on("uploadprogress", ()=>this.updateTotalUploadProgress()
        );
        this.on("removedfile", ()=>this.updateTotalUploadProgress()
        );
        this.on("canceled", (file)=>this.emit("complete", file)
        );
        // Emit a `queuecomplete` event if all files finished uploading.
        this.on("complete", (file)=>{
            if (this.getAddedFiles().length === 0 && this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) // This needs to be deferred so that `queuecomplete` really triggers after `complete`
            return setTimeout(()=>this.emit("queuecomplete")
            , 0);
        });
        const containsFiles = function(e) {
            if (e.dataTransfer.types) // Because e.dataTransfer.types is an Object in
            // IE, we need to iterate like this instead of
            // using e.dataTransfer.types.some()
            for(var i = 0; i < e.dataTransfer.types.length; i++){
                if (e.dataTransfer.types[i] === "Files") return true;
            }
            return false;
        };
        let noPropagation = function(e) {
            // If there are no files, we don't want to stop
            // propagation so we don't interfere with other
            // drag and drop behaviour.
            if (!containsFiles(e)) return;
            e.stopPropagation();
            if (e.preventDefault) return e.preventDefault();
            else return e.returnValue = false;
        };
        // Create the listeners
        this.listeners = [
            {
                element: this.element,
                events: {
                    dragstart: (e)=>{
                        return this.emit("dragstart", e);
                    },
                    dragenter: (e)=>{
                        noPropagation(e);
                        return this.emit("dragenter", e);
                    },
                    dragover: (e)=>{
                        // Makes it possible to drag files from chrome's download bar
                        // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
                        // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
                        let efct;
                        try {
                            efct = e.dataTransfer.effectAllowed;
                        } catch (error) {
                        }
                        e.dataTransfer.dropEffect = "move" === efct || "linkMove" === efct ? "move" : "copy";
                        noPropagation(e);
                        return this.emit("dragover", e);
                    },
                    dragleave: (e)=>{
                        return this.emit("dragleave", e);
                    },
                    drop: (e)=>{
                        noPropagation(e);
                        return this.drop(e);
                    },
                    dragend: (e)=>{
                        return this.emit("dragend", e);
                    }
                }
            },
        ];
        this.clickableElements.forEach((clickableElement)=>{
            return this.listeners.push({
                element: clickableElement,
                events: {
                    click: (evt)=>{
                        // Only the actual dropzone or the message element should trigger file selection
                        if (clickableElement !== this.element || evt.target === this.element || $3ed269f2f0fb224b$export$2e2bcd8739ae039.elementInside(evt.target, this.element.querySelector(".dz-message"))) this.hiddenFileInput.click(); // Forward the click
                        return true;
                    }
                }
            });
        });
        this.enable();
        return this.options.init.call(this);
    }
    // Not fully tested yet
    destroy() {
        this.disable();
        this.removeAllFiles(true);
        if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
            this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
            this.hiddenFileInput = null;
        }
        delete this.element.dropzone;
        return $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.splice($3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.indexOf(this), 1);
    }
    updateTotalUploadProgress() {
        let totalUploadProgress;
        let totalBytesSent = 0;
        let totalBytes = 0;
        let activeFiles = this.getActiveFiles();
        if (activeFiles.length) {
            for (let file of this.getActiveFiles()){
                totalBytesSent += file.upload.bytesSent;
                totalBytes += file.upload.total;
            }
            totalUploadProgress = 100 * totalBytesSent / totalBytes;
        } else totalUploadProgress = 100;
        return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    }
    // @options.paramName can be a function taking one parameter rather than a string.
    // A parameter name for a file is obtained simply by calling this with an index number.
    _getParamName(n) {
        if (typeof this.options.paramName === "function") return this.options.paramName(n);
        else return `${this.options.paramName}${this.options.uploadMultiple ? `[${n}]` : ""}`;
    }
    // If @options.renameFile is a function,
    // the function will be used to rename the file.name before appending it to the formData
    _renameFile(file) {
        if (typeof this.options.renameFile !== "function") return file.name;
        return this.options.renameFile(file);
    }
    // Returns a form that can be used as fallback if the browser does not support DragnDrop
    //
    // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
    // This code has to pass in IE7 :(
    getFallbackForm() {
        let existingFallback, form;
        if (existingFallback = this.getExistingFallback()) return existingFallback;
        let fieldsString = '<div class="dz-fallback">';
        if (this.options.dictFallbackText) fieldsString += `<p>${this.options.dictFallbackText}</p>`;
        fieldsString += `<input type="file" name="${this._getParamName(0)}" ${this.options.uploadMultiple ? 'multiple="multiple"' : undefined} /><input type="submit" value="Upload!"></div>`;
        let fields = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(fieldsString);
        if (this.element.tagName !== "FORM") {
            form = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<form action="${this.options.url}" enctype="multipart/form-data" method="${this.options.method}"></form>`);
            form.appendChild(fields);
        } else {
            // Make sure that the enctype and method attributes are set properly
            this.element.setAttribute("enctype", "multipart/form-data");
            this.element.setAttribute("method", this.options.method);
        }
        return form != null ? form : fields;
    }
    // Returns the fallback elements if they exist already
    //
    // This code has to pass in IE7 :(
    getExistingFallback() {
        let getFallback = function(elements) {
            for (let el of elements){
                if (/(^| )fallback($| )/.test(el.className)) return el;
            }
        };
        for (let tagName of [
            "div",
            "form"
        ]){
            var fallback;
            if (fallback = getFallback(this.element.getElementsByTagName(tagName))) return fallback;
        }
    }
    // Activates all listeners stored in @listeners
    setupEventListeners() {
        return this.listeners.map((elementListeners)=>(()=>{
                let result = [];
                for(let event in elementListeners.events){
                    let listener = elementListeners.events[event];
                    result.push(elementListeners.element.addEventListener(event, listener, false));
                }
                return result;
            })()
        );
    }
    // Deactivates all listeners stored in @listeners
    removeEventListeners() {
        return this.listeners.map((elementListeners)=>(()=>{
                let result = [];
                for(let event in elementListeners.events){
                    let listener = elementListeners.events[event];
                    result.push(elementListeners.element.removeEventListener(event, listener, false));
                }
                return result;
            })()
        );
    }
    // Removes all event listeners and cancels all files in the queue or being processed.
    disable() {
        this.clickableElements.forEach((element)=>element.classList.remove("dz-clickable")
        );
        this.removeEventListeners();
        this.disabled = true;
        return this.files.map((file)=>this.cancelUpload(file)
        );
    }
    enable() {
        delete this.disabled;
        this.clickableElements.forEach((element)=>element.classList.add("dz-clickable")
        );
        return this.setupEventListeners();
    }
    // Returns a nicely formatted filesize
    filesize(size) {
        let selectedSize = 0;
        let selectedUnit = "b";
        if (size > 0) {
            let units = [
                "tb",
                "gb",
                "mb",
                "kb",
                "b"
            ];
            for(let i = 0; i < units.length; i++){
                let unit = units[i];
                let cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
                if (size >= cutoff) {
                    selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
                    selectedUnit = unit;
                    break;
                }
            }
            selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
        }
        return `<strong>${selectedSize}</strong> ${this.options.dictFileSizeUnits[selectedUnit]}`;
    }
    // Adds or removes the `dz-max-files-reached` class from the form.
    _updateMaxFilesReachedClass() {
        if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
            if (this.getAcceptedFiles().length === this.options.maxFiles) this.emit("maxfilesreached", this.files);
            return this.element.classList.add("dz-max-files-reached");
        } else return this.element.classList.remove("dz-max-files-reached");
    }
    drop(e) {
        if (!e.dataTransfer) return;
        this.emit("drop", e);
        // Convert the FileList to an Array
        // This is necessary for IE11
        let files = [];
        for(let i = 0; i < e.dataTransfer.files.length; i++)files[i] = e.dataTransfer.files[i];
        // Even if it's a folder, files.length will contain the folders.
        if (files.length) {
            let { items: items  } = e.dataTransfer;
            if (items && items.length && items[0].webkitGetAsEntry != null) // The browser supports dropping of folders, so handle items instead of files
            this._addFilesFromItems(items);
            else this.handleFiles(files);
        }
        this.emit("addedfiles", files);
    }
    paste(e) {
        if ($3ed269f2f0fb224b$var$__guard__(e != null ? e.clipboardData : undefined, (x)=>x.items
        ) == null) return;
        this.emit("paste", e);
        let { items: items  } = e.clipboardData;
        if (items.length) return this._addFilesFromItems(items);
    }
    handleFiles(files) {
        for (let file of files)this.addFile(file);
    }
    // When a folder is dropped (or files are pasted), items must be handled
    // instead of files.
    _addFilesFromItems(items) {
        return (()=>{
            let result = [];
            for (let item of items){
                var entry;
                if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
                    if (entry.isFile) result.push(this.addFile(item.getAsFile()));
                    else if (entry.isDirectory) // Append all files from that directory to files
                    result.push(this._addFilesFromDirectory(entry, entry.name));
                    else result.push(undefined);
                } else if (item.getAsFile != null) {
                    if (item.kind == null || item.kind === "file") result.push(this.addFile(item.getAsFile()));
                    else result.push(undefined);
                } else result.push(undefined);
            }
            return result;
        })();
    }
    // Goes through the directory, and adds each file it finds recursively
    _addFilesFromDirectory(directory, path) {
        let dirReader = directory.createReader();
        let errorHandler = (error)=>$3ed269f2f0fb224b$var$__guardMethod__(console, "log", (o)=>o.log(error)
            )
        ;
        var readEntries = ()=>{
            return dirReader.readEntries((entries)=>{
                if (entries.length > 0) {
                    for (let entry of entries){
                        if (entry.isFile) entry.file((file)=>{
                            if (this.options.ignoreHiddenFiles && file.name.substring(0, 1) === ".") return;
                            file.fullPath = `${path}/${file.name}`;
                            return this.addFile(file);
                        });
                        else if (entry.isDirectory) this._addFilesFromDirectory(entry, `${path}/${entry.name}`);
                    }
                    // Recursively call readEntries() again, since browser only handle
                    // the first 100 entries.
                    // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
                    readEntries();
                }
                return null;
            }, errorHandler);
        };
        return readEntries();
    }
    // If `done()` is called without argument the file is accepted
    // If you call it with an error message, the file is rejected
    // (This allows for asynchronous validation)
    //
    // This function checks the filesize, and if the file.type passes the
    // `acceptedFiles` check.
    accept(file, done) {
        if (this.options.maxFilesize && file.size > this.options.maxFilesize * 1048576) done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
        else if (!$3ed269f2f0fb224b$export$2e2bcd8739ae039.isValidFile(file, this.options.acceptedFiles)) done(this.options.dictInvalidFileType);
        else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
            done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
            this.emit("maxfilesexceeded", file);
        } else this.options.accept.call(this, file, done);
    }
    addFile(file) {
        file.upload = {
            uuid: $3ed269f2f0fb224b$export$2e2bcd8739ae039.uuidv4(),
            progress: 0,
            // Setting the total upload size to file.size for the beginning
            // It's actual different than the size to be transmitted.
            total: file.size,
            bytesSent: 0,
            filename: this._renameFile(file)
        };
        this.files.push(file);
        file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED;
        this.emit("addedfile", file);
        this._enqueueThumbnail(file);
        this.accept(file, (error)=>{
            if (error) {
                file.accepted = false;
                this._errorProcessing([
                    file
                ], error); // Will set the file.status
            } else {
                file.accepted = true;
                if (this.options.autoQueue) this.enqueueFile(file);
                 // Will set .accepted = true
            }
            this._updateMaxFilesReachedClass();
        });
    }
    // Wrapper for enqueueFile
    enqueueFiles(files) {
        for (let file of files)this.enqueueFile(file);
        return null;
    }
    enqueueFile(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED && file.accepted === true) {
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED;
            if (this.options.autoProcessQueue) return setTimeout(()=>this.processQueue()
            , 0); // Deferring the call
        } else throw new Error("This file can't be queued because it has already been processed or was rejected.");
    }
    _enqueueThumbnail(file) {
        if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1048576) {
            this._thumbnailQueue.push(file);
            return setTimeout(()=>this._processThumbnailQueue()
            , 0); // Deferring the call
        }
    }
    _processThumbnailQueue() {
        if (this._processingThumbnail || this._thumbnailQueue.length === 0) return;
        this._processingThumbnail = true;
        let file = this._thumbnailQueue.shift();
        return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, (dataUrl)=>{
            this.emit("thumbnail", file, dataUrl);
            this._processingThumbnail = false;
            return this._processThumbnailQueue();
        });
    }
    // Can be called by the user to remove a file
    removeFile(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) this.cancelUpload(file);
        this.files = $3ed269f2f0fb224b$var$without(this.files, file);
        this.emit("removedfile", file);
        if (this.files.length === 0) return this.emit("reset");
    }
    // Removes all files that aren't currently processed from the list
    removeAllFiles(cancelIfNecessary) {
        // Create a copy of files since removeFile() changes the @files array.
        if (cancelIfNecessary == null) cancelIfNecessary = false;
        for (let file of this.files.slice())if (file.status !== $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING || cancelIfNecessary) this.removeFile(file);
        return null;
    }
    // Resizes an image before it gets sent to the server. This function is the default behavior of
    // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
    // the resized blob.
    resizeImage(file, width, height, resizeMethod, callback) {
        return this.createThumbnail(file, width, height, resizeMethod, true, (dataUrl, canvas)=>{
            if (canvas == null) // The image has not been resized
            return callback(file);
            else {
                let { resizeMimeType: resizeMimeType  } = this.options;
                if (resizeMimeType == null) resizeMimeType = file.type;
                let resizedDataURL = canvas.toDataURL(resizeMimeType, this.options.resizeQuality);
                if (resizeMimeType === "image/jpeg" || resizeMimeType === "image/jpg") // Now add the original EXIF information
                resizedDataURL = $3ed269f2f0fb224b$var$ExifRestore.restore(file.dataURL, resizedDataURL);
                return callback($3ed269f2f0fb224b$export$2e2bcd8739ae039.dataURItoBlob(resizedDataURL));
            }
        });
    }
    createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
        let fileReader = new FileReader();
        fileReader.onload = ()=>{
            file.dataURL = fileReader.result;
            // Don't bother creating a thumbnail for SVG images since they're vector
            if (file.type === "image/svg+xml") {
                if (callback != null) callback(fileReader.result);
                return;
            }
            this.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
        };
        fileReader.readAsDataURL(file);
    }
    // `mockFile` needs to have these attributes:
    //
    //     { name: 'name', size: 12345, imageUrl: '' }
    //
    // `callback` will be invoked when the image has been downloaded and displayed.
    // `crossOrigin` will be added to the `img` tag when accessing the file.
    displayExistingFile(mockFile, imageUrl, callback, crossOrigin, resizeThumbnail = true) {
        this.emit("addedfile", mockFile);
        this.emit("complete", mockFile);
        if (!resizeThumbnail) {
            this.emit("thumbnail", mockFile, imageUrl);
            if (callback) callback();
        } else {
            let onDone = (thumbnail)=>{
                this.emit("thumbnail", mockFile, thumbnail);
                if (callback) callback();
            };
            mockFile.dataURL = imageUrl;
            this.createThumbnailFromUrl(mockFile, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, this.options.fixOrientation, onDone, crossOrigin);
        }
    }
    createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
        // Not using `new Image` here because of a bug in latest Chrome versions.
        // See https://github.com/enyo/dropzone/pull/226
        let img = document.createElement("img");
        if (crossOrigin) img.crossOrigin = crossOrigin;
        // fixOrientation is not needed anymore with browsers handling imageOrientation
        fixOrientation = getComputedStyle(document.body)["imageOrientation"] == "from-image" ? false : fixOrientation;
        img.onload = ()=>{
            let loadExif = (callback)=>callback(1)
            ;
            if (typeof EXIF !== "undefined" && EXIF !== null && fixOrientation) loadExif = (callback)=>EXIF.getData(img, function() {
                    return callback(EXIF.getTag(this, "Orientation"));
                })
            ;
            return loadExif((orientation)=>{
                file.width = img.width;
                file.height = img.height;
                let resizeInfo = this.options.resize.call(this, file, width, height, resizeMethod);
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = resizeInfo.trgWidth;
                canvas.height = resizeInfo.trgHeight;
                if (orientation > 4) {
                    canvas.width = resizeInfo.trgHeight;
                    canvas.height = resizeInfo.trgWidth;
                }
                switch(orientation){
                    case 2:
                        // horizontal flip
                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1);
                        break;
                    case 3:
                        // 180° rotate left
                        ctx.translate(canvas.width, canvas.height);
                        ctx.rotate(Math.PI);
                        break;
                    case 4:
                        // vertical flip
                        ctx.translate(0, canvas.height);
                        ctx.scale(1, -1);
                        break;
                    case 5:
                        // vertical flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.scale(1, -1);
                        break;
                    case 6:
                        // 90° rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -canvas.width);
                        break;
                    case 7:
                        // horizontal flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(canvas.height, -canvas.width);
                        ctx.scale(-1, 1);
                        break;
                    case 8:
                        // 90° rotate left
                        ctx.rotate(-0.5 * Math.PI);
                        ctx.translate(-canvas.height, 0);
                        break;
                }
                // This is a bugfix for iOS' scaling bug.
                $3ed269f2f0fb224b$var$drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
                let thumbnail = canvas.toDataURL("image/png");
                if (callback != null) return callback(thumbnail, canvas);
            });
        };
        if (callback != null) img.onerror = callback;
        return img.src = file.dataURL;
    }
    // Goes through the queue and processes files if there aren't too many already.
    processQueue() {
        let { parallelUploads: parallelUploads  } = this.options;
        let processingLength = this.getUploadingFiles().length;
        let i = processingLength;
        // There are already at least as many files uploading than should be
        if (processingLength >= parallelUploads) return;
        let queuedFiles = this.getQueuedFiles();
        if (!(queuedFiles.length > 0)) return;
        if (this.options.uploadMultiple) // The files should be uploaded in one request
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
        else while(i < parallelUploads){
            if (!queuedFiles.length) return;
             // Nothing left to process
            this.processFile(queuedFiles.shift());
            i++;
        }
    }
    // Wrapper for `processFiles`
    processFile(file) {
        return this.processFiles([
            file
        ]);
    }
    // Loads the file, then calls finishedLoading()
    processFiles(files) {
        for (let file of files){
            file.processing = true; // Backwards compatibility
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING;
            this.emit("processing", file);
        }
        if (this.options.uploadMultiple) this.emit("processingmultiple", files);
        return this.uploadFiles(files);
    }
    _getFilesWithXhr(xhr) {
        let files;
        return files = this.files.filter((file)=>file.xhr === xhr
        ).map((file)=>file
        );
    }
    // Cancels the file upload and sets the status to CANCELED
    // **if** the file is actually being uploaded.
    // If it's still in the queue, the file is being removed from it and the status
    // set to CANCELED.
    cancelUpload(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) {
            let groupedFiles = this._getFilesWithXhr(file.xhr);
            for (let groupedFile of groupedFiles)groupedFile.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED;
            if (typeof file.xhr !== "undefined") file.xhr.abort();
            for (let groupedFile1 of groupedFiles)this.emit("canceled", groupedFile1);
            if (this.options.uploadMultiple) this.emit("canceledmultiple", groupedFiles);
        } else if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED || file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED) {
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED;
            this.emit("canceled", file);
            if (this.options.uploadMultiple) this.emit("canceledmultiple", [
                file
            ]);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    resolveOption(option, ...args) {
        if (typeof option === "function") return option.apply(this, args);
        return option;
    }
    uploadFile(file) {
        return this.uploadFiles([
            file
        ]);
    }
    uploadFiles(files) {
        this._transformFiles(files, (transformedFiles)=>{
            if (this.options.chunking) {
                // Chunking is not allowed to be used with `uploadMultiple` so we know
                // that there is only __one__file.
                let transformedFile = transformedFiles[0];
                files[0].upload.chunked = this.options.chunking && (this.options.forceChunking || transformedFile.size > this.options.chunkSize);
                files[0].upload.totalChunkCount = Math.ceil(transformedFile.size / this.options.chunkSize);
            }
            if (files[0].upload.chunked) {
                // This file should be sent in chunks!
                // If the chunking option is set, we **know** that there can only be **one** file, since
                // uploadMultiple is not allowed with this option.
                let file = files[0];
                let transformedFile = transformedFiles[0];
                let startedChunkCount = 0;
                file.upload.chunks = [];
                let handleNextChunk = ()=>{
                    let chunkIndex = 0;
                    // Find the next item in file.upload.chunks that is not defined yet.
                    while(file.upload.chunks[chunkIndex] !== undefined)chunkIndex++;
                    // This means, that all chunks have already been started.
                    if (chunkIndex >= file.upload.totalChunkCount) return;
                    startedChunkCount++;
                    let start = chunkIndex * this.options.chunkSize;
                    let end = Math.min(start + this.options.chunkSize, transformedFile.size);
                    let dataBlock = {
                        name: this._getParamName(0),
                        data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),
                        filename: file.upload.filename,
                        chunkIndex: chunkIndex
                    };
                    file.upload.chunks[chunkIndex] = {
                        file: file,
                        index: chunkIndex,
                        dataBlock: dataBlock,
                        status: $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING,
                        progress: 0,
                        retries: 0
                    };
                    this._uploadData(files, [
                        dataBlock
                    ]);
                };
                file.upload.finishedChunkUpload = (chunk, response)=>{
                    let allFinished = true;
                    chunk.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS;
                    // Clear the data from the chunk
                    chunk.dataBlock = null;
                    chunk.response = chunk.xhr.responseText;
                    chunk.responseHeaders = chunk.xhr.getAllResponseHeaders();
                    // Leaving this reference to xhr will cause memory leaks.
                    chunk.xhr = null;
                    for(let i = 0; i < file.upload.totalChunkCount; i++){
                        if (file.upload.chunks[i] === undefined) return handleNextChunk();
                        if (file.upload.chunks[i].status !== $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS) allFinished = false;
                    }
                    if (allFinished) this.options.chunksUploaded(file, ()=>{
                        this._finished(files, response, null);
                    });
                };
                if (this.options.parallelChunkUploads) for(let i = 0; i < file.upload.totalChunkCount; i++)handleNextChunk();
                else handleNextChunk();
            } else {
                let dataBlocks = [];
                for(let i = 0; i < files.length; i++)dataBlocks[i] = {
                    name: this._getParamName(i),
                    data: transformedFiles[i],
                    filename: files[i].upload.filename
                };
                this._uploadData(files, dataBlocks);
            }
        });
    }
    /// Returns the right chunk for given file and xhr
    _getChunk(file, xhr) {
        for(let i = 0; i < file.upload.totalChunkCount; i++){
            if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) return file.upload.chunks[i];
        }
    }
    // This function actually uploads the file(s) to the server.
    //
    //  If dataBlocks contains the actual data to upload (meaning, that this could
    // either be transformed files, or individual chunks for chunked upload) then
    // they will be used for the actual data to upload.
    _uploadData(files, dataBlocks) {
        let xhr = new XMLHttpRequest();
        // Put the xhr object in the file objects to be able to reference it later.
        for (let file of files)file.xhr = xhr;
        if (files[0].upload.chunked) // Put the xhr object in the right chunk object, so it can be associated
        // later, and found with _getChunk.
        files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
        let method = this.resolveOption(this.options.method, files, dataBlocks);
        let url = this.resolveOption(this.options.url, files, dataBlocks);
        xhr.open(method, url, true);
        // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
        let timeout = this.resolveOption(this.options.timeout, files);
        if (timeout) xhr.timeout = this.resolveOption(this.options.timeout, files);
        // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
        xhr.withCredentials = !!this.options.withCredentials;
        xhr.onload = (e)=>{
            this._finishedUploading(files, xhr, e);
        };
        xhr.ontimeout = ()=>{
            this._handleUploadError(files, xhr, `Request timedout after ${this.options.timeout / 1000} seconds`);
        };
        xhr.onerror = ()=>{
            this._handleUploadError(files, xhr);
        };
        // Some browsers do not have the .upload property
        let progressObj = xhr.upload != null ? xhr.upload : xhr;
        progressObj.onprogress = (e)=>this._updateFilesUploadProgress(files, xhr, e)
        ;
        let headers = this.options.defaultHeaders ? {
            Accept: "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        } : {
        };
        if (this.options.binaryBody) headers["Content-Type"] = files[0].type;
        if (this.options.headers) objectExtend(headers, this.options.headers);
        for(let headerName in headers){
            let headerValue = headers[headerName];
            if (headerValue) xhr.setRequestHeader(headerName, headerValue);
        }
        if (this.options.binaryBody) {
            // Since the file is going to be sent as binary body, it doesn't make
            // any sense to generate `FormData` for it.
            for (let file of files)this.emit("sending", file, xhr);
            if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr);
            this.submitRequest(xhr, null, files);
        } else {
            let formData = new FormData();
            // Adding all @options parameters
            if (this.options.params) {
                let additionalParams = this.options.params;
                if (typeof additionalParams === "function") additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
                for(let key in additionalParams){
                    let value = additionalParams[key];
                    if (Array.isArray(value)) // The additional parameter contains an array,
                    // so lets iterate over it to attach each value
                    // individually.
                    for(let i = 0; i < value.length; i++)formData.append(key, value[i]);
                    else formData.append(key, value);
                }
            }
            // Let the user add additional data if necessary
            for (let file of files)this.emit("sending", file, xhr, formData);
            if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr, formData);
            this._addFormElementData(formData);
            // Finally add the files
            // Has to be last because some servers (eg: S3) expect the file to be the last parameter
            for(let i = 0; i < dataBlocks.length; i++){
                let dataBlock = dataBlocks[i];
                formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
            }
            this.submitRequest(xhr, formData, files);
        }
    }
    // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.
    _transformFiles(files, done) {
        let transformedFiles = [];
        // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
        let doneCounter = 0;
        for(let i = 0; i < files.length; i++)this.options.transformFile.call(this, files[i], (transformedFile)=>{
            transformedFiles[i] = transformedFile;
            if (++doneCounter === files.length) done(transformedFiles);
        });
    }
    // Takes care of adding other input elements of the form to the AJAX request
    _addFormElementData(formData) {
        // Take care of other input elements
        if (this.element.tagName === "FORM") for (let input of this.element.querySelectorAll("input, textarea, select, button")){
            let inputName = input.getAttribute("name");
            let inputType = input.getAttribute("type");
            if (inputType) inputType = inputType.toLowerCase();
            // If the input doesn't have a name, we can't use it.
            if (typeof inputName === "undefined" || inputName === null) continue;
            if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
                // Possibly multiple values
                for (let option of input.options)if (option.selected) formData.append(inputName, option.value);
            } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) formData.append(inputName, input.value);
        }
    }
    // Invoked when there is new progress information about given files.
    // If e is not provided, it is assumed that the upload is finished.
    _updateFilesUploadProgress(files, xhr, e) {
        if (!files[0].upload.chunked) // Handle file uploads without chunking
        for (let file of files){
            if (file.upload.total && file.upload.bytesSent && file.upload.bytesSent == file.upload.total) continue;
            if (e) {
                file.upload.progress = 100 * e.loaded / e.total;
                file.upload.total = e.total;
                file.upload.bytesSent = e.loaded;
            } else {
                // No event, so we're at 100%
                file.upload.progress = 100;
                file.upload.bytesSent = file.upload.total;
            }
            this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
        }
        else {
            // Handle chunked file uploads
            // Chunked upload is not compatible with uploading multiple files in one
            // request, so we know there's only one file.
            let file = files[0];
            // Since this is a chunked upload, we need to update the appropriate chunk
            // progress.
            let chunk = this._getChunk(file, xhr);
            if (e) {
                chunk.progress = 100 * e.loaded / e.total;
                chunk.total = e.total;
                chunk.bytesSent = e.loaded;
            } else {
                // No event, so we're at 100%
                chunk.progress = 100;
                chunk.bytesSent = chunk.total;
            }
            // Now tally the *file* upload progress from its individual chunks
            file.upload.progress = 0;
            file.upload.total = 0;
            file.upload.bytesSent = 0;
            for(let i = 0; i < file.upload.totalChunkCount; i++)if (file.upload.chunks[i] && typeof file.upload.chunks[i].progress !== "undefined") {
                file.upload.progress += file.upload.chunks[i].progress;
                file.upload.total += file.upload.chunks[i].total;
                file.upload.bytesSent += file.upload.chunks[i].bytesSent;
            }
            // Since the process is a percentage, we need to divide by the amount of
            // chunks we've used.
            file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
            this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
        }
    }
    _finishedUploading(files, xhr, e) {
        let response;
        if (files[0].status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED) return;
        if (xhr.readyState !== 4) return;
        if (xhr.responseType !== "arraybuffer" && xhr.responseType !== "blob") {
            response = xhr.responseText;
            if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) try {
                response = JSON.parse(response);
            } catch (error) {
                e = error;
                response = "Invalid JSON response from server.";
            }
        }
        this._updateFilesUploadProgress(files, xhr);
        if (!(200 <= xhr.status && xhr.status < 300)) this._handleUploadError(files, xhr, response);
        else if (files[0].upload.chunked) files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr), response);
        else this._finished(files, response, e);
    }
    _handleUploadError(files, xhr, response) {
        if (files[0].status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED) return;
        if (files[0].upload.chunked && this.options.retryChunks) {
            let chunk = this._getChunk(files[0], xhr);
            if ((chunk.retries++) < this.options.retryChunksLimit) {
                this._uploadData(files, [
                    chunk.dataBlock
                ]);
                return;
            } else console.warn("Retried this chunk too often. Giving up.");
        }
        this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
    }
    submitRequest(xhr, formData, files) {
        if (xhr.readyState != 1) {
            console.warn("Cannot send this request because the XMLHttpRequest.readyState is not OPENED.");
            return;
        }
        if (this.options.binaryBody) {
            if (files[0].upload.chunked) {
                const chunk = this._getChunk(files[0], xhr);
                xhr.send(chunk.dataBlock.data);
            } else xhr.send(files[0]);
        } else xhr.send(formData);
    }
    // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.
    _finished(files, responseText, e) {
        for (let file of files){
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS;
            this.emit("success", file, responseText, e);
            this.emit("complete", file);
        }
        if (this.options.uploadMultiple) {
            this.emit("successmultiple", files, responseText, e);
            this.emit("completemultiple", files);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.
    _errorProcessing(files, message, xhr) {
        for (let file of files){
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.ERROR;
            this.emit("error", file, message, xhr);
            this.emit("complete", file);
        }
        if (this.options.uploadMultiple) {
            this.emit("errormultiple", files, message, xhr);
            this.emit("completemultiple", files);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    static uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
            return v.toString(16);
        });
    }
    constructor(el, options){
        super();
        let fallback, left;
        this.element = el;
        this.clickableElements = [];
        this.listeners = [];
        this.files = []; // All files
        if (typeof this.element === "string") this.element = document.querySelector(this.element);
        // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
        if (!this.element || this.element.nodeType == null) throw new Error("Invalid dropzone element.");
        if (this.element.dropzone) throw new Error("Dropzone already attached.");
        // Now add this dropzone to the instances.
        $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.push(this);
        // Put the dropzone inside the element itself.
        this.element.dropzone = this;
        let elementOptions = (left = $3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement(this.element)) != null ? left : {
        };
        this.options = objectExtend(true, {
        }, $4ca367182776f80b$export$2e2bcd8739ae039, elementOptions, options != null ? options : {
        });
        this.options.previewTemplate = this.options.previewTemplate.replace(/\n*/g, "");
        // If the browser failed, just call the fallback and leave
        if (this.options.forceFallback || !$3ed269f2f0fb224b$export$2e2bcd8739ae039.isBrowserSupported()) return this.options.fallback.call(this);
        // @options.url = @element.getAttribute "action" unless @options.url?
        if (this.options.url == null) this.options.url = this.element.getAttribute("action");
        if (!this.options.url) throw new Error("No URL provided.");
        if (this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
        if (this.options.uploadMultiple && this.options.chunking) throw new Error("You cannot set both: uploadMultiple and chunking.");
        if (this.options.binaryBody && this.options.uploadMultiple) throw new Error("You cannot set both: binaryBody and uploadMultiple.");
        // Backwards compatibility
        if (this.options.acceptedMimeTypes) {
            this.options.acceptedFiles = this.options.acceptedMimeTypes;
            delete this.options.acceptedMimeTypes;
        }
        // Backwards compatibility
        if (this.options.renameFilename != null) this.options.renameFile = (file)=>this.options.renameFilename.call(this, file.name, file)
        ;
        if (typeof this.options.method === "string") this.options.method = this.options.method.toUpperCase();
        if ((fallback = this.getExistingFallback()) && fallback.parentNode) // Remove the fallback
        fallback.parentNode.removeChild(fallback);
        // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
        if (this.options.previewsContainer !== false) {
            if (this.options.previewsContainer) this.previewsContainer = $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement(this.options.previewsContainer, "previewsContainer");
            else this.previewsContainer = this.element;
        }
        if (this.options.clickable) {
            if (this.options.clickable === true) this.clickableElements = [
                this.element
            ];
            else this.clickableElements = $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElements(this.options.clickable, "clickable");
        }
        this.init();
    }
}
$3ed269f2f0fb224b$export$2e2bcd8739ae039.initClass();
// This is a map of options for your different dropzones. Add configurations
// to this object for your different dropzone elemens.
//
// Example:
//
//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
//
// And in html:
//
//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
$3ed269f2f0fb224b$export$2e2bcd8739ae039.options = {
};
// Returns the options for an element or undefined if none available.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement = function(element) {
    // Get the `Dropzone.options.elementId` for this element if it exists
    if (element.getAttribute("id")) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.options[$3ed269f2f0fb224b$var$camelize(element.getAttribute("id"))];
    else return undefined;
};
// Holds a list of all dropzone instances
$3ed269f2f0fb224b$export$2e2bcd8739ae039.instances = [];
// Returns the dropzone for given element if any
$3ed269f2f0fb224b$export$2e2bcd8739ae039.forElement = function(element) {
    if (typeof element === "string") element = document.querySelector(element);
    if ((element != null ? element.dropzone : undefined) == null) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    return element.dropzone;
};
// Looks for all .dropzone elements and creates a dropzone for them
$3ed269f2f0fb224b$export$2e2bcd8739ae039.discover = function() {
    let dropzones;
    if (document.querySelectorAll) dropzones = document.querySelectorAll(".dropzone");
    else {
        dropzones = [];
        // IE :(
        let checkElements = (elements)=>(()=>{
                let result = [];
                for (let el of elements)if (/(^| )dropzone($| )/.test(el.className)) result.push(dropzones.push(el));
                else result.push(undefined);
                return result;
            })()
        ;
        checkElements(document.getElementsByTagName("div"));
        checkElements(document.getElementsByTagName("form"));
    }
    return (()=>{
        let result = [];
        for (let dropzone of dropzones)// Create a dropzone unless auto discover has been disabled for specific element
        if ($3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement(dropzone) !== false) result.push(new $3ed269f2f0fb224b$export$2e2bcd8739ae039(dropzone));
        else result.push(undefined);
        return result;
    })();
};
// Some browsers support drag and drog functionality, but not correctly.
//
// So I created a blocklist of userAgents. Yes, yes. Browser sniffing, I know.
// But what to do when browsers *theoretically* support an API, but crash
// when using it.
//
// This is a list of regular expressions tested against navigator.userAgent
//
// ** It should only be used on browser that *do* support the API, but
// incorrectly **
$3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers = [
    // The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
    /opera.*(Macintosh|Windows Phone).*version\/12/i,
];
// Checks if the browser is supported
$3ed269f2f0fb224b$export$2e2bcd8739ae039.isBrowserSupported = function() {
    let capableBrowser = true;
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
        if (!("classList" in document.createElement("a"))) capableBrowser = false;
        else {
            if ($3ed269f2f0fb224b$export$2e2bcd8739ae039.blacklistedBrowsers !== undefined) // Since this has been renamed, this makes sure we don't break older
            // configuration.
            $3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers = $3ed269f2f0fb224b$export$2e2bcd8739ae039.blacklistedBrowsers;
            // The browser supports the API, but may be blocked.
            for (let regex of $3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers)if (regex.test(navigator.userAgent)) {
                capableBrowser = false;
                continue;
            }
        }
    } else capableBrowser = false;
    return capableBrowser;
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.dataURItoBlob = function(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(",")[1]);
    // separate out the mime component
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for(let i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--)ia[i] = byteString.charCodeAt(i);
    // write the ArrayBuffer to a blob
    return new Blob([
        ab
    ], {
        type: mimeString
    });
};
// Returns an array without the rejected item
const $3ed269f2f0fb224b$var$without = (list, rejectedItem)=>list.filter((item)=>item !== rejectedItem
    ).map((item)=>item
    )
;
// abc-def_ghi -> abcDefGhi
const $3ed269f2f0fb224b$var$camelize = (str)=>str.replace(/[\-_](\w)/g, (match)=>match.charAt(1).toUpperCase()
    )
;
// Creates an element from string
$3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement = function(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
};
// Tests if given element is inside (or simply is) the container
$3ed269f2f0fb224b$export$2e2bcd8739ae039.elementInside = function(element, container) {
    if (element === container) return true;
     // Coffeescript doesn't support do/while loops
    while(element = element.parentNode){
        if (element === container) return true;
    }
    return false;
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement = function(el, name) {
    let element;
    if (typeof el === "string") element = document.querySelector(el);
    else if (el.nodeType != null) element = el;
    if (element == null) throw new Error(`Invalid \`${name}\` option provided. Please provide a CSS selector or a plain HTML element.`);
    return element;
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.getElements = function(els, name) {
    let el, elements;
    if (els instanceof Array) {
        elements = [];
        try {
            for (el of els)elements.push(this.getElement(el, name));
        } catch (e) {
            elements = null;
        }
    } else if (typeof els === "string") {
        elements = [];
        for (el of document.querySelectorAll(els))elements.push(el);
    } else if (els.nodeType != null) elements = [
        els
    ];
    if (elements == null || !elements.length) throw new Error(`Invalid \`${name}\` option provided. Please provide a CSS selector, a plain HTML element or a list of those.`);
    return elements;
};
// Asks the user the question and calls accepted or rejected accordingly
//
// The default implementation just uses `window.confirm` and then calls the
// appropriate callback.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) return accepted();
    else if (rejected != null) return rejected();
};
// Validates the mime type like this:
//
// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
$3ed269f2f0fb224b$export$2e2bcd8739ae039.isValidFile = function(file, acceptedFiles) {
    if (!acceptedFiles) return true;
     // If there are no accepted mime types, it's OK
    acceptedFiles = acceptedFiles.split(",");
    let mimeType = file.type;
    let baseMimeType = mimeType.replace(/\/.*$/, "");
    for (let validType of acceptedFiles){
        validType = validType.trim();
        if (validType.charAt(0) === ".") {
            if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) return true;
        } else if (/\/\*$/.test(validType)) {
            // This is something like a image/* mime type
            if (baseMimeType === validType.replace(/\/.*$/, "")) return true;
        } else {
            if (mimeType === validType) return true;
        }
    }
    return false;
};
// Augment jQuery
if (typeof jQuery !== "undefined" && jQuery !== null) jQuery.fn.dropzone = function(options) {
    return this.each(function() {
        return new $3ed269f2f0fb224b$export$2e2bcd8739ae039(this, options);
    });
};
// Dropzone file status codes
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED = "added";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED = "queued";
// For backwards compatibility. Now, if a file is accepted, it's either queued
// or uploading.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ACCEPTED = $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED;
$3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING = "uploading";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.PROCESSING = $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING; // alias
$3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED = "canceled";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ERROR = "error";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS = "success";
/*

 Bugfix for iOS 6 and 7
 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 based on the work of https://github.com/stomita/ios-imagefile-megapixel

 */ // Detecting vertical squash in loaded image.
// Fixes a bug which squash image vertically while drawing into canvas for some images.
// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
let $3ed269f2f0fb224b$var$detectVerticalSquash = function(img) {
    let iw = img.naturalWidth;
    let ih = img.naturalHeight;
    let canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let { data: data  } = ctx.getImageData(1, 0, 1, ih);
    // search image edge pixel position in case it is squashed vertically.
    let sy = 0;
    let ey = ih;
    let py = ih;
    while(py > sy){
        let alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) ey = py;
        else sy = py;
        py = ey + sy >> 1;
    }
    let ratio = py / ih;
    if (ratio === 0) return 1;
    else return ratio;
};
// A replacement for context.drawImage
// (args are for source and destination).
var $3ed269f2f0fb224b$var$drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    let vertSquashRatio = $3ed269f2f0fb224b$var$detectVerticalSquash(img);
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
};
// Based on MinifyJpeg
// Source: http://www.perry.cz/files/ExifRestorer.js
// http://elicon.blog57.fc2.com/blog-entry-206.html
class $3ed269f2f0fb224b$var$ExifRestore {
    static initClass() {
        this.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }
    static encode64(input) {
        let output = "";
        let chr1 = undefined;
        let chr2 = undefined;
        let chr3 = "";
        let enc1 = undefined;
        let enc2 = undefined;
        let enc3 = undefined;
        let enc4 = "";
        let i = 0;
        while(true){
            chr1 = input[i++];
            chr2 = input[i++];
            chr3 = input[i++];
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;
            if (isNaN(chr2)) enc3 = enc4 = 64;
            else if (isNaN(chr3)) enc4 = 64;
            output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
            if (!(i < input.length)) break;
        }
        return output;
    }
    static restore(origFileBase64, resizedFileBase64) {
        if (!origFileBase64.match("data:image/jpeg;base64,")) return resizedFileBase64;
        let rawImage = this.decode64(origFileBase64.replace("data:image/jpeg;base64,", ""));
        let segments = this.slice2Segments(rawImage);
        let image = this.exifManipulation(resizedFileBase64, segments);
        return `data:image/jpeg;base64,${this.encode64(image)}`;
    }
    static exifManipulation(resizedFileBase64, segments) {
        let exifArray = this.getExifArray(segments);
        let newImageArray = this.insertExif(resizedFileBase64, exifArray);
        let aBuffer = new Uint8Array(newImageArray);
        return aBuffer;
    }
    static getExifArray(segments) {
        let seg = undefined;
        let x = 0;
        while(x < segments.length){
            seg = segments[x];
            if (seg[0] === 255 & seg[1] === 225) return seg;
            x++;
        }
        return [];
    }
    static insertExif(resizedFileBase64, exifArray) {
        let imageData = resizedFileBase64.replace("data:image/jpeg;base64,", "");
        let buf = this.decode64(imageData);
        let separatePoint = buf.indexOf(255, 3);
        let mae = buf.slice(0, separatePoint);
        let ato = buf.slice(separatePoint);
        let array = mae;
        array = array.concat(exifArray);
        array = array.concat(ato);
        return array;
    }
    static slice2Segments(rawImageArray) {
        let head = 0;
        let segments = [];
        while(true){
            var length;
            if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) break;
            if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) head += 2;
            else {
                length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
                let endPoint = head + length + 2;
                let seg = rawImageArray.slice(head, endPoint);
                segments.push(seg);
                head = endPoint;
            }
            if (head > rawImageArray.length) break;
        }
        return segments;
    }
    static decode64(input) {
        let output = "";
        let chr1 = undefined;
        let chr2 = undefined;
        let chr3 = "";
        let enc1 = undefined;
        let enc2 = undefined;
        let enc3 = undefined;
        let enc4 = "";
        let i = 0;
        let buf = [];
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        let base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding.");
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while(true){
            enc1 = this.KEY_STR.indexOf(input.charAt(i++));
            enc2 = this.KEY_STR.indexOf(input.charAt(i++));
            enc3 = this.KEY_STR.indexOf(input.charAt(i++));
            enc4 = this.KEY_STR.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            buf.push(chr1);
            if (enc3 !== 64) buf.push(chr2);
            if (enc4 !== 64) buf.push(chr3);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
            if (!(i < input.length)) break;
        }
        return buf;
    }
}
$3ed269f2f0fb224b$var$ExifRestore.initClass();
/*
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 */ // @win window reference
// @fn function reference
let $3ed269f2f0fb224b$var$contentLoaded = function(win, fn) {
    let done = false;
    let top = true;
    let doc = win.document;
    let root = doc.documentElement;
    let add = doc.addEventListener ? "addEventListener" : "attachEvent";
    let rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
    let pre = doc.addEventListener ? "" : "on";
    var init = function(e) {
        if (e.type === "readystatechange" && doc.readyState !== "complete") return;
        (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) return fn.call(win, e.type || e);
    };
    var poll = function() {
        try {
            root.doScroll("left");
        } catch (e) {
            setTimeout(poll, 50);
            return;
        }
        return init("poll");
    };
    if (doc.readyState !== "complete") {
        if (doc.createEventObject && root.doScroll) {
            try {
                top = !win.frameElement;
            } catch (error) {
            }
            if (top) poll();
        }
        doc[add](pre + "DOMContentLoaded", init, false);
        doc[add](pre + "readystatechange", init, false);
        return win[add](pre + "load", init, false);
    }
};
function $3ed269f2f0fb224b$var$__guard__(value, transform) {
    return typeof value !== "undefined" && value !== null ? transform(value) : undefined;
}
function $3ed269f2f0fb224b$var$__guardMethod__(obj, methodName, transform) {
    if (typeof obj !== "undefined" && obj !== null && typeof obj[methodName] === "function") return transform(obj, methodName);
    else return undefined;
}



//# sourceMappingURL=dropzone.mjs.map

// EXTERNAL MODULE: ./node_modules/glightbox/dist/js/glightbox.min.js
var glightbox_min = __webpack_require__(6128);
var glightbox_min_default = /*#__PURE__*/__webpack_require__.n(glightbox_min);
;// CONCATENATED MODULE: ./src/assets/js/main.js


document.addEventListener('DOMContentLoaded', function () {
	initPopups()
	initHeaderSearch()
	initScrollHeader()
	initFooterCounter()
	initBadges()
	initSwipers()
	initHeaderNav()
	initSpoilers()
	initSelects()
	initPhoneInputs()
	initMailInputs()
	initDateInputs()
	initPinCode()
	initHeaderNavHovers()
	initStikies()

	initDeliveryClick()
	initReviewStars()
	initPhotoUpload()
	initQuantities()
	collapse()
	passwords()
	initAnchors()
	initGlightbox()
	fixedPanel()
})

const body = document.querySelector('body')

const initStikies = () => {
	// let items = document.querySelectorAll('.sticky')

	// items.length && items.forEach(parent => {
	// 	let item = parent.children[0],
	// 		l = item.getBoundingClientRect().left,
	// 		w = item.clientWidth,
	// 		h = item.clientHeight

	// 	window.addEventListener('scroll', () => {
	// 		if (window.scrollY > (parent.getBoundingClientRect().top - parent.getAttribute('data-sticky'))) {
	// 			item.classList.add('fixed')
	// 			item.style.setProperty('left', l + 'px')
	// 			item.style.setProperty('top', parent.getAttribute('data-sticky') + 'px')
	// 			item.style.setProperty('width', w + 'px')
	// 			item.style.setProperty('height', h + 'px')
	// 		} else {
	// 			item.classList.remove('fixed')
	// 			item.style.removeProperty('left')
	// 			item.style.removeProperty('top')
	// 			item.style.removeProperty('width')
	// 			item.style.removeProperty('height')
	// 		}
	// 	})
	// })
}

const initHeaderNavHovers = () => {
	let items = document.querySelectorAll('.header_nav .dropdown')

	items.forEach(x => {
		x.addEventListener('mouseenter', () => {
			x.classList.add('hovered')
            // Эта строка приводит к ошибке (А. Скляр):
			// body.classList.add('noscroll')
			document.body.classList.add('noscroll')
		})

		x.addEventListener('mouseleave', () => {
			x.classList.remove('hovered')
            // Эта строка приводит к ошибке (А. Скляр):
			// body.classList.remove('noscroll')
            document.body.classList.remove('noscroll')
		})
	})
}

const initScrollHeader = () => {
	let headerHeight = window.outerWidth > 1400 ? 88 : window.outerWidth > 890 ? 81 : 72,
        // Эта строка приводит к ошибке (А. Скляр):
        //header = body.querySelector('.header')
        header = document.body.querySelector('.header')

	window.addEventListener('scroll', () => {
        // Эта строка приводит к ошибке (А. Скляр):
		//body.style.setProperty('--headerHeight', header.offsetHeight + 'px')
        document.body.style.setProperty('--headerHeight', header.offsetHeight + 'px')
		window.scrollY > headerHeight ? header.classList.add('scrolled') : header.classList.remove('scrolled')
	})

	window.addEventListener('resize', () => {
        // Эта строка приводит к ошибке (А. Скляр):
		//body.style.setProperty('--headerHeight', header.offsetHeight + 'px')
        document.body.style.setProperty('--headerHeight', header.offsetHeight + 'px')
	})
}

const initPopups = () => {
	let popups = document.querySelectorAll(`[data-popup]`)

	if (!popups) return

	popups.forEach(x => {
		let newPopup = new Popup(x).bindGlobalControls()
	})
}

const initHeaderSearch = () => {
	let items = document.querySelectorAll('i.clear'),
		desktop_opener = document.querySelector('[data-opener="header_search"]'),
		desktop_input = document.querySelector('[data-popup="header_search"] input'),
		mobile_opener = document.querySelector('[data-opener="header_mobile_search"]'),
		mobile_input = document.querySelector('[data-popup="header_mobile_search"] input')

	items && items.forEach(x => {
		let parent = x.parentNode,
			input = parent.querySelector('input[type="text"]')

		x.addEventListener('click', () => {
			input.value = ''

			parent.getAttribute('data-popup') === 'header_mobile_search' && closePopup_header_mobile_search()
		})
	})

	desktop_opener && desktop_opener.addEventListener('click', () => {
		desktop_input.focus()
	})

	mobile_opener && mobile_opener.addEventListener('click', () => {
		mobile_input.focus()
	})
}

const initFooterCounter = () => {
	let counter = document.querySelector('[data-type="footer_counter"]'),
		today = new Date(),
		startDay = new Date(2024, 0, 0, 0, 0, 0, 0),
		diff = (today.getTime() - startDay.getTime()) / 1000,
		count = diff / 172.8

	counter.innerHTML = count.toFixed(0)
}

const initBadges = () => {
	let badgesHolders = document.querySelectorAll('[data-type="badges"]'),
		grindbadgesHolder = document.querySelectorAll('[data-type="grind_badges"]')

	badgesHolders && badgesHolders.forEach(badgesHolder => {
		let parent = badgesHolder.closest('[data-type="badges_holder"]'),
			target = parent.querySelector('[data-type="badges_content"]'),
			badges = badgesHolder.querySelectorAll('.badge'),
			titleHolder = parent.querySelector('[data-type="title-holder"]')

		badges.forEach((x, index) => {
			x.addEventListener('click', () => {

				target && target.querySelector('.active') && target.querySelector('.active').classList.remove('active')
				badgesHolder.querySelector('.active') && badgesHolder.querySelector('.active').classList.remove('active')
				target && target.children[index].classList.add('active')
				x.classList.add('active')

				if (titleHolder && x.getAttribute('data-change-title')) {
					titleHolder.innerHTML = x.getAttribute('data-change-title')
				}
			})
		})

		badges[0].click()
	})

	grindbadgesHolder && grindbadgesHolder.forEach(grindBadgesHolder => {
		let badges = grindBadgesHolder.querySelectorAll('.badge')

		badges.forEach((x, index) => {
			x.addEventListener('click', () => {
				grindBadgesHolder.querySelector('.active') && grindBadgesHolder.querySelector('.active').classList.remove('active')
				x.classList.add('active')
			})
		})

		badges[0].click()
	})
}

const initSwipers = () => {
	let compilations = document.querySelectorAll('.compilations_list'),
		stories = document.querySelectorAll('.stories'),
		articles = document.querySelectorAll('.articles'),
		articles_four = document.querySelectorAll('.articles-four'),
		inner_compilations = document.querySelectorAll('.catalog_inner-compilations'),
		product_detail_big = document.querySelector('.product_slider-big'),
		product_detail_thumbs = document.querySelector('.product_slider-thumbs'),
		taste = document.querySelector('.taste_slider'),
		products = document.querySelectorAll('.products_slider'),
		stocks = document.querySelectorAll('.other_stocks'),
		partners = document.querySelector('.partners_slider')

	compilations.length && compilations.forEach(x => {
		const newSwiper = new Swiper(x, {
			slidesPerView: 1,
			spaceBetween: 10,
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
			},
			breakpoints: {
				890: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				480: {
					slidesPerView: 2,

				}
			}
		})
	})

	stories.length && stories.forEach(x => {
		const newSwiper = new Swiper(x, {
			slidesPerView: 2,
			spaceBetween: 10,
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
			},
			breakpoints: {
				1280: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
				1080: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				890: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 10,
				}
			}
		})
	})

	articles.length && articles.forEach(x => {
		const newSwiper = new Swiper(x, {
			slidesPerView: 1,
			spaceBetween: 10,
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
			},
			breakpoints: {
				1280: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				890: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 10,
				}
			}
		})
	})

	inner_compilations.length && inner_compilations.forEach(x => {
		const newSwiper = new Swiper(x, {
			slidesPerView: 2.5,
			spaceBetween: 20,
			navigation: {
				nextEl: ".button-next",
				prevEl: ".button-prev",
			},
			// autoplay: {
			// 	delay: 2000,
			// },
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
			},
			breakpoints: {
				1280: {
					slidesPerView: 8,
					spaceBetween: 16,
				},
				890: {
					slidesPerView: 6,
					spaceBetween: 20,
				},
				480: {
					slidesPerView: 3,
					spaceBetween: 10,
				}
			}
		})
	})

	products.length && products.forEach(x => {
		const newSwiper = new Swiper(x, {
			slidesPerView: 1,
			spaceBetween: 20,
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
			},
			breakpoints: {
				1280: {
					slidesPerView: 8,
					spaceBetween: 0,
				},
				890: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				550: {
					slidesPerView: 2,
					spaceBetween: 20,
				}
			}
		})
	})

	stocks.length && stocks.forEach(x => {
		const newSwiper = new Swiper(x, {
			slidesPerView: 1,
			spaceBetween: 10,
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
			},
			breakpoints: {
				890: {
					slidesPerView: 2,
					spaceBetween: 20,
				}
			}
		})
	})

	const newProductThumbsSwiper = product_detail_thumbs && new Swiper(product_detail_thumbs, {
		spaceBetween: 8,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
		breakpoints: {
			1280: {
				slidesPerView: 8,
			},
			890: {
				slidesPerView: 6,
			}
		}
	})

	const newProductSwiper = product_detail_big && new Swiper(product_detail_big, {
		spaceBetween: 0,
		slidesPerView: 1,
		navigation: {
			nextEl: product_detail_big.closest('.product_slider').querySelector('.button-next'),
			prevEl: product_detail_big.closest('.product_slider').querySelector('.button-prev'),
		},
		pagination: {
			el: ".pagination",
			dynamicBullets: false,
		},
		thumbs: {
			swiper: product_detail_thumbs,
		},
	})

	const newTasteSwiper = taste && new Swiper(taste, {
		spaceBetween: 0,
		slidesPerView: 3,
		navigation: {
			nextEl: taste.nextElementSibling,
			prevEl: taste.nextElementSibling.nextElementSibling,
		},
		breakpoints: {
			1080: {
				slidesPerView: 6,
				spaceBetween: 0,
			},
			890: {
				slidesPerView: 4,
				spaceBetween: 0,
			},
		}
	})

	const newPartnersSwiper = partners && new Swiper(partners, {
		spaceBetween: 10,
		slidesPerView: 1,
		scrollbar: {
			el: ".swiper-scrollbar",
			hide: false,
		},
		breakpoints: {
			1080: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		}
	})
}

const initHeaderNav = () => {
	let navItems = document.querySelectorAll('[data-nav]')

	navItems.forEach(x => {
		let data = x.getAttribute('data-nav'),
			target = document.querySelector(`[data-nav-content="${data}"]`),
			closer = document.querySelector(`[data-nav-closer="${data}"]`)

		x.addEventListener('click', () => {
			target.classList.add('opened')

			if (!target.querySelector('.spoiler_head.opened')) {
				target.querySelector('.spoiler_head').click()
			}
		})

		closer.addEventListener('click', () => {
			target.classList.remove('opened')
		})
	})
}

const collapse = () => {
	let holders = document.querySelectorAll('[data-type="collapsin"]')

	holders.length && holders.forEach(holder => {
		let items = holder.querySelectorAll('[data-type="collapse"]');

		items.forEach((x, index) => [
			x.addEventListener('click', () => {
				if (x.classList.contains('collapsed')) {
					x.classList.remove('collapsed')

					for (let i = 0; i < items.length; i++) {
						i != index && !items[i].classList.contains('collapsed') && items[i].classList.add('collapsed')
					}
				} else return
			})
		])
	})
}

const initSpoilers = () => {
	let spoilers = document.querySelectorAll('[data-spoiler]')

	spoilers.length && spoilers.forEach(spoiler => {
		let content = spoiler.nextElementSibling

		spoiler.addEventListener('click', () => {
			spoiler.classList.toggle('opened')
			content.classList.toggle('opened')

			if (content.style.maxHeight) {
				content.style.maxHeight = null;
			} else content.style.maxHeight = content.scrollHeight + "px";
		})
	})
}

const initSelects = () => {
	let items = document.querySelectorAll('.ezdd')

	items.forEach(x => {
		if (!x.classList.contains('inited')) {
			const ezdd = new dist/* default */.A(x, {
				behavior: {
					liveUpdates: true,
					useNativeUiOnMobile: false
				},
				callbacks: {
					onSelect: value => {
						x.setAttribute('value', value)
					}
				}
			})

			x.classList.add('inited')
		}
	})
}

function initPhoneInputs() {
	let selector = document.querySelectorAll("[data-tel-input]");

	selector.forEach(input => {

		let newMask = IMask(input, {
			mask: "+{7} (000) 000 00-00",
			prepare: (appended, masked) => {
				if (appended === "8" && masked.value === "") {
					return "7";
				}
				return appended;
			},
		});

		input.addEventListener('input', e => {
			e.target.value.length < 18 ? e.target.classList.add('required') : e.target.classList.remove('required')
		})
	});
}

function initMailInputs() {
	let selector = document.querySelectorAll("input[type='email']");

	selector.forEach(input => {
		input.addEventListener('input', () => {
			input.value = input.value.replace(/[а-яё]/i, "")

			if (!input.value.includes('@') || input.value.indexOf('@') === input.value.length - 1) {
				input.classList.add('required')
			} else {
				input.classList.remove('required')
			}
		})
	});
}

function initDateInputs() {
	let selector = document.querySelectorAll("input[data-date]");

	selector.forEach(input => {

		let newMask = IMask(input, {
			mask: Date,
			pattern: 'd.`m.`Y',
			blocks: {
				d: {
					mask: IMask.MaskedRange,
					from: 1,
					to: 31,
					maxLength: 2,
				},
				m: {
					mask: IMask.MaskedRange,
					from: 1,
					to: 12,
					maxLength: 2,
				},
				Y: {
					mask: IMask.MaskedRange,
					from: 1900,
					to: 9999,
				}
			},
		});
	})
}

const pin_code_timer = () => {
	let timerHolder = document.querySelector('.timer')

	if (!timerHolder) return

	let timer = timerHolder.querySelector('span'),
		link = timerHolder.nextElementSibling,
		i = 59;

	const onTimer = () => {
		let formatted = '0:' + i.toString().padStart(2, '0');

		timer.innerHTML = formatted;
		i--;

		if (i < 0) {
			timerHolder.style.display = 'none';
			link.style.display = 'block';
			return
		}
		else {
			setTimeout(onTimer, 1000);
		}
	}

	onTimer()
}

window.pin_code_timer = pin_code_timer

const initPinCode = () => {
	let inputs = document.querySelectorAll('.pin_code .input')

	inputs && inputs.forEach((input, index) => {
		input.dataset.index = index

		const handlePinPaste = e => {
			const data = e.clipboardData.getData('text')
			const value = data.split('')

			if (value.length == inputs.length) {
				inputs.forEach((input, index) => (input.value = value[index]))
				submit()
			}
		}

		const handlePin = e => {
			const input = e.target
			let value = input.value
			input.value = ''
			input.value = value ? value[0] : ''
			let fieldIndex = input.dataset.index

			if (value.length > 0 && fieldIndex < inputs.length - 1) {
				input.nextElementSibling.focus()
			}

			if (e.key == "Backspace" && fieldIndex > 0) {
				input.previousElementSibling.focus()
			}

			if (fieldIndex == inputs.length - 1) {
				submit()
			}
		}

		const submit = () => {
			let pin = ''

			inputs.forEach(x => {
				pin += input.value
				x.disabled = true
				x.classList.add('disabled')
			})

			console.log(pin)
		}

		input.addEventListener('paste', handlePinPaste)
		input.addEventListener('input', handlePin)
	})
}

const initDeliveryClick = () => {
	let item = document.querySelector('.delivery'), handler = item && item.previousElementSibling

	item && handler.classList.contains('spoiler') && handler.click()
}

const initReviewStars = () => {
	let holders = document.querySelectorAll('.review_score')

	holders.length && holders.forEach(holder => {
		let stars = holder.querySelectorAll('[data-score]'),
			input = holder.querySelector('input[hidden]')

		stars.forEach(star => {
			star.addEventListener('click', () => {
				if (holder.querySelector('.active')) {
					holder.querySelector('.active').classList.remove('active')
				}

				star.classList.add('active')
				input.value = star.getAttribute('data-score')
				console.log(input.value)
			})
		})
	})
}

const initPhotoUpload = () => {
	let dds = document.querySelectorAll('.dropzone')

	dds.forEach(dd => {
		var myDropzone = new $3ed269f2f0fb224b$export$2e2bcd8739ae039(dd, {
			url: "/",
			createImageThumbnails: true,
			addRemoveLinks: true,
			uploadMultiple: false,
			maxFiles: 1,
			dictRemoveFile: "",
			dictCancelUpload: "",
		});

		dd.querySelector('.dz-message').innerHTML = '<i class="dz_load"></i><p class="text">Прикрепить фото<p>'
	})
}

const initAnchors = () => {
	let anchors = document.querySelectorAll('a[href^="#"]')

	anchors.forEach(anchor => {
		let target = document.querySelector(`${anchor.getAttribute('href')}`)
		// headerHeight = window.innerWidth > 890 ? 64 : 80

		anchor.addEventListener('click', e => {
			e.preventDefault();
			// console.log(target)

			window.scrollTo({
				top: target.getBoundingClientRect().top - 180,
				left: 0,
				behavior: 'smooth'
			})
		})
	})
}

const initQuantities = () => {
	let items = document.querySelectorAll('.quantity')

	items.length && items.forEach(x => {
		if (!x.classList.contains('inited')) {
			let minus = x.querySelector('.minus'),
				plus = x.querySelector('.plus'),
				input = x.querySelector('input')

			minus.addEventListener('click', () => {
				if (input.value != 1) {
					input.value = Number(input.value) - 1
				} else return
			})

			plus.addEventListener('click', () => {
				input.value = Number(input.value) + 1
			})

			x.classList.add('inited')
		}
	})
}

const passwords = () => {
	let pswrd = document.querySelector('input[type="password"]'),
		form = pswrd && pswrd.closest('form'),
		passwords = pswrd && form.querySelectorAll('input[type="password"]')

	passwords && passwords[1].addEventListener('change', () => {
		console.log(1)
		if (passwords[1].value != passwords[0].value) {
			passwords[0].closest('label').classList.add('invalid')
			passwords[1].closest('label').classList.add('invalid')
		} else {
			passwords[0].closest('label').classList.remove('invalid')
			passwords[1].closest('label').classList.remove('invalid')
		}
	})

}

const initGlightbox = () => {
	const lightbox = glightbox_min_default()({});
}

const fixedPanel = () => {
	let panel = document.querySelector('.fixed_panel')

	panel && window.addEventListener('scroll', () => {
		if (window.scrollY > document.querySelector('.product_info-head').getBoundingClientRect().top + document.querySelector('.product_info-head').offsetHeight) {
			panel.classList.add('show')
			document.querySelector('.product_detail .product_slider').classList.add('flow')
		} else {
			panel.classList.remove('show')
			document.querySelector('.product_detail .product_slider').classList.remove('flow')
		}
	})
}
}();