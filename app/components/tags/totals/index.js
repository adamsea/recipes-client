var BaseComponent = require('../../base');
var create = require('lodash/create');

//
// Constructor for the tag totals component
//
function TagTotals(config) {
  BaseComponent.call(this, config);
}

//
// Inherit from the BaseComponent
//
TagTotals.prototype = create(BaseComponent.prototype, {
  constructor: TagTotals
});

//
// Override the getTemplate() method
//
TagTotals.prototype.getTemplate = function() {
  return require('./template.html');
};

//
// Override the render() method
//
TagTotals.prototype.render = function(data) {
  this.el.innerHTML = this.template(data);
};

module.exports = TagTotals;