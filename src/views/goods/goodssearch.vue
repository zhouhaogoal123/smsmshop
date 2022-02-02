<template>
  <div class="goods_index">
    <!-- 头部三大栏 -->
    <div class="shop_top">
      <CompanyHead v-if="iscompany"></CompanyHead>
      <ShopTop v-else></ShopTop>
    </div>

    <div class="goods_info_top_mbx width_center_1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="iscompany?'/company/home':'/'">
          <span>首页</span>
        </el-breadcrumb-item>

        <el-breadcrumb-item v-if="options1.length>0 && value1.title">
          <ul class="catelogul" @mouseenter="zhihover1=true" @mouseleave="zhihover1=false" :class="zhihover1?'zhihoverclass':''">
            <li class="title" @click="tosearch_catalog(value1.id)">{{value1.title}}
              <i :class="zhihover1?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            </li>
            <div class="other_title">
              <div v-for="item in options1" :key="item.id" class="item">
                <span @click="tosearch_catalog(item.id)">{{item.title}}</span>
              </div>
            </div>
          </ul>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="options2.length>0 && value2.title">
          <ul class="catelogul" @mouseenter="zhihover2=true" @mouseleave="zhihover2=false" :class="zhihover2?'zhihoverclass':''">
            <li class="title" @click="tosearch_catalog(value2.id)">{{value2.title}}
              <i :class="zhihover2?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            </li>
            <div class="other_title">
              <div v-for="item in options2" :key="item.id" class="item">
                <span @click="tosearch_catalog(item.id)">{{item.title}}</span>
              </div>
            </div>
          </ul>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="options3.length>0 && value3.title">
          <ul class="catelogul" @mouseenter="zhihover3=true" @mouseleave="zhihover3=false" :class="zhihover3?'zhihoverclass':''">
            <li class="title" @click="tosearch_catalog(value3.id)">{{value3.title}}
              <i :class="zhihover3?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            </li>
            <div class="other_title">
              <div v-for="item in options3" :key="item.id" class="item">
                <span @click="tosearch_catalog(item.id)">{{item.title}}</span>
              </div>
            </div>
          </ul>
        </el-breadcrumb-item>

        <el-breadcrumb-item v-if="isbrand_checked">
          <el-tag closable type="danger" size="small" @close="brand_cancel_click" class="brandsearch">
            品牌：{{brand_checked_title}}
          </el-tag>
        </el-breadcrumb-item>
        <el-breadcrumb-item class="mianbao_lastitem" v-if="info.keyword">
          <span class="keyword_font_color">{{ info.keyword }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 搜索导购列表 -->
    <div class="goods_where width_center_1200">
      <div class="goods_cat_list" v-if="!isbrand_checked && brand_list.length>0">
        <div class="goods_cat_title">品牌筛选：</div>
        <div class="brandpart">
          <ul class="brandul" ref="scrolltotop" v-if="!isbrand_checked && brand_list.length<=8">
            <!-- <el-checkbox-group v-model="brand_list_checkbox"> -->
            <!-- <li v-for="item in brand_list" :key="item.id"> -->
            <li v-for="item in brand_list" :key="item.id" @click="brand_click(item.id,item.title)">
              <!-- <el-checkbox :label="item.id"> -->
              <div class="brandimg" :title="item.title">
                <el-image :src="item.icon" fit="cover" width="100%" height="100%"></el-image>
              </div>
              <!-- </el-checkbox> -->
            </li>
            <!-- </el-checkbox-group> -->
          </ul>
          <ul class="brandul" :class="brandmerge?'brand_merge':'brand_unfold'" ref="scrolltotop" v-if="!isbrand_checked &&brand_list.length>8">
            <!-- <el-checkbox-group v-model="brand_list_checkbox"> -->
            <!-- <li v-for="item in brand_list" :key="item.id"> -->
            <li v-for="item in brand_list" :key="item.id" @click="brand_click(item.id,item.title)">
              <!-- <el-checkbox :label="item.id"> -->
              <div class="brandimg" :title="item.title">
                <el-image :src="item.icon" fit="cover" width="100%" height="100%"></el-image>
              </div>
              <!-- </el-checkbox> -->
            </li>
            <!-- </el-checkbox-group> -->
          </ul>
          <!-- <div class="multiple_checked" v-if="!duoxuanshow">
            <span type="info" plain class="itisok">确认</span>
            <span type="info" @click="brandcancle" plain class="itisno">取消</span>
          </div> -->
        </div>
        <!-- <div class="multiple">
          <span @click="multiple" v-if="duoxuanshow">多选
            <i class="iconfont">&#xe62f;</i>
          </span>
        </div> -->
        <div v-if="brand_list.length>16" class="morebrand cannotchoose">
          <span v-if="brandmerge" @click="brandmerge = false">更多
            <i class="iconfont">&#xe654;</i>
          </span>
          <span v-if="!brandmerge && duoxuanshow" @click="brand_shouqi">收起
            <i class="iconfont">&#xe60a;</i>
          </span>
        </div>
      </div>

      <div class="goods_cat_list">
        <div class="goods_cat_title">筛选排序：</div>
        <div class="sortpart_div">
          <ul class="sortpart_ul">
            <li :class="sortactive === 0 ? 'active' : ''" @click="sortbydefault">
              <span>默认</span>
              <span class="iconfont sorticon">&#xe62b;</span>
            </li>
            <li :class="sortactive === 1 ? 'active' : ''" @click="sortbybuy">
              <span>销量</span>
              <span class="iconfont sorticon">&#xe62b;</span>
            </li>
            <li :class="sortactive === 2 ? 'active' : ''" @click="sortbycomment">
              <span>评论</span>
              <span class="iconfont sorticon">&#xe62b;</span>
            </li>
            <li :class="sortactive === 3 ? 'active' : ''" @click="sortbytime">
              <span>上架时间</span>
              <span class="iconfont sorticon">&#xe62b;</span>
            </li>
            <li class="pricesort" :class="sortactive === 4 ? 'active' : ''" @click="sortbyprice">
              <span class="pricesort_price">价格</span>
              <span class="iconfont pricesort_up" :class="isasc ? 'smalltobig' : ''">&#xe74c;</span>
              <span class="iconfont pricesort_down" :class="isasc ? '' : 'smalltobig'">&#xe7ff;</span>
            </li>
          </ul>
          <div ref="price_sort_input" @mouseenter="ifFocus=true" @mouseleave="ifFocus=false" class="price_sort" :class="ifFocus ? 'focusinput' : ''">
            <div class="price_sort_input">
              <input type="text" v-model="info.lower" placeholder="￥" />
            </div>
            <div>-</div>
            <div class="price_sort_input">
              <input type="text" v-model="info.high" placeholder="￥" />
            </div>
            <div class="btn" v-show="ifFocus" @click="searchbyprice">确认</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索后的商品列表 -->
    <div class="goods_list width_center_1200" v-if="goods_list.length > 0">
      <div class="goods_list_item" v-for="(v, k) in goods_list" :key="k">
        <router-link :to="iscompany?('/company/goodsdetail/' + v.good_sn):('/goodsdetail/' + v.good_sn)" target="_blank">
          <dl>
            <dt>
              <el-image :src="v.img_url" alt="" lazy></el-image>
            </dt>
            <dd class="price">
              <span class="price_symbol">￥</span>
              <span>{{v.price }}</span>
              <!-- <span v-if="iscompany&&v.business_price">
                <font>企业价{{v.business_price }}</font>
              </span> -->
            </dd>
            <dd class="title" v-html="v.title"></dd>
            <dd class="comment">
              <div>
                <span class="comment_num">{{ v.comment || 0 }}</span>
                <span>条评价</span>
              </div>
              <div>
                <span class="comment_buy">{{ v.sales || 0 }}</span>
                <!-- <span>人付款</span> -->
                <span>销量</span>
              </div>
            </dd>
          </dl>
        </router-link>
      </div>
    </div>

    <div class="home_empty_list" v-else>
      <i class="font iconfont">&#xe600;</i>暂无获取到相对应数据！
    </div>

    <!-- 下方分页栏 -->
    <div class="home_fy_block width_center_1200">
      <!-- @current-change当前页数改变触发事件 layout显示上一页、页数、下一页、跳页元素、总页数 -->
      <!-- background为分页按钮添加背景色  total总页数 page-size每页条数 current-page当前页数 -->
      <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="info.limit" :current-page="info.page">
      </el-pagination>
    </div>

    <shop-foot></shop-foot>

  </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import CompanyHead from "@/views/common/companyhead.vue";
import ShopFoot from "@/components/shop_foot.vue";
import { mapState } from "vuex";
export default {
  name: "goodssearch",
  components: {
    ShopTop, CompanyHead, ShopFoot
  },
  props: {},
  data() {
    return {
      info: {        //搜索的所有参数
        keyword: "", //搜索关键字
        cat: "",     //搜索分类
        page: 1,     //当前页数
        limit: 20,   //每页个数
        order: "order", //默认排序
        sort: "ASC", //正反向排序 ASC正序小到大 DESC倒叙大到小
        brand: null, //品牌
        lower: null, //最低价
        high: null, //最高价
      },
      // brand_list_checkbox: [], //品牌结果已选中项
      total_data: 0, // 总条数
      ifFocus: false, //价格区间显示
      sortactive: 0, //排序选中下标
      isbrand_checked: false, //品牌选中了
      brand_checked_title: "",//当前选中品牌
      isasc: true,   //true小到大排序
      brandmerge: true, //品牌合并，默认true没有滚动条
      duoxuanshow: true, //多选按钮展示情况
      iscompany: "",
      goods_list: [], //商品搜索结果列表
      brand_list: [], //品牌搜索结果列表

      options1: [], //面包屑，分类搜索
      options2: [],
      options3: [],
      value1: "",
      value2: "",
      value3: "",
      zhihover1: false,
      zhihover2: false,
      zhihover3: false,
    };
  },
  watch: {
    $route: {
      handler(newval) {
        console.log(newval.query)
        this.info.keyword = newval.query.keyword;
        if (newval.query.id) {
          this.info.cat = newval.query.id;
        } else {
          delete this.info.cat
          this.options1 = []
          this.options2 = []
          this.options3 = []
          this.value1 = ""
          this.value2 = ""
          this.value3 = ""
        }
        this.get_brand_list()
        this.search_goods();
      },
      immediate: true
    },
  },
  created() {
    this.iscompany = this.$route.path.startsWith("/company")
    this.get_brand_list();       //获取品牌信息
    if (this.$route.query.brandid && this.$route.query.brandtitle) {
      this.isbrand_checked = true;
      this.info.brand = this.$route.query.brandid;
      this.brand_checked_title = this.$route.query.brandtitle;
      this.search_goods();
    }
  },
  computed: {
    ...mapState(["user_iscompany", "token"])
  },
  mounted() {
    console.log(this.$route)
    if (this.token) {
      // if (this.user_iscompany) {
      //   this.$router.push({ name: "company_home" })
      // } else {
      //   this.$router.push({ name: "company_home" })
      // }
    }
  },
  methods: {
    // 获取品牌信息
    get_brand_list() {
      this.$get("brand/goods_list", this.info).then((res) => {
        console.log("品牌信息", res)
        let { data } = res;
        this.brand_list = Object.values(data.brands);

        if (data.cats.cat1) {
          this.options1 = data.cats.data1;
          this.options2 = data.cats.data2;
          this.options3 = data.cats.data3;
          this.value1 = { id: data.cats.category1, title: data.cats.cat1 };
          this.value2 = { id: data.cats.category2, title: data.cats.cat2 };
          this.value3 = { id: data.cats.category3, title: data.cats.cat3 };
        }
      });
    },
    // 获取指定产品信息
    search_goods() {
      this.$get(this.$api.homeSearchGoods, this.info).then((res) => {
        console.log("指定产品信息", res);
        if (res.code === 200) {
          this.total_data = res.pagination.total;
          let newresdata = res.data.map(item => {
            item.title = item.title
              .split(this.info.keyword)
              .join("<span style='color:#ca141e;'>" + this.info.keyword + "</span>");
            return item;
          }); // 以关键字分割为数组，再以新关键词连接数组
          this.goods_list = newresdata;
          // console.log("关键字替换后的新数组", newresdata,this.info.keyword);
        }
      });
    },
    // 更多品牌
    brandunflod() {
      this.brandmerge = false;
    },
    // 多选点击
    multiple() {
      this.duoxuanshow = false;
      this.brandmerge = false;
    },
    // 取消多选
    brandcancle() {
      this.duoxuanshow = true;
      this.brandmerge = true;
    },
    // 页数改变事件
    current_change(e) {
      this.info.page = e;
      this.search_goods();
    },

    // 品牌点击事件
    brand_click(brand, title) {
      this.brand_checked_title = title;
      this.isbrand_checked = true;
      this.info.brand = brand;
      this.info.sort = "ASC";
      this.search_goods();
    },
    // 品牌关闭事件
    brand_cancel_click() {
      this.brand_checked_title = "";
      this.isbrand_checked = false;
      this.info.brand = null;
      this.info.sort = "ASC";
      this.search_goods();
    },
    // 品牌收起
    brand_shouqi() {
      this.$refs.scrolltotop.scrollTop = 0; //滚动条到顶部位置
      this.brandmerge = true;
    },
    // 默认排序  以id排序，id从小到大
    sortbydefault() {
      if (this.sortactive == 0) return;
      this.sortactive = 0;
      this.info.order = "order";
      this.info.sort = "ASC";
      this.search_goods();
    },
    // 按照销量排序
    sortbybuy() {
      if (this.sortactive == 1) return;
      this.sortactive = 1;
      this.info.order = "sales";
      this.info.sort = "DESC";
      this.search_goods();
    },
    // 按照评论排序
    sortbycomment() {
      if (this.sortactive == 2) return;
      this.sortactive = 2;
      this.info.order = "comment";
      this.info.sort = "DESC";
      this.search_goods();
    },
    // 按照上架时间排序
    sortbytime() {
      if (this.sortactive == 3) return;
      this.sortactive = 3;
      this.info.order = "created_at";
      this.info.sort = "DESC";
      this.search_goods();
    },
    // 按照价格排序，从小到大
    sortbyprice() {
      this.sortactive = 4;
      this.info.order = "price";
      if (this.isasc) { //true为小到大
        this.info.sort = "ASC";
      } else {
        this.info.sort = "DESC";
      }
      this.isasc = !this.isasc;
      this.search_goods();
    },
    // 通过价格区间查询
    searchbyprice() {
      this.ifFocus = false;
      this.search_goods();
    },
    tosearch_catalog(id) {
      this.iscompany ? this.$router.push({ path: "/company/goodssearch", query: { id } }) : this.$router.push({ path: "/goodssearch", query: { id } })
      this.zhihover1 = this.zhihover2 = this.zhihover3 = false;

    }
  },

};
</script>
<style lang="scss" scoped>
@import "@/views/common/css/daohang.scss";
$sort_color: $main_color; //排序相关颜色
$left_font_color: #585858; //左边字体颜色
$right_font_color: #848484; //右侧字颜色

.focusinput {
  box-shadow: 1px 1px 3px 1px gray;
  background: #fff;
  input {
    box-shadow: 0 0 2px 0 gray;
  }
}
.price_sort {
  display: flex;
  align-items: center;
  margin-left: 10px;
  .price_sort_input {
    margin: 0 7px;
    input {
      width: 52px;
      padding: 3px;
      outline: none;
      border-width: 1px;
      border-left-color: #bdbdbd;
      border-top-color: #bdbdbd;
    }
  }
  .btn {
    width: 30px;
    height: 20px;
    font: 12px/20px "微软雅黑";
    color: #fff;
    text-align: center;
    background: $sort_color;
    padding: 0 6px;
    border-radius: 2px;
    opacity: 1;
    cursor: pointer;
    margin-right: 9px;
    margin-left: 3px;
  }
  .btn:hover {
    opacity: 0.8;
  }
}

.goods_where {
  border: 1px solid #efefef;
  box-sizing: border-box;
  font-size: 14px;
  .goods_cat_list {
    line-height: 50px;
    border-bottom: 1px solid #efefef;
    display: flex;
    .goods_cat_title {
      width: 100px;
      padding-left: 15px;
      background-color: #e6e6e6;
      color: $left_font_color;
      font-weight: 700;
    }
    ul {
      display: flex;
      padding-left: 5px;
      flex-wrap: wrap; //flex子元素自动换行
    }
    li {
      color: $right_font_color;
      cursor: pointer;
      padding: 5px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    li:hover {
      color: #ff8000;
    }
    .brandul {
      width: 910px;
      margin: 10px;
      padding-left: 0;
      .el-checkbox-group {
        display: flex;
        flex-wrap: wrap;
      }
      li {
        width: 100px;
        height: 40px;
        margin: 5px;
        padding: 0;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        // .el-checkbox {
        //   width: 100%;
        //   height: 100%;
        //   border: 1px solid #e6e6e6;
        //   box-sizing: border-box;
        // }
        // .el-checkbox.is-checked {
        //   border-color: $main_color;
        // }
        // .el-checkbox:hover {
        //   border-color: $main_color;
        // }
        // .el-checkbox /deep/.el-checkbox__input {
        //   display: none;
        // }
        // /deep/.el-checkbox__label {
        //   padding-left: 0;
        //   width: 100%;
        //   height: 100%;
        // }
        .brandimg {
          width: 100%;
          height: 100%;
        }
      }
      li:hover {
        border-color: $main_color;
      }
    }
    .brandul.brand_merge {
      height: 100px;
      overflow: hidden;
    }
    .brandul.brand_unfold {
      height: 200px;
      overflow-y: scroll;
    }

    .multiple_checked {
      text-align: center;
      span {
        margin-right: 10px;
        cursor: pointer;
        padding: 2px 8px;
        border-radius: 2px;
        font-size: 12px;
      }
      .itisok {
        color: #fff;
        background: $main_color;
        border: 1px solid $main_color;
        border-color: $main_color;
      }
      .itisno {
        color: #666;
        background: #f1f1f1;
        border: 1px solid #d8d8d8;
      }
    }
    .multiple span,
    .morebrand span {
      border: 1px solid #d8d8d8;
      padding: 2px 4px 2px 8px;
      cursor: pointer;
    }
    .multiple span:hover,
    .morebrand span:hover {
      color: $main_color;
      border-color: $main_color;
    }
  }
  .goods_cat_list:last-child {
    border-bottom: none;
  }
  .multiple {
    margin-right: 10px;
    color: #666;
  }
  .morebrand {
    color: #666;
  }
}

// 排序相关
.sortpart_div {
  height: 50px;
  display: flex;
  align-items: center;
  background: #f2f2f2;
  width: 1083px;
  .sortpart_ul {
    width: unset !important;
    padding-left: 0;
    height: 30px;
    margin-left: 10px;
    li {
      width: unset;
      height: 30px;
      padding: 5px 10px;
      box-sizing: border-box;
      font: 14px/20px "微软雅黑";
      background: #fff;

      -moz-user-select: none; /*火狐浏览器*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*ie浏览器*/
      user-select: none; /*其他浏览器*/
    }
    li.active {
      background: $sort_color;
      span {
        color: #fff !important;
      }
    }
    li:hover {
      color: $main_color;
      .iconfont {
        color: $main_color;
      }
    }
    .sorticon {
      font-size: 12px;
      color: #666;
    }
    .pricesort {
      position: relative;
      .iconfont {
        font-size: 14px;
      }
      .pricesort_price {
        padding-right: 14px;
      }
      .pricesort_up {
        position: absolute;
        right: 10px;
        padding: 0 1px;
      }
      .pricesort_down {
        right: 10px;
        top: 6px;
        padding: 0 1px;
        position: absolute;
      }
      .smalltobig {
        color: #bdbdbd !important;
      }
    }
  }
}

// 商品列表部分
.goods_list {
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap; //flex子元素自动换行
  .goods_list_item {
    width: 224px;
    height: 364px;
    box-sizing: border-box;
    margin: 0 20px 20px 0;
    dl {
      border: 1px solid #efefef;
      box-sizing: border-box;
      width: 224px;
      height: 364px;
      -webkit-transition: all 0.2s linear;
      transition: all 0.2s linear;
      .el-image {
        width: 180px;
        height: 180px;
        margin: 30px auto 25px auto;
        display: block;
      }
    }
    // 图片
    dl dt img {
      width: 180px;
      height: 180px;
      margin: 30px auto 25px auto;
      display: block;
    }
    // 价格
    dl dd.price {
      color: #e01d20;
      padding: 0 15px 8px 15px;
      font: 20px/20px "微软雅黑";
      overflow: hidden;
      .price_symbol {
        font-size: 12px;
      }
      font {
        font-size: 12px;
        color: #fff;
        background: blue;
        padding: 0 2px;
      }
    }
    // 描述标题
    dl dd.title {
      color: #666;
      padding: 0 15px;
      font: 12px/18px "微软雅黑";
      height: 36px;
      overflow: hidden;
      font-weight: 700;
    }
    dl dd.title:hover {
      color: #ff8000;
    }
    // 评论
    dl dd.comment {
      color: #999;
      padding: 0 15px;
      font: 12px/30px "微软雅黑";
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .comment_num {
        color: #ff8000;
      }
      .comment_buy {
        color: #ff8000;
      }
    }
  }
  .goods_list_item:nth-child(5n) {
    margin-right: 0;
  }
  .goods_list_item:hover dl {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: -3px;
  }
}

// 下方分页栏
.home_fy_block {
  text-align: end;
  margin-bottom: 40px;
}

.zhihoverclass {
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