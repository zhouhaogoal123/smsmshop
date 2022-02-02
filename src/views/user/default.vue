<template>
  <div class="user_index">
    <div class="user_info_balance">
      <ul>
        <li>
          <dl>
            <dt>
              <i class="icon iconfont">&#xe646;</i>
            </dt>
            <dd>
              <span class="money_font" @click="iscompany?$router.push({name:'com_user_balance'}):$router.push({name:'user_balance'})">账号余额</span>
            </dd>
            <dd class="money">
              <span class="money_num" @click="iscompany?$router.push({name:'com_user_balance'}):$router.push({name:'user_balance'})">{{ balance || "0.00" }}</span> 元</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <i class="icon iconfont">&#xe609;</i>
            </dt>
            <dd>
              <span class="money_font" @click="iscompany?$router.push({name:'com_user_integral'}):$router.push({name:'user_integral'})">账号积分</span>
            </dd>
            <dd class="money">
              <span class="money_num" @click="iscompany?$router.push({name:'com_user_integral'}):$router.push({name:'user_integral'})">{{ integral || "0.00" }}</span> 积分</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <i class="icon iconfont">&#xe619;</i>
            </dt>
            <dd>
              <span class="money_font" @click="iscompany?$router.push({name:'com_user_red_envelope'}):$router.push({name:'user_red_envelope'})">我的红包</span>
            </dd>
            <dd class="money">
              <span class="money_num" @click="iscompany?$router.push({name:'com_user_red_envelope'}):$router.push({name:'user_red_envelope'})">{{ hongbao || "0" }}</span> 张
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="user_info_order_num_show">
      <ul>
        <li>
          <a @click="tomyorder(0)">
            <el-badge :value="paystatusnum.unpaid" class="item" :hidden="paystatusnum.unpaid==0">
              <i class="icon iconfont">&#xe88a;</i>
              <span>待支付</span>
            </el-badge>
          </a>
        </li>
        <li>
          <a @click="tomyorder(1)">
            <el-badge :value="paystatusnum.await" class="item" :hidden="paystatusnum.await==0">
              <i class="icon iconfont">&#xe606;</i>
              <span>待发货</span>
            </el-badge>
          </a>
        </li>
        <li>
          <a @click="tomyorder(2)">
            <el-badge :value="paystatusnum.delivery" class="item" :hidden="paystatusnum.delivery==0">
              <i class="icon iconfont">&#xe709;</i>
              <span>待收货</span>
            </el-badge>
          </a>
        </li>
        <li>
          <!-- <a @click="tomyorder(3)"> -->
          <a>
            <el-badge :value="paystatusnum.discuss" class="item" :hidden="paystatusnum.discuss==0">
              <i class="icon iconfont">&#xe623;</i>
              <span>待评论</span>
            </el-badge>
          </a>
        </li>
        <li>
          <router-link :to="iscompany?{ name: 'com_aftersalelist'}:{ name: 'aftersalelist'}">
            <el-badge :value="paystatusnum.service" class="item" :hidden="paystatusnum.service==0">
              <i class="icon iconfont">&#xe624;</i>
              <span>退换/售后</span>
            </el-badge>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 近期订单 -->
    <div class="user_index_myorder">
      <div class="user_index_myorder_title">
        近期订单
        <span>
          <router-link to="/user/order">查看更多</router-link>
        </span>
      </div>
      <div class="user_index_line"></div>
      <!-- 近期订单列表区域 -->
      <div v-if="!loading1&&listlength > 0" class="recent_order">
        <OrderList :order_list="recent_goodslist"></OrderList>
      </div>

      <!-- 没有订单则 -->
      <div class="empty_order" v-if="!loading1&&listlength==0">
        <dl>
          <dt><img src="/pc/not-common-icon.png" alt="" /></dt>
          <dd>主人，您近期还没有购买任何商品哟~</dd>
          <dd class="btn">
            <router-link :to="iscompany?'/company/home':'/'" target="_blank">前往商城</router-link>
          </dd>
        </dl>
      </div>
      <!-- loading放最后 -->
      <div v-loading="loading1" element-loading-custom-class="loadingclass" element-loading-text="加载中" element-loading-spinner="el-icon-loading"></div>
    </div>

    <!-- 近期收藏 -->
    <div class="user_index_myorder">
      <div class="user_index_myorder_title">
        近期收藏
        <span>
          <router-link :to="iscompany?'/company/user/fav':'/user/fav'">查看更多</router-link>
        </span>
      </div>
      <div class="user_index_line"></div>
      <div v-if="!loading2&&fav_list.length > 0">
        <div class="user_index_store_list">
          <ul>
            <li v-for="(v, k) in fav_list" :key="k">
              <router-link :to="iscompany?('/company/goodsdetail/' + v.good_sn):('/goodsdetail/' + v.good_sn)" target="_blank">
                <div class="user_order_goods_thumb">
                  <img width="40px" height="40px" :src="v.img_url" alt="图片加载失败" />
                </div>
                <div class="user_order_goods_title">{{ v.title }}</div>
              </router-link>
              <div class="user_order_goods_price">￥{{ v.price }}</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 没有收藏则 -->
      <div class="empty_order" v-if="!loading2&&fav_list.length == 0">
        <dl>
          <dt><img src="/pc/not-common-icon.png" alt="" /></dt>
          <dd>主人，您近期还没有收藏任何商品哟~</dd>
          <dd class="btn">
            <router-link :to="iscompany?'/company/home':'/'" target="_blank">前往商城</router-link>
          </dd>
        </dl>
      </div>
      <!-- loading放最后 -->
      <div v-loading="loading2" element-loading-custom-class="loadingclass" element-loading-text="加载中" element-loading-spinner="el-icon-loading"></div>
    </div>

    <!-- 游览历史 -->
    <div class="user_index_history_all">
      <div class="user_index_myorder_title">游览历史</div>
      <div class="user_index_line"></div>
      <div class="user_index_history" v-if="history_goods_list.length > 0">
        <ul>
          <li v-for="(v, k) in history_goods_list" :key="k">
            <router-link :to="iscompany?('/company/goodsdetail/' + v.good_sn):('/goodsdetail/' + v.good_sn)" target="_blank">
              <dl>
                <dt>
                  <img width="200px" height="200px" :src="v.img_url" alt="图片加载失败" class="picborder" />
                </dt>
                <dd class="title">{{ v.title }}</dd>
                <dd class="price">￥{{ v.price }}</dd>
              </dl>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 没有浏览历史则 -->
      <div class="empty_order" v-else>
        <dl>
          <dt><img src="/pc/not-common-icon.png" alt="" /></dt>
          <dd>主人，您近期还没有游览任何商品哟~</dd>
          <dd class="btn">
            <router-link :to="iscompany?'/company/home':'/'" target="_blank">前往商城</router-link>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OrderList from '@/views/common/orderlist.vue'
import { tomyorderMixin } from '@/views/common/mixin/page_jump.js';
export default {
  components: { OrderList },
  props: {},
  data() {
    return {
      fav_list: [], //近期收藏列表
      order_num: {}, //订单数量。包括待支付、待发货、售后等。
      user_info: {}, //用户信息
      history_goods_list: [], //近期历史记录
      recent_goodslist: {}, //最近订单信息
      listlength: 0, //最近订单列表长度
      token: "",
      paystatusnum: {}, //待支付、带评论等状态的数量
      iscompany: "",
      loading1: true,
      loading2: true,
    };
  },
  mixins: [tomyorderMixin],
  computed: {
    ...mapState(["balance", "integral", "hongbao"])
  },
  created() {
    this.token = localStorage.getItem("token");
    this.iscompany = localStorage.getItem("user_iscompany") == "true"
    this.getorder_census();
    this.get_history_goods();
    this.get_goods_fav();
    this.get_recent_goodlist();
  },
  methods: {
    // 游览历史
    get_history_goods: function () {
      let goods_json = localStorage.getItem("shop_goods_historys");
      let goods_list = [];
      if (!this.$isEmpty(goods_json)) {
        //如果有本地存储，转为json对象
        goods_list = JSON.parse(goods_json);
      }
      this.history_goods_list = goods_list;
    },
    // 近期订单列表
    get_recent_goodlist() {
      this.$get(this.$api.homeListOrder, { token: this.token }).then((res) => {
        console.log("近期订单", res);
        this.loading1 = false;
        this.listlength = res.data.length; //订单长度，判断最近是否有订单。用于处理没订单的css样式
        if (this.listlength > 0) {
          this.recent_goodslist = res.data.splice(0, 3); //最近三笔订单信息
          this.recent_goodslist.forEach(item => {
            item.details.forEach(son_item => {
              if (son_item.spec_text) {
                son_item.spec_text = JSON.parse(son_item.spec_text);
              }
            })
          })
        }
      });
    },
    // 近期收藏列表
    get_goods_fav() {
      this.$get(this.$api.homeFavList, { token: this.token }).then((res) => {
        this.loading2 = false;
        // console.log(res)
        if (res.code === 200) {
          this.fav_list = res.data;
        }
      });
    },
    // 带评论、待支付等各自数量
    getorder_census() {
      this.$get("order/census", { token: this.token }).then(res => {
        if (res.code == 200) {
          console.log("带评论、待支付等各自数量", res)
          this.paystatusnum = res.data;
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.user_index_line {
  height: 1px;
  background: #efefef;
  margin: 15px 0;
}
.user_index_history_all {
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  .user_index_myorder_title {
    border-left: 3px solid $main_color;
    padding-left: 20px;
  }
}
.user_index_history {
  border-bottom: none;
  margin-top: 20px;
  ul:after {
    content: "";
    clear: both;
    display: block;
  }
  ul li {
    float: left;
    margin-right: 32px;

    dl dd {
      width: 200px;
      overflow: hidden;
      font-size: 14px;
      text-align: center;
    }
    dl dd.title {
      color: #666;
      width: 180px;
      margin: 0 auto;
      height: 40px;
      line-height: 20px;
      margin-top: 10px;
    }
    dl dd.price {
      color: $main_color;
      margin-top: 15px;
    }
    .picborder {
      border: 1px solid #efefef;
    }
  }
  ul li:last-child {
    margin-right: 0;
  }
}

.user_index_myorder {
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  .user_index_myorder_title {
    border-left: 3px solid $main_color;
    padding-left: 20px;
    span {
      float: right;
      font-size: 12px;
      padding-right: 10px;
      a {
        font-size: 12px;
        line-height: 21px;
        color: #666;
      }
      a:hover {
        color: $main_color;
      }
    }
  }

  .user_index_store_list {
    margin: 20px 0;
    font-size: 12px;
    a:hover {
      color: $main_color;
    }
  }

  ul {
    border: 1px solid #efefef;
    li {
      padding: 20px;
      border-bottom: 1px solid #efefef;
      .user_order_goods_thumb {
        margin-right: 15px;
        float: left;
        img {
          border-radius: 3px;
        }
      }
      .user_order_goods_title {
        float: left;
        height: 40px;
        line-height: 40px;
        width: 600px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
      }
      .user_order_goods_title:hover {
        color: $main_color;
      }
      .user_order_goods_price {
        float: right;
        height: 40px;
        line-height: 40px;
        width: 180px;
        text-align: end;
        color: $main_color;
      }
      .user_order_goods_num {
        color: #999;
        line-height: 40px;
        text-align: center;
      }
    }

    li:last-child {
      border-bottom: none;
    }
    li:after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
.user_info_balance {
  ul li {
    background: #fff;
    width: 302px;
    margin-right: 20px;
    float: left;
    dl {
      padding: 20px;
    }
    dl:after {
      content: "";
      display: block;
      clear: both;
    }
    dl dt {
      color: #fff;
      background: #409eff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      line-height: 60px;
      text-align: center;
      margin-right: 20px;
      float: left;
      i {
        font-size: 24px;
      }
    }
    dl dd {
      margin-top: 8px;
    }
    dl dd.money {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    .money_font:hover {
      color: $main_color;
      cursor: pointer;
    }
    .money_num {
      font-weight: 700;
    }
    .money_num:hover {
      color: $main_color;
      cursor: pointer;
    }
  }
  ul li:nth-child(2) dl dt {
    background: #e6a23c;
  }
  ul li:nth-child(3) dl dt {
    background: #f56c6c;
  }
  ul li:last-child {
    margin-right: 0;
  }
  ul:after {
    content: "";
    display: block;
    clear: both;
  }
}
.user_info_order_num_show {
  background: #fff;
  padding: 20px;
  font-size: 14px;
  height: 30px;
  margin-top: 20px;
  ul li {
    float: left;
    text-align: center;
    width: 180px;
    a {
      cursor: pointer;
    }
    i {
      font-size: 22px;
      margin-right: 6px;
      position: absolute;
      left: -30px;
      top: -2px;
    }
  }
  ul li:nth-child(2) i {
    font-size: 26px;
    left: -33px;
    top: -5px;
  }
  ul li:last-child {
    margin-right: 0;
  }
}

.recent_order {
  .oneitem {
    margin-bottom: 20px;
  }
  .orderline {
    background: #efefef;
    font-size: 12px;
    line-height: 40px;
    margin-top: 5px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
  }
  ul {
    margin-bottom: 0;
    border-top: none;
  }
  li:nth-child(1) {
    border-top: 1px solid #efefef;
  }
  .attrfontdiv {
    font-size: 12px;
    line-height: 20px;
    color: #999;
    div {
      line-height: 40px;
    }
  }
  .goods_info {
    width: 320px;
    font-size: 12px;
    dl dt {
      width: 40px;
      height: 40px;
      background: #f8f8f8;
      float: left;
      margin-right: 15px;
    }
    dl dd {
      line-height: 20px;
      height: 40px;
      overflow: hidden;
      color: #666;
    }
    dl dd:hover {
      color: $main_color;
    }
  }
  .th_title {
    font-size: 12px;
    line-height: 40px;
    text-align: end;
    color: #999;
  }
}
</style>