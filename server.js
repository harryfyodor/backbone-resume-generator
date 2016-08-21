var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');
var routers = require('./routers');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express')

var app = express();
var port = 3000;

var complier = webpack(config);

app.use(webpackDevMiddleware(complier, { noInfo: true, publicPath: config.output.publicPath }));

app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getList", routers.getList);

app.post("/api/save", routers.save);

app.get("/api/getFile/:filename", routers.getFile);

app.delete("/api/removeFile/:filename", routers.removeFile);

app.post("/api/generateHTML", routers.generateHTML);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});