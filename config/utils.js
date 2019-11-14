const path = require('path');

// 减少路径书写
function resolve(dir) {
    return path.join(__dirname,'..', dir)
}
function isDevMode(){
    return process.env.NODE_ENV !== 'production';
}
module.exports = {
    resolve,
    isDevMode
}