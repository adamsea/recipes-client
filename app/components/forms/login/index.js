var BaseComponent = require('../../base');
var create = require('lodash/create');
var attempt = require('lodash/attempt');
var get = require('lodash/get');
var isError = require('lodash/isError');
var trim = require('lodash/trim');

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

  events: {
    'submit': ['loginUser']
  },

  //
  // Log the user into the application
  //
  loginUser: function(ev) {
    ev.preventDefault();
    var form = ev.target;
    var username = trim(form.elements.username.value);
    var password = trim(form.elements.password.value);
    if (username && password) {
      window.fetch('http://127.0.0.1:3000/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + window.btoa(username + ':' + password)
        }
      })
      .then(function(response) {
        if (response.ok) {
          response.json()
            .then(function(data) {
              var ret;
              var token = get(data, 'token');
              if (token) {
                ret = attempt(sessionStorage.setItem.bind(sessionStorage), 'token', token);
                if (!isError(ret)) {
                  // The user is logged in, reload the page
                  location.reload(true);
                }
                else {
                  alert('Browser sessions must be enabled to log in.');
                }
              }
              else {
                console.warn('The token was not returned by the API.');
              }
            });
        }
        else {
          alert('We were unable to log you in.  Please try again later!');
        }
      });
    }
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
    var token = attempt(sessionStorage.getItem.bind(sessionStorage), 'token');
    var isLoggedIn = token && !isError(token);
    if (!isLoggedIn) {
      this.el.innerHTML = this.template(data);
    }
  }

});

module.exports = LoginForm;
