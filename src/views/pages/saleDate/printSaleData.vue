// 销售数据打印页面
<template>
  <div class="mainBox">
    <!-- 搜索条件 -->
    <!-- 本地 -->
     <!-- <form  id="searchForm" action="/api/provider/purchases/sales/export" method="get" target="_blank"> -->
     <!-- 线上版本 -->
     <form  id="searchForm" :action="formAction" method="get" target="_blank">
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
              name= "end_date"
              v-model="searchParam.end_date"
              type="date"
               @change="getDataTips"
              placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="demo-input-suffix">
            <span>客户：</span>  
             <el-autocomplete 
              v-model="searchParam.buyer"
              :fetch-suggestions="queryBuyerName"
              :trigger-on-focus="true"
              >
            </el-autocomplete>
          </div>
        <!-- <div class="demo-input-suffix">
          <span>店铺名：</span>  
          <el-input v-model="searchParam.buyer" name="buyer"></el-input>
        </div> -->
        <!-- <div class="demo-input-suffix">
          <span>商品名：</span>  
          <el-input v-model="searchParam.goods_name"></el-input>
        </div> -->
         <div class="btnGuoup">
            <el-button type="success" icon="el-icon-search" @click="search">确定</el-button>
            <el-button type="danger" icon="el-icon-printer" @click="morePrint">批量打印</el-button>
            <el-button type="primary" icon="el-icon-document" @click="exportMsg">导出</el-button>
           
        </div>
      </div>
      </form>
      <!-- 搜索按钮 -->

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
            type="selection"
            width="55">
          </el-table-column>
      
          <el-table-column
            prop="order_no"
            label="订单号"
            min-width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="purchases_date"
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
            prop="total_num"
            label="购买总数"
            min-width="100"
            align="center">
          </el-table-column>
            <el-table-column
            prop="total_money"
            label="总金额"
            min-width="100"
            :formatter="formatter"
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
                  
                  <el-table-column min-width="150" align="center" property="goods_name" label="品名"></el-table-column>
                  <el-table-column min-width="100" align="center" property="goods_sell_price" label="单价（元）" :formatter="formatter"></el-table-column>
                  <el-table-column min-width="100" align="center" property="acceptance_num" label="数量"></el-table-column>
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
  name: "PrintSaleData",
  data() {
    return {
      dataTotal: 0,
      // 搜索条件
      searchParam: {
        start_date: new Date(), //开始时间
        end_date: new Date(), //结束时间
        buyer: "", //客户名
        goods_name: "", //商品名称
        page: 1, //当前页
        size: 50 //每页数量
      },
      // 输入提示内容
      tips:{
        buyerTips:[],
      },
      // 下拉框属性
      selectOptions: {},
      // 表格数据
      tableData: [],
      // 弹出框订单详情数据
      goodsInfo: [],
      // 复选框中的项
      multipleSelection: []
    };
  },
  computed: {
    formAction() {
      let url = "";
      if (window.location.hostname == "localhost") {
        url = "/api/provider/purchases/sales/export";
      } else {
        url = "/provider/purchases/sales/export";
      }
      return url;
    }
  },
  methods: {
    // 请求页面数据
    search() {
      var that = this;
      let sendParamStr = JSON.stringify(this.searchParam);
      let sendParam = JSON.parse(sendParamStr);
      if (sendParam.start_date) {
        sendParam.start_date = $tools.dateFormat(sendParam.start_date);
      }
      if (sendParam.end_date) {
        sendParam.end_date = $tools.dateFormat(sendParam.end_date);
      }
      for (var i in sendParam) {
        if (!sendParam[i]) {
          delete sendParam[i];
        }
      }
      this.$axios
        .get("/provider/purchases/sales/list", { params: sendParam })
        .then(r => {
          var data = [];
          for (var i = 0; i < r.data.data.orders.length; i++) {
            data.push(r.data.data.orders[i].order);
          }
          this.tableData = data;
          this.dataTotal = r.data.data.total;
        })
        .catch(function() {
          console.log("获取数据失败");
        });
    },
    // 页面改变触发重新搜索
    pageChange(page) {
      this.searchParam.page = page;
      this.search();
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
    // 表单
    // 过滤
    formatter(row, column) {
      return (row[column.property] / 100).toFixed(2);
    },
    // 全选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取当前行的订单详情
    getNowGoods(index, rows) {
      this.goodsInfo = rows[index].goods;
    },
    morePrint() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择打印数据",
          type: "warning"
        });
        return false;
      }
      var choiceGoodIds = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        choiceGoodIds.push(this.multipleSelection[i].order_no);
      }
      this.$axios
        .get("/provider/purchases/sales/print", {
          params: { orders_no: choiceGoodIds }
        })
        .then(r => {
          if (!r.data.data.orders) {
            this.$message({
              message: "获取打印数据失败",
              type: "warning"
            });
            return false;
          }
          var printData = r.data.data.orders;

          var LODOP = getLodop();
          LODOP.PRINT_INIT("打印销售单");
          // LODOP.SET_PRINT_PAGESIZE(0, 2100, 2400, 'bills');

          for (var j = 0; j < printData.length; j++) {
            // LODOP.NewPage();
            var nowHeight = 0; //初始高度0

            // 循环开始
            LODOP.ADD_PRINT_TEXT(
              nowHeight + 15,
              300,
              500,
              100,
              `${r.data.data.area}${r.data.data.seller_name}销售单`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 15); //距离顶部20加字体加间距总高40
            nowHeight += 40;
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              30,
              200,
              100,
              `客户名称：${printData[j].order.buyer_shop_name}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12); //距离顶部20加字体加间距总高30
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              250,
              200,
              100,
              `客户电话：${printData[j].order.buyer_tel}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12); //距离顶部20加字体加间距总高30
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              500,
              250,
              100,
              `编号：${printData[j].order.order_no}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12); //距离顶部20加字体加间距总高30
            nowHeight += 30;
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              30,
              500,
              100,
              `配送地址：${printData[j].order.receipt_address}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12); //距离顶部20加字体加间距总高30
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              500,
              200,
              100,
              `送货日期：${printData[j].order.purchases_date}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12); //距离顶部20加字体加间距总高30
            nowHeight += 30;
            var tableMain = `
            <style> 
              table,td,th {border-width: 1px;border-style: solid;border-collapse: collapse;text-align:center}
             td{height:50px;font-size:10px}
            </style>
            <table style="border-collapse:collapse">
              <tr><td width="20%">品名</td><td width="4%">数量</td><td width="4%">单价</td><td width="4%">合计</td><td width="4%">单位</td></tr>`;
            if (printData[j].order.goods.length > 4) {
              for (var i = 0; i < printData[j].order.goods.length; i++) {
                tableMain += `<tr><td width="20%">${
                  printData[j].order.goods[i].goods_name
                }</td>
                                <td width="4%">${
                                  printData[j].order.goods[i].acceptance_num
                                }</td>
                                <td width="4%">${printData[j].order.goods[i]
                                  .goods_sell_price / 100}</td>
                                <td width="4%">${printData[j].order.goods[i]
                                  .total_money / 100}</td>
                                <td width="4%">${
                                  printData[j].order.goods[i].sell_unit
                                }</td></tr>`;
              }
            } else {
              for (var i = 0; i < 4; i++) {
                if (i < printData[j].order.goods.length) {
                  tableMain += `<tr><td width="20%">${
                    printData[j].order.goods[i].goods_name
                  }</td>
                                <td width="4%">${
                                  printData[j].order.goods[i].acceptance_num
                                }</td>
                                <td width="4%">${printData[j].order.goods[i]
                                  .goods_sell_price / 100}</td>
                                <td width="4%">${printData[j].order.goods[i]
                                  .total_money / 100}</td>
                                <td width="4%">${
                                  printData[j].order.goods[i].sell_unit
                                }</td></tr>`;
                } else {
                  tableMain += `<tr><td width="20%">&nbsp;</td>
                                <td width="4%">&nbsp;</td>
                                <td width="4%">&nbsp;</td>
                                <td width="4%">&nbsp;</td>
                                <td width="4%">&nbsp;</td></tr>`;
                }
              }
            }
            tableMain += "</table>";
            var tableHeight =
              printData[j].order.goods.length < 5
                ? 267
                : 72 * (printData[j].order.goods.length);
            LODOP.ADD_PRINT_TABLE(nowHeight, 30, 550, tableHeight, tableMain);

            LODOP.ADD_PRINT_TEXT(
              nowHeight + 20,
              585,
              200,
              100,
              `售后电话：${printData[j].order.after_sale_tel}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(
              nowHeight + 50,
              585,
              200,
              200,
              `公司地址：${printData[j].order.company_address}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(
              nowHeight + 110,
              585,
              200,
              200,
              `退货要求：${printData[j].order.return_goods_remark}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(nowHeight + 190, 585, 200, 200, "客户签收:");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            // 备注数据处理
            let getMoney, NogetMoney;
            if (printData[j].order.pay_mode == "在线支付") {
              getMoney = printData[j].order.total_money;
              NogetMoney = 0;
            } else {
              getMoney = 0;
              NogetMoney = printData[j].order.total_money;
            }

            nowHeight += tableHeight + 10;
            LODOP.ADD_PRINT_TEXT(nowHeight, 30, 200, 100, "备注");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            nowHeight += 30;
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              30,
              200,
              100,
              `件数：${printData[j].order.total_num}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              250,
              200,
              100,
              `本单金额：${printData[j].order.total_money / 100}元`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(nowHeight, 450, 200, 100, "运费：0元");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            nowHeight += 30;
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              30,
              200,
              100,
              `已收款：${getMoney / 100}元`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              250,
              200,
              100,
              `未收金额：${NogetMoney / 100}元`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            nowHeight += 30;

            LODOP.ADD_PRINT_RECT(nowHeight, 30, 750, 1, 0, 1);
            // 边框离纸张顶端10px(px是绝对值长度，等于1/96英寸,下同)距左边55px、宽360px、高220px、
            // 框为实线(0-实线 1-破折线 2-点线 3-点划线 4-双点划线)、线宽为1px
            nowHeight += 10;

            LODOP.ADD_PRINT_TEXT(nowHeight, 30, 200, 20, "付款方式：1.现金");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              180,
              250,
              20,
              `2.支付宝${printData[j].order.alipay}`
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(
              nowHeight,
              420,
              200,
              20,
              "请备注店名，以方便查账"
            );
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            nowHeight += 12;
            // nowHeight+=50;

            for (var k = 0; k < Math.ceil(nowHeight / 528); k++) {
              LODOP.NewPage();
            }
            // console.log(totalHeight)
            // LODOP.ADD_PRINT_RECT(528,30,750,1,0,1);
            // 循环结束
          }
          // LODOP.SET_PRINT_PAGESIZE(0,2100,nowHeight,"")
          LODOP.SET_PRINT_PAGESIZE(0, 2100, 1400, "");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
          // LODOP.SET_PREVIEW_WINDOW(0,1,0,800,600,"");//打印前弹出选择打印机的对话框
          LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW", 1); //打印后自动关闭预览窗口
          LODOP.PREVIEW();
        });
    },
    // 导出功能
    exportMsg() {
      if (this.searchParam.start_date && this.searchParam.end_date) {
        this.$el.querySelector("#searchForm").submit();
      } else {
        this.$message({
          message: "请选择导出日期！",
          type: "warning"
        });
      }
    }
  },
  created() {
    this.search();
    this.getDataTips();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mainBox {
  height: 100%;
  background: #fff;
  .searchArea {
    margin: 0 10px 0px;
    padding: 15px 0 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    justify-content: flex-start;
    & > div {
      display: flex;
      justify-content: space-between;
      span {
        text-align: right;
        line-height: 42px;
        min-width: 95px;
      }
      .line {
        text-align: center;
        line-height: 42px;
        margin: 0 5px;
      }
    }
  }
  .btnGuoup {
    display: flex;
    justify-content: flex-end;
    margin: 0 10px 10px;
    padding-bottom: 10px;
  }
  .tableArea {
    margin: 10px;
  }
  .pageControl {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>