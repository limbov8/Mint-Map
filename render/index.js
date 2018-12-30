require('./mintmap.js');

var {
    updateListOfLayersNotAdded
} = require('./mapbox-utils.js');

var {
    removeLayerFromMap
} = require('./mapbox-layer-utils.js');


var mapboxOnload = require('./mapbox-onload.js');
var {variableHandler1} = require('./mintmap-variable.js');

window.loadMapLayers = function(mapboxgl){

    const variableArrayObserver = new Proxy(window._mintMap.variableArray, variableHandler1);
    // window.__defaultLayerName = 'Landuse';
    // window.__defaultLayerMD5 = '';
    mapboxgl.accessToken = 'pk.eyJ1IjoibGxiMDUzNiIsImEiOiJjamhneW5nb2Exc2NpM2RuMzd2MDIzN3JzIn0.iKiHre34Vadlif1cOOSG9A';

    // liboliu.716mmt4v
    var _mintMapShadowRoot = window._polymerMap;
    
    var map = new mapboxgl.Map({
        container: _mintMapShadowRoot.querySelector('#map'), // container id
        style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
        // center: [29.7,7.9], // starting position [lng, lat]
        center: [26.3,7.6],
        zoom: 5, // starting zoom
    });
   
    window._mintMap.map = map;
    window._mintMap.map.resize();
    setTimeout(function () {
        window._mintMap.map.resize();
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

    window._mintMap.map.on('load', mapboxOnload);

    _mintMapShadowRoot.addEventListener("click", function (e) {
        e.stopPropagation();
        if (e.target.classList.contains('tag_close')) {
            if (!e.target.classList.contains('tag_add')) {
                e.target.parentElement.parentElement.remove();
                // TODO remove the layer
                var tag = e.target.parentElement;
                var json_id = parseInt(tag.getAttribute('data-id'));
                removeLayerFromMap(json_id);
                updateListOfLayersNotAdded(json_id, false);
            }
        }
    });
    window._mintMap.map.on('style.load', function (e) {
       window._mintMap.styleLoaded = true;
       // console.log(e, window._mintMap.styleLoaded);
    });
    // window._mintMap.map.on('mousemove', function (e) {
    //     // console.log(e);
    //         // e.point is the x, y coordinates of the mousemove event relative
    //         // to the top-left corner of the map
    //         // JSON.stringify(e.point) + '<br />' +
    //         // e.lngLat is the longitude, latitude geographical position of the event
    //         // JSON.stringify(e.lngLat));
    // });

}

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