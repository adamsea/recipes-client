// Let's include Lodash here.
var RecipeList = require('./components/recipes/list');
var list = new RecipeList({
  el: '.recipe-list'
});
list.render();