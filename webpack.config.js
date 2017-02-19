
var path = require('path');

module.exports = {
    entry: './client/index.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "client"),
        port: 9000,
        proxy: {
            "/api": "http://localhost:9001",
            "/auth": "http://localhost:9001"
        }
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'client')
        },
        {
            test: /\.scss$/,
            // may need to fix style-loader!...
            loader: "style-loader!css-loader!sass-loader"
        }]
    }
};



/*
    devtool: 'eval',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },

*/