<template>
  <div class="cart">
    <!-- 头部三大栏 -->
    <div class="shop_top">
      <CompanyHead v-if="iscompany"></CompanyHead>
      <ShopTop v-else></ShopTop>
    </div>

    <div class="cart_body">
      <div class="join_over width_center_1200">
        <div class="join_bzt">
          <el-steps :active="0" simple>
            <el-step title="我的购物车" icon="el-icon-shopping-cart-full"></el-step>
            <el-step title="物流地址" icon="el-icon-map-location"></el-step>
            <el-step title="选择支付" icon="el-icon-mouse"></el-step>
            <el-step title="支付成功" icon="el-icon-check"></el-step>
          </el-steps>
        </div>
      </div>

      <!-- 店铺和商品列表 -->
      <div class="store_goods_list width_center_1200">
        <div class="store_goods_list_title">
          <el-row>
            <el-col :span="2">
              <!-- indeterminate为全选状态 @change全选按钮改变事件-->
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </el-col>
            <el-col :span="12">商品</el-col>
            <el-col :span="2">单价（元）</el-col>
            <el-col :span="4">数量</el-col>
            <el-col :span="2">小计</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
        </div>
      </div>

      <!-- 购物车信息 -->
      <div class="width_center_1200">
        <el-skeleton style="width: 100%" :loading="loading" animated>
          <template slot="template">
            <el-skeleton-item variant="text" style="width: 50%; height: 20px;margin-bottom:10px;" />
            <el-skeleton-item variant="text" style="width: 100%; height: 20px;margin-bottom:10px;" />
            <el-skeleton-item variant="text" style="width: 100%; height: 20px;margin-bottom:10px;" />
            <el-skeleton-item variant="text" style="width: 80%; height: 20px;margin-bottom:10px;" />
            <el-skeleton-item variant="text" style="width: 60%; height: 20px;margin-bottom:10px;" />
          </template>

          <div>
            <!-- 所有商品列表 -->
            <div class="store_goods_all  width_center_1200" v-if="cart_list.length>0">
              <div class="store_goods_all_store_info">
                <ul>
                  <li v-for="item in cart_list" :key="item.id" :class="item.status==1?'hasbackground':''">
                    <el-row>
                      <el-col :span="2" class="itemcheck">
                        <!-- 复选框选中事件 -->
                        <!-- 可以通过 true-label  false-label 替代绑定truefalse-->
                        <el-checkbox v-model="item.status" :true-label="1" :false-label="0" @change="handleCartListChange(item.id,item.status)"></el-checkbox>
                      </el-col>
                      <el-col :span="12">
                        <div class="goods_thumb" @click="todetailpage(item.good_sn)">
                          <img width="60px" height="60px" :src="item.img_url" alt="图片加载失败">
                        </div>
                        <div class="goods_title">
                          <div>
                            <router-link tag="a" :to="'/goodsdetail/'+item.good_sn">{{item.title}}</router-link>
                          </div>
                          <!-- 商品属性 -->
                          <div v-if="item.attr">
                            <span class="attrinfo">属性信息：</span>
                            <el-select v-model="item.attr.id" placeholder="请选择" @change="attrchange(item.id,item.number,$event)">
                              <el-option v-for="vo in item.attrs" :key="vo.id" :label="vo.attr_text" :value="vo.id">
                              </el-option>
                            </el-select>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="2">
                        <div class="price">￥{{item.price}}</div>
                      </el-col>
                      <el-col :span="4" class="jiajian">
                        <el-input-number v-model="item.number" @change="change_cart(item.id,item.number)" :min="1" :max="100000"></el-input-number>
                      </el-col>
                      <el-col :span="2">
                        <div class="price">￥{{item.price|xiaoji(item.number)}}</div>
                      </el-col>
                      <el-col :span="2">
                        <div class="remove" @click="del_cart(item.id)">移除</div>
                      </el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 没有购物车商品则 -->
            <div class="empty_show_list width_center_1200" v-else>
              <dl>
                <dt><img src="/pc/cart_empty.png"></dt>
                <div>主人，您购物车内没有任何商品哟~</div>
                <dd class="btn">
                  <span @click="tohome">前往商城</span>
                </dd>
              </dl>
            </div>
          </div>
        </el-skeleton>
      </div>

      <div class="store_goods_list width_center_1200">
        <div class="store_goods_list_title">
          <el-row>
            <el-col :span="2">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </el-col>
            <el-col :span="2" class="delgoods">
              <span @click="delcheck">删除已选中商品</span>
            </el-col>
            <el-col :span="13">
              <div class="topay2">已选择
                <font class="main_color">{{total_num}}</font>件商品</div>
            </el-col>
            <el-col :span="4">
              <div class="topay2">总价：
                <span>￥{{total_price.toFixed(2)}}</span>
              </div>
            </el-col>
            <el-col :span="3">
              <el-button class="jiesuan_btn" @click="to_create">结算</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <shop-foot></shop-foot>
    <!-- vue 回到顶部 -->
    <el-backtop>
      <div class="iconfont">&#xe735;</div>
    </el-backtop>
  </div>
</template>

<script>
// 防抖
import { debounce } from 'throttle-debounce';
import ShopTop from "@/components/head.vue";
import CompanyHead from "@/views/common/companyhead.vue";
import ShopFoot from "@/components/shop_foot.vue"
export default {
  components: {
    ShopFoot, CompanyHead, ShopTop
  },
  data() {
    return {
      token: "",    //用户token
      cart_list: [], //购物车列表

      isIndeterminate: false, //全选按钮的样式,true为-号。为true时会替代勾勾和空白,代表子选项有选中有未选中
      checkAll: false,  //全选按钮全选状态 true为勾勾全选、false为空白全不选

      total_price: 0, // 选中商品总价
      total_num: 0, // 选中商品总数量

      edit_cart: {  //修改购物车提交信息
        token: "",
        cart_id: "",
        attr_id: null,
        number: ""
      },
      watch_cartnum: "", //监听购物车数量变化，用于防抖
      iscompany: "", //企业的购物车
      loading: true,
    };
  },
  watch: {
    // 监听数量变化，发送请求修改后台数据
    watch_cartnum: {
      handler: debounce(500, function () { //防抖，一段时间后执行一次
        this.$post(this.$api.homeChangeCart, this.edit_cart).then(res => {
          if (res.code === 200) {
            console.log("购物车数量变化，用于防抖", res)
          }
        });
      }),
    }
  },
  created() {
    this.iscompany = localStorage.getItem("user_iscompany") == "true";
    this.get_cart_list(); //获取购物车列表
  },
  filters: {
    xiaoji(price, number) {
      return (price * number).toFixed(2);
    }
  },
  methods: {
    //前往商城首页
    tohome() {
      if (this.$route.name == "company_mycart") {
        this.$router.push({ name: "company_home" })
      } else {
        this.$router.push({ name: "home" })
      }
    },
    // 属性改变事件
    attrchange(id, number, event) {
      this.edit_cart.token = this.token;
      this.edit_cart.cart_id = id;
      this.edit_cart.number = number;
      this.edit_cart.attr_id = event;
      this.$post(this.$api.homeChangeCart, this.edit_cart).then(res => {
        this.get_cart_list(); //重新获取列表
      })
    },
    //获取购物车列表
    get_cart_list: function () {
      this.token = localStorage.getItem("token");
      this.$get(this.$api.homeGetCartList, { token: this.token }).then(res => {
        console.log("购物车列表", res)
        this.cart_list = JSON.parse(JSON.stringify(res.data));
        this.$store.commit("setCartCount", res.data.length);
        this.cart_list.forEach(item => {
          item.price = parseFloat(item.price).toFixed(2)
        })
        this.all_checkedstatus();
        this.sum_price();
        this.loading = false;
      });
    },
    // 移除选中购物车
    delcheck() {
      this.$confirm('此操作将删除已选中购物车, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false   //让滚动条没有变化
      }).then(() => {
        let arr = [];
        this.cart_list.forEach(item => {
          if (item.status == 1) arr.push(item.id)
        })
        if (arr.length > 0) {
          let str = arr.join(",")
          this.$post(this.$api.homeDelCart, { token: this.token, carts: str }).then(res => {
            if (res.code == 200) {
              this.get_cart_list();  //重新获取一下购物车列表
              return this.$message.success(res.message);
            } else {
              return;
              // return this.$message.error(res.message);
            }
          });
        } else {
          return this.$message.error("请先选中需要删除的购物车");
        }
      }).catch(() => {
      });
    },
    // 移除单个购物车
    del_cart(id) {
      this.$confirm('此操作将永久删除该购物车, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false   //让滚动条没有变化
      }).then(() => {
        this.$post(this.$api.homeDelCart, { token: this.token, carts: id }).then(res => {
          if (res.code == 200) {
            this.get_cart_list();  //重新获取一下购物车列表
            return this.$message.success(res.message);
          } else {
            // return this.$message.error(res.message);
          }
        });
      }).catch(() => {
      });
    },

    // 复选框全选、全不选事件
    handleCheckAllChange(val) {
      let status = "";
      if (val) {
        status = 1;
      } else {
        status = 0;
      }
      this.$get("cart/allstatus", { token: this.token, status }).then(res => {
        console.log(res)
      })
      if (val) {  //true为全选
        this.cart_list.forEach(item => {
          item.status = 1;
        });
      } else {
        this.cart_list.forEach(item => {
          item.status = 0;
        });
      }
      this.isIndeterminate = false; //将全选的勾勾或空格展示出来，去掉 - 号
      this.sum_price(); // 统计价格
    },

    // 购物车列表checkbox
    handleCartListChange: function (id, status) {
      let newstatus = "";
      status == 1 ? newstatus = 0 : newstatus = 1;
      console.log(status, newstatus)
      this.$get("cart/status", { cart_id: id, status: newstatus, token: this.token }).then(res => {
        console.log("购物车勾选", res)
      })
      this.all_checkedstatus();
      this.sum_price(); // 统计价格
    },

    // 计算全选框状态
    all_checkedstatus() {
      let hasallcheck = this.cart_list.every(item => { //全真为真，返回布尔值
        return item.status == 1;
      })
      let hasnocheck = this.cart_list.every(item => { //全真为真，返回布尔值
        return item.status == 0;
      })

      if (hasallcheck || hasnocheck) { //如果全选
        this.isIndeterminate = false
        if (hasallcheck) {
          this.checkAll = true;
        }
        if (hasnocheck) {
          this.checkAll = false;
        }
      } else {
        this.isIndeterminate = true;
      }
    },

    // 价格小计
    sum_price() {
      let total_price = 0;
      let total_num = 0;
      this.cart_list.forEach(item => {
        if (item.status == 1) {
          total_num += 1;
          total_price += item.number * item.price
        }
      });
      this.total_price = total_price;
      this.total_num = total_num;
    },

    // 加减购物车
    change_cart(id, number) {
      this.edit_cart.token = this.token;
      this.edit_cart.cart_id = id;
      this.edit_cart.number = number;
      this.watch_cartnum = number; //用防抖，监听数量变化
      this.sum_price(); //实时，重新计算总价格
    },

    // 前往结算页（去填写地址，发票信息）
    to_create() {
      let hassomecheck = this.cart_list.some(item => { //一真为真，返回布尔值
        return item.status == 1;
      })
      if (!hassomecheck) {
        return this.$message.error('请选择购物车产品！');
      }
      this.$router.push({ name: "createorder" });
    },

    // 跳转到详细页
    todetailpage(good_sn) {
      this.$router.push("/goodsdetail/" + good_sn)
    }
  },
};
</script>
<style lang="scss" scoped>
.empty_show_list {
  width: 600px;
  dl {
    width: 100%;
  }
  div {
    padding-top: 50px;
  }
}
.delgoods {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
.delgoods:hover {
  color: $main_color;
}
.join_bzt {
  margin-top: 30px;
}
.store_goods_list,
.store_goods_all {
  text-align: center;
}
.goods_title {
  margin-top: 10px;
  text-align: left;
  width: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .el-select {
    width: 230px;
    height: 28px;
    margin-top: 5px;
    /deep/.el-input__inner {
      width: 100%;
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    /deep/.el-input__icon {
      line-height: 26px;
    }
  }
  a {
    line-height: 30px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .attrinfo {
    color: #999;
  }
}
.itemcheck {
  padding-top: 20px;
}

.store_goods_list {
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 50px;

  .store_goods_list_title {
    background: #f5f5f5;
  }
  .jiesuan_btn {
    background-color: $main_color;
    border-color: $main_color;
    color: #fff;
    padding: 12px 30px;
  }
  .topay2 {
    line-height: 50px;
    text-align: right;
    padding-right: 15px;
    font {
      padding: 0 5px;
    }
    span {
      font-size: 18px;
      line-height: 30px;
      color: $main_color;
    }
  }
}
.jiajian {
  display: flex;
  justify-content: center;
  padding-top: 25px;
  // 计数器样式
  .el-input-number {
    line-height: 28px;
    width: 130px;
    /deep/.el-input__inner {
      height: 30px;
      line-height: 30px;
      padding: 0 40px;
    }
    /deep/.el-input-number__decrease,
    /deep/.el-input-number__increase {
      width: 30px;
    }
  }
}
.store_goods_all_store_info {
  margin-top: 20px;
  font-size: 12px;
  ul {
    margin-top: 20px;
    border: 1px solid #efefef;
    li {
      border-bottom: 1px solid #efefef;
      height: 80px;
      .el-checkbox {
        margin-top: 10px;
      }
      .goods_thumb {
        margin-top: 10px;
        float: left;
        margin-right: 15px;
        cursor: pointer;
        img {
          border-radius: 3px;
        }
      }
      .remove {
        cursor: pointer;
        line-height: 80px;
      }
      .remove:hover {
        color: $main_color;
      }
      .price {
        line-height: 80px;
        color: #ff8000;
      }
      .jia,
      .jian {
        line-height: 30px;
        padding: 0 8px;
        color: #666;
        float: left;
        border: 1px solid #efefef;
        margin-top: 15px;
      }
      .nums {
        margin: 0 10px;
        margin-top: 15px;
        float: left;
        width: 40px;
        input {
          width: 40px;
          height: 30px;
          outline: none;
          border: 1px solid #efefef;
          padding: 0px 5px;
          box-sizing: border-box;
          color: #666;
        }
      }
    }
    .hasbackground {
      background: #fbfbef;
    }
    li a {
      color: #666;
    }
    li a:hover {
      color: $main_color;
    }
    li:after {
      content: "";
      display: block;
      clear: both;
    }
    li:last-child {
      border-bottom: none;
    }
  }
}
</style>