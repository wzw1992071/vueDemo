<template>
    <div>
        <MoreChoice @endChoice="endChoice" :selectAllInfo="selectData"></MoreChoice>
    </div>
</template>
<script>
import MoreChoice from "@/views/components/moreChoice.vue"
export default {
    name:"TEST",
    data(){
        return {
            choiceData:[],
            selectData:[{label:"小明",value:1},{label:"张红",value:2},{label:"小兰",value:3}]
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
