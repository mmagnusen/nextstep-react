
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'static/nextstepapi/js'),
            filename: 'bundle.js'
        },
        watch: true,
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, 
            {
                test: /\.scss$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options:  {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options:  {
                                sourceMap: true
                            }
                        },
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'static/nextstepapi/js'),
            historyApiFallback: true
        }
    }
};