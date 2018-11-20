require('./date-format.js');
require('./mintmap.js');
require('./mintmap-ui-utils.js');

require('./mapbox-utils.js');
require('./mapbox-layer-utils.js');
var coordinatesGeocoder = require('./mapbox-geocoder.js')
var mapboxOnload = require('./mapbox-onload.js');
var {variableHandler1} = require('./mintmap-variable.js');

window.loadMapLayers = function(mapboxgl){

    const variableArrayObserver = new Proxy(window._mintMap.variableArray, variableHandler1);
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

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 10,
        bbox: [22.9,3.3,36.5,12.5],
        placeholder: "Try: 29.7, 7.9"
    });

    window._mintMap.map.on('load', mapboxOnload);

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

    window._mintMap.map.on('mousemove', function (e) {
        // console.log(e);
            // e.point is the x, y coordinates of the mousemove event relative
            // to the top-left corner of the map
            // JSON.stringify(e.point) + '<br />' +
            // e.lngLat is the longitude, latitude geographical position of the event
            // JSON.stringify(e.lngLat));
    });

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