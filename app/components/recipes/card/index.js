var BaseComponent = require('../../base');
var create = require('lodash/create');
var defaults = require('lodash/defaults');
var forEach = require('lodash/each');
var pad = require('lodash/pad');
var truncate = require('lodash/truncate');

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
  }

});

//
// Override the init() method
//
RecipeCard.prototype.init = function(config) {
  // This will connect events to view recipe details onclick
};

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

module.exports = RecipeCard;