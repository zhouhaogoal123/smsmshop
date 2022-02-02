<template>
    <!-- 销售排行 -->
    <div class="store_sale">
        <div class="store_info_title">
            <div class="store_info_name">销售排行</div>
        </div>
        <!-- <div class="store_sale_list" v-if="list.length>0"> -->
        <div class="store_sale_list" v-if="1>0">
            <ul>
                <li v-for="item in 5" :key="item">
                    <!-- <router-link :to="'/goods/info/'+v.id"> -->
                    <div class="sale_list_num">{{item}}</div>
                    <dl>
                        <dt>
                            <el-image src="/pc/hot.jpg" alt="" lazy></el-image>
                        </dt>
                        <dd class="sale_title">格力空调</dd>
                        <dd class="sale_price">￥999.00</dd>
                        <dd>已售出
                            <span style="font-size:12px" class="main_color">9999</span> 件</dd>
                    </dl>
                    <!-- </router-link> -->
                </li>
            </ul>
        </div>
        <div v-else style="font-size:12px;text-align:center;line-height:40px;">
            无任何产品~
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        user_id: {
            type: String,
            default: "0",
        }
    },
    data() {
        return {
            list: [],
        };
    },
    watch: {
        user_id: function () {
            this.get_sale_list();
        },
    },
    computed: {},
    methods: {
        get_sale_list: function () {
            if (this.user_id > 0) {
                this.$post(this.$api.homeGetSaleList, { user_id: this.user_id }).then(res => {
                    this.list = res.data;
                });
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.store_sale {
  border: 1px solid #efefef;
  margin-top: 20px;
  .store_info_title {
    background: #fafafa;
    padding: 5px 10px;
    border-bottom: 1px solid #efefef;
    .store_info_name {
      line-height: 24px;
      font-size: 14px;
      width: 150px;
      height: 24px;
      overflow: hidden;
    }
  }
  .store_sale_list {
    ul li {
      border-bottom: 1px solid #efefef;
      position: relative;
      .sale_list_num {
        width: 15px;
        height: 15px;
        position: absolute;
        background: $main_color;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        font-size: 12px;
        line-height: 15px;
        top: -16px;
        left: 2px;
      }
      dl {
        margin: 20px 10px;
        dt {
          width: 80px;
          height: 80px;
          float: left;
          margin-right: 10px;
          img {
            width: 80px;
            height: 80px;
          }
        }
        dd {
          font-size: 14px;
          color: #666;
        }
        dd.sale_price {
          margin-top: 17px;
          color: $main_color;
          margin-bottom: 5px;
        }
        dd.sale_title {
          height: 14px;
          overflow: hidden;
          line-height: 14px;
          padding-bottom: 6px;
        }
      }
    }
    ul li dl:after {
      content: "";
      clear: both;
      display: block;
    }
    ul li:last-child {
      border-bottom: none;
    }
    ul li:nth-child(4),
    ul li:nth-child(5),
    ul li:nth-child(6) {
      .sale_list_num {
        background: #333;
      }
    }
  }
}
.store_sale:after {
  content: "";
  clear: both;
  display: block;
}
</style>