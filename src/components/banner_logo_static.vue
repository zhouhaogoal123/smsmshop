<template>
  <!-- 商品大类对应品牌 -->
  <div class="logo_list width_center_1200 cannotchoose">
    <div class="button button_left" @click="leftclick" ref="left_btn">
      <span class="iconfont" style="font-size: 20px">&#xe601;</span>
    </div>
    <div class="imgpart" ref="imgpart" style="left: 30px">
      <div v-for="(item, index) in brand_logolist" :key="index" style="height: 70px" class="lazypic">
        <el-image class="logoline" :src="item.icon" fit="cover" :title="item.title" @click="toserachbybrand(item.id,item.title)" lazy></el-image>
      </div>
      <div style="height: 70px">
        <div class="logoline"></div>
      </div>
    </div>
    <div class="button button_right" @click="rightclick" ref="right_btn">
      <span class="iconfont" style="font-size: 20px">&#xe602;</span>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/views/common/mixin/brand_search.js';
export default {
  data() {
    return {
      imgpart: "",
      left_btn: "",
      right_btn: "",
      brand_logolist: [],
    };
  },
  mixins: [mixin],
  props: ["first_brand"],
  watch: {
    first_brand(newval) {
      this.brand_logolist = newval;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.imgpart = this.$refs.imgpart; //图片区
      this.left_btn = this.$refs.left_btn; //左边按钮
      this.right_btn = this.$refs.right_btn; //左边按钮
    });
  },
  methods: {
    leftclick() {
      let canmove = parseInt(this.imgpart.style.left) - 30; //可移动距离=总距离-可视距离1140px
      if (canmove < 0) {
        this.imgpart.style.left =
          parseInt(this.imgpart.style.left) + 114 + "px";
      }
    },
    rightclick() {
      let imgpart_allwidth = this.imgpart.scrollWidth; //图片总宽度
      let canmove =
        imgpart_allwidth + parseInt(this.imgpart.style.left) - 30 - 1140; //可移动距离=总距离-可视距离1140px
      if (canmove > 0) {
        this.imgpart.style.left =
          parseInt(this.imgpart.style.left) - 114 + "px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo_list {
  margin-bottom: 70px;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  height: 70px;
  background: #e6e6e6;
  padding: 0 30px; //还有1140px。 分为10份，则一份114px;
  box-sizing: border-box;
  position: relative;
  .imgpart {
    position: absolute;
    display: flex;
    transition: 0.5s linear;
    -moz-transition: 0.5s linear; /* Firefox 4 */
    -webkit-transition: 0.5s linear; /* Safari 和 Chrome */
    -o-transition: 0.5s linear; /* Opera */
    .logoline {
      width: 100px;
      height: 40px;
      margin: 15px 7px;
      cursor: pointer;
    }
  }

  .button {
    width: 25px;
    height: 40px;
    margin: 15px 0;
    background: #999;
    position: absolute;
    color: #fff;
    display: flex;
    align-items: center;
    text-align: center;
    z-index: 2;

    .iconfont {
      width: 30px;
    }
  }
  .button:hover {
    background-color: #666;
  }
  .button_left {
    cursor: pointer;
    left: 0;
  }
  .button_right {
    right: 0;
    cursor: pointer;
  }
}
</style>