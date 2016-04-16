var cheerio = require('cheerio'),
    http = require('follow-redirects').http,
    settings = {},
    numberOfHeroes;

exports.Crawler = function() {

    var CrawlController = function(numberOfCrawls, heroJson, crawlResult) {
        var crawlsFinished = 0;

        this.crawlFinished = function(heroName) {
            crawlsFinished++;
            var crawlsLeft = numberOfCrawls - crawlsFinished;
            console.log("*******************************");
            console.log('Crawl done: ' + heroName);
            console.log('Crawls left: ' + crawlsLeft);
            if (crawlsLeft > 0) {
                return;
            }
            console.log("*******************************\n*******************************");
            console.log("Finished all Heroes");
            console.timeEnd("Total");
            crawlResult.send(heroJson)
        };
    };

    var myCrawlController;

    var download = function(url, callback, param, param2) {
        http.get(url, function(res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function() {
                callback(data, param, param2);
            });
        }).on("onerror", function() {
            callback(null);
        });
    };

    var crawlHeroNames = function(data, crawlResult) {

        var baseUrl = "http://heroesofthestorm.gamepedia.com/",
        heroJson = {heroes: {}},
        $ = cheerio.load(data, settings);

        var crawlHeroType = function(heroType) {
            var heroes = $("#mf-" + heroType).children();
            heroes.each(function(i, e) {
                var a = $(e).children().get(0);
                var currHero = {};
                currHero.name = a.attribs.title;
                currHero.type = heroType;
                var img = $(a).find('img');
                currHero.icon = img.attr('src');
                heroJson.heroes[currHero.name] = currHero;
                console.log("CRAWLHERONAMES: " + currHero.name);
            });
        };

        var crawlHeroes = function() {
            console.log("crawl start");
            var heroNames = Object.keys(heroJson.heroes);
            heroNames.forEach(function(heroName) {
                var currHero = heroJson.heroes[heroName];
                var isRedirect = true;
                download(baseUrl + heroName.replace(' ', '_'), crawlHeroSite, currHero, myCrawlController, false);
            });
        };

        crawlHeroType('assassin');
        crawlHeroType('warrior');
        crawlHeroType('support');
        crawlHeroType('specialist');
        numberOfHeroes = Object.keys(heroJson.heroes).length;
        myCrawlController = new CrawlController(numberOfHeroes, heroJson, crawlResult);
        console.log("HEROES TO CRAWL: " + numberOfHeroes);
        crawlHeroes();
    };

    var crawlHeroSite = function(data, hero, crawlController) {
        var $ = cheerio.load(data, settings);

        console.log("crawl: " + hero.name);

        var crawlAbilities = function() {
            var skills = $("div.skills");
            var tables = skills.children('table').not('.wikitable').not('.navbox');
            hero.abilities = [];

            for (var i = 0; i < tables.length; i++) {
                var ability = {};
                var currTable = tables.get(i);
                var tds = $(currTable).find('td');
                var nameTr = $(tds).get(1);
                var descTr = $(tds).get(2);
                ability.name = $(nameTr).text();
                ability.icon = $(currTable).find("a.image > img").attr('src');
                ability.descHtml = $(descTr).html();
                hero.abilities.push(ability);
            }
        };

        var crawlTalents = function() {
            hero.talents = [];
            var talentTable = $("table.wikitable").get(0),
                trs = $(talentTable).children();

            for (var i = 1; i < trs.length; i++) {

                var currentTierTalents = [],
                    currentRow = trs.get(i),
                    tds = $(currentRow).children();

                for (var j = 1; j < tds.length; j++) {
                    var talent = {},
                        currentTd = tds.get(j),
                        div = $(currentTd).children().get(0).children;
                    talent.name = $(currentTd).children().get(0).next.data;
                    currentTierTalents.push(talent);
                    talent.icon = $(div).find("img").attr('src');
                    talent.desc = $(currentTd).text();
                }
                hero.talents.push(currentTierTalents);
            }
        };
        crawlAbilities();
        crawlTalents();
        crawlController.crawlFinished(hero.name);
    };

    this.crawlHeroData = function(crawlResult) {
        console.time("Total");
        var heroUrl = "http://heroesofthestorm.gamepedia.com/Heroes_of_the_Storm_Wiki";
        console.log('############################################');
        var isRedirect = true;
        download(heroUrl, crawlHeroNames, crawlResult, null, isRedirect);
    };
};
