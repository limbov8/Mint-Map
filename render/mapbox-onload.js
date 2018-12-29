var {initUI,
    createProperitesPanel
} = require('./mintmap-ui-utils.js');


var noUiSlider = require('./noUiSliderRevised.js');

var MapboxInspect = require('mapbox-gl-inspect');
var mapboxInspectToolkit = require('./mapbox-inspect.js');
var {variableHandler2} = require('./mintmap-variable.js');
var {
    addNewLayerToMap,
    removeLayerFromMap,
    updateInspectLayers,
    removeInspectLayers,
    getLastLayerId,
    loadLayerFromJson,
    loadTilesOfTimeline
} = require('./mapbox-layer-utils.js');

var {initLayerSearchAutocomplete} = require('./mapbox-utils.js')
const mintMapObserver = new Proxy(window._mintMap, variableHandler2);
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
    
    // window._polymerMap.querySelector('#geocoder .mapboxgl-ctrl-geocoder input').addEventListener("keydown",function (e) {        
    //     var charCode = (typeof e.which === "number") ? e.which : e.keyCode;
    //     if (charCode == 13) {
    //         // e.stopPropagation();
    //         // let mg = _mintMap.geocoder._geocode(_mintMap.geocoder._inputEl.value);
    //         // console.log(_mintMap.geocoder);
    //     }
    // });
    console.log(_mintMap);
    // window._mintMap.map.addControl(geocoder);
    
    initUI();
    

    fetch("http://52.90.74.236:65533/minty/autocomplete?ver=" + Math.random())
    .then(response => response.json())
    .then(json => {
        initLayerSearchAutocomplete(json);
    });
    // fetch("http://jonsnow.usc.edu:8081/mintmap/meta/metadata.json?ver=" + Math.random())
    fetch("http://127.0.0.1:8000/metadata.json?ver=" + Math.random())
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



        // for (var i = 0; i < json.layerIds.length; i++) {
        //     var name = json.layerNames[i];
        //     var id = json.layerIds[i];

        // } 
        // createProperitesPanel(layers, layersPropertyList, json.sourceLayers, json.layerNames, json.hasData, json.hasTimeline);

        // window._polymerMap.querySelectorAll(".property-slider").forEach(function (ele,idx) {
        //     let panelId = ele.getAttribute("data-panel");
        //     noUiSlider.create(ele, window._mintMap.sliderData[panelId]);
        //     ele.noUiSlider.on('update', function( values, handle ) {
        //         // console.log(typeof values[handle]);
        //     });
        //     ele.noUiSlider.on('change', function( values, handle ) {
        //         // let value = this.valuesOfYear[parseInt(values[handle])];
        //         // let allValuesOfYear = Object.values(this.valuesOfYear);
        //         // setPaint(value, allValuesOfYear);
        //         // let visibility = map.getLayoutProperty(clickedLayer, 'visibility');
        //         // console.log(window._mintMap.sliderData[panelId].extraOption , (new Date(values[handle])) );
        //         // let map = window._mintMap.map;
        //         let d = new Date(parseInt(values[handle]));
        //         if (isNaN(d.getTime())) {
        //             console.log("slider time stamp is wrong!");
        //             return;
        //         }
        //         if (window._mintMap.mapInspect._popup.isOpen()) {
        //             window._mintMap.mapInspect._popup.remove();
        //         }
        //         let currentOpacity = ele.parentElement.parentElement.querySelector('.opacity-slider').value;
        //         let layerOptions = window._mintMap.sliderData[panelId].extraOption;
        //         let step = d.format(layerOptions.stepOption.format);
        //         console.log(d, values[handle], values, handle);
        //         let vindex = layerOptions.step.indexOf(values[handle]);
        //         console.log(vindex,layerOptions.step);

        //         let layerId = panelId + 'Layer_raster';
        //         // console.log(ele.parentElement.parentElement.querySelector('.opacity-slider'), step, layerOptions.step);
        //         ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', step);
        //         if (step === layerOptions.step[0]) {
        //             layerId = panelId + 'Layer_raster';
        //             ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', "no");
        //         }
        //         window._mintMap.map.setPaintProperty(layerId, 'raster-opacity', parseInt(currentOpacity, 10) / 100);
        //         let visibility = window._mintMap.map.getLayoutProperty(layerId, 'visibility');
        //         if (visibility !== 'visible') {
        //             window._mintMap.map.setLayoutProperty(layerId, 'visibility', 'visible');
        //         }
        //         layerOptions.step.map(function (ele,idx) {
        //             let tmp_layerId = panelId + 'Layer_raster_' + idx;
        //             if (idx === 0) {
        //                 tmp_layerId = panelId + 'Layer_raster';
        //             }
        //             if (tmp_layerId !== layerId) {
        //                 window._mintMap.map.setLayoutProperty(tmp_layerId, 'visibility', 'none');
        //             }
        //         })
        //     });
        // });


        
        window._mintMap.uiLoaded = true;
    },
    error => {
        console.log(error);
    });

    
};