<template>
  <div class="user_index_order_list">
    <el-row class="topline">
      <el-col :span="13">商品详情</el-col>
      <el-col :span="11">
        <el-row>
          <el-col :span="6">收货人</el-col>
          <el-col :span="6">金额</el-col>
          <el-col :span="6">状态</el-col>
          <el-col :span="6">操作</el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="oneitem" v-for="(v,k) in order_list_last" :key="k">
      <div class="orderline">
        <div>
          <span style="padding-right:10px;">{{ v.created_at }}</span>
          <span>订单号：</span>
          <span class="orderid" @click="to_order_detail(v.order_sn,v.id,v.user_id);">{{ v.order_sn }} </span>
        </div>
      </div>
      <ul>
        <div class="ul_left">
          <li v-for="(vo,key) in v.details" :key="key">
            <el-row>
              <el-col :span="18">
                <div class="goods_info">
                  <dl>
                    <a @click="todetail(vo.good_sn)">
                      <dt>
                        <el-image :src="vo.img_url" fit="cover" :title="vo.title" lazy> </el-image>
                      </dt>
                    </a>
                    <a @click="todetail(vo.good_sn)">
                      <dd :title="vo.title" style="word-break: break-all">{{vo.title}}</dd>
                    </a>
                  </dl>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="th_title">x {{ vo.number }}</div>
              </el-col>
              <el-col :span="4">
                <!-- <section v-if="v.status=='3'&&v.user_id==user_info.id" class="tocomment">
                  <el-button v-if="!vo.comment" size="mini" type="info" @click="gocomment(vo.id,vo.good_sn,vo.title,vo.img_url,vo.price)">立即评价</el-button>
                </section> -->
                <section v-if="v.status=='1'&&vo.apply_status=='1'&&v.user_id==user_info.id" class="aftersale" @click="toaftersale('backchange',vo.id)">退款</section>
                <section v-if="v.status=='2'&&vo.apply_status=='1'&&v.user_id==user_info.id" class="aftersale" @click="toaftersale('waitinggoods',vo.id)">退货/换货</section>
                <section v-if="(v.status=='3'||v.status=='4')&&vo.apply_status=='1'&&v.user_id==user_info.id" class="aftersale" @click="toaftersale('aftersale',vo.id)">申请售后</section>
                <section v-if="vo.apply_status=='0'" class="aftersale" @click="serviceDetail(vo.apply.id)">售后详情</section>
              </el-col>
            </el-row>
            <div class="clear"></div>
          </li>
        </div>
        <div class="ul_right">
          <!-- 第一栏 -->
          <div>
            <section>
              {{v.user_name}}
              <span class="el-icon-user" style="color:#888;"></span>
              <div v-if="v.user_id!=user_info.id" style="padding:0;">
                <span class="main_color">（{{v.department}}）</span>
              </div>
            </section>
          </div>

          <!-- 第二栏 -->
          <div class="secondline">
            <section>￥{{v.amount}}</section>
            <section v-if="v.status==0" class="orderstatus">应付</section>
            <section v-else-if="v.status==1||v.status==2||v.status==3" class="orderstatus">已付</section>
          </div>
          <!-- 第三栏 -->
          <div class="thirdline">
            <section :class="(v.status_text==='待发货')?'othercolor':''" class="colordefault">{{v.status_text}}</section>
            <section class="hoverred" @click="to_order_detail(v.order_sn,v.id,v.user_id)">订单详情</section>
          </div>

          <!-- 最后一栏 -->
          <div class="lastline">
            <!-- status 0未支付、1待发货、2待收货、3已完成、4已取消、5支付超时 -->
            <section class="payit" v-if="v.status=='0'">
              <el-button size="mini" @click="tobill(v.order_sn)">付款</el-button>
            </section>
            <section class="payit" v-if="v.status=='2'&&v.user_id==user_info.id">
              <el-button size="mini" @click="checkgoods(v.id)">确认收货</el-button>
            </section>
            <section class="borderred" v-if="v.status=='3'">
              <el-button size="mini" @click="gobuy(v.id)" type="danger">再来一单</el-button>
            </section>
            <section class="borderred" v-if="v.status=='4'||v.status=='5'">
              <el-button size="mini" @click="gobuy(v.id)" type="danger">立即购买</el-button>
            </section>
            <section class="hoverred" v-if="(v.state==0)&&v.user_id==user_info.id&&(v.status==1||v.status==2||v.status==3)" @click="ticketApply(v.id)">申请发票</section>
            <section class="hoverred" v-if="(v.state==1)&&v.user_id==user_info.id&&(v.status==1||v.status==2||v.status==3)" @click="ticketDetail(v.id)">查看发票</section>
            <section class="hoverred" v-if="v.status==0&&v.user_id==user_info.id" @click="cancelorder(v.id)">取消订单</section>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      order_list_last: []
    }
  },
  props: {
    order_list: {
      required: true,
      default: []
    }
  },
  watch: {
    order_list: {
      handler(newval) {
        console.log("子组件orderlist", newval);
        newval.forEach(item => {
          if (parseFloat(item.cashback)) {
            item.amount = (parseFloat(item.amount) - parseFloat(item.cashback)).toFixed(2)
          }
        })
        this.order_list_last = newval
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(["user_info"])
  },
  methods: {
    // 订单详情
    to_order_detail(order_sn, id, user_id) {
      let newUrl = ""
      if (this.$route.path.startsWith("/company")) {
        newUrl = this.$router.resolve({ name: 'com_user_order_detail', query: { order_no: order_sn, order_id: id, user_id } })
      } else {
        newUrl = this.$router.resolve({ name: 'user_order_detail', query: { order_no: order_sn, order_id: id, user_id } })
      }
      window.open(newUrl.href, "_blank");
    },
    // 取消订单
    cancelorder(id) {
      let token = localStorage.getItem("token");
      this.$post(this.$api.homeCancelOrder, { token, order_id: id }).then((res) => {
        if (res.code == 200) {
          this.$emit("getorder_census"); //重新获取订单状态数量
          this.$emit("get_user_order"); //重新获取订单列表
        } else {
          // this.$message.error(res.message);
        }
      })
    },
    // 确认收货
    checkgoods(order_id) {
      let token = localStorage.getItem("token");
      this.$post("order/delivery", { order_id, token }).then((res) => {
        if (res.code == 200) {
          this.$emit("getorder_census"); //重新获取订单状态数量
          this.$emit("get_user_order", 3); //重新获取订单列表，并且选中已完成（之前是待评论）
        } else {
          // this.$message.error(res.message)
        }
      })
    },
    // 申请发票
    ticketApply(order_sn) {
      if (this.$route.path.startsWith("/company")) {
        this.$router.push({ name: 'com_invoiceapply', query: { order_id: order_sn } })
      } else {
        this.$router.push({ name: 'invoiceapply', query: { order_id: order_sn } })
      }
    },
    // 查看发票
    ticketDetail(order_sn) {
      if (this.$route.path.startsWith("/company")) {
        this.$router.push({ name: 'com_invoicedetail', query: { order_id: order_sn } })
      } else {
        this.$router.push({ name: 'invoicedetail', query: { order_id: order_sn } })
      }
    },

    // 跳转到申请售后页面
    toaftersale(type, id) {
      let newUrl = ""
      if (this.$route.path.startsWith("/company")) {
        newUrl = this.$router.resolve({ name: "com_chooseservicetype", query: { service: type, id } });
      } else {
        newUrl = this.$router.resolve({ name: "chooseservicetype", query: { service: type, id } });
      }
      window.open(newUrl.href, '_blank');
    },

    // 跳到详情页面
    todetail(good_sn) {
      let newUrl = ""
      if (this.$route.path.startsWith("/company")) {
        newUrl = this.$router.resolve({ path: '/company/goodsdetail/' + good_sn })
      } else {
        newUrl = this.$router.resolve({ path: '/goodsdetail/' + good_sn })
      }
      window.open(newUrl.href, "_blank");
    },

    //去付款
    tobill(order_sn) {
      let newUrl = this.$router.resolve({ name: 'choosepay', query: { order_no: order_sn } })
      window.open(newUrl.href, "_blank");
    },

    // 前往评论、新页面
    gocomment(detailid, orderid, title, img_url, myprice) {
      let newUrl = ""
      if (this.$route.path.startsWith("/company")) {
        newUrl = this.$router.resolve({ name: 'com_home_comment_add', query: { doit: detailid, orderid, title, img_url, myprice } });
      } else {
        newUrl = this.$router.resolve({ name: 'home_comment_add', query: { doit: detailid, orderid, title, img_url, myprice } });
      }
      window.open(newUrl.href, '_blank');
    },

    // 再来一单
    gobuy(id) {
      this.$post("cart/repurchase", { token: localStorage.getItem("token"), order_id: id }).then(res => {
        if (res.code == 200) {
          this.$store.commit("setCartCount", res.data.cart_count)
          if (this.iscompany) {
            this.$router.push({ name: "company_mycart" })
          } else {
            this.$router.push({ name: "mycart" })
          }
          this.$message.success("添加成功")
        }
      })
    },

    // 跳转售后详情
    serviceDetail(id) {
      if (this.iscompany) {
        this.$router.push({ name: "com_aftersaledetail", query: { id: id } })
      } else {
        this.$router.push({ name: "aftersaledetail", query: { id: id } })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.topline {
  text-align: center;
  color: #777;
  font-size: 12px;
  line-height: 30px;
  background: #f1f1f1;
  margin-top: 10px;
  margin-bottom: 20px;
}
.user_index_order_list {
  margin-bottom: 50px;
  .oneitem {
    margin-bottom: 30px;
  }
  .orderline {
    background: #efefef;
    font-size: 12px;
    line-height: 30px;
    margin-top: 5px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    color: #999;
    .orderid {
      color: #666;
    }
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
    background: #f6f6f6;
  }
  .ul_left {
    width: 500px;
    border-right: 1px solid #efefef;
    li {
      width: 500px;
      box-sizing: border-box;
      padding: 20px 10px;
      border-top: 1px solid #efefef;
    }
    .tocomment {
      margin-left: 15px;
      margin-bottom: 10px;
    }
    .aftersale {
      font: 12px/20px "微软雅黑";
      color: #555;
      text-align: center;
      margin-left: 15px;
      cursor: pointer;
    }
    .aftersale:hover {
      color: $main_color;
    }
  }
  .ul_right {
    width: 404px;
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
    .secondline {
      section {
        font-weight: 700;
      }
      .orderstatus {
        line-height: 20px;
        padding: 0;
        padding-top: 5px;
        font-weight: 700;
        color: #999;
        border-top: 2px solid #e6e6e6;
      }
    }
    .thirdline {
      .colordefault {
        color: #a8a5a4;
        margin-bottom: 5px;
      }
      .othercolor {
        color: #fd5b2d;
      }
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
    width: 280px;
    font-size: 12px;
    a:hover {
      cursor: pointer;
    }
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
    line-height: 20px;
    text-align: end;
    color: #999;
  }
}
.gang {
  line-height: 40px;
  color: #999;
}
</style>
