// Let's include Lodash here.
var RecipeCard = require('./components/recipes/card');
var card = new RecipeCard({
  el: '.recipe-list'
});
card.render();