// 采购页面
<template>
  <div class="mainBox">
      <!-- 搜索条件 -->
      <!-- 本地 -->
      <!-- <form  id="searchForm" action="/api/provider/purchases/export" method="get" target="_blank"> -->
       <!-- 线上版本 -->
      <form  id="searchForm" :action="formAction" method="get" target="_blank">
        <div class="searchArea">
          <div>
            <div class="block">
              <el-date-picker
                v-model="searchParam.start_date"
                name="start_date"
                type="date"
                @change="getDataTips"
                placeholder="开始日期">
              </el-date-picker>
            </div>
            <div class="line">至</div>
            <div class="block">
              <el-date-picker
                v-model="searchParam.end_date"
                name= "end_date"
                type="date"
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
          <div class="demo-input-suffix">
            <span>客户名：</span>  
             <el-autocomplete 
              v-model="searchParam.buyer"
              name="buyer"
              :fetch-suggestions="queryBuyerName"
              :trigger-on-focus="true"
              >
            </el-autocomplete>
            <!-- <el-input v-model="searchParam.buyer" name="buyer"></el-input> -->
          </div>
          <div class="demo-input-suffix">
            <span>商品名：</span> 
             <!-- <el-select
              v-model="searchParam.goods_name"
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
            </el-select>  -->
            <MoreChoice v-model="searchParam.goods_name"  :selectAllInfo="selectData.goods" ></MoreChoice>
            <!-- <el-input v-model="searchParam.goods_name" name="goods_name"></el-input> -->
          </div>
        </div>
        <div class="searchArea">
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
            <span>采购方式：</span>
            <el-select class="" v-model="searchParam.purchases_mode" name="status" clearable  placeholder="请选择">
              <el-option
                v-for="item in selectData.purchases_mode"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="btnGuoup">
            <el-button type="success" icon="el-icon-search" @click="search">确认</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="moreEdit">批量修改</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="moreCallGoods">批量叫货</el-button>
            <el-button type="primary" icon="el-icon-document" @click="exportMsg">导出</el-button>
           
            
          </div>
        </div>
        <!-- 搜索按钮 -->
     
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
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
          >
         
           <el-table-column
            fixed
            label="采购时间"
            type="selection"
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
            label="采购时间"
            min-width="80"
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
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="seller_shop"
            label="供应商名称"
            sortable
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
            prop="purchases_modeName"
            label="采购方式"
            min-width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名"
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
            prop="purchases_price"
            label="采购价格"
            min-width="120"
            :formatter="formatter"
            sortable="custom"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goods_sell_price"
            label="销售价格"
            min-width="80"
            :formatter="formatter"
            align="center">
          </el-table-column>
          <el-table-column
            prop="statusName"
            label="采购状态"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reach_status"
            label="到货状态"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="acceptance_num"
            label="到货数量"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
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
            :page-size=50
            layout="prev, pager, next"
            @current-change="pageChange"
            :total="dataTotal">
          </el-pagination>
      </div>

      <!-- 修改供应商弹出框（批量修改） -->
      <el-dialog title="修改资料" :visible.sync="dialogFormVisible2" width="60%">
          <el-row class="oneLine">
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购日期：</div></el-col>
                <el-col :span="18">
                  <el-date-picker
                    v-model="changeSellData.purchases_date"
                    name="start_date"
                    type="date"
                    @change="getDataTips"
                    placeholder="开始日期">
                  </el-date-picker>
                </el-col>
            </div></el-col>
            <el-col :span="12">
              <div class="grid-content inputGroup">                
                <el-col :span="6"><div class="inputTitle">采购方式：</div></el-col>
                <el-col :span="18">
                  <el-select v-model="changeSellData.purchases_mode" clearable placeholder="请选择">
                    <el-option
                      v-for="item in selectData.purchases_mode"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </div>
            </el-col>
          </el-row>   
          <el-row class="oneLine">
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">供应商名称：</div></el-col>
                <el-col :span="18"><el-input v-model="changeSellData.seller_shop"></el-input></el-col>
            </div></el-col>
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">供应商电话：</div></el-col>
                <el-col :span="18"><el-input v-model="changeSellData.seller_tel"></el-input></el-col>
            </div></el-col>
          </el-row>   
          <el-row class="oneLine">
           <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购状态：</div></el-col>
                 <el-col :span="18">
                  <el-select v-model="changeSellData.status" placeholder="请选择">
                    <el-option
                      v-for="item in selectData.status"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
            </div></el-col>
          </el-row> 
         

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changeSeller">确 定</el-button>
          <el-button @click="dialogFormVisible2 = false">取 消</el-button> 
        </div>
      </el-dialog>
       <!-- 修改资料弹出框 -->
      <el-dialog title="修改资料" :visible.sync="dialogFormVisible" width="65%">
        <div>
          <el-row class="oneLine">
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">客户名称：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.buyer_shop_name"></el-input></el-col>
            </div></el-col>
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">客户电话：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.buyer_tel"></el-input></el-col>
            </div></el-col>
            
          </el-row>  
          <el-row class="oneLine">
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">供应商名称：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.seller_shop"></el-input></el-col>
            </div></el-col>
             <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">供应商电话：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.seller_tel"></el-input></el-col>
            </div></el-col>
          </el-row>  
          <el-row class="oneLine">
            
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">商品名：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.goods_name"></el-input></el-col>
            </div></el-col>
             <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购数量：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.purchases_num"></el-input></el-col>
            </div></el-col>
          </el-row>
          <el-row class="oneLine">
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购价格：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.purchases_price"></el-input></el-col>
            </div></el-col>
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">销售价格：</div></el-col>
                <el-col :span="18"><el-input v-model="changeData.goods_sell_price"></el-input></el-col>
            </div></el-col>
          </el-row>  
          <el-row class="oneLine">
            <el-col :span="12"><div class="grid-content inputGroup">
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
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购方式：</div></el-col>
                <el-col :span="18">
                  <el-select v-model="changeData.purchases_mode" clearable  placeholder="请选择">
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
          <el-row class="oneLine">
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">采购日期：</div></el-col>
                <el-col :span="18">
                  <el-date-picker
                    v-model="changeData.purchases_date"
                    name="start_date"
                    type="date"
                    @change="getDataTips"
                 >
                  </el-date-picker>
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
import "../../../tool.js";
export default {
  name: "purchaseIndex",
  data() {
    return {
      // 搜索条件
      searchParam: {
        start_date: new Date(), //开始时间
        end_date: new Date(), //结束时间
        seller: "", //客户供应商
        buyer: "", //买家
        goods_name: [], //商品名
        page: 1, //当前页
        size: 50, //每页数量
        reach_status: "", //到货状态
        status: [], //采购状态
        purchases_mode: "" //采购方式
      },
      // 获取商品的时间
      getGoodsTime: {
        start_date: "", //开始时间
        end_date: "" //结束时间
      },
      // 输入提示内容
      tips:{
        sellerTips:[],
        buyerTips:[],
      },
      // 下拉框数据
      selectData: {
        // 采购方式
        purchases_mode: [],
        // 采购状态
        status: [],
        // 商品名称
        goods: [],
        // 到货状态
        reach_status: [
          { id: 1, name: "未收货" },
          { id: 2, name: "已收货" },
          { id: 3, name: "等待处理" }
        ]
      },
      dataTotal: 0,
      // 表格数据
      tableData: [],
      // 复选框中的项
      multipleSelection: [],
      // 需要编辑的数据
      changeData: {},
      changeDataOld: {},
      // 修改项弹出框是否展示
      dialogFormVisible: false,
      // 修改供应商弹出框是否展示
      dialogFormVisible2: false,
      // 批量修改参数
      changeSellData: {
        purchases_date:new Date(),//采购日期
        seller_shop: "", //供货商店名
        seller_tel: "", //供货商电话
        status:"",//采购状态
        purchases_mode: "" //采购方式
      }
    };
  },
  computed: {
    formAction() {
      let url = "";
      if (window.location.hostname == "localhost") {
        url = "/api/provider/purchases/export";
      } else {
        url = "/provider/purchases/export";
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
      for (var i in sendParam) {
        if (!sendParam[i]) {
          delete sendParam[i];
        }else if(sendParam[i].length==0) {
          delete sendParam[i];
        }
      }
      
      if (sendParam.start_date) {
        sendParam.start_date = $tools.dateFormat(sendParam.start_date);
      }
      if (sendParam.end_date) {
        sendParam.end_date = $tools.dateFormat(sendParam.end_date);
      }
      this.$axios
        .post("/provider/allocate/purchases/list", sendParam)
        .then(function(r) {
          that.dataTotal = r.data.data.total;
          for (var i = 0; i < r.data.data.goods.length; i++) {
            for (var j = 0; j < that.selectData.purchases_mode.length; j++) {
              if (
                that.selectData.purchases_mode[j].id ==
                r.data.data.goods[i].purchases_mode
              ) {
                r.data.data.goods[i].purchases_modeName =
                  that.selectData.purchases_mode[j].name;
              }
            }
            for (var j = 0; j < that.selectData.status.length; j++) {
              if (that.selectData.status[j].id == r.data.data.goods[i].status) {
                r.data.data.goods[i].statusName =
                  that.selectData.status[j].name;
              }
            }
          }
          that.tableData = r.data.data.goods;
        })
        .catch(function() {
          console.log("获取数据失败");
        });
    },
    // 页面跳转
    pageChange(page) {
      this.searchParam.page = page;
      this.search();
    },
    // 获取常规数据（如码表对应关系）
    getNormalData() {
      var that = this;
      Promise.all([
        that.$axios.get("/provider/allocate/purchases-mode/list"),
        that.$axios.get("/provider/allocate/purchases-status/list")
      ]).then(results => {
        that.selectData.purchases_mode = results[0].data.data;
        that.selectData.status = results[1].data.data;
        that.search();
      });
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
    querySearchName() {},
    // // 获取商品列表
    // getShopList(val){
    //   let that = this;
    //   if(!val) return false
    //   if(that.searchParam.start_date&&that.searchParam.end_date&&(that.searchParam.end_date>=that.searchParam.end_date)){
    //     if(($tools.dateFormat(that.searchParam.start_date)==that.getGoodsTime.start_date)&&($tools.dateFormat(that.searchParam.end_date)==that.getGoodsTime.end_date)) return false;
    //     that.searchParam.goods_name=[];
    //     that.selectData.goods=[];
    //     that.$axios.get("/provider/order/goods/species/list",{
    //       params:{
    //         start_date:$tools.dateFormat(new Date(that.searchParam.start_date)),
    //         end_date:$tools.dateFormat(new Date(that.searchParam.end_date))
    //       }
    //     }).then(function(r){
    //       that.getGoodsTime.start_date=$tools.dateFormat(new Date(that.searchParam.start_date));
    //       that.getGoodsTime.end_date=$tools.dateFormat(new Date(that.searchParam.end_date));
    //       r.data.data.forEach(function(item,index){
    //         that.selectData.goods.push({
    //           value:item.goods_name
    //         })
    //       })
    //     }).catch(function(err){
    //       console.log(err)
    //       that.$message.error({
    //         message: '获取商品列表失败！'
    //       });
    //     })
    //   }else{
    //     that.$message.error({
    //       message: '请选择正取的时间！'
    //     });
    //   }
    // },
    // 获取当前行的订单详情
    getNowGoods(index, rows) {
      this.goodsInfo = rows[index].goods;
    },
    // 表单功能
    // 表格数据过滤
    formatter(row, column) {
      return (row[column.property] / 100).toFixed(2);
    },
    // 全选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
     
    },
    // 编辑功能
    editInfo(data) {
      // 将当前行的数据单独保存起来,显示弹窗
      this.changeData = JSON.parse(JSON.stringify(data));
      this.changeData.purchases_price = (
        this.changeData.purchases_price / 100
      ).toFixed(2);
      this.changeData.goods_sell_price = (
        this.changeData.goods_sell_price / 100
      ).toFixed(2);
      this.changeData.purchases_date = new Date(this.changeData.purchases_date)
      this.changeDataOld = JSON.parse(JSON.stringify(data));
      this.dialogFormVisible = true;
    },
    // 编辑提交
    submintForm() {
      var that = this;
      var sendParam = {};
      for (var i in this.changeData) {
        if (this.changeData[i] != this.changeDataOld[i]) {
          sendParam[i] = this.changeData[i];
        }
      }
      if (Object.keys(sendParam).length == 0) {
        this.$message({
          message: "未有修改数据！！",
          type: "warning"
        });
        this.dialogFormVisible = false;
      } else {
        // 如果有价格，价格要转化为分
        if (sendParam.purchases_price) {
          sendParam.purchases_price = this.$utils.yuanTofen(sendParam.purchases_price);
        }
        if (sendParam.goods_sell_price) {
          sendParam.goods_sell_price = this.$utils.yuanTofen(sendParam.goods_sell_price);
        }
        if (sendParam.purchases_date) {
          sendParam.purchases_date = $tools.dateFormat(sendParam.purchases_date)
        }
        this.$axios
          .post("/provider/purchases/update", [
            {
              id: that.changeData.id,
              fields: sendParam
            }
          ])
          .then(function() {
            that.$message({
              message: "修改成功！",
              type: "success"
            });
            that.dialogFormVisible = false;
            that.search();
          })
          .catch(function() {
            that.$message.error({
              message: "修改失败！"
            });
            console.log("获取数据失败");
            that.dialogFormVisible = false;
          });
      }
    },
    // 批量修改
    moreEdit() {
      if (this.multipleSelection.length > 0) {
        this.dialogFormVisible2 = true;
        // 弹出框数据清零
        this.changeSellData = {
          purchases_date:new Date(),
          seller_shop: "", //供货商店名
          seller_tel: "", //供货商电话
          purchases_mode: 3,
          status:1
        };
      } else {
        this.$message({
          message: "请选择要修改项！！",
          type: "warning"
        });
        return false;
      }
    },
    // 批量叫货
    moreCallGoods(){
      if (this.multipleSelection.length > 0) {
        console.log(this.multipleSelection)
        let sendParam = {
          ids: []
        };
        for (let i = 0; i < this.multipleSelection.length; i++) {
          sendParam.ids.push(this.multipleSelection[i].id);
        }
         this.$axios
          .post("/provider/purchases/take-goods/confirm",sendParam).then(res=>{
            this.$message({
              message: "修改叫货状态成功！",
              type: "success"
            });
            this.search()
          }).catch((err)=> {
            this.$message.error({
              message: "修改叫货状态失败！"
            });
            console.log("err");
          });

      } else {
        this.$message({
          message: "请选择叫货商品",
          type: "warning"
        });
        return false;
      }
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
    },
   
    // 供应商修改提交
    changeSeller() {
      var that = this;
      // 组装发送数据
      var sendParam = {
        ids: [],
        values: {}
      };
      for (let i = 0; i < this.multipleSelection.length; i++) {
        sendParam.ids.push(this.multipleSelection[i].id);
      }
      this.changeSellData.seller_shop
        ? (sendParam.values.seller_shop = this.changeSellData.seller_shop)
        : "";
      this.changeSellData.seller_tel
        ? (sendParam.values.seller_tel = this.changeSellData.seller_tel)
        : "";
      this.changeSellData.purchases_mode
        ? (sendParam.values.purchases_mode = this.changeSellData.purchases_mode)
        : "";
      this.changeSellData.status
        ? (sendParam.values.status = this.changeSellData.status)
        : "";
      this.changeSellData.purchases_date
        ? (sendParam.values.purchases_date =$tools.dateFormat(this.changeSellData.purchases_date))
        : "";
      // console.log(sendParam)
      this.$axios
        .post("/provider/purchases/seller/update", sendParam)
        .then(function(r) {
          console.log(r.data.code);
          if (r.data.code == 0) {
            that.$message({
              message: "修改成功！",
              type: "success"
            });
            that.dialogFormVisible2 = false;
            that.search();
          } else {
            that.$message.error({
              message: "修改失败！"
            });
            console.log("获取数据失败1");
            that.dialogFormVisible2 = false;
          }
        })
        .catch(function() {
          that.$message.error({
            message: "修改失败！"
          });
          console.log("获取数据失败");
          that.dialogFormVisible2 = false;
        });
    },
    sortChange(type){
      // 
      // console.log(type)
      if(type.prop=="purchases_price"){
        this.searchParam.sorts={};
        switch(type.order){
          case "ascending":
          this.searchParam.sorts[type.prop]="A";
          this.search();
          break;
          case "descending":
          this.searchParam.sorts[type.prop]="D";
          this.search();
          break;
        }
      }else{
        delete this.searchParam.sorts;
        this.search();
      }
    }
  },
  created() {
    this.getNormalData();
    this.getDataTips();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mainBox {
  height: 100%;
  background: #fff;
  #searchForm {
    border-bottom: 1px solid #ccc;
    .demo-input-suffix{
      &>div{
        width: 200px;
      }
    }
    & > div {
      height: 40px;
      span {
        height: 40px;
      }
      div {
        height: 40px;
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
    height: 40px !important;
    justify-content: flex-start;
    .el-date-editor.el-input {
      width: 160px;
    }

    .el-select {
      width: 180px;
    }
    & > div {
      display: flex;
      justify-content: space-between;
      span {
        text-align: right;
        line-height: 42px;
        min-width: 75px;
      }

      .line {
        text-align: center;
        line-height: 42px;
        margin: 0 5px;
      }
    }
    .selecDiv {
      & > span {
        font-size: 16px;
        min-width: 90px;
        text-align: right;
      }
    }
  }
  .bigSelect {
    width: 300px;
  }

  .tableArea {
    margin: 10px;
  }
  .pageControl {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  // 弹出框样式
  .oneLine {
    margin-bottom: 20px;
    .el-select {
      width: 100%;
    }
    .inputGroup {
      .inputTitle {
        text-align: right;
        padding-right: 15px;
        // line-height: 40px;
      }
    }
  }
}
</style>