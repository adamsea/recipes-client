var BaseComponent = require('../../../base');
var create = require('lodash/create');
var get = require('lodash/get');
var forEach = require('lodash/each');

//
// Constructor for the RecipeInputSelector component
//
function RecipeInputSelector(config) {
  BaseComponent.call(this, config);
}

//
// Inherit from the BaseComponent
//
RecipeInputSelector.prototype = create(BaseComponent.prototype, {

  constructor: RecipeInputSelector,

  events: {
    'change': ['selectInput', '.select']
  },

  //
  // Init method - disable the filter display by default.
  //
  init: function(config) {
    var node = document.querySelector('.recipe-filter');
    if (node) {
      node.style.display = 'none';
    }
  },

  //
  // Select the filter or search input
  //
  selectInput: function(ev) {
    var input = get(ev, 'target.value');
    forEach(['search', 'filter'], function(type) {
      var node = document.querySelector('.recipe-' + type);
      var display = 'none';
      if (type === input) {
        display = 'block';
      }
      if (node) {
        node.style.display = display;
      }
    });
  },

  //
  // Override the getTemplate() method
  //
  getTemplate: function() {
    return require('./template.html');
  },

  //
  // Override the render() method
  //
  render: function(data) {
    this.el.innerHTML = this.template(data);
  }

});

module.exports = RecipeInputSelector;