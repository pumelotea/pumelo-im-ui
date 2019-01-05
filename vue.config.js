const path = require('path')
function resolve (dir) {
    return path.join(__dirname,dir)
}

module.exports = {
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
            }
        }
    },
    lintOnSave: false,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
}
