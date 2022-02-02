<template>
  <!-- 头部三大栏 -->
  <div class="shop_top">
    <shop-top></shop-top>
    <shop-center :iscompany="true"></shop-center>
    <shop-nav :iscompany="true"></shop-nav>
  </div>
</template>

<script>
import ShopTop from "@/components/head_top_company.vue";
import ShopCenter from "@/components/head_center.vue";
import ShopNav from "@/components/head_nav.vue";
export default {
  components: {
    ShopTop, ShopCenter, ShopNav
  },
}
</script>