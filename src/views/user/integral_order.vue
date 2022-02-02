<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title" style="position: relative;">
            我的订单
            <div class="order_search">
                <el-input placeholder="请输入订单号" v-model="order_no">
                    <el-button @click="searchorder(order_no)" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="order_type">
                <ul>
                    <li @click="get_user_order(0,null)" :class="nowcheck==0?'red':''">全部订单</li>
                    <li @click="get_user_order(1,0)" :class="nowcheck==1?'red':''">待支付 ({{paystatusnum.unpaid||0}})</li>
                    <li @click="get_user_order(2,1)" :class="nowcheck==2?'red':''">待发货 ({{paystatusnum.await||0}})</li>
                    <li @click="get_user_order(3,2)" :class="nowcheck==3?'red':''">待收货 ({{paystatusnum.delivery||0}})</li>
                    <li @click="get_user_order(4,3)" :class="nowcheck==4?'red':''">待评论 ({{paystatusnum.discuss||0}})</li>
                    <li @click="get_user_order(5,4)" :class="nowcheck==5?'red':''">已完成 </li>
                </ul>
            </div>
            <div class="clear"></div>
        </div>
        <div class="user_content_blcok_line"></div>

        <!-- 有订单则 -->
        <div v-if="order_list.length>0">
            <OrderList :order_list="order_list" @get_user_order="get_user_order"></OrderList>
            <div class="home_fy_block">
                <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
            </div>
        </div>
        <!-- 没有订单则 -->
        <div class="empty_order" v-else>
            <dl>
                <dt><img src="/pc/not-common-icon.png" alt=""></dt>
                <dd>主人，您近期还没有购买任何商品哟~</dd>
                <dd class="btn">
                    <router-link :to="user_iscompany?'/company/home':'/'">前往商城</router-link>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import OrderList from '@/views/common/orderlist.vue'
export default {
    components: { OrderList },
    props: {},
    data() {
        return {
            paystatusnum: {}, //带评论、待支付等各自数量
            order_list: [], //待支付、带发货等订单列表
            order_num: {}, //待支付、带发货等个数
            total_data: 0, // 总条数
            page_size: 10,  //每页条数
            current_page: 1, //当前页数
            order_no: '',   //查询订单号
            order_type: null,  //订单状态（待支付等）
            nowcheck: 0, //当前选中状态
        };
    },
    computed: {
        ...mapState(["user_iscompany"])
    },
    created() {
        this.token = localStorage.getItem("token");
        if (!this.$isEmpty(this.$route.params.order_type)) {
            this.order_type = this.$route.params.order_type;
            this.nowcheck = parseInt(this.$route.params.order_type) + 1;
        }
        console.log("当前选中", this.nowcheck)
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
                }
            })
        },
        // 根据订单号获取订单
        searchorder(order_no) {
            if (order_no.trim()) {
                this.$get(this.$api.homeListOrder, { token: this.token, order_sn: order_no }).then(res => {
                    console.log("订单1", res)
                    if (res.code == 200) {
                        this.total_data = res.pagination.total;
                        this.current_page = res.pagination.current_page;
                        this.order_list = res.data;
                        this.order_list.forEach(item => {
                            item.details.forEach(son_item => {
                                if (son_item.spec_text) {
                                    son_item.spec_text = JSON.parse(son_item.spec_text);
                                }
                            })
                        })
                    } else {
                        // this.$message.error(res.message)
                    }
                });
            }
        },
        // 获取订单日志
        get_user_order(ztval, order_type) {
            // console.log("参数", ztval, order_type, this.order_type)
            if (ztval !== undefined) this.nowcheck = ztval; //当前选中的状态
            if (order_type !== undefined) this.order_type = order_type;//传给后台的数据
            this.$get(this.$api.homeListOrder, { token: this.token, status: this.order_type, page: this.current_page }).then(res => {
                console.log("获取订单日志：", res)
                if (res.code == 200) {
                    let nowtotal = res.pagination.total;
                    this.total_data = nowtotal; //分页总条数
                    this.current_page = res.pagination.current_page;
                    this.order_list = res.data;
                    this.order_list.forEach(item => { //转一哈属性信息
                        item.details.forEach(son_item => {
                            if (son_item.spec_text) {
                                son_item.spec_text = JSON.parse(son_item.spec_text);
                            }
                        })
                    })
                    this.getorder_census();//重新获取数量
                } else {
                    // this.$message.error(res.message);
                }
            });
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
.user_content_blcok_line {
  margin: 30px 0;
}

.order_time {
  margin-left: 20px;
  color: #666;
  float: right;
  font-size: 12px;
}

.order_search {
  float: right;
  margin-left: 20px;
  position: absolute;
  right: 10px;
  top: -5px;
  width: 210px;
  .el-button:hover {
    background: #848484;
    color: #fff;
    border-radius: 0;
  }
}
.user_index_store_title {
  background: #f6f6f6;
  line-height: 40px;
  color: #666;
  padding: 0 15px;
  margin: 20px 0;
  a:hover {
    color: $main_color;
  }
}
.order_type {
  float: right;
  font-size: 14px;
  margin-top: 2px;
  cursor: pointer;
  ul {
    margin-right: 280px;
  }
  ul li {
    color: #999;
    float: left;
    margin-right: 20px;
  }
  ul li.red {
    color: $main_color;
  }
  ul li:hover {
    color: $main_color;
  }
}
</style>