/// <reference path="../../typings/leaflet/leaflet.d.ts" />

module got {
    export class Map {
        leafletMap;
        fu = 3;

        constructor() {
            var containerId = 'leaflet-map';
            this.leafletMap = L.map(containerId).setView([51.505, -0.09], 13);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'asdf'
            }).addTo(this.leafletMap);

            L.marker([51.5, -0.09]).addTo(this.leafletMap)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
        }
    }
}