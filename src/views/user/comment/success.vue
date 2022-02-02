<template>
  <div class="user_content_blcok">
    <div class="comment_success_content">
      <i class="iconfont success">&#xe64e;</i>
      <div class="font">
        <div class="line1">评论成功</div>
        <div class="line2">
          <span class="line2_left" @click="$router.push({name:'user_order'})">前往我的订单
            <i class="iconfont">&#xe6ac;</i>
          </span>
          <span class="line2_right" @click="$router.push({name:'home_comment_index'})">前往评论列表
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
