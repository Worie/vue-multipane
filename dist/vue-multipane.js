(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Multipane = {})));
}(this, (function (exports) { 'use strict';

var LAYOUT_HORIZONTAL = 'horizontal';
var LAYOUT_VERTICAL = 'vertical';

var script = {
  name: 'multipane',

  props: {
    layout: {
      type: String,
      default: LAYOUT_VERTICAL,
    },
  },

  data: function data() {
    return {
      isResizing: false,
    };
  },

  computed: {
    classnames: function classnames() {
      return [
        'multipane',
        'layout-' + this.layout.slice(0, 1),
        this.isResizing ? 'is-resizing' : '' ];
    },
    cursor: function cursor() {
      return this.isResizing
        ? this.layout == LAYOUT_VERTICAL ? 'col-resize' : 'row-resize'
        : '';
    },
    userSelect: function userSelect() {
      return this.isResizing ? 'none' : '';
    },
  },

  methods: {
    onMouseDown: function onMouseDown(e) {
      var resizer = e.target.closest('.multipane-resizer');
        e.preventDefault();
        var initialPageX, initialPageY;
        if (e.type == "touchstart") {
          initialPageX = e.touches[0].pageX;
          initialPageY = e.touches[0].pageY;
        } else {
          initialPageX = e.pageX;
          initialPageY = e.pageY;
        }
        var self = this;
        var container = self.$el;
      var layout = self.layout;

        var reversed = Boolean(resizer.className.match('affect-follower'));

        var pane = resizer.previousElementSibling;
        if (reversed) {
          pane = resizer.nextElementSibling;
        }
        var initialPaneWidth = pane.offsetWidth;
      var initialPaneHeight = pane.offsetHeight;

        var usePercentage = !!(pane.style.width + '').match('%');

        var addEventListener = window.addEventListener;
      var removeEventListener = window.removeEventListener;

        var resize = function (initialSize, offset) {
          if ( offset === void 0 ) offset = 0;

          if (reversed) {
            offset = -offset;
          }
          if (layout == LAYOUT_VERTICAL) {
            var containerWidth = container.clientWidth;
            var paneWidth = initialSize + offset;

            return (pane.style.width = usePercentage
              ? paneWidth / containerWidth * 100 + '%'
              : paneWidth + 'px');
          }

          if (layout == LAYOUT_HORIZONTAL) {
            var containerHeight = container.clientHeight;
            var paneHeight = initialSize + offset;

            return (pane.style.height = usePercentage
              ? paneHeight / containerHeight * 100 + '%'
              : paneHeight + 'px');
          }
        };

        // This adds is-resizing class to container
        self.isResizing = true;

        // Resize once to get current computed size
        var size = resize();

        // Trigger paneResizeStart event
        self.$emit('paneResizeStart', pane, resizer, size);

        var onMouseMove = function(e) {
          var pageX, pageY;
          if (e.type == "touchmove") {
            pageX = e.touches[0].pageX;
            pageY = e.touches[0].pageY;
          } else {
            e.preventDefault();
            pageX = e.pageX;
            pageY = e.pageY;
          }
          size =
            layout == LAYOUT_VERTICAL
              ? resize(initialPaneWidth, pageX - initialPageX)
              : resize(initialPaneHeight, pageY - initialPageY);

          self.$emit('paneResize', pane, resizer, size);
        };

        var onMouseUp = function() {
          // Run resize one more time to set computed width/height.
          size =
            layout == LAYOUT_VERTICAL
              ? resize(pane.clientWidth)
              : resize(pane.clientHeight);

          // This removes is-resizing class to container
          self.isResizing = false;

          removeEventListener('mousemove', onMouseMove);
          removeEventListener('mouseup', onMouseUp);
          removeEventListener('touchmove', onMouseMove);
          removeEventListener('touchend', onMouseUp);

          self.$emit('paneResizeStop', pane, resizer, size);
        };

        addEventListener('mousemove', onMouseMove);
        addEventListener('mouseup', onMouseUp);
        addEventListener('touchmove', onMouseMove);
        addEventListener('touchend', onMouseUp);
    },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.classnames,
      style: { cursor: _vm.cursor, userSelect: _vm.userSelect },
      on: { mousedown: _vm.onMouseDown, touchstart: _vm.onMouseDown }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-0402447d_0", { source: ".multipane {\n  display: flex;\n}\n.multipane.layout-h {\n  flex-direction: column;\n}\n.multipane.layout-v {\n  flex-direction: row;\n}\n.multipane > div {\n  position: relative;\n  z-index: 1;\n}\n.multipane-resizer {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n.layout-h > .multipane-resizer {\n  width: 100%;\n  height: 10px;\n  margin-top: -10px;\n  top: 5px;\n  cursor: row-resize;\n}\n.layout-v > .multipane-resizer {\n  width: 10px;\n  height: 100%;\n  margin-left: -10px;\n  left: 5px;\n  cursor: col-resize;\n}\n\n/*# sourceMappingURL=multipane.vue.map */", map: {"version":3,"sources":["/Users/Worie/Documents/Programowanie/vue-multipane/src/multipane.vue","multipane.vue"],"names":[],"mappings":"AASA;EACA,aAAA;ACRA;ADUA;EACA,sBAAA;ACRA;ADWA;EACA,mBAAA;ACTA;ADaA;EACA,kBAAA;EACA,UAAA;ACVA;ADaA;EACA,cAAA;EACA,kBAAA;EACA,UAAA;ACVA;ADaA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,QAAA;EACA,kBAAA;ACVA;ADaA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;EACA,kBAAA;ACVA;;AAEA,wCAAwC","file":"multipane.vue","sourcesContent":["<template>\n  <div :class=\"classnames\" :style=\"{ cursor, userSelect }\" @mousedown=\"onMouseDown\" @touchstart=\"onMouseDown\">\n    <slot></slot>\n  </div>\n</template>\n\n<script src=\"./multipane.js\"></script>\n\n<style lang=\"scss\">\n.multipane {\n    display: flex;\n\n    &.layout-h {\n        flex-direction: column;\n    }\n\n    &.layout-v {\n        flex-direction: row;\n    }\n}\n\n.multipane > div {\n  position: relative;\n  z-index: 1;\n}\n\n.multipane-resizer {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n\n.layout-h > .multipane-resizer {\n  width: 100%;\n  height: 10px;\n  margin-top: -10px;\n  top: 5px;\n  cursor: row-resize;\n}\n\n.layout-v > .multipane-resizer {\n  width: 10px;\n  height: 100%;\n  margin-left: -10px;\n  left: 5px;\n  cursor: col-resize;\n}\n</style>\n",".multipane {\n  display: flex;\n}\n.multipane.layout-h {\n  flex-direction: column;\n}\n.multipane.layout-v {\n  flex-direction: row;\n}\n\n.multipane > div {\n  position: relative;\n  z-index: 1;\n}\n\n.multipane-resizer {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n\n.layout-h > .multipane-resizer {\n  width: 100%;\n  height: 10px;\n  margin-top: -10px;\n  top: 5px;\n  cursor: row-resize;\n}\n\n.layout-v > .multipane-resizer {\n  width: 10px;\n  height: 100%;\n  margin-left: -10px;\n  left: 5px;\n  cursor: col-resize;\n}\n\n/*# sourceMappingURL=multipane.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  /* style inject */
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//

var script$1 = {
  name: 'multipane-resizer',

  props: {
    affectFollower: {
      type: Boolean,
      default: false,
    },
  },  
  computed: {
    classnames: function classnames() {
      return [
        'multipane-resizer',
        this.affectFollower ? 'affect-follower' : '' ];
    },
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.classnames }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('multipane', __vue_component__);
  window.Vue.component('multipane-resizer', __vue_component__$1);
}

exports.Multipane = __vue_component__;
exports.MultipaneResizer = __vue_component__$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
