<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title" style="position: relative;">
            我的订单
        </div>
        <div class="user_content_blcok_line"></div>

        <!-- 搜索条件 -->
        <div class="search_order">
            <div class="search_bytype cannotchoose">
                <!-- status全部订单为null，其余状态依次是0 1 2 3 -->
                <div v-for="(item,index) in options" :key="index" :class="nowcheck==item.value&&'checked'" @click="get_user_order(item.value)">
                    {{item.title}}
                    <span v-if="item.num">{{item.num}}</span>
                </div>
            </div>
            <div class="search_byid">
                <el-input placeholder="请输入商品名称/订单号" v-model="order_no">
                    <el-button @click="searchorder(order_no)" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>

        <!-- 有订单则 -->
        <div v-if="!loading&&order_list.length>0">
            <OrderList :order_list="order_list" @get_user_order="get_user_order" @getorder_census="getorder_census"></OrderList>
            <div class="home_fy_block">
                <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
            </div>
        </div>
        <!-- 没有订单则 -->
        <div class="empty_order" v-if="!loading&&order_list.length==0">
            <dl>
                <dt><img src="/pc/not-common-icon.png" alt=""></dt>
                <dd class="first">暂未查询到相关购买数据~</dd>
                <dd class="btn">
                    <router-link :to="user_iscompany?'/company/home':'/'">前往商城</router-link>
                </dd>
            </dl>
        </div>
        <!-- loading放在最后，不然会有霸占空间的间隙时间 -->
        <div v-loading="loading" element-loading-custom-class="loadingclass" element-loading-text="加载中" element-loading-spinner="el-icon-loading"></div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import OrderList from '@/views/common/orderlist.vue'
import { tomyorderMixin } from '@/views/common/mixin/page_jump.js';
export default {
    components: { OrderList },
    props: {},
    data() {
        return {
            order_list: [], //待支付、带发货等订单列表
            total_data: 0, // 总条数
            page_size: 10,  //每页条数
            current_page: 1, //当前页数
            order_no: '',   //查询订单号
            nowcheck: null, //当前选中状态。null为全部订单
            options: [
                { title: "全部订单", value: -1, num: 0 },
                { title: "待支付", value: 0, num: 0 },
                { title: "待发货", value: 1, num: 0 },
                { title: "待收货", value: 2, num: 0 },
                { title: "已完成", value: 3, num: 0 },//4已取消 5已超时
            ],
            loading: true,
        };
    },
    computed: {
        ...mapState(["user_iscompany", "user_info"])
    },
    mixins: [tomyorderMixin],
    created() {
        this.token = localStorage.getItem("token");
        this.getorder_census();
        this.get_user_order();
    },
    methods: {
        // 带评论、待支付等各自数量
        getorder_census() {
            this.$get("order/census", { token: this.token }).then(res => {
                console.log("带评论、待支付等各自数量", res)
                if (res.code == 200) {
                    this.paystatusnum = res.data;
                    let { data } = res;
                    // this.options[0].num = data.total; //所有订单数量 （先不显示好看点）
                    this.options[1].num = data.unpaid;//待支付数量
                    this.options[2].num = data.await; //带发货数量
                    this.options[3].num = data.delivery; //已收货数量
                    // this.options[4].num = data.complete; //已完成数量
                    // this.options[4].num = data.total; //已取消
                }
            })
        },
        // 查询订单号，获取订单日志
        searchorder(order_no) {
            if (order_no.trim()) {
                this.getorderinfoAPI({ token: this.token, order_sn: order_no })
            }
        },
        // 点击订单状态，获取订单日志
        get_user_order(val) {
            // console.log("最初选中值", this.nowcheck, val)
            let finalCheck = ""
            if (val == undefined) { //不是点击事件。如果是-1就不传
                let status = this.$route.query.status
                status == -1 ? finalCheck = null : finalCheck = status;
            } else if ((val || val == 0)) {  //如果是点击状态。点击当前的跳过，不点击当前的赋值
                if (val == this.nowcheck) {
                    return;
                } else if (val == -1) {
                    finalCheck = null
                } else {
                    finalCheck = val;
                }
            }
            this.getorderinfoAPI({ token: this.token, status: finalCheck, page: this.current_page, pagesize: this.page_size }, val)
        },
        // 获取订单日志接口
        getorderinfoAPI(obj, val) {
            let api = "" //企业主账号跟其他的接口不一样
            if (this.user_info.state == 1) {
                api = "order/declare_list"
            } else {
                api = this.$api.homeListOrder
            }
            this.$get(api, obj).then(res => {
                this.loading = false;
                window.scrollTo(0, 0);
                console.log("获取订单日志：", res)
                if (res.code == 200) {
                    this.total_data = res.pagination.total;
                    this.current_page = res.pagination.current_page;
                    this.order_list = res.data;
                    this.order_list.forEach(item => {
                        item.details.forEach(son_item => {
                            son_item.title = son_item.title + " " + son_item.attr_text;
                        })
                    })
                    this.change_nowcheck(val)
                } else {
                    // this.$message.error(res.message)
                }
            });
        },
        change_nowcheck(val) {
            let status = this.$route.query.status
            if (status == undefined) {//如果没有status传过来
                if (val == undefined) {//并且没有点击
                    this.nowcheck = -1
                } else { //但是点击了
                    this.nowcheck = val
                    this.tomyorder(val)
                }
            } else { //如果有传入状态
                if (val == undefined) { //没有点击
                    this.nowcheck = status
                } else { //点击了
                    this.nowcheck = val;
                    this.tomyorder(val)
                }
            }
        },
        // 分页改变
        current_change: function (e) {
            this.current_page = e;
            this.get_user_order();
        },
    },
};
</script>
<style lang="scss" scoped>
.search_order {
  display: flex;
  margin-top: 50px;
  justify-content: space-between;
}
.search_byid {
  margin-left: 20px;
  width: 210px;
  .el-input {
    font-size: 12px;
  }
  .el-button:hover {
    background: #848484;
    color: #fff;
    border-radius: 0;
  }
  /deep/.el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  /deep/.el-button {
    padding: 10px 14px 8px;
  }
}
.search_bytype {
  position: relative;
  display: flex;
  font-size: 12px;
  line-height: 30px;
  div {
    width: 36px;
    margin-right: 30px;
    position: relative;
    span {
      position: absolute;
      left: 33px;
      top: -2px;
      color: #fff;
      background: $main_color;
      font-size: 10px;
      line-height: 15px;
      padding: 0 5px;
      border-radius: 15px;
    }
  }
  div:nth-child(1) {
    width: 48px;
    span {
      left: 45px;
    }
  }
  div:hover {
    color: $main_color;
    cursor: pointer;
  }
  .checked {
    font-weight: 700;
    color: $main_color;
    border-bottom: 2px solid $main_color;
  }
}
</style>