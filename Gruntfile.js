module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

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
                files: ['src/less/**/*.less', 'src/js/**/*.js'],
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
                    'src/js/namespace.js',
                    'src/js/custom-leaflet.js',
                    'src/js/Map.js',
                    'src/js/main.js'
                ],
                dest: 'app.js'
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};
