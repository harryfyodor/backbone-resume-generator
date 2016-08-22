var formView = require('./form');
var mainModel = require('../models/main');
var resumeView = require('./resume');
var itemsCollection = require('../models/items').collection;

var listView = Backbone.View.extend({

	$container: $('#container'),

	events: {
		"click a": "detail"
	},

	initialize: function() {

		var that = this;

		$.ajax({
			type: 'GET',
			url: '/getList',
			dataType: 'json',
			timeout: 500,
			success: function(data) {
				that.list = data;
				that.render();
			},
			error: function(xhr, type) {
				that.render();
			}
		});

		this.mode = "watch";
		if(Backbone.history.location.hash === "#/list/edit") {
			this.mode = "edit";
		}
	},

	render: function() {
		var list = this.list || [];
		$(this.el).html(this.template({
			list: list,
			mode: this.mode,
			msg: this.msg
		}));
		return this;
	},

	detail: function(e) {
		var that = this;
		var type = $(e.target).parent().get(0).tagName.toLowerCase();
		//　防止其他节点也发起了请求
		if(this.mode === "edit" && type === 'li') {
			var filename = e.target.innerHTML.trim();
			// 用ajax获取所需的model
			/*
			var model = new mainModel();
			model.fetch({
				parse: true,
				url:'/api/getFile/' + filename,
				success: function(data) {
					console.log(data);
				}
			});
			*/
			$.get('/api/getFile/' + filename, function(data) {
				var json = JSON.parse(data);
				var model = new mainModel(json);
				// 设置model里面的内嵌collection
				// 不然的话collection就会以attribute保存
				model.basicSkills.set(json.basicSkills);
				model.personalSkills.set(json.personalSkills);
				model.proExp.set(json.proExp);
				model.otherSkills.set(json.otherSkills);
				var view = new formView({
					model: model
				});
				that.$container.html(view.render().el);
			});
		} else if(type === "li") {
			// 预览状态
			var filename = e.target.innerHTML.trim();
			// 用ajax获取所需的model
			$.get('/api/getFile/' + filename, function(data) {
				var json = JSON.parse(data);
				var model = new mainModel(json);
				var view = new resumeView({
					model: model
				});
				that.$container.html(view.render().el);
				// 调用view的函数，计算好所需要的尺寸。
				view.adapt();
			});
		}
	}
});

module.exports = listView;