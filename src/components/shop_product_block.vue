<template>
  <div class="width_center_1200">
    <!-- 商品列表 -->
    <div id="one" class="item"></div>
    <Part :tabstitle="tabstitle1" :tabsid="tabsid1" :oneid="1" onename="办公纸品" time="1000"></Part>

    <div id="two" class="item"></div>
    <Part :tabstitle="tabstitle2" :tabsid="tabsid2" :oneid="2" onename="办公文具" time="2000"></Part>

    <div id="three" class="item"></div>
    <Part :tabstitle="tabstitle3" :tabsid="tabsid3" :oneid="56" onename="日用百货" time="3000"></Part>

    <div id="four" class="item"></div>
    <Part :tabstitle="tabstitle4" :tabsid="tabsid4" :oneid="51" onename="办公设备" time="4000"></Part>

    <div id="five" class="item"></div>
    <Part :tabstitle="tabstitle5" :tabsid="tabsid5" :oneid="3" onename="办公耗材" :hotBannerShow="true" time="5000"></Part>

    <!-- 左侧固定栏 -->
    <transition name="fade">
      <ul v-show="leftFixed" class="cannotchoose">
        <a @click="changePos('one')" class="first">纸品</a>
        <a @click="changePos('two')">文具</a>
        <a @click="changePos('three')">日用</a>
        <a @click="changePos('four')">设备</a>
        <a @click="changePos('five')" class="last">耗材</a>
      </ul>
    </transition>
  </div>
</template>

<script>
import Part from './shop_product_part'
export default {
  name: "goodsAll",
  components: { Part },
  props: ["leftFixed"],
  data() {
    return {
      tabstitle1: ["复印纸", "打印纸", "本册纸品", "高端商业用纸"],
      tabsid1: ["4", "5", "7", "607"],
      tabstitle2: ["笔类", "文件管理用品", "日常文具", "财务用品"],
      tabsid2: ["8", "10", "11", "12"],
      tabstitle3: ["生活用纸", "洗化用品", "日用品", "喜庆用品"],
      tabsid3: ["77", "78", "82", "147"],
      tabstitle4: ["打印机", "多功能一体机", "传真机", "扫描仪"],
      tabsid4: ["52", "129", "130", "133"],
      tabstitle5: ["硒鼓 / 粉仓", "墨盒 / 墨水", "色带架 / 芯", "碳粉 / 计数器 / 鼓芯"],
      tabsid5: ["139", "140", "141", "142"],
    }
  },
  created() {
  },
  methods: {
    changePos(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth", //smooth平滑
        block: "start" //start end 初始位置，结束位置
      })
    }
  },
};
</script>


<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transform: scale(1);
  transition: 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.5);
}
.item {
  position: relative;
  top: -30px;
  display: block;
  height: 0;
  overflow: hidden;
}
ul {
  position: fixed;
  top: 230px;
  left: 20px;
  font-size: 14px;
  line-height: 40px;
  border-radius: 8px;
  background: #fff;
  z-index: 999;
  a {
    display: block;
    padding: 0 10px;
    border-bottom: 1px solid #e6e6e6;
    cursor: pointer;
    color: #666;
  }
  .first {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .last {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  a:last-child {
    border-bottom: none;
  }
  a:hover {
    background: $main_color;
    color: #fff;
  }
}
@media screen and (min-width: 1450px) {
  ul {
    font-size: 16px;
    line-height: 70px;
    left: 60px;
    a {
      padding: 0 20px;
    }
  }
}
</style>