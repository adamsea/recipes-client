var BaseComponent = require('../../base');
var create = require('lodash/create');
var defaults = require('lodash/defaults');

//
// Constructor for the BaseInput component
//
function BaseInput(config) {
  BaseComponent.call(this, config);
}

//
// Inherit from the BaseComponent
//
BaseInput.prototype = create(BaseComponent.prototype, {

  constructor: BaseInput,

  //
  // The init method will handle setting common properties.
  //
  init: function(config) {
    defaults(config, {
      formClass: 'input-form',
      placeholder: 'Enter Text'
    });
    this.formClass = config.formClass;
    this.placeholder = config.placeholder;
    return BaseComponent.prototype.init.call(this, config);
  },

  //
  // Override the getTemplate() method
  //
  getTemplate: function() {
    return require('./template.html');
  },

  //
  // Override the render() method
  //
  render: function(data) {
    this.el.innerHTML = this.template(defaults(data || {}, {
      formClass: this.formClass,
      placeholder: this.placeholder
    }));
  }

});

module.exports = BaseInput;