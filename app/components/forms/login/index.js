var BaseComponent = require('../../base');
var create = require('lodash/create');

//
// Constructor for the form component
//
function LoginForm(config) {
  BaseComponent.call(this, config);
}

//
// Inherit from the BaseComponent
//
LoginForm.prototype = create(BaseComponent.prototype, {

  constructor: LoginForm,

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
    this.el.innerHTML = this.template(data);
  }

});

module.exports = LoginForm;
