// 订单列表页面
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
          <!-- <el-input v-model="searchParam.buyer"></el-input> -->
          <el-autocomplete 
            v-model="searchParam.buyer"
            :fetch-suggestions="querySearchName"
            :trigger-on-focus="true"
            >
          </el-autocomplete>
        </div>
         <!-- 搜索按钮 -->
        <div class="btnGuoup">
            <el-button type="success" icon="el-icon-search" @click="search">确认</el-button>
            <el-button type="primary" icon="el-icon-tickets" @click="addOrder">添加订单</el-button>
        </div>
      </div>
      <!-- 表单 -->
      <div class="tableArea">
        <el-table
          :data="tableData"
          :stripe=true
          max-height="4000"
          border
          align="center"
          >
        
          <el-table-column
            prop="order_no"
            label="订单号"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="consign_date"
            label="送货时间"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="buyer_shop_name"
            label="店铺名称"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="buyer_tel"
            label="客户电话"
            min-width="80"
            align="center">
          </el-table-column>
            <el-table-column
            prop="receipt_address"
            label="地址"
            min-width="120"
            align="center">
          </el-table-column>
            <el-table-column
            prop="pay_mode"
            label="付款方式"
            min-width="40"
            align="center">
          </el-table-column>
            <el-table-column
            prop="buy_num"
            label="购买总数"
            min-width="40"
            align="center">
          </el-table-column>
            <el-table-column
            prop="total_amount"
            label="总金额"
            min-width="50"
            :formatter="formatter"
            align="center">
          </el-table-column>
            <el-table-column
            prop="receipt_area_code"
            label="配送区域"
            min-width="50"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                width="1200"
                trigger="click">
                <el-table :data="goodsInfo" border max-height="500">
                 
                  <el-table-column min-width="150" align="center" property="goods_name" label="品名"></el-table-column>
                  <el-table-column min-width="100" align="center" property="goods_sell_price" label="单价" :formatter="formatter"></el-table-column>
                  <el-table-column min-width="100" align="center" property="buy_num" label="数量"></el-table-column>
                  <el-table-column min-width="100" align="center" property="sell_unit" label="单位"></el-table-column>
                  <el-table-column min-width="150" align="center" property="goods_number" label="商品编号"></el-table-column>
                  <el-table-column min-width="200" align="center" property="seller_shop" label="供应商名称"></el-table-column>
                  <el-table-column min-width="200" align="center" property="seller_tel" label="供应商电话"></el-table-column>
                </el-table>
                <el-button slot="reference" type="text" @click.native.prevent="getNowGoods(scope.$index, tableData)">订单详情</el-button>
              </el-popover>
              <el-button @click="addGoods(scope.row)" type="text">添加商品</el-button>
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
      <!-- 订单添加商品 -->
      <el-dialog title="添加商品" :visible.sync="dialogFormVisible1" width="80%" :close-on-click-modal=false>
        <div class="addGoodsForm">
            <el-button @click="addOneGood" type="text">添加商品</el-button>
              <el-table
                :data="addGoodsInfo.goods"
                 :stripe=true
                  max-height="800"
                  border
                  align="center">
               
                <el-table-column
                  prop="goods_name"
                  label="商品名称"
                  min-width="200"
                  align="center">
                    <template slot-scope="scope">
                      <el-autocomplete 
                      v-model="scope.row.goods_name"
                      :fetch-suggestions="querySearchGoods"
                      @select="handleSelectGoods2"
                      @focus="getRow(scope.$index)"
                      >
                      </el-autocomplete>
                      <!-- <el-input v-model="scope.row.goods_name"></el-input> -->
                    </template>
                </el-table-column>
                <el-table-column
                  prop="goods_sell_price"
                  label="销售价格"
                  min-width="80"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.goods_sell_price" @change="sumMoney2(scope.$index)"></el-input>
                    </template>
                </el-table-column>
                 <el-table-column
                  prop="buy_num"
                  label="数量"
                  min-width="80"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.buy_num" @change="sumMoney2(scope.$index)"></el-input>
                    </template>
                </el-table-column>
                 <el-table-column
                  prop="goods_sell_price"
                  label="合计金额"
                  min-width="80"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.totalMoney" disabled></el-input>
                    </template>
                </el-table-column>
                 <el-table-column
                  prop="sell_unit"
                  label="单位"
                  min-width="80"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sell_unit"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="seller_shop"
                  label="供应商"
                  min-width="200"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.seller_shop"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="seller_tel"
                  label="供应商电话"
                  min-width="120"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.seller_tel"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  align="center"
                  width="80">
                    <template slot-scope="scope">
                      <el-button @click="deleteOneGood(scope.$index)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
              </el-table>
           
            <div class="btnGuoup2">
                <el-button @click="submitAddGoods" type="primary">添加商品</el-button>
            </div>
        </div>
      </el-dialog>
      <!-- 添加订单 -->
      <el-dialog title="添加订单" :visible.sync="dialogFormVisible2" width="80%" :close-on-click-modal=false>
        <div class="addGoodsForm">
          <el-form :model="addOrderInfo.order" :rules="rules" label-width="120px" ref="orderForm">
            <el-row>
                <el-col :span="8">
                <el-form-item label="客户铺名:" prop="buyer_shop_name">
                    <el-autocomplete 
                    v-model="addOrderInfo.order.buyer_shop_name"
                    :fetch-suggestions="querySearchName"
                    @select="handleSelectName"
                    :trigger-on-focus="true"
                    >
                    </el-autocomplete>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="客户电话:" prop="buyer_tel">
                    <!-- <el-input v-model="addOrderInfo.order.buyer_tel"></el-input> -->
                    <el-autocomplete 
                    ref="valInput2"
                    v-model="addOrderInfo.order.buyer_tel"
                    :fetch-suggestions="querySearchTel"
                    @select="handleSelectTel"
                    :trigger-on-focus="false"
                    >
                    </el-autocomplete>
                </el-form-item>  
                </el-col>
                <el-col :span="7">
                <el-form-item label="收货地址:" prop="receipt_address">
                    <!-- <el-input  v-model="addOrderInfo.order.receipt_address"></el-input> -->
                    <el-autocomplete 
                    ref="valInput"
                    v-model="addOrderInfo.order.receipt_address"
                    :fetch-suggestions="querySearchAddress"
                     @select="handleSelectAddress"
                     >
                    </el-autocomplete>
                </el-form-item>  
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                <el-form-item label="商品运费:" prop="freight">
                    <el-input v-model="addOrderInfo.order.freight" ></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="支付方式:" prop="pay_mode">
                  <el-select v-model="addOrderInfo.order.pay_mode" clearable placeholder="请选择支付方式">
                      <el-option
                        v-for="item in selectOptions.pay_mode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>  
                </el-col>
                 <el-col :span="7">
                <el-form-item label="配送区代号:" prop="receipt_area_code">
                    <el-input v-model="addOrderInfo.order.receipt_area_code" ></el-input>
                </el-form-item>  
                </el-col>
            </el-row>    
            <el-row>
                <el-col :span="8">
                <el-form-item label="买家所在省:" prop="province_id">
                    <el-select v-model="addOrderInfo.order.province_id" @change="provinceChange" clearable placeholder="请选择省份">
                      <el-option
                        v-for="item in selectOptions.province_id"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="买家所在市:" prop="city_id">
                  <el-select v-model="addOrderInfo.order.city_id" @change="cityChange" clearable placeholder="请选择省份">
                    <el-option
                      v-for="item in selectOptions.city_id"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>  
                </el-col>
                <el-col :span="7">
                <el-form-item label="买家所在区:" prop="county_id">
                  <el-select v-model="addOrderInfo.order.county_id" @change="countyChange" clearable placeholder="请选择省份">
                    <el-option
                      v-for="item in selectOptions.county_id"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option> 
                  </el-select>
                </el-form-item>  
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="8">
                  <el-form-item label="订单日期:" prop="consign_date">
                      <!-- <el-input v-model="addOrderInfo.order.consign_date" ></el-input> -->
                      <el-date-picker
                        v-model="addOrderInfo.order.consign_date"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
              
            </el-row>  

          </el-form>
            <el-button @click="orderAddOneGood" type="text">添加商品</el-button>
            <div>
              <el-table
                :data="addOrderInfo.goods"
                 :stripe=true
                  max-height="800"
                  border
                  align="center">
               
                <el-table-column
                  prop="goods_name"
                  label="商品名称"
                  min-width="200"
                  align="center">
                    <template slot-scope="scope">
                      <el-autocomplete 
                      v-model="scope.row.goods_name"
                      :fetch-suggestions="querySearchGoods"
                      @select="handleSelectGoods"
                      @focus="getRow(scope.$index)"
                      >
                      </el-autocomplete>
                      <!-- <el-input v-model="scope.row.goods_name"></el-input> -->
                    </template>
                </el-table-column>
                <el-table-column
                  prop="goods_sell_price"
                  label="销售价格"
                  min-width="80"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.goods_sell_price" @change="sumMoney(scope.$index)"></el-input>
                    </template>
                </el-table-column>
                 <el-table-column
                  prop="buy_num"
                  label="数量"
                  min-width="80"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.buy_num" @change="sumMoney(scope.$index)"></el-input>
                    </template>
                </el-table-column>
                 <el-table-column
                  prop="totalMoney"
                  label="合计金额"
                  min-width="80"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.totalMoney" disabled></el-input>
                    </template>
                </el-table-column>
                 <el-table-column
                  prop="sell_unit"
                  label="单位"
                  min-width="80"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sell_unit"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="seller_shop"
                  label="供应商"
                  min-width="200"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.seller_shop"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="seller_tel"
                  label="供应商电话"
                  min-width="120"
                  align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.seller_tel"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  align="center"
                  width="80">
                    <template slot-scope="scope">
                      <el-button @click="deleteOrderOneGood(scope.$index)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
              </el-table>

            </div>
            <div class="btnGuoup2">
                <el-button @click="submitAddOrder" type="primary">添加订单</el-button>
            </div>
        </div>
      </el-dialog>
  </div>
</template>


<script>
import "../../../tool.js";
// import addGoods from 'components/AddGood'
export default {
  name: "OrderList",
  data() {
    return {
      // 弹窗时间避免重复刷新和验证问题
      openTime: "",
      // 搜索条件
      searchParam: {
        start_date: new Date(), //开始时间
        end_date: new Date(), //结束时间
        buyer: "", //客户名
        page: 1, //当前页
        size: 50 //每页数量
      },
      dataTotal: 0,
      // 下拉框属性
      selectOptions: {
        orderTypes: [
          { value: "0", label: "全部订单" },
          { value: "1", label: "未完成" }
        ],
        province_id: [],
        city_id: [],
        county_id: [],
        pay_mode: [] //支付方式
      },
      // 表格数据
      tableData: [],

      // 弹出框订单详情数据
      goodsInfo: [],
      // 订单添加商品相关操作
      // 是否显示
      dialogFormVisible1: false,
      // 添加商品信息
      addGoodsInfo: {
        order: "", //订单编号
        goods: []
      },
      // 添加商品模板
      goodsDemo: {
        goods_name: "", //商品名称
        goods_sell_price: 0, //商品销售价格
        buy_num: 0, //	购买数量
        sell_unit: "", //	商品售出单位
        seller_shop: "", //	供应商店铺名
        seller_tel: "", //	供应商联系电话
        totalMoney: "",
        goods_type: "无", //商品分类
        seller_address: "空", //供应商地址
        original_price: 0 //商品原价
      },
      // 添加订单相关操作
      dialogFormVisible2: false,
      // 搜索商铺输入建议
      allShopInfo: [],
      // 搜索商铺电话输入建议
      shopAddressList: [],
      // 搜索商品输入建议
      allGoodsList: [],
      // 当前输入行
      changeRowIndex: 0,
      // 添加订单信息
      addOrderInfo: {
        order: {
          buyer_shop_name: "", //采购商店铺名
          buyer_tel: "", //采购商联系电话
          receipt_address: "", //收货地址
          freight: "", //商品运费
          pay_mode: "1", //支付模式
          province_id: "", //买家所在省ID
          city_id: "", //	买家所在市ID
          county_id: "", //买家所在区县ID
          receipt_area: "", //配送区域 如：金牛区
          receipt_area_code: "", //配送区域代号 如：Y_1
          consign_date: ""
        },
        goods: []
      },
      rules: {
        buyer_shop_name: [
          { required: true, message: "店铺名不能为空!", trigger: "blur" }
        ],
        buyer_tel: [
          { required: true, message: "客户电话不能为空!", trigger: "blur" },
          { len: 11, message: "请输入正确的电话！", trigger: "blur" }
        ],
        receipt_address: [
          { required: true, message: "收货地址不能为空!", trigger: "blur" }
        ],
        freight: [
          { required: true, message: "商品运费不能为空!", trigger: "blur" }
        ],
        pay_mode: [
          { required: true, message: "支付模式不能为空!", trigger: "blur" }
        ],
        province_id: [
          { required: true, message: "买家所在省不能为空!", trigger: "blur" }
        ],
        city_id: [
          { required: true, message: "买家所在市不能为空!", trigger: "blur" }
        ],
        county_id: [
          { required: true, message: "买家所在区县不能为空!", trigger: "blur" }
        ],
        receipt_area_code: [
          { required: true, message: "配送区域不能为空!", trigger: "blur" },
          { min: 1, max: 5, message: "请输入正确的配送区域！", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    //  addGoods
  },
  methods: {
    // 表格数据过滤
    formatter(row, column) {
      return (row[column.property] / 100).toFixed(2);
    },
    // 请求页面数据
    search() {
      let that = this;
      let sendParamStr = JSON.stringify(this.searchParam);
      let sendParam = JSON.parse(sendParamStr);
      if (sendParam.start_date) {
        sendParam.start_date = $tools.dateFormat(sendParam.start_date);
      }
      if (sendParam.end_date) {
        sendParam.end_date = $tools.dateFormat(sendParam.end_date);
      }
      for (let i in sendParam) {
        if (!sendParam[i]) {
          delete sendParam[i];
        }
      }
      this.$axios
        .get("/provider/allocate/order/list", { params: sendParam })
        .then(function(r) {
          that.tableData = r.data.data.orders;
          that.dataTotal = r.data.data.total;
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
    // 表单相关操作
    // 获取当前行的订单详情
    getNowGoods(index, rows) {
      this.goodsInfo = rows[index].goods;
    },
    // 给一个订单添加商品
    addGoods(row) {
      this.openTime = new Date().getTime();
      this.addGoodsInfo.order = row.order_no;
      this.addGoodsInfo.goods = [];
      this.addGoodsInfo.goods.push(JSON.parse(JSON.stringify(this.goodsDemo)));
      this.dialogFormVisible1 = true;
    },
    // 添加商品中增加一个商品
    addOneGood() {
      this.addGoodsInfo.goods.push(JSON.parse(JSON.stringify(this.goodsDemo)));
    },
    // 添加商品中删除一个商品
    deleteOneGood(i) {
      this.addGoodsInfo.goods.delete(i);
      if (this.addGoodsInfo.goods.length == 0) {
        this.addGoodsInfo.goods.push(
          JSON.parse(JSON.stringify(this.goodsDemo))
        );
      }
    },
    // 添加商品中的自动填充
    handleSelectGoods2(value) {
      this.addGoodsInfo.goods[this.changeRowIndex].goods_sell_price =
        value.goods_sell_price / 100;
      this.addGoodsInfo.goods[this.changeRowIndex].sell_unit = value.sell_unit;
      this.addGoodsInfo.goods[this.changeRowIndex].seller_shop =
        value.seller_shop;
      this.addGoodsInfo.goods[this.changeRowIndex].seller_tel =
        value.seller_tel;
      this.addGoodsInfo.goods[this.changeRowIndex].goods_type =
        value.goods_type;
      this.addGoodsInfo.goods[this.changeRowIndex].seller_address =
        value.seller_address;
      this.addGoodsInfo.goods[this.changeRowIndex].original_price =
        value.original_price / 100;
    },
    // 添加商品中计算总价
    sumMoney2(i) {
      // console.log(i)
      this.addGoodsInfo.goods[i].totalMoney =
        this.addGoodsInfo.goods[i].goods_sell_price *
        this.addGoodsInfo.goods[i].buy_num;
    },
    // 提交增加商品
    submitAddGoods() {
      let flag = true;
      let that = this;
      // this.$refs.Goodform.forEach(function(value,i){
      //   let a = value.validateForm()
      //   if(!a){
      //     flag=false
      //   }
      // })
      if (flag) {
        this.addGoodsInfo.goods.forEach(function(value, i) {
          value.goods_sell_price = this.$utils.yuanTofen(value.goods_sell_price);
          value.original_price = this.$utils.yuanTofen(value.original_price);
        });
        this.$axios
          .post("/provider/allocation/order/goods/add", that.addGoodsInfo)
          .then(function(r) {
            if (r.data.code == 0) {
              that.$message({
                message: "添加成功！",
                type: "success"
              });
              that.search();
              that.dialogFormVisible1 = false;
            } else {
              that.$message.error({
                message: "添加失败！"
              });
              that.addGoodsInfo.goods.forEach(function(value, i) {
                value.goods_sell_price = this.$utils.yuanTofen(value.goods_sell_price);
                value.original_price = this.$utils.yuanTofen(value.original_price);
              });
            }
          })
          .catch(function() {
            that.$message.error({
              message: "添加失败！"
            });
            that.addGoodsInfo.goods.forEach(function(value, i) {
              value.goods_sell_price = value.goods_sell_price / 100;
              value.original_price = value.original_price / 100;
            });
          });
      } else {
        this.$message.error("请完善资料！");
        return false;
      }
    },
    // 添加订单
    addOrder() {
      this.dialogFormVisible2 = true;
      this.openTime = new Date().getTime();
      this.addOrderInfo = {
        order: {
          buyer_shop_name: "",
          buyer_tel: "",
          receipt_address: "",
          freight: 0,
          pay_mode: "1",
          province_id: "",
          city_id: "",
          county_id: "",
          receipt_area: "",
          receipt_area_code: "",
          consign_date: new Date()
        },
        goods: []
      };
      this.addOrderInfo.goods.push(JSON.parse(JSON.stringify(this.goodsDemo)));
    },
    // 订单添加一个商品
    orderAddOneGood() {
      this.addOrderInfo.goods.push(JSON.parse(JSON.stringify(this.goodsDemo)));
    },
    // 添加商品中删除一个商品
    deleteOrderOneGood(i) {
      this.addOrderInfo.goods.delete(i);
      if (this.addOrderInfo.goods.length == 0) {
        this.addOrderInfo.goods.push(
          JSON.parse(JSON.stringify(this.goodsDemo))
        );
      }
    },
    // 省市区3级联动
    provinceChange(cb) {
      let that = this;
      // 清空省则清空市区
      that.addOrderInfo.order.city_id = "";
      that.addOrderInfo.order.county_id = "";
      that.selectOptions.city_id = [];
      that.selectOptions.county_id = [];
      if (that.addOrderInfo.order.province_id) {
        that.$axios
          .get(`/api/other/children/${that.addOrderInfo.order.province_id}`)
          .then(function(r) {
            r.data.data.forEach(item => {
              that.selectOptions.city_id.push({
                value: item.id,
                label: item.name
              });
            });
            if((typeof cb)=="function"){
              cb()
            }
          })
          .catch(function(err) {
            console.log(err);
            that.$message.error({
              message: "获市编码失败！"
            });
          });
      } else {
      }
    },
    cityChange(cb) {
      let that = this;
      // 清空市则清空区
      that.addOrderInfo.order.county_id = "";
      that.selectOptions.county_id = [];
      if (that.addOrderInfo.order.city_id) {
        that.$axios
          .get(`/api/other/children/${that.addOrderInfo.order.city_id}`)
          .then(function(r) {
            r.data.data.forEach(item => {
              that.selectOptions.county_id.push({
                value: item.id,
                label: item.name
              });
            });
            if((typeof cb)=="function"){
              cb()
            }
          })
          .catch(function(err) {
            console.log(err);
            that.$message.error({
              message: "获市编码失败！"
            });
          });
      } else {
      }
    },
    countyChange() {
      let that = this;
      if (that.addOrderInfo.order.county_id) {
        let a = that.selectOptions.county_id.filter(
          item => item.value == that.addOrderInfo.order.county_id
        );
        that.addOrderInfo.order.receipt_area = a[0].label;
      } else {
        that.addOrderInfo.order.receipt_area = "";
      }
    },

    submitAddOrder() {
      let flag = true;
      let that = this;
      that.$refs["orderForm"].validate(valid => {
        flag = valid;
      });
      if (flag) {
        that.addOrderInfo.order.consign_date = $tools.dateFormat(
          that.addOrderInfo.order.consign_date
        );
        that.addOrderInfo.order.freight = this.$utils.yuanTofen(that.addOrderInfo.order.freight);
        that.addOrderInfo.goods.forEach(function(value, i) {
          value.goods_sell_price = this.$utils.yuanTofen(value.goods_sell_price);
          value.original_price = this.$utils.yuanTofen(value.original_price);
        });
        if(!that.addOrderInfo.order.receipt_area){
          that.addOrderInfo.order.receipt_area=that.addOrderInfo.order.receipt_area_code
        }
        this.$axios
          .post("/provider/allocation/order/add", that.addOrderInfo)
          .then(function(r) {
            if (r.data.code == 0) {
              that.$message({
                message: "添加成功！",
                type: "success"
              });
              that.search();
              that.dialogFormVisible2 = false;
            } else {
              that.$message.error({
                message: "添加失败！"
              });
              that.addOrderInfo.order.freight =
                that.addOrderInfo.order.freight / 100;
              that.addOrderInfo.order.consign_date = new Date(
                that.addOrderInfo.order.consign_date
              );
              that.addOrderInfo.goods.forEach(function(value, i) {
                value.goods_sell_price = value.goods_sell_price / 100;
                value.original_price = value.original_price / 100;
              });
            }
          })
          .catch(function() {
            that.$message.error({
              message: "添加失败！"
            });
            that.addOrderInfo.order.consign_date = new Date(
              that.addOrderInfo.order.consign_date
            );
            that.addOrderInfo.order.freight =
              that.addOrderInfo.order.freight / 100;
            that.addOrderInfo.goods.forEach(function(value, i) {
              value.goods_sell_price = value.goods_sell_price / 100;
              value.original_price = value.original_price / 100;
            });
          });
      } else {
        that.$message.error("请完善资料！");
        return false;
      }
    },
    // 添加订单中商铺名的匹配
    querySearchName(queryString, cb) {
      let restaurants = this.allShopInfo;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString, "shop_name"))
        : restaurants;
      let a = [];
      results.forEach(function(item, index) {
        a.push({
          value: item.shop_name,
          tel: item.mobile_phone,
          id: item.id,
          province_id:item.province_id,
          city_id:item.city_id,
          county_id:item.county_id
        });
      });
      cb(a);
    },
    handleSelectName(value) {
      this.addOrderInfo.order.buyer_tel = value.tel;
      this.$axios
        .get("/custom/address/lists", {
          params: { id: value.id }
        })
        .then(r => {
          if (r.data.code == 0) {
            this.shopAddressList = r.data.data;
            this.addOrderInfo.order.receipt_address =
              r.data.data[0].full_address;
              this.addOrderInfo.order.province_id=value.province_id
              this.provinceChange(()=>{
                this.addOrderInfo.order.city_id=value.city_id
                this.cityChange(()=>{
                  this.addOrderInfo.order.county_id=value.county_id
                })
              })
            // console.log(value)
          }
        });
    },
    // 添加订单中商铺名的匹配
    querySearchTel(queryString, cb) {
      let restaurants = this.allShopInfo;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString, "mobile_phone"))
        : restaurants;
      let a = [];
      results.forEach(function(item, index) {
        a.push({
          value: `${item.shop_name} - ${item.mobile_phone}`,
          shop_name: item.shop_name,
          tel: item.mobile_phone,
          id: item.id,
          province_id:item.province_id,
          city_id:item.city_id,
          county_id:item.county_id
        });
      });

      cb(a);
    },
    handleSelectTel(value) {
      this.addOrderInfo.order.buyer_shop_name = value.shop_name;
      this.addOrderInfo.order.buyer_tel = value.tel;
      this.shopAddressList = value.address;
      this.$axios
        .get("/custom/address/lists", {
          params: { id: value.id }
        })
        .then(r => {
          if (r.data.code == 0) {
            this.shopAddressList = r.data.data;
            this.addOrderInfo.order.receipt_address =
              r.data.data[0].full_address;
              this.addOrderInfo.order.province_id=value.province_id
              this.provinceChange(()=>{
                this.addOrderInfo.order.city_id=value.city_id
                this.cityChange(()=>{
                  this.addOrderInfo.order.county_id=value.county_id
                })
              })
            // console.log(value)
          }
        });
      // this.addOrderInfo.order.receipt_address = value.addresses[0].full_address;
      this.$refs["valInput2"].$el.querySelectorAll("input")[0].focus();
      this.$refs["valInput2"].$el.querySelectorAll("input")[0].blur();
      // this.$refs["orderForm"].validate()
    },
    // 添加订单中店铺地址匹配
    querySearchAddress(queryString, cb) {
      let restaurants = this.shopAddressList;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString, "full_address"))
        : restaurants;
      let a = [];
      results.forEach(function(item, index) {
        a.push({
          value: item.full_address
        });
      });
      cb(a);
    },
    handleSelectAddress(value) {
      this.$refs["valInput"].$el.querySelectorAll("input")[0].focus();
      this.$refs["valInput"].$el.querySelectorAll("input")[0].blur();

      // console.log(this.$refs["valInput"])
      // this.$refs["orderForm"].validate()
    },
    // 添加商品规则
    querySearchGoods(queryString, cb) {
      let restaurants = this.allGoodsList;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString, "goods_name"))
        : restaurants;
      let a = [];
      results.forEach(function(item, index) {
        a.push({
          value: item.goods_name,
          goods_sell_price: item.goods_sell_price,
          sell_unit: item.sell_unit,
          seller_shop: item.seller_shop,
          seller_tel: item.seller_tel,
          goods_type: item.goods_type,
          seller_address: item.seller_address,
          original_price: item.original_price
        });
      });
      cb(a);
    },
    handleSelectGoods(value) {
      this.addOrderInfo.goods[this.changeRowIndex].goods_sell_price =
        value.goods_sell_price / 100;
      this.addOrderInfo.goods[this.changeRowIndex].sell_unit = value.sell_unit;
      this.addOrderInfo.goods[this.changeRowIndex].seller_shop =
        value.seller_shop;
      this.addOrderInfo.goods[this.changeRowIndex].seller_tel =
        value.seller_tel;
      this.addOrderInfo.goods[this.changeRowIndex].goods_type =
        value.goods_type;
      this.addOrderInfo.goods[this.changeRowIndex].seller_address =
        value.seller_address;
      this.addOrderInfo.goods[this.changeRowIndex].original_price =
        value.original_price;
    },
    // 得到当前行
    getRow(i) {
      this.changeRowIndex = i;
    },
    // 计算总价
    sumMoney(i) {
      this.addOrderInfo.goods[i].totalMoney =
        this.addOrderInfo.goods[i].goods_sell_price *
        this.addOrderInfo.goods[i].buy_num;
    },

    // 匹配规则
    createFilter(queryString, type) {
      return restaurant => {
        return (
          restaurant[type].toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    }
  },
  created() {
    let that = this;
    let a = that.$axios.get("/provider/payments");
    let b = that.$axios.get("/api/other/provinces");
    let c = that.$axios.get("/custom/lists/all");
    Promise.all([a, b, c])
      .then(function(r) {
        // 获取省份ID
        r[1].data.data.forEach(item => {
          that.selectOptions.province_id.push({
            value: item.id,
            label: item.name
          });
        });
        // 获取支付方式
        for (let i in r[0].data.data) {
          that.selectOptions.pay_mode.push({
            value: i,
            label: r[0].data.data[i]
          });
        }
        that.allShopInfo = r[2].data.data;
        // console.log(r[2].data.data)
        that.search();
      })
      .catch(function(err) {
        console.log(err);
        that.$message.error({
          message: "获取生成订单信息失败！"
        });
      });
    that.$axios
      .get("/provider/species/order/goods", {
        params: {
          start_date: $tools.dateFormat3m(new Date()),
          end_date: $tools.dateFormat(new Date())
        }
      })
      .then(function(r) {
        that.allGoodsList = r.data.data;
      })
      .catch(function(err) {
        console.log(err);
        that.$message.error({
          message: "获取添加商品列表失败！"
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mainBox {
  height: 100%;
  background: #fff;
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-autocomplete {
    width: 100%;
  }
  .searchArea {
    margin: 0 10px;
    padding: 10px 10px 0px;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #ccc;
    & > div {
      display: flex;
      justify-content: space-between;
      span {
        text-align: right;
        line-height: 42px;
        min-width: 65px;
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
  .btnGuoup2 {
    display: flex;
    justify-content: flex-end;
    margin: 20px 50px 10px;
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
  .addGoodsForm {
    margin-top: -30px;
    max-height: 630px;
    overflow-y: scroll;
    .GoodsTitle {
      font-size: 16px;
      margin: 10px 0;
      .deleteGoodsBtn {
        cursor: pointer;
        &:hover {
          color: #e81123;
        }
      }
    }
    .oneLine {
      margin-bottom: 20px;
      .inputGroup {
        .inputTitle {
          text-align: right;
          padding-right: 15px;
          line-height: 40px;
        }
      }
    }
  }
}
</style>