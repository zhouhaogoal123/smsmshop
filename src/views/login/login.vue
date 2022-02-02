<template>
    <div class="shop_login">
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
                    <!-- 登录窗口 -->
                    <div class="login_block">
                        <div class="login_title">
                            <ul class="cannotchoose">
                                <li @click="changeLogin('qiye')" :class="iscompany&&'main_color'">企业账号登录</li>
                                <div>|</div>
                                <!-- 用于app扫码登录，暂时先用账号登录 -->
                                <li @click="changeLogin('geren')" :class="!iscompany&&'main_color'">个人帐号登录</li>
                            </ul>
                        </div>
                        <!-- 短信码先不写。注意，只有封装的组件才加.native ，比如elementui的el-input标签等 -->
                        <!-- <div class="login_input">
                            <div class="input_block"><input type="text" @keyup.enter.native="to_login" v-model="info.phone" placeholder="手机号"></div>
                            <div class="input_block"><input type="password" @keyup.enter.native="to_login" v-model="info.password" placeholder="密码"></div>
                            <div class="input_block" v-show="error_num>=5">
                                <input v-model="info.code" @keyup.enter.native="to_login" type="text" class="yzm" placeholder="短信验证码">
                                <input @click="send_sms" class="send" type="button" value="发送验证码">
                            </div>
                        </div> -->
                        <div v-show="errormsg" class="login_errormsg">
                            <i class="iconfont">&#xe60d;</i> {{errormsg}}</div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleFormDom" class="login_input">
                            <!-- 手机号 v-model.number以数字开头则去掉后面的文字-->
                            <el-form-item prop="mobile" :show-message="false">
                                <el-input placeholder="请输入手机号" v-model.number="ruleForm.mobile" clearable>
                                    <template slot="prepend">
                                        <span class="el-icon-user" style="font-size:20px;"></span>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <!-- 密码 -->
                            <el-form-item prop="password" :show-message="false">
                                <!-- 其他组件库的组件上加上事件，需要加上.native 关键词 -->
                                <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" @keyup.enter.native="to_login(ruleForm)" clearable>
                                    <template slot="prepend">
                                        <span class="el-icon-lock" style="font-size:20px;"></span>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <el-button class="login_btn" type="danger" @click="to_login(ruleForm)">登录</el-button>

                        <div class="login_btn_b">
                            <span @click="toregister">立即注册</span> |
                            <span @click="toforgetpass">忘记密码？</span>
                        </div>

                        <el-divider class="cannotchoose">其他登录方式</el-divider>
                        <div class="other_login" @click="wechat_login" slot="reference">
                            <div class="login_type cannotchoose">
                                <i class="iconfont iconweixin"></i>
                                <div class="weixinfont">微信</div>
                            </div>
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
import { mapState } from 'vuex';
import { setTimeout } from 'timers';
export default {
    name: "loginpage",
    components: {
        ShopTop, CompanyHead, ShopFoot
    },
    data() {
        return {
            // error_num: 0, //记录报错个数
            iscompany: "",
            errormsg: "",//错误提示信息
            ruleForm: {
                mobile: null,
                password: null,
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: "blur" },
                    { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: "blur" }, //1[3456789]\d{9} 1开头，3456789随机一位，数字0-9随机9位
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: "blur" },
                    { pattern: this.$jiaoyan_password, message: '密码格式错误', trigger: "blur" },//[^\u4e00-\u9fa5]非中文，{6,16}6到16位
                ]
            },
        };
    },
    inject: ['reload'], //因为replace不会刷新页面，所以用这个方式刷新页面
    mounted() {
        // this.error_num = this.get_error_num(); // 获取登录失败次数;（用于多次失败的验证码验证）
        this.iscompany = this.$route.name === "company_login"
    },
    computed: {
        ...mapState(["user_iscompany", "token"])
    },
    beforeRouteLeave(to, from, next) {
        // console.log(from, to,this.token)
        if (this.token) { // 已经登录的跳转。分企业或普通用户跳转
            if (to.name == "home") {  //如果返回页面为个人首页
                this.iscompany ? next("/company/home") : next()
            } else if (to.name == "company_home") { //如果返回页面为企业首页
                this.iscompany ? next() : next("/")
            } else if (to.name == "goodsdetail") { //如果返回页面为个人详情页
                this.iscompany ? next("/company/goodsdetail/" + to.params.goods_id) : next()
            } else if (to.name == "company_goodsdetail") {//如果返回页面为企业详情页
                this.iscompany ? next() : next("/goodsdetail/" + to.params.goods_id)
            } else if (to.name == "login" || to.name == "company_login") { //如果是登录页面之间的切换，直接放行
                next()
            } else {
                this.iscompany ? next("/company/home") : next("/")
            }
        } else { // 没有登录的跳转
            next()
        }
    },
    methods: {
        changeLogin(val) {
            console.log(val, this.iscompany)
            if (val == "qiye") {
                if (!this.iscompany) {
                    this.$router.replace('/company/login')
                } else {
                    return;
                }
            } else if (val == "geren") {
                if (this.iscompany) {
                    this.$router.replace('/login');
                } else {
                    return;
                }
            }
            setTimeout(() => {
                this.reload();
            }, 100)
        },
        tohome() {
            this.iscompany ? this.$router.push("/company/home") : this.$router.push("/")
        },
        toregister() {
            this.iscompany ? this.$router.replace("/company/register") : this.$router.replace("/register");
        },
        toforgetpass() {
            this.iscompany ? this.$router.replace("/company/forget_password") : this.$router.replace("/forget_password");
        },
        // 登录按钮
        to_login() {
            let propField = ['mobile', 'password'];
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
                    let urlapi = "";
                    if (this.iscompany) {
                        urlapi = this.$api.companyLogin
                    } else {
                        urlapi = this.$api.homeLogin
                    }
                    this.$post(urlapi, this.ruleForm).then(res => {
                        if (res.code !== 200) {
                            return this.errormsg = res.message;
                        }
                        console.log("登录成功返回信息", res)
                        this.$setInfo('token', res.data.access_token); //用户token
                        this.$store.commit("setToken", res.data.access_token)
                        this.$store.commit("setUserInfo", res.data)
                        this.$store.commit("setCartCount", res.data.cart_count)
                        this.$store.commit("setBalance", res.data.balance)
                        this.$message.success('登录成功');
                        if (this.iscompany) {
                            this.$store.commit("setIsCompany", "true")//企业登录凭证
                            this.$router.go(-1)
                        } else {
                            this.$store.commit("setIsCompany", "false")//取消企业登录凭证
                            this.$router.go(-1)
                        }
                    })
                }
            })
        },

        // 获取登录失败次数 （用于多次失败的验证码验证）
        // get_error_num: function () {
        //     let error_num = localStorage.getItem('login_error_num');
        //     if (this.$isEmpty(error_num)) {
        //         error_num = 0;
        //     }
        //     return error_num;
        // },

        // 微信登录，暂时不要
        wechat_login() {
            this.$message.error("敬请期待")
            // location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=" + this.oauth.appid + "&redirect_uri=%2fuser%2fwechat_login&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/views/common/css/login.scss";
.login_right .login_block .login_title {
  width: 290px;
}
// 微信登录
.login_type {
  text-align: center;
  margin: 0 auto;
  .iconweixin {
    color: green;
    font-size: 30px;
  }
  .weixinfont {
    font-size: 14px;
    line-height: 20px;
    color: #666;
  }
}
.login_type:hover {
  cursor: pointer;
}
</style>