// 供应商退货单页面
<template>
    <div class="mainBox">
      <form  id="searchForm" :action="formAction" method="get" target="_blank">
        <div class="searchArea">
              <div >
                <span>订单日期：</span>  
                <div class="timeArea">
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.purchase_start_date"
                        type="date"
                        name="purchase_start_date"
                        @change="getDataTips"
                        placeholder="订单开始日期">
                    </el-date-picker>
                    </div>
                    <div class="line">至</div>
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.purchase_end_date"
                        type="date"
                        name="purchase_end_date"
                        @change="getDataTips"
                        placeholder="订单结束日期">
                    </el-date-picker>
                    </div>
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
                <span>商品名：</span>  
                <el-input v-model="searchParam.goods_name" ></el-input>
            </div> -->
            <!-- <div class="demo-input-suffix">
            <span>商品名：</span> 
             <el-select
              v-model="searchParam.goods_name"
              style="width: 350px;"
              name="goods_name"
              filterable
              multiple
              collapse-tags>
              <el-option
                v-for="(item,index) in selectData.goods"
                :key="index"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select> 
           
          </div> -->
           <div class="demo-input-suffix">
              <span>商品名：</span> 
              <MoreChoice v-model="searchParam.goods_name"  :selectAllInfo="selectData.goods" ></MoreChoice>
            </div>
            <div class="selecDiv">
                <span>付款状态：</span>
                <el-select class="" v-model="searchParam.status" name="status" clearable  placeholder="请选择">
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
            <div class="">
                <span>收款时间：</span>  
                <div class="timeArea">
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.pay_start_date"
                        name="pay_start_date"
                        type="date"
                        placeholder="订单开始日期">
                    </el-date-picker>
                    </div>
                    <div class="line">至</div>
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.pay_end_date"
                        name="pay_end_date"
                        type="date"
                        placeholder="订单结束日期">
                    </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="selecDiv ">
                <span>付款人：</span>
                <el-select class="" name="payer" v-model="searchParam.payer" clearable  placeholder="请选择">
                  <el-option
                    v-for="item in selectData.payPeople"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </div>
            <div class="btnGuoup">
                <el-button type="success" icon="el-icon-search" @click="search">确认</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="moreSure">批量确认</el-button>
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
            ref="multipleTable"
            @selection-change="handleSelectionChange">
              <el-table-column
                fixed
                type="selection"
                :selectable="selectable"
                min-width="40">
              </el-table-column>
              <el-table-column
                prop="goods_number"
                label="商品编号"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="purchases_date"
                label="采购日期"
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
                prop="goods_name"
                label="商品名称"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="purchases_num"
                label="采购数量"
                min-width="120"
                align="center">
              </el-table-column>
               <el-table-column
                prop="acceptance_num"
                label="到货数量"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="purchases_price"
                label="单价"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="purchases_amount"
                label="合计金额"
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
                prop="cope_with_amount"
                label="应付金额"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="pay_amount"
                label="实付款金额"
                min-width="120"
                align="center">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.status==1"   v-model.number="scope.row.pay_amount"></el-input>
                    <el-input v-else v-model.number="scope.row.pay_amount" :disabled="true"></el-input>
                  </template>
              </el-table-column>
              <el-table-column
                prop="proceeds_date"
                label="付款时间"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="操作"
                min-width="120"
                align="center"> 
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.status==1"  @click="payMoney(scope.row)" type="text">付款</el-button>
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
    </div>
</template>

<script>
import "../../../tool.js";
export default {
  name: "SellerPayment",
  data() {
    return {
      searchParam: {
        purchase_start_date: "", //采购开始日期
        purchase_end_date: "", //采购结束日期
        pay_start_date: "", //付款开始时间
        pay_end_date: "", //付款结束时间
        seller: "", //采购商信息
        goods_name: [], //商品名
        status: "", //付款状态
        payer: "", //付款者
        page: 1, //当前页
        size: 50 //每页数量
      },
      // 输入提示内容
      tips: {
        sellerTips: []
      },
      // 下拉框选项
      selectData: {
        proceeds_status: [{ id: 1, name: "未付款" }, { id: 2, name: "已付款" }],
        payPeople: [],
        goods: []
      },
      // 表格数据
      tableData: [],
      // 表格总数
      dataTotal: 0,
      // 复选框中的项
      multipleSelection: []
    };
  },
  computed: {
    formAction() {
      let url = "";
      if (window.location.hostname == "localhost") {
        url = "/api/provider/pay-seller/export";
      } else {
        url = "/provider/pay-seller/export";
      }
      return url;
    }
  },
  methods: {
    // 获取下拉框数据
    getSelectData() {
      this.$axios
        .get("/provider/buyers/list")
        .then(r => {
          // console.log(r.data.data.list)
          r.data.data.lists.forEach(item => {
            this.selectData.payPeople.push({
              id: item.payer,
              name: item.payer
            });
          });
        })
        .catch(err => {
          this.$message.error({
            message: "获取付款人失败！"
          });
          console.log(`获取付款人失败！+${err}`);
        });
    },
    // 全选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格多选禁用
    selectable(row) {
      return row.status == 1 ? true : false;
    },
    // 获取搜索栏数据提示
    getDataTips() {
      if (
        this.searchParam.purchase_end_date >=
        this.searchParam.purchase_start_date
      ) {
        let sendParam = {};
        if (this.searchParam.purchase_start_date) {
          sendParam.start_date = $tools.dateFormat(
            this.searchParam.purchase_start_date
          );
        }
        if (this.searchParam.purchase_end_date) {
          sendParam.end_date = $tools.dateFormat(
            this.searchParam.purchase_end_date
          );
        }
        this.$axios
          .get("/provider/order/goods/scopescreen/list", {
            params: sendParam
          })
          .then(res => {
            this.tips.sellerTips = [];
            this.selectData.goods=[];
            res.data.data.sellers.forEach((item, index) => {
              this.tips.sellerTips.push({
                name: item
              });
            });
            res.data.data.goods.forEach((item, index) => {
              this.selectData.goods.push({
                value:item,
                label:item
              });
            });
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
    querySellerName(queryString, cb) {
      let restaurants = this.tips.sellerTips;
      let results = queryString
        ? restaurants.filter($tools.createFilter(queryString, "name"))
        : restaurants;
      let a = [];
      results.forEach(function(item, index) {
        a.push({
          value: item.name
        });
      });
      cb(a);
    },
    // 获取数据
    search() {
      let sendParamStr = JSON.stringify(this.searchParam);
      let sendParam = JSON.parse(sendParamStr);
      if (sendParam.purchase_start_date) {
        sendParam.purchase_start_date = $tools.dateFormat(
          sendParam.purchase_start_date
        );
      }
      if (sendParam.purchase_end_date) {
        sendParam.purchase_end_date = $tools.dateFormat(
          sendParam.purchase_end_date
        );
      }
      if (sendParam.pay_start_date) {
        sendParam.pay_start_date = $tools.dateFormat(sendParam.pay_start_date);
      }
      if (sendParam.pay_end_date) {
        sendParam.pay_end_date = $tools.dateFormat(sendParam.pay_end_date);
      }
      for (var i in sendParam) {
        if (!sendParam[i]) {
          delete sendParam[i];
        }
      }
      this.$axios
        .get("/provider/pay-seller/list", { params: sendParam })
        .then(r => {
          this.dataTotal = r.data.data.total;
          this.searchParam.page = r.data.data.page
            ? r.data.data.page
            : this.searchParam.page;
          this.tableData = r.data.data.goods;
          this.tableData.forEach((item, index) => {
            item.purchases_price /= 100;
            item.purchases_amount /= 100;
            item.back_amount /= 100;
            item.cope_with_amount /= 100;
            item.pay_amount /= 100;
            // item.proceeds_amount = item.proceeds_amount
            //   ? item.proceeds_amount / 100
            //   : item.receivable_amount;
            if (item.status == 1) {
              item.pay_amount = item.cope_with_amount;
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
    // 批量确认
    moreSure() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择订单",
          type: "warning"
        });
        return false;
      }
      this.payMoney(this.multipleSelection);
    },
    // 收款
    payMoney(items) {
      let totalMoney = 0;
      // 如果为对象判断为false,就不是批量确认
      let sendParam = [];
      if (items.length) {
        items.forEach((item, index) => {
          totalMoney += item.pay_amount;
          sendParam.push({
            goods_number: item.goods_number,
            pay_amount: this.$utils.yuanTofen(item.pay_amount)
          });
        });
      } else {
        totalMoney += items.pay_amount;
        sendParam.push({
          goods_number: items.goods_number,
          pay_amount: this.$utils.yuanTofen(items.pay_amount)
        });
      }
      // console.log(sendParam)
      this.$confirm(`付款后将不可更改，是否确认付款？(合计：${totalMoney}元)`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$axios
          .post("/provider/pay-seller", sendParam)
          .then(r => {
            if (r.data.message == "OK") {
              this.$message({
                message: "确认付款成功！",
                type: "success"
              });
              this.search();
            } else {
              this.$message.error({
                message: "确认付款失败！"
              });
              console.log(`确认付款失败！+${r.data.message}`);
            }
            console.log(r);
          })
          .catch(err => {
            this.$message.error({
              message: "确认付款失败！"
            });
            console.log(`确认付款失败！+${err}`);
          });
      });
    },
     // 导出功能
    exportMsg(){
      // if (this.searchParam.start_date && this.searchParam.end_date) {
        this.$el.querySelector("#searchForm").submit();
      // } else {
      //   this.$message({
      //     message: "导出失败！",
      //     type: "warning"
      //   });
      // }
    },

  },
  created() {
    this.getSelectData();
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
  .searchArea {
    margin: 0 10px 0px;
    padding: 8px 0;
    display: flex;
    height: 50px !important;
    justify-content: flex-start;
    .demo-input-suffix{
          height: 42px;
          &>div{
            width: 200px;
          }
        }
    .el-date-editor.el-input {
      width: 160px;
    }
    span {
      text-align: right;
      line-height: 42px;
      min-width: 82px;
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
</style>

