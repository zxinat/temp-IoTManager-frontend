<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="选择设备">
          <el-select v-model="curSearchDevice" placeholder="请选择" @change="getRules">
            <el-option value="全部" label="全部"></el-option>
            <el-option
              v-for="c in dropdownDevices"
              :key="c.id"
              :label="c.deviceName"
              :value="c.hardwareDeviceID">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <h2 style="margin-left: 10px">告警规则</h2>
    <div class="table-container">
      <el-pagination background layout="prev, pager, next"
                     :total="totalPage"
                     :current-page.sync="curPage"
                     :page-size="12"
                     @current-change="pageChange()">
      </el-pagination>
      <el-table
        :data="rulesData"
        @sort-change="sortChange"
        border>
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="name"
          label="规则名称" sortable="custom">
        </el-table-column>
        <el-table-column
          prop="description"
          label="规则描述">
        </el-table-column>
        <el-table-column
          prop="deviceGroup"
          label="设备">
        </el-table-column>
        <el-table-column
          prop="conditionString"
          label="规则">
        </el-table-column>
        <el-table-column
          prop="severity"
          label="告警等级" sortable="custom">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
        <el-button @click="openUpdateForm(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="deleteRule(scope.row)" type="text" size="small">删除</el-button>
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
                v-for="d in deviceOptions"
                :key="d.id"
                :label="d.deviceName"
                :value="d.hardwareDeviceID">
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
    getAlarmInformationApi, getAllRules, getDevicesApi, getRuleNumber,
    handleAllAlarmInformationApi,
    searchAlarmInformationApi,
    updateAlarmInformationApi,
    //deleteMultipleWarningRuleApi
  } from '../../api/api';

  export default {
    name: "WarningRule",
    data() {
      return {
        totalPage: 0,
        curPage: 1,
        curSortColumn: '',
        curOrder: '',
        curSearchDevice: '全部',
        updateFormVisible: false,
        newFormVisible: false,
        deviceOptions: [],
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
      async update() {

      },
      async openUpdateForm(row) {//打开更新表单
        this.updateData = row;
        this.updateFormVisible = true
      },
      handleSelectionChange(val) {
        console.log('change',this.multipleSelection);
        this.multipleSelection = val;
      },
      async deleteRule(row) {
        console.log(row);
      },
      async getRules() {
        const orderMap = {ascending: 'asc', descending: 'desc'};
        const searchColumn = this.curSortColumn === '' ? 'id' : this.curSortColumn;
        const searchOrder = this.curOrder === '' ? 'asc' : orderMap[this.curOrder];
        const searchDevice = this.curSearchDevice === '全部' ? 'all' : this.curSearchDevice;
        const data = await getAllRules('search', searchDevice, this.curPage, searchOrder, searchColumn);
        this.rulesData = data.data.d;
        this.getTotalPage('search', searchDevice);
      },
      async getTotalPage(searchType, deviceName='all') {
        if (searchType === 'all') {
          this.totalPage = (await getRuleNumber('all')).data.d;
        } else if(searchType === 'search') {
          const d = deviceName === '全部' ? 'all' : deviceName;
          this.totalPage = (await getRuleNumber('search', d)).data.d;
        }
      },
      async pageChange() {
        this.getRules();
      },
      async sortChange(ob) {
        const columnMap = {'name': 'ruleName', 'severity': 'severity'}
        this.curSortColumn = columnMap[ob.prop];
        this.curOrder = ob.order;
        this.getRules();
      },
      async multipleDelete() {
      },
    },
    async mounted() {
      //获取所有信息
      this.getTotalPage('all');
      this.getRules();
      this.dropdownDevices = (await getDevicesApi('all')).data.d;
      this.deviceOptions = (await getDevicesApi('all')).data.d;
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
