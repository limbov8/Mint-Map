import * as moment from 'moment';
import * as wNumb from 'wnumb';
// var moment = require('moment')
// var wNumb = require('wnumb');
export function initUI() {
    var layersWrapper = document.createElement('div');
    layersWrapper.className = "settingsWrapper";
    
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
    tagSearch.innerHTML = "<a id='add-new-layer' class='tag function-tag' onclick='this.style.display=\"none\";window._polymerMap.querySelector(\"#search-new-layer\").style.display=\"block\";window._polymerMap.querySelector(\"#search-new-layer\").value=\"\";window._polymerMap.querySelector(\"#search-new-layer\").focus();window._polymerMap.querySelector(\"#the-li-of-add-new-layer .awesomplete\").style.display = \"inline-block\";return false;'>Add New Layer</a><input id='search-new-layer' class='awesomplete' style='display:none' placeholder='Search new layers'>";

    // var tagShowAll = document.createElement('li');
    // tagShowAll.innerHTML = "<a id='show-all-layers' class='tag function-tag' data-show='no' style='display:none'>Show All Layers</a>";

    tagul.appendChild(tagSearch);
    // tagul.appendChild(tagShowAll);
    tagsList.appendChild(tagul);
    layers.appendChild(tagsList);
    
    var layersPropertyList = document.createElement('div');
    layersPropertyList.setAttribute('id','layers-properties-list');
    layersPropertyList.style = "position: relative;"
    layersPropertyList.className = "properties";
    layers.appendChild(layersPropertyList);

    window._polymerMap.querySelector('.geocoder').appendChild(layersWrapper);
}
export function createProperitesPanel(json) {

    // var layersPropertyList = document.createElement('div');
    // layersPropertyList.className = "properties";
    var layersPropertyList = window._polymerMap.querySelector('#layers-properties-list');
    // for (var i = 0; i < layersIds.length; i++) {
    if (!json.hasData) {
        return;
    }
    var id = json.layerId;
    var name = json.layerName;
    var rasterLayerId = json.sourceLayer + "_Layer";

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
                             + "oninput='window._mintMap.setOpacity(\""+rasterLayerId+"\", this.value, this.getAttribute(\"data-time\"))'>"
                             + "</div>";
    if (json.hasTimeline) {
        // console.log(layersIds[i],window._mintMap.metadata.layers);
        // layerids is sourcelayer id!!!
        let jsonSteps = json.layers.step;
        if (typeof(jsonSteps) === "undefined" ) {
            console.error("This metadata is not designed for timeline");
            return;
        }
        
        if (json.layers.step.length <= 1) {
            console.error("There are only one time stamp in the Timeseries");
            return;
        }
        let timeLineData = json.layers;
        layerProperty.innerHTML += '<div class="props">'
                             + '<h4 class="time-slider-title">' + timeLineData.stepType + (typeof timeLineData.stepOption.prefix === "undefined" ? "" : (" (" + timeLineData.stepOption.prefix + ")") ) + '</h4>'
                             + '<a class="play-slider" href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEcSURBVEhL3dU/S0JRGMfxawputTg0CYKrS4KD+gJ6CdEWTqKDBAnOjg45OejoVHtb0JCEQRC4+A6EdlEoor7PPYjd65/ufe6FG/3gA885gz+uHM6x/mWyGOEDXwEscYtDbOQRNcTtlT5JDHBtr1yRLwhasEoeL2Z0Rj41rOQwMaMzkZc0cWpGT1GV9PCOIVKy8UvUJZfoYIZz7Iu6pGpG6wSvuENaNrYkcIkkgRbeUMcBfiaUklXkQHyiYq/WCaXkGHJ1TFGWDVcClcRwAfmb2pArZFvUJXKy7vEM+ZF9UZfM0YCX+01VcoaMGT1FVeI30ZYssOu0+E0RT2Z05gZ9FCCPjlYJD7jCRo7QxRjyqmnJMy4FYb2yfyaW9Q1xY2SBkW6i0gAAAABJRU5ErkJggg=="></a>'
                             + '<div class="property-slider" id="property-slider-'+ id
                             // layerids is sourcelayer id!!!
                             +'" data-panel="' + id + '"><div>'
                             + "</div>";
        timeLineData.stepOption.format = timeLineData.stepOption.format.toUpperCase()
        let years = timeLineData.step.map(function (ele) {
            return moment(ele, timeLineData.stepOption.format).valueOf();;
        });
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
            // if( yearsLength <= 12){
            yearRange[percent] = [year];
            // }else{
            //     if (idx % 4 == 0) {
            //         yearRange[percent] = [year];
            //     }
            // }
        });
        // console.log("yearRange",yearRange);
        let yearRangeRemainer = parseInt( moment(yearRange.min[0]).format(timeLineData.stepOption.format) ) % 2;
        // let dividend = 20000000;
        let yearRangeRemainer30 = parseInt( moment(yearRange.min[0]).format('DD') );
        // console.log(yearRange,yearRangeRemainer);
        window._mintMap.sliderData[json.layerId] = {
                animate: true,
                animationDuration: 300,
                start: yearRange.min, 
                snap: true, 
                range: yearRange, 
                connect: [true, false],
                // tooltips: true,
                format: wNumb({
                    decimals: 0
                }),
                pips: {
                    mode: 'steps',
                    density: 3,
                    filter: function (value, type) {
                        if (yearsLength >= 24) {
                            let tmp = parseInt( moment(value).format('DD'));
                            return tmp == yearRangeRemainer30 ? 1 : 0;
                        }else if (yearsLength > 12 && yearsLength < 24) {
                            let tmp = parseInt( moment(value).format(timeLineData.stepOption.format));
                            return tmp % 2 == yearRangeRemainer ? 1 : 0;
                        }else{
                            if (type == 1) {
                                return 1;
                            }else{
                                return -1;
                            }
                        }
                    },
                    // mode: 'count',
                    // values: yearsLength > 12 ? 12 : yearsLength,
                    // density: yearsLength > 12 ? 2 : 0,
                    format: {
                      to: function ( value ) {
                        return  moment(value).format(timeLineData.stepOption.format.replace('YYYY','YYYY[<br>]'));
                      },
                      from: function ( value ) {
                        return moment(value).valueOf();
                      }
                    }
                },
                extraOption: timeLineData,
                playing: false
            }
    }


    var isVis = window._mintMap.map.getLayer(json.sourceLayer + "_Layer_raster"); //&& map.getLayoutProperty(id, 'visibility') === "visible";
    if (isVis) {
        if (window._mintMap.map.getLayoutProperty(json.sourceLayer + "_Layer_raster", 'visibility') === "visible") {
            layerProperty.style.display = "block";
        }
    }
    layersPropertyList.appendChild(layerProperty);
        // layers.appendChild(link);

    // body...
}
export function updatePropertiesSettingBy(json, remove = true) {
    var layerId = json.layerId;
    var ele = window._polymerMap.querySelector('#layerById-' + layerId);
    if (ele) {
        if (remove) {
            ele.style.display = "none";
        } else {
            ele.style.display = "block";
        }    
    }else{
        console.error("No such layer");
    }
    
}

// module.exports = {
//     initUI,
//     createProperitesPanel,
//     updatePropertiesSettingBy
// };