var utils = {

	// 用异步从不同的html里面加载模板出来
	loadTemplate: function(views, callback) {
		var deferreds = [];
		$.each(views, function(index, view) {
			if(require('./views/' + view)) {
				// 把异步事件，即从文件中读取html文件的函数，压入deferreds中
				deferreds.push($.get('../tpl/' + view + '.html', function(data) {
					// 修改相应的view的template
					require('./views/' + view).prototype.template = _.template(data);
				}));
			} else {
				alert(view + " not found");
			}
		});

		// 把所有异步操作都完成之后才调用callback
		$.when.apply(null, deferreds).done(callback);
	},

	showErrors: function(model) {
		var error = {};
		if(!model.filename) error.filename = "请输入文件名~";
		if(!model.name) error.name = "请输入姓名~";
		if(!model.mobile) error.mobile = "请输入电话号码~";
		if(!model.email) error.email = "请输入电子邮箱~";
		if(!model.school) error.school = "请输入学校~";
		if(!model.major) error.major = "请输入专业~";
		if(!model.jobApply) error.jobApply = "请输入意向~";
		return error;
	}
}

module.exports = utils;