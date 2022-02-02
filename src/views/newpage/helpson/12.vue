<template>
  <div>
    <div class="title">货到付款区域</div>
    <ul class="content">
      <li>合约客户系统自动免运费</li>
      <li>非合约客户会根据您的订货量通过第三方快递产生的快递费发给您</li>
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
  margin-bottom: 30px;
}
.content {
  font-size: 13px;
  color: #777;
  li {
    list-style: square;
    line-height: 30px;
  }
}
</style>
