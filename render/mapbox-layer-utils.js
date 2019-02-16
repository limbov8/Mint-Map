import * as md5 from 'md5';
import * as moment from 'moment';
import * as noUiSlider from './noUiSliderRevised.js';
import {
    createProperitesPanel,
    updatePropertiesSettingBy,
    escape_shell
} from './mintmap-ui-utils.js';
import {
    removeLegend,
    updateLegend,
    drawOriginalBound,
    removeBoundary,
    updateListOfLayersNotAdded
} from './mapbox-utils.js';
// var md5 = require('md5');
// var moment = require('moment')
// var {
//     createProperitesPanel,
//     updatePropertiesSettingBy
// } = require('./mintmap-ui-utils.js');
// var {
//     removeLegend,
//     updateLegend,
//     drawOriginalBound,
//     removeBoundary,
//     updateListOfLayersNotAdded
// } = require('./mapbox-utils.js');
// var noUiSlider = require('./noUiSliderRevised.js');


var _mintMapShadowRoot = window._polymerMap;
var PLAY_BTN_IMG = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEcSURBVEhL3dU/S0JRGMfxawputTg0CYKrS4KD+gJ6CdEWTqKDBAnOjg45OejoVHtb0JCEQRC4+A6EdlEoor7PPYjd65/ufe6FG/3gA885gz+uHM6x/mWyGOEDXwEscYtDbOQRNcTtlT5JDHBtr1yRLwhasEoeL2Z0Rj41rOQwMaMzkZc0cWpGT1GV9PCOIVKy8UvUJZfoYIZz7Iu6pGpG6wSvuENaNrYkcIkkgRbeUMcBfiaUklXkQHyiYq/WCaXkGHJ1TFGWDVcClcRwAfmb2pArZFvUJXKy7vEM+ZF9UZfM0YCX+01VcoaMGT1FVeI30ZYssOu0+E0RT2Z05gZ9FCCPjlYJD7jCRo7QxRjyqmnJMy4FYb2yfyaW9Q1xY2SBkW6i0gAAAABJRU5ErkJggg==">';
var PAUSE_BTN_IMG = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADpSURBVEhL7dW/CkFRAMfxK4NSyAsYZDUpA97EE8hstHgBJgOrhZcwkAwmu8ELSMqfUvj+3K7un+n+KcKvPnXOGc6vczvdY3xlCpjjinsIZ0yQhiczNBF/zoIngSG6z5krOkHYAislrMyhMzpqVClibQ6deVtJDFkbfW8lCWstowVXfJVogxt2uKABpY8j9thqwRXfJdpI0cb2Eo1z+Je88i/xXXJAHiPYS9qoIXRJChubOpQOrDX9WN3xVRI0P1BygvUDDJsKFubQmTEGKEOPTlBVTNGCJ7quPSyhVy0o3TYVRPXKfkwM4wG6h3SxfzKqPAAAAABJRU5ErkJggg==">';
var PROMISE_STYLE_LOADING_WAIT = parseInt(process.env.PROMISE_STYLE_LOADING_WAIT)

// layerId is used as "source[tile server path]" id, also used as panel css id
// sourceLayer is used for vector dataset source layer, also used as "layer[mapbox layer parameter]" id
// layerName is used to display in the list, also used as unique identity for one panel, autocomplete
export function initLayerSearchAutocomplete(data) {
    delete data.type;
    var autoList = Object.keys(data);
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            window._mintMap.listOfLayersNotAdded.push({
                label: data[k], 
                value: data[k],
                md5: k
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

export function loadLayer({ md5 = null, dcid = null} = {}) {
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
function isGeoJSONLayer(json) {
    if (!('layer_type' in json)) {
        return false;
    }
    if (json.layer_type > 200) {
        return true;
    }else{
        return false;
    }
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
    + escape_shell(json.title) + "<div class='tag_close'></div></a>";
    var tagul = _mintMapShadowRoot.querySelector('#the-ul-of-layer-list');
    var tagSearch = _mintMapShadowRoot.querySelector('#the-li-of-add-new-layer');
    tagul.insertBefore(newLayer, tagSearch);
    if (isGeoJSONLayer(json)) {
        loadGeoJSONLayerFromJson(json);
    }else{
        loadLayerFromJson(json);
    }

    return true;

}
export function removeAllLayerFromMap() {
    window._mintMap.loadedJson.map(function (json) {
        let ele = _mintMapShadowRoot.querySelector("#the-ul-of-layer-list a.with-data-tag[data-id='"+json.id+"'] .tag_close");
        if (ele) {
            ele.click();
        }
    });
}
export function removeLayerFromMap(json_id) {
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
    if (json.hasTimeline) {
        resetSlider(json.layerId);
    }
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
function loadGeoJSONLayerFromJson(json) {
    let layerId = json.layerId;
    let vectorServerSourceId = layerId;
    // var curLayerName = json.sourceLayer + "_Layer";
    // let vectorMapboxLayerId = curLayerName + '_vector';

    loadSingleGeojsonLayer(json);

    // window._mintMap.displayed.push(vectorMD5);

    var ele = _mintMapShadowRoot.querySelector('#layerById-' + json.layerId);
    if ( !ele ) {
        createProperitesPanel(json, true);
        if (json.hasTimeline) {
            setupSlider(json.layerId);
            updateTimeLabel(json.layerId, json.layers.step[0]);
            setLoadingIndicator(json.layerId, true);
        }
    }
    
    updatePropertiesSettingBy(json, false);
    updateListOfLayersNotAdded(json, true);
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
        createProperitesPanel(json, false);
        if (json.hasTimeline) {
            setupSlider(json.layerId);
            updateTimeLabel(json.layerId, json.layers.step[0]);
            setLoadingIndicator(json.layerId, true);
        }
    }
    
    updatePropertiesSettingBy(json, false);
    updateListOfLayersNotAdded(json, true);
    console.log(json)
    // window._mintMap.map.setPaintProperty('landuseLayer', 'fill-color',styleExpression);
    if (json.hasTimeline) {
        updateLegend(json['legend-type'], JSON.parse(json.legend[0]), json.sourceLayer, json.title, json.layerId, 0);
    }else{
        updateLegend(json['legend-type'], JSON.parse(json.legend), json.sourceLayer, json.title, json.layerId, 0);
    }
    drawOriginalBound(JSON.parse(json.originalDatasetCoordinate), json.id);
    // addPropertySetting Panel
}

function loadSingleGeojsonLayer(json) {
    let tile_path = window._mintMap.metadata.tiles;
    let server = window._mintMap.metadata.server;
    // let server = "http://[::]:8080/data/"; //for test
    let vectorMD5 = json.md5vector;
    
    let layerId = json.layerId;
    let vectorServerSourceId = layerId;
    
    var curLayerName = json.sourceLayer + "_Layer";
    let vectorMapboxLayerId = curLayerName + '_vector';


    if (!window._mintMap.map.getSource(vectorServerSourceId)) {
        window._mintMap.map.addSource(vectorServerSourceId,{
            type: 'vector',
            tiles: [server + vectorMD5 + tile_path + '.pbf'],
            minzoom: json.minzoom,
            maxzoom: json.maxzoom
        });
    }
    // Scalability
    //  all the saved op in this part, could be done on the server
    //  we also need to mark the position we need to change
    if (json['legend-type'] === 'none') {
        let vector_layer_types = ['_circle', '_line', '_polygon']
        let vector_layer_types_fill = ['circle', 'line', 'fill']
        let filter_types = window._mintMap.vector_layer_filter_types;
        let vector_layer_paint_settings = window._mintMap.geojson_layer_paint_settings;
        
        // save all in json, only save once.
        json.geojson_paint_settings = vector_layer_paint_settings;
        json.geojson_layer_types = vector_layer_types;
        json.geojson_layer_paint_types = vector_layer_types_fill;
        json.geojson_filter_types =  filter_types;
        json.geojson_paint_opacity_property_names = window._mintMap.vector_layer_opacity_names;
        json.geojson_vector_layer_ids = []
        
        for (var idx = 0; idx < vector_layer_types.length; idx++) {
            let vector_types = vectorMapboxLayerId + vector_layer_types[idx];
            json.geojson_vector_layer_ids.push(vector_types);
            if (!window._mintMap.map.getLayer(vector_types)) {
                window._mintMap.styleLoaded = false;
                window._mintMap.map.addLayer({
                    "id": vector_types,
                    ...filter_types[idx],
                    "type": vector_layer_types_fill[idx],
                    "source": vectorServerSourceId,
                    "source-layer": json.sourceLayer,
                    "layout": {
                        'visibility': 'visible'
                    },
                    "paint": vector_layer_paint_settings[idx]
                });
                if (!window._mintMap.styleLoaded) {
                    setTimeout(function () {
                        loadSingleGeojsonLayer(json);
                    }, PROMISE_STYLE_LOADING_WAIT);
                    return;
                }
            }
        }

    }else{
        let colormap = typeof(json.colormap) === 'string' ? json.colormap : json.colormap[0] ;
        let pl_type = get_paint_type_and_layer_type(colormap);
        
        let paint_settings = JSON.parse(colormap);

        let legend = JSON.parse( typeof(json.legend) === 'string' ? json.legend : json.legend[0] );
        let steps = json.layers.step;

        // save all in json, save once for one json
        json.geojson_paint_settings = [paint_settings];
        json.geojson_layer_types = [pl_type.layer_type];
        json.geojson_layer_paint_types = [pl_type.paint_type];
        json.geojson_filter_types = [pl_type.filter_type];
        json.geojson_paint_opacity_property_names = [pl_type.opacity_name];
        json.geojson_vector_layer_ids = []

        let vector_type = vectorMapboxLayerId + pl_type.layer_type;
        json.geojson_vector_layer_ids.push(vector_type)
        if (!window._mintMap.map.getLayer(vector_type)) {
            window._mintMap.styleLoaded = false;
            window._mintMap.map.addLayer({
                "id": vector_type,
                ...pl_type.filter_type,
                "type": pl_type.paint_type,
                "source": vectorServerSourceId,
                "source-layer": json.sourceLayer,
                "layout": {
                    'visibility': 'visible'
                },
                "paint": paint_settings
            });
            if (!window._mintMap.styleLoaded) {
                setTimeout(function () {
                    loadSingleGeojsonLayer(json);
                }, PROMISE_STYLE_LOADING_WAIT);
                return;
            }
        }

        updateLegend(json['legend-type'], legend, json.sourceLayer, json.title, json.layerId, 0);
        // updateTimeLabel(json.layerId, steps[0]);
        window._mintMap.geojson_dot_map_layers_need_special_attention_for_inspection[json.sourceLayer] = 'v_0';
    }
    if (json.hasTimeline) {
        setLoadingIndicator(json.layerId, false);
    }

    for (var i = 0; i < json.geojson_vector_layer_ids.length; i++) {
        updateInspectLayers(json.geojson_vector_layer_ids[i]);    
    }
}
function get_paint_type_and_layer_type(colormap) {
    let paint_type = 'circle';
    let vector_layer_type = '_circle';
    let filter_type = window._mintMap.vector_layer_filter_types[0]
    let opacity_name = window._mintMap.vector_layer_opacity_names[0]
    if (colormap.indexOf('line-') !== -1) {
        paint_type = 'line';
        vector_layer_type = '_line';
        filter_type = window._mintMap.vector_layer_filter_types[1]
        opacity_name = window._mintMap.vector_layer_opacity_names[1]
    }else if (colormap.indexOf('fill-') !== -1) {
        paint_type = 'fill';
        vector_layer_type = '_polygon';
        filter_type = window._mintMap.vector_layer_filter_types[2]
        opacity_name = window._mintMap.vector_layer_opacity_names[2]
    }
    return {paint_type:paint_type, layer_type:vector_layer_type, filter_type:filter_type, opacity_name:opacity_name}
}
function loadSingleLayer(json) {
    let tile_path = window._mintMap.metadata.tiles;
    let server = window._mintMap.metadata.server;
    // let server = "http://[::]:8080/data/"; //for test
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
// console.log(json.sourceLayer);
// console.log(vectorMapboxLayerId);
// console.log([server + vectorMD5 + tile_path + '.pbf']);
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
    // let server = "http://[::]:8080/data/"; //for test
    // let server = 'http://mintviz.org:65530/'; // for test
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
    setLoadingIndicator(json.layerId, false);
}
function playTimeseries(json) {
    let layerId = json.layerId;
    window._mintMap.sliderData[layerId].intervalHandle = setInterval(function () {
        let ele = window._polymerMap.querySelector("#property-slider-" + layerId);
        let pointer = parseInt(ele.noUiSlider.get());
        let list = Object.values(ele.noUiSlider.options.range).map(ele => ele[0]).sort();
        let curIdx = list.indexOf(pointer);
        let nextIdx = (curIdx + 1) % list.length;
        ele.noUiSlider.set(list[nextIdx]);
    }, parseInt(
            isGeoJSONLayer(json) 
            ? process.env.GEOJSON_ANIMATION_FRAME_INTERVAL 
            : process.env.ANIMATION_FRAME_INTERVAL
        )
    )
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
function updateTimeLabel(panelId, time) {
    var ele = window._polymerMap.querySelector("#property-slider-" + panelId);
    var timeLabel = ele.parentElement.querySelector(".slider-title-panel .time-label")
    // console.log(timeLabel);
    if (timeLabel) {
        timeLabel.innerHTML = time;
    }
}
function setLoadingIndicator(panelId, show=true) {
    var ele = window._polymerMap.querySelector("#property-slider-" + panelId);
    var loadingIndicator = ele.parentElement.querySelector(".slider-title-panel .loading-indicator");
    // console.log(loadingIndicator);
    if (loadingIndicator) {
        if (show === false) {
            loadingIndicator.style.display = 'none';
        }else{
            loadingIndicator.style.display = 'block';
        }
    }
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
            playTimeseries(json);
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
        

        var curLayerName = json.sourceLayer + '_Layer_' + vindex;
        var vectorMapboxLayerId = curLayerName + '_vector';
        var rasterMapboxLayerId = curLayerName + '_raster';

        updateTimeLabel(json.layerId, step);
        // Handle geojson Setup noUiSlider
        if (isGeoJSONLayer(json)) {
            // dot map value/interpolation
            let dm_value = 'v_' + vindex;
            let dm_interpo = 'i_' + vindex;
            // update for inspection
            window._mintMap.geojson_dot_map_layers_need_special_attention_for_inspection[json.sourceLayer] = dm_value;
            // get paint setting used to update new one
            // since we only got dot map for now, we will not travese paint_settings
            // if traverse paint_settings, we need to store all the position we need to change
            let paint_settings = json.geojson_paint_settings[0];
            // get all geojson_layer_ids for circles/lines/polygons, maybe one or more
            let geojson_vector_layer_ids = json.geojson_vector_layer_ids;
            // limited on circle paint settings and dot map eg: river size
            // 'circle-color': ['interpolate', ['linear'], ['get', 'v_0'], 0, '#FCA107', 46, '#7F3121']
            paint_settings['circle-color'][2][1] = dm_value;
            // 'circle-stroke-width':['case',['get','i_0'],1,['!',['get','i_0']],0,0]
            paint_settings['circle-stroke-width'][1][1] = dm_interpo;
            paint_settings['circle-stroke-width'][3][1][1] = dm_interpo;
            // 'circle-opacity':0.8
            paint_settings['circle-opacity'] = parseInt(currentOpacity, 10) / 100;
            // TODO: opacity vector...
            // 'circle-radius':['interpolate',['linear'],['get','v_0'],0,2,46,20]}
            paint_settings['circle-radius'][2][1] = dm_value;

            // for the future scalability
            for (var gid = 0; gid < geojson_vector_layer_ids.length; gid++) {
                for(let k in paint_settings){
                    window._mintMap.map.setPaintProperty(geojson_vector_layer_ids[gid], k, paint_settings[k]);
                }
            }
            return;
        }
        // handle double layer slider
        let legend = vindex < json.legend.length ? json.legend[vindex] : json.legend[0]; 
        updateLegend(json['legend-type'], JSON.parse(legend), json.sourceLayer, json.title, json.layerId, vindex);
        
        // if data-time is no, then the opacity will alway the first one layer
        ele.parentElement.parentElement.querySelector('.opacity-slider').setAttribute('data-time', vindex);
        if (step === layerOptions.step[0]) {
            curLayerName = json.sourceLayer + '_Layer';
            vectorMapboxLayerId = curLayerName + '_vector';
            rasterMapboxLayerId = curLayerName + '_raster';
            // change data-time to no
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


// module.exports = {
//     removeLayerFromMap,
//     loadLayer,
//     initLayerSearchAutocomplete
// }