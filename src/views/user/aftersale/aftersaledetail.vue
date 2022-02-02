<template>
  <!-- 申请服务详情 -->
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">
      申请服务详情
      <el-button size="mini" type="primary" @click="totoppage">返回</el-button>
    </div>
    <div class="user_content_blcok_line"></div>

    <div>
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="提交申请"></el-step>
        <el-step title="卖家审核"></el-step>
        <el-step title="商品赔偿"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <div class="mainpart">
        <div class="mainpart_left">
          <div class="refundsuccess_font"> {{bigtitle}}</div>
          <div class="refundsuccess_money" v-if="servicedetail.amount>0"> 退款总金额：
            <span>￥{{servicedetail.amount}}</span>
          </div>
          <el-button type="danger" @click="deleteservice" v-if="servicedetail.status==1||servicedetail.status==4">移除服务单 </el-button>
          <div class="refundsuccess_moneykou">
            <!-- <div class="refundsuccess_moneykou_1">退回中国工商银行(尾号0228) :￥155.10</div> -->
            <el-timeline>
              <el-timeline-item color="#0bbd87" v-for="(activity, index) in activities" :key="index" :timestamp="activity.updated_at">
                {{activity.title}}
                <template name="dot">
                  <div class="description" style="color:#999;font-size:12px;">{{activity.content}}</div>
                </template>
              </el-timeline-item>
            </el-timeline>
            <!-- <div class="refundsuccess_moneykou_2">退回红包(红包) :￥3.00</div> -->
          </div>
        </div>
        <div class="mainpart_right">
          <section class="mainpart_right_detail">订单详情</section>
          <section class="mainpart_right_goods">
            <div class="goods">
              <div class="goodspic">
                <el-image :src="servicedetail.img_url" fit="cover" lazy></el-image>
              </div>
              <div>{{servicedetail.title}}</div>
            </div>
          </section>
          <section class="mainpart_right_order">
            <li>
              <span class="item">卖家</span> 三目商城</li>
            <li>
              <span class="item">订单编号</span> {{servicedetail.order_sn}}</li>
            <li>
              <span class="item">单价</span> ￥{{servicedetail.price}}</li>
            <li>
              <span class="item">商品总价</span> ￥{{servicedetail.total_money}}</li>
          </section>
          <section class="mainpart_right_refundorder">
            <li>
              <span class="item">售后编号</span> {{servicedetail.apply_sn}}</li>
            <!-- <li>
              <span class="item" >退款金额</span> ￥158.10</li> -->
            <li>
              <span class="item">申请数量</span> {{servicedetail.number}}</li>
            <li>
              <span class="item">原因</span> {{servicedetail.cause}}</li>
            <li>
              <span class="item">要求</span> {{servicedetail.typetext}}</li>
            <li class="talkit">
              <span class="item">说明</span>
              <div>{{servicedetail.remark}}</div>
            </li>
          </section>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import HeadTop from '@/components/head_top.vue';
export default {
  components: { HeadTop },
  data() {
    return {
      apply_id: "", //售后订单号id
      servicedetail: {}, //服务单号详情所有
      active: 1,   // 进展情况
      activities: [],
      bigtitle: "" //标题
    }
  },
  created() {
    this.apply_id = this.$route.query.id;
    this.getapplyshow();
  },
  methods: {
    //获取该订单详情 
    getapplyshow() {
      let token = localStorage.getItem("token");
      this.$get("apply/show", { token, apply_id: this.apply_id }).then(res => {
        console.log(res)
        if (res.code == 200) {
          let { data } = res;
          this.active = data.status;
          this.servicedetail = data;
          this.activities = data.logs; //时间线
          this.bigtitle = data.typetext + data.statustr;
        }
      })
    },
    // 删除服务单
    deleteservice() {
      let token = localStorage.getItem("token")
      this.$post("apply/cancel", { token, apply_id: this.apply_id }).then(res => {
        if (res.code == 200) {
          this.$message.success("移除成功")
          this.totoppage();
        }
      })
    },
    // 返回上一级
    totoppage() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss" scoped>
.user_content_blcok_title {
  display: flex;
  justify-content: space-between;
}
.el-steps {
  margin: 50px 0;
}
.mainpart {
  border: 2px solid #f1f1f1;
  display: flex;
  .mainpart_left {
    padding: 30px;
    flex: 1;
    .refundsuccess_font {
      font-weight: 700;
      font-size: 20px;
      color: #333;
      padding-bottom: 10px;
    }
    .refundsuccess_money {
      padding: 20px 0;
      color: #333;
      span {
        color: $main_color;
      }
    }
    .el-button {
      padding: 6px 10px;
      font-size: 12px;
    }
    .refundsuccess_moneykou {
      margin-top: 30px;
      color: #333;
      font-size: 13px;
      border: 2px solid #e5e5e5;
      padding: 20px;
      .refundsuccess_moneykou_1 {
        margin-bottom: 20px;
      }
    }
  }
  .mainpart_right {
    width: 240px;
    border-left: 2px solid #f1f1f1;
    padding: 20px;
    font-size: 12px;
    .mainpart_right_detail {
      padding-bottom: 30px;
      border-bottom: 2px solid #f1f1f1;
      font-size: 16px;
    }
    .mainpart_right_goods {
      padding: 10px 0;
      .goods {
        display: flex;
        .goodspic {
          width: 70px;
          height: 70px;
          flex-shrink: 0;
          margin-right: 10px;
        }
      }
    }

    .mainpart_right_order,
    .mainpart_right_refundorder {
      border-top: 1px solid #f1f1f1;
      line-height: 20px;
      padding-top: 10px;
      .talkit {
        display: flex;
      }
      .item {
        color: #999;
        display: inline-block;
        width: 60px;
        flex-shrink: 0;
        text-align-last: justify;
        margin-right: 15px;
      }
    }
  }
}
</style>
