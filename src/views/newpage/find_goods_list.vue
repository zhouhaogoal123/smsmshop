<template>
  <!-- 首页发现好货 -->
  <div>
    <!-- 头部三大栏 -->
    <CompanyHead v-if="iscompany"></CompanyHead>
    <ShopTop v-else></ShopTop>

    <div class="find_good_list">
      <div class="top_title">
        <div class="line"></div>
        <div class="find_goodbg"></div>
        <div class="line"></div>
      </div>
      <el-skeleton :loading="tuijianloading">
        <template slot="template">
          <ul>
            <li v-for="item in 20" :key="item">
              <el-skeleton-item variant="image" style="width: 100%; height: 160px;" />
              <div class="content">
                <div class="title">
                  <el-skeleton-item variant="text" style="width: 100%; height: 30px;" />
                </div>
                <div class="synopsis">
                  <el-skeleton-item variant="text" style="width: 100%; height: 30px;" />
                </div>
                <div class="btn">
                  <el-skeleton-item variant="text" style="width: 50%; height: 30px;" />
                </div>
              </div>

            </li>
          </ul>
        </template>
        <template>
          <ul>
            <li v-for="item in tuijianlist" :key="item.id" @click="togooddetail(item.good_sn)">
              <el-image :src="item.img_url" fit="cover"></el-image>
              <div class="content">
                <div class="title">{{item.title}}</div>
                <div class="synopsis">{{item.synopsis}}</div>
                <div class="btn">
                  <span>￥{{item.price}}</span>
                  <el-button type="danger" class="btn_go">查看宝贝 ></el-button>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </el-skeleton>
    </div>

    <!-- 猜你喜欢 -->
    <div class="find_good_ulike">
      <div class="width_center_1200 find_good_ulike_content">
        <div class="top_title">
          <div class="line"></div>
          <div class="likefont">您可能还喜欢</div>
          <div class="line"></div>
        </div>
        <el-skeleton :loading="ulikeloading">
          <template slot="template">
            <ul class="goods">
              <li v-for="item in 20" :key="item">
                <el-skeleton-item variant="image" style="width: 100%; height: 250px;" />
                <el-skeleton-item variant="text" style="width: 80%; height: 35px;margin-top:20px;" />
                <el-skeleton-item variant="text" style="width: 100%; height: 35px;" />
                <el-skeleton-item variant="text" style="width: 50%; height: 35px;" />
              </li>
            </ul>
          </template>
          <template>
            <ul class="goods">
              <li v-for="item in ulikelist" :key="item.id" @click="togooddetail(item.good_sn)">
                <el-image :src="item.img_url" fit="cover"></el-image>
                <div class="title">{{item.title}}</div>
                <div class="synopsis">{{item.synopsis}}</div>
                <div class="price">￥{{item.price}}</div>
              </li>
            </ul>
          </template>
        </el-skeleton>
      </div>
    </div>

    <ShopFoot></ShopFoot>
  </div>
</template>

<script>
import ShopTop from "@/components/head_top.vue";
import CompanyHead from "@/components/head_top_company.vue";
import ShopFoot from '@/components/shop_foot.vue';
export default {
  components: { ShopTop, CompanyHead, ShopFoot },
  data() {
    return {
      tuijianlist: [], //推荐列表
      ulikelist: [],  //猜你喜欢列表
      tuijianloading: true,
      ulikeloading: true,
      iscompany: "",
    }
  },
  created() {
    this.iscompany = this.$route.path.startsWith("/company");
    this.get_tuijianlist();
    this.get_ulikelist();
  },
  methods: {
    //  1/精品,2/新品,3/热销
    get_tuijianlist() {
      this.$get("goods/tag_list", { tag: 1, pagesize: 20 }).then(res => {
        console.log("推荐列表", res);
        this.tuijianlist = res.data;
        this.tuijianloading = false;
      })
    },
    get_ulikelist() {
      this.$get("goods/tag_list", { tag: 3, pagesize: 20 }).then(res => {
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
.find_good_list {
  background: #08088a;
  min-height: 500px;
  .top_title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 410px;
    margin: auto;
    height: 70px;
    .find_goodbg {
      width: 250px;
      height: 70px;
      background: url(/pc/findgood.png) 0 10px/100% no-repeat;
    }
    .line {
      width: 80px;
      height: 2px;
      background: #fff;
    }
  }
  ul {
    width: 1000px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    padding: 50px 0;
    li {
      height: 300px;
      border-radius: 8px;
      background: #fff;
      cursor: pointer;
      .el-image {
        width: 100%;
        height: 160px;
        /deep/.el-image__inner {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }
      .content {
        padding: 10px;
      }
      .title {
        height: 25px;
        line-height: 25px;
        font-weight: 700;
        font-size: 16px;
        width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .synopsis {
        font-size: 14px;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        color: #999;
        margin: 5px 0 10px;
      }
      .btn {
        display: flex;
        justify-content: space-between;
      }
      .btn span {
        line-height: 40px;
        color: #ff8000;
        font-weight: 700;
      }
    }
    li:hover {
      .el-image {
        opacity: 0.8;
      }
    }
  }
}
.find_good_ulike {
  background: #f5f5f5;
  min-height: 500px;
  padding-bottom: 30px;
  .find_good_ulike_content {
    .top_title {
      display: flex;
      align-items: center;
      line-height: 100px;
      .line {
        background: #999;
        width: 500px;
        height: 1px;
      }
      .likefont {
        width: 170px;
        color: #666;
        font-size: 16px;
        text-align: center;
      }
    }
    .goods {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 10px;
      li {
        background: #fff;
        height: 380px;
        padding: 20px;
        .el-image {
          height: 250px;
        }
        .title {
          font-size: 16px;
          line-height: 40px;
          font-weight: 700;
          color: #0a2a1b;
          width: 250px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .synopsis {
          font-size: 14px;
          color: #999;
          height: 40px;
          overflow: hidden;
        }
        .price {
          margin-top: 20px;
          font-size: 16px;
          font-weight: 700;
          color: #ff8000;
        }
      }
      li:hover {
        box-shadow: 0 0 0 2px #08088a;
        cursor: pointer;
      }
    }
  }
}
</style>
