<template>
    <div class="mainBox">
        <div class="searchArea">
            
            <div class="demo-input-suffix">
                <span>商品名：</span>  
                <el-input v-model="searchParam.keyword">
                </el-input>
            </div>
            <div class="demo-input-suffix">
                <span>数量：</span>  
                <el-select v-model="searchParam.filter.quantity_compare_symbol"  clearable>
                 <el-option
                    v-for="item in selectOptions.operation"
                    :key="item.value"
                    :label="item.label"    
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model.number="searchParam.filter.quantity"> </el-input>
            </div>
        </div>
        <div class="searchArea">
          
            <div>
                <div class="block">
                    <el-date-picker
                    v-model="searchParam.filter.start_date"
                    type="date"
                    placeholder="开始日期">
                    </el-date-picker>
                </div>
                <div class="line">至</div>
                <div class="block">
                    <el-date-picker
                        v-model="searchParam.filter.end_date"
                        type="date"
                        placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
         
            <!-- 搜索按钮 -->
            <div class="btnGuoup">
                <el-button type="success" icon="el-icon-search" @click="searchBtn">确认</el-button>
                <el-button type="primary" icon="el-icon-tickets" @click="addGood">入库</el-button>
            </div>
        </div>
        <div class="tableArea">
            <el-table
                :data="tableData"
                :stripe=true
                max-height="4000"
                border
                align="center"
                >
                <el-table-column
                    prop="title"
                    label="商品名称"
                    min-width="120"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="数量"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="入库详情"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <el-popover
                            placement="left"
                            width="1200"
                            trigger="click">
                            <el-table :data="goodsInfo" border max-height="500">
                                <el-table-column min-width="80" align="center" label="单价">
                                    <template slot-scope="scope2">
                                        <div>{{scope2.row.unit_price/100}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column min-width="80" align="center" label="数量"  prop="quantity">
                                </el-table-column>
                                <el-table-column min-width="150" align="center" label="总价">
                                    <template slot-scope="scope2">
                                        <div>{{scope2.row.total_price/100}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column min-width="150" align="center" property="remake" label="备注"></el-table-column>

                            </el-table>
                            <el-button slot="reference" type="text" @click.native.prevent="getNowGoods(scope.$index, tableData)">库存详情</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="出库详情"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <el-popover
                            placement="left"
                            width="1200"
                            trigger="click">
                            <el-table :data="deliveryLogs" border max-height="500">
                                 <el-table-column type="expand">
                                    <template slot-scope="props">
                                    <el-table
                                        border
                                        align="center"
                                        :data="props.row.deliveries_goods_info">
                                        <el-table-column
                                            prop="unit_price"
                                            label="单价（元）">
                                            <template slot-scope="scope3">
                                                <div>{{scope3.row.unit_price/100}}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="quantity"
                                            label="数量">
                                        </el-table-column>
                                        </el-table>
                                    </template>
                                </el-table-column>
                                <el-table-column min-width="120" align="center" label="标题"  prop="title">
                                </el-table-column>
                                  <el-table-column min-width="80" align="center" label="日期"  prop="outbound_at">
                                </el-table-column>
                                <el-table-column min-width="80" align="center" label="单位"  prop="title">
                                </el-table-column>
                                <el-table-column min-width="80" align="center" label="单价">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.unit_price/100}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column min-width="80" align="center" label="数量"  prop="quantity">
                                </el-table-column>
                                <el-table-column min-width="80" align="center" label="出库员"  prop="operator">
                                </el-table-column>
                                 <el-table-column min-width="80" align="center" label="电话"  prop="phone">
                                </el-table-column>
                                <el-table-column min-width="80" align="center" label="备注"  prop="remark">
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="text" @click.native.prevent="getDeliveryLogs(scope.$index, tableData)">出库记录</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <el-button @click="outGoods(scope.$index, tableData)" type="text">出库</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pageControl">
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
         <!-- 出库弹窗 -->
      <el-dialog 
        title="出库" 
        :close-on-click-modal=false
        :visible.sync="dialogFormVisible2" 
        width="40%">
        <div>
           
            <el-row class="oneLine">
                <el-col :span="10">
                    <div class="grid-content inputGroup">
                        <el-col :span="8"><div class="inputTitle">出库价：</div></el-col>
                        <el-col :span="16"><el-input v-model.number="outInfo.out_unit_price"></el-input></el-col>
                    </div>
                </el-col> 
                <el-col :span="10">
                    <div class="grid-content inputGroup">
                        <el-col :span="8"><div class="inputTitle">单位：</div></el-col>
                        <el-col :span="16"><el-input disabled v-model="outInfo.unit"></el-input></el-col>
                    </div>
                </el-col> 
            </el-row>   
            <div class="head">出库详情</div>
            <el-table
                  :data="outInfo.stockInfo"
                  :stripe=true
                  max-height="800"
                  border
                  align="center">
                  <el-table-column 
                    label="单价（元）"
                    min-width="80"
                    align="center">
                    <template slot-scope="scope">
                      <el-input disabled v-model="scope.row.unit_price"></el-input>
                    </template>
                </el-table-column>
                 <el-table-column 
                    label="库存"
                    min-width="80"
                    align="center">
                    <template slot-scope="scope">
                      <el-input disabled v-model.number="scope.row.quantity"></el-input>
                    </template>
                </el-table-column>
                 <el-table-column 
                    label="数量"
                    min-width="80"
                    align="center">
                    <template slot-scope="scope">
                      <el-input  v-model.number="scope.row.outQuantity"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitInfo">确 定</el-button>
          <el-button @click="dialogFormVisible2 = false">取 消</el-button> 
        </div>
        </el-dialog>
            <el-dialog 
            title="入库" 
            :close-on-click-modal=false
            :visible.sync="dialogFormVisible1" 
            width="40%">
            <el-row class="oneLine">
                <el-col :span="20">
                    <div class="grid-content inputGroup">
                        <el-col :span="8"><div class="inputTitle2">商品名：</div></el-col>
                        <el-col :span="16"><el-input v-model="wareHouseData.title"></el-input></el-col>
                    </div>
                </el-col> 
               
            </el-row>   
            <el-row class="oneLine">
                <el-col :span="20">
                    <div class="grid-content inputGroup">
                        <el-col :span="8"><div class="inputTitle2">单位：</div></el-col>
                        <el-col :span="16"><el-input v-model="wareHouseData.unit"></el-input></el-col>
                    </div>
                </el-col> 
               
            </el-row>   
            <el-row class="oneLine">
                <el-col :span="20">
                    <div class="grid-content inputGroup">
                        <el-col :span="8"><div class="inputTitle2">单价（元）：</div></el-col>
                        <el-col :span="16"><el-input v-model="wareHouseData.unit_price"></el-input></el-col>
                    </div>
                </el-col> 
               
            </el-row>   
            <el-row class="oneLine">
                <el-col :span="20">
                    <div class="grid-content inputGroup">
                        <el-col :span="8"><div class="inputTitle2">数量：</div></el-col>
                        <el-col :span="16"><el-input v-model.number="wareHouseData.quantity"></el-input></el-col>
                    </div>
                </el-col> 
               
            </el-row>   
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAddGood">确 定</el-button>
                <el-button @click="dialogFormVisible1 = false">取 消</el-button> 
            </div>
        </el-dialog>
       
    </div>

</template>

<script>
import "../../../tool.js";
export default {
    name: "StockList",
    data() {
        return {
            searchParam:{
                keyword:"",
                page:1,
                page_size:50,
                filter:{
                    quantity_compare_symbol:"",//运算符
                    quantity:"",//数量
                    start_date: new Date(), //开始时间
                    end_date: new Date(), //结束时间
                    
                }
            },
            selectOptions:{
                operation:[
                    {value: '>',label: '大于'} ,
                    {value: '>=',label: '大于等于'} ,
                    {value: '<',label: '小于'} ,
                    {value: '<=',label: '小于等于'} ,
                ]
            },
            tableData:[],
            dataTotal:20,
            // 当前行库存详情
            goodsInfo:[],
            // 当前行出库记录
            deliveryLogs:[],
            // 出库数据
            outInfo:{
                stockInfo:[],
            },
            // 入库弹窗是否显示
            dialogFormVisible1:false,
            // 出库弹窗是否显示
            dialogFormVisible2:false,
            // 入库数据模板
            wareHouseDemo:{
                unit:"",//单位
                unit_price:"",//单价
                title:"",//名称
                quantity:""//数量
            },
            // 入库数据
            wareHouseData:{}
        };
    },
    methods: {
        search() {
            let sendParam = JSON.parse(JSON.stringify(this.searchParam));
            if (sendParam.filter.start_date) {
                sendParam.filter.start_date = $tools.dateFormat(sendParam.filter.start_date);
            }
            if (sendParam.filter.end_date) {
                sendParam.filter.end_date = $tools.dateFormat(sendParam.filter.end_date);
            }
            if(!sendParam.keyword){
                delete sendParam.keyword
            }
            for (let i in sendParam.filter) {
                if (!sendParam.filter[i]) {
                delete sendParam.filter[i];
                }
            }
            this.$axios
                .post("/provider/inventories", sendParam)
                .then((r)=> {
                    this.tableData = r.data.data.lists;
                    this.dataTotal = r.data.data.total;
                })
                .catch(()=>{
                    console.log("获取数据失败");
                });
        },
        // 点搜索按钮页码清1
        searchBtn(){
            if(!!(this.searchParam.filter.quantity_compare_symbol) === !!(this.searchParam.filter.quantity+"")){
                this.searchParam.page = 1;
                this.search()
            }else{
                this.$message.warning({
                    message: '请完善搜索条件！',
                });
            }
            
        },
        pageChange(page){
            this.searchParam.page = page;
            this.search();
        },
        // 获取当前行的库存详情
        getNowGoods(index, rows){
            // this.goodsInfo = rows[index].stockInfo? rows[index].stockInfo
            if(rows[index].stockInfo){
                this.goodsInfo = rows[index].stockInfo
            }else{
                this.$axios
                    .get("/provider/inventories/warehouses", {params:{ inventory_id: rows[index].id,page_size:50}})
                    .then(r=>{
                        rows[index].stockInfo=r.data.data.lists
                        rows[index].rowIndex=index
                        this.goodsInfo = JSON.parse(JSON.stringify(rows[index].stockInfo))
                        // this.goodsInfo.rowIndex=index
                        this.outInfo=JSON.parse(JSON.stringify(rows[index]));
                        this.outInfo.stockInfo.forEach(item=>{
                            item.unit_price/=100
                        })
                })

            }
        },
        // 获取当前行出库记录
        getDeliveryLogs(index, rows){
            if(rows[index].deliverys){
                this.deliveryLogs = rows[index].deliverys
            }else{
                this.$axios
                    .get("/provider/inventories/delivery-logs", {params:{ inventory_id: rows[index].id,page_size:50}})
                    .then(r=>{
                        rows[index].deliverys=r.data.data.lists
                        this.deliveryLogs = JSON.parse(JSON.stringify(rows[index].deliverys))
                })
            }
        },
        // 出库
        outGoods(index, rows){
            this.getNowGoods(index, rows)
            this.dialogFormVisible2=true
        },
        // 出库确认
        submitInfo(){
            if(!this.outInfo.out_unit_price){
                this.$message.error({
                    message: '请输出出库价！',
                });
                return false
            }
            // 检查是否有出库
            let flag=false
            for(let i = 0;i<this.outInfo.stockInfo.length;i++){
                flag=this.outInfo.stockInfo[i].outQuantity?true:flag
                if(this.outInfo.stockInfo[i].outQuantity&&this.outInfo.stockInfo[i].outQuantity>this.outInfo.stockInfo[i].quantity){
                    this.$message.error({
                        message: '请输出正确的数量！',
                    });
                    return false
                }
            }
            if(flag){
                let sendParam = {
                    inventory_id:this.outInfo.id,
                    title:this.outInfo.title,
                    unit:this.outInfo.unit,
                    unit_price:this.$utils.yuanTofen(this.outInfo.out_unit_price),
                    refund_info:[]
                }
                this.outInfo.stockInfo.forEach(item=>{
                    sendParam.refund_info.push({
                        warehouse_id:item.id,
                        unit_price:this.$utils.yuanTofen(item.unit_price),
                        quantity:item.outQuantity
                    })
                })
                this.$axios.post("/provider/inventories/delivery",sendParam).then(r=>{
                    this.$set(this.tableData,this.outInfo.rowIndex,r.data.data[0])
                    
                    this.$message({
                        message: "出库成功！",
                        type: "success"
                    });
                    this.dialogFormVisible2=false

                })

            }
        },
        // 入库
        addGood(){
            this.dialogFormVisible1=true
            this.wareHouseData = JSON.parse(JSON.stringify(this.wareHouseDemo))
        },
        // 入库确认
        submitAddGood(){
            if(this.wareHouseData.unit&&this.wareHouseData.unit_price&&this.wareHouseData.title&&this.wareHouseData.quantity){
                let sendParam = JSON.parse(JSON.stringify(this.wareHouseData))
                sendParam.unit_price = this.$utils.yuanTofen(sendParam.unit_price)
                this.$axios.post("/provider/inventories/warehouse",{refund_info:[sendParam]}).then(r=>{
                    this.$message({
                        message: "入库成功！",
                        type: "success"
                    });
                    this.search()
                    this.dialogFormVisible1=false

                })
            }else{
                this.$message.warning({
                    message: '请完善数据！',
                });
            }
        }
    },
    created(){
        this.search()
    }
};
</script>

<style lang="less" scoped>
.mainBox {
  height: 100%;
  background: #fff;
  .searchArea {
    margin: 0 10px;
    padding: 10px 10px 0px;
    display: flex;
    justify-content: flex-start;
    &:nth-of-type(2){
        border-bottom: 1px solid #ccc;
    }
    
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
  // 弹出框样式
    .head{
        font-size: 16px;
        font-weight: bolder;
    }
    .oneLine{
      margin-bottom: 20px;
      &.title{
          text-align: center;
      }
      .inputGroup{
        .inputTitle{
          text-align: center;
          padding-right:15px ;
          line-height: 40px;
        }
        .inputTitle2{
          text-align: right;
          padding-right:15px ;
          line-height: 40px;
        }
        .numberInput{
            margin-left: 10px;
        }
      }
    }

}
</style>
