<template>
    <div>
        <MoreChoice  v-model="choice" :selectAllInfo="selectData"></MoreChoice>
    </div>
</template>
<script>
import MoreChoice from "@/views/components/moreChoice.vue"
export default {
    name:"TEST",
    data(){
        return {
            dataList:1,
            searchText:"",
            choice:["小明"],
            selectData:[{value:"小明",label:"小明"},{value:"张红",label:"张红"},{value:"小兰",label:"小兰"}]
        }
    },
    
    components:{
        MoreChoice
    },
    methods:{
        endChoice(val){
            console.log(val)
        },
        getData(){
            return new Promise((resolve,reject)=>{
                this.$axios
                    .get("/provider/purchases/sales/map-show/list")
                }).then(res=>{
                    console.log(res.data)
                    resolve(res.data)
                }).catch(err=>{
                    console.log(4)
                })
        },
         creatForm(){

            this.dataList =  this.getData()
            console.log(this.dataList)
           
        }
    },
    mounted() {
        this.creatForm()
    },
}
</script>
<style>
    
</style>
