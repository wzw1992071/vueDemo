// 导出订单页面
<template>
  <div class="mainBox">
    <div class="box">
      <MoreChoice :info="choiseData"></MoreChoice>
    </div>
      
  </div>
</template>

<script>
import MoreChoice from '@components/moreChoice'

export default {
  name: 'OrderExport',
  components: {
    MoreChoice
  },
  data () {
    return {
      choiseData:{
      }
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .mainBox{
    height: 100%;
    background: #fff;
    .box{
      width: 200px
    }
  }
</style>