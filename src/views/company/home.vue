<template>
  <!-- 首页 -->
  <div class="sanmu">
    <!-- 头部三大栏 -->
    <CompanyHead></CompanyHead>

    <!-- 首页固定头部 -->
    <HeadFixed :scrolltoend="scrolltoend" :iscompany="true"></HeadFixed>

    <!-- 轮播图模块 -->
    <div class="banner">
      <banner></banner>
    </div>

    <!-- 发现好货 -->
    <find-goods></find-goods>

    <!-- 内容主体 -->
    <div class="shop_content">
      <!-- 各类商品列表 -->
      <shop-product-block :leftFixed="leftFixed"></shop-product-block>
    </div>

    <!-- 内容底部 -->
    <shop-foot></shop-foot>

    <!-- 固定定位栏，回到顶部等-->
    <UpToHead :rightFixed="rightFixed"></UpToHead>
  </div>
</template>

<script>
import CompanyHead from "@/views/common/companyhead.vue";
import HeadFixed from '@/components/head_fixed.vue';
import UpToHead from "@/components/uptohead.vue";
import banner from "@/components/banner.vue";
import ShopProductBlock from "@/components/shop_product_block.vue";
import ShopFoot from "@/components/shop_foot.vue";
import FindGoods from '@/components/find_goods.vue';
import { mapState } from 'vuex';
export default {
  name: "home",
  components: {
    CompanyHead,
    HeadFixed,
    UpToHead,
    banner,
    ShopProductBlock,
    ShopFoot,
    FindGoods
  },
  data() {
    return {
      leftbarshow: true, // 左边栏展示状态。true显示
      scrolltoend: false, //顶部固定搜索栏
      rightFixed: false, //右下角固定定位
      leftFixed: false, //左下角分类锚点展示
    }
  },
  computed: {
    ...mapState(["user_iscompany", "token"])
  },
  mounted() {
    if (!this.user_iscompany && this.token) {
      this.$router.push({ name: "home" })
    }
    // 监听滚动条 ，滚动超过20隐藏头部中部logo+搜索栏
    //scroll 页面滚动事件。所以轮播部分也要触发
    window.addEventListener("scroll", this.fn1); //DOMMouseScroll 火狐 mousewheel 谷歌 鼠标滚轮滚动事件。但是不灵敏，而且拉动会失效
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.fn1); //以防万一嘛
  },
  methods: {
    fn1() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop);
      // 控制右下角固定定位展示与隐藏
      scrollTop > 450 ? this.rightFixed = true : this.rightFixed = false;
      // 控制顶部固定定位的展示与隐藏
      scrollTop > 600 ? this.scrolltoend = true : this.scrolltoend = false;
      // 控制左下角分类锚点的展示与隐藏
      scrollTop > 900 ? this.leftFixed = true : this.leftFixed = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/views/common/css/bannerstyle.scss";
</style>