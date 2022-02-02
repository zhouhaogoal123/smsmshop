<template>
    <div class="user_content_blcok">
        <div class="user_content_blcok_title" style="position: relative;">
            评论列表
        </div>
        <div class="user_content_blcok_line"></div>

        <div class="user_content_blcok_comment">
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column prop="goodsdetail" label="商品详情">
                    <template slot-scope="scope">
                        <div class="goodsdetail">
                            <div class="pic" @click="todetail(scope.row.good_sn)">
                                <el-image :src="scope.row.img_url" fit="fit"></el-image>
                            </div>
                            <div class="title" @click="todetail(scope.row.good_sn)">{{scope.row.title}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsdoit" label="评论时间" width="180">
                    <template slot-scope="scope">
                        <div class="comment_time">{{scope.row.created_at}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsstatus" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="seedetail(scope.row)" type="text" size="small">查看评价</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="home_fy_block" style="margin-top:40px;">
                <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_data" :page-size="page_size" :current-page="current_page"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            total_data: 0,   //总条数
            page_size: 10,   //每页条数
            current_page: 1, //当前页
            tableData: [],   //评论列表
        };
    },
    methods: {
        //获取当前用户评论列表
        get_comment_list: function () {
            let token = localStorage.getItem("token")
            this.$get("comment/user_list", { token, page: this.current_page }).then(res => {
                console.log(res)
                if (res.code == 200) {
                    window.scrollTo(0,0);
                    this.tableData = res.data;
                    this.tableData.forEach(item => {
                        item.created_at = this.$filterTime(item.created_at)
                    })
                    this.total_data = res.pagination.total
                } else {
                    // this.$message.error(res.message)
                }

            })
        },
        // 页数改变事件
        current_change(e) {
            this.current_page = e;
            this.get_comment_list();
        },
        // 查看评论详情
        seedetail(info) {
            if (this.$route.path.startsWith("/company")) {
                this.$router.push({ name: "com_seecomment", query: { commentid: info.id, title: info.title, goodpic: info.img_url, good_sn: info.good_sn, created_at: info.created_at } })
            } else {
                this.$router.push({ name: "seecomment", query: { commentid: info.id, title: info.title, goodpic: info.img_url, good_sn: info.good_sn, created_at: info.created_at } })
            }
        },
        //跳转商品详细页
        todetail(id) {
            if (this.$route.path.startsWith("/company")) {
                this.$router.push("/company/goodsdetail/" + id)
            } else {
                this.$router.push("/goodsdetail/" + id)
            }
        }
    },
    created() {
        this.get_comment_list();
    },
};
</script>
<style lang="scss" scoped>
.user_content_blcok_comment {
  .goodsdetail {
    display: flex;
    .pic {
      width: 60px;
      height: 60px;
      cursor: pointer;
    }
    .title {
      width: 450px;
      padding-left: 10px;
      font: 12px/20px "微软雅黑";
      height: 40px;
      word-break: break-all;
      margin-top: 10px;
      overflow: hidden;
      color: #666;
    }
    .title:hover {
      color: $main_color;
      cursor: pointer;
    }
  }
  .comment_time {
    font: 12px/20px "微软雅黑";
    color: #999 !important;
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

  /deep/.el-button--text {
    color: #333;
  }
  /deep/.el-button--text:hover {
    color: $main_color;
  }
}
</style>