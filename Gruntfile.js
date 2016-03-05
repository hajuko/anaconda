module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        'less': {
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
        'watch': {
            styles: {
                files: ['src/less/**/*.less', 'src/ts/**/*.ts'], // Which files to watch
                tasks: ['less', 'ts'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            }
        },
        'http-server': {
            'dev': {
                root: '.',
                port: 1337,
                // If specified to, for example, "127.0.0.1" the server will
                // only be available on that ip.
                // Specify "0.0.0.0" to be available everywhere
                host: '0.0.0.0',
                cache: 0,
                showDir : true,
                autoIndex: true,
                // server default file extension
                ext: 'html',
                // run in parallel with other tasks
                runInBackground: true
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

    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('dev', ['less', 'http-server:dev', 'watch']);
};
