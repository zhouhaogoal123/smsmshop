<template>
  <div class="dialog_invoice">
    <!-- 共有 -->
    <el-form label-width="100px" :model="common_info">
      <el-form-item label="发票类型">
        <div class="radiocheck">
          <div class="type" :class="common_info.type==1&&'redborder'" @click="common_info.type=1;common_info.sort=1;common_info.paper=0;">普通发票
            <i class="iconfont">&#xe79e;</i>
          </div>
          <div class="type" :class="common_info.type==2&&'redborder'" @click="common_info.type=2;common_info.sort=2;common_info.paper=1;">增值税专用发票
            <i class="iconfont">&#xe79e;</i>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="发票版本">
        <div class="radiocheck">
          <div class="type" v-if="common_info.type==1" :class="common_info.paper==0&&'redborder'" @click="common_info.paper=0;">电子版
            <i class="iconfont">&#xe79e;</i>
          </div>
          <div class="type" :class="common_info.paper==1&&'redborder'" @click="common_info.paper=1;">纸质版
            <i class="iconfont">&#xe79e;</i>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="发票内容">
        <div class="radiocheck">
          <div class="type" :class="true&&'redborder'">商品明细
            <i class="iconfont">&#xe79e;</i>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="发票抬头">
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
    <el-form v-show="common_info.type==1&&common_info.sort==1" label-width="100px" :model="myself_info" :rules="myself_rules" ref="myself_ref">
      <el-form-item label="发票抬头名称" prop="title">
        <el-input v-model="myself_info.title"></el-input>
      </el-form-item>
      <div v-show="common_info.paper==1">
        <el-form-item label="收票人姓名" prop="name">
          <el-input v-model="myself_info.name"></el-input>
        </el-form-item>
        <el-form-item label="收票人地址" prop="district_id" class="addressid">
          <AddressDropDown v-model="myself_info.district_id" @set_only_addressid="set_only_addressid" :ifdialog="true"></AddressDropDown>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="myself_info.address"></el-input>
        </el-form-item>
        <el-form-item label="收票人手机号" prop="phone">
          <el-input v-model="myself_info.phone"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <!-- 单位 -->
    <el-form v-show="common_info.type==1&&common_info.sort==2" label-width="100px" :model="company_info" :rules="company_rules" ref="company_ref">
      <el-form-item label="单位名称" prop="title">
        <el-input v-model="company_info.title"></el-input>
      </el-form-item>
      <el-form-item label="发票税号" prop="identifier">
        <el-input v-model="company_info.identifier"></el-input>
      </el-form-item>
      <el-form-item label="注册地址">
        <el-input v-model="company_info.site"></el-input>
      </el-form-item>
      <el-form-item label="注册电话">
        <el-input v-model="company_info.mobile"></el-input>
      </el-form-item>
      <el-form-item label="开户银行">
        <el-input v-model="company_info.bank"></el-input>
      </el-form-item>
      <el-form-item label="银行账号">
        <el-input v-model="company_info.account"></el-input>
      </el-form-item>
      <div v-show="common_info.paper==1">
        <el-form-item label="收票人姓名" prop="name">
          <el-input v-model="company_info.name"></el-input>
        </el-form-item>
        <el-form-item label="收票人地址" prop="district_id" class="addressid">
          <AddressDropDown v-model="company_info.district_id" @set_only_addressid="set_only_addressid" :ifdialog="true" :addoredit="info.addoredit" :myprovince="info.province" :mycity="info.city" :mydistrict="info.district" :mystreet="info.street" :myprovince_id="info.province_id" :mycity_id="info.city_id" :mydistrict_id="info.district_id" :mystreet_id="info.street_id" @setaddress="setaddress" @setprovince="setprovince" @setcity="setcity" @setdistrict="setdistrict" @setstreet="setstreet"></AddressDropDown>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="company_info.address"></el-input>
        </el-form-item>
        <el-form-item label="收票人手机号" prop="phone">
          <el-input v-model="company_info.phone"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <!-- 专票 -->
    <el-form v-show="common_info.type==2" label-width="100px" :model="special_info" :rules="special_rules" ref="special_ref">
      <el-form-item label="单位名称" prop="title">
        <el-input v-model="special_info.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="发票税号" prop="identifier">
        <el-input v-model="special_info.identifier" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册地址" prop="site">
        <el-input v-model="special_info.site" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册电话" prop="mobile">
        <el-input v-model="special_info.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item label="开户银行" prop="bank">
        <el-input v-model="special_info.bank" disabled></el-input>
      </el-form-item>
      <el-form-item label="银行账号" prop="account">
        <el-input v-model="special_info.account" disabled></el-input>
      </el-form-item>
      <div v-show="common_info.paper==1">
        <el-form-item label="收票人姓名" prop="name">
          <el-input v-model="special_info.name"></el-input>
        </el-form-item>
        <el-form-item label="收票人地址" prop="district_id" class="addressid">
          <AddressDropDown v-model="special_info.district_id" @set_only_addressid="set_only_addressid" :ifdialog="true" :addoredit="info.addoredit" :myprovince="info.province" :mycity="info.city" :mydistrict="info.district" :mystreet="info.street" :myprovince_id="info.province_id" :mycity_id="info.city_id" :mydistrict_id="info.district_id" :mystreet_id="info.street_id" @setaddress="setaddress" @setprovince="setprovince" @setcity="setcity" @setdistrict="setdistrict" @setstreet="setstreet"></AddressDropDown>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="special_info.address"></el-input>
        </el-form-item>
        <el-form-item label="收票人手机号" prop="phone">
          <el-input v-model="special_info.phone"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-form label-width="100px">
      <el-form-item>
        <el-button @click="cancelinvoice">取 消</el-button>
        <el-button type="primary" @click="saveinvoice">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AddressDropDown from '@/views/common/address_dropdown.vue';
export default {
  name: "dialog_invoice",
  components: { AddressDropDown },
  data() {
    return {
      // 共有的
      common_info: {
        type: '1',          //发票类型
        paper: "0",         //发票版本 0电子1纸质
        content: '1',       //发票内容
        sort: "1",          //发票抬头类型
      },
      //个人
      myself_info: {
        title: "",          //发票抬头
        name: '',      //收票人姓名
        district_id: "",    //收票人地址
        address: "",       //收票人详细地址
        phone: '',         //收票人手机号
      },
      //单位
      company_info: {
        title: "",          //发票抬头
        identifier: "",     //单位发票税号
        site: "",        //单位注册地址
        mobile: "",          //单位注册电话
        bank: "",           //单位开户银行
        account: "",   //单位开户银行卡号
        name: '',      //收票人姓名
        district_id: "",    //收票人地址
        address: "",       //收票人详细地址
        phone: '',         //收票人手机号
      },
      // 专票 
      special_info: {
        title: "",          //发票抬头
        identifier: "",     //单位发票税号
        site: "",        //单位注册地址
        mobile: "",          //单位注册电话
        bank: "",           //单位开户银行
        account: "",   //单位开户银行卡号
        name: '',      //收票人姓名
        district_id: "",    //收票人地址
        address: "",       //收票人详细地址
        phone: '',         //收票人手机号
      },
      // 个人
      myself_rules: {
        title: [{ required: true, message: '请输入发票抬头', trigger: 'blur' },],
        name: [{ required: true, message: '请输入收票人姓名', trigger: 'blur' },],
        district_id: [{ required: true, message: '请输入收票人地址', trigger: 'blur' },],
        address: [{ required: true, message: '请输入收票人详细地址', trigger: 'blur' },],
        phone: [{ required: true, message: '请输入收票人电话', trigger: 'blur' }],
      },
      // 单位
      company_rules: {
        name: [{ required: true, message: '请输入收票人姓名', trigger: 'blur' },],
        district_id: [{ required: true, message: '请输入收票人地址', trigger: 'blur' },],
        address: [{ required: true, message: '请输入收票人详细地址', trigger: 'blur' },],
        phone: [{ required: true, message: '请输入收票人电话', trigger: 'blur' }],
        title: [{ required: true, message: '请输入抬头名称', trigger: 'blur' }],
        identifier: [{ required: true, message: '请输入单位发票税号', trigger: 'blur' }],
      },
      // 专票
      special_rules: {
        name: [{ required: true, message: '请输入收票人姓名', trigger: 'blur' },],
        district_id: [{ required: true, message: '请输入收票人地址', trigger: 'blur' },],
        address: [{ required: true, message: '请输入收票人详细地址', trigger: 'blur' },],
        phone: [{ required: true, message: '请输入收票人电话', trigger: 'blur' }],
        title: [{ required: true, message: '请输入抬头名称', trigger: 'blur' }],
        identifier: [{ required: true, message: '请输入单位发票税号', trigger: 'blur' }],
        site: [{ required: true, message: '请输入单位注册地址', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入单位注册电话', trigger: 'blur' }],
        bank: [{ required: true, message: '请输入单位开户银行', trigger: 'blur' }],
        account: [{ required: true, message: '请输入单位银行账号', trigger: 'blur' }],
      },
      info: { //收票人地址信息
        addoredit: "1",   //0新增,1修改
        province: "",  //省
        city: "",      //市
        district: "",  //区
        street: "",    //街道
        province_id: "",  //省
        city_id: "",      //市
        district_id: "",  //区
        street_id: "",    //街道
      },
    }
  },
  props: ["invoice_default", "geren_info", "danwei_info", "zhuanyong_info", "addressinfo"],
  watch: {
    invoice_default: {
      handler(newval) {
        this.common_info = JSON.parse(JSON.stringify(newval));
      },
      immediate: true
    },
    geren_info: {
      handler(newval) {
        this.myself_info = JSON.parse(JSON.stringify(newval));
      },
      immediate: true
    },
    danwei_info: {
      handler(newval) {
        this.company_info = JSON.parse(JSON.stringify(newval));
      },
      immediate: true
    },
    zhuanyong_info: {
      handler(newval) {
        this.special_info = JSON.parse(JSON.stringify(newval));
      },
      immediate: true
    },
    addressinfo: {
      handler(newval) {
        this.info = JSON.parse(JSON.stringify(newval));
      },
      immediate: true
    },
  },
  methods: {
    // 修改地址id
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
    // 保存发票
    saveinvoice() {
      let invoice_info = {};
      if (this.common_info.type == 1) {
        if (this.common_info.sort == 1) { //普通发票，个人
          if (this.common_info.paper == 0) { //电子个人发票
            this.$refs.myself_ref.validateField("title", err => {
              if (!err) {
                this.sendto_dad(this.common_info, this.myself_info, 1)
              } else {
                return;
              }
            })
          } else { //纸质个人发票
            this.$refs.myself_ref.validate((valid) => {
              if (valid) {
                this.sendto_dad(this.common_info, this.myself_info, 1)
              } else {
                return false;
              }
            })
          }
        } else { //普通发票，单位
          if (this.common_info.paper == 0) { //电子单位发票
            this.$refs.company_ref.validateField(["title", "identifier"], err => {
              if (!err) {
                this.sendto_dad(this.common_info, this.company_info, 2)
              } else {
                return;
              }
            })
          } else { //纸质单位发票
            this.$refs.company_ref.validate((valid) => {
              if (valid) {
                this.sendto_dad(this.common_info, this.company_info, 2)
              } else {
                return false;
              }
            })
          }
        }
      }
      if (this.common_info.type == 2) { //专票
        this.$refs.special_ref.validate((valid) => {
          if (valid) {
            this.sendto_dad(this.common_info, this.special_info, 3)
          } else {
            return false;
          }
        })
      }
    },
    // 向父级发送发票信息
    sendto_dad(commoninfo, primaryinfo, edittype) {
      this.$emit("saveinvoice", commoninfo, primaryinfo, edittype, this.info);
    },

    // 取消发票
    cancelinvoice() {
      this.$emit("cancelinvoice");
    },

    // 下拉地址改变事件
    setaddress(data) { },
    setprovince(data) { },
    setcity(data) { },
    setdistrict(data) { },
    setstreet(data) { },
  },
}
</script>

<style lang="scss" scoped>
.radiocheck {
  display: flex;
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
.el-form {
  margin-top: 20px;
  /deep/.el-form-item__label {
    line-height: 30px;
    font-size: 13px;
  }
  /deep/.el-form-item__content {
    height: 30px;
    line-height: 30px;
    width: 260px;
  }
  .addressid /deep/.el-form-item__content {
    width: 600px;
    /deep/.el-input__icon {
      line-height: 30px !important;
    }
  }
  /deep/.el-input__inner {
    line-height: 30px;
    height: 30px;
    font-size: 12px;
  }
}
</style>

