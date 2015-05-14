require.config({
  baseUrl: 'src/js',
  paths: {
    jquery: '/bower_components/jquery/dist/jquery.min',
    d3: '/bower_components/d3/d3'
  }
});

require(
  ['character-map'],

  function(CharacterMap) {
    var characterMap = new CharacterMap();
    characterMap.initialize();
  }
);
