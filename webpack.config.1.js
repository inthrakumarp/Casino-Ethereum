const path = require("path")

module.exports = {
    entry: path.join(__dirname, 'src/js', 'index.js'), // our front end will be inside the src folder
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build.js' // the final file will be created in dist/build.js
    },
    module: {
        loaders: [{
            test: /\.css$/, // to load the CSS in react
            use: ['style-loader', 'css-loader'],
            include: /src/
        },{
            test: /\.js?$/, // to load the js and jsx files
            loader: 'babel-loader',
            exclude: /node-modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.json$/, // to load all the json files
            loader: 'json-loader'
        }]
    }
}