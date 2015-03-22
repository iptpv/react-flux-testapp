module.exports = {
    entry: './app.jsx',
        output: {
            filename: 'bundle.js',
            publicPath: 'http://localhost:8090/'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx|.js$/,
                    loader: 'jsx-loader?insertPragma=React.DOM&harmony'
                },
                {
                    test: /\.styl$/,
                    loader: 'style-loader!css-loader!stylus-loader'
                }
            ]
        },
        externals: {
            'react': 'React'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
}
