var got;
(function (got) {
    var settings = {
        width: 3831,
        height: 3101,
        tileSize: 256
    };
    var Map = (function () {
        function Map() {
            this.characters = [];
            var containerId = 'leaflet-map';
            this.map = L.map(containerId, {
                minZoom: 0,
                maxZoom: 5
            });
            var southWest = this.unproject([100, settings.height - 100]);
            var northEast = this.unproject([settings.width - 100, 100]);
            this.bounds = new L.LatLngBounds(southWest, northEast);
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
        Map.prototype.createCharacters = function (houses) {
            var _this = this;
            houses.forEach(function (house) {
                house.children.forEach(function (character) {
                    character = new got.Character(character);
                    _this.characters.push(character);
                });
            });
        };
        Map.prototype.addMarkers = function () {
            var _this = this;
            this.characters.forEach(function (character) {
                character.addMarker(_this.unproject([2000, 2000]));
                character.marker.addTo(_this.map);
            });
        };
        Map.loadData = function () {
            return got.getCharacterData();
        };
        Map.prototype.unproject = function (coords) {
            return this.map.unproject(coords, got.Map.zoomLevel());
        };
        Map.prototype.project = function (coords) {
            return this.map.project(coords, got.Map.zoomLevel());
        };
        Map.zoomLevel = function () {
            return Math.ceil(Math.log(Math.max(settings.width, settings.height) /
                settings.tileSize) / Math.log(2));
        };
        return Map;
    })();
    got.Map = Map;
})(got || (got = {}));
var got;
(function (got) {
    function getCharacterData() {
        return [
            {
                name: "House Stark",
                house: true,
                children: [
                    {
                        name: "John Snow",
                        url: "src/img/characters/eddard_stark.jpg",
                        mainCharacter: true,
                        id: 1
                    },
                    {
                        name: "Rickon Stark",
                        url: "src/img/characters/eddard_stark.jpg",
                        id: 2
                    },
                    {
                        name: "Allister Thorne",
                        url: "src/img/characters/allister_thorne.jpg",
                        mainCharacter: true,
                        id: 3
                    },
                    {
                        name: "John Snow",
                        url: "src/img/characters/eddard_stark.jpg",
                        mainCharacter: true,
                        id: 4
                    },
                    {
                        name: "Anguy",
                        url: "src/img/characters/anguy.jpg",
                        id: 5
                    }
                ]
            },
            {
                name: "House Fubar",
                house: true,
                children: [
                    {
                        name: "Maester Aemon",
                        url: "src/img/characters/maester_aemon.jpg",
                        id: 6
                    },
                    {
                        name: "Areo Hotah",
                        url: "src/img/characters/areo_hotah.jpg",
                        mainCharacter: true,
                        id: 7
                    },
                    {
                        name: "Rickon Stark",
                        url: "src/img/characters/eddard_stark.jpg",
                        id: 8
                    }
                ]
            }
        ];
    }
    got.getCharacterData = getCharacterData;
})(got || (got = {}));
var got;
(function (got) {
    var Character = (function () {
        function Character(obj) {
            this.name = obj.name;
            this.imgUrl = obj.url;
            this.isMainCharacter = obj.mainCharacter;
        }
        Character.prototype.addMarker = function (coordinates) {
            this.marker = new L.Circle(coordinates, 5, {
                color: 'red'
            });
        };
        return Character;
    })();
    got.Character = Character;
})(got || (got = {}));
$(function () {
    var map = new got.Map();
});
