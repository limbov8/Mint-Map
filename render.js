!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
!function(){function t(t){var e=Array.isArray(t)?{label:t[0],value:t[1]}:"object"==typeof t&&"label"in t&&"value"in t?t:{label:t,value:t};this.label=e.label||e.value,this.value=e.value}function e(t,e,i){for(var n in e){var s=e[n],r=t.input.getAttribute("data-"+n.toLowerCase());"number"==typeof s?t[n]=parseInt(r):!1===s?t[n]=null!==r:s instanceof Function?t[n]=null:t[n]=r,t[n]||0===t[n]||(t[n]=n in i?i[n]:s)}}function i(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function n(t,e){return o.call((e||document).querySelectorAll(t))}function s(){n("input.awesomplete").forEach(function(t){new r(t)})}var r=function(t,n){var s=this;Awesomplete.count=(Awesomplete.count||0)+1,this.count=Awesomplete.count,this.isOpened=!1,this.input=i(t),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-owns","awesomplete_list_"+this.count),this.input.setAttribute("role","combobox"),n=n||{},e(this,{minChars:2,maxItems:10,autoFirst:!1,data:r.DATA,filter:r.FILTER_CONTAINS,sort:!1!==n.sort&&r.SORT_BYLENGTH,item:r.ITEM,replace:r.REPLACE},n),this.index=-1,this.container=i.create("div",{className:"awesomplete",around:t}),this.ul=i.create("ul",{hidden:"hidden",role:"listbox",id:"awesomplete_list_"+this.count,inside:this.container}),this.status=i.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-atomic":!0,inside:this.container,textContent:0!=this.minChars?"Type "+this.minChars+" or more characters for results.":"Begin typing for results."}),this._events={input:{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(t){var e=t.keyCode;s.opened&&(13===e&&s.selected?(t.preventDefault(),s.select()):27===e?s.close({reason:"esc"}):38!==e&&40!==e||(t.preventDefault(),s[38===e?"previous":"next"]()))}},form:{submit:this.close.bind(this,{reason:"submit"})},ul:{mousedown:function(t){t.preventDefault()},click:function(t){var e=t.target;if(e!==this){for(;e&&!/li/i.test(e.nodeName);)e=e.parentNode;e&&0===t.button&&(t.preventDefault(),s.select(e,t.target))}}}},i.bind(this.input,this._events.input),i.bind(this.input.form,this._events.form),i.bind(this.ul,this._events.ul),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||n.list||[],r.all.push(this)};r.prototype={set list(t){if(Array.isArray(t))this._list=t;else if("string"==typeof t&&t.indexOf(",")>-1)this._list=t.split(/\s*,\s*/);else if((t=i(t))&&t.children){var e=[];o.apply(t.children).forEach(function(t){if(!t.disabled){var i=t.textContent.trim(),n=t.value||i,s=t.label||i;""!==n&&e.push({label:s,value:n})}}),this._list=e}document.activeElement===this.input&&this.evaluate()},get selected(){return this.index>-1},get opened(){return this.isOpened},close:function(t){this.opened&&(this.ul.setAttribute("hidden",""),this.isOpened=!1,this.index=-1,this.status.setAttribute("hidden",""),i.fire(this.input,"awesomplete-close",t||{}))},open:function(){this.ul.removeAttribute("hidden"),this.isOpened=!0,this.status.removeAttribute("hidden"),this.autoFirst&&-1===this.index&&this.goto(0),i.fire(this.input,"awesomplete-open")},destroy:function(){i.unbind(this.input,this._events.input),i.unbind(this.input.form,this._events.form);var t=this.container.parentNode;t.insertBefore(this.input,this.container),t.removeChild(this.container),this.input.removeAttribute("autocomplete"),this.input.removeAttribute("aria-autocomplete");var e=r.all.indexOf(this);-1!==e&&r.all.splice(e,1)},next:function(){var t=this.ul.children.length;this.goto(this.index<t-1?this.index+1:t?0:-1)},previous:function(){var t=this.ul.children.length,e=this.index-1;this.goto(this.selected&&-1!==e?e:t-1)},goto:function(t){var e=this.ul.children;this.selected&&e[this.index].setAttribute("aria-selected","false"),this.index=t,t>-1&&e.length>0&&(e[t].setAttribute("aria-selected","true"),this.status.textContent=e[t].textContent+", list item "+(t+1)+" of "+e.length,this.input.setAttribute("aria-activedescendant",this.ul.id+"_item_"+this.index),this.ul.scrollTop=e[t].offsetTop-this.ul.clientHeight+e[t].clientHeight,i.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}))},select:function(t,e){if(t?this.index=i.siblingIndex(t):t=this.ul.children[this.index],t){var n=this.suggestions[this.index];i.fire(this.input,"awesomplete-select",{text:n,origin:e||t})&&(this.replace(n),this.close({reason:"select"}),i.fire(this.input,"awesomplete-selectcomplete",{text:n}))}},evaluate:function(){var e=this,i=this.input.value;i.length>=this.minChars&&this._list&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map(function(n){return new t(e.data(n,i))}).filter(function(t){return e.filter(t,i)}),!1!==this.sort&&(this.suggestions=this.suggestions.sort(this.sort)),this.suggestions=this.suggestions.slice(0,this.maxItems),this.suggestions.forEach(function(t,n){e.ul.appendChild(e.item(t,i,n))}),0===this.ul.children.length?(this.status.textContent="No results found",this.close({reason:"nomatches"})):(this.open(),this.status.textContent=this.ul.children.length+" results found")):(this.close({reason:"nomatches"}),this.status.textContent="No results found")}},r.all=[],r.FILTER_CONTAINS=function(t,e){return RegExp(i.regExpEscape(e.trim()),"i").test(t)},r.FILTER_STARTSWITH=function(t,e){return RegExp("^"+i.regExpEscape(e.trim()),"i").test(t)},r.SORT_BYLENGTH=function(t,e){return t.length!==e.length?t.length-e.length:t<e?-1:1},r.ITEM=function(t,e,n){return i.create("li",{innerHTML:""===e.trim()?t:t.replace(RegExp(i.regExpEscape(e.trim()),"gi"),"<mark>$&</mark>"),"aria-selected":"false",id:"awesomplete_list_"+this.count+"_item_"+n})},r.REPLACE=function(t){this.input.value=t.value},r.DATA=function(t){return t},Object.defineProperty(t.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length}}),t.prototype.toString=t.prototype.valueOf=function(){return""+this.label};var o=Array.prototype.slice;i.create=function(t,e){var n=document.createElement(t);for(var s in e){var r=e[s];if("inside"===s)i(r).appendChild(n);else if("around"===s){var o=i(r);o.parentNode.insertBefore(n,o),n.appendChild(o)}else s in n?n[s]=r:n.setAttribute(s,r)}return n},i.bind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.addEventListener(e,n)})}},i.unbind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.removeEventListener(e,n)})}},i.fire=function(t,e,i){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0);for(var s in i)n[s]=i[s];return t.dispatchEvent(n)},i.regExpEscape=function(t){return t.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},i.siblingIndex=function(t){for(var e=0;t=t.previousElementSibling;e++);return e},"undefined"!=typeof Document&&("loading"!==document.readyState?s():document.addEventListener("DOMContentLoaded",s)),r.$=i,r.$$=n,"undefined"!=typeof self&&(self.Awesomplete=r),"object"==typeof module&&module.exports&&(module.exports=r)}();
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.MapboxInspect=t()}}(function(){var t;return function t(e,n,r){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){var r=t("./lib/MapboxInspect");e.exports=r},{"./lib/MapboxInspect":3}],2:[function(t,e,n){function r(t,e){var n=document.createElement("div");return n.className="mapboxgl-ctrl mapboxgl-ctrl-group",n.appendChild(t),e||(n.style.display="none"),n}function o(){var t=document.createElement("button");return t.className="mapboxgl-ctrl-icon mapboxgl-ctrl-inspect",t.type="button",t["aria-label"]="Inspect",t}function i(t){t=Object.assign({show:!0,onToggle:function(){}},t),this._btn=o(),this._btn.onclick=t.onToggle,this.elem=r(this._btn,t.show)}i.prototype.setInspectIcon=function(){this._btn.className="mapboxgl-ctrl-icon mapboxgl-ctrl-inspect"},i.prototype.setMapIcon=function(){this._btn.className="mapboxgl-ctrl-icon mapboxgl-ctrl-map"},e.exports=i},{}],3:[function(t,e,n){function r(t){return t.metadata&&t.metadata["mapbox-gl-inspect:inspect"]}function o(t){return Object.assign(t,{metadata:Object.assign({},t.metadata,{"mapbox-gl-inspect:inspect":!0})})}function i(t){return"raster"===t.type&&t.tileSize&&t.tiles?{type:t.type,tileSize:t.tileSize,tiles:t.tiles}:"raster"===t.type&&t.url?{type:t.type,url:t.url}:t}function a(t){return Object.keys(t.sources).forEach(function(e){t.sources[e]=i(t.sources[e])}),t}function s(t){var e=t.version.split(".").map(parseFloat);e[0]<1&&e[1]<29&&console.error("MapboxInspect only supports Mapbox GL JS >= v0.29.0. Please upgrade your Mapbox GL JS version.")}function u(t){if(!(this instanceof u))throw new Error("MapboxInspect needs to be called with the new keyword");var e=null;window.mapboxgl?(s(window.mapboxgl),e=new window.mapboxgl.Popup({closeButton:!1,closeOnClick:!1})):t.popup||console.error("Mapbox GL JS can not be found. Make sure to include it or pass an initialized MapboxGL Popup to MapboxInspect if you are using moduleis."),this.options=Object.assign({showInspectMap:!1,showInspectButton:!0,showInspectMapPopup:!0,showMapPopup:!1,showMapPopupOnHover:!0,showInspectMapPopupOnHover:!0,backgroundColor:"#fff",assignLayerColor:h.brightColor,buildInspectStyle:c.generateInspectStyle,renderPopup:f,popup:e,selectThreshold:5,useInspectStyle:!0,queryParameters:{},sources:{}},t),this.sources=this.options.sources,this.assignLayerColor=this.options.assignLayerColor,this.toggleInspector=this.toggleInspector.bind(this),this._popup=this.options.popup,this._showInspectMap=this.options.showInspectMap,this._onSourceChange=this._onSourceChange.bind(this),this._onMousemove=this._onMousemove.bind(this),this._onStyleChange=this._onStyleChange.bind(this),this._originalStyle=null,this._toggle=new l({show:this.options.showInspectButton,onToggle:this.toggleInspector.bind(this)})}var c=t("./stylegen"),l=t("./InspectButton"),p=t("lodash.isequal"),f=t("./renderPopup"),h=t("./colors");u.prototype.toggleInspector=function(){this._showInspectMap=!this._showInspectMap,this.render()},u.prototype._inspectStyle=function(){var t=c.generateColoredLayers(this.sources,this.assignLayerColor);return this.options.buildInspectStyle(this._map.getStyle(),t,{backgroundColor:this.options.backgroundColor})},u.prototype.render=function(){this._showInspectMap?(this.options.useInspectStyle&&this._map.setStyle(a(o(this._inspectStyle()))),this._toggle.setMapIcon()):this._originalStyle&&(this._popup&&this._popup.remove(),this.options.useInspectStyle&&this._map.setStyle(a(this._originalStyle)),this._toggle.setInspectIcon())},u.prototype._onSourceChange=function(){var t=this.sources,e=this._map,n=Object.assign({},t);Object.keys(e.style.sourceCaches).forEach(function(n){var r=e.style.sourceCaches[n]||{_source:{}},o=r._source.vectorLayerIds;o?t[n]=o:"geojson"===r._source.type&&(t[n]=[])}),p(n,t)||this.render()},u.prototype._onStyleChange=function(){var t=this._map.getStyle();r(t)||(this._originalStyle=t)},u.prototype._onMousemove=function(t){var e;e=0===this.options.selectThreshold?t.point:[[t.point.x-this.options.selectThreshold,t.point.y+this.options.selectThreshold],[t.point.x+this.options.selectThreshold,t.point.y-this.options.selectThreshold]];var n=this._map.queryRenderedFeatures(e,this.options.queryParameters)||[];if(this._map.getCanvas().style.cursor=n.length?"pointer":"",this._showInspectMap){if(!this.options.showInspectMapPopup)return;if("mousemove"===t.type&&!this.options.showInspectMapPopupOnHover)return}else{if(!this.options.showMapPopup)return;if("mousemove"===t.type&&!this.options.showMapPopupOnHover)return}this._popup&&(n.length?this._popup.setLngLat(t.lngLat).setHTML(this.options.renderPopup(n)).addTo(this._map):this._popup.remove())},u.prototype.onAdd=function(t){return this._map=t,0===Object.keys(this.sources).length&&(t.on("tiledata",this._onSourceChange),t.on("sourcedata",this._onSourceChange)),t.on("styledata",this._onStyleChange),t.on("load",this._onStyleChange),t.on("mousemove",this._onMousemove),t.on("click",this._onMousemove),this._toggle.elem},u.prototype.onRemove=function(){this._map.off("styledata",this._onStyleChange),this._map.off("load",this._onStyleChange),this._map.off("tiledata",this._onSourceChange),this._map.off("sourcedata",this._onSourceChange),this._map.off("mousemove",this._onMousemove),this._map.off("click",this._onMousemove);var t=this._toggle.elem;t.parentNode.removeChild(t),this._map=void 0},e.exports=u},{"./InspectButton":2,"./colors":4,"./renderPopup":5,"./stylegen":6,"lodash.isequal":7}],4:[function(t,e,n){function r(t,e){var n="bright",r=null;/water|ocean|lake|sea|river/.test(t)&&(r="blue"),/state|country|place/.test(t)&&(r="pink"),/road|highway|transport/.test(t)&&(r="orange"),/contour|building/.test(t)&&(r="monochrome"),/building/.test(t)&&(n="dark"),/contour|landuse/.test(t)&&(r="yellow"),/wood|forest|park|landcover/.test(t)&&(r="green");var i=o({luminosity:n,hue:r,seed:t,format:"rgbArray"}),a=i.concat([e||1]);return"rgba("+a.join(", ")+")"}var o=t("randomcolor");n.brightColor=r},{randomcolor:8}],5:[function(t,e,n){function r(t){return"undefined"==typeof t||null===t?t:t instanceof Date?t.toLocaleString():"object"==typeof t||"number"==typeof t||"string"==typeof t?t.toString():t}function o(t,e){return'<div class="mapbox-gl-inspect_property"><div class="mapbox-gl-inspect_property-name">'+t+'</div><div class="mapbox-gl-inspect_property-value">'+r(e)+"</div></div>"}function i(t){return'<div class="mapbox-gl-inspect_layer">'+t+"</div>"}function a(t){var e=i(t.layer["source-layer"]||t.layer.source),n=o("$type",t.geometry.type),r=Object.keys(t.properties).map(function(e){return o(e,t.properties[e])});return[e,n].concat(r).join("")}function s(t){return t.map(function(t){return'<div class="mapbox-gl-inspect_feature">'+a(t)+"</div>"}).join("")}function u(t){return'<div class="mapbox-gl-inspect_popup">'+s(t)+"</div>"}e.exports=u},{}],6:[function(t,e,n){function r(t,e,n){var r={id:[e,n,"circle"].join("_"),source:e,type:"circle",paint:{"circle-color":t,"circle-radius":2},filter:["==","$type","Point"]};return n&&(r["source-layer"]=n),r}function o(t,e,n,r){var o={id:[n,r,"polygon"].join("_"),source:n,type:"fill",paint:{"fill-color":t,"fill-antialias":!0,"fill-outline-color":t},filter:["==","$type","Polygon"]};return r&&(o["source-layer"]=r),o}function i(t,e,n){var r={id:[e,n,"line"].join("_"),source:e,layout:{"line-join":"round","line-cap":"round"},type:"line",paint:{"line-color":t},filter:["==","$type","LineString"]};return n&&(r["source-layer"]=n),r}function a(t,e){function n(t){var n=e.bind(null,t),r={circle:n(.8),line:n(.6),polygon:n(.3),polygonOutline:n(.6),default:n(1)};return r}var a=[],s=[],u=[];return Object.keys(t).forEach(function(e){var c=t[e];if(c&&0!==c.length)c.forEach(function(t){var c=n(t);s.push(r(c.circle,e,t)),u.push(i(c.line,e,t)),a.push(o(c.polygon,c.polygonOutline,e,t))});else{var l=n(e);s.push(r(l.circle,e)),u.push(i(l.line,e)),a.push(o(l.polygon,l.polygonOutline,e))}}),a.concat(u).concat(s)}function s(t,e,n){n=Object.assign({backgroundColor:"#fff"},n);var r={id:"background",type:"background",paint:{"background-color":n.backgroundColor}},o={};return Object.keys(t.sources).forEach(function(e){var n=t.sources[e];"raster"!==n.type&&(o[e]=n)}),Object.assign(t,{layers:[r].concat(e),soources:o})}n.polygonLayer=o,n.lineLayer=i,n.circleLayer=r,n.generateInspectStyle=s,n.generateColoredLayers=a},{}],7:[function(t,e,n){(function(t){function r(t,e){for(var n=-1,r=t?t.length:0;++n<r;)if(e(t[n],n,t))return!0;return!1}function o(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}function i(t){return function(e){return t(e)}}function a(t,e){return null==t?void 0:t[e]}function s(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function u(t){var e=-1,n=Array(t.size);return t.forEach(function(t,r){n[++e]=[r,t]}),n}function c(t,e){return function(n){return t(e(n))}}function l(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}function p(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function f(){this.__data__=je?je(null):{}}function h(t){return this.has(t)&&delete this.__data__[t]}function y(t){var e=this.__data__;if(je){var n=e[t];return n===ht?void 0:n}return ce.call(e,t)?e[t]:void 0}function d(t){var e=this.__data__;return je?void 0!==e[t]:ce.call(e,t)}function g(t,e){var n=this.__data__;return n[t]=je&&void 0===e?ht:e,this}function _(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function v(){this.__data__=[]}function b(t){var e=this.__data__,n=N(e,t);if(n<0)return!1;var r=e.length-1;return n==r?e.pop():de.call(e,n,1),!0}function m(t){var e=this.__data__,n=N(e,t);return n<0?void 0:e[n][1]}function w(t){return N(this.__data__,t)>-1}function j(t,e){var n=this.__data__,r=N(n,t);return r<0?n.push([t,e]):n[r][1]=e,this}function M(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function S(){this.__data__={hash:new p,map:new(ve||_),string:new p}}function I(t){return X(this,t).delete(t)}function x(t){return X(this,t).get(t)}function k(t){return X(this,t).has(t)}function O(t,e){return X(this,t).set(t,e),this}function C(t){var e=-1,n=t?t.length:0;for(this.__data__=new M;++e<n;)this.add(t[e])}function A(t){return this.__data__.set(t,ht),this}function L(t){return this.__data__.has(t)}function P(t){this.__data__=new _(t)}function E(){this.__data__=new _}function T(t){return this.__data__.delete(t)}function R(t){return this.__data__.get(t)}function $(t){return this.__data__.has(t)}function B(t,e){var n=this.__data__;if(n instanceof _){var r=n.__data__;if(!ve||r.length<ft-1)return r.push([t,e]),this;n=this.__data__=new M(r)}return n.set(t,e),this}function F(t,e){var n=Le(t)||rt(t)?o(t.length,String):[],r=n.length,i=!!r;for(var a in t)!e&&!ce.call(t,a)||i&&("length"==a||Q(a,r))||n.push(a);return n}function N(t,e){for(var n=t.length;n--;)if(nt(t[n][0],e))return n;return-1}function q(t){return le.call(t)}function z(t,e,n,r,o){return t===e||(null==t||null==e||!ct(t)&&!lt(e)?t!==t&&e!==e:U(t,e,z,n,r,o))}function U(t,e,n,r,o,i){var a=Le(t),u=Le(e),c=vt,l=vt;a||(c=Ae(t),c=c==_t?xt:c),u||(l=Ae(e),l=l==_t?xt:l);var p=c==xt&&!s(t),f=l==xt&&!s(e),h=c==l;if(h&&!p)return i||(i=new P),a||Pe(t)?J(t,e,n,r,o,i):V(t,e,c,n,r,o,i);if(!(o&dt)){var y=p&&ce.call(t,"__wrapped__"),d=f&&ce.call(e,"__wrapped__");if(y||d){var g=y?t.value():t,_=d?e.value():e;return i||(i=new P),n(g,_,r,o,i)}}return!!h&&(i||(i=new P),W(t,e,n,r,o,i))}function D(t){if(!ct(t)||Z(t))return!1;var e=st(t)||s(t)?pe:Ht;return e.test(et(t))}function G(t){return lt(t)&&ut(t.length)&&!!Vt[le.call(t)]}function H(t){if(!tt(t))return ge(t);var e=[];for(var n in Object(t))ce.call(t,n)&&"constructor"!=n&&e.push(n);return e}function J(t,e,n,o,i,a){var s=i&dt,u=t.length,c=e.length;if(u!=c&&!(s&&c>u))return!1;var l=a.get(t);if(l&&a.get(e))return l==e;var p=-1,f=!0,h=i&yt?new C:void 0;for(a.set(t,e),a.set(e,t);++p<u;){var y=t[p],d=e[p];if(o)var g=s?o(d,y,p,e,t,a):o(y,d,p,t,e,a);if(void 0!==g){if(g)continue;f=!1;break}if(h){if(!r(e,function(t,e){if(!h.has(e)&&(y===t||n(y,t,o,i,a)))return h.add(e)})){f=!1;break}}else if(y!==d&&!n(y,d,o,i,a)){f=!1;break}}return a.delete(t),a.delete(e),f}function V(t,e,n,r,o,i,a){switch(n){case Tt:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case Et:return!(t.byteLength!=e.byteLength||!r(new he(t),new he(e)));case bt:case mt:case It:return nt(+t,+e);case wt:return t.name==e.name&&t.message==e.message;case Ot:case At:return t==e+"";case St:var s=u;case Ct:var c=i&dt;if(s||(s=l),t.size!=e.size&&!c)return!1;var p=a.get(t);if(p)return p==e;i|=yt,a.set(t,e);var f=J(s(t),s(e),r,o,i,a);return a.delete(t),f;case Lt:if(Ce)return Ce.call(t)==Ce.call(e)}return!1}function W(t,e,n,r,o,i){var a=o&dt,s=pt(t),u=s.length,c=pt(e),l=c.length;if(u!=l&&!a)return!1;for(var p=u;p--;){var f=s[p];if(!(a?f in e:ce.call(e,f)))return!1}var h=i.get(t);if(h&&i.get(e))return h==e;var y=!0;i.set(t,e),i.set(e,t);for(var d=a;++p<u;){f=s[p];var g=t[f],_=e[f];if(r)var v=a?r(_,g,f,e,t,i):r(g,_,f,t,e,i);if(!(void 0===v?g===_||n(g,_,r,o,i):v)){y=!1;break}d||(d="constructor"==f)}if(y&&!d){var b=t.constructor,m=e.constructor;b!=m&&"constructor"in t&&"constructor"in e&&!("function"==typeof b&&b instanceof b&&"function"==typeof m&&m instanceof m)&&(y=!1)}return i.delete(t),i.delete(e),y}function X(t,e){var n=t.__data__;return Y(e)?n["string"==typeof e?"string":"hash"]:n.map}function K(t,e){var n=a(t,e);return D(n)?n:void 0}function Q(t,e){return e=null==e?gt:e,!!e&&("number"==typeof t||Jt.test(t))&&t>-1&&t%1==0&&t<e}function Y(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}function Z(t){return!!se&&se in t}function tt(t){var e=t&&t.constructor,n="function"==typeof e&&e.prototype||ie;return t===n}function et(t){if(null!=t){try{return ue.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function nt(t,e){return t===e||t!==t&&e!==e}function rt(t){return it(t)&&ce.call(t,"callee")&&(!ye.call(t,"callee")||le.call(t)==_t)}function ot(t){return null!=t&&ut(t.length)&&!st(t)}function it(t){return lt(t)&&ot(t)}function at(t,e){return z(t,e)}function st(t){var e=ct(t)?le.call(t):"";return e==jt||e==Mt}function ut(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=gt}function ct(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function lt(t){return!!t&&"object"==typeof t}function pt(t){return ot(t)?F(t):H(t)}var ft=200,ht="__lodash_hash_undefined__",yt=1,dt=2,gt=9007199254740991,_t="[object Arguments]",vt="[object Array]",bt="[object Boolean]",mt="[object Date]",wt="[object Error]",jt="[object Function]",Mt="[object GeneratorFunction]",St="[object Map]",It="[object Number]",xt="[object Object]",kt="[object Promise]",Ot="[object RegExp]",Ct="[object Set]",At="[object String]",Lt="[object Symbol]",Pt="[object WeakMap]",Et="[object ArrayBuffer]",Tt="[object DataView]",Rt="[object Float32Array]",$t="[object Float64Array]",Bt="[object Int8Array]",Ft="[object Int16Array]",Nt="[object Int32Array]",qt="[object Uint8Array]",zt="[object Uint8ClampedArray]",Ut="[object Uint16Array]",Dt="[object Uint32Array]",Gt=/[\\^$.*+?()[\]{}|]/g,Ht=/^\[object .+?Constructor\]$/,Jt=/^(?:0|[1-9]\d*)$/,Vt={};Vt[Rt]=Vt[$t]=Vt[Bt]=Vt[Ft]=Vt[Nt]=Vt[qt]=Vt[zt]=Vt[Ut]=Vt[Dt]=!0,Vt[_t]=Vt[vt]=Vt[Et]=Vt[bt]=Vt[Tt]=Vt[mt]=Vt[wt]=Vt[jt]=Vt[St]=Vt[It]=Vt[xt]=Vt[Ot]=Vt[Ct]=Vt[At]=Vt[Pt]=!1;var Wt="object"==typeof t&&t&&t.Object===Object&&t,Xt="object"==typeof self&&self&&self.Object===Object&&self,Kt=Wt||Xt||Function("return this")(),Qt="object"==typeof n&&n&&!n.nodeType&&n,Yt=Qt&&"object"==typeof e&&e&&!e.nodeType&&e,Zt=Yt&&Yt.exports===Qt,te=Zt&&Wt.process,ee=function(){try{return te&&te.binding("util")}catch(t){}}(),ne=ee&&ee.isTypedArray,re=Array.prototype,oe=Function.prototype,ie=Object.prototype,ae=Kt["__core-js_shared__"],se=function(){var t=/[^.]+$/.exec(ae&&ae.keys&&ae.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),ue=oe.toString,ce=ie.hasOwnProperty,le=ie.toString,pe=RegExp("^"+ue.call(ce).replace(Gt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),fe=Kt.Symbol,he=Kt.Uint8Array,ye=ie.propertyIsEnumerable,de=re.splice,ge=c(Object.keys,Object),_e=K(Kt,"DataView"),ve=K(Kt,"Map"),be=K(Kt,"Promise"),me=K(Kt,"Set"),we=K(Kt,"WeakMap"),je=K(Object,"create"),Me=et(_e),Se=et(ve),Ie=et(be),xe=et(me),ke=et(we),Oe=fe?fe.prototype:void 0,Ce=Oe?Oe.valueOf:void 0;p.prototype.clear=f,p.prototype.delete=h,p.prototype.get=y,p.prototype.has=d,p.prototype.set=g,_.prototype.clear=v,_.prototype.delete=b,_.prototype.get=m,_.prototype.has=w,_.prototype.set=j,M.prototype.clear=S,M.prototype.delete=I,M.prototype.get=x,M.prototype.has=k,M.prototype.set=O,C.prototype.add=C.prototype.push=A,C.prototype.has=L,P.prototype.clear=E,P.prototype.delete=T,P.prototype.get=R,P.prototype.has=$,P.prototype.set=B;var Ae=q;(_e&&Ae(new _e(new ArrayBuffer(1)))!=Tt||ve&&Ae(new ve)!=St||be&&Ae(be.resolve())!=kt||me&&Ae(new me)!=Ct||we&&Ae(new we)!=Pt)&&(Ae=function(t){var e=le.call(t),n=e==xt?t.constructor:void 0,r=n?et(n):void 0;if(r)switch(r){case Me:return Tt;case Se:return St;case Ie:return kt;case xe:return Ct;case ke:return Pt}return e});var Le=Array.isArray,Pe=ne?i(ne):G;e.exports=at}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,n,r){!function(e,o){if("function"==typeof t&&t.amd)t([],o);else if("object"==typeof r){var i=o();"object"==typeof n&&n&&n.exports&&(r=n.exports=i),r.randomColor=i}else e.randomColor=o()}(this,function(){function t(t){var e=i(t.hue),n=u(e);return n<0&&(n=360+n),n}function e(t,e){if("random"===e.luminosity)return u([0,100]);if("monochrome"===e.hue)return 0;var n=a(t),r=n[0],o=n[1];switch(e.luminosity){case"bright":r=55;break;case"dark":r=o-10;break;case"light":o=55}return u([r,o])}function n(t,e,n){var r=o(t,e),i=100;switch(n.luminosity){case"dark":i=r+20;break;case"light":r=(i+r)/2;break;case"random":r=0,i=100}return u([r,i])}function r(t,e){switch(e.format){case"hsvArray":return t;case"hslArray":return h(t);case"hsl":var n=h(t);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var r=h(t);return"hsla("+r[0]+", "+r[1]+"%, "+r[2]+"%, "+Math.random()+")";case"rgbArray":return f(t);case"rgb":var o=f(t);return"rgb("+o.join(", ")+")";case"rgba":var i=f(t);return"rgba("+i.join(", ")+", "+Math.random()+")";default:return c(t)}}function o(t,e){for(var n=s(t).lowerBounds,r=0;r<n.length-1;r++){var o=n[r][0],i=n[r][1],a=n[r+1][0],u=n[r+1][1];if(e>=o&&e<=a){var c=(u-i)/(a-o),l=i-c*o;return c*e+l}}return 0}function i(t){if("number"==typeof parseInt(t)){var e=parseInt(t);if(e<360&&e>0)return[e,e]}if("string"==typeof t&&g[t]){var n=g[t];if(n.hueRange)return n.hueRange}return[0,360]}function a(t){return s(t).saturationRange}function s(t){t>=334&&t<=360&&(t-=360);for(var e in g){var n=g[e];if(n.hueRange&&t>=n.hueRange[0]&&t<=n.hueRange[1])return g[e]}return"Color not found"}function u(t){if(null===d)return Math.floor(t[0]+Math.random()*(t[1]+1-t[0]));var e=t[1]||1,n=t[0]||0;d=(9301*d+49297)%233280;var r=d/233280;return Math.floor(n+r*(e-n))}function c(t){function e(t){var e=t.toString(16);return 1==e.length?"0"+e:e}var n=f(t),r="#"+e(n[0])+e(n[1])+e(n[2]);return r}function l(t,e,n){var r=n[0][0],o=n[n.length-1][0],i=n[n.length-1][1],a=n[0][1];g[t]={hueRange:e,lowerBounds:n,saturationRange:[r,o],brightnessRange:[i,a]}}function p(){l("monochrome",null,[[0,0],[100,0]]),l("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),l("orange",[19,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),l("yellow",[47,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),l("green",[63,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),l("blue",[179,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),l("purple",[258,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),l("pink",[283,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]])}function f(t){var e=t[0];0===e&&(e=1),360===e&&(e=359),e/=360;var n=t[1]/100,r=t[2]/100,o=Math.floor(6*e),i=6*e-o,a=r*(1-n),s=r*(1-i*n),u=r*(1-(1-i)*n),c=256,l=256,p=256;switch(o){case 0:c=r,l=u,p=a;break;case 1:c=s,l=r,p=a;break;case 2:c=a,l=r,p=u;break;case 3:c=a,l=s,p=r;break;case 4:c=u,l=a,p=r;break;case 5:c=r,l=a,p=s}var f=[Math.floor(255*c),Math.floor(255*l),Math.floor(255*p)];return f}function h(t){var e=t[0],n=t[1]/100,r=t[2]/100,o=(2-n)*r;return[e,Math.round(n*r/(o<1?o:2-o)*1e4)/100,o/2*100]}function y(t){for(var e=0,n=0;n!==t.length&&!(e>=Number.MAX_SAFE_INTEGER);n++)e+=t.charCodeAt(n);return e}var d=null,g={};p();var _=function(o){if(o=o||{},o.seed&&o.seed===parseInt(o.seed,10))d=o.seed;else if("string"==typeof o.seed)d=y(o.seed);else{if(void 0!==o.seed&&null!==o.seed)throw new TypeError("The seed value must be an integer or string");d=null}var i,a,s;if(null!==o.count&&void 0!==o.count){var u=o.count,c=[];for(o.count=null;u>c.length;)d&&o.seed&&(o.seed+=1),c.push(_(o));return o.count=u,c}return i=t(o),a=e(i,o),s=n(i,a,o),r([i,a,s],o)};return _})},{}]},{},[1])(1)});
!function(e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():window.wNumb=e()}(function(){"use strict";var e=["decimals","thousand","mark","prefix","suffix","encoder","decoder","negativeBefore","negative","edit","undo"];function t(e){return e.split("").reverse().join("")}function n(e,t){return e.substring(0,t.length)===t}function r(e,t,n){if((e[t]||e[n])&&e[t]===e[n])throw new Error(t)}function i(e){return"number"==typeof e&&isFinite(e)}function o(e,n,r,o,f,u,s,a,c,p,d,l){var h,g,v,m,w,x=l,y="",b="";return u&&(l=u(l)),!!i(l)&&(!1!==e&&0===parseFloat(l.toFixed(e))&&(l=0),l<0&&(h=!0,l=Math.abs(l)),!1!==e&&(w=e,m=(m=l).toString().split("e"),l=(+((m=(m=Math.round(+(m[0]+"e"+(m[1]?+m[1]+w:w)))).toString().split("e"))[0]+"e"+(m[1]?+m[1]-w:-w))).toFixed(w)),-1!==(l=l.toString()).indexOf(".")?(v=(g=l.split("."))[0],r&&(y=r+g[1])):v=l,n&&(v=t((v=t(v).match(/.{1,3}/g)).join(t(n)))),h&&a&&(b+=a),o&&(b+=o),h&&c&&(b+=c),b+=v,b+=y,f&&(b+=f),p&&(b=p(b,x)),b)}function f(e,t,r,o,f,u,s,a,c,p,d,l){var h,g,v="";return d&&(l=d(l)),!(!l||"string"!=typeof l)&&(a&&n(l,a)&&(l=l.replace(a,""),h=!0),o&&n(l,o)&&(l=l.replace(o,"")),c&&n(l,c)&&(l=l.replace(c,""),h=!0),f&&(g=f,l.slice(-1*g.length)===g)&&(l=l.slice(0,-1*f.length)),t&&(l=l.split(t).join("")),r&&(l=l.replace(r,".")),h&&(v+="-"),""!==(v=(v+=l).replace(/[^0-9\.\-.]/g,""))&&(v=Number(v),s&&(v=s(v)),!!i(v)&&v))}function u(t,n,r){var i,o=[];for(i=0;i<e.length;i+=1)o.push(t[e[i]]);return o.push(r),n.apply("",o)}return function t(n){if(!(this instanceof t))return new t(n);"object"==typeof n&&(n=function(t){var n,i,o,f={};for(void 0===t.suffix&&(t.suffix=t.postfix),n=0;n<e.length;n+=1)if(void 0===(o=t[i=e[n]]))"negative"!==i||f.negativeBefore?"mark"===i&&"."!==f.thousand?f[i]=".":f[i]=!1:f[i]="-";else if("decimals"===i){if(!(o>=0&&o<8))throw new Error(i);f[i]=o}else if("encoder"===i||"decoder"===i||"edit"===i||"undo"===i){if("function"!=typeof o)throw new Error(i);f[i]=o}else{if("string"!=typeof o)throw new Error(i);f[i]=o}return r(f,"mark","thousand"),r(f,"prefix","negative"),r(f,"prefix","negativeBefore"),f}(n),this.to=function(e){return u(n,o,e)},this.from=function(e){return u(n,f,e)})}});
!function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?module.exports=a():window.noUiSlider=a()}(function(){"use strict";function a(a){return"object"==typeof a&&"function"==typeof a.to&&"function"==typeof a.from}function b(a){a.parentElement.removeChild(a)}function c(a){return null!==a&&void 0!==a}function d(a){a.preventDefault()}function e(a){return a.filter(function(a){return!this[a]&&(this[a]=!0)},{})}function f(a,b){return Math.round(a/b)*b}function g(a,b){var c=a.getBoundingClientRect(),d=a.ownerDocument,e=d.documentElement,f=p(d);return/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(f.x=0),b?c.top+f.y-e.clientTop:c.left+f.x-e.clientLeft}function h(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function i(a,b,c){c>0&&(m(a,b),setTimeout(function(){n(a,b)},c))}function j(a){return Math.max(Math.min(a,100),0)}function k(a){return Array.isArray(a)?a:[a]}function l(a){a=String(a);var b=a.split(".");return b.length>1?b[1].length:0}function m(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function n(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function o(a,b){return a.classList?a.classList.contains(b):new RegExp("\\b"+b+"\\b").test(a.className)}function p(a){var b=void 0!==window.pageXOffset,c="CSS1Compat"===(a.compatMode||"");return{x:b?window.pageXOffset:c?a.documentElement.scrollLeft:a.body.scrollLeft,y:b?window.pageYOffset:c?a.documentElement.scrollTop:a.body.scrollTop}}function q(){return window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"}}function r(){var a=!1;try{var b=Object.defineProperty({},"passive",{get:function(){a=!0}});window.addEventListener("test",null,b)}catch(a){}return a}function s(){return window.CSS&&CSS.supports&&CSS.supports("touch-action","none")}function t(a,b){return 100/(b-a)}function u(a,b){return 100*b/(a[1]-a[0])}function v(a,b){return u(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function w(a,b){return b*(a[1]-a[0])/100+a[0]}function x(a,b){for(var c=1;a>=b[c];)c+=1;return c}function y(a,b,c){if(c>=a.slice(-1)[0])return 100;var d=x(c,a),e=a[d-1],f=a[d],g=b[d-1],h=b[d];return g+v([e,f],c)/t(g,h)}function z(a,b,c){if(c>=100)return a.slice(-1)[0];var d=x(c,b),e=a[d-1],f=a[d],g=b[d-1];return w([e,f],(c-g)*t(g,b[d]))}function A(a,b,c,d){if(100===d)return d;var e=x(d,a),g=a[e-1],h=a[e];return c?d-g>(h-g)/2?h:g:b[e-1]?a[e-1]+f(d-a[e-1],b[e-1]):d}function B(a,b,c){var d;if("number"==typeof b&&(b=[b]),!Array.isArray(b))throw new Error("noUiSlider ("+$+"): 'range' contains invalid value.");if(d="min"===a?0:"max"===a?100:parseFloat(a),!h(d)||!h(b[0]))throw new Error("noUiSlider ("+$+"): 'range' value isn't numeric.");c.xPct.push(d),c.xVal.push(b[0]),d?c.xSteps.push(!isNaN(b[1])&&b[1]):isNaN(b[1])||(c.xSteps[0]=b[1]),c.xHighestCompleteStep.push(0)}function C(a,b,c){if(!b)return!0;c.xSteps[a]=u([c.xVal[a],c.xVal[a+1]],b)/t(c.xPct[a],c.xPct[a+1]);var d=(c.xVal[a+1]-c.xVal[a])/c.xNumSteps[a],e=Math.ceil(Number(d.toFixed(3))-1),f=c.xVal[a]+c.xNumSteps[a]*e;c.xHighestCompleteStep[a]=f}function D(a,b,c){this.xPct=[],this.xVal=[],this.xSteps=[c||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=b;var d,e=[];for(d in a)a.hasOwnProperty(d)&&e.push([a[d],d]);for(e.length&&"object"==typeof e[0][0]?e.sort(function(a,b){return a[0][0]-b[0][0]}):e.sort(function(a,b){return a[0]-b[0]}),d=0;d<e.length;d++)B(e[d][1],e[d][0],this);for(this.xNumSteps=this.xSteps.slice(0),d=0;d<this.xNumSteps.length;d++)C(d,this.xNumSteps[d],this)}function E(b){if(a(b))return!0;throw new Error("noUiSlider ("+$+"): 'format' requires 'to' and 'from' methods.")}function F(a,b){if(!h(b))throw new Error("noUiSlider ("+$+"): 'step' is not numeric.");a.singleStep=b}function G(a,b){if("object"!=typeof b||Array.isArray(b))throw new Error("noUiSlider ("+$+"): 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw new Error("noUiSlider ("+$+"): Missing 'min' or 'max' in 'range'.");if(b.min===b.max)throw new Error("noUiSlider ("+$+"): 'range' 'min' and 'max' cannot be equal.");a.spectrum=new D(b,a.snap,a.singleStep)}function H(a,b){if(b=k(b),!Array.isArray(b)||!b.length)throw new Error("noUiSlider ("+$+"): 'start' option is incorrect.");a.handles=b.length,a.start=b}function I(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider ("+$+"): 'snap' option must be a boolean.")}function J(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider ("+$+"): 'animate' option must be a boolean.")}function K(a,b){if(a.animationDuration=b,"number"!=typeof b)throw new Error("noUiSlider ("+$+"): 'animationDuration' option must be a number.")}function L(a,b){var c,d=[!1];if("lower"===b?b=[!0,!1]:"upper"===b&&(b=[!1,!0]),!0===b||!1===b){for(c=1;c<a.handles;c++)d.push(b);d.push(!1)}else{if(!Array.isArray(b)||!b.length||b.length!==a.handles+1)throw new Error("noUiSlider ("+$+"): 'connect' option doesn't match handle count.");d=b}a.connect=d}function M(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider ("+$+"): 'orientation' option is invalid.")}}function N(a,b){if(!h(b))throw new Error("noUiSlider ("+$+"): 'margin' option must be numeric.");if(0!==b&&(a.margin=a.spectrum.getMargin(b),!a.margin))throw new Error("noUiSlider ("+$+"): 'margin' option is only supported on linear sliders.")}function O(a,b){if(!h(b))throw new Error("noUiSlider ("+$+"): 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit||a.handles<2)throw new Error("noUiSlider ("+$+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function P(a,b){if(!h(b)&&!Array.isArray(b))throw new Error("noUiSlider ("+$+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(b)&&2!==b.length&&!h(b[0])&&!h(b[1]))throw new Error("noUiSlider ("+$+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==b){if(Array.isArray(b)||(b=[b,b]),a.padding=[a.spectrum.getMargin(b[0]),a.spectrum.getMargin(b[1])],!1===a.padding[0]||!1===a.padding[1])throw new Error("noUiSlider ("+$+"): 'padding' option is only supported on linear sliders.");if(a.padding[0]<0||a.padding[1]<0)throw new Error("noUiSlider ("+$+"): 'padding' option must be a positive number(s).");if(a.padding[0]+a.padding[1]>=100)throw new Error("noUiSlider ("+$+"): 'padding' option must not exceed 100% of the range.")}}function Q(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1;break;default:throw new Error("noUiSlider ("+$+"): 'direction' option was not recognized.")}}function R(a,b){if("string"!=typeof b)throw new Error("noUiSlider ("+$+"): 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0,g=b.indexOf("hover")>=0;if(e){if(2!==a.handles)throw new Error("noUiSlider ("+$+"): 'fixed' behaviour must be used with 2 handles");N(a,a.start[1]-a.start[0])}a.events={tap:c||f,drag:d,fixed:e,snap:f,hover:g}}function S(a,b){if(!1!==b)if(!0===b){a.tooltips=[];for(var c=0;c<a.handles;c++)a.tooltips.push(!0)}else{if(a.tooltips=k(b),a.tooltips.length!==a.handles)throw new Error("noUiSlider ("+$+"): must pass a formatter for all handles.");a.tooltips.forEach(function(a){if("boolean"!=typeof a&&("object"!=typeof a||"function"!=typeof a.to))throw new Error("noUiSlider ("+$+"): 'tooltips' must be passed a formatter or 'false'.")})}}function T(a,b){a.ariaFormat=b,E(b)}function U(a,b){a.format=b,E(b)}function V(a,b){if("string"!=typeof b&&!1!==b)throw new Error("noUiSlider ("+$+"): 'cssPrefix' must be a string or `false`.");a.cssPrefix=b}function W(a,b){if("object"!=typeof b)throw new Error("noUiSlider ("+$+"): 'cssClasses' must be an object.");if("string"==typeof a.cssPrefix){a.cssClasses={};for(var c in b)b.hasOwnProperty(c)&&(a.cssClasses[c]=a.cssPrefix+b[c])}else a.cssClasses=b}function X(a){var b={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,ariaFormat:_,format:_},d={step:{r:!1,t:F},start:{r:!0,t:H},connect:{r:!0,t:L},direction:{r:!0,t:Q},snap:{r:!1,t:I},animate:{r:!1,t:J},animationDuration:{r:!1,t:K},range:{r:!0,t:G},orientation:{r:!1,t:M},margin:{r:!1,t:N},limit:{r:!1,t:O},padding:{r:!1,t:P},behaviour:{r:!0,t:R},ariaFormat:{r:!1,t:T},format:{r:!1,t:U},tooltips:{r:!1,t:S},cssPrefix:{r:!0,t:V},cssClasses:{r:!0,t:W}},e={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"}};a.format&&!a.ariaFormat&&(a.ariaFormat=a.format),Object.keys(d).forEach(function(f){if(!c(a[f])&&void 0===e[f]){if(d[f].r)throw new Error("noUiSlider ("+$+"): '"+f+"' is required.");return!0}d[f].t(b,c(a[f])?a[f]:e[f])}),b.pips=a.pips;var f=document.createElement("div"),g=void 0!==f.style.msTransform,h=void 0!==f.style.transform;b.transformRule=h?"transform":g?"msTransform":"webkitTransform";var i=[["left","top"],["right","bottom"]];return b.style=i[b.dir][b.ort],b}function Y(a,c,f){function h(a,b){var c=ya.createElement("div");return b&&m(c,b),a.appendChild(c),c}function l(a,b){var d=h(a,c.cssClasses.origin),e=h(d,c.cssClasses.handle);return e.setAttribute("data-handle",b),e.setAttribute("tabindex","0"),e.setAttribute("role","slider"),e.setAttribute("aria-orientation",c.ort?"vertical":"horizontal"),0===b?m(e,c.cssClasses.handleLower):b===c.handles-1&&m(e,c.cssClasses.handleUpper),d}function t(a,b){return!!b&&h(a,c.cssClasses.connect)}function u(a,b){var d=h(b,c.cssClasses.connects);ka=[],la=[],la.push(t(d,a[0]));for(var e=0;e<c.handles;e++)ka.push(l(b,e)),ta[e]=e,la.push(t(d,a[e+1]))}function v(a){m(a,c.cssClasses.target),0===c.dir?m(a,c.cssClasses.ltr):m(a,c.cssClasses.rtl),0===c.ort?m(a,c.cssClasses.horizontal):m(a,c.cssClasses.vertical),ja=h(a,c.cssClasses.base)}function w(a,b){return!!c.tooltips[b]&&h(a.firstChild,c.cssClasses.tooltip)}function x(){var a=ka.map(w);Q("update",function(b,d,e){if(a[d]){var f=b[d];!0!==c.tooltips[d]&&(f=c.tooltips[d].to(e[d])),a[d].innerHTML=f}})}function y(){Q("update",function(a,b,d,e,f){ta.forEach(function(a){var b=ka[a],e=U(sa,a,0,!0,!0,!0),g=U(sa,a,100,!0,!0,!0),h=f[a],i=c.ariaFormat.to(d[a]);b.children[0].setAttribute("aria-valuemin",e.toFixed(1)),b.children[0].setAttribute("aria-valuemax",g.toFixed(1)),b.children[0].setAttribute("aria-valuenow",h.toFixed(1)),b.children[0].setAttribute("aria-valuetext",i)})})}function z(a,b,c){if("range"===a||"steps"===a)return va.xVal;if("count"===a){if(b<2)throw new Error("noUiSlider ("+$+"): 'values' (>= 2) required for mode 'count'.");var d=b-1,e=100/d;for(b=[];d--;)b[d]=d*e;b.push(100),a="positions"}return"positions"===a?b.map(function(a){return va.fromStepping(c?va.getStep(a):a)}):"values"===a?c?b.map(function(a){return va.fromStepping(va.getStep(va.toStepping(a)))}):b:void 0}function A(a,b,c){function d(a,b){return(a+b).toFixed(7)/1}var f={},g=va.xVal[0],h=va.xVal[va.xVal.length-1],i=!1,j=!1,k=0;return c=e(c.slice().sort(function(a,b){return a-b})),c[0]!==g&&(c.unshift(g),i=!0),c[c.length-1]!==h&&(c.push(h),j=!0),c.forEach(function(e,g){var h,l,m,n,o,p,q,r,s,t,u=e,v=c[g+1];if("steps"===b&&(h=va.xNumSteps[g]),h||(h=v-u),!1!==u&&void 0!==v)for(h=Math.max(h,1e-7),l=u;l<=v;l=d(l,h)){for(n=va.toStepping(l),o=n-k,r=o/a,s=Math.round(r),t=o/s,m=1;m<=s;m+=1)p=k+m*t,f[p.toFixed(5)]=["x",0];q=c.indexOf(l)>-1?1:"steps"===b?2:0,!g&&i&&(q=0),l===v&&j||(f[n.toFixed(5)]=[l,q]),k=n}}),f}function B(a,b,d){function e(a,b){var d=b===c.cssClasses.value,e=d?k:l,f=d?i:j;return b+" "+e[c.ort]+" "+f[a]}function f(a,f){f[1]=f[1]&&b?b(f[0],f[1]):f[1];var i=h(g,!1);i.className=e(f[1],c.cssClasses.marker),i.style[c.style]=a+"%",f[1]&&(i=h(g,!1),i.className=e(f[1],c.cssClasses.value),i.setAttribute("data-value",f[0]),i.style[c.style]=a+"%",i.innerText=d.to(f[0]))}var g=ya.createElement("div"),i=[c.cssClasses.valueNormal,c.cssClasses.valueLarge,c.cssClasses.valueSub],j=[c.cssClasses.markerNormal,c.cssClasses.markerLarge,c.cssClasses.markerSub],k=[c.cssClasses.valueHorizontal,c.cssClasses.valueVertical],l=[c.cssClasses.markerHorizontal,c.cssClasses.markerVertical];return m(g,c.cssClasses.pips),m(g,0===c.ort?c.cssClasses.pipsHorizontal:c.cssClasses.pipsVertical),Object.keys(a).forEach(function(b){f(b,a[b])}),g}function C(){na&&(b(na),na=null)}function D(a){C();var b=a.mode,c=a.density||1,d=a.filter||!1,e=a.values||!1,f=a.stepped||!1,g=z(b,e,f),h=A(c,b,g),i=a.format||{to:Math.round};return na=ra.appendChild(B(h,d,i))}function E(){var a=ja.getBoundingClientRect(),b="offset"+["Width","Height"][c.ort];return 0===c.ort?a.width||ja[b]:a.height||ja[b]}function F(a,b,d,e){var f=function(f){return!!(f=G(f,e.pageOffset,e.target||b))&&(!(ra.hasAttribute("disabled")&&!e.doNotReject)&&(!(o(ra,c.cssClasses.tap)&&!e.doNotReject)&&(!(a===oa.start&&void 0!==f.buttons&&f.buttons>1)&&((!e.hover||!f.buttons)&&(qa||f.preventDefault(),f.calcPoint=f.points[c.ort],void d(f,e))))))},g=[];return a.split(" ").forEach(function(a){b.addEventListener(a,f,!!qa&&{passive:!0}),g.push([a,f])}),g}function G(a,b,c){var d,e,f=0===a.type.indexOf("touch"),g=0===a.type.indexOf("mouse"),h=0===a.type.indexOf("pointer");if(0===a.type.indexOf("MSPointer")&&(h=!0),f){var i=function(a){return a.target===c||c.contains(a.target)};if("touchstart"===a.type){var j=Array.prototype.filter.call(a.touches,i);if(j.length>1)return!1;d=j[0].pageX,e=j[0].pageY}else{var k=Array.prototype.find.call(a.changedTouches,i);if(!k)return!1;d=k.pageX,e=k.pageY}}return b=b||p(ya),(g||h)&&(d=a.clientX+b.x,e=a.clientY+b.y),a.pageOffset=b,a.points=[d,e],a.cursor=g||h,a}function H(a){var b=a-g(ja,c.ort),d=100*b/E();return d=j(d),c.dir?100-d:d}function I(a){var b=100,c=!1;return ka.forEach(function(d,e){if(!d.hasAttribute("disabled")){var f=Math.abs(sa[e]-a);(f<b||100===f&&100===b)&&(c=e,b=f)}}),c}function J(a,b){"mouseout"===a.type&&"HTML"===a.target.nodeName&&null===a.relatedTarget&&L(a,b)}function K(a,b){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===a.buttons&&0!==b.buttonsProperty)return L(a,b);var d=(c.dir?-1:1)*(a.calcPoint-b.startCalcPoint);W(d>0,100*d/b.baseSize,b.locations,b.handleNumbers)}function L(a,b){b.handle&&(n(b.handle,c.cssClasses.active),ua-=1),b.listeners.forEach(function(a){za.removeEventListener(a[0],a[1])}),0===ua&&(n(ra,c.cssClasses.drag),_(),a.cursor&&(Aa.style.cursor="",Aa.removeEventListener("selectstart",d))),b.handleNumbers.forEach(function(a){S("change",a),S("set",a),S("end",a)})}function M(a,b){var e;if(1===b.handleNumbers.length){var f=ka[b.handleNumbers[0]];if(f.hasAttribute("disabled"))return!1;e=f.children[0],ua+=1,m(e,c.cssClasses.active)}a.stopPropagation();var g=[],h=F(oa.move,za,K,{target:a.target,handle:e,listeners:g,startCalcPoint:a.calcPoint,baseSize:E(),pageOffset:a.pageOffset,handleNumbers:b.handleNumbers,buttonsProperty:a.buttons,locations:sa.slice()}),i=F(oa.end,za,L,{target:a.target,handle:e,listeners:g,doNotReject:!0,handleNumbers:b.handleNumbers}),j=F("mouseout",za,J,{target:a.target,handle:e,listeners:g,doNotReject:!0,handleNumbers:b.handleNumbers});g.push.apply(g,h.concat(i,j)),a.cursor&&(Aa.style.cursor=getComputedStyle(a.target).cursor,ka.length>1&&m(ra,c.cssClasses.drag),Aa.addEventListener("selectstart",d,!1)),b.handleNumbers.forEach(function(a){S("start",a)})}function N(a){a.stopPropagation();var b=H(a.calcPoint),d=I(b);if(!1===d)return!1;c.events.snap||i(ra,c.cssClasses.tap,c.animationDuration),aa(d,b,!0,!0),_(),S("slide",d,!0),S("update",d,!0),S("change",d,!0),S("set",d,!0),c.events.snap&&M(a,{handleNumbers:[d]})}function O(a){var b=H(a.calcPoint),c=va.getStep(b),d=va.fromStepping(c);Object.keys(xa).forEach(function(a){"hover"===a.split(".")[0]&&xa[a].forEach(function(a){a.call(ma,d)})})}function P(a){a.fixed||ka.forEach(function(a,b){F(oa.start,a.children[0],M,{handleNumbers:[b]})}),a.tap&&F(oa.start,ja,N,{}),a.hover&&F(oa.move,ja,O,{hover:!0}),a.drag&&la.forEach(function(b,d){if(!1!==b&&0!==d&&d!==la.length-1){var e=ka[d-1],f=ka[d],g=[b];m(b,c.cssClasses.draggable),a.fixed&&(g.push(e.children[0]),g.push(f.children[0])),g.forEach(function(a){F(oa.start,a,M,{handles:[e,f],handleNumbers:[d-1,d]})})}})}function Q(a,b){xa[a]=xa[a]||[],xa[a].push(b),"update"===a.split(".")[0]&&ka.forEach(function(a,b){S("update",b)})}function R(a){var b=a&&a.split(".")[0],c=b&&a.substring(b.length);Object.keys(xa).forEach(function(a){var d=a.split(".")[0],e=a.substring(d.length);b&&b!==d||c&&c!==e||delete xa[a]})}function S(a,b,d){Object.keys(xa).forEach(function(e){var f=e.split(".")[0];a===f&&xa[e].forEach(function(a){a.call(ma,wa.map(c.format.to),b,wa.slice(),d||!1,sa.slice())})})}function T(a){return a+"%"}function U(a,b,d,e,f,g){return ka.length>1&&(e&&b>0&&(d=Math.max(d,a[b-1]+c.margin)),f&&b<ka.length-1&&(d=Math.min(d,a[b+1]-c.margin))),ka.length>1&&c.limit&&(e&&b>0&&(d=Math.min(d,a[b-1]+c.limit)),f&&b<ka.length-1&&(d=Math.max(d,a[b+1]-c.limit))),c.padding&&(0===b&&(d=Math.max(d,c.padding[0])),b===ka.length-1&&(d=Math.min(d,100-c.padding[1]))),d=va.getStep(d),!((d=j(d))===a[b]&&!g)&&d}function V(a,b){var d=c.ort;return(d?b:a)+", "+(d?a:b)}function W(a,b,c,d){var e=c.slice(),f=[!a,a],g=[a,!a];d=d.slice(),a&&d.reverse(),d.length>1?d.forEach(function(a,c){var d=U(e,a,e[a]+b,f[c],g[c],!1);!1===d?b=0:(b=d-e[a],e[a]=d)}):f=g=[!0];var h=!1;d.forEach(function(a,d){h=aa(a,c[a]+b,f[d],g[d])||h}),h&&d.forEach(function(a){S("update",a),S("slide",a)})}function Y(a,b){return c.dir?100-a-b:a}function Z(a,b){sa[a]=b,wa[a]=va.fromStepping(b);var d="translate("+V(T(Y(b,0)),"0")+")";ka[a].style[c.transformRule]=d,ba(a),ba(a+1)}function _(){ta.forEach(function(a){var b=sa[a]>50?-1:1,c=3+(ka.length+b*a);ka[a].style.zIndex=c})}function aa(a,b,c,d){return!1!==(b=U(sa,a,b,c,d,!1))&&(Z(a,b),!0)}function ba(a){if(la[a]){var b=0,d=100;0!==a&&(b=sa[a-1]),a!==la.length-1&&(d=sa[a]);var e=d-b,f="translate("+V(T(Y(b,e)),"0")+")",g="scale("+V(e/100,"1")+")";la[a].style[c.transformRule]=f+" "+g}}function ca(a,b){return null===a||!1===a||void 0===a?sa[b]:("number"==typeof a&&(a=String(a)),a=c.format.from(a),a=va.toStepping(a),!1===a||isNaN(a)?sa[b]:a)}function da(a,b){var d=k(a),e=void 0===sa[0];b=void 0===b||!!b,c.animate&&!e&&i(ra,c.cssClasses.tap,c.animationDuration),ta.forEach(function(a){aa(a,ca(d[a],a),!0,!1)}),ta.forEach(function(a){aa(a,sa[a],!0,!0)}),_(),ta.forEach(function(a){S("update",a),null!==d[a]&&b&&S("set",a)})}function ea(a){da(c.start,a)}function fa(){var a=wa.map(c.format.to);return 1===a.length?a[0]:a}function ga(){for(var a in c.cssClasses)c.cssClasses.hasOwnProperty(a)&&n(ra,c.cssClasses[a]);for(;ra.firstChild;)ra.removeChild(ra.firstChild);delete ra.noUiSlider}function ha(){return sa.map(function(a,b){var c=va.getNearbySteps(a),d=wa[b],e=c.thisStep.step,f=null;!1!==e&&d+e>c.stepAfter.startValue&&(e=c.stepAfter.startValue-d),f=d>c.thisStep.startValue?c.thisStep.step:!1!==c.stepBefore.step&&d-c.stepBefore.highestStep,100===a?e=null:0===a&&(f=null);var g=va.countStepDecimals();return null!==e&&!1!==e&&(e=Number(e.toFixed(g))),null!==f&&!1!==f&&(f=Number(f.toFixed(g))),[f,e]})}function ia(a,b){var d=fa(),e=["margin","limit","padding","range","animate","snap","step","format"];e.forEach(function(b){void 0!==a[b]&&(f[b]=a[b])});var g=X(f);e.forEach(function(b){void 0!==a[b]&&(c[b]=g[b])}),va=g.spectrum,c.margin=g.margin,c.limit=g.limit,c.padding=g.padding,c.pips&&D(c.pips),sa=[],da(a.start||d,b)}var ja,ka,la,ma,na,oa=q(),pa=s(),qa=pa&&r(),ra=a,sa=[],ta=[],ua=0,va=c.spectrum,wa=[],xa={},ya=a.ownerDocument,za=ya.documentElement,Aa=ya.body,Ba="rtl"===ya.dir||1===c.ort?0:100;return v(ra),u(c.connect,ja),P(c.events),da(c.start),ma={destroy:ga,steps:ha,on:Q,off:R,get:fa,set:da,reset:ea,__moveHandles:function(a,b,c){W(a,b,sa,c)},options:f,updateOptions:ia,target:ra,removePips:C,pips:D},c.pips&&D(c.pips),c.tooltips&&x(),y(),ma}function Z(a,b){if(!a||!a.nodeName)throw new Error("noUiSlider ("+$+"): create requires a single element, got: "+a);if(a.noUiSlider)throw new Error("noUiSlider ("+$+"): Slider was already initialized.");var c=X(b,a),d=Y(a,c,b);return a.noUiSlider=d,d}var $="11.1.0";D.prototype.getMargin=function(a){var b=this.xNumSteps[0];if(b&&a/b%1!=0)throw new Error("noUiSlider ("+$+"): 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&u(this.xVal,a)},D.prototype.toStepping=function(a){return a=y(this.xVal,this.xPct,a)},D.prototype.fromStepping=function(a){return z(this.xVal,this.xPct,a)},D.prototype.getStep=function(a){return a=A(this.xPct,this.xSteps,this.snap,a)},D.prototype.getNearbySteps=function(a){var b=x(a,this.xPct);return{stepBefore:{startValue:this.xVal[b-2],step:this.xNumSteps[b-2],highestStep:this.xHighestCompleteStep[b-2]},thisStep:{startValue:this.xVal[b-1],step:this.xNumSteps[b-1],highestStep:this.xHighestCompleteStep[b-1]},stepAfter:{startValue:this.xVal[b-0],step:this.xNumSteps[b-0],highestStep:this.xHighestCompleteStep[b-0]}}},D.prototype.countStepDecimals=function(){var a=this.xNumSteps.map(l);return Math.max.apply(null,a)},D.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var _={to:function(a){return void 0!==a&&a.toFixed(2)},from:Number};return{version:$,create:Z}});
!function(){"use strict";var t,n,r,i,u,s=!1,e="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),o="Sun Mon Tue Wed Thu Fri Sat".split(" "),c="AM PM".split(" "),a='MMMM d""x "at" h:mm tt',f="January February March April May June July August September October November December".split(" "),h="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),l=(r=/(d+|f+|F+|h+|m+|H+|M+|s+|t+|x+|y+|z+)/g,i=function(t){return"get"+(s?"UTC":"")+t},u={d:function(){return this[i("Date")]()},dd:function(){return b(this[i("Date")]())},ddd:function(){return M.call(this,!0)},dddd:function(){return M.call(this)},f:function(){return b(b(this[i("Milliseconds")](),3),6,!0).substr(0,1)},ff:function(){return b(b(this[i("Milliseconds")](),3),6,!0).substr(0,2)},fff:function(){return b(b(this[i("Milliseconds")](),3),6,!0).substr(0,3)},ffff:function(){return b(b(this[i("Milliseconds")](),3),6,!0).substr(0,4)},fffff:function(){return b(b(this[i("Milliseconds")](),3),6,!0).substr(0,5)},ffffff:function(){return b(b(this[i("Milliseconds")](),3),6,!0).substr(0,6)},F:function(){var t=b(this[i("Milliseconds")](),3).substr(0,1);return"0"===t?"":t},FF:function(){var t=b(this[i("Milliseconds")](),3).substr(0,2);return"00"===t?"":t},FFF:function(){return b(this[i("Milliseconds")](),3).substr(0,3)},FFFF:function(){return u.FFF.call(this)},FFFFF:function(){return u.FFF.call(this)},FFFFFF:function(){return u.FFF.call(this)},h:function(){var t=this[i("Hours")]();return t>12?t-12:t},hh:function(){var t=this[i("Hours")]();return b(t>12?t-12:t)},m:function(){return this[i("Minutes")]()},mm:function(){return b(this[i("Minutes")]())},H:function(){return this[i("Hours")]()},HH:function(){return b(this[i("Hours")]())},M:function(){return this[i("Month")]()+1},MM:function(){return b(this[i("Month")]()+1)},MMM:function(){return d.call(this,!0)},MMMM:function(){return d.call(this)},s:function(){return this[i("Seconds")]()},ss:function(){return b(this[i("Seconds")]())},tt:function(){return F.call(this)},x:function(){return y.call(this)},y:function(){var t=this[i("FullYear")](),n=t.toString();return t<10?t:n.substr(n.length-2)},yy:function(){return b(this[i("FullYear")](),2)},yyy:function(){var t=this[i("FullYear")](),n=t.toString();return t<1e3?b(t,3):n.substr(n.length-4)},yyyy:function(){return b(this[i("FullYear")](),4)},yyyyy:function(){return b(this[i("FullYear")](),5)},yyyyyy:function(){return b(this[i("FullYear")](),6)},z:function(){var t=this.getTimezoneOffset();return(t>0?"-":"+")+Math.abs(t/60)},zz:function(){var t=this.getTimezoneOffset();return(t>0?"-":"+")+b(Math.abs(t/60))},zzz:function(){var t=this.getTimezoneOffset();return(t>0?"-":"+")+b(Math.abs(t/60))+":"+b(Math.abs(t/60)%1*60)}},function(){var t,n,i=this;return"string"==typeof arguments[0]?(t=arguments[0],n=arguments[1]):(t=null,n=arguments[0]),n&&(void 0!==n.asUtc&&(s=n.asUtc),n.days&&(e=n.days),n.daysAbbr&&(o=n.daysAbbr),n.designator&&(c=n.designator),n.format&&(a=n.format),n.getDateOrdinal&&(y=n.getDateOrdinal),n.months&&(f=n.months),n.monthsAbbr&&(h=n.monthsAbbr)),t||(t=a),t.replace(r,function(t,n){var r=u[n];return"function"==typeof r?r.call(i):t}).replace(/["']/g,"")}),M=function(t){var n=this.getDay();return t?o[n]:e[n]},d=function(t){var n=this.getMonth();return t?h[n]:f[n]},y=(n="th st nd rd th".split(" "),function(){var t=this.getDate();return t>3&&t<21?n[0]:n[Math.min(t%10,4)]}),F=function(){return this.getHours()>=12?c[1]:c[0]},b=(t="000000",function(n,r,i){return i?(n+t).slice(0,r?Math.min(r,t.length):2):(t+n).slice(-(r?Math.min(r,t.length):2))});Date.prototype.format=function(t,n){return l.call(this,t,n)}}();
!function(){
    "use strict";
    window._mintMap = {setOpacity: ()=>{}, onresize: ()=>{}, getLayerNameBySoureLayer:()=>{}, variableArrayCount:0, metadata: [], listOfLayersNotAdded:[], displayed:[], variableArray:[], mapInspect:{}, uiLoaded:false, autocomplete:{}, toggleClass:()=>{}, bounds:[22.4, 3.4, 37.0, 23.2], sliderData:{}};
    window.loadMapLayers = function(mapboxgl){
        // Use proxy to observe the change of displayed layer name
        // window._mintMap.listOfLayersNotAdded=[];
        const handler1 = {
          set(target, key, value) {
            // console.log(`handler1 Setting value ${key} as ${value}`);
            // console.log(target);
            // set up to display when length is changed
            target[key] = value;
            if (key === 'length' && value === window._mintMap.variableArrayCount) {
                // traversal current displayed 
                // remove source/layer not in
                // add all
                if (window._mintMap.metadata.length !== 0) {
                    console.log(window._mintMap.variableArray);
                    handle_variable();
                }
            }
            return true;//Reflect.set(...arguments);
          }
        };
        const handler2 = {
            set(target, key, value) {
                // console.log(`handler2 Setting value ${key} as ${value}`);
                target[key] = value;
                if (key === 'metadata') {
                    // console.log(target);
                    // console.log(value);
                    window._mintMap.listOfLayersNotAdded=[];
                    let json = value;
                    for (var i = 0; i < json.layerNames.length; i++) {
                        if (!json.hasData[i]) {
                            window._mintMap.listOfLayersNotAdded.push({
                                label:json.layerNames[i] + " (No data)", 
                                value: json.layerNames[i], 
                                id: json.layerIds[i], 
                                hasData: json.hasData[i], 
                                source: json.sourceLayers[i], 
                                file:"",
                                hasTimeline:false
                            });    
                        }else{
                            // if (json.layerNames[i] != window.__defaultLayerName) {
                            window._mintMap.listOfLayersNotAdded.push({
                                label:json.layerNames[i], 
                                value: json.layerNames[i], 
                                id: json.layerIds[i], 
                                hasData: json.hasData[i], 
                                source: json.sourceLayers[i], 
                                file: json.layers[i].file,
                                hasTimeline: json.hasTimeline[i]
                            });
                            // }
                        }
                    }
                    if (window._mintMap.variableArray.length !== 0) {
                        handle_variable();
                    }
                }
                return true;
                // return Reflect.set(...arguments);
            }
        }
        const variableArrayObserver = new Proxy(window._mintMap.variableArray, handler1);
        const mintMapObserver = new Proxy(window._mintMap, handler2);
        // window.__defaultLayerName = 'Landuse';
        // window.__defaultLayerMD5 = '';
        mapboxgl.accessToken = 'pk.eyJ1IjoibGlib2xpdSIsImEiOiJjamZ1cXc1cGIwNHlhMnhsYWx0amRrbmdrIn0.d2s82GJZj56n2QUN2WGNsA';

        // liboliu.716mmt4v
        var _mintMapShadowRoot = window._polymerMap.mint_map_element;
        
        var map = new mapboxgl.Map({
            container: _mintMapShadowRoot.querySelector('#map'), // container id
            style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
            // center: [29.7,7.9], // starting position [lng, lat]
            center: [26.3,7.6],
            zoom: 5, // starting zoom
        });
        window._mintMap.map = map;
        map.resize();
        setTimeout(function () {
            map.resize();
        }, 1000);

        window._isMapLoaded = true;
        window._mintMap.onVariablesChanged = function (variables) {
            if (!Array.isArray(variables)) {
                console.log("Variables should be an array")
                return false;
            }
            if (variables.length === 0) {
                console.log("Variables is empty")
                return false;
            }
            let isValid = true;
            variables.forEach(function ( ele, idx) {
                if (typeof ele !== "object") {
                    isValid = false; 
                }else{
                    if (!('md5' in ele)) {
                        isValid = false;            
                    }
                }
            });
            if (!isValid) {
                console.log("Items in variables should be an object with format like {name: 'landuse', stdname: 'landuse-standard-name', md5: 'the-md5-hash-from-data-catalog', uri: 'the-uri-from-data-catalog'}")
                return false;
            }
            window._mintMap.variableArrayCount = variables.length;
            variableArrayObserver.splice(0, variableArrayObserver.length);
            variables.forEach(function (ele, idx) {
                variableArrayObserver.push(ele);
            });

            // window.__defaultLayerMD5 = variables[0].md5;
            // console.log("variables",variables);
        }
        if (typeof window._mintMapOnloadVars === 'object') {
            window._mintMap.onVariablesChanged(window._mintMapOnloadVars);
        }
        window._mintMap.onresize = function() {
              window._polymerMap.mint_map_element.style.height = window._polymerMap.mint_map_element.parentNode.host.clientHeight + "px";
              window._mintMap.map.resize();
        };
        window._mintMap.toggleClass = function(element, className){
            if (!element || !className){
                return;
            }
            
            var classString = element.className, nameIndex = classString.indexOf(className);
            if (nameIndex == -1) {
                classString += ' ' + className;
            }
            else {
                classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
            }
            element.className = classString;
        }
        window._mintMap.setOpacity = function(layerId, value, timeline = "no") {
            // map.setPaintProperty(layerId, 'fill-opacity', parseInt(value, 10) / 100);
            if (timeline !== "no") {
            	map.setPaintProperty(layerId+'_raster_' + timeline, 'raster-opacity', parseInt(value, 10) / 100);
            }else{
            	map.setPaintProperty(layerId+'_raster', 'raster-opacity', parseInt(value, 10) / 100);
            }
        }

        window._mintMap.getLayerNameBySoureLayer = function(sourceLayer) {
            let tempIdx = window._mintMap.metadata.sourceLayers.indexOf(sourceLayer);
            if (tempIdx !== -1) {
                return window._mintMap.metadata.layerNames[tempIdx];
            }
            return undefined;
        }
        /* given a query in the form "lng, lat" or "lat, lng" returns the matching
         * geographic coordinate(s) as search results in carmen geojson format,
         * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
         */
        var coordinatesGeocoder = function (query) {
            // match anything which looks like a decimal degrees coordinate pair
            var matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
            if (!matches) {
                return null;
            }

            function coordinateFeature(lng, lat) {
                return {
                    center: [lng, lat],
                    geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    place_name: 'Lat: ' + lat + ', Lng: ' + lng, // eslint-disable-line camelcase
                    place_type: ['coordinate'], // eslint-disable-line camelcase
                    properties: {},
                    type: 'Feature'
                };
            }

            var coord1 = Number(matches[1]);
            var coord2 = Number(matches[2]);
            var geocodes = [];

            if (coord1 < -90 || coord1 > 90) {
                // must be lng, lat
                geocodes.push(coordinateFeature(coord1, coord2));
            }

            if (coord2 < -90 || coord2 > 90) {
                // must be lat, lng
                geocodes.push(coordinateFeature(coord2, coord1));
            }

            if (geocodes.length === 0) {
                // else could be either lng, lat or lat, lng
                geocodes.push(coordinateFeature(coord1, coord2));
                geocodes.push(coordinateFeature(coord2, coord1));
            }

            return geocodes;
        };


        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            localGeocoder: coordinatesGeocoder,
            zoom: 10,
            bbox: [22.9,3.3,36.5,12.5],
            placeholder: "Try: 29.7, 7.9"
        });

        var mapboxInspectToolkit = {
            displayValue : function (value) {
              if (typeof value === 'undefined' || value === null) return value;
              if (value instanceof Date) return value.toLocaleString();
              if (typeof value === 'object' ||
                      typeof value === 'number' ||
                      typeof value === 'string') return value.toString();
              return value;
            },
            
            getMode: function (array) {
                if(array.length == 0)
                    return null;
                var modeMap = {};
                var maxEl = array[0], maxCount = 1;
                for(var i = 0; i < array.length; i++)
                {
                    var el = array[i];
                    if(modeMap[el] == null)
                        modeMap[el] = 1;
                    else
                        modeMap[el]++;  
                    if(modeMap[el] > maxCount)
                    {
                        maxEl = el;
                        maxCount = modeMap[el];
                    }
                }
                return maxEl;
            },
            renderProperty : function(propertyName, property) {
              return '<div class="mapbox-gl-inspect_property">' +
                '<div class="mapbox-gl-inspect_property-name">' + propertyName + '</div>' +
                '<div class="mapbox-gl-inspect_property-value">' + this.displayValue(property) + '</div>' +
                '</div>';
            },

            renderLayer : function(layerId) {
              return '<div class="mapbox-gl-inspect_layer">' + layerId + '</div>';
            },

            renderProperties : function(getModeForEachLayer) {
                var self = this;
                // var layer = feature.layer['source-layer'] || feature.layer.source;
                // var sourceProperty = self.renderLayer(layer);
                // var typeProperty = '';//self.renderProperty('$type', feature.geometry.type);
                var layersElements = [];
                Object.keys(getModeForEachLayer).map(function (layerName) {
                    var layerElement= self.renderLayer(layerName);
                    var oneLayerElement = [];
                    Object.keys(getModeForEachLayer[layerName]).map(function (propertyName) {
                        var modeValue = self.getMode(getModeForEachLayer[layerName][propertyName]);
                        if (modeValue!=null) {
                             oneLayerElement.push(layerElement + self.renderProperty(propertyName, modeValue));
                        }
                    })
                    layersElements.push(oneLayerElement.join(''));
                });
                return layersElements.join('');
                // return self.renderProperty(propertyName, feature.properties[propertyName]);
                // return [sourceProperty, typeProperty].concat(properties).join('');
            },
            calcModeForLayers: function (feature, getModeForEachLayer) {
                var self = this;
                var layer = feature.layer['source-layer'] || feature.layer.source;
                getModeForEachLayer[layer] = {};

                Object.keys(feature.properties).map(function (propertyName) {
                    if (propertyName in getModeForEachLayer[layer]) {
                        getModeForEachLayer[layer][propertyName].push(feature.properties[propertyName]);
                    }else{
                        getModeForEachLayer[layer][propertyName] = [feature.properties[propertyName]];
                    }
                });
            },
            renderFeatures : function(features) {
                var self = this;
                var getModeForEachLayer = {};

                features.map(function (ft) {
                    self.calcModeForLayers(ft, getModeForEachLayer);
                });
                return '<div class="mapbox-gl-inspect_feature">' + self.renderProperties(getModeForEachLayer) + '</div>';//.join('');
            }
        }

        map.on('load', function () {   
            window._mintMap.mapInspect = new MapboxInspect({
                showInspectButton: false,
                showMapPopup: true,
                // showInspectMapPopupOnHover:true,
                showMapPopupOnHover: false,
                showInspectMapPopupOnHover: false,
                // queryParameters: {
                //     layers: ['landuseLayer']
                // },
                renderPopup: function(features) {
                    return mapboxInspectToolkit.renderFeatures(features);
                }
            });
            map.addControl(window._mintMap.mapInspect);

            fetch("http://jonsnow.usc.edu:8081/mintmap/meta/metadata.json?ver=" + Math.random())
            .then(response => response.json())
            .then(json => {
                // console.log('loaded');
                // var layersIds = [];
                // var layerNames = [];
                // var layerIdSource = {};
                // var layerIdName = {};
                // // console.log(json.layerNames);
                // var layerNames = 
                // for (var i = 0; i < json.layerNames.length; i++) {

                    // layersIds.push(json.layerIds[i]);
                    // layerIdSource[json.layerIds[i]] = json.sourceLayers[i];
                    // layerIdName[json.layerIds[i]] = json.sourceNames[i];
                // }
                // console.log(json);
                mintMapObserver.metadata = json;                
                        
                
                var layersWrapper = document.createElement('div');
                layersWrapper.className = "settingsWrapper";
                var collapse = document.createElement('div');
                collapse.className = "collapse-control";
                collapse.innerHTML = "";
                collapse.onclick = function (e) {
                    window._mintMap.toggleClass(_mintMapShadowRoot.querySelector('.settingsWrapper'), 'slideDown');
                    window._polymerMap.mint_map_element.querySelector('.settings').scrollTo(0,0)
                }
                layersWrapper.appendChild(collapse);
                
                var layers = document.createElement('div');
                layers.className = "settings";
                layersWrapper.appendChild(layers);
                var layerSwitch = document.createElement('div');
                layerSwitch.setAttribute('id','layerSwitch');
                layers.appendChild(layerSwitch);
                
                var variableTitle = document.createElement('div');
                variableTitle.className = 'variableTitle';
                variableTitle.innerHTML = "<h2>Layers</h2>";
                layers.appendChild(variableTitle);

                var tagsList = document.createElement('div');
                tagsList.setAttribute('id','theTagList');
                tagsList.className = "layerList tags";

                var tagul = document.createElement('ul');
                tagul.setAttribute('id','the-ul-of-layer-list');
                tagul.className = 'tags-list';
                var tagSearch = document.createElement('li');
                tagSearch.setAttribute('id','the-li-of-add-new-layer');
                tagSearch.innerHTML = "<a id='add-new-layer' class='tag function-tag' onclick='this.style.display=\"none\";window._polymerMap.mint_map_element.querySelector(\"#search-new-layer\").style.display=\"block\";window._polymerMap.mint_map_element.querySelector(\"#search-new-layer\").value=\"\";window._polymerMap.mint_map_element.querySelector(\"#search-new-layer\").focus();window._polymerMap.mint_map_element.querySelector(\"#the-li-of-add-new-layer .awesomplete\").style.display = \"inline-block\";return false;'>Add New Layer</a><input id='search-new-layer' class='awesomplete' style='display:none' placeholder='Search new layers'>";

                var tagShowAll = document.createElement('li');
                tagShowAll.innerHTML = "<a id='show-all-layers' class='tag function-tag' data-show='no'>Show All Layers</a>";

                tagul.appendChild(tagSearch);
                tagul.appendChild(tagShowAll);
                tagsList.appendChild(tagul);
                layers.appendChild(tagsList);

                var layersPropertyList = document.createElement('div');
                layersPropertyList.className = "properties";
                // for (var i = 0; i < json.layerIds.length; i++) {
                //     var name = json.layerNames[i];
                //     var id = json.layerIds[i];

                // } 
                createProperitesPanel(layers, layersPropertyList, json.sourceLayers, json.layerNames, json.hasData, json.hasTimeline);
                layers.appendChild(layersPropertyList);
                _mintMapShadowRoot.querySelector('.geocoder').appendChild(geocoder.onAdd(map));
                _mintMapShadowRoot.querySelector('.geocoder').appendChild(layersWrapper);


                _mintMapShadowRoot.querySelectorAll(".property-slider").forEach(function (ele,idx) {
                    let panelId = ele.getAttribute("data-panel");
                    noUiSlider.create(ele, window._mintMap.sliderData[panelId]);
                    ele.noUiSlider.on('update', function( values, handle ) {
                        // console.log(typeof values[handle]);
                    });
                    ele.noUiSlider.on('change', function( values, handle ) {
                        // let value = this.valuesOfYear[parseInt(values[handle])];
                        // let allValuesOfYear = Object.values(this.valuesOfYear);
                        // setPaint(value, allValuesOfYear);
                        // let visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                        // console.log(window._mintMap.sliderData[panelId].extraOption , (new Date(values[handle])) );
                        let map = window._mintMap.map;
                        let d = new Date(parseInt(values[handle]));
                        if (isNaN(d.getTime())) {
                            console.log("slider time stamp is wrong!");
                            return;
                        }
                        if (window._mintMap.mapInspect._popup.isOpen()) {
                        	window._mintMap.mapInspect._popup.remove();
                        }
                        let currentOpacity = ele.parentElement.parentElement.querySelector('.opacity-slider').value;
                        let layerOptions = window._mintMap.sliderData[panelId].extraOption;
                        let step = d.format(layerOptions.stepOption.format);
                        // console.log(values);
                        let layerId = panelId + 'Layer_raster_' + step;
                        // console.log(ele.parentElement.parentElement.querySelector('.opacity-slider'), step, layerOptions.step);
                        ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', step);
                        if (step === layerOptions.step[0]) {
                            layerId = panelId + 'Layer_raster';
                            ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', "no");
                        }
                        map.setPaintProperty(layerId, 'raster-opacity', parseInt(currentOpacity, 10) / 100);
                        let visibility = map.getLayoutProperty(layerId, 'visibility');
                        if (visibility !== 'visible') {
                            map.setLayoutProperty(layerId, 'visibility', 'visible');
                        }
                        layerOptions.step.map(function (ele,idx) {
                            let tmp_layerId = panelId + 'Layer_raster_' + ele;
                            if (idx === 0) {
                                tmp_layerId = panelId + 'Layer_raster';
                            }
                            if (tmp_layerId !== layerId) {
                                map.setLayoutProperty(tmp_layerId, 'visibility', 'none');
                            }
                        })
                    });
                });


                var searchNewLayer = _mintMapShadowRoot.querySelector("#search-new-layer");
                window._mintMap.autocomplete = new Awesomplete(searchNewLayer, {
                    list: window._mintMap.listOfLayersNotAdded,
                    maxItems: 5,
                    minChars: 1,
                    autoFirst:true
                });
                Awesomplete.$.bind(searchNewLayer, { "awesomplete-selectcomplete": function (event) {
                    // console.log(event);
                    var name = event.text.value;
                    var idx = json.layerNames.indexOf(name);
                    if (idx != -1) {
                        
                        var hasLayer = addNewLayerToMap(
                            json.hasData[idx], 
                            json.layerIds[idx], 
                            json.layerNames[idx], 
                            json.sourceLayers[idx], 
                            json.hasData[idx] ? json.layers[idx].file : "",
                            json.hasTimeline[idx]);
                        if (hasLayer) {
                            window._mintMap.listOfLayersNotAdded = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
                                return obj.value !== json.layerNames[idx];
                            });
                            window._mintMap.autocomplete.list = window._mintMap.listOfLayersNotAdded;
                        }
                        
                        // var newLayer = document.createElement('li');
                        // newLayer.innerHTML = "<a href='#' class='tag " + (json.hasData[idx] ? "with-data-tag":"no-data-tag") + "' data-layer-id='"+json.layerIds[idx]+"' data-has-data='" + (json.hasData[idx] ? "true":"false") + "'>" + json.layerNames[idx] + "<div class='tag_close'></div></a>";
                        // var tagul = document.getElementById('the-ul-of-layer-list');
                        // var tagSearch = document.getElementById('the-li-of-add-new-layer');
                        // tagul.insertBefore(newLayer, tagSearch);
                        
                        // Change the style of function tag of search
                        var searchNewLayer = _mintMapShadowRoot.querySelector("#search-new-layer");
                        searchNewLayer.style.display = "none";
                        
                        var addNewLayer = _mintMapShadowRoot.querySelector("#add-new-layer");
                        addNewLayer.style.display = "block";
                        _mintMapShadowRoot.querySelector("#the-li-of-add-new-layer .awesomplete").style.display = "none";
                    }
                } });
                window._mintMap.uiLoaded = true;
            },
            error => {
                console.log(error);
            });

            map.addControl(new mapboxgl.NavigationControl());
            
        });
        function handle_variable() {
            if (!window._mintMap.uiLoaded) {
                setTimeout(handle_variable, 1000);
                return;
            }
            let value = window._mintMap.metadata;
            if (window._mintMap.variableArray.length === 0) {
                return;
            }
            let idxToBeRemoved = [];
            window._mintMap.displayed.forEach(function (ele,idx) {
                // console.log(variableArrayMD5s)
                let alreadyDisplayed = window._mintMap.variableArray.filter(function (obj) {
                    return obj.md5 === ele;
                });
                // let isDisplayed = variableArrayMD5s.indexOf(ele);
                if (alreadyDisplayed.length === 0) {
                    // remove 
                    let idx = window._mintMap.metadata.vectorMD5.indexOf(ele);
                    let sourceLayer = window._mintMap.metadata.sourceLayers[idx];
                    removeLayerFromMap(sourceLayer, window._mintMap.metadata.hasTimeline[idx]);
                    removeInspectLayers(sourceLayer + "Layer");

                    
                    updateListOfLayersNotAdded({layerName: window._mintMap.metadata.layerNames[idx],
                        layerId: window._mintMap.metadata.layerIds[idx], 
                        hasData: true,
                        sourceLayer: sourceLayer, 
                        file:"ckan",
                        hasTimeline: window._mintMap.metadata.hasTimeline[idx]
                    },
                    false);
                    // console.log(sourceLayer,{layerName:window._mintMap.getLayerNameBySoureLayer(sourceLayer)},window._mintMap.listOfLayersNotAdded);

                    updateShowAllDiv(false);
                    idxToBeRemoved.push(idx);
                }
            });
            idxToBeRemoved.forEach(function (ele, idx) {
                window._mintMap.displayed.splice(idx,1);
            })
            // window._mintMap.displayed = [];

            for (var i = 0; i < window._mintMap.variableArray.length; i++) {
                if (!("vectorMD5" in value)) {
                    break;
                }
                let md5idx = value.vectorMD5.indexOf(window._mintMap.variableArray[i].md5);
                if (md5idx === -1) {
                    continue;
                }
                let displayedIdx = window._mintMap.displayed.indexOf(value.sourceLayers[md5idx]);

                if (!hasLayerNameDisplayed(value.layerNames[md5idx])) {
                    continue;
                }
                addNewLayerToMap(value.hasData[md5idx], 
                    value.layerIds[md5idx], 
                    value.layerNames[md5idx], 
                    value.sourceLayers[md5idx], 
                    "file",
                    value.hasTimeline[md5idx]
                );
            }
        }
        function addNewLayerToMap(hasData, layerId, layerName, sourceLayer, file, hasTimeline = false) {
            if (!hasData) {
                alert('The data source of this layer has not been added! Can not be shown on the map.');
                return false;
            }
            var newLayer = document.createElement('li');
            newLayer.innerHTML = "<a class='tag " 
            + (hasData ? "with-data-tag":"no-data-tag") 
            + "' data-layer-id='"+layerId+"' data-has-data='" 
            + (hasData ? "true":"false") + "' data-source-layer='" 
            + sourceLayer + "' data-file='"+ file 
            + "' data-has-timeline='" + (hasTimeline ? "true":"false") + "'>" 
            + layerName + "<div class='tag_close'></div></a>";
            var tagul = _mintMapShadowRoot.querySelector('#the-ul-of-layer-list');
            var tagSearch = _mintMapShadowRoot.querySelector('#the-li-of-add-new-layer');
            tagul.insertBefore(newLayer, tagSearch);
            loadLayerFromJson({
                id:layerId, 
                layerName:layerName,
                'source-layer':sourceLayer,
                file:file, 
                hasTimeline: hasTimeline
            });

            return true;

        }
        function removeLayerFromMap(sourceLayer, hasTimeline = false) {
            var layerName = sourceLayer + "Layer";
            if (map.getLayer(layerName)) {
                map.removeLayer(layerName);
                map.removeLayer(layerName+"_raster");
                removeLegend(sourceLayer);
                removeInspectLayers(layerName);
                updatePropertiesSettingBy(layerName);
            }
            if (map.getLayer('boundsOfOriginalDatasets' + sourceLayer)) {
                map.removeLayer('boundsOfOriginalDatasets' + sourceLayer);
            }
            if (hasTimeline) {
                // remove all layers except the first one
                let timeLineData = window._mintMap.metadata.layers.filter(function (ele) {
                        return ele['source-layer'] === sourceLayer;
                    });
                if (timeLineData.length === 0) {
                    return;
                }
                let timelineLayer = timeLineData[0];
                let steps = timelineLayer.step;

                for (var i = 1; i < steps.length; i++) {
                    let rasterLayer = layerName + "_raster_" + steps[i];
                    let vectorLayer = layerName + "_vector_" + steps[i];
                    if (map.getLayer(rasterLayer)) {
                        map.removeLayer(rasterLayer);
                    }
                    if (map.getLayer(vectorLayer)) {
                        map.removeLayer(vectorLayer);
                    }
                }
            }
        }
        function updateInspectLayers(curLayerName) {
            if ('layers' in window._mintMap.mapInspect.options.queryParameters) {
                if (window._mintMap.mapInspect.options.queryParameters['layers'].indexOf(curLayerName) == -1) {
                    window._mintMap.mapInspect.options.queryParameters['layers'].push(curLayerName);
                }
            }else{
                window._mintMap.mapInspect.options.queryParameters['layers'] = [curLayerName]
            }
        }
        function removeInspectLayers(curLayerName) {
            if ('layers' in window._mintMap.mapInspect.options.queryParameters) {
                var idx = window._mintMap.mapInspect.options.queryParameters['layers'].indexOf(curLayerName);
                if (idx > -1) {
                    window._mintMap.mapInspect.options.queryParameters['layers'].splice(idx,1);
                }
            }
        }
        function getLastLayerId() {
            var layers = map.getStyle().layers;
            return layers[layers.length - 1].id;
        }
        function loadLayerFromJson(obj) {
            var curLayerName = obj['source-layer'] + "Layer";
            let slpos = window._mintMap.metadata.sourceLayers.indexOf(obj['source-layer']);
            if (slpos === -1) {
                console.log("NO such data");
                return false;
            }

            if (!window._mintMap.metadata.hasData[slpos]) {
                console.log("hasNoData");
                return false;
            }
            let lid = window._mintMap.metadata.layerIds[slpos];
            let layer = window._mintMap.metadata.layers.filter(function (obj) {
                return obj.id == lid;
            });            
            let tile_path = window._mintMap.metadata.tiles;
            let server = window._mintMap.metadata.server;
            if("server" in window._mintMap.metadata.layers[0])
                server = window._mintMap.metadata.layers[0].server;
            var identifier = window._mintMap.metadata.layerIds.indexOf(obj.id);
            let vectorMD5 = window._mintMap.metadata.vectorMD5[identifier];

            if (!map.getSource(window._mintMap.metadata.sourceLayers[identifier])) {
                map.addSource(window._mintMap.metadata.sourceLayers[identifier],{
                    type: 'vector',
                    tiles: [server + vectorMD5 + tile_path + '.pbf']
                });
            }

            // Start raster layer
            let rasterMD5 = window._mintMap.metadata.rasterMD5[identifier];
            let rasterLayerId = obj.id.replace('vector_pbf','raster_png');
            if (!map.getSource(rasterLayerId)) {
                map.addSource(rasterLayerId, {
                    type: 'raster',
                    tiles: [server + rasterMD5 + tile_path + '.png'],
                    bounds: window._mintMap.bounds
                });
            }
            
            map.addLayer({
                "id":curLayerName + "_raster",
                "type": 'raster',
                'source': obj.id.replace('vector_pbf','raster_png'),
                'layout': {
                    'visibility': 'visible',
                },
                'paint':{
                    'raster-opacity':0.8
                },
            });
            map.addLayer({
                "id": curLayerName,
                "type": "fill",
                "source": obj['source-layer'],
                "source-layer": obj['source-layer'],
                "layout": {
                    'visibility': 'visible'
                },
                "paint": {
                    "fill-opacity": 0.0
                }
            });
            if (obj.hasTimeline) {
                loadTilesOfTimeline(server, tile_path, identifier, obj.id, obj['source-layer'], vectorMD5);
            }
            window._mintMap.displayed.push(vectorMD5);
            updateInspectLayers(curLayerName);
            updatePropertiesSettingBy(curLayerName, false);
            updateListOfLayersNotAdded({layerName: obj.layerName, 
                layerId: obj.id, 
                hasData: true,
                sourceLayer:obj['source-layer'], 
                file:"ckan",
                hasTimeline: obj.hasTimeline
            },true);
            updateShowAllDiv(false);

            fetch("http://jonsnow.usc.edu:8081/mintmap/meta/" + obj.id + ".json?ver="+Math.random())
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                map.setPaintProperty(curLayerName, 'fill-color', JSON.parse(json.colormap));
                // map.setPaintProperty('landuseLayer', 'fill-color',styleExpression);
                updateLegend(json['legend-type'],JSON.parse(json.legend), obj['source-layer']);
                drawOriginalBound(JSON.parse(json.originalDatasetCoordinate), json['source-layer']);
                // addPropertySetting Panel
            }).catch(error => console.error(error));
        }
        function loadTilesOfTimeline(server, tile_path, identifier, layerId, sourceLayerId, vectorMD5) {
            let vectorMD5Arr = vectorMD5.split('_');
            if (vectorMD5Arr.length !== 2) {
                console.log("VectorMD5 is not designed for timeline");
                return;
            }
            let vectorMD5Prefix = vectorMD5Arr[0] + "_";

            let timeLineData = window._mintMap.metadata.layers.filter(function (ele) {
                        return ele.id === layerId;
                    });
            if (timeLineData.length === 0) {
                console.log("There is no such layer which id = " + layerId);
                return;
            }
            let timelineLayer = timeLineData[0];

            // let timelines = window._mintMap.sliderData[sourceLayerId];
            // "axis":"slider",
            // "stepType":"Time",
            // "stepOption":{"type":"string", "format":"YYYY"},
            // "step":["2012","2013","2014"]// 
            if (timelineLayer.step.length <= 1) {
                console.log("There are only one time stamp in the Timeseries");
                return;
            }

            let curLayerName = sourceLayerId + "Layer";
            
            for (var i = 1; i < timelineLayer.step.length; i++) {
                let vectorMD5_of_idx = vectorMD5Prefix + timelineLayer.step[i];
                let rasterMD5_of_idx = md5(vectorMD5_of_idx);
                let vectorSourceId_of_idx = sourceLayerId + "vector_pbf" + timelineLayer.step[i];
                let rasterSourceId_of_idx = sourceLayerId + "raster_png" + timelineLayer.step[i];

                if (!map.getSource(vectorSourceId_of_idx)) {
                    map.addSource(vectorSourceId_of_idx,{
                        type: 'vector',
                        tiles: [server + vectorMD5_of_idx + tile_path + '.pbf']
                    });
                }

                if (!map.getSource(rasterSourceId_of_idx)) {
                    map.addSource(rasterSourceId_of_idx, {
                        type: 'raster',
                        tiles: [server + rasterMD5_of_idx + tile_path + '.png'],
                        bounds: window._mintMap.bounds
                    });
                }

                let rasterLayerId_of_idx = curLayerName + "_raster_" + timelineLayer.step[i];
                let vectorLayerId_of_idx = curLayerName + "_vector_" + timelineLayer.step[i];

                if (!map.getLayer(rasterLayerId_of_idx)) {
                    map.addLayer({
                        "id": rasterLayerId_of_idx,
                        "type": 'raster',
                        'source': rasterSourceId_of_idx,
                        'layout': {
                            'visibility': 'none',
                        },
                        'paint':{
                            'raster-opacity':0.8
                        },
                    });
                }
                
                if (!map.getLayer(vectorLayerId_of_idx)) {
                    map.addLayer({
                        "id": vectorLayerId_of_idx,
                        "type": "fill",
                        "source": vectorSourceId_of_idx,
                        "source-layer": sourceLayerId,
                        "layout": {
                            'visibility': 'none'
                        },
                        "paint": {
                            "fill-opacity": 0.0
                        }
                    });
                }
                
            }
        }
        function removeLegend(sourceLayerName) {
            var legendItem = _mintMapShadowRoot.querySelector('#map-legend .legend-of-' + sourceLayerName);
            if (legendItem.parentNode) {
                legendItem.parentNode.removeChild(legendItem);
            }
        }
        function updateLegend(legendType, legend, sourceLayerName) {
            var legendElement = _mintMapShadowRoot.querySelector('#map-legend');
            // legendElement.innerHTML = '';
            var legendItem = document.createElement('div');
            legendItem.className = "legend-item legend-of-" + sourceLayerName; 
            legendElement.appendChild(legendItem);

            var legendTitle = document.createElement('div');
            legendTitle.className = 'legend-title'
            legendTitle.innerHTML = "Legend of layer <span>#" + sourceLayerName + "</span>:";
            legendItem.appendChild(legendTitle);

            var legendContent = document.createElement('div');
            legendContent.className = 'legend-legend'
            legendItem.appendChild(legendContent);

            if (legendType == 'discrete') {
                for (i = 0; i < legend.length; i++) {
                  var label = legend[i].label + "(" + legend[i].value + ")";
                  var color = legend[i].color;
                  var item = document.createElement('div');
                  var key = document.createElement('span');
                  key.className = 'legend-key';
                  key.style.backgroundColor = color;

                  var value = document.createElement('span');
                  value.innerHTML = label;
                  item.appendChild(key);
                  item.appendChild(value);
                  legendContent.appendChild(item);
                }
            }else if (legendType == 'linear') {
                var legendBar = document.createElement('div');
                legendBar.className = 'bar';
                var color = [];
                var text = [];
                for (var i = 0; i < legend.length; i++) {
                    color.push(legend[i].color);
                    text.push(legend[i].value)
                }
                legendBar.style.background = 'linear-gradient(to right, ' + color.join(',') + ')';
                legendContent.appendChild(legendBar);
                var flex = document.createElement('div');
                flex.className = 'legend-flex';
                flex.innerHTML = '<span>' + text.join('</span><span>') + '</span>';
                legendContent.appendChild(flex);
            }
        }
        function drawOriginalBound(coordinates, id="") {
            // window._mintMap.metadata
            let originalDataset = JSON.parse(window._mintMap.metadata.originalDataset);
            originalDataset.features[0].geometry.coordinates = coordinates;
            var layers = map.getStyle().layers;
            // Find the index of the first symbol layer in the map style
            var firstSymbolId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol') {
                    firstSymbolId = layers[i].id;
                    break;
                }
            }
            if (map.getLayer('boundsOfOriginalDatasets' + id)) {
                map.removeLayer('boundsOfOriginalDatasets' + id);
            }
            if (!map.getSource('boundsOfOriginalDatasets' + id)) {
                map.addLayer({
                    'id': 'boundsOfOriginalDatasets' + id,
                    'type': 'line',
                    'source': {
                        'type': 'geojson',
                        'data': originalDataset
                    },
                    'layout': {},
                    'paint': {
                        'line-width':2,
                        'line-color':'#000',
                        'line-opacity':0.8
                        // 'fill-color': '#e8e8e8',
                        // 'fill-opacity': 0.6
                    }
                },firstSymbolId);
            }else{
                map.addLayer({
                'id': 'boundsOfOriginalDatasets' + id,
                'type': 'line',
                'source': 'boundsOfOriginalDatasets' + id,
                'layout': {},
                'paint': {
                    'line-width':6,
                    'line-color':'#000',
                    'line-opacity':1
                    // 'fill-color': '#e8e8e8',
                    // 'fill-opacity': 0.6
                }
            },firstSymbolId);
            }
            
        }
        function updateShowAllDiv(isClick = true) {
            var showAllLayers = _mintMapShadowRoot.querySelector('#show-all-layers');
            var tagul = _mintMapShadowRoot.querySelector('#the-ul-of-layer-list');
            for (var i = 0; i < window._mintMap.listOfLayersNotAdded.length; i++) {
                let alreadyDisplayed = tagul.querySelector("[data-layer-id="+window._mintMap.listOfLayersNotAdded[i].id+"]");
                if (alreadyDisplayed) {
                    alreadyDisplayed.parentNode.remove();
                }
            }
            if (!isClick && showAllLayers.getAttribute('data-show') == 'no') {
                return;
            }
            
            var showAll = document.createElement('ul');
            showAll.className='tags-list';
            showAll.setAttribute('id','show-all-div');
            for (var i = 0; i < window._mintMap.listOfLayersNotAdded.length; i++) {
                var newLayer = document.createElement('li');
                newLayer.innerHTML = "<a class='tag " 
                                    + (window._mintMap.listOfLayersNotAdded[i].hasData ? "with-data-tag":"no-data-tag") 
                                    + "' data-layer-id='"+ window._mintMap.listOfLayersNotAdded[i].id +"' data-has-data='" 
                                    + (window._mintMap.listOfLayersNotAdded[i].hasData ? "true":"false") 
                                    + "' data-source-layer='" + window._mintMap.listOfLayersNotAdded[i].source 
                                    + "' data-file='"+ window._mintMap.listOfLayersNotAdded[i].file 
                                    + "' data-has-timeline='" + (window._mintMap.listOfLayersNotAdded[i].hasTimeline ? "true":"false") + "'>" 
                                    + window._mintMap.listOfLayersNotAdded[i].value 
                                    + "<div class='tag_close tag_add'></div></a>";
                showAll.appendChild(newLayer);
            }
            var clearBoth = document.createElement('div');
            clearBoth.style.clear = "both";
            showAll.appendChild(clearBoth);
            var showDiv = _mintMapShadowRoot.querySelector('#show-all-div');
            if(showDiv){
                showDiv.remove();
            }
            _mintMapShadowRoot.querySelector('#theTagList').appendChild(showAll);
            
        }

        function hasLayerNameDisplayed(layerName) {
            let temp = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
                return obj.value === layerName;
            });
            if (temp.length > 0) {
                return true;
            }
            return false;
        }
        function updateListOfLayersNotAdded(json,removeFromList = true) {
            if (removeFromList) {
                window._mintMap.listOfLayersNotAdded = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
                    return obj.value !== json.layerName;
                });
            }else{
                window._mintMap.listOfLayersNotAdded = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
                    return obj.value !== json.layerName;
                });
                if (!json.hasData) {
                    window._mintMap.listOfLayersNotAdded.unshift({label:json.layerName + " (No data)", value: json.layerName, id: json.layerId, hasData: json.hasData, source: json.sourceLayer, file:""});
                }else{
                    window._mintMap.listOfLayersNotAdded.unshift({label:json.layerName, value: json.layerName, id: json.layerId, hasData: json.hasData, source: json.sourceLayer, file:json.file, hasTimeline: json.hasTimeline});
                }
            }
            window._mintMap.autocomplete.list = window._mintMap.listOfLayersNotAdded;
        }
        _mintMapShadowRoot.addEventListener("click", function (e) {
            e.stopPropagation();
            if (e.target.classList.contains('tag_close')) {
                if (!e.target.classList.contains('tag_add')) {
                    e.target.parentElement.parentElement.remove();
                    // TODO remove the layer
                    var tag = e.target.parentElement;
                    removeLayerFromMap(tag.getAttribute('data-source-layer'), tag.getAttribute('data-has-timeline') == "true" ? true : false);
                    updateListOfLayersNotAdded({
                        layerName:tag.text, 
                        layerId: tag.getAttribute('data-layer-id'), 
                        hasData: tag.getAttribute('data-has-data') == "true" ? true : false, 
                        sourceLayer:tag.getAttribute('data-source-layer'), 
                        file:tag.getAttribute('data-file'),
                        hasTimeline: tag.getAttribute('data-has-timeline') == "true" ? true : false
                    },false)
                    updateShowAllDiv(false);
                }else{
                    // console.log(e.target);

                    var tag = e.target.parentElement;
                    // var newLayer = document.createElement('li');
                    // newLayer.innerHTML = "<a href='#' class='"+ tag.className +"' data-layer-id='"+ tag.getAttribute('data-layer-id')+"' data-has-data='" + tag.getAttribute('data-has-data') + "' data-source-layer='" + tag.getAttribute('data-source-layer') + "' data-file='"+ tag.getAttribute('data-file') +"'>" + tag.text + "<div class='tag_close'></div></a>";
                    
                    // var tagul = _mintMapShadowRoot.getElementById('the-ul-of-layer-list');
                    // var tagSearch = _mintMapShadowRoot.getElementById('the-li-of-add-new-layer');
                    // tagul.insertBefore(newLayer, tagSearch);

                    var hasLayer = addNewLayerToMap(
                        tag.getAttribute('data-has-data') === "true" ? true : false, 
                        tag.getAttribute('data-layer-id'), 
                        tag.text, 
                        tag.getAttribute('data-source-layer'), 
                        tag.getAttribute('data-file'),
                        tag.getAttribute('data-has-timeline') === "true" ? true : false
                        );
                    if (!hasLayer) {
                        return false;
                    }
                    e.target.parentElement.parentElement.remove();
                    // TODO add the layer
                    // remove from window. list of 
                    updateListOfLayersNotAdded({layerName:tag.text},true);
                    updateShowAllDiv(false);
                }
                
            }
            if (e.target.id == 'show-all-layers') {
                var sal = _mintMapShadowRoot.querySelector('#show-all-layers');
                var showDiv = _mintMapShadowRoot.querySelector('#show-all-div');
                if(showDiv){
                    showDiv.remove();
                    sal.innerHTML = "Show All Layers";
                    sal.setAttribute('data-show',"no");
                }else{
                    updateShowAllDiv();
                    sal.innerHTML = "Hide All Layers";
                    sal.setAttribute('data-show',"yes");
                }
            }
            
        });
        
        function createProperitesPanel(layers, layersPropertyList, layersIds, layerNames, haveData, haveTimeline ) {
        
            // var layersPropertyList = document.createElement('div');
            // layersPropertyList.className = "properties";
            
            for (var i = 0; i < layersIds.length; i++) {
                if (!haveData[i]) {
                    continue;
                }
                var id = layersIds[i] + "Layer";
                var name = layerNames[i];

                var layerProperty = document.createElement('div');
                layerProperty.setAttribute('id','layerById-' + id);
                layerProperty.className="card";
                layerProperty.style.display = "none";
                layerProperty.innerHTML = "<h3>" + name + " Layer Properties</h3>" 
                                         + "<div class='props'>" 
                                         + "<h4>Opacity</h4>" 
                                         + "<div class='control'>" 
                                         + "<input type='range' min='1' max='100' value='80' class='slider opacity-slider' " 
                						 + "data-time='no' "
                                         + "oninput='window._mintMap.setOpacity(\""+id+"\", this.value, this.getAttribute(\"data-time\"))'>"
                                         + "</div>";
                if (haveTimeline[i]) {
                    // console.log(layersIds[i],window._mintMap.metadata.layers);
                    // layerids is sourcelayer id!!!
                    let timeLineData = window._mintMap.metadata.layers.filter(function (ele) {
                        return ele['source-layer'] === layersIds[i];
                    })[0];
                    layerProperty.innerHTML += "<div class='props'>"
                                         + "<h4>" + timeLineData.stepType + (typeof timeLineData.stepOption.prefix === "undefined" ? "" : (" (" + timeLineData.stepOption.prefix + ")") ) + "</h4>"
                                         + '<div class="property-slider" id="property-slider-'+layersIds[i]
                                         // layerids is sourcelayer id!!!
                                         +'" data-panel="' + layersIds[i] + '"><div>'
                                         + "</div>";

                    let years = timeLineData.step.map(function (ele) {
                        if (timeLineData.stepOption.format === "yyyy") {
                      		return new Date(ele,0,1).getTime();	
                      	}else if (timeLineData.stepOption.format === "MM") {
                      		return new Date(parseInt(timeLineData.stepOption.prefix), parseInt(ele)-1,1).getTime();
                      	}
                        return (new Date(ele)).getTime();
                    });
                    console.log(years);
                    let yearsLength = years.length-1;
                    let yearRange = {
                            'min': [years[0]],
                            'max': [years[yearsLength]]
                        };
                    let yearDiff = yearRange.max - yearRange.min;
                    years.forEach(function (year, idx) {
                        if (idx === 0 || idx === yearsLength) {
                            return;
                        }
                        let percent = Math.ceil((year - years[0])/yearDiff*100) + "%";
                        yearRange[percent] = [year];
                    });
                    window._mintMap.sliderData[layersIds[i]] = {
                            start: yearRange.min, 
                            snap: true, 
                            range: yearRange, 
                            connect: [true, false],
                            // tooltips: true,
                            format: wNumb({
                                decimals: 0
                            }),
                            pips: {
                                mode: 'range',
                                density: 100,
                                format: {
                                  to: function ( value ) {
                                    return  (new Date(value)).format(timeLineData.stepOption.format);
                                  },
                                  from: function ( value ) {
                                  	if (timeLineData.stepOption.format === "yyyy") {
                                  		return new Date(value,0,1).getTime();	
                                  	}else if (timeLineData.stepOption.format === "MM") {
                                  		return new Date(value).getTime();
                                  	}
                                  	return new Date(value).getTime();
                                  }
                                }
                            },
                            extraOption: timeLineData
                        }
                }

                                         

                var isVis = map.getLayer(id); //&& map.getLayoutProperty(id, 'visibility') === "visible";
                if (isVis) {
                    if (map.getLayoutProperty(id, 'visibility') === "visible") {
                        layerProperty.style.display = "block";
                    }
                }
                layersPropertyList.appendChild(layerProperty);
                // layers.appendChild(link);
            }
        
            // body...
        }
        function updatePropertiesSettingBy(layerName, remove = true) {
            var ele = _mintMapShadowRoot.querySelector('#layerById-' + layerName);
            if (remove) {
                ele.style.display = "none";
            } else {
                ele.style.display = "block";
            }
        }
        map.on('mousemove', function (e) {
            // console.log(e);
                // e.point is the x, y coordinates of the mousemove event relative
                // to the top-left corner of the map
                // JSON.stringify(e.point) + '<br />' +
                // e.lngLat is the longitude, latitude geographical position of the event
                // JSON.stringify(e.lngLat));
        });

    }
    
}();
!function forceLoading() {
    if (window.mapboxgl && !window._isMapLoaded) {
        window.loadMapLayers(window.mapboxgl);
    }else{
        setTimeout(function() {
            if (!window._isMapLoaded) {
                forceLoading();
            }
        }, 1000);
    }
}();