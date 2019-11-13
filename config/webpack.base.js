const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') // 自动清除沉余js

const {
    resolve
} = require('./utils');

const extractAppCSS = new ExtractTextPlugin({
    filename: './dist/css/main.[chunkhash:8].css',
    allChunks: true,
})

module.exports = {
    entry: resolve('./src/index.js'),
    output: { //输出文件
        filename: "bundle.[hash:8].js", //文件名
        path: resolve('./dist') //路径
    },
    resolve: { // 配置别名
        // 扩展名，比如import 'app.vue'，扩展后只需要写成import 'app'就可以了
        extensions: ['.js', '.vue', '.scss'],
        // 取路径别名，方便在业务代码中import
        alias: {
            views: resolve('src/views/'),
            components: resolve('src/components/'),
            directives: resolve('src/directives/'),
            filters: resolve('src/filters/'),
            mixins: resolve('src/mixins/'),
            services: resolve('src/services/'),
            assets: resolve('src/assets/'),
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
                    loaders: {
                        scss: extractAppCSS.extract({
                            fallback: 'vue-style-loader',
                            use: [{
                                    loader: 'css-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                }
                            ]
                        })
                    }
                }
            },
            {
                // Vue Loader v15 no longer applies PostCSS transforms by default. You will need to use PostCSS via postcss-loader.
                // onfiguration of PostCSS can be done via postcss.config.js or postcss-loader options. For details, consult postcss-loader docs.
                test: /\.(css|scss)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            { // 图片资源太小转成内联，减少http请求
                test: /\.(jpg|jpeg|png)$/,
                use: [{
                        loader: 'url-loader', // 是对file-loader的封装
                        options: { // 如果小于1024转成base64
                            limit: 1024,
                            name: '[name].[ext]',
                            outputPath: 'images/', //输出到images文件夹
                        }
                    },
                    {
                        loader: 'image-webpack-loader', // 压缩图片
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/, // 只转化src目录下的js
                exclude: /node_modules/ // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'fonts/', //输出到images文件夹
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: resolve('./src/index.html'), // 配置要被编译的html文件
            hash: true,
            minify: { // 压缩
                removeAttributeQuotes: true, //删除双引号
                collapseWhitespace: true //折叠 html 为一行
            }
        }),
        extractAppCSS,
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist'],
            verbose: true
        })
    ],
    optimization: { // 抽离共用部分
        splitChunks: {
            cacheGroups: {
                commons: {
                    // 抽离自己写的公共代码
                    chunks: 'initial',
                    name: 'common', // 打包后的文件名，任意命名
                    minChunks: 2, //最小引用2次
                    minSize: 0 // 只要超出0字节就生成一个新包
                },
                styles: {
                    name: 'styles', // 抽离公用样式
                    test: /\.css$/,
                    chunks: 'all',
                    minChunks: 2,
                    enforce: true
                },
                vendor: {
                    // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                }
            }
        }
    }
}