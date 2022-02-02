<template>
  <div>
    <HeadTop></HeadTop>

    <!-- 中间栏 -->
    <div class="company">
      <div class="componey_center">
        <div class="componey_logo">三目企业购</div>
        <ul v-if="!token">
          <li>
            <div class="user_center" @click="toOtherPage('company_index')">会员中心</div>
            <div class="botline"></div>
          </li>
          <li @click="toOtherPage('company_home')" class="tocompanyhome">企业采购首页</li>
        </ul>
      </div>
      <div class="componey_in">
        <h1>企业会员
          <span>专享权益</span>
        </h1>
        <ul class="four">
          <li class="iconfont">&#xe64e; 采购降本</li>
          <li class="iconfont">&#xe64e; 专属服务</li>
          <li class="iconfont">&#xe64e; 超值特权</li>
          <li class="iconfont">&#xe64e; 便捷管理</li>
        </ul>
        <ul class="more">
          <li>
            <div class="more_icon">
              <i class="iconfont">&#xe651;</i>
            </div>
            <div>会员专享价</div>
            <div class="more_detail">精选商品，底价专享</div>
          </li>
          <li>
            <div class="more_icon">
              <i class="iconfont">&#xe630;</i>
            </div>
            <div>品类折扣</div>
            <div class="more_detail">专属品类优惠</div>
          </li>
          <li>
            <div class="more_icon">
              <i class="iconfont">&#xe6e8;</i>
            </div>
            <div>发票中心</div>
            <div class="more_detail">发票集中管理</div>
          </li>
          <li>
            <div class="more_icon">
              <i class="iconfont">&#xe6c3;</i>
            </div>
            <div>增值权益</div>
            <div class="more_detail">专属服务特权</div>
          </li>
          <li>
            <div class="more_icon">
              <i class="iconfont">&#xe649;</i>
            </div>
            <div>采购账单</div>
            <div class="more_detail">便捷开票服务</div>
          </li>
        </ul>
        <div class="register" @click="toOtherPage('company_register')">立即注册</div>
        <div class="login" @click="toOtherPage('company_login')">已是会员，立即登录</div>
      </div>
    </div>

    <!-- 会员优选商品 -->
    <div class="goods">
      <div class="goods_center">
        <div class="goods_title">
          <div class="line toleft"></div>
          <h1 class="content">会员优选商品</h1>
          <div class="line toright"></div>
        </div>
        <div class="goods_list">
          <li v-for="item in goodsinfo" :key="item.id" @click="togoodsdetail(item.good_sn)">
            <div class="pic">
              <el-image :src="item.img_url"></el-image>
            </div>
            <div class="title" :title="item.title">{{item.title}}</div>
            <div class="smprice">三目价: ￥{{item.price}}</div>
            <div class="companyprice">￥{{item.business_price}}
              <span>企业价</span>
            </div>
          </li>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <ShopFoot class="footpart"></ShopFoot>

    <!-- 顶部固定栏 -->
    <div class="fixedtop" v-if="hiddenOrShow">
      <div class="fixedtop_center">
        <div class="componey_logo">三目企业购</div>
        <div class="btn">
          <div class="btn_register item" @click="toOtherPage('company_register')">企业注册</div>
          <div class="btn_login item " @click="toOtherPage('company_login')">立即登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadTop from "@/components/head_top_company.vue";
import ShopFoot from "@/components/shop_foot.vue";
import { mapState } from 'vuex';
export default {
  name: "company_home",
  components: { HeadTop, ShopFoot },
  data() {
    return {
      showstatus: false,
      hiddenOrShow: false,
      goodsinfo: []
    }
  },
  computed: {
    ...mapState(["token", "user_iscompany"]),
  },
  watch: {
    showstatus: {
      handler(newval) {
        this.hiddenOrShow = newval;
      },
      immediate: true
    },
  },
  created() {
    this.get_goodsinfo();
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to, from)
    let token = localStorage.getItem("token")
    let user_iscompany = localStorage.getItem("user_iscompany")
    if (from.name == "company_login" || (token && user_iscompany)) { //如果是登录页面过来的
      next("company/home")
    } else if (from.name == "login") {
      next("/")
    } else {
      next()
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollfn, true)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollfn, true)
  },
  methods: {
    togoodsdetail(goodid) {
      let newUrl = this.$router.resolve("/company/goodsdetail/" + goodid)
      window.open(newUrl.href, "_blank");
    },
    get_goodsinfo() {
      this.$get("goods/business", { token: this.token, pagesize: 30 }).then(res => {
        console.log(res)
        this.goodsinfo = res.data;
      })
    },
    toOtherPage(pagename) {
      this.$router.push({ name: pagename });
    },
    scrollfn() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log("中转页添加的滚动事件", scrollTop)
      scrollTop > 600 ? this.showstatus = true : this.showstatus = false;
    }
  },
}
</script>


<style lang="scss" scoped>
.company {
  background: $company_font;
  width: 100%;
  height: 550px;
  margin-bottom: 200px;
  .componey_center {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: auto;
    .componey_logo {
      margin: 20px;
      width: 200px;
      font-size: 30px;
      font-weight: 700;
    }
    ul {
      margin: 20px 0;
      width: 300px;
      display: flex;
      line-height: 35px;
      li {
        flex: 1;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
      }
      .tocompanyhome {
        font-weight: 700;
        color: #333;
      }
      .user_center {
        font-weight: 700;
      }
      .botline {
        width: 100px;
        height: 3px;
        margin: auto;
        background: linear-gradient(to right, black, #fff);
      }
    }
  }
  .componey_in {
    height: 600px;
    width: 1200px;
    margin: auto;
    background: #0a0a2a;
    border-radius: 30px;
    box-shadow: 0 0 20px 0 #333;
    padding: 40px;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    h1 {
      margin: 20px 0;
      span {
        color: $company_font;
      }
    }
    .four {
      display: flex;
      margin: 40px 0;
      li {
        flex: 1;
      }
      .iconfont {
        font-size: 20px;
      }
    }
    .more {
      display: flex;
      justify-content: space-between;
      li {
        width: 160px;
        height: 160px;
        .more_icon {
          margin: 20px 0;
          .iconfont {
            color: $company_font;
            font-size: 50px;
          }
        }
        .more_detail {
          font-size: 12px;
          line-height: 30px;
          color: #e6e6e6;
        }
      }
      li:hover {
        background: #6e6e6e;
      }
    }
    .register {
      background: $company_font;
      width: 300px;
      margin: 80px auto 30px;
      border-radius: 30px;
      line-height: 60px;
      color: #111;
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;
    }
    .login {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.goods {
  background: #f5f5f5;
  .goods_center {
    width: 1200px;
    margin: 50px auto 0;
    .goods_title {
      width: 500px;
      margin: auto;
      padding: 50px 0;
      display: flex;
      align-items: center;
      .line {
        width: 120px;
        height: 2px;
      }
      .line.toleft {
        background: linear-gradient(to left, $main_color, $company_font);
      }
      .line.toright {
        background: linear-gradient(to right, $main_color, $company_font);
      }
      .content {
        width: 220px;
        margin: auto;
        text-align: center;
        color: #444;
      }
    }
    .goods_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        flex-shrink: 0;
        width: 230px;
        height: 300px;
        background: #fff;
        margin-bottom: 10px;
        padding: 20px;
        box-sizing: border-box;
        cursor: pointer;
        .pic {
          width: 150px;
          height: 150px;
          padding: 20px;
          padding-top: 0;
        }
        .title {
          color: #666;
          font: 14px/18px "微软雅黑";
          height: 36px;
          overflow: hidden;
        }
        .smprice {
          font-size: 12px;
          color: #999;
          line-height: 12px;
          margin: 10px 0 5px;
        }
        .companyprice {
          color: #333;
          font-size: 14px;
          font-weight: 700;
          span {
            font-size: 12px;
            color: #fff;
            background: blue;
            margin-left: 5px;
          }
        }
      }
      li:hover {
        .pic {
          opacity: 0.9;
        }
      }
    }
  }
}
.footpart {
  padding-top: 80px;
}
.fixedtop {
  background: #fff;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 1px 1px 5px 0 #999;
  .fixedtop_center {
    width: 1200px;
    height: 100px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .componey_logo {
      font-size: 30px;
      width: 200px;
      font-size: 30px;
      font-weight: 700;
      line-height: 100px;
    }
    .btn {
      display: flex;
      align-items: center;
      .item {
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        border-radius: 30px;
      }
      .btn_register {
        background: $company_font;
        color: #fff;
        border: 2px solid transparent;
        margin-right: 20px;
        cursor: pointer;
      }
      .btn_login {
        border: 2px solid $company_font;
        color: $company_font;
        cursor: pointer;
      }
    }
  }
}
</style>
