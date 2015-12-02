var BaseComponent = require('../../base');
var create = require('lodash/create');
var forEach = require('lodash/each');

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
// This will fetch the list of tags and append
// them into the template provided
//
TagTotals.prototype.render = function(data) {
  var frag = document.createDocumentFragment();
  this.el.innerHTML = this.template(data);
  window.fetch('http://127.0.0.1:3000/tags')
    .then(function(response) {
      return response.json();
    })
    .then(function(tags) {
      forEach(tags, function(tag) {
        var li = document.createElement('li');
        li.innerHTML = tag.title + ' <span class="badge badge-primary">' + tag.total + '</span>';
        frag.appendChild(li);
      });
      this.el.querySelector('ul').appendChild(frag);
    }.bind(this));
};

module.exports = TagTotals;