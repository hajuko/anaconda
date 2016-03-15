var got = {};

var factor = 256 * 8;

L.Map = L.Map.extend({
    // Rounding removed
    latLngToLayerPoint: function(latLng) {
        var projectedPoint = this.project(L.latLng(latLng));

        return projectedPoint._subtract(this.getPixelOrigin());
    }
    //
    //_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
    //
    //    var swOffset = this.project(maxBounds.getSouthWest(), zoom).subtract(pxBounds.min),
    //        neOffset = this.project(maxBounds.getNorthEast(), zoom).subtract(pxBounds.max),
    //
    //        dx = this._rebound(swOffset.x, - neOffset.x),
    //        dy = this._rebound(swOffset.y, - neOffset.y);
    //
    //    return new L.Point(dx, dy);
    //}
});

L.ImageOverlay = L.ImageOverlay.extend({
    _initImage: function () {
        console.log('fubar');
        var img = this._image =
            L.DomUtil.create('img', this.options.className + ' leaflet-image-layer ' + (this._zoomAnimated ? 'leaflet-zoom-animated' : ''));

        img.onselectstart = L.Util.falseFn;
        img.onmousemove = L.Util.falseFn;

        img.onload = L.bind(this.fire, this, 'load');

        if (this.options.crossOrigin) {
            img.crossOrigin = '';
        }

        img.src = this._url;
        img.alt = this.options.alt;
    }
});
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

$(function() {
    var settings = {
        characterSize: 100
    };

    new got.Map(settings);
});
