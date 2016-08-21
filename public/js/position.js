(function() {
	var left1 = document.getElementById('resume-basic-skills').offsetHeight;
	var right1 = document.getElementById('resume-personal-skills').offsetHeight;
	var left = document.getElementById('resume-left').offsetHeight;
	var right = document.getElementById('resume-right').offsetHeight;
	var left2 = left - left1;
	var right2 = right - right1;

	var leftBottomElement = document.getElementById('resume-pro-exp');
	var rightBottomElemnt = document.getElementById('resume-other-skills');

	leftBottomElement.style.height = left2 - 10 + 'px';
	rightBottomElemnt.style.height = right2 - 10 + 'px';
})();
