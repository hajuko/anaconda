define(['jquery'], function($) {
  var DataStorage = function() {

  };

  DataStorage.prototype = {
    getCharacters: function() {
      return $.ajax({
        dataType: 'json',
        url: '../src/data/characters.json'
      });
    }
  };

  return DataStorage;
});
