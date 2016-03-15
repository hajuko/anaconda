got.Map = function(settings) {
    var map;
    var tileLayer;
    var characterLayer = new L.layerGroup();
    var zoomReference = 4;
    var scaleFactor = 1 / Math.pow(2, zoomReference);

    console.log(scaleFactor);


    init();
    addCharacters(characters);

    function init() {
        tileLayer = L.tileLayer(
            '',
            {
                noWrap: true,
                updateWhenIdle: false
            }
        );

        map = new L.map(
            'leaflet-map',
            {
                crs: L.CRS.Simple,
                center: [0, 0],
                attributionControl: false,
                inertia: false,
                zoom: 0,
                maxZoom: 5
            }
        );

        map.addLayer(tileLayer);



        var bounds = L.latLngBounds(
            scaledCoordinates([0, 0]),
            scaledCoordinates([4000, 4000])
        );

        var border = L.rectangle(bounds, {fillOpacity: 0});

        border.addTo(map);
        map.addLayer(characterLayer);

        map.fitBounds(
            bounds,
            {
                animate: false
            }
        );


    }

    function scaledCoordinates(coordinates) {
        return [coordinates[0] * scaleFactor, coordinates[1] * scaleFactor]
    }

    function addCharacters(characters) {
        characters.forEach(function(character, i) {

            var top = [character.coordinates[0] + 200, character.coordinates[1] + 200]

            var bounds = L.latLngBounds(
                scaledCoordinates(character.coordinates),
                scaledCoordinates(top)
            );

            L.imageOverlay(character.url, bounds, {className: 'character'}).addTo(characterLayer);

            console.log(character);
        });
    }

};
