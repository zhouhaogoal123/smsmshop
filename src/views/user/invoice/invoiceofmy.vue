<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative;">
      我的发票
    </div>
    <div class="user_content_blcok_line"></div>

    <el-row class="topline">
      <el-col :span="16">订单详情</el-col>
      <el-col :span="3">发票类型</el-col>
      <el-col :span="2">状态</el-col>
      <el-col :span="3">操作</el-col>
    </el-row>

    <div class="user_index_order_list" v-if="!loading&&invoice_list.length>0">
      <div class="oneitem" v-for="(v,k) in invoice_list" :key="k">
        <div class="orderline">
          <div>
            <span>订单号：</span>
            <span class="orderid">{{ v.order_sn }} </span>
          </div>
          <div>
            <span style="color:#666;">{{ v.created_at }}</span>
          </div>
        </div>
        <ul>
          <div class="ul_left">
            <li v-for="(vo,key) in v.details" :key="key">
              <el-row>
                <el-col :span="20">
                  <div class="goods_info">
                    <dl>
                      <router-link :to="'/goodsdetail/'+vo.good_sn">
                        <dt>
                          <el-image :src="vo.img_url" fit="cover"> </el-image>
                        </dt>
                      </router-link>
                      <router-link :to="'/goodsdetail/'+vo.good_sn">
                        <dd :title="vo.title" style="word-break: break-all">{{ vo.title }}</dd>
                      </router-link>
                    </dl>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="th_title">x {{ vo.number }}</div>
                </el-col>

              </el-row>
              <div class="clear"></div>
            </li>
          </div>
          <div class="ul_right">
            <!-- 第一栏 -->
            <div>
              <section>{{v.paper_type}}</section>
            </div>

            <!-- 第二栏 -->
            <div>
              <section v-if="v.state==2" class="success_font">已开票</section>
              <section v-else class="main_color">未开票</section>
            </div>

            <!-- 最后一栏 -->
            <div class="lastline">
              <section class="borderred" v-if="!user_iscompany">
                <el-button size="mini" @click="toinvoiceapply(v.id)" plain type="danger">发票换开</el-button>
              </section>
              <section class="hoverred" @click="toinvoicedetail(v.id)">发票详细</section>
            </div>
          </div>
        </ul>
      </div>

      <div class="home_fy_block" style="margin-top:40px">
        <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
      </div>
    </div>

    <!-- 没有订单则 -->
    <div class="empty_order" v-if="!loading&&invoice_list.length==0">
      <dl>
        <dt><img src="/pc/not-common-icon.png" alt="" /></dt>
        <dd>主人，您近期还没有开具任何发票哟~</dd>
        <dd class="btn">
          <span @click="tohome">前往商城</span>
        </dd>
      </dl>
    </div>

    <div v-loading="loading" element-loading-custom-class="loadingclass" element-loading-text="加载中" element-loading-spinner="el-icon-loading"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      invoice_list: [],
      loading: true,
      total_data: 0,
      page_size: 10,
      current_page: 1
    }
  },
  computed: {
    ...mapState(["user_iscompany"])
  },
  created() {
    this.getinvoicelist();
  },
  methods: {
    // 当前页数改变
    current_change(e) {
      this.current_page = e;
      this.getinvoicelist();
    },
    // 获取发票列表
    getinvoicelist() {
      let token = localStorage.getItem("token");
      this.$get("invoice/list", { token: token, page: this.current_page }).then(res => {
        this.loading = false;
        window.scrollTo(0, 0)

        this.total_data = res.pagination.total;
        res.data.forEach(item => {
          let arr1 = item.created_at.split("T")
          let arr2 = arr1[1].split(".")
          item.created_at = arr1[0] + " " + arr2[0]
        })
        this.invoice_list = res.data;
        console.log(res)
      })
    },
    // 去换开发票页
    toinvoiceapply(ordersn) {
      if (this.user_iscompany) {
        this.$router.push({ name: 'com_invoiceapply', query: { order_id: ordersn } })
      } else {
        this.$router.push({ name: 'invoiceapply', query: { order_id: ordersn } })
      }
    },
    // 去发票详情页
    toinvoicedetail(order_sn) {
      if (this.user_iscompany) {
        this.$router.push({ name: 'com_invoicedetail', query: { order_id: order_sn } })
      } else {
        this.$router.push({ name: 'invoicedetail', query: { order_id: order_sn } })
      }
    },
    // 联系商家页
    tocallseller() {
      this.$router.push({ name: '/' })
    },
    //前往商城
    tohome() {
      if (this.$route.name === "invoiceofmy") {
        this.$router.push({ name: 'company_home' })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.topline {
  text-align: center;
}
.user_index_order_list {
  margin-bottom: 50px;
  .oneitem {
    margin-bottom: 20px;
  }
  .orderline {
    background: #efefef;
    font-size: 12px;
    line-height: 40px;
    margin-top: 5px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    .orderid:hover {
      color: $main_color;
      cursor: pointer;
    }
  }
  ul {
    margin-bottom: 0;
    border: 1px solid #efefef;
    border-top: none;
    display: flex;
  }
  .ul_left {
    width: 600px;
    border-right: 1px solid #efefef;
    li {
      width: 600px;
      box-sizing: border-box;
      padding: 20px 10px;
      border-top: 1px solid #efefef;
    }
  }
  .ul_right {
    width: 303px;
    display: flex;
    div {
      flex: 1;
      padding: 20px 10px 10px 10px;
      border-right: 1px solid #efefef;
      box-sizing: border-box;
      font: 12px/20px "微软雅黑";
      text-align: center;
      color: #555;
    }
    div:last-child {
      border-right: none;
    }
    .hoverred:hover {
      cursor: pointer;
      color: $main_color;
    }
    .lastline {
      section {
        margin-bottom: 5px;
      }
      .payit .el-button {
        border-color: $main_color;
        color: #fff;
        background-color: $main_color;
      }
      .payit .el-button:hover {
        opacity: 0.8;
      }
      .borderred {
        .el-button--danger {
          background: #fff;
          color: $main_color;
          border-color: $main_color;
        }
        .el-button--danger:hover {
          background: $main_color;
          color: #fff;
          opacity: 1;
        }
      }
    }
  }

  .goods_info {
    font-size: 12px;
    dl dt {
      width: 60px;
      height: 60px;
      background: #f8f8f8;
      float: left;
      margin-right: 10px;
    }
    dl dd {
      line-height: 20px;
      height: 40px;
      overflow: hidden;
      color: #666;
    }
    dl dd:hover {
      color: $main_color;
    }
  }
  .th_title {
    font-size: 12px;
    line-height: 40px;
    text-align: end;
    color: #999;
  }
}
</style>
