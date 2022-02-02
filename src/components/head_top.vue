<template>
  <!-- 头部最上一行 -->
  <div class="head">
    <div class="head_in">
      <div class="top_shop_left">
        <li>
          <!-- 根据ip定位到城市 -->
          <!-- <amap-city class="amapcity item"></amap-city> -->
        </li>
        <li v-if="tohomeshow">
          <i class="iconfont" style="padding-right:5px;font-weight:700;">&#xe656;</i>
          <router-link to="/" exact class="tohome">三目首页</router-link>
        </li>
      </div>

      <div class="top_shop_right">
        <ul>
          <li v-if="!token" class="item">
            <span @click="tologin">登录</span>
          </li>
          <li v-if="!token" class="item">
            <span @click="toregister">注册</span>
          </li>
          <li v-if="token" class="myallxiala" @mouseenter="ismyhover = true" @mouseleave="ismyhover = false">
            <div class="item_xiala" @click="touser">
              <span class="nickname">{{ user_info.nickname}}</span>
              <span class="iconfont icontubiao-"></span>
            </div>
            <div v-show="ismyhover" class="myhoverworld">
              <div class="line_one">
                <a @click="touser">
                  <img :src="user_info.avatar || '/pc/default_avatar.png'" class="avatar" />
                </a>
                <div class="loginout">
                  <div class="loginout_font1" @click="logout">退出</div>
                  <div class="loginout_font2">三目商城，欢迎您</div>
                </div>
              </div>
            </div>
          </li>
          <li v-if="token" style="color:#D8D8D8;">|</li>
          <li v-if="token" class="item" @click="toOnlineService">客户服务</li>
          <li style="color:#D8D8D8;">|</li>
          <li class="item">
            <a class="main_color" @click="tocompany">企业采购</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AmapCity from "./amapcity";
import { mapState } from 'vuex';
export default {
  name: "headtop",
  components: { AmapCity },
  data() {
    return {
      ismyhover: false, //悬停展示姓名头像框
      tohomeshow: false, //是否展示回到首页
    };
  },
  computed: {
    ...mapState(["user_info", "token"]),//用户信息
  },
  watch: {
    // 监听路由变化，用于修改头部登录状态
    $route: {
      handler(newVal) {
        // 首页不加回到三目首页
        newVal.name == "home" ? this.tohomeshow = false : this.tohomeshow = true;
      },
      immediate: true, //刚开始渲染就执行一次。故而此时如果有获取节点的操作会报错
    },
  },
  methods: {
    touser() {
      let newUrl = this.$router.resolve('/user');
      window.open(newUrl.href, "_blank");
    },
    // 如果没有token，跳转到登录页，如果有token刷新页面
    tologin() {
      this.$router.push({ name: "login" });
    },
    toregister() {
      this.$router.push({ name: "register" });
    },
    tocompany() {
      let newUrl = this.$router.resolve({ name: "company_index" });
      window.open(newUrl.href, "_blank");
    },
    // 退出按钮，回到登录页面在拦截器里面已经做过处理了，这里就不单独处理了
    logout() {
      this.$post(this.$api.homeLogout, { token: this.token }).then((res) => {
        localStorage.clear();
        //退出登录将vuex的user_info也删除。不然光是路由跳转、页面不刷新、vuex还是有数据
        this.$store.commit("setToken", "");
        this.$store.commit("setUserInfo", {});
        this.$store.commit("setCartCount", 0);
        this.$store.commit("setIsCompany", "false");

        // 退出成功，调到登录页
        this.$router.push("/login");
      });
    },
    toOnlineService() {
      let newUrl = this.$router.resolve({ name: "online_service" })
      window.open(newUrl.href, "_blank")
    }
  },
};
</script>
<style lang="scss" scoped>
.tohome:hover {
  color: $main_color;
}
.item {
  cursor: pointer;
}
.item:hover {
  color: $main_color;
}
.myallxiala {
  position: relative;
  cursor: pointer;
  .item_xiala {
    width: 100%;
    height: 30px;
    line-height: 30px;
    .nickname {
      display: inline-block;
      padding-right: 3px;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: top;
    }
    .icontubiao- {
      font-size: 12px;
      padding-left: 5px;
    }
    .company_name {
      color: $company_font;
      background: #0a0a2a;
      border-radius: 3px;
      padding: 1px 2px;
    }
  }
  .myhoverworld {
    cursor: default;
    position: absolute;
    z-index: 999;
    background: #fff;
    box-shadow: 0 1px 1px 0 gray;
    width: 200px;
    transform: translateX(-5px);
    padding: 10px;
  }
}
.myallxiala:hover {
  background-color: #fff;
  box-shadow: 0 0 1px 0 gray;
  .nickname {
    color: $main_color;
  }
}
.line_one {
  display: flex;
  justify-content: space-between;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .avatar:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  .loginout {
    .loginout_font1 {
      text-align: right;
    }
    .loginout_font1:hover {
      color: $main_color;
      cursor: pointer;
    }
    .loginout_font2 {
      color: gray;
    }
  }
}

.head {
  border-bottom: 1px solid #efefef;
  height: 30px;
  background: #f9f9f9;
  font-size: 12px;
  line-height: 30px;

  .head_in {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .top_shop_left {
      float: left;
      li {
        float: left;
        padding: 0 5px;
      }
      .amapcity {
        float: left;
        padding: 0 5px;
      }
    }
    // 文字滚动，公告栏
    .top_shop_center {
      position: absolute;
      width: 600px;
      left: 50%;
      margin-left: -350px;
    }
    .top_shop_right {
      float: right;
      ul li {
        float: left;
        padding: 0 5px;
      }
    }
  }
  .head_in:after {
    display: block;
    clear: both;
    content: "";
  }
}
</style>