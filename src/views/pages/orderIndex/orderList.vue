// 订单列表页面
<template>
  <div class="mainBox">
    <!-- 搜索条件 -->
      <div class="searchArea">
        <div>
          <div class="block">
            <el-date-picker
              v-model="searchParam.start_date"
              type="date"
              placeholder="开始日期">
            </el-date-picker>
          </div>
          <div class="line">至</div>
          <div class="block">
            <el-date-picker
              v-model="searchParam.end_date"
              type="date"
              placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="demo-input-suffix">
          <span>客户：</span>  
          <el-input v-model="searchParam.buyer"></el-input>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <div class="btnGuoup">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <!-- 表单 -->
      <div class="tableArea">
        <el-table
          :data="tableData"
          :stripe=true
          height="150"
          border
          align="center"
          >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="order_no"
            label="订单号"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="consign_date"
            label="送货时间"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="buyer_shop_name"
            label="店铺名称"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="buyer_tel"
            label="客户电话"
            min-width="120"
            align="center">
          </el-table-column>
            <el-table-column
            prop="receipt_address"
            label="地址"
            min-width="200"
            align="center">
          </el-table-column>
            <el-table-column
            prop="pay_mode"
            label="付款方式"
            min-width="100"
            align="center">
          </el-table-column>
            <el-table-column
            prop="buy_num"
            label="购买总数"
            min-width="100"
            align="center">
          </el-table-column>
            <el-table-column
            prop="total_amount"
            label="商品金额"
            min-width="100"
            align="center">
          </el-table-column>
            <el-table-column
            prop="receipt_area_code"
            label="配送区域"
            min-width="200"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                width="1200"
                trigger="click">
                <el-table :data="goodsInfo" border>
                  <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                  <el-table-column min-width="150" align="center" property="goods_name" label="品名"></el-table-column>
                  <el-table-column min-width="100" align="center" property="goods_sell_price" label="单价"></el-table-column>
                  <el-table-column min-width="100" align="center" property="buy_num" label="数量"></el-table-column>
                  <el-table-column min-width="100" align="center" property="sell_unit" label="单位"></el-table-column>
                  <el-table-column min-width="150" align="center" property="goods_number" label="商品编号"></el-table-column>
                  <el-table-column min-width="200" align="center" property="seller_shop" label="供应商名称"></el-table-column>
                  <el-table-column min-width="200" align="center" property="seller_tel" label="供应商电话"></el-table-column>
                </el-table>
                <el-button slot="reference" @click.native.prevent="getNowGoods(scope.$index, tableData)">订单详情</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageControl">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="pageChange"
            :total="dataTotal">
          </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data () {
    return {
      // 搜索条件
      searchParam:{
        start_date:'',//开始时间
        end_date:'',//结束时间
        buyer:'',//客户名
        page:'1',//当前页
        size:'10'//每页数量
      },
      dataTotal:50,
      // 下拉框属性
      selectOptions:{
        orderTypes:[
          { value: '0',label: '全部订单'},
          { value: '1',label: '未完成'},
        ]
      },
      // 表格数据
      tableData:[
        {
          "id":1,
          "order_no":"订单编号",
          "consign_date":"送货日期 Y-m-d 如：2016-06-11",
          "buyer_shop_name":"采购商店铺名",
          "buyer_tel":"1234562",
          "receipt_address":"收货地址",
          "pay_mode":"货到付款",
          "buy_num":10,
          "total_amount":1000,
          "receipt_area_code":"Y_2",
          "goods":[
              {
                  "goods_name":"2222",
                  "goods_sell_price":123,
                  "buy_num":1234,
                  "sell_unit":"件",
                  "goods_number":"554214",
                  "seller_shop":"打啊打大大打",
                  "seller_tel":"13502106110"
              },
              {
                  "goods_name":"2313132",
                  "goods_sell_price":13,
                  "buy_num":1234,
                  "sell_unit":"件",
                  "goods_number":"554214",
                  "seller_shop":"大大打",
                  "seller_tel":"13502106110"
              }
          ]
        },
      ],
      // 弹出框订单详情数据
      goodsInfo:[]
    }
  },

  methods:{
    // 请求页面数据
    search(){
      let sendParamStr = JSON.stringify(this.searchParam)
      let sendParam = JSON.parse(sendParamStr)
      for(var i in sendParam ){
        if(!sendParam[i]){
          delete sendParam[i];
        }
      }
      this.$axios.get('/provider/allocate/order/list',sendParam)
      .then(function(r){
        console.log(r)
        if(r.data.length>0){
          // this.tableData=
        }else{

        }
      })
      .catch(function(){
        console.log("获取数据失败")
      })
    },
    // 页面跳转
    pageChange(page){
      this.searchParam.page = page;
      this.search();
    },
    // 获取当前行的订单详情
    getNowGoods(index, rows) {
      this.goodsInfo = rows[index].goods
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .mainBox{
    height: 100%;
    background: #fff;
    .searchArea{
      margin: 0 10px 10px;
      padding: 15px 0;
      display: flex;
      justify-content: flex-start;
      &>div{
        display: flex;
        justify-content: space-between;
        span{
          text-align: right;
          line-height: 42px;
          min-width: 65px;
        }
        .line{
          text-align: center;
          line-height: 42px;
          margin: 0 5px;
          
        }
        
      }
    }
    .btnGuoup{
      display: flex;
      justify-content: flex-end; 
      margin: 0 10px 10px;     
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc
    }
    .tableArea{
      margin: 10px;
    }
    .pageControl{
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>