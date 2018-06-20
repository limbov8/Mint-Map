# \<mint-map\>

Mint mapbox to show different layers

![Published by Libo Liu](https://img.shields.io/badge/Libo%20Liu-Author-blue.svg)
![Contributor by Varun Ratnakar](https://img.shields.io/badge/Varun%20Ratnakar-Contributor-blue.svg)
![Contributor by Shiwei Huang](https://img.shields.io/badge/Shiwei%20Huang-Bower%20Install-blue.svg)


## Viewing Your Element

```shell
cd demo
polymer serve
```

More info in the `demo/src/mint-map-test-app`

### Polymer installation

```shell
npm install -g polymer-cli
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
