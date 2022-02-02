<template>
  <div>
    <div class="title">联系我们</div>
    <ul class="content">
      <li>公司名称：成都市三目商贸有限公司</li>
      <li>公司地址：成都市高新区科园南路1号海特国际广场3号楼202室</li>
      <li>客服电话：028-86037345、028-86037365</li>
      <li>客服QQ： 2385663282</li>
      <li>传真：028-83167321</li>
      <li>邮编：610041</li>
      <li>Email: cdsm@cdsm.com.cn</li>
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
