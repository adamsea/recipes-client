var BaseComponent = require('../../base');
var create = require('lodash/create');
var defaults = require('lodash/defaults');
var forEach = require('lodash/each');
var pad = require('lodash/pad');
var template = require('lodash/template');
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
    forEach: forEach,
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
// Initialization for the component
// Sets the template to use for rendering recipe details to the modal
//
RecipeCard.prototype.init = function(config) {
  this.detailsTemplate = template(require('./details.html'), {
    imports: this.templateImports
  });
  return BaseComponent.prototype.init.call(this, config);
}

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
  this.el.innerHTML = this.template(defaults(data, { image: null }));
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
          content: this.detailsTemplate(defaults(recipe, { image: null })),
          closeButton: false
        });
      }
      this.modal.show();
    }.bind(this));
};

module.exports = RecipeCard;