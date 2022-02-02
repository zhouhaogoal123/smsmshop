import Vue from 'vue'
import VueRouter from 'vue-router'
const meta = {login: true} //用于判断访问此路由是否需要登录
Vue.use(VueRouter)

const routes = [
  // test用来个人测试组件的vue
  {path: '/test',name: 'test',component: () => import( /* webpackChunkName: "home" */ '@/views/test.vue')},
  {path: '/chat',name: 'chat',component: () => import( /* webpackChunkName: "home" */ '@/views/chat/index.vue')},
  
  // 首页
  {path: '/',name: 'home',component: () => import( /* webpackChunkName: "home" */ '@/views/home.vue')},
  
  // 公告详情
  {path: '/announcement',name: 'announcement',component: () => import( /* webpackChunkName: "home" */ '@/views/newpage/announcement.vue')},
  // 新闻详情
  {path: '/news',name: 'news',component: () => import( /* webpackChunkName: "home" */ '@/views/newpage/news.vue')},
  
  //在线客服
  {path: '/online_service',name: 'online_service',component: () => import( /* webpackChunkName: "service" */ '@/views/user/online_service'),meta},
  {path: '/company/online_service',name: 'company_online_service',component: () => import( /* webpackChunkName: "service" */ '@/views/user/online_service'),meta:meta},

  // 购物车
  {path: '/mycart',name: 'mycart',component: () => import( /* webpackChunkName: "mycart" */ '@/views/mycart/index.vue'),meta},
  {path: '/company/mycart',name: 'company_mycart',component: () => import( /* webpackChunkName: "mycart" */ '@/views/mycart/index.vue'),meta:meta},

  //二级商品评论页
  {path: '/commentdetail',name: 'commentdetail',component: () => import( /* webpackChunkName: "comment" */ '@/views/newpage/commentdetail.vue'),meta},
  {path: '/company/commentdetail',name: 'company_commentdetail',component: () => import( /* webpackChunkName: "comment" */ '@/views/newpage/commentdetail.vue'),meta:meta},

  // 普通用户个人中心
  {path: '/user',component: () => import( /* webpackChunkName: "user" */ '@/views/user/index.vue'),meta,
    children:[
      {path: '',name: 'user_default',component: () => import(  /* webpackChunkName: "user" */ '@/views/user/default.vue')},  //用户首页
      {path: 'address',name: 'user_address',component: () => import( /* webpackChunkName: "user" */ '@/views/user/address.vue')}, //收货地址
      {path: 'order',name: 'user_order',component: () => import( /* webpackChunkName: "user" */ '@/views/user/order.vue')}, //订单列表
      {path: 'order/detail',name: 'user_order_detail',component: () => import( /* webpackChunkName: "user" */ '@/views/user/orderdetail.vue')}, //订单详情
      {path: 'user_info',name: 'home_user_info',component: () => import( /* webpackChunkName: "user" */ '@/views/user/user_info.vue')},//用户资料
      {path: 'fav',name: 'home_fav',component: () => import( /* webpackChunkName: "user" */ '@/views/user/fav.vue')}, // 收藏关注商品
      {path: 'bill',name: 'user_bill',component: () => import( /* webpackChunkName: "user" */ '@/views/user/bill.vue')}, // 账单
      {path: 'balance',name: 'user_balance',component: () => import( /* webpackChunkName: "user" */ '@/views/user/balance.vue')}, // 余额明细
      {path: 'integral',name: 'user_integral',component: () => import( /* webpackChunkName: "user" */ '@/views/user/integral.vue')}, // 积分明细
      {path: 'red_envelope',name: 'user_red_envelope',component: () => import( /* webpackChunkName: "user" */ '@/views/user/red_envelope.vue')}, // 用户红包
      {path: 'integral_order',name: 'integral_order',component: () => import( /* webpackChunkName: "user" */ '@/views/user/integral_order.vue')}, // 积分订单
      
      {path: 'safe',name: 'user_safe',component: () => import( /* webpackChunkName: "user" */ '@/views/user/safe.vue')}, // 账号安全
      {path: 'safe/password',name: 'user_safe_password',component: () => import( /* webpackChunkName: "user" */ '@/views/user/safe/password.vue')}, // 密码修改
      {path: 'safe/pay_password',name: 'user_safe_pay_password',component: () => import( /* webpackChunkName: "user" */ '@/views/user/safe/pay_password.vue')}, // 支付密码修改
      {path: 'safe/pay_passwordforget',name: 'user_safe_pay_passwordforget',component: () => import( /* webpackChunkName: "user" */ '@/views/user/safe/pay_passwordforget.vue')}, // 支付密码重置
      {path: 'user_bind',name: 'home_user_bind',component: () => import( /* webpackChunkName: "user" */ '@/views/user/user_bind.vue')}, // 账号绑定
      {path: 'safe/card',name: 'home_user_card',component: () => import( /* webpackChunkName: "user" */ '@/views/user/safe/card.vue')}, // 身份认证
      // 评论列表
      {path: 'comment/add',name: 'home_comment_add',component: () => import( /* webpackChunkName: "usercomment" */ '@/views/user/comment/add.vue')}, // 订单添加评论
      {path: 'comment/index',name: 'home_comment_index',component: () => import( /* webpackChunkName: "usercomment" */ '@/views/user/comment/index.vue')}, // 订单列表
      {path: 'comment/success',name: 'home_comment_success',component: () => import( /* webpackChunkName: "usercomment" */ '@/views/user/comment/success.vue')}, // 评论成功返回页面
      {path: 'comment/detail',name: 'home_comment_detail',component: () => import( /* webpackChunkName: "usercomment" */ '@/views/user/comment/comment_detail.vue')}, // 评论成功返回页面
      {path: 'comment/seecomment',name: 'seecomment',component: () => import( /* webpackChunkName: "usercomment" */ '@/views/user/comment/seecomment.vue')}, //查看评论详情
    
      // 售后、退货换货
      {path: 'aftersale/aftersalelist',name: 'aftersalelist',component: () => import( /* webpackChunkName: "aftersale" */ '@/views/user/aftersale/aftersalelist.vue')}, // 售后列表
      {path: 'aftersale/chooseservicetype',name: 'chooseservicetype',component: () => import( /* webpackChunkName: "aftersale" */ '@/views/user/aftersale/chooseservicetype.vue')}, // 选择售后方式
      {path: 'aftersale/aftersalesuccess',name: 'aftersalesuccess',component: () => import( /* webpackChunkName: "aftersale" */ '@/views/user/aftersale/aftersalesuccess.vue')}, // 申请售后成功跳转页面
      {path: 'aftersale/aftersaledetail',name: 'aftersaledetail',component: () => import( /* webpackChunkName: "aftersale" */ '@/views/user/aftersale/aftersaledetail.vue')}, // 退款退货详情
      
      // 发票
      {path: 'invoiceofmy',name: 'invoiceofmy',component: () => import( /* webpackChunkName: "userinvoice" */ '@/views/user/invoice/invoiceofmy.vue')}, // 我的发票
      {path: 'invoiceapply',name: 'invoiceapply',component: () => import( /* webpackChunkName: "userinvoice" */ '@/views/user/invoice/invoiceapply.vue')}, // 发票申请
      {path: 'invoicedetail',name: 'invoicedetail',component: () => import( /* webpackChunkName: "userinvoice" */ '@/views/user/invoice/invoicedetail.vue')}, // 发票详情
      {path: 'invoicesuccess',name: 'invoicesuccess',component: () => import( /* webpackChunkName: "userinvoice" */ '@/views/user/invoice/invoicesuccess.vue')}, // 发票申请成功
      
      // 充值、提现页面
      {path: 'recharge',name: 'recharge',component: () => import( /* webpackChunkName: "user" */ '@/views/user/cashRecharge/recharge.vue')},  //充值页面
      {path: 'cash',name: 'cash',component: () => import( /* webpackChunkName: "user" */ '@/views/user/cashRecharge/cash.vue')},  //提现页面
  ]},

  // 企业用户个人中心
  {path: '/company/user',component: () => import( /* webpackChunkName: "companyUser" */ '@/views/company/user/index.vue'),meta:meta,
    children:[
      {path: '',name: 'com_user_default',component: () => import(  /* webpackChunkName: "comp_user" */ '@/views/user/default.vue')},  //用户首页
      {path: 'address',name: 'com_user_address',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/address.vue')}, //收货地址
      {path: 'order',name: 'com_user_order',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/order.vue')}, //订单列表
      {path: 'order/detail',name: 'com_user_order_detail',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/orderdetail.vue')}, //订单详情
      {path: 'user_info',name: 'com_home_user_info',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/user_info.vue')},//用户资料
      {path: 'fav',name: 'com_home_fav',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/fav.vue')}, // 收藏关注商品
      {path: 'bill',name: 'com_user_bill',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/bill.vue')}, // 账单
      {path: 'balance',name: 'com_user_balance',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/balance.vue')}, // 余额明细
      {path: 'integral',name: 'com_user_integral',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/integral.vue')}, // 积分明细
      {path: 'red_envelope',name: 'com_user_red_envelope',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/red_envelope.vue')}, // 用户红包
      {path: 'integral_order',name: 'com_integral_order',component: () => import( /* webpackChunkName: "comp_user" */ '@/views/user/integral_order.vue')}, // 积分订单
      
      {path: 'safe',name: 'com_user_safe',component: () => import( /* webpackChunkName: "comp_safe" */ '@/views/user/safe.vue')}, // 账号安全
      {path: 'safe/password',name: 'com_user_safe_password',component: () => import( /* webpackChunkName: "comp_safe" */ '@/views/user/safe/password.vue')}, // 密码修改
      {path: 'safe/pay_password',name: 'com_user_safe_pay_password',component: () => import( /* webpackChunkName: "comp_safe" */ '@/views/user/safe/pay_password.vue')}, // 支付密码修改
      {path: 'safe/pay_passwordforget',name: 'com_user_safe_pay_passwordforget',component: () => import( /* webpackChunkName: "comp_safe" */ '@/views/user/safe/pay_passwordforget.vue')}, // 支付密码重置
      {path: 'user_bind',name: 'com_home_user_bind',component: () => import( /* webpackChunkName: "comp_safe" */ '@/views/user/user_bind.vue')}, // 账号绑定
      {path: 'safe/card',name: 'com_home_user_card',component: () => import( /* webpackChunkName: "comp_safe" */ '@/views/user/safe/card.vue')}, // 身份认证
      // 评论列表
      {path: 'comment/add',name: 'com_home_comment_add',component: () => import( /* webpackChunkName: "comp_comment" */ '@/views/user/comment/add.vue')}, // 订单添加评论
      {path: 'comment/index',name: 'com_home_comment_index',component: () => import( /* webpackChunkName: "comp_comment" */ '@/views/user/comment/index.vue')}, // 订单列表
      {path: 'comment/success',name: 'com_home_comment_success',component: () => import( /* webpackChunkName: "comp_comment" */ '@/views/user/comment/success.vue')}, // 评论成功返回页面
      {path: 'comment/detail',name: 'com_home_comment_detail',component: () => import( /* webpackChunkName: "comp_comment" */ '@/views/user/comment/comment_detail.vue')}, // 评论成功返回页面
      {path: 'comment/seecomment',name: 'com_seecomment',component: () => import( /* webpackChunkName: "comp_comment" */ '@/views/user/comment/seecomment.vue')}, //查看评论详情
    
      // 售后、退货换货
      {path: 'aftersale/aftersalelist',name: 'com_aftersalelist',component: () => import( /* webpackChunkName: "comp_aftersale" */ '@/views/user/aftersale/aftersalelist.vue')}, // 售后列表
      {path: 'aftersale/chooseservicetype',name: 'com_chooseservicetype',component: () => import( /* webpackChunkName: "comp_aftersale" */ '@/views/user/aftersale/chooseservicetype.vue')}, // 选择售后方式
      {path: 'aftersale/aftersalesuccess',name: 'com_aftersalesuccess',component: () => import( /* webpackChunkName: "comp_aftersale" */ '@/views/user/aftersale/aftersalesuccess.vue')}, // 申请售后成功跳转页面
      {path: 'aftersale/aftersaledetail',name: 'com_aftersaledetail',component: () => import( /* webpackChunkName: "comp_aftersale" */ '@/views/user/aftersale/aftersaledetail.vue')}, // 退款退货详情
      
      // 发票
      {path: 'invoiceofmy',name: 'com_invoiceofmy',component: () => import( /* webpackChunkName: "comp_invoice" */ '@/views/user/invoice/invoiceofmy.vue')}, // 我的发票
      {path: 'invoiceapply',name: 'com_invoiceapply',component: () => import( /* webpackChunkName: "comp_invoice" */ '@/views/user/invoice/invoiceapply.vue')}, // 发票申请
      {path: 'invoicemanylist',name: 'com_invoicemanylist',component: () => import( /* webpackChunkName: "comp_invoice" */ '@/views/user/invoice/invoicemanylist.vue')}, // 发票集中申请列表
      {path: 'invoicemanyapply',name: 'com_invoicemanyapply',component: () => import( /* webpackChunkName: "comp_invoice" */ '@/views/user/invoice/invoicemanyapply.vue')}, // 发票集中申请提交
      {path: 'invoicedetail',name: 'com_invoicedetail',component: () => import( /* webpackChunkName: "comp_invoice" */ '@/views/user/invoice/invoicedetail.vue')}, // 发票详情
      {path: 'invoicesuccess',name: 'com_invoicesuccess',component: () => import( /* webpackChunkName: "comp_invoice" */ '@/views/user/invoice/invoicesuccess.vue')}, // 发票申请成功
      
      // 充值、提现页面
      {path: 'recharge',name: 'com_recharge',component: () => import( /* webpackChunkName: "comp_recharge" */ '@/views/user/cashRecharge/recharge.vue')},  //充值页面
      {path: 'cash',name: 'com_cash',component: () => import( /* webpackChunkName: "comp_recharge" */ '@/views/user/cashRecharge/cash.vue')},  //提现页面
      
      // 企业用户额外页面
      {path: 'company_user_info',name: 'company_user_info',component: () => import( /* webpackChunkName: "company_exclusive" */ '@/views/company/user/user_info.vue')},  //企业资料
      {path: 'company_invoice_search',name: 'company_invoice_search',component: () => import( /* webpackChunkName: "company_exclusive" */ '@/views/company/user/invoice_search.vue')},  //企业发票查询
      {path: 'company_invoice_special',name: 'company_invoice_special',component: () => import( /* webpackChunkName: "company_exclusive" */ '@/views/company/user/invoice_special.vue')},  //企业专票资质
      {path: 'masterstaff',name: 'company_masterstaff',component: () => import( /* webpackChunkName: "company_exclusive" */ '@/views/company/user/masterstaff.vue')},  //主子账号
      {path: 'sonreview',name: 'company_sonreview',component: () => import( /* webpackChunkName: "company_exclusive" */ '@/views/company/user/sonreview.vue')},  //子账号审核订单
      {path: 'sonreview_success',name: 'com_sonreview_success',component: () => import( /* webpackChunkName: "company_exclusive" */ '@/views/company/user/sonreview_success.vue')}, // 子账号审核订单 成功返回页面
    ]
  }, 

  // 企业采购
  {path: '/company/home',name: 'company_home',component: () => import( /* webpackChunkName: "company" */ '@/views/company/home.vue')}, //企业采购首页
  {path: '/company/integral',name: 'company_integral',component: () => import( /* webpackChunkName: "company" */ '@/views/integral/index.vue')}, //企业积分商城
  {path: '/company/officework',name: 'company_officework',component: () => import( /* webpackChunkName: "company" */ '@/views/officework/index.vue')}, //企业场景办公
  {path: '/company/goodsdetail/:goods_id',name: 'company_goodsdetail',component: () => import( /* webpackChunkName: "company" */ '@/views/goods/detail.vue')}, //企业商品详情
  {path: '/company/goodssearch',name: 'company_goodssearch',component: () => import( /* webpackChunkName: "goods" */ '@/views/goods/goodssearch.vue')},
  {path: '/company/login',name: 'company_login',component: () => import( /* webpackChunkName: "company" */ '@/views/login/login.vue')}, //企业登录
  {path: '/company/forget_password',name: 'company_forget_password',component: () => import( /* webpackChunkName: "company" */ '@/views/login/forget_password.vue')}, //企业忘记密码
  {path: '/company/index',name: 'company_index',component: () => import( /* webpackChunkName: "company" */ '@/views/company/index.vue')}, //企业采购中转页
  {path: '/company/register',name: 'company_register',component: () => import( /* webpackChunkName: "company" */ '@/views/company/register.vue')}, //企业注册
  {path: '/company/banner_detail',name: 'company_banner_detail',component: () => import( /* webpackChunkName: "company" */ '@/views/newpage/banner_detail.vue')},
  {path: '/company/find_goods_list',name: 'company_find_goods_list',component: () => import( /* webpackChunkName: "company" */ '@/views/newpage/find_goods_list.vue')},
  
  // 全部商品分类
  {path: '/allgoodstype',name: 'allgoodstype',component: () => import( /* webpackChunkName: "allgoodstype" */ '@/views/allgoodstype/allgoodstype.vue')},
  {path: '/company_allgoodstype',name: 'company_allgoodstype',component: () => import( /* webpackChunkName: "allgoodstype" */ '@/views/allgoodstype/company_allgoodstype.vue')},

  // 注册
  {path: '/login',name: 'login',component: () => import( /* webpackChunkName: "login" */ '@/views/login/login.vue')},
  {path: '/register',name: 'register',component: () => import( /* webpackChunkName: "login" */ '@/views/login/register.vue')},
  {path: '/forget_password',name: 'forget_password',component: () => import( /* webpackChunkName: "login" */ '@/views/login/forget_password.vue')},

  // 积分商城
  {path: '/integral',name: 'integral',component: () => import( /* webpackChunkName: "integral" */ '@/views/integral/index.vue')},
  {path: '/integral_order_detail/:goods_id',name: 'integral_order_detail',component: () => import( /* webpackChunkName: "integral" */ '@/views/integral/detail.vue')},
  
  // 场景办公
  {path: '/officework',name: 'officework',component: () => import( /* webpackChunkName: "officework" */ '@/views/officework/index.vue')},

  // 我的订单
  {path: '/order/createorder',name: 'createorder',component: () => import( /* webpackChunkName: "order" */ '@/views/order/create_order.vue'),meta},
  {path: '/order/choosepay',name: 'choosepay',component: () => import( /* webpackChunkName: "order" */ '@/views/order/chose_pay.vue'),meta},
  // 用户支付成功页面
  {path: '/pay/success',name: 'paysuccess',component: () => import( /* webpackChunkName: "order" */ '@/views/order/pay_success.vue'),meta},
  // 购物车添加成功页面
  {path: '/addcartsuccess',name: 'addcartsuccess',component: () => import( /* webpackChunkName: "mycart" */ '@/views/mycart/addcart_success.vue'),meta},
  // 用户余额充值成功页面
  {path: '/recharge/success',name: 'rechargesuccess',component: () => import( /* webpackChunkName: "user" */ '@/views/user/cashRecharge/recharge_success.vue'),meta},

  // 详细页面
  {path: '/goodsdetail/:goods_id',name: 'goodsdetail',component: () => import( /* webpackChunkName: "goods" */ '@/views/goods/detail.vue')},

  // 搜索页面
  {path: '/goodssearch',name: 'goodssearch',component: () => import( /* webpackChunkName: "goods" */ '@/views/goods/goodssearch.vue')},

  // 上门取件服务协议
  {path: '/agreement',name: 'agreement',component: () => import( /* webpackChunkName: "newpage" */ '@/views/newpage/agreement.vue')},
  {path: '/agreement_register',name: 'agreement_register',component: () => import( /* webpackChunkName: "newpage" */ '@/views/newpage/agreement_register.vue')},
  
  // banner图对应详细页
  {path: '/banner_detail',name: 'banner_detail',component: () => import( /* webpackChunkName: "newpage" */ '@/views/newpage/banner_detail.vue')},
  
  // 发现好货
  {path: '/find_goods_list',name: 'find_goods_list',component: () => import( /* webpackChunkName: "newpage" */ '@/views/newpage/find_goods_list.vue')},

  // 三目增值电信许可证
  {path: '/smregister',name: 'smregister',component: () => import( /* webpackChunkName: "newpage" */ '@/views/newpage/smregister.vue')},

  // 帮助中心
  {path: '/help',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/help.vue'),children:[
    {path:"",redirect:"11"}, //默认跳转到第一页
    {path: '11',name: 'help11',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/11.vue')},
    {path: '12',name: 'help12',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/12.vue')},
    {path: '13',name: 'help13',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/13.vue')},
    {path: '21',name: 'help21',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/21.vue')},
    {path: '22',name: 'help22',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/22.vue')},
    {path: '23',name: 'help23',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/23.vue')},
    {path: '31',name: 'help31',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/31.vue')},
    {path: '32',name: 'help32',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/32.vue')},
    {path: '41',name: 'help41',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/41.vue')},
    {path: '42',name: 'help42',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/42.vue')},
    {path: '43',name: 'help43',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/43.vue')},
    {path: '51',name: 'help51',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/51.vue')},
    {path: '52',name: 'help52',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/52.vue')},
    {path: '53',name: 'help53',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/53.vue')},
    {path: '61',name: 'help61',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/61.vue')},
    {path: '62',name: 'help62',component: () => import( /* webpackChunkName: "help" */ '@/views/newpage/helpson/62.vue')},
  ]},

  // 其他本域名，找不到路径的页面
  {path: '*',name: '404',component: () => import( /* webpackChunkName: "404" */ '@/views/404.vue')},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'userlinkactive', //绝对路径匹配选中项
  routes
})

//发送路由前。判断此路由，是否需要登录，配合axios拦截返回一起使用
router.beforeEach((to, from, next) => {
  // 判断进入此路由是否需要登录
  // console.log(to,from)
  const token = localStorage.getItem("token");
  const isLogin = !!token; //两个感叹号表示转为当前布尔值。有token代表真登录或假toke
  // console.log("需要登录，是否有token:" + isLogin)

  // 需要登录，判断登录状态 to信息中的matched中数据过滤，一真即真
  if (to.matched.some(item => item.meta.login)) {
    if (isLogin) {
      if (to.name === 'login') { //如果有token,并且访问login，跳到个人首页
        next({
          name: 'home'
        })
      }else if(to.name==="company_login"){//如果有token,并且访问company_login，跳到企业首页
        next({
          name: 'company_home'
        })
      } else { //如果有token，并且没访问login，放行
        next(); 
      }
    }
    // 没token，进入login或者company_login，直接进入
    if (!isLogin && (to.name === 'login' || to.name === 'company_login')) {
      next();
    }
    // 没token，进入的不是login，也不是company_login，根据from路由跳到指定login页面
    if (!isLogin && to.name !== 'login' && to.name !== 'company_login') {
      if(from.path.startsWith("/company")){
        next({
          name: 'company_login'
        })
      }else{
        next({
          name: 'login'
        })
      }
    }
  } else { //不需要登录，放行
    next();
  }
})
// 发送路由后。跳转到顶部
router.afterEach(() => {
  window.scrollTo(0, 0);
})

export default router;