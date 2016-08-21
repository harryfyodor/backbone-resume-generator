var resumeView = Backbone.View.extend({

	events: {
		'click .resume-print': 'print',
		'click .resume-html': 'html'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		if(this.model) {
			console.log(this.model.attributes.basicInfo)
			$(this.el).html(this.template(this.model.attributes));
		}
		return this;
	},

	print: function() {
		if(confirm("请问您要打印吗")) {
			window.print();
		}
	},

	html: function() {
		var html = $(this.el).find("#resume-body").prop('outerHTML');
		if(confirm("请问要生成html文件吗？")) {
			$.ajax({
				type: 'POST',
				url: '/api/generateHTML',
				data: {
					filename: this.model.attributes.basicInfo.filename,
					html: html,
				},
				timeout: 500,
				success: function() {
					alert("成功生成html！可以查看根目录的output文件夹~");
				},
				error: function() {
				}
			});
		}
	}
});

module.exports = resumeView;