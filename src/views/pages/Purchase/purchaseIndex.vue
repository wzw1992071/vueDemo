// 采购页面
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
          <el-input v-model="searchParam.seller"></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>商品名：</span>  
          <el-input v-model="searchParam.goods_name"></el-input>
        </div>
      </div>
      <div class="searchArea">
        <div class="selecDiv">
          <span>到货状态：</span>
          <el-select v-model="searchParam.reach_status" placeholder="请选择">
            <el-option
              v-for="item in selectData.reach_status"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="selecDiv">
          <span>收货状态：</span>
          <el-select v-model="searchParam.status" placeholder="请选择">
            <el-option
              v-for="item in selectData.status"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
          max-height="800"
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
            prop="purchases_date"
            label="采购时间"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="buyer_shop_name"
            label="客户名称"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="buyer_tel"
            label="客户电话"
            min-width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="seller_shop"
            label="供应商电话"
            min-width="200"
            align="center">
          </el-table-column>
            <el-table-column
            prop="seller_shop"
            label="供应商名称"
            min-width="200"
            align="center">
          </el-table-column>
            <el-table-column
            prop="purchases_mode"
            label="采购方式"
            min-width="100"
            align="center">
          </el-table-column>
            <el-table-column
            prop="goods_name"
            label="商品名"
            min-width="200"
            align="center">
          </el-table-column>
            <el-table-column
            prop="purchases_num"
            label="采购数量"
            min-width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="purchases_price"
            label="采购价格"
            min-width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goods_sell_price"
            label="销售价格"
            min-width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="采购状态"
            min-width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reach_status"
            label="到货状态"
            min-width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="acceptance_num"
            label="到货数量"
            min-width="100"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="修改"
            align="center"
            width="80">
              <template slot-scope="scope">
                <el-button @click="editInfo(scope.row)" type="text" size="small">编辑</el-button>
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

      <!-- 修改资料弹出框 -->
      <el-dialog title="修改资料" :visible.sync="dialogFormVisible" width="80%">
        <div>
        <el-row>
          <el-col :span="12"><div class="grid-content inputGroup">
              <el-col :span="3"><div class="inputTitle">客户名称：</div></el-col>
              <el-col :span="9"><el-input v-model="changeData.name"></el-input></el-col>
          </div></el-col>
          <el-col :span="12"><div class="grid-content inputGroup">
              <el-col :span="3"><div class="inputTitle">客户电话：</div></el-col>
              <el-col :span="9"><el-input v-model="changeData.name"></el-input></el-col>
          </div></el-col>
        </el-row>  

        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
        seller:'',//客户供应商
        goods_name:'',//商品名
        page:'1',//当前页
        size:'10',//每页数量
        reach_status:'',//到货状态
        status:''//采购状态
      },
      // 下拉框数据
      selectData:{
        // 采购状态
        status:[
          {"id":1,"name":"商品名称"}
        ],
        // 到货状态
        reach_status:[
          {"id":1,"name":"商品名称"}
        ]
      },
      dataTotal:0,
      // 表格数据
      tableData:[
       
      ],
      // 需要编辑的数据
      changeData:{},
      // 修改项弹出框是否展示
      dialogFormVisible: false
    }
  },
  methods:{
    // 请求页面数据
    search(){
      var that= this
      let sendParamStr = JSON.stringify(this.searchParam)
      let sendParam = JSON.parse(sendParamStr)
      for(var i in sendParam ){
        if(!sendParam[i]){
          delete sendParam[i];
        }
      }
      this.$axios.get('/provider/allocate/purchases/list',{params: sendParam})
      .then(function(r){
        that.tableData = r.data.data.goods
        that.dataTotal = r.data.data.total
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
    },
    // 表单功能
    // 编辑功能
    editInfo(data){
      // 将当前行的数据单独保存起来,显示弹窗
      this.changeData = data
      this.dialogFormVisible = true
    }
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
      margin: 0 10px 0px;
      padding: 8px 0;
      display: flex;
      justify-content: flex-start;
      &>div{
        display: flex;
        justify-content: space-between;
        span{
          text-align: right;
          line-height: 42px;
          min-width: 75px;
        }
        
        .line{
          text-align: center;
          line-height: 42px;
          margin: 0 5px;
          
        } 
      }
      .selecDiv{
        &>span{
          font-size: 16px;
          min-width:90px;
          text-align: right 
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
    // 弹出框样式
    .inputGroup{
      .inputTitle{
        text-align: right;
        padding-right:15px ;
        line-height: 40px;
      }
    }
  }
</style>