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
          <el-button type="primary" @click="search"><img src="../../assets/img/find.svg">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="addbutton-container">
      <el-button type="primary" @click="newFormVisible = true">快速处理</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="deviceName"
          label="设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dataName"
          label="数据名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="alarmType"
          label="告警类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="handleState"
          label="处理状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="alarmContent"
          label="告警内容"
          width="120">
        </el-table-column>
        <el-table-column
          prop="alarmTime"
          label="告警时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="handleTime"
          label="处理时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="handleMethod"
          label="处理方式"
          width="120">
        </el-table-column>
        <el-table-column
          prop="handleContent"
          label="处理内容"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="openUpdateForm(scope.row)" type="text" size="small">处理</el-button>
            <!--<el-button @click="deleteDevice(scope.row)" type="text" size="small">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="告警处理" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="处理状态" label-width="120px">
          <el-input v-model="updateData.handleState" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="处理方式" label-width="120px">
          <el-input v-model="updateData.handleMethod" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="处理内容" label-width="120px">
          <el-input v-model="updateData.handleContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handle">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="快速处理" :visible.sync="newFormVisible">
      <el-form :model="handleData">
        <el-form-item label="处理状态" label-width="120px">
          <el-input v-model="handleData.handleState" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="处理方式" label-width="120px">
          <el-input v-model="handleData.handleMethod" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="处理内容" label-width="120px">
          <el-input v-model="handleData.handleContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAll">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getAlarmInformationApi,updateAlarmInformationApi,handleAllAlarmInformationApi,searchAlarmInformationApi} from '../../api/api';
    export default {
        name: "WarningMessage",
      data() {
        return {
          updateFormVisible: false,
          newFormVisible: false,
          tableData: [{
            "id": "1",
            "deviceName": "设备1",
            "dataName": "警报！",
            "alarmType": "类型1",
            "handleState": "未处理",
            "alarmTime": "2018-9-9",
            "alarmContent": "警报警报哈哈哈哈",
            "handleTime":"",
            "handleMethod":"",
            "handleContent":""
          }],
          multipleSelection: [],
          updateData: {},
          handleData: {},
          searchData: {
            deviceID: '',
            deviceName: ''
          }
        }
      },

      methods: {
        async search() {
          const data = await searchAlarmInformationApi(this.searchData);
          this.tableData = data.data.d;
        },
        async handleAll() {
          try {
            const data = await handleAllAlarmInformationApi(this.handleData,this.multipleSelection.map(el=>el.id));
            this.newFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '已选警报处理成功',
                type: 'success'
              });
              this.getAlarmInformation();
            }
          } catch (e) {
            this.newFormVisible = false;
            this.$message.error('警报处理未成功');
          }
        },
        async handle() {
          try {
            console.log('update',this.updateData);
            const data = await updateAlarmInformationApi(this.updateData);
            this.updateFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '警报处理成功',
                type: 'success'
              });
              this.getAlarmInformation();
            }
          } catch (e) {
            this.updateFormVisible = false;
            this.$message.error('警报处理未成功');
          }
        },
        async openUpdateForm(row) {//打开更新表单
          this.updateData = row;
          this.updateFormVisible = true
        },
        async getAlarmInformation() {
          const data = await getAlarmInformationApi();
          this.tableData = data.data.d;
        },
        handleSelectionChange(val) {
          console.log('change',this.multipleSelection);
          this.multipleSelection = val;
        },
      },
      async mounted() {
        //获取所有设备信息
        this.getAlarmInformation();
      }
    }
</script>

<style scoped>
  .search-container, .addbutton-container ,.table-container{
    margin:1% 1%;
    text-align: left;
  }
</style>
