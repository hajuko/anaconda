var fs = require('fs');
var imagePath = '../src/img/characters';

function createCharacters() {
    var images = fs.readdirSync(imagePath);

    images.forEach(function(image) {
        var image
        var name = image.replace(new RegExp('_', 'g'), ' ').replace('jpg', '');

        var character = {
            pictures: {
                main: image
            },
            name: name
        };

        console.log(character);
    });

    console.log(images.length)
}


function renameImages() {
    var images = fs.readdirSync(imagePath);
    images.forEach(function(image) {
        fs.rename(imagePath + '/' + image, imagePath + '/' + image.replace(new RegExp(' ', 'g'), '_'));
    });
}

//renameImages();

createCharacters();