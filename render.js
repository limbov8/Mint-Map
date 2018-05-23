window.loadMapLayers = function(mapboxgl){
    window._mintMap = {};
    mapboxgl.accessToken = 'pk.eyJ1IjoibGlib2xpdSIsImEiOiJjamZ1cXc1cGIwNHlhMnhsYWx0amRrbmdrIn0.d2s82GJZj56n2QUN2WGNsA';

    var bounds = [
        [22.9, 3.3], // Southwest coordinates
        [36.5, 12.5]  // Northeast coordinates
    ];
    // liboliu.716mmt4v
    var _mintMapShadowRoot = document.querySelector('mint-map').shadowRoot;
    
    var map = new mapboxgl.Map({
        container: _mintMapShadowRoot.querySelector('#map'), // container id
        style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
        // center: [29.7,7.9], // starting position [lng, lat]
        center: [26.3,7.6],
        zoom: 5, // starting zoom
    });


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



    var setOpacity = function (layerId, value) {
        map.setPaintProperty(layerId, 'raster-opacity', parseInt(value, 10) / 100);
    }
    window._mintMap.setOpacity = setOpacity;
    map.on('load', function () {
        window.isMapLoaded = true;
        map.addSource('landuse', {
            type: 'raster',
            tiles: ["http://jonsnow.usc.edu:8082/data/landuse/{z}/{x}/{y}.png"],
            maxzoom:12,
            minzoom:1,
            tileSize:256
        });
        map.addLayer({
            'id': 'landuseLayer',
            'type': 'raster',
            'source': 'landuse',
            'layout': {
                'visibility': 'visible'
            },
            'paint':{
                'raster-opacity':0.4
            },
            // 'source-layer': 'museum-cusco'
        });
        map.addSource('soil', {
            type: 'raster',
            tiles: ["http://jonsnow.usc.edu:8082/data/soil/{z}/{x}/{y}.png"],
            maxzoom:12,
            minzoom:1,
            tileSize:256
        });
        map.addLayer({
            'id': 'soilLayer',
            'type': 'raster',
            'source': 'soil',
            'layout': {
                'visibility': 'none',
            },
            'paint':{
                'raster-opacity':0.4
            },
            // 'source-layer': 'museum-cusco'
        });
        // console.log(map.getStyle().layerSources);
        
        var layersIds = [ 'landuseLayer', 'soilLayer' ];
        var layerSource = {'landuseLayer': 'landuse', 'soilLayer': 'soil'};
        var layerIdName = {'landuseLayer': 'Landuse', 'soilLayer': 'Soil'};

        var layers = document.createElement('div');
        layers.className = "settings";
        var variableTitle = document.createElement('div');
        variableTitle.className = 'variableTitle';
        variableTitle.innerHTML = "<h2>Layers</h2>";
        layers.appendChild(variableTitle);

        var layersPropertyList = document.createElement('div');
        layersPropertyList.className = "properties";
        
        for (var i = 0; i < layersIds.length; i++) {
            var id = layersIds[i];
            var name = layerIdName[id];

            var link = document.createElement('a');
            link.href = '#'+ id;
            link.textContent = name;
            link.setAttribute('data-layer-id', id);
            
            var layerProperty = document.createElement('div');
            layerProperty.setAttribute('id','layerById-' + id);
            layerProperty.className="card";
            layerProperty.style.display = "none";
            layerProperty.innerHTML = "<h3>" + name + " Layer Properties</h3>" 
                                    + "<div class='props'>" 
                                    + "<h4>Opacity</h4>" 
                                    + "<div class='control'>" 
                                    + "<input type='range' min='1' max='100' value='40' class='slider opacity-slider' oninput='window._mintMap.setOpacity(\""+id+"\", this.value)'>"
                                    + "</div>" 
                                    + "<div class='props'>"
                                    + "<h4>Time</h4>"
                                    + "<div class='control'>" 
                                    + "<input type='range' min='1' max='100' value='100' class='slider sliderTime' oninput='window._mintMap.loadLayer(\""+id+"\", this.value)' disabled>"
                                    + "</div>"
                                    + "</div>";

            var isVis = map.getLayer(id); //&& map.getLayoutProperty(id, 'visibility') === "visible";
            if (isVis) {
                if (map.getLayoutProperty(id, 'visibility') === "visible") {
                    link.className = 'active';
                    layerProperty.style.display = "block";
                }
            }
            layersPropertyList.appendChild(layerProperty);
            
            link.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                var clickedLayer = this.getAttribute('data-layer-id');

                var visibility = map.getLayer(clickedLayer) && map.getLayoutProperty(clickedLayer, 'visibility') === 'visible';

                var ele = _mintMapShadowRoot.getElementById('layerById-' + clickedLayer);
                if (visibility) {
                    // map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    if (map.getLayer(clickedLayer)) {
                        map.removeLayer(clickedLayer);
                    }
                    this.className = '';
                    ele.style.display = "none";
                } else {
                    this.className = 'active';
                    if (map.getLayer(clickedLayer)) {
                        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                    }else{
                        map.addLayer({
                            'id': clickedLayer,
                            'type': 'raster',
                            'source': layerSource[clickedLayer],
                            'layout': {
                                'visibility': 'visible',
                            },
                            'paint':{
                                'raster-opacity': _mintMapShadowRoot.querySelector("#layerById-" + clickedLayer +" .opacity-slider") == null ? 0.4 : parseInt(_mintMapShadowRoot.querySelector("#layerById-" + clickedLayer +" .opacity-slider").value) / 100
                            },
                            // 'source-layer': 'museum-cusco'
                        });
                    }
                    ele.style.display = "block";
                }
            };


            layers.appendChild(link);
        }
        layers.appendChild(layersPropertyList);
        _mintMapShadowRoot.querySelector('#geocoder').appendChild(geocoder.onAdd(map));
        _mintMapShadowRoot.querySelector('#geocoder').appendChild(layers);
        map.addControl(new mapboxgl.NavigationControl());
        
    });
}
