var general_circle_paint_setting = {
    "circle-radius": 2,
    "circle-color": 'rgba(28, 158, 54, 1)',
    "circle-opacity": 1,
    "circle-stroke-width": 0,
    "circle-stroke-color":'rgba(0,0,0,1)',
    "circle-stroke-opacity":1
};
var general_line_paint_setting = {
    "line-opacity":1,
    "line-color":'rgba(28, 158, 54, 1)',
    "line-width":1
}
var general_polygon_paint_setting = {
    "fill-opacity":1,
    "fill-color": 'rgba(28, 158, 54, 1)',
    "fill-outline-color": 'rgba(28, 158, 54, 1)'
}
window._mintMap = {
    setOpacity: () => {},
    onresize: () => {},
    getLayerNameBySoureLayer: () => {},
    variableArrayCount: 0,
    metadata: {},
    listOfLayersNotAdded: [],
    displayed: [],
    variableArray: [],
    mapInspect: {},
    uiLoaded: false,
    autocomplete: {},
    toggleClass: () => {},
    bounds: [22.4, 3.4, 37.0, 23.2],
    sliderData: {},
    loadedJson: [],
    styleLoaded: false,
    styleLoadingIndicator: {},
    geojson_layer_paint_settings: [general_circle_paint_setting, general_line_paint_setting, general_polygon_paint_setting],
    vector_layer_filter_types:[{filter:["==", "$type", "Point"]}, {filter:["==", "$type", "LineString"]}, {filter:["==", "$type", "Polygon"]}],
    vector_layer_opacity_names: ['circle-opacity', 'line-opacity', 'fill-opacity'],
    geojson_dot_map_layers_need_special_attention_for_inspection: {}
};

window._mintMap.onresize = function() {
      window._polymerMap.querySelector('#mint_map_element').style.height = window._polymerMap.querySelector('#mint_map_element').parentNode.host.clientHeight + "px";
      window._mintMap.map.resize();
};
window._mintMap.toggleClass = function(element, className){
    if (!element || !className){
        return;
    }
    
    var classString = element.className, nameIndex = classString.indexOf(className);
    if (nameIndex == -1) {
        classString += ' ' + className;
    }
    else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
    }
    element.className = classString;
}
window._mintMap.setOpacity = function(layerId, value, timeline = "no", paint_property_name='raster-opacity') {
    // map.setPaintProperty(layerId, 'fill-opacity', parseInt(value, 10) / 100);
    if (paint_property_name === 'raster-opacity') {
        if (timeline !== "no") {
            window._mintMap.map.setPaintProperty(layerId + "_" +  timeline + "_raster", paint_property_name, parseInt(value, 10) / 100);
        }else{
            window._mintMap.map.setPaintProperty(layerId+'_raster', paint_property_name, parseInt(value, 10) / 100);
        }
    }else{
        if (layerId.indexOf(',') !== -1) {
            let layer_ids = layerId.split(',');
            let paint_property_names = paint_property_name.split(',');
            for (var i = 0; i < layer_ids.length; i++) {
                window._mintMap.map.setPaintProperty(layer_ids[i], paint_property_names[i], parseInt(value, 10) / 100);
            }
        }else{
            if (paint_property_name.indexOf(',') !== -1) {
                let paint_property_names = paint_property_name.split(',');
                for (var i = 0; i < paint_property_names.length; i++) {
                    window._mintMap.map.setPaintProperty(layerId, paint_property_names[i], parseInt(value, 10) / 100);
                }
            }else{
                window._mintMap.map.setPaintProperty(layerId, paint_property_name, parseInt(value, 10) / 100);    
            }
        }
        
    }
}

window._mintMap.getLayerNameBySoureLayer = function(sourceLayer) {
    let tempIdx = window._mintMap.metadata.sourceLayers.indexOf(sourceLayer);
    if (tempIdx !== -1) {
        return window._mintMap.metadata.layerNames[tempIdx];
    }
    return undefined;
}