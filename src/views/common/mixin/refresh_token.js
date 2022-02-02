import {
  mapState
} from "vuex";
export const mixin = {
  methods: {
    // 刷新token
    refreshToken() {
      let refreshApi = ""
      this.user_iscompany? refreshApi = "company/refresh" : refreshApi = "auth/refresh";
      this.$get(refreshApi, {
        token: this.token
      }).then(res => { //刷新用户信息接口，只有这个接口酬和用吧..
        console.log("刷新token返回信息", res)
        if (res.code == 200) {
          this.$setInfo('token', res.data.access_token); //用户token
          //将用户信息放在vuex。因为localStorage不能实时更新，只有刷新了才有数据。所以第一次需要放在vuex中实现实时更新用户信息。
          this.$store.commit("setToken", res.data.access_token)
          this.$store.commit("setUserInfo", res.data)
          this.$store.commit("setCartCount", res.data.cart_count)
          this.$store.commit("setBalance", res.data.balance)
        } else {
          // this.$message.error(res.message)
        }
      })
    },
  },
  computed: {
    ...mapState(["token", "user_iscompany"])
  }
}