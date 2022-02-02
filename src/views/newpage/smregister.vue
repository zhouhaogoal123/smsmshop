<template>
  <div class="picbox">
    <img src="/pc/smregister.jpg" :class="ifcanbig?'canbig':'cansmall'" @click="changeSize">
  </div>
</template>


<script>
export default {
  data() {
    return {
      ifcanbig: true,//初始可以放大
    }
  },
  methods: {
    changeSize() {
      this.ifcanbig = !this.ifcanbig;
    }
  },
}
</script>

<style lang="scss" scoped>
.picbox {
  min-height: 100%;
  text-align: center;
  background: #000;
  img {
    margin-top: 2vh;
    background: #000;
  }
  .canbig {
    height: 95vh;
    width: 70vh;
    cursor: zoom-in;
  }
  .cansmall {
    width: 120vh;
    height: 170vh;
    cursor: zoom-out;
  }
}
</style>
