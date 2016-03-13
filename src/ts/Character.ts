module got {
    export class Character {
        name: string;
        imgUrl: string;
        isMainCharacter: boolean;
        marker: L.Circle;

        constructor(obj) {
            this.name = obj.name;
            this.imgUrl = obj.url;
            this.isMainCharacter = obj.mainCharacter;
        }

        addMarker(coordinates) {
            this.marker = new L.Circle(
                coordinates,
                5,
                {
                    color: 'red'
                }
            );
        }
    }
}