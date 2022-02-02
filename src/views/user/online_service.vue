<template>
  <div class="box">
    <el-container class="boxout">
      <el-aside class="boxleft">
        <header>
          <div class="headercontent">
            <div class="useravatar">
              <el-image :src="userinfo.avatar" fit="cover"></el-image>
            </div>
            <div class="username">
              {{userinfo.nickname}}
              <div class="companyuser" v-if="iscompany">
                <span>企业用户</span>
              </div>
            </div>
          </div>
        </header>
        <section></section>
      </el-aside>

      <el-main class="boxright">
        <header></header>

        <section>
          <!-- 左侧聊天部分 -->
          <div class="chatleft">
            <div class="chathistory">

            </div>
            <div class="nowinput">
              <textarea cols="30" rows="10" v-model="sendmsg" placeholder="请输入内容"></textarea>
            </div>
            <div class="sendmsg">
              <el-button type="info" size="mini">发送</el-button>
            </div>
          </div>

          <!-- 右侧我的订单 -->
          <div class="orderright">
            <div class="orderhead">
              近期订单
            </div>
            <div class="ordercentent">
              <ul>
                <li v-for="item in orderlist" :key="item.id">
                  <div>{{item.order_sn}}</div>
                  <el-row>
                    <el-col :span="5"></el-col>
                    <el-col :span="19"></el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendmsg: "",
      userinfo: "",
      orderlist: "",
      usermessage: ["你好", "这个怎么操作", "什么价位"],
      smmessage: ["你好，请问有什么问题", "直接打开按步骤进行拼接", "搞活动，799.33元"]
    }
  },
  created() {
    this.userinfo = JSON.parse(localStorage.getItem("user_info"))
    this.iscompany = localStorage.getItem("user_iscompany") == "true";
    this.getorderlist();
  },
  methods: {
    getorderlist() {
      let token = localStorage.getItem("token")
      this.$get(this.$api.homeListOrder, { token }).then(res => {
        console.log(res)
        this.orderlist = res.data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
// .box {
//   width: 100%;
//   height: 100%;
//   background: #0b173b;
//   padding-top: 5%;
//   box-sizing: border-box;
//   .boxout {
//     background: #fff;
//     width: 70%;
//     height: 90%;
//     margin: auto;
//   }
// }

// 左侧
.boxleft {
  width: 100%;
  header {
    height: 20%;
    background: $main_color;
    display: flex;
    align-items: center;
    .headercontent {
      height: 80%;
      display: flex;
    }
    .useravatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      margin-left: 10px;
      margin-right: 10px;
      .el-image {
        border-radius: 50%;
      }
    }
    .username {
      width: 65%;
      height: 100%;
      color: #fff;
    }
    .companyuser {
      margin-top: 10px;
      span {
        color: yellow;
        background: #0b173b;
        padding: 5px;
        font-size: 12px;
      }
    }
  }
  section {
    width: 100%;
    height: 80%;
    border-right: 1px solid #d8d8d8;
    box-sizing: border-box;
  }
}
// 右侧
.boxright {
  padding: 0;
  padding-left: 2px;
  header {
    height: 10%;
    background: #e6e6e6;
    border-bottom: 1px solid #d8d8d8;
    box-sizing: border-box;
  }
  section {
    height: 90%;
    display: flex;
    .chatleft {
      width: 70%;
      height: 100%;
      border-right: 1px solid #d8d8d8;
      .chathistory {
        height: 70%;
        border-bottom: 1px solid #d8d8d8;
        box-sizing: border-box;
      }
      .nowinput {
        height: 20%;
        textarea {
          width: 100%;
          height: 100%;
          outline: unset;
          border: none;
          padding: 10px;
          box-sizing: border-box;
          resize: none;
          color: #555;
        }
      }
      .sendmsg {
        width: 100%;
        height: 50px;
        padding-right: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    .orderright {
      width: 30%;
      height: 100%;
      .orderhead {
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #999;
        font-size: 14px;
        background: #fff;
        border-bottom: 1px solid #d8d8d8;
      }
    }
  }
}
// @media screen and (min-width: 1450px) and (max-width: 2000px) {
//   .box {
//     display: flex;
//     align-content: center;
//     justify-content: center;
//     .boxout {
//       width: 1000px;
//       height: 800px;
//     }
//   }
// }
// @media screen and (min-width: 360px) and (max-width: 1440px) {
  .boxout {
    width: 1000px;
    height: 800px;
  }
// }
</style>
