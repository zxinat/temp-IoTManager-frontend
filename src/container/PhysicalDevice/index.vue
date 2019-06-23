<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchDevice" class="header">
        <el-form-item label="城市">
          <el-select v-model="searchDevice.city" @change="getFactoryList" placeholder="上海">
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工厂">
          <el-select v-model="searchDevice.factory" @change="getWorkshopList"  placeholder="南洋万邦">
            <el-option
              v-for="item in factoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间">
          <el-select v-model="searchDevice.workshop" placeholder="车间1">
            <el-option
              v-for="item in workshopOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filter"><img src="../../assets/img/find.svg">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出Excel</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload
            ref="upload"
            action="/sss"
            :show-file-list="false"
            :on-success="readExcel"
            :on-error="uploadFailed">
            <el-button slot="trigger"
                       type="primary">导入excel
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="addbutton-container">
      <el-button type="primary" @click="newFormVisible = true">新增设备</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      id="physical-device-out-table">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="hardwareDeviceID"
          label="设备编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="设备类型"
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
          prop="imageUrl"
          label="设备图像链接"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gatewayID"
          label="所属网关ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mac"
          label="Mac地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deviceState"
          label="设备状态"
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
          prop="department"
          label="部门"
          width="120">
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
    <el-dialog title="修改设备" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="设备编号" label-width="120px">
          <el-input v-model="updateData.hardwareDeviceID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" label-width="120px">
          <el-input v-model="updateData.deviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" label-width="120px">
          <el-select v-model="updateData.city" placeholder="选择城市">
            <el-option
              v-for="c in city"
              :key="c.id"
              :label="c.cityName"
              :value="c.cityName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工厂" label-width="120px">
          <el-select v-model="updateData.factory" placeholder="选择工厂">
            <el-option
              v-for="f in factory"
              :key="f.id"
              :label="f.factoryName"
              :value="f.factoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" label-width="120px">
          <el-select v-model="updateData.workshop" placeholder="选择车间">
            <el-option
              v-for="w in workshop"
              :key="w.id"
              :label="w.workshopName"
              :value="w.workshopName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态" label-width="120px">
          <el-select v-model="updateData.deviceState" placeholder="选择设备状态">
            <el-option
              v-for="ds in deviceState"
              :key="ds.id"
              :label="ds.stateName"
              :value="ds.stateName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备图像链接" label-width="120px">
          <el-input v-model="updateData.imageUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属网关编号" label-width="120px">
          <el-input v-model="updateData.gatewayID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MAC地址" label-width="120px">
          <el-input v-model="updateData.mac" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" label-width="120px">
          <el-select v-model="updateData.deviceType" placeholder="选择设备类型">
            <el-option
              v-for="dt in deviceType"
              :key="dt.id"
              :label="dt.deviceTypeName"
              :value="dt.deviceTypeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" label-width="120px">
          <el-select v-model="updateData.department" placeholder="选择部门">
            <el-option
              v-for="d in department"
              :key="d.id"
              :label="d.departmentName"
              :value="d.departmentName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="updateData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <UploadImg @upload="addImage"></UploadImg>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增设备" :visible.sync="newFormVisible">
      <el-form :model="newDeviceData">
        <el-form-item label="设备编号" label-width="120px">
          <el-input v-model="newDeviceData.hardwareDeviceID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" label-width="120px">
          <el-input v-model="newDeviceData.deviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" label-width="120px">
          <el-select v-model="newDeviceData.city" placeholder="选择城市">
            <el-option
              v-for="c in city"
              :key="c.id"
              :label="c.cityName"
              :value="c.cityName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工厂" label-width="120px">
          <el-select v-model="newDeviceData.factory" placeholder="选择工厂">
            <el-option
              v-for="f in factory"
              :key="f.id"
              :label="f.factoryName"
              :value="f.factoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" label-width="120px">
          <el-select v-model="newDeviceData.workshop" placeholder="选择车间">
            <el-option
              v-for="w in workshop"
              :key="w.id"
              :label="w.workshopName"
              :value="w.workshopName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态" label-width="120px">
          <el-select v-model="newDeviceData.deviceState" placeholder="选择设备状态">
            <el-option
              v-for="ds in deviceState"
              :key="ds.id"
              :label="ds.stateName"
              :value="ds.stateName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备图像链接" label-width="120px">
          <el-input v-model="newDeviceData.imageUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属网关编号" label-width="120px">
          <el-input v-model="newDeviceData.gatewayID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MAC地址" label-width="120px">
          <el-input v-model="newDeviceData.mac" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" label-width="120px">
          <el-select v-model="newDeviceData.deviceType" placeholder="选择设备类型">
            <el-option
              v-for="dt in deviceType"
              :key="dt.id"
              :label="dt.deviceTypeName"
              :value="dt.deviceTypeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" label-width="120px">
          <el-select v-model="newDeviceData.department" placeholder="选择部门">
            <el-option
              v-for="d in department"
              :key="d.id"
              :label="d.departmentName"
              :value="d.departmentName">
            </el-option>
          </el-select>
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
        <el-form-item>
          <UploadImg @upload="addImage"></UploadImg>
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
    addDeviceApi,
    deleteDeviceApi,
    getDevicesApi,
    searchDevicesByDeviceNameApi,
    updateDeviceApi,
    deleteMultipleDeviceApi,
    getCity, getFactory, getDeviceState, getDeviceType, getWorkshop, getAllDepartments, searchDevicesByDeviceIdApi
  } from '../../api/api';
  import UploadImg from "../../components/UploadImg/index";
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

    export default {
        name: "PhysicalDevice",
      components: {UploadImg},
      data() {
        return {
          updateFormVisible: false,
          newFormVisible: false,
          deviceState: [],
          city: [],
          factory: [],
          workshop: [],
          deviceType: [],
          department: [],
          tableData: [{
            "id": "",
            "hardwareDeviceID": "",
            "deviceName": "",
            "city": "",
            "factory": "",
            "workshop": "",
            "deviceState": "",
            "lastConnectionTime": "",
            "imageUrl": "",
            "gatewayID": "",
            "mac": "",
            "deviceType": "",
            "createTime": "",
            "updateTime": "",
            "remark": "",
            "department": "",
          }],
          multipleSelection: [],
          updateData: {
            hardwareDeviceID: '',
            deviceName: '',
            city: '',
            factory: '',
            workshop: '',
            deviceState: '',
            imageUrl: '',
            gatewayID:'',
            mac: '',
            deviceType: '',
            remark: '',
            department: '',
          },
          newDeviceData: {
            // 标签
            hardwareDeviceID: '',
            deviceName: '',
            city: '',
            factory: '',
            workshop: '',
            deviceState: '',
            imageUrl: '',
            gatewayID:'',
            mac: '',
            deviceType: '',
            remark: '',
            department: '',

            inputVisible: false,
            inputValue: '',
            dynamicTags: ['标签一', '标签二', '标签三'],
          },
          searchDevice: {
            city: '上海',
            factory:'南洋万邦',
            workshop:'车间1',
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
          searchData: {
            deviceID: '',
            deviceName: ''
          },
          deleteData: {
            number: []
          }
        }
      },

      methods: {
        uploadFailed(){
          this.$message.error('导入失败');
        },
        readExcel(res,file) {
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
                "设备编号":"hardwareDeviceID",
                "设备名称":"deviceName",
                "设备类型":"deviceType",
                "城市":"city",
                "工厂":"factory",
                "车间":"workshop",
                "设备图像链接":"imageUrl",
                "所属网关ID":"gatewayID",
                "Mac地址":"mac",
                "设备状态":"deviceState",
                "上次连接时间":"lastConnectionTime",
                "创建时间":"createTime",
                "更新时间":"updateTime",
                "描述":"remark",
                "部门":"department",
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
        exportExcel () {
          var fix = document.querySelector('.el-table__fixed-right');
          var wb;
          if (fix) {
            wb = XLSX.utils.table_to_book(document.querySelector('#physical-device-out-table').removeChild(fix));
            console.log("test");
            document.querySelector('#physical-device-out-table').appendChild(fix);
          } else {
            wb = XLSX.utils.table_to_book(document.querySelector('#physical-device-out-table'));
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
              '物理设备.xlsx'
            );
          } catch (e) {
            if (typeof console !== 'undefined') console.log(e, wbout);
          }
          return wbout;
        },
        addImage(file){
          this.newDeviceData.img=file;
        },
        async searchDeviceByName() {
          console.log(this.searchDeviceName);
          const data = await searchDevicesByDeviceNameApi(this.searchDeviceName.deviceName);
          this.tableData = data.data.d;
        },
        async searchDeviceById() {
          const data = await searchDevicesByDeviceIdApi(this.searchDeviceId.deviceId);
          this.tableData = data.data.d;
        },
        async add() {
          try {
            console.log(this.deviceState);
            const data = await addDeviceApi(this.newDeviceData);
            this.newFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getDevices();
            }
          } catch (e) {
            this.newFormVisible = false;
            this.$message.error('添加设备未成功');
          }
        },
        async update() {
          try {
            const data = await updateDeviceApi(this.updateData);
            this.updateFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              });
              this.getDevices();
            }
          } catch (e) {
            this.updateFormVisible = false;
            this.$message.error('更新设备未成功');
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
                console.log(row);
                console.log(row.id);
                const data = await deleteDeviceApi(row.id);
                if (data.data.c === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  //再获取一次所有网关信息
                  this.getDevices();
                }
              })
              .catch(_ => {});
          } catch (e) {
            console.log(e)
          }
        },
        async getDevices() {
          const data = await getDevicesApi();
          this.tableData = data.data.d;
        },
        handleSelectionChange(val) {
          console.log('change',this.multipleSelection);
          this.multipleSelection = val;
        },
        async multipleDelete() {
          try {
            this.$confirm('确认删除？')
              .then(async _ => {
                this.deleteData.number = this.multipleSelection.map(el => el.id);
                const data = await deleteMultipleDeviceApi(this.deleteData);
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
          this.newDeviceData.dynamicTags.splice(this.newDeviceData.dynamicTags.indexOf(tag), 1);
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
        filter(){
          console.log(this.searchDevice);
          //调接口，传searchDevice参数
        },
        getCityList(){
          // 调获取城市接口
        },
        getFactoryList(){
          console.log(this.searchDevice.city);
          // 调获取工厂接口，searchDevice.city参数
        },
        getWorkshopList(){
          console.log(this.searchDevice.city,this.searchDevice.factory);
          // 调获取车间接口，searchDevice.city，searchDevice.factory参数
        }
      },
      async mounted() {
        this.getCityList();
        //获取所有设备信息
        this.getDevices();
        this.city = (await getCity()).data.d;
        this.factory = (await getFactory()).data.d;
        this.workshop = (await getWorkshop()).data.d;
        this.deviceState = (await getDeviceState()).data.d;
        this.deviceType = (await getDeviceType()).data.d;
        this.department = (await getAllDepartments()).data.d;
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
  .tag-center{
    text-align: center;
  }
</style>
