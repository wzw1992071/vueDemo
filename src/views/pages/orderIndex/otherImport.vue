// 冻参谋导入页面
<template>
  <div class="mainBox">
     <!-- 导入条件 -->
    <div class="searchArea">
      <div>
        <div class="block">
          <el-date-picker
            v-model="entryParam.begin"
            type="date"
            placeholder="开始日期">
          </el-date-picker>
        </div>
        <div class="line">至</div>
        <div class="block">
          <el-date-picker
            v-model="entryParam.end"
            type="date"
            placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="demo-input-suffix">
        <span>客户：</span>  
        <el-input v-model="entryParam.sp_id"></el-input>
      </div>
    </div>
    <div class="checkBoxArea">
      <el-checkbox-group v-model="entryParam.status">
        <el-checkbox v-for="item in orderStatus"  :label="item.key" :key="item.key">{{item.value}}</el-checkbox>
      </el-checkbox-group>
    </div>
     <!-- 导入按钮 -->
      <div class="btnGuoup">
          <el-button type="primary" icon="el-icon-tickets" @click="importOrder">导入</el-button>
      </div>

      <div>
        <iframe  class="importIframe" :src="importAdd"></iframe>
      </div>
  </div>
</template>

<script>
import '../../../tool.js'
export default {
  name: 'OtherImport',
  data () {
    return {
      // 1=未确认 新订单
      // 2=已确认 待发货
      // 3=已发货 待收货
      // 4=已收货
      // 5=已取消
      // 101=支付成功
      // 102=支付失败
      orderStatus:[
        {key:1,value:'未确认 新订单'},{key:2,value:'已确认 待发货'},
        {key:3,value:'已发货 待收货'},{key:4,value:'已收货'},
        {key:5,value:'已取消'},{key:6,value:'支付成功'},
        {key:7,value:'支付失败'}
      ],
      // 导入条件
      entryParam:{
        begin:$tools.dateFormat(new Date()),//开始时间
        end:$tools.dateFormat(new Date()),//结束时间
        sp_id:'',//客户名
        status:[]//选中状态
      },
      importAdd:''
    }
  },
  methods:{
    importOrder(){
      var that= this;
      // 判断条件是否正确
      if(this.entryParam.begin&&this.entryParam.end){
        if(this.entryParam.begin>this.entryParam.end){
          that.$message.error('请选择正确的时间');
          return false;
        }else{
          var hashParam = `begin=${$tools.dateFormat(that.entryParam.begin)}&end=${$tools.dateFormat(that.entryParam.end)}`;
          if(that.entryParam.sp_id){
            hashParam+=(`&sp_id=${that.entryParam.sp_id}`)
          }
          if(that.entryParam.status.length>0){
            for(var i = 0;i<that.entryParam.status.length;i++){
              hashParam+=(`&status[]=${that.entryParam.status[i]}`)
            }
            
          }
        
        }
        if(window.location.hostname=="localhost"){
          that.importAdd=(`${window.location.origin}/api/provider/order/gen/allocate-cargo?${hashParam}`)
        }else{
          that.importAdd=(`${window.location.origin}/provider/order/gen/allocate-cargo?${hashParam}`)
        }
      }else{
        that.$message.error('请完善导入条件');
        return false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .mainBox{
    height: 100%;
    background: #fff;
    .searchArea{
      margin: 0 10px 10px;
      padding: 15px 0;
      display: flex;
      justify-content: flex-start;
      &>div{
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
    .checkBoxArea{
      margin: 0 10px 10px;
      padding: 15px 0;
    }
    .btnGuoup{
      display: flex;
      justify-content: flex-start; 
      margin: 0 10px 10px;     
      padding-bottom: 10px;
    }
    .importIframe{
      border: 0;
      width: 800px;
      height: 500px;
    }
  }
</style>