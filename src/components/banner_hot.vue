<template>
  <!-- 发现好货中部轮播图 -->
  <div id="hot_wrapper">
    <el-skeleton style="width: 100%" :loading="loading">
      <template slot="template">
        <div class="skeleton">
          <div v-for="item in 4" :key="item" class="skeleton_item">
            <el-skeleton-item variant="text" style="width: 160px; height: 190px;" />
            <el-skeleton-item variant="text" style="width:50%;margin-top:10px;" />
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </template>

      <template>
        <el-carousel :autoplay="true" :interval="5000" class="allhotlist" arrow="always" indicator-position="none">
          <el-carousel-item v-for="(item, index) in newpics" :key="index">
            <ul>
              <li v-for="v in item" :key="v.id" @click="tofind_goods_detail(v.good_sn)">
                <div class="pic_part lazypic">
                  <el-image :src="v.img_url" fit="cover"></el-image>
                </div>
                <div class="font_title">{{v.title}}</div>
                <div class="font_price">
                  <div class="font_price_now">
                    <span style="font-size: 12px">￥</span>{{v.price}}
                  </div>
                  <div class="font_price_old">￥{{v.market_price}}</div>
                </div>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newpics: [],
      loading: true,
    };
  },
  created() {
    setTimeout(() => {
      this.getnewpics();
    },300)
  },
  methods: {
    getnewpics() {
      // tag = 1/精品,2/新品,3/热销
      this.$get("goods/tag_list", { tag: 2, pagesize: 12 }).then(res => {
        let len = res.data.length;
        let n = 4;//假设每行显示4个
        let lineNum = len % 4 === 0 ? len / 4 : Math.ceil(len / 4); //整除后向上取整
        let newarr = [];
        for (let i = 0; i < lineNum; i++) {
          let temp = res.data.slice(i * n, i * n + n); //0开始3位 3开始6位 6开始9位 
          newarr.push(JSON.parse(JSON.stringify(temp)));
        }
        this.newpics = newarr;
        console.log("中部新品图", newarr);
        this.loading = false;
      })
    },
    tofind_goods_detail(good_sn) {
      this.$emit("tofind_goods_detail", good_sn)
    }
  },
};
</script>

<style lang="scss" scoped>
.skeleton {
  display: flex;
  .skeleton_item {
    margin: 0 15px;
  }
}
#hot_wrapper {
  height: 300px;
  width: 760px;
  display: flex;
  align-items: center;
  background: white;

  .allhotlist {
    height: 300px;
    width: 760px;
    ul {
      height: 300px;
      width: 760px;
      display: flex;
      padding: 20px 0;
      box-sizing: border-box;
    }
    li:hover {
      .pic_part {
        opacity: 0.9;
      }
    }
  }

  /deep/.el-carousel__arrow--left {
    width: 25px;
    height: 35px;
    left: 2px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.2);
  }
  /deep/.el-carousel__arrow--left:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  /deep/.el-carousel__arrow--right {
    right: 2px;
    width: 25px;
    height: 35px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.2);
  }
  /deep/.el-carousel__arrow--right:hover {
    background: rgba(0, 0, 0, 0.5);
  }
}

li {
  width: 190px;
  height: 260px;
  box-sizing: border-box;
  padding: 0 15px;
  font-size: 0;
  text-align: center;
  cursor: pointer;
  .el-image {
    width: 130px;
    height: 150px;
    padding: 20px 0;
  }
  .font_title {
    font-size: 12px;
    line-height: 30px;
    height: 30px;
    width: 160px; //多余部分字体用...代替。以下四行都是必须条件
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .font_title:hover {
    color: $main_color;
  }
  .font_price {
    border: 1px solid $main_color;
    display: flex;
    text-align: end;
    width: 158px;
    height: 24px;
    .font_price_now {
      width: 85px;
      background: $main_color;
      position: relative;
      font: 15px/24px "微软雅黑";
      color: white;
    }
    .font_price_now::after {
      content: " ";
      width: 0;
      height: 0;
      border-color: $main_color white transparent transparent;
      border-style: solid;
      border-width: 24px 8px 0 0;
      position: absolute;
      top: 0px;
    }
    .font_price_old {
      text-decoration: line-through;
      color: #b0b0b0;
      font: 12px/24px "微软雅黑";
      width: 73px;
      background: white;
      padding-left: 4px;
      padding-right: 2px;
    }
  }
}
</style>