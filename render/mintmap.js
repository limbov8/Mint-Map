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
    styleLoaded: false
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
window._mintMap.setOpacity = function(layerId, value, timeline = "no") {
    // map.setPaintProperty(layerId, 'fill-opacity', parseInt(value, 10) / 100);
    if (timeline !== "no") {
        window._mintMap.map.setPaintProperty(layerId + "_" +  timeline + "_raster", 'raster-opacity', parseInt(value, 10) / 100);
    }else{
        window._mintMap.map.setPaintProperty(layerId+'_raster', 'raster-opacity', parseInt(value, 10) / 100);
    }
}

window._mintMap.getLayerNameBySoureLayer = function(sourceLayer) {
    let tempIdx = window._mintMap.metadata.sourceLayers.indexOf(sourceLayer);
    if (tempIdx !== -1) {
        return window._mintMap.metadata.layerNames[tempIdx];
    }
    return undefined;
}