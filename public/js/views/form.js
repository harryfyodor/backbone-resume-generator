var itemView = require('./item');
var utils = require('../utils');
var currentTab = "basic-skills";
var itemModel = require('../models/items').model;

var formView = Backbone.View.extend({

	events: {
		"click #form-save": "saveResume",
		"click #form-cancel": "cancel",
		"click #form-delete": "removeResume",
		"click #form-tabs": "display",
		"click .form-add": "addItem"
	},

	initialize: function() {

		this.listenTo(this.model.basicSkills, 'add', this.addOne);
		this.listenTo(this.model.personalSkills, 'add', this.addOne);
		this.listenTo(this.model.proExp, 'add', this.addOne);
		this.listenTo(this.model.otherSkills, 'add', this.addOne);

		this.render();
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.addAll();
		return this;
	},

	saveResume: function() {
		console.log(this.model)
		this.model.set({
			basicInfo:{
				filename: $('#form-filename').val().trim(),
				name: $('#form-name').val().trim(),
				mobile: $('#form-mobile').val().trim(),
				school: $('#form-school').val().trim(),
				major: $('#form-major').val().trim(),
				email: $('#form-email').val().trim(),
				github: $('#form-github').val().trim(),
				blog: $('#form-blog').val().trim(),
				jobApply: $('#form-jobApply').val().trim()
			}
		});
		$('.error-msg').html('');
		// 如果基本信息是空的
		if(!_.isEqual(utils.showErrors(this.model.attributes.basicInfo), {})) {
			var msg = "";
			for(item in utils.showErrors(this.model.attributes.basicInfo)) {
				msg += (utils.showErrors(this.model.attributes.basicInfo)[item] + '<br/>');
			}
			$('.error-msg').html(msg);
			return;
		}

		if(confirm("确定保存吗？")) {
			this.model.save();
			Backbone.history.navigate("/", {trigger: true});
		}
	},

	cancel: function() {
		if(confirm("确定不保存就退出？")) {
			Backbone.history.navigate("/", {trigger: true});
		}
	},

	removeResume: function() {
		if(!this.model.filename) {
			console.log("文件还没创建呢！");
			return;
		}
		var filename = this.model.attributes.basicInfo.filename;
		if(confirm("确定要删除这一份简历？")) {
			$.ajax({
				url: "/api/removeFile/" + filename,
				type: "DELETE",
				success: function() {
					console.log("reomve successfully!")
				},
				error: function(err) {
					console.err(err);
				}
			});			
			Backbone.history.navigate("/", {trigger: true});
		}
	},

	addItem: function(e) {
		// 获取到包裹的div
		var div = $(e.target).parent();
		var titleValue = div.find('.form-add-title').val().trim();
		var detailValue = div.find('.form-add-detail').val().trim();
		if(detailValue && titleValue) {
			// 相应的tab的id
			var tid = div.parent().attr("id");
			var col = this.transform(tid);
			this.model[col].add({
				title: titleValue,
				item: detailValue
			});
		}
		div.find('.form-add-title').val('');
		div.find('.form-add-detail').val('');
	},

	// 小横杠命名法变驼峰命名法，仅限两个单词的拼接
	transform: function(str) {
		var eles = str.split("-");
		return eles[0] + eles[1][0].toUpperCase() + eles[1].slice(1, eles[1].length);
	},

	addOne: function(item) {
		console.log(item)
		var form = $('.form-box').filter(function(index) {
				return $(this).css("display") !== "none";
			});
		var id = form.attr("id");
		id = this.transform(id);
		var list = form.find("ul");
		var view = new itemView({ 
			model: item,
			collection: this.model[id]
		});
		list.append(view.render().el);
	},

	updateOne: function() {
		console.log(this.model)
	},

	// todos 先把model清空，然后调用这里的addItem添加，这样才会有事件

	addAll: function() {

		var cols = ["basic-skills", "personal-skills", "pro-exp", "other-skills"];
		var that = this;

		_.each(cols, function(col, index) {
			var colName = that.transform(col);
			var len = that.model[colName].models.length;

			var list = that.$el.find('#' + col).find('ul');
			for (var i = 0; i < len; i++) {
				var model = that.model[colName].models.shift();
				// console.log(model)
				that.model[colName].add({
					title: model.attributes.title,
					item: model.attributes.item
				}, {silent: true});
				// console.log(that.model[colName].models[len - 1])
				var view = new itemView({ 
					model: that.model[colName].models[len - 1],
					collection: that.model[colName]
				});
				list.append(view.render().el);
			}
		});
	}
});

module.exports = formView;