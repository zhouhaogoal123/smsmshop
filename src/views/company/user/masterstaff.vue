<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">
      主子账号
      <span>
        <el-button size="mini" type="danger" @click="departmentDialogVisible=true">新增部门
          <i class="iconfont">&#xe62f;</i>
        </el-button>
      </span>
    </div>
    <div class="user_content_blcok_line"></div>
    <el-tag type="warning" style="margin-bottom:10px;width:100%;">企业授权总额度：{{user_info.quota}} 元</el-tag>
    <el-row class="mythead">
      <el-col :span="6">部门名称</el-col>
      <el-col :span="5">部门用户</el-col>
      <el-col :span="3">支付审核</el-col>
      <el-col :span="4">部门报销额度</el-col>
      <el-col :span="6">添加部门新用户</el-col>
    </el-row>
    <el-row class="mytbody" type="flex" justify="space-between" v-for="(item,index) in zhuziArr" :key="index">
      <el-col :span="6" class="department_name" :style="{'height':item.users.length*50+'px'}">
        <el-row>
          <el-col :span="24">{{item.name}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <div v-if="item.users.length>0">
          <el-row v-for="vo in item.users" :key="vo.id" class="userline" type="flex">
            <el-col :span="24">
              <el-popover trigger="hover" placement="left" popper-class="mypopover">
                <p>昵称 : {{vo.nickname}}</p>
                <p>电话 : {{vo.mobile}}</p>
                <!-- slot="reference" 触发的提示框的元素 -->
                <el-button slot="reference" type="info" size="mini" class="username">{{vo.nickname}}
                  <i class="iconfont">&#xe60e;</i>
                </el-button>
              </el-popover>
            </el-col>
          </el-row>
        </div>
        <el-row v-else class="nousers">
          <div></div>
        </el-row>
      </el-col>
      <el-col :span="3">
        <div v-if="item.users.length>0">
          <el-row v-for="vo in item.users" :key="vo.id" class="userline" type="flex">
            <el-col :span="24">
              <!-- 默认1需要审核，0不需要审核 active-value开关打开的值-->
              <el-switch v-model="vo.status" :active-value="1" :inactive-value="0" active-color="#13ce66" @change="userStautsChange(vo.id,vo.status)"></el-switch>
            </el-col>
          </el-row>
        </div>
        <el-row v-else class="nousers">
          <div></div>
        </el-row>
      </el-col>
      <el-col :span="4" class="money" :style="{'height':item.users.length*50+'px'}">
        {{item.distribute}}
      </el-col>
      <el-col :span="6">
        <el-button type="warning" size="mini" @click="setmoney(item.id)">报销额度
          <i class="el-icon-edit-outline"></i>
        </el-button>
        <el-button type="danger" size="mini" @click="addnewusers(item.id)">新增用户
          <i class="iconfont">&#xe62f;</i>
        </el-button>
      </el-col>
    </el-row>

    <!-- 添加部门 lock-scroll弹出框出现滚动条样式不变 -->
    <el-dialog class="departmentdialog" :lock-scroll="false" width="33%" v-if="departmentDialogVisible" :visible.sync="departmentDialogVisible" title="新增部门" @closed="department_beforeclose" :close-on-click-modal="false">
      <div class="home_form_main">
        <el-form label-width="100px" ref="departmentref" :model="departmentinfo" :rules="departmentrules">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入部门名称" v-model="departmentinfo.name"></el-input>
          </el-form-item>
          <el-form-item label="报销额度">
            <el-input placeholder="请输入此部门可报销的额度" v-model="departmentinfo.distribute"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="departmentDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="add_department">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户 lock-scroll弹出框出现滚动条样式不变 -->
    <el-dialog class="usersdialog" :lock-scroll="false" width="33%" v-if="usersDialogVisible" :visible.sync="usersDialogVisible" title="新增用户" @closed="users_beforeclose" :close-on-click-modal="false">
      <div class="home_form_main">
        <el-form label-width="100px" ref="usersref" :model="usersinfo" :rules="usersrules">
          <el-form-item label="用户手机号" prop="mobile">
            <el-input placeholder="请输入用户手机号" v-model="usersinfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input placeholder="请输入用户昵称" v-model="usersinfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input placeholder="请输入用户密码" v-model="usersinfo.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input placeholder="请输入确认密码" v-model="usersinfo.checkpass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="支付需审核" prop="status">
            <!-- 默认1需要审核，0不需要审核 active-value开关打开的值-->
            <el-switch v-model="status" :active-value="1" :inactive-value="0" active-color="#13ce66"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="usersDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="add_user">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设置部门报销金额 -->
    <el-dialog class="editdialog" :lock-scroll="false" width="33%" v-if="editDialogVisible" :visible.sync="editDialogVisible" title="修改报销额度" @closed="edit_beforeclose" :close-on-click-modal="false">
      <div class="home_form_main">
        <el-form label-width="100px" ref="moneyref" :model="moneyinfo">
          <el-form-item label="报销额度">
            <el-input placeholder="请输入部门可报销额度" v-model="moneyinfo.distribute"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="edit_money">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.usersinfo.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      zhuziArr: [],
      departmentDialogVisible: false,
      usersDialogVisible: false,
      editDialogVisible: false,
      departmentinfo: {
        token: "",
        company_id: "",
        name: "",
        distribute: 0, //选填默认0 报销额度
      },
      usersinfo: {
        department_id: "",
        mobile: "",
        password: "",
        checkpass: "",
        nickname: "",
        token: "",
      },
      status: 1,

      moneyinfo: {
        token: "",
        company_id: "",
        department_id: "",
        distribute: "",
      },
      departmentrules: {
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }]
      },
      usersrules: {
        mobile: [{ required: true, message: '请填写用户手机号', trigger: 'blur' }, { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: "blur" }],
        nickname: [{ required: true, message: '请填写用户昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请填写用户密码', trigger: 'blur' }, { pattern: this.$jiaoyan_password, message: '密码格式错误', trigger: "blur" }],
        checkpass: [{ required: true, message: '请输入确认密码', trigger: "blur" }, { validator: validatePass, trigger: "blur" }],
      },
    }
  },
  computed: {
    ...mapState(["user_info"])
  },
  created() {
    this.moneyinfo.token = this.departmentinfo.token = this.usersinfo.token = localStorage.getItem("token");
    this.moneyinfo.company_id = this.departmentinfo.company_id = JSON.parse(localStorage.getItem("user_info")).company.id;
    this.getinitinfo()
  },
  methods: {
    getinitinfo() {
      this.$get("department/list", { token: this.departmentinfo.token }).then(res => {
        console.log("主子账号信息", res)
        this.zhuziArr = res.data;
      })
    },
    add_department() {
      this.$refs.departmentref.validate(valid => {
        if (valid) {
          this.$post("department/add", this.departmentinfo).then(res => {
            if (res.code == 200) {
              this.departmentDialogVisible = false;
              this.$message.success("添加成功")
              this.getinitinfo();
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return false;
        }
      })
    },
    addnewusers(id) {
      this.usersinfo.department_id = id;
      this.usersDialogVisible = true;
    },
    setmoney(id) {
      this.moneyinfo.department_id = id;
      this.editDialogVisible = true;
    },
    // 添加用户
    add_user() {
      this.$refs.usersref.validate(valid => {
        if (valid) {
          this.$post("department/users", { ...this.usersinfo, ...{ status: this.status } }).then(res => {
            if (res.code == 200) {
              this.usersDialogVisible = false
              this.$message.success("添加成功")
              this.getinitinfo();
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return false;
        }
      })
    },
    edit_money() {
      this.$post("department/edit", this.moneyinfo).then(res => {
        if (res.code == 200) {
          this.editDialogVisible = false
          this.$message.success("修改成功")
          this.getinitinfo();
        } else {
          this.$message.error(res.message)
        }
      })
    },
    department_beforeclose() {
      this.$refs.departmentref.resetFields();
    },
    users_beforeclose() {
      this.$refs.usersref.resetFields();
    },
    edit_beforeclose() {
      this.$refs.moneyref.resetFields();
    },
    userStautsChange(id, status) {
      let token = localStorage.getItem("token")
      let newstatus = ""
      if (status) {
        newstatus = 1
      } else {
        newstatus = 0
      }
      this.$post("user/status", { user_id: id, status: newstatus, token }).then(res => {
        console.log(res)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.departmentdialog,
.usersdialog,
.editdialog {
  /deep/.el-dialog {
    .el-input__inner {
      width: 230px;
    }
  }
}

.mythead {
  text-align: center;
  color: #888;
  font-weight: 700;
  line-height: 48px;
  background: #f1f1f1;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  .el-col {
    border-right: 1px solid #e6e6e6;
  }
  .el-col:last-child {
    border-right: none;
  }
}
.mytbody {
  min-height: 50px;
  text-align: center;
  align-items: center;
  color: #666;
  border: 1px solid #e6e6e6;
  border-top: none;
  .department_name {
    min-height: 50px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e6e6e6;
  }
  .money {
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e6e6e6;
  }
  .userline {
    height: 50px;
    align-items: center;
    .el-col {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .userline:last-child {
    .el-col {
      border-bottom: none;
    }
  }
  .nousers {
    height: 50px;
    display: flex;
    div {
      width: 100%;
      height: 100%;
      border-right: 1px solid #e6e6e6;
    }
  }
}
.username {
  color: #666;
  background: #fff;
  border-color: transparent;
  .iconfont {
    font-size: 12px;
    color: #d8d8d8;
  }
}
.iconfont {
  font-size: 12px;
}
.mypopover {
  p {
    font-size: 14px;
    color: #777;
    line-height: 30px;
  }
}
</style>
