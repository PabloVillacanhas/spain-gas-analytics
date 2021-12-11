const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	entry: path.join(__dirname, "src", "index.tsx"),
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
	},
	output: {
		path: path.resolve(__dirname, "../backend/client"),
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
	],
}