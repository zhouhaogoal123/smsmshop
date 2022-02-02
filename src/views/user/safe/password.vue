<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title">
            登录密码编辑
        </div>
        <div class="user_content_blcok_line"></div>

        <div class="admin_form_main">
            <el-form label-width="100px" ref="info" :model="info" :rules="rules">
                <el-form-item label="旧密码" prop="old_password">
                    <el-input placeholder="请输入内容" type="password" v-model="info.old_password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input placeholder="请输入内容" type="password" v-model="info.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword">
                    <el-input placeholder="请输入内容" type="password" v-model="info.repassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="edit_user_info">提交</el-button>
                    <el-button @click="resetForm('info')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.info.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            info: {
                old_password: '',
                password: '',
                repassword: '',
            },
            rules: {
                old_password: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
                repassword: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 提交表单
        edit_user_info: function () {
            this.$refs.info.validate((valid) => {
                if (valid) {
                    let token = localStorage.getItem("token");
                    this.$post("account/password/update", { token, password_confirmation: this.info.repassword, old_password: this.info.old_password, password: this.info.password }).then(res => {
                        console.log(res)
                        if (res.code == 200) {
                            this.$message.success('修改成功');
                            this.$router.go(-1);
                        } else {
                            // this.$message.error(res.message);
                        }
                    });
                } else {
                    this.$message({
                        message: '请将密码填写完整',
                        type: 'warning'
                    });
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
</style>