<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title">
            支付密码修改
        </div>
        <div class="user_content_blcok_line"></div>

        <div class="admin_form_main">
            <el-form label-width="100px" ref="info" :model="info" :rules="rules">
                <el-form-item label="旧密码" prop="old_pay_password">
                    <el-input placeholder="请输入内容" type="password" v-model.number="info.old_pay_password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pay_password">
                    <el-input placeholder="请输入内容" type="password" v-model.number="info.pay_password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repay_password">
                    <el-input placeholder="请输入内容" type="password" v-model.number="info.repay_password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="edit_user_info" class="submitclass">提交</el-button>
                    <el-button @click="resetForm('info')" class="resetclass">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        var validateNum = (rule, value, callback) => {
            if (value.toString().length !== 6) {
                callback(new Error("密码必须为6位数字"));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.info.pay_password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            token: "",
            info: {
                old_pay_password: '',
                pay_password: '',
                repay_password: '',
            },
            rules: {
                old_pay_password: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur' },
                    { type: "number", message: '密码必须为6位数字', trigger: 'blur' },
                    { validator: validateNum, trigger: 'blur' }
                ],
                pay_password: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    { type: 'number', message: '密码必须为6位数字', trigger: 'blur' },
                    { validator: validateNum, trigger: 'blur' }
                ],
                repay_password: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    { type: 'number', message: '密码必须为6位数字', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
        };
    },
    methods: {
        // 修改密码
        edit_user_info: function () {
            let token = localStorage.getItem("token")
            this.$refs.info.validate((valid) => {
                if (valid) {
                    this.$post("account/pay_password", { token, old_pay_password: this.info.old_pay_password, pay_password: this.info.pay_password, pay_password_confirmation: this.info.repay_password }).then(res => {
                        console.log(res)
                        if (res.code == 200) {
                            this.$message.success('修改成功');
                            this.$router.go(-1);
                        } else {
                            // this.$message.error(res.message);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
};
</script>
<style lang="scss" scoped>
.admin_form_main{
    margin-top: 80px;
}
.submitclass{
    margin-top: 30px;
    width: 100px;
}
.resetclass{
    width: 100px;
    border-radius: 0;
}
</style>