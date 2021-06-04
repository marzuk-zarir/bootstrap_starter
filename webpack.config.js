const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
let build = { minimize: false, sourceMap: 'inline-source-map' };

if (process.env.NODE_ENV === 'production') {
    build = { minimize: true, sourceMap: 'source-map' };
}

const webpackConfig = {
    entry: './src/scripts/index.js',

    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, './dist'),
    },

    target: 'web',
    devtool: build.sourceMap,
    optimization: {
        minimize: build.minimize,
        minimizer: ['...', new CssMinimizerPlugin()],
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 9090,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: 'babel-loader',
            },
            {
                test: /\.(s?css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|ico|jpe?g|svg|eot|woff|woff2|ttf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './assets',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
};
module.exports = webpackConfig;
