var md5 = require('md5');
var Awesomplete = require('awesomplete');
var MapboxInspect = require('mapbox-gl-inspect');
var wNumb = require('wnumb');
var noUiSlider = require('nouislider');
require('./date-format.js');

window._mintMap = {setOpacity: ()=>{}, onresize: ()=>{}, getLayerNameBySoureLayer:()=>{}, variableArrayCount:0, metadata: [], listOfLayersNotAdded:[], displayed:[], variableArray:[], mapInspect:{}, uiLoaded:false, autocomplete:{}, toggleClass:()=>{}, bounds:[22.4, 3.4, 37.0, 23.2], sliderData:{}};
window.loadMapLayers = function(mapboxgl){
    // Use proxy to observe the change of displayed layer name
    // window._mintMap.listOfLayersNotAdded=[];
    const handler1 = {
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
    const handler2 = {
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
    const variableArrayObserver = new Proxy(window._mintMap.variableArray, handler1);
    const mintMapObserver = new Proxy(window._mintMap, handler2);
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
    map.resize();
    setTimeout(function () {
        map.resize();
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
    window._mintMap.onresize = function() {
          window._polymerMap.mint_map_element.style.height = window._polymerMap.mint_map_element.parentNode.host.clientHeight + "px";
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
        	map.setPaintProperty(layerId+'_raster_' + timeline, 'raster-opacity', parseInt(value, 10) / 100);
        }else{
        	map.setPaintProperty(layerId+'_raster', 'raster-opacity', parseInt(value, 10) / 100);
        }
    }

    window._mintMap.getLayerNameBySoureLayer = function(sourceLayer) {
        let tempIdx = window._mintMap.metadata.sourceLayers.indexOf(sourceLayer);
        if (tempIdx !== -1) {
            return window._mintMap.metadata.layerNames[tempIdx];
        }
        return undefined;
    }
    /* given a query in the form "lng, lat" or "lat, lng" returns the matching
     * geographic coordinate(s) as search results in carmen geojson format,
     * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
     */
    var coordinatesGeocoder = function (query) {
        // match anything which looks like a decimal degrees coordinate pair
        var matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
        if (!matches) {
            return null;
        }

        function coordinateFeature(lng, lat) {
            return {
                center: [lng, lat],
                geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                place_name: 'Lat: ' + lat + ', Lng: ' + lng, // eslint-disable-line camelcase
                place_type: ['coordinate'], // eslint-disable-line camelcase
                properties: {},
                type: 'Feature'
            };
        }

        var coord1 = Number(matches[1]);
        var coord2 = Number(matches[2]);
        var geocodes = [];

        if (coord1 < -90 || coord1 > 90) {
            // must be lng, lat
            geocodes.push(coordinateFeature(coord1, coord2));
        }

        if (coord2 < -90 || coord2 > 90) {
            // must be lat, lng
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        if (geocodes.length === 0) {
            // else could be either lng, lat or lat, lng
            geocodes.push(coordinateFeature(coord1, coord2));
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        return geocodes;
    };


    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 10,
        bbox: [22.9,3.3,36.5,12.5],
        placeholder: "Try: 29.7, 7.9"
    });

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
                var layerElement= self.renderLayer(layerName);
                var oneLayerElement = [];
                Object.keys(getModeForEachLayer[layerName]).map(function (propertyName) {
                    var modeValue = self.getMode(getModeForEachLayer[layerName][propertyName]);
                    if (modeValue!=null) {
                         oneLayerElement.push(layerElement + self.renderProperty(propertyName, modeValue));
                    }
                })
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
    }

    map.on('load', function () {   
        window._mintMap.mapInspect = new MapboxInspect({
            showInspectButton: false,
            showMapPopup: true,
            // showInspectMapPopupOnHover:true,
            showMapPopupOnHover: false,
            showInspectMapPopupOnHover: false,
            // queryParameters: {
            //     layers: ['landuseLayer']
            // },
            renderPopup: function(features) {
                return mapboxInspectToolkit.renderFeatures(features);
            }
        });
        map.addControl(window._mintMap.mapInspect);

        fetch("http://jonsnow.usc.edu:8081/mintmap/meta/metadata.json?ver=" + Math.random())
        .then(response => response.json())
        .then(json => {
            // console.log('loaded');
            // var layersIds = [];
            // var layerNames = [];
            // var layerIdSource = {};
            // var layerIdName = {};
            // // console.log(json.layerNames);
            // var layerNames = 
            // for (var i = 0; i < json.layerNames.length; i++) {

                // layersIds.push(json.layerIds[i]);
                // layerIdSource[json.layerIds[i]] = json.sourceLayers[i];
                // layerIdName[json.layerIds[i]] = json.sourceNames[i];
            // }
            // console.log(json);
            mintMapObserver.metadata = json;                
                    
            
            var layersWrapper = document.createElement('div');
            layersWrapper.className = "settingsWrapper";
            var collapse = document.createElement('div');
            collapse.className = "collapse-control";
            collapse.innerHTML = "";
            collapse.onclick = function (e) {
                window._mintMap.toggleClass(_mintMapShadowRoot.querySelector('.settingsWrapper'), 'slideDown');
                window._polymerMap.mint_map_element.querySelector('.settings').scrollTo(0,0)
            }
            layersWrapper.appendChild(collapse);
            
            var layers = document.createElement('div');
            layers.className = "settings";
            layersWrapper.appendChild(layers);
            var layerSwitch = document.createElement('div');
            layerSwitch.setAttribute('id','layerSwitch');
            layers.appendChild(layerSwitch);
            
            var variableTitle = document.createElement('div');
            variableTitle.className = 'variableTitle';
            variableTitle.innerHTML = "<h2>Layers</h2>";
            layers.appendChild(variableTitle);

            var tagsList = document.createElement('div');
            tagsList.setAttribute('id','theTagList');
            tagsList.className = "layerList tags";

            var tagul = document.createElement('ul');
            tagul.setAttribute('id','the-ul-of-layer-list');
            tagul.className = 'tags-list';
            var tagSearch = document.createElement('li');
            tagSearch.setAttribute('id','the-li-of-add-new-layer');
            tagSearch.innerHTML = "<a id='add-new-layer' class='tag function-tag' onclick='this.style.display=\"none\";window._polymerMap.mint_map_element.querySelector(\"#search-new-layer\").style.display=\"block\";window._polymerMap.mint_map_element.querySelector(\"#search-new-layer\").value=\"\";window._polymerMap.mint_map_element.querySelector(\"#search-new-layer\").focus();window._polymerMap.mint_map_element.querySelector(\"#the-li-of-add-new-layer .awesomplete\").style.display = \"inline-block\";return false;'>Add New Layer</a><input id='search-new-layer' class='awesomplete' style='display:none' placeholder='Search new layers'>";

            var tagShowAll = document.createElement('li');
            tagShowAll.innerHTML = "<a id='show-all-layers' class='tag function-tag' data-show='no'>Show All Layers</a>";

            tagul.appendChild(tagSearch);
            tagul.appendChild(tagShowAll);
            tagsList.appendChild(tagul);
            layers.appendChild(tagsList);

            var layersPropertyList = document.createElement('div');
            layersPropertyList.className = "properties";
            // for (var i = 0; i < json.layerIds.length; i++) {
            //     var name = json.layerNames[i];
            //     var id = json.layerIds[i];

            // } 
            createProperitesPanel(layers, layersPropertyList, json.sourceLayers, json.layerNames, json.hasData, json.hasTimeline);
            layers.appendChild(layersPropertyList);
            _mintMapShadowRoot.querySelector('.geocoder').appendChild(geocoder.onAdd(map));
            _mintMapShadowRoot.querySelector('.geocoder').appendChild(layersWrapper);


            _mintMapShadowRoot.querySelectorAll(".property-slider").forEach(function (ele,idx) {
                let panelId = ele.getAttribute("data-panel");
                noUiSlider.create(ele, window._mintMap.sliderData[panelId]);
                ele.noUiSlider.on('update', function( values, handle ) {
                    // console.log(typeof values[handle]);
                });
                ele.noUiSlider.on('change', function( values, handle ) {
                    // let value = this.valuesOfYear[parseInt(values[handle])];
                    // let allValuesOfYear = Object.values(this.valuesOfYear);
                    // setPaint(value, allValuesOfYear);
                    // let visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                    // console.log(window._mintMap.sliderData[panelId].extraOption , (new Date(values[handle])) );
                    let map = window._mintMap.map;
                    let d = new Date(parseInt(values[handle]));
                    if (isNaN(d.getTime())) {
                        console.log("slider time stamp is wrong!");
                        return;
                    }
                    if (window._mintMap.mapInspect._popup.isOpen()) {
                    	window._mintMap.mapInspect._popup.remove();
                    }
                    let currentOpacity = ele.parentElement.parentElement.querySelector('.opacity-slider').value;
                    let layerOptions = window._mintMap.sliderData[panelId].extraOption;
                    let step = d.format(layerOptions.stepOption.format);
                    // console.log(values);
                    let layerId = panelId + 'Layer_raster_' + step;
                    // console.log(ele.parentElement.parentElement.querySelector('.opacity-slider'), step, layerOptions.step);
                    ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', step);
                    if (step === layerOptions.step[0]) {
                        layerId = panelId + 'Layer_raster';
                        ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', "no");
                    }
                    map.setPaintProperty(layerId, 'raster-opacity', parseInt(currentOpacity, 10) / 100);
                    let visibility = map.getLayoutProperty(layerId, 'visibility');
                    if (visibility !== 'visible') {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    }
                    layerOptions.step.map(function (ele,idx) {
                        let tmp_layerId = panelId + 'Layer_raster_' + ele;
                        if (idx === 0) {
                            tmp_layerId = panelId + 'Layer_raster';
                        }
                        if (tmp_layerId !== layerId) {
                            map.setLayoutProperty(tmp_layerId, 'visibility', 'none');
                        }
                    })
                });
            });


            var searchNewLayer = _mintMapShadowRoot.querySelector("#search-new-layer");
            window._mintMap.autocomplete = new Awesomplete(searchNewLayer, {
                list: window._mintMap.listOfLayersNotAdded,
                maxItems: 5,
                minChars: 1,
                autoFirst:true
            });
            Awesomplete.$.bind(searchNewLayer, { "awesomplete-selectcomplete": function (event) {
                // console.log(event);
                var name = event.text.value;
                var idx = json.layerNames.indexOf(name);
                if (idx != -1) {
                    
                    var hasLayer = addNewLayerToMap(
                        json.hasData[idx], 
                        json.layerIds[idx], 
                        json.layerNames[idx], 
                        json.sourceLayers[idx], 
                        json.hasData[idx] ? json.layers[idx].file : "",
                        json.hasTimeline[idx]);
                    if (hasLayer) {
                        window._mintMap.listOfLayersNotAdded = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
                            return obj.value !== json.layerNames[idx];
                        });
                        window._mintMap.autocomplete.list = window._mintMap.listOfLayersNotAdded;
                    }
                    
                    // var newLayer = document.createElement('li');
                    // newLayer.innerHTML = "<a href='#' class='tag " + (json.hasData[idx] ? "with-data-tag":"no-data-tag") + "' data-layer-id='"+json.layerIds[idx]+"' data-has-data='" + (json.hasData[idx] ? "true":"false") + "'>" + json.layerNames[idx] + "<div class='tag_close'></div></a>";
                    // var tagul = document.getElementById('the-ul-of-layer-list');
                    // var tagSearch = document.getElementById('the-li-of-add-new-layer');
                    // tagul.insertBefore(newLayer, tagSearch);
                    
                    // Change the style of function tag of search
                    var searchNewLayer = _mintMapShadowRoot.querySelector("#search-new-layer");
                    searchNewLayer.style.display = "none";
                    
                    var addNewLayer = _mintMapShadowRoot.querySelector("#add-new-layer");
                    addNewLayer.style.display = "block";
                    _mintMapShadowRoot.querySelector("#the-li-of-add-new-layer .awesomplete").style.display = "none";
                }
            } });
            window._mintMap.uiLoaded = true;
        },
        error => {
            console.log(error);
        });

        map.addControl(new mapboxgl.NavigationControl());
        
    });
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
    function addNewLayerToMap(hasData, layerId, layerName, sourceLayer, file, hasTimeline = false) {
        if (!hasData) {
            alert('The data source of this layer has not been added! Can not be shown on the map.');
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
        if (map.getLayer(layerName)) {
            map.removeLayer(layerName);
            map.removeLayer(layerName+"_raster");
            removeLegend(sourceLayer);
            removeInspectLayers(layerName);
            updatePropertiesSettingBy(layerName);
        }
        if (map.getLayer('boundsOfOriginalDatasets' + sourceLayer)) {
            map.removeLayer('boundsOfOriginalDatasets' + sourceLayer);
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
                if (map.getLayer(rasterLayer)) {
                    map.removeLayer(rasterLayer);
                }
                if (map.getLayer(vectorLayer)) {
                    map.removeLayer(vectorLayer);
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
        var layers = map.getStyle().layers;
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

        if (!map.getSource(window._mintMap.metadata.sourceLayers[identifier])) {
            map.addSource(window._mintMap.metadata.sourceLayers[identifier],{
                type: 'vector',
                tiles: [server + vectorMD5 + tile_path + '.pbf']
            });
        }

        // Start raster layer
        let rasterMD5 = window._mintMap.metadata.rasterMD5[identifier];
        let rasterLayerId = obj.id.replace('vector_pbf','raster_png');
        if (!map.getSource(rasterLayerId)) {
            map.addSource(rasterLayerId, {
                type: 'raster',
                tiles: [server + rasterMD5 + tile_path + '.png'],
                bounds: window._mintMap.bounds
            });
        }
        
        map.addLayer({
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
        map.addLayer({
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
            map.setPaintProperty(curLayerName, 'fill-color', JSON.parse(json.colormap));
            // map.setPaintProperty('landuseLayer', 'fill-color',styleExpression);
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

            if (!map.getSource(vectorSourceId_of_idx)) {
                map.addSource(vectorSourceId_of_idx,{
                    type: 'vector',
                    tiles: [server + vectorMD5_of_idx + tile_path + '.pbf']
                });
            }

            if (!map.getSource(rasterSourceId_of_idx)) {
                map.addSource(rasterSourceId_of_idx, {
                    type: 'raster',
                    tiles: [server + rasterMD5_of_idx + tile_path + '.png'],
                    bounds: window._mintMap.bounds
                });
            }

            let rasterLayerId_of_idx = curLayerName + "_raster_" + timelineLayer.step[i];
            let vectorLayerId_of_idx = curLayerName + "_vector_" + timelineLayer.step[i];

            if (!map.getLayer(rasterLayerId_of_idx)) {
                map.addLayer({
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
            
            if (!map.getLayer(vectorLayerId_of_idx)) {
                map.addLayer({
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
        var layers = map.getStyle().layers;
        // Find the index of the first symbol layer in the map style
        var firstSymbolId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol') {
                firstSymbolId = layers[i].id;
                break;
            }
        }
        if (map.getLayer('boundsOfOriginalDatasets' + id)) {
            map.removeLayer('boundsOfOriginalDatasets' + id);
        }
        if (!map.getSource('boundsOfOriginalDatasets' + id)) {
            map.addLayer({
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
            map.addLayer({
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
    function updateShowAllDiv(isClick = true) {
        var showAllLayers = _mintMapShadowRoot.querySelector('#show-all-layers');
        var tagul = _mintMapShadowRoot.querySelector('#the-ul-of-layer-list');
        for (var i = 0; i < window._mintMap.listOfLayersNotAdded.length; i++) {
            let alreadyDisplayed = tagul.querySelector("[data-layer-id="+window._mintMap.listOfLayersNotAdded[i].id+"]");
            if (alreadyDisplayed) {
                alreadyDisplayed.parentNode.remove();
            }
        }
        if (!isClick && showAllLayers.getAttribute('data-show') == 'no') {
            return;
        }
        
        var showAll = document.createElement('ul');
        showAll.className='tags-list';
        showAll.setAttribute('id','show-all-div');
        for (var i = 0; i < window._mintMap.listOfLayersNotAdded.length; i++) {
            var newLayer = document.createElement('li');
            newLayer.innerHTML = "<a class='tag " 
                                + (window._mintMap.listOfLayersNotAdded[i].hasData ? "with-data-tag":"no-data-tag") 
                                + "' data-layer-id='"+ window._mintMap.listOfLayersNotAdded[i].id +"' data-has-data='" 
                                + (window._mintMap.listOfLayersNotAdded[i].hasData ? "true":"false") 
                                + "' data-source-layer='" + window._mintMap.listOfLayersNotAdded[i].source 
                                + "' data-file='"+ window._mintMap.listOfLayersNotAdded[i].file 
                                + "' data-has-timeline='" + (window._mintMap.listOfLayersNotAdded[i].hasTimeline ? "true":"false") + "'>" 
                                + window._mintMap.listOfLayersNotAdded[i].value 
                                + "<div class='tag_close tag_add'></div></a>";
            showAll.appendChild(newLayer);
        }
        var clearBoth = document.createElement('div');
        clearBoth.style.clear = "both";
        showAll.appendChild(clearBoth);
        var showDiv = _mintMapShadowRoot.querySelector('#show-all-div');
        if(showDiv){
            showDiv.remove();
        }
        _mintMapShadowRoot.querySelector('#theTagList').appendChild(showAll);
        
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
    
    function createProperitesPanel(layers, layersPropertyList, layersIds, layerNames, haveData, haveTimeline ) {
    
        // var layersPropertyList = document.createElement('div');
        // layersPropertyList.className = "properties";
        
        for (var i = 0; i < layersIds.length; i++) {
            if (!haveData[i]) {
                continue;
            }
            var id = layersIds[i] + "Layer";
            var name = layerNames[i];

            var layerProperty = document.createElement('div');
            layerProperty.setAttribute('id','layerById-' + id);
            layerProperty.className="card";
            layerProperty.style.display = "none";
            layerProperty.innerHTML = "<h3>" + name + " Layer Properties</h3>" 
                                     + "<div class='props'>" 
                                     + "<h4>Opacity</h4>" 
                                     + "<div class='control'>" 
                                     + "<input type='range' min='1' max='100' value='80' class='slider opacity-slider' " 
            						 + "data-time='no' "
                                     + "oninput='window._mintMap.setOpacity(\""+id+"\", this.value, this.getAttribute(\"data-time\"))'>"
                                     + "</div>";
            if (haveTimeline[i]) {
                // console.log(layersIds[i],window._mintMap.metadata.layers);
                // layerids is sourcelayer id!!!
                let timeLineData = window._mintMap.metadata.layers.filter(function (ele) {
                    return ele['source-layer'] === layersIds[i];
                })[0];
                layerProperty.innerHTML += "<div class='props'>"
                                     + "<h4>" + timeLineData.stepType + (typeof timeLineData.stepOption.prefix === "undefined" ? "" : (" (" + timeLineData.stepOption.prefix + ")") ) + "</h4>"
                                     + '<div class="property-slider" id="property-slider-'+layersIds[i]
                                     // layerids is sourcelayer id!!!
                                     +'" data-panel="' + layersIds[i] + '"><div>'
                                     + "</div>";

                let years = timeLineData.step.map(function (ele) {
                    if (timeLineData.stepOption.format === "yyyy") {
                  		return new Date(ele,0,1).getTime();	
                  	}else if (timeLineData.stepOption.format === "MM") {
                  		return new Date(parseInt(timeLineData.stepOption.prefix), parseInt(ele)-1,1).getTime();
                  	}
                    return (new Date(ele)).getTime();
                });
                console.log(years);
                let yearsLength = years.length-1;
                let yearRange = {
                        'min': [years[0]],
                        'max': [years[yearsLength]]
                    };
                let yearDiff = yearRange.max - yearRange.min;
                years.forEach(function (year, idx) {
                    if (idx === 0 || idx === yearsLength) {
                        return;
                    }
                    let percent = Math.ceil((year - years[0])/yearDiff*100) + "%";
                    yearRange[percent] = [year];
                });
                window._mintMap.sliderData[layersIds[i]] = {
                        start: yearRange.min, 
                        snap: true, 
                        range: yearRange, 
                        connect: [true, false],
                        // tooltips: true,
                        format: wNumb({
                            decimals: 0
                        }),
                        pips: {
                            mode: 'range',
                            density: 100,
                            format: {
                              to: function ( value ) {
                                return  (new Date(value)).format(timeLineData.stepOption.format);
                              },
                              from: function ( value ) {
                              	if (timeLineData.stepOption.format === "yyyy") {
                              		return new Date(value,0,1).getTime();	
                              	}else if (timeLineData.stepOption.format === "MM") {
                              		return new Date(value).getTime();
                              	}
                              	return new Date(value).getTime();
                              }
                            }
                        },
                        extraOption: timeLineData
                    }
            }

                                     

            var isVis = map.getLayer(id); //&& map.getLayoutProperty(id, 'visibility') === "visible";
            if (isVis) {
                if (map.getLayoutProperty(id, 'visibility') === "visible") {
                    layerProperty.style.display = "block";
                }
            }
            layersPropertyList.appendChild(layerProperty);
            // layers.appendChild(link);
        }
    
        // body...
    }
    function updatePropertiesSettingBy(layerName, remove = true) {
        var ele = _mintMapShadowRoot.querySelector('#layerById-' + layerName);
        if (remove) {
            ele.style.display = "none";
        } else {
            ele.style.display = "block";
        }
    }
    map.on('mousemove', function (e) {
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