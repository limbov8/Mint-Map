function removeLegend(sourceLayerName) {
    var legendItem = _mintMapShadowRoot.querySelector('#map-legend .legend-of-' + sourceLayerName);
    if (legendItem.parentNode) {
        legendItem.parentNode.removeChild(legendItem);
    }
}
function updateLegend(legendType, legend, sourceLayerName) {
    var legendElement = _mintMapShadowRoot.querySelector('#map-legend');
    // legendElement.innerHTML = '';
    var legendItem = document.createElement('div');
    legendItem.className = "legend-item legend-of-" + sourceLayerName; 
    legendElement.appendChild(legendItem);

    var legendTitle = document.createElement('div');
    legendTitle.className = 'legend-title'
    legendTitle.innerHTML = "Legend of layer <span>#" + sourceLayerName + "</span>:";
    legendItem.appendChild(legendTitle);

    var legendContent = document.createElement('div');
    legendContent.className = 'legend-legend'
    legendItem.appendChild(legendContent);

    if (legendType == 'discrete') {
        for (i = 0; i < legend.length; i++) {
          var label = legend[i].label + "(" + legend[i].value + ")";
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
            text.push(legend[i].value)
        }
        legendBar.style.background = 'linear-gradient(to right, ' + color.join(',') + ')';
        legendContent.appendChild(legendBar);
        var flex = document.createElement('div');
        flex.className = 'legend-flex';
        flex.innerHTML = '<span>' + text.join('</span><span>') + '</span>';
        legendContent.appendChild(flex);
    }
}
function drawOriginalBound(coordinates, id="") {
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
    if (window._mintMap.map.getLayer('boundsOfOriginalDatasets' + id)) {
        window._mintMap.map.removeLayer('boundsOfOriginalDatasets' + id);
    }
    if (!window._mintMap.map.getSource('boundsOfOriginalDatasets' + id)) {
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
    }else{
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
    }
}
function hasLayerNameDisplayed(layerName) {
    let temp = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
        return obj.value === layerName;
    });
    if (temp.length > 0) {
        return true;
    }
    return false;
}
function updateListOfLayersNotAdded(json,removeFromList = true) {
    if (removeFromList) {
        window._mintMap.listOfLayersNotAdded = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
            return obj.value !== json.layerName;
        });
    }else{
        window._mintMap.listOfLayersNotAdded = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
            return obj.value !== json.layerName;
        });
        if (!json.hasData) {
            window._mintMap.listOfLayersNotAdded.unshift({label:json.layerName + " (No data)", value: json.layerName, id: json.layerId, hasData: json.hasData, source: json.sourceLayer, file:""});
        }else{
            window._mintMap.listOfLayersNotAdded.unshift({label:json.layerName, value: json.layerName, id: json.layerId, hasData: json.hasData, source: json.sourceLayer, file:json.file, hasTimeline: json.hasTimeline});
        }
    }
    window._mintMap.autocomplete.list = window._mintMap.listOfLayersNotAdded;
}