got.EpisodeFilter = function(options) {
    var season = parseInt(options.season);
    var episode = parseInt(options.episode);
    // true if it should match exactly the selected season + episode instead of greate equals.
    var match = options.match || false;

    console.log(match);

    function exactFilter(character) {
        return season == character.start.season && episode == character.start.episode;
    }

    function greaterFilter(character) {
        var characterSeason = character.start.season;
        var characterEpisode = character.start.episode;

        var isGreater = season >= characterSeason;

        if (season == characterSeason) {
            isGreater = episode >= characterEpisode;
        }

        return isGreater;
    }

    this.apply = function(array) {
        return array.filter(function(character) {
            if (match) {
                return exactFilter(character);
            } else {
                return greaterFilter(character);
            }
        });
    }
};
