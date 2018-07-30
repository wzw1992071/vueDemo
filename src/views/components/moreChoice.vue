
import { create } from 'domain';
<template>
  <div class="mainBox">
    <el-input  v-model="inputValue" @change="selectData" @focus="toggerTig(true)" ></el-input>
    <div class="PromptBox" v-if="PromptShow">
      <div class="PromptHead">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div class="sureBtn">
          <el-button type="text" @click="toggerTig(false)">确定</el-button>
        </div>
        
      </div>

      <el-checkbox-group v-model="choiceData" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in selectInfo" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
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
      checkAll: false,
      PromptShow:false,
      inputValue:"",
      choiceData:[],//多选选中数据
      isIndeterminate: false,//是否全选
      selectAllInfo:[
        {name:"小明",id:1},{name:"张红",id:2},{name:"小兰",id:3}
      ],
      AllCheckedData:[1,2,3],//全选的数据
      selectInfo:[]
    }
  },
  watch:{
    inputValue(val, oldVal){
      this.selectData()
    }
  },
  methods:{
    toggerTig(flage){
      this.PromptShow=flage
    },
    handleCheckAllChange(val){
      this.choiceData = val ? this.AllCheckedData : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value){
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.selectAllInfo.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectAllInfo.length;
    },
    selectData(){
      var newArr=[]
      var newArr2=[]
      this.selectAllInfo.forEach(item => {
        if(item.name.indexOf(this.inputValue)>-1){
          newArr.push(item)
          newArr2.push(item.id)
          this.AllCheckedData=newArr2
         
        }
      });
      this.selectInfo = newArr;
    }

  },
  created(){
    // console.log(this.info)
    // this.selectData()
    this.selectInfo = this.selectAllInfo;
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