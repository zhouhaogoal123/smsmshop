<template>
  <div class="user_content_blcok">
    <header>
      <div class="borderin">
        <div class="font">我的积分</div>
        <div class="iconfont">&#xe651;</div>
        <div class="money">666</div>
      </div>
    </header>

    <div class="user_content_blcok_title" style="position: relative;">
      积分收支明细
    </div>
    <div class="user_content_blcok_line"></div>

    <!-- 有记录 -->
    <div v-if="tableData.length>0">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="redtime" label="时间" width="230">
        </el-table-column>
        <el-table-column prop="redmoney" label="收入/支出" width="230">
        </el-table-column>
        <el-table-column prop="redname" label="详细说明">
        </el-table-column>
      </el-table>

      <div class="home_fy_block" style="margin-top:40px;">
        <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
      </div>
    </div>

    <!-- 没记录 -->
    <div v-else>
      <div class="empty_head">
        <el-row>
          <el-col :span="6" style="padding:0 10px;">时间</el-col>
          <el-col :span="6" style="padding:0 10px;">收入/支出</el-col>
          <el-col :span="12" style="padding:0 10px;">详细说明</el-col>
        </el-row>
      </div>
      <div class="empty_order">
        <dl>
          <dt><img src="/pc/not-common-icon.png" alt=""></dt>
          <dd>主人，您近期还没有任何余额收支哟~</dd>
          <dd class="btn">
            <router-link :to="user_iscompany?'/company/home':'/'">前往商城</router-link>
          </dd>
        </dl>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      total_data: 0,   // 总条数
      page_size: 20,   //每页条数
      current_page: 1, //当前页数
      tableData: [{
        redname: 'wasai',
        redmoney: '1.00',
        redtime: '2016-05-02',
        userscope: "全场通用"
      }, {
        redname: 'big1',
        redmoney: '66.00',
        redtime: '2016-05-04',
        userscope: "满100使用"
      }, {
        redname: 'big2',
        redmoney: '2.00',
        redtime: '2016-05-01',
        userscope: "满20使用"
      }, {
        redname: 'big3',
        redmoney: '3.00',
        redtime: '2016-05-03',
        userscope: "满2000使用"
      }]
    }
  },
  computed: {
    ...mapState(["user_iscompany"])
  },
  methods: {
    current_change() {
      this.current_page = e;
      this.get_money_log();
    },
    get_money_log() {

    }
  },

}
</script>

<style lang="scss" scoped>
header {
  padding: 20px;
  .borderin {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: radial-gradient(circle, #fff 40%, #cef6d8 80%);
    font-weight: 700;
    color: #666;
    .iconfont {
      font-size: 52px;
      padding-top: 8px;
      color: #e6a23c;
    }
    .font {
      font-size: 16px;
    }
    .money {
      font-size: 26px;
    }
  }
}

.user_content_blcok {
  /deep/.el-tabs__item {
    font-weight: 700;
    font-size: 16px;
  }
  /deep/.el-tabs__item.is-active {
    color: $main_color;
  }
  /deep/.el-tabs__active-bar {
    background-color: $main_color;
  }
  /deep/.el-tabs__item:hover {
    color: $main_color;
  }

  /deep/.el-table th {
    background-color: #f5f5f5;
  }
  /deep/.el-table tbody tr:hover > td {
    background-color: #ffffff !important;
  }
  /deep/.el-table thead {
    color: #555;
  }
}
</style>
