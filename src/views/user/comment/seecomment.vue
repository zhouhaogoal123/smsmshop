<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">
      评论详情
    </div>
    <div class="user_content_blcok_line"></div>
    <div class="user_content_blcok_content">
      <div class="user_comment_order_info">
        <div class="order_pic" @click="$router.push('/goodsdetail/'+orderinfo.good_sn)">
          <el-image :src="orderinfo.goodpic"></el-image>
        </div>
        <div class="title" @click="$router.push('/goodsdetail/'+orderinfo.good_sn)">{{orderinfo.title}}</div>
      </div>

      <div class="user_content_block_comment">
        <div class="comment_time">{{orderinfo.created_at}}</div>
        <el-rate v-model="comment_info.score"></el-rate>
        <div class="comment_content">{{comment_info.content}}法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快递费了快捷啊法拉盛快递费了快捷啊递费了快捷啊法拉盛快递费了快捷啊</div>
        <div class="comment_pic">
          <div class="comment_pic_item" v-for="(item,index) in comment_info.pics" :key="index">
            <el-image :src="item.pic_url" fit="cover" @click="picclick(item.pic_url)"></el-image>
          </div>
        </div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl">
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  components: {},
  props: {},
  data() {
    return {
      orderinfo: {},  //订单信息
      cid: "", //评论id
      comment_info: {}, //评论详情
      dialogImageUrl: '', //阅览图片
      dialogVisible: false,//阅览图片开关
    };
  },
  created() {
    this.orderinfo = this.$route.query;
    this.cid = this.$route.query.commentid;
    this.getcommentdetail(); //评论详情
  },
  methods: {
    // 获取评论详情
    getcommentdetail() {
      let token = localStorage.getItem("token")
      this.$get("comment/show", { token, cid: this.cid }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.comment_info = res.data;
          this.picarray = res.data.pics.map(item => {
            return item.pic_url
          })
        } else {
          // this.$message.error(res.message)
        }
      })
    },
    // 阅览图片
    picclick(pic) {
      this.dialogVisible = true;
      this.dialogImageUrl = pic;
    }
  },
};
</script>
<style lang="scss" scoped>
.user_content_blcok_content {
  margin-top: 80px;
  display: flex;
  .user_comment_order_info {
    border-right: 2px solid #d8d8d8;
    width: 220px;
    height: 230px;
    padding: 30px;
    flex-shrink: 0;
    div {
      margin: auto;
      text-align: center;
    }
    .order_pic {
      width: 130px;
      height: 130px;
      cursor: pointer;
    }
    .title {
      color: #777;
      font: 13px/20px "微软雅黑";
      word-break: break-all;
    }
    .title:hover {
      cursor: pointer;
      color: $main_color;
    }
    .myprice {
      color: #555;
      font: 14px/20px "微软雅黑";
      font-weight: 700;
    }
  }
  .user_content_block_comment {
    padding: 30px 70px;
    width: 100%;
    .comment_time {
      font-size: 12px;
      margin-bottom: 5px;
      color: #999;
    }
    .comment_content {
      font: 12px/20px "微软雅黑";
      margin: 20px 0;
    }
    .comment_pic {
      display: flex;
      .comment_pic_item {
        width: 100px;
        height: 100px;
        cursor: pointer;
        margin-right: 30px;
      }
    }
  }
}
</style>