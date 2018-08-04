// 供应商退货单页面
<template>
    <div class="mainBox">
        <div class="searchArea">
              <div class="demo-input-suffix">
                <span>订单日期：</span>  
                <div class="timeArea">
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.start_date"
                        type="date"
                        placeholder="订单开始日期">
                    </el-date-picker>
                    </div>
                    <div class="line">至</div>
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.end_date"
                        type="date"
                        placeholder="订单结束日期">
                    </el-date-picker>
                    </div>
                </div>
            </div>
            
            <div class="demo-input-suffix">
                <span>供应商：</span>  
                <el-input v-model="searchParam.seller" name="seller"></el-input>
            </div>
             <div class="demo-input-suffix">
                <span>商品名：</span>  
                <el-input v-model="searchParam.seller" name="seller"></el-input>
            </div>
            <div class="selecDiv">
                <span>收款状态：</span>
                <el-select class="" v-model="searchParam.status" name="status" clearable  placeholder="请选择">
               
                </el-select>
            </div>
        </div>
        <div class="searchArea">
            <div class="demo-input-suffix">
                <span>收款时间：</span>  
                <div class="timeArea">
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.start_date"
                        type="date"
                        placeholder="订单开始日期">
                    </el-date-picker>
                    </div>
                    <div class="line">至</div>
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.end_date"
                        type="date"
                        placeholder="订单结束日期">
                    </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="selecDiv">
                <span>付款人：</span>
                <el-select class="" v-model="searchParam.status" name="status" clearable  placeholder="请选择">
               
                </el-select>
            </div>
            <div class="btnGuoup">
                <el-button type="success" icon="el-icon-search" @click="search">确认</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="moreSure">批量确认</el-button>
            </div>
        </div>
        <p style="color:#f00;"> 温馨提示：按住shift，可以用滚轮操作横向滚动条</p>
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
                label="序号"
                type="index"
                align="center"
                min-width="40">
              </el-table-column>
              <el-table-column
                fixed
                type="selection"
                :selectable="selectable"
                min-width="40">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="商品编号"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="采购日期"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="供应商名称"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
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
                prop="goods_name"
                label="采购数量"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="单价"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="合计金额"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="退货金额"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="应付金额"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="实付款金额"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="付款时间"
                min-width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="操作"
                min-width="120"
                align="center">
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
        start_date: new Date(), //开始时间
        end_date: new Date(), //结束时间
        page: 1, //当前页
        size: 50, //每页数量
        status: ""
      },
      // 下拉框选项
      selectData: {
        proceeds_status: [{ id: 1, name: "未收货" }, { id: 2, name: "已收货" }]
      },
      // 表格数据
      tableData: [],
      // 表格总数
      dataTotal: 0,
      // 复选框中的项
      multipleSelection: [],
      
    };
  },
  methods:{
    // 全选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格多选禁用
    selectable(row) {
      return !row.proceeds_status;
    },
    // 获取数据
    search(){
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
          sendParam.push({
            order_no: item.order_no,
            proceeds_amount: item.receivable_amount * 100,
            remark: item.remark
          });
        });
      } else {
        sendParam.push({
          order_no: items.order_no,
          proceeds_amount: items.receivable_amount * 100,
          remark: items.remark
        });
      }
    }
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
    .btnGuoup{
        display: flex;
        justify-content: flex-end; 
        margin: 0 10px 0px;     
        padding-bottom: 10px;
        height: 40px;
    }
  }
}
</style>

