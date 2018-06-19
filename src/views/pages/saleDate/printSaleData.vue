// 销售数据打印页面
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
          <span>店铺名：</span>  
          <el-input v-model="searchParam.buyer"></el-input>
        </div>
        <!-- <div class="demo-input-suffix">
          <span>商品名：</span>  
          <el-input v-model="searchParam.goods_name"></el-input>
        </div> -->
      </div>
      <!-- 搜索按钮 -->
      <div class="btnGuoup">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <!-- <el-button type="warning" icon="el-icon-printer" @click="print">打印</el-button> -->
          <el-button type="danger" icon="el-icon-printer" @click="morePrint">批量打印</el-button>
      </div>
      <!-- 表单 -->
      <div class="tableArea">
        <el-table
          :data="tableData"
          :stripe=true
          max-height="800"
          border
          align="center"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="order_no"
            label="订单号"
            min-width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="purchases_date"
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
            prop="total_num"
            label="购买总数"
            min-width="100"
            align="center">
          </el-table-column>
            <el-table-column
            prop="total_money"
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
                <el-table :data="goodsInfo" border max-height="500">
                  <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                  <el-table-column min-width="150" align="center" property="goods_name" label="品名"></el-table-column>
                  <el-table-column min-width="100" align="center" property="goods_sell_price" label="单价"></el-table-column>
                  <el-table-column min-width="100" align="center" property="acceptance_num" label="数量"></el-table-column>
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
  name: 'PrintSaleData',
  data () {
    return {
      // 搜索条件
      searchParam:{
        start_date:'',//开始时间
        end_date:'',//结束时间
        buyer:'',//客户名
        goods_name:'',//商品名称
        page:'1',//当前页
        size:'10'//每页数量
      },
      // 下拉框属性
      selectOptions:{
        
      },
      // 表格数据
      tableData:[
      ],
       // 弹出框订单详情数据
      goodsInfo:[],
      // 复选框中的项
      multipleSelection: []
    }
  },
  methods:{
    // 请求页面数据
    search(){
      console.log(1)
      var that= this
      let sendParamStr = JSON.stringify(this.searchParam)
      let sendParam = JSON.parse(sendParamStr)
      if(sendParam.start_date){
        sendParam.start_date=$tools.dateFormat(sendParam.start_date)
      }
      if(sendParam.end_date){
        sendParam.end_date=$tools.dateFormat(sendParam.end_date)
      }
      for(var i in sendParam ){
        if(!sendParam[i]){
          delete sendParam[i];
        }
      }
      this.$axios.get('/provider/purchases/sales/list',{params: sendParam})
      .then(function(r){
        var data = [];
        for(var i = 0;i<r.data.data.orders.length;i++){
          data.push(r.data.data.orders[i].order)
        }
        that.tableData = data
        that.dataTotal = r.data.data.total
      })
      .catch(function(){
        console.log("获取数据失败")
      })
    },
    // 页面改变触发重新搜索
    pageChange(page){
      this.searchParam.page = page;
      this.search();
    },
    // 全选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取当前行的订单详情
    getNowGoods(index, rows) {
      this.goodsInfo = rows[index].goods
    },
    morePrint(){
      console.log(this.multipleSelection)
    },
    
  },
  created(){
    this.search()
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
          min-width: 95px;
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