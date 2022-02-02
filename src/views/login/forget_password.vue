<template>
    <div class="shop_forgetpass">
        <!-- 头部 -->
        <div class="toppart">
            <div class="logo">
                <img :src="iscompany?'/pc/sanmulogo2.jpg':'/pc/sanmulogo.jpg'" @click="tohome">
                <span>登录中心</span>
            </div>
            <ul class="imgpart">
                <li class="img1"></li>
                <li class="img2"></li>
                <li class="img3"></li>
            </ul>
        </div>

        <div class="shop_login_bg">
            <div class="shop_login_block">
                <div class="login_left"></div>
                <div class="login_right">
                    <div class="login_block">
                        <div class="login_title">
                            <ul>
                                <li class="main_color">忘记密码</li>
                                <div>|</div>
                                <li @click="tologin" style="cursor:pointer">账号登录</li>
                            </ul>
                        </div>
                        <div v-show="errormsg" class="login_errormsg">
                            <i class="iconfont">&#xe60d;</i> {{errormsg}}</div>

                        <el-form :model="ruleForm" :rules="rules" ref="ruleFormDom" class="login_input">
                            <el-form-item prop="phoneNum" :show-message="false">
                                <el-input placeholder="手机号" v-model.number="ruleForm.phoneNum"></el-input>
                            </el-form-item>
                            <el-form-item prop="password" :show-message="false">
                                <el-input placeholder="新密码" type="password" v-model="ruleForm.password"></el-input>
                            </el-form-item>
                            <el-form-item prop="checkPass" :show-message="false">
                                <el-input placeholder="确认新密码" type="password" v-model="ruleForm.checkPass"></el-input>
                            </el-form-item>
                            <!-- 短信验证码 -->
                            <el-form-item prop="phoneCode" :show-message="false">
                                <el-input placeholder="短信验证码" v-model="ruleForm.phoneCode" width="160px" class="send_left"></el-input>
                                <input @click="send_sms" class="send_right" ref="send_right" type="button" value="发送验证码">
                            </el-form-item>
                        </el-form>
                        <el-button class="login_btn" type="danger" @click="to_update">修改密码</el-button>

                        <div class="login_btn_b">
                            <span @click="toregister">没有账号？</span>
                        </div>
                    </div>
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
export default {
    components: { ShopTop, CompanyHead, ShopFoot },
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            errormsg: "", // 错误提示信息
            iscompany: "",
            ruleForm: {
                phoneNum: '',
                password: '',
                checkPass: '',
                phoneCode: ''
            },
            rules: {
                phoneNum: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: 'blur' }, //1[3456789]\d{9} 1开头，3456789随机一位，数字0-9随机9位
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: this.$jiaoyan_password, message: '密码格式错误', trigger: 'blur' },//[^\u4e00-\u9fa5]非中文，{6,16}6到16位
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ],
                phoneCode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
            },
        };
    },
    created() {
        this.iscompany = this.$route.name === "company_forget_password"
    },
    methods: {
        tohome() {
            this.iscompany ? this.$router.push("/company/home") : this.$router.push("/")
        },
        tologin() {
            this.iscompany ? this.$router.replace("/company/login") : this.$router.replace("/login");
        },
        toregister() {
            this.iscompany ? this.$router.replace("/company/register") : this.$router.replace("/register");
        },
        // 发送短信 
        send_sms: function () {
            this.$refs.ruleFormDom.validateField("phoneNum", (error) => {
                // console.log(error)
                // 如果手机号码通过/没有错误信息
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
                    return this.errormsg = error;
                }
            })
        },
        // 请求验证码
        getcode() {
            this.$post("auth/password/send_code", { mobile: this.ruleForm.phoneNum }).then(res => {
                console.log(res)
                if (res.code !== 200) {
                    this.errormsg = res.message;
                };
            })
        },
        //修改按钮 
        to_update() {
            let propField = ['phoneNum', 'password', 'checkPass', 'phoneCode'];
            Promise.all(propField.map(item => {
                return new Promise(resolve => {
                    this.$refs['ruleFormDom'].validateField(item, (error) => {
                        resolve(error)
                    })
                });
            })).then((data) => {
                // console.log(data) //错误数组
                let dataarr = data.filter(item => {
                    return item !== ""
                })
                if (dataarr.length > 0) {
                    // 有错误，提示第一个错误
                    this.errormsg = dataarr[0];
                } else {
                    // 没错误，提交到后台
                    this.$post(this.$api.homeForgetPassword, { password: this.ruleForm.password, mobile: this.ruleForm.phoneNum, code: this.ruleForm.phoneCode }).then(res => {
                        console.log(res)
                        if (res.code == 200) {
                            this.$message.success("重置成功");
                            if (this.iscompany) {
                                this.$router.replace("/company/login")
                            } else {
                                this.$router.replace('/login');
                            }
                        } else {
                            return this.errormsg = res.message;
                        }
                    });
                }
            })
        }

    },
};
</script>
<style lang="scss" scoped>
@import "@/views/common/css/login.scss";
</style>