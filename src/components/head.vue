<template>
  <div class="shop_head" ref="shop_head">
    <!-- headtop line -->
    <HeadTop></HeadTop>

    <!-- logo and search -->
    <HeadCenter></HeadCenter>

    <!-- nav -->
    <HeadNav></HeadNav>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeadTop from "@/components/head_top.vue";
import HeadCenter from '@/components/head_center.vue';
import HeadNav from '@/components/head_nav.vue';
export default {
  name: "headthree",
  components: { HeadTop, HeadCenter, HeadNav },
};
</script>
<style lang="scss" scoped>
</style>