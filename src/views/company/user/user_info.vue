<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">
      企业信息
    </div>
    <div class="user_content_blcok_line"></div>

    <el-form :model="form" label-width="120px" :disabled="caneditinfo" ref="companyref" :rules="rules">
      <el-form-item label="公司名称：">
        {{form.name}}
      </el-form-item>
      <el-form-item label="公司地址：" prop="district_id">
        <AddressDropDownGood v-model="form.district_id" @set_only_addressid="set_only_addressid" :address_info="info"></AddressDropDownGood>
      </el-form-item>
      <el-form-item label="公司详细地址：" prop="detail" class="address_detail_cl">
        <el-input v-model="form.detail"></el-input>
      </el-form-item>
      <el-form-item label="企业人数：" prop="number" class="num_cl">
        <el-select v-model="form.number" placeholder="请选择" popper-class="company_num">
          <el-option v-for="item in numlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form label-width="120px">
      <el-form-item v-if="caneditinfo">
        <el-button type="success" plain @click="editinfo">修改</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="success" plain @click="save_edit">保存</el-button>
        <el-button type="info" plain @click="cancel_edit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AddressDropDownGood from "@/views/common/address_dropdown_good.vue";
export default {
  name: "company_userinfo",
  components: { AddressDropDownGood },
  data() {
    return {
      caneditinfo: true, //是否可以进行编辑，true为不能编辑
      initform: {
        name: "",
        district_id: "",
        detail : "",
        number: "",
      },
      form: {},
      addressinfo: {},
      numlist: [{ value: '1', label: '1-49' }, { value: '2', label: '50-99' }, { value: '3', label: '100-499' }, { value: '4', label: '500-999' }, { value: '5', label: '1000以上' }],
      rules: {
        district_id: [{ required: true, message: '请选择公司地址', trigger: 'blur' }],
        detail: [{ required: true, message: '请输入公司详细地址', trigger: 'blur' }],
        number: [{ required: true, message: '请选择公司人数范围', trigger: 'change' }],
      },
      info: { //公司地址信息
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
  created() {
    let user_info = JSON.parse(localStorage.getItem("user_info"))
    this.initform.name = user_info.company.name;
    this.getcompanyinfo();
  },
  methods: {
    getcompanyinfo() {
      let token = localStorage.getItem("token")
      this.$get("company/show", { token }).then(res => {
        console.log(res)
        this.initform.detail = res.data.detail
        this.initform.number = res.data.number.toString();
        if (!res.data.street_id) {
          if (res.data.district_id) {
            this.initform.district_id = res.data.district_id
          } else {
            this.initform.district_id = res.data.city_id
          }
        }
        this.form = { ...this.initform };
        this.info = { ...res.data, ...{ addoredit: 1 } }; //地址信息
      })
    },
    editinfo() {
      this.caneditinfo = false;
    },
    save_edit() {
      let token = localStorage.getItem("token");
      this.$refs.companyref.validate(valid => {
        if (valid) {
          this.$post("company/edit", { ...this.form, ...{ token: token } }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success(res.message)
              this.caneditinfo = true;
            }
          })
        } else {
          return false;
        }
      })

    },
    cancel_edit() {
      this.caneditinfo = true;
      this.form = { ...this.initform }
      this.$refs.companyref.clearValidate();
    },
    // 设置最后一级地址。乡镇、区县
    set_only_addressid(data) {
      console.log("最后一层id", data)
      if (data == "") {
        return this.form.district_id = "";
      }
      this.form.district_id = data;
      this.$refs.companyref.validateField("district_id")
    },
  },
}
</script>

<style lang="scss" scoped>
.el-form {
  /deep/.el-form-item__label {
    font-size: 13px;
  }
  /deep/.el-form-item__content {
    color: #666;
  }
}
.address_detail_cl {
  /deep/.el-input__inner {
    width: 350px;
  }
}
.num_cl {
  /deep/.el-input__inner {
    width: 140px;
  }
}
</style>
