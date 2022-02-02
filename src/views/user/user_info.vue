<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title" style="position: relative;">
            用户资料
        </div>
        <div class="user_content_blcok_line"></div>

        <div class="admin_form_main">
            <el-form label-width="100px" ref="info" :model="info">
                <el-form-item label="昵称" prop="nickname" :rules="[{required:true,message:'昵称不能为空',trigger: 'blur' }]">
                    <el-input placeholder="请输入内容" v-model="info.nickname"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <el-upload class="avatar-uploader" ref="elupload" action="" :show-file-list="false" :auto-upload="false" list-type="picture-card" :on-change="handlechange">
                        <img v-if="avatar" :src="avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input placeholder="请输入内容" v-model="info.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :rules="[{type:'email',message:'邮箱格式非法',trigger: 'blur' }]">
                    <el-input type="email" placeholder="xxx@qq.com" v-model="info.email"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender" class="red_radio">
                    <el-radio-group v-model="info.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { uploadImgToBase64, ossopt } from '@/plugins/utils.js';
import axios from 'axios';
export default {
    data() {
        return {
            info: {
                nickname: '',
                email: '',
                mobile: '',
                sex: "",
            },
            avatar: '',  //用于展示的头像地址
            upavatar: "",// 用于上传的头像地址
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                imageUrl: [
                    { required: true, message: '请上传图片', trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        // 设置上传头像图片格式
        beforeupload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 选中文件/提交文件时触发事件
        handlechange(file, filelist) {
            this.avatar = URL.createObjectURL(file.raw); //转码用于浏览
            this.upavatar = file;
        },

        // 提交修改信息。触发图片上传。携带其他form提交参数
        submitForm() {
            this.$refs.info.validate(async valid => {
                if (valid) {
                    let token = localStorage.getItem("token");
                    let paraminfo = { ...this.info, ...{ token: token } }
                    let formdata = new FormData();
                    formdata.append("avatar", this.upavatar.raw); //将本地头像存为formdata格式
                    this.$postformdata("account/update", formdata, paraminfo).then(res => {
                        console.log("res1", res)
                        if (res.code == 200) {
                            this.getinfo();
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 刷新用户信息
        getinfo() {
            let token = localStorage.getItem("token");
            let iscompany = localStorage.getItem("user_iscompany") == "true"
            
            let upapi = ""
            iscompany ? upapi = "company/refresh" : upapi = "auth/refresh"
            this.$get(upapi, { token: token }).then(res => { //刷新用户信息接口，只有这个接口酬和用吧..
                console.log("res2", res)
                if (res.code == 200) {
                    this.$message.success("编辑成功");
                    this.$setInfo('token', res.data.access_token); //用户token

                    //将用户信息放在vuex。因为localStorage不能实时更新，只有刷新了才有数据。所以第一次需要放在vuex中实现实时更新用户信息。
                    this.$store.commit("setToken", res.data.access_token)
                    this.$store.commit("setUserInfo", res.data)
                    this.$store.commit("setCartCount", res.data.cart_count)
                    this.$store.commit("setBalance", res.data.balance)
                } else {
                    // this.$message.error(res.message)
                }
            })
        }

    },
    created() {
        let user_info = JSON.parse(localStorage.getItem("user_info"));
        this.info.nickname = user_info.nickname;
        this.info.mobile = user_info.mobile;
        this.info.email = user_info.email;
        this.info.sex = user_info.sex;
        this.avatar = user_info.avatar;
    },
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  width: 200px;
  height: 200px;
  /deep/.el-upload {
    width: 198px;
    height: 198px;
    .avatar-uploader-icon {
      width: 198px;
      height: 198px;
      line-height: 198px;
    }
    img {
      width: 198px;
      height: 198px;
    }
  }
}
</style>