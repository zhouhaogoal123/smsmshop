<template>
  <div class="box">
    <el-select v-model="province" @change="provinceChange">
      <el-option v-for="item in provinceinfo" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="city" @change="cityChange">
      <el-option v-for="item in cityinfo" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="district" @change="districtChange">
      <el-option v-for="item in districtinfo" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="street" @change="streetChange" v-if="street_show">
      <el-option v-for="item in streetinfo" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "addresscomp",
  data() {
    return {
      provinceinfo: [],
      cityinfo: [],
      districtinfo: [],
      streetinfo: [],
      province: "请选择省份",//当前省
      city: "请选择城市",//当前市
      district: "请选择区县", //当前区县
      street: "请选择乡镇",//当前乡镇
      street_show: true,//当前街道项是否展示
      info: [], //父级传递的信息
    }
  },
  props: {
    // address_info，包括，province、city、district、street、province_id、city_id、district_id、street_id、addoredit
    // 如果是 addoredit 为0，视为新增，那么这些变量都不用传
    address_info: { type: Object },
  },
  watch: {
    address_info(newval) {
      console.log("监听", newval)
      this.info = newval;

      if (this.info.addoredit == 1) { //修改
        this.province = this.info.province;
        this.city = this.info.city;
        this.district = this.info.district;
        if (this.info.street) {
          this.street = this.mystreet;
        } else { //如果没有传街道信息，就隐藏了
          this.street_show = false;
        }
        this.getdefaultinfo(this.info.province_id, this.info.city_id, this.info.district_id);
      }
    }
  },
  created() {
    this.getprovince(); //获取省信息
  },
  methods: {
    // 获取省信息
    getprovince() {
      this.$get("dist/district").then(res => {
        this.provinceinfo = res.data;
      });
    },
    // 获取默认地址下拉信息
    getdefaultinfo(myprovince_id, mycity_id, mydistrict_id) {
      this.$get("dist/district", { parent_id: myprovince_id }).then(res => { // 获取市信息
        this.cityinfo = res.data;
      })
      this.$get("dist/district", { parent_id: mycity_id }).then(res => { // 获取区县信息
        this.districtinfo = res.data;
      })
      this.$get("dist/district", { parent_id: mydistrict_id }).then(res => { // 获取街道信息
        this.streetinfo = res.data;
      })
    },

    // 省改变
    provinceChange(val) {
      // console.log("当前省id", val)
      this.city = "请选择城市";
      this.district = "请选择区县";
      this.street = "请选择乡镇";
      this.districtinfo = [];
      this.streetinfo = [];
      this.street_show = true;
      this.$get("dist/district", { parent_id: val }).then(res => {
        this.cityinfo = res.data;
      })
      this.$emit("set_only_addressid", "");
    },

    // 市改变
    cityChange(val) {
      // console.log("当前市id", val)
      this.district = "请选择区县";
      this.street = "请选择乡镇";
      this.streetinfo = [];
      this.street_show = true;
      this.$get("dist/district", { parent_id: val }).then(res => {
        this.districtinfo = res.data;
      })
      this.$emit("set_only_addressid", "");
    },

    // 区县改变
    districtChange(val) {
      // console.log("当前区县id", val)
      this.street = "请选择乡镇";
      this.street_show = true;
      this.$get("dist/district", { parent_id: val }).then(res => {
        // console.log("街道信息", res.data)
        if (res.data.length == 0) { //如果没有街道
          this.street_show = false;
          this.$emit("set_only_addressid", val); //设置最后一级地址id
        } else { //如果有街道
          this.street_show = true;
          this.streetinfo = res.data;
          this.$emit("set_only_addressid", "");
        }
      })
    },
    // 街道改变
    streetChange(val) {
      // console.log("当前街道id", val);
      this.$emit("set_only_addressid", val); //设置最后一级地址id
    }
  },
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 140px;
  margin-right: 5px;
  /deep/.el-input {
    font-size: 12px;
    /deep/ .el-input__icon {
      width: 18px;
    }
    /deep/.el-input__inner {
      padding-right: 23px;
    }
  }
}
.el-select-dropdown {
  min-width: 140px;
}
.el-select-dropdown__item {
  font-size: 12px;
}
.el-select-dropdown__item.selected {
  color: $main_color;
}
</style>
