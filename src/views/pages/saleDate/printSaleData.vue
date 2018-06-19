// 销售数据打印页面
<template>
  <div class="mainBox">
    <!-- 搜索条件 -->
      <div class="searchArea">
        <div>
          <span>订单类型：</span>
          <el-select v-model="searchParam.orderType" placeholder="请选择">
            <el-option
              v-for="item in selectOptions.orderTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <div class="block">
            <el-date-picker
              v-model="searchParam.startTime"
              type="date"
              placeholder="开始日期">
            </el-date-picker>
          </div>
          <div class="line">至</div>
          <div class="block">
            <el-date-picker
              v-model="searchParam.endTime"
              type="date"
              placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="demo-input-suffix">
          <span>客户：</span>  
          <el-input v-model="searchParam.customerName"></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>商品名：</span>  
          <el-input v-model="searchParam.goodsName"></el-input>
        </div>
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
          ref="multipleTable"
          tooltip-effect="dark"
          :data="tableData"
          :stripe=true
          align="center"
          @selection-change="handleSelectionChange"
          >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
           <el-table-column
            prop="index"
            label="序号"
            align="center"
            width="80">
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
                <el-table :data="goodsInfo" border max-height="500">
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
            :total="50">
          </el-pagination>
      </div>
  </div>
</template>


<script>
import html2canvas from 'html2canvas'
export default {
  name: 'PrintSaleData',
  data () {
    return {
      // 搜索条件
      searchParam:{
        orderType:'',//订单类型
        startTime:'',//开始时间
        endTimeL:'',//结束时间
        customerName:'',//客户名
        goodsName:'',//商品名称
        page:'1',//当前页
        pageSize:'10'//每页数量
      },
      // 下拉框属性
      selectOptions:{
        orderTypes:[
          { value: '0',label: '全部订单'},
          { value: '1',label: '未完成'},
        ]
      },
      // 表格数据
      tableData:[
      ],
      // 复选框中的项
      multipleSelection: []
    }
  },
  methods:{
    // 请求页面数据
    search(){
      this.$axios.get('/bi/activity/hau',{
        params: {
          start_date: "2018-06-11",
          end_date: "2018-06-11"
        }
      })
      .then(function(){
        console.log(1)
      })
      .catch(function(){
        console.log(2)
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
    morePrint(){
      console.log(this.multipleSelection)
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
      justify-content: space-between;
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