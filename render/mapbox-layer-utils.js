var md5 = require('md5');
var moment = require('moment')
var {
    createProperitesPanel,
    updatePropertiesSettingBy
} = require('./mintmap-ui-utils.js');
var {
    removeLegend,
    updateLegend,
    drawOriginalBound,
    removeBoundary,
    updateListOfLayersNotAdded
} = require('./mapbox-utils.js');

var _mintMapShadowRoot = window._polymerMap;
var noUiSlider = require('./noUiSliderRevised.js');
var PLAY_BTN_IMG = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEcSURBVEhL3dU/S0JRGMfxawputTg0CYKrS4KD+gJ6CdEWTqKDBAnOjg45OejoVHtb0JCEQRC4+A6EdlEoor7PPYjd65/ufe6FG/3gA885gz+uHM6x/mWyGOEDXwEscYtDbOQRNcTtlT5JDHBtr1yRLwhasEoeL2Z0Rj41rOQwMaMzkZc0cWpGT1GV9PCOIVKy8UvUJZfoYIZz7Iu6pGpG6wSvuENaNrYkcIkkgRbeUMcBfiaUklXkQHyiYq/WCaXkGHJ1TFGWDVcClcRwAfmb2pArZFvUJXKy7vEM+ZF9UZfM0YCX+01VcoaMGT1FVeI30ZYssOu0+E0RT2Z05gZ9FCCPjlYJD7jCRo7QxRjyqmnJMy4FYb2yfyaW9Q1xY2SBkW6i0gAAAABJRU5ErkJggg==">';
var PAUSE_BTN_IMG = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADpSURBVEhL7dW/CkFRAMfxK4NSyAsYZDUpA97EE8hstHgBJgOrhZcwkAwmu8ELSMqfUvj+3K7un+n+KcKvPnXOGc6vczvdY3xlCpjjinsIZ0yQhiczNBF/zoIngSG6z5krOkHYAislrMyhMzpqVClibQ6deVtJDFkbfW8lCWstowVXfJVogxt2uKABpY8j9thqwRXfJdpI0cb2Eo1z+Je88i/xXXJAHiPYS9qoIXRJChubOpQOrDX9WN3xVRI0P1BygvUDDJsKFubQmTEGKEOPTlBVTNGCJ7quPSyhVy0o3TYVRPXKfkwM4wG6h3SxfzKqPAAAAABJRU5ErkJggg==">';
var PROMISE_STYLE_LOADING_WAIT = parseInt(process.env.PROMISE_STYLE_LOADING_WAIT)

// layerId is used as "source[tile server path]" id, also used as panel css id
// sourceLayer is used for vector dataset source layer, also used as "layer[mapbox layer parameter]" id
// layerName is used to display in the list, also used as unique identity for one panel
function initLayerSearchAutocomplete(data) {
    delete data.type;
    var autoList = Object.keys(data);
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            window._mintMap.listOfLayersNotAdded.push({
                label: k, 
                value: k,
                md5: data[k]
            });
        }
    }
    // window._mintMap.listOfLayersNotAdded = autoList;
    var searchNewLayer = window._polymerMap.querySelector("#search-new-layer");
    window._mintMap.autocomplete = new Awesomplete(searchNewLayer, {
        list: window._mintMap.listOfLayersNotAdded,
        maxItems: 5,
        minChars: 1,
        autoFirst:true
    });
 
    Awesomplete.$.bind(searchNewLayer, { "awesomplete-selectcomplete": function (event) {
        let value = event.text.value;
        let tmp = window._mintMap.listOfLayersNotAdded.filter(function (obj) {
            return obj.value === value;
        });

        if (tmp.length === 1) {
            loadLayer({md5: tmp[0].md5});
        }else{
            console.error("No search result or duplicate search result")
        }
        // console.log(data[name]);
        // Change the style of function tag of search
    } });
}

function loadLayer({ md5 = null, dcid = null} = {}) {
    if (md5 == null && dcid == null) {
        console.error("MD5 or DCID is required.")
        return false;
    }

    var url = process.env.API_LAYER_BASE_URL;


    let jsonArr = window._mintMap.loadedJson.filter(function (obj) {
        if (dcid != null) {
            return obj.dcid === dcid;
        }else{
            return obj.md5vector === md5;
        }
    });
    if (jsonArr.length > 0) {
        let json = jsonArr[0];
        // already displayed
        var ele = _mintMapShadowRoot.querySelector('#layerById-' + json.layerId);
        if (ele && ele.style && ele.style.display === "block") {
            return true;
        }

        loadLayerFromJsonPrefix(json);
        return true;
    }

    if (dcid != null) {
        url += "dc/" + dcid;
    }else{
        url += md5;
    }

    fetch(url + "?ver=" + Math.random())
    .then(response => response.json())
    .then(json => {
        // var idx = json.layerNames.indexOf(name);
        // if (idx != -1) {
        if (json.hasTimeline) {
            json.colormap = json.colormap.split('|');
            json.legend = json.legend.split('|');
        }
        window._mintMap.loadedJson.push(json);
        loadLayerFromJsonPrefix(json);
        // }

    }).catch(error => console.warn(error));
    return true;
}

function loadLayerFromJsonPrefix(json) {
    var hasLayer = addNewLayerToMap(json);
    
    var searchNewLayer = window._polymerMap.querySelector("#search-new-layer");
    searchNewLayer.style.display = "none";

    var addNewLayer = window._polymerMap.querySelector("#add-new-layer");
    addNewLayer.style.display = "block";
    window._polymerMap.querySelector("#the-li-of-add-new-layer .awesomplete").style.display = "none";
}

function addNewLayerToMap(json) {
    if (!json.hasData) {
        alert('The data source of this layer has not been added! Can not be shown on the map.');
        return false;
    }

    var newLayer = document.createElement('li');
    newLayer.innerHTML = "<a class='tag " 
    + (json.hasData ? "with-data-tag":"no-data-tag") 
    + "' data-id='" + json.id  
    + "'>" 
    + json.layerName + "<div class='tag_close'></div></a>";
    var tagul = _mintMapShadowRoot.querySelector('#the-ul-of-layer-list');
    var tagSearch = _mintMapShadowRoot.querySelector('#the-li-of-add-new-layer');
    tagul.insertBefore(newLayer, tagSearch);
    loadLayerFromJson(json);

    return true;

}
function removeLayerFromMap(json_id) {
    var jsonArr = window._mintMap.loadedJson.filter(function (obj) {
        return obj.id === json_id;
    });
    if (jsonArr.length == 0) {
        console.error("No such a Json");
        return false;
    }

    var json = jsonArr[0];

    let curLayerName = json.sourceLayer + "_Layer";
    let vectorMapboxLayerId = curLayerName + '_vector';
    let rasterMapboxLayerId = curLayerName + '_raster';
    resetSlider(json.layerId);
    removeBoundary(json.id);

    if (window._mintMap.map.getLayer(vectorMapboxLayerId)) {
        window._mintMap.map.removeLayer(vectorMapboxLayerId);
        window._mintMap.map.removeLayer(rasterMapboxLayerId);
        removeLegend(json.layerId);
        removeInspectLayers(vectorMapboxLayerId);
        updatePropertiesSettingBy(json);
    }
    if (json.hasTimeline) {
        let jsonSteps = json.layers.step;
        if (typeof(jsonSteps) === "undefined" ) {
            console.error("This metadata is not designed for timeline");
            return;
        }
        
        if (json.layers.step.length <= 1) {
            console.error("There are only one time stamp in the Timeseries");
            return;
        }
        // remove all layers except the first one
        for (var i = 1; i < json.layers.step.length; i++) {
            // remove all inspect layers

            let curLayerName = json.sourceLayer + "_Layer_" + i;
            let vectorMapboxLayerId = curLayerName + '_vector';
            let rasterMapboxLayerId = curLayerName + '_raster';
            removeInspectLayers(vectorMapboxLayerId);
            if (window._mintMap.map.getLayer(rasterMapboxLayerId)) {
                window._mintMap.map.removeLayer(rasterMapboxLayerId);
            }
            if (window._mintMap.map.getLayer(vectorMapboxLayerId)) {
                window._mintMap.map.removeLayer(vectorMapboxLayerId);
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
function loadLayerFromJson(json) {

    let layerId = json.layerId;
    let vectorServerSourceId = layerId;
    let rasterServerSourceId = layerId.replace('vector_pbf','raster_png');
    
    var curLayerName = json.sourceLayer + "_Layer";
    let vectorMapboxLayerId = curLayerName + '_vector';
    let rasterMapboxLayerId = curLayerName + '_raster';


    loadSingleLayer(json);
    // The first one
    updateInspectLayers(vectorMapboxLayerId);

    if (json.hasTimeline) {
        loadTilesOfTimeline(json);
    }

    // window._mintMap.displayed.push(vectorMD5);

    var ele = _mintMapShadowRoot.querySelector('#layerById-' + json.layerId);
    if ( !ele ) {
        createProperitesPanel(json);
        setupSlider(json.layerId);
    }
    
    updatePropertiesSettingBy(json, false);
    updateListOfLayersNotAdded(json, true);
    
    // window._mintMap.map.setPaintProperty('landuseLayer', 'fill-color',styleExpression);
    updateLegend(json['legend-type'], JSON.parse(json.legend[0]), json.sourceLayer, json.layerId, 0);
    drawOriginalBound(JSON.parse(json.originalDatasetCoordinate), json.id);
    // addPropertySetting Panel
}
function loadSingleLayer(json) {
    let tile_path = window._mintMap.metadata.tiles;
    let server = window._mintMap.metadata.server;
    let vectorMD5 = json.md5vector;
    let rasterMD5 = json.md5raster;

    let layerId = json.layerId;
    let vectorServerSourceId = layerId;
    let rasterServerSourceId = layerId.replace('vector_pbf','raster_png');
    
    var curLayerName = json.sourceLayer + "_Layer";
    let vectorMapboxLayerId = curLayerName + '_vector';
    let rasterMapboxLayerId = curLayerName + '_raster';

    if (!window._mintMap.map.getSource(vectorServerSourceId)) {
        window._mintMap.map.addSource(vectorServerSourceId,{
            type: 'vector',
            tiles: [server + vectorMD5 + tile_path + '.pbf']
        });
    }

    if (!window._mintMap.map.getSource(rasterServerSourceId)) {
        window._mintMap.map.addSource(rasterServerSourceId, {
            type: 'raster',
            tiles: [server + rasterMD5 + tile_path + '.png'],
            bounds: window._mintMap.bounds
        });
    }

    if (!window._mintMap.map.getLayer(rasterMapboxLayerId)) {
        window._mintMap.styleLoaded = false;
        window._mintMap.map.addLayer({
            "id": rasterMapboxLayerId,
            "type": 'raster',
            'source': rasterServerSourceId,
            'layout': {
                'visibility': 'visible',
            },
            'paint':{
                'raster-opacity':0.8
            },
        });
        if (!window._mintMap.styleLoaded) {
            setTimeout(function () {
                loadSingleLayer(json);
            }, PROMISE_STYLE_LOADING_WAIT);
            return;
        }
    }

    if (!window._mintMap.map.getLayer(vectorMapboxLayerId)) {
        window._mintMap.styleLoaded = false;
        window._mintMap.map.addLayer({
            "id": vectorMapboxLayerId,
            "type": "fill",
            "source": vectorServerSourceId,
            "source-layer": json.sourceLayer,
            "layout": {
                'visibility': 'visible'
            },
            "paint": {
                "fill-opacity": 0.0
            }
        });
        if (!window._mintMap.styleLoaded) {
            setTimeout(function () {
                loadSingleLayer(json);
            }, PROMISE_STYLE_LOADING_WAIT);
            return;
        }
    }
    if (json.hasTimeline) {
        window._mintMap.map.setPaintProperty(vectorMapboxLayerId, 'fill-color', JSON.parse(json.colormap[0]));
    }else{
        window._mintMap.map.setPaintProperty(vectorMapboxLayerId, 'fill-color', JSON.parse(json.colormap));
    }
    
}
function loadTilesOfTimeline(json) {
    let jsonSteps = json.layers.step;
    if (typeof(jsonSteps) === "undefined" ) {
        console.error("This metadata is not designed for timeline");
        return;
    }
    
    if (json.layers.step.length <= 1) {
        console.error("There are only one time stamp in the Timeseries");
        return;
    }
    let server = window._mintMap.metadata.server;
    let tile_path = window._mintMap.metadata.tiles;
    for (var i = 1; i < json.layers.step.length; i++) {
        let vectorMd5 = json.md5vector + "_" + i;
        let rasterMd5 = md5(vectorMd5);
        let sourceLayerNameInMbtiles = json.sourceLayer + "#" + i;

        let layerId = json.layerId + "_" + i;
        let vectorServerSourceId = layerId;
        let rasterServerSourceId = layerId.replace('vector_pbf','raster_png');

        let curLayerName = json.sourceLayer + "_Layer_" + i;
        let vectorMapboxLayerId = curLayerName + '_vector';
        let rasterMapboxLayerId = curLayerName + '_raster';
        // load all timeline inspect
        // updateInspectLayers(vectorMapboxLayerId);

        if (!window._mintMap.map.getSource(vectorServerSourceId)) {
            window._mintMap.map.addSource(vectorServerSourceId,{
                type: 'vector',
                tiles: [server + vectorMd5 + tile_path + '.pbf']
            });
        }

        if (!window._mintMap.map.getSource(rasterServerSourceId)) {
            window._mintMap.map.addSource(rasterServerSourceId, {
                type: 'raster',
                tiles: [server + rasterMd5 + tile_path + '.png'],
                bounds: window._mintMap.bounds
            });
        }

        if (!window._mintMap.map.getLayer(rasterMapboxLayerId)) {
            window._mintMap.styleLoaded = false;
            window._mintMap.map.addLayer({
                "id": rasterMapboxLayerId,
                "type": 'raster',
                'source': rasterServerSourceId,
                'layout': {
                    'visibility': 'none',
                },
                'paint':{
                    'raster-opacity':0.8
                },
            });
            if (!window._mintMap.styleLoaded) {
                setTimeout(function () {
                    loadTilesOfTimeline(json);
                }, PROMISE_STYLE_LOADING_WAIT);
                return;
            }
        }
        
        if (!window._mintMap.map.getLayer(vectorMapboxLayerId)) {
            window._mintMap.styleLoaded = false;
            window._mintMap.map.addLayer({
                "id": vectorMapboxLayerId,
                "type": "fill",
                "source": vectorServerSourceId,
                "source-layer": sourceLayerNameInMbtiles,
                "layout": {
                    'visibility': 'none'
                },
                "paint": {
                    "fill-opacity": 0.0
                }
            });
            if (!window._mintMap.styleLoaded) {
                setTimeout(function () {
                    loadTilesOfTimeline(json);
                }, PROMISE_STYLE_LOADING_WAIT);
                return;
            }
        }

        let colormap = i < json.colormap.length ? json.colormap[i] : json.colormap[0];
        window._mintMap.map.setPaintProperty(vectorMapboxLayerId, 'fill-color', JSON.parse(colormap));
    }
}
function playTimeseries(layerId) {
    window._mintMap.sliderData[layerId].intervalHandle = setInterval(function () {
        let ele = window._polymerMap.querySelector("#property-slider-" + layerId);
        let pointer = parseInt(ele.noUiSlider.get());
        let list = Object.values(ele.noUiSlider.options.range).map(ele => ele[0]).sort();
        let curIdx = list.indexOf(pointer);
        let nextIdx = (curIdx + 1) % list.length;
        ele.noUiSlider.set(list[nextIdx]);
    }, parseInt(process.env.ANIMATION_FRAME_INTERVAL))
}
function pauseTimeseries(layerId) {
    if (window._mintMap.sliderData[layerId]) {
        clearInterval(window._mintMap.sliderData[layerId].intervalHandle);
    }
}
function resetSlider(layerId) {
    var ele = window._polymerMap.querySelector("#property-slider-" + layerId);
    let playSliderBtn = ele.parentElement.parentElement.querySelector('.play-slider');
    playSliderBtn.innerHTML = PLAY_BTN_IMG;
    window._mintMap.sliderData[layerId].playing = false;
    pauseTimeseries(layerId);
    ele.noUiSlider.reset();
}
function setupSlider(panelId) {
    var ele = window._polymerMap.querySelector("#property-slider-" + panelId);
    noUiSlider.create(ele, window._mintMap.sliderData[panelId]);
    var jsonArr = window._mintMap.loadedJson.filter(function (obj) {
        return obj.layerId === panelId;
    });
    if (jsonArr.length == 0) {
        console.error("No such a Panel");
        return false;
    }
    var json = jsonArr[0];
    let playSliderBtn = ele.parentElement.parentElement.querySelector('.play-slider');
    playSliderBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var alink = e.target;
        if (e.target.tagName == 'IMG') {
            alink = e.target.parentElement;
        }
        let sliderData = window._mintMap.sliderData[panelId];
        if (sliderData.playing) {
            alink.innerHTML = PLAY_BTN_IMG;
            window._mintMap.sliderData[panelId].playing = false;
            pauseTimeseries(panelId);
        }else{
            alink.innerHTML = PAUSE_BTN_IMG;
            window._mintMap.sliderData[panelId].playing = true;
            playTimeseries(panelId);
        }

        return false;
    });

    ele.noUiSlider.on('set', function( values, handle ) {
        let d = moment(parseInt(values[handle]));
        if (!d.isValid()) {
            console.warn("slider time stamp is wrong!");
            return;
        }

        if (window._mintMap.mapInspect._popup.isOpen()) {
            window._mintMap.mapInspect._popup.remove();
        }

        let currentOpacity = ele.parentElement.parentElement.querySelector('.opacity-slider').value;
        let layerOptions = window._mintMap.sliderData[panelId].extraOption;
        let step = d.format(layerOptions.stepOption.format.toUpperCase());
        let vindex = layerOptions.step.indexOf(step);
        
        let legend = vindex < json.legend.length ? json.legend[vindex] : json.legend[0]; 
        updateLegend(json['legend-type'], JSON.parse(legend), json.sourceLayer, json.layerId, vindex);

        var curLayerName = json.sourceLayer + '_Layer_' + vindex;
        var vectorMapboxLayerId = curLayerName + '_vector';
        var rasterMapboxLayerId = curLayerName + '_raster';
        
        ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', vindex);
        if (step === layerOptions.step[0]) {
            curLayerName = json.sourceLayer + '_Layer';
            vectorMapboxLayerId = curLayerName + '_vector';
            rasterMapboxLayerId = curLayerName + '_raster';
            ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', "no");
        }

        window._mintMap.map.setPaintProperty(rasterMapboxLayerId, 'raster-opacity', parseInt(currentOpacity, 10) / 100);

        let visibility = window._mintMap.map.getLayoutProperty(rasterMapboxLayerId, 'visibility');
        if (visibility !== 'visible') {
            window._mintMap.map.setLayoutProperty(rasterMapboxLayerId, 'visibility', 'visible');
            window._mintMap.map.setLayoutProperty(vectorMapboxLayerId, 'visibility', 'visible');
        }
        updateInspectLayers(vectorMapboxLayerId);

        layerOptions.step.map(function (ele,idx) {
            var tmp_curLayerName = json.sourceLayer + '_Layer_' + idx;
            var tmp_vectorMapboxLayerId = tmp_curLayerName + '_vector';
            var tmp_rasterMapboxLayerId = tmp_curLayerName + '_raster';
            if (idx === 0) {
                tmp_curLayerName = json.sourceLayer + '_Layer';
                tmp_vectorMapboxLayerId = tmp_curLayerName + '_vector';
                tmp_rasterMapboxLayerId = tmp_curLayerName + '_raster';
            }
            if (tmp_curLayerName !== curLayerName) {
                // console.log("$$$",idx,tmp_rasterMapboxLayerId);
                window._mintMap.map.setLayoutProperty(tmp_rasterMapboxLayerId, 'visibility', 'none');
                window._mintMap.map.setLayoutProperty(tmp_vectorMapboxLayerId, 'visibility', 'none');
                removeInspectLayers(tmp_vectorMapboxLayerId);
            }
        })
    });
}


module.exports = {
    removeLayerFromMap,
    loadLayer,
    initLayerSearchAutocomplete
}