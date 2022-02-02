<template>

  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative;">发票集中开具</div>
    <div class="user_content_blcok_line"></div>

    <el-table :data="invoicelist" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="order_sn" label="订单号" width="130"></el-table-column>
      <el-table-column prop="created_at" label="下单时间" width="150"></el-table-column>
      <el-table-column prop="address" label="发票抬头"></el-table-column>
      <el-table-column prop="address" label="纳税人识别号"></el-table-column>
      <el-table-column prop="address" label="发票申请状态">未申请</el-table-column>
      <el-table-column prop="amount" label="可开票金额"></el-table-column>
      <el-table-column prop="address" label="支付方式" width="80">飞飞支付</el-table-column>
    </el-table>
    <div class="btn">
      <el-button size="mini" type="danger" @click="applymany">集中开票</el-button>
    </div>

    <div class="home_fy_block" style="margin-top:40px;">
      <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      invoicelist: [],
      total_data: 0,
      page_size: 10,
      current_page: 1,
      multipleSelection: [],//选中项
    }
  },
  computed: {
    ...mapState(["user_info"])
  },
  created() {
    this.getorderinfoAPI()
  },
  methods: {
    // 获取未开票列表
    getorderinfoAPI() {
      let api = "" //企业主账号跟其他的接口不一样
      if (this.user_info.state == 1) {
        api = "order/declare_list"
      } else {
        api = this.$api.homeListOrder
      }
      this.$get(api, { token: localStorage.getItem("token"), state: 0 }).then(res => {
        window.scrollTo(0, 0);
        console.log("获取订单日志：", res)
        let { data } = res;
        this.invoicelist = data;
        this.total_data = res.pagination.total;
      });
    },
    // 页数改变重新获取列表
    current_change(e) {
      this.current_page = e;
      this.getorderinfoAPI();
    },
    //单选框选项改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    applymany() {
      if (this.multipleSelection.length == 0) {
        return this.$message.error("请先选择发票")
      }
      let ids = this.multipleSelection.map(item => {
        return item.id;
      })
      let order_ids = ids.join(",")
      this.$router.push({ name: 'com_invoicemanyapply', query: { ids: order_ids } })
    }
  }
}
</script>


<style lang="scss" scoped>
.el-table {
  border: 1px solid #e6e6e6;
  /deep/.el-table__header-wrapper thead {
    color: #333;
  }
  /deep/.el-table__body-wrapper {
    font-size: 13px;
    color: #666;
  }
  /deep/.is-checked .el-checkbox__inner {
    background-color: $main_color;
    border-color: $main_color;
  }
  /deep/.is-indeterminate .el-checkbox__inner {
    background-color: $main_color;
    border-color: $main_color;
    &:hover {
      border-color: $main_color;
    }
  }
}
.btn {
  margin-top: 20px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
