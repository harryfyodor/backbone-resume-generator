var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './public/js/app.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/',
		vendor: ['jquery', 'backbone', 'underscore']
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			Backbone: "backbone",
			_: "underscore"
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
	]
}