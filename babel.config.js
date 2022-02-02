// npm install --save-dev @babel/plugin-syntax-dynamic-import    路由懒加载插件
// npm install babel-plugin-transform-remove-console --save-dev  去除console插件
const prodPlugins = []
if (process.env.NODE_ENV === 'production') { //生产环境移除console
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [...prodPlugins, "@babel/plugin-syntax-dynamic-import"]
}