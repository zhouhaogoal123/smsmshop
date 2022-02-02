<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative;">
      我的账单明细
    </div>
    <div class="user_content_blcok_line"></div>

    <div class="filter">
      <div class="item">
        <span>消费情况筛选：</span>
        <el-select v-model="uptype" placeholder="请选择" clearable @change="filterChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span>支付方式筛选：</span>
        <el-select v-model="payment_way" placeholder="请选择" clearable @change="filterChange">
          <el-option v-for="item in wayoptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#999',color:'#fff'}">
      <el-table-column prop="created_at" label="日期" width="230">
      </el-table-column>
      <el-table-column prop="fee" label="收入/支出" width="180">
      </el-table-column>
      <el-table-column prop="pay_text" label="详细说明">
      </el-table-column>
    </el-table>

    <div class="home_fy_block" style="margin-top:40px;">
      <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{ value: '1', label: '消费' }, { value: '2', label: '充值' }, { value: '3', label: '还款' }, { value: '4', label: '提现' }, { value: '5', label: '退款' }],
      wayoptions: [{ value: '1', label: '支付宝' }, { value: '2', label: '微信' }, { value: '3', label: '余额' }, { value: '4', label: '授信额度' }],
      uptype: '', //筛选的消费情况
      payment_way: "",//筛选的支付方式
      tableData: [],
      current_page: 1,
      total_data: 0,
      page_size: 10,

    }
  },
  created() {
    this.getlist()
  },
  methods: {
    // 余额账单
    getlist() {
      let token = localStorage.getItem("token");
      let objway = ""
      if (this.payment_way) {
        objway = { payment_way: this.payment_way }
      }
      let objtype = ""
      if (this.uptype) {
        objtype = { type: this.uptype }
      }
      this.$get("finance/list", { token, page: this.current_page, ...objway, ...objtype }).then(res => {
        console.log("余额账单", res)
        res.data.forEach(item => {
          if (item.type == 1 || item.type == 4) {
            item.fee = "-" + item.fee;
          } else {
            item.fee = "+" + item.fee;
          }
          item.pay_text = item.pay_text + " " + item.type_text;
        });
        this.tableData = res.data;
        this.total_data = res.pagination.total;
      })
    },
    current_change(e) {
      this.current_page = e
      this.getlist();
      window.scrollTo(0, 0);
    },
    filterChange(e) {
      this.getlist();
    }
  },
}
</script>


<style lang="scss" scoped>
.filter {
  display: flex;
}
.item {
  margin: 50px 20px;
  span {
    color: #888;
  }
  .el-select {
    width: 140px;
  }
}
</style>
