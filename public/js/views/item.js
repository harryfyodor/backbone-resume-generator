var itemView = Backbone.View.extend({
	
	tagName: "li",

	events: {
		'dblclick label': 'edit',
		'click .item-ensure': 'press',
		'click .item-delete': 'clear',
		'click .item-edit' : 'edit',
		'click .item-cancel' : 'cancel'
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.remove);
		this.render();
	},

	render: function() {
		// 把model注入view
		$(this.el).html(this.template(this.model.toJSON()));
		this.$inputTitle = this.$('.item-title');
		this.$inputDetail = this.$('.item-detail');
		return this;
	},

	edit: function(e) {
		$(this.el).find("label").hide();
		$(this.el).find("input").show();
		$(this.el).find("textarea").show();
		$(this.el).find("input")[0].focus();
		$(this.el).find(".item-delete").hide();
		$(this.el).find(".item-edit").hide();
		$(this.el).find(".item-ensure").show();
		$(this.el).find(".item-cancel").show();
	},

	press: function(e) {
		var titleValue = this.$inputTitle.val().trim();
		var detailValue = this.$inputDetail.val().trim();
		if(titleValue && detailValue) {
			// 保存新值
			this.model.set({ 
				title: titleValue,
				item: detailValue 
			});
		} else if(titleValue || detailValue) {
			// 删除
			this.clear();
		}
		this.close();
	},

	cancel: function() {
		this.$inputTitle.val(this.model.attributes.title);
		this.$inputDetail.val(this.model.attributes.item);
		this.close();
	},

	close: function(e) {
		$(this.el).find('label').show();
		$(this.el).find("input").hide();
		$(this.el).find("textarea").hide();
		$(this.el).find(".item-ensure").hide();
		$(this.el).find(".item-cancel").hide();
		$(this.el).find(".item-delete").show();
		$(this.el).find(".item-edit").show();
	},

	clear: function() {
	    this.model.destroy();
	}
});

module.exports = itemView;