var wNumb = require('wnumb');

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

                                 

        var isVis = window._mintMap.map.getLayer(id); //&& map.getLayoutProperty(id, 'visibility') === "visible";
        if (isVis) {
            if (window._mintMap.map.getLayoutProperty(id, 'visibility') === "visible") {
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

