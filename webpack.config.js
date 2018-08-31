
var dev = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var node_dir = __dirname + '/node_modules';
var output_dir = __dirname +"/site/production"

var config = {
	
	context: __dirname,
	entry: "./site/js/index.js",
	
	output: {
		path: output_dir,
		filename: 'index.js'
	},
	
	module: {
		loaders: [
			{
				test: require.resolve('jquery'), loader: 'expose-loader?jQuery!expose-loader?$'
			},
			/* Uncomment this section if you're working with React/Babel
			{
				// loading JSX (aka Babel) into browser-friendly ES6
				test: /\.js$/,
				exclude: [
					/(node_modules|bower_components)/,
					'index.js',
				],
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			*/
			{
				// loading sass asset files
				test: /\.scss$/,
				loaders: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [(dev? 'css-loader?sourceMap': 'css-loader'), (dev? 'sass-loader?sourceMap': 'sass-loader')]
				})
			},
			{
				// load external resources (ie Google fonts)
				test: /.(png|woff(2)?|eot|ttf|svg|jpg|jpeg|gif)(\?[a-z0-9=\.]+)?$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},
	
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.ProvidePlugin({
		    $: "jquery",
		    jQuery: "jquery",
		    "window.jQuery": "jquery"
		})
	]
};

/**
 * Development-only configuration values
 **/
if( dev ){
	
	// set compiled css location
	config.plugins.push( new ExtractTextPlugin("index.css") );
	
	// we want source maps
	config.devtool = 'source-map';
	
	
/**
 * Production-only configuration values
 **/
}else{
	
	// set our final output filename
	config.output.filename = 'index.min.js';
	
	// re-iterate our production value as a string (for ReactJS building)
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		})
	);
	
	// remove all debug and console code
	config.module.loaders.push(
		{ 
			test: /\.(js|jsx)$/,
			loader: "webpack-strip?strip[]=console.log,strip[]=console.info,strip[]=debug"
		}
	);
	
	// set compiled css location
	config.plugins.push( new ExtractTextPlugin("index.min.css") );
	
	// uglify our js, with no sourcemaps
	config.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: true,
				mangle: false,
				sourceMap: false,
				comments: false
			})
		);
}

// now export our collated config object
module.exports = config;
