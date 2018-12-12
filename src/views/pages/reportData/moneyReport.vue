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
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button type="success"  @click="showOneDay(new Date())">查看今日</el-button>
                    </div>
                    
                </div>
            </div>
        </form>   
        <div class="flex total">
            <p>共收入<span class="red">{{total.income}}</span>元</p>
            <p>共支出<span class="red">{{total.expend}}</span>元</p>
            <p>毛利润<span class="red">{{total.profit}}</span>元</p>
        </div>
        <div class="tableArea">
            <el-table
                border
                tooltip-effect="dark"
                :data="tableData"
                align="center"
            >
                <el-table-column
                    prop="record_date"
                    label="日期"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="income"
                    label="	收入"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="expend"
                    label="	支出"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="结余"
                    min-width="80"
                    align="center">
                </el-table-column>
                 <el-table-column
                    prop="profit"
                    label="毛利"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="editInfo1(scope.row)" type="text" size="small">流水详情</el-button>
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
        <el-dialog
            title="资金记录"
            :visible.sync="dialogVisible"
            width="60%"
            >
            <el-table
                border
                tooltip-effect="dark"
                :data="tableData2"
                align="center"
            >   
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <div>
                                <el-form-item label="备注">
                                    <span>{{props.row.remark}}</span>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="凭证">
                                    <img class="voucherimg" v-for="(item,index) in props.row.voucher" :src="fileBaseUrl+item" alt="">
                                </el-form-item>     
                            </div>             
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="created_at"
                    label="日期"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="income_expend"
                    label="收支"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="	结余"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="explain"
                    label="说明"
                    min-width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="bookkeeperInfo"
                    label="记账员"
                    min-width="80"
                    align="center">
                </el-table-column>
               
            </el-table>                
        </el-dialog>
    </div>
</template>

<script>
import '../../../tool.js'
import {mapGetters} from "vuex"
export default {
    data(){
        return{
            searchParam:{
                start_date:new Date(),
                end_date:new Date(),
                page:1,
                size:50
            },
            dataTotal:10,
            tableData:[],
            tableData2:[],
            dialogVisible:false,
             total:{
                income:"",
                expend:"",
                profit:"",
            },
        }
    },
    computed: {
        ...mapGetters(["fileBaseUrl"])
    },
    methods:{
        search(){
            if(this.searchParam.end_date&&this.searchParam.start_date&&this.searchParam.end_date >= this.searchParam.start_date){
                this.searchParam.page=1;
                let sendParam = JSON.parse(JSON.stringify(this.searchParam))
                sendParam.start_date=$tools.dateFormat(sendParam.start_date)
                sendParam.end_date=$tools.dateFormat(sendParam.end_date)
                this.$axios.get('/provider/finance/day-report/list',{params:sendParam})
                .then(r=>{
                    this.tableData = r.data.data.lists
                    this.dataTotal = r.data.data.total
                    this.total.income = r.data.data.income_total/100
                    this.total.expend = r.data.data.expend_total/100
                    this.total.profit = r.data.data.profit_total/100
                    this.tableData.forEach((item,index)=>{
                        item.income/=100
                        item.expend/=100
                        item.balance/=100
                        item.profit/=100
                    })

                })
                .catch((err)=>{
                    this.$message.error({
                        message: '获取数据失败！',
                    });
                    console.log(err)
                })
            }else{
                this.$message.error({
                    message: "请选择正取的时间！"
                });
            }
        },
        // 页面改变触发重新搜索
        pageChange(page){
            this.searchParam.page = page;
            this.search();
        },
        editInfo1(item){
            this.showOneDay(new Date(item.record_date))
        },
        showOneDay(time){
            this.$axios.get('/provider/finance/day-record/list',{params:{
                date:$tools.dateFormat(time)
            }})
                .then(r=>{
                //    console.log(r)
                    this.dialogVisible=true;
                    this.tableData2=r.data.data;
                    this.tableData2.forEach((item,index) => {
                        item.income_expend/=100
                        item.balance/=100
                        item.bookkeeperInfo=`${item.bookkeeper}(${item.bookkeeper_tel})`
                    });
                   
                })
                .catch(()=>{
                    this.$message.error({
                        message: '获取数据失败！',
                    });
                })
        }
    },
    created(){
        this.search();
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
    .pageControl{
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    .voucherimg{
        width:200px;
        height: 200px;
        margin-right: 20px
    }
    .total{
        margin-left: 20px;
        p{
            margin-right: 20px;
            font-size: 20px;
            .red{
                color: #f00
            }
        }
    }
}
</style>


