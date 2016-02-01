module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      dist: {
        src: ['dist'],
      }
    },

    copy: {
      html: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.html',
          dest: 'dist',
        }]
      }
    },

    useminPrepare: {
      html: 'src/index.html'
    },

    usemin: {
      html: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.html',
          dest: 'dist',
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.html',
          dest: 'dist',
        }]
      },
    },

    jshint: {
      beforeconcat: ['src/**/*.js'],
      afterconcat: ['.tmp/concat/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', [
    'jshint:beforeconcat',
    'clean:dist',
    'copy:html',
    'useminPrepare',
    'concat:generated',
    'jshint:afterconcat',
    'cssmin:generated',
    'uglify:generated',
    'usemin',
    'htmlmin'
  ]);

};
