var BaseComponent = require('../../base');
var create = require('lodash/create');
var uniqBy = require('lodash/uniqBy');

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
  var form = this.el.querySelector('form');
  var title = form.elements.title.value.trim();
  var description = form.elements.description.value.trim();
  var tags = form.elements.tags.value.trim();
  tags = tags && tags.split(/\s+/) || [];

  if (title && description) {
    window.fetch('http://127.0.0.1:3000/recipes', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tags: uniqBy(tags, function(tag) {
          return tag.toLowerCase();
        })
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      form.reset();
    });
  }
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