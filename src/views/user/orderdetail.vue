<template>
  <div class="orderdetail">
    <div class="topbread bgwhite">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="iscompany?{name:'com_user_default'}:{ name: 'user_default' }">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="iscompany?{name:'com_user_order'}:{ name: 'user_order' }">我的订单</el-breadcrumb-item>
        <el-breadcrumb-item class="orderid">订单：{{orderid}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="myprocess bgwhite">
      <div class="myprocess_left">
        <div class="orderid">订单号：{{orderid}}</div>
        <div class="topfont" :style="order_info.status==5||order_info.status==6?'color:green;':'color:#ca141e;'">
          {{order_info.status_text}}
        </div>
        <div v-if="order_info.status==0">
          <span class="btn" @click="$router.push({name:'choosepay',query:{order_no:orderid}})">付款</span>
        </div>
        <div v-if="order_info.status==1">
          <span class="nobtn">待发货</span>
        </div>
        <div v-if="order_info.status==2" @click="checkgoods">
          <span class="nobtn">待收货</span>
        </div>
        <div v-if="order_info.status==3">
          <span class="nobtn">待评价</span>
        </div>
        <div v-if="order_info.status==4">
          <span class="nobtn">已完成</span>
        </div>
        <div v-if="order_info.status==5">
          <span class="nobtn">已取消</span>
        </div>
        <div v-if="order_info.status==6">
          <span class="nobtn">支付超时</span>
        </div>
        <div class="bottomfont" v-if="order_info.status!=5&&order_info.status!=6&&ifuporder">
          <i class="el-icon-tickets"></i>
          <span @click="toinvoicedetail()">查看发票详情</span>
        </div>
        <div class="bottomfont" v-if="order_info.status==0&&ifuporder" @click="cancelorder">
          <i class="el-icon-remove-outline"></i>
          <span>取消订单</span>
        </div>
      </div>
      <div class="myprocess_right" v-if="order_info.status!=5&&order_info.status!=6">
        <el-steps :active="order_info.status+1" align-center>
          <el-step title="提交订单" icon="el-icon-document" :description="order_info.created_at"></el-step>
          <el-step title="付款成功" icon="el-icon-bank-card" :description="order_info.payment_at"></el-step>
          <el-step title="商品出库" icon="el-icon-truck"></el-step>
          <el-step title="已收货" icon="el-icon-present"></el-step>
          <el-step title="完成" icon="el-icon-document-checked"></el-step>
        </el-steps>
      </div>
      <div class="myprocess_right2" v-else>
        <el-steps :active="3" align-center>
          <el-step title="提交申请" icon="el-icon-document" :description="order_info.created_at"></el-step>
          <el-step title="系统审核" icon="el-icon-bank-card"></el-step>
          <el-step title="完成" icon="el-icon-document-checked"></el-step>
        </el-steps>
      </div>
    </div>

    <div class="sendtype bgwhite">
      <div class="senditem">
        <header>收货人信息</header>
        <section>收货人：{{order_info.name}}</section>
        <section>地址：{{order_info.addre}}</section>
        <section>手机号码：{{phonenum}}</section>
      </div>
      <div class="senditem">
        <header>配送信息</header>
        <section>配送方式：三目配送</section>
        <section>期望送货日期：尽快</section>
      </div>
      <div class="senditem">
        <header>付款信息</header>
        <section v-if="order_info.payment_way==0">未支付</section>
        <section v-if="order_info.payment_way==1">支付宝支付</section>
        <section v-if="order_info.payment_way==2">微信支付</section>
        <section v-if="order_info.payment_way==3">余额支付</section>
      </div>
    </div>

    <div class="store" style="color:#610b4b;">三目自营</div>

    <!-- 已选购物车数据 -->
    <div class="order_list clear">
      <div class="order_list_title">
        <el-row>
          <el-col :span="10">
            <div class="th_title">商品信息</div>
          </el-col>
          <el-col :span="6">
            <div class="th_title">属性信息</div>
          </el-col>
          <el-col :span="3">
            <div class="th_title">单价</div>
          </el-col>
          <el-col :span="2">
            <div class="th_title">数量</div>
          </el-col>
          <el-col :span="3">
            <div class="th_title">小计</div>
          </el-col>
        </el-row>
      </div>

      <ul>
        <li v-for="(vo,k) in order_list" :key="k" class="oneorder">
          <el-row>
            <el-col :span="10" class="line1">
              <div class="goods_img" :title="vo.title">
                <el-image :src="vo.img_url" fit="cover"> </el-image>
              </div>
              <div class="goods_title" :title="vo.title">{{vo.title}}</div>
            </el-col>
            <el-col :span="6">
              <div>
                <div v-if="$isEmpty(vo.spec_text)">-</div>
                <div v-else class="goods_attr">
                  <span v-for="(item,index) in  vo.spec_text" :key="index">{{item.meta_key}}：{{item.meta_value}}；</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>￥{{vo.price}}</div>
            </el-col>
            <el-col :span="2">
              <div>x {{vo.number}}</div>
            </el-col>
            <el-col :span="3">
              <div>￥{{vo.price*vo.number}}</div>
            </el-col>
          </el-row>
        </li>
      </ul>

      <div class="order_list_bottom">
        <div>商品总额：
          <span>¥{{order_info.total_money}}</span>
        </div>
        <div>后台改价：
          <span>- ¥{{order_info.cashback}}</span>
        </div>
        <div>运费：
          <span>+ ¥{{finalfreight}}</span>
        </div>
        <div>优惠：
          <span>- ¥{{order_info.discount}}</span>
        </div>
        <div class="total">
          <span v-if="order_info.status_text=='未支付'||order_info.status_text=='已取消'">需付款：</span>
          <span v-else>已付款：</span>
          <span class="total_amount">¥{{paymoney}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "orderdetail",
  data() {
    return {
      orderid: "",     //订单id
      orderupid: "",  //上传订单id
      order_info: {},   //全部订单信息
      paymoney: "", //实付金额
      finalfreight: "",//运费
      order_list: [],   //订单列表
      phonenum: "",     //电话号码
      iscompany: "",
      ifuporder: false, //是否是子账号申报订单
    }
  },
  computed: {
    ...mapState("user_info")
  },
  created() {
    this.orderid = this.$route.query.order_no;
    this.orderupid = this.$route.query.order_id;
    this.ifuporder = this.$route.query.user_id == this.user_info;
    this.getorderDetail();
    this.iscompany = this.$route.path.startsWith("/company");
  },
  methods: {
    getorderDetail() {
      let token = localStorage.getItem("token");
      this.$get("order/show", { token: token, order_id: this.orderupid }).then(res => {
        console.log("具体订单信息", res)
        if (res.code == 200) {
          let arr1 = res.data.created_at.split("T");
          let arr2 = arr1[1].split(".");
          res.data.created_at = arr1[0] + " " + arr2[0];
          this.order_info = res.data;
          this.paymoney = (parseFloat(res.data.amount) - parseFloat(res.data.cashback)).toFixed(2); //最后实付金额
          this.finalfreight = (parseFloat(res.data.amount) - parseFloat(res.data.total_money)).toFixed(2) // 运费
          let oldphone = res.data.phone.split("");
          oldphone.splice(3, 4, "****");
          this.phonenum = oldphone.join(""); //用*替代后的电话号码
          this.order_list = res.data.details;
          this.order_list.forEach(item => {
            if (item.spec_text) {
              item.spec_text = JSON.parse(item.spec_text);
            }
          })
        } else {
          // this.$message.error(res.message)
        }
      });
    },
    cancelorder() {
      let token = localStorage.getItem("token");
      this.$post(this.$api.homeCancelOrder, { token, order_id: this.orderupid }).then((res) => {
        if (res.code == 200) {
          if (this.iscompany) {
            this.$router.push({ name: 'com_user_order' })
          } else {
            this.$router.push({ name: 'user_order' })
          }
          this.$message.success(res.message)
        } else {
          // this.$message.error(res.message);
        }
      })
    },
    toinvoicedetail() {
      let newUrl = ""
      if (this.iscompany) {
        newUrl = this.$router.resolve({ name: 'com_invoicedetail', query: { order_id: this.orderupid } })
      } else {
        newUrl = this.$router.resolve({ name: 'invoicedetail', query: { order_id: this.orderupid } })
      }
      window.open(newUrl.href, "_blank");

    }
  }
}
</script>

<style lang="scss" scoped>
.bgwhite {
  background: #fff;
}
.nobtn {
  color: green;
  font-weight: 700;
}
// 标签栏
.el-breadcrumb {
  line-height: 14px;
  padding: 10px 20px;
  margin-bottom: 20px;
  /deep/.el-breadcrumb__inner a,
  /deep/.el-breadcrumb__inner.is-link {
    font-weight: 400;
    color: #555;
  }
  .orderid /deep/.el-breadcrumb__inner {
    color: #610b4b;
    font-weight: 700;
    font-size: 13px;
  }
}
// 步骤条
.myprocess {
  display: flex;
  margin-bottom: 40px;
  .myprocess_left {
    flex: 1;
    text-align: center;
    margin: 15px 0;
    border-right: 1px solid #d8d8d8;
    .orderid {
      font: 12px/12px "微软雅黑";
      color: #999;
      padding-bottom: 20px;
    }
    .topfont {
      font-weight: 700;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .btn {
      display: inline-block;
      font: 14px/14px "微软雅黑";
      padding: 3px 20px;
      border-radius: 2px;
      cursor: pointer;
      color: $main_color;
      border: 1px solid $main_color;
      margin-bottom: 5px;
    }
    .btn:hover {
      background: $main_color;
      color: #fff;
    }
    .bottomfont {
      padding-top: 8px;
      font: 12px/14px "微软雅黑";
      color: #666;
    }
    .bottomfont span {
      padding-left: 5px;
    }
    .bottomfont:hover {
      color: $main_color;
      cursor: pointer;
    }
  }
  .myprocess_right {
    flex: 3;
    .el-steps {
      padding: 50px 0;
      /deep/.el-step__head.is-finish,
      /deep/.el-step__title.is-finish,
      /deep/.el-step__description.is-finish {
        color: $main_color;
        border-color: $main_color;
      }
      /deep/.el-step__title.is-process {
        font-weight: 400;
      }
    }
  }
  .myprocess_right2 {
    flex: 3;
    .el-steps {
      padding: 50px 0;
      /deep/.el-step__head.is-finish,
      /deep/.el-step__title.is-finish,
      /deep/.el-step__description.is-finish {
        color: green;
        border-color: green;
      }
      /deep/.el-step__title.is-process {
        font-weight: 400;
      }
    }
  }
}
// 收货信息
.sendtype {
  display: flex;
  height: 200px;
  .senditem {
    flex: 1;
    margin: 15px 0;
    padding-left: 20px;
    border-right: 1px solid #d8d8d8;
    header {
      font: 14px/30px "微软雅黑";
      color: #444;
    }
    section {
      color: #777;
      font: 12px/24px "微软雅黑";
    }
  }
}
.store {
  font: 12px/12px "微软雅黑";
  margin: 20px 0;
  color: #666;
}
// 订单列表
.order_list {
  background: #fff;
  .order_list_title {
    padding: 0 20px;
    font-size: 12px;
    color: #666;
    background: #fafafa;
    line-height: 40px;
  }
  .order_list_bottom {
    height: 160px;
    text-align: right;
    padding: 30px;
    font: 12px/30px "微软雅黑";
    color: #666;
    .total {
      color: $main_color;
      margin-top: 10px;
      .total_amount {
        font-size: 26px;
      }
    }
    span {
      display: inline-block;
      width: 130px;
    }
  }
}
.oneorder {
  padding: 20px;
  border-bottom: 1px solid #f2f2f2;
  font: 12px/20px "微软雅黑";
  color: #666;
  .line1 {
    display: flex;
    .goods_img {
      width: 60px;
      height: 60px;
      padding-right: 10px;
      cursor: pointer;
    }
    .goods_img:hover {
      opacity: 0.9;
    }
    .goods_title {
      width: 280px;
      font: 12px/20px "微软雅黑";
      color: #666;
      height: 40px;
      overflow: hidden;
    }
    .goods_title:hover {
      color: $main_color;
      cursor: pointer;
    }
  }
  .goods_attr {
    width: 200px;
    color: #999;
    height: 60px;
    overflow-y: auto;
  }
}
</style>
