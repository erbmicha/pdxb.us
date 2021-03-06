/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var compileCompass = require('broccoli-compass');

var app = new EmberApp({
  name: require('./package.json').name,

  legacyFilesToAppend: [
    'jquery.js',
    'handlebars.js',
    'moment.js',
    'ember.js',
    'ic-ajax/dist/named-amd/main.js',
    'ember-data.js',
    'app-shims.js',
    'ember-resolver.js',
    'ember-load-initializers.js'
  ],

  // AKA whitelisted modules
  ignoredModules: [
    'ember',
    'ember/resolver',
    'ember/load-initializers',
    'ic-ajax'
  ],

  // hack we can hopefully remove as the addon system improves
  importWhitelist: {
    'ember': ['default'],
    'ember/resolver': ['default'],
    'ember/load-initializers': ['default']
  },

  // hack
  getEnvJSON: require('./config/environment')
});

app.styles = function() {
  return compileCompass(this.appAndDependencies(), this.name + '/styles/app.scss', {
    outputStyle: 'expanded',
    sassDir: this.name + '/styles',
    imagesDir: 'public/images',
    cssDir: '/assets'
  });
};

module.exports = app.toTree();
