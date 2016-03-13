/// <reference path="../../typings/leaflet/leaflet.d.ts" />
module got {
    var  settings = {
        width: 3831,
        height: 3101,
        tileSize: 256
    };

    export class Map {

        map;
        characters = [];
        bounds;

        constructor() {
            var containerId = 'leaflet-map';

            this.map = L.map(
                containerId,
                {
                    minZoom: 0,
                    maxZoom: 5
                }
            );

            var southWest = this.unproject([100, settings.height - 100 ]);
            var northEast = this.unproject([settings.width - 100, 100]);
            this.bounds =  new L.LatLngBounds(southWest, northEast);

            this.map.setView(this.unproject([settings.width / 2, settings.height / 2]), 5);

            L.tileLayer('src/data/tiles/{z}/{x}/{y}.png', {
                attribution: 'asdf',
                bounds: this.bounds,
                noWrap: true
            }).addTo(this.map);

            var houses = got.Map.loadData();
            this.createCharacters(houses);
            console.log(this.characters);
            this.addMarkers();
        }

        createCharacters(houses) {
            houses.forEach(house => {
                house.children.forEach(character => {
                    character = new got.Character(character);
                    this.characters.push(character);
                });
            });
        }

        addMarkers() {
            this.characters.forEach(character => {
                character.addMarker(this.unproject([2000, 2000]));
                character.marker.addTo(this.map);
            });
        }

        static loadData() {
            return got.getCharacterData();
        }

        unproject(coords) {
            return this.map.unproject(coords, got.Map.zoomLevel());
        }

        project(coords) {
            return this.map.project(coords, got.Map.zoomLevel());
        }

        static zoomLevel() {
            return Math.ceil(
                Math.log(
                    Math.max(settings.width, settings.height) /
                    settings.tileSize
                ) / Math.log(2)
            );
        }
    }
}

