var path = require('path')

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        module: true
    },
	experiments: {
		outputModule: true
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
