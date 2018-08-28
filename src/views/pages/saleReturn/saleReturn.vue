// 销售收款退货页面
<template>
    <div class="mainBox">
        <div class="searchBox">
            <div class="searchArea">
              <div class="demo-input-suffix">
                <span>订单日期：</span>  
                <div class="timeArea">
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.order_start_date"
                        type="date"
                        @change="getDataTips"
                        placeholder="订单开始日期">
                    </el-date-picker>
                    </div>
                    <div class="line">至</div>
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.order_end_date"
                        type="date"
                        @change="getDataTips"
                        placeholder="订单结束日期">
                    </el-date-picker>
                    </div>
                </div>
              </div>
              <!-- <div class="demo-input-suffix">
                  <span>客户名：</span>  
                  <el-input v-model="searchParam.buyer" ></el-input>
              </div> -->
              <div class="demo-input-suffix">
                <span>客户名：</span>  
                <el-autocomplete 
                  v-model="searchParam.buyer"
                  :fetch-suggestions="queryBuyerName"
                  :trigger-on-focus="false"
                  >
                </el-autocomplete>

              </div>
              <div class="demo-input-suffix">
                  <span>订单号：</span>  
                  <el-input v-model="searchParam.order_no" ></el-input>
              </div>
              <div class="selecDiv">
                  <span>收款状态：</span>
                  <el-select class="" v-model="searchParam.proceeds_status"  clearable  placeholder="请选择">
                    <el-option
                      v-for="item in selectData.proceeds_status"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </div>
          </div>
          <div class="searchArea">
              <div class="demo-input-suffix">
                  <span>收款时间：</span>  
                  <div class="timeArea">
                      <div class="block">
                      <el-date-picker
                          v-model="searchParam.proceeds_start_date"
                          type="date"
                          placeholder="订单开始日期">
                      </el-date-picker>
                      </div>
                      <div class="line">至</div>
                      <div class="block">
                      <el-date-picker
                          v-model="searchParam.proceeds_end_date"
                          type="date"
                          placeholder="订单结束日期">
                      </el-date-picker>
                      </div>
                  </div>
              </div>
              <div class="btnGuoup">
                  <el-button type="success" icon="el-icon-search" @click="search">确认</el-button>
                  <el-button type="primary" icon="el-icon-edit" @click="moreSure">批量确认</el-button>
              </div>
          </div>
        </div>
        <!-- 表单 -->
        <div class="tableArea">
           <el-table
            :data="tableData"
            :stripe=true
            max-height="5000"
            border
            align="center"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            >
              
              <el-table-column
                fixed
                type="selection"
                :selectable="selectable"
                min-width="40">
              </el-table-column>
              <el-table-column
                prop="order_no"
                label="订单号"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="purchases_date"
                label="订单日期"
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
                label="电话号码"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="receipt_address"
                label="地址"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="order_amount"
                label="销售金额"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="back_amount"
                label="退货金额"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="receivable_amount"
                label="应收金额"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                label="实收金额"
                min-width="120"
                align="center">
                    <template slot-scope="scope">
                      <el-input v-if="scope.row.proceeds_status" :disabled="true"  v-model.number="scope.row.proceeds_amount"></el-input>
                      <el-input v-else v-model.number="scope.row.proceeds_amount"></el-input>
                    </template>
              </el-table-column>
              <el-table-column
                prop="proceeds_date"
                label="收款时间"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                min-width="120"
                align="center">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.proceeds_status" :disabled="true"  v-model="scope.row.remark"></el-input>
                    <el-input v-else v-model="scope.row.remark"></el-input>
                  </template>
              </el-table-column>
              <el-table-column
                label="处理"
                min-width="120"
                align="center">
                  <template slot-scope="scope">
                    <el-button v-if="!scope.row.proceeds_status"  @click="getMoney(scope.row)" type="text">收款</el-button>
                    <el-button @click="returnGoods(scope.row)" type="text">退货</el-button>
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
        <!-- 退货弹出框模板 -->
        <el-dialog title="添加商品" :visible.sync="dialogFormVisible1" width="80%" @close="cancel" :close-on-click-modal=false>
          <div class="deleteGood">
                <el-table
                  :data="returnData"
                  :stripe=true
                    max-height="800"
                    border
                    align="center">
                  
                  <el-table-column
                    prop="goods_number"
                    label="商品编号"
                    min-width="120"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="goods_name"
                    label="品名"
                    min-width="120"
                    align="center">
                  </el-table-column>
                   <el-table-column
                    prop="surplus_num"
                    label="可退数量"
                    min-width="120"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="back_num"
                    label="退货数量"
                    min-width="120"
                    align="center">
                      <template slot-scope="scope">
                        <el-input v-model.number="scope.row.back_num" @change="countTotal(scope.$index)"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column
                    prop="back_price"
                    label="单价"
                    min-width="120"
                    align="center">
                      <template slot-scope="scope">
                        <el-input v-model.number="scope.row.back_price" @change="countTotal(scope.$index)"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column
                    prop="back_amount"
                    label="合计"
                    min-width="120"
                    align="center">
                  </el-table-column>
                </el-table>
            
                <div class="btnGuoup2">
                    <el-button @click="sureDelete" type="primary">确认</el-button>
                    <el-button @click="cancel" type="primary">取消</el-button>
                </div>
          </div>
      </el-dialog>
    </div>
</template>

<script>
import "../../../tool.js";
export default {
  name: "SaleReturn",
  data() {
    return {
      searchParam: {
        order_start_date: "", //订单开始时间
        order_end_date: "", //订单结束时间
        proceeds_start_date: "", //收款开始时间
        proceeds_end_date: "", //收款结束时间
        page: 1, //当前页
        size: 50, //每页数量
        proceeds_status: "", //订单状态
        buyer: "" //客户名
      },
      // 下拉框选项
      selectData: {
        proceeds_status: [{ id: 1, name: "未收款" }, { id: 2, name: "已收款" }]
      },
      // 输入提示内容
      tips:{
        buyerTips:[],
      },
      // 表格数据
      tableData: [],
      // 表格总数
      dataTotal: 0,
      // 复选框中的项
      multipleSelection: [],
      // 退货弹出框是否显示
      dialogFormVisible1: false,
      // 退货数据
      deleteGoodsInfo: [],
      // 退款相关数据
      returnData: []
    };
  },
  methods: {
    // 请求页面列表数据
    search() {
      // 因为要做数据处理，拷贝一份
      let sendParamStr = JSON.stringify(this.searchParam);
      let sendParam = JSON.parse(sendParamStr);
      if (sendParam.order_start_date) {
        sendParam.order_start_date = $tools.dateFormat(
          sendParam.order_start_date
        );
      }
      if (sendParam.order_end_date) {
        sendParam.order_end_date = $tools.dateFormat(sendParam.order_end_date);
      }
      if (sendParam.proceeds_start_date) {
        sendParam.proceeds_start_date = $tools.dateFormat(
          sendParam.proceeds_start_date
        );
      }
      if (sendParam.proceeds_end_date) {
        sendParam.proceeds_end_date = $tools.dateFormat(
          sendParam.proceeds_end_date
        );
      }
      for (var i in sendParam) {
        if (!sendParam[i]) {
          delete sendParam[i];
        }
      }
      this.$axios
        .get("/provider/proceeds-back/list", { params: sendParam })
        .then(r => {
          this.dataTotal = r.data.data.total;
          this.searchParam.page = r.data.data.page
            ? r.data.data.page
            : this.searchParam.page;
          this.tableData = r.data.data.orders;
          this.tableData.forEach((item, index) => {
            item.order_amount /= 100;
            item.back_amount /= 100;
            item.receivable_amount /= 100;
            item.proceeds_amount = item.proceeds_amount
              ? item.proceeds_amount / 100
              : item.receivable_amount;
            if (item.proceeds_status) {
            }
          });
        })
        .catch(err => {
          this.$message.error({
            message: "获取数据失败！"
          });
          console.log(`获取数据失败！+${err}`);
        });
    },
    // 换页
    pageChange(page) {
      this.searchParam.page = page;
      this.search();
    },
       // 获取搜索栏数据提示
    getDataTips() {
      if (this.searchParam.order_end_date >= this.searchParam.order_start_date) {
        let sendParam = {};
        if (this.searchParam.order_start_date) {
          sendParam.start_date = $tools.dateFormat(this.searchParam.order_start_date);
        }
        if (this.searchParam.order_end_date) {
          sendParam.end_date = $tools.dateFormat(this.searchParam.order_end_date);
        }
        this.$axios
          .get("/provider/order/goods/scopescreen/list", {
            params: sendParam
          })
          .then(res => {
            this.tips.buyerTips=[];
            this.tips.sellerTips=[];
            res.data.data.buyers.forEach((item,index)=>{
              this.tips.buyerTips.push({
                name:item
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
    // 全选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格多选禁用
    selectable(row) {
      return !row.proceeds_status;
    },
    // 批量确认
    moreSure() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择订单",
          type: "warning"
        });
        return false;
      }
      this.getMoney(this.multipleSelection);
    },
    // 收款
    getMoney(items) {
      // 如果为对象判断为false,就不是批量确认
      let sendParam = [];
      if (items.length) {
        items.forEach((item, index) => {
          if(item.remark){
            sendParam.push({
              order_no: item.order_no,
              proceeds_amount: item.receivable_amount * 100,
              remark: item.remark
            });
          }else{
            sendParam.push({
              order_no: item.order_no,
              proceeds_amount: item.receivable_amount * 100,
            });
          }
          
        });
      } else {
        if(items.remark){
          sendParam.push({
            order_no: items.order_no,
            proceeds_amount: items.receivable_amount * 100,
            remark: items.remark
          });
        }else{
          sendParam.push({
            order_no: items.order_no,
            proceeds_amount: items.receivable_amount * 100,
          });
        }
        
      }
      this.$confirm("确认收款后将不可更改，是否确认收款？", "确认收款", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$axios
          .post("/provider/proceeds", sendParam)
          .then(r => {
            if (r.data.message == "OK") {
              this.$message({
                message: "确认收款成功！",
                type: "success"
              });
              this.search();
            } else {
              this.$message.error({
                message: "确认收款失败！"
              });
              console.log(`确认收款失败！+${r.data.message}`);
            }
            console.log(r);
          })
          .catch(err => {
            this.$message.error({
              message: "确认收款失败！"
            });
            console.log(`确认收款失败！+${err}`);
          });
      });
    },
    // 退货
    returnGoods(item) {
      // this.dialogFormVisible1=true;
      // this.returnData = JSON.parse(JSON.stringify(item))
      let returnMoney = item.order_amount;
      this.$axios
        .get("/provider/order/goods/list", {
          params: { order_no: item.order_no }
        })
        .then(r => {
          if (r.data.message == "OK") {
            this.returnData = r.data.data.goods;
            console.log(this.returnData)
            this.returnData.forEach((item, index) => {
              item.back_num = 0;
              item.back_price =returnMoney;
              item.back_amount = 0;
            });
            this.dialogFormVisible1 = true;
          } else {
            this.$message.error({
              message: "获取数据失败！"
            });
            console.log(`获取数据失败！+${r.data.message}`);
          }
        })
        .catch(err => {
          this.$message.error({
            message: "获取数据失败！"
          });
          console.log(`获取数据失败！+${err}`);
        });
    },
    // 计算退货金额
    countTotal(i) {
      let obj = JSON.parse(JSON.stringify(this.returnData[i]));
      obj.back_amount = obj.back_num * obj.back_price;
      this.returnData.splice(i, 1, obj);
    },
    // 退货确认
    sureDelete() {
      console.log(this.returnData);
      let sendParam = [];
      if (this.returnData.length > 0) {
        this.returnData.forEach((item, index) => {
          if (item.goods_number > item.surplus_num) {
            this.$message.error({
              message: "请输入正确的数量！"
            });
            return false;
          }
          let obj = {};
          obj.goods_number = item.goods_number;
          obj.back_num = item.back_num;
          obj.back_price = item.back_price * 100;
          obj.back_amount = item.back_amount * 100;
          sendParam.push(obj);
        });
        this.$axios
          .post("/provider/goods-back", sendParam)
          .then(r => {
            if (r.data.code == 0) {
              this.$message({
                message: `退货成功！+${r.data.message}`,
                type: "success"
              });
              this.dialogFormVisible1 = false;
              this.returnData = [];
              this.search();
            }
          })
          .catch(err => {
            this.$message.error({
              message: "退货失败！"
            });
            console.log(`退货失败！+${err}`);
          });
      } else {
        this.cancel();
      }
    },
    // 取消退货
    cancel() {
      this.dialogFormVisible1 = false;
      this.returnData = [];
    }
  },
  created() {
    this.search();
    this.getDataTips();
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
      height: 50px;
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
  .searchBox {
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
    .searchArea {
      margin: 0 10px 0px;
      padding: 3px 0;
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
  }
  .btnGuoup2 {
    display: flex;
    justify-content: flex-end;
    margin: 20px 50px 10px;
    padding-bottom: 10px;
  }
}
</style>

