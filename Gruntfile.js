/*
 * Generated on 2014-05-13
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      assets: 'assets',
      src: 'src',
      dist: 'dist'
    },
    copy: {
      assets: {
        files: [
          {expand: true, cwd: '<%= config.assets %>', src: ['**'], dest: '<%= config.dist %>'},
        ]
      }
    },
    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,pages,announcements,data,templates}/**/*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      assets: {
        files: [
          '<%= config.assets %>/{,*/}*.css',
          '<%= config.assets %>/{,*/}*.js',
          '<%= config.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['copy:assets']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/{,*/}*.css',
          '<%= config.dist %>/{,*/}*.js',
          '<%= config.dist %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '127.0.0.1' to limit access to the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      options: {
        helpers: ['handlebars-helper-compose'],
        compose: {
          sep: '<!-- section -->'
        },
        marked: {
          gfm: true,
          tables: true,
          smartLists: true
        }
      },
      pages: {
        options: {
          flatten: true,
          collections: [{
            name: 'events',
            inflection: 'event'
          }],
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/**/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/pages/**/*.hbs',
                                  '<%= config.src %>/announcements/**/*.hbs']
        }
      }
    },


    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('server', [
    'clean',
    'copy:assets',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy:assets',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
