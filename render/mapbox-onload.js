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

        fetch("http://52.90.74.236:65533/minty/autocomplete?ver=" + Math.random())
        .then(response => response.json())
        .then(autocompleteData => {
            initLayerSearchAutocomplete(autocompleteData);
            window._mintMap.uiLoaded = true;
        });
    });

    // fetch("http://jonsnow.usc.edu:8081/mintmap/meta/metadata.json?ver=" + Math.random())
    // fetch("http://127.0.0.1:8000/metadata.json?ver=" + Math.random())
    // .then(response => response.json())
    // .then(json => {
    //     // console.log('loaded');
    //     // var layersIds = [];
    //     // var layerNames = [];
    //     // var layerIdSource = {};
    //     // var layerIdName = {};
    //     // // console.log(json.layerNames);
    //     // var layerNames = 
    //     // for (var i = 0; i < json.layerNames.length; i++) {

    //         // layersIds.push(json.layerIds[i]);
    //         // layerIdSource[json.layerIds[i]] = json.sourceLayers[i];
    //         // layerIdName[json.layerIds[i]] = json.sourceNames[i];
    //     // }
    //     // console.log(json);
    //     mintMapObserver.metadata = json;                



    //     // for (var i = 0; i < json.layerIds.length; i++) {
    //     //     var name = json.layerNames[i];
    //     //     var id = json.layerIds[i];

    //     // } 
    //     // createProperitesPanel(layers, layersPropertyList, json.sourceLayers, json.layerNames, json.hasData, json.hasTimeline);

  


        
    //     window._mintMap.uiLoaded = true;
    // },
    // error => {
    //     console.log(error);
    // });

    
};