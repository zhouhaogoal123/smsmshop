<template>
  <!-- 选择服务类型 -->
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">
      退换/售后申请
    </div>
    <div class="user_content_blcok_line"></div>

    <div class="goodinfo">
      <el-row class="toptitle">
        <el-col :span="19">商品信息</el-col>
        <el-col :span="5">购买数量</el-col>
      </el-row>
      <el-row class="bottomcontent">
        <el-col :span="19">
          <div class="goods">
            <div class="goodspic">
              <el-image :src="detaildata.img_url" fit="cover"></el-image>
            </div>
            <div class="goodtitle">
              <div class="title">{{detaildata.title||"加载中..."}}</div>
              <div class="danjia">{{detaildata.price||"0.00"}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="5" class="num">{{detaildata.number||"1"}}</el-col>
      </el-row>
    </div>
    <!-- 服务类型部分的form表单 -->
    <el-form label-width="95px" :model="upinfo" ref="upinfo_ref" :rules="upinfo_rules">
      <div class="submit_content">
        <el-form-item label="服务类型" prop="type">
          <el-radio-group v-model="upinfo.type" @change="radiochange">
            <el-radio label="1">退款/退货
              <i class="iconfont">&#xe79e;</i>
            </el-radio>
            <el-radio label="2" v-if="waitinggoodshow||aftersaleshow">换货
              <i class="iconfont">&#xe79e;</i>
            </el-radio>
            <el-radio label="3" v-if="aftersaleshow">维修
              <i class="iconfont">&#xe79e;</i>
            </el-radio>
            <el-radio label="4" v-if="aftersaleshow">补发商品
              <i class="iconfont">&#xe79e;</i>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 当选中服务类型再展示 -->
        <div v-if="upinfo.type!=0">
          <el-form-item label="提交原因" prop="cause_id">
            <el-select v-model="upinfo.cause_id" placeholder="请选择" popper-class="xiala_item">
              <el-option v-for="item in options" :key="item.id" :label="item.cause" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提交数量" prop="num">
            <el-input-number v-model="upinfo.num" :min="1" :max="detaildata.number"></el-input-number>
          </el-form-item>
          <el-form-item label="换新商品" v-if="upinfo.type==2&&detaildata.attr" prop="attrs">
            <el-select v-model="upinfo.attr_id" placeholder="请选择" popper-class="xiala_item">
              <el-option v-for="vo in detaildata.attrs" :key="vo.id" :label="vo.attr_text" :value="vo.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款方式" v-if="upinfo.type==1">
            <el-tag type="danger">原支付方式返回</el-tag>
            <div class="returnmoney">最多退款金额:
              <span>{{detaildata.total}}</span>
            </div>
          </el-form-item>
          <el-form-item label="问题说明" prop="remark">
            <el-input class="detailwidth" v-model="upinfo.remark" type="textarea" :rows="6" placeholder="换货说明" show-word-limit maxlength="300"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload ref="elupload" action="" multiple :auto-upload="false" :http-request="handleupload" list-type="picture-card" :limit="5" :on-preview="handleSee" :on-exceed="overnum" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <div class="uploadtishi">最多可上传5张图片，每张图片大小不超过5M，支持bmp,gif,jpg,png,jpeg格式文件</div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="图片加载失败">
            </el-dialog>
          </el-form-item>
        </div>
      </div>
      <div class="submit_address" v-if="upinfo.type!=0">
        <div class="check_address">确认信息
          <span @click="editshow=false" v-if="editshow">[ 修改 ]</span>
        </div>
        <!-- 默认地址 -->
        <div class="submit_adress_form" v-if="editshow">
          <el-form-item label="申请凭据">有发票</el-form-item>
          <el-form-item label="返回方式" :required="true">快递到三目</el-form-item>
          <el-form-item label="取货信息" :required="true">{{detaildata.name}} {{splicephone}}</el-form-item>
          <el-form-item label="收货信息" :required="true">{{ alladdress}}</el-form-item>
        </div>
        <!-- 修改地址部分的form表单 -->
        <div class="submit_adress_form editaddress" v-else>
          <el-form-item label="申请凭据">
            <div class="iagree">
              <el-checkbox v-model="invoice">有发票</el-checkbox>
              <el-checkbox v-model="report">有检测报告</el-checkbox>
            </div>
          </el-form-item>
          <el-form-item label="返回方式" class="back" prop="state">
            <el-radio-group v-model="upinfo.state">
              <el-radio label="1">上门取件
                <i class="iconfont">&#xe79e;</i>
              </el-radio>
              <el-radio label="2">快递到三目
                <i class="iconfont">&#xe79e;</i>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="取货地址" prop="fromaddress_valid">
            <AddressDropdown :addoredit="addoredit" @setaddress="setaddress_from" @setprovince="setprovince_from" @setcity="setcity_from" @setdistrict="setdistrict_from" @setstreet="setstreet_from" :myprovince="detaildata.province" :mycity="detaildata.city" :mydistrict="detaildata.district" :mystreet="detaildata.street" :myprovince_id="detaildata.province_id" :mycity_id="detaildata.city_id" :mydistrict_id="detaildata.district_id" :mystreet_id="detaildata.street_id"></AddressDropdown>
          </el-form-item>
          <el-form-item label="取货详细地址" prop="from_detail">
            <el-input v-model="upinfo.from_detail" class="addressinput"></el-input>
          </el-form-item>
          <el-form-item label="取货联系人" prop="from_name">
            <el-input v-model="upinfo.from_name"></el-input>
          </el-form-item>
          <el-form-item label="取货联系电话" prop="from_mobile">
            <el-input v-model="upinfo.from_mobile"></el-input>
          </el-form-item>

          <div v-if="upinfo.type!=1">
            <el-form-item label="收货地址" prop="getaddress_valid">
              <AddressDropdown :addoredit="addoredit" @setaddress="setaddress_get" @setprovince="setprovince_get" @setcity="setcity_get" @setdistrict="setdistrict_get" @setstreet="setstreet_get" :myprovince="detaildata.province" :mycity="detaildata.city" :mydistrict="detaildata.district" :mystreet="detaildata.street" :myprovince_id="detaildata.province_id" :mycity_id="detaildata.city_id" :mydistrict_id="detaildata.district_id" :mystreet_id="detaildata.street_id"></AddressDropdown>
            </el-form-item>
            <el-form-item label="收货详细地址" prop="get_detail">
              <el-input v-model="upinfo.get_detail" class="addressinput"></el-input>
            </el-form-item>
            <el-form-item label="收货联系人" prop="get_name">
              <el-input v-model="upinfo.get_name"></el-input>
            </el-form-item>
            <el-form-item label="收货联系电话" prop="get_mobile">
              <el-input v-model="upinfo.get_mobile"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <div class="iagree iagree_yes" v-if="upinfo.type!=0">
      <el-checkbox v-model="checked">我已阅读并同意
        <router-link :to="{name:'agreement'}" target="_blank" tag="a">《上门取件服务协议》</router-link>
      </el-checkbox>
    </div>
    <div class="clear" v-if="upinfo.type!=0">
      <div class="submitbtn">
        <el-button type="danger" @click="submitForm">提交</el-button>
      </div>
    </div>
  </div>

</template>


<script>
import HeadTop from '@/components/head_top.vue';
import AddressDropdown from '@/views/common/address_dropdown.vue'; //地址下拉框
export default {
  components: { HeadTop, AddressDropdown },
  data() {
    var validateAddress_from = (rule, value, callback) => {
      console.log("地址是否填写完整", this.addresslength_from)
      if (this.addresslength_from == 3 || this.addresslength_from == 4) {
        callback(new Error("请将地址填写完整"))
      } else {
        callback(new Error("请将地址填写完整"))
      }
    };
    var validateAddress_get = (rule, value, callback) => {
      console.log(this.addresslength_get)
      if (this.addresslength_get == 3 || this.addresslength_get == 4) {
        callback()
      } else {
        callback(new Error("请将地址填写完整"))
      }
    };
    return {
      token: "",
      waitinggoodshow: false,//换货展示
      aftersaleshow: false,//维修、补发货物展示与隐藏
      detailid: "", //该商品售后id
      detaildata: "",//该商品详细数据
      alladdress: "", //所有地址信息
      checked: false, //是否同意上门取件服务
      editshow: true,//在修改按钮页面true
      dialogVisible: false, //图片大图展示false
      dialogImageUrl: "", //展示的图片
      fileList: [],//上传图片列表
      addoredit: "1",//0新增，1修改
      addresslength_from: "",//取地址填写是否完整
      addresslength_get: "",//收地址填写是否完整

      // 下拉框数据
      options: [],

      upinfo: { //售后原因表单信息
        type: "", //服务类型 1换货、2退货、3维修、4补发商品
        cause_id: "", // 提交原因
        num: "",  // 提交数量
        attr_id: "999",//（换新商品才有，商品新属性)
        amount: "", //提交金额 单价*数量 只需要传给后台就行3
        remark: "", //问题说明

        state: "1",// 返回方式 1上门2自己快递
        prove: "",//申请凭据
        from_name: "",//取货姓名
        from_mobile: "",// 取货电话
        from_district_id: "",// 取货地址最后一级id
        from_detail: "", //取货详细地址
        get_name: "",//收货姓名
        get_mobile: "",// 收货电话
        get_district_id: "",// 收货地址最后一级id
        get_detail: "", //收货详细地址
        fromaddress_valid: "",//就给他展示星号
        getaddress_valid: "pass",//就给他展示星号
      },
      invoice: true, //有发票(不用传)
      report: false,//有检测报告(不用传)
      cause_good_id: "", //获取售后原因的id

      // 表单校验
      upinfo_rules: {
        type: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
        cause_id: [{ required: true, message: '请选择提交原因', trigger: 'change' }],
        num: [{ required: true, message: '请填写数量', trigger: 'blur' }],
        attr_id: [{ required: true, message: '请选择换取商品的属性', trigger: 'blur' }],
        remark: [{ required: true, message: '请填写问题详情', trigger: 'blur' }],
        state: [{ required: true, message: '请选择返回方式', trigger: 'blur' }],
        fromaddress_valid: [{ required: true, message: '取货人地址不能为空', trigger: 'change' }, { validator: validateAddress_from, trigger: 'change' }],
        from_detail: [{ required: true, message: '取货人详细地址不能为空', trigger: 'blur' }, { min: 3, message: '详细地址请填写三个字以上', trigger: "blur" }],
        from_name: [{ required: true, message: '取货人姓名不能为空', trigger: 'blur' }, { min: 2, max: 10, message: '取货人姓名请填写2-10个字', trigger: "blur" }],
        from_mobile: [{ required: true, message: '取货人电话不能为空', trigger: 'blur' }, { min: 11, max: 11, message: '手机号格式错误', trigger: "blur" }],
        getaddress_valid: [{ required: true, message: '收货人地址不能为空', trigger: 'change' }, { validator: validateAddress_get, trigger: 'change' }],
        get_detail: [{ required: true, message: '收货人详细地址不能为空', trigger: 'blur' }, { min: 3, message: '详细地址请填写三个字以上', trigger: "blur" }],
        get_name: [{ required: true, message: '收货人姓名不能为空', trigger: 'blur' }, { min: 2, max: 10, message: '收货人姓名请填写2-10个字', trigger: "blur" }],
        get_mobile: [{ required: true, message: '收货人电话不能为空', trigger: 'blur' }, { min: 11, max: 11, message: '手机号格式错误', trigger: "blur" }],
      },
    }
  },
  computed: {//改变电话格式
    splicephone() {
      if (this.detaildata.phone) {
        let arr = this.detaildata.phone.split("");
        arr.splice(3, 4, "****")
        let newphone = arr.join("");
        return newphone;
      }
      return;
    }
  },

  created() {
    // 如果当前是申请售后，维修、补发货物展示
    if (this.$route.query.service == "aftersale") {
      this.aftersaleshow = true;
    } else if (this.$route.query.service == "waitinggoods") {
      this.waitinggoodshow = true;
    }
    // 获取此单详情
    if (this.$route.query.id) {
      this.detailid = this.$route.query.id;
      this.getaftersaldetail();
    }
  },
  methods: {
    // 服务类型改变，获取售后原因
    radiochange(val) {
      console.log(val)
      this.upinfo.cause_id = "";
      setTimeout(() => {
        this.$refs.upinfo_ref.clearValidate();
      }, 10)
      this.$get("apply/cause", { good_id: this.cause_good_id, type: val }).then(res => {
        console.log(res)
        this.options = res.data;
      })
    },

    // 获取该商品售后详情
    getaftersaldetail() {
      this.token = localStorage.getItem("token");
      this.$get("apply/after_sales", { order_detail_id: this.detailid, token: this.token }).then(res => {
        console.log("该商品详情", res);
        if (res.code == 200) {
          this.detaildata = res.data; //该单所有信息
          this.alladdress = res.data.province + res.data.city + (res.data.district || "") + (res.data.street || "") + res.data.detail + " " + res.data.name + " " + this.splicephone;
          if (res.data.street_id) {//取货/收货地址
            this.upinfo.from_district_id = this.upinfo.get_district_id = res.data.street_id;
          } else {
            this.upinfo.from_district_id = this.upinfo.get_district_id = res.data.district_id;
          }
          this.cause_good_id = res.data.good_id;
          if (res.data.attr) {
            this.upinfo.attr_id = res.data.attr.id;
          }
          this.upinfo.from_detail = this.upinfo.get_detail = res.data.detail;//取货/收货详细地址
          this.upinfo.from_name = this.upinfo.get_name = res.data.name;//取货/收货联系人姓名
          this.upinfo.from_mobile = this.upinfo.get_mobile = res.data.phone;//取货/收货联系人电话
        } else {
          // this.$message.error(res.message);
        }
      })
    },

    // 一般情况下是在这里创建FormData对象，但我们需要上传多个文件，为避免发送多次请求，因此在这里只进行文件的获取，param可以拿到文件上传的所有信息
    handleupload(param) {
      let ifput = this.fileList.every((item) => { //全真为真
        return item.name != param.file.name;
      })
      if (ifput) { //重复的就不提交
        this.fileList.push(param.file);
      }
    },
    // 浏览图片
    handleSee(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    // 删除图片
    handleRemove(file) {
      this.fileList = this.fileList.filter(item => { //返回true的数组
        return item.name !== file.name;
      })
    },
    // 超出限制提示
    overnum() {
      this.$message.error('亲，最多只能上传5张图片哦');
    },
    // 提交售后
    submitForm() {
      this.$refs.upinfo_ref.validate(valid => {
        if (valid) {
          if (this.checked == false) {
            return this.$message.error("请先阅读并同意上门取件服务协议");
          }
          this.upinfo.amount = this.detaildata.price * this.upinfo.num; //金额
          let arr = [];
          if (this.invoice) arr.push("1")
          if (this.report) arr.push("2")
          let arrtostring = arr.join(",");
          this.upinfo.prove = arrtostring; //凭证
          let upobj = { ...this.upinfo, ...{ token: this.token, order_detail_id: this.detaildata.id } }
          this.$post("apply/apply", upobj).then(res => {
            console.log(res)
            if (res.code == 200) {
              if (this.$route.path.startsWith("/company")) {
                this.$router.push({ name: "com_aftersalesuccess" })
              } else {
                this.$router.push({ name: "aftersalesuccess" })
              }
            } else {
              // this.$message.error(res.message)
            }
          })
        } else {
          return false;
        }
      })
    },


    //取货 下拉地址改变事件
    setaddress_from(data) {
      // console.log(data) //如果是3、4说明地址填写完毕
      this.addresslength_from = data;
    },
    setprovince_from(data) {
      // this.upinfo.province_id = data;
    },
    setcity_from(data) {
      // this.upinfo.city_id = data;
    },
    setdistrict_from(data) {
      if (data)
        this.upinfo.from_district_id = data;
    },
    setstreet_from(data) {
      if (data)
        this.upinfo.from_district_id = data;
    },
    //收货 下拉地址改变事件
    setaddress_get(data) {
      // console.log(data) //如果是3说明地址填写完毕
      this.addresslength_get = data;
    },
    setprovince_get(data) {
      // this.upinfo.province_id = data;
    },
    setcity_get(data) {
      // this.upinfo.city_id = data;
    },
    setdistrict_get(data) {
      if (data)
        this.upinfo.get_district_id = data;
    },
    setstreet_get(data) {
      if (data)
        this.upinfo.get_district_id = data;
    },
  },
}
</script>

<style lang="scss" scoped>
.el-select {
  /deep/.el-input {
    width: 180px;
  }
}

// 自定义单选框
.el-radio {
  border: 2px solid #ccc;
  background: #fff;
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 10px 20px 10px 15px;
  color: #666;
  position: relative;
  /deep/.el-radio__input {
    display: none;
  }
  /deep/.el-radio__label {
    padding-left: 5px;
    font-size: 13px;
  }
  /deep/.el-radio__input .el-radio__inner:hover {
    border-color: #ccc;
  }
  /deep/.el-input__inner {
    border-radius: 0;
  }
  /deep/.el-radio__input.is-checked + .el-radio__label {
    color: $main_color;
  }
  .iconfont {
    font-size: 12px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
.is-checked {
  border-color: $main_color;
}
.el-radio:hover {
  border-color: $main_color;
}

.goodinfo {
  margin-bottom: 50px;
  .toptitle {
    background: #f1f1f1;
    color: #333;
    padding: 10px 0;
    text-align: center;
  }
  .bottomcontent {
    padding: 10px 0;
    border: 1px solid #f1f1f1;
    color: #333;
    font-size: 13px;
    .goods {
      display: flex;
      .goodspic {
        width: 70px;
        height: 70px;
        margin: 0 10px;
      }
      .goodtitle {
        width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px 0;
        .title {
          font-size: 12px;
          color: #666;
          line-height: 20px;
          overflow: hidden;
          height: 20px;
        }
        .danjia {
          color: $main_color;
        }
      }
    }
    .num {
      text-align: center;
    }
  }
}

.submit_content {
  border: 1px solid #bdbdbd;
  margin-top: 30px;
  padding: 30px;

  .goods {
    display: flex;
    .goodspic {
      width: 100px;
      height: 100px;
    }
    .goodtitle {
      margin-left: 20px;
      line-height: 25px;
      .shuxing {
        color: #999;
      }
      .danjia {
        color: $main_color;
      }
    }
  }
  .returnmoney {
    color: $main_color;
    font-size: 14px;
    span {
      font-weight: 700;
    }
  }
  .el-textarea {
    font-size: 12px;
    /deep/.el-textarea__inner {
      padding-bottom: 10px;
    }
    /deep/.el-input__count {
      line-height: 20px;
    }
  }
  .detailwidth {
    width: 600px;
  }
  /deep/.el-upload-list__item,
  /deep/.el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .uploadtishi {
    color: #999;
    font-size: 12px;
  }
}
.submit_address {
  border: 1px solid #e6e6e6;
  margin: 20px 0;
  .check_address {
    font-size: 12px;
    font-weight: 700;
    padding: 10px;
    span {
      font-weight: 400;
      color: #58acfa;
      cursor: pointer;
    }
    span:hover {
      color: $main_color;
    }
  }
  .submit_adress_form {
    padding: 10px 30px;
  }
}
.editaddress {
  .back /deep/.el-form-item__label {
    line-height: 34px;
  }
  .el-input {
    width: 230px;
    /deep/.el-input__inner {
      border-radius: 0;
    }
  }
  .addressinput {
    margin-top: 10px;
    width: 400px;
  }
}
// 将form表单都字体设置为12px
.el-form {
  /deep/.el-form-item__label,
  /deep/.el-form-item__content,
  /deep/.el-input {
    font-size: 12px;
  }
}

// 我同意复选框
.iagree_yes {
  margin-bottom: 50px;
  padding-left: 115px;
  a {
    color: #58acfa;
  }
}
.submitbtn {
  width: 220px;
  float: right;
  .el-button {
    width: 100%;
    font-size: 16px;
  }
}
</style>
