<template>
  <!-- 积分商城 -->
  <div class="sanmu">
    <!-- 头部三大栏 -->
    <div class="shop_top">
      <CompanyHead v-if="iscompany"></CompanyHead>
      <ShopTop   v-else></ShopTop>
    </div>

    <div class="jifeng">
      <div class="pic_jifen">
        <div class="pic_font integral">积分</div>
        <div class="pic_font">商城</div>
      </div>

      <div v-for="(item,index) in imgarr" :key="index">
        <header class="pic_header">
          <el-image :src="item[0]" fit="cover"></el-image>
        </header>

        <ul>
          <li v-for="(v,k) in item[1]" :key="k" @click="tointegralorder">
            <div class="pic_content">
              <el-image :src="v" fit="cover"></el-image>
            </div>
            <div class="font_content">
              <div class="lettersort">
                <span>{{letter[k]}}</span>
              </div>
              <div class="title">外星人电脑</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- vue 回到顶部 -->
    <el-backtop>
      <div class="iconfont">&#xe735;</div>
    </el-backtop>

    <!-- 底部模块 -->
    <ShopFoot></ShopFoot>
  </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import CompanyHead from "@/views/common/companyhead.vue";
import ShopFoot from '@/components/shop_foot.vue';
export default {
  name: "smwebsite",
  components: { ShopTop, CompanyHead, ShopFoot },
  data() {
    return {
      imgarr: [
        ["/pc/jifen/1.jpg", ["/pc/jifen/jifen_02.jpg", "/pc/jifen/jifen_03.jpg", "/pc/jifen/jifen_04.jpg", "/pc/jifen/jifen_10.jpg"]],
        ["/pc/jifen/2.jpg", ["/pc/jifen/jifen_05.jpg", "/pc/jifen/jifen_06.jpg", "/pc/jifen/jifen_07.jpg"]],
        ["/pc/jifen/3.jpg", ["/pc/jifen/jifen_08.jpg", "/pc/jifen/jifen_09.jpg"]],
        ["/pc/jifen/4.jpg", ["/pc/jifen/jifen_11.jpg"]]
      ],
      letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
      iscompany: "",
    }
  },
  created() {
    this.iscompany = this.$route.path.startsWith("/company");
  },
  methods: {
    // 跳转到积分详细页
    tointegralorder() {
      this.$router.push({ path: '/integral_order_detail/' + 'SMG2007001' })
    }
  },

}
</script>

<style lang="scss" scoped>
.jifeng {
  .pic_jifen {
    width: 100%;
    height: 400px;
    border-top: 1px solid transparent;
    background: url("/pc/integral_bg.jpg") 0/100% no-repeat;

    .pic_font {
      font: 50px/50px "微软雅黑";
      font-weight: 700;
      color: #666;
      width: 200px;
      margin: auto;

      text-align: justify;
      text-align-last: justify;
      -moz-text-align-last: justify;
      -webkit-text-align-last: justify;
      text-justify: inter-ideograph; /*ie中必须有这个*/
    }
    .integral {
      margin-top: 80px;
      margin-bottom: 120px;
    }
  }
  .pic_header {
    margin: 80px auto;
    width: 130px;
    height: 100px;
  }
}

ul {
  width: 1000px;
  display: flex;
  justify-content: space-around;
  margin: auto;
  flex-wrap: wrap;
  li {
    margin-bottom: 30px;
    text-align: center;
    color: #888;
    cursor: pointer;

    .pic_content {
      width: 280px;
      height: 360px;
      overflow: hidden;
    }
    .pic_content .el-image:hover {
      transition: 0.5s linear;
      transform: scale(1.1);
    }
    .font_content {
      border: 1px solid #999;
      border-top: none;
    }
    .lettersort span {
      display: inline-block;
      width: 16px;
      font: 14px/14px "微软雅黑";
      font-weight: 700;
      padding: 5px 0;
      border-bottom: 2px solid $main_color;
    }
    .title {
      width: 260px;
      margin: 5px auto;
      height: 20px;
      overflow: hidden;
      font: 12px/20px "微软雅黑";
      font-weight: 700;
    }
  }
  li:hover {
    transform: translateY(-3px);
    transition: 0.2s;
    box-shadow: 1px 1px 4px 0 #999;
  }
}
</style>

