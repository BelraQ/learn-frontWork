const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    entry: {
        app: './client',
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]],
                plugins: [],
            }
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js', 
    },

    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    }
}