got.Map = function(settings) {
    var that = this;
    this.tileLayer = L.tileLayer(
        '',
        {
            noWrap: true,
            updateWhenIdle: false
        }
    );

    this.map = new L.map(
        'leaflet-map',
        {
            crs: got.customLeaflet.crs,
            center: [0, 0],
            attributionControl: false,
            inertia: false,
            zoom: 0,
            maxZoom: 5

        }
    );

    this.pointToLatLng = function(x, y) {
        var point = L.point(x, y);

        return this.map.unproject(point,  0);
    };

    this.map.addLayer(this.tileLayer);

    var bounds = L.latLngBounds(
        this.pointToLatLng(0, 0),
        this.pointToLatLng(500, 500)
    );

    var bounds2 = L.latLngBounds(
        this.pointToLatLng(0, 0),
        this.pointToLatLng(10, 10)
    );

    var border = L.rectangle(bounds);
    var rect = L.rectangle(bounds2);

    rect.addTo(this.map);

    border.addTo(this.map);

    var test = L.circle(
        that.pointToLatLng(0, 0),
        5,
        {
            fillColor: 'red'
        }
    );

    var test2 = L.circle(
        that.pointToLatLng(10, 1),
        1,
        {
            fillColor: 'red'
        }
    );

    test.addTo(this.map);
    test2.addTo(this.map);
};
