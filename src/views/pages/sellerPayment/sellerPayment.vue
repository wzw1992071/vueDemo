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
      }
    };
  },
  methods:{
      search(){

      },

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

