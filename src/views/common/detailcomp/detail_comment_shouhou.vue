<template>
  <div class="shouhou">
    <div class="shouhou_topline">售后保障</div>
    <ul>
      <li class="img1">
      </li>
      <li class="img2">
      </li>
      <li class="img3">
      </li>
    </ul>
    <section>
      质保期：一年<br/> 客服电话：028-86037345
      <br/> 客服 QQ ：2385663282<br/>
      <br/> 本商城向您保证所售商品均为正品行货，本商城自营商品自带机打发票，与商品一起寄送。凭质保证书及本商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由本商城联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。本商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！
      <br/>
      <br/><br/> 注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
      <br/><br/>
      <div class="line"></div><br/>
      <span class="main_color">权利声明：</span>
      <br/>本商城上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是三目商城重要的经营资源，未经许可，禁止非法转载使用。 注：本站商品信息均来自于厂商，其真实性、准确性和合法性由信息拥有者（厂商）负责。本站不提供任何保证，并不承担任何法律责任。
    </section>
  </div>
</template>

<style lang="scss" scoped>
.shouhou {
  margin-bottom: 100px;
}
.shouhou_topline {
  margin-top: 20px;
  font: 14px/39px "微软雅黑";
  color: #666;
  font-weight: 700;
  background: #fafafa;
  padding-left: 20px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
}
ul {
  display: flex;
  margin: 20px;
  li {
    width: 57px;
    height: 57px;
  }
  li.img1 {
    background: url("/pc/shouhou.jpg") no-repeat bottom;
    margin-right: 20px;
  }
  li.img2 {
    background: url("/pc/shouhou.jpg") no-repeat bottom -57px right 0;
    margin-right: 20px;
  }
  li.img3 {
    background: url("/pc/shouhou.jpg") no-repeat top;
  }
}
section {
  font-size: 12px;
  margin: 20px;
  margin-bottom: 120px;
  color: #666;
  .line {
    border-bottom: 1px dotted red;
  }
}
</style>
