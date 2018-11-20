var Awesomplete = require('awesomplete');
var noUiSlider = require('nouislider');
var MapboxInspect = require('mapbox-gl-inspect');
var mapboxInspectToolkit = require('./mapbox-inspect.js');
var {variableHandler2} = require('./mintmap-variable.js');

const mintMapObserver = new Proxy(window._mintMap, variableHandler2);

module.exports = function () {   
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
    window._mintMap.map.addControl(window._mintMap.mapInspect);

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
                window._mintMap.map.setPaintProperty(layerId, 'raster-opacity', parseInt(currentOpacity, 10) / 100);
                let visibility = window._mintMap.map.getLayoutProperty(layerId, 'visibility');
                if (visibility !== 'visible') {
                    window._mintMap.map.setLayoutProperty(layerId, 'visibility', 'visible');
                }
                layerOptions.step.map(function (ele,idx) {
                    let tmp_layerId = panelId + 'Layer_raster_' + ele;
                    if (idx === 0) {
                        tmp_layerId = panelId + 'Layer_raster';
                    }
                    if (tmp_layerId !== layerId) {
                        window._mintMap.map.setLayoutProperty(tmp_layerId, 'visibility', 'none');
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

    window._mintMap.map.addControl(new mapboxgl.NavigationControl());
    
};