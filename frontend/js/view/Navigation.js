var Ractive = require('ractive');

var userModel = require('../model/Base');

module.exports = Ractive.extend({
 	template: require('../../tpl/navigation'),
 	onconstruct: function() {
 		this.data.isLogged = userModel.isLogged();
 	}
});