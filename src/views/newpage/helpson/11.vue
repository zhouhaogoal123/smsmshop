<template>
  <div>
    <div class="title">货到付款区域</div>
    <ul class="content">
      <li>四川地区的合约客户</li>
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
    line-height: 30px;
    list-style: square;
  }
}
</style>
