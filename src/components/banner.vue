<template>
    <div class="sanmu">
        <!-- 首页轮播图 -->
        <el-skeleton style="width: 100%" :loading="loading">
            <template slot="template">
                <el-skeleton-item variant="text" style="width: 100%; height: 450px;" />
            </template>

            <template>
                <el-carousel trigger="click" height="450px" :interval="3500" v-if="!loading">
                    <el-carousel-item v-for="item in bannerPics" :key="item.id" class="sanmu">
                        <el-image :src="item.picture_url" fit="cover" @click="tobanner_detail(item.keyword)"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </template>
        </el-skeleton>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bannerPics: [],
            loading: true,
        };
    },
    created() {
        this.getbannerpics()
    },
    methods: {
        getbannerpics() {
            this.$get(this.$api.homeGetBannerInfo).then(res => {
                console.log("banner图", res);
                this.bannerPics = res.data
                this.loading = false
            });
        },
        tobanner_detail(banner_keyword) {
            if (this.$route.name == "home") {
                let newUrl = this.$router.resolve({ name: "banner_detail", query: { banner_keyword: banner_keyword } });
                window.open(newUrl.href, "_blank");
            }
            if (this.$route.name == "company_home") {
                let newUrl = this.$router.resolve({ name: "company_banner_detail", query: { banner_keyword: banner_keyword } });
                window.open(newUrl.href, "_blank");
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.el-carousel {
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-image {
  cursor: pointer;
}
.bannerall {
  background: red;
}
</style>