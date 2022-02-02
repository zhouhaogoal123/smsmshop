<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative;">
      子账号申报订单
    </div>
    <div class="user_content_blcok_line"></div>

    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column label="商品" width="450">
        <template slot-scope="scope">
          <div v-for="item in scope.row.details" :key="item.id" class="goodsDetail">
            <img :src="item.img_url" style="width:40px;height:40px;" />
            <div>
              <span> {{item.title}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价（元）" width="110">
        <template slot-scope="scope">
          <div v-for="item in scope.row.details" :key="item.id" class="oneprice">
            {{item.price}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="总金额（元）" width="110">
      </el-table-column>
      <el-table-column prop="user_name" label="申报子账号">
      </el-table-column>
    </el-table>
    <div class="btn">
      <el-button type="info" @click="toggleSelection()" size="mini" class="cancelit">取消选择</el-button>
      <el-button type="danger" @click="makeDialogshow" size="mini">企业额度支付</el-button>
    </div>
    <!-- <div class="home_fy_block" style="margin-top:40px;">
      <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
    </div> -->

    <!-- 支付密码弹出层 -->
    <el-dialog title="授权额度支付验证" v-if="dialogVisible" :visible.sync="dialogVisible" width="30%" class="mydialog">
      <section class="pay_password_font">请输入6位数字支付密码</section>
      <section class="pay_password">
        <el-input placeholder="请输入密码" v-model.number="pay_password" show-password></el-input>
        <span @click="forget_paypass">忘记支付密码?</span>
      </section>
      <section>
        <el-button type="danger" class="submitbtn" @click="topay">立即支付</el-button>
      </section>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_page: 1,
      tableData: [], //列表
      multipleSelection: [],
      pay_password: "",
      current_page: 1,
      total_data: 0,
      page_size: 10,
      token: "",
      dialogVisible: false,
    }
  },
  created() {
    this.token = localStorage.getItem("token")
    this.getlist()
  },
  methods: {
    getlist() {
      this.$get("order/declare_list", { token: this.token, status: 0, declare: 1, page: this.current_page, page_size: this.page_size }).then(res => {
        console.log("审核列表", res)
        let newres = JSON.parse(JSON.stringify(res))
        let { data } = newres;
        data.forEach(item => {
          item.user_name = "(" + item.department + ") " + item.user_name;
        })
        this.tableData = data;
        this.total_data = newres.pagination.total;
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 选择项发生改变触发事件 val选中的值
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val)
    },
    current_change(e) {
      this.current_page = e;
      this.getlist();
    },
    topay() {
      if (this.multipleSelection.length == 0) {
        return this.$message.error("请先选择订单")
      }
      let uporder = this.multipleSelection.map(item => {
        return item.id;
      })
      let uporderStr = uporder.join(",")
      this.$post("order/quotapay", { token: this.token, order_ids: uporderStr, pay_password: this.pay_password }).then(res => {
        console.log("支付结果", res)
        if (res.code == 200) {
          this.$router.push({ name: "com_sonreview_success" })
        }
      })
    },
    // 忘记支付密码
    forget_paypass() {
      console.log(111)
      let newUrl = this.$router.resolve({ name: "user_safe_pay_passwordforget" });
      window.open(newUrl.href, "_blank");
    },
    makeDialogshow() {
      this.multipleSelection.length > 0 ? this.dialogVisible = true : this.$message.error("请先选择申报订单")
    }
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  /deep/.el-table__body {
    font-size: 12px;
  }
  .goodsDetail {
    display: flex;
    margin-bottom: 10px;
    img {
      margin-right: 5px;
    }
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .oneprice {
    height: 40px;
    margin-bottom: 10px;
  }
}
.mydialog {
  /deep/.el-dialog__header {
    background: #f1f1f1;
    color: #666;
  }
  /deep/.el-dialog__body {
    padding: 30px 40px;
  }
  .pay_password_font {
    font: 12px/40px Microsoft Yahei;
    color: #999;
  }
  .pay_password {
    font: 12px/40px Microsoft Yahei;
    color: #999;
    margin-bottom: 30px;
    span {
      padding-left: 10px;
      color: #58acfa;
    }
    span:hover {
      color: $main_color;
      cursor: pointer;
    }
  }
  .pay_password .el-input {
    width: 150px;
  }
  .submitbtn {
    width: 150px;
  }
}
.btn {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
  .cancelit {
    border-radius: 0;
  }
}
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
</style>
