var Ractive = require('ractive');

var FooterModel = require('../model/Version');

module.exports = Ractive.extend({
 	template: require('../../tpl/footer'),
 	onrender: function() {
 		var model = new FooterModel();
 		model.bindComponent(this).fetch();
 	}
});