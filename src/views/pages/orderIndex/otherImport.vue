// 冻参谋导入页面
<template>
  <div class="mainBox">
      {{msg}}
  </div>
</template>

<script>
export default {
  name: 'OtherImport',
  data () {
    return {
      msg: '这是冻参谋导入页面'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .mainBox{
    height: 100%;
    background: #fff;
  }
</style>