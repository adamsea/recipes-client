var assign = require('lodash/assign');
var forEach = require('lodash/each');
var isElement = require('lodash/isElement');
var isString = require('lodash/isString');
var template = require('lodash/template');

//
// Constructor for the component.
// Will set up the DOM element for this component
// and call any initialization logic for the component.
//
function BaseComponent(config) {
  // Set root element and html
  this.el = isElement(config.el) && config.el || document.querySelector(config.el);
  this.template = template(this.getTemplate());

  // Set event listeners
  this.events = assign(this.events || {}, config.events);
  this.addEventListeners();

  // Custom component initialization
  this.init(config);
}

//
// Set up the component with a base config
// Implement this method in your component do
// any initializtion logic, etc.
//
BaseComponent.prototype.init = function(config) {
  // Override this method
};

//
// Add event listeners for the component
//
BaseComponent.prototype.addEventListeners = function() {
  forEach(this.events, this.addListener.bind(this));
};

//
// Add each event listener
// Events should be of the format
// eventType: [handlerFunc, selector]
//
BaseComponent.prototype.addListener = function(params, eventType) {
  var handlerFunc = params[0];
  var selector = params[1];

  this.el.addEventListener(eventType, function(ev) {
    var node;
    if (selector) {
      node = this.el.querySelector(selector);
      if (node !== ev.target) {
        return true;
      }
    }
    return isString(handlerFunc) ? this[handlerFunc](ev) : handlerFunc.call(this, ev);
  }.bind(this), false);
};

//
// Get the string template for the component instance.
// Use require() with a relative path from the component
// being created to the template.
// Implement this method in your component.
//
BaseComponent.prototype.getTemplate = function() {
  // Override this method
};

//
// Append the DOM of another component to this one.
//
BaseComponent.prototype.append = function(child) {
  return this.el.appendChild(child);
};

//
// Remove the DOM of another component to this one.
//
BaseComponent.prototype.remove = function(child) {
  return this.el.removeChild(child);
};

//
// Render the component and its children.
// Implement this method in your component.
//
BaseComponent.prototype.render = function(data) {
  // Override this method
};

//
// Clear the dom for this component.
//
BaseComponent.prototype.clear = function() {
  while (this.el.hasChildNodes()) {
    this.el.removeChild(this.el.firstChild);
  }
}

module.exports = BaseComponent;
