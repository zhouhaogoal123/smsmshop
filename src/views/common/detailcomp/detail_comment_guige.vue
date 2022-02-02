<template>
  <div>
    <ul>
      <!-- <li> 颜色：红色 </li>
      <li> 品牌：得力 </li>
      <li> 大小：24寸 </li>
      <li> 样式：安抚阿斯蒂芬就刻录机阿斯蒂芬大师傅阿三哥阿斯蒂芬 </li> -->
      <li v-if="natureData.length>0">
        <span v-for="item in natureData" :key="item.id">{{item.title}}：{{item.meta}}</span>
      </li>
    </ul>
    <div class="line"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // natureData: "",
      // specData: ""
    }
  },
  inject: ["natureSon"],
  mounted() {
    // this.natureData = this.natureSon.nature[0]
    // console.log("nature spec", this.natureData, this.specData)
  },
  computed: {
    natureData() {
      console.log("xxxxxx", this.natureSon)
      return this.natureSon.nature;
    },
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  li {
    color: #666;
    font-size: 13px;
    padding: 0 30px;
    display: flex;
    flex-wrap: wrap;
    line-height: 25px;
    span {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.line {
  width: 100%;
  height: 1px;
  background: #f2f2f2;
  margin-top: 20px;
}
</style>
