var {
    loadLayer
} = require('./mapbox-layer-utils.js');

function handle_variable() {
    if (!window._mintMap.uiLoaded) {
        setTimeout(handle_variable, 1000);
        return;
    }
    if (window._mintMap.variableArray.length === 0) {
        return;
    }
    for (var i = 0; i < window._mintMap.variableArray.length; i++) {
        if (window._mintMap.variableArray[i].hasOwnProperty('md5')) {
            loadLayer({md5:window._mintMap.variableArray[i].md5});
        }
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
// const variableHandler2 = {
//     set(target, key, value) {
//         // console.log(`handler2 Setting value ${key} as ${value}`);
//         target[key] = value;
//         if (key === 'metadata') {
//             // console.log(target);
//             // console.log(value);
//             window._mintMap.listOfLayersNotAdded=[];
//             let json = value;
//             for (var i = 0; i < json.layerNames.length; i++) {
//                 if (!json.hasData[i]) {
//                     window._mintMap.listOfLayersNotAdded.push({
//                         label:json.layerNames[i] + " (No data)", 
//                         value: json.layerNames[i], 
//                         id: json.layerIds[i], 
//                         hasData: json.hasData[i], 
//                         source: json.sourceLayers[i], 
//                         file:"",
//                         hasTimeline:false
//                     });    
//                 }else{
//                     // if (json.layerNames[i] != window.__defaultLayerName) {
//                     window._mintMap.listOfLayersNotAdded.push({
//                         label:json.layerNames[i], 
//                         value: json.layerNames[i], 
//                         id: json.layerIds[i], 
//                         hasData: json.hasData[i], 
//                         source: json.sourceLayers[i], 
//                         file: json.layers[i].file,
//                         hasTimeline: json.hasTimeline[i]
//                     });
//                     // }
//                 }
//             }
//             if (window._mintMap.variableArray.length !== 0) {
//                 handle_variable();
//             }
//         }
//         return true;
//         // return Reflect.set(...arguments);
//     }
// }

module.exports = {
    handle_variable,
    variableHandler1
    // variableHandler2
};