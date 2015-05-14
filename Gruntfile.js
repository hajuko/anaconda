module.exports = function(grunt) {
  require('jit-grunt')(grunt);

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
        files: ['src/less/**/*.less'], // Which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};
