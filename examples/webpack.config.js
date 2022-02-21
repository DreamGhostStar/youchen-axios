const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, 'app.ts')
        if (fs.statSync(fullDir).isDirectory()) {
            entries[dir] = entry
        }
    
        return entries;
    }, {}),
    output: {
        filename: '[name].js',
        publicPath: '/__build__/',
        path: path.join(__dirname, '__build__'),
        clean: true
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
}