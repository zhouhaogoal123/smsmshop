<template>
    <div class="create_order">
        <!-- 头部三大栏 -->
        <div class="shop_top" v-if="!iscompany">
            <shop-top></shop-top>
        </div>

        <CompanyTop v-if="iscompany"></CompanyTop>

        <div class="join_over width_center_1200">
            <div class="join_bzt">
                <el-steps :active="1" finish-status="process" simple>
                    <el-step title="我的购物车" icon="el-icon-shopping-cart-full"></el-step>
                    <el-step title="物流地址" icon="el-icon-map-location"></el-step>
                    <el-step title="选择支付" icon="el-icon-mouse"></el-step>
                    <el-step title="支付成功" icon="el-icon-check"></el-step>
                </el-steps>
            </div>
        </div>

        <div class="address_chose width_center_1200">
            <div class="address_chose_title">
                选择送货地址
            </div>
            <!-- 收货地址 -->
            <OrderAddress @setaddress="setaddress"></OrderAddress>

            <div class="address_chose_title" style="margin-top:30px;">
                订单商品信息
            </div>
            <div class="order_list_title">
                <el-row>
                    <el-col :span="10">
                        <div class="th_title">商品信息</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="th_title">属性信息</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="th_title">单价</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="th_title">数量</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="th_title">小计</div>
                    </el-col>
                </el-row>
            </div>

            <!-- 已选购物车数据 -->
            <div class="store_list" v-for="(vo,k) in cart_checklist" :key="k">
                <div class="order_list">
                    <ul>
                        <li>
                            <el-row>
                                <el-col :span="10">
                                    <div class="goods_info">
                                        <dl>
                                            <dt>
                                                <el-image :src="vo.img_url" fit="cover"> </el-image>
                                            </dt>
                                            <dd>{{vo.title}}</dd>
                                        </dl>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="th_title">
                                        <div v-if="$isEmpty(vo.attr)">-</div>
                                        <div v-else>{{vo.attr.attr_text}}</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="th_title">￥{{vo.price}}</div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="th_title" style="text-indent:30px;">x {{vo.number}}</div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="x_price" style="text-indent:30px;">￥{{(vo.price*vo.number).toFixed(2)}}</div>
                                </el-col>
                            </el-row>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- <div class="address_chose_title">
                发票信息
            </div>
            <div class="invoice">
                <span>{{invoice_default.paper==0?"电子":"纸质"}}</span>
                <span style="padding-left:0;">{{invoice_default.type==1?"普通发票":"增值税专用发票"}}</span>
                <span>{{invoice_default.sort==1?"个人":"单位"}}</span>
                <span>商品明细</span>
                <span class="edit" @click="dialogVisible = true">修改</span>
            </div> -->

            <div class="remark">
                <div class="remark_title">备注</div>
                <el-input class="remark_input" v-model="addorder_info.remark" show-word-limit type="textarea" maxlength="200"></el-input>
            </div>

            <div class="foot_create_order">
                <div class="total_price">
                    <span>结算：</span>
                    ￥ {{addorder_info.amount}}
                    <font class="main_color">( {{addorder_info.freight>0?'含运费:￥'+addorder_info.freight:'免运费'}} )</font>
                </div>
                <div class="clear"></div>
                <div class="foot_create_order_btn">
                    <el-button type="danger" @click="create_order">前往支付</el-button>
                </div>
            </div>
        </div>
        <shop-foot></shop-foot>
        <!-- vue 回到顶部 -->
        <el-backtop>
            <div class="iconfont">&#xe735;</div>
        </el-backtop>
        <!-- close-on-click-modal为false，不能通过点击空白地方关闭 -->
        <!-- <el-dialog title="发票信息" :visible.sync="dialogVisible" width="50%" class="invoicedialog" :close-on-click-modal="false">
            <DialogInvoice :invoice_default="invoice_default" :geren_info="geren_info" :danwei_info="danwei_info" :zhuanyong_info="zhuanyong_info" :addressinfo="info" v-if="dialogVisible" @saveinvoice="saveinvoice" @cancelinvoice="cancelinvoice"></DialogInvoice>
        </el-dialog> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ShopTop from "@/components/head.vue";
import CompanyTop from '@/views/common/companyhead.vue';
import ShopFoot from "@/components/shop_foot.vue";
import OrderAddress from './order_address.vue';//收货地址
import DialogInvoice from '@/views/order/dialog_invoice.vue';
export default {
    name: "create_order",
    components: {
        ShopTop, CompanyTop, ShopFoot, OrderAddress, DialogInvoice
    },
    props: {},
    data() {
        return {
            iscompany: "",    //企业用户
            cart_checklist: [], //已选购物车列表
            total_price: 0,       //总金额
            total_freight: 0,     //总运费
            addorder_info: {
                token: "",
                addre_id: "", //地址的id
                total_money: "", //订单总金额
                amount: "", //实际支付金额
                freight: 0, //运费
                discount: null, //优惠活动金额
                remark: '',           // 备注
            },
            dialogVisible: false, //发票修改dialog

            // invoice_default: { //发票默认信息（默认普通发票、电子版、个人、抬头）
            //     type: '1',          //发票类型 1普通发票 2专票
            //     paper: "0",         //发票版本 0电子
            //     content: '1',       //发票内容
            //     sort: "1",          //发票抬头类型 1个人 2单位
            // },
            geren_info: {//个人发票私有属性
                title: "",          //默认个人抬头为选中地址的姓名
                name: '',           //收票人姓名
                district_id: "",    //收票人地址
                address: "",       //收票人详细地址
                phone: '',         //收票人手机号
            },
            danwei_info: {//单位发票私有属性
                title: "",          //发票抬头
                identifier: "",     //单位发票税号
                site: "",        //单位注册地址
                mobile: "",          //单位注册电话
                bank: "",           //单位开户银行
                account: "",   //单位开户银行卡号
                name: '',      //收票人姓名
                district_id: "",    //收票人地址
                address: "",       //收票人详细地址
                phone: '',         //收票人手机号
            },
            zhuanyong_info: {//专用发票私有属性
                title: "",          //发票抬头
                identifier: "",     //单位发票税号
                site: "",        //单位注册地址
                mobile: "",          //单位注册电话
                bank: "",           //单位开户银行
                account: "",   //单位开户银行卡号
                name: '',      //收票人姓名
                district_id: "",    //收票人地址
                address: "",       //收票人详细地址
                phone: '',         //收票人手机号
            },
            info: { //收票人地址信息
                addoredit: "1",   //0新增,1修改
                province: "",  //省
                city: "",      //市
                district: "",  //区
                street: "",    //街道
                province_id: "",  //省
                city_id: "",      //市
                district_id: "",  //区
                street_id: "",    //街道
            },
        };
    },
    created() {
        this.iscompany = localStorage.getItem("user_iscompany") == "true";
        this.get_cart_list();
        // this.getinvoiceifo();
    },
    methods: {
        // 发票信息
        // getinvoiceifo() {
        //     let token = localStorage.getItem("token")
        //     this.$get("department/proof_show", { token }).then(res => {
        //         console.log("增值税专用发票相关信息", res)
        //         let { data } = res;

        //         this.zhuanyong_info.title = data.title
        //         this.zhuanyong_info.identifier = data.identifier
        //         this.zhuanyong_info.site = data.site
        //         this.zhuanyong_info.mobile = data.mobile
        //         this.zhuanyong_info.bank = data.bank
        //         this.zhuanyong_info.account = data.account
        //         this.zhuanyong_info.name = data.name
        //         this.zhuanyong_info.district_id = data.district_id
        //         this.zhuanyong_info.address = data.address
        //         this.zhuanyong_info.phone = data.phone

        //         this.danwei_info = JSON.parse(JSON.stringify(this.zhuanyong_info))

        //         if (!data.province) { return this.info.addoredit = 0 }
        //         this.info.province = data.province || "";
        //         this.info.city = data.city || "";
        //         this.info.district = data.district || "";
        //         this.info.street = data.street || "";
        //         this.info.province_id = data.province_id || "";
        //         this.info.city_id = data.city_id || "";
        //         this.info.district_id = data.district_id || "";
        //         this.info.street_id = data.street_id || "";
        //     })
        // },
        // 取消发票
        // cancelinvoice() {
        //     this.dialogVisible = false;
        //     console.log("取消发票")
        // },
        // 保存发票
        // saveinvoice(commoninfo, primaryinfo, edittype, addressinfo) {
        //     this.invoice_default = JSON.parse(JSON.stringify(commoninfo));
        //     this.info = JSON.parse(JSON.stringify(addressinfo));
        //     this.dialogVisible = false;
        //     switch (edittype) {
        //         case 1: //个人发票
        //             this.geren_info = JSON.parse(JSON.stringify(primaryinfo));
        //             break;
        //         case 2: //单位发票
        //             this.danwei_info = JSON.parse(JSON.stringify(primaryinfo));
        //             break;
        //         case 3: //专用发票
        //             this.zhuanyong_info = JSON.parse(JSON.stringify(primaryinfo));
        //             break;
        //         default:
        //             return;
        //     }
        //     console.log("dialog确认按钮点击，收到的值", commoninfo, primaryinfo, edittype, addressinfo)
        // },
        // 获取已选中购物车列表
        get_cart_list: function () {
            this.token = localStorage.getItem("token");
            this.$get(this.$api.homeGetCartList, { token: this.token, state: 1 }).then(res => {
                console.log("已选中购物车列表", res)
                this.cart_checklist = res.data;
                let myfreight = 0;//总运费
                this.cart_checklist.forEach(item => {
                    if (item.attr) {//属性信息处理
                        let attr_text = item.attrs.find(itemson => {
                            return item.attr.id == itemson.id
                        })
                        item.attr.attr_text = attr_text.attr_text;
                    }
                    item.price = parseFloat(item.price).toFixed(2)
                    myfreight += item.freight;
                })
                this.sum_price();//订单总金额
                this.addorder_info.freight = myfreight.toFixed(2);//总运费
                this.addorder_info.amount = (this.addorder_info.total_money + myfreight).toFixed(2);//实际支付总金额（总金额+运费）
            });
        },
        // 订单总金额
        sum_price() {
            let total_price = 0;
            this.cart_checklist.forEach(item => {
                total_price += (item.number * item.price);
            });
            this.addorder_info.total_money = total_price;
        },
        //提交订单 
        create_order: function () {
            // 判断是否有收货地址
            if (this.address_list <= 0) {
                return this.$message.error('请先设置收货地址！');
            }
            this.addorder_info.token = localStorage.getItem("token");
            // let final_invoiceinfo = ""
            // if (this.invoice_default.type == 1) { //普通发票
            //     if (this.invoice_default.sort == 1) {//个人
            //         final_invoiceinfo = this.geren_info;
            //     } else {//单位
            //         final_invoiceinfo = this.danwei_info;
            //     }
            // } else {//专票
            //     final_invoiceinfo = this.zhuanyong_info;
            // }
            // if (this.invoice_default.paper == 0) { //电子发票移除收票人相关字段
            //     delete final_invoiceinfo.name
            //     delete final_invoiceinfo.phone
            //     delete final_invoiceinfo.district_id
            //     delete final_invoiceinfo.address
            // }
            // console.log(final_invoiceinfo,this.invoice_default)
            // this.$post(this.$api.homeCreateOrder, { ...this.addorder_info, ...this.invoice_default, ...final_invoiceinfo }).then(res => {
            let newaddorder_info = { ...this.addorder_info }
            delete newaddorder_info.freight //不要传邮费了
            this.$post(this.$api.homeCreateOrder, newaddorder_info).then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.$message.success(res.message);
                    let num = parseInt(this.$store.state.cart_count) - this.cart_checklist.length; // vuex修改购物车数据（刷新就不行了）
                    this.$store.commit("setCartCount", num);
                    this.$router.push({ name: "choosepay", query: { order_no: res.data.order_sn } });
                } else {
                    // this.$message.error(res.message);
                }
            });
        },
        // 设置收货地址
        setaddress(id, addre_id, detail, name, phone) {
            this.addorder_info.addre_id = id;
            this.geren_info.title = name; //个人发票默认抬头
            console.log("地址相关信息", id, addre_id, detail, name, phone)
        },
    },
};
</script>
<style lang="scss" scoped>
.th_title .el-tag {
  text-indent: 0;
  margin-right: 5px;
}
.remark {
  margin-top: 40px;
  color: #666;
  .remark_title {
    background: #f2f2f2;
    line-height: 40px;
    padding-left: 20px;
  }
  .remark_input {
    margin-top: 20px;
    width: 300px;
  }
}

.join_bzt {
  margin-top: 40px;
}
.foot_create_order {
  margin-top: 50px;
  float: right;
  margin-right: 30px;
  .total_price {
    font-size: 28px;
    color: $main_color;
    line-height: 28px;
    span {
      float: left;
      font-size: 14px;
      color: #333;
    }
    font {
      float: right;
      font-size: 14px;
      color: #666;
      margin-left: 20px;
    }
  }
  .foot_create_order_btn {
    float: right;
    margin-top: 20px;
    margin-bottom: 40px;
  }
}
.store_list {
  margin-bottom: 30px;
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
  margin-bottom: 20px;
}
.address_chose {
  margin-top: 75px;
  font-size: 14px;
  .address_chose_title {
    font-size: 16px;
    clear: both;
    font-weight: bold;
    padding-bottom: 20px;
  }
}
.invoice {
  padding: 0 15px;
  span {
    padding-left: 15px;
    color: #666;
    font-size: 13px;
  }
  span.edit {
    color: #005ea7;
    cursor: pointer;
    padding-right: 15px;
  }
  span.edit:hover {
    color: $main_color;
  }
}
.invoicedialog {
  /deep/.el-dialog__header {
    position: relative;
    padding: 5px 10px;
    background: #f1f1f1;
    span {
      font-size: 14px;
      color: #666;
    }
  }
  /deep/.el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 15px;
  }
  /deep/.el-dialog__body {
    padding: 20px;
  }
}
</style>