/**
 * Require .env file
 */
require('dotenv').config();

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

/**
 * Determine if debugging should be enabled or not
 * @type {boolean}
 */
const isDev = process.env.NODE_ENV !== 'production';

/**
 * Extract Text Plugin
 * This combines the css into a single file
 * @type {ExtractTextPlugin}
 */
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'main.css',
    disable: isDev,
});

/**
 * HTML Webpack Config
 * This generates the index.html file and inserts the js/css into it
 * @type {HtmlWebpackPlugin}
 */
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index-template.html',
    filename: 'index.html',
    inject: 'body',
});

const InjectedEnvironmentVariablesPlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
});

var jsloaders = ['babel-loader'];

/**
 * This means the current node-env is dev
 *
 * When the environment is dev, we can add our linting and react-hot-loader plugins
 */
if (isDev === true) {
    jsloaders.push('eslint-loader');
    jsloaders.unshift('react-hot-loader');
}

module.exports = {
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
        path: path.resolve('dist'),
        filename: 'app.js',
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: jsloaders,
                exclude: /node_modules/,
            },
            {
                test: /\.jsx$/,
                loaders: jsloaders,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                data: '@import "global";',
                                includePaths: [
                                    path.join(__dirname, 'src/style'),
                                    path.join(__dirname, 'src/components'),
                                    path.join(__dirname, 'src/scenes'),
                                ],
                            }
                        },
                    ],
                }),
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff',
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js', '.scss', '.css', '.less'],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
    },
    plugins: [
        InjectedEnvironmentVariablesPlugin,
        HtmlWebpackPluginConfig,
        ExtractTextPluginConfig,
    ],
};
