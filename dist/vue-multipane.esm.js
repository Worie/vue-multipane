var LAYOUT_HORIZONTAL="horizontal",LAYOUT_VERTICAL="vertical",script={name:"multipane",props:{layout:{type:String,default:LAYOUT_VERTICAL}},data:function(){return{isResizing:!1}},computed:{classnames:function(){return["multipane","layout-"+this.layout.slice(0,1),this.isResizing?"is-resizing":""]},cursor:function(){return this.isResizing?this.layout==LAYOUT_VERTICAL?"col-resize":"row-resize":""},userSelect:function(){return this.isResizing?"none":""}},methods:{onMouseDown:function(e){var n,t,i=e.target.closest(".multipane-resizer");e.preventDefault(),"touchstart"==e.type?(n=e.touches[0].pageX,t=e.touches[0].pageY):(n=e.pageX,t=e.pageY);var o=this,s=o.$el,r=o.layout,a=Boolean(i.className.match("affect-follower")),_=i.previousElementSibling;a&&(_=i.nextElementSibling);var l=_.offsetWidth,u=_.offsetHeight,p=!!(_.style.width+"").match("%"),c=window.addEventListener,d=window.removeEventListener,A=function(e,n){if(void 0===n&&(n=0),a&&(n=-n),r==LAYOUT_VERTICAL){var t=s.clientWidth,i=e+n;return _.style.width=p?i/t*100+"%":i+"px"}if(r==LAYOUT_HORIZONTAL){var o=s.clientHeight,l=e+n;return _.style.height=p?l/o*100+"%":l+"px"}};o.isResizing=!0;var m=A();o.$emit("paneResizeStart",_,i,m);var v=function(e){var s,a;"touchmove"==e.type?(s=e.touches[0].pageX,a=e.touches[0].pageY):(e.preventDefault(),s=e.pageX,a=e.pageY),m=r==LAYOUT_VERTICAL?A(l,s-n):A(u,a-t),o.$emit("paneResize",_,i,m)},h=function(){m=A(r==LAYOUT_VERTICAL?_.clientWidth:_.clientHeight),o.isResizing=!1,d("mousemove",v),d("mouseup",h),d("touchmove",v),d("touchend",h),o.$emit("paneResizeStop",_,i,m)};c("mousemove",v),c("mouseup",h),c("touchmove",v),c("touchend",h)}}};function normalizeComponent(e,n,t,i,o,s,r,a,_,l){"boolean"!=typeof r&&(_=a,a=r,r=!1);var u,p="function"==typeof t?t.options:t;if(e&&e.render&&(p.render=e.render,p.staticRenderFns=e.staticRenderFns,p._compiled=!0,o&&(p.functional=!0)),i&&(p._scopeId=i),s?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,_(e)),e&&e._registeredComponents&&e._registeredComponents.add(s)},p._ssrRegister=u):n&&(u=r?function(e){n.call(this,l(e,this.$root.$options.shadowRoot))}:function(e){n.call(this,a(e))}),u)if(p.functional){var c=p.render;p.render=function(e,n){return u.call(n),c(e,n)}}else{var d=p.beforeCreate;p.beforeCreate=d?[].concat(d,u):[u]}return t}var HEAD,isOldIE="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function createInjector(e){return function(e,n){return addStyle(e,n)}}var styles={};function addStyle(e,n){var t=isOldIE?n.media||"default":e,i=styles[t]||(styles[t]={ids:new Set,styles:[]});if(!i.ids.has(e)){i.ids.add(e);var o=n.source;if(n.map&&(o+="\n/*# sourceURL="+n.map.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n.map))))+" */"),i.element||(i.element=document.createElement("style"),i.element.type="text/css",n.media&&i.element.setAttribute("media",n.media),void 0===HEAD&&(HEAD=document.head||document.getElementsByTagName("head")[0]),HEAD.appendChild(i.element)),"styleSheet"in i.element)i.styles.push(o),i.element.styleSheet.cssText=i.styles.filter(Boolean).join("\n");else{var s=i.ids.size-1,r=document.createTextNode(o),a=i.element.childNodes;a[s]&&i.element.removeChild(a[s]),a.length?i.element.insertBefore(r,a[s]):i.element.appendChild(r)}}}var __vue_script__=script,__vue_render__=function(){var e=this.$createElement;return(this._self._c||e)("div",{class:this.classnames,style:{cursor:this.cursor,userSelect:this.userSelect},on:{mousedown:this.onMouseDown,touchstart:this.onMouseDown}},[this._t("default")],2)},__vue_staticRenderFns__=[];__vue_render__._withStripped=!0;var __vue_inject_styles__=function(e){e&&e("data-v-0402447d_0",{source:".multipane {\n  display: flex;\n}\n.multipane.layout-h {\n  flex-direction: column;\n}\n.multipane.layout-v {\n  flex-direction: row;\n}\n.multipane > div {\n  position: relative;\n  z-index: 1;\n}\n.multipane-resizer {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n.layout-h > .multipane-resizer {\n  width: 100%;\n  height: 10px;\n  margin-top: -10px;\n  top: 5px;\n  cursor: row-resize;\n}\n.layout-v > .multipane-resizer {\n  width: 10px;\n  height: 100%;\n  margin-left: -10px;\n  left: 5px;\n  cursor: col-resize;\n}\n\n/*# sourceMappingURL=multipane.vue.map */",map:{version:3,sources:["/Users/Worie/Documents/Programowanie/vue-multipane/src/multipane.vue","multipane.vue"],names:[],mappings:"AASA;EACA,aAAA;ACRA;ADUA;EACA,sBAAA;ACRA;ADWA;EACA,mBAAA;ACTA;ADaA;EACA,kBAAA;EACA,UAAA;ACVA;ADaA;EACA,cAAA;EACA,kBAAA;EACA,UAAA;ACVA;ADaA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,QAAA;EACA,kBAAA;ACVA;ADaA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;EACA,kBAAA;ACVA;;AAEA,wCAAwC",file:"multipane.vue",sourcesContent:['<template>\n  <div :class="classnames" :style="{ cursor, userSelect }" @mousedown="onMouseDown" @touchstart="onMouseDown">\n    <slot></slot>\n  </div>\n</template>\n\n<script src="./multipane.js"><\/script>\n\n<style lang="scss">\n.multipane {\n    display: flex;\n\n    &.layout-h {\n        flex-direction: column;\n    }\n\n    &.layout-v {\n        flex-direction: row;\n    }\n}\n\n.multipane > div {\n  position: relative;\n  z-index: 1;\n}\n\n.multipane-resizer {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n\n.layout-h > .multipane-resizer {\n  width: 100%;\n  height: 10px;\n  margin-top: -10px;\n  top: 5px;\n  cursor: row-resize;\n}\n\n.layout-v > .multipane-resizer {\n  width: 10px;\n  height: 100%;\n  margin-left: -10px;\n  left: 5px;\n  cursor: col-resize;\n}\n</style>\n',".multipane {\n  display: flex;\n}\n.multipane.layout-h {\n  flex-direction: column;\n}\n.multipane.layout-v {\n  flex-direction: row;\n}\n\n.multipane > div {\n  position: relative;\n  z-index: 1;\n}\n\n.multipane-resizer {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n\n.layout-h > .multipane-resizer {\n  width: 100%;\n  height: 10px;\n  margin-top: -10px;\n  top: 5px;\n  cursor: row-resize;\n}\n\n.layout-v > .multipane-resizer {\n  width: 10px;\n  height: 100%;\n  margin-left: -10px;\n  left: 5px;\n  cursor: col-resize;\n}\n\n/*# sourceMappingURL=multipane.vue.map */"]},media:void 0})},__vue_scope_id__=void 0,__vue_module_identifier__=void 0,__vue_is_functional_template__=!1,__vue_component__=normalizeComponent({render:__vue_render__,staticRenderFns:__vue_staticRenderFns__},__vue_inject_styles__,__vue_script__,__vue_scope_id__,__vue_is_functional_template__,__vue_module_identifier__,!1,createInjector,void 0,void 0),script$1={name:"multipane-resizer",props:{affectFollower:{type:Boolean,default:!1}},computed:{classnames:function(){return["multipane-resizer",this.affectFollower?"affect-follower":""]}}},__vue_script__$1=script$1,__vue_render__$1=function(){var e=this.$createElement;return(this._self._c||e)("div",{class:this.classnames},[this._t("default")],2)},__vue_staticRenderFns__$1=[];__vue_render__$1._withStripped=!0;var __vue_inject_styles__$1=void 0,__vue_scope_id__$1=void 0,__vue_module_identifier__$1=void 0,__vue_is_functional_template__$1=!1,__vue_component__$1=normalizeComponent({render:__vue_render__$1,staticRenderFns:__vue_staticRenderFns__$1},__vue_inject_styles__$1,__vue_script__$1,__vue_scope_id__$1,__vue_is_functional_template__$1,__vue_module_identifier__$1,!1,void 0,void 0,void 0);"undefined"!=typeof window&&window.Vue&&(window.Vue.component("multipane",__vue_component__),window.Vue.component("multipane-resizer",__vue_component__$1));export{__vue_component__ as Multipane,__vue_component__$1 as MultipaneResizer};
