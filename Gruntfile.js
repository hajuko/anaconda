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
                files: ['src/less/**/*.less', 'src/ts/**/*.ts'], // Which files to watch
                tasks: ['less', 'ts'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            }
        },
        ts: {
            options: {
                sourceMap: false
            },
            default : {
                src: ["src/ts/main.ts"],
                out: 'app.js'
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};
