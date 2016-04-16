var cheerio = require('cheerio')
var settings = {};
var request = require('request');
var fs = require('fs');

function crawlController(numberOfCrawls, data) {
    this.numberOfCrawls = numberOfCrawls;
    this.crawlsFinished = 0;
    this.characters = data;
    this.completeCharacters = {};

    this.crawlFinished = function(characters) {
        var that = this;
        this.characters = this.characters.concat(characters)
        this.crawlsFinished++;
        var crawlsLeft = this.numberOfCrawls - this.crawlsFinished;
        console.log("*******************************");
        console.log('Crawl done');
        console.log('Crawls left: ' + crawlsLeft);
        if (crawlsLeft > 0) {
            return;
        }
        console.log("*******************************\n*******************************");
        console.log("Finished all Characters");
        console.log(this.characters);

        this.crawlsFinished = 0;
        this.numberOfCrawls = this.characters.length;

        this.characters.forEach(function(character) {
            downloadCharacter(character, that);
        });
    };

    this.singleCrawlFinished = function(characterName, imageUrl) {
        this.crawlsFinished++;

        if (!imageUrl) {
            console.log('Image missing - skipping character: ' + characterName);
            return;
        }

        request(imageUrl).pipe(fs.createWriteStream('src/img/characters_new/' + characterName + '.jpg'));

        this.completeCharacters[characterName] = {name: characterName, imageUrl: imageUrl}
        var crawlsLeft = this.numberOfCrawls - this.crawlsFinished;
        console.log("*******************************");
        console.log('Crawl done: ' + characterName);
        console.log('Crawls left: ' + crawlsLeft);
        if (crawlsLeft > 0) {
            return;
        }
        console.log("*******************************\n*******************************");
        console.log("Finished all Characters");
        console.log(this.completeCharacters);
    }
}


function downloadCharacter(name, _crawlController) {
    var url = 'http://gameofthrones.wikia.com/wiki/' + name.replace(new RegExp(' ', 'g'), '_');

    download(url, function(html) {
        $ = cheerio.load(html, settings);
        var image = null;

        var element = $('.portable-infobox figure a');

        if (element.length > 0) {
            image = element.prop('href');
        }

        _crawlController.singleCrawlFinished(name, image);
    });
}

function download(url, callbackFn) {
    request(url, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            callbackFn(html);
        }
    });
}

function downloadCharacters() {
    var numberOfPages = 14;
    var _crawlController = new crawlController(numberOfPages, []);

    var baseUrl = "http://gameofthrones.wikia.com/wiki/Category:Characters?page=";

    for (var i = 1; i <= numberOfPages; i++) {
        var currentUrl = baseUrl + i;

        console.log(currentUrl);

        download(currentUrl, function(html) {
            $ = cheerio.load(html, settings);
            crawlCharacteList($, _crawlController);
        });
    }
}

function crawlCharacteList($, _crawlController) {
    var characters = [];

    $('#mw-pages .category-gallery-room1 > .category-gallery-item img').each(function(i, element) {
        var name = $(element);

        characters.push(name.prop('alt'));
    });

    _crawlController.crawlFinished(characters);
}

downloadCharacters();


module.exports.crawlCharacterPage = crawlCharacteList;