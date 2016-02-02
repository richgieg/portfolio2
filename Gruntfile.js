module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      dev_images: {
        src: 'src/img'
      },

      dist: {
        src: 'dist'
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
      },

      images: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: '**/*.jpg',
          dest: 'dist/img',
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
      beforeconcat: 'src/**/*.js',
      afterconcat: '.tmp/concat/**/*.js'
    },

    responsive_images: {
      dev_project_thumbnails: {
        options: {
          engine: 'im',
          sizes: [{
            rename: false,
            suffix: '-thumbnail',
            width: 60,
            quality: 80
          }]
        },
        files: [{
          expand: true,
          cwd: 'src/img_src',
          src: 'pj-*.jpg',
          dest: 'src/img',
        }]
      },

      dev_project_images: {
        options: {
          engine: 'im',
          sizes: [{
            rename: false,
            suffix: '-full',
            width: 540,
            quality: 80
          }]
        },
        files: [{
          expand: true,
          cwd: 'src/img_src',
          src: 'pj-*.jpg',
          dest: 'src/img',
        }]
      },
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
  grunt.loadNpmTasks('grunt-responsive-images');

  grunt.registerTask('dev_images', [
    'clean:dev_images',
    'responsive_images:dev_project_thumbnails',
    'responsive_images:dev_project_images',
  ]);

  grunt.registerTask('default', [
    'jshint:beforeconcat',
    'clean:dist',
    'dev_images',
    'copy:images',
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
