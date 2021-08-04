let assignWith = require('lodash/assignWith');
let defer = require('lodash/defer');
let forEach = require('lodash/each');
let isArray = require('lodash/isArray');
let isElement = require('lodash/isElement');
let isEqual = require('lodash/isEqual');
let isString = require('lodash/isString');
let isUndefined = require('lodash/isUndefined');
let template = require('lodash/template');

//
// Constructor for the component.
// Will set up the DOM element for this component
// and call any initialization logic for the component.
//
function BaseComponent(config) {
  //
  // The element is being created in the component
  // or provided to the component - we will leave it
  // to the code to know how events are bound
  //
  if (isElement(config.el)) {
    this.el = config.el;
  }
  //
  // The element is already in the document
  // and may have events previously bound,
  // so we'll make a copy of the node to drop events.
  //
  else {
    let docEl = document.querySelector(config.el);
    let newEl = docEl.cloneNode(true);
    docEl.replaceWith(newEl);
    this.el = newEl;
  }

  // Set compiled template
  let settings = {};
  if (this.templateImports) {
    settings.imports = this.templateImports;
  }
  this.template = template(this.getTemplate(), settings);

  // Set event listeners
  this.events = assignWith(this.events || {}, config.events, function(value, source) {
    if (value && source) {
      return [value, source];
    }
    return isUndefined(source) ? value : source;
  });
  this.addEventListeners();

  // Custom component initialization
  this.init(config);
}

//
// State object.
//
BaseComponent.prototype.state = {};

//
// Set up the component with a base config
// Implement this method in your component do
// any initializtion logic, etc.
//
BaseComponent.prototype.init = function() {
  // Override this method
};

//
// Add event listeners for the component
// Handles multiple event handlers for the same eventType
//
BaseComponent.prototype.addEventListeners = function() {
  forEach(this.events, function(params, eventType) {
    if (!isArray(params[0])) {
      this.addListener(params, eventType);
    }
    else {
      forEach(params, function(arrParams) {
        this.addListener(arrParams, eventType);
      }.bind(this));
    }
  }.bind(this));
};

//
// Add each event listener
// Events should be of the format
// eventType: [handlerFunc, selector]
//
BaseComponent.prototype.addListener = function(params, eventType) {
  let handlerFunc = params[0];
  let selector = params[1];

  this.el.addEventListener(eventType, function(ev) {
    if (selector) {
      let node = ev.target.closest(selector)
      if (!(node && this.el.contains(node))) {
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
BaseComponent.prototype.render = function() {
  // Override this method
};

//
// Clear the dom for this component.
//
BaseComponent.prototype.clear = function() {
  while (this.el.hasChildNodes()) {
    this.el.removeChild(this.el.firstChild);
  }
};

//
// Re-render component based on state changes...
//
BaseComponent.prototype.setState = function(state = {}, cb) {
  let currentState = {...this.state};
  forEach(state, (value, key) => {
    this.state[key] = value;
  });
  if (!isEqual(this.state, currentState)) {
    this.render();
  }
  if (typeof cb === 'function') {
    defer(cb);
  }
};

module.exports = BaseComponent;