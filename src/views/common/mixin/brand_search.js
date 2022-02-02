export const mixin = {
  methods: {
    // 根据品牌查询
    toserachbybrand(brandid, brandtitle) {
      if (this.$route.name.startsWith("company")) {
        let newUrl = this.$router.resolve({ name: 'company_goodssearch', query: { brandid, brandtitle } })
        window.open(newUrl.href, "_blank");
      } else {
        let newUrl = this.$router.resolve({ name: 'goodssearch', query: { brandid, brandtitle } })
        window.open(newUrl.href, "_blank");
      }
    },
  },
}