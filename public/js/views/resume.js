var resumeView = Backbone.View.extend({

	events: {
		'click .resume-print': 'print',
		'click .resume-html': 'html',
		'click select':'lineHightChange'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		if(this.model) {
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
					console.log("Fail to generate!")
				}
			});
		}
	},

	lineHightChange: function(e) {
		$('#resume-body').css("line-height", $('select').val())
		this.adapt();
	},

	// 这段代码从
	adapt: function() {
		var left1 = $(this.el).find('#resume-basic-skills').get(0).offsetHeight;
		var right1 = $(this.el).find('#resume-personal-skills').get(0).offsetHeight;
		var left = $(this.el).find('#resume-left').get(0).offsetHeight;
		var right = $(this.el).find('#resume-right').get(0).offsetHeight;
		var left2 = left - left1;
		var right2 = right - right1;
		var leftBottomElement = $(this.el).find('#resume-pro-exp');
		var rightBottomElemnt = $(this.el).find('#resume-other-skills');

		leftBottomElement.css('height', left2 - 10 + 'px');
		rightBottomElemnt.css('height', right2 - 10 + 'px');
	}
});

module.exports = resumeView;