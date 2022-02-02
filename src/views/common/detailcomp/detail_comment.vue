<template>
  <!-- 详情页下部（左店铺、右评论） -->
  <div class="goods_info_text width_center_1200">
    <!-- 左侧店铺 -->
    <div class="goods_info_text_left">
      <div class="store_info">
        <div class="store_info_title" ref="sanmu_title" style="position:relative;top:0;">三目自营</div>
        <div :class="firstchecked?'item_totop':''"></div>
        <ul ref="sanmu_content" style="margin-top:0px;">
          <li>
            <div class="name">商家：</div>
            <div class="detail">三目商城_办公用品_成都办公用品_四川文具批发_成都数码配件_文具派送_复印纸批发</div>
          </li>
          <li>
            <div class="name">电邮：</div>
            <div class="detail"> info@hi-sm.com</div>
          </li>
          <li>
            <div class="name">电话：</div>
            <div class="detail">4008298329</div>
          </li>
          <li>
            <div class="name">地址：</div>
            <div class="detail">成都市高新区海特国际广场3号楼202</div>
          </li>
        </ul>
      </div>

      <!-- 左侧店铺下得销售排行 -->
      <leftSaleList></leftSaleList>
    </div>

    <!-- 右侧详情评论等 -->
    <div class="goods_info_text_right">
      <div class="right_comment_part">
        <!-- 顶部一行 -->
        <div class="topline" style="position:relative;top:0;" ref="topline">
          <div class="topline_left">
            <a href="#toguige" :class="ischecked===0?'tabchecked':''" @click="detailchecked(0)">规格参数</a>
            <a href="#toxiangqing" :class="ischecked===1?'tabchecked':''" @click="detailchecked(1)">商品详情</a>
            <a href="#tocomment" :class="ischecked===2?'tabchecked':''" @click="detailchecked(2)">商品评价</a>
            <a href="#toshouhou" :class="ischecked===3?'tabchecked':''" @click="detailchecked(3)">售后保障</a>
          </div>
          <div class="goods_info_add_cart el-icon-shopping-cart-2" @click="$emit('sonaddcart')">
            <span>加入购物车</span>
          </div>
        </div>
        <!-- 参数规格 -->
        <div id="toguige" ref="topline_content" style="margin-top:0px;">
          <div :class="firstchecked?'item_totop_first':'firststatic'"></div>
          <DetailCommentGuige></DetailCommentGuige>
        </div>
        <!-- 详情 -->
        <div class="item_totop" id="toxiangqing"></div>
        <DetailCommentXiangQing :good_content="good_content"></DetailCommentXiangQing>
        <!-- 评论 -->
        <div class="item_totop" id="tocomment"></div>
        <div>
          <div class="goodscomment">商品评价</div>
          <div class="comment_list_top">
            <div class="left_bfb">
              {{ bfb }}
              <font style="font-size: 20px">%</font>
              <span>好评率</span>
            </div>
            <div class="right_comment_list">
              <ul>
                <li @click="change_comment_type(0)" :class="comment_type == 0 ? 'red' : ''">全部 ({{ this.comment_num.all }})</li>
                <li @click="change_comment_type(1)" :class="comment_type == 1 ? 'red' : ''">好评 ({{ this.comment_num.good }})</li>
                <li @click="change_comment_type(2)" :class="comment_type == 2 ? 'red' : ''">中评 ({{ this.comment_num.secondary }})</li>
                <li @click="change_comment_type(3)" :class="comment_type == 3 ? 'red' : ''">差评 ({{ this.comment_num.bad }})</li>
              </ul>
            </div>
          </div>
          <div class="user_content_blcok_line"></div>
          <div class="goods_info_comment_list" v-if="comment_list.length > 0">
            <ul>
              <li v-for="(item,index) in comment_list" :key="index">
                <div class="comment_avatar">
                  <el-image :src="item.avatar" fit="cover" lazy></el-image>
                </div>
                <div class="comment_nickname">{{item.user_name||"匿名用户"}}</div>
                <div class="comment_star">
                  <font>评价得分：</font>
                  <div class="store_star_in">
                    <el-rate disabled :value="item.score||5"></el-rate>
                  </div>
                </div>
                <div class="comment_content">
                  <span>评价内容：</span>
                  <font>{{item.content}}</font>
                </div>

                <!-- 评论图片 -->
                <div class="comment_images" v-if="item.pics.length>0">
                  <div class="comment_image" v-for="(vo,index) in item.pics" :key="index">
                    <el-image @click.native="handleoverflow" :preview-src-list="comment_image_arr" :src="vo.picture_url" lazy fit="cover"></el-image>
                  </div>
                </div>

                <div class="comment_dianzan">
                  <font>{{$filterTime(item.created_at)}}</font>
                  <div class="cannotchoose">
                    <!-- 点赞和评论数 -->
                    <font class="iconfont dianzan" :class="item.is_click==0?'':'dianzanyes'" @click="userdianzan(item.id,item.is_click)">&#xe697; {{item.click_num||0}}</font>
                    <font class="iconfont" @click="toCommmentDetail(item.id)">&#xe652; {{item.comment_num||0}}</font>
                  </div>
                </div>
              </li>
            </ul>
            <div class="home_fy_block" style="margin-top:40px">
              <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
            </div>
          </div>
          <div class="empty_order" v-else>
            <dl>
              <dt><img src="/pc/not-common-icon.png" alt="" /></dt>
              <dd>主人，该商品没有任何评价哟~</dd>
            </dl>
          </div>
        </div>
        <!-- 售后 -->
        <div class="item_totop" id="toshouhou"></div>
        <DetailCommentShouHou></DetailCommentShouHou>
      </div>
    </div>
  </div>

</template>

<script>
import leftSaleList from "@/views/common/detailcomp/left_sale_list"; // 左侧销售排行
import DetailCommentGuige from '@/views/common/detailcomp/detail_comment_guige.vue'; //商品详情
import DetailCommentXiangQing from '@/views/common/detailcomp/detail_comment_xiangqing.vue'; //商品详情
import DetailCommentShouHou from '@/views/common/detailcomp/detail_comment_shouhou.vue'; //商品售后
import { throttle } from 'throttle-debounce'; //节流防抖
export default {
  components: {
    leftSaleList, // 左侧销售排行
    DetailCommentGuige,//规则参数
    DetailCommentXiangQing, //详情
    DetailCommentShouHou, //售后
  },
  props: {
    categorys: {
      required: true,
    },
    good_id: {
      required: true,
    },
    good_content: {
      required: true
    }
  },
  watch: {
    fixed_dingwei: {  //用于处理定位
      handler(newVal) {
        let sanmu_title = this.$refs.sanmu_title;
        let topline = this.$refs.topline;
        let sanmu_content = this.$refs.sanmu_content;
        let topline_content = this.$refs.topline_content;
        if (newVal === "fixed") {
          sanmu_title.style.position = "fixed";
          topline.style.position = "fixed";
          sanmu_content.style.marginTop = "41px";
          topline_content.style.marginTop = "41px";
        }
        if (newVal === "relative") {
          this.firstchecked = false;
          sanmu_title.style.position = "relative";
          topline.style.position = "relative";
          sanmu_content.style.marginTop = "0px";
          topline_content.style.marginTop = "0px";
        }
      }
    },
    good_id: { //用于获取good_id
      handler(newval) {
        if (newval) {
          // console.log("newgood_id---", newval)
          this.get_comment_list(); //获取评论列表
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      ischecked: 0,  //选中tab的值
      fixed_dingwei: "relative", //tabs顶部项的定位方式：relative、fixed
      firstchecked: false,
      comment_type: 0,   //好评、中评、差评
      bfb: 100,  //好评率百分比
      comment_num: {  //评论数量
        good: 0,
        secondary: 0,
        bad: 0,
        all: 0,
      },

      total_data: 0, // 分页总条数
      page_size: 10,  // 分页每页条数
      current_page: 1,  // 分页当前页

      star: 5.0,       //评论的星星
      comment_image_arr: [], //评论图片
      comment_list: [], // 评论列表
    }
  },
  created() {
    this.ischecked = 0;
  },
  mounted() {
    window.addEventListener("scroll", this.commentfn);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.commentfn);
  },
  methods: {
    // 点赞，取消点赞
    userdianzan: throttle(500, function (id, is_click) {
      let token = localStorage.getItem("token")
      if (!token) {
        return this.$route.path.startsWith("/company") ? this.$router.push({ name: "company_login" }) : newUrl = this.$router.push({ name: "login" })
      }
      let action = "";
      if (is_click == 0) { //0可以点赞，1取消点赞
        action = "add";
      }
      if (is_click == 1) {
        action = "cancel"
      }
      this.$post("comment/praise", { token, comment_id: id, action }).then(res => {
        console.log("点赞返回", res)
        if (res.code == 200) {
          this.comment_list.forEach(item => {
            if (item.id == id) {
              if (item.is_click == 0) { //点赞了
                item.is_click = 1;
                item.click_num += 1
              } else {
                item.is_click = 0;
                item.click_num -= 1
              }
            }
          })
        }
      })
    }),
    // 选中项点击事件
    detailchecked(val) {
      this.ischecked = val;
      if (val === 0) { //第一个选中
        this.firstchecked = true;
      } else {
        this.firstchecked = false;
      }
    },
    // 滚动事件，切换固定定位与绝对定位
    commentfn() {
      this.$nextTick(() => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(this.$refs.sanmu_title.getBoundingClientRect().top, scrollTop) //888是元素距离可视区顶部的距离
        // console.log(scrollTop)
        if (scrollTop >= 887) {
          this.fixed_dingwei = "fixed";
        } else {
          this.fixed_dingwei = "relative";
        }
      })
    },
    // 查下评论状态
    change_comment_type: function (e) {
      this.comment_type = e;
      this.get_comment_list();
    },

    // 评论页数改变事件
    current_change: function (e) {
      this.current_page = e;
      this.get_comment_list();
    },

    // 获取评论列表
    get_comment_list() {
      let token = localStorage.getItem("token")
      this.$get("comment/list", {
        good_id: this.good_id,
        // comment_type: this.comment_type,
        // page: this.current_page,
        token
      }).then((res) => {
        console.log("该产品评论列表", res, res.pagination)
        this.page_size = res.pagination.page_size;
        this.total_data = res.pagination.total;
        this.current_page = res.pagination.current_page;

        this.comment_list = res.data; //评论列表
        let arr = []
        res.data.forEach(item => {
          if (item.pics.length > 0) {
            item.pics.forEach(vo => {
              arr.push(vo.picture_url);
            })
          }
        })
        this.comment_image_arr = arr;
        // this.bfb = res.data.bfb;
        // this.star = res.data.star;
        // this.comment_num = {
        //   good: res.data.good,
        //   secondary: res.data.secondary,
        //   bad: res.data.bad,
        //   all: res.data.all,
        // };
      });
    },
    handleoverflow(e) {
      document.body.style.overflow = "";
    },
    toCommmentDetail(id) {
      let newUrl = ""
      if (this.$route.path.startsWith("/company")) {
        newUrl = this.$router.resolve({ name: "company_commentdetail", query: { id, ...this.categorys } })
      } else {
        newUrl = this.$router.resolve({ name: "commentdetail", query: { id, ...this.categorys } })
      }
      window.open(newUrl.href, "_blank");
    }
  },
}
</script>

<style lang="scss" scoped>
// 整体大的布局
.goods_info_text {
  margin-top: 30px;
  display: flex;
  .goods_info_text_left {
    width: 234px;
    margin-right: 20px;
  }
  .goods_info_text_right {
    margin-top: 20px;
    width: 946px;
    box-sizing: border-box;
    min-height: 900px;
  }
}

// 左侧店铺（三目自营）
.store_info {
  margin-bottom: 15px;
  margin-top: 20px;
  border: 1px solid #f1f1f1;
  .store_info_title {
    background: linear-gradient(45deg, #666, #fafafa);
    color: white;
    box-sizing: border-box;
    width: 232px;
    z-index: 999;
    padding: 10px 0 10px 77px;
    font: 16px/20px "微软雅黑";
    border-bottom: 1px solid transparent;
  }
  ul {
    padding: 10px 0;
  }
  ul li {
    display: flex;
    .name {
      flex: 2;
      font: 12px/24px "微软雅黑";
      padding-left: 15px;
      color: #666;
    }
    .detail {
      flex: 6;
      font: 12px/24px "微软雅黑";
      padding: 0 15px;
      color: #666;
    }
  }
}
.item_totop {
  width: 100%;
  height: 41px;
}
.item_totop_first {
  width: 100%;
  height: 61px;
}
.firststatic {
  width: 100%;
  height: 20px;
}
.right_comment_part {
  width: 946px;
  .topline {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $main_color;
    background: #f2f2f2;
    z-index: 999;
    width: 946px;
    font: 16px/40px "微软雅黑";
    .topline_left {
      display: flex;
      line-height: 40px;
      a {
        color: #666;
        padding: 0 20px;
      }
      a:hover {
        color: $main_color;
      }
      .tabchecked {
        background: $main_color;
        color: #fff !important;
      }
    }
    .goods_info_add_cart {
      background: $main_color;
      line-height: 30px;
      height: 30px;
      margin: 5px 20px;
      border-radius: 3px;
      color: #fff;
      padding: 0 15px;
      font-size: 12px;
      cursor: pointer;
      i {
        margin-right: 6px;
      }
      span {
        margin-left: 6px;
      }
    }
  }
  .goodscomment {
    margin-top: 20px;
    font: 14px/39px "微软雅黑";
    color: #666;
    font-weight: 700;
    background: #fafafa;
    padding-left: 20px;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
  }
}

.after_sale_content {
  font-size: 14px;
}
// 评论顶部
.comment_list_top {
  margin-bottom: 15px;
  display: flex;
  .left_bfb {
    font-size: 48px;
    color: $main_color;
    line-height: 95px;
    width: 190px;
    text-align: center;
    position: relative;
    border-right: 1px solid #efefef;
    padding-right: 35px;
    span {
      font-size: 14px;
      color: #999;
      position: absolute;
      top: -16px;
      left: 140px;
    }
  }
  .right_comment_list {
    ul {
      display: flex;
    }
    ul li {
      flex-shrink: 0;
      line-height: 48px;
      margin-left: 35px;
      margin-top: 25px;
      color: #666;
      height: 48px;
      padding: 0 40px;
      font-size: 14px;
      background: #efefef;
      border-radius: 3px;
    }
    ul li.red {
      background: #efefef;
      color: $main_color;
    }
    ul li.red:hover {
      background: #e1e1e1;
      color: $main_color;
    }
    ul li:hover {
      background: #e1e1e1;
      color: #666;
      -webkit-transition: all 0.2s linear;
      transition: all 0.2s linear;
    }
  }
}

// 评论列表
.goods_info_comment_list {
  ul li {
    padding-top: 20px;
    border-bottom: 1px solid #efefef;
    padding-bottom: 30px;
  }
  ul li:after {
    clear: both;
    display: block;
    content: "";
  }
  .comment_avatar {
    width: 40px;
    height: 40px;
    float: left;
    border-radius: 50%;
    background: #efefef;
    margin-right: 15px;
  }
  .comment_nickname {
    font-size: 14px;
    color: #666;
    font-weight: bold;
  }
  .comment_star {
    height: 30px;
    font-size: 14px;
    color: #666;
    line-height: 30px;
    font {
      float: left;
      margin-right: 10px;
    }
    .store_star_in {
      float: left;
      margin-top: 5px;
    }
  }
  .comment_content {
    margin-left: 55px;
    font-size: 14px;
    color: #666;
  }
  .comment_images {
    margin-left: 55px;
    margin-top: 20px;
    height: 90px;
    .comment_image {
      height: 90px;
      width: 90px;
      border: 1px solid #efefef;
      margin-right: 20px;
      float: left;
    }
  }
  .comment_dianzan {
    line-height: 12px;
    margin-left: 55px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    font {
      color: #999;
      font: 12px/12px "微软雅黑";
      cursor: pointer;
    }
    .dianzan {
      margin-right: 20px;
    }
    .dianzanyes {
      color: $main_color;
    }
  }
}
</style>
