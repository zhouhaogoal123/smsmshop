<template>
  <div class="lookandlook" v-if="hot_wrapper_list.length>0">
    <header>
      <div class="fontpart">选了再选</div>
      <span class="line"></span>
    </header>
    <section>
      <!-- autoplay 取消自动播放 , arrow 箭头显示时机always为总是显示 ,
       indicator-position小圆点位置none为没有，竖直方向没有箭头，但是官方有提供方法-->
      <el-carousel :autoplay="false" direction="vertical" ref="carousel_img" indicator-position="none" :loop="false">
        <el-carousel-item v-for="(item, index) in hot_wrapper_list" :key="index">
          <ul>
            <li v-for="(v, k) in item" :key="k">
              <div class="pic_part" @click="todetail_page(v.good_sn)">
                <!-- 不要懒加载，会导致白屏问题。因为用到的时候才开始加载 -->
                <el-image :src="v.img_url" fit="cover"></el-image>
                <div class="title">{{v.title}}</div>
              </div>
              <div class="price">￥{{iscompany&&v.business_price? v.business_price:v.price}} </div>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </section>
    <div class="bottombtn">
      <el-button @click="prev" type="info" class="el-icon-arrow-up" size="mini"></el-button>
      <el-button @click="next" type="info" class="el-icon-arrow-down" size="mini"></el-button>
    </div>
  </div>
</template>

<script>
import { throttle } from "throttle-debounce"; //节流。一断时间只触发一次。
export default {
  data() {
    return {
      hot_wrapper_list: [],
    }
  },
  props: {
    goodslist: {
      type: Array,
      default: () => {
        return [];
      }
    },
    iscompany: { //是否是企业用户
      type: Boolean,
      default: false
    }
  },

  watch: {
    goodslist(newval) {
      let len = newval.length;
      let n = 3;//假设每行显示4个
      let lineNum = len % 3 === 0 ? len / 3 : Math.ceil(len / 3); //整除后向上取整
      let res = [];
      for (let i = 0; i < lineNum; i++) {
        let temp = newval.slice(i * n, i * n + n); //0开始3位 3开始6位 6开始9位 
        res.push(JSON.parse(JSON.stringify(temp)));
      }
      this.hot_wrapper_list = res;
      // console.log(newval);
      // console.log(res);
    },
  },
  methods: {
    prev: throttle(500, function () {
      this.$refs.carousel_img.prev();
    }),

    next: throttle(500, function () {
      this.$refs.carousel_img.next();
    }),

    // 跳转详情页
    todetail_page(order_sn) {
      let newurl = {}
      if (this.iscompany) {
        newurl = this.$router.resolve("/company/goodsdetail/" + order_sn);
      } else {
        newurl = this.$router.resolve("/goodsdetail/" + order_sn);
      }
      // console.log("newurl", newurl)
      window.open(newurl.href, "_blank");
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  color: #666;
  position: relative;
  text-align: center;
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
  .fontpart {
    display: inline-block;
    font-size: 13px;
    height: 20px;
    padding: 0 25px;
    position: relative;
    z-index: 2;
    background: #fff;
  }
  .line {
    width: 100%;
    height: 1px;
    background: #e6e6e6;
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 1;
  }
}

section {
  // 设置整体高度。
  /deep/.el-carousel__container {
    height: 490px;
  }
  ul li {
    margin: 10px 0;
  }
  .pic_part {
    width: 130px;
    height: 130px;
    margin: 0 auto;
    position: relative;
    .title {
      position: absolute;
      bottom: 0;
      padding: 5px;
      background: #666;
      opacity: 0.7;
      color: #fff;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 12px;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .pic_part:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  .price {
    width: 100px;
    font: 12px/20px "微软雅黑";
    height: 20px;
    margin: 0 auto;
    color: $main_color;
    text-align: center;
  }
}

.bottombtn {
  width: 130px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  .el-button--info {
    opacity: 0.7;
  }
}
</style>
