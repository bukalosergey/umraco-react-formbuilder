const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = function (_, { mode }) {
	/** @type {import("webpack").Configuration} */
	const baseConfig = {
		context: path.resolve(__dirname),
		entry: {
			vendor: ['react', 'react-dom'],
			contactFormApplication: ['./src/contact-form-application.tsx'],
			depositFormApplication: ['./src/deposit-form-application.tsx'],
			loanFormApplication: ['./src/loan-form-application.tsx'],
			emerchantFormApplication: ['./src/emerchant-form-application.tsx'],
			refinancingForm: ['./src/refinancing-form-application.tsx'],
            calculator: ['./src/calc.app.tsx'],
			creditCardFormApplication: ['./src/creditcard-form-application.tsx'],
			agreementFormApplication: ['./src/agreement-form-application.tsx']
		},
        mode: //mode || 
            'development',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'js/[name].bundle.js'
		},
		devtool: /*mode === 'production' ? 'nosources-source-map' :*/ 'source-map',
		resolve: {
			extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
		},
		devServer: {
			contentBase: './dist',
			compress: true,
			// proxy: {
			// 	'/Umbraco': 'http://newdev.tfbank.ee'
			// }
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					loader: 'ts-loader'
				},
				{
					enforce: "pre",
					test: /\.js$/,
					loader: "source-map-loader"
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.EnvironmentPlugin({
				'NODE_ENV': mode,
				'HOST': 'http://tfwebdev1bo.azurewebsites.net'
			}),
			new CopyWebpackPlugin([
				{ from: './polyfill/polyfill.js', to: './js' }
			]),
			// new CompressionPlugin({
			//     test: /\.js$|\.css$|\.html$/
			// })
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'initial',
						name: 'vendor',
						test: 'vendor',
						enforce: true
					},
				}
			}
		}
	}

	if (mode === 'development') {
		baseConfig.entry.bootstrap = ['bootstrap'];
		baseConfig.entry.css = ['./src/public/test.css'];
	}

	return baseConfig;
}