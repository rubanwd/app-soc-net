var Ractive = require('ractive');


module.exports = Ractive.extend({
 	template: require('../../tpl/home'),
 	components: {
 		navigation: require('../view/Navigation'),
 		appfooter: require('../view/Footer')
 	},
 	onrender: function() {
		 console.log('Home page rendered');
 	}
});