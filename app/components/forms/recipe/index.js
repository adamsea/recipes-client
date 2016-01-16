var BaseComponent = require('../../base');
var create = require('lodash/create');
var uniqBy = require('lodash/uniqBy');
var without = require('lodash/without');
var assign = require('lodash/assign');
var attempt = require('lodash/attempt');
var isError = require('lodash/isError');

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

  constructor: RecipeForm,

  events: {
    'submit': ['createRecipe']
  }

});

//
// Add a tag to the list
//
RecipeForm.prototype.addTag = function(tag) {
  var recipeLabel = document.createElement('span');
  var removeLabel = document.createElement('span');
  var recipeLabels = this.el.querySelector('.recipe-labels');
  var recipeTags = this.el.querySelector('input[name="tags"]');

  // Add to our hidden form field
  var tags = [];
  if (recipeTags.value.trim()) {
    tags = recipeTags.value.trim().split(/,/);
  }
  tags.push(tag);
  recipeTags.value = tags.join(',');

  // Add to our display of recipe tags
  recipeLabel.textContent = tag;
  recipeLabel.className = 'label label-default';
  removeLabel.innerHTML = '&#x2715;';
  removeLabel.className = 'label-close';
  recipeLabel.appendChild(removeLabel);
  recipeLabels.appendChild(recipeLabel);

  // Remove a tag on click
  removeLabel.addEventListener('click', this.removeTag.bind(this, recipeLabel, tag), false);
};

//
// Remove a tag from the list
//
RecipeForm.prototype.removeTag = function(recipeLabel, tag) {
  var recipeTags = this.el.querySelector('input[name="tags"]');

  // Remove from our hidden form field
  var tags = without(recipeTags.value.trim().split(/,/), tag);
  recipeTags.value = tags.join(',');

  // Remove from our display of tags
  this.el.querySelector('.recipe-labels').removeChild(recipeLabel);
};

//
// Create a new recipe
//
RecipeForm.prototype.createRecipe = function(ev) {
  ev.preventDefault();
  var form = this.el.querySelector('form');
  var title = form.elements.title.value.trim();
  var description = form.elements.description.value.trim();
  var image = form.elements.image.value.trim();
  var tags = form.elements.tags.value.trim();
  tags = tags && tags.split(/,/) || [];

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
        image: image,
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
  var token = attempt(sessionStorage.getItem.bind(sessionStorage), 'token');
  var isLoggedIn = token && !isError(token);
  this.el.innerHTML = this.template(assign(data || {}, {
    isLoggedIn: isLoggedIn
  }));
  if (isLoggedIn) {
    this.el.querySelector('input[name="tagsinput"]').addEventListener('keypress', function(ev) {
      var tag = ev.target.value.trim();
      if (ev.keyCode === 13 && tag !== '') {
        ev.preventDefault();
        this.addTag(tag);
        this.el.querySelector('input[name="tagsinput"]').value = '';
      }
    }.bind(this), false);
  }
};

module.exports = RecipeForm;
