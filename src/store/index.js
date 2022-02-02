import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 首先，讲下vuex，浏览器刷新就会消失。所以一般尽量走本地存储拿
// 然后是响应式的。所以会随时跟本地存储一样的
export default new Vuex.Store({
  state: {
    user_info: JSON.parse(localStorage.getItem("user_info")) || {}, //用户信息,因为是JSON字符串方式串存储，所以取得时候记得转为JSON对象。
    token: localStorage.getItem("token"),
    cart_count: localStorage.getItem("cart_count") || 0, //购物车数量
    user_iscompany: localStorage.getItem("user_iscompany") == "true", //true为企业用户

    balance: localStorage.getItem("balance") || 0, //余额
    integral: localStorage.getItem("integral"), //积分
    hongbao: localStorage.getItem("hongbao"), //红包
  },
  getters: {

  },
  mutations: {
    setUserInfo(state, val) {
      localStorage.setItem('user_info', JSON.stringify(val));
      state.user_info = val;
    },
    setToken(state, val) {
      // localStorage.setItem('token', val); //token要存入cookie用于浏览器关闭移除localStorage，所以这里不写
      state.token = val;
    },
    setCartCount(state, val) {
      localStorage.setItem('cart_count', val);
      state.cart_count = val;
    },
    setBalance(state, val) {
      localStorage.setItem('balance', val);
      state.balance = val;
    },
    setIsCompany(state, val) {
      localStorage.setItem('user_iscompany', val);
      state.user_iscompany = val;
    },
  },
  actions: {},
  modules: {}
})