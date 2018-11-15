<template>
    <div class="mainBox">
        <form  id="searchForm">
            <div class="searchBox">
                <div class="searchArea">
                    <div>
                        <div class="block">
                            <el-date-picker
                                v-model="searchParam.start_date"
                                type="date"
                                name="start_date"
                                placeholder="开始日期">
                            </el-date-picker>
                            </div>
                            <div class="line">至</div>
                            <div class="block">
                            <el-date-picker
                                v-model="searchParam.end_date"
                                type="date"
                                name="end_date"
                                placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        
                    </div>
                    <!-- 搜索按钮 -->
                    <div class="btnGuoup">
                        <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
                    </div>
                    
                </div>
            </div>
        </form>
        <div class="tableArea">
            <el-table
                border
                tooltip-effect="dark"
                :data="tableData"
                align="center"
            >
                <el-table-column
                    prop="date"
                    label="日期"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="proceeds"
                    label="	订单收益"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="payment"
                    label="	货款支付"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="sales_refund"
                    label="用户退款"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="refund_goods"
                    label="退货供应商"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="profit"
                    label="毛利"
                    min-width="80"
                    align="center">
                </el-table-column>
            </el-table>                
        </div>
        
    </div>
</template>
<script>
import "../../../tool.js";
export default {
    name:"DayReport",
    data(){
        return{
            searchParam:{
               start_date: new Date(new Date() -  1000 * 60 * 60 * 24 * 7), //开始时间
               end_date: new Date( ), //结束时间
            },
            tableData:[],
            dataTotal:10,
        }
    },
    methods:{
        search(){
            if(this.searchParam.end_date&&this.searchParam.start_date&&this.searchParam.end_date >= this.searchParam.start_date){
                if(this.searchParam.end_date-this.searchParam.start_date<=1000 * 60 * 60 * 24 * 7){
                    let sendParam = {};   
                    sendParam.start_date = $tools.dateFormat(this.searchParam.start_date);
                    sendParam.end_date = $tools.dateFormat(this.searchParam.end_date);
                    
                    this.$axios
                    .get("/provider/buyers/order/report", {
                        params: sendParam
                    })
                    .then(res => {

                    this.tableData=res.data.data.lists
                    this.tableData.forEach((item,index)=>{
                        item.payment/=100;
                        item.proceeds/=100;
                        item.profit/=100;
                        item.refund_goods/=100;
                        item.sales_refund/=100;
                    })
                    //    console.log(res.data.data.lists)
                    })
                    .catch(err => {
                        console.log(err);
                        this.$message.error({
                        message: "获取提示失败！"
                        });
                    });
                }else{
                    this.$message.error({
                        message:"时间间隔请小于7天！"
                    });
                }
                
            }else{
                this.$message.error({
                    message: "请选择正取的时间！"
                });
            }
        },
       
    },
    created(){
        this.search()
    }
}
</script>
<style lang="less" scoped>
.mainBox{
    height: 100%;
    background: #fff;
    .searchBox{
        border-bottom: 1px solid #ccc;
        .searchArea{
            margin: 0 10px 0px;
            padding: 5px 0;
            display: flex;
            justify-content: flex-start;
            &>div{
                margin-left: 10px;
                display: flex;
                justify-content: space-between;
                span{
                    text-align: right;
                    line-height: 42px;
                    min-width: 65px;
                }
                .line{
                    text-align: center;
                    line-height: 42px;
                    margin: 0 5px; 
                }
            }
        }
    }
    .tableArea{
      margin: 10px;
    }
}
</style>


