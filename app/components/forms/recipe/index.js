var BaseComponent = require('../../base');
var create = require('lodash/create');

//
// Constructor for the modal form component
//
function RecipeForm(config) {
  BaseComponent.call(this, config);
}

//
// Inherit from the BaseComponent
//
RecipeForm.prototype = create(BaseComponent.prototype, {
  constructor: RecipeForm
});

//
// Override the init() method
//
RecipeForm.prototype.init = function(config) {
  this.el.addEventListener('submit', this.createRecipe.bind(this), false);
};

//
// Add a tag to the list
//
RecipeForm.prototype.addTag = function(tag) {
};

//
// Remove a tag from the list
//
RecipeForm.prototype.removeTag = function(recipeLabel, tag) {
};

//
// Create a new recipe
//
RecipeForm.prototype.createRecipe = function(ev) {
  ev.preventDefault();
};

//
// Override the getTemplate() method
//
RecipeForm.prototype.getTemplate = function() {
  return require('./template.html');
};

//
// Override the render() method
//
RecipeForm.prototype.render = function(data) {
  this.el.innerHTML = this.template(data);
};

module.exports = RecipeForm;