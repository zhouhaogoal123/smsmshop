<template>
  <div class="product_skeleton">
    <div class="product_skeleton_item" v-for="item in 8" :key="item">
      <el-skeleton-item variant="text" class="goods_item1" />
      <el-skeleton-item variant="text" class="goods_item2" />
      <el-skeleton-item variant="text" class="goods_item3" />
      <div class="goods_itemlast">
        <el-skeleton-item variant="text" class="goods_item4" />
        <el-skeleton-item variant="text" class="goods_item5" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.product_skeleton {
  width: 946px;
  height: 540px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .product_skeleton_item {
    width: 220px;
    height: 260px;
    box-sizing: border-box;
    padding: 20px 40px;
    margin-bottom: 20px;
    background: #fff;
    .goods_item1 {
      height: 140px;
    }
    .goods_item2 {
      margin-top: 20px;
      height: 20px;
    }
    .goods_item4,
    .goods_item5 {
      width: 40px;
    }
    .goods_itemlast {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>

