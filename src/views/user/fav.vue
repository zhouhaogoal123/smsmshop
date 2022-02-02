<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title" style="position: relative;">
            收藏商品
        </div>
        <div class="user_content_blcok_line"></div>

        <div class="user_content_blcok_content">
            <!-- 有记录 -->
            <div v-if="!loading&&favlist.length>0" border>
                <el-table :data="favlist" style="width: 100%">
                    <el-table-column prop="redtime" label="商品信息" width="606">
                        <template v-slot="scope">
                            <div class="good_info">
                                <div class="good_pic" @click="todetailpage(scope.row.good_sn)">
                                    <el-image :src="scope.row.img_url">
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                </div>
                                <div class="good_title" @click="todetailpage(scope.row.good_sn)">{{ scope.row.title }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="redmoney" label="单价" width="150">
                        <template v-slot="scope">
                            ￥{{ scope.row.price }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="redname" label="操作" width="150">
                        <template v-slot="scope">
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row.title,scope.row.obj_id)">移除收藏</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="home_fy_block" style="margin-top:40px;">
                    <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
                </div>
            </div>

            <!-- 没记录 -->
            <div v-if="!loading&&favlist.length==0">
                <div class="empty_head">
                    <el-row>
                        <el-col :span="17" style="padding:0 10px;">商品信息</el-col>
                        <el-col :span="3" style="padding:0 10px;">单价</el-col>
                        <el-col :span="4" style="padding:0 10px;">操作</el-col>
                    </el-row>
                </div>
                <div class="empty_order">
                    <dl>
                        <dt><img src="/pc/not-common-icon.png" alt=""></dt>
                        <dd>主人，您近期还没有添加收藏哟~</dd>
                        <dd class="btn">
                            <router-link :to="iscompany?'/company/home':'/'">前往商城</router-link>
                        </dd>
                    </dl>
                </div>
            </div>

            <!-- loading -->
            <div v-loading="loading" element-loading-custom-class="loadingclass"  element-loading-text="加载中" element-loading-spinner="el-icon-loading"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            favlist: [],        // 收藏列表
            total_data: 0,   // 总条数
            page_size: 20,   // 每页条数
            current_page: 1, // 当前页
            iscompany: "",    // 是公司
            loading:true,
        };
    },
    created() {
        this.get_fav_list();
        this.iscompany = localStorage.getItem("user_iscompany") == "true";
    },
    methods: {
        // 收藏列表
        get_fav_list: function () {
            let token = localStorage.getItem("token");
            this.$get(this.$api.homeFavList, { token: token, page: this.current_page, limit: this.page_size, type: 1 }).then(res => {
                this.loading=false;
                console.log("收藏列表", res)
                if (res.code === 200) {
                    this.total_data = res.pagination.total;
                    this.favlist = res.data;
                }
            })

        },
        // 点击分页按钮
        current_change: function (e) {
            this.current_page = e;
            this.get_fav_list();
        },
        // 跳转到详细页
        todetailpage(id) {
            let newUrl = ""
            if (this.iscompany) {
                newUrl = this.$router.resolve("/company/goodsdetail/" + id);
            } else {
                newUrl = this.$router.resolve("/goodsdetail/" + id);
            }
            window.open(newUrl.href, "_blank")
        },
        // 移除收藏
        del(title, id) {
            let token = localStorage.getItem("token");
            this.$post(this.$api.homeAddRemoveFav, { obj_id: id, title: title, token: token, type: "goods", mode: "del" }).then(res => {
                if (res.code == 200) {
                    this.get_fav_list();
                } else {
                    // return this.$message.error(res.message);
                }
            });
        },
    },

};
</script>
<style lang="scss" scoped>
.user_content_blcok_content {
  /deep/.el-tabs__item {
    font-weight: 700;
    font-size: 16px;
  }
  /deep/.el-tabs__item.is-active {
    color: $main_color;
  }
  /deep/.el-tabs__active-bar {
    background-color: $main_color;
  }
  /deep/.el-tabs__item:hover {
    color: $main_color;
  }
  /deep/.el-table th {
    background-color: #f5f5f5;
  }
  /deep/.el-table tbody tr:hover > td {
    background-color: #ffffff !important;
  }
  /deep/.el-table thead {
    color: #555;
  }

  .el-table {
    font-size: 12px;
    color: #909399;
    /deep/thead {
      font-size: 14px;
    }
  }
  .good_info {
    display: flex;
    .good_pic {
      width: 50px;
      height: 50px;
      margin-right: 5px;
    }
    .good_title {
      color: #666;
      padding: 5px 0;
      line-height: 20px;
      width: 540px;
      height: 50px;
      overflow: hidden;
    }
    .good_pic:hover,
    .good_title:hover {
      cursor: pointer;
      color: $main_color;
    }
  }
}
</style>