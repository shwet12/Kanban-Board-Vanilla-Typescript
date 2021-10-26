const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    entry: "./src/index.ts", //relative to root of the application
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }

        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Tic Tac Toe',
            template: path.resolve(__dirname, 'src/template.html'), // template file
            filename: 'index.html', // output file
        })
    ]
}