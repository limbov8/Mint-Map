!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
!function(){function t(t){var e=Array.isArray(t)?{label:t[0],value:t[1]}:"object"==typeof t&&"label"in t&&"value"in t?t:{label:t,value:t};this.label=e.label||e.value,this.value=e.value}function e(t,e,i){for(var n in e){var s=e[n],r=t.input.getAttribute("data-"+n.toLowerCase());"number"==typeof s?t[n]=parseInt(r):!1===s?t[n]=null!==r:s instanceof Function?t[n]=null:t[n]=r,t[n]||0===t[n]||(t[n]=n in i?i[n]:s)}}function i(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function n(t,e){return o.call((e||document).querySelectorAll(t))}function s(){n("input.awesomplete").forEach(function(t){new r(t)})}var r=function(t,n){var s=this;Awesomplete.count=(Awesomplete.count||0)+1,this.count=Awesomplete.count,this.isOpened=!1,this.input=i(t),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-owns","awesomplete_list_"+this.count),this.input.setAttribute("role","combobox"),n=n||{},e(this,{minChars:2,maxItems:10,autoFirst:!1,data:r.DATA,filter:r.FILTER_CONTAINS,sort:!1!==n.sort&&r.SORT_BYLENGTH,item:r.ITEM,replace:r.REPLACE},n),this.index=-1,this.container=i.create("div",{className:"awesomplete",around:t}),this.ul=i.create("ul",{hidden:"hidden",role:"listbox",id:"awesomplete_list_"+this.count,inside:this.container}),this.status=i.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-atomic":!0,inside:this.container,textContent:0!=this.minChars?"Type "+this.minChars+" or more characters for results.":"Begin typing for results."}),this._events={input:{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(t){var e=t.keyCode;s.opened&&(13===e&&s.selected?(t.preventDefault(),s.select()):27===e?s.close({reason:"esc"}):38!==e&&40!==e||(t.preventDefault(),s[38===e?"previous":"next"]()))}},form:{submit:this.close.bind(this,{reason:"submit"})},ul:{mousedown:function(t){t.preventDefault()},click:function(t){var e=t.target;if(e!==this){for(;e&&!/li/i.test(e.nodeName);)e=e.parentNode;e&&0===t.button&&(t.preventDefault(),s.select(e,t.target))}}}},i.bind(this.input,this._events.input),i.bind(this.input.form,this._events.form),i.bind(this.ul,this._events.ul),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||n.list||[],r.all.push(this)};r.prototype={set list(t){if(Array.isArray(t))this._list=t;else if("string"==typeof t&&t.indexOf(",")>-1)this._list=t.split(/\s*,\s*/);else if((t=i(t))&&t.children){var e=[];o.apply(t.children).forEach(function(t){if(!t.disabled){var i=t.textContent.trim(),n=t.value||i,s=t.label||i;""!==n&&e.push({label:s,value:n})}}),this._list=e}document.activeElement===this.input&&this.evaluate()},get selected(){return this.index>-1},get opened(){return this.isOpened},close:function(t){this.opened&&(this.ul.setAttribute("hidden",""),this.isOpened=!1,this.index=-1,this.status.setAttribute("hidden",""),i.fire(this.input,"awesomplete-close",t||{}))},open:function(){this.ul.removeAttribute("hidden"),this.isOpened=!0,this.status.removeAttribute("hidden"),this.autoFirst&&-1===this.index&&this.goto(0),i.fire(this.input,"awesomplete-open")},destroy:function(){i.unbind(this.input,this._events.input),i.unbind(this.input.form,this._events.form);var t=this.container.parentNode;t.insertBefore(this.input,this.container),t.removeChild(this.container),this.input.removeAttribute("autocomplete"),this.input.removeAttribute("aria-autocomplete");var e=r.all.indexOf(this);-1!==e&&r.all.splice(e,1)},next:function(){var t=this.ul.children.length;this.goto(this.index<t-1?this.index+1:t?0:-1)},previous:function(){var t=this.ul.children.length,e=this.index-1;this.goto(this.selected&&-1!==e?e:t-1)},goto:function(t){var e=this.ul.children;this.selected&&e[this.index].setAttribute("aria-selected","false"),this.index=t,t>-1&&e.length>0&&(e[t].setAttribute("aria-selected","true"),this.status.textContent=e[t].textContent+", list item "+(t+1)+" of "+e.length,this.input.setAttribute("aria-activedescendant",this.ul.id+"_item_"+this.index),this.ul.scrollTop=e[t].offsetTop-this.ul.clientHeight+e[t].clientHeight,i.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}))},select:function(t,e){if(t?this.index=i.siblingIndex(t):t=this.ul.children[this.index],t){var n=this.suggestions[this.index];i.fire(this.input,"awesomplete-select",{text:n,origin:e||t})&&(this.replace(n),this.close({reason:"select"}),i.fire(this.input,"awesomplete-selectcomplete",{text:n}))}},evaluate:function(){var e=this,i=this.input.value;i.length>=this.minChars&&this._list&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map(function(n){return new t(e.data(n,i))}).filter(function(t){return e.filter(t,i)}),!1!==this.sort&&(this.suggestions=this.suggestions.sort(this.sort)),this.suggestions=this.suggestions.slice(0,this.maxItems),this.suggestions.forEach(function(t,n){e.ul.appendChild(e.item(t,i,n))}),0===this.ul.children.length?(this.status.textContent="No results found",this.close({reason:"nomatches"})):(this.open(),this.status.textContent=this.ul.children.length+" results found")):(this.close({reason:"nomatches"}),this.status.textContent="No results found")}},r.all=[],r.FILTER_CONTAINS=function(t,e){return RegExp(i.regExpEscape(e.trim()),"i").test(t)},r.FILTER_STARTSWITH=function(t,e){return RegExp("^"+i.regExpEscape(e.trim()),"i").test(t)},r.SORT_BYLENGTH=function(t,e){return t.length!==e.length?t.length-e.length:t<e?-1:1},r.ITEM=function(t,e,n){return i.create("li",{innerHTML:""===e.trim()?t:t.replace(RegExp(i.regExpEscape(e.trim()),"gi"),"<mark>$&</mark>"),"aria-selected":"false",id:"awesomplete_list_"+this.count+"_item_"+n})},r.REPLACE=function(t){this.input.value=t.value},r.DATA=function(t){return t},Object.defineProperty(t.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length}}),t.prototype.toString=t.prototype.valueOf=function(){return""+this.label};var o=Array.prototype.slice;i.create=function(t,e){var n=document.createElement(t);for(var s in e){var r=e[s];if("inside"===s)i(r).appendChild(n);else if("around"===s){var o=i(r);o.parentNode.insertBefore(n,o),n.appendChild(o)}else s in n?n[s]=r:n.setAttribute(s,r)}return n},i.bind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.addEventListener(e,n)})}},i.unbind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.removeEventListener(e,n)})}},i.fire=function(t,e,i){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0);for(var s in i)n[s]=i[s];return t.dispatchEvent(n)},i.regExpEscape=function(t){return t.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},i.siblingIndex=function(t){for(var e=0;t=t.previousElementSibling;e++);return e},"undefined"!=typeof Document&&("loading"!==document.readyState?s():document.addEventListener("DOMContentLoaded",s)),r.$=i,r.$$=n,"undefined"!=typeof self&&(self.Awesomplete=r),"object"==typeof module&&module.exports&&(module.exports=r)}();
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.MapboxInspect=t()}}(function(){var t;return function t(e,n,r){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){var r=t("./lib/MapboxInspect");e.exports=r},{"./lib/MapboxInspect":3}],2:[function(t,e,n){function r(t,e){var n=document.createElement("div");return n.className="mapboxgl-ctrl mapboxgl-ctrl-group",n.appendChild(t),e||(n.style.display="none"),n}function o(){var t=document.createElement("button");return t.className="mapboxgl-ctrl-icon mapboxgl-ctrl-inspect",t.type="button",t["aria-label"]="Inspect",t}function i(t){t=Object.assign({show:!0,onToggle:function(){}},t),this._btn=o(),this._btn.onclick=t.onToggle,this.elem=r(this._btn,t.show)}i.prototype.setInspectIcon=function(){this._btn.className="mapboxgl-ctrl-icon mapboxgl-ctrl-inspect"},i.prototype.setMapIcon=function(){this._btn.className="mapboxgl-ctrl-icon mapboxgl-ctrl-map"},e.exports=i},{}],3:[function(t,e,n){function r(t){return t.metadata&&t.metadata["mapbox-gl-inspect:inspect"]}function o(t){return Object.assign(t,{metadata:Object.assign({},t.metadata,{"mapbox-gl-inspect:inspect":!0})})}function i(t){return"raster"===t.type&&t.tileSize&&t.tiles?{type:t.type,tileSize:t.tileSize,tiles:t.tiles}:"raster"===t.type&&t.url?{type:t.type,url:t.url}:t}function a(t){return Object.keys(t.sources).forEach(function(e){t.sources[e]=i(t.sources[e])}),t}function s(t){var e=t.version.split(".").map(parseFloat);e[0]<1&&e[1]<29&&console.error("MapboxInspect only supports Mapbox GL JS >= v0.29.0. Please upgrade your Mapbox GL JS version.")}function u(t){if(!(this instanceof u))throw new Error("MapboxInspect needs to be called with the new keyword");var e=null;window.mapboxgl?(s(window.mapboxgl),e=new window.mapboxgl.Popup({closeButton:!1,closeOnClick:!1})):t.popup||console.error("Mapbox GL JS can not be found. Make sure to include it or pass an initialized MapboxGL Popup to MapboxInspect if you are using moduleis."),this.options=Object.assign({showInspectMap:!1,showInspectButton:!0,showInspectMapPopup:!0,showMapPopup:!1,showMapPopupOnHover:!0,showInspectMapPopupOnHover:!0,backgroundColor:"#fff",assignLayerColor:h.brightColor,buildInspectStyle:c.generateInspectStyle,renderPopup:f,popup:e,selectThreshold:5,useInspectStyle:!0,queryParameters:{},sources:{}},t),this.sources=this.options.sources,this.assignLayerColor=this.options.assignLayerColor,this.toggleInspector=this.toggleInspector.bind(this),this._popup=this.options.popup,this._showInspectMap=this.options.showInspectMap,this._onSourceChange=this._onSourceChange.bind(this),this._onMousemove=this._onMousemove.bind(this),this._onStyleChange=this._onStyleChange.bind(this),this._originalStyle=null,this._toggle=new l({show:this.options.showInspectButton,onToggle:this.toggleInspector.bind(this)})}var c=t("./stylegen"),l=t("./InspectButton"),p=t("lodash.isequal"),f=t("./renderPopup"),h=t("./colors");u.prototype.toggleInspector=function(){this._showInspectMap=!this._showInspectMap,this.render()},u.prototype._inspectStyle=function(){var t=c.generateColoredLayers(this.sources,this.assignLayerColor);return this.options.buildInspectStyle(this._map.getStyle(),t,{backgroundColor:this.options.backgroundColor})},u.prototype.render=function(){this._showInspectMap?(this.options.useInspectStyle&&this._map.setStyle(a(o(this._inspectStyle()))),this._toggle.setMapIcon()):this._originalStyle&&(this._popup&&this._popup.remove(),this.options.useInspectStyle&&this._map.setStyle(a(this._originalStyle)),this._toggle.setInspectIcon())},u.prototype._onSourceChange=function(){var t=this.sources,e=this._map,n=Object.assign({},t);Object.keys(e.style.sourceCaches).forEach(function(n){var r=e.style.sourceCaches[n]||{_source:{}},o=r._source.vectorLayerIds;o?t[n]=o:"geojson"===r._source.type&&(t[n]=[])}),p(n,t)||this.render()},u.prototype._onStyleChange=function(){var t=this._map.getStyle();r(t)||(this._originalStyle=t)},u.prototype._onMousemove=function(t){var e;e=0===this.options.selectThreshold?t.point:[[t.point.x-this.options.selectThreshold,t.point.y+this.options.selectThreshold],[t.point.x+this.options.selectThreshold,t.point.y-this.options.selectThreshold]];var n=this._map.queryRenderedFeatures(e,this.options.queryParameters)||[];if(this._map.getCanvas().style.cursor=n.length?"pointer":"",this._showInspectMap){if(!this.options.showInspectMapPopup)return;if("mousemove"===t.type&&!this.options.showInspectMapPopupOnHover)return}else{if(!this.options.showMapPopup)return;if("mousemove"===t.type&&!this.options.showMapPopupOnHover)return}this._popup&&(n.length?this._popup.setLngLat(t.lngLat).setHTML(this.options.renderPopup(n)).addTo(this._map):this._popup.remove())},u.prototype.onAdd=function(t){return this._map=t,0===Object.keys(this.sources).length&&(t.on("tiledata",this._onSourceChange),t.on("sourcedata",this._onSourceChange)),t.on("styledata",this._onStyleChange),t.on("load",this._onStyleChange),t.on("mousemove",this._onMousemove),t.on("click",this._onMousemove),this._toggle.elem},u.prototype.onRemove=function(){this._map.off("styledata",this._onStyleChange),this._map.off("load",this._onStyleChange),this._map.off("tiledata",this._onSourceChange),this._map.off("sourcedata",this._onSourceChange),this._map.off("mousemove",this._onMousemove),this._map.off("click",this._onMousemove);var t=this._toggle.elem;t.parentNode.removeChild(t),this._map=void 0},e.exports=u},{"./InspectButton":2,"./colors":4,"./renderPopup":5,"./stylegen":6,"lodash.isequal":7}],4:[function(t,e,n){function r(t,e){var n="bright",r=null;/water|ocean|lake|sea|river/.test(t)&&(r="blue"),/state|country|place/.test(t)&&(r="pink"),/road|highway|transport/.test(t)&&(r="orange"),/contour|building/.test(t)&&(r="monochrome"),/building/.test(t)&&(n="dark"),/contour|landuse/.test(t)&&(r="yellow"),/wood|forest|park|landcover/.test(t)&&(r="green");var i=o({luminosity:n,hue:r,seed:t,format:"rgbArray"}),a=i.concat([e||1]);return"rgba("+a.join(", ")+")"}var o=t("randomcolor");n.brightColor=r},{randomcolor:8}],5:[function(t,e,n){function r(t){return"undefined"==typeof t||null===t?t:t instanceof Date?t.toLocaleString():"object"==typeof t||"number"==typeof t||"string"==typeof t?t.toString():t}function o(t,e){return'<div class="mapbox-gl-inspect_property"><div class="mapbox-gl-inspect_property-name">'+t+'</div><div class="mapbox-gl-inspect_property-value">'+r(e)+"</div></div>"}function i(t){return'<div class="mapbox-gl-inspect_layer">'+t+"</div>"}function a(t){var e=i(t.layer["source-layer"]||t.layer.source),n=o("$type",t.geometry.type),r=Object.keys(t.properties).map(function(e){return o(e,t.properties[e])});return[e,n].concat(r).join("")}function s(t){return t.map(function(t){return'<div class="mapbox-gl-inspect_feature">'+a(t)+"</div>"}).join("")}function u(t){return'<div class="mapbox-gl-inspect_popup">'+s(t)+"</div>"}e.exports=u},{}],6:[function(t,e,n){function r(t,e,n){var r={id:[e,n,"circle"].join("_"),source:e,type:"circle",paint:{"circle-color":t,"circle-radius":2},filter:["==","$type","Point"]};return n&&(r["source-layer"]=n),r}function o(t,e,n,r){var o={id:[n,r,"polygon"].join("_"),source:n,type:"fill",paint:{"fill-color":t,"fill-antialias":!0,"fill-outline-color":t},filter:["==","$type","Polygon"]};return r&&(o["source-layer"]=r),o}function i(t,e,n){var r={id:[e,n,"line"].join("_"),source:e,layout:{"line-join":"round","line-cap":"round"},type:"line",paint:{"line-color":t},filter:["==","$type","LineString"]};return n&&(r["source-layer"]=n),r}function a(t,e){function n(t){var n=e.bind(null,t),r={circle:n(.8),line:n(.6),polygon:n(.3),polygonOutline:n(.6),default:n(1)};return r}var a=[],s=[],u=[];return Object.keys(t).forEach(function(e){var c=t[e];if(c&&0!==c.length)c.forEach(function(t){var c=n(t);s.push(r(c.circle,e,t)),u.push(i(c.line,e,t)),a.push(o(c.polygon,c.polygonOutline,e,t))});else{var l=n(e);s.push(r(l.circle,e)),u.push(i(l.line,e)),a.push(o(l.polygon,l.polygonOutline,e))}}),a.concat(u).concat(s)}function s(t,e,n){n=Object.assign({backgroundColor:"#fff"},n);var r={id:"background",type:"background",paint:{"background-color":n.backgroundColor}},o={};return Object.keys(t.sources).forEach(function(e){var n=t.sources[e];"raster"!==n.type&&(o[e]=n)}),Object.assign(t,{layers:[r].concat(e),soources:o})}n.polygonLayer=o,n.lineLayer=i,n.circleLayer=r,n.generateInspectStyle=s,n.generateColoredLayers=a},{}],7:[function(t,e,n){(function(t){function r(t,e){for(var n=-1,r=t?t.length:0;++n<r;)if(e(t[n],n,t))return!0;return!1}function o(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}function i(t){return function(e){return t(e)}}function a(t,e){return null==t?void 0:t[e]}function s(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function u(t){var e=-1,n=Array(t.size);return t.forEach(function(t,r){n[++e]=[r,t]}),n}function c(t,e){return function(n){return t(e(n))}}function l(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}function p(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function f(){this.__data__=je?je(null):{}}function h(t){return this.has(t)&&delete this.__data__[t]}function y(t){var e=this.__data__;if(je){var n=e[t];return n===ht?void 0:n}return ce.call(e,t)?e[t]:void 0}function d(t){var e=this.__data__;return je?void 0!==e[t]:ce.call(e,t)}function g(t,e){var n=this.__data__;return n[t]=je&&void 0===e?ht:e,this}function _(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function v(){this.__data__=[]}function b(t){var e=this.__data__,n=N(e,t);if(n<0)return!1;var r=e.length-1;return n==r?e.pop():de.call(e,n,1),!0}function m(t){var e=this.__data__,n=N(e,t);return n<0?void 0:e[n][1]}function w(t){return N(this.__data__,t)>-1}function j(t,e){var n=this.__data__,r=N(n,t);return r<0?n.push([t,e]):n[r][1]=e,this}function M(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function S(){this.__data__={hash:new p,map:new(ve||_),string:new p}}function I(t){return X(this,t).delete(t)}function x(t){return X(this,t).get(t)}function k(t){return X(this,t).has(t)}function O(t,e){return X(this,t).set(t,e),this}function C(t){var e=-1,n=t?t.length:0;for(this.__data__=new M;++e<n;)this.add(t[e])}function A(t){return this.__data__.set(t,ht),this}function L(t){return this.__data__.has(t)}function P(t){this.__data__=new _(t)}function E(){this.__data__=new _}function T(t){return this.__data__.delete(t)}function R(t){return this.__data__.get(t)}function $(t){return this.__data__.has(t)}function B(t,e){var n=this.__data__;if(n instanceof _){var r=n.__data__;if(!ve||r.length<ft-1)return r.push([t,e]),this;n=this.__data__=new M(r)}return n.set(t,e),this}function F(t,e){var n=Le(t)||rt(t)?o(t.length,String):[],r=n.length,i=!!r;for(var a in t)!e&&!ce.call(t,a)||i&&("length"==a||Q(a,r))||n.push(a);return n}function N(t,e){for(var n=t.length;n--;)if(nt(t[n][0],e))return n;return-1}function q(t){return le.call(t)}function z(t,e,n,r,o){return t===e||(null==t||null==e||!ct(t)&&!lt(e)?t!==t&&e!==e:U(t,e,z,n,r,o))}function U(t,e,n,r,o,i){var a=Le(t),u=Le(e),c=vt,l=vt;a||(c=Ae(t),c=c==_t?xt:c),u||(l=Ae(e),l=l==_t?xt:l);var p=c==xt&&!s(t),f=l==xt&&!s(e),h=c==l;if(h&&!p)return i||(i=new P),a||Pe(t)?J(t,e,n,r,o,i):V(t,e,c,n,r,o,i);if(!(o&dt)){var y=p&&ce.call(t,"__wrapped__"),d=f&&ce.call(e,"__wrapped__");if(y||d){var g=y?t.value():t,_=d?e.value():e;return i||(i=new P),n(g,_,r,o,i)}}return!!h&&(i||(i=new P),W(t,e,n,r,o,i))}function D(t){if(!ct(t)||Z(t))return!1;var e=st(t)||s(t)?pe:Ht;return e.test(et(t))}function G(t){return lt(t)&&ut(t.length)&&!!Vt[le.call(t)]}function H(t){if(!tt(t))return ge(t);var e=[];for(var n in Object(t))ce.call(t,n)&&"constructor"!=n&&e.push(n);return e}function J(t,e,n,o,i,a){var s=i&dt,u=t.length,c=e.length;if(u!=c&&!(s&&c>u))return!1;var l=a.get(t);if(l&&a.get(e))return l==e;var p=-1,f=!0,h=i&yt?new C:void 0;for(a.set(t,e),a.set(e,t);++p<u;){var y=t[p],d=e[p];if(o)var g=s?o(d,y,p,e,t,a):o(y,d,p,t,e,a);if(void 0!==g){if(g)continue;f=!1;break}if(h){if(!r(e,function(t,e){if(!h.has(e)&&(y===t||n(y,t,o,i,a)))return h.add(e)})){f=!1;break}}else if(y!==d&&!n(y,d,o,i,a)){f=!1;break}}return a.delete(t),a.delete(e),f}function V(t,e,n,r,o,i,a){switch(n){case Tt:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case Et:return!(t.byteLength!=e.byteLength||!r(new he(t),new he(e)));case bt:case mt:case It:return nt(+t,+e);case wt:return t.name==e.name&&t.message==e.message;case Ot:case At:return t==e+"";case St:var s=u;case Ct:var c=i&dt;if(s||(s=l),t.size!=e.size&&!c)return!1;var p=a.get(t);if(p)return p==e;i|=yt,a.set(t,e);var f=J(s(t),s(e),r,o,i,a);return a.delete(t),f;case Lt:if(Ce)return Ce.call(t)==Ce.call(e)}return!1}function W(t,e,n,r,o,i){var a=o&dt,s=pt(t),u=s.length,c=pt(e),l=c.length;if(u!=l&&!a)return!1;for(var p=u;p--;){var f=s[p];if(!(a?f in e:ce.call(e,f)))return!1}var h=i.get(t);if(h&&i.get(e))return h==e;var y=!0;i.set(t,e),i.set(e,t);for(var d=a;++p<u;){f=s[p];var g=t[f],_=e[f];if(r)var v=a?r(_,g,f,e,t,i):r(g,_,f,t,e,i);if(!(void 0===v?g===_||n(g,_,r,o,i):v)){y=!1;break}d||(d="constructor"==f)}if(y&&!d){var b=t.constructor,m=e.constructor;b!=m&&"constructor"in t&&"constructor"in e&&!("function"==typeof b&&b instanceof b&&"function"==typeof m&&m instanceof m)&&(y=!1)}return i.delete(t),i.delete(e),y}function X(t,e){var n=t.__data__;return Y(e)?n["string"==typeof e?"string":"hash"]:n.map}function K(t,e){var n=a(t,e);return D(n)?n:void 0}function Q(t,e){return e=null==e?gt:e,!!e&&("number"==typeof t||Jt.test(t))&&t>-1&&t%1==0&&t<e}function Y(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}function Z(t){return!!se&&se in t}function tt(t){var e=t&&t.constructor,n="function"==typeof e&&e.prototype||ie;return t===n}function et(t){if(null!=t){try{return ue.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function nt(t,e){return t===e||t!==t&&e!==e}function rt(t){return it(t)&&ce.call(t,"callee")&&(!ye.call(t,"callee")||le.call(t)==_t)}function ot(t){return null!=t&&ut(t.length)&&!st(t)}function it(t){return lt(t)&&ot(t)}function at(t,e){return z(t,e)}function st(t){var e=ct(t)?le.call(t):"";return e==jt||e==Mt}function ut(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=gt}function ct(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function lt(t){return!!t&&"object"==typeof t}function pt(t){return ot(t)?F(t):H(t)}var ft=200,ht="__lodash_hash_undefined__",yt=1,dt=2,gt=9007199254740991,_t="[object Arguments]",vt="[object Array]",bt="[object Boolean]",mt="[object Date]",wt="[object Error]",jt="[object Function]",Mt="[object GeneratorFunction]",St="[object Map]",It="[object Number]",xt="[object Object]",kt="[object Promise]",Ot="[object RegExp]",Ct="[object Set]",At="[object String]",Lt="[object Symbol]",Pt="[object WeakMap]",Et="[object ArrayBuffer]",Tt="[object DataView]",Rt="[object Float32Array]",$t="[object Float64Array]",Bt="[object Int8Array]",Ft="[object Int16Array]",Nt="[object Int32Array]",qt="[object Uint8Array]",zt="[object Uint8ClampedArray]",Ut="[object Uint16Array]",Dt="[object Uint32Array]",Gt=/[\\^$.*+?()[\]{}|]/g,Ht=/^\[object .+?Constructor\]$/,Jt=/^(?:0|[1-9]\d*)$/,Vt={};Vt[Rt]=Vt[$t]=Vt[Bt]=Vt[Ft]=Vt[Nt]=Vt[qt]=Vt[zt]=Vt[Ut]=Vt[Dt]=!0,Vt[_t]=Vt[vt]=Vt[Et]=Vt[bt]=Vt[Tt]=Vt[mt]=Vt[wt]=Vt[jt]=Vt[St]=Vt[It]=Vt[xt]=Vt[Ot]=Vt[Ct]=Vt[At]=Vt[Pt]=!1;var Wt="object"==typeof t&&t&&t.Object===Object&&t,Xt="object"==typeof self&&self&&self.Object===Object&&self,Kt=Wt||Xt||Function("return this")(),Qt="object"==typeof n&&n&&!n.nodeType&&n,Yt=Qt&&"object"==typeof e&&e&&!e.nodeType&&e,Zt=Yt&&Yt.exports===Qt,te=Zt&&Wt.process,ee=function(){try{return te&&te.binding("util")}catch(t){}}(),ne=ee&&ee.isTypedArray,re=Array.prototype,oe=Function.prototype,ie=Object.prototype,ae=Kt["__core-js_shared__"],se=function(){var t=/[^.]+$/.exec(ae&&ae.keys&&ae.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),ue=oe.toString,ce=ie.hasOwnProperty,le=ie.toString,pe=RegExp("^"+ue.call(ce).replace(Gt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),fe=Kt.Symbol,he=Kt.Uint8Array,ye=ie.propertyIsEnumerable,de=re.splice,ge=c(Object.keys,Object),_e=K(Kt,"DataView"),ve=K(Kt,"Map"),be=K(Kt,"Promise"),me=K(Kt,"Set"),we=K(Kt,"WeakMap"),je=K(Object,"create"),Me=et(_e),Se=et(ve),Ie=et(be),xe=et(me),ke=et(we),Oe=fe?fe.prototype:void 0,Ce=Oe?Oe.valueOf:void 0;p.prototype.clear=f,p.prototype.delete=h,p.prototype.get=y,p.prototype.has=d,p.prototype.set=g,_.prototype.clear=v,_.prototype.delete=b,_.prototype.get=m,_.prototype.has=w,_.prototype.set=j,M.prototype.clear=S,M.prototype.delete=I,M.prototype.get=x,M.prototype.has=k,M.prototype.set=O,C.prototype.add=C.prototype.push=A,C.prototype.has=L,P.prototype.clear=E,P.prototype.delete=T,P.prototype.get=R,P.prototype.has=$,P.prototype.set=B;var Ae=q;(_e&&Ae(new _e(new ArrayBuffer(1)))!=Tt||ve&&Ae(new ve)!=St||be&&Ae(be.resolve())!=kt||me&&Ae(new me)!=Ct||we&&Ae(new we)!=Pt)&&(Ae=function(t){var e=le.call(t),n=e==xt?t.constructor:void 0,r=n?et(n):void 0;if(r)switch(r){case Me:return Tt;case Se:return St;case Ie:return kt;case xe:return Ct;case ke:return Pt}return e});var Le=Array.isArray,Pe=ne?i(ne):G;e.exports=at}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,n,r){!function(e,o){if("function"==typeof t&&t.amd)t([],o);else if("object"==typeof r){var i=o();"object"==typeof n&&n&&n.exports&&(r=n.exports=i),r.randomColor=i}else e.randomColor=o()}(this,function(){function t(t){var e=i(t.hue),n=u(e);return n<0&&(n=360+n),n}function e(t,e){if("random"===e.luminosity)return u([0,100]);if("monochrome"===e.hue)return 0;var n=a(t),r=n[0],o=n[1];switch(e.luminosity){case"bright":r=55;break;case"dark":r=o-10;break;case"light":o=55}return u([r,o])}function n(t,e,n){var r=o(t,e),i=100;switch(n.luminosity){case"dark":i=r+20;break;case"light":r=(i+r)/2;break;case"random":r=0,i=100}return u([r,i])}function r(t,e){switch(e.format){case"hsvArray":return t;case"hslArray":return h(t);case"hsl":var n=h(t);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var r=h(t);return"hsla("+r[0]+", "+r[1]+"%, "+r[2]+"%, "+Math.random()+")";case"rgbArray":return f(t);case"rgb":var o=f(t);return"rgb("+o.join(", ")+")";case"rgba":var i=f(t);return"rgba("+i.join(", ")+", "+Math.random()+")";default:return c(t)}}function o(t,e){for(var n=s(t).lowerBounds,r=0;r<n.length-1;r++){var o=n[r][0],i=n[r][1],a=n[r+1][0],u=n[r+1][1];if(e>=o&&e<=a){var c=(u-i)/(a-o),l=i-c*o;return c*e+l}}return 0}function i(t){if("number"==typeof parseInt(t)){var e=parseInt(t);if(e<360&&e>0)return[e,e]}if("string"==typeof t&&g[t]){var n=g[t];if(n.hueRange)return n.hueRange}return[0,360]}function a(t){return s(t).saturationRange}function s(t){t>=334&&t<=360&&(t-=360);for(var e in g){var n=g[e];if(n.hueRange&&t>=n.hueRange[0]&&t<=n.hueRange[1])return g[e]}return"Color not found"}function u(t){if(null===d)return Math.floor(t[0]+Math.random()*(t[1]+1-t[0]));var e=t[1]||1,n=t[0]||0;d=(9301*d+49297)%233280;var r=d/233280;return Math.floor(n+r*(e-n))}function c(t){function e(t){var e=t.toString(16);return 1==e.length?"0"+e:e}var n=f(t),r="#"+e(n[0])+e(n[1])+e(n[2]);return r}function l(t,e,n){var r=n[0][0],o=n[n.length-1][0],i=n[n.length-1][1],a=n[0][1];g[t]={hueRange:e,lowerBounds:n,saturationRange:[r,o],brightnessRange:[i,a]}}function p(){l("monochrome",null,[[0,0],[100,0]]),l("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),l("orange",[19,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),l("yellow",[47,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),l("green",[63,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),l("blue",[179,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),l("purple",[258,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),l("pink",[283,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]])}function f(t){var e=t[0];0===e&&(e=1),360===e&&(e=359),e/=360;var n=t[1]/100,r=t[2]/100,o=Math.floor(6*e),i=6*e-o,a=r*(1-n),s=r*(1-i*n),u=r*(1-(1-i)*n),c=256,l=256,p=256;switch(o){case 0:c=r,l=u,p=a;break;case 1:c=s,l=r,p=a;break;case 2:c=a,l=r,p=u;break;case 3:c=a,l=s,p=r;break;case 4:c=u,l=a,p=r;break;case 5:c=r,l=a,p=s}var f=[Math.floor(255*c),Math.floor(255*l),Math.floor(255*p)];return f}function h(t){var e=t[0],n=t[1]/100,r=t[2]/100,o=(2-n)*r;return[e,Math.round(n*r/(o<1?o:2-o)*1e4)/100,o/2*100]}function y(t){for(var e=0,n=0;n!==t.length&&!(e>=Number.MAX_SAFE_INTEGER);n++)e+=t.charCodeAt(n);return e}var d=null,g={};p();var _=function(o){if(o=o||{},o.seed&&o.seed===parseInt(o.seed,10))d=o.seed;else if("string"==typeof o.seed)d=y(o.seed);else{if(void 0!==o.seed&&null!==o.seed)throw new TypeError("The seed value must be an integer or string");d=null}var i,a,s;if(null!==o.count&&void 0!==o.count){var u=o.count,c=[];for(o.count=null;u>c.length;)d&&o.seed&&(o.seed+=1),c.push(_(o));return o.count=u,c}return i=t(o),a=e(i,o),s=n(i,a,o),r([i,a,s],o)};return _})},{}]},{},[1])(1)});
window.loadMapLayers = function(mapboxgl){

    window._mintMap = {};
    window.__defaultLayerName = 'Landuse';
    mapboxgl.accessToken = 'pk.eyJ1IjoibGlib2xpdSIsImEiOiJjamZ1cXc1cGIwNHlhMnhsYWx0amRrbmdrIn0.d2s82GJZj56n2QUN2WGNsA';

    let __theBounds = [22.4, 3.4, 37.0, 23.2];

    // liboliu.716mmt4v
    var _mintMapShadowRoot = window._polymerMap.mint_map_element;
    
    var map = new mapboxgl.Map({
        container: _mintMapShadowRoot.querySelector('#map'), // container id
        style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
        // center: [29.7,7.9], // starting position [lng, lat]
        center: [26.3,7.6],
        zoom: 5, // starting zoom
    });

    window._mintMap.onVariablesChanged = function (variables) {
        console.log("variables",variables);
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



    window.setOpacity = function(layerId, value) {
        // map.setPaintProperty(layerId, 'fill-opacity', parseInt(value, 10) / 100);
        map.setPaintProperty(layerId+'_raster', 'raster-opacity', parseInt(value, 10) / 100);
    }

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
        window.__mapInspect = new MapboxInspect({
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
        map.addControl(window.__mapInspect);

        fetch("http://jonsnow.usc.edu:8081/mintmap/meta/metadata.json")
        .then(response => response.json())
        .then(json => {
            console.log('loaded');
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
            window.__originalDataset = JSON.parse(json.originalDataset);
            var server = json.server;
            var tile_path = json.tiles;
            
                    
            var layers = document.createElement('div');
            layers.className = "settings";

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
            _mintMapShadowRoot.querySelector('.geocoder').appendChild(layers);


            for (var i = 0; i < json.hasData.length; i++) {
                if (json.hasData[i]) {
                    var layers = json.layers.filter(function (obj) {
                        return obj.id == json.layerIds[i];
                    });
                    if("server" in layers[0])
                        server = layers[0].server;

                    var identifier = layers[0].id;

                    map.addSource(json.sourceLayers[i],{
                        type: 'vector',
                        tiles: [server + md5(identifier) + tile_path + '.pbf']
                    });
                    // Start raster layer
                    rasterLayerId = identifier.replace('vector_pbf','raster_png');
                    map.addSource(rasterLayerId, {
                        type: 'raster',
                        tiles: [server + md5(rasterLayerId) + tile_path + '.png'],
                        bounds: __theBounds
                    }); 
                    if (json.layerNames[i] == window.__defaultLayerName) { //This is default value need to be passed
                        loadLayerFromJson(json.layers[i]);
                        var newLayer = document.createElement('li');
                        newLayer.innerHTML = "<a class='tag " + (json.hasData[i] ? "with-data-tag":"no-data-tag") + "' data-layer-id='"+json.layerIds[i]+"' data-has-data='" + (json.hasData[i] ? "true":"false") + "' data-source-layer='" + json.sourceLayers[i] + "' data-file='"+(json.hasData[i] ? json.layers[i].file : "") +"'>" + json.layerNames[i] + "<div class='tag_close'></div></a>";
                        tagul.insertBefore(newLayer, tagSearch);
                        // updatePropertiesSettingBy(window.__defaultLayerName + "Layer", false);
                    }
                }
            }
            
            window.__listOfLayersNotAdded=[];

            for (var i = 0; i < json.layerNames.length; i++) {
                if (!json.hasData[i]) {
                    window.__listOfLayersNotAdded.push({label:json.layerNames[i] + " (No data)", value: json.layerNames[i], id: json.layerIds[i], hasData: json.hasData[i], source: json.sourceLayers[i], file:""});    
                }else{
                    if (json.layerNames[i] != window.__defaultLayerName) {
                        window.__listOfLayersNotAdded.push({label:json.layerNames[i], value: json.layerNames[i], id: json.layerIds[i], hasData: json.hasData[i], source: json.sourceLayers[i], file: json.layers[i].file});
                    }
                }
            }

            var searchNewLayer = _mintMapShadowRoot.querySelector("#search-new-layer");
            window.__autocomplete = new Awesomplete(searchNewLayer, {
                list: window.__listOfLayersNotAdded,
                maxItems: 5,
                minChars: 1,
                autoFirst:true
            });
            Awesomplete.$.bind(searchNewLayer, { "awesomplete-selectcomplete": function (event) {
                console.log(event);
                var name = event.text.value;
                var idx = json.layerNames.indexOf(name);
                if (idx != -1) {
                    
                    var hasLayer = addNewLayerToMap(json.hasData[idx], json.layerIds[idx], json.layerNames[idx], json.sourceLayers[idx], json.hasData[idx] ? json.layers[idx].file : "");
                    if (hasLayer) {
                        window.__listOfLayersNotAdded = window.__listOfLayersNotAdded.filter(function (obj) {
                            return obj.value !== json.layerNames[idx];
                        });
                        window.__autocomplete.list = window.__listOfLayersNotAdded;
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
        },
        error => {

        });
        function addNewLayerToMap(hasData, layerId, layerName, sourceLayer, file) {
            if (!hasData) {
                alert('The data source of this layer has not been added! Can not be shown on the map.');
                return false;
            }
            var newLayer = document.createElement('li');
            newLayer.innerHTML = "<a class='tag " + (hasData ? "with-data-tag":"no-data-tag") + "' data-layer-id='"+layerId+"' data-has-data='" + (hasData ? "true":"false") + "' data-source-layer='" + sourceLayer + "' data-file='"+ file +"'>" + layerName + "<div class='tag_close'></div></a>";
            var tagul = _mintMapShadowRoot.querySelector('#the-ul-of-layer-list');
            var tagSearch = _mintMapShadowRoot.querySelector('#the-li-of-add-new-layer');
            tagul.insertBefore(newLayer, tagSearch);
            loadLayerFromJson({'id':layerId, 'source-layer':sourceLayer,file:file});

            return true;

        }
        function removeLayerFromMap(sourceLayer) {
            var layerName = sourceLayer + "Layer";
            if (map.getLayer(layerName)) {
                map.removeLayer(layerName);
                map.removeLayer(layerName+"_raster");
                removeInspectLayers(layerName);
                updatePropertiesSettingBy(layerName);
            } 
            if (map.getLayer('boundsOfOriginalDatasets' + sourceLayer)) {
                map.removeLayer('boundsOfOriginalDatasets' + sourceLayer);
            }
        }
        function updateInspectLayers(curLayerName) {
            if ('layers' in window.__mapInspect.options.queryParameters) {
                if (window.__mapInspect.options.queryParameters['layers'].indexOf(curLayerName) == -1) {
                    window.__mapInspect.options.queryParameters['layers'].push(curLayerName);
                }
            }else{
                window.__mapInspect.options.queryParameters['layers'] = [curLayerName]
            }
        }
        function removeInspectLayers(curLayerName) {
            if ('layers' in window.__mapInspect.options.queryParameters) {
                var idx = window.__mapInspect.options.queryParameters['layers'].indexOf(curLayerName);
                if (idx > -1) {
                    window.__mapInspect.options.queryParameters['layers'].splice(curLayerName,1);
                }
            }
        }
        function getLastLayerId() {
            var layers = map.getStyle().layers;
            return layers[layers.length - 1].id;
        }
        function loadLayerFromJson(obj) {
            var curLayerName = obj['source-layer'] + "Layer";
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

            updateInspectLayers(curLayerName);
            
            updatePropertiesSettingBy(curLayerName, false);

            fetch("http://jonsnow.usc.edu:8081/mintmap/meta/" + obj.id + ".json")
            .then(response => response.json())
            .then(json => {
                console.log(json);
                map.setPaintProperty(curLayerName, 'fill-color', JSON.parse(json.colormap));
                // map.setPaintProperty('landuseLayer', 'fill-color',styleExpression);
                updateLegend(json['legend-type'],JSON.parse(json.legend));
                drawOriginalBound(JSON.parse(json.originalDatasetCoordinate), json.id);
                // addPropertySetting Panel
            }).catch(error => console.error(error));
        }

        function updateLegend(legendType, legend) {
            var legendElement = _mintMapShadowRoot.querySelector('#map-legend');
            legendElement.innerHTML = '';
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
                  legendElement.appendChild(item);
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
                legendElement.appendChild(legendBar);
                var flex = document.createElement('div');
                flex.className = 'legend-flex';
                flex.innerHTML = '<span>' + text.join('</span><span>') + '</span>';
                legendElement.appendChild(flex);
            }
        }
        function drawOriginalBound(coordinates, id="") {
            // window.__originalDataset
            window.__originalDataset.features[0].geometry.coordinates = coordinates;
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
            map.addLayer({
                'id': 'boundsOfOriginalDatasets' + id,
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'data': window.__originalDataset
                },
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
        function updateShowAllDiv(isClick = true) {
            var showAllLayers = _mintMapShadowRoot.querySelector('#show-all-layers');
            if (!isClick && showAllLayers.getAttribute('data-show') == 'no') {
                return;
            }
            var showAll = document.createElement('ul');
            showAll.className='tags-list';
            showAll.setAttribute('id','show-all-div');
            for (var i = 0; i < window.__listOfLayersNotAdded.length; i++) {
                var newLayer = document.createElement('li');
                newLayer.innerHTML = "<a class='tag " + (window.__listOfLayersNotAdded[i].hasData ? "with-data-tag":"no-data-tag") + "' data-layer-id='"+ window.__listOfLayersNotAdded[i].id +"' data-has-data='" + (window.__listOfLayersNotAdded[i].hasData ? "true":"false") + "' data-source-layer='" + window.__listOfLayersNotAdded[i].source + "' data-file='"+ window.__listOfLayersNotAdded[i].file +"'>" + window.__listOfLayersNotAdded[i].value + "<div class='tag_close tag_add'></div></a>";
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
        function updateListOfLayersNotAdded(json,removeFromList = true) {
            if (removeFromList) {
                window.__listOfLayersNotAdded = window.__listOfLayersNotAdded.filter(function (obj) {
                    return obj.value !== json.layerName;
                });
            }else{
                window.__listOfLayersNotAdded = window.__listOfLayersNotAdded.filter(function (obj) {
                    return obj.value !== json.layerName;
                });
                if (!json.hasData) {
                    window.__listOfLayersNotAdded.unshift({label:json.layerName + " (No data)", value: json.layerName, id: json.layerId, hasData: json.hasData, source: json.sourceLayer, file:""});
                }else{
                    window.__listOfLayersNotAdded.unshift({label:json.layerName, value: json.layerName, id: json.layerId, hasData: json.hasData, source: json.sourceLayer, file:json.file});
                }
            }
            
        }
        document.addEventListener("click", function (e) {
            e.stopPropagation();
            if (e.target.classList.contains('tag_close')) {
                if (!e.target.classList.contains('tag_add')) {
                    e.target.parentElement.parentElement.remove();
                    // TODO remove the layer
                    var tag = e.target.parentElement;
                    removeLayerFromMap(tag.getAttribute('data-source-layer'));
                    updateListOfLayersNotAdded({layerName:tag.text, layerId: tag.getAttribute('data-layer-id'), hasData: tag.getAttribute('data-has-data') == "true" ? true : false, sourceLayer:tag.getAttribute('data-source-layer'), file:tag.getAttribute('data-file')},false)
                    updateShowAllDiv(false);
                }else{
                    console.log(e.target);

                    var tag = e.target.parentElement;
                    // var newLayer = document.createElement('li');
                    // newLayer.innerHTML = "<a href='#' class='"+ tag.className +"' data-layer-id='"+ tag.getAttribute('data-layer-id')+"' data-has-data='" + tag.getAttribute('data-has-data') + "' data-source-layer='" + tag.getAttribute('data-source-layer') + "' data-file='"+ tag.getAttribute('data-file') +"'>" + tag.text + "<div class='tag_close'></div></a>";
                    
                    // var tagul = _mintMapShadowRoot.getElementById('the-ul-of-layer-list');
                    // var tagSearch = _mintMapShadowRoot.getElementById('the-li-of-add-new-layer');
                    // tagul.insertBefore(newLayer, tagSearch);

                    var hasLayer = addNewLayerToMap(tag.getAttribute('data-has-data') == "true" ? true : false, tag.getAttribute('data-layer-id'), tag.text, tag.getAttribute('data-source-layer'), tag.getAttribute('data-file'));
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
                                         + "<input type='range' min='1' max='100' value='40' class='slider opacity-slider' oninput='window.setOpacity(\""+id+"\", this.value)'>"
                                         + "</div>";
                if (haveTimeline[i]) {
                   layerProperty.innerHTML += "<div class='props'>"
                                         + "<h4>Time</h4>"
                                         + "<div class='control'>" 
                                         + "<input type='range' min='1' max='100' value='100' class='slider sliderTime' oninput='window.loadLayer(\""+id+"\", this.value)' disabled>"
                                         + "</div>"
                                         + "</div>";
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
        map.addControl(new mapboxgl.NavigationControl());
        
    });

    map.on('mousemove', function (e) {
        // console.log(e);
            // e.point is the x, y coordinates of the mousemove event relative
            // to the top-left corner of the map
            // JSON.stringify(e.point) + '<br />' +
            // e.lngLat is the longitude, latitude geographical position of the event
            // JSON.stringify(e.lngLat));
    });
}
