<template>
  <!-- 场景办公 -->
  <div class="sanmu">
    <!-- 头部三大栏 -->
    <div class="shop_top">
      <CompanyHead v-if="iscompany"></CompanyHead>
      <ShopTop   v-else></ShopTop>
    </div>

    <!-- 会议室 -->
    <div class="office">
      <header>
        <span>会议室</span>
      </header>
      <div class="office_content">
        <div class="pic">
          <img src="/pc/office4.jpg" usemap="#Mapa" alt="HTTP 404,file not found" border="0" height="100%" width="100%">
          <map name="Mapa" id="Mapa">
            <!-- 黑板 宽56高22-->
            <area shape="rect" coords="210,128,266,150" @click="toofficedetail('黑板')">
            <!-- 投影仪 -->
            <area shape="rect" coords="366,29,422,51" @click="toofficedetail('投影仪')">
            <!-- 幕布 -->
            <area shape="rect" coords="569,54,625,76" @click="toofficedetail('幕布')">
            <!-- 垃圾桶 -->
            <area shape="rect" coords="49,380,105,402" @click="toofficedetail('垃圾桶')">
            <!-- 办公椅 -->
            <area shape="rect" coords="121,352,177,374" @click="toofficedetail('办公椅')">
            <!-- 会议桌 -->
            <area shape="rect" coords="214,318,280,341" @click="toofficedetail('会议桌')">
            <!-- 办公文具 -->
            <area shape="rect" coords="302,325,368,347" @click="toofficedetail('办公文具')">
            <!-- 会议设备 -->
            <area shape="rect" coords="444,315,509,337" @click="toofficedetail('会议设备')">
            <!-- 纸杯 -->
            <area shape="rect" coords="525,293,581,315" @click="toofficedetail('纸杯')">
          </map>
        </div>

        <ul>
          <el-skeleton style="width: 100%" :loading="firstloading">
            <template slot="template">
              <li v-for="item in 5" :key="item">
                <div class="goods_pic">
                  <el-skeleton-item variant="text" style="width: 100%;height:100%;" />
                </div>
                <div class="goods_des">
                  <div class="goods_des_title">
                    <el-skeleton-item variant="text" style="width: 100%;height:40px;" />
                  </div>
                  <div class="goods_des_money">
                    <el-skeleton-item variant="text" style="width: 100%;height:20px;" />
                  </div>
                </div>
              </li>
            </template>

            <template>
              <li v-for="item in huiyi_list" :key="item.id">
                <div class="goods_pic" :title="item.title" @click="togooddetail(item.good_sn)">
                  <el-image :src="item.img_url" fit="cover" lazy></el-image>
                </div>
                <div class="goods_des">
                  <div class="goods_des_title" :title="item.title" @click="togooddetail(item.good_sn)">{{item.title}}</div>
                  <div class="goods_des_money">￥{{item.price}}</div>
                </div>
              </li>
            </template>
          </el-skeleton>
        </ul>
        <section>
          <div @click="toofficedetail('会议室')" class="fontall">
            <div>查</div>
            <div>看</div>
            <div>更</div>
            <div class="duo">多</div>
            <i class="iconfont">&#xe6ac;</i>
          </div>
        </section>
      </div>
    </div>

    <!-- 经理办公室 -->
    <div class="office">
      <header>
        <span>经理办公室</span>
      </header>
      <div class="office_content">
        <div class="pic">
          <img src="/pc/office3.jpg" usemap="#Mapb" alt="HTTP 404,file not found" border="0" height="100%" width="100%">
          <map name="Mapb" id="Mapb">
            <!-- 书柜 宽56高22-->
            <area shape="rect" coords="513,61,569,83" @click="toofficedetail('书柜')">
            <!-- 耗材 -->
            <area shape="rect" coords="268,234,324,256" @click="toofficedetail('耗材')">
            <!-- 复印机 -->
            <area shape="rect" coords="426,223,482,245" @click="toofficedetail('复印机')">
            <!-- 保密柜 -->
            <area shape="rect" coords="21,321,77,343" @click="toofficedetail('保密柜')">
            <!-- 办公椅 -->
            <area shape="rect" coords="182,320,238,342" @click="toofficedetail('办公椅')">
            <!-- 净化机 -->
            <area shape="rect" coords="360,331,416,353" @click="toofficedetail('净化机')">
            <!-- 碎纸机 -->
            <area shape="rect" coords="593,354,649,376" @click="toofficedetail('碎纸机')">
          </map>
        </div>
        <ul>
          <el-skeleton style="width: 100%" :loading="secondloading">
            <template slot="template">
              <li v-for="item in 5" :key="item">
                <div class="goods_pic">
                  <el-skeleton-item variant="text" style="width: 100%;height:100%;" />
                </div>
                <div class="goods_des">
                  <div class="goods_des_title">
                    <el-skeleton-item variant="text" style="width: 100%;height:40px;" />
                  </div>
                  <div class="goods_des_money">
                    <el-skeleton-item variant="text" style="width: 100%;height:20px;" />
                  </div>
                </div>
              </li>
            </template>

            <template>
              <li v-for="item in jingli_list" :key="item.id">
                <div class="goods_pic" :title="item.title" @click="togooddetail(item.good_sn)">
                  <el-image :src="item.img_url" fit="cover" lazy></el-image>
                </div>
                <div class="goods_des">
                  <div class="goods_des_title" :title="item.title" @click="togooddetail(item.good_sn)">{{item.title}}</div>
                  <div class="goods_des_money">￥{{item.price}}</div>
                </div>
              </li>
            </template>
          </el-skeleton>

        </ul>
        <section>
          <div @click="toofficedetail('经理办公室')" class="fontall">
            <div>查</div>
            <div>看</div>
            <div>更</div>
            <div class="duo">多</div>
            <i class="iconfont">&#xe6ac;</i>
          </div>
        </section>
      </div>
    </div>

    <!-- 财务室 -->
    <div class="office">
      <header>
        <span>财务室</span>
      </header>
      <div class="office_content">
        <div class="pic">
          <img src="/pc/office2.jpg" usemap="#Mapc" alt="HTTP 404,file not found" border="0" height="100%" width="100%">
          <map name="Mapc" id="Mapc">
            <!-- 铁皮柜 宽56高22-->
            <area shape="rect" coords="80,35,136,57" @click="toofficedetail('铁皮柜')">
            <!-- 保密柜 -->
            <area shape="rect" coords="52,191,108,213" @click="toofficedetail('保密柜')">
            <!-- 裁切机 -->
            <area shape="rect" coords="353,193,409,215" @click="toofficedetail('裁切机')">
            <!-- 电话机 -->
            <area shape="rect" coords="404,217,460,239" @click="toofficedetail('电话机')">
            <!-- 碎纸机 -->
            <area shape="rect" coords="294,339,350,361" @click="toofficedetail('碎纸机')">
            <!-- 一体机 -->
            <area shape="rect" coords="521,92,577,114" @click="toofficedetail('一体机')">
            <!-- 装订机 -->
            <area shape="rect" coords="655,82,711,104" @click="toofficedetail('装订机')">
            <!-- 点钞机 -->
            <area shape="rect" coords="572,157,628,179" @click="toofficedetail('点钞机')">
            <!-- 档案袋 -->
            <area shape="rect" coords="637,172,693,194" @click="toofficedetail('档案袋')">
            <!-- 办公文具 -->
            <area shape="rect" coords="517,244,583,266" @click="toofficedetail('办公文具')">
            <!-- 办公椅 -->
            <area shape="rect" coords="692,327,748,349" @click="toofficedetail('办公椅')">
          </map>
        </div>
        <ul>
          <el-skeleton style="width: 100%" :loading="thirdloading">
            <template slot="template">
              <li v-for="item in 5" :key="item">
                <div class="goods_pic">
                  <el-skeleton-item variant="text" style="width: 100%;height:100%;" />
                </div>
                <div class="goods_des">
                  <div class="goods_des_title">
                    <el-skeleton-item variant="text" style="width: 100%;height:40px;" />
                  </div>
                  <div class="goods_des_money">
                    <el-skeleton-item variant="text" style="width: 100%;height:20px;" />
                  </div>
                </div>
              </li>
            </template>

            <template>
              <li v-for="item in caiwu_list" :key="item.id">
                <div class="goods_pic" :title="item.title" @click="togooddetail(item.good_sn)">
                  <el-image :src="item.img_url" fit="cover" lazy></el-image>
                </div>
                <div class="goods_des">
                  <div class="goods_des_title" :title="item.title" @click="togooddetail(item.good_sn)">{{item.title}}</div>
                  <div class="goods_des_money">￥{{item.price}}</div>
                </div>
              </li>
            </template>
          </el-skeleton>
        </ul>
        <section>
          <div @click="toofficedetail('财务室')" class="fontall">
            <div>查</div>
            <div>看</div>
            <div>更</div>
            <div class="duo">多</div>
            <i class="iconfont">&#xe6ac;</i>
          </div>
        </section>
      </div>
    </div>

    <!-- 办公室 -->
    <div class="office">
      <header>
        <span>办公室</span>
      </header>
      <div class="office_content">
        <div class="pic">
          <img src="/pc/office1.jpg" usemap="#Mapd" alt="HTTP 404,file not found" border="0" height="100%" width="100%">
          <map name="Mapd" id="Mapd">
            <!-- 幕布 宽56高22-->
            <area shape="rect" coords="164,32,220,54" @click="toofficedetail('幕布')">
            <!-- 书柜 -->
            <area shape="rect" coords="305,77,361,99" @click="toofficedetail('书柜')">
            <!-- 铁皮柜 -->
            <area shape="rect" coords="639,129,695,151" @click="toofficedetail('铁皮柜')">
            <!-- 保密柜 -->
            <area shape="rect" coords="552,218,608,240" @click="toofficedetail('保密柜')">
            <!-- 办公椅 -->
            <area shape="rect" coords="598,258,654,280" @click="toofficedetail('办公椅')">
            <!-- 碎纸机 -->
            <area shape="rect" coords="112,405,168,427" @click="toofficedetail('碎纸机')">
            <!-- 投影仪 -->
            <area shape="rect" coords="391,283,447,305" @click="toofficedetail('投影仪')">
            <!-- 笔记本 -->
            <area shape="rect" coords="514,280,570,302" @click="toofficedetail('笔记本')">
            <!-- 办公工具 -->
            <area shape="rect" coords="642,309,705,331" @click="toofficedetail('办公工具')">
            <!-- 打印机 -->
            <area shape="rect" coords="688,271,752,293" @click="toofficedetail('打印机')">
            <!-- 电话机 -->
            <area shape="rect" coords="732,296,788,318" @click="toofficedetail('电话机')">
          </map>
        </div>
        <ul>
          <el-skeleton style="width: 100%" :loading="fourthloading">
            <template slot="template">
              <li v-for="item in 5" :key="item">
                <div class="goods_pic">
                  <el-skeleton-item variant="text" style="width: 100%;height:100%;" />
                </div>
                <div class="goods_des">
                  <div class="goods_des_title">
                    <el-skeleton-item variant="text" style="width: 100%;height:40px;" />
                  </div>
                  <div class="goods_des_money">
                    <el-skeleton-item variant="text" style="width: 100%;height:20px;" />
                  </div>
                </div>
              </li>
            </template>

            <template>
              <li v-for="item in bangong_list" :key="item.id">
                <div class="goods_pic" :title="item.title" @click="togooddetail(item.good_sn)">
                  <el-image :src="item.img_url" fit="cover" lazy></el-image>
                </div>
                <div class="goods_des">
                  <div class="goods_des_title" :title="item.title" @click="togooddetail(item.good_sn)">{{item.title}}</div>
                  <div class="goods_des_money">￥{{item.price}}</div>
                </div>
              </li>
            </template>
          </el-skeleton>
        </ul>
        <section>
          <div @click="toofficedetail('办公室')" class="fontall">
            <div>查</div>
            <div>看</div>
            <div>更</div>
            <div class="duo">多</div>
            <i class="iconfont">&#xe6ac;</i>
          </div>
        </section>
      </div>
    </div>

    <!-- vue 回到顶部 -->
    <el-backtop>
      <div class="iconfont">&#xe735;</div>
    </el-backtop>

    <!-- 底部 -->
    <ShopFoot></ShopFoot>
  </div>
</template>

<script>
import ShopTop from "@/components/head.vue";
import CompanyHead from "@/views/common/companyhead.vue";
import ShopFoot from "@/components/shop_foot.vue";
export default {
  name: "smwebsite",
  data() {
    return {
      firstloading: true,
      secondloading: true,
      thirdloading: true,
      fourthloading: true,
      fadeshow: false,
      huiyi_list: [],
      jingli_list: [],
      caiwu_list: [],
      bangong_list: [],
      iscompany: "",
    }
  },
  components: { ShopTop, CompanyHead, ShopFoot },
  created() {
    this.iscompany = this.$route.path.startsWith("/company")
    this.getofficework_info();
  },
  methods: {
    // 场景办公各数据获取
    getofficework_info() {
      this.$get(this.$api.homeSearchGoods, { keyword: "会议室", page: 1, limit: 5 }).then(res => {
        console.log(res)
        this.firstloading = false;
        this.huiyi_list = res.data;
      })
      this.$get(this.$api.homeSearchGoods, { keyword: "经理办公室", page: 1, limit: 5 }).then(res => {
        this.secondloading = false;
        this.jingli_list = res.data;
      })
      this.$get(this.$api.homeSearchGoods, { keyword: "财务室", page: 1, limit: 5 }).then(res => {
        this.thirdloading = false;
        this.caiwu_list = res.data;
      })
      this.$get(this.$api.homeSearchGoods, { keyword: "办公室", page: 1, limit: 5 }).then(res => {
        this.fourthloading = false;
        this.bangong_list = res.data;
      })
    },
    // 跳转到搜索页
    toofficedetail(val) {
      let ifcompany = this.$route.name.startsWith("company")
      let newUrl = "";
      ifcompany ? newUrl = this.$router.resolve({ path: '/company/goodssearch', query: { keyword: val } }) : newUrl = this.$router.resolve({ path: '/goodssearch', query: { keyword: val } });
      window.open(newUrl.href, "_blank")
    },
    // 跳转到详细页
    togooddetail(id) {
      let ifcompany = this.$route.name.startsWith("company")
      let newUrl = "";
      ifcompany ? newUrl = this.$router.resolve({ path: "/company/goodsdetail/" + id }) : newUrl = this.$router.resolve({ path: "/goodsdetail/" + id });
      window.open(newUrl.href, "_blank")
    }
  },

}
</script>

<style lang="scss" scoped>
area {
  cursor: pointer;
}
.office {
  width: 1200px;
  margin: 50px auto;
}
header {
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  color: $main_color;
  border-bottom: 3px solid $main_color;
  span {
    padding: 0 10px;
    border: 2px solid $main_color;
    border-bottom: none;
  }
}
.office_content {
  display: flex;
  .pic {
    width: 800px;
    height: 500px;
  }
  li {
    display: flex;
    width: 300px;
    padding: 10px 0;
    border-bottom: 2px solid #f1f1f1;
    .goods_pic {
      width: 70px;
      height: 80px;
      margin: 0 15px;
      flex-shrink: 0;
      cursor: pointer;
    }
    .goods_des {
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods_des_title {
        font-size: 13px;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        font-weight: 700;
        color: #666;
        cursor: pointer;
      }
      .goods_des_title:hover {
        color: $main_color;
      }
      .goods_des_money {
        color: $main_color;
      }
    }
  }
  li:nth-last-child(1) {
    border-bottom: none;
  }
  section {
    margin-left: 50px;
    font-size: 12px;
    line-height: 18px;
    .fontall {
      background: $main_color;
      color: #fff;
      cursor: pointer;
      padding: 10px;
    }
    .fontall:hover {
      opacity: 0.9;
    }
    .iconfont {
      font-size: 12px;
    }
    .duo {
      padding-bottom: 5px;
    }
  }
}
</style>

