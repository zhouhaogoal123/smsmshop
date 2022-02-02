<template>
  <!-- 发现好货 -->
  <div class="width_center_1200">
    <div class="shop_product_hot">
      <!-- 发现好货左侧 大图精美图 -->
      <div class="hot_img_left" @click="tofind_goods_list">
        <el-image src="/pc/hot.jpg" fit="cover"></el-image>
        <div class="hot_img_left_topfont">
          <div class="hot_img_left_topfont_top">发现好货</div>
          <div class="hot_img_left_topfont_bottom">
            do it
            <span class="iconfont" style="padding-left: 10px; font-size: 12px">&#xe6ac;</span>
          </div>
        </div>
      </div>
      <!-- 发现好货中部 点击轮播图 -->
      <div class="hot_img_center">
        <BannerHot @tofind_goods_detail="tofind_goods_detail"></BannerHot>
      </div>

      <!-- 发现好货右侧 自动轮播图 -->
      <div class="hot_img_right">
        <el-skeleton :loading="loading">
          <template slot="template">
            <el-skeleton-item variant="text" style="width: 190px; height: 280px;" />
          </template>

          <template>
            <el-carousel :interval="3000" arrow="never">
              <el-carousel-item v-for="item in hotpics" :key="item.id">
                <el-image :src="item.img_url" fit="cover" @click="tofind_goods_detail(item.good_sn)"></el-image>
                <div class="texthover">{{item.title}}</div>
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-skeleton>
      </div>

    </div>
  </div>
</template>

<script>
import BannerHot from "./banner_hot.vue";
import { setTimeout } from 'timers';
export default {
  components: { BannerHot },
  data() {
    return {
      hotpics: [], //推荐商品右侧轮播图（热销）
      loading: true,
    }
  },
  created() {
    setTimeout(() => {
      this.gethotpics();
    }, 500)
  },
  methods: {
    gethotpics() {
      // tag = 1/精品,2/新品,3/热销
      this.$get("goods/tag_list", { tag: 3, pagesize: 3 }).then(res => {
        console.log("右侧图轮播图", res)
        this.hotpics = res.data;
        if (res.data.length > 0) {
          this.loading = false;
        }
      })
    },
    tofind_goods_detail(good_sn) {
      if (this.$route.name == "home") {
        let newUrl = this.$router.resolve("/goodsdetail/" + good_sn);
        window.open(newUrl.href, "_blank");
      }
      if (this.$route.name == "company_home") {
        let newUrl = this.$router.resolve("/company/goodsdetail/" + good_sn);
        window.open(newUrl.href, "_blank");
      }
    },
    tofind_goods_list() {
      if (this.$route.name == "home") {
        let newUrl = this.$router.resolve({ name: "find_goods_list" });
        window.open(newUrl.href, "_blank");
      }
      if (this.$route.name == "company_home") {
        let newUrl = this.$router.resolve({ name: "company_find_goods_list" });
        window.open(newUrl.href, "_blank");
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.shop_product_hot {
  margin: 20px 0 40px 0;
  display: flex;
  .hot_img_left {
    width: 234px;
    height: 300px;
    position: relative;
    cursor: pointer;
    .el-image {
      width: 100%;
    }
    .hot_img_left_topfont {
      width: 150px;
      height: 100px;
      position: absolute;
      left: 50%;
      top: 20px;
      z-index: 22;
      background-color: rgba(0, 0, 0, 0.5);
      border-bottom-right-radius: 40px;
      transform: translateX(-50%);
      .hot_img_left_topfont_top {
        text-align: center;
        color: white;
        font: 30px/50px cursive;
      }
      .hot_img_left_topfont_bottom {
        text-align: center;
        color: wheat;
        font: 16px/30px cursive;
      }
      .hot_img_left_topfont_top:hover {
        color: $main_color;
      }
      .hot_img_left_topfont_bottom:hover {
        color: $main_color;
      }
    }
  }
  .hot_img_left:hover {
    box-shadow: 1px 2px 5px 0 black;
  }
  .hot_img_right {
    width: 206px;
    height: 300px;
    padding: 10px 8px;
    box-sizing: border-box;
    cursor: pointer;
    .el-carousel {
      width: 100%;
      height: 100%;
      /deep/.el-carousel__container {
        height: 280px;
      }
      /deep/.el-carousel__button {
        width: 20px;
      }
      .el-image {
        width: 100%;
        height: 280px;
      }
    }
  }
  .hot_img_right:hover {
    opacity: 0.9;
    .texthover {
      display: block;
    }
  }
  .texthover {
    width: 100%;
    text-align: center;
    position: absolute;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    line-height: 100px;
    display: none;
  }
}
</style>
