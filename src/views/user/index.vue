<template>
    <!-- 普通会员个人中心 -->
    <div class="sanmu">
        <!-- 头部三大栏 -->
        <div class="shop_top">
            <shop-top></shop-top>
        </div>

        <div class="user_body">
            <div class="width_center_1200 clear" style="padding-bottom:40px;">
                <div class="user_left">
                    <div class="user_info_block">
                        <dl>
                            <dt>
                                <img width="60px" height="60px" :src="user_info.avatar||'/pc/default_avatar.png'">
                            </dt>
                            <dd class="username">{{user_info.nickname||'神秘人'}}</dd>
                            <dd class="edit_user_info">
                                <router-link :to="{name:'home_user_info'}">编辑信息</router-link>
                            </dd>
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
                        </div>
                    </div>

                    <div class="user_cat">
                        <div class="user_cat_title">
                            <i class="icon iconfont iconitem">&#xe649;</i>订单中心</div>
                        <div class="user_cat_list">
                            <ul>
                                <li>
                                    <router-link :to="{name:'user_order'}">我的订单</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'user_address'}">收货地址</router-link>
                                </li>
                                <!-- <li><router-link to="/">退换货订单</router-link></li> -->
                                <li>
                                    <router-link :to="{name:'home_comment_index'}">评价列表</router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="user_cat_title">
                            <i class="icon iconfont iconitem">&#xe60e;</i>会员中心</div>
                        <div class="user_cat_list">
                            <ul>
                                <li>
                                    <router-link :to="{name:'user_default'}">个人中心</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'home_user_info'}">账户资料</router-link>
                                </li>

                                <li>
                                    <router-link :to="{name:'user_safe'}">账户安全</router-link>
                                </li>
                                <!-- <li><router-link to="/">实名认证</router-link></li> -->
                                <li>
                                    <router-link :to="{name:'home_user_bind'}">账号绑定</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'home_fav'}">收藏/关注</router-link>
                                </li>
                                <!-- <li><router-link to="/">我的留言</router-link></li> -->
                                <li>
                                    <router-link :to="{name:'user_bill'}">我的账单</router-link>
                                </li>
                            </ul>
                        </div>

                        <div class="user_cat_title">
                            <i class="icon iconfont iconitem">&#xe646;</i>资产中心</div>
                        <div class="user_cat_list">
                            <ul>
                                <li>
                                    <router-link :to="{name:'user_balance'}">余额</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'user_integral'}">积分</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'user_red_envelope'}">红包</router-link>
                                </li>
                            </ul>
                        </div>

                        <div class="user_cat_title">
                            <i class="icon iconfont iconitem">&#xe651;</i>积分商城</div>
                        <div class="user_cat_list">
                            <ul>
                                <li>
                                    <router-link :to="{name:'integral_order'}">积分订单</router-link>
                                </li>
                            </ul>
                        </div>

                        <div class="user_cat_title">
                            <i class="icon iconfont iconitem">&#xe67b;</i>服务中心</div>
                        <div class="user_cat_list">
                            <ul>
                                <li>
                                    <router-link :to="{name:'invoiceofmy'}">我的发票</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'aftersalelist'}">售后管理</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="user_right">
                    <!-- default.vue部分直接插入到这儿 -->
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <shop-foot></shop-foot>

        <!-- 右侧固定服务 -->
        <UptoHead :rightFixed="true"></UptoHead>
    </div>
</template>

<script>
import ShopTop from "@/components/head.vue"
import ShopFoot from "@/components/shop_foot.vue"
import UptoHead from '@/components/uptohead.vue'
import { mapState } from 'vuex';
export default {
    components: {
        ShopFoot, ShopTop, UptoHead
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
</style>