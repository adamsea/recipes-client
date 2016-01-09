var BaseComponent = require('../../base');
var create = require('lodash/create');
var defaults = require('lodash/defaults');
var forEach = require('lodash/each');
var pad = require('lodash/pad');
var truncate = require('lodash/truncate');
var parseInt = require('lodash/parseInt');
var picoModal = require('picomodal/src/picoModal');

//
// Constructor for the recipe card
//
function RecipeCard(config) {
  BaseComponent.call(this, config);
}

//
// Inherit from the BaseComponent
//
RecipeCard.prototype = create(BaseComponent.prototype, {

  constructor: RecipeCard,

  //
  // Free variables to import into the template
  // Add lodash functions here to use them in templates
  //
  templateImports: {
    pad: pad,
    truncate: truncate
  },

  //
  // Events for the component
  //
  events: {
    'click': ['showMoreDetails', '.card-view-more']
  },

  //
  // Modal instance property
  //
  modal: null

});

//
// Override the getTemplate() method
//
RecipeCard.prototype.getTemplate = function() {
  return require('./template.html');
};

//
// Override the render() method
//
RecipeCard.prototype.render = function(data) {
  var frag = document.createDocumentFragment();
  this.el.innerHTML = this.template(defaults(data, { image: null }));
  forEach(data.tags, function(tag) {
    var span = document.createElement('span');
    span.className = 'label label-default tag';
    span.textContent = tag.title;
    frag.appendChild(span);
  });
  this.el.querySelector('.tags').appendChild(frag);
};

//
// Show the recipe details
//
RecipeCard.prototype.showMoreDetails = function(ev) {
  var recipeId = parseInt(this.el.querySelector('.recipe-card').dataset.recipeId);
  window.fetch('http://127.0.0.1:3000/recipes/' + recipeId)
    .then(function(response) {
      return response.json();
    })
    .then(function(recipe) {
      // Create the modal for the first time
      if (!this.modal) {
        this.modal = picoModal({
          content: "This needs to be a call to rendering a template.",
          closeButton: false
        });
      }
      this.modal.show();
    }.bind(this));
};

module.exports = RecipeCard;