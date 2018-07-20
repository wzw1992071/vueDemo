// 添加商品模块
<template>
    <div>
        <el-form :model="item" :rules="rules" label-width="120px" :ref="goodsForm">
            <div class="GoodsTitle">
                商品{{index+1}}
                <span class="deleteGoodsBtn el-icon-circle-close" @click="deleteOneGood(index)"></span>
            </div>
            <el-row>
                <el-col :span="8">
                <el-form-item label="商品信息：" prop="goods_name">
                    <el-input v-model="item.goods_name" @change="changeGoodData"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="商品分类：" prop="goods_type">
                    <el-input v-model="item.goods_type" @change="changeGoodData"></el-input>
                </el-form-item>  
                </el-col>
                <el-col :span="7">
                <el-form-item label="购买数量：" prop="buy_num">
                    <el-input v-model.number="item.buy_num" @change="changeGoodData"></el-input>
                </el-form-item>  
                </el-col>
            </el-row> 
                <el-row>
                <el-col :span="8">
                <el-form-item label="销售价格：" prop="goods_sell_price">
                    <el-input v-model="item.goods_sell_price" @change="changeGoodData"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="出售单位：" prop="sell_unit">
                    <el-input v-model="item.sell_unit" @change="changeGoodData"></el-input>
                </el-form-item>  
                </el-col>
                <el-col :span="7">
                <el-form-item label="商品原价：" prop="original_price">
                    <el-input v-model="item.original_price" @change="changeGoodData"></el-input>
                </el-form-item>  
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="8">
                <el-form-item label="供应商铺名：" prop="seller_shop">
                    <el-input v-model="item.seller_shop" @change="changeGoodData"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="供应商地址：" prop="seller_address">
                    <el-input v-model="item.seller_address" @change="changeGoodData"></el-input>
                </el-form-item>  
                </el-col>
                <el-col :span="7">
                <el-form-item label="供应商电话：" prop="seller_tel">
                    <el-input  v-model="item.seller_tel" @change="changeGoodData"></el-input>
                </el-form-item>  
                </el-col>
            </el-row> 
            
        </el-form>
    </div>
    
</template>
<script>
    export default {
        name: 'AddGoods',
        props: ['formData',"index"],
        data(){
            return{
                 // 表单验证规则
                // rules:{
                //     goods_name: [
                //         { required: true, message: '商品名不能为空!', trigger: 'blur' },
                //     ],
                //     goods_type: [
                //         { required: true, message: '商品分类不能为空!', trigger: 'blur' },
                //     ],
                //     buy_num: [
                //         { required: true, message: '够买数量不能为空!', trigger: 'blur' },
                //         { type: 'number', message: '请输入数字', trigger: 'blur' },
                //     ],
                //     goods_sell_price: [
                //         { required: true, message: '销售价格不能为空!', trigger: 'blur' },
                //     ],
                //     sell_unit: [
                //         { required: true, message: '出售单位不能为空!', trigger: 'blur' },
                //     ],
                //     original_price: [
                //         { required: true, message: '商品原价不能为空!', trigger: 'blur' },
                //     ],
                //     seller_shop: [
                //         { required: true, message: '供应商铺名不能为空!', trigger: 'blur' },
                //     ],
                //     seller_address: [
                //         { required: true, message: '供应商地址不能为空!', trigger: 'blur' },
                //     ],
                //     seller_tel: [
                //         { required: true, message: '供应商电话不能为空!', trigger: 'blur' },
                //         // { type:'mobile', message: '请输入正确的电话！', trigger: 'blur' },
                //         { len:11, message: '请输入正确的电话！', trigger: 'blur' }
                //     ],
                // }
            }
        },
        computed:{
            item:function(){
                return JSON.parse(JSON.stringify(this.formData))
            },
            goodsForm:function(){
                return `goodsForm${this.index}`
            }
        },
        methods: {
            deleteOneGood(){
                this.$emit('deleteOneGood', this.index)
            },
            changeGoodData(){
                this.$emit('changeGoodData',this.item,this.index)
            },
            validateForm(){
                let flag
                this.$refs[this.goodsForm].validate((valid) => {
                    flag = valid
                });
                return flag
            }
        }
    }
</script>
<style scoped lang="less">

    .GoodsTitle{
        font-size: 16px;
        margin: 10px 0;
        .deleteGoodsBtn{
        cursor: pointer;
            &:hover{
                color: #E81123;
            }
        }
    }
</style>


