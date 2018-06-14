<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforecreated () {
    // 如果为本地，模拟登陆获取token
    if(window.location.hostname=="localhost"){
      this.$axios.post("/user/login",{
        login_name:"10000000000",
        login_password:"1234567890"
      })
      .then(function(){
        console.log("登陆成功")})
      .catch(function(){
          console.log("登陆失败，请重新登陆")
      })
    }
  }
}
</script>

<style lang="less">

</style>
