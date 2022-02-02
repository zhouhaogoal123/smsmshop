import {mapState} from "vuex";

// 跳转到我的订单
export const tomyorderMixin = {
  methods: {
    tomyorder(num) {
      if (this.user_iscompany) {
        this.$router.push({ name: "com_user_order", query: { status: num } })
      } else {
        this.$router.push({ name: "user_order", query: { status: num } })
      }
    },
  },
  computed: {
    ...mapState(["user_iscompany"])
  }
}