<template>
  <div>
    <slot name="myhead"></slot>

    <div class="width_center_1200">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="全部商品分类" name="first">
          <el-row class="all_type">
            <el-col :span="11" v-for="item in goodstype" :key="item.id" class="one_type">
              <el-row class="one_title">
                <span class="one_title_font" @click="tosearch(item.id)">{{item.title}}</span>
              </el-row>
              <el-row v-for="sonitem in  item.children" :key="sonitem.id" class="two_type">
                <el-col :span="5" class="two_title">
                  <span class="two_title_font" @click="tosearch(sonitem.id)">{{sonitem.title}}</span>
                </el-col>
                <el-col :span="19" class="three_type">
                  <span v-for="grandson in sonitem.children" :key="grandson.id" class="three_title" @click="tosearch(grandson.id)">{{grandson.title}}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="全部推荐品牌" name="second">
          <div class="allbrand">
            <div class="onebrand" v-for="(item,index) in  brandlist" :key="index" @click="toserachbybrand(item.id,item.title)">
              <el-image :src="item.icon" fit="cover" class="brandimg"></el-image>
              <div class="brandfont">{{item.title}}</div>
            </div>
            <div class="more"></div>
            <div class="more"></div>
            <div class="more"></div>
            <div class="more"></div>
            <div class="more"></div>
            <div class="more"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <ShopFoot></ShopFoot>
  </div>
</template>


<script>
import ShopFoot from '@/components/shop_foot.vue';
import { mixin } from '@/views/common/mixin/brand_search.js'
export default {
  data() {
    return {
      activeName: "first",
      goodstype: [],
      brandlist: []
    }
  },
  components: { ShopFoot },
  mixins: [mixin],
  created() {
    this.$bus.$on('set_allgoodstype', res => {
      this.goodstype = res;
    })
    this.getbrandlist();
  },
  methods: {
    getbrandlist() {
      this.$get("/brand/brands").then(res => {
        console.log(res)
        this.brandlist = res.data;
      })
    },
    // 跳转到搜索页
    tosearch(id) {
      // this.$emit("hiddenleftbar");
      if (this.$route.name.startsWith("company")) {
        let newUrl = this.$router.resolve({ name: 'company_goodssearch', query: { id: id } })
        window.open(newUrl.href, "_blank");
      } else {
        let newUrl = this.$router.resolve({ name: 'goodssearch', query: { id: id } })
        window.open(newUrl.href, "_blank");
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-top: 30px;
  /deep/.el-tabs__item:hover {
    color: $main_color !important;
  }
  /deep/.el-tabs__header {
    margin-bottom: 50px;
  }
  /deep/.is-active {
    color: $main_color !important;
  }
}
.all_type {
  display: flex;
  height: 4000px;
  flex-wrap: wrap;
  .one_type {
    margin:0 20px;
    margin-bottom: 30px;
  }
  .one_title {
    background: #f1f1f1;
    font-size: 14px;
    font-weight: 700;
    color: #333;
    padding-left: 10px;
    line-height: 30px;
    border-left: 5px solid $main_color;
  }
  .two_type {
    padding: 5px 15px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    color: #666;
    border: 1px solid #f1f1f1;
    border-top: none;
  }
  .three_type {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .three_title {
    padding-right: 15px;
    color: #777;
    font-weight: 400;
    word-break: break-all;
  }
  .one_title_font:hover,
  .two_title_font:hover,
  .three_title:hover {
    cursor: pointer;
    color: $main_color;
  }
}
.allbrand {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: #666;
  .onebrand {
    width: 100px;
    margin: 0 25px 50px;
    .brandimg {
      width: 100px;
      height: 40px;
    }
    .brandfont {
      text-align: center;
      margin-top: 5px;
      font-size: 14px;
    }
  }
  .onebrand:hover {
    color: $main_color;
    cursor: pointer;
  }
  .more {
    width: 150px;
  }
}
</style>
