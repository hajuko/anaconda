got.Character = function(data, map) {
    var top = map.scaledCoordinates([data.coordinates[0] + 200, data.coordinates[1] + 200]);
    var bounds =  L.latLngBounds(map.scaledCoordinates(data.coordinates), top);
    var textPostion = map.scaledCoordinates([data.coordinates[0] - 25, data.coordinates[1]  + 100]);
    var baseFonzSize = 26;
    var that = this;

    fontsize = baseFonzSize * map.scaleFactor;
    console.log(fontsize);

    console.log(map.scaleFactor);

    this.name = data.name;
    this.pictures = data.pictures;
    this.start = data.start;
    this.text = new L.Text(this.name, textPostion, fontsize);

    this.image = L.imageOverlay(
        this.pictures.main,
        bounds,
        { className: 'character' }
    );

    this.frame = L.rectangle(
        bounds,
        {
            fillOpacity: 0.5,
            fillColor: 'red',
            stroke: false
        }
    );

    this.frame.on('click', function() {
        map.showCharacterInfo(that);
    });

    this.drawText = function() {
        that.text._drawText();
    }
};
