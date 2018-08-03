<template>
  <div class="nav" id="nav">
    <!-- <el-row class="tac">
      <el-menu
        default-active="2"
        router="true"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#232B2D"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>订单首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">订单列表</el-menu-item>
            <el-menu-item index="1-2">冻参谋导入</el-menu-item>
            <el-menu-item index="1-3">手动加单</el-menu-item>
            <el-menu-item index="1-4">订单导出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>采购首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">采购页面</el-menu-item>
            <el-menu-item index="2-2">供应商修改页面</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>收货首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">收货单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>销售数据</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">销售单打印</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
          <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>物流配送单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">发送物流单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-row> -->

    <el-menu
        :default-active="defaultCheck"
        class="el-menu-vertical-demo"
        background-color="#232B2D"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router=true
      >
        <el-submenu v-for="(routeList, index) in routeLists" :key="index" :index="routeList.index">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{routeList.name}}</span>
            </template>
            <el-menu-item v-for='(child) in routeList.childs' :index="child.path" :key="child.index">
                <i class="el-icon-document  "></i>
                <span slot="title">{{child.name}}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
        routeLists: [
                { 
                    index:"1",  
                    name:"订单首页",
                    childs:[
                        {index:"1-1",  name:"订单列表" ,path:"/orderList"},
                        {index:"1-2",  name:"冻参谋导入",path:"/otherImport"},
                        // {index:"1-3",  name:"手动加单",path:"/orderHandAdd"},
                        // {index:"1-4",  name:"订单导出",path:"/orderExport"},
                    ]
                },
                { 
                    index:"2",  
                    name:"采购首页",
                    childs:[
                        {index:"2-1",  name:"采购页面" ,path:"/PurchaseIndex"},
                        // {index:"2-2",  name:"供应商修改页面",path:"/supplierRevise"}
                    ]
                },
                { 
                    index:"3",  
                    name:"收货首页",
                    childs:[
                        {index:"3-1",  name:"收货单列表" ,path:"/collectGoodsIndex"}
                    ]
                },
                { 
                    index:"4",  
                    name:"销售数据",
                    childs:[
                        {index:"4-1",  name:"销售单打印" ,path:"/printSaleData"}
                    ]
                },
                { 
                    index:"5",  
                    name:"收款退货",
                    childs:[
                        {index:"5-1",  name:"收款退货" ,path:"/saleReturn"},
                        {index:"5-2",  name:"退货处理" ,path:"/returnHandle"}
                    ]
                },
                 { 
                    index:"6",  
                    name:"供应商退货",
                    childs:[
                        {index:"6-1",  name:"供应商退货" ,path:"/sellerPayment"}
                    ]
                }
                // ,{ 
                //     index:"5",  
                //     name:"物流配送单",
                //     childs:[
                //         {index:"5-1",  name:"发送物流单" ,path:"/logisticsed"}
                //     ]
                // }
        ]
    }
  },
  computed:{
    //   根据路由得到默认选中项
      defaultCheck(){
          let i =this.$route.path=="/"?"/orderList":this.$route.path
          return i
      }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// 左侧导航栏
  #nav{
    height: 100%;
    background-color: #313540;
    .el-menu{
        border-right: 0!important;
      }
    .el-submenu{
      .el-menu-item-group__title{
        padding-top: 0px;
      }
    }
  }
  
</style>
