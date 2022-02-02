<template>
  <div>
    <div class="title">定制流程</div>
    <div style="height: 900px;" class="mysteps">
      <el-steps direction="vertical" :active="-1">
        <el-step title="提出需求（客服沟通）" description="客服部接到您的采购定制要求，请您说出您的具体要求，具体用的场合，送给的主体人群、大致的年龄、具体的数量、工期时间、大致的预算等等细节情况并告知我们您的具体单位及联系方式以便我们第一时间给您回复。"></el-step>
        <el-step title="推荐产品" description="我们会在您能接受的最短的时间内将我们的推荐发给您或者送到您的面前，并时刻为您准备更多的选择，直到您选择出满意的产品。"></el-step>
        <el-step title="提供素材" description="您在三目商城选购生成订单后，我们的客服会第一时间与您联系，与您沟通您具体的定制需求。例如logo摆放的位置、大小、颜色、印刷方式，以及需要印制在礼品上的内容等，您需要提供您公司logo的AI、JPG、PNG等文件格式。"></el-step>
        <el-step title="确认设计" description="三目将根据您的具体需求及您提供的素材，进行专业的设计，制作产品效果图给到您确认，反复沟通修改意见，最终达到您满意的定制效果。"></el-step>
        <el-step title="样品打样" description="确认效果图后，如果您需要根据效果图制作实物样品。在您签订样品制作合同及支付打样费用后，我们将在预计的时间内制作样品并快递给您。如果您不需要根据效果图制作实物样品。可以选择直接签订合同生产大货。"></el-step>
        <el-step title="签订合同" description="在您确认实物样品或者选择直接签订合同之后，进入签订合同状态。合同内容包括大货的数量、总金额、预付款和尾款金额、交货地址等，并会有详细的权责约定，保证您的权益。"></el-step>
        <el-step title="支付预付款" description="合同签署之后，根据合同约定，您需要支付预付款到我们提供的账号上，并提供汇款凭证（银行底单、网银转账截图等），我们即刻安排大货生产。"></el-step>
        <el-step title="生产下单" description="合同确认后我们会根据约定的时间安排生产批量的产品，并在生产的过程中适时客户通告您生产进展情况，做到让您放心。"></el-step>
        <el-step title="支付尾款" description="货物生产完成后。您对大货物照片确认后，您需要支付尾款，并提供汇款凭证（银行底单、网银转账截图等）。我们即刻安排快递或物流发货，送到合同上指定的交货地址。"></el-step>
        <el-step title="确认收货" description="收到大货物后，请您确认收货。结束本次交易。"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px dashed #999;
  font-weight: 700;
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}
.mysteps {
 /deep/.el-step__head.is-wait{
   color: #666;
   border-color:#666;
 }
 /deep/.el-step__line{
   background-color: #666;
 }
 /deep/.el-step__title.is-wait{
   color: #555;
 }
 /deep/.el-step__description.is-wait{
   color: #999;
 }
}
</style>
