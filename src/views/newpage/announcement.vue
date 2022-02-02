<template>
  <!-- 公告 -->
  <div class="box">
    <div class="innerbox">
      <el-row>
        <el-col :span="8" class="contentleft">
          <div v-for="item in datalist" :key="item.id" class="contentitem" :class="checkid==item.id&&'checknow'" @click="checkchange(item.id)">{{item.title}}</div>
        </el-col>
        <el-col :span="16" class="contentright">
          <h2 class="title">三目公告</h2>
          <div class="line"></div>
          <p>{{checkdetail.content}}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkid: "", //公告选中id
      checkdetail: "",
      datalist: [],

    }
  },
  created() {
    this.checkid = this.$route.query.id
    this.gongGaoList()
  },
  methods: {
    // 公告详情 不需要...
    // gongGaoDetail() {
    //   this.$get("notice/show", { notice_id: this.checkid }).then(res => {
    //   })
    // },
    // 公告列表
    gongGaoList() {
      let token = localStorage.getItem("token")
      this.$get("notice/list", { token }).then(res => {
        console.log("公告列表", res)
        this.datalist = res.data;
        this.gonggaodetail()
      })
    },
    gonggaodetail() {
      let checkarr = this.datalist.filter(item => {
        return item.id == this.checkid;
      })
      this.checkdetail = checkarr[0];
    },
    checkchange(id) {
      if (id == this.checkid) return;
      this.checkid = id;
      this.gonggaodetail();
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #0b173b;
  background: radial-gradient(#999, #0b173b);
  display: flex;
  .innerbox {
    background: #fff;
    width: 800px;
    height: 600px;
    margin: auto;
    .el-row {
      width: 100%;
      height: 100%;
    }
    .contentleft {
      height: 100%;
      background: #fff;
      .contentitem {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 2px solid #e6e6e6;
        cursor: pointer;
        color: #555;
        font-size: 14px;
        font-weight: 700;
        user-select: none;
      }
      .checknow {
        background: #f7f8e0;
      }
    }
    .contentright {
      height: 100%;
      background: $main_color;
      padding: 40px 60px;
      color: #fff;
      .title {
        text-align: center;
      }
      .line {
        height: 2px;
        background: #fff;
        margin: 20px 0;
      }
      p {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 1px;
        height: 400px;
        overflow-y: auto;
      }
    }
  }
}
</style>
