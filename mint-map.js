import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import './utils-lib';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';


if(!Array.prototype.equals){
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time 
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;       
            }           
            else if (this[i] != array[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;   
            }           
        }       
        return true;
    }
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});
}
/**
 * `mint-map`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MintMap extends PolymerElement {
  static get template() {
    return html`
    <style>
        :host {
          display: block;
          overflow: hidden;
        }
        #map {
          position: relative;
          width: 100%;
          height: 100%;
          @apply --mapbox-map;
        }
        #map > .mapboxgl-canvas-container.mapboxgl-interactive > canvas {
          @apply --mapbox-canvas;
        }
        .mapbox-gl-marker {
          position: absolute;
          @apply --mapbox-gl-marker;
        }
        .mapboxgl-control-container .slotted-icontrol.interactive {
          pointer-events: auto;
        }
    </style>
    <div id="mint_map_element">
      <div id="map"></div>
      <div id="geocoder" class="geocoder"></div>
      <div id="layer-panel" class="layer-panel"></div>
      <div id="map-legend" class="legend"></div>
    </div>
    `;
  }
  static get properties() {
    return {
      variables: {
        type: Array,
        observer: '_variablesChanged',
        value: []
      },
      loaded: {
        type: Boolean,
        notify: true,
        readOnly: true,
        value: false
      },
      mapElement: {
        type: Object,
        notify: true,
        readOnly: true
      },
      _cssLoaded: Boolean,
      _scriptLoaded: Boolean,
      _mapLoaded: Boolean,
      accessToken: String,
      _mapDebouncer: Object,
      debounceTime: {
        type: Number,
        value: 300
      },
      map: {
        type: Object,
        notify: true,
        readonly: true
      },
    };
  }
  static get importMeta() { 
    return import.meta; 
  }
  static get observers() {
    return [
      '_updateMap(loaded, accessToken)'
    ];
  }

  _relativePath(){
    return import.meta.url.substring(0, import.meta.url.lastIndexOf('/'));
  }
  _variablesChanged(newArr, oldArr) {
    if (!newArr.equals(oldArr)) {
      if (typeof window._mintMap === 'object' && (typeof window._mintMap.onVariablesChanged === 'function')) {
          window._mintMap.onVariablesChanged(newArr);
      }else{
          window._mintMapOnloadVars = newArr;
      }
    }
  }

  ready() {
    super.ready();
    this._setLoaded(window.mapboxgl && true);
  }

  connectedCallback() {
    super.connectedCallback();
    window._isMapLoaded = false;
    window._polymerMap = this.$;
    this._setMapElement(this.$.map);
    afterNextRender(this, this._init);
  }
  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._resizeListener) {
      this.removeEventListener('iron-resize', this._resizeListener);
    }
  }
  _init(){
    if (!this.loaded) {
      this._resizeListener = this.addEventListener('iron-resize', this.resize);
      PolymerVis.loadScript(
        "https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.js",
        () => {
          this._scriptLoaded = true;
          this._setLoaded(this._scriptLoaded && this._cssLoaded);
        },
        null,
        true
      );
      PolymerVis.loadScript(
        "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.min.js"
      );
      PolymerVis.loadScript(
        // this.resolveUrl("./render.js?rnd=" + Date.now())
        this._relativePath() + "/render/dist/render.js?rnd=" + Date.now()
      );
    }

    PolymerVis.insertCssIntoShadowRoot('https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css', this.shadowRoot,() => {
        this._cssLoaded = true;
        this._setLoaded(this._scriptLoaded && this._cssLoaded);
      },'mapbox');
    PolymerVis.insertCssIntoShadowRoot('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css', this.shadowRoot, null,'mapbox-geocoder');
    PolymerVis.insertCssIntoShadowRoot(this._relativePath() + '/style.css?rnd=' + Date.now(), this.shadowRoot,null,'style');
    // this.resize();
  }
  resize() {
    if (this.map) {
      this.map.resize();
    }
    return this;
  }
  _updateMap() {
    if (window.loadMapLayers && !window._isMapLoaded) {
      window.loadMapLayers(window.mapboxgl);
    }
    if (!this.loaded || !this.accessToken) return;
    // if (this.map) return;
    if (window.mapboxgl) return;
    this._mapDebouncer = Debouncer.debounce(
      this._mapDebouncer,
      timeOut.after(this.debounceTime),
      // this._createMap.bind(this)
    );
  }

  _createMap(){
      // var map = new mapboxgl.Map({
      //   container: this.$.map,
      //   style: 'mapbox://styles/mapbox/streets-v9'
      // });
      // this.map = map;
      // this.resize();
  }
}

window.customElements.define('mint-map', MintMap);
