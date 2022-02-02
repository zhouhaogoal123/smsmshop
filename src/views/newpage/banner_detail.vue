<template>
  <!-- 首页banner详情 -->
  <div>
    <slot name="myheadtop"></slot>

    <HeadTopCompany v-if="iscompany"></HeadTopCompany>
    <HeadTop v-else></HeadTop>

    <!-- 相似宝贝 -->
    <el-skeleton :loading="similarloading">
      <template slot="template">
        <ul class="width_center_1200 similar">
          <li class="type_title"></li>
          <li v-for="item in 19" :key="item">
            <el-skeleton-item variant="image" style="width: 230px; height: 300px;" />
          </li>
        </ul>
      </template>

      <template>
        <ul class="width_center_1200 similar">
          <li class="type_title"></li>
          <li v-for="item in bannerlist" :key="item.id" class="good_item" @click="togooddetail(item.good_sn)">
            <el-image :src="item.img_url" fit="cover"></el-image>
            <div class="price_part">
              <span class="sanmu_price">￥{{item.price}}</span>
            </div>
          </li>
        </ul>
      </template>
    </el-skeleton>

    <!-- 搭配推荐 -->
    <el-skeleton :loading="tuijianloading">
      <template slot="template">
        <ul class="width_center_1200 tuijian">
          <li class="type_title"></li>
          <li v-for="item in 19" :key="item">
            <el-skeleton-item variant="image" style="width: 230px; height: 300px;" />
          </li>
        </ul>
      </template>

      <template>
        <ul class="width_center_1200 tuijian">
          <li class="type_title"></li>
          <li v-for="item in tuijianlist" :key="item.id" class="good_item" @click="togooddetail(item.good_sn)">
            <el-image :src="item.img_url" fit="cover" lazy></el-image>
            <div class="price_part">
              <span class="sanmu_price">￥{{item.price}}</span>
            </div>
          </li>
        </ul>
      </template>
    </el-skeleton>

    <!-- 猜你喜欢 -->
    <el-skeleton :loading="ulikeloading">
      <template slot="template">
        <ul class="width_center_1200 ulike">
          <li class="type_title"></li>
          <li v-for="item in 19" :key="item">
            <el-skeleton-item variant="image" style="width: 230px; height: 300px;" />
          </li>
        </ul>
      </template>

      <template>
        <ul class="width_center_1200 ulike">
          <li class="type_title"></li>
          <li v-for="item in ulikelist" :key="item.id" class="good_item" @click="togooddetail(item.good_sn)">
            <el-image :src="item.img_url" fit="cover" lazy></el-image>
            <div class="price_part">
              <span class="sanmu_price">￥{{item.price}}</span>
            </div>
          </li>
        </ul>
      </template>
    </el-skeleton>

    <ShopFoot></ShopFoot>
  </div>
</template>

<script>
import HeadTop from "@/components/head_top.vue";
import HeadTopCompany from "@/components/head_top_company.vue";
import ShopFoot from '@/components/shop_foot.vue';
export default {
  components: { HeadTop, HeadTopCompany, ShopFoot },
  data() {
    return {
      banner_keyword: "",
      limit: 19,
      bannerlist: [], //banner列表
      tuijianlist: [], //推荐列表
      ulikelist: [],  //猜你喜欢列表
      similarloading: true,
      tuijianloading: true,
      ulikeloading: true,
      iscompany: "",
    }
  },
  created() {
    this.iscompany = this.$route.path.startsWith("/company");
    this.banner_keyword = this.$route.query.banner_keyword;
    this.get_bannerlist();
    this.get_tuijianlist();
    this.get_ulikelist();
  },
  methods: {
    get_bannerlist() {
      this.$get("goods/list", { keyword: this.banner_keyword, limit: this.limit }).then(res => {
        console.log("banner列表", res);
        this.bannerlist = res.data;
        this.similarloading = false;
      })
    },
    //  1/精品,2/新品,3/热销
    get_tuijianlist() {
      this.$get("goods/tag_list", { tag: 1, pagesize: this.limit }).then(res => {
        console.log("推荐列表", res);
        this.tuijianlist = res.data;
        this.tuijianloading = false;
      })
    },
    get_ulikelist() {
      this.$get("goods/tag_list", { tag: 2, pagesize: this.limit }).then(res => {
        console.log("猜你喜欢", res);
        this.ulikelist = res.data;
        this.ulikeloading = false;
      })
    },
    togooddetail(id) {
      if (this.$route.name.startsWith("company")) {
        let newUrl = this.$router.resolve("/company/goodsdetail/" + id);
        window.open(newUrl.href, "_blank");
      } else {
        let newUrl = this.$router.resolve("/goodsdetail/" + id);
        window.open(newUrl.href, "_blank");
      }
    }
  },
}
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr; //分列，分为5列
  padding: 8px 9px;
  grid-gap: 8px;
  box-sizing: border-box;
  margin-bottom: 50px;
  li {
    height: 300px;
    background: #fff;
    .el-image {
      width: 100%;
      height: 240px;
    }
    .price_part {
      line-height: 50px;
    }
    .sanmu_price {
      font-size: 18px;
      font-weight: 700;
      padding-right: 5px;
    }
  }
  .good_item:hover {
    cursor: pointer;
    .el-image {
      opacity: 0.8;
    }
  }
}
.similar {
  background: #f93751;
  .sanmu_price {
    color: #f93751;
  }
  .type_title {
    background: url(/pc/banner_detail1.jpg);
  }
}
.tuijian {
  background: #5bc5fb;
  .sanmu_price {
    color: #5bc5fb;
  }
  .type_title {
    background: url(/pc/banner_detail2.jpg);
  }
}
.ulike {
  background: #febb57;
  .sanmu_price {
    color: #febb57;
  }
  .type_title {
    background: url(/pc/banner_detail3.jpg);
  }
}
</style>
