<template>
  <div class="login">
    <div class="tophead">
      <header>
        <div class="smlogo">
          <el-image src="/pc/sanmulogo.png" fit="cover" @click="$router.push({name:'home'})"></el-image>
          <span>个人注册</span>
        </div>
        <div class="tologin">
          已有账号？
          <span @click="tologin">请登录></span>
        </div>
      </header>
    </div>
    <div class="centercontent">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormDom" class="elformclass">
        <div class="error_msgfont" v-if="errormsg">
          <i class="iconfont">&#xe60d;</i> {{errormsg}}</div>
        <el-form-item prop="phoneNum" :show-message="false">
          <el-input placeholder="手机号" v-model.number="ruleForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item prop="phoneCode" :show-message="false">
          <el-input placeholder="短信验证码" v-model="ruleForm.phoneCode" width="160px" class="send_left"></el-input>
          <input @click="send_sms" class="send_right" ref="send_right" type="button" value="发送验证码">
        </el-form-item>
        <el-form-item prop="password" :show-message="false">
          <el-input placeholder="密码" type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" :show-message="false">
          <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
      </el-form>
      <!-- 同意 -->
      <div class="agree">
        <el-checkbox v-model="checked">我已阅读并同意
          <router-link :to="{name:'agreement_register'}" target="_blank" tag="a">《三目企业用户注册协议》</router-link>
        </el-checkbox>
      </div>
      <div class="btn">
        <el-button type="danger" @click="toregister">立即注册</el-button>
      </div>
      <div class="tocompany_register">
        <i class="iconfont">&#xe62e;</i>
        <span class="font" @click="companyregister">企业注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phoneNum: '',
        password: '',
        checkPass: '',
        phoneCode: ''
      },
      rules: {
        phoneNum: [{ required: true, message: '请输入手机号', trigger: "blur" }, { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: "blur" },],//1[3456789]\d{9} 1开头，3456789随机一位，数字0-9随机9位
        password: [{ required: true, message: '请输入密码', trigger: "blur" }, { pattern: this.$jiaoyan_password, message: '密码格式错误', trigger: "blur" },],//[^\u4e00-\u9fa5]非中文，{6,16}6到16位
        checkPass: [{ required: true, message: '请输入确认密码', trigger: "blur" }, { validator: validatePass2, trigger: "blur" }],
        phoneCode: [{ required: true, message: '请输入短信验证码', trigger: "blur" }]
      },
      checked: false, //是否同意注册协议
      errormsg: "", //错误提示
    }
  },
  inject: ['reload'], //因为replace不会刷新页面，所以用这个方式刷新页面
  methods: {
    send_sms() {
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
      this.$post("auth/send_regcode", { mobile: this.ruleForm.phoneNum }).then(res => {
        if (res.code !== 200) {
          this.errormsg = res.message;
        };
      })
    },
    tologin() {
      this.$router.replace({ name: "login" })
    },

    toregister() {
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
          if (!this.checked) {
            return this.$message.error("请先勾选用户协议");
          }
          // 没错误，提交到后台
          this.$post(this.$api.homeRegister, { mobile: this.ruleForm.phoneNum, password: this.ruleForm.password, code: this.ruleForm.phoneCode }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success("注册成功");
              this.$router.replace('/login');
            } else {
              return this.errormsg = res.message;
            }
          });
        }
      })
    },
    companyregister() {
      this.$router.replace("/company/register");
      setTimeout(() => {
        this.reload();
      }, 100)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/views/common/css/register.scss";
</style>
