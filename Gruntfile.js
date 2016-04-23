var jasmine = require('jasmine-node');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    function fubar() {
        console.log('asd');
    }

    grunt.initConfig({
        less: {
            development: {
                options: {
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // Destination file and source file
                    'dist/got-characters.css': 'src/less/main.less'
                }
            }
        },
        watch: {
            styles: {
                files: ['src/less/**/*.less', 'src/js/**/*.js', 'crawler/**/*.js'],
                tasks: ['less', 'concat'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: [
                    'src/data/characters.js',
                    'src/js/namespace.js',
                    'src/js/custom-leaflet.js',
                    'src/js/Character.js',
                    'src/js/Filter/EpisodeFilter.js',
                    'src/js/Map.js',
                    'src/js/main.js'
                ],
                dest: 'app.js'
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};
