// // const path = require('path');
const isProduction = process.env.NODE_ENV === 'production'; //判断打包环境是否为生产环境
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //分析模块体积
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //导入gizp插件
const productionGzipExtensions = ["js", "css", "html", "svg", "woff", "ttf", "json"]; //确定生产环境压缩的文件类型
const PrerenderSPAPlugin = require('prerender-spa-plugin'); //预渲染插件
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path'); //node自带path，不用安装
//测试预渲染。
// 1、首先查看dist中的html文件的app节点里面是否有很多数据。有的话就初步配置成了。
// 2、查看安装模拟服务器插件npm i http-server -g；进去dist目录；
// 3、启动本地服务器http-server -p 1234 --proxy http://127.0.0.1:8080 打开端口号1234不行就是8080（自动启动本地dist目录下的index.html）

// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'element-ui': 'ELEMENT', //必须写成ELEMENT，因为源码里面规定这么写
  axios: 'axios',
  AMap: 'AMap'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: ["https://unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css"], //用elementui的官方cdn。指定版本，不然elementui更新会有影响
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vue-router/3.0.7/vue-router.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.0/vuex.min.js',
      'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
      'https://unpkg.com/element-ui@2.15.3/lib/index.js' //用elementui的官方cdn。指定版本，不然elementui更新会有影响
    ]
  }
}

module.exports = {
  publicPath: "/", //地址前缀.默认/因为很多地方用到所以不建议修改
  lintOnSave: false, //关闭eslint
  outputDir: "dist", //输出文件夹
  assetsDir: "content", //js、css、img、字体图标等静态文件放置位置(相对于outputDir的位置)
  indexPath: "index.html", //指定index.html输出路径
  // 加载全局sass变量
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/views/common/css/globalcolor.scss";`
      },
      scss: {
        prependData: `@import "~@/views/common/css/globalcolor.scss";`
      }
    }
  },
  //代理实现跨域
  // devServer: {
  //   host: 'localhost',
  //   port: 8080, // host、port：用于处理http://localhost:8080/sockjs-node/info?t=xxxxxxxxxxxxxxxxxx请求，报错问题
  //   proxy: {
  //     "/api": {
  //       // target: "http://test.hi-sm.com/api/",
  //       target: "http://ceshi.hi-sm.com",
  //       changeOrigin: true, // 允许跨域
  //       ws: true, //是否代理websockets
  //       secure: false, // false为http访问，true为https访问
  //       pathRewrite: {
  //         "^/api": '' //需要将/api之前的替换为target
  //       }
  //     }
  //   }
  // },
  productionSourceMap: isProduction ? false : true, //true为有map文件，生产环境设置为false。开发环境为true，用于定位错误。
  // configureWebpack会合并到webpack中（函数式普通配置）、与chainWebpack类似只是写法不同（chainWebpack链式配置）
  configureWebpack: config => {
    if (isProduction) {
      config.plugins = [...config.plugins,
        //4、生产环境开启gzip压缩
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          // algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8, //压缩率大于0.8的才压缩
          deleteOriginalAssets: false //是否删除原文件
        }),
        // 分析模块体积插件
        // new BundleAnalyzerPlugin(),
        // 预渲染插件。npm run build后卡住说明配置的不对
        // new PrerenderSPAPlugin({
        //   // 生成文件的路径，也可以与webpakc打包的一致。
        //   // 下面这句话非常重要！！！
        //   // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        //   staticDir: path.join(__dirname, 'dist'),
        //   // 需要预渲染的路由
        //   // routes: ['/', '/company/home'],
        //   routes: [ '/company/home'],
        //   server: {
        //     port: 8001
        //   },
        //   // 这个很重要，如果没有配置这段，也不会进行预编译
        //   renderer: new Renderer({
        //     inject: {
        //       foo: 'bar'
        //     },
        //     // 是否打开浏览器，false 是打开。用于检查渲染结果
        //     headless: true,
        //     // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
        //     renderAfterDocumentEvent: 'render-event',
        //   })
        // }),
      ]

      //2、关闭文件过大提示，利于打包加快速度（performance：表现、展示）
      config.performance = {
        hints: "warning",
        maxEntrypointSize: 50000000, //入口起点的最大体积
        maxAssetSize: 30000000, //生成文件的最大体积
        assetFilter: function (assetFilename) { //只给出 js 文件的性能提示
          return assetFilename.endsWith(".js");
        }
      }
      //3、 公共代码抽离和代码分割，避免单个js文件过大（optimization：优化）
      config.optimization = {
        splitChunks: { //分割
          cacheGroups: { //缓存
            //chunk-vendors.js太大，因为包含了所有npm安装的依赖。将依赖拆分为单个js
            vendor: {
              name(module) { //默认chunk-vendors，这里重新命名
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              },
              chunks: "all",
              test: /[\\/]node_modules[\\/]/,
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 30000,
              priority: 100
            },
            // 样式
            styles: {
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all",
              enforce: true
            },
            // vue文件中的js代码
            runtimeChunk: {
              name: "manifest"
            }
          }
        }
      }
      // 5、CDN优化（externals：生产环境打包排除项）
      config.externals = externals;
    }
    // console.log("所有config配置", config)
    // console.log("所有插件", config.plugins)
    console.log("生产/开发环境打包排除项", config.externals)
  },

  chainWebpack: config => {
    // 预加载关闭
    // config.plugins.delete('prefetch')

    // 这里的args[0].xxx ，可以在插件 HtmlWebpackPlugin 中的options中找到对应的xxx，
    // 然后在打包后的html文件中可以直接使用HtmlWebpackPlugin.options.xxx获取这里设置的参数
    // 从上面的值看。生产环境cdn都为空。开发环境cdn有值，即仅仅生产环境加上cdn。可用于分环境使用CDN方式导入依赖（可以看生成的html文件发现打包后多了点js跟css）
    //html为HtmlWebpackPlugin插件的简写
    config.plugin('html').tap(args => {
      if (isProduction) {
        args[0].cdn = cdn.build;
        args[0].title = "三目商城"
      } else {
        args[0].cdn = cdn.dev;
        args[0].title = "三目商城开发版"
      }
      return args
    })

    // 生产模式main.js主入口配置
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })

    // 开发模式main.js主入口配置
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}