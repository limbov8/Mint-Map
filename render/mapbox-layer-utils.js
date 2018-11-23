var md5 = require('md5');
var {
    createProperitesPanel,
    updateShowAllDiv,
    updatePropertiesSettingBy
} = require('./mintmap-ui-utils.js');
var {
    removeLegend,
    updateLegend,
    drawOriginalBound,
    hasLayerNameDisplayed,
    updateListOfLayersNotAdded
} = require('./mapbox-utils.js');
var _mintMapShadowRoot = window._polymerMap.mint_map_element;
function addNewLayerToMap(hasData, layerId, layerName, sourceLayer, file, hasTimeline = false) {
    if (!hasData) {
        alert('The data source of this layer has not been added! Can not be shown on the window._mintMap.map.');
        return false;
    }
    var newLayer = document.createElement('li');
    newLayer.innerHTML = "<a class='tag " 
    + (hasData ? "with-data-tag":"no-data-tag") 
    + "' data-layer-id='"+layerId+"' data-has-data='" 
    + (hasData ? "true":"false") + "' data-source-layer='" 
    + sourceLayer + "' data-file='"+ file 
    + "' data-has-timeline='" + (hasTimeline ? "true":"false") + "'>" 
    + layerName + "<div class='tag_close'></div></a>";
    var tagul = _mintMapShadowRoot.querySelector('#the-ul-of-layer-list');
    var tagSearch = _mintMapShadowRoot.querySelector('#the-li-of-add-new-layer');
    tagul.insertBefore(newLayer, tagSearch);
    loadLayerFromJson({
        id:layerId, 
        layerName:layerName,
        'source-layer':sourceLayer,
        file:file, 
        hasTimeline: hasTimeline
    });

    return true;

}
function removeLayerFromMap(sourceLayer, hasTimeline = false) {
    var layerName = sourceLayer + "Layer";
    if (window._mintMap.map.getLayer(layerName)) {
        window._mintMap.map.removeLayer(layerName);
        window._mintMap.map.removeLayer(layerName+"_raster");
        removeLegend(sourceLayer);
        removeInspectLayers(layerName);
        updatePropertiesSettingBy(layerName);
    }
    if (window._mintMap.map.getLayer('boundsOfOriginalDatasets' + sourceLayer)) {
        window._mintMap.map.removeLayer('boundsOfOriginalDatasets' + sourceLayer);
    }
    if (hasTimeline) {
        // remove all layers except the first one
        let timeLineData = window._mintMap.metadata.layers.filter(function (ele) {
                return ele['source-layer'] === sourceLayer;
            });
        if (timeLineData.length === 0) {
            return;
        }
        let timelineLayer = timeLineData[0];
        let steps = timelineLayer.step;

        for (var i = 1; i < steps.length; i++) {
            let rasterLayer = layerName + "_raster_" + steps[i];
            let vectorLayer = layerName + "_vector_" + steps[i];
            if (window._mintMap.map.getLayer(rasterLayer)) {
                window._mintMap.map.removeLayer(rasterLayer);
            }
            if (window._mintMap.map.getLayer(vectorLayer)) {
                window._mintMap.map.removeLayer(vectorLayer);
            }
        }
    }
}
function updateInspectLayers(curLayerName) {
    if ('layers' in window._mintMap.mapInspect.options.queryParameters) {
        if (window._mintMap.mapInspect.options.queryParameters['layers'].indexOf(curLayerName) == -1) {
            window._mintMap.mapInspect.options.queryParameters['layers'].push(curLayerName);
        }
    }else{
        window._mintMap.mapInspect.options.queryParameters['layers'] = [curLayerName]
    }
}
function removeInspectLayers(curLayerName) {
    if ('layers' in window._mintMap.mapInspect.options.queryParameters) {
        var idx = window._mintMap.mapInspect.options.queryParameters['layers'].indexOf(curLayerName);
        if (idx > -1) {
            window._mintMap.mapInspect.options.queryParameters['layers'].splice(idx,1);
        }
    }
}
function getLastLayerId() {
    var layers = window._mintMap.map.getStyle().layers;
    return layers[layers.length - 1].id;
}
function loadLayerFromJson(obj) {
    var curLayerName = obj['source-layer'] + "Layer";
    let slpos = window._mintMap.metadata.sourceLayers.indexOf(obj['source-layer']);
    if (slpos === -1) {
        console.log("NO such data");
        return false;
    }

    if (!window._mintMap.metadata.hasData[slpos]) {
        console.log("hasNoData");
        return false;
    }
    let lid = window._mintMap.metadata.layerIds[slpos];
    let layer = window._mintMap.metadata.layers.filter(function (obj) {
        return obj.id == lid;
    });            
    let tile_path = window._mintMap.metadata.tiles;
    let server = window._mintMap.metadata.server;
    if("server" in window._mintMap.metadata.layers[0])
        server = window._mintMap.metadata.layers[0].server;
    var identifier = window._mintMap.metadata.layerIds.indexOf(obj.id);
    let vectorMD5 = window._mintMap.metadata.vectorMD5[identifier];

    if (!window._mintMap.map.getSource(window._mintMap.metadata.sourceLayers[identifier])) {
        window._mintMap.map.addSource(window._mintMap.metadata.sourceLayers[identifier],{
            type: 'vector',
            tiles: [server + vectorMD5 + tile_path + '.pbf']
        });
    }

    // Start raster layer
    let rasterMD5 = window._mintMap.metadata.rasterMD5[identifier];
    let rasterLayerId = obj.id.replace('vector_pbf','raster_png');
    if (!window._mintMap.map.getSource(rasterLayerId)) {
        window._mintMap.map.addSource(rasterLayerId, {
            type: 'raster',
            tiles: [server + rasterMD5 + tile_path + '.png'],
            bounds: window._mintMap.bounds
        });
    }
    
    window._mintMap.map.addLayer({
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
    window._mintMap.map.addLayer({
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
    if (obj.hasTimeline) {
        loadTilesOfTimeline(server, tile_path, identifier, obj.id, obj['source-layer'], vectorMD5);
    }
    window._mintMap.displayed.push(vectorMD5);
    updateInspectLayers(curLayerName);
    updatePropertiesSettingBy(curLayerName, false);
    updateListOfLayersNotAdded({layerName: obj.layerName, 
        layerId: obj.id, 
        hasData: true,
        sourceLayer:obj['source-layer'], 
        file:"ckan",
        hasTimeline: obj.hasTimeline
    },true);
    updateShowAllDiv(false);

    fetch("http://jonsnow.usc.edu:8081/mintmap/meta/" + obj.id + ".json?ver="+Math.random())
    .then(response => response.json())
    .then(json => {
        // console.log(json);
        window._mintMap.map.setPaintProperty(curLayerName, 'fill-color', JSON.parse(json.colormap));
        // window._mintMap.map.setPaintProperty('landuseLayer', 'fill-color',styleExpression);
        updateLegend(json['legend-type'],JSON.parse(json.legend), obj['source-layer']);
        drawOriginalBound(JSON.parse(json.originalDatasetCoordinate), json['source-layer']);
        // addPropertySetting Panel
    }).catch(error => console.error(error));
}
function loadTilesOfTimeline(server, tile_path, identifier, layerId, sourceLayerId, vectorMD5) {
    let vectorMD5Arr = vectorMD5.split('_');
    if (vectorMD5Arr.length !== 2) {
        console.log("VectorMD5 is not designed for timeline");
        return;
    }
    let vectorMD5Prefix = vectorMD5Arr[0] + "_";

    let timeLineData = window._mintMap.metadata.layers.filter(function (ele) {
                return ele.id === layerId;
            });
    if (timeLineData.length === 0) {
        console.log("There is no such layer which id = " + layerId);
        return;
    }
    let timelineLayer = timeLineData[0];

    // let timelines = window._mintMap.sliderData[sourceLayerId];
    // "axis":"slider",
    // "stepType":"Time",
    // "stepOption":{"type":"string", "format":"YYYY"},
    // "step":["2012","2013","2014"]// 
    if (timelineLayer.step.length <= 1) {
        console.log("There are only one time stamp in the Timeseries");
        return;
    }

    let curLayerName = sourceLayerId + "Layer";
    
    for (var i = 1; i < timelineLayer.step.length; i++) {
        let vectorMD5_of_idx = vectorMD5Prefix + timelineLayer.step[i];
        let rasterMD5_of_idx = md5(vectorMD5_of_idx);
        let vectorSourceId_of_idx = sourceLayerId + "vector_pbf" + timelineLayer.step[i];
        let rasterSourceId_of_idx = sourceLayerId + "raster_png" + timelineLayer.step[i];

        if (!window._mintMap.map.getSource(vectorSourceId_of_idx)) {
            window._mintMap.map.addSource(vectorSourceId_of_idx,{
                type: 'vector',
                tiles: [server + vectorMD5_of_idx + tile_path + '.pbf']
            });
        }

        if (!window._mintMap.map.getSource(rasterSourceId_of_idx)) {
            window._mintMap.map.addSource(rasterSourceId_of_idx, {
                type: 'raster',
                tiles: [server + rasterMD5_of_idx + tile_path + '.png'],
                bounds: window._mintMap.bounds
            });
        }

        let rasterLayerId_of_idx = curLayerName + "_raster_" + timelineLayer.step[i];
        let vectorLayerId_of_idx = curLayerName + "_vector_" + timelineLayer.step[i];

        if (!window._mintMap.map.getLayer(rasterLayerId_of_idx)) {
            window._mintMap.map.addLayer({
                "id": rasterLayerId_of_idx,
                "type": 'raster',
                'source': rasterSourceId_of_idx,
                'layout': {
                    'visibility': 'none',
                },
                'paint':{
                    'raster-opacity':0.8
                },
            });
        }
        
        if (!window._mintMap.map.getLayer(vectorLayerId_of_idx)) {
            window._mintMap.map.addLayer({
                "id": vectorLayerId_of_idx,
                "type": "fill",
                "source": vectorSourceId_of_idx,
                "source-layer": sourceLayerId,
                "layout": {
                    'visibility': 'none'
                },
                "paint": {
                    "fill-opacity": 0.0
                }
            });
        }
        
    }
}

module.exports = {
    addNewLayerToMap,
    removeLayerFromMap,
    updateInspectLayers,
    removeInspectLayers,
    getLastLayerId,
    loadLayerFromJson,
    loadTilesOfTimeline
}