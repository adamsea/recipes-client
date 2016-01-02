var BaseInput = require('../../base/input');
var create = require('lodash/create');
var get = require('lodash/get');
var result = require('lodash/result');

//
// Constructor for the input filter component
//
function SearchInput(config) {
  BaseInput.call(this, config);
}

//
// Inherit from the BaseInput
//
SearchInput.prototype = create(BaseInput.prototype, {

  constructor: SearchInput,

  events: {
    'submit': ['searchRecipes', '.search-input-form']
  },

  //
  // Handle form submission with search terms
  //
  searchRecipes: function(ev) {
    result(ev, 'preventDefault');
    var form = this.el.querySelector('form');
    var input = result(get(form, 'elements.baseinput.value'), 'trim');
    if (input) {
      var search = new CustomEvent('recipesearch', { detail: input });
      this.el.dispatchEvent(search);
      form.reset();
    }
  }

});

module.exports = SearchInput;