<template>
  <div class="user_content_blcok">
    <div class="comment_success_content">
      <i class="iconfont success">&#xe64e;</i>
      <div class="font">
        <div class="line1">提交成功</div>
        <div class="line2">
          <span class="line2_left" @click="iscompany?$router.push({name:'com_user_order'}):$router.push({name:'user_order'})">前往我的订单
            <i class="iconfont">&#xe6ac;</i>
          </span>
          <span class="line2_right" @click="iscompany?$router.push({name:'com_aftersalelist'}):$router.push({name:'aftersalelist'})">前往售后管理
            <i class=" iconfont ">&#xe6ac;</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      iscompany: true,
    }
  },
  created() {
    this.$route.path.startsWith("/company") ? this.iscompany = true : this.iscompany = false;
  },
}
</script>

<style lang="scss" scoped>
@import "@/views/common/css/usersuccess.scss";
</style>
