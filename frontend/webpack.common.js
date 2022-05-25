const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

console.log(process.env.NODE_ENV)
module.exports = {
	entry: path.join(__dirname, "src", "index.tsx"),
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, "../backend/src/client"),
		publicPath: '/',
		assetModuleFilename: 'images/[hash][ext][query]',
		filename: 'main.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			}, {
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.png|.jpeg/,
				type: 'asset/resource'
			}
			, {
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html")
		}),
		new webpack.DefinePlugin({
			HOST_API: process.env.NODE_ENV === 'production' ? 'spaingasstations.herokuapp.com' : JSON.stringify('localhost:5001'),
			VERSION: JSON.stringify('5fa3b9'),
			BROWSER_SUPPORTS_HTML5: true,
			TWO: '1+1',
			'typeof window': JSON.stringify('object'),
		}),
	],
}