<template>
  <div class="width_center_1200">
    <img src="/pc/404.png" alt="图片加载失败" width="700px" height="500px">

    <div class="bigfont">抱歉，您访问的页面出错了</div>
    <div class="smallfont">您可能输错了网址，或者该页面已删除或不存在</div>
    <router-link to="/">返回首页</router-link>
  </div>
</template>
<style lang="scss" scoped>
.width_center_1200 {
  text-align: center;
  .bigfont {
    font-size: 20px;
  }
  .smallfont {
    color: #999;
    font-size: 13px;
    line-height: 50px;
  }
  a {
    text-decoration: underline;
    font-size: 18px;
    color: #0431b4;
  }
}
</style>
