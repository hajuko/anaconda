var fs = require('fs');
var imagePath = 'src/img/characters';
var imagemagick = require('imagemagick-native');

function createCharacters() {
    var images = fs.readdirSync(imagePath);
    var coordinates = createCoordinates();
    var characters = [];

    images.forEach(function(image, i) {
        var imageUrl = image;
        var name = image
            .replace('.jpg', '')
            .split('_')
            .map((word) => {
                return word[0].toUpperCase() + word.slice(1);
            })
            .join(' ');

        var character = {
            pictures: {
                main: imageUrl
            },
            name: name,
            start: {
                season: 1,
                episode: 1
            },
            coordinates: coordinates[i]
        };

        characters.push(character);
    });

    console.log(characters);

    fs.writeFile("src/data/character_raw.json", JSON.stringify(characters), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}


function createCoordinates() {
    var results = [];
    var factor = 300;
    for (var i = 1; i <= 11; i++) {
        for (var j = 1; j <= 11; j++) {
            results.push([i * factor, j * factor]);
        }
    }

    return results;
}

function renameImages() {
    var images = fs.readdirSync(imagePath);
    images.forEach(function(image) {
        fs.rename(imagePath + '/' + image, imagePath + '/' + image.replace(new RegExp(' ', 'g'), '_').toLowerCase());
    });
}

function resizeImages() {
    var src = 'qotho.jpg';
    console.log('asd');

    var images = fs.readdirSync('src/images');

    console.log(images);

    images.forEach(function(file) {
        fs.readFile(file, function(err, img) {
            imagemagick.identify({srcData: img}, function(err, result) {
                var width = result.width;
                var height = result.height;

                console.log(result);
            });
        });
    });

    console.log(src);
}
resizeImages();