var path = require('path')

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'cfw-easy-html.js',
        library: 'cfw-easy-html'
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
