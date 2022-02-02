<template>
  <!-- 头部公告轮播 -->
  <div class="announcementList" v-if="datalist.length>0">
    <!-- 文字轮播栏 -->
    <div class="marquee" ref="marquee">
      <div class="scroll" ref="scroll">
        <p class="demo" ref="demo">
          <span v-for="item in datalist" :key="item.id" class="fontline" @click="todetail(item.id)">
            {{ item.title }}：{{item.content}}
          </span>
        </p>
        <p class="copy" ref="copy"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: [],
      fonttimer: null,
      speed: 20, //字体滚动速度
    };
  },
  created() {
    this.gonggao();
  },
  methods: {
    // 前往公告详情页面
    todetail(id) {
      console.log(id)
      let newUrl = this.$router.resolve({ path: "/announcement", query: { id: id } })
      window.open(newUrl.href, "_blank")
    },
    // 公告列表
    gonggao() {
      let announcement = sessionStorage.getItem("announcement")
      if (announcement && JSON.parse(announcement).length > 0) {
        this.datalist = JSON.parse(announcement);
        this.$nextTick(() => this.move())
        return;
      }
      let token = localStorage.getItem("token")
      this.$get("notice/list", { token }).then(res => {
        // console.log("公告列表", res)
        sessionStorage.setItem("announcement", JSON.stringify(res.data))
        this.datalist = res.data;
        this.$nextTick(() => this.move())
      })
    },
    move() {
      // 可视宽度
      // console.log(this.$refs.marquee)
      let maxWidth = ""
      if (this.$refs.marquee) {
        maxWidth = this.$refs.marquee.clientWidth
      }
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
      this.fonttimer = setInterval(() => {
        distance -= 1
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= width) {
          distance = 30 // 距离必须与marquee的margin宽度相同
        }
        scroll.style.transform = 'translateX(' + distance + 'px)'
      }, this.speed)

      scroll.onmouseenter = () => {
        clearInterval(this.fonttimer);
      }
      scroll.onmouseleave = () => {
        this.fonttimer = setInterval(() => {
          distance -= 1
          // 如果位移超过文字宽度，则回到起点
          if (-distance >= width) {
            distance = 30 // 距离必须与marquee的margin宽度相同
          }
          scroll.style.transform = 'translateX(' + distance + 'px)'
        }, this.speed)
      }
    },
  },
  beforeDestroy() {// 清除计时器
    clearInterval(this.fonttimer)
  },
};
</script>

<style lang="scss" scoped>
.announcementList {
  font-size: 12px;
  display: flex;
  height: 30px;
  justify-content: space-between;
  .fontline {
    padding: 0 30px;
    color: olive;
  }
  .fontline:hover {
    color: red;
    font {
      color: red;
    }
    cursor: pointer;
  }
  .icongonggao {
    font-size: 12px;
    padding-left: 6px;
  }

  .marquee {
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    width: 190px;
    text-align: center;
    .scroll {
      display: flex;
      p {
        white-space: nowrap; // 不换行
      }
      /* 设置前后间隔 */
      .demo {
        margin-right: 30px;
      }
    }
  }
}
</style>