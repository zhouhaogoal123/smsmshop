<template>
  <div>
    <div class="title">支付方式说明</div>
    <el-table :data="tableData" border style="width: 100%" class="content">
      <el-table-column prop="type" label="客户分类">
      </el-table-column>
      <el-table-column prop="gong" label="公司转帐">
        <template slot-scope="scope">
          <i :class="scope.row.can1?'el-icon-check':'el-icon-close'"></i>
        </template>
      </el-table-column>
      <el-table-column label="货到付现">
        <template slot-scope="scope">
          <i :class="scope.row.can2?'el-icon-check':'el-icon-close'"></i>
        </template>
      </el-table-column>
      <el-table-column label="货到刷卡">
        <template slot-scope="scope">
          <i :class="scope.row.can3?'el-icon-check':'el-icon-close'"></i>
        </template>
      </el-table-column>
      <el-table-column label="在线支付">
        <template slot-scope="scope">
          <i :class="scope.row.can4?'el-icon-check':'el-icon-close'"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { type: '合约客户', can1: true, can2: true, can3: true, can4: true },
        { type: '自配送客户', can1: false, can2: true, can3: true, can4: true },
        { type: '第三方配送客户', can1: false, can2: false, can3: false, can4: true }
      ]
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
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 13px;
  color: #999;
}
</style>
