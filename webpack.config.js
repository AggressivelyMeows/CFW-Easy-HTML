var path = require('path')

module.exports = {
    context: __dirname,
    entry: './example.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        library: 'webpackNumbers',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.md$/i,
                use: 'raw-loader',
            },
        ],
    },
};
