import * as Awesomplete from 'awesomplete';
// var Awesomplete = require('awesomplete');

var PROMISE_STYLE_LOADING_WAIT = parseInt(process.env.PROMISE_STYLE_LOADING_WAIT)
var _mintMapShadowRoot = window._polymerMap;

export function removeLegend(layerId) {

    var legendItem = _mintMapShadowRoot.querySelector('#map-legend .legend-of-' + layerId);
    if (legendItem.parentElement) {
        legendItem.parentElement.removeChild(legendItem);
    }
}

export function updateLegend(legendType, legend, sourceLayerName, layerId, legendIdx = -1) {
    var legendElement = _mintMapShadowRoot.querySelector('#map-legend');
    // legendElement.innerHTML = '';
    var legendItem = _mintMapShadowRoot.querySelector('#map-legend .legend-of-' + layerId);

    if (legendIdx !== -1 && legendItem) {
        legendItem.innerHTML = '';
    }else{
        legendItem = document.createElement('div');
        legendItem.className = "legend-item legend-of-" + layerId; 
        legendElement.appendChild(legendItem);
    }

    var legendTitle = document.createElement('div');
    legendTitle.className = 'legend-title'
    legendTitle.innerHTML = "Legend of layer <span>#" + sourceLayerName + "</span>:";
    legendItem.appendChild(legendTitle);

    var legendContent = document.createElement('div');
    legendContent.className = 'legend-legend'
    legendItem.appendChild(legendContent);

    if (legendType == 'discrete') {
        for (i = 0; i < legend.length; i++) {
          let legentValue = legend[i].value - parseInt(legend[i].value);
          legentValue = legentValue + "";

          var label = legend[i].label + "(" + (legentValue.length > 4 ? legend[i].value.toFixed(2) : legend[i].value) + ")";
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
            let legentValue = legend[i].value - parseInt(legend[i].value);
            legentValue = legentValue + "";
            text.push((legentValue.length > 4 ? legend[i].value.toFixed(2) : legend[i].value))
        }
        legendBar.style.background = 'linear-gradient(to right, ' + color.join(',') + ')';
        legendContent.appendChild(legendBar);
        var flex = document.createElement('div');
        flex.className = 'legend-flex';
        flex.innerHTML = '<span>' + text.join('</span><span>') + '</span>';
        legendContent.appendChild(flex);
    }
}
export function removeBoundary(id) {
    if (window._mintMap.map.getLayer('boundsOfOriginalDatasets' + id)) {
        // window._mintMap.styleLoaded = false;
        window._mintMap.map.removeLayer('boundsOfOriginalDatasets' + id);
        // window._mintMap.map.removeSource('boundsOfOriginalDatasets' + id);
        // if (!window._mintMap.styleLoaded) {
        //     setTimeout(function () {
        //         console.log("removeBoundary");
        //         removeBoundary(id);
        //     }, PROMISE_STYLE_LOADING_WAIT);
        // }
    }
}
export function drawOriginalBound(coordinates, id) {
    // window._mintMap.metadata
    let originalDataset = JSON.parse(window._mintMap.metadata.originalDataset);
    originalDataset.features[0].geometry.coordinates = coordinates;
    var layers = window._mintMap.map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    if (!window._mintMap.map.getSource('boundsOfOriginalDatasets' + id)) {
        window._mintMap.styleLoaded = false;
        window._mintMap.map.addLayer({
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
        if (!window._mintMap.styleLoaded) {
            setTimeout(function () {
                // console.log("drawOriginalBound2");
                drawOriginalBound(coordinates, id);
            }, PROMISE_STYLE_LOADING_WAIT);
            return;
        }
    }else{
        if (!window._mintMap.map.getLayer('boundsOfOriginalDatasets' + id)) {
            window._mintMap.styleLoaded = false;
            window._mintMap.map.addLayer({
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
            if (!window._mintMap.styleLoaded) {
                setTimeout(function () {
                    // console.log("drawOriginalBound2");
                    drawOriginalBound(coordinates, id);
                }, PROMISE_STYLE_LOADING_WAIT);
                return;
            }
        }
    }
}
// function hasLayerNameDisplayed(sourceLayer) {
//     let temp = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
//         return obj.value === sourceLayer;
//     });
//     if (temp.length > 0) {
//         return true;
//     }
//     return false;
// }
export function updateListOfLayersNotAdded(json_id, removeFromList = true) {
    var json = json_id;
    if (typeof(json_id) === "number") {
        var jsonArr = window._mintMap.loadedJson.filter(function (obj) {
            return obj.id === json_id;
        });
        if (jsonArr.length == 0) {
            console.error("No such a Json");
            return;
        }

        json = jsonArr[0];
    }
    // we change it to layerName
    // var sourceLayer = json.sourceLayer.replace(/\./g,'_');
    var filterValue = json.layerName;
    var md5 = json.dcid.length > 1 ? json.dcid : json.md5vector;
    if (removeFromList) {
        window._mintMap.listOfLayersNotAdded = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
            return obj.value !== filterValue;
        });
    }else{
        window._mintMap.listOfLayersNotAdded = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
            return obj.value !== filterValue;
        });
        if (!json.hasData) {
            window._mintMap.listOfLayersNotAdded.unshift({label:filterValue + " (No data)", value: filterValue, md5: md5});
        }else{
            window._mintMap.listOfLayersNotAdded.unshift({label:filterValue, value: filterValue, md5: md5});
        }
    }
    window._mintMap.autocomplete.list = window._mintMap.listOfLayersNotAdded;
}


// module.exports = {
//     removeLegend,
//     updateLegend,
//     drawOriginalBound,
//     removeBoundary,
//     updateListOfLayersNotAdded
// }