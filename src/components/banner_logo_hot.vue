<template>
  <!-- logo图轮播 -->
  <div class="marquee width_center_1200" ref="marquee">
    <div class="scroll" ref="scroll">
      <div class="demo" ref="demo">
        <img v-for="(item, index) in brand_logolist" :key="index" class="logoline" :src="item.icon" :title="item.title" fit="cover" @click="toserachbybrand(item.id,item.title)" />
      </div>
      <div class="copy" ref="copy"></div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/views/common/mixin/brand_search.js';
export default {
  data() {
    return {
      brand_logolist: [],
      logotimer: null
    };
  },
  props: ["first_brand"],
  mixins: [mixin],
  watch: {
    first_brand: {
      handler(newval) {
        console.log("轮播品牌", newval)
        this.brand_logolist = newval;
        this.$nextTick(() => {
          this.move()
        })
      },
    },
  },
  mounted() {

  },
  methods: {
    move() {
      // 可视宽度
      let maxWidth = this.$refs.marquee.clientWidth
      // 获取文字总宽度
      let width = this.$refs.demo.scrollWidth
      // 如果文本内容的宽度小于页面宽度，则表示文字小于等于一行，则不需要滚动
      if (width <= maxWidth) return
      let scroll = this.$refs.scroll
      let demo = this.$refs.demo
      let copy = this.$refs.copy
      copy.innerHTML = demo.innerHTML // 复制文字
      let distance = 0 // 位移距离

      // 设置位移
      this.logotimer = setInterval(() => {
        distance -= 1
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= width) {
          distance = 0 // 距离必须与marquee的margin宽度相同
        }
        scroll.style.transform = 'translateX(' + distance + 'px)'
      }, 10)

      scroll.onmouseenter = () => {
        clearInterval(this.logotimer);
      }
      scroll.onmouseleave = () => {
        this.logotimer = setInterval(() => {
          distance -= 1
          // 如果位移超过文字宽度，则回到起点
          if (-distance >= width) {
            distance = 0 // 距离必须与marquee的margin宽度相同
          }
          scroll.style.transform = 'translateX(' + distance + 'px)'
        }, 10)
      }
    }
  },
  beforeDestroy() {// 清除计时器
    clearInterval(this.logotimer)
  },
};
</script>

<style lang="scss" scoped>
.marquee {
  overflow: hidden;
  height: 70px;
  background: #fff;
  .scroll {
    display: flex;
    height: 100%;
    div {
      white-space: nowrap; // 不换行
    }
    .demo,
    .copy {
      // 设置前后间隔
      margin-right: 0;
      height: 100%;
      .logoline {
        width: 100px;
        height: 40px;
        padding: 15px 10px;
      }
      .logoline:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
  }
}
</style>