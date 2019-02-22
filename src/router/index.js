import Vue from 'vue'
import Router from 'vue-router'


const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',  
      name: 'index',
      component: _import('index'),
      children:[
        // 订单首页路由
        {
          path: 'orderList',
          
          component: _import('pages/orderIndex/orderList')
        },
        {
          path: 'otherImport',
          alias:'/', //重命名，让进来加载默认为orderList
          component: _import('pages/orderIndex/otherImport')
        },
        {
          path: 'orderHandAdd',
          component: _import('pages/orderIndex/orderHandAdd')
        },
        {
          path: 'orderExport',
          component: _import('pages/orderIndex/orderExport')
        },
        // 采购首页路由
        {
          path: 'purchaseIndex',
          component: _import('pages/Purchase/purchaseIndex')
        },
        {
          path: 'supplierRevise',
          component: _import('pages/Purchase/supplierRevise')
        },
        // 收货首页路由
        {
          path: 'collectGoodsIndex',
          component: _import('pages/collectGoods/collectGoodsIndex')
        },
        // 销售首页路由
        {
          path: 'printSaleData',
          component: _import('pages/saleDate/printSaleData')
        },
        // 物流配送单路由
        {
          path: 'logisticsed',
          component: _import('pages/logistics/logisticsed')
        },
        // 销售退款退货页面
        {
          path: 'saleReturn',
          component: _import('pages/saleReturn/saleReturn')
        },
        {
          path: 'returnHandle',
          component: _import('pages/saleReturn/returnHandle')
        },
        // 供应商退货单页面
        {
          path: 'sellerPayment',
          component: _import('pages/sellerPayment/sellerPayment')
        },
        //收货人列表
        {
          path: 'consigneeList',
          component: _import('pages/consigneeManage/consigneeList')
        },
        // 统计日报
        // 每日订单
        {
          path: 'dayReport',
          component: _import('pages/reportData/dayReport')
        },
        // 每日账单
        {
          path: 'moneyReport',
          component: _import('pages/reportData/moneyReport')
        },
        // 报表填写
        {
          path: 'fillInReport',
          component: _import('pages/reportData/fillInReport')
        },
        // 库存列表
        {
          path: 'stockList',
          component: _import('pages/stockManage/stockList')
        },
        // 订单地图显示
        {
          path: 'orderShow',
          component: _import('pages/orderShow/orderShow')
        },
        // 测试页面
        {
          path: 'test',
          component: _import('pages/test/test')
        },
      ]
      
    }
  ]
})
