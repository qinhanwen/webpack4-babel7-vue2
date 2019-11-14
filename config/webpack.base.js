const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    resolve,
    isDevMode
} = require('./utils');

const devMode = isDevMode();

module.exports = {
    entry: resolve('./src/index.js'),
    output: { //输出文件
        filename: "static/js/[name].[hash:8].js", //文件名
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
                    cacheBusting: true
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [{
                        loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            { // 图片资源太小转成内联，减少http请求
                test: /\.(jpg|jpeg|png)$/,
                use: [{
                        loader: 'url-loader', // 是对file-loader的封装
                        options: {
                            limit: 1024, // 如果小于10k转成base64
                            name: '[name].[ext]',
                            outputPath: 'static/images/', //输出到images文件夹
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
                    outputPath: 'static/fonts/', //输出到images文件夹
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
        new VueLoaderPlugin()
    ],

}