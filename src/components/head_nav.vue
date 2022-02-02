<template>
  <div class="shop_top_nav">
    <div class="width_center_1200">
      <div class="shop_top_nav_left" @mouseenter="subnav_show || (subnav = true)" @mouseleave="subnav_show || (subnav = false)">
        <div class="allgoods_top cannotchoose" @click="to_allgoodstype">全部商品分类</div>
        <leftBar v-show="subnav"></leftBar>
      </div>
      <div class="shop_top_nav_right">
        <ul>
          <li>
            <router-link :to="iscompany?'/company/home':'/'">首页</router-link>
          </li>
          <!-- <li>
            <router-link :to="iscompany?'/company/integral':'/integral'" target="_blank" tag="a">积分商城</router-link>
          </li> -->
          <li>
            <a @click="tooffice">场景办公</a>
          </li>
          <li>
            <a href="http://www.cdsm.com.cn/?m=home&c=Lists&a=index&tid=3" target="_blank">新闻中心</a>
          </li>
        </ul>
      </div>
      <div class="shop_right_bottom" v-if="newsShow">
        <div class="part1">
          <div class="pic">
            <img :src="user_info.avatar" v-if="token&&user_info" @click="touser">
            <img src="/pc/default_avatar.png" @click="tologin" v-else>
          </div>
          <div>hi，欢迎来到三目商城</div>
          <div class="login_register" v-if="!token">
            <span @click="tologin">用户登录</span>
            <span @click="toregister">立即注册</span>
          </div>
          <div v-else @click="touser" class="username">{{user_info.nickname}}
            <span v-if="token&&iscompany" class="company_font">（企业会员）</span>
          </div>
        </div>
        <div class="part2">
          <p>新闻资讯</p>
          <ul>
            <li v-for="(item,index) in newsList" :key="index">
              <span @click="tonews">{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftBar from "@/components/leftbar.vue";
import { mapState } from 'vuex';
export default {
  components: {
    leftBar,
  },
  data() {
    return {
      subnav: false, //nav展示
      subnav_show: false,
      newsShow: false,
      newsList: ["我是1只小呀小跳蛙", "我是2只小呀小跳蛙", "我是3只小呀小跳蛙", "我是4只小呀小跳蛙", "我是5只小呀小跳蛙", "我是6只小呀小跳蛙", "我是7只小呀小跳蛙"]
    };
  },
  computed: {
    ...mapState(["token", "user_info"]),
  },
  props: {
    iscompany: {
      default: false
    },
  },
  watch: {
    $route: {
      handler(newval) {
        // console.log("newval", newval)
        if (this.$route.name == "home" || this.$route.name == "company_home") {
          this.subnav_show = true;
          this.subnav = true;
          this.newsShow = true;
        } else {
          this.subnav_show = false;
          this.subnav = false;
          this.newsShow = false;
        }
      },
      immediate: true,
    }
  },
  methods: {
    to_allgoodstype() {
      if (this.iscompany) {
        this.$router.push("/company_allgoodstype")
      } else {
        this.$router.push("/allgoodstype")
      }
    },
    tologin() {
      this.$route.name == "company_home" ? this.$router.push({ name: "company_login" }) : this.$router.push({ name: "login" })
    },
    toregister() {
      this.$route.name == "company_home" ? this.$router.push({ name: "company_register" }) : this.$router.push({ name: "register" })
    },
    touser() {
      let newUrl = ""
      this.iscompany ? newUrl = this.$router.resolve({ name: "com_user_default" }) : newUrl = this.$router.resolve({ name: "user_default" })
      window.open(newUrl.href, "_black")
    },
    tonews() {
      let type = ""
      this.$route.name == "company_home" ? type = "co" : type = "us"
      let newUrl = this.$router.resolve({ path: "/news", query: { type } })
      window.open(newUrl.href, "_black")
    },
    tooffice() {
      if (this.$route.path == "/company/officework" || this.$route.path == "/officework") {
        return location.reload();
      }
      this.iscompany ? this.$router.push("/company/officework") : this.$router.push("/officework")
    }
  },
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
.shop_head {
  background: #fff;
}
.shop_top_nav {
  height: 40px;
  background: #333;
  font-size: 14px;
  line-height: 40px;
  color: #fff;
  .shop_top_nav_left {
    float: left;
    width: 240px;
    background: $main_color;
    box-sizing: border-box;
    position: relative;
    text-align: center;
    .allgoods_top {
      cursor: pointer;
      font-weight: 500;
      letter-spacing: 1px;
    }
    .allgoods_top:hover {
      background: #fe2e2e;
    }
  }
  .shop_top_nav_right {
    float: left;
    ul li {
      float: left;
    }
    ul li a {
      line-height: 40px;
      padding: 0 60px;
      color: #fff;
      display: block;
      cursor: pointer;
    }
    ul li a:hover {
      background: #777;
    }
  }
}

.width_center_1200 {
  position: relative;
}
.shop_right_bottom {
  position: absolute;
  right: 0;
  top: 39px;
  z-index: 900;
  width: 200px;
  height: 450px;
  padding: 10px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  font-size: 12px;
  .part1 {
    line-height: 30px;
    .pic {
      height: 70px;
    }
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      cursor: pointer;
    }
    .login_register {
      line-height: 25px;
      span {
        padding: 0 6px;
      }
      span:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .username:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .part2 {
    margin-top: 50px;
    text-align: left;
    p {
      font-size: 13px;
      font-weight: 700;
      line-height: 30px;
      border-bottom: 1px solid #fff;
    }
    li {
      list-style-type: square;
      list-style-position: inside;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        line-height: 30px;
      }
      span:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
