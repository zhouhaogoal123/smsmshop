<template>
  <!-- 头部的顶部的左侧栏 -->
  <div class="leftbar">
    <ul class="goodslist_ul">
      <!-- 循环数据列表，展示出来 -->
      <li class="left_bar_block" v-for="v in goods_class" :key="v.id">
        <!-- 左侧字体部分 -->
        <div class="fontpart" @click="tosearch(v.id)">
          <a>{{v.title}}</a>
        </div>
        <!-- 鼠标悬停，右侧展示栏 -->
        <div class="subbar">
          <div class="subbar_subnav">
            <div class="subbar_subnav_allnav" v-for="(vo,key) in v.children" :key="key">
              <span class="twofont">
                <a class="font_twonav" @click="tosearch(vo.id)">{{vo.title}}</a>
                <span class="el-icon-arrow-right"></span>
              </span>
              <ul>
                <li class="subbar_subnav_threenav" v-for="(item,index) in vo.children" :key="index">
                  <a @click="tosearch(item.id)">{{item.title}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'leftbar',
  components: {},
  data() {
    return {
      goods_class: [],
    };
  },
  watch: {
    goods_class(newval) {
      this.$bus.$emit("set_allgoodstype", this.goods_class)
    }
  },
  methods: {
    // 获取首页左侧导航信息
    get_subnav_info() {
      // localStorage 存储leftbar列表，不用localStorage，因为目录可能变。
      let leftbarinfo = JSON.parse(sessionStorage.getItem("leftbarinfo"));
      if (leftbarinfo) return this.goods_class = leftbarinfo;
      this.$get(this.$api.homeGetSubNavInfo).then(res => {
        console.log("leftbar信息", res)
        // 存在这里，每次浏览器关闭都会自动清除（sessionStorage问题：新页面打开只会复制，老页面不能同步新的sessionStorage信息）
        sessionStorage.setItem("leftbarinfo", JSON.stringify(res.data));
        this.goods_class = res.data;
      });
    },
    // 跳转到搜索页
    tosearch(id) {
      if (this.$route.name == "company_goodssearch") {
        return this.$router.push({ name: 'company_goodssearch', query: { id: id } })
      }
      if (this.$route.name == "goodssearch") {
        return this.$router.push({ name: 'goodssearch', query: { id: id } })
      }
      let apiurl = ""
      this.$route.name.startsWith("company") ? apiurl = "company_goodssearch" : apiurl = "goodssearch"
      let newUrl = this.$router.resolve({ name: 'company_goodssearch', query: { id: id } })
      window.open(newUrl.href, "_blank");
    }
  },
  created() {
    this.get_subnav_info();
  },
};
</script>
<style lang="scss" scoped>
// 公共样式
.leftbar,
.goodslist_ul {
  height: 450px;
}

// 背景样式
.leftbar {
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  width: 240px;
  position: absolute;
  left: 0;
  top: 39px;
  display: block;
  z-index: 998;
  .fontpart a {
    color: #fff;
  }
  .subbar {
    background: #fff;
    box-shadow: 2px 2px 4px 0 #5f4f4f;
  }

  // 二级字体/字体图标颜色
  .font_twonav,
  .el-icon-arrow-right {
    color: #333;
  }
}

.goodslist_ul {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  box-sizing: border-box;
  .left_bar_block {
    .fontpart {
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      text-align: left;
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 14px;
      line-height: 30px;
    }
  }
  .left_bar_block:hover {
    cursor: pointer;
    background: #fff;
    .subbar {
      display: block;
    }
    .fontpart a {
      color: $main_color;
    }
  }
}
.goodslist_ul:hover {
  box-shadow: 2px 2px 4px 0 #5f4f4f;
}
.subbar {
  height: 450px;
  width: 960px;
  position: absolute;
  top: 0;
  left: 240px;
  z-index: 999;
  display: none;
  overflow-y: auto;
}

// 二三级总体，680px比较小，因为右侧可能要留一栏来放图片广告
.subbar_subnav {
  margin: 20px 30px;
  width: 880px;
  display: block;
}
.subbar_subnav_allnav {
  display: flex;
  line-height: 25px;
  margin-bottom: 30px;
  .twofont {
    flex-shrink: 0;
  }
  // 二级字体
  .font_twonav {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .font_twonav:hover {
    color: $main_color;
  }
  // 二级字体图标
  .el-icon-arrow-right {
    font-weight: 700;
    font-size: 12px;
    padding-left: 2px;
  }
  // 三级
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
    li a {
      padding: 0 10px;
      font-size: 12px;
      line-height: 12px;
      color: #888;
    }
    li:last-child a {
      border-right: none;
    }
    li a:hover {
      color: $main_color;
    }
  }
}
</style>