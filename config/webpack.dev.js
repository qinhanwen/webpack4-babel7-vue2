const webpackMerge = require("webpack-merge");
const webpackBaseConfig = require('./webpack.base');
const {
    resolve
} = require('./utils');
const config = require('./config');

module.exports = () => {
    const devConfig = {
        mode: 'development',
        devtool: 'eval-source-map', //生成用于开发环境的最佳品质的 source map
        devServer: { // 开发服务器配置
            port: config.PORT, // 端口号
            host: config.HOST, //域名
            progress: config.PROCESS, // 进度条
            // contentBase: config.CONTENT_BASE, // 服务默认指向文件夹
            inline: config.INLINE, // 设置为true，当源文件改变的时候会自动刷新
            historyApiFallback: config.HISTORY_API_FALLBACK, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
            hot: config.AUTO_OPEN_BROWER, // 允许热加载
            open: config.AUTO_OPEN_BROWER // 自动打开浏览器
        },
        watch: true,
        watchOptions: {
            ignored: config.IGNORED, //正则匹配不监听的文件夹，默认为空
            aggregateTimeout: config.AGGREGATE_TIMEOUT, //监听到文件的最后编辑时间变化等待300ms后去执行，默认300ms
            // poll: 1000, //判断文件是否发生变化是通过不停的轮询系统指定的文件有没有变化实现的，默认1000ms轮询一次
        }
    }
    return webpackMerge(webpackBaseConfig, devConfig);
}