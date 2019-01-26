// 报表填写
<template>
    <div class="mainBox">
         <form  id="searchForm">
            <div class="searchBox">
                <div class="searchArea">
                    <div class="demo-input-suffix">
                        <span>类型：</span> 
                        <el-select
                        v-model="searchParam.income_expend"
                        >
                        <el-option
                            v-for="item in selectData.type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select> 
                    </div>
                    <div class="demo-input-suffix">
                        <span>金额：</span> 
                        <el-input v-model.number="searchParam.amount" ></el-input>
                    </div>
                    
                </div>
                <div class="searchArea">
                   
                    <div class="demo-input-suffix">
                        <span>说明：</span> 
                        <el-input v-model="searchParam.explain" style="width:300px"></el-input>
                    </div>
                    
                </div>
                <div class="searchArea">
                   
                    <div class="demo-input-suffix">
                        <span>备注：</span> 
                        <el-input
                            type="textarea"
                            :rows="3"
                            style="width:300px"
                            v-model="searchParam.remark">
                        </el-input>
                    </div>
                   
                    
                </div>
                <div class="searchArea">
                   
                    <div class="demo-input-suffix">
                        <span>凭证：</span> 
                        <div class="uploadArea">
                            <el-button type="primary">上传</el-button>
                            <input class="inputBtn" type="file" @change="chooseImg">
                        </div>
                        
                    </div>
                    
                    
                </div>
                <div class="searchArea" >
                    <div v-for="(item,index) in searchParam.voucher" :key="index" class="imgBox">
                        <img :src="`${fileBaseUrl}${item}`" alt="">
                        <b class="deleteImg" @click="deleteImg(index)">x</b>
                    </div>  
                </div>
                <div class="searchArea" style="margin-left:84px" >
                     <el-button type="primary" @click="submitData">提交</el-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import "../../../utils/base64.js";
export default {
    data(){
        return{
            searchParam:{
                income_expend:"1",
                amount:0,
                explain:"",
                remark:"",
                voucher:[]
            },
            selectData:{
                type:[
                    {value: '1',label: '收入'},
                    {value: '2',label: '支出'}
                ]
            },
            fileList2:[],
            imgUrl:""
        }
    },
    computed: {
        ...mapGetters(["fileBaseUrl"])
    },
    methods:{
        chooseImg(e){
            var url = e.target.files[0];
            var extention = url.name.substring(url.name.lastIndexOf('.')+1).toLowerCase();    // 获取选中照片后缀
            var allowExtention = '.jpg,.bmp,.gif,.png,.jpeg';
            var key = 'Public/Uploads/voucher/'+ (new Date).getTime() +''+Math.floor(Math.random()*10)+'.'+ extention; //file.name + (new Date).getTime() + '-';
            if(allowExtention.indexOf(extention) == -1) {
                this.$message.error({
                    message: `仅支持${allowExtention}为后缀名的文件!`
                });
                return ;
            }
            var POLICY_JSON = {
                'expiration': '2120-12-01T12:00:00.000Z',
                'conditions': [
                    ['starts-with', key, ''],
                    {'bucket': 'idongpin'},
                    ['starts-with', url.type, ''],
                    ['content-length-range', 0, 104857600]
                ]
            };
            var policyBase64 = Base64.encode(JSON.stringify(POLICY_JSON));
            // console.log(policyBase64)
            this.$axios.get('/api/other/oaa/ali/signature',{params:{
                signature_data:policyBase64
            }}).then((res)=>{
                 var signature = res.data.data.signature;
                 this.$axios.get('/api/other/oaa/ali/identity').then(res=>{
                      var access_id = res.data.data.access_id;
                        let fd = new FormData();
                        fd.append('key', key);  //上传到的路径信息;
                        fd.append('Content-Type', url.type);  //文件类型;
                        fd.append('Content-Length', Math.round(url.size * 100 / 1024) / 100);  //文件大小KB;
                        fd.append('Content-Encoding', 'compress');  //压缩方式，这里为无压缩;
                        fd.append('OSSAccessKeyId', access_id);
                        fd.append('policy', policyBase64);  //参与签名的头信息;
                        fd.append('signature', signature);  //签名;
                        fd.append('success_action_status', "200");
                        fd.append('file', url);  //需上传的文件对像;
                        // var xhr = new XMLHttpRequest();
                        // xhr.addEventListener('load', () => {
                        //     let param = this.props.param;
                        //     param.type_pic_url = key;
                        //     this.props.setParam(param);
                        // }, false);
                        // //请求中断
                        // xhr.addEventListener('abort', ()=> {
                        //     this.$message.error({
                        //         message: "上传中断，请检查网络后重新上传"
                        //     });
                        // }, false);
                        // //发送请求
                        // xhr.open('POST', 'http://oss-cn-qingdao.aliyuncs.com/idongpin', true);
                        // xhr.send(fd);
                        // xhr.onreadystatechange=()=>{
                        //     if(xhr.readyState == 4){
                        //         this.searchParam.voucher.push(key)
                        //     }
                        // }
                        this.$fileAxios.post('http://oss-cn-qingdao.aliyuncs.com/idongpin',fd).then(res=>{
                           console.log(res)
                           this.searchParam.voucher.push(key)
                        },err=>{
                            console.log(2)
                        })
                 })
            })

        },
        deleteImg(index){
            this.searchParam.voucher.splice(index, 1);
        },
        submitData(){
            if(this.searchParam.explain&&this.searchParam.remark){
                let sendParam = JSON.parse(JSON.stringify(this.searchParam));
                sendParam.amount=this.$utils.yuanTofen(sendParam.amount);
                if(sendParam.voucher.length==0){
                    delete sendParam.voucher
                }
                this.$axios.post("/provider/finance/record/add",sendParam).then(res=>{
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.searchParam={
                        income_expend:"1",
                        amount:0,
                        explain:"",
                        remark:"",
                        voucher:[]
                    }
                })
            }else{
                this.$message.error({
                    message: "请完善资料！"
                });
            }
            
        }
    },
    created() {
    },
}
</script>

<style lang="less" scoped>
.mainBox{
     height: 100%;
    background: #fff;
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
    .uploadArea{
        position: relative;
        .inputBtn{
            position: absolute;
            height: 40px;
            left: 0;
            top: 0;
            opacity: 0;
        }
    }
    .imgBox{
        width: 160px;
        height: 160px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .deleteImg{
            position: absolute;
    
            width: 15px;
            height: 15px;
            line-height: 12px;
            text-align: center;
            background: #E81123;
            color: #fff;
            border-radius: 10px;
            right: -2px;
            top: -3px;
        }
    }
}
</style>


