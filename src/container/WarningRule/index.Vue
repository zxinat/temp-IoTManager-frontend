<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="选择设备">
          <el-select v-model="searchData.hardwareDeviceID" placeholder="请选择">
            <el-option
              v-for="c in dropdownDevices"
              :key="c.id"
              :label="c.deviceName"
              :value="c.hardwareDeviceID">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="设备名称">-->
        <!--<el-input v-model="searchData.deviceName"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="getAlarmInformationByDeviceId(searchData.hardwareDeviceID)"><img src="../../assets/img/find.svg">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <h2 style="margin-left: 10px">告警规则</h2>
    <div class="table-container">
      <el-table
        :data="rulesData"
        border>
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="name"
          label="规则名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="规则描述">
        </el-table-column>
        <el-table-column
          prop="deviceGroup"
          label="设备">
        </el-table-column>
<!--        <el-table-column-->
<!--        prop="handleState"-->
<!--        label="处理状态"-->
<!--        width="150">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="conditionString"
          label="规则">
        </el-table-column>
        <el-table-column
          prop="severity"
          label="告警等级">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="severityLevel"-->
        <!--label="严重等级"-->
        <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="ruleStatus"-->
        <!--label="开启规则"-->
        <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="affectNumber"-->
        <!--label="影响数目"-->
        <!--width="150">-->
        <!--</el-table-column>-->
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
    <div class="addbutton-container">
      <el-button type="primary" @click="multipleDelete">批量删除</el-button>
    </div>

      <el-dialog title="修改规则" :visible.sync="updateFormVisible">
        <el-form :model="updateData">
          <el-form-item label="规则名称" label-width="120px">
            <el-input v-model="updateData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="规则描述" label-width="120px">
            <el-input v-model="updateData.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备" label-width="120px">
            <el-select v-model="updateData.deviceGroup" placeholder="选择网关类型">
              <el-option
                v-for="gt in gatewayType"
                :key="gt.id"
                :label="gt.gatewayTypeName"
                :value="gt.gatewayTypeName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规则" label-width="120px">
            <el-input v-model="updateData.conditionString" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="告警等级" label-width="120px">
            <el-input v-model="updateData.severityLevel" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import {
    getAlarmInfoByDeviceid,
    getAlarmInformationApi, getAllRules, getDevicesApi,
    handleAllAlarmInformationApi,
    searchAlarmInformationApi,
    updateAlarmInformationApi,
    //deleteMultipleWarningRuleApi
  } from '../../api/api';

  export default {
    name: "WarningRule",
    data() {
      return {
        updateFormVisible: false,
        newFormVisible: false,
        rulesData:[{
          name: '规则1',
          description: '规则描述',
          deviceGroup: '',
          condition: [{ //保留，以免增加需求
            field: '',
            operator: '',
            value: '',
          }],
          conditionString:'',//这里把condition整合成字符串
          severity: '',
          ruleStatus: '',
          affectNumber: 0
        }],
        multipleSelection: [],
        dropdownDevices: [],
        updateData: {
          name:'',
          description:'',
          deviceGroup: '',
          severity: '',
          conditionString:''
        },
        handleData: {},
        searchData: {
          deviceID: '',
          deviceName: ''
        }
      }
    },

    methods: {
      async searchDeviceByName() {
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
      async getAlarmInformationByDeviceId(deviceId) {
        const data = await getAlarmInfoByDeviceid(deviceId);
        this.tableData = data.data.d;
      },
      async getAlarmInformation() {
        const data = await getAlarmInformationApi();
        this.tableData = data.data.d;
      },
      handleSelectionChange(val) {
        console.log('change',this.multipleSelection);
        this.multipleSelection = val;
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      async multipleDelete() {
        try {
          this.$confirm('确认删除？')
            .then(async _ => {
              this.deleteData.number = this.multipleSelection.map(el => el.id);
              const data = await deleteMultipleWarningRuleApi(this.deleteData);
              if (data.data.c === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                //再获取一次所有信息
                this.getAlarmInformation();
              }
            })
            .catch(_ => {
            });
        } catch (e) {
          console.log(e)
        }
      },
    },
    async mounted() {
      //获取所有信息
      this.getAlarmInformation();
      this.rulesData = (await getAllRules()).data.d;
      this.dropdownDevices = (await getDevicesApi()).data.d;
      console.log(this.dropdownDevices);
      // 此处需要获取所有告警规则信息的接口，返回态如rulesData。
    }
  }
</script>

<style scoped>
  .search-container, .addbutton-container ,.table-container{
    margin:1% 1%;
    text-align: left;
  }
</style>
