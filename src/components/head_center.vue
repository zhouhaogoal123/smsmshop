<template>
  <div :class="iscompany&&'companybg'">
    <div class="width_center_1200">
      <div class="logosearch">
        <!-- 左侧logo -->
        <div class="shop_logo">
          <router-link to="/" v-if="!iscompany">
            <img src="/pc/homeone.png" />
          </router-link>
          <router-link to="/company/home" v-else>
            <img src="/pc/homemuch.png" />
          </router-link>
        </div>
        <!-- 右侧查询 -->
        <div class="shop_top_seach cannotchoose">
          <ul>
            <li>
              <input class="search_input" v-model="keyword" type="text" placeholder="商品 关键字" @keyup.enter="search()" />
            </li>
            <li>
              <button class="search_button" type="button" @click="search()">
                <i class="iconfont iconsousuo"></i>
              </button>
            </li>
            <li class="mycar" @click="tomycart()">
              <div class="index_my_car">
                <span>
                  <a>我的购物车
                    <i class="iconfont icongouwuche1"></i>
                  </a>
                  <div class="shop_car_dot">{{cart_count>99?'99+':cart_count}}</div>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右上公告轮播 -->
      <BannerFont class="lunbofont"></BannerFont>
    </div>
  </div>
</template>


<script>
import BannerFont from './banner_font';
import { mapState } from 'vuex';
export default {
  components: { BannerFont },
  data() {
    return {
      keyword: ""
    }
  },
  props: {
    iscompany: {
      default: false
    }
  },
  computed: {
    ...mapState(["cart_count", "user_iscompany"]),
  },
  methods: {
    // 触发搜索事件
    search() {
      if (this.keyword.trim() !== "") {
        this.iscompany ? this.$router.push({ name: "company_goodssearch", query: { keyword: this.keyword.trim() } }) : this.$router.push({ name: "goodssearch", query: { keyword: this.keyword.trim() } });
        this.keyword = "";
      }
    },
    // 点击跳转到我的购物车页面(登录的情况下)
    tomycart() {
      if (this.$route.name === "mycart" || this.$route.name === "company_mycart") { return }
      this.iscompany ? this.$router.push("/company/mycart") : this.$router.push("/mycart");
    },
  },
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 360px) and(max-width: 1920px) {
  .companybg {
    width: 100%;
    margin: auto;
    // background: url("/pc/integral_bg.jpg") no-repeat center;
    background: url("/pc/integral_bg.jpg") 100% center;
  }
}
@media screen and (min-width: 1920px) {
  .companybg {
    width: 1920px;
    margin: auto;
    // background: url("/pc/integral_bg.jpg") no-repeat center;
    background: url("/pc/integral_bg.jpg") 100% center;
  }
}
.width_center_1200 {
  position: relative;
}
.lunbofont {
  position: absolute;
  top: 10px;
  right: 0;
}
.logosearch {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.shop_logo {
  // margin: 0 60px;
  img {
    object-fit: fill;
    width: 400px;
    height: 80px;
  }
}
.shop_top_seach {
  ul {
    display: flex;
  }
  .search_input {
    width: 434px;
    height: 38px;
    padding: 10px;
    outline: 0;
    border: 1px solid #efefef;
    border-right: none;
    box-sizing: border-box;
    font-size: 12px;
  }
  .search_button {
    border: 1px solid #efefef;
    width: 38px;
    height: 38px;
    background: #fff;
    outline: 0;
    text-align: center;
    cursor: pointer;
  }
  .search_button:hover {
    color: #fff;
    background: #333;
  }
  .mycar {
    display: flex;
    cursor: pointer;
  }
  .index_my_car {
    background: #fff;
    height: 38px;
    border: 1px solid #efefef;
    margin-left: 30px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 38px;
    padding: 0 20px;
    span {
      margin-right: 20px;
      position: relative;
      i:nth-child(1) {
        font-size: 13px;
        padding-left: 3px;
      }
      i:nth-child(2) {
        font-size: 13px;
        padding-left: 1px;
      }
      .shop_car_dot {
        position: absolute;
        top: -12px;
        line-height: 16px;
        background: $main_color;
        padding: 0 4px;
        color: #fff;
        border-radius: 4px;
        right: -18px;
      }
    }
    span:last-child {
      margin-right: 0;
    }
  }
  .mycar:hover span a {
    color: $main_color;
  }
}
</style>
