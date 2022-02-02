<template>
  <div>
    <div class="title">退换货</div>
    <ul class="content">
      <div class="content_title"> 1. 退换货条件</div>
      <div class="content_tishi">商品交付后的15天之内，出现下列情形之一的可以申请退换货</div>
      <li>商品质量问题（发现可能是质量问题时请立即停止使用）。</li>
      <li>商品破损、型号/数量不符。</li>
      <li>因客户的原因造成的退换货，三目将根据具体的情况收取配送费。</li><br /><br />
      <div class="content_title"> 2. 下列情形之一的，不予退换货</div>
      <li>因客户原因,造成商品外观及外包装、使用性能损坏等不能再次销售的商品。</li>
      <li>无故要求将货物随意更换成其他产品时。</li>
      <li>根据客户的要求、特别购买订制的商品。</li>
      <li>合同规定的不可退货商品。</li>
      <li>非质量原因的，食品等有保质期或使用期限的商品。</li>
      <li>超过厂家规定保修期的商品。</li><br /><br />
      <div class="content_title">3. 三目公司对售后政策的未尽事宜享有补充解释的权利。</div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px dashed #999;
  font-weight: 700;
  color: #666;
  font-size: 16px;
}
.content {
  margin: 30px 0;
  font-size: 13px;
  color: #777;
  .content_tishi{
    text-indent: 20px;
  }
  .content_title {
    font-weight: 700;
    line-height: 30px;
  }
  li {
    line-height: 30px;
    list-style: inside square;
    text-indent: 20px;
  }
}
</style>
