// 供应商退货单页面
<template>
    <div class="mainBox">
       <form  id="searchForm" :action="formAction" method="get" target="_blank">
        <div class="searchArea">
              <div class="demo-input-suffix">
                <span>日期：</span>  
                <div class="timeArea">
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.back_date"
                        name="back_date"
                        type="date"
                        @change="getDataTips"
                        placeholder="请选择日期">
                    </el-date-picker>
                    </div>
                   
                </div>
            </div>
            <div class="demo-input-suffix">
              <span>商品名：</span> 
              <el-select
                v-model="searchParam.goods_name"
                style="width: 350px;"
                name="goods_name"
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
              <!-- <el-input v-model="searchParam.goods_name" name="goods_name"></el-input> -->
            </div>
            <div class="demo-input-suffix">
              <span>供应商：</span>  
              <el-autocomplete 
                v-model="searchParam.seller"
                name="seller"
                :fetch-suggestions="querySellerName"
                :trigger-on-focus="true"
                >
              </el-autocomplete>
            </div>
            <div class="btnGuoup">
                  <el-button type="success" icon="el-icon-search" @click="search">确认</el-button>
                  <el-button type="primary" icon="el-icon-document" @click="exportMsg">导出</el-button>
              </div>
        </div>
       </form>
         <!-- 表单 -->
        <div class="tableArea">
          <el-table
            :data="tableData"
            :stripe=true
            max-height="5000"
            border
            align="center"
            >
            
              <el-table-column
                prop="created_at"
                label="退货日期"
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
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="back_num"
                label="数量"
                min-width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="purchases_price"
                label="采购价"
                min-width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="退货人"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="seller_name"
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
                prop="statusName"
                label="状态"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                label="处理"
                min-width="120"
                align="center">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.status==1" @click="returnHandle(scope.row,1)" type="text">退供应商</el-button>
                    <el-button v-if="scope.row.status==1" @click="returnHandle(scope.row,5)" type="text">入库</el-button>
                    
                  </template>
              </el-table-column>
          </el-table>
        </div>
        <!-- 分页控制 -->
        <div class="pageControl">
            <el-pagination
              background
              :page-size=50
              layout="prev, pager, next"
              @current-change="pageChange"
              :total="dataTotal">
            </el-pagination>
        </div>
        
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          >
          <div class="flex">
            <div style="width:100px;line-height:40px">退款金额：</div>
            <el-input v-model.number="returnData.amount" width="150px"></el-input>
          </div>
          
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="returnGood">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="入库"
          :visible.sync="dialogVisible2"
          width="45%"
          >
          <div class="flex oneLine" >
            <div class="flex">
              <div class="title" style="width:100px;line-height:40px">商品名称：</div>
              <el-input v-model="returnData2.refund_info[0].title" width="150px"></el-input>
            </div>
            <div class="flex">
              <div class="title" style="width:100px;line-height:40px">数量：</div>
              <el-input v-model.number="returnData2.refund_info[0].quantity" width="150px"></el-input>
            </div>
          </div>
           <div class="flex oneLine">
            <div class="flex">
              <div class="title" style="width:100px;line-height:40px">单位：</div>
              <el-input v-model="returnData2.refund_info[0].unit" width="150px"></el-input>
            </div>
            <div class="flex">
              <div class="title" style="width:100px;line-height:40px">单价：</div>
              <el-input v-model="returnData2.refund_info[0].unit_price" width="150px"></el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="returnWarehouse">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import "../../../tool.js";
export default {
  name: "ReturnHandle",
  data() {
    return {
      searchParam: {
        back_date: new Date(), //退货时间
        page: 1, //当前页
        size: 50, //每页数量
        goods_name: "", //商品名
        seller: "" //供应商
      },
      // 输入提示内容
      tips:{
        sellerTips:[],
      },
      // 下拉框选项
      selectData: {
        proceeds_status: [{ id: 1, name: "未收货" }, { id: 2, name: "已收货" }],
         goods:[]
      },
      // 表格数据
      tableData: [],
      // 状态对应值
      codaText:{
        1:"待处理",
        5:"已入库",
        10:"待供应商退款",
        20:"已退供应商",
      },
      // 表格总数
      dataTotal: 20,
      dialogVisible:false,
      // 退货弹窗数据
      returnData:{
        type:"",
        goods_no:"",
        amount:0
      },
      // 入库弹窗
      dialogVisible2:false,
      // 入库弹窗数据
      returnData2:{
        refund_info:[{}]
      },
      
    };
  },
  computed: {
    formAction() {
      let url = "";
      if (window.location.hostname == "localhost") {
        url = "/api/provider/goods-back/export";
      } else {
        url = "/provider/goods-back/export";
      }
      return url;
    }
  },
  methods:{
    search(){
      let sendParam=JSON.parse(JSON.stringify(this.searchParam));
      if (sendParam.back_date) {
        sendParam.back_date = $tools.dateFormat(
          sendParam.back_date
        );
      }
      for (var i in sendParam) {
        if (!sendParam[i]) {
          delete sendParam[i];
        }
      }
      this.$axios
      .get("/provider/goods-back/list", { params: sendParam })
      .then(r => {

        this.dataTotal = r.data.data.goods.total;
        this.searchParam.page = r.data.data.goods.page
          ? r.data.data.goods.page
          : this.searchParam.page;
        this.tableData = r.data.data.goods.goods;
        this.tableData.forEach((item,index)=>{
          item.statusName=this.codaText[item.status]
          item.purchases_price=(item.purchases_price/100).toFixed(2)
        })
      })
      .catch(err => {
        this.$message.error({
          message: "获取数据失败！"
        });
        console.log(`获取数据失败！+${err}`);
      });
    },
      // 获取搜索栏数据提示
    getDataTips() {
      
        let sendParam = {};
        if (this.searchParam.back_date) {
          sendParam.date = $tools.dateFormat(this.searchParam.back_date);
        }
        
        this.$axios
          .get("/provider/scope/goods-back/list", {
            params: sendParam
          })
          .then(res => {

            this.tips.sellerTips=[];
            this.selectData.goods=[]

            res.data.data.sellers.forEach((item,index)=>{
              this.tips.sellerTips.push({
                name:item
              })
            })
            res.data.data.goods.forEach((item,index)=>{
              this.selectData.goods.push({
                value:item
              })
            })
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: "获取提示失败！"
            });
          });
    
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

    // 退货订单处理
    returnHandle(item,type){
      if(type==5){
        this.returnData2={
          type:5,
          refund_info:[{
            goods_no:item.goods_number,
            amount:0,
            unit:"件",
            unit_price:item.purchases_price,
            title:item.goods_name,
            quantity:item.back_num
          }]
        }
        this.dialogVisible2=true
      }else{
         this.returnData={
          type:1,
          goods_no:item.goods_number,
          amount:0
        }
        this.dialogVisible=true
      }
     
      
    },
    // 退供应商
    returnGood(){
      if(this.returnData.amount<0) return false;
      let sendParam ={
        type:1,
        refund_info:[{
          goods_no:this.returnData.goods_no,
          amount:this.$utils.yuanTofen(this.returnData.amount)
        }]
      }
      this.$axios
        .post("/provider/goods-back/deal-with",sendParam).then(r=>{
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.dialogVisible=false
          this.search();
        }).catch(err => {
          this.$message.error({
            message: "操作失败！"
          });
          console.log(`获取数据失败！+${err}`);
        });
    },
    // 入库
    returnWarehouse(){
      if(this.returnData2.refund_info[0].unit&&this.returnData2.refund_info[0].unit_price>=0&&this.returnData2.refund_info[0].title&&this.returnData2.refund_info[0].quantity>=0){
        let sendParam = JSON.parse(JSON.stringify(this.returnData2))
        sendParam.refund_info[0].unit_price = this.$utils.yuanTofen(sendParam.refund_info[0].unit_price)
         this.$axios
        .post("/provider/goods-back/deal-with",sendParam).then(r=>{
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.dialogVisible2=false
          this.search();
        })
      }else{
        this.$message({
          message: "请完善数据！",
          type: "warning"
        });
        return false;
      } 
    },
    pageChange(page){    
      this.searchParam.page = page;
      this.search();
    },
      // 导出功能
    exportMsg(){
      this.$el.querySelector("#searchForm").submit();
    },
  },
  created() {
    this.getDataTips();
    this.search();
  }
};
</script>

<style lang="less" scoped>
.mainBox {
  height: 100%;
  background: #fff;
  #searchForm {
    border-bottom: 1px solid #ccc;
    & > div {
      // height: 50px;
      span {
        height: 50px;
      }
      div {
        height: 50px;
        &.btnGuoup {
          display: flex;
          justify-content: flex-end;
          margin: 0 10px 0px;
          padding-bottom: 10px;
          height: 40px;
        }
      }
    }
  }
  .searchArea {
    margin: 0 10px 0px;
    padding: 8px 0;
    display: flex;
    height: 50px !important;
    justify-content: flex-start;
    .el-date-editor.el-input {
      width: 160px;
    }
    span {
      text-align: right;
      line-height: 42px;
      min-width: 75px;
    }
    & > div {
      display: flex;
      justify-content: space-between;

      .timeArea {
        display: flex;
        .line {
          text-align: center;
          line-height: 42px;
          margin: 0 5px;
        }
      }
    }
    .selecDiv {
      & > span {
        font-size: 16px;
        min-width: 90px;
        text-align: right;
      }
    }
    .btnGuoup {
      display: flex;
      justify-content: flex-end;
      margin: 0 10px 0px;
      padding-bottom: 10px;
      height: 40px;
    }
  }
  .oneLine{
    margin-bottom: 15px;
    &>div{
      width: 48%;
      margin-right: 2%;
      .title{
        text-align: right;
      }
    }
  }
}
</style>

