var itemsCollection = require('./items').collection;
var itemModel = require('./items').model;
var BackboneLocal = require('backbone.localstorage');

Backbone.LocalStorage = BackboneLocal;

var mainModel = Backbone.Model.extend({

	// LocalStorage: new Backbone.LocalStorage('resume'),

	url: '/api/save',

	defaults: {
		basicInfo: {
			filename: "",
			name: "",
			email: "",
			mobile: "",
			school: "",
			major: "",
			github: "",
			blog: "",
			jobApply: ""
		}
	},

	// 设置默认
	initialize: function() {
        // because initialize is called after parse
        _.defaults(this, {
            basicSkills: new itemsCollection(),
            personalSkills: new itemsCollection(),
            proExp: new itemsCollection(),
            otherSkills: new itemsCollection()
        });
	},

	// 嵌套collection
	parse: function(response) {
		var that = this;
		var items = ["basicSkills", "personalSkills", "proExp", "otherSkills"];
		_.each(items, function(item, index) {
			if(_.has(response, item)) {
				// 把response相应的嵌套collection的数组转换成collection
				that[item] = new itemsCollection(response[item], {
					parse: true
				});
				delete response[item];
			}
		});
		return response;
	},

	// 嵌套collection在保存为json时的处理
	toJSON: function() {
		var that = this;
		var json = _.clone(this.attributes);
		var items = ["basicSkills", "personalSkills", "proExp", "otherSkills"];
		_.each(items, function(item, index){
			// 把每一个collection都转换成json
			if(that[item]) {
				json[item] = that[item].toJSON();
			}
		});
		return json;
	}
});

module.exports = mainModel;