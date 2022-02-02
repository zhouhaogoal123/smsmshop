<template>
  <div>
    <!-- 头部三大栏 -->
    <div class="shop_top" v-if="userhead_show">
      <UserHead></UserHead>
    </div>
    <CompanyHead v-else></CompanyHead>
    新闻详情
  </div>
</template>

<script>
import UserHead from "@/components/head.vue";
import CompanyHead from "@/views/common/companyhead.vue";
export default {
  components: { UserHead, CompanyHead },
  data() {
    return {
      userhead_show: true,
    }
  },
  created() {
    this.$route.query == "us" ? this.userhead_show = true : this.userhead_show = false;
  },

}
</script>

<style lang="scss" scoped>
</style>
