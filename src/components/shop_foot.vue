<template>
  <div class="shopfoot">
    <div class="width_center_1200 shopfootlist">
      <dl class="changecolor">
        <dt class="title">配送方式</dt>
        <dd @click="tohelp(11)">货到付款区域</dd>
        <dd @click="tohelp(12)">配送支付查询</dd>
        <dd @click="tohelp(13)">支付方式说明</dd>
      </dl>
      <dl class="changecolor">
        <dt class="title">购物指南</dt>
        <dd @click="tohelp(21)">常见问题</dd>
        <dd @click="tohelp(22)">联系客服</dd>
        <dd @click="tohelp(23)">定制流程</dd>
      </dl>
      <dl class="changecolor">
        <dt class="title">售后服务</dt>
        <dd @click="tohelp(31)">退换货原则</dd>
        <dd @click="tohelp(32)">退换货</dd>
      </dl>
      <dl class="changecolor">
        <dt class="title">关于我们</dt>
        <dd @click="tohelp(41)">网站故障报告</dd>
        <dd @click="tohelp(42)">投诉与建议</dd>
        <dd @click="tohelp(43)">成都市三目商贸有限公司</dd>
      </dl>
      <dl class="changecolor">
        <dt class="title">新手上路</dt>
        <dd @click="tohelp(51)">修改收货地址</dd>
        <dd @click="tohelp(52)">月结条款</dd>
        <dd @click="tohelp(53)">非促销类</dd>
      </dl>
      <dl class="nopointer">
        <dt class="title">服务支持</dt>
        <dd>客服电话 4008298329</dd>
        <dd>客服QQ 2385663282</dd>
        <dd>工作时间 8:30-18:00</dd>
      </dl>
    </div>

    <div class="bott">
      <div class="sanmu">
        <span class="lab">友情链接：</span>
        <a href="http://www.cdsm.com.cn/" class="item" target="_blank">公司官网</a>
      </div>
      <div class="tab">
        <span @click="tohelp(61)">联系我们</span>
        <span>商家入驻</span>
        <span>站点地图</span>
        <!-- <span @click="tohelp(62)">留言板 </span> -->
        <span @click="tonewpage('smregister')">增值电信许可证</span>
        <a href="https://aiqicha.baidu.com/company_detail_56614463249274" target="_blank">ICP备案证书号：蜀ICP备15022119号-2</a>
      </div>
      <div class="pics">
        <a target="_blank" href="https://ss.knet.cn/verifyseal.dll?sn=e18092651010075401sbcb000000&userid=8IeOInNbj43dec5E&time=1578362365547&stoken=ff8dbe9f294993d071eb362601bde2ef&pa=36554">
          <img src="/pc/bottom1.jpg" alt="图片加载失败">
        </a>
        <a target="_blank" href="https://xinyong.yunaq.com/certificate?domain=www.hi-sm.com&from=label&code=90020">
          <img src="/pc/bottom2.jpg" alt="图片加载失败">
        </a>
      </div>
      <div class="contact">
        <span>© 2006-2021 三目商城_办公用品_成都办公用品_四川文具批发_成都数码配件_文具派送_复印纸批发 成都三目版权所有，并保留所有权利。</span>
        <span>成都市高新区海特国际广场3号楼202</span>
        <span>Tel: 4008298329</span>
        <span>E-mail: info@hi-sm.com</span>
      </div>
      <div class="safeabout">
        <img src="/pc/footpolice.png" alt="">
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002003431" target="_blank">川公网安备 51019002003431号</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  methods: {
    // 跳转帮助中心
    tohelp(id) {
      // resolve解析目标位置，与push的区别就是不会直接跳转
      let newUrl = this.$router.resolve({ path: "/help/" + id, query: { id } });
      // window.open默认新页面打开，_blank默认就是加上的
      window.open(newUrl.href, "_blank");
    },
    // 跳转三目官网
    tonewpage(urlname) {
      let newUrl = this.$router.resolve({ name: urlname });
      window.open(newUrl.href, "_blank")
    }
  },
};
</script>
<style lang="scss" scoped>
.shopfoot {
  background: #f5f5f5;
  padding-top: 20px;
  padding-bottom: 35px;
  .shopfootlist {
    display: flex;
    justify-content: space-between;
    text-indent: 40px;
    color: #555;
    dl {
      flex: 1;
      dt {
        font-size: 14px;
        font-weight: 700;
        line-height: 22px;
        padding-bottom: 5px;
      }
      dd {
        font-size: 12px;
        line-height: 22px;
      }
    }
    dl.changecolor dd:hover {
      color: $main_color;
      cursor: pointer;
    }
  }

  .bott {
    width: 1200px;
    margin: auto;
    text-align: center;
    font-size: 12px;
    color: #999;
    .sanmu {
      margin-top: 50px;
      .lab {
        color: #555;
      }
      a {
        color: #999;
      }
      .item:hover {
        color: $main_color;
        cursor: pointer;
      }
    }
    .tab {
      span,
      a {
        padding: 0 8px;
        display: inline-block;
        line-height: 12px;
        margin: 10px 0;
      }
      span {
        border-right: 1px solid #999;
      }
      a {
        color: #999;
      }
      span:hover,
      a:hover {
        color: $main_color;
        cursor: pointer;
      }
    }
    .pics {
      img {
        cursor: pointer;
        padding-right: 8px;
      }
    }
    .contact {
      span {
        padding-right: 5px;
      }
      span:hover {
        color: $main_color;
      }
    }
  }
}
.safeabout {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  img {
    width: 20px;
    height: 20px;
  }
  a {
    // display: inline-block;
    color: #999;
    font-size: 12px;
    line-height: 20px;
  }
  a:hover {
    color: $main_color;
  }
}
</style>