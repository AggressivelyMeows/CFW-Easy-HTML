module.exports = {
    context: __dirname,
    entry: './example.js',
    module: {
        rules: [
            {
                test: /\.md$/i,
                use: 'raw-loader',
            },
        ],
    },
};
