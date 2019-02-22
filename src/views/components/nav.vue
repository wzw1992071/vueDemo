<template>
  <div class="nav" id="nav">
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
                      {index:"1-1",  name:"冻参谋导入",path:"/otherImport"},
                      {index:"1-2",  name:"订单列表" ,path:"/orderList"},
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
                    name:"供应商付款",
                    childs:[
                        {index:"6-1",  name:"供应商付款" ,path:"/sellerPayment"}
                    ]
                }
                ,{ 
                    index:"7",  
                    name:"收货人管理",
                    childs:[
                        {index:"7-1",  name:"收货人列表" ,path:"/consigneeList"}
                    ]
                },
                { 
                    index:"8",  
                    name:"报表数据",
                    childs:[
                        {index:"8-1",  name:"每日订单" ,path:"/dayReport"},
                        {index:"8-2",  name:"资金报表" ,path:"/moneyReport"},
                        {index:"8-3",  name:"报表填写" ,path:"/fillInReport"}
                    ]
                },
                { 
                    index:"9",  
                    name:"库存管理",
                    childs:[
                        {index:"9-1",  name:"库存列表" ,path:"/stockList"},
                       
                    ]
                },
                 { 
                    index:"10",  
                    name:"订单地图",
                    childs:[
                        {index:"10-1",  name:"订单地图" ,path:"/orderShow"},
                       
                    ]
                }
        ]
    }
  },
  computed:{
    //   根据路由得到默认选中项
      defaultCheck(){
          let i =this.$route.path=="/"?"/otherImport":this.$route.path
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
