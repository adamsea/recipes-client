// Let's include Lodash here.
var each = require('lodash/collection/each');

each(['Tom', 'Bill', 'Susan', 'Jeanie'], function(name) {
	console.log('Hi there, ' + name + '!');
});