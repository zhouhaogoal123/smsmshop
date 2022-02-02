<template>
    <div class="create_order">
        <!-- 头部三大栏 -->
        <div class="shop_top" v-if="!iscompany">
            <shop-top  ></shop-top>
        </div>
        <CompanyHead v-if="iscompany"></CompanyHead>

        <div class="join_over width_center_1200">
            <div class="join_bzt">
                <el-steps :active="3" finish-status="process" simple>
                    <el-step title="我的购物车" icon="el-icon-shopping-cart-full"></el-step>
                    <el-step title="物流地址" icon="el-icon-map-location"></el-step>
                    <el-step title="选择支付" icon="el-icon-mouse"></el-step>
                    <el-step :title="reviewSuccess?'申报成功':'支付成功'" icon="el-icon-check"></el-step>
                </el-steps>
            </div>
        </div>

        <div class="pay_success_icon width_center_1200">
            <i class="iconfont">&#xe64e;</i>
            <div>
                <p class="first_info" v-if="!reviewSuccess">支付成功</p>
                <p class="first_info" v-if="reviewSuccess">订单申报成功</p>
                <p class="last_info" @click="to_order_center">
                    <span>前往订单中心查看></span>
                </p>
            </div>
        </div>

        <shop-foot></shop-foot>
        <!-- vue 回到顶部 -->
        <el-backtop>
            <div class="iconfont">&#xe735;</div>
        </el-backtop>
    </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import ShopFoot from "@/components/shop_foot.vue";
import CompanyHead from "@/views/common/companyhead.vue";
export default {
    components: {
        ShopFoot, ShopTop, CompanyHead
    },
    data() {
        return {
            iscompany: false,
            reviewSuccess: false
        }
    },
    created() {
        console.log(this.$route.query)
        if (this.$route.query.orderreview) {
            this.reviewSuccess = true;
        }
        if (localStorage.getItem("user_iscompany") == "true") {
            this.iscompany = true;
        }
    },
    methods: {
        to_order_center() {
            if (this.iscompany) {
                this.$router.push("/company/user/order")
            } else {
                this.$router.push("/user/order")
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.join_bzt {
  margin-top: 40px;
}
.pay_success_icon {
  margin-top: 50px;
  margin-bottom: 50px;
  padding-top: 120px;
  padding-bottom: 120px;
  display: flex;
  justify-content: center;
  background: #effbef;
  i {
    font-size: 80px;
    line-height: 80px;
    color: #67c23a;
  }
  p {
    width: 200px;
    margin-left: 30px;
  }
  .first_info {
    line-height: 50px;
    font-weight: 700;
  }
  .last_info {
    line-height: 30px;
    color: #0431b4;
    font-size: 14px;
  }
  .last_info:hover {
    color: $main_color;
    cursor: pointer;
  }
}
</style>