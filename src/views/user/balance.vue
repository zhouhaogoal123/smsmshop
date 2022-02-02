<template>
  <div class="user_content_blcok">
    <header>
      <div class="borderin">
        <div class="font">我的可用余额</div>
        <div class="money">
          <span class="yuan">{{newbalance[0]}}</span>.
          <span class="fen">{{newbalance[1]}}</span>
        </div>
      </div>
      <div class="rightpart">
        <el-button type="danger" @click="addyue">充值余额</el-button>
        <div>
          <el-button type="info" @click="getyue">余额提现</el-button>
        </div>
      </div>
    </header>
    <div class="user_content_blcok_title" style="position: relative;">
      余额收支明细
    </div>
    <div class="user_content_blcok_line"></div>

    <!-- 有记录 -->
    <div v-if="!loading&&tableData.length>0">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="created_at" label="时间" width="230">
        </el-table-column>
        <el-table-column prop="fee" label="收入/支出" width="230">
        </el-table-column>
        <el-table-column prop="type_text" label="详细说明" width="446">
        </el-table-column>
      </el-table>

      <div class="home_fy_block" style="margin-top:40px;">
        <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
      </div>
    </div>

    <!-- 没记录 -->
    <div v-if="!loading&&tableData.length==0">
      <div class="empty_head">
        <el-row>
          <el-col :span="6" style="padding:0 10px;">时间</el-col>
          <el-col :span="6" style="padding:0 10px;">收入/支出</el-col>
          <el-col :span="12" style="padding:0 10px;">详细说明</el-col>
        </el-row>
      </div>
      <div class="empty_order">
        <dl>
          <dt><img src="/pc/not-common-icon.png" alt=""></dt>
          <dd>主人，您近期还没有任何余额收支哟~</dd>
          <dd class="btn">
            <router-link :to="iscompany?'/company/home':'/'">前往商城</router-link>
          </dd>
        </dl>
      </div>
    </div>

    <div v-loading="loading" element-loading-custom-class="loadingclass" element-loading-text="加载中" element-loading-spinner="el-icon-loading"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mixin } from '@/views/common/mixin/refresh_token.js';
export default {
  data() {
    return {
      total_data: 0,   // 总条数
      page_size: 10,   //每页条数
      current_page: 1, //当前页数
      tableData: [], //账单数据
      iscompany: "",
      loading: true,
    }
  },
  mixins: [mixin],
  computed: {
    ...mapState(["balance", "user_iscompany"]),
    newbalance() {
      return this.balance.split(".")
    }
  },
  created() {
    this.iscompany = this.user_iscompany;
    this.refreshToken(); //刷新token，这里仅仅用于刷新积分
    this.getfinancelist();
  },
  methods: {
    // 余额账单
    getfinancelist() {
      let token = localStorage.getItem("token");
      this.$get("finance/list", { token, page: this.current_page, payment_way: 3 }).then(res => {
        this.loading = false;
        window.scrollTo(0, 0);

        console.log("余额账单", res)
        res.data.forEach(item => {
          if (item.type == 1 || item.type == 4) {
            item.fee = "-" + item.fee;
          } else {
            item.fee = "+" + item.fee;
          }
        });
        this.tableData = res.data;
        this.total_data = res.pagination.total;
      })
    },
    // 页面改变事件
    current_change(e) {
      this.current_page = e;
      this.getfinancelist();
    },
    // 添加余额页面
    addyue() {
      this.iscompany ? this.$router.push({ name: "com_recharge" }) : this.$router.push({ name: "recharge" })
    },
    // 获取余额页面
    getyue() {
      this.iscompany ? this.$router.push({ name: "com_cash" }) : this.$router.push({ name: "cash" })
    },
  },

}
</script>

<style lang="scss" scoped>
header {
  padding: 20px;
  display: flex;
  justify-content: space-around;
  .borderin {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: radial-gradient(circle, #fff 40%, yellow 80%);
    font-weight: 700;
    color: #666;
    .font {
      font-size: 16px;
    }
    .money .yuan {
      font-size: 26px;
    }
    .money .fen {
      font-size: 14px;
    }
  }
  .rightpart {
    padding: 50px 0;
    color: #666;
    .el-button--danger {
      background-color: $main_color;
      border-color: $main_color;
      margin: 20px 0;
    }
    .el-button--danger:hover {
      opacity: 0.7;
    }
  }
}
.user_content_blcok {
  /deep/.el-tabs__item {
    font-weight: 700;
    font-size: 16px;
  }
  /deep/.el-tabs__item.is-active {
    color: $main_color;
  }
  /deep/.el-tabs__active-bar {
    background-color: $main_color;
  }
  /deep/.el-tabs__item:hover {
    color: $main_color;
  }

  /deep/.el-table th {
    background-color: #f5f5f5;
  }
  /deep/.el-table tbody tr:hover > td {
    background-color: #ffffff !important;
  }
  /deep/.el-table thead {
    color: #555;
  }
}
</style>
