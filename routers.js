var fs = require('fs');
var path = require('path');

function getList(req, res) {
	fs.readdir('./data', function(err, files) {
		if(err) {
			console.log("error:\n" + error);
			return;
		}
		res.json(files);
	})
}

function save(req, res) {
	var filename = req.body.basicInfo.filename;
	// 把传来的json转换为字符串保存
	fs.writeFile('./data/' + filename + '.json', JSON.stringify(req.body) ,function(err) {
		if(err) { 
			console.log(err);
			return;
		}
		console.log(filename + '.json' + "已经被成功写入。");
	});
}

function getFile(req, res) {
	var filename = req.params.filename;
	fs.readFile(path.join(__dirname, './data/', filename), {encoding: 'utf8'}, function(err, data) {
		if(err) {
			console.log('gil')
			console.log(err);
			return;
		}
		res.json(data)
	})
}

// 删除文件
function removeFile(req, res) {
	var filename = req.params.filename + ".json";
	fs.unlink(path.join('./data/', filename), function(err) {
		res.json({success: true});
	})
}

// 生成html
function generateHTML(req, res) {
	var header = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>简历</title><link rel="stylesheet" type="text/css" href="./style.css"></head><body><div id="container">';
	var footer = '</div><script type="text/javascript" src="./position.js"></script></body></html>';
	var filename = req.body.filename;
	var html = header + req.body.html + footer;
	fs.writeFile('./output/' + filename + '.html', html ,function(err) {
		if(err) {
			console.log(err);
			return;
		}
		console.log(filename + '.html' + "已经被成功写入。");
		res.json({success: true});
	});
}

module.exports = {
	getList: getList,
	save: save,
	getFile: getFile,
	removeFile: removeFile,
	generateHTML: generateHTML
}