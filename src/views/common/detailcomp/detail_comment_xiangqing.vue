<template>
  <!-- css背景图会后加载，img标签图片会先加载。暂时用懒加载，用到再加载图片 -->
  <div class="goodsdetail">
    <ul ref="goodref">

    </ul>
  </div>
</template>

<script>
export default {
  props: ["good_content"],
  watch: {
    good_content(newval) {
      if (newval) {
        let gooddom = this.$refs.goodref;
        gooddom.innerHTML = newval;
        let imgarr = document.querySelectorAll(".goodsdetail img");
        imgarr.forEach(item => {
          item.style = "width:100%;margin:5px 0;";
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goodsdetail {
  color: #666;
  // margin-top: 20px;
}
</style>
