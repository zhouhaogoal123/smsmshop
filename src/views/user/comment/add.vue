<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title">
            订单评论
        </div>
        <div class="user_content_blcok_line"></div>
        <div class="user_content_blcok_content">
            <div class="user_comment_order_info">
                <div class="order_pic" @click="todetail">
                    <el-image :src="orderinfo.img_url"></el-image>
                </div>
                <div class="title" @click="todetail">{{orderinfo.title}}</div>
                <div class="myprice">￥ {{orderinfo.myprice}}</div>
            </div>

            <div class="user_content_block_show">
                <div class="admin_form_main">
                    <el-form label-width="100px" ref="info" :model="info">
                        <el-form-item prop="score">
                            <div class="user_comment_star">
                                <el-rate show-text :texts="texts" v-model="info.score"></el-rate>
                            </div>
                        </el-form-item>
                        <el-form-item label="评论内容" prop="content" :rules="[{required:true,message:'评论内容不能为空',trigger: 'blur' }]">
                            <div class="user_comment_input">
                                <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="info.content" show-word-limit maxlength="500"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="评论图片" prop="comment_images" class="width_auto">
                            <el-upload ref="elupload" action="" multiple :auto-upload="false" :http-request="handleupload" list-type="picture-card" :limit="3" :on-preview="handleSee" :on-exceed="overnum" :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>

                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="user_content_blcok_submitbtn">
                    <el-button type="danger" @click="submitForm">发表评论</el-button>
                </div>
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
            info: {  //提交表单信息
                score: 5,
                content: '',
                order_detail_id: "",
            },
            texts: ['1分', '2分', '3分', '4分', '5分'], //评分后的文字
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            shangchuan: {}
        };
    },
    created() {
        this.orderinfo = this.$route.query;
        this.info.order_detail_id = this.$route.query.doit;
    },
    methods: {
        // 提交评价
        submitForm() {
            this.$refs.info.validate(valid => {
                if (valid) {
                    let token = localStorage.getItem("token")
                    let upobj = { ...this.info, ...{ token: token } } //params正常格式的数据
                    this.$refs.elupload.submit(); // 这里是执行文件上传的函数，其实也就是获取我们要上传的文件  
                    let formdata = new FormData()
                    this.fileList.forEach(item => {
                        formdata.append(item.name, item)  //将每一个文件图片都加进formdata
                    })
                    this.$postformdata("/comment/add", formdata, upobj).then(res => {
                        console.log(res)
                        if (res.code == 200) {
                            if (this.$route.path.startsWith("/company")) {
                                this.$router.push({ name: "com_home_comment_success" })
                            } else {
                                this.$router.push({ name: "home_comment_success" })
                            }
                        } else {
                            // this.$message.error(res.message);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 一般情况下是在这里创建FormData对象，但我们需要上传多个文件，为避免发送多次请求，因此在这里只进行文件的获取，param可以拿到文件上传的所有信息
        handleupload(param) {
            let ifput = this.fileList.every((item) => { //全真为真
                return item.name != param.file.name;
            })
            if (ifput) { //重复的就不提交
                this.fileList.push(param.file);
            }
        },
        // 浏览图片
        handleSee(file) {
            this.dialogVisible = true;
            this.dialogImageUrl = file.url;
        },
        // 删除图片
        handleRemove(file) {
            this.fileList = this.fileList.filter(item => { //返回true的数组
                return item.name !== file.name;
            })
        },
        // 超出限制提示
        overnum() {
            this.$message.error('亲，最多只能上传三张图片哦');
        },
        // 跳转到详细页面
        todetail() {
            this.$router.push("/goodsdetail/" + this.orderinfo.orderid)
        },
    },
};
</script>
<style lang="scss" scoped>
.user_content_blcok {
  .user_content_blcok_content {
    margin-top: 80px;
    display: flex;
  }
  .user_content_blcok_submitbtn {
    width: 220px;
    margin-left: 100px;
    .el-button {
      width: 100%;
      font-size: 16px;
    }
  }
}

.user_comment_order_info {
  border-right: 2px solid #d8d8d8;
  width: 220px;
  height: 500px;
  padding: 30px;
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

.user_comment_star {
  .el-rate {
    line-height: 2;
  }
}
.order_no {
  background: #efefef;
  line-height: 30px;
  padding-left: 15px;
  margin-bottom: 20px;
}
.user_content_block_show {
  padding: 30px;
  .el-form-item {
    margin-bottom: 50px;
    width: 540px;
  }
  .user_comment_star {
    /deep/.el-rate__text {
      color: #666 !important;
      padding-left: 5px;
    }
  }
  .user_comment_input {
    .el-textarea {
      font-size: 12px;
    }
    /deep/.el-textarea__inner {
      padding-bottom: 10px;
    }
    /deep/.el-input__count {
      line-height: 20px;
    }
  }
}
</style>