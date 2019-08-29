<template>
  <div>
  <div class="search-container">
    <el-form :inline="true" class="header">
      <el-form-item>
        <h2>设备类型</h2>
      </el-form-item>
      <el-form-item v-if="checkTypeAuth(['CONFIGURE_SYSTEM_RETRIEVE'])">
        <el-input v-model="searchDeviceType" placeholder="请输入设备类型"></el-input>
      </el-form-item>
      <el-form-item v-if="checkTypeAuth(['CONFIGURE_SYSTEM_RETRIEVE'])">
        <el-button type="primary" @click="searchByDeviceType">搜索</el-button>
      </el-form-item>
      <el-form-item v-if="checkTypeAuth(['CONFIGURE_SYSTEM_CREATE'])">
        <el-button type="primary" @click="newFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-container" v-if="checkTypeAuth(['CONFIGURE_SYSTEM_RETRIEVE'])">
    <el-table
      :data="tableData"
      border
      style="width: 60%"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="deviceType"
        label="设备类型">
      </el-table-column>
      <el-table-column
        prop="warningTime"
        label="超时告警时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作" v-if="checkTypeAuth(['CONFIGURE_SYSTEM_DELETE', 'CONFIGURE_SYSTEM_UPDATE'])">
        <template slot-scope="scope">
          <el-button @click="openUpdateForm(scope.row)" type="text" size="small" v-if="checkTypeAuth(['CONFIGURE_SYSTEM_UPDATE'])">修改</el-button>
          <el-button @click="deleteDeviceType(scope.row)" type="text" size="small" v-if="checkTypeAuth(['CONFIGURE_SYSTEM_DELETE'])">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

    <el-dialog title="修改设备类型" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="设备类型" label-width="120px">
          <el-select v-model="updateData.deviceType" placeholder="选择城市">
            <el-option
              v-for="dt in deviceType"
              :key="dt.id"
              :label="dt.deviceTypeName"
              :value="dt.deviceTypeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="超时告警时间" label-width="120px">
          <el-input v-model="updateData.warningTime" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加设备类型" :visible.sync="newFormVisible">
      <el-form :model="newData">
        <el-form-item label="设备类型" label-width="120px">
          <el-input v-model="newData.deviceType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="超时告警时间" label-width="120px">
          <el-input v-model="newData.warningTime" autocomplete="off"></el-input>
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
    import {
      getDeviceTypeApi, searchDeviceTypeApi, deleteDeviceTypeApi, updateDeviceTypeApi,
      getDeviceType, addDeviceTypeApi, deleteMultipleDeviceTypeApi
    } from '../../api/api'
    import {checkAuth} from "../../common/util";
    export default {
      name: "DeviceTypeConfig",
      data() {
        return {
          deviceType: [],
          tableData: [{
            "deviceType": "测试1",
            "warningTime": "30min",
          }],
          newFormVisible: false,
          updateFormVisible: false,
          searchDeviceType: '',
          multipleSelection: [],
          updateData: {
            deviceType: '',
            warningTime: '',
          },
          newData: {
            deviceType: '',
            warningTime: '',
          },
          deleteData: {
            number: []
          },
        }
      },

      methods: {
        checkTypeAuth(auth) {
          checkAuth(auth);
        },
        handleSelectionChange(val) {
          console.log('change', this.multipleSelection);
          this.multipleSelection = val;
        },
        async deleteDeviceType(row){
          try {
            this.$confirm('确认删除？')
              .then(async _ => {
                const data = await deleteDeviceTypeApi(row.id);
                if (data.data.c === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  //再获取一次所有信息
                  this.tableData = (await getDeviceTypeApi()).data.d;
                }
              })
              .catch(_ => {
              });
          } catch (e) {
            console.log(e)
          }
        },
        async openUpdateForm(row){//打开更新表单
          console.log('test', row);
          this.updateData = JSON.parse(JSON.stringify(row));
          this.updateFormVisible = true;
        },
        async searchByDeviceType(){
          if(this.searchDeviceType !== "") {
            this.tableData = (await searchDeviceTypeApi(this.searchDeviceType)).data.d;
          } else {
            this.tableData = (await getDeviceTypeApi()).data.d;
          }
        },
        async multipleDelete(){
          try {
            this.$confirm('确认删除？')
              .then(async _ => {
                this.deleteData.number = this.multipleSelection.map(el => el.id);
                const data = await deleteMultipleDeviceTypeApi(this.deleteData);
                if (data.data.c === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  //再获取一次所有信息
                  this.tableData = (await getDeviceTypeApi()).data.d;
                }
              })
              .catch(_ => {
              });
          } catch (e) {
            console.log(e)
          }
        },
        async add(){
          try {
            const data = await addDeviceTypeApi(this.newData);
            this.newFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              //再获取一次所有信息
              this.tableData = (await getDeviceTypeApi()).data.d;
            }
          } catch (e) {
            this.newFormVisible = false;
            this.$message.error('添加设备类型未成功');
          }
        },
        async update(){
          try {
            const data = await updateDeviceTypeApi(this.updateData);
            this.updateFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              });
              //再获取一次所有信息
              this.tableData = (await getDeviceTypeApi()).data.d;
            }
          } catch (e) {
            this.updateFormVisible = false;
            this.$message.error('更新设备类型未成功');
          }
        },
      },
      async mounted() {
        this.deviceType = (await getDeviceType()).data.d;
        this.tableData = (await getDeviceTypeApi()).data.d;
      },
    }
</script>

<style scoped>
  .search-container, .table-container, .deleteButton-container {
    margin: 1% 1%;
    text-align: left;
  }

  h2{
    display: inline;
  }

</style>
