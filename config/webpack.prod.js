const webpackMerge = require("webpack-merge");
const webpackBaseConfig = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const {
    resolve
} = require('./utils');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') // 自动清除

const plugins = [
    new MiniCssExtractPlugin({
        filename: 'static/css/base.[contenthash:8].css',
    }),
    new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist'],
        verbose: true
    })
];

module.exports = () => {
    webpackBaseConfig.plugins = webpackBaseConfig.plugins.concat(plugins);

    const prodConfig = {
        mode: 'production',
        performance: {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        },
        optimization: { // 抽离共用部分
            minimizer: [new OptimizeCSSAssetsPlugin()],
            namedChunks: true, //除了 moduleId，我们知道分离出的 chunk 也有其 chunkId。同样的，chunkId 也有因其 chunkId 发生变化而导致缓存失效的问题。由于manifest与打出的 chunk 包中有chunkId相关数据，所以一旦如“增删页面”这样的操作导致 chunkId 发生变化，可能会影响很多的 chunk 缓存失效。
            runtimeChunk: { //在 webpack4 之前，抽离 manifest，需要使用 CommonsChunkPlugin，配置一个指定 name 属性为'manifest'的 chunk。在 webpack4 中，无需手动引入插件，配置 runtimeChunk 即可。
                name: 'manifest'
            },
            moduleIds: 'hashed', //项目工程中加载的 module，webpack 会为其分配一个 moduleId，映射对应的模块。这样产生的问题是一旦工程中模块有增删或者顺序变化，moduleId 就会发生变化，进而可能影响所有 chunk 的 content hash 值。只是因为 moduleId 变化就导致缓存失效，这肯定不是我们想要的结果，设置这个可以让 hash 值基本不变。
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    verdor: {
                        name: "vendor", // 打包后的文件名，任意命名
                        test: /node_modules/, // 匹配路径
                        priority: 10, // 权重
                        chunks: "initial" // 只打包初始时依赖的第三方
                        // all 把动态和非动态模块同时进行优化打包；所有模块都扔到 vendors.bundle.js 里面。 
                        // initial 把非动态模块打包进 vendor，动态模块优化打包。
                        // async 把动态模块打包进 vendor，非动态模块保持原样（不优化）
                    },
                    elementUI: {
                        name: "elementUI", // 单独将 elementUI 拆包
                        priority: 20, // 权重要大，不然会被打包进其他的
                        test: /node_modules\/element-ui/
                    },
                    commons: {
                        name: "commons",
                        test: resolve("src/components"), // 可自定义拓展你的规则
                        minChunks: 2, // 最小共用次数
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }
    return webpackMerge(webpackBaseConfig, prodConfig);
}