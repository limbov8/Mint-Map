var {initUI,
    createProperitesPanel
} = require('./mintmap-ui-utils.js');

var MapboxInspect = require('mapbox-gl-inspect');
var mapboxInspectToolkit = require('./mapbox-inspect.js');
// var {variableHandler2} = require('./mintmap-variable.js');
var {initLayerSearchAutocomplete} = require('./mapbox-layer-utils.js')
// const mintMapObserver = new Proxy(window._mintMap, variableHandler2);
var coordinatesGeocoder = require('./mapbox-geocoder.js')

module.exports = function () {

    window._mintMap.map.addControl(new mapboxgl.NavigationControl());
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
    window._mintMap.map.addControl(window._mintMap.mapInspect);

    window._mintMap.geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 10,
        bbox: window._mintMap.bounds,
        placeholder: "Try: 29.7, 7.9"
    });
    window._polymerMap.querySelector('#geocoder').appendChild(window._mintMap.geocoder.onAdd(window._mintMap.map));
    
    initUI();
    
    fetch(process.env.API_METADATA_URL + "?ver=" + Math.random())
    .then(response => response.json())
    .then(metadata => {
        window._mintMap.metadata = metadata;

        fetch(process.env.API_AUTOCOMPLETE_URL + "?ver=" + Math.random())
        .then(response => response.json())
        .then(autocompleteData => {
            initLayerSearchAutocomplete(autocompleteData);
            window._mintMap.uiLoaded = true;
        });
    });
    
};