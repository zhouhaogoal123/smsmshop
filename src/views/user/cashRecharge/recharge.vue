<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">
      余额充值
    </div>
    <div class="user_content_blcok_line"></div>
    <!-- 充值表单信息 -->
    <el-row>
      <el-col :span="4">充值金额</el-col>
      <el-col :span="20">
        <ul class="money">
          <el-button type="primary" plain v-for="(item,index) in moneylist" :key="index" @click="setmoney(item)" :class="moneycheck==item&&'bluebg'">{{item}}元</el-button>
        </ul>
        <el-input v-model="info.amount" placeholder="自定义金额" class="inputmoney" @focus="setmymoney"></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4" style="margin-top:30px;">支付方式</el-col>
      <el-col :span="20" class="payway">
        <el-image src="/pc/pc_wxpay.jpg" @click="info.payment_way=2" :class="info.payment_way==2&&'redborder'"></el-image>
        <el-image src="/pc/pc_alipay.jpg" @click="info.payment_way=1" :class="info.payment_way==1&&'redborder'"></el-image>
      </el-col>
    </el-row>

    <el-row class="btn">
      <el-col :span="20" :push="4">
        <el-button type="danger" @click="torecharge">前往支付</el-button>
      </el-col>
    </el-row>
    <el-form :model="info" label-width="100px" label-position="right">
    </el-form>

    <!-- 二维码扫描 -->
    <el-dialog title="微信支付" v-if="wxdialogVisible" :visible.sync="wxdialogVisible" width="20%" :close-on-click-modal="false" :close-on-press-escape="false" @close="closewxpay">
      <div class="daojishi">支付倒计时：
        <span style="color:red">{{wxdaojishi}}</span> s</div>
      <div class="scan_qr" ref="scan_qr"> </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "recharge",
  data() {
    return {
      moneylist: [50, 100, 200, 300, 500, 1000],
      info: {
        type: 1, //订单类型 1充值 2提现 3还款
        amount: "", //充值金额
        payment_way: "", //1支付宝充值、2微信充值
      },
      moneycheck: 0,
      timer: null,//延时定时器
      timeObj1: null,//定时器，定时支付时间
      timeObj2: null,  //定时器，定时调用微信接口查看是否支付成功
      wxdialogVisible: false,
      wxdaojishi: "",
    }
  },
  methods: {
    // 充值金额按钮
    setmoney(val) {
      this.moneycheck = val;
    },
    // 充值自定义金额 ,移除选中值
    setmymoney() {
      this.moneycheck = 0;
    },
    // 充值
    torecharge() {
      if (this.moneycheck != 0) this.info.amount = this.moneycheck;

      let token = localStorage.getItem("token");
      let obj = { ...this.info, ...{ token: token } }
      if (!this.info.amount) {
        return this.$message.error("请输入金额")
      }
      if (this.info.payment_way == 0) {
        return this.$message.error("请选择支付方式")
      }
      console.log(obj)
      this.$post("recharge/pay", obj).then(res => {
        console.log(res)
        if (this.info.payment_way == 1) {
          // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
          let divForm = document.getElementsByTagName('rechargeform')
          if (divForm.length) {
            document.body.removeChild(divForm[0])
          }
          const div = document.createElement('rechargeform'); // 创建div
          div.innerHTML = res; // 将返回的form 放入div
          document.body.appendChild(div)
          document.forms[1].submit(); //将document中的form表单第二项提交 可以打印一下docuemt.forms查看表单项
        } else if (this.info.payment_way == 2) {
          this.wxdialogVisible = true;
          this.$nextTick(() => { //将二维码放进去
            this.$refs.scan_qr.innerHTML = res.form;
            this.wxdaojishi = 60;
            clearInterval(this.timeObj1);
            this.timeObj1 = setInterval(() => {
              if (this.wxdaojishi > 0) {
                this.wxdaojishi -= 1;
              } else {
                this.closewxpay()
              }
            }, 1000) //每秒钟减少一下支付时间

            this.timer = setTimeout(() => {
              clearInterval(this.timeObj2);
              this.timeObj2 = setInterval(() => {
                this.queryWeixinOver(res.order_sn)
              }, 2000);//两秒钟查询一下支付状态
            }, 2000)
          })
        }
      })
    },
    // 定时查询是否支付成功
    queryWeixinOver(order_sn) {
      this.$post("pay/lookup", { order_sn }).then(res => {
        console.log("定时查询是否支付成功", res)
        if (res.code == 200 && res.data.trade_state == "SUCCESS") {
          clearInterval(this.timeObj2);
          this.$router.push({ name: "rechargesuccess" });
        }
      });
    },
    // 关闭微信支付，移除定时器
    closewxpay() {
      clearInterval(this.timeObj1);
      clearInterval(this.timeObj2);
      clearTimeout(this.timer)
      this.timer = null;
      this.wxdialogVisible = false;
    }
  },
  // 清空定时器
  beforeDestroy() {
    clearInterval(this.timeObj1);
    clearInterval(this.timeObj2);
    clearTimeout(this.timer);
    this.timer = null;
  }
}
</script>

<style lang="scss" scoped>
.daojishi {
  text-align: center;
  color: #999;
}
.scan_qr {
  text-align: center;
}
.el-form {
  margin-top: 50px;
}
.money {
  display: flex;
  width: 400px;
  flex-wrap: wrap;
  .el-button {
    margin-left: 0;
    margin-right: 15px;
    margin-bottom: 10px;
    /deep/ span {
      display: inline-block;
      width: 50px;
    }
  }
}
.inputmoney {
  width: 92px !important;
  /deep/.el-input__inner {
    border-radius: 4px;
    font-size: 12px;
  }
}
.payway {
  margin-top: 30px;
  .el-image {
    width: 260px;
    height: 95px;
    border: 2px solid #f1f1f1;
    margin-right: 30px;
    cursor: pointer;
  }
  .redborder {
    border-color: $main_color;
  }
}
.btn {
  margin-top: 80px;
}
.bluebg {
  background: #409eff;
  color: #fff;
}
</style>
