var BaseComponent = require('../../base');
var RecipeCard = require('../card');
var create = require('lodash/create');
var forEach = require('lodash/each');

//
// Constructor for the recipe list
//
function RecipeList(config) {
  BaseComponent.call(this, config);
}

//
// Inherit from the BaseComponent
//
RecipeList.prototype = create(BaseComponent.prototype, {
  constructor: RecipeList
});

//
// Override the render() method
// This will fetch the recipe list and render each
// recipe in the list to a RecipeCard component.
//
RecipeList.prototype.render = function(term) {
  // Handle optional search params
  var url = 'http://127.0.0.1:3000/recipes?_expand=user';
  if (term) {
    url += '&q=' + encodeURIComponent(term);
  }

  // Clear current recipe cards
  this.clear();
  window.fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(recipes) {
      forEach(recipes, function(recipe) {
        var card = new RecipeCard({
          el: document.createElement('div')
        });
        card.render(recipe);
        this.append(card.el);
      }.bind(this));
    }.bind(this));
};

module.exports = RecipeList;