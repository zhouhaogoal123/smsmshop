<template>
  <!-- 头部百度地图 -->
  <div class="position_mycity">
    <span class="iconfont icondingwei"></span>
    <span class="position_font">{{mycity}}</span>
  </div>
</template>
<script>
export default {
  name: "citycom",
  data() {
    return {
      mycity: "正在定位"
    }
  },

  created() {
    this.showCityInfo()
  },
  methods: {
    // loadMainScript() {
    //   var script = document.createElement("script");
    //   script.type = "text/javascript";
    //   script.src =
    //     "https://webapi.amap.com/maps?v=1.4.15&key=437f4cce62bb912d474da40c4cb886fc";
    //   script.onload = () => {
    //     this.showCityInfo();
    //   };
    //   document.body.appendChild(script);
    // },
    showCityInfo() {
      AMap.plugin('AMap.CitySearch', () => {
        let citySearch = new AMap.CitySearch()
        citySearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            this.mycity = result.city
          } else {
            this.city = "请手动选择地址";
          }
        })
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.position_mycity {
  height: 30px;
  .icondingwei {
    color: $main_color;
    padding-right: 3px;
    font-size: 16px;
    line-height: 30px;
  }
  .position_font {
    line-height: 30px;
  }
}
</style>
