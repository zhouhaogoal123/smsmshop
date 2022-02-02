<template>
  <div class="goods_info">
    <!-- 头部三大栏 -->
    <div class="shop_top">
      <shop-top></shop-top>
    </div>

    <!-- 面包屑 -->
    <div class="goods_info_top_mbx width_center_1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'integral' }" class="mianbao_hover">积分商城</el-breadcrumb-item>
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(v, k) in goods_info.class_list" :key="k">{{ v.name }}
        </el-breadcrumb-item>
        <el-breadcrumb-item class="mianbao_lastitem">{{ goods_info.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 左边放大镜，小图片，及其右边部分 -->
    <div class="width_center_1200 clear">
      <div class="goods_info_top_left">
        <!-- 放大镜图 -->
        <div class="goods_image_item">
          <!-- url是默认图，highUrl是更清晰的图, chose_img_pos是图片数组选中的下标-->
          <pic-zoom :url="goods_images[chose_img_pos]"></pic-zoom>
        </div>

        <!-- 放大镜下小图 -->
        <div class="pic_zoom_list">
          <!-- 上一张 -->
          <div class="pic_zoom_list_left" @click="pre_img()">
            <i class="el-icon-arrow-left"></i>
          </div>
          <!-- 小图片列表 -->
          <div class="picsmall">
            <ul style="left: 0" ref="next_img">
              <li v-for="(v, k) in goods_images" :key="k" @mouseenter="hover_silde_img(k)" class="picsize" :class="chose_img_pos == k ? 'border_color' : ''">
                <el-image :src="v" fit="cover"></el-image>
              </li>
            </ul>
          </div>
          <!-- 下一张 -->
          <div class="pic_zoom_list_right" @click="next_img()">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>

      <div class="goods_info_top_center_right_left">
        <!-- 商品及描述 -->
        <div class="goods_info_title">
          <p>{{ goods_info.title || "加载中..." }}</p>
        </div>
        <!-- 积分大栏 -->
        <div class="sellprice">
          <div class="font_justify">积分</div>
          <div class="price">{{ goods_info.price || "0.00" }}</div>
        </div>

        <el-row class="aboutgoodnum">
          <el-col :span="8" class="salenum"> 商品品牌: 得力</el-col>
          <el-col :span="10" class="comment"> 商品货号:
            <span>asdf5465165495</span>
          </el-col>
          <el-col :span="6"> 商品库存: 999</el-col>
        </el-row>
        <!-- 商品属性选择 -->
        <div v-if="goods_info.spec" class="goods_attrs_all">
          <div v-for="(item, index) in goods_info.spec" :key="item.id" class="goods_attrs">
            <div class="title">{{ item.title }}</div>
            <div class="myradio">
              <el-radio-group v-model="radio[index]">
                <el-radio v-for="(v, k) in item.values" :key="k" :label="v.value">
                  {{ v.value }}
                  <i class="iconfont">&#xe79e;</i>
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <!-- 兑换按钮 -->
        <el-button type="danger" @click="add_cart" plain class="duihuan">立即兑换</el-button>
      </div>
      <LookandLook class="goods_info_top_center_right_right"></LookandLook>
    </div>

    <!-- 下方大栏(左侧店铺、右侧评论) -->
    <DetailComment :good_id="good_id" @sonaddcart="add_cart"></DetailComment>

    <shop-foot></shop-foot>
    <!-- vue 回到顶部 -->
    <el-backtop>
      <div class="iconfont">&#xe735;</div>
    </el-backtop>
  </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import PicZoom from "@/components/vue-piczoom.vue"; // 放大镜组件。 vue-photo-zoom-pro插件暂时不用
import ShopFoot from "@/components/shop_foot.vue";
import DetailComment from "@/views/common/detailcomp/detail_comment"; //商品下方区域（左侧店铺、右侧评论）
import LookandLook from "@/components/lookandlook.vue"; //右侧看了又看
export default {
  name: "detail",
  components: {
    PicZoom, // 放大镜
    ShopFoot,
    LookandLook,
    DetailComment,
    ShopTop
  },
  props: {},
  data() {
    return {
      goods_images: [], //所有小图
      chose_img_pos: 0, //当前大图对应小图数组的位置
      checked_num: 1, //选中的是五个中的第几个
      good_id: "",

      goods_info: {
        //商品所有信息
        favorite: true, //因为数据层次太深，所以需要先给收藏状态一个默认值。以免出现跳转先有默认值已收藏。
      },

      radio: [], //单选框值，所有选中属性

      cart_info: {
        //添加购物车提交信息
        token: "", //用户token
        good_id: "", //商品ID
        attr_id: "", //商品选中属性
        number: 1, //购买数量
      },

      addcart_success: {
        //添加购物车成功携带信息
        goods_pic: "",
        goods_title: "",
        goods_number: "",
        goods_attr: [],
        goods_price: "",
        goods_id: "",
      },

      noattr_price: "", //没有加属性的价格
      goods_id: 0, // 商品ID,因为是动态路由传参，动态路由参数为:goods_id，所以不需要用props或query或params接收参数
      store_info: {},
      chose_spec: [], // 选择的规格属性
      chose_spec_info: {},

      // 秒杀活动显示
      seckill_intvalobj: null,
      seckill_hour: 0,
      seckill_min: 0,
      seckill_secs: 0,
    };
  },
  watch: {
    radio: {
      //监听属性变化。有变化则将属性价格与原价格相加。
      handler(newVal) {
        let goodsattr = newVal.join("->");
        this.goods_info.attrs.forEach((item, index) => {
          if (goodsattr === item.attr_text) {
            this.goods_info.price = (
              parseFloat(this.noattr_price) + parseFloat(item.price)
            ).toFixed(2);
          }
        });
      },
    },
  },
  created() {
    this.goods_id = this.$route.params.goods_id; //获取商品id号码
    if (this.$isEmpty(this.goods_id)) {
      return this.$message.error("商品已下架");
    }
    this.get_goods_info(); //获取商品所有信息
  },
  beforeRouteUpdate: function (to, from, next) {
    // console.log(to,from)
    this.goods_id = to.params.goods_id;
    if (to.path != from.path) {
      this.get_goods_info();
    }
    // don't forget to call next()
    next();
  },

  methods: {
    // 获取商品所有信息
    get_goods_info: function () {
      let token = localStorage.getItem("token");
      this.$get(this.$api.homeGetGoodsInfo, {
        good_sn: this.goods_id,
        token: token,
      }).then((res) => {
        console.log("详细页返回商品", res);
        this.goods_info = res.data; //所有返回商品信息
        this.cart_info.good_id = res.data.good_id; //用于添加购物车
        this.good_id = res.data.good_id; //good_id
        this.addcart_success.goods_pic = res.data.img_url; //用于添加购物车成功跳转页面的数据
        this.addcart_success.goods_title = res.data.title;
        this.noattr_price = res.data.price; //没加属性的初始价格
        let newpics = res.data.pictures.map((item, index) => {
          return item.pic_url;
        });
        newpics.unshift(res.data.img_url); //将大图加入到返回小图数组的最前面
        this.goods_images = newpics;

        this.radio = []; // 初始化单选框值
        this.cart_info.number = 1; // 初始化购买数量
        this.cart_info.attr_id = ""; // 初始化选中属性
      });
    },
    // 鼠标移入缩略图幻灯片图片
    hover_silde_img: function (k) {
      this.chose_img_pos = k;
    },
    // 上一张
    pre_img: function () {
      let next_img = this.$refs.next_img;
      if (parseInt(next_img.style.left) < 0) {
        next_img.style.left = 0;
      }
    },
    // 下一张
    next_img: function () {
      let next_img = this.$refs.next_img;
      if (next_img.scrollWidth > 310) {
        next_img.style.left = 310 - next_img.scrollWidth + "px";
      }
    },
    // 购买数量修改
    change_buy_num(value) {
      this.cart_info.number = value;
    },
    // 加入购物车
    add_cart: function () {
      // 如果商品属性不为空，那么单选框属性选中长度必须与属性个数相同
      if (
        !this.$isEmpty(this.goods_info.spec) &&
        this.radio.length != this.goods_info.spec.length
      ) {
        return this.$message.error("请将商品属性选择完整");
      }
      let token = localStorage.getItem("token");
      // 如果没有token，跳转到登录页面
      if (this.$isEmpty(token)) {
        return this.$router.push({ name: "login" });
      } else {
        this.cart_info.token = token;
      }
      let goodsattr = this.radio.join("->");
      this.goods_info.attrs.forEach((item, index) => {
        if (goodsattr === item.attr_text) {
          this.cart_info.attr_id = item.id;
        }
      });
      // 发起加入购物车请求
      this.$post(this.$api.homeAddCart, this.cart_info).then((res) => {
        console.log("添加购物车返回", res);
        if (res.code == 200) {
          this.addcart_success.goods_number = this.cart_info.number; //设置路由传参
          this.addcart_success.goods_attr = this.radio; //属性
          this.addcart_success.goods_price = this.goods_info.price; //这个价格是原价格加上属性价格的最终单价
          this.addcart_success.goods_id = this.cart_info.good_id; //商品id

          localStorage.setItem("addcart_success", JSON.stringify(this.addcart_success));
          this.$store.commit("setCartCount", res.data.cart_count) // vuex修改购物车数据（刷新就不行了）
          this.$router.push({ name: "addcartsuccess" });
        } else {
          // return this.$message.error(res.message);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/views/common/css/goodsdetail.scss";
.duihuan {
  margin-top: 30px;
  margin-left: 10px;
}
</style>