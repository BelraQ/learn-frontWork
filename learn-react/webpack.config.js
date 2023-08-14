const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: "wordRelay-setting",
    mode: "development",
    devtool: "eval",
    resolve: {
        extensions: [".js", ".jsx"],
    },

    entry: {
        app: ["./client"],
    },

    module: {
        rules: [{
            test: /\.jsx?$/, //정규표현식
            loader: 'babel-loader', // webpack용 문법 변환
            options: { // babel의 옵션
                presets: [
                    ['@babel/preset-env', {
                        //targets: {
                        //    browsers: ['> 1% in KR'],
                        //},
                        //debug: true,
                    }], 
                    '@babel/preset-react'
                ],
                plugins: [
                    'react-refresh/babel'
                ],
            },
        }],
    },

    plugins: [
        new RefreshWebpackPlugin()
    ],

    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js",
        //publicPath: '/dist' 
    },

    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true,
    },
};