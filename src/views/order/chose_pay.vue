<template>
    <div class="chose_pay">
        <!-- 头部三大栏 -->
        <div class="shop_top" v-if="!iscompany">
            <shop-top></shop-top>
        </div>

        <CompanyTop v-if="iscompany"></CompanyTop>

        <div class="join_over width_center_1200">
            <div class="join_bzt">
                <el-steps :active="2" finish-status="process" simple>
                    <el-step title="我的购物车" icon="el-icon-shopping-cart-full"></el-step>
                    <el-step title="物流地址" icon="el-icon-map-location"></el-step>
                    <el-step title="选择支付" icon="el-icon-mouse"></el-step>
                    <el-step title="支付成功" icon="el-icon-check"></el-step>
                </el-steps>
            </div>
        </div>

        <div class="address_chose width_center_1200">
            <div class="address_chose_title">
                选择支付方式
            </div>

            <ul class="pay_checklist">
                <li class="backpay" :class="radiopay==1?'ischecked':''">
                    <el-radio v-model="radiopay" label="1" :disabled="true">
                        <div>
                            <i class="iconfont" style="color:#0174DF;">&#xe655;</i>
                            <span class="item">建设银行</span>
                        </div>
                        <div v-if="radiopay==1">
                            <span>支付</span>
                            <font class="paymoney">{{total_price}}</font>
                            <span class="yuan">元</span>
                        </div>
                    </el-radio>
                </li>
                <li class="yuepay" :class="radiopay==2?'ischecked':''">
                    <el-radio v-model="radiopay" label="2" :disabled="if_yuedisabled">
                        <div>
                            <i class="iconfont" style="color:goldenrod;">&#xe653;</i>
                            <span class="item">余额支付</span>
                            <font class="yue">用户余额{{balance}}元</font>
                        </div>
                        <div v-if="radiopay==2">
                            <span>支付</span>
                            <font class="paymoney">{{total_price}}</font>
                            <span class="yuan">元</span>
                        </div>
                    </el-radio>
                </li>
                <!-- 企业的才展示 -->
                <li class="shouquanpay" :class="radiopay==3?'ischecked':''" v-if="this.user_info.state == 0 || this.user_info.state == 1">
                    <!-- 根据企业子账户的是否需要审核，决定是否禁用 -->
                    <el-radio v-model="radiopay" label="3" :disabled="if_shouqdisabled">
                        <div>
                            <i class="iconfont main_color">&#xe60f;</i>
                            <span class="item">授权额度</span>
                            <font class="yue">授权额度{{user_info.distribute||user_info.quota}}元</font>
                        </div>
                        <div v-if="radiopay==3">
                            <span>支付</span>
                            <font class="paymoney">{{total_price}}</font>
                            <span class="yuan">元</span>
                        </div>
                    </el-radio>
                </li>

                <section class="pay_btn">
                    <el-button type="danger" @click="topay">立即支付</el-button>
                </section>
            </ul>
            <div class="pay_list">
                <ul>
                    <!-- 1支付宝|2微信|3余额|4授信额度 -->
                    <li @click="pay(1)">
                        <el-image src="/pc/pc_alipay.jpg"></el-image>
                    </li>
                    <li @click="pay(2)">
                        <el-image src="/pc/pc_wxpay.jpg"></el-image>
                    </li>
                    <li @click="orderReview" class="cannotchoose" v-if="if_shenheshow">
                        <i class="iconfont">&#xe60f;</i>
                        <span>订单申报</span>
                    </li>
                </ul>
            </div>
            <div class="address_chose_title">
                订单商品信息
            </div>
            <div class="order_list_title">
                <el-row>
                    <el-col :span="10">
                        <div class="th_title">商品信息</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="th_title">属性信息</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="th_title">单价</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="th_title">数量</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="th_title">优惠</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="th_title">小计</div>
                    </el-col>
                </el-row>
            </div>
            <div class="order_sn">订单号：{{order_sn}}</div>

            <div class="store_list">
                <div class="order_list">
                    <ul>
                        <li v-for="(vo,key) in befor_order_list" :key="key">
                            <el-row>
                                <el-col :span="10">
                                    <div class="goods_info">
                                        <dl>
                                            <dt>
                                                <el-image :src="vo.img_url"></el-image>
                                            </dt>
                                            <dd>{{vo.title}}</dd>
                                        </dl>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="th_title">
                                        <div v-if="vo.attr_text">
                                            <el-tag size="mini" type="info" v-for="(item,index) in vo.attr_text" :key="index">{{item}}</el-tag>
                                        </div>
                                        <div v-else>-</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="th_title">￥{{vo.price}}</div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="th_title" style="text-indent:30px;">x {{vo.number}}</div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="th_title" style="text-indent:40px;"> {{vo.discount==0?"-":vo.discount}} </div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="x_price" style="text-indent:30px;">￥{{(vo.price*vo.number).toFixed(2)}}</div>
                                </el-col>
                            </el-row>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="order_list_bottom">
                <div>商品总额：
                    <span>¥{{amount}}</span>
                </div>
                <div v-if="cashback>0">后台改价：
                    <span>¥{{cashback}}</span>
                </div>
                <div>运费：
                    <span>¥{{total_freight}}</span>
                </div>
                <div v-if="discount>0">优惠：
                    <span>¥{{discount}}</span>
                </div>
                <div class="total">
                    <span>结算：</span>
                    <span class="total_amount">￥{{total_price}}</span>
                </div>
            </div>
        </div>

        <shop-foot></shop-foot>
        <!-- vue 回到顶部 -->
        <el-backtop>
            <div class="iconfont">&#xe735;</div>
        </el-backtop>

        <!-- 支付密码弹出层 -->
        <el-dialog title="支付验证" :visible.sync="dialogVisible" width="30%" class="mydialog">
            <section class="pay_password_font">请输入6位数字支付密码</section>
            <section class="pay_password">
                <el-input placeholder="请输入密码" v-model.number="pay_password" show-password></el-input>
                <span @click="forget_paypass">忘记支付密码?</span>
            </section>
            <section>
                <el-button type="danger" class="submitbtn" @click="submitpay">立即支付</el-button>
            </section>
        </el-dialog>

        <!-- 二维码扫描 -->
        <el-dialog title="微信支付" v-if="wxdialogVisible" :visible.sync="wxdialogVisible" width="20%" :close-on-click-modal="false" :close-on-press-escape="false" @close="closewxpay">
            <div class="daojishi">支付倒计时：
                <span style="color:red">{{wxdaojishi}}</span> s</div>
            <div class="scan_qr" ref="scan_qr"> </div>
        </el-dialog>
    </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import CompanyTop from '@/views/common/companyhead.vue';
import ShopFoot from "@/components/shop_foot.vue"
import { mapState } from 'vuex';
import { setTimeout, setInterval, clearInterval, clearTimeout } from 'timers';
export default {
    components: {
        ShopFoot, ShopTop, CompanyTop
    },
    data() {
        return {
            iscompany: false, //企业用户
            befor_order_list: [], //订单
            amount: "0.00", //商品金额
            cashback: "0.00", //后台改价
            discount: "0.00", //优惠金额
            total_freight: "0.00", //总运费
            total_price: "0.00",  //总金额
            dialogVisible: false,
            wxdialogVisible: false,
            qr_code: '',
            token: "",
            order_sn: "",  //订单号
            order_id:"" ,//订单id
            paytitle: "",
            pay_password: "", //支付密码
            radiopay: "",  //选中支付方式
            if_yuedisabled: true, //余额是否禁用
            if_shouqdisabled: true, //授权是否禁用
            if_shenheshow: false, //子企业账号审核展示
            phonecode: "",   //短信验证码
            timer: null,//延时定时器
            timeObj1: null,//定时器，定时支付时间
            timeObj2: null,  //定时器，定时调用微信接口查看是否支付成功
            wxdaojishi: "", //微信支付倒计时
        };
    },
    computed: {
        ...mapState(["balance", "user_info"])
    },
    created() {
        // status 0是不需要审核，则展示授权额度支付  state1是企业主账号也显示
        if (this.user_info.status == "0" || this.user_info.state == "1") {
            this.if_shouqdisabled = false;
        }
        // status 1是需要审核，则展示提交申请 state1是企业主账号不显示提交申请
        if (this.user_info.status == "1" && this.user_info.state == "0") {
            this.if_shenheshow = true;
        }
        this.iscompany = localStorage.getItem("user_iscompany") == "true";
        this.order_sn = this.$route.query.order_no; //先获取order_sn，不然调用get_order_list中没有order_sn
        this.get_order_list();
    },
    methods: {
        // 忘记支付密码
        forget_paypass() {
            console.log(111)
            let newUrl = this.$router.resolve({ name: "user_safe_pay_passwordforget" });
            window.open(newUrl.href, "_blank");
        },
        // 根据订单号获取订单列表
        get_order_list: function () {
            this.token = localStorage.getItem("token")
            this.$get(this.$api.homeListOrder, { token: this.token, order_sn: this.order_sn }).then(res => {
                console.log(res)
                let allinfo = res.data[0];
                this.befor_order_list = allinfo.details;
                let freight = 0;
                this.befor_order_list.forEach(item => {
                    freight += parseFloat(item.freight);
                    if (item.attr_text !== "") {
                        item.attr_text = item.attr_text.split("->")
                    }
                });
                this.cashback = (parseFloat(allinfo.cashback)).toFixed(2); //后台改价
                this.discount = (parseFloat(allinfo.discount)).toFixed(2);//优惠金额
                this.total_freight = freight.toFixed(2);  //总运费；
                this.amount = (parseFloat(allinfo.amount) - this.total_freight).toFixed(2); //商品总金额
                this.total_price = (parseFloat(allinfo.amount) - this.cashback).toFixed(2); //实际支付总价格

                this.order_sn = allinfo.order_sn;   //订单号
                this.order_id = allinfo.id; //订单ID
                this.total_price > parseFloat(this.balance) ? this.if_yuedisabled = true : this.if_yuedisabled = false;//如果金额小于支付金额，余额禁用
                if (this.user_info.state == "1") { //企业主账号
                    this.total_price > parseFloat(this.user_info.quota) ? this.if_shouqdisabled = true : this.if_shouqdisabled = false;
                }
                if (this.user_info.state == "0") {
                    this.total_price > parseFloat(this.user_info.distribute) ? this.if_shouqdisabled = true : this.if_shouqdisabled = false;
                }
            });
        },

        topay() {
            if (!this.radiopay) {
                return this.$message.error("请选择支付方式")
            }
            this.dialogVisible = true
        },
        // 密码方式立即支付
        submitpay() {
            if (this.radiopay == 1) { //银行卡支付
                return this.$message.error("暂未开通银行卡支付");
            }
            let payway = ""
            if (this.radiopay == 2) { // 余额结算提交
                payway = 3;
            }
            if (this.radiopay == 3) { // 授权额度提交
                payway = 4;
            }
            this.$post(this.$api.homePayOrder, { token: this.token, order_sn: this.order_sn, payment_way: payway, pay_password: this.pay_password }).then(res => {
                console.log("密码支付返回信息", res)
                if (res.code == 200) {//支付成功跳转页面
                    this.dialogVisible = false;
                    this.$router.push({ name: "paysuccess" })
                } else {
                    // return this.$message.error(res.message);
                }
            });
        },
        // 子企业账号提交订单审核
        orderReview() {
            this.$post("order/declare", { order_id: this.order_id, token: this.token }).then(res => {
                console.log("订单审核返回信息", res)
                if (res.code == 200) {
                    this.$router.push({ name: "paysuccess", query: { orderreview: "orderreview" } })
                } else {
                    // return this.$message.error(res.message)
                }
            })
        },
        // 支付（1支付宝，2微信 ，3余额，4授信额度）
        pay(payway) {
            this.$post(this.$api.homePayOrder, { token: this.token, order_sn: this.order_sn, payment_way: payway }).then(res => {
                console.log(res);
                // if (res.code === 400) {
                //     return this.$message.error(res.message);
                // }
                // this.dialogVisible = true;
                // if (payway ===1 ) {
                //     this.paytitle = "支付宝支付"
                // } else if (payway ===2 ) {
                //     this.paytitle = "微信支付"
                // } else if (payway ===3 ) {
                //     this.paytitle = "余额支付"
                // } else if (payway === 4) {
                //     this.paytitle = "授信额度"
                // }

                // 支付宝
                // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
                if (payway == 1) {
                    let divForm = document.getElementsByTagName('divform')
                    if (divForm.length) {
                        document.body.removeChild(divForm[0])
                    }
                    const div = document.createElement('divform'); // 创建div
                    div.innerHTML = res; // 将返回的form 放入div
                    document.body.appendChild(div)
                    document.forms[0].submit();
                } else if (payway == 2) {
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
                                this.queryWeixinOver()
                            }, 2000);//两秒钟查询一下支付状态
                        }, 2000)
                    })
                }
            });
        },
        // 定时查询是否支付成功
        queryWeixinOver() {
            this.$post("pay/lookup", { order_sn: this.order_sn }).then(res => {
                console.log("定时查询是否支付成功", res)
                if (res.code == 200 && res.data.trade_state == "SUCCESS") {
                    clearInterval(this.timeObj2);
                    this.$router.push({ name: "paysuccess" });
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
};
</script>
<style lang="scss" scoped>
.is-disabled {
  opacity: 0.6;
}
.el-radio {
  padding-left: 20px;
  display: flex;
  align-items: center;
  height: 60px;

  .item {
    color: #333;
    font-weight: 700;
  }
  .yue {
    font-size: 12px;
    padding-left: 50px;
  }
  .paymoney {
    font-size: 16px;
    color: red;
    font-weight: 700;
    padding: 0 5px;
  }
  .yuan {
    padding-right: 10px;
  }
  /deep/.el-radio__label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /deep/.el-radio__input {
    padding-right: 7px;
  }
  /deep/.el-radio__input.is-checked .el-radio__inner {
    background: $main_color;
    border-color: $main_color;
  }
  /deep/.el-radio__input .el-radio__inner:hover {
    border-color: #ccc;
  }
  /deep/.el-radio__input.is-checked + .el-radio__label {
    color: #606266;
  }
}

.th_title .el-tag {
  text-indent: 0;
  margin-right: 5px;
}
.scan_qr {
  text-align: center;
}
.daojishi {
  text-align: center;
  color: #999;
}
.order_sn {
  margin-top: 20px;
  font-size: 12px;
  font-weight: 700;
}
.join_bzt {
  margin-top: 40px;
}

.store_list {
  ul li {
    border-bottom: 1px solid #efefef;
    padding-bottom: 20px;
    margin-bottom: 20px;
    .x_price {
      color: $main_color;
    }
    text-indent: 20px;
  }
  ul li .goods_info {
    text-indent: 0px;
  }
  ul li:last-child {
    border-bottom: none;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
  .order_list {
    margin-top: 20px;
    color: #666;
    font-size: 12px;
    border: 1px solid #efefef;
    padding: 20px;
    line-height: 40px;
    .goods_info {
      dl dt {
        width: 40px;
        height: 40px;
        background: #f8f8f8;
        float: left;
        margin-right: 15px;
      }
      dl dd {
        line-height: 20px;
      }
    }
  }
}
.order_list_title {
  color: #666;
  background: #f2f2f2;
  line-height: 40px;
  text-indent: 20px;
}
.address_chose {
  margin-top: 75px;
  font-size: 14px;
  .pay_checklist {
    width: 700px;
    li {
      font: 14px/60px Microsoft Yahei;
      font-weight: 700;
      color: #555;
      border: 1px solid transparent;
      border-bottom: 1px solid #f2f2f2;
      margin-left: 20px;
    }
    section {
      margin-left: 65px;
    }
    .iconfont {
      font-size: 14px;
      padding-right: 5px;
    }
    .ischecked {
      border: 1px solid #e6e6e6;
      box-shadow: 1px 1px 2px 0 #999;
    }
    .pay_btn {
      margin-top: 20px;
      padding-bottom: 50px;
      .el-button {
        width: 200px;
      }
    }
    /deep/.el-button {
      border-radius: 2px;
    }
    /deep/.el-button--danger {
      background-color: $main_color;
      border-color: $main_color;
    }
    .el-button:hover {
      opacity: 0.8;
    }
  }
  .pay_list {
    margin: 0 0 50px 65px;
    ul:after {
      content: "";
      display: block;
      clear: both;
    }
    ul li {
      float: left;
      width: 282px;
      height: 105px;
      box-sizing: border-box;
      border-radius: 3px;
      border: 1px solid #efefef;
      margin-right: 20px;
      -webkit-transition: all 0.2s linear;
      transition: all 0.2s linear;
      cursor: pointer;
    }
    .cannotchoose {
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        color: $main_color;
        font-size: 32px;
      }
      span {
        font-size: 20px;
        color: #666;
        font-weight: 700;
        padding-left: 5px;
        letter-spacing: 2px;
      }
    }
  }
  .address_chose_title {
    font-size: 16px;
    clear: both;
    font-weight: bold;
    padding-bottom: 20px;
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
.order_list_bottom {
  text-align: right;
  padding: 30px;
  font: 12px/30px "微软雅黑";
  color: #666;
  border: 1px solid red;
  .total {
    color: $main_color;
    margin-top: 10px;
    .total_amount {
      font-size: 26px;
    }
  }
  span {
    display: inline-block;
  }
}
</style>