const webpack = require('webpack');
const path = require('path');


/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: [path.join(__dirname, 'js/main.js')],
		uikit: ['uikit', path.join(__dirname, 'scss/app.scss')]
	},
	output: {
		filename: 'js/[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/public/'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['es2015']
				}
			},
			{
				test: /\.(scss|css)$/,

				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						}, {
							loader: 'resolve-url-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(otf|eot|ttf|svg|woff|woff2)$/,
				loaders: [
					{
						loader: "file-loader",
						options: {
							limit: 80000,
							name: "fonts/[name].[ext]"
						}
					}, {
						loader: "img-loader"
					}
				]
			},
		]
	},
	plugins: [
		new UglifyJSPlugin(),
		new ExtractTextPlugin('css/[name].css'),
	]
};
