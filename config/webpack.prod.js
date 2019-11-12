const webpackMerge = require("webpack-merge");
const webpackBaseConfig = require('./webpack.base');
const {
    resolve
} = require('./utils');

module.exports = () => {
    const proConfig = {
        mode: 'production',
    }
    return webpackMerge(webpackBaseConfig, proConfig);
}