var got;
(function (got) {
    var Map = (function () {
        function Map() {
            this.fu = 3;
            var containerId = 'leaflet-map';
            this.leafletMap = L.map(containerId).setView([51.505, -0.09], 13);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'asdf'
            }).addTo(this.leafletMap);
            L.marker([51.5, -0.09]).addTo(this.leafletMap)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
        }
        return Map;
    })();
    got.Map = Map;
})(got || (got = {}));
var got;
(function (got) {
    var bla = (function () {
        function bla() {
            this.name = 'fu';
        }
        return bla;
    })();
    got.bla = bla;
})(got || (got = {}));
$(function () {
    var map = new got.Map();
    console.log(map.fu);
});
