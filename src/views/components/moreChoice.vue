

<template>
  <div class="mainBox">
    <el-input  v-model="inputValue"  @focus="toggerTig(true)" ></el-input>
    <div class="PromptBox" v-if="PromptShow">
      <div class="PromptHead">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div class="sureBtn">
          <el-button type="text" @click="toggerTig(false)">确定</el-button>
        </div>
        
      </div>

      <el-checkbox-group v-model="choiceData" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in selectInfo" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MoreChoice',
  props: ['info'],
  data () {
    return {
      checkAll: true,
      PromptShow:false,
      inputValue:"",
      choiceData:[],//多选选中数据
      // isIndeterminate: true,
      // 传入选项
      selectAllInfo:[
        {label:"小明",value:1},{label:"张红",value:2},{label:"小兰",value:3}
      ],
       // 选项
      selectInfo:[],
      // AllCheckedData:[],//全选的数据
     
    }
  },
  computed: {
    // 全选的数据value
    AllCheckedData(){
      let Arr = []
      this.selectInfo.forEach(item=>{
        Arr.push(item.value)
      })
      return Arr;
    },
     //是否半选
    isIndeterminate(){
      // if(){

      // }
    }
  },
  watch:{
    inputValue(val, oldVal){
      this.selectData()
    },
   

  },
  methods:{
    toggerTig(flage){
      this.PromptShow=flage
    },
    handleCheckAllChange(val){
      // this.choiceData = val ? this.AllCheckedData : [];
      // this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value){
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.selectAllInfo.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectAllInfo.length;
    },
    selectData(){
      
      // console.log(_.find(this.selectAllInfo, (item)=>{ 
      //   return item.label.indexOf(this.inputValue)>-1
      // }))
     let newArr=[]
      var newArr2=[]
      this.selectAllInfo.forEach(item => {
        if(item.label.indexOf(this.inputValue)>-1){
          newArr.push(item)       
        }
      });
      this.selectInfo = newArr;
    }

  },
  created(){
    // // console.log(this.info)
    // // this.selectData()
    this.selectInfo = this.selectAllInfo;
    // console.log(_)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .mainBox{
    width:100%;
    .PromptBox{
      width: 100%;
      background: #aaa
    }
    .PromptHead{
      margin-top: 3px;
      margin-left: 5px;
      padding: 8px 0;
      position: relative;
      .sureBtn{
        position: absolute;
        right: 10px ;
        top:0px;
      }
    }
    .el-checkbox-group{
      .el-checkbox{
        display: block;
        margin-left: 5px
      }
      
    }
  }
</style>