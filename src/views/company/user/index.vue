<template>
  <!-- 企业会员个人中心 -->
  <div class="sanmu">
    <!-- 头部三大栏 -->
    <ShopTop></ShopTop>
    <div class="user_body">
      <div class="width_center_1200 clear" style="padding-bottom:40px;">
        <div class="user_left">
          <div class="user_info_block companystyle">
            <dl>
              <dt @click="$router.push({name:'com_home_user_info'})">
                <img width="60px" height="60px" :src="user_info.avatar||'/pc/default_avatar.png'">
              </dt>
              <dd class="username" @click="$router.push({name:'com_home_user_info'})">{{user_info.nickname||'神秘人'}}</dd>
              <dd class="company_member">企业会员</dd>
            </dl>

            <div class="other_user_info_step">
              <font>账号资料：</font>
              <div style="width:60%;float:left;">
                <el-progress :percentage="bfb"></el-progress>
              </div>
              <div class="clear"></div>
            </div>
            <div class="other_user_info_step" style="margin-top:10px;">
              <font>账户安全：</font>
              <div class="user_aq" style="width:60%;float:left;">
                <el-tooltip class="item" effect="dark" content="邮箱认证" placement="bottom">
                  <i :class="user_info.email==''?'icon iconfont':'icon iconfont font_color'">&#xe678;</i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="手机认证" placement="bottom">
                  <i :class="user_info.phone==''?'icon iconfont':'icon iconfont font_color'">&#xe682;</i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="身份认证" placement="bottom">
                  <i :class="user_info.phone==''?'icon iconfont':'icon iconfont font_color'">&#xe634;</i>
                </el-tooltip>
              </div>
              <div class="clear"></div>
            </div>
          </div>

          <div class="user_cat">
            <div class="user_cat_title">
              <i class="icon iconfont iconitem">&#xe649;</i>订单中心</div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link :to="{name:'com_user_order'}">我的订单</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_user_address'}">收货地址</router-link>
                </li>
                <!-- <li><router-link to="/">退换货订单</router-link></li> -->
                <li>
                  <router-link :to="{name:'com_home_comment_index'}">评价列表</router-link>
                </li>
              </ul>
            </div>
            <div class="user_cat_title">
              <i class="icon iconfont iconitem">&#xe60e;</i>会员中心</div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link :to="{name:'com_user_default'}">个人中心</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_home_user_info'}">账户资料</router-link>
                </li>
                <li>
                  <router-link :to="{name:'company_user_info'}">企业资料</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_user_safe'}">账户安全</router-link>
                </li>
                <!-- <li><router-link to="/">实名认证</router-link></li> -->
                <li>
                  <router-link :to="{name:'com_home_user_bind'}">账号绑定</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_home_fav'}">收藏/关注</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_user_bill'}">我的账单</router-link>
                </li>
              </ul>
            </div>
            <!-- 主账号才显示账号管理 -->
            <div class="user_cat_title" v-if="user_info.state==1">
              <i class="icon iconfont iconitem">&#xe628;</i>账号管理</div>
            <div class="user_cat_list" v-if="user_info.state==1">
              <ul>
                <li>
                  <router-link :to="{name:'company_masterstaff'}">主子账号</router-link>
                </li>
                <li>
                  <router-link :to="{name:'company_sonreview'}">申报订单</router-link>
                </li>
              </ul>
            </div>

            <div class="user_cat_title">
              <i class="icon iconfont iconitem">&#xe6e8;</i>发票中心</div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link :to="{name:'company_invoice_search'}">发票查询</router-link>
                </li>
                <li>
                  <router-link :to="{name:'company_invoice_special'}">增票资质</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_invoicemanylist'}">发票集中开具</router-link>
                </li>
              </ul>
            </div>

            <div class="user_cat_title">
              <i class="icon iconfont iconitem">&#xe646;</i>资产中心</div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link :to="{name:'com_user_balance'}">余额</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_user_integral'}">积分</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_user_red_envelope'}">红包</router-link>
                </li>
              </ul>
            </div>

            <div class="user_cat_title">
              <i class="icon iconfont iconitem">&#xe651;</i>积分商城</div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link :to="{name:'com_integral_order'}">积分订单</router-link>
                </li>
              </ul>
            </div>

            <div class="user_cat_title">
              <i class="icon iconfont iconitem">&#xe67b;</i>服务中心</div>
            <div class="user_cat_list">
              <ul>
                <li>
                  <router-link :to="{name:'com_invoiceofmy'}">我的发票</router-link>
                </li>
                <li>
                  <router-link :to="{name:'com_aftersalelist'}">售后管理</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="user_right">
          <!-- default.vue部分直接插入到这儿 -->
          <router-view></router-view>
        </div>

        <div class="clear"></div>
      </div>
    </div>
    <shop-foot></shop-foot>

    <!-- 右侧固定服务 -->
    <UpToHead :rightFixed="true"></UpToHead>
  </div>
</template>

<script>
import ShopTop from "@/views/common/companyhead.vue"
import ShopFoot from "@/components/shop_foot.vue"
import UpToHead from "@/components/uptohead.vue";
import { mapState } from 'vuex';
export default {
  components: {
    ShopFoot, ShopTop, UpToHead
  },
  props: {},
  data() {
    return {
      bfb: 80,
      is_check: false,
    };
  },
  computed: {
    ...mapState(["user_info"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/views/common/css/userindex.scss";
.companystyle {
  background: linear-gradient(to right bottom, #000, #08298a 80%) !important;
  img {
    cursor: pointer;
  }
  .username {
    color: #fff !important;
    cursor: pointer;
  }
  .other_user_info_step font {
    color: #bdbdbd;
  }
}
.company_member {
  color: $company_font;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}
</style>