// const CompressionPlugin = require('compression-webpack-plugin');//引入gzip压缩插件
module.exports = {
    productionSourceMap: false,//打包时不要map文件

    devServer: {
        open: true, //浏览器自动打开页面
        host: "0.0.0.0", //如果是真机测试，就使用这个IP
        port: 8911,
        https: false,
        hotOnly: false, //热更新（webpack已实现了，这里false即可）
        proxy: {
            //配置跨域
            '/manage': {
                target: "http://www.cxzdjs.cn/manage/",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/manage':''
                }
            }
        }
    }
}
