var path = require('path')

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'cfw-easy-html.js',
        library: 'cfw-easy-html',
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
