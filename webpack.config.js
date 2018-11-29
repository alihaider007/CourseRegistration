/* npm install webpack webpack-cli webpack-dev-server raw-loader file-loader url-loader to-string-loader style-loader css-loader @angular-devkit/build-angular @ngtools/webpack copy-webpack-plugin @angular/compiler @angular/compiler-cli circular-dependency-plugin source-map-loader mini-css-extract-plugin @angular-devkit/build-optimizer uglifyjs-webpack-plugin clean-webpack-plugin less-loader less --save-dev */

const { resolve } = require('path');
const rxPaths = require('rxjs/_esm5/path-mapping');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { IndexHtmlWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    mode: 'development',

    devtool: 'eval',

    entry: {
        main: './ClientApp/src/main.ts',
        polyfills: './ClientApp/src/polyfills.ts',
        styles: './ClientApp/src/styles.css'
    },

    output: {
        path: resolve('./wwwroot'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.ts', '.js'],
        alias: rxPaths()
    },

    node: false,

    performance: {
        hints: false,
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.js$/,
                exclude: /(ngfactory|ngstyle).js$/,
                enforce: 'pre',
                use: 'source-map-loader'
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [resolve('./ClientApp/src/styles.css')]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [resolve('./ClientApp/src/styles.css')]
            },
            //{
            //    test: /\.less/,
            //    loader: 'raw-loader!less-loader',
            //    include: [resolve('./ClientApp/')]
            //},
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(eot|svg|cur)$/,
                loader: 'file-loader',
                options: {
                    name: `[name].[ext]`,
                    limit: 10000
                }
            },
            {
                test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                loader: 'url-loader',
                options: {
                    name: `[name].[ext]`,
                    limit: 10000
                }
            },

            // This hides some deprecation warnings that Webpack throws
            {
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['wwwroot']),
        new IndexHtmlWebpackPlugin({
            input: './index.html',
            output: 'index.html',
            entrypoints: [
                'styles',
                'polyfills',
                'main'
            ]
        }),

        new AngularCompilerPlugin({
            mainPath: resolve('./ClientApp/src/main.ts'),
            sourceMap: true,
            nameLazyFiles: true,
            tsConfigPath: resolve('./ClientApp/src/tsconfig.app.json'),
            skipCodeGeneration: true
        }),

        new ProgressPlugin(),

        new CircularDependencyPlugin({
            exclude: /[\\\/]node_modules[\\\/]/
        }),

        new CopyWebpackPlugin([
            {
                from: 'ClientApp/src/assets',
                to: 'assets'
            },
            {
                from: 'ClientApp/src/favicon.ico'//,
                //to: 'images'
            },
            {
                from: 'ClientApp/src/aicd-logo-desktop.png'//,
                //to: 'images'
            },
            {
                from: 'ClientApp/src/logo.png'//,
                //to: 'images'
            }
        ])
    ]
};