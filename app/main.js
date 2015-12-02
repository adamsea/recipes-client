var RecipeList = require('./components/recipes/list');
var list = new RecipeList({
  el: '.recipe-list'
});
list.render();

var RecipeFilter = require('./components/filters/input');
var filter = new RecipeFilter({
  el: '.recipe-filter',
  filter: '.recipe-list'
});
filter.render({
  placeholder: 'Filter Recipes by User'
});

var TagTotals = require('./components/tags/totals');
var tags = new TagTotals({
  el: '.tag-totals'
});
tags.render();