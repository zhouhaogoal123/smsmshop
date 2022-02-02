<template>
  <div>
    <div class="title">联系客服</div>
    <ul class="content">
      <li>客服电话1 028-86037345</li>
      <li>客服电话2 028-86037365</li>
      <li>客服 QQ 2385663282</li>
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
