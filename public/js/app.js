var utils = require('./utils');
var formView = require('./views/form');
var itemView = require('./views/item');
var listView = require('./views/list');
var mainView = require('./views/main');
var resumeView = require('./views/resume');
var mainModel = require('./models/main');

var AppRouter = Backbone.Router.extend({

	routes: {
		"":             	"main",
		"list/:mode":       "list",
		"new":       		"create",
		"form/:mode": 		"form",
		"edit/:file": 		"edit",
		"delete/:file": 	"remove",
		"watch/:file": 		"watch"
	},

	$container: $('#container'),

	initialize: function() {
		// Backbone.history.navigate("", {trigger: true});
		this.main();
	},

	main: function() {
		var view = new mainView();
		this.$container.html(view.render().el);
	},

	list: function(mode) {
		var view = new listView({});
		this.$container.html(view.render().el);
	},

	create: function() {
		var view = new formView({
			model: new mainModel()
		});
		this.$container.html(view.render().el);
	},

	edit: function(file, mode) {
		// ajax get json file
		// this.mainModel = 
		console.log(234)
		var view = new formView();
		this.$container.html(view.render().el);
	},

	form: function(mode) {
		$('#form-tabs a').removeClass('active');
		$('li[name="' + mode + '"]').find("a").addClass('active');
		$('div.form-box').hide();
		$('#' + mode).show();
		$('#' + mode).find(".form-add").focus();
	},

	remove: function(file) {
		
	},

	watch: function(file) {
		var view = new resumeView();
		this.$container.html(view.render().el);
	}

});

utils.loadTemplate(['form', 'item', 'list', 'main', 'resume'], function() {
	var app = new AppRouter();
	Backbone.history.start();
});