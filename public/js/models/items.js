var item = Backbone.Model.extend({
	defaults: {
		title: "",
		item: ""
	}
});

var items = Backbone.Collection.extend({	
	model: item,

	nextOrder: function() {
		return this.length ? this.last().get('order') + 1 : 1;
	},

	comparator: 'order'
})

module.exports = {
	model: item,
	collection: items
}