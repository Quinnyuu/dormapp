module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
                'network': '@/network',
                'common': '@/common',
                'utils': '@/utils'
            }
        }
    },
    publicPath: "/",
    assetsDir: "static",
    outputDir: 'dist',
}