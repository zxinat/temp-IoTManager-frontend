<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchDevice" class="header">
        <el-form-item>
          <el-select v-model="curSearchDevice" @change="getDeviceData" placeholder="请选择设备">
            <el-option value="全部" label="全部"></el-option>
            <el-option
              v-for="d in deviceOptions"
              :key="d.id"
              :label="d.deviceName"
              :value="d.hardwareDeviceID"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出Excel</el-button>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-upload-->
            <!--ref="upload"-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--:show-file-list="false"-->
            <!--:on-success="readExcel"-->
            <!--:on-error="uploadFailed">-->
            <!--<el-button slot="trigger"-->
                       <!--type="primary">导入excel-->
            <!--</el-button>-->
          <!--</el-upload>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
    <!--<div class="addbutton-container">-->
      <!--<el-button type="primary" @click="newFormVisible = true">新增数据</el-button>-->
    <!--</div>-->
    <div class="table-container">
      <el-pagination background layout="prev, pager, next"
                     :total="totalPage"
                     :current-page.sync="curPage"
                     :page-size="12"
                     @current-change="pageChange()">
      </el-pagination>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        id="equipment-data-out-table">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="数据编号"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="deviceId"
          label="设备ID"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="indexName"
          label="属性名称"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="indexId"
          label="属性ID"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="indexType"
          label="属性类型">
        </el-table-column>
        <el-table-column
          prop="indexValue"
          label="值">
        </el-table-column>
        <el-table-column
          prop="indexUnit"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="timestamp"
          label="时间"
          sortable="custom">
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
    <div class="addbutton-container">
      <el-button type="primary" @click="multipleDelete">批量删除</el-button>
    </div>
    <el-dialog title="修改数据" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="所属设备编号" label-width="120px">
          <el-input v-model="updateData.hardwareDeviceID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属设备名称" label-width="120px">
          <el-input v-model="updateData.deviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属网关编号" label-width="120px">
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
        <el-form-item label="所属设备编号" label-width="120px">
          <el-input v-model="newDeviceData.hardwareDeviceID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属设备名称" label-width="120px">
          <el-input v-model="newDeviceData.deviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属网关编号" label-width="120px">
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
        <el-form-item class="tag-center">
          <el-tag
            :key="tag"
            v-for="tag in newDeviceData.dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="newDeviceData.inputVisible"
            v-model="newDeviceData.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
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
    getDeviceDataNumber,
    addDeviceDataApi,
    deleteDeviceDataApi,
    deleteMultipleDataApi, getCityCascaderOptions, getCityOptions, getDevicesApi,
    getDevicesDataApi,
    searchDeviceDataApi,
    updateDeviceDataApi
  } from '../../api/api';
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    name: "EquipmentData",
    data() {
      return {
        totalPage: 0,
        curPage: 1,
        curSortColumn: '',
        curOrder: '',
        cascaderValue: [],
        cascaderOptions: [],
        updateFormVisible: false,
        newFormVisible: false,
        deviceOptions: [],
        curSearchDevice: '全部',
        tableData: [{
          "id": "1",
          "dataName": "6",
          "deviceName": "设备1",
          "deviceId": "8",
          "indexName": "",
          "indexType": "",
          "indexId": "",
          "indexValue": "",
          "indexUnit": "",
          "timestamp": ""
        }],
        multipleSelection: [],
        updateData: {
          hardwareDeviceID: '',
          deviceName: '',
          hardwareGatewayID: '',
          gatewayName: '',
          data: '',
          remark: '',
        },
        newDeviceData: {
          hardwareDeviceID: '',
          DeviceName: '',
          hardwareGatewayID: '',
          gatewayName: '',
          data: '',
          remark: '',

          // 标签
          inputVisible: false,
          inputValue: '',
          dynamicTags: ['标签一', '标签二', '标签三'],
        },
        searchData: {
          deviceID: '',
          deviceName: ''
        },
        searchDevice: {
          city: 'all',
          factory: 'all',
          workshop: 'all',
        },
        cityOptions: [{
          value: '选项1',
          label: '城市1'
        }, {
          value: '选项2',
          label: '城市2'
        }, {
          value: '选项3',
          label: '城市3'
        }, {
          value: '选项4',
          label: '城市4'
        }, {
          value: '选项5',
          label: '城市5'
        }],
        factoryOptions: [{
          value: '选项1',
          label: '工厂1'
        }, {
          value: '选项2',
          label: '工厂2'
        }, {
          value: '选项3',
          label: '工厂3'
        }, {
          value: '选项4',
          label: '工厂4'
        }, {
          value: '选项5',
          label: '工厂5'
        }],
        workshopOptions: [{
          value: '选项1',
          label: '车间1'
        }, {
          value: '选项2',
          label: '车间2'
        }, {
          value: '选项3',
          label: '车间3'
        }, {
          value: '选项4',
          label: '车间4'
        }, {
          value: '选项5',
          label: '车间5'
        }],
      }
    },

    methods: {
      uploadFailed(){
        this.$message.error('导入失败');
      },
      readExcel(res,file) {
        console.log('testss',file);
        let vm = this;
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary'
            });
            let sheetArray;
            for (let sheet in workbook.Sheets) {
              sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            }
            let dictionary = {
              "数据编号":"ID",
              "所属网关编号":"hardwareGatewayID",
              "所属网关名称":"gatewayName",
              "所属设备编号":"hardwareDeviceID",
              "所属设备名称":"deviceName",
              "数据":"data",
              "创建时间":"createTime",
              "描述":"remark",
            };
            let newData = sheetArray.map((item) => {
              let obj={};
              for(let key in item){
                obj[dictionary[key]]=item[key];
              }
              return obj;
            });
            // 导入接口，将数据导入后端
            vm.tableData.push(...newData);
            this.$message({
              message: '导入成功',
              type: 'success'
            });
          } catch
            (e) {
            this.$message.warning('文件类型不正确！');
            return false;
          }
        };
        fileReader.readAsBinaryString(file.raw);
      },
      exportExcel() {
        var fix = document.querySelector('.el-table__fixed-right');
        var wb;
        if (fix) {
          wb = XLSX.utils.table_to_book(document.querySelector('#equipment-data-out-table').removeChild(fix));
          console.log("test");
          document.querySelector('#equipment-data-out-table').appendChild(fix);
        } else {
          wb = XLSX.utils.table_to_book(document.querySelector('#equipment-data-out-table'));
        }
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], {
              type: 'application/octet-stream'
            }),
            '设备数据.xlsx'
          );
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout);
        }
        return wbout;
      },
      async searchDeviceByName() {
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
            this.getDeviceData();
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
            this.getDeviceData();
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
            .then(async _ => {
              const data = await deleteDeviceDataApi(row.ID);
              if (data.data.c === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                //再获取一次所有网关信息
                this.getDeviceData();
              }
            })
            .catch(_ => {
            });
        } catch (e) {
          console.log(e)
        }
      },
      handleSelectionChange(val) {
        console.log('change', this.multipleSelection);
        this.multipleSelection = val;
      },
      async multipleDelete() {
        try {
          this.$confirm('确认删除？')
            .then(async _ => {
              const data = await deleteMultipleDataApi(this.multipleSelection.map(el => el.id));
              if (data.data.c === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                //再获取一次所有网关信息
                this.getDevices();
              }
            })
            .catch(_ => {
            });
        } catch (e) {
          console.log(e)
        }
      },
      // 标签处理函数
      handleClose(tag) {
        //this.newDeviceData.dynamicTags.splice(this.newDeviceData.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.newDeviceData.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.newDeviceData.inputValue;
        if (inputValue) {
          this.newDeviceData.dynamicTags.push(inputValue);
        }
        this.newDeviceData.inputVisible = false;
        this.newDeviceData.inputValue = '';
      },
      filter() {
        console.log(this.searchGatewayData);
        //调接口，传searchGatewayData参数
      },
      getCityList() {
        // 调获取城市接口
      },
      getFactoryList() {
        console.log(this.searchDevice.city);
        // 调获取工厂接口，searchGatewayData.city参数
      },
      getWorkshopList() {
        console.log(this.searchDevice.city, this.searchDevice.factory);
        // 调获取车间接口，searchGatewayData.city，searchGatewayData.factory参数
      },
      async getDeviceData() {
        const orderMap = {ascending: 'asc', descending: 'desc'};
        const columnMap = {id: 'Id', deviceId: 'DeviceId', indexName: 'IndexName', indexId: 'IndexId', timestamp: 'Timestamp'};
        const searchColumn = this.curSortColumn === '' ? "Id" : columnMap[this.curSortColumn];
        const searchOrder = this.curOrder === '' ? "asc" : orderMap[this.curOrder];
        const searchDeviceId = this.curSearchDevice === '全部' ? "all" : this.curSearchDevice;
        const data = await getDevicesDataApi('search', this.curPage, searchColumn, searchOrder, searchDeviceId);
        this.tableData = data.data.d;
        this.getTotalPage('search', searchDeviceId);
      },
      async pageChange() {
        this.getDeviceData();
      },
      async sortChange(ob) {
        this.curSortColumn = ob.prop;
        this.curOrder = ob.order;
        this.getDeviceData();
      },
      async getDeviceOptions() {
        this.deviceOptions = (await getDevicesApi('all')).data.d;
      },
      async getTotalPage(searchType, deviceId = 'all') {
        if(searchType === 'all') {
          this.totalPage = (await getDeviceDataNumber('all')).data.d;
        } else if(searchType === 'search') {
          const d = deviceId === '全部' ? 'all' : deviceId;
          this.totalPage = (await getDeviceDataNumber('search', d)).data.d;
        }
      }
    },
    async mounted() {
      this.getTotalPage('all');
      this.getDeviceOptions();
      this.getCityList();
      //获取所有设备信息
      this.getDeviceData();
    }
  }
</script>

<style scoped>
  .search-container, .addbutton-container, .table-container {
    margin: 1% 1%;
    text-align: left;
  }

  .add-device-container {

  }

  /*标签处理*/
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .tag-center {
    text-align: center;
  }
</style>
