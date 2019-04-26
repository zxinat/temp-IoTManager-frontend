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
      <el-button type="primary" @click="newFormVisible = true">新增设备</el-button>
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
          prop="hardwareDeviceID"
          label="设备id"
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
        <el-form-item label="设备ID" label-width="120px">
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
        <el-form-item label="所属网关ID" label-width="120px">
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
        <el-form-item label="设备ID" label-width="120px">
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
        <el-form-item label="所属网关ID" label-width="120px">
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
        <!--<el-form-item class="tag-center">-->
          <!--<el-tag-->
            <!--:key="tag"-->
            <!--v-for="tag in newDeviceData.dynamicTags"-->
            <!--closable-->
            <!--:disable-transitions="false"-->
            <!--@close="handleClose(tag)">-->
            <!--{{tag}}-->
          <!--</el-tag>-->
          <!--<el-input-->
            <!--class="input-new-tag"-->
            <!--v-if="newDeviceData.inputVisible"-->
            <!--v-model="newDeviceData.inputValue"-->
            <!--ref="saveTagInput"-->
            <!--size="small"-->
            <!--@keyup.enter.native="handleInputConfirm"-->
            <!--@blur="handleInputConfirm"-->
          <!--&gt;-->
          <!--</el-input>-->
          <!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>-->
        <!--</el-form-item>-->
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
    searchDevicesApi,
    updateDeviceApi,
    deleteMultipleDeviceApi,
    getCity, getFactory, getDeviceState, getDeviceType, getWorkshop, getAllDepartments
  } from '../../api/api';
  import UploadImg from "../../components/UploadImg/index";
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
          searchData: {
            deviceID: '',
            deviceName: ''
          }
        }
      },

      methods: {
        addImage(file){
          this.newDeviceData.img=file;
        },
        async search() {
          const data = await searchDevicesApi(this.searchData);
          this.tableData = data.data.d;
        },
        async add() {
          try {
            console.log('yyy',this.newDeviceData);
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
                const data = await deleteMultipleDeviceApi(this.multipleSelection.map(el => el.id));
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
        }
      },
      async mounted() {
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
