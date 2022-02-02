export const api = {
  // 商城首页接口
  "homeGetSubNavInfo": "category/list", // 获取首页左侧导航的信息
  "homeGetBannerInfo": "picture/homepage", // 获取首页轮播图信息
  "homeGetGoodsListInfo": "goods/list", //获取商品列表

  // 收藏接口
  "homeFavList": "favorite/list", //收藏列表
  "homeAddRemoveFav": "favorite/add", //新添加收藏、移除删除

  // 登录相关
  "homeRegister": "auth/register", // 注册
  "companyRegister":"company/register", //企业注册
  "homeLogin": "auth/login", // 登录
  "companyLogin":"company/login", //企业用户登录
  "homeLogout": "auth/logout", // 退出登录
  "homeForgetPassword": "/auth/password/reset", // 忘记密码
  "homeSendSms": "user/send_sms", // 发送短信
  "homeSendEmail": "user/send_email", // 发送邮件
  "homeGetOauthConfig": "user/get_oauth_config", // 获取配置数据

  // 购物车
  "homeGetCartList": "cart/list", //获取购物车列表
  "homeAddCart": "cart/add", //添加购物车
  "homeChangeCart": "cart/edit", //修改购物车
  "homeDelCart": "cart/del", //删除购物车
  "homeGetCartCount": "cart/get_cart_count", //获取用户购物车总数量

  // 用户个人中心
  "homeGetUserInfo": "user/get_user_info", // 获取用户信息
  "homeEditUserInfo": "user/edit_user_info", // 修改用户信息
  "homeCheckPayPassword": "user/check_pay_password", // 验证支付密码
  "homeGetFavList": "user/get_fav_list", // 修改收藏关注列表ogn
  "homeDelFav": "user/del_fav", // 删除收藏关注
  "homeGetMoneyLog": "user/get_money_log", // 获取用户资金变更日志
  "homeAvatar": "user/avatar", // 用户头像上传

  // 商品详情
  "homeGetGoodsInfo": "goods/show", //获取商品详细信息
  "homeSearchGoods": "goods/list", //通过关键字查询商品
  "homeGetBrandList": "brand/brands", //获取商品品牌
  'homeGetCommentListByGoods': "goods/get_comment_list_by_goods", // 获取评论列表根据商品ID

  // 商家首页
  "homeGetStoreInfo": "store/get_store_info", // 获取商家信息
  "homeGetStoreIndexInfo": "store/get_store_index_info", // 获取商家首页信息
  "homeGetStoreGoodsClass": "store/get_store_class", // 获取商家分类信息
  "homeGetStoreClassGoods": "store/get_store_class_goods", // 获取商家分类信息和商品列表

  // 用户收货地址
  'getAddressList': "address/list",  //用户收货地址获取
  'addAddress': "address/add",      //用户收货地址添加
  'editAddress': "address/edit",    //用户收货地址修改
  'delAddress': "address/del",      //用户收货地址删除
  'setDefaultAddress': "address/activate", //设置为默认收货地址

  // 获取物流信息
  'homeGetDeliveryList': "order/get_user_delivery",

  // 订单评论
  'homeGetOrderInfoByOrderId': "order/get_order_info_by_order_id", // 根据订单ID获取订单信息
  'homeGetCommentList': "order/get_comment_list", // 根据订单ID获取订单信息
  'homeAddComment': "order/add_comment", // 添加评论
  'homeCommentImage': "comment/comment_image", // 图片上传 评论

  // 修改订单状态
  'homeChangeOrderStatus': "order/change_order_status",
  'homeOrderRefund': "order/refund", // 申请售后
  'homeOrderRefundDelivery': "order/refund_delivery_no", // 售后发送快递单号

  // 预生成订单数据
  'homeGetBeforOrder': "order/get_befor_order",

  // 生成订单
  'homeCreateOrder': "order/add", //添加订单
  'homeCancelOrder': "order/cancel", //取消订单
  'homeDelOrder': "order/del", //删除订单
  'homeListOrder': "order/list", //获取订单列表
  'homeLogOrder': "order/log_list", //订单日志列表

  'homeGetOrderInfoByOrderNo': "order/get_order_info_by_order_no", // 根据订单号获取订单信息
  'homePayOrder': "order/pay", // 支付订单
  'homeCheckWxpayNative': "order/check_wxpay_native", // 查下订单支付情况

  // 取消订单
  'homeCloseOrder': "order/close_order",

  // 提现 cash
  'homeGetCashLog': "cash/get_cash_log",
  'homeAddCashLog': "cash/add_cash",

  // 无压缩裁剪上传
  'homeAutoUpload': "auto/auto_upload",

  // 邀请信息
  "homeGetInviterInfo": "user/get_inviter_info", // 用户头像上传

  // 认证信息
  "homeGetUserCheckInfo": "user/get_user_check_info", // 获取用户认证信息
  "homeEditUserCheckInfo": "user/edit_user_check_info", // 修改用户认证信息
  "homeUserCard": "user/user_card", // 身份证上传

  // 秒杀接口
  "homeGetSeckillList": "seckill/get_seckill_list", // 获取秒杀

  // 商家入驻
  "homeStoreJoin": "user/join",
  "homeGetJoinIndexAdv": "index/get_join_index_adv",
  "homeIsStore": "store/is_store",

  // 积分商城
  "homeGetIntegralIndexInfo": "integral/get_index_info", // 
  "homeGetIntegralGoodsInfo": "integral/goods/info/", // 获取积分商品详情
  "homeSearchIntegralGoods": "integral/goods/search_integral_goods", // 获取积分条件列表
  "homeGetIntegralGoodsClass": "integral/goods/get_integral_goods_class", // 获取积分商品分类

  // 积分商城创建订单
  "homeIntegralCreateOrder": "integral/order/create_order", // 获取积分商品分类
  "homeGetIntegralUserOrder": "user/integral/get_user_order", // 获取积分订单
  "homeIntegralChangeOrderStatus": "user/integral/change_order_status", // 确认收货

  // 拼团 团购
  "homeGetGroupbuyBanner": "groupbuy/get_groupbuy_banner", // 团购幻灯片

  // 商品销售排行
  "homeGetSaleList": "goods/get_sale_list",






  /**
   * 公共接口
   * @author hg <www.qingwuit.com>
   */

  
  "homeGetAgreementInfo": "api/get_agreement_info",// 获取协议数据(根据ename)
  "homeGetAreaList": "dist/index",// 获取省市区信息
  "homeGetGoodsClassList": "api/get_goods_class_list",  // 获取PC商品分类信息
  "homeGetBanner": "api/get_banner",  // 获取PC 幻灯片或者广告

  /**
   * @deprecated 聊天接口
   * @author hg <www.qingwuit.com>
   */

  "chatAddFriend": "chat/add_friend", // 添加为好友
  "chatGetChatFriend": "chat/get_chat_friend", // 获取聊天好友列表
  "chatGetChatMsg": "chat/get_chat_msg", // 获取聊天信息
  "chatChatEvent": "chat/chat_event", // 接收前端信息接口
  "chatReadMsg": "chat/read_msg", // 清空未读信息
  "chatUpload": "chat/image", // 图片上次
}