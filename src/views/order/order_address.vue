<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <template slot="template">
        <el-skeleton-item variant="text" style="width: 50%; height: 20px;margin-bottom:10px;"></el-skeleton-item>
        <el-skeleton-item variant="text" style="width: 100%; height: 20px;margin-bottom:10px;"></el-skeleton-item>
        <el-skeleton-item variant="text" style="width: 100%; height: 20px;margin-bottom:10px;"></el-skeleton-item>
        <el-skeleton-item variant="text" style="width: 80%; height: 20px;margin-bottom:10px;"></el-skeleton-item>
      </template>
      <template>
        <!-- 如果有收货地址 -->
        <div class="address_list" v-if="address_list.length>0">
          <ul>
            <li class="cannotchoose" :class="v.id==redid?'red':''" v-for="(v,k) in address_list" :key="k" @click="set_getaddress(v)">
              <div class="name">{{v.name}}
                <span>({{v.phone}})</span>
              </div>
              <div class="area_info">{{v.province+' '+v.city+' '+v.dist+' '+v.detail}}</div>
              <div :class="v.id==redid?'is_default_red':'status'">
                <i class="iconfont">&#xe79e;</i>
              </div>
            </li>
          </ul>
          <el-button type="info" plain @click="addadreddclick">使用新地址
            <i class="el-icon-plus"></i>
          </el-button>
        </div>
        <!-- 如果没有收货地址 -->
        <div class="empty_address" v-else>
          没有设置收货地址，
          <span @click="addadreddclick">新增地址</span>
        </div>

        <!-- 新增地址dialog -->
        <!--  lock-scroll弹出框出现滚动条样式不变 -->
        <el-dialog :visible.sync="dialogVisible" title="新增收货地址" @closed="beforeclose" width="53%">
          <div class="home_form_main">
            <el-form label-width="100px" ref="inforef" :model="info" :rules="rules">
              <el-form-item label="收货人" prop="name">
                <el-input placeholder="请输入内容" v-model="info.name"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="phone">
                <el-input placeholder="请输入内容" v-model="info.phone"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="validaddress">
                <!-- props配置 options数据源-->
                <AddressDropdown v-if="dialogVisible" :addoredit="addoredit" @setaddress="setaddress" @setprovince="setprovince" @setcity="setcity" @setdistrict="setdistrict" @setstreet="setstreet" :myprovince="info.province" :mycity="info.city" :mydistrict="info.district" :mystreet="info.street" :myprovince_id="info.province_id" :mycity_id="info.city_id" :mydistrict_id="info.district_id" :mystreet_id="info.street_id"></AddressDropdown>
              </el-form-item>
              <el-form-item label="详细地址" prop="detail">
                <el-input placeholder="请输入内容" v-model="info.detail"></el-input>
              </el-form-item>
              <el-form-item label="默认收货地址" prop="status">
                <el-switch v-model="info.status" active-color="#ca141e"></el-switch>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="danger" @click="submitForm">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import AddressDropdown from '@/views/common/address_dropdown.vue'; //地址下拉框
export default {
  components: { AddressDropdown },
  data() {
    var validateAddress = (rule, value, callback) => {
      console.log(this.addresslength)
      if (this.addresslength == 3 || this.addresslength == 4) {
        callback()
      } else {
        callback(new Error("请将地址填写完整"))
      }
    };
    return {
      address_list: [],     //地址列表
      token: "",
      redid: "", //当前选中地址
      addoredit: '0',//0为新增地址，1为新增地址
      dialogVisible: false, //新增地址的对话框展示与隐藏
      addresslength: 0,  //地址是否填写完整
      rules: {
        name: [
          { required: true, message: '收货人不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '收获人姓名请填写2-10个字', trigger: "blur" }
        ],
        phone: [
          { required: true, message: '手机不能为空', trigger: 'blur' },
          { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: "blur" }, //1[3456789]\d{9} 1开头，3456789随机一位，数字0-9随机9位
        ],
        validaddress: [
          { required: true, message: '地址不能为空', trigger: 'blur' },
          { validator: validateAddress, trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' },
          { min: 3, message: '详细地址请填写三个字以上', trigger: "blur" }
        ]
      },
      info: {   //dialog提交信息
        name: "",   //用户名
        phone: "",  //电话号码
        province: null,  //省
        city: null,      //市
        district: null,  //区
        street: null,    //街道
        province_id: "",  //省
        city_id: "",      //市
        district_id: "",  //区
        street_id: null,    //街道
        detail: "",   //详细地址
        status: false,    //是否是默认地址
        validaddress: "pass",//就给他展示星号
      },
      loading: true,
    }
  },
  created() {
    this.get_address_list(); //获取收货地址列表
  },
  methods: {
    // 下拉地址改变事件
    setaddress(data) {
      // console.log(data) //如果是3说明地址填写完毕
      this.addresslength = data;
    },
    setprovince(data) {
      console.log(data)
      this.info.province_id = data;
    },
    setcity(data) {
      console.log(data)
      this.info.city_id = data;
    },
    setdistrict(data) {
      console.log(data)
      this.info.district_id = data;
    },
    setstreet(data) {
      console.log(data)
      this.info.street_id = data;
    },
    // 获取收货地址列表
    get_address_list: function () {
      this.token = localStorage.getItem("token")
      this.$get(this.$api.getAddressList, { token: this.token }).then(res => {
        console.log("收货地址列表", res.data)
        this.address_list = res.data;
        this.loading = false;
        // 如果有地址
        if (this.address_list.length > 0) {
          this.$emit("removeloading")
          let hasdefault = this.address_list.some((item) => { //一真为真，返回布尔值(有默认值则是true)
            return item.status === 1;
          })
          // 如果没有设置默认地址则设置一个
          if (!hasdefault) { //没有默认值则为false，则将第一个设置为默认的地址
            this.set_default(this.address_list[0].id);
          } else { //有默认值则为true，，将购物车的地址id设置为默认id
            let adress_arr = this.address_list.filter((item) => { //返回符合条件的新数组
              return item.status === 1;
            })
            this.set_getaddress(adress_arr[0]); // 设置订单地址
          }
        }
      });
    },

    // 设置订单地址
    set_getaddress(v) {
      let addre_id = "";
      if (v.street_id) {
        addre_id = v.street_id;
      } else if (v.district_id) {
        addre_id = v.district_id;
      } else if (v.city_id) {
        addre_id = v.city_id;
      }
      this.$emit("setaddress", v.id, addre_id, v.detail, v.name, v.phone);
      this.redid = v.id;
    },

    // 设置默认收货地址
    set_default: function (id) {
      this.$post(this.$api.setDefaultAddress, { token: this.token, address_id: id }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$emit("setaddress", id);
          this.get_address_list();
        } else {
          this.$message.warning('设置默认地址失败');
        }
      });
    },

    // 关闭之前清空错误.
    beforeclose() {
      this.$refs.inforef.resetFields();
    },
    // 点击添加地址按钮
    addadreddclick() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.inforef.resetFields(); //移除值和校验提示
        this.info = this.$options.data().info; //this.$options.data()该组件初始data全数据
        console.log(this.info)
        this.addresslength = this.$options.data().addresslength;//将地址校验初始化
      })
    },
    // 添加新增地址
    submitForm() {
      this.$refs.inforef.validate((valid) => {
        if (valid) {
          this.info.status = this.info.status ? 1 : 0;
          let obj = { ...this.info, ...{ token: this.token } }
          //  新增地址 
          this.$post("address/add", obj).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message);
              this.dialogVisible = false;
              this.get_address_list();
            } else {
              // return this.$message.warning(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
}
</script>


<style lang="scss" scoped>
.el-dialog {
  .el-input {
    width: 65%;
  }
}
// 有地址
.address_list {
  ul {
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
  }
  margin-bottom: 30px;
  ul li {
    cursor: pointer;
    // float: left;
    box-sizing: border-box;
    width: 292px;
    height: 105px;
    border-radius: 3px;
    border: 2px solid #efefef;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 20px;
    position: relative;
    .name {
      margin-bottom: 10px;
      font-weight: bold;
      line-height: 18px;
      span {
        font-weight: normal;
        color: #666;
        font-size: 12px;
      }
    }
    .area_info {
      color: #666;
      word-break: break-all;
      font-size: 13px;
    }
    .status {
      i {
        font-size: 20px;
      }
      position: absolute;
      right: -2px;
      bottom: -3px;
    }
    .is_default_red {
      i {
        font-size: 20px;
      }
      position: absolute;
      right: -1px;
      bottom: -2px;
      color: $main_color;
    }
  }
  ul li.red {
    border-color: $main_color;
  }
  ul li:nth-child(4n) {
    margin-right: 0;
  }
}
// 没有地址
.empty_address {
  margin-bottom: 80px;
  line-height: 105px;
  border: 3px solid #efefef;
  border-radius: 3px;
  text-align: center;
  width: 292px;
  height: 105px;
  span {
    color: $main_color;
  }
  span:hover {
    cursor: pointer;
  }
}
</style>
