<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="网关ID">
          <el-input v-model="searchData.hardwareGatewayID"></el-input>
        </el-form-item>
        <el-form-item label="网关名称">
          <el-input v-model="searchData.gatewayName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search"><img src="../../assets/img/find.svg">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="addbutton-container">
        <el-button type="primary" @click="newFormVisible = true">新增网关</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="hardwareGatewayID"
          label="网关id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gatewayName"
          label="网关名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gatewayType"
          label="网管类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="120">
        </el-table-column>
        <el-table-column
          prop="factory"
          label="工厂"
          width="120">
        </el-table-column>
        <el-table-column
          prop="workshop"
          label="车间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gatewayState"
          label="网管状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="lastConnectionTime"
          label="上次连接时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="openUpdateForm(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteGateway(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改网关" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="网关ID" label-width="120px">
          <el-input v-model="updateData.hardwareGatewayID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关名称" label-width="120px">
          <el-input v-model="updateData.gatewayName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关类型" label-width="120px">
          <el-input v-model="updateData.gatewayType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" label-width="120px">
          <el-input v-model="updateData.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工厂名称" label-width="120px">
          <el-input v-model="updateData.factory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车间" label-width="120px">
          <el-input v-model="updateData.workshop" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增网关" :visible.sync="newFormVisible">
      <el-form :model="newGatewayData">
        <el-form-item label="网关ID" label-width="120px">
          <el-input v-model="newGatewayData.hardwareGatewayID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关名称" label-width="120px">
          <el-input v-model="newGatewayData.gatewayName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关类型" label-width="120px">
          <el-input v-model="newGatewayData.gatewayType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" label-width="120px">
          <el-input v-model="newGatewayData.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工厂名称" label-width="120px">
          <el-input v-model="newGatewayData.factory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车间" label-width="120px">
          <el-input v-model="newGatewayData.workshop" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="newGatewayData.radio" label="gateway">网关设备</el-radio>
          <el-radio v-model="newGatewayData.radio" label="device">物理设备</el-radio>
        </el-form-item>
        <el-form-item>
          <UploadImg></UploadImg>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {addGatewayApi, deleteGatewayApi, getGatewaysApi, searchGatewaysApi, updateGatewayApi} from '../../api/api';
  import UploadImg from "../../components/UploadImg/index";

  export default {
    name: "GatewayEquipment",
    components: {UploadImg},
    data() {
      return {
        updateFormVisible: false,
        newFormVisible: false,
        tableData: [{
          "id": "1",
          "hardwareGatewayID": "T001",
          "gatewayName": "",
          "gatewayType": "",
          "city": "",
          "factory": "",
          "workshop": "",
          "gatewayState": "",
          "lastConnectionTime": "",
          "imageUrl": "",
          "createTime": "",
          "updateTime": "",
          "remark": ""
        }],
        updateData: {},
        newGatewayData: {},
        searchData: {
          gatewayID: '',
          gatewayName: ''
        }
      }
    },

    methods: {
      async search() {
        const data = await searchGatewaysApi(this.searchData);
        this.tableData = data.data.d;
      },
      async add() {
        try {
          console.log('add',this.newGatewayData);
          const data = await addGatewayApi(this.newGatewayData);
          this.newFormVisible = false;
          if (data.data.c === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.getGateways();
          }
        } catch (e) {
          this.newFormVisible = false;
          this.$message.error('添加网关未成功');
        }
      },
      async update() {
        try {
          const data = await updateGatewayApi(this.updateData);
          this.updateFormVisible = false;
          if (data.data.c === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.getGateways();
          }
        } catch (e) {
          this.updateFormVisible = false;
          this.$message.error('更新网关未成功');
        }
      },
      async openUpdateForm(row) {//打开更新表单
        this.updateData = row;
        this.updateFormVisible = true
      },
      async deleteGateway(row) {
        try {
          this.$confirm('确认删除？')
            .then(async _=> {
              const data = await deleteGatewayApi(row.hardwareGatewayID);
              if (data.data.c === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                //再获取一次所有网关信息
                this.getGateways();
              }
            })
            .catch(_ => {});
        } catch (e) {
          console.log(e)
        }
      },
      async getGateways() {
        const data = await getGatewaysApi();
        this.tableData = data.data.d;
      }
    },
    async mounted() {
      //获取所有网关信息
      this.getGateways();
    }
  }
</script>

<style scoped>
  .search-container, .addbutton-container ,.table-container{
    margin:1% 1%;
    text-align: left;
  }
  .add-gateway-container{

  }
</style>
