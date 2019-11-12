module.exports = {
    //devserver
    PORT: 3000,
    HOST: 'localhost',
    AUTO_OPEN_BROWER: true,
    HOT: true,
    PROCESS: true,
    INLINE:true,
    HISTORY_API_FALLBACK:true,
    CONTENT_BASE:'./static',

    //watch
    WATCH: true,

    //watchoptions
    IGNORED:'/node_modules/',
    AGGREGATE_TIMEOUT:300
}