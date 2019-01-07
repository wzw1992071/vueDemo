// 收货首页页面
<template>
    <div class="mainBox">
    <!-- 搜索条件 -->
    <form  id="searchForm" :action="formAction" method="get" target="_blank">
      <div class="searchBox">
        <div class="searchArea">
          <div>
            <div class="block">
              <el-date-picker
                v-model="searchParam.start_date"
                type="date"
                name="start_date"
                @change="getDataTips"
                placeholder="开始日期">
              </el-date-picker>
            </div>
            <div class="line">至</div>
            <div class="block">
              <el-date-picker
                v-model="searchParam.end_date"
                type="date"
                name="end_date"
                @change="getDataTips"
                placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
          <div class="demo-input-suffix">
            <span>供应商：</span>  
            <!-- <el-input v-model="searchParam.seller" name="seller"></el-input> -->
            <el-autocomplete 
              v-model="searchParam.seller"
              name="seller"
              :fetch-suggestions="querySellerName"
              :trigger-on-focus="true"
              >
            </el-autocomplete>
          </div>
          <!-- <div class="demo-input-suffix">
            <span>供应商：</span>  
            <el-input v-model="searchParam.seller"></el-input>
          </div> -->
          <!-- <div class="demo-input-suffix">
            <span>商品名：</span>  
            <el-input v-model="searchParam.goods_name"></el-input>
          </div> -->
          <!-- <div class="demo-input-suffix">
            <span>商品名：</span> 
             <el-select
              v-model="searchParam.goods_name"
              name="goods_name"
              style="width: 350px;"
              filterable
              multiple
              collapse-tags>
              <el-option
                v-for="item in selectData.goods"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select> 
          </div> -->
          <div class="demo-input-suffix">
            <span>商品名：</span> 
            <MoreChoice v-model="searchParam.goods_name"  :selectAllInfo="selectData.goods" ></MoreChoice>
          </div>
        </div>
        <div class="searchArea">
          <div class="demo-input-suffix">
            <span>客户：</span>  
             <el-autocomplete 
              v-model="searchParam.buyer"
              name="buyer"
              :fetch-suggestions="queryBuyerName"
              :trigger-on-focus="true"
              >
            </el-autocomplete>
          </div>
          <div class="selecDiv">
            <span>采购状态：</span>
            <el-select class="" v-model="searchParam.status" name="status" clearable  placeholder="请选择">
              <el-option
                v-for="item in selectData.status"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
           </div>
           <div class="selecDiv">
            <span>到货状态：</span>
            <el-select class="" v-model="searchParam.reach_status" name="reach_status" clearable  placeholder="请选择">
              <el-option
                v-for="item in selectData.reach_status"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
            <!-- 搜索按钮 -->
          <div class="btnGuoup">
              <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
              <el-button type="primary" icon="el-icon-goods" @click="moreSure">批量确认</el-button> 
              <el-button type="danger" icon="el-icon-printer" @click="morePrint">批量打印</el-button>
              <el-button type="primary" icon="el-icon-document" @click="exportMsg">导出</el-button>
          </div>
        </div>
      </div>
    </form>
      <!-- 表单 -->
      <div class="tableArea">
        <el-table
          border
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
            prop="purchases_date"
            label="订单日期"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="seller_shop"
            sortable
            label="供应商名称"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="seller_tel"
            label="供应商电话"
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
            prop="goods_number"
            label="商品编号"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            sortable
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="purchases_num"
            label="采购数量"
            min-width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="acceptance_num"
            label="收货数量"
            min-width="60"
            align="center">
          </el-table-column>
           <el-table-column
            prop="status"
            label="采购状态"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reach_status"
            label="收货状态"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="receipt_area_code"
            label="送货区域"
            min-width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="new_brand"
            label="换品牌"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="print_times"
            label="是否打印标签"
            min-width="60"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100">
              <template slot-scope="scope">
                <!-- <el-button @click="sureGood(scope.row)" type="text" size="small">确认收货</el-button>
                <el-button @click="editInfo1(scope.row)" type="text" size="small">修改货物品牌</el-button>
                <el-button @click="editInfo2(scope.row)" type="text" size="small">修改收货数量</el-button> -->
                <el-button @click="editInfo1(scope.row)" type="text" size="small">修改货物状态</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageControl">
          <el-pagination
            background
            :page-size=50
            layout="prev, pager, next"
            @current-change="pageChange"
            :total="dataTotal">
          </el-pagination>
      </div>

       <!-- 修改品牌弹出框 -->
      <el-dialog title="修改状态" :visible.sync="dialogFormVisible1" width="40%" :close-on-click-modal=false>
        <div>
          <el-row class="oneLine">
            <el-col :span="20"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">品牌名称：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.brand"></el-input></el-col>
            </div></el-col>
          </el-row>   
          <el-row class="oneLine">
            <el-col :span="20"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">收货数量：</div></el-col>
                <el-col :span="18"><el-input v-model.number="changeData.acceptance_num" type="number"></el-input></el-col>
            </div></el-col>
          </el-row>   
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitInfo1">确 定</el-button>
          <el-button @click="dialogFormVisible1 = false">取 消</el-button> 
        </div>
      </el-dialog>
       <!-- 修改收货数量弹出框 -->
      <!-- <el-dialog title="收货数量" :visible.sync="dialogFormVisible2" width="40%">
        <div>
          <el-row class="oneLine">
            <el-col :span="20"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">已收货：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.acceptance_num"></el-input></el-col>
            </div></el-col>
          </el-row>   
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitInfo2">确 定</el-button>
          <el-button @click="dialogFormVisible2 = false">取 消</el-button> 
        </div>
      </el-dialog> -->

    
        <!-- <div class="pdfbox" id="pdfbox">
          
        </div>
        <div class="printButton">
          <el-button type="primary" @click="printPDF">打印</el-button>
        </div> -->
      <!-- </div> -->
  </div>
</template>

<script>
import '../../../tool.js'
export default {
  name: 'CollectGoodsIndex',
  data () {
    return {
       // 搜索条件
      searchParam:{
        start_date:new Date(),//开始时间
        end_date:new Date(),//结束时间
        seller:'',//供应商信息 
        goods_name:[],//商品名
        buyer:"", //买家信息 
        page:'1',//当前页
        size:'50',//每页数量
        reach_status:"",//到货状态
        status:""//采购状态
        
      },
      // 输入提示内容
      tips:{
        sellerTips:[],
        buyerTips:[],
      },
      // 输入框数据提示
      AllBuyerInfo:[],
      // 表格数据
      tableData:[],
      // 总数
      dataTotal:0,
      // 复选框中的项
      multipleSelection: [],
      selectData:{
        status:[],
        goods:[],
        reach_status: [
          { id: 1, name: "未收货" },
          { id: 2, name: "已收货" },
          { id: 3, name: "等待处理" }
        ],
        status:[],
      },
      // 控制修改品牌弹窗显示
      dialogFormVisible1:false,
      // 控制修改收货数量弹窗显示
      dialogFormVisible2:false,
      // 待修改的数据
      changeData:{
        id:'',
        brand:'',
        acceptance_num:''
      },
      printDatas:[
      ], 
      // 打印对象
      LODOP:{}
    }
  },
  computed: {
    formAction() {
      let url = "";
      if (window.location.hostname == "localhost") {
        url = "/api/provider/allocate/take-goods/export";
      } else {
        url = "/provider/allocate/take-goods/export";
      }
      return url;
    }
  },
  methods:{
    // 获取常规数据（如码表对应关系）
    getNormalData(){
      var that=this;
      that.$axios.get('/provider/allocate/purchases-status/list')
      .then(function (r){
        that.selectData.status=r.data.data
        that.search()
      })
    },
   // 获取搜索栏数据提示
    getDataTips() {
      if (this.searchParam.end_date >= this.searchParam.start_date) {
        let sendParam = {};
        if (this.searchParam.start_date) {
          sendParam.start_date = $tools.dateFormat(this.searchParam.start_date);
        }
        if (this.searchParam.end_date) {
          sendParam.end_date = $tools.dateFormat(this.searchParam.end_date);
        }
        this.$axios
          .get("/provider/order/goods/scopescreen/list", {
            params: sendParam
          })
          .then(res => {
            this.tips.buyerTips=[];
            this.tips.sellerTips=[];
            this.selectData.goods=[]
            res.data.data.buyers.forEach((item,index)=>{
              this.tips.buyerTips.push({
                name:item
              })
            })
            res.data.data.sellers.forEach((item,index)=>{
              this.tips.sellerTips.push({
                name:item
              })
            })
            res.data.data.goods.forEach((item,index)=>{
              this.selectData.goods.push({
                value:item,
                label:item
              })
            })
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: "获取提示失败！"
            });
          });
      } else {
        this.$message.error({
          message: "请选择正取的时间！"
        });
      }
    },
    // 卖家提示
    querySellerName(queryString, cb){
      let restaurants = this.tips.sellerTips;
      let results = queryString
        ? restaurants.filter($tools.createFilter(queryString, "name"))
        : restaurants;
      let a = [];
      results.forEach(function(item, index) {
        a.push({
          value: item.name,
        
        });
      });
      cb(a);
    },
    // 买家提示
    queryBuyerName(queryString, cb){
      let restaurants = this.tips.buyerTips;
      let results = queryString
        ? restaurants.filter($tools.createFilter(queryString, "name"))
        : restaurants;
      let a = [];
      results.forEach(function(item, index) {
        a.push({
          value: item.name,
        
        });
      });
      cb(a);
    },
  
    // 请求页面数据
    search(){
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
      this.$axios.get('/provider/allocate/take-goods/list',{params: sendParam})
      .then(function(r){
        // for(var i=0;i<r.data.data.goods.length;i++){
        //   for(var j=0;j<that.selectData.status.length;j++){
        //     if(that.selectData.status[j].id==r.data.data.goods[i].status){
        //       r.data.data.goods[i].statusName=that.selectData.status[j].name
        //     }
        //   }
          
        // }
        that.tableData = r.data.data.goods
        that.dataTotal = r.data.data.total
      })
      .catch(function(){
        that.$message.error({
          message: '获取数据失败！',
        });
        console.log("获取数据失败！")
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
    // 批量打印
    morePrint(){
      if(this.multipleSelection.length==0){
        this.$message({
          message: '请选择商品',
          type: 'warning'
        });
        return false;
      }
      var that= this;
      this.printShow=true;
      var choiceGoodIds = [];
      for(var i =0;i<this.multipleSelection.length;i++){
        choiceGoodIds.push(this.multipleSelection[i].id)
      }
      this.$axios.get("/provider/purchases/print/lists",{
        params:{ids:choiceGoodIds}
      }).then(function(r){
        that.printDatas=r.data.data;
        var LODOP;
        LODOP=getLodop();  
        LODOP.PRINT_INIT("打印不干胶");  
        LODOP.SET_PRINT_PAGESIZE(0, 600, 400, 'tag')
      
        for(let i = 0;i<that.printDatas.length;i++){
          // LODOP.ADD_PRINT_TEXT(0,10,130,100,"---------");
          // LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
          // LODOP.ADD_PRINT_TEXT(i*120+110,10,130,100,"----1-----");
          // LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
          LODOP.ADD_PRINT_TEXT((5+i*151),5,130,100,`客户名：${that.printDatas[i].buyer_shop_name}`);
          LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
          LODOP.ADD_PRINT_TEXT((5+i*151),125,150,150,`编号：${that.printDatas[i].goods_number}`);
          LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
          LODOP.ADD_PRINT_TEXT((50+i*151),5,100,100,`${that.printDatas[i].purchases_num}${that.printDatas[i].sell_unit}`);
          LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
          LODOP.ADD_PRINT_TEXT((50+i*151),40,200,100,`${that.printDatas[i].goods_name}`);
          LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
          LODOP.ADD_PRINT_TEXT((115+i*151),5,100,100,`合计总数：${that.printDatas[i].total_num}`);
          LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
          LODOP.ADD_PRINT_TEXT((130+i*151),5,100,100,`${that.printDatas[i].receipt_area_code}`);
          LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
          LODOP.ADD_PRINT_TEXT((130+i*151),105,100,100,`${that.printDatas[i].purchases_date}`);
          LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        }
        // LODOP.SET_PREVIEW_WINDOW(0,1,0,800,600,"");//打印前弹出选择打印机的对话框	
        LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW",1);//打印后自动关闭预览窗口
        LODOP.PREVIEW();	
      }).catch(function(){
        that.$message.error({
          message: '获取打印数据失败',
        });
      })
    },

    // 弹出修改品牌
    editInfo1(data){
      this.changeData.id = data.id;
      this.changeData.brand=data.new_brand;
      this.changeData.acceptance_num=data.purchases_num
      this.dialogFormVisible1=true;
    },
    // // 弹出修改收货数量
    // editInfo2(data){
    //   this.changeData.id = data.id;
    //   this.changeData.acceptance_num=data.purchases_num
    //   this.dialogFormVisible2=true;
    // },
    // 修改品牌和收货数量
    submitInfo1(){
      var that = this;
      if(that.changeData.acceptance_num>=0){
        this.$axios.post("/provider/purchases/goods/confirm",{
          id:that.changeData.id,
          brand:that.changeData.brand,
          acceptance_num:that.changeData.acceptance_num,
        }).then(res=>{
          that.$message({
            message: '修改成功！',
            type: 'success'
          });
          that.dialogFormVisible1 = false
          that.search()
        }).catch(function(){
          that.$message.error({
            message: '修改失败！',
          });
          that.dialogFormVisible1 = false
        })
      }else{
        this.$message({
          message: '请完善数据！',
          type: 'warning'
        });
      }
    },
    // 修改收货数量
    submitInfo2(row){
      var that = this;
      if(this.changeData.acceptance_num){
        this.$axios.post("/provider/allocate/acceptance-num/update",{
          id:that.changeData.id,
          acceptance_num:that.changeData.acceptance_num
        }).then(function(){
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
          that.dialogFormVisible2 = false
        })
      }else{
        this.$message({
          message: '请确认已经输入收货数量',
          type: 'warning'
        });
      }
    },
    // 确认收货
    sureGood(data){
      var that = this;
      this.$confirm('是否确认收货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass:"mywarning"
        }).then(() => {
         this.$axios.post("/provider/allocate/acceptance-num/update",[{
            id:data.id,
            acceptance_num:data.purchases_num
          }]).then(function(){
            that.$message({
              message: '修改成功！',
              type: 'success'
            });
            that.search()
          }).catch(function(){
            that.$message.error({
              message: '修改失败！',
            });
          })
        })
    },
    moreSure(){
      let that = this;
      if(this.multipleSelection.length==0){
        this.$message({
          message: '请选择商品',
          type: 'warning'
        });
        return false;
      }
      let params = []
      this.multipleSelection.forEach((item,index)=>{
        params.push({
          id:item.id,
          acceptance_num:item.purchases_num
        })
      })
      this.$confirm('是否批量确认收货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass:"mywarning"
      }).then(() => {
        this.$axios.post("/provider/allocate/acceptance-num/update",params).then(function(){
          that.$message({
            message: '修改成功！',
            type: 'success'
          });
          that.search()
        }).catch(function(){
          that.$message.error({
            message: '修改失败！',
          });
        })
      })
    },
    // 导出功能
    exportMsg(){
      if (this.searchParam.start_date && this.searchParam.end_date) {
        this.$el.querySelector("#searchForm").submit();
      } else {
        this.$message({
          message: "请选择导出日期！",
          type: "warning"
        });
      }
    },
    // 确认打印机
    confirmPrinter(printer){
        
        var iPrinterCount = this.LODOP.GET_PRINTER_COUNT();

        for(let i=0; i<iPrinterCount; i++){
            if(this.LODOP.GET_PRINTER_NAME(i)===printer){
                return i;
            }
        }
    }
  },
  created(){
    let that = this;
    this.getDataTips();
    that.$axios.get("/custom/lists/all").then( (r)=>{
      this.AllBuyerInfo = r.data.data
      this.getNormalData();
    }).catch((err)=>{
      console.log(err)
      this.$message.error({
        message: '获取买家失败！',
      });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .mainBox{
    height: 100%;
    background: #fff;
    // #searchForm{
    //    & > div {
    //       height: 40px;
    //       span {
    //         height: 40px;
    //       }
    //    }
    // }
    
    .searchBox{
      border-bottom: 1px solid #ccc;
      .searchArea{
        margin: 0 10px 0px;
        padding: 5px 0;
        display: flex;
        justify-content: flex-start;
        .demo-input-suffix{
          height: 42px;
          &>div{
            width: 200px;
          }
        }
        &>div{
          margin-left: 10px;
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
    }
    
    .btnGuoup{
      display: flex;
      justify-content: flex-end; 
      margin: 0 10px 0px;     
      padding-bottom: 10px;
      
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
    
    // 打印样式
    #printArea{
      position: fixed;
      z-index:500;
      width: 600px;
      left: 50%;
      top: 20%;
      transform: translate(-340px);
      max-height: 600px;
      overflow: scroll;
      background: #fff;
      .pdfMian{
        position: absolute;
        left: -9999px;
        top:-9999px;
        .onePage{
          font-size: 18px;
          height: 240px;
          margin: 10px 15px;
          .el-row{
            margin: 40px 0;
          }
        }
      }
      .pdfbox{
        // display: none;
      }
      .printButton{
        text-align: center;
        margin:20px;
      }
    }
  }
  .mywarning{
      
      font-size: 20px;
      
  }
</style>