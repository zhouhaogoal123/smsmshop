<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { mixin } from '@/views/common/mixin/refresh_token.js';
import { clearInterval, setInterval } from 'timers';
export default {
  data() {
    return {
      isRouterAlive: true,
      timer: null,
    }
  },
  mixins: [mixin],
  provide() {
    return {
      reload: this.reload
    }
  },
  mounted() {
    // 如果cookie没有值，清空本地存储（目前设置的，每次浏览器关闭就会清空cookie）
    if (!this.$getCookie("token")) {
      localStorage.clear()
      for (let key in this.$store.state) {
        this.$store.state[key] = ''
      }
    }

    // 定时刷新token
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.refreshToken();
    }, 30 * 60 * 1000) // 30分钟刷新一次token

    // 监听token变化
    window.addEventListener("storage", this.storageChange);
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    storageChange(e) {
      if (e.key == "token") {
        if (!e.oldValue && e.newValue) { //没有token，然后新值有了token，证明登录成功，刷新页面，同步vuex
          this.$router.go(0)
        }
      }
    }
  },
  // 清空定时器
  beforeDestroy() {
    clearInterval(this.timer)
    window.removeEventListener("storage", this.storageChange);
  }
}
</script>
<style lang="scss">
#app,
html,
body,
.sanmu {
  height: 100%;
}
// el-image图片加载中样式
.lazypic .el-image__placeholder {
  background: url(/pc/loadingbg.jpg) !important;
  background-size: cover;
}
// router-link选中类名样式
.user_cat .userlinkactive {
  color: #fff !important;
  background: $main_color;
  padding:0 5px;
}
</style>

