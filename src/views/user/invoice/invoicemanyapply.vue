<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative;">发票批量开具
      <el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="user_content_blcok_line"></div>

    <div class="formpart cannotchoose">
      <!-- 公共 -->
      <el-form :model="common_info" label-width="130px">
        <el-form-item label="发票类型">
          <div class="radiocheck">
            <div class="type" :class="common_info.type==1&&'redborder'" @click="common_info.type=1;common_info.sort=1;common_info.banben=1;common_info.paper=0;">普通发票
              <i class="iconfont">&#xe79e;</i>
            </div>
            <div class="type" :class="common_info.type==2&&'redborder'" @click="common_info.type=2;common_info.sort=2;common_info.banben=2;common_info.paper=1;">增值税专用发票
              <i class="iconfont">&#xe79e;</i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="发票材质">
          <div class="radiocheck">
            <div class="type" :class="common_info.paper==0&&'redborder'" @click="common_info.paper=0;" v-if="common_info.type!=2">电子版
              <i class="iconfont">&#xe79e;</i>
            </div>
            <div class="type" :class="common_info.paper==1&&'redborder'" @click="common_info.paper=1;">纸质版
              <i class="iconfont">&#xe79e;</i>
            </div>
          </div>
        </el-form-item>

        <!-- <el-form-item label="发票内容">
          <div class="radiocheck">
            <div class="type" :class="true&&'redborder'">商品明细
              <i class="iconfont">&#xe79e;</i>
            </div>
          </div>
        </el-form-item> -->
        <el-form-item label="发票抬头" prop="sort">
          <div class="radiocheck">
            <div class="type" v-if="common_info.type==1" :class="common_info.sort==1&&'redborder'" @click="common_info.sort=1">个人
              <i class="iconfont">&#xe79e;</i>
            </div>
            <div class="type" :class="common_info.sort==2&&'redborder'" @click="common_info.sort=2">单位
              <i class="iconfont">&#xe79e;</i>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <!-- 个人 -->
      <el-form :validate-on-rule-change="false" v-show="common_info.type==1&&common_info.sort==1" label-width="130px" :model="myself_info" :rules="myself_rules" ref="myself_ref">
        <el-form-item label="发票抬头名称" prop="title">
          <el-input v-model="myself_info.title"></el-input>
        </el-form-item>
        <el-form-item label="收票人姓名" prop="consignee" v-if="common_info.paper==1">
          <el-input v-model="myself_info.consignee"></el-input>
        </el-form-item>
        <el-form-item label="收票人手机号" prop="cphone" v-if="common_info.paper==1">
          <el-input v-model="myself_info.cphone"></el-input>
        </el-form-item>
        <el-form-item label="收票人地址" prop="district_id" v-if="common_info.paper==1">
          <AddressDropdown v-model="myself_info.district_id" :addoredit="addoredit" @set_only_addressid="set_only_addressid"></AddressDropdown>
        </el-form-item>
        <el-form-item label="详细地址" prop="caddress" v-if="common_info.paper==1">
          <el-input v-model="myself_info.caddress"></el-input>
        </el-form-item>
      </el-form>
      <!-- 单位 -->
      <el-form v-show="common_info.type==1&&common_info.sort==2" label-width="130px" :model="company_info" :rules="company_rules" ref="company_ref">
        <el-form-item label="单位名称" prop="title">
          <el-input v-model="company_info.title"></el-input>
        </el-form-item>
        <el-form-item label="发票税号" prop="identifier">
          <el-input v-model="company_info.identifier"></el-input>
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input v-model="company_info.address"></el-input>
        </el-form-item>
        <el-form-item label="注册电话">
          <el-input v-model="company_info.phone"></el-input>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-input v-model="company_info.bank"></el-input>
        </el-form-item>
        <el-form-item label="银行账号">
          <el-input v-model="company_info.bank_account"></el-input>
        </el-form-item>
        <el-form-item label="收票人姓名" prop="consignee" v-if="common_info.paper==1">
          <el-input v-model="company_info.consignee"></el-input>
        </el-form-item>
        <el-form-item label="收票人手机号" prop="cphone" v-if="common_info.paper==1">
          <el-input v-model="company_info.cphone"></el-input>
        </el-form-item>
        <el-form-item label="收票人地址" prop="district_id" v-if="common_info.paper==1">
          <AddressDropdown v-model="company_info.district_id" :addoredit="addoredit" @set_only_addressid="set_only_addressid"></AddressDropdown>
        </el-form-item>
        <el-form-item label="详细地址" prop="caddress" v-if="common_info.paper==1">
          <el-input v-model="company_info.caddress"></el-input>
        </el-form-item>
      </el-form>
      <!-- 专票 -->
      <el-form v-show="common_info.type==2" label-width="130px" :model="special_info" :rules="special_rules" ref="special_ref">
        <el-form-item label="单位名称" prop="title">
          <el-input v-model="special_info.title"></el-input>
        </el-form-item>
        <el-form-item label="发票税号" prop="identifier">
          <el-input v-model="special_info.identifier"></el-input>
        </el-form-item>
        <el-form-item label="注册地址" prop="address">
          <el-input v-model="special_info.address"></el-input>
        </el-form-item>
        <el-form-item label="注册电话" prop="phone">
          <el-input v-model="special_info.phone"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bank">
          <el-input v-model="special_info.bank"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bank_account">
          <el-input v-model="special_info.bank_account"></el-input>
        </el-form-item>
        <el-form-item label="收票人姓名" prop="consignee">
          <el-input v-model="special_info.consignee"></el-input>
        </el-form-item>
        <el-form-item label="收票人手机号" prop="cphone">
          <el-input v-model="special_info.cphone"></el-input>
        </el-form-item>
        <el-form-item label="收票人地址" prop="district_id">
          <AddressDropdown v-model="special_info.district_id" :addoredit="addoredit" @set_only_addressid="set_only_addressid"></AddressDropdown>
        </el-form-item>
        <el-form-item label="详细地址" prop="caddress">
          <el-input v-model="special_info.caddress"></el-input>
        </el-form-item>
      </el-form>

      <el-form label-width="130px">
        <el-form-item>
          <div class="submit_btn">
            <el-button type="danger" @click="onSubmit('invoice/batch')">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import AddressDropdown from '@/views/common/address_dropdown.vue'; //地址下拉框

export default {
  name: "invoice_apply",
  components: { AddressDropdown },
  data() {
    return {
      addoredit: "0", //0新增，1编辑
      orderid: "",//修改发票的订单号

      // 共有的
      common_info: {
        sort: "1",          //发票抬头类型
        type: '1',          //发票类型 普通、专用
        paper: '0',         //发票版本 0电子，1纸质
        // content: '1',       //发票内容 明细
      },
      //个人
      myself_info: {
        title: "",         //发票抬头
        consignee: '',     //收票人姓名
        cphone: '',        //收票人手机号
        district_id: "",       //地址
        caddress: ""  //详细地址
      },
      //单位
      company_info: {
        title: "",          //发票抬头
        consignee: '',      //收票人姓名
        cphone: '',         //收票人手机号
        title: "",          //单位发票抬头
        identifier: "",     //单位发票税号
        address: "",        //单位注册地址
        phone: "",          //单位注册电话
        bank: "",           //单位开户银行
        bank_account: "",   //单位开户银行卡号
        district_id: "",       //地址
        caddress: ""  //详细地址
      },
      // 专票 
      special_info: {
        title: "",          //发票抬头
        consignee: '',      //收票人姓名
        cphone: '',         //收票人手机号
        title: "",          //单位发票抬头
        identifier: "",     //单位发票税号
        address: "",        //单位注册地址
        phone: "",          //单位注册电话
        bank: "",           //单位开户银行
        bank_account: "",   //单位开户银行卡号
        district_id: "",       //地址
        caddress: ""  //详细地址
      },
      // 个人
      myself_rules: {
        title: [{ required: true, message: '请输入发票抬头', trigger: 'blur' },],
        consignee: [{ required: true, message: '请输入收票人姓名', trigger: 'blur' },],
        cphone: [{ required: true, message: '请输入收票人电话', trigger: 'blur' }, { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: 'blur' }],
        district_id: [{ required: true, message: '请选择收票人地址', trigger: 'blur' }],
        caddress: [{ required: true, message: '请输入收票人详细地址', trigger: 'blur' }]
      },
      // 单位
      company_rules: {
        consignee: [{ required: true, message: '请输入收票人姓名', trigger: 'blur' },],
        cphone: [{ required: true, message: '请输入收票人电话', trigger: 'blur' }, { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: 'blur' }],
        title: [{ required: true, message: '请输入抬头名称', trigger: 'blur' }],
        identifier: [{ required: true, message: '请输入单位发票税号', trigger: 'blur' }],
        district_id: [{ required: true, message: '请选择收票人地址', trigger: 'blur' }],
        caddress: [{ required: true, message: '请输入收票人详细地址', trigger: 'blur' }]
      },
      // 专票
      special_rules: {
        consignee: [{ required: true, message: '请输入收票人姓名', trigger: 'blur' },],
        cphone: [{ required: true, message: '请输入收票人电话', trigger: 'blur' }, { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: 'blur' }],
        title: [{ required: true, message: '请输入抬头名称', trigger: 'blur' }],
        identifier: [{ required: true, message: '请输入单位发票税号', trigger: 'blur' }],
        address: [{ required: true, message: '请输入单位注册地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入单位注册电话', trigger: 'blur' }],
        bank: [{ required: true, message: '请输入单位开户银行', trigger: 'blur' }],
        bank_account: [{ required: true, message: '请输入单位银行账号', trigger: 'blur' }],
        district_id: [{ required: true, message: '请选择收票人地址', trigger: 'blur' }],
        caddress: [{ required: true, message: '请输入收票人详细地址', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.orderid = this.$route.query.ids;
  },
  methods: {
    // 设置最后一级地址。乡镇、区县
    set_only_addressid(data) {
      console.log("最后一层id", data)
      let validref = "";
      if (this.common_info.type == 1) { //普通发票
        if (this.common_info.sort == 1) { //个人
          if (data == "") { return this.myself_info.district_id = "" }
          this.myself_info.district_id = data;
          validref = "myself_ref";
        }
        if (this.common_info.sort == 2) { //单位
          if (data == "") { return this.company_info.district_id = "" }
          this.company_info.district_id = data;
          validref = "company_ref";
        }
      }
      if (this.common_info.type == 2) { //专用发票
        if (data == "") { return this.special_info.district_id = "" }
        this.special_info.district_id = data;
        validref = "special_ref";
      }
      this.$refs[validref].validateField("district_id")
    },
    // // 发票类型改变事件
    // typechange(val) {
    //   if (val == 2) { //专票、只针对于单位
    //     this.common_info.sort = 2;
    //   }
    // },
    // 提交申请发票
    onSubmit(apply_edit) {
      let obj = {};      // 提交数据
      let validref = "";  // 校验表单
      let token = localStorage.getItem("token");
      if (this.common_info.type == 1) { //普通发票
        if (this.common_info.sort == 1) { //个人
          obj = { ...this.common_info, ...this.myself_info, ...{ token, order_ids: this.orderid } };
          validref = "myself_ref";
        }
        if (this.common_info.sort == 2) { //单位
          obj = { ...this.common_info, ...this.company_info, ...{ token, order_ids: this.orderid } };
          validref = "company_ref";
        }
      }
      if (this.common_info.type == 2) { //专用发票
        obj = { ...this.common_info, ...this.special_info, ...{ token, order_ids: this.orderid } };
        validref = "special_ref";
      }
      // console.log(obj, validref);
      this.$refs[validref].validate(valid => {
        if (valid) {
          this.$post(apply_edit, obj).then((res) => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success(res.message)
              this.$router.go(-1)
            } else {
              // this.$message.error(res.message)
            }
          })
        } else {
          return false;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.user_content_blcok_title {
  display: flex;
  justify-content: space-between;
}
.formpart {
  margin-top: 50px;
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 140px;
  }
  .submit_btn {
    .el-button {
      width: 80px;
    }
  }
  .invoice_content {
    border: 1px solid $main_color;
    padding: 5px 10px;
    color: $main_color;
    border-radius: 3px;
  }
}

.radiocheck {
  display: flex;
  margin-top: 5px;
  .type {
    padding: 5px 13px;
    border: 2px solid #f1f1f1;
    margin-right: 10px;
    position: relative;
    font-size: 12px;
    line-height: 16px;
    cursor: pointer;

    .iconfont {
      position: absolute;
      font-size: 12px;
      right: -1px;
      bottom: -3px;
      color: #999;
    }
  }
  .redborder {
    border-color: $main_color;
    .iconfont {
      color: $main_color;
    }
  }
}
</style>
