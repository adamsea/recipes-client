var RecipeList = require('./components/recipes/list');
var list = new RecipeList({
  el: '.recipe-list'
});
list.render();

var RecipeFilter = require('./components/filters/input');
var filter = new RecipeFilter({
  el: '.recipe-filter',
  filter: '.recipe-list',
  formClass: 'filter-input-form',
  placeholder: 'Filter Recipes by User'
});
filter.render();

var TagTotals = require('./components/tags/totals');
var tags = new TagTotals({
  el: '.tag-totals'
});
tags.render();

var RecipeForm = require('./components/forms/recipe');
var recipeForm = new RecipeForm({
  el: '.recipe-form',
  events: {
    'submit': [function(ev) {
      setTimeout(list.render.bind(list), 100);
    }]
  }
});
recipeForm.render();