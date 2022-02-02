<template>
  <!-- 添加购物车成功跳转页面 -->
  <div class="sanmu ">
    <!-- 头部三大栏 -->
    <div class="shop_top" v-if="!iscompany">
      <shop-top  ></shop-top>
    </div>
    <CompanyTop v-if="iscompany"></CompanyTop>
    <div class="width_center_1200">
      <div class="topline">三目购物车</div>
      <div class="centerline">
        <div class="cart_pic">
          <el-image :src="addcart_info.goods_pic" fit="cover"></el-image>
        </div>

        <div class="cart_pic_right">
          <div class="cart_pic_right_top">
            <div class="cart_pic_right_top_line1_left">
              <div class="addcart_title">已添加商品：{{addcart_info.goods_title}}</div>
              <div class="addcart_num"> 数量:{{addcart_info.goods_number}}</div>
            </div>
            <div class="cart_pic_right_top_line1_right">
              <span class="iconfont">&#xe64e;</span>
              <span> 已成功加入购物车</span>
            </div>
          </div>

          <div class="cart_pic_right_bottom" :class="attshow?'showbetween':'showend'">
            <div class="cart_pic_right_bottom_left" v-if="attshow">商品属性：
              <span>{{addcart_info.goods_attr}}</span>
            </div>
            <div class="cart_pic_right_bottom_right">
              <div class="cartprice">
                小计：￥{{xiaoji}}
              </div>
              <div class="cartnum">
                <span> 购物车共有
                  <i> {{cart_num}}</i> 件商品</span>
              </div>
              <div class="cartbtn">
                <div class="cartbtn1" @click="$router.back()">
                  <el-button type="warning">
                    <span class="iconfont">&#xe6b1;</span>返回商品详情</el-button>
                </div>
                <div class="cartbtn2">
                  <el-button type="danger" @click="tocart">去购物车结算
                    <span class="iconfont">&#xe6ac;</span>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShopFoot></ShopFoot>
  </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import CompanyTop from '@/views/common/companyhead.vue';
import ShopFoot from '@/components/shop_foot.vue';
export default {
  name: "addcartsuccess",
  components: { ShopTop, CompanyTop, ShopFoot },
  data() {
    return {
      addcart_info: {}, //购物车信息
      attshow: true,    //如果有属性展示属性部分，没有就隐藏
      cart_num: 0,
      iscompany: false, //企业用户
    }
  },
  computed: {
    xiaoji() {
      return (this.addcart_info.goods_price * this.addcart_info.goods_number).toFixed(2)
    }
  },
  created() {
    this.iscompany = localStorage.getItem("user_iscompany") == "true";
    this.addcart_info = JSON.parse(localStorage.getItem("addcart_success"));
    console.log("加入购物车路由传参", this.addcart_info)

    if (this.addcart_info.goods_attr.length === 0) {
      this.attshow = false;
    } else {
      this.attshow = true;
    }
    this.cart_num = this.$store.state.cart_count;
  },
  methods: {
    tocart() {
      if (this.iscompany) {
        this.$router.push({ name: 'company_mycart' })
      } else {
        this.$router.push({ name: 'mycart' })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.topline {
  margin-top: 40px;
  margin-bottom: 20px;
  color: #999;
  font-weight: 700;
}
.centerline {
  display: flex;
  font-family: "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
  margin-bottom: 30px;
  .cart_pic {
    width: 300px;
    height: 300px;
  }
  .cart_pic_right {
    width: 890px;
    margin-left: 10px;
  }
}
.cart_pic_right_top {
  display: flex;
  justify-content: space-between;
  .cart_pic_right_top_line1_left {
    line-height: 40px;
    .addcart_title {
      font-size: 12px;
      width: 500px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .addcart_num {
      font-size: 12px;
    }
  }
  .cart_pic_right_top_line1_right {
    font: 20px/80px "微软雅黑";
    font-family: "Hiragino Sans GB", SimHei, SimSun;
    .iconfont {
      color: green;
    }
  }
}
.showend {
  display: flex;
  justify-content: flex-end;
}
.showbetween {
  display: flex;
  justify-content: space-between;
}
.cart_pic_right_bottom {
  margin-top: 10px;
  .cart_pic_right_bottom_left {
    font-size: 12px;
    span {
      color: #999;
    }
  }
  .cart_pic_right_bottom_right {
    margin-top: 100px;
    text-align: right;
    .cartprice {
      font: 18px/28px "微软雅黑";
      color: #f56c6c;
    }
    .cartnum {
      font: 12px/22px "微软雅黑";
      margin: 0 5px;
      i {
        color: #f56c6c;
      }
    }
    .cartbtn {
      display: flex;
      .cartbtn2 {
        padding-left: 20px;
      }
      .iconfont {
        padding: 0 5px;
      }
    }
  }
}
.el-image {
  height: 100%;
  width: 100%;
}
</style>

