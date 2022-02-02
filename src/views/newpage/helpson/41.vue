<template>
  <div>
    <div class="title">网站故障报告</div>
    <ul class="content">
      <li>如果您在使用我们的网站过程中遇到什么问题或故障，请及时向我们反馈，我们的技术人员会在第一时间作出处理。</li>
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
