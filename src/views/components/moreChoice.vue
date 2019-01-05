// 使用方法
// 传入参数模板参考data中的selectAllInfo，prop传入也是这个格式

<template>
  <div class="moreChoice">
    <el-input :class="{'hasChoice':choiceData.length}" v-model="inputValue"  @focus="toggerTig(true)" >
      <template slot="prepend"  v-if="choiceData.length">
        <div class="selectNumber">+{{choiceData.length}}</div>
      </template>
    </el-input>
    
    <div class="PromptBox" v-if="PromptShow">
      <div class="PromptHead">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div class="sureBtn">
          <el-button type="text" @click="submitData">确定</el-button>
        </div>
        
      </div>

      <el-checkbox-group v-model="choiceData">
        <el-checkbox v-for="item in selectInfo" :label="item.value" :key="item.label">{{item.value}}</el-checkbox>
      </el-checkbox-group>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MoreChoice',
  props: {
    selectAllInfo: Array
  },
  data () {
    return {
      checkAll: false,
      PromptShow:false,
      inputValue:"",
      choiceData:[],//多选选中数据
      // 传入选项
      // selectAllInfo:[
      //   {label:"小明",value:1},{label:"张红",value:2},{label:"小兰",value:3}
      // ],
       // 选项
      selectInfo:[],
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
    // 全选数据和当前选中数据的交集（用于确认全选和半选）
    collectArr(){
      return _.intersection(this.AllCheckedData,this.choiceData)
    },
     //是否半选
    isIndeterminate(){
      if(this.choiceData.length==0) return false;
      if(this.collectArr.length==0) return false;
      if(this.collectArr.length < this.AllCheckedData.length){
        return true
      }
    },
    isCheckAll(){
      if(this.choiceData.length==0) return false;
      if(this.collectArr.length==0) return false;
      if(this.collectArr.length == this.AllCheckedData.length){
        return true
      }
    }
  },
  watch:{
    inputValue(val, oldVal){
      this.selectData()
    },
    isCheckAll(val, oldVal){
      this.checkAll = val
    }
  },
  methods:{
    toggerTig(flag){
      this.PromptShow=flag;
      if(flag){
        this.selectInfo = this.selectAllInfo;
      }
    },
    handleCheckAllChange(val){
      if(val){
        this.choiceData= _.union(this.choiceData,this.AllCheckedData)
      }else{
        this.choiceData= _.difference(this.choiceData,this.AllCheckedData)
      }
    },
    // 帅选功能
    selectData(){
     let newArr=[]
      var newArr2=[]
      this.selectAllInfo.forEach(item => {
        if(item.label.indexOf(this.inputValue)>-1){
          newArr.push(item)       
        }
      });
      this.selectInfo = newArr;
    },
    // 提交数据
    submitData(){
      
      this.$emit("endChoice",this.choiceData);
      this.toggerTig(false)
    }

  },
  mounted(){
    // console.log(1)
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .moreChoice{
    position: relative;
    z-index: 999;
    width:100%;

    .selectNumber{
      height: 20px;
      color: #909399;
      font-size: 16px;
    }
    .PromptBox{
        max-width: 100%;
        color: #606266;
        border: 1px solid #e4e7ed;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 4px;
        line-height: 30px;
        margin: 5px 0;
       
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
       max-height: 200px;
        overflow-y: scroll;
      .el-checkbox{
        display: block;
        margin-left: 5px
      }
      
    }
  }
</style>