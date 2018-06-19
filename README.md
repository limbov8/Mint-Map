# \<mint-map\>

Mint mapbox to show different layers

![Published by Libo Liu](https://img.shields.io/badge/Libo%20Liu-Contributor-blue.svg)
![Contributor by Varun Ratnakar](https://img.shields.io/badge/Varun%20Ratnakar-Contributor-blue.svg)

## Viewing Your Element

```
$ polymer serve
```
```html
<dom-module id="mint-map-test-app">
  <template>
    <style>
      :host {
        display: block;
      }
    </style>
    <h3>[[prop2]]</h3>
    <mint-map variables="[[variables]]"></mint-map>
  </template>

  <script>
    /**
     * @customElement
     * @polymer
     */
    class MintMapTestApp extends Polymer.Element {
      static get is() { return 'mint-map-test-app'; }
      static get properties() {
        return {
          variables: {
            type: Array,
            notify:true,
            readOnly:false,
            value:['landuse', 'soil']
          }
        };
      }
      ready() {
        super.ready();
        // mutate the array
        setTimeout((function() {
                  this.variables = ['elevation','soil'];
                  // If readOnly
                  // this._setVariables(['elevation','soil']);
                }).bind(this), 3000);
      } 
    }

    window.customElements.define(MintMapTestApp.is, MintMapTestApp);
  </script>
</dom-module>
```
## Javascript

Please read `render.js`.



```
window._mintMap = {};
```

This object will be use to transfer data between polymer and raw javascript.


## Attention!

- In `render.js`, use `_mintMapShadowRoot` as `document`
- In `render.js`, when a function is called outside of `window.loadMapLayers`, `window._mintMap` is the best way to store functions.
- In `mint-map.html`, when pass a parameter, `obsever` is needed! More detail @ https://github.com/PolymerVis/mapbox-gl/blob/master/mapbox-gl.html#L710