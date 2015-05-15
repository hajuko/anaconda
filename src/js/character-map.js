define(
  ['jquery', 'image-controller', 'data-storage', 'd3'],

  function($, ImageController, DataStorage) {

    var CharacterMap = function() {
      this.settings = {
        mapWidth: 1000,
        mapHeight: 1000
      };

      this.d3Layout = d3.layout.pack()
        .size([this.settings.mapWidth - 4, this.settings.mapHeight - 4])
        .radius(70)
        .padding(50);
    };

    CharacterMap.prototype = {

      initialize: function() {
        this.svg = d3.select('body').append('svg')
          .attr('width', this.settings.mapWidth)
          .attr('height', this.settings.mapHeight)
          .append('g');

        this.imageController = new ImageController(this.svg);
        this.dataStorage = new DataStorage();

        //TODO: wie geht das schöner?
        var characterRequest = this.dataStorage.getCharacters();
        characterRequest.done($.proxy(this.drawMap, this));
      },

      drawMap: function(characterJson) {
        var objects = this.createCharacters(characterJson);
        var object = objects.enter().append('g');

        object.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

        this.drawCircle(object);
        this.addName(object);
        this.addBackgroundImage(object);
        this.addTitle(object);
        this.addCssClasses(object);
      },

      createCharacters: function(characterJson) {
        return this.svg.datum((characterJson))
          .selectAll().data(this.d3Layout.nodes);
      },

      addBackgroundImage: function(object) {
        var that = this;

        object.filter(function (d) {
          that.imageController.addSvgImagePattern(d.id, d.url);

          return d.name;
        });
      },

      addCssClasses: function(object) {
        var root = this.filterRoot(object);
        var house = this.filterHouse(object);
        var character = this.filterCharacter(object);

        root.attr('class', 'root');
        house.attr('class', 'house');
        character.attr('class', 'character');
      },

      addTitle: function(object) {
        object.append('title')
          .text(function (d) {
            return d.name;
          });
      },

      drawCircle: function(object) {
        object = this.removeRootNode(object);
        object.append('circle')
          .attr('r', function (d) {
            return d.r;
          })
          .attr('fill', function (d) {
            return 'url(#' + d.id + ')';
          });
      },

      addName: function(object) {
        var house = this.filterHouse(object);
        var character = this.filterCharacter(object);
        house.append('text')
          .attr('dy', function(d) {
            return -d.r;
          })
          .style('text-anchor', 'middle')
          .text(function(d) {
            return d.name;
          });

        character.append('text')
          .attr('dy', '90px')
          .style('text-anchor', 'middle')
          .text(function(d) {
            return d.name;
          });
      },

      removeRootNode: function(object) {
        return object.filter(function(d) {
          return d.name;
        });
      },

      filterCharacter: function(object) {
        return object.filter(function(d) {
          return d.name && !d.house;
        });
      },

      filterHouse: function(object) {
        return object.filter(function(d) {
          return d.house;
        });
      },

      filterRoot: function(object) {
        return object.filter(function(d) {
          return !d.name;
        });
      }
    };

    return CharacterMap;
  }
);
