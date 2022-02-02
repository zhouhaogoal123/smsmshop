<template>
  <div class="product_right">
    <ul>
      <li v-for="v in goodsList" :key="v.id">
        <div class="onegood" @click="todetail(v.good_sn)">
          <div class="product_act_in">
            <dl>
              <dt class="lazypic">
                <el-image :src="v.img_url" fit="cover" lazy></el-image>
              </dt>
              <dd class="product_title" :title="v.title">{{v.title}}</dd>
              <dd class="product_subtitle">{{v.synopsis}}</dd>
              <dd class="company_price" v-if="iscompany">
                <span v-if="v.agreement">
                  ￥{{v.agreement}}
                  <span class="compfont">专享价</span>
                </span>
                <span v-else-if="parseFloat(v.business_price)">
                  ￥{{v.business_price}}
                  <span class="compfont">企业价</span>
                </span>
                <span v-else>￥{{v.price}}</span>
              </dd>
              <dd class="product_price" v-else>
                ￥{{v.price}}
                <span v-if="v.market_price">￥{{v.market_price}}</span>
              </dd>
            </dl>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "productlist",
  data() {
    return {
      iscompany: false, //普通用户还是企业用户
    }
  },
  props: {
    goodsList: {
      type: Array,
      required: true
    },
  },
  created() {
    if (this.$route.name.startsWith("company")) this.iscompany = true;
    // console.log("当前二级分类商品数量", this.goodsList.length)
  },
  methods: {
    todetail(goodid) {
      let newUrl = "";
      if (this.$route.name == "company_home") {
        newUrl = this.$router.resolve("/company/goodsdetail/" + goodid)
      } else {
        newUrl = this.$router.resolve("/goodsdetail/" + goodid);
      }
      window.open(newUrl.href, "_blank");
    }
  },
}
</script>

<style lang="scss" scoped>
.product_right {
  width: 100%;
  .onegood {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  ul li {
    width: 220px;
    height: 260px;
    margin-right: 22px;
    margin-bottom: 20px;
    .product_act_in {
      width: 100%;
      height: 100%;
      background: #fff;
      box-sizing: border-box;
      -webkit-transition: all 0.2s linear;
      transition: all 0.2s linear;
    }
    dl dt {
      width: 140px;
      height: 140px;
      margin: 0 auto;
      padding-top: 20px;
    }
    // 图片
    .el-image {
      width: 140px;
      height: 140px;
    }
    dl dd {
      width: 190px;
      overflow: hidden;
      text-align: center;
      margin: 0 auto;
    }
    dl dd.product_title {
      margin-top: 20px;
      font: 12px/20px "微软雅黑";
      height: 20px;
    }
    dl dd.product_subtitle {
      color: #b0b0b0;
      font: 12px/20px "微软雅黑";
      height: 20px;
    }
    dl dd.product_price {
      font-size: 14px;
      font-weight: 700;
      color: $main_color;
      line-height: 40px;
      span {
        font-size: 12px;
        color: #b0b0b0;
        margin-left: 3px;
        text-decoration: line-through;
      }
    }
    dl dd.company_price {
      font-size: 14px;
      font-weight: 700;
      color: $main_color;
      line-height: 34px;
      .compfont {
        background: blue;
        color: #fff;
        font-size: 12px;
        padding: 0 2px;
      }
    }
  }
  ul li:nth-child(4n) {
    margin-right: 0;
  }
  ul li:hover .product_act_in {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: -3px;
  }
}
</style>

