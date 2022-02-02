<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">
      增票资质
    </div>
    <div class="user_content_blcok_line"></div>
    <el-tag type="warning" class="tishi">我们会在一个工作日内完成审核</el-tag>

    <div class="invoiceabout zhuanpiao">
      <div class="invoice_top">
        <span class="needweight">您的增票资质：</span>
        <el-tag type="danger" v-if="zizhi_status">待完善</el-tag>
        <el-tag type="warning" v-if="zizhi_status==0">待审核</el-tag>
        <el-tag type="success" v-if="zizhi_status==1">已通过审核</el-tag>
        <el-tag type="danger" v-if="zizhi_status==2">审核失败</el-tag>

        <span class="edit" @click="edit_zhuanpiao" v-if="zhuanpiao_show">修改</span>
      </div>
      <ul v-if="zhuanpiao_show">
        <li>
          <span class="itemlabel">单位名称：</span> {{zhuanpiao_info.name}}</li>
        <li>
          <span class="itemlabel">纳税人识别码：</span>{{zhuanpiao_info.identifier}}</li>
        <li>
          <span class="itemlabel">注册地址：</span>{{zhuanpiao_info.site}}</li>
        <li>
          <span class="itemlabel">注册电话：</span>{{zhuanpiao_info.mobile}}</li>
        <li>
          <span class="itemlabel">开户银行：</span>{{zhuanpiao_info.bank}}</li>
        <li>
          <span class="itemlabel">银行账户：</span>{{zhuanpiao_info.account}}</li>
      </ul>
      <el-form label-width="150px" :model="zhuanpiao_info" :rules="zhuanpiao_rules" ref="zhuanpiao_ref" v-else>
        <el-form-item label="单位名称：">
          <el-input v-model="zhuanpiao_info.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别码：" prop="identifier">
          <el-input v-model="zhuanpiao_info.identifier"></el-input>
        </el-form-item>
        <el-form-item label="注册地址：" prop="site">
          <el-input v-model="zhuanpiao_info.site"></el-input>
        </el-form-item>
        <el-form-item label="注册电话：" prop="mobile">
          <el-input v-model="zhuanpiao_info.mobile"></el-input>
        </el-form-item>
        <el-form-item label="开户银行：" prop="bank">
          <el-input v-model="zhuanpiao_info.bank"></el-input>
        </el-form-item>
        <el-form-item label="银行账户：" prop="account">
          <el-input v-model="zhuanpiao_info.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" plain @click="edit_companyinfo">确认</el-button>
          <el-button type="info" plain @click="edit_companyinfo_cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="invoiceabout">
      <div class="invoice_top">
        <span class="needweight">增票收票地址</span>
        <span class="edit" @click="shoupiao_show = false" v-if="shoupiao_show">修改</span>
      </div>
      <ul v-if="shoupiao_show">
        <li>
          <span class="itemlabel">收票人姓名：</span>{{shoupiao_info.name}}</li>
        <li>
          <span class="itemlabel">收票人手机号：</span>{{shoupiao_info.phone}}</li>
        <li>
          <span class="itemlabel">收票人地址：</span>{{info.alladdress}}</li>
        <li>
          <span class="itemlabel">详细地址：</span>{{shoupiao_info.address}}</li>
      </ul>
      <el-form label-width="150px" :model="shoupiao_info" :rules="shoupiao_rules" ref="shoupiao_ref" v-else>
        <el-form-item label="收票人姓名：" prop="name">
          <el-input v-model="shoupiao_info.name"></el-input>
        </el-form-item>
        <el-form-item label="收票人手机号：" prop="phone">
          <el-input v-model="shoupiao_info.phone"></el-input>
        </el-form-item>
        <el-form-item label="收票人地址：" prop="district_id">
          <AddressDropDown v-model="shoupiao_info.district_id" class="selectaddress" @set_only_addressid="set_only_addressid" :addoredit="info.addoredit" :myprovince="info.province" :mycity="info.city" :mydistrict="info.district" :mystreet="info.street" :myprovince_id="info.province_id" :mycity_id="info.city_id" :mydistrict_id="info.district_id" :mystreet_id="info.street_id" @setaddress="setaddress" @setprovince="setprovince" @setcity="setcity" @setdistrict="setdistrict" @setstreet="setstreet">
          </AddressDropdown>
        </el-form-item>
        <el-form-item label="收票人详细地址：" prop="address">
          <el-input v-model="shoupiao_info.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" plain @click="edit_shoupiaoinfo">确认</el-button>
          <el-button type="info" plain @click="edit_shoupiao_cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AddressDropDown from '@/views/common/address_dropdown.vue';
export default {
  name: "company_invoice_special",
  components: { AddressDropDown },
  data() {
    return {
      token: "",
      zizhi_status: "",
      zhuanpiao_show: true,
      shoupiao_show: true,
      zhuanpiao_init: {
        name: "",
        identifier: "",
        site: "",
        mobile: "",
        bank: "",
        account: "",
      },
      shoupiao_init: {
        name: "",
        phone: "",
        district_id: "",
        address: "",
      },
      info: { //收票人地址信息
        alladdress: "", //地址拼接
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
      zhuanpiao_info: {}, //浅拷贝，zhuanpiao_init初始值。不能直接等于，因为数据层级深，所以使用浅拷贝
      shoupiao_info: {}, //浅拷贝，shoupiao_init初始值。不能直接等于，因为数据层级深，所以使用浅拷贝
      zhuanpiao_rules: {
        identifier: [{ required: true, message: '请输入公司纳税人识别号', trigger: 'blur' }],
        site: [{ required: true, message: '请输入公司注册地址', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入公司注册电话', trigger: 'blur' }, { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: "blur" }],
        bank: [{ required: true, message: '请输入公司开户银行', trigger: 'blur' }],
        account: [{ required: true, message: '请输入公司银行账号', trigger: 'blur' }],
      },
      shoupiao_rules: {
        name: [{ required: true, message: '请输入收票人姓名', trigger: 'blur' }, { min: 2, message: '请输入至少2个字符的姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入收票人电话', trigger: 'blur' }, { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: "blur" }],
        district_id: [{ required: true, message: '请完善收票人地址', trigger: 'blur' }],
        address: [{ required: true, message: '请输入收票人详细地址', trigger: 'blur' }],
      }
    }
  },
  created() {
    this.token = localStorage.getItem("token");
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    if (user_info.company.name) {
      this.zhuanpiao_info.name = this.zhuanpiao_init.name = user_info.company.name;
    }
    this.getcompanyinfo();
  },
  methods: {
    // 设置收票人地址id
    set_only_addressid(data) {
      console.log("最后一层id", data)
      this.shoupiao_info.district_id = data;
      if (data == "") { return }
      this.$refs.shoupiao_ref.validateField("district_id")
    },
    // 获取公司信息
    getcompanyinfo() {
      this.$get("department/proof_show", { token: this.token }).then(res => {
        console.log(res)

        this.zizhi_status = res.data.status //资质审核状态
        this.zhuanpiao_init.identifier = res.data.identifier;
        this.zhuanpiao_init.site = res.data.site;
        this.zhuanpiao_init.mobile = res.data.mobile;
        this.zhuanpiao_init.bank = res.data.bank;
        this.zhuanpiao_init.account = res.data.account;
        this.zhuanpiao_info = { ...this.zhuanpiao_init };

        this.shoupiao_init.name = res.data.name;
        this.shoupiao_init.phone = res.data.phone;
        this.shoupiao_init.address = res.data.address;
        this.shoupiao_info = { ...this.shoupiao_init };

        if (!res.data.province) { return this.info.addoredit = 0; }
        this.info.province = res.data.province;
        this.info.city = res.data.city;
        this.info.district = res.data.district;
        this.info.street = res.data.street;
        this.info.province_id = res.data.province_id;
        this.info.city_id = res.data.city_id;
        this.info.district_id = res.data.district_id;
        this.info.street_id = res.data.street_id;
        this.info.alladdress = (res.data.province || "") + (res.data.city || "") + (res.data.district || "") + (res.data.street || "");
      })
    },
    // 修改公司信息
    edit_companyinfo() {
      this.$refs.zhuanpiao_ref.validate(valid => {
        if (valid) {
          this.$post("department/proof", { ...this.zhuanpiao_info, ...{ token: this.token } }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success(res.message);
              this.zhuanpiao_show = true;
              this.zizhi_status = 0;
            }
          })
        }
      })
    },
    // 取消修改公司信息
    edit_companyinfo_cancel() {
      this.zhuanpiao_info = { ...this.zhuanpiao_init };
      this.zhuanpiao_show = true;
    },
    // 确认修改收票人地址
    edit_shoupiaoinfo() {
      this.$refs.shoupiao_ref.validate(valid => {
        if (valid) {
          this.$post("department/recipient", { ...this.shoupiao_info, ...{ token: this.token } }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.getcompanyinfo();
              this.$message.success(res.message);
              this.shoupiao_show = true;
            }
          })
        }
      })
    },
    // 取消修改收票人地址
    edit_shoupiao_cancel() {
      this.shoupiao_info = { ...this.shoupiao_init };
      this.shoupiao_show = true;
    },
    // 修改专票按钮点击
    edit_zhuanpiao() {
      this.zhuanpiao_show = false;
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
.tishi {
  width: 100%;
  border-radius: 0;
}
.zengpiao {
  margin: 50px 0;
}
.itemlabel {
  display: inline-block;
  width: 100px;
  text-align: end;
  margin-left: 30px;
  line-height: 26px;
}
.invoiceabout {
  font-size: 14px;
  color: #666;
  .invoice_top {
    margin-bottom: 20px;
    .needweight {
      font-weight: 700;
    }
  }
  .edit {
    color: #0829e3;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 15px;
  }
  /deep/.el-input__inner {
    width: 280px;
  }
  .selectaddress {
    /deep/.el-input__inner {
      width: 140px;
    }
  }
}
.zhuanpiao {
  margin: 50px 0 80px;
}
</style>
