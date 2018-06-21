<template>
  <div class="box">
    <el-container>
      <el-header>
        <img class="logo" src="../assets/img/logo.png" alt="">
        <h1 class="header">冻参谋配货系统</h1>
      </el-header>
      <el-container class="fullPage">
        <el-aside width="15%">
          <Nav></Nav>
        </el-aside>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    
    
  
  </div>
</template>

<script>
import '../assets/mod/LodopFuncs.js'
import Nav from './components/nav'
export default {
  name: 'index',
  components: {
     Nav
  },
  data () {
    return {
    }
  },
  beforeCreate () {
    // console.log(1)
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
    // 保存本地打印机设置(暂时写死，没有打印机配置)
    let printConfig = {
        waybillPrinter: 'Microsoft XPS Document Writer',
        tagPrinter: 'Microsoft XPS Document Writer',
        billPrinter: 'Microsoft XPS Document Writer',
        driverPrinter: 'Microsoft XPS Document Writer',
        labelPrinter: 'Microsoft XPS Document Writer'
    };
    localStorage.setItem('print', JSON.stringify(printConfig));
  },
  created(){
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .box{
    height: 100%;
  }
    // 头部样式
  .logo{
    position: absolute;
    left: 40px;
    top: 10px ;
  }
  .el-header{
    line-height:60px;
    padding: 0 80px 0;
    background-color: #38B7F6;
    color: #fff
  }
  // 页面主体样式
  .el-container{
    height: 100%;
    .main-content{
      background: #F5F7F9;
      padding: 12px;
    }
  }
  
</style>