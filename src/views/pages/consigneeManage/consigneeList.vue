<template>
    <div class="mainBox">
        <div class="title">收货人列表</div>
        <el-button type="primary" size="small" @click="addConsignee">添加收货人</el-button>
    
        <div class="tableBox">
            <el-table
                :data="consigneeData"
                max-height="5000"
                border
                align="center">
                <el-table-column
                    prop="name"
                    label="收货人姓名"
                    width="400">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="收货人电话"
                    >
                </el-table-column>
                <el-table-column
                    width="300"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleConsignee(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteConsignee(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="title" :visible.sync="dialogShow" width="50%">
            <el-row class="oneLine">
             <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">客户名称：</div></el-col>
                <el-col :span="18"><el-input v-model="addConsigneeInfo.name"></el-input></el-col>
            </div></el-col>
            <el-col :span="12"><div class="grid-content inputGroup">
                <el-col :span="6"><div class="inputTitle">客户电话：</div></el-col>
                <el-col :span="18"><el-input v-model="addConsigneeInfo.phone"></el-input></el-col>
            </div></el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitInfo1">确 定</el-button>
                <el-button @click="dialogShow = false">取 消</el-button> 
            </div>
        </el-dialog>   
    </div>
</template>
<script>
export default {
  nama: "",
  data() {
    return {
      // 联系人列表
      consigneeData: [],
      // 修改联系人信息模板
      addConsigneeInfoMod: {
        name: "",
        phone: ""
      },
      // 修改联系人信息
      addConsigneeInfo: {},
      // 是否显示弹窗
      dialogShow: false,
      // 弹窗标题
      title: "新增联系人"
    };
  },
  methods: {
    // 添加联系人
    addConsignee() {
      this.title = "新增联系人";
      this.addConsigneeInfo = JSON.parse(
        JSON.stringify(this.addConsigneeInfoMod)
      );
      this.dialogShow = true;
    },
    // 修改联系人
    handleConsignee(data) {
      this.title = "修改联系人";
      this.addConsigneeInfo = JSON.parse(
        JSON.stringify(data)
      );
      this.dialogShow = true;
    },
    // 删除联系人
    deleteConsignee(data) {
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "mywarning"
      }).then(() => {
        this.$axios
          .delete(`/provider/take-delivery/consignee/del/${data.id}`)
          .then(function() {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.getConsigneeList();
          })
          .catch(function() {
            this.$message.error({
              message: "删除失败！"
            });
          });
      });
    },
    // 获取联系人列表
    getConsigneeList() {
      this.$axios.get("/provider/take-delivery/consignee/list").then(res => {
        this.consigneeData = res.data.data.lists;
        console.log(res);
      });
    },
    submitInfo1() {
      if(!(/^1[34578]\d{9}$/.test(this.addConsigneeInfo.phone))){ 
        this.$message.error({
              message: "请输入正确的电话号！"
            });
        return false; 
      } 
      let sendParam = JSON.parse(JSON.stringify(this.addConsigneeInfo));
      delete sendParam.id;
      if (this.addConsigneeInfo.id) {
        this.$axios
          .put(
            `/provider/take-delivery/consignee/update/${
              this.addConsigneeInfo.id
            }`,
            sendParam
          )
          .then(res => {
            this.getConsigneeList();
            this.dialogShow = false;
          });
      } else {
        this.$axios
          .post("/provider/take-delivery/consignee/add",sendParam)
          .then(res => {
            this.getConsigneeList();
            this.dialogShow = false;
          });
      }
    }
  },
  created() {
    this.getConsigneeList();
  }
};
</script>
<style lang="less" scoped>
.mainBox {
  .title {
    font-size: 18px;
  }
  .oneLine {
    margin-bottom: 20px;
    .inputGroup {
      .inputTitle {
        text-align: right;
        padding-right: 15px;
        line-height: 40px;
      }
    }
  }
}
</style>


