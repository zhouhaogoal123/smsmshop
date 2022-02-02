<template>
  <div class="favandshare">
    <div class="goods_info_sc" @click="goods_fav()">
      <i class="icon iconfont" :style="favorite ? 'color:#ca141e;' : 'color:#ffbf00;'">&#xe61f;</i>
      <span>{{ favorite ? "收藏商品" : "已收藏商品" }}</span>
    </div>
    <div class="share">
      <span class="el-icon-share"></span>
      <span>分享</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["favorite"],
  methods: {
    goods_fav() {
      this.$emit("fav")
    }
  },
}
</script>

<style lang="scss" scoped>
.favandshare {
  display: flex;
  justify-content: space-between;
  font: 14px/20px "微软雅黑";
  color: #666;
  margin: 20px 0;
  padding: 5px 10px;
  .favandshare {
    display: flex;
    justify-content: space-between;
    font: 14px/20px "微软雅黑";
    color: #666;
    margin: 20px 0;
    padding: 5px 10px;
    //收藏商品
    .goods_info_sc {
      width: 110px;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 2px;
      .iconfont {
        font-size: 14px;
        margin-right: 0;
      }
      span {
        display: inline-block;
        text-align-last: justify;
        margin-left: 6px;
        width: 70px;
      }
    }
    .goods_info_sc:hover,
    .share:hover {
      opacity: 0.8;
    }
    .share {
      cursor: pointer;
      /deep/.el-icon-share {
        color: $main_color;
        padding-right: 6px;
      }
    }
  }
  .share {
    cursor: pointer;
    /deep/.el-icon-share {
      color: $main_color;
      padding-right: 6px;
    }
  }
}
//收藏商品
.goods_info_sc {
  width: 110px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 2px;
  .iconfont {
    font-size: 14px;
    margin-right: 0;
  }
  span {
    display: inline-block;
    text-align-last: justify;
    margin-left: 6px;
    width: 70px;
  }
  .red_color {
    color: $main_color;
  }
  .yellow_color {
    color: #ffbf00;
  }
}
.goods_info_sc:hover,
.share:hover {
  opacity: 0.8;
}
</style>
