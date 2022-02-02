<template>
  <div>
    <!-- 头部三大栏 -->
    <div class="shop_top" v-if="!iscompany">
      <shop-top  ></shop-top>
    </div>
    <CompanyHead v-if="iscompany"></CompanyHead>

    <div class="user_content_blcok width_center_1200">
      <div class="comment_success_content">
        <i class="iconfont success">&#xe64e;</i>
        <div class="font">
          <div class="line1">充值成功</div>
          <div class="line2">
            <span class="line2_left" @click="iscompany?$router.push({name:'com_user_balance'}):$router.push({name:'user_balance'})">返回余额中心
              <i class="iconfont">&#xe6ac;</i>
            </span>
            <span class="line2_right" @click="iscompany?$router.push({name:'company_home'}):$router.push({name:'home'})">前往商城首页
              <i class=" iconfont ">&#xe6ac;</i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <ShopFoot></ShopFoot>
  </div>
</template>


<script>
import ShopTop from "@/components/head.vue";
import ShopFoot from "@/components/shop_foot.vue";
import CompanyHead from "@/views/common/companyhead.vue";
export default {
  data() {
    return {
      iscompany: "",
    }
  },
  components: {
    ShopFoot, ShopTop, CompanyHead
  },
  created() {
    this.iscompany = localStorage.getItem("user_iscompany") == "true"
  },
}
</script>

<style lang="scss" scoped>
@import "@/views/common/css/usersuccess.scss";
.user_content_blcok {
  padding: 0;
  min-height: 330px;
  margin: 30px auto 50px;
}
</style>
