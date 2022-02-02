<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title">
            支付密码重置
        </div>
        <div class="user_content_blcok_line"></div>
        <div class="admin_form_main">
            <el-form label-width="100px" ref="msgref" :model="msginfo" :rules="msgrules">
                <el-form-item label="手机号" prop="mobile">
                    {{msginfo.mobile}}
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <div class="codeclass">
                        <el-input v-model="msginfo.code" class="send_left"></el-input>
                        <input @click="sendmsg" class="send_right" ref="send_right" type="button" value="发送验证码">
                    </div>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input placeholder="请输入内容" type="password" v-model.number="msginfo.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="msgedit" class="submitclass">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validateNum = (rule, value, callback) => {
            if (value.toString().length !== 6) {
                callback(new Error("密码必须为6位数字"));
            } else {
                callback();
            }
        };
        return {
            token: "",
            msginfo: {
                mobile: "",
                code: "",
                password: "",
            },
            msgrules: {
                mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: 'blur' }],
                code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { type: 'number', message: '密码必须为6位数字', trigger: 'blur' }, { validator: validateNum, trigger: 'blur' }],
            }
        };
    },

    methods: {
        // 发送短信
        sendmsg() {
            this.$refs.msgref.validateField("mobile", (error) => {
                if (!error) {
                    this.getcode();
                    let nums = 60;
                    let btn = this.$refs.send_right;
                    btn.disabled = true; //将按钮置为不可点击
                    btn.value = nums + '秒后可重新获取';
                    let clock = setInterval(() => {
                        nums--;
                        if (nums > 0) {
                            btn.value = nums + '秒后可重新获取';
                        } else {
                            clearInterval(clock); //清除js定时器
                            btn.disabled = false;
                            btn.value = '点击发送验证码';
                            nums = 60; //重置时间
                        }
                    }, 1000); //一秒执行一次
                } else {
                    this.$message.error(error);
                }
            })
        },
        // 获取手机验证码
        getcode() {
            this.$post("auth/paypassword/send_code", { mobile: this.msginfo.mobile, token: this.token }).then(res => {
                console.log("验证码返回结果", res)
            })
        },
        // 手机验证码格式修改密码
        msgedit() {
            this.$refs.msgref.validate(valid => {
                if (valid) {
                    let token = localStorage.getItem("token");
                    this.$post("auth/paypassword/reset", { ...this.msginfo, ...{ token: this.token } }).then(res => {
                        console.log(res)
                        if (res.code == 200) {
                            this.$message.success('修改成功');
                            // this.$router.go(-1);
                            setTimeout(() => {
                                if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) { // IE
                                    if (history.length > 0) {
                                        window.history.go(-1);
                                    } else {
                                        window.close();
                                    }
                                } else { //非IE浏览器
                                    if (navigator.userAgent.indexOf('Firefox') >= 0 ||
                                        navigator.userAgent.indexOf('Opera') >= 0 ||
                                        navigator.userAgent.indexOf('Safari') >= 0 ||
                                        navigator.userAgent.indexOf('Chrome') >= 0 ||
                                        navigator.userAgent.indexOf('WebKit') >= 0) {
                                        if (window.history.length > 1) {
                                            window.history.go(-1);
                                        } else {
                                            window.close();
                                        }
                                    } else { //未知的浏览器
                                        window.history.go(-1);
                                    }
                                }
                            }, 1000)
                        } else {
                            // this.$message.error(res.message);
                        }
                    });
                } else {
                    return false;
                }
            })

        },
    },
    created() {
        this.token = localStorage.getItem("token");
        this.msginfo.mobile = JSON.parse(localStorage.getItem("user_info")).mobile;
    },
};
</script>
<style lang="scss" scoped>
// 短信验证码栏
.send_left {
  width: 160px;
}

.send_right {
  background: #333;
  color: #fff;
  width: 140px;
  border: none;
  height: 40px;
  margin-left: 20px;
}

.send_right:hover {
  cursor: pointer;
  opacity: 0.9;
}
.codeclass {
  display: flex;
}
.el-button {
  width: 300px;
}
.admin_form_main {
  margin-top: 80px;
}
.submitclass {
  margin-top: 30px;
}
</style>