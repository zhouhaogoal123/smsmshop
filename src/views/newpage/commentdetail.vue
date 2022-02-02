<template>
  <div>
    <!-- 头部三大栏 -->
    <div class="shop_top">
      <CompanyHead v-if="iscompany"></CompanyHead>
      <ShopTop v-else></ShopTop>
    </div>

    <!-- 评论内容 -->
    <div class="width_center_1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="tohome">首页</el-breadcrumb-item>
        <el-breadcrumb-item @click.native="tosearch(value1.id)">{{value1.title}}</el-breadcrumb-item>
        <el-breadcrumb-item @click.native="tosearch(value2.id)">{{value2.title}}</el-breadcrumb-item>
        <el-breadcrumb-item @click.native="tosearch(value3.id)">{{value3.title}}</el-breadcrumb-item>
        <el-breadcrumb-item @click.native="todetail(value4.id)" class="lastcrumb">{{value4.title}}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="innerbox">
        <div class="innerbox_left">
          <div class="user">
            <img :src="goodsinfo.avatar">
            <font>{{goodsinfo.user_name}}</font>
          </div>
          <span class="companyuser">企业会员</span>
        </div>

        <div class="innerbox_right">
          <el-rate v-model="goodsinfo.score" disabled></el-rate>
          <div class="commentinfo">{{goodsinfo.content}}</div>
          <!-- 评论图片 -->
          <div class="commentpicout">
            <el-image :src="item.pic_url" v-for="item in goodsinfo.pics" :key="item.pic_id" class="commentpic"></el-image>
          </div>
          <!-- 时间栏 -->
          <div class="commentremark">
            <span class="time">{{lasttime}}</span>
            <div>
              <span class="iconfont icondianzan" @click="userdianzan(goodsinfo.is_click)" :class="goodsinfo.is_click==0?'':'dianzanyes'">
                <font>{{goodsinfo.click_num}}</font>
              </span>
              <span class="iconfont iconpinglun">
                <font>{{goodsinfo.comment_num}}</font>
              </span>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="commmentsend">
            <textarea maxlength="300" v-model="content" placeholder="回复："></textarea>
            <div class="btn">
              <span class="maxfont">最大字数：300</span>
              <el-button type="danger" size="mini" @click="commentup">回复</el-button>
            </div>
          </div>
          <!-- 评论列表 -->
          <ul class="commentlist" v-if="goodsinfo.childrens.length>0">
            <li v-for="item in goodsinfo.childrens" :key="item.id">
              <div class="line1">
                <span class="name">{{item.user_name}}</span>
                <span class="content">：{{item.content}}</span>
              </div>
              <div class="time">{{comptime(item.created_at)}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <shop-foot></shop-foot>
  </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import CompanyHead from "@/views/common/companyhead.vue";
import ShopFoot from "@/components/shop_foot.vue"
import { throttle } from 'throttle-debounce'; //节流防抖
import { mapState } from 'vuex';
export default {
  components: { ShopTop, CompanyHead, ShopFoot },
  data() {
    return {
      id: "", //详情号
      goodsinfo: {
        childrens: [],
        score: 5
      },//当前详情
      lasttime: "",
      iscompany: false,
      content: "",//评论内容
      value1: "",
      value2: "",
      value3: "",
      value4: "",
    }
  },
  computed: {
    comptime() {
      return function (time) {
        let arr = time.split("T")
        let newarr = arr[1].split(".")
        return arr[0] + " " + newarr[0]
      }
    },
    ...mapState(["token"])
  },
  created() {
    this.id = this.$route.query.id
    this.value1 = JSON.parse(this.$route.query.value1);
    this.value2 = JSON.parse(this.$route.query.value2);
    this.value3 = JSON.parse(this.$route.query.value3);
    this.value4 = JSON.parse(this.$route.query.value4);
    this.iscompany = localStorage.getItem("user_iscompany") == "true"
    this.getDadDetail()
  },
  methods: {
    getDadDetail() {
      this.$get("comment/show", { token: this.token, comment_id: this.id }).then(res => {
        console.log(res)
        let arr = res.data.created_at.split("T")
        let newarr = arr[1].split(".")
        this.lasttime = arr[0] + " " + newarr[0]
        res.data.childrens = res.data.childrens.reverse();
        this.goodsinfo = res.data;
      })
    },
    commentup() {
      let token = localStorage.getItem("token");
      this.$post("comment/reply", { comment_id: this.id, content: this.content, token }).then(res => {
        console.log(res)
        this.getDadDetail()
        this.content = ""
      })
    },
    tohome() {
      this.iscompany ? this.$router.push("/company/home") : this.$router.push("/")
    },
    tosearch(id) {
      this.iscompany ? this.$router.push({ path: "/company/goodssearch", query: { id } }) : this.$router.push({ path: "/company/goodssearch", query: { id } })
    },
    todetail(id) {
      this.iscompany ? this.$router.push("/company/goodsdetail/" + id) : this.$router.push("/goodsdetail/" + id)
    },
    // 点赞，取消点赞
    userdianzan: throttle(500, function (is_click) {
      let token = localStorage.getItem("token")
      if (!token) {
        return this.$route.path.startsWith("/company") ? this.$router.push({ name: "company_login" }) : newUrl = this.$router.push({ name: "login" })
      }
      let action = "";
      if (is_click == 0) { //0可以点赞，1取消点赞
        action = "add";
      }
      if (is_click == 1) {
        action = "cancel"
      }
      this.$post("comment/praise", { token, comment_id: this.id, action }).then(res => {
        console.log("点赞返回", res)
        if (res.code == 200) {
          if (this.goodsinfo.is_click == 0) { //点赞了
            this.goodsinfo.is_click = 1;
            this.goodsinfo.click_num += 1
          } else {
            this.goodsinfo.is_click = 0;
            this.goodsinfo.click_num -= 1
          }
        }
      })
    }),
  },
}
</script>

<style lang="scss" scoped>
// 面包屑部分
.el-breadcrumb {
  line-height: 40px;
  margin-bottom: 10px;
  /deep/.el-breadcrumb__inner:hover {
    color: $main_color;
    cursor: pointer;
  }
  .lastcrumb {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
// 内容部分
.innerbox {
  width: 1000px;
  margin: auto;
  min-height: 300px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  margin-bottom: 30px;
  display: flex;
  font-size: 12px;
  color: #222;
  padding: 20px;
  .innerbox_left {
    width: 160px;
    .user {
      display: flex;
      img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        padding-right: 5px;
        padding-bottom: 2px;
      }
      font {
        width: 80px;
        height: 50px;
        color: #666;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .companyuser {
      color: $company_font;
      padding: 0;
      background: #0a0a2a;
    }
  }
  .innerbox_right {
    width: 800px;
    .el-rate {
      height: 30px;
      line-height: 30px;
      margin-left: -5px;
      /deep/.el-rate__icon {
        font-size: 22px;
      }
    }
    .commentinfo {
      margin-bottom: 10px;
      width: 630px;
      white-space: 1px;
    }
    .commentpicout {
      display: flex;
      flex-wrap: wrap;
    }
    .commentpic {
      width: 300px;
      height: 300px;
      margin-right: 30px;
      margin-bottom: 30px;
      flex-shrink: 0;
    }
    .commentremark {
      color: #999;
      margin-bottom: 50px;
      display: flex;
      justify-content: space-between;
      .time {
        padding-right: 500px;
      }
      .iconfont {
        font-size: 12px;
        padding-left: 10px;
        user-select: none;
      }
      .icondianzan {
        cursor: pointer;
      }
      .dianzanyes {
        color: $main_color;
      }
      font {
        padding-left: 3px;
      }
    }
    .commmentsend {
      border: 1px solid #e6e6e6;
      background: #fafafa;
      padding: 10px;
      textarea {
        width: 100%;
        height: 70px;
        border: none;
        outline: none;
        padding: 10px;
        box-sizing: border-box;
        resize: none;
        border: 1px solid #e6e6e6;
      }
      .btn {
        text-align: end;
        margin-top: 10px;
      }
      .maxfont {
        color: #999;
        padding-right: 5px;
      }
    }
    .commentlist {
      li {
        min-height: 40px;
        padding: 15px 22px;
        border-bottom: 1px solid #e6e6e6;
        .line1 {
          line-height: 20px;
          margin-bottom: 10px;
        }
        .name {
          color: #045fb4;
        }
        .content {
          color: #666;
        }
        .time {
          line-height: 20px;
          color: #999;
        }
      }
    }
  }
}
</style>
