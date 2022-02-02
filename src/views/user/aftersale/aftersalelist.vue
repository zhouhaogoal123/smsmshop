<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position:relative;">
      售后管理
      <div class="order_search">
        <el-input placeholder="请输入服务单号" v-model="service_no">
          <el-button @click="searchorder" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="user_content_blcok_line"></div>
    <header>
      <el-row>
        <el-col :span="10">宝贝</el-col>
        <el-col :span="3">退款金额</el-col>
        <el-col :span="4">申请时间</el-col>
        <el-col :span="2">服务类型</el-col>
        <el-col :span="2">服务状态</el-col>
        <el-col :span="3">交易操作</el-col>
      </el-row>
    </header>
    <div v-if="!loading&&aftersale_list.length>0">
      <li class="aftersalelist" v-for="item in aftersale_list" :key="item.id">
        <div class="topline">
          <span class="orderid">订单编号：{{item.order_sn}}</span>
          <span>售后编号：{{item.apply_sn}}</span>
        </div>
        <div class="contentline">
          <el-row>
            <el-col :span="10">
              <div class="goods">
                <img :src="item.img_url" alt="图片加载失败">
                <div class="title">
                  <div class="title_1">{{item.title}}</div>
                  <div class="title_2">
                    <span v-for="(vo, ko) in item.spec_text" :key="ko">{{ vo.meta_key }}：{{ vo.meta_value }}；</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="3" class="main_color">￥{{item.totalmoney}}</el-col>
            <el-col :span="4">{{item.created_at}}</el-col>
            <el-col :span="2" class="main_color">
              <div>{{item.type_text}}</div>
            </el-col>
            <el-col :span="2" style="color:green;">{{item.status_text}}</el-col>
            <el-col :span="3">
              <span class="caozuo" @click="toaftersaledetail(item.id)">服务详情</span>
              <el-button type="danger" size="mini" style="border-radius: 3px;margin-top:10px;" @click="service_over(item.id)" v-if="item.status==3">确认完成</el-button>
              <el-button type="warning" size="mini" style="border-radius: 3px;margin-top:10px;margin-left:0;" @click="service_remove(item.id)" v-if="item.status==1||item.status==4">移除售后</el-button>
            </el-col>
          </el-row>
        </div>
      </li>
      <div class="home_fy_block" style="margin-top:40px">
        <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
      </div>
    </div>

    <!-- 没有浏览历史则 -->
    <div class="empty_order" v-if="!loading&&aftersale_list.length==0">
      <dl>
        <dt><img src="/pc/not-common-icon.png" alt="" /></dt>
        <dd>主人，您近期还没有售后商品哟~</dd>
        <dd class="btn">
          <router-link :to="iscompany?{name:'company_home'}:{name:'home'}">前往商城</router-link>
        </dd>
      </dl>
    </div>

    <div v-loading="loading" element-loading-custom-class="loadingclass" element-loading-text="加载中" element-loading-spinner="el-icon-loading"></div>
  </div>
</template>

<script>
import { throttle } from "throttle-debounce"; //节流，一段时间只执行一次
export default {
  data() {
    return {
      aftersale_list: [], //售后列表
      current_page: 1,//当前分页数
      page_size: 10, //每页条数
      total_data: 0, //总条数
      service_no: "",//服务单号
      iscompany: "",
      loading: true,
    }
  },
  created() {
    this.getaftersale_list();
    this.iscompany = this.$route.path.startsWith("/company");
  },
  methods: {
    // 查询售后服务
    searchorder: throttle(1000, function () {
      let token = localStorage.getItem("token")
      this.$get("apply/list", { token, page: this.current_page, apply_sn: this.service_no }).then(res => {
        console.log("查询售后", res.data)
        res.data.forEach(item => {
          if (!this.$isEmpty(item.spec_text)) {
            item.spec_text = JSON.parse(item.spec_text);
          }
        })
        this.aftersale_list = res.data;
        this.total_data = res.pagination.total;
        this.current_page = res.pagination.current_page;
      })
    }),

    // 售后服务列表
    getaftersale_list() {
      let token = localStorage.getItem("token")
      this.$get("apply/list", { token, page: this.current_page }).then(res => {
        this.loading = false;
        window.scrollTo(0, 0);

        console.log("售后列表", res.data)
        res.data.forEach(item => {
          if (!this.$isEmpty(item.spec_text)) {
            item.spec_text = JSON.parse(item.spec_text);
          }
        })
        this.aftersale_list = res.data;
        this.total_data = res.pagination.total;
        this.current_page = res.pagination.current_page;
      })
    },
    // 查看售后服务详情
    toaftersaledetail(id) {
      if (this.iscompany) {
        this.$router.push({ name: "com_aftersaledetail", query: { id: id } })
      } else {
        this.$router.push({ name: "aftersaledetail", query: { id: id } })
      }
    },
    // 页数改变重新获取列表
    current_change(e) {
      this.current_page = e;
      this.getaftersale_list();
    },
    // 确认售后完成
    service_over(id) {
      let token = localStorage.getItem("token")
      this.$post("apply/solve", { token, apply_id: id }).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$message.success("售后完成")
          this.getaftersale_list()
        }
      })
    },
    // 移除售后
    service_remove(id) {
      let token = localStorage.getItem("token")
      this.$post("apply/cancel", { token, apply_id: id }).then(res => {
        if (res.code == 200) {
          this.$message.success("移除成功")
          this.getaftersale_list()
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
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
.user_content_blcok_line {
  margin: 30px 0;
}
header {
  text-align: center;
  background: #f1f1f1;
  line-height: 40px;
  font-size: 12px;
  border: 1px solid #e6e6e6;
  margin-bottom: 10px;
}
.aftersalelist {
  border: 1px solid #e6e6e6;
  margin-bottom: 10px;
  .topline {
    display: flex;
    background: #f1f1f1;
    line-height: 30px;
    font-size: 12px;
    .orderid {
      padding-left: 20px;
      padding-right: 40px;
    }
  }
  .contentline {
    text-align: center;
    font-size: 12px;
    padding: 10px 0;
  }
  .goods {
    display: flex;
    padding-left: 20px;
    img {
      background: #f1f1f1;
      width: 80px;
      height: 80px;
      flex-shrink: 0;
    }
    .title {
      padding-left: 5px;
      text-align: left;
      .title_1 {
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        padding-bottom: 5px;
      }
      .title_2 {
        line-height: 16px;
        color: #999;
        height: 48px;
        overflow: hidden;
      }
    }
  }
  .caozuo {
    cursor: pointer;
    color: $main_color;
  }
}
</style>
