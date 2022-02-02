<template>
  <!-- 首页的鼠标滚动顶部展示搜索栏 -->
  <transition name="fixedsearch">
    <div class="totop" v-show="scrolltoend">
      <div class="fixed_search width_center_1200">
        <div class="fixedlogo">
          <img v-if="!iscompany" width="180px" height="50px" src="/pc/sanmulogo.jpg" alt="三目商城" @click="$router.push({name:'home'})" />
          <img v-else width="180px" height="50px" src="/pc/sanmulogo2.jpg" alt="三目商城" @click="$router.push({name:'company_home'})" />
        </div>

        <div class="shop_top_seach">
          <ul class="clear">
            <li>
              <input class="search_input" v-model="keyword" type="text" placeholder="商品 关键字" @keyup.enter="search()" />
            </li>
            <li>
              <button class="search_button" type="button" @click="search()">
                <i class="iconfont iconsousuo"></i>
              </button>
            </li>
            <li>
              <div class="index_my_car">
                <span @click="tomycart()">
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
    </div>
  </transition>
</template>


<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      keyword: "", //搜索关键词
    }
  },
  props: {
    scrolltoend: {
      required: true
    },
    iscompany: {
      default: false
    }
  },
  computed: {
    ...mapState(["cart_count"]),
  },
  methods: {
    //触发搜索事件
    search() {
      if (this.keyword.trim() !== "") {
        this.iscompany ? this.$router.push({ name: "company_goodssearch", query: { keyword: this.keyword.trim() } }) : this.$router.push({ name: "goodssearch", query: { keyword: this.keyword.trim() } });
        this.keyword = "";
      }
    },
    tomycart() {
      this.iscompany ? this.$router.push("/company/mycart") : this.$router.push("/mycart");
    }
  },
}
</script>

<style lang="scss" scoped>
.totop {
  width: 100%;
  position: fixed;
  z-index: 999;
  background: #fff;
  top: 0;
  box-shadow: 1px 1px 2px 1px $main_color;
  .fixed_search {
    padding: 5px 0;
    display: flex;
    .fixedlogo {
      height: 50px;
    }
    .shop_top_seach {
      margin-top: 0;
      ul {
        height: 50px;
        display: flex;
        align-items: center;
      }
    }
  }
}
.shop_top_seach {
  margin-top: 44px;
  margin-left: 200px;
  ul li {
    float: left;
  }
  .search_input {
    width: 434px;
    height: 38px;
    padding: 10px;
    outline: 0;
    border: 2px solid $main_color;
    border-right: none;
    float: left;
    box-sizing: border-box;
    font-size: 12px;
  }
  .search_button {
    border: 2px solid $main_color;
    float: left;
    width: 38px;
    height: 38px;
    background: $main_color;
    color: #fff;
    outline: 0;
    text-align: center;
    cursor: pointer;
  }
  .search_button:hover {
    background: #b40404;
  }
  .index_my_car {
    height: 38px;
    border: 1px solid #e6e6e6;
    margin-left: 30px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 38px;
    padding: 0 20px;
    span:hover {
      color: $main_color;
    }
    span {
      margin-right: 20px;
      position: relative;
      cursor: pointer;
      i:nth-child(1) {
        font-size: 13px;
        padding-left: 3px;
      }
      i:nth-child(2) {
        font-size: 13px;
        padding-left: 1px;
      }
      a:hover {
        color: $main_color;
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
}

// 顶部固定定位过渡效果
// 进入——初始状态
.fixedsearch-enter {
  top: -70px;
}
// 进入——过渡状态
.fixedsearch-enter-active {
  transition: 1s;
}
// 进入——最终状态
.fixedsearch-enter-to {
  top: 0;
}
</style>
