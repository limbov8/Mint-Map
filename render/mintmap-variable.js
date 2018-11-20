function handle_variable() {
    if (!window._mintMap.uiLoaded) {
        setTimeout(handle_variable, 1000);
        return;
    }
    let value = window._mintMap.metadata;
    if (window._mintMap.variableArray.length === 0) {
        return;
    }
    let idxToBeRemoved = [];
    window._mintMap.displayed.forEach(function (ele,idx) {
        // console.log(variableArrayMD5s)
        let alreadyDisplayed = window._mintMap.variableArray.filter(function (obj) {
            return obj.md5 === ele;
        });
        // let isDisplayed = variableArrayMD5s.indexOf(ele);
        if (alreadyDisplayed.length === 0) {
            // remove 
            let idx = window._mintMap.metadata.vectorMD5.indexOf(ele);
            let sourceLayer = window._mintMap.metadata.sourceLayers[idx];
            removeLayerFromMap(sourceLayer, window._mintMap.metadata.hasTimeline[idx]);
            removeInspectLayers(sourceLayer + "Layer");

            
            updateListOfLayersNotAdded({layerName: window._mintMap.metadata.layerNames[idx],
                layerId: window._mintMap.metadata.layerIds[idx], 
                hasData: true,
                sourceLayer: sourceLayer, 
                file:"ckan",
                hasTimeline: window._mintMap.metadata.hasTimeline[idx]
            },
            false);
            // console.log(sourceLayer,{layerName:window._mintMap.getLayerNameBySoureLayer(sourceLayer)},window._mintMap.listOfLayersNotAdded);

            updateShowAllDiv(false);
            idxToBeRemoved.push(idx);
        }
    });
    idxToBeRemoved.forEach(function (ele, idx) {
        window._mintMap.displayed.splice(idx,1);
    })
    // window._mintMap.displayed = [];

    for (var i = 0; i < window._mintMap.variableArray.length; i++) {
        if (!("vectorMD5" in value)) {
            break;
        }
        let md5idx = value.vectorMD5.indexOf(window._mintMap.variableArray[i].md5);
        if (md5idx === -1) {
            continue;
        }
        let displayedIdx = window._mintMap.displayed.indexOf(value.sourceLayers[md5idx]);

        if (!hasLayerNameDisplayed(value.layerNames[md5idx])) {
            continue;
        }
        addNewLayerToMap(value.hasData[md5idx], 
            value.layerIds[md5idx], 
            value.layerNames[md5idx], 
            value.sourceLayers[md5idx], 
            "file",
            value.hasTimeline[md5idx]
        );
    }
}

// Use proxy to observe the change of displayed layer name
// window._mintMap.listOfLayersNotAdded=[];
const variableHandler1 = {
  set(target, key, value) {
    // console.log(`handler1 Setting value ${key} as ${value}`);
    // console.log(target);
    // set up to display when length is changed
    target[key] = value;
    if (key === 'length' && value === window._mintMap.variableArrayCount) {
        // traversal current displayed 
        // remove source/layer not in
        // add all
        if (window._mintMap.metadata.length !== 0) {
            console.log(window._mintMap.variableArray);
            handle_variable();
        }
    }
    return true;//Reflect.set(...arguments);
  }
};
const variableHandler2 = {
    set(target, key, value) {
        // console.log(`handler2 Setting value ${key} as ${value}`);
        target[key] = value;
        if (key === 'metadata') {
            // console.log(target);
            // console.log(value);
            window._mintMap.listOfLayersNotAdded=[];
            let json = value;
            for (var i = 0; i < json.layerNames.length; i++) {
                if (!json.hasData[i]) {
                    window._mintMap.listOfLayersNotAdded.push({
                        label:json.layerNames[i] + " (No data)", 
                        value: json.layerNames[i], 
                        id: json.layerIds[i], 
                        hasData: json.hasData[i], 
                        source: json.sourceLayers[i], 
                        file:"",
                        hasTimeline:false
                    });    
                }else{
                    // if (json.layerNames[i] != window.__defaultLayerName) {
                    window._mintMap.listOfLayersNotAdded.push({
                        label:json.layerNames[i], 
                        value: json.layerNames[i], 
                        id: json.layerIds[i], 
                        hasData: json.hasData[i], 
                        source: json.sourceLayers[i], 
                        file: json.layers[i].file,
                        hasTimeline: json.hasTimeline[i]
                    });
                    // }
                }
            }
            if (window._mintMap.variableArray.length !== 0) {
                handle_variable();
            }
        }
        return true;
        // return Reflect.set(...arguments);
    }
}