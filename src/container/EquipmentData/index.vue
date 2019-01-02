<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="设备ID">
          <el-input v-model="searchData.hardwareDeviceID"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="searchData.deviceName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="addbutton-container">
      <el-button type="primary" @click="newFormVisible = true">新增数据</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="ID"
          label="数据ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="hardwareGatewayID"
          label="所属网关ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gatewayName"
          label="所属网关名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="hardwareDeviceID"
          label="所属设备ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="所属设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="data"
          label="数据"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="openUpdateForm(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteDevice(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改数据" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="所属设备ID" label-width="120px">
          <el-input v-model="updateData.hardwareDeviceID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属设备名称" label-width="120px">
          <el-input v-model="updateData.deviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属网关ID" label-width="120px">
          <el-input v-model="updateData.hardwareGatewayID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属网关名称" label-width="120px">
          <el-input v-model="updateData.gatewayName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据" label-width="120px">
          <el-input v-model="updateData.data" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="updateData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增数据" :visible.sync="newFormVisible">
      <el-form :model="newDeviceData">
        <el-form-item label="所属设备ID" label-width="120px">
          <el-input v-model="newDeviceData.hardwareDeviceID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属设备名称" label-width="120px">
          <el-input v-model="newDeviceData.deviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属网关ID" label-width="120px">
          <el-input v-model="newDeviceData.hardwareGatewayID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属网关名称" label-width="120px">
          <el-input v-model="newDeviceData.gatewayName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据" label-width="120px">
          <el-input v-model="newDeviceData.data" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="newDeviceData.remark" autocomplete="off"></el-input>
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
  import {addDeviceDataApi, deleteDeviceDataApi, getDevicesDataApi, searchDeviceDataApi, updateDeviceDataApi} from '../../api/api';
    export default {
        name: "EquipmentData",
      data() {
        return {
          updateFormVisible: false,
          newFormVisible: false,
          tableData: [{
            "ID": "1",
            "hardwareGatewayID": "1",
            "gatewayName": "1",
            "hardwareDeviceID": "1",
            "deviceName": "设备1",
            "data": "bxhdcudc",
            "createTime": "2018-9-9",
            "remark": "描述",
          }],
          updateData: {},
          newDeviceData: {},
          searchData: {
            deviceID: '',
            deviceName: ''
          }
        }
      },

      methods: {
        async search() {
          const data = await searchDeviceDataApi(this.searchData);
          this.tableData = data.data.d;
        },
        async add() {
          try {
            const data = await addDeviceDataApi(this.newDeviceData);
            this.newFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getDeviceDatas();
            }
          } catch (e) {
            this.newFormVisible = false;
            this.$message.error('添加设备未成功');
          }
        },
        async update() {
          try {
            const data = await updateDeviceDataApi(this.updateData);
            this.updateFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              });
              this.getDeviceDatas();
            }
          } catch (e) {
            this.updateFormVisible = false;
            this.$message.error('更新数据未成功');
          }
        },
        async openUpdateForm(row) {//打开更新表单
          this.updateData = row;
          this.updateFormVisible = true
        },
        async deleteDevice(row) {
          try {
            this.$confirm('确认删除？')
              .then(async _=> {
                const data = await deleteDeviceDataApi(row.ID);
                if (data.data.c === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  //再获取一次所有网关信息
                  this.getDeviceDatas();
                }
              })
              .catch(_ => {});
          } catch (e) {
            console.log(e)
          }
        },
        async getDeviceDatas() {
          const data = await getDevicesDataApi();
          this.tableData = data.data.d;
        }
      },
      async mounted() {
        //获取所有设备信息
        this.getDeviceDatas();
      }
    }
</script>

<style scoped>
  .search-container, .addbutton-container ,.table-container{
    margin:1% 1%;
    text-align: left;
  }
  .add-device-container{

  }
</style>
