<template>
  <div>
    <div class="title">非促销类</div>
    <ul class="content">
      <li>非促销类是除开首页商业抢购促销类商品和积分兑换商品，这类商品我们会在首页活动专题页或者首页和积分兑换也出现，有时效限制，故不在销量排行中统计。</li>
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
  li {
    line-height: 30px;
    list-style: square;
  }
}
</style>
