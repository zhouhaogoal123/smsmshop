<template>
  <div class="goods_info">
    <!-- 头部三大栏 -->
    <div class="shop_top">
      <CompanyHead v-if="iscompany"></CompanyHead>
      <ShopTop v-else></ShopTop>
    </div>

    <!-- 面包屑 -->
    <div class="goods_info_top_mbx width_center_1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="iscompany? '/company/home':'/' " class="mianbao_hover">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="options1.length>0">
          <ul class="catelogul">
            <li class="title" @mouseenter="zhihover1=true" @mouseleave="zhihover1=false" @click="tosearch_catalog(value1.id)">{{value1.title}}
              <i :class="zhihover1?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            </li>
            <div class="other_title">
              <div v-for="item in options1" :key="item.id" class="item">
                <span @click="tosearch_catalog(item.id)">{{item.title}}</span>
              </div>
            </div>
          </ul>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="options1.length>0&&value2.title">
          <ul class="catelogul">
            <li class="title" @mouseenter="zhihover2=true" @mouseleave="zhihover2=false" @click="tosearch_catalog(value2.id)">{{value2.title}}
              <i :class="zhihover2?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            </li>
            <div class="other_title">
              <div v-for="item in options2" :key="item.id" class="item">
                <span @click="tosearch_catalog(item.id)">{{item.title}}</span>
              </div>
            </div>
          </ul>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="options2.length>0&&value3.title">
          <ul class="catelogul">
            <li class="title" @mouseenter="zhihover3=true" @mouseleave="zhihover3=false" @click="tosearch_catalog(value3.id)">{{value3.title}}
              <i :class="zhihover3?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            </li>
            <div class="other_title">
              <div v-for="item in options3" :key="item.id" class="item">
                <span @click="tosearch_catalog(item.id)">{{item.title}}</span>
              </div>
            </div>
          </ul>
        </el-breadcrumb-item>
        <el-breadcrumb-item class="mianbao_lastitem">{{ goods_info.title }}</el-breadcrumb-item>
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

        <!-- 收藏商品 收藏状态favorite为true是未收藏-->
        <FavShare @fav="goods_fav" :favorite="goods_info.favorite"></FavShare>

      </div>

      <div class="goods_info_top_center_right_left">
        <!-- 商品及描述 -->
        <div class="goods_info_title">
          <p>{{ goods_info.title || "加载中..." }}</p>
        </div>

        <!-- 价格大栏 -->
        <div class="sellprice" v-if="goods_info.agreement">
          <div class="font_justify">专享价</div>
          <div class="agreementprice finalprice">￥{{ agreement || "0.00" }}</div>
        </div>

        <div class="sellprice" v-if="parseFloat(goods_info.business_price)&&iscompany">
          <div class="font_justify">企业价</div>
          <div class="companyprice" :class="parseFloat(goods_info.agreement)?'compareprice':'finalprice'">￥{{ business_price || "0.00" }}</div>
        </div>

        <div class="sellprice" v-if="parseFloat(goods_info.price)&&!goods_info.agreement">
          <div class="font_justify">商城价</div>
          <div class="price" :class="parseFloat(goods_info.business_price)?'compareprice':'finalprice'">￥{{ price || "0.00" }}</div>
        </div>

        <div class="sellprice" v-if="parseFloat(goods_info.market_price)&&!iscompany">
          <div class="font_justify">市场价</div>
          <div class="marketprice" :class="parseFloat(goods_info.price)?'compareprice':'finalprice'">￥{{ market_price||"0.00"}}</div>
        </div>

        <el-row class="aboutgoodnum">
          <el-col :span="8" class="salenum"> 累计销量:
            <span>{{ goods_info.sales || "0" }}</span>
          </el-col>
          <el-col :span="8" class="comment"> 累计评论:
            <span>{{ goods_info.comment || "0" }}</span>
          </el-col>
          <el-col :span="8"> 赠送积分:
            <span>{{ goods_info.bonus || "0" }}</span>
          </el-col>
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

        <!-- 购买等按钮 -->
        <div class="goods_info_btn">
          <!-- 购买数量 -->
          <div class="goods_info_num">
            <div class="goods_info_num_title">购买数量</div>
            <el-input-number v-model="cart_info.number" @change="change_buy_num" :min="1" :max="1000" label="描述文字"></el-input-number>
          </div>
          <div class="goods_info_add_cart el-icon-shopping-cart-2" @click="add_cart">
            <span>加入购物车</span>
          </div>
        </div>
      </div>
      <LookandLook class="goods_info_top_center_right_right" :goodslist="goods_info.relevances" :iscompany="iscompany"></LookandLook>
    </div>

    <!-- 下方大栏(左侧店铺、右侧评论) -->
    <DetailComment :good_id="good_id" :good_content="good_content" :categorys="categorys" @sonaddcart="add_cart"></DetailComment>

    <shop-foot></shop-foot>
    <!-- vue 回到顶部 -->
    <!-- <el-backtop>
      <div class="iconfont">&#xe735;</div>
    </el-backtop> -->
    <UpToHead :rightFixed="true"></UpToHead>
  </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import CompanyHead from "@/views/common/companyhead.vue";
import PicZoom from "@/components/vue-piczoom.vue"; // 放大镜组件。 vue-photo-zoom-pro插件暂时不用
import ShopFoot from "@/components/shop_foot.vue";
import DetailComment from "@/views/common/detailcomp/detail_comment.vue"; //商品下方区域（左侧店铺、右侧评论）
import FavShare from '@/views/common/detailcomp/fav_share.vue';//收藏分享
import LookandLook from "@/components/lookandlook.vue"; //右侧看了又看
import UpToHead from "@/components/uptohead.vue";
import { mapState } from 'vuex';
export default {
  name: "detail",
  components: { ShopTop, CompanyHead, PicZoom, ShopFoot, LookandLook, DetailComment, FavShare, UpToHead },
  data() {
    return {
      categorys: "",
      options1: [], //面包屑，分类搜索
      options2: [],
      options3: [],
      value1: { id: "", title: "" },
      value2: { id: "", title: "" },
      value3: { id: "", title: "" },
      zhihover1: false,
      zhihover2: false,
      zhihover3: false,
      goods_images: [], //所有小图
      chose_img_pos: 0, //当前大图对应小图数组的位置
      good_id: "",
      good_content: "",
      iscompany: false,  // 是企业商城页面

      goods_info: {
        //商品所有信息
        favorite: true, //因为数据层次太深，所以需要先给收藏状态一个默认值。以免出现跳转先有默认值已收藏。
      },

      fav_info: {
        //收藏接口信息
        title: "",
        obj_id: "",
        type: "goods",
        token: "",
        mode: "",
      },
      radio: [], //单选框值，所有选中属性

      cart_info: {
        //添加购物车提交信息
        token: "", //用户token
        good_id: "", //商品ID
        attr_id: "", //商品选中属性
        number: 1, //购买数量
      },

      save_history: true, // 历史浏览记录。是否需要存储
      goods_id: 0, // 商品ID,因为是动态路由传参，动态路由参数为:goods_id，所以不需要用props或query或params接收参数

      market_price: "", //市场价(无属性价格)
      price: "",//商城价(无属性价格)
      business_price: "",//统一企业价(无属性价格)
      agreement: "",//专属企业价(无属性价格)

      natureObj: { nature: [] },
      specObj: { spec: [] },
    };
  },
  provide() {
    return {
      //provide实现响应式。这里必须是响应式对象
      natureSon: this.natureObj,
    }
  },
  computed: {
    ...mapState(["user_iscompany"])
  },
  watch: {
    radio: {
      //监听属性变化。有变化则将属性价格与原价格相加。
      handler(newVal) {
        console.log(newVal)
        let goodsattr = newVal.join("->");
        this.goods_info.attrs.forEach((item, index) => {
          if (goodsattr === item.attr_text) {
            // 计算属性价格
            let attrPrice = parseFloat(item.price)
            this.market_price = (parseFloat(this.goods_info.market_price) + attrPrice).toFixed(2); //三目无属性初始价格
            this.price = (parseFloat(this.goods_info.price) + attrPrice).toFixed(2); //三目无属性初始价格
            this.business_price = (parseFloat(this.goods_info.business_price) + attrPrice).toFixed(2); //三目无属性初始价格
            this.agreement = (parseFloat(this.goods_info.agreement) + attrPrice).toFixed(2); //企业价 null就是NAN
          }
        });
      },
    },
  },
  created() {
    // console.log(this.$route.name)
    this.iscompany = this.$route.name.startsWith("company")
    this.goods_id = this.$route.params.goods_id; //获取商品id号码
    console.log(this.$route)
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
      this.$get(this.$api.homeGetGoodsInfo, { good_sn: this.goods_id, token: token, }).then((res) => {
        console.log("详细页返回商品", res);
        let { data } = res;
        this.goods_info = data; //所有返回商品信息

        this.natureObj.nature = data.nature;
        this.specObj.spec = data.spec;

        this.options1 = data.categorys.data1;
        this.options2 = data.categorys.data2;
        this.options3 = data.categorys.data3;
        this.value1 = { id: data.categorys.category1, title: data.categorys.cat1 };
        this.value2 = { id: data.categorys.category2, title: data.categorys.cat2 };
        this.value3 = { id: data.categorys.category3, title: data.categorys.cat3 };
        this.categorys = { value1: JSON.stringify(this.value1), value2: JSON.stringify(this.value2), value3: JSON.stringify(this.value3), value4: JSON.stringify({ id: this.goods_id, title: this.goods_info.title }) };

        this.fav_info.title = data.title; //用于收藏与取消收藏
        this.fav_info.obj_id = data.good_id; //用于收藏与取消收藏
        this.cart_info.good_id = data.good_id; //用于添加购物车

        this.market_price = data.market_price; //三目无属性初始价格
        this.price = data.price; //三目无属性初始价格
        this.business_price = data.business_price; //三目无属性初始价格
        this.agreement = data.agreement; //三目无属性初始价格

        this.good_id = data.good_id;
        this.good_content = data.content;
        let newpics = data.pictures.map((item, index) => {
          return item.pic_url;
        });
        newpics.unshift(data.img_url); //将大图加入到返回小图数组的最前面
        this.goods_images = newpics;

        this.radio = []; // 初始化单选框值
        this.cart_info.number = 1; // 初始化购买数量
        this.cart_info.attr_id = ""; // 初始化选中属性

        // 历史浏览记录
        if (this.save_history) {
          this.save_history_fun(this.goods_info);
        }
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
    // 添加或取消收藏
    goods_fav: function () {
      let token = localStorage.getItem("token");
      if (this.$isEmpty(token)) {
        return this.$router.push({ name: "login" });
      } else {
        this.fav_info.token = token;
      }
      if (this.goods_info.favorite) {
        //未收藏则添加收藏
        this.fav_info.mode = "add";
        this.$post(this.$api.homeAddRemoveFav, this.fav_info).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.goods_info.favorite = false;
          }
        });
      } else {
        //收藏则移除收藏
        this.fav_info.mode = "del";
        this.$post(this.$api.homeAddRemoveFav, this.fav_info).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.goods_info.favorite = true;
          }
        });
      }
    },

    // 加入购物车
    add_cart: function () {
      // 如果没有token，跳转到登录页面
      let token = localStorage.getItem("token");
      if (this.$isEmpty(token)) {
        if (this.iscompany) {
          return this.$router.push({ name: "company_login" });
        }
        return this.$router.push({ name: "login" })
      } else {
        this.cart_info.token = token;
      }
      // 如果商品属性不为空，那么单选框属性选中长度必须与属性个数相同
      if (!this.$isEmpty(this.goods_info.spec) && this.radio.length != this.goods_info.spec.length) {
        return this.$message.error("请将商品属性选择完整");
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
          this.$store.commit("setCartCount", res.data.cart_count) // vuex修改购物车数据（刷新就不行了）
          let successprice = ""
          if (this.agreement && !isNaN(this.agreement)) {
            console.log(11111, this.agreement)
            successprice = this.agreement;
          } else if (this.iscompany && parseFloat(this.business_price) && !isNaN(this.business_price)) {
            successprice = this.business_price;
          } else if (parseFloat(this.price) && !isNaN(this.price)) {
            successprice = this.price;
          } else {
            successprice = this.market_price;
          }
          console.log(successprice)
          let obj = { goods_pic: this.goods_info.img_url, goods_title: this.goods_info.title, goods_number: this.cart_info.number, goods_attr: goodsattr, goods_price: successprice };
          localStorage.setItem("addcart_success", JSON.stringify(obj))
          this.$router.push({ name: "addcartsuccess" });
        } else {
          // return this.$message.error(res.message);
        }
      });
    },

    // 历史浏览记录
    save_history_fun(goods_info) {
      this.save_history = false; //将save_history 不设置历史记录
      let goods_json = localStorage.getItem("shop_goods_historys");
      let goods_list = [];

      if (!this.$isEmpty(goods_json)) {
        //如果有本地存储
        goods_list = JSON.parse(goods_json);
      }
      // console.log("设置此产品为本地存储", goods_info);
      let have_his = false;
      if (goods_list.length > 0) {
        //如果有本地存储
        goods_list.forEach((item) => {
          if (goods_info.good_sn == item.good_sn) {
            //如果此项已有历史记录
            have_his = true;
          }
        });
      }
      if (!have_his) {
        //没有此项历史记录,则存进去
        goods_list.push({
          price: goods_info.price,
          good_sn: goods_info.good_sn,
          title: goods_info.title,
          img_url: goods_info.img_url,
        });
      }

      if (goods_list.length > 4) {
        //如果已有5个，把先放进去的一条历史记录删除掉
        goods_list.splice(0, 1);
      }
      localStorage.setItem("shop_goods_historys", JSON.stringify(goods_list));
      // console.log("存后",JSON.stringify(goods_list))
    },

    // 按照分类查询
    tosearch_catalog(id) {
      this.iscompany ? this.$router.push({ path: "/company/goodssearch", query: { id } }) : this.$router.push({ path: "/goodssearch", query: { id } })
    },

  },
};
</script>
<style lang="scss" scoped>
@import "@/views/common/css/goodsdetail.scss";
@import "@/views/common/css/daohang.scss";
.catelogul:hover {
  .title {
    border-color: $main_color;
    cursor: pointer;
    border-bottom-color: #fff;
    color: $main_color;
    position: relative;
    z-index: 3;
  }

  .other_title {
    display: flex;
  }
}
</style>