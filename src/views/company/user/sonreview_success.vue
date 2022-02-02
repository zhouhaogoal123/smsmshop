<template>
  <div class="user_content_blcok">
    <div class="comment_success_content">
      <i class="iconfont success">&#xe64e;</i>
      <div class="font">
        <div class="line1">支付成功</div>
        <div class="line2">
          <span class="line2_left" @click="$router.push({name:'com_user_order'})">前往我的订单
            <i class="iconfont">&#xe6ac;</i>
          </span>
          <span class="line2_right" @click="$router.push({name:'company_sonreview'})">前往申报订单
            <i class=" iconfont ">&#xe6ac;</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/views/common/css/usersuccess.scss";
</style>
