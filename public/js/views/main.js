var formView = require('./form');
var mainModel = require('../models/main');

var mainView = Backbone.View.extend({

	$container: $('#container'),

	events: {
		"click #main-new": "newBuild"
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		$(this.el).html(this.template());
		return this;
	},

	newBuild: function() {
		var view = new formView({
			model: new mainModel()
		});
		this.$container.html(view.render().el);
	}
});

module.exports = mainView;