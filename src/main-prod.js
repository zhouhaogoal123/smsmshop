import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ELEMENT from 'element-ui' //  elemnt-ui js代码
// 注释，css代码已经通过CDN加载了
// import 'element-ui/lib/theme-chalk/index.css' //element-ui css代码
Vue.use(ELEMENT)

//解决IE浏览器ES6的问题
import 'babel-polyfill';

import './assets/myfonts/iconfont.css' // 阿里图标
import '../public/style.scss' // 公共CSS
import {
  post,
  get,
  put,
  deletes,
  postformdata
} from './axios/http.js' // 把四大请求封装一下
import {
  api
} from './plugins/api.js' // 请求地址
import {
  isEmpty,
  filterTime,
  setInfo,
  getCookie
} from './plugins/utils.js' //封装的方法
import {
  jiaoyan
} from './plugins/jiaoyan.js' //校验规则

// 全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$put = put;
Vue.prototype.$delete = deletes;
Vue.prototype.$postformdata = postformdata;
Vue.prototype.$api = api;
Vue.prototype.$isEmpty = isEmpty;
Vue.prototype.$filterTime = filterTime;
Vue.prototype.$jiaoyan_phone = jiaoyan.phone;
Vue.prototype.$jiaoyan_password = jiaoyan.password;
Vue.prototype.$setInfo = setInfo; //设置localStorage和cookie
Vue.prototype.$getCookie = getCookie; //获取cookie

// 跨组件传参
Vue.prototype.$bus = new Vue(); //这个$bus随意命名，反正意思是添加到vue原型中。因为$emit跟$on的this指向需要是同一个vue实例

Vue.config.productionTip = false //去除碍眼信息

new Vue({
  router,
  store,
  render: h => h(App),
  // 预编译，配合vue.config.js中的插件一起使用
  // mounted() {
  //   document.dispatchEvent(new Event('render-event'))
  // }
}).$mount('#app')