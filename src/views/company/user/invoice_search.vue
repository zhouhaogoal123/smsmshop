<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">
      发票查询
    </div>
    <div class="user_content_blcok_line"></div>

    <div class="serachline">
      <div>
        <el-select v-model="value" placeholder="全部发票状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="order_time">
        <span class="ordertime">下单日期：</span>
        <el-date-picker v-model="time_search" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="orderid_search">
        <el-input v-model="orderid_search" placeholder="请输入订单号"></el-input>
        <el-button type="danger">查询</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderid" label="订单号">
      </el-table-column>
      <el-table-column prop="ordertime" label="下单时间" width="160">
      </el-table-column>
      <el-table-column prop="money" label="金额" width="100">
      </el-table-column>
      <el-table-column prop="applytime" label="申请开票时间" width="160">
      </el-table-column>
      <el-table-column prop="type" label="发票类型" width="160">
      </el-table-column>
      <el-table-column prop="status" label="发票状态" width="100">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <span style="color:#409EFF;cursor:pointer;">查看</span>
      </el-table-column>
    </el-table>

    <div class="home_fy_block" style="margin-top:40px">
      <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total_data: 0, //分页信息
      page_size: 10,
      current_page: 1,
      time_search: "",   //时间值查询
      orderid_search: "",//订单号查询
      tableData: [{
        orderid: "SAM65461531",
        ordertime: '2016-05-02 22:88:22',
        money: '33.00',
        applytime: '2016-05-02 22:88:22',
        type: "增值税专用发票",
        status: "已开票"
      }, {
        orderid: "SAM65461531",
        ordertime: '2016-05-02 22:88:22',
        money: '33.00',
        applytime: '2016-05-02 22:88:22',
        type: "电子普通发票",
        status: "已开票"
      }, {
        orderid: "SAM65461531",
        ordertime: '2016-05-02 22:88:22',
        money: '33.00',
        applytime: '2016-05-02 22:88:22',
        type: "增值税专用发票",
        status: "已开票"
      }, {
        orderid: "SAM65461531",
        ordertime: '2016-05-02 22:88:22',
        money: '33.00',
        applytime: '2016-05-02 22:88:22',
        type: "电子普通发票",
        status: "已开票"
      }],

      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  created() {
    this.getinvoicelist();
  },
  methods: {
    getinvoicelist() {
      let token = localStorage.getItem("token");
      this.$get("invoice/list", { token: token }).then(res => {
        this.invoice_list = res.data;
        console.log(res)
      })
      console.log("发票列表")
    },
    current_change(e) {
      this.current_page = e;
      this.getinvoicelist();
    }
  },
}
</script>


<style lang="scss" scoped>
.el-table {
  /deep/thead th {
    background: #f1f1f1;
    color: #666;
  }
  /deep/.cell {
    font-size: 13px;
  }
}
.serachline {
  display: flex;
  align-items: center;
  margin: 50px 0;
  .el-select /deep/.el-input__inner {
    width: 140px;
  }
  .order_time {
    margin: 0 25px;
  }
  .orderid_search .el-input {
    width: 150px;
    margin-right: 10px;
  }
}
</style>
