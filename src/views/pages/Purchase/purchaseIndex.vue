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
          <span>采购状态：</span>
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
          <el-button type="primary" icon="el-icon-edit" @click="moreEdit">批量修改</el-button>
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
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="50">
          </el-table-column>
           <el-table-column
            type="selection"
            width="55">
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
            prop="seller_tel"
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
            prop="purchases_modeName"
            label="采购方式"
            min-width="120"
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
            min-width="80"
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
            prop="statusName"
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

      <!-- 修改供应商弹出框 -->
      <el-dialog title="修改资料" :visible.sync="dialogFormVisible2" width="80%">
        <div>
          <el-row class="oneLine">
            <el-col :span="10"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">供应商名称：</div></el-col>
                <el-col :span="18"><el-input v-model="changeSellData.seller_shop"></el-input></el-col>
            </div></el-col>
            <el-col :span="10"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">供应商名称电话：</div></el-col>
                <el-col :span="18"><el-input v-model="changeSellData.seller_tel"></el-input></el-col>
            </div></el-col>
          </el-row>   
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changeSeller">确 定</el-button>
          <el-button @click="dialogFormVisible2 = false">取 消</el-button> 
        </div>
      </el-dialog>
       <!-- 修改资料弹出框 -->
      <el-dialog title="修改资料" :visible.sync="dialogFormVisible" width="80%">
        <div>
          <el-row class="oneLine">
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">客户名称：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.buyer_shop_name"></el-input></el-col>
            </div></el-col>
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">客户电话：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.buyer_tel"></el-input></el-col>
            </div></el-col>
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">供应商电话：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.seller_tel"></el-input></el-col>
            </div></el-col>
          </el-row>  
          <el-row class="oneLine">
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">供应商名称：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.seller_shop"></el-input></el-col>
            </div></el-col>
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">商品名：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.goods_name"></el-input></el-col>
            </div></el-col>
             <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购数量：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.purchases_num"></el-input></el-col>
            </div></el-col>
          </el-row>
          <el-row class="oneLine">
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购价格：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.purchases_price"></el-input></el-col>
            </div></el-col>
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">销售价格：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.goods_sell_price"></el-input></el-col>
            </div></el-col>
          </el-row>  
          <el-row class="oneLine">
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购状态：</div></el-col>
                 <el-col :span="18">
                  <el-select v-model="changeData.status" placeholder="请选择">
                    <el-option
                      v-for="item in selectData.status"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
            </div></el-col>
            <el-col :span="8"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购方式：</div></el-col>
                <el-col :span="18">
                  <el-select v-model="changeData.purchases_mode" placeholder="请选择">
                    <el-option
                      v-for="item in selectData.purchases_mode"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
            </div></el-col>
          </el-row>  
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submintForm">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button> 
        </div>
      </el-dialog>
  </div>
</template>

<script>
import '../../../tool.js'
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
        // 采购方式
        purchases_mode:[
          
        ],
        // 采购状态
        status:[

        ],
        // 到货状态
        reach_status:[
          {"id":1,"name":"未收货"},
          {"id":2,"name":"已收货"},
          {"id":3,"name":"等待处理"}
        ]
      },
      dataTotal:0,
      // 表格数据
      tableData:[
       
      ],
       // 复选框中的项
      multipleSelection: [

      ],
      // 需要编辑的数据
      changeData:{},
      changeDataOld:{},
      // 修改项弹出框是否展示
      dialogFormVisible: false,
      // 修改供应商弹出框是否展示
      dialogFormVisible2:false,
      changeSellData:{
        seller_shop:'',//供货商店名
        seller_tel:''//供货商电话
      },
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
      if(sendParam.start_date){
        sendParam.start_date=$tools.dateFormat(sendParam.start_date)
      }
      if(sendParam.end_date){
        sendParam.end_date=$tools.dateFormat(sendParam.end_date)
      }
      this.$axios.get('/provider/allocate/purchases/list',{params: sendParam})
      .then(function(r){
        that.dataTotal = r.data.data.total    
        for(var i=0;i<r.data.data.goods.length;i++){
          for(var j=0;j<that.selectData.purchases_mode.length;j++){
            if(that.selectData.purchases_mode[j].id==r.data.data.goods[i].purchases_mode){
              r.data.data.goods[i].purchases_modeName=that.selectData.purchases_mode[j].name
            }
          }
          for(var j=0;j<that.selectData.purchases_mode.length;j++){
            if(that.selectData.status[j].id==r.data.data.goods[i].status){
              r.data.data.goods[i].statusName=that.selectData.status[j].name
            }
          }
        }
        that.tableData = r.data.data.goods
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
    // 获取常规数据（如码表对应关系）
    getNormalData(){
      var that=this;
      Promise.all([that.$axios.get('/provider/allocate/purchases-mode/list'),that.$axios.get('/provider/allocate/purchases-status/list')])
      .then(function (results){
        that.selectData.purchases_mode=results[0].data.data
        that.selectData.status=results[1].data.data
        that.search()
      })
    },
    // 获取当前行的订单详情
    getNowGoods(index, rows) {
      this.goodsInfo = rows[index].goods
    },
    // 表单功能
    // 全选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 编辑功能
    editInfo(data){
      // 将当前行的数据单独保存起来,显示弹窗
      this.changeData = data
      this.changeDataOld = JSON.parse(JSON.stringify(data))
      this.dialogFormVisible = true
    },
    // 编辑提交
    submintForm(){
      var that =this;
      var sendParam = {};
      for(var i in this.changeData){
        if(this.changeData[i]!=this.changeDataOld[i]){
          sendParam[i] = this.changeData[i];
        }
      }
      if(Object.keys(sendParam).length==0){
        this.$message({
          message: '未有修改数据！！',
          type: 'warning'
        });
        this.dialogFormVisible = false
      }else{
        this.$axios.post("/provider/purchases/update",[{
          id:that.changeData.id,
          fields:sendParam
        }])
        .then(function(){
          that.$message({
            message: '修改成功！',
            type: 'success'
          });
          that.dialogFormVisible = false
          that.search()
        }).catch(function(){
          that.$message.error({
            message: '修改失败！',
          });
          console.log("获取数据失败")
          that.dialogFormVisible = false
        })
      }
    },
    // 批量修改
    moreEdit(){
      if(this.multipleSelection.length>0){
        this.dialogFormVisible2=true;
        // 弹出框数据清零
        this.changeSellData={
          seller_shop:'',//供货商店名
          seller_tel:''//供货商电话
        }
      }else{
        this.$message({
          message: '请选择要修改项！！',
          type: 'warning'
        });
        return false;
      }
    
    },
    // 供应商修改提交
    changeSeller(){
      var that=this;
      // 组装发送数据
      var sendParam={
        ids:[]
      }
      for(let i=0;i<this.multipleSelection.length;i++){
        sendParam.ids.push(this.multipleSelection[i].id)
      }
      sendParam.seller_shop=this.changeSellData.seller_shop;
      sendParam.seller_tel=this.changeSellData.seller_tel;
      this.$axios.post("/provider/purchases/seller/update",sendParam)
      .then(function(){
        that.$message({
          message: '修改成功！',
          type: 'success'
        });
        that.dialogFormVisible2 = false
        that.search()
      }).catch(function(){
        that.$message.error({
          message: '修改失败！',
        });
        console.log("获取数据失败")
        that.dialogFormVisible = false
      })
    }
  },
  created(){
    this.getNormalData()
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
    .oneLine{
      margin-bottom: 20px;
      .inputGroup{
        .inputTitle{
          text-align: right;
          padding-right:15px ;
          line-height: 40px;
        }
      }
    }
    
  }
</style>