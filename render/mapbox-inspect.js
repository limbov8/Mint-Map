var mapboxInspectToolkit = {
    displayValue : function (value) {
      if (typeof value === 'undefined' || value === null) return value;
      if (value instanceof Date) return value.toLocaleString();
      if (typeof value === 'object' ||
              typeof value === 'number' ||
              typeof value === 'string') return value.toString();
      return value;
    },
    
    getMode: function (array) {
        if(array.length == 0)
            return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for(var i = 0; i < array.length; i++)
        {
            var el = array[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    },
    renderProperty : function(propertyName, property) {
      return '<div class="mapbox-gl-inspect_property">' +
        '<div class="mapbox-gl-inspect_property-name">' + propertyName + '</div>' +
        '<div class="mapbox-gl-inspect_property-value">' + this.displayValue(property) + '</div>' +
        '</div>';
    },

    renderLayer : function(layerId) {
      return '<div class="mapbox-gl-inspect_layer">' + layerId + '</div>';
    },

    renderProperties : function(getModeForEachLayer) {
        var self = this;
        // var layer = feature.layer['source-layer'] || feature.layer.source;
        // var sourceProperty = self.renderLayer(layer);
        // var typeProperty = '';//self.renderProperty('$type', feature.geometry.type);
        var layersElements = [];
        Object.keys(getModeForEachLayer).map(function (layerName) {
            var layerElement = self.renderLayer(layerName);
            var oneLayerElement = [layerElement];
            if (layerName in window._mintMap.geojson_dot_map_layers_need_special_attention_for_inspection) {
                let current_property_name = window._mintMap.geojson_dot_map_layers_need_special_attention_for_inspection[layerName];
                var modeValue = self.getMode(getModeForEachLayer[layerName][current_property_name]);
                if (modeValue!=null) {
                     oneLayerElement.push(layerElement + self.renderProperty(current_property_name, modeValue));
                }
            }else{
                Object.keys(getModeForEachLayer[layerName]).map(function (propertyName) {
                    var modeValue = self.getMode(getModeForEachLayer[layerName][propertyName]);
                    if (modeValue!=null) {
                         oneLayerElement.push(self.renderProperty(propertyName, modeValue));
                    }
                })
            }
            layersElements.push(oneLayerElement.join(''));
        });
        return layersElements.join('');
        // return self.renderProperty(propertyName, feature.properties[propertyName]);
        // return [sourceProperty, typeProperty].concat(properties).join('');
    },
    calcModeForLayers: function (feature, getModeForEachLayer) {
        var self = this;
        var layer = feature.layer['source-layer'] || feature.layer.source;
        getModeForEachLayer[layer] = {};

        Object.keys(feature.properties).map(function (propertyName) {
            if (propertyName in getModeForEachLayer[layer]) {
                getModeForEachLayer[layer][propertyName].push(feature.properties[propertyName]);
            }else{
                getModeForEachLayer[layer][propertyName] = [feature.properties[propertyName]];
            }
        });
    },
    renderFeatures : function(features) {
        var self = this;
        var getModeForEachLayer = {};

        features.map(function (ft) {
            self.calcModeForLayers(ft, getModeForEachLayer);
        });
        return '<div class="mapbox-gl-inspect_feature">' + self.renderProperties(getModeForEachLayer) + '</div>';//.join('');
    }
};
export default mapboxInspectToolkit;
// module.exports = mapboxInspectToolkit;