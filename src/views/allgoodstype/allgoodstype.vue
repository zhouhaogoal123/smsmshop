<template>
  <AllgoodstypeComp>
    <template v-slot:myhead>
      <ShopTop  ></ShopTop>
    </template>
  </AllgoodstypeComp>
</template>

<script>
import AllgoodstypeComp from '@/views/allgoodstype/allgoodstype_comp.vue';
import ShopTop from '@/components/head.vue';
export default {
  components: { AllgoodstypeComp, ShopTop }
}
</script>