<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative;">
      <div>发票详细</div>
      <el-button type="primary" size="mini" @click="goback">返回</el-button>
    </div>
    <div class="user_content_blcok_line"></div>

    <div class="user_content_blcok_content">
      <!-- 订单信息 -->
      <div class="tablestyle">
        <div class="content_head">
          <el-row>
            <el-col :span=24>订单信息</el-col>
          </el-row>
        </div>
        <div class="content_center">
          <el-row>
            <el-col :span=4>订单状态</el-col>
            <el-col :span=20>{{invoiceinfo.status_text||"..."}}</el-col>
          </el-row>
          <el-row>
            <el-col :span=4>订单编号</el-col>
            <el-col :span=20>{{invoiceinfo.order_sn||"..."}}</el-col>
          </el-row>
          <el-row>
            <el-col :span=4>下单时间</el-col>
            <el-col :span=20>{{invoiceinfo.created_at||"..."}}</el-col>
          </el-row>

        </div>
      </div>

      <!-- 发票信息 -->
      <div class="tablestyle">
        <div class="content_head">
          <el-row>
            <el-col :span=24>发票信息</el-col>
          </el-row>
        </div>
        <div class="content_center">
          <el-row>
            <el-col :span=4>发票状态</el-col>
            <el-col :span=20 style="font-weight:700;" class="success_font" v-if="invoiceinfo.invoices.length>0">已开票</el-col>
            <el-col :span=20 style="font-weight:700;" class="main_color" v-else>待开票</el-col>
          </el-row>
          <el-row>
            <el-col :span=4>发票类型</el-col>
            <el-col :span=20>{{invoiceinfo.type=="2"?"增值税专用发票":"普通发票"}}</el-col>
          </el-row>
          <el-row>
            <el-col :span=4>发票材质</el-col>
            <el-col :span=20>{{invoiceinfo.paper_text||"..."}}</el-col>
          </el-row>
          <el-row>
            <el-col :span=4>发票内容</el-col>
            <el-col :span=20>商品明细</el-col>
          </el-row>
          <el-row>
            <el-col :span=4>发票抬头</el-col>
            <el-col :span=20>{{invoiceinfo.title||"..."}}</el-col>
          </el-row>
        </div>
      </div>

      <!-- 收票信息 -->
      <div class="tablestyle" v-if="invoiceinfo.paper==1">
        <div class="content_head">
          <el-row>
            <el-col :span=24>收票信息</el-col>
          </el-row>
        </div>
        <div class="content_center">
          <el-row>
            <el-col :span=4>收票人</el-col>
            <el-col :span=20>{{invoiceinfo.name||"..."}}</el-col>
          </el-row>
          <el-row>
            <el-col :span=4>联系电话</el-col>
            <el-col :span=20>{{invoiceinfo.phone||"..."}}</el-col>
          </el-row>
          <el-row>
            <el-col :span=4>详细地址</el-col>
            <el-col :span=20>{{address||"..."}}</el-col>
          </el-row>
        </div>
      </div>

      <!-- 已开发票的收据 -->
      <div class="tablestyle newtable" v-if="invoiceinfo.invoices.length>0">
        <div class="content_head">
          <el-row>
            <el-col :span=8>发票代码</el-col>
            <el-col :span=8>发票号码</el-col>
            <el-col :span=8>下载电子普通发票</el-col>
          </el-row>
        </div>
        <div class="content_center">
          <el-row v-for="item in invoiceinfo.invoices" :key="item.id">
            <el-col :span=8>{{item.invoice_no}}</el-col>
            <el-col :span=8>{{item.invoice_code}}</el-col>
            <el-col :span=8>
              <a :href="item.file_url" download="invoice.jpg" class="showinvoice" target="_blank">
                <!-- <a href="https://storage.jd.com/fm-eicore/051002000611-32051992.pdf?Expires=2580358163&AccessKey=bfac05320eaf11cc80cf1823e4fb87d98523fc94&Signature=Wz8sCZ4EF4fkik5EzI0ETDqy%2Fnk%3D" download="invoice.jpg" class="showinvoice" target="_blank"> -->
                <i class="el-icon-download"></i> 下载发票</a>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderid: "", //订单号
      invoiceinfo: { //发票信息
        invoices: [] //避免数据渲染时，没有这个数据，导致获取数组长度报错
      },
      address: "",
    }
  },
  created() {
    this.orderid = this.$route.query.order_id;
    this.getinvoicedetail();
  },
  methods: {
    // 获取发票详情
    getinvoicedetail() {
      let token = localStorage.getItem("token");
      this.$get("invoice/show", { token: token, order_id: this.orderid }).then(res => {
        console.log(res)
        // res.data.created_at = res.data.created_at.split("");
        let timearr = res.data.created_at.split("T");
        let timearr2 = timearr[1].split(".");
        let newtime = timearr[0] + " " + timearr2[0];
        res.data.created_at = newtime;
        let { data } = res;
        this.invoiceinfo = data;
        if (!data.district) {
          data.district = ""
        } else if (!data.street) {
          data.street = ""
        } else if (!data.address) {
          data.address = ""
        }
        this.address = (data.province + data.city + data.district + data.street + "\xa0\xa0\xa0" + data.address) || "..."
      })
    },
    // 下载发票
    downloadinvoice(picurl) {
      let newUrl = this.$router.resolve({ name: "invoicedownload", query: { picurl } });
      window.open(newUrl.href, "_blank");
    },
    // 返回上页
    goback() {
      this.$router.go(-1);
    }
  },
}
</script>

<style lang="scss" scoped>
.user_content_blcok_title {
  display: flex;
  justify-content: space-between;
}
.user_content_blcok_content {
  .tablestyle {
    border-top: 1px solid #d8d8d8;
    border-left: 1px solid #d8d8d8;
    font-size: 12px;
    color: #666;
    margin-bottom: 50px;
    .el-col {
      padding: 0 10px;
      border-right: 1px solid #d8d8d8;
      border-bottom: 1px solid #d8d8d8;
    }
    .content_head {
      line-height: 30px;
      background: #f2f2f2;
      color: #333;
      font-weight: 700;
    }
    .content_center {
      line-height: 40px;
    }
  }
  .newtable {
    .content_head {
      font-weight: 400;
    }
    .content_center {
      line-height: 80px;
      .showinvoice {
        cursor: pointer;
      }
      .showinvoice:hover {
        color: $main_color;
      }
    }
  }
}
</style>
