<template>
  <div class="box">
    <el-popover placement="bottom" popper-class="testpop" title="敬请期待" width="100" trigger="hover">
      <template v-slot:reference>
        <span v-if="state">click 激活</span>

      </template>
    </el-popover>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: true,
      state: ""
    };
  },
  created() {
  
  },
  methods: {
  
  },
};
</script>

<style lang="scss" scoped>
.testpop {
  background: red;
}
.box {
  width: 600px;
  height: 600px;
  padding: 50px;
  // background: greenyellow;
  margin: auto;
  /deep/.wagaga {
    width: 100px;
    height: 100px;
    // background: black;
  }
  /deep/i {
    animation: rotating 2s linear infinite;
  }
}
</style>
