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
        }
    }
}
</script>
<style>
    
</style>
