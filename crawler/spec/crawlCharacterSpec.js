var crawler = require('../crawler.js');
var fs = require('fs');
var cheerio = require('cheerio')


describe("Test Crawl CharacterPage", function() {
    it("should crawl correctly", function() {
        var characterMock = fs.readFileSync('./mocks/character.html', { encoding: 'utf8' });

        $ = cheerio.load(characterMock, {});
        var result = crawler.crawlCharacterPage($);

        expect(result).toEqual("Hello world!");
    });
});
