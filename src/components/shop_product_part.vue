<template>
  <div class="shop_product_all">
    <div v-cloak class="mytabs clear">
      <div class="mytabs_left">
        <div class="product_left_font">{{onename}}</div>
        <div class="product_left">
          <el-skeleton :loading="leftLoading">
            <template slot="template">
              <el-skeleton-item variant="text" style="width: 234px; height: 280px;background:#fff;" />
              <el-skeleton-item variant="text" style="width: 234px; height: 30px;background:rgba(0,0,0,.7);border-radius:0;" />
              <el-skeleton-item variant="text" style="width: 234px; height: 200px;background:#fff;" />
              <el-skeleton-item variant="text" style="width: 234px; height: 30px;background:rgba(0,0,0,.7);border-radius:0;" />
            </template>

            <template>
              <div class="product_left_pic" @click="togoodsdetail(first_top_goods.good_sn)">
                <div v-if="first_top_goods">
                  <el-image :src="first_top_goods.img_url" fit="cover"></el-image>{{first_top_goods}}
                  <div class="carousel_div_title">{{first_top_goods.title}}</div>
                </div>
              </div>

              <div class="carouselgoods">
                <el-carousel height="230px" direction="vertical" :interval="4000" class="firstbrand">
                  <el-carousel-item v-for="item in first_bottom_goods" :key="item.id">
                    <div class="carousel_div" @click="togoodsdetail(item.good_sn)">
                      <el-image :src="item.img_url" fit="cover"></el-image>
                      <div class="carousel_div_title">{{item.title}}</div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>

      <el-tabs v-model="first_activeName" type="card" class="tabs_right" @tab-click="handleClick">
        <el-tab-pane :label="tabstitle[0]" :name="tabsid[0]">
          <el-skeleton :loading="loading">
            <template slot="template">
              <SkeletGoods></SkeletGoods>
            </template>
            <template>
              <ProductList :goodsList="goodsList1" v-if="first_activeName==tabsid[0]&&goodsList1"></ProductList>
            </template>
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane :label="tabstitle[1]" :name="tabsid[1]">
          <el-skeleton :loading="loading">
            <template slot="template">
              <SkeletGoods></SkeletGoods>
            </template>
            <template>
              <ProductList :goodsList="goodsList2" v-if="first_activeName==tabsid[1]&&goodsList2"></ProductList>
            </template>
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane :label="tabstitle[2]" :name="tabsid[2]">
          <el-skeleton :loading="loading">
            <template slot="template">
              <SkeletGoods></SkeletGoods>
            </template>
            <template>
              <ProductList :goodsList="goodsList3" v-if="first_activeName==tabsid[2]&&goodsList3"></ProductList>
            </template>
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane :label="tabstitle[3]" :name="tabsid[3]">
          <el-skeleton :loading="loading">
            <template slot="template">
              <SkeletGoods></SkeletGoods>
            </template>
            <template>
              <ProductList :goodsList="goodsList4" v-if="first_activeName==tabsid[3]&&goodsList4"></ProductList>
            </template>
          </el-skeleton>
        </el-tab-pane>
      </el-tabs>
    </div>

    <LogoBannerStatic :first_brand="first_brand" v-if="!hotBannerShow"></LogoBannerStatic>
    <LogoBannerHot :first_brand="first_brand" v-else></LogoBannerHot>
  </div>
</template>

<script>
import ProductList from "./shop_product_list";
import LogoBannerStatic from "./banner_logo_static";
import LogoBannerHot from "./banner_logo_hot";
import SkeletGoods from './skelet_goods'
export default {
  components: { ProductList, LogoBannerStatic, LogoBannerHot, SkeletGoods },
  data() {
    return {
      first_top_goods: "",//左侧上方图片
      first_bottom_goods: [], //左侧下方轮播图
      first_activeName: "",//初始选中值
      goodsList1: [], //热门商品列表
      goodsList2: [], //热门商品列表
      goodsList3: [], //热门商品列表
      goodsList4: [], //热门商品列表
      first_brand: [], //第一块的对应品牌信息
      loading: true,
      leftLoading: true,
      // initSuccess: false,
    };
  },
  props: {
    tabstitle: {
      type: Array,
      default: []
    },
    tabsid: {
      type: Array,
      default: []
    },
    oneid: {
      type: Number,
      default: 0
    },
    onename: {
      type: String,
      default: ""
    },
    hotBannerShow: {
      type: Boolean,
      default: false
    },
    time: {
      required: false,
      default: 0
    }
  },
  created() {
    this.first_activeName = this.tabsid[0];
    // this.initComp(); //延时加载
    this.getAllinfo();
    this.getType();
  },
  methods: {
    initComp() {
      let vm = this
      setTimeout(function () {
        vm.getAllinfo() //大类所有商品信息
        vm.getType() //大类对应品牌
      }, (Number(vm.time || 0)));
    },
    getAllinfo() {
      let second = this.tabsid.join(",");
      this.$get("goods/goods_list", { one: this.oneid, second }).then(res => {
        let { data } = res;
        console.log(this.onename + "栏商品列表", data)
        // hots左侧热销产品
        this.first_top_goods = data.hots[0]
        this.first_bottom_goods = [...data.hots].splice(1, 3)
        // 二级类右侧产品
        let cats = Object.values(data.cats)
        this.goodsList1 = cats[0]
        this.goodsList2 = cats[1]
        this.goodsList3 = cats[2]
        this.goodsList4 = cats[3]

        this.loading = false;
        this.leftLoading = false;
      })
    },
    togoodsdetail(goodid) {
      let newUrl = "";
      if (this.$route.name == "company_home") {
        newUrl = this.$router.resolve("/company/goodsdetail/" + goodid)
      } else {
        newUrl = this.$router.resolve("/goodsdetail/" + goodid);
      }
      window.open(newUrl.href, "_blank");
    },
    getType() {
      this.$get("brand/list", { cat: this.oneid, size: 15 }).then(res => {
        console.log(this.onename + "类对应品牌", res)
        this.first_brand = res.data;
      })
    },
    handleClick(tab) { }
  },
}
</script>

<style lang="scss" scoped>
.shop_product_all {
  margin: 40px 0 10px;
  .mytabs_left {
    float: left;
    .product_left_font {
      font-size: 22px;
      line-height: 40px;
      font-weight: 700;
      margin-bottom: 15px;
    }
  }
  .tabs_right {
    width: 946px;
    min-height: 615px;
    float: right;
    /deep/.el-tabs__nav-scroll {
      float: right;
    }
    /deep/.el-tabs__header {
      border-bottom: 2px solid $main_color;
    }
    /deep/.el-tabs__nav-wrap {
      margin-bottom: -2px;
    }
    /deep/.el-tabs__nav {
      border: none;
    }
    /deep/.el-tabs__item {
      margin: 0 5px;
      border-top: 2px solid #e4e7ed;
      border-left: 2px solid #e4e7ed;
      border-right: 2px solid #e4e7ed;
      height: 38px;
      -moz-user-select: none; /*火狐浏览器*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*ie浏览器*/
      user-select: none; /*其他浏览器*/
    }
    /deep/.el-tabs__item.is-active {
      height: 40px;
    }
    /deep/.el-tabs__item:nth-last-child(1) {
      margin-right: 10px;
    }
    /deep/.el-tabs__item.is-active {
      color: $main_color;
      border-color: $main_color;
      border-bottom-color: #fff;
      background: #fff;
    }
    /deep/.el-tabs__item:hover {
      color: $main_color;
    }
  }
}
.el-image {
  height: 100%;
}
.product_left {
  width: 234px;
  height: 310px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  font-size: 0;
  position: relative;

  .product_left_pic {
    width: 100%;
    height: 310px;
    cursor: pointer;
    .el-image {
      height: 310px;
    }
  }
  .product_left_pic:hover {
    opacity: 0.9;
  }
  .firstbrand {
    /deep/.el-carousel__indicators {
      left: 0;
    }
  }
  .carouselgoods {
    /deep/.el-carousel__indicators {
      width: 20px;
    }
    /deep/.el-carousel__button {
      width: 3px;
      height: 20px;
    }
    .carousel_div {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: pointer;
    }
    .carousel_div:hover {
      opacity: 0.9;
    }
  }
  .carousel_div_title {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.7);
    font-size: 14px;
    color: #fff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>