// 供应商退货单页面
<template>
    <div class="mainBox">
        <div class="searchArea">
              <div class="demo-input-suffix">
                <span>日期：</span>  
                <div class="timeArea">
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.back_date"
                        type="date"
                        placeholder="请选择日期">
                    </el-date-picker>
                    </div>
                    <!-- <div class="line">至</div>
                    <div class="block">
                    <el-date-picker
                        v-model="searchParam.end_date"
                        type="date"
                        placeholder="结束日期">
                    </el-date-picker>
                    </div> -->
                </div>
            </div>
            <div class="demo-input-suffix">
                <span>商品名</span>  
                <el-input v-model="searchParam.goods_name" ></el-input>
            </div>
             <div class="demo-input-suffix">
                <span>供应商：</span>  
                <el-input v-model="searchParam.seller" ></el-input>
            </div>
            <div class="btnGuoup">
                  <el-button type="success" icon="el-icon-search" @click="search">确认</el-button>
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
            >
              <el-table-column
                label="序号"
                type="index"
                align="center"
                width="50">
              </el-table-column>
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
                min-width="120"
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
      // 下拉框选项
      selectData: {
        proceeds_status: [{ id: 1, name: "未收货" }, { id: 2, name: "已收货" }]
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
      dataTotal: 20
    };
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
          })
        })
        .catch(err => {
          this.$message.error({
            message: "获取数据失败！"
          });
          console.log(`获取数据失败！+${err}`);
        });
      },
      // 退货订单处理
      returnHandle(item,type){
        // console.log(item)
        this.$axios
          .post("/provider/goods-back/deal-with", {
            type:type,
            goods_numbers:[item.goods_number]
          }).then(r=>{
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.search();
          }).catch(err => {
            this.$message.error({
              message: "操作失败！"
            });
            console.log(`获取数据失败！+${err}`);
          });
        
      },
      pageChange(page){    
        this.searchParam.page = page;
        this.search();
      }
  },
  created() {
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
</style>

