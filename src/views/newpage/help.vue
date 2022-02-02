<template>
  <div class="help">
    <ShopTop></ShopTop>

    <div class="all">
      <div class="logopart">
        <div class="logo_pic" @click="$router.push({name:'home'})">
          <el-image src="/pc/sanmulogo.png" fit="cover"></el-image>
        </div>
        <div class="logo_font">帮助中心</div>
      </div>
      <div class="contentall">
        <div class="leftmenu">
          <el-menu :default-active="activeitem" background-color="#D8D8D8" text-color="#555" active-text-color="#ca141e">
            <el-submenu :index="item.dadid" v-for="item in datalist" :key="item.dadid">
              <template slot="title">
                <span>{{item.title}}</span>
              </template>
              <el-menu-item :index="vo.id" v-for="vo in item.children" :key="vo.id" @click="tohelpdetail(vo.id)">{{vo.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>

        <div class="rightcontent">
          <!-- 缓存组件 -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
    <ShopFoot></ShopFoot>
  </div>
</template>

<script>
import ShopTop from '@/components/head_top.vue';
import ShopFoot from '@/components/shop_foot.vue';
export default {
  data() {
    return {
      datalist: [
        { title: "配送方式", dadid: "1", children: [{ name: "货到付款区域", id: "11" }, { name: "配送支付查询", id: "12" }, { name: "支付方式说明", id: "13" }] },
        { title: "购物指南", dadid: "2", children: [{ name: "常见问题", id: "21" }, { name: "联系客服", id: "22" }, { name: "定制流程", id: "23" }] },
        { title: "售后服务", dadid: "3", children: [{ name: "退换货原则", id: "31" }, { name: "退换货", id: "32" }] },
        { title: "关于我们", dadid: "4", children: [{ name: "网站故障报告", id: "41" }, { name: "投诉与建议", id: "42" }, { name: "成都市三目商贸有限公司", id: "43" }] },
        { title: "新手上路", dadid: "5", children: [{ name: "修改收货地址", id: "51" }, { name: "月结条款", id: "52" }, { name: "非促销类", id: "53" }] },
        // { title: "服务支持", dadid: "6", children: [{ name: "联系我们", id: "61" },{ name: "留言板", id: "62" }] },
        { title: "服务支持", dadid: "6", children: [{ name: "联系我们", id: "61" }] },
      ],
      activeitem: "11",//当前选中项
    }
  },
  components: { ShopTop, ShopFoot },
  created() {
    // 如果是由底部区域跳转过来的，那么更改默认选中项
    if (this.$route.query.id) this.activeitem = this.$route.query.id;
  },
  methods: {
    tohelpdetail(id) {
      console.log(id)
      if (this.$route.path !== "/help/" + id) this.$router.push({ path: "/help/" + id })
    }
  },
}
</script>

<style lang="scss" scoped>
.help {
  background: #f5f5f5;
  .all {
    width: 1050px;
    margin: 40px auto 120px;
    .logopart {
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      .logo_pic {
        width: 200px;
        height: 60px;
        cursor: pointer;
      }
      .logo_font {
        margin-left: 30px;
        font-size: 22px;
        color: #666;
      }
    }
    .contentall {
      display: flex;
      align-items: flex-start;
    }
  }
}
// 左边菜单
.leftmenu {
  width: 260px;
  .el-submenu {
    border-bottom: 1px solid #fff;
    /deep/.el-submenu__title {
      height: 50px;
      line-height: 50px;
    }
    li {
      background-color: #fff !important;
      border-bottom: 1px solid #f1f1f1;
      font-size: 12px;
      height: 40px;
      line-height: 40px;
    }
    li:nth-last-child(1) {
      border-bottom: none;
    }
    li:hover {
      color: $main_color !important;
    }
  }
}
// 右边内容
.rightcontent {
  width: 800px;
  margin-left: 15px;
  min-height: 300px;
  background: #fff;
  padding: 30px 50px;
}
</style>
