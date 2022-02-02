<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title">
            收货地址
            <span>
                <el-button size="mini" type="danger" @click="addadreddclick">新增</el-button>
            </span>
        </div>
        <div class="user_content_block_show">
            <div class="user_address_list">
                <ul v-if="!loading&&address_list.length>0">
                    <li v-for="(v,k) in address_list" :key="k" :style="v.status===1?'background:#FBF8EF':''">
                        <dl>
                            <dt><img width="32px" height="32px" src="/pc/address_pos2.png" alt=""></dt>
                            <dd>{{v.name}}
                                <span style="padding-left:15px;font-size:13px">{{v.phone}}</span>
                            </dd>
                            <dd class="address_info">{{v.province+' '+v.city+' '+v.dist+' '+v.detail}}</dd>
                        </dl>
                        <div class="address_handle">
                            <span v-show="v.status==0" @click="set_default(v.id)">设置默认</span>
                            <span class="red" v-show="v.status===1">
                                <el-tag type="danger">默认地址</el-tag>
                            </span>|
                            <span @click="edit_address_info(v)">编辑</span>|
                            <span @click="del(v.id)">删除</span>
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
                <ul v-if="!loading&&address_list.length==0">
                    <li class="noaddress">亲，您暂时还没有设置收货地址哦</li>
                </ul>

                 <!-- loading放最后 -->
                <div v-loading="loading" element-loading-custom-class="loadingclass"  element-loading-text="加载中" element-loading-spinner="el-icon-loading"></div>
            </div>
        </div>

        <!--  lock-scroll弹出框出现滚动条样式不变 -->
        <el-dialog :destroy-on-close="true" :lock-scroll="false" width="53%" :visible.sync="dialogVisible" :title="addoredit=='0'?'新增收货地址':'编辑收货地址'" @closed="beforeclose">
            <div class="home_form_main">
                <el-form label-width="100px" ref="inforef" :model="info" :rules="rules">
                    <el-form-item label="收货人" prop="name">
                        <el-input placeholder="请输入收货人" v-model="info.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="phone">
                        <el-input placeholder="请输入手机号" v-model="info.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="validaddress">
                        <!-- props配置 options数据源-->
                        <AddressDropdown v-model="info.validaddress" v-if="dialogVisible" :addoredit="addoredit" @setaddress="setaddress" @setprovince="setprovince" @setcity="setcity" @setdistrict="setdistrict" @setstreet="setstreet" :myprovince="info.province" :mycity="info.city" :mydistrict="info.district" :mystreet="info.street" :myprovince_id="info.province_id" :mycity_id="info.city_id" :mydistrict_id="info.district_id" :mystreet_id="info.street_id"></AddressDropdown>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="detail">
                        <el-input placeholder="请输入地址" v-model="info.detail"></el-input>
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
    </div>
</template>

<script>
import AddressDropdown from '@/views/common/address_dropdown.vue';
export default {
    name: "addresslist",
    components: { AddressDropdown },
    data() {

        return {
            address_list: [],  //收货地址列表

            dialogVisible: false, //dialog显示状态
            addoredit: "",//0为新增地址，1为修改地址
            token: "", //用户token
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
                validaddress: "",//就给他展示星号
            },
            edit_addressid: "", //修改的地址的id号
            rules: {
                name: [
                    { required: true, message: '收货人不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '收货人姓名请填写2-10个字', trigger: "blur" }
                ],
                phone: [
                    { required: true, message: '手机不能为空', trigger: 'blur' },
                    { pattern: this.$jiaoyan_phone, message: '手机号格式错误', trigger: "blur" }, //1[3456789]\d{9} 1开头，3456789随机一位，数字0-9随机9位
                ],
                validaddress: [
                    { required: true, message: '请将地址填写完整', trigger: 'blur' },
                ],
                detail: [
                    { required: true, message: '详细地址不能为空', trigger: 'blur' },
                    { min: 3, message: '详细地址请填写三个字以上', trigger: "blur" }
                ]
            },
            loading:true,
        };
    },
    methods: {
        // 下拉地址改变事件
        setaddress(data) {
            console.log(data) //如果是3或4说明地址填写完毕
            if (data == 3 || data == 4) {
                this.info.validaddress = "ok"
                // console.log(this.$refs.inforef)
                if (this.$refs.inforef) {
                    this.$refs.inforef.validateField("validaddress", (err) => {
                        if (err) { return }
                    })
                }
            } else {
                this.info.validaddress = ""
            }

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
        // 关闭之前清空错误但是，第二次打开就清空不了了
        beforeclose() {
            this.$refs.inforef.resetFields();//移除值和校验提示
        },
        // 点击添加地址按钮
        addadreddclick() {
            this.dialogVisible = true;
            this.addoredit = '0';
            this.$nextTick(() => {
                this.$refs.inforef.resetFields(); //移除值和校验提示
                this.info = this.$options.data().info; //this.$options.data()该组件初始data全数据
            })
        },

        // 获取收货地址列表
        get_address_list: function () {
            this.token = localStorage.getItem("token"); //拿到token
            this.$get(this.$api.getAddressList, { token: this.token }).then(res => {
                this.loading=false;
                this.address_list = res.data;
                // console.log("收货地址列表", res)
            });
        },
        // 设置为默认地址
        set_default(id) {
            this.$post(this.$api.setDefaultAddress, { token: this.token, address_id: id }).then(res => {
                if (res.code === 200) {
                    this.get_address_list();
                    return this.$message.success('设置默认地址成功');
                } else {
                    this.$message.warning('设置默认地址失败');
                }
            });
        },
        // 删除地址 请求方式？
        del(id) {
            this.$post(this.$api.delAddress, { token: this.token, address_id: id }).then(res => {
                if (res.code == 200) {
                    this.get_address_list();
                    return this.$message.success("删除成功");
                } else {
                    return this.$message.error("删除失败");
                }
            });
        },
        // 修改地址
        edit_address_info(item) {
            console.log(item)
            this.info.name = item.name; //用户名
            this.info.phone = item.phone;//电话号码
            this.edit_addressid = item.id;//修改的id号
            this.info.province = item.province;//省
            this.info.city = item.city;//市
            this.info.district = item.dist;//区县
            this.info.street = item.street;//乡镇
            this.info.province_id = item.province_id;//省
            this.info.city_id = item.city_id;//市
            this.info.district_id = item.district_id;//区县
            this.info.street_id = item.street_id;//乡镇
            this.info.detail = item.detail; //详细地址
            this.info.status = item.status === 1;//是否是默认地址

            this.addoredit = "1";
            this.dialogVisible = true;
        },

        // 添加/修改新增地址提交
        submitForm() {
            this.$refs.inforef.validate((valid) => {
                if (valid) {
                    this.info.status = this.info.status ? 1 : 0;
                    //  判断是Add 或者 Edit
                    if (this.addoredit == "0") {
                        let obj = { ...this.info, ...{ token: this.token } }
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
                        let obj = { ...this.info, ...{ address_id: this.edit_addressid, token: this.token } }
                        this.$post("address/edit", obj).then(res => {
                            if (res.code == 200) {
                                this.$message.success(res.message);
                                this.dialogVisible = false;
                                this.get_address_list();
                            } else {
                                // return this.$message.warning(res.message);
                            }
                        });
                    }

                } else {
                    return false;
                }
            });
        },
    },
    created() {
        this.get_address_list();  //获取收货地址列表
    },
};
</script>
<style lang="scss" scoped>
.el-dialog {
  .el-input {
    width: 65%;
  }
}
.user_address_list {
  margin-top: 20px;
  border-top: 1px solid #efefef;
  .noaddress {
    text-align: center;
    color: #666;
  }
  ul li {
    padding: 20px 0;
    border-bottom: 1px solid #efefef;
    dl {
      float: left;
      display: block;
      width: 650px;
      dt {
        float: left;
        margin-right: 20px;
        img {
          border-radius: 50%;
        }
      }
      dd {
        line-height: 20px;
        width: 500px;
        float: left;
      }
      dd.address_info {
        color: #999;
        float: left;
        width: 100%;
        width: 500px;
        word-break: break-all; //强制换行
      }
    }
    .address_handle {
      color: #666;
      float: right;
      line-height: 40px;
      span {
        cursor: pointer;
        margin: 0 10px;
        i {
          margin-right: 10px;
        }
      }
      span:hover {
        color: $main_color;
      }
      .red {
        margin-right: 0 !important;
      }
      .red:hover .el-tag {
        color: #f56c6c;
        cursor: text;
      }
    }
  }
}
</style>