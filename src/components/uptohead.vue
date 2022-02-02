<template>
  <div>
    <ul class="fixed_part" v-show="rightFixed">
      <li class="part1">
        <div class="item item1">13584257990</div>
        <div class="iconfont">&#xe6a9;</div>
        <div class="textshow">电话</div>
      </li>
      <li class="part2">
        <a class="textshow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2375486729&site=qq&menu=yes">
          <div>在线客服</div>
        </a>
        <a class="part2_icon" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2375486729&site=qq&menu=yes">
          <div class="iconfont">&#xe6a0;</div>
        </a>
      </li>
      <li class="part3">
        <div class="item item3">
          <div style="width:100px;height:100px;">
            <img src="/pc/adv001.jpg" width="100%" height="100%">
          </div>
        </div>
        <div class="iconfont">&#xe73b;</div>
        <div class="textshow">微信</div>
      </li>
    </ul>
    <!-- vue 回到顶部 -->
    <li class="totop">
      <el-backtop :visibility-height="800" class="totopcomp">
        <div class="box">
          <div class="iconfont">&#xe735;</div>
          <div class="textshow">回到顶部</div>
        </div>
      </el-backtop>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iscompany: false,
    }
  },
  created() {
    this.iscompany = this.$route.path.startsWith("/company")
  },
  props: ["rightFixed"],
}
</script>

<style lang="scss" scoped>
// 如果css需要用在打印设备里，那么就用@media ，否则，就用@media screen
// only(限定某种设备)
// not (排除某种设备)
// and 被称为关键字
$smallsize: 50px;
$bigsize: 60px;
.textshow {
  color: #fff;
  background: $main_color;
  font-size: 12px;
  line-height: 20px;
  display: none;
  letter-spacing: 3px;
  box-sizing: border-box;
}
.fixed_part {
  position: fixed;
  z-index: 999;
  bottom: 200px;
  right: 0;
  li {
    position: relative;
    display: flex;
    margin-bottom: 2px;
    .item {
      position: absolute;
      z-index: 998;
      background: $main_color;
      color: #fff;
      padding: 10px;
      display: none;
    }
    a {
      color: #fff;
      font-size: 12px;
      line-height: 20px;
      height: $smallsize;
    }
    .item1 {
      padding-right: 0;
    }
    .iconfont {
      position: relative;
      z-index: 999;
      text-align: center;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      cursor: pointer;
    }
  }
  li:hover {
    color: #fff;
    background: $main_color;
  }
  .part1:hover,
  .part2:hover,
  .part3:hover {
    .item {
      display: block;
    }
    .textshow {
      display: block;
    }
    .iconfont {
      display: none;
    }
  }
}
.totop {
  position: fixed;
  right: 0;
  bottom: 80px;
  z-index: 999;
  .totopcomp {
    box-shadow: unset;
    right: 0px !important;
    bottom: 80px !important;
    .box:hover {
      .iconfont {
        display: none;
      }
      .textshow {
        display: block;
      }
    }
  }
}

// 宽度400px-1400px之间的css样式
@media screen and (min-width: 360px) and (max-width: 1500px) {
  .textshow {
    width: $smallsize;
    height: $smallsize;
    font-size: 12px;
    line-height: 15px;
    padding: 10px;
  }
  .part1,
  .part3 {
    .textshow {
      line-height: calc(#{$smallsize} - 20px);
    }
  }
  .fixed_part {
    .item {
      bottom: 0;
      right: $smallsize;
      min-height: calc(#{$smallsize} - 20px);
      line-height: calc(#{$smallsize} - 20px);
    }
    .iconfont {
      width: $smallsize;
      height: $smallsize;
      line-height: $smallsize;
      font-size: 30px;
    }
    li a {
      height: $smallsize;
      line-height: 15px;
    }
  }
  .totop {
    height: $smallsize;
  }
}

// 宽度1400px以上的css样式
@media screen and (min-width: 1500px) {
  .textshow {
    width: $bigsize;
    height: $bigsize;
    font-size: 14px;
    padding: 10px 13px;
  }
  .part1 .textshow,
  .part3 .textshow {
    line-height: calc(#{$bigsize} - 20px);
  }
  .fixed_part {
    .item {
      bottom: 0;
      right: $bigsize;
      min-height: calc(#{$bigsize} - 20px);
      line-height: calc(#{$bigsize} - 20px);
    }
    .iconfont {
      width: $bigsize;
      height: $bigsize;
      line-height: $bigsize;
      font-size: 30px;
    }
    li a {
      height: $bigsize;
      font-size: 14px;
    }
  }
  .totop {
    height: $bigsize;
  }
}
</style>