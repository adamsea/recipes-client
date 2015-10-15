module.exports = function (grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'assets/js/app.js': ['components/**/*.js']
        }
      }
    }

  });

  // Load plugin tasks.
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['browserify']);

};
