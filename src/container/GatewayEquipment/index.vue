<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchGateway" class="header">
        <el-form-item :label="GLOBAL.firstLevel">
          <el-select v-model="searchGateway.city" @change="getFactoryList(searchGateway.city)" placeholder="上海">
            <el-option key="1" label="全部" value="全部"></el-option>
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.secondLevel">
          <el-select v-model="searchGateway.factory" @change="getWorkshopList(searchGateway.factory)" placeholder="南洋万邦">
            <el-option
              v-for="item in factoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.thirdLevel">
          <el-select v-model="searchGateway.workshop" placeholder="请选择">
            <el-option
              v-for="item in workshopOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filter(searchGateway.city, searchGateway.factory, searchGateway.workshop)"><img src="../../assets/img/find.svg">筛选</el-button>
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
            <!--:on-error="uploadFailed"-->
            <!--:file-list="fileList">-->
            <!--<el-button slot="trigger"-->
                       <!--type="primary">导入excel-->
            <!--</el-button>-->
          <!--</el-upload>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
    <div class="addbutton-container">
      <el-button type="primary" @click="newFormVisible = true">新增网关</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        id="gateway-equipment-out-table">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="hardwareGatewayID"
          label="网关编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gatewayName"
          label="网关名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gatewayType"
          label="网关类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          :label="GLOBAL.firstLevel"
          width="120">
        </el-table-column>
        <el-table-column
          prop="factory"
          :label="GLOBAL.secondLevel"
          width="120">
        </el-table-column>
        <el-table-column
          prop="workshop"
          :label="GLOBAL.thirdLevel"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gatewayState"
          label="网关状态"
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
          prop="department"
          label="部门"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述"
          width="120">
        </el-table-column>
        <el-table-column
          prop="imageUrl"
          label="网关图像链接"
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
    <div class="addbutton-container">
      <el-button type="primary" @click="multipleDelete">批量删除</el-button>
    </div>
    <el-dialog title="修改网关" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="网关编号" label-width="120px">
          <el-input v-model="updateData.hardwareGatewayID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关名称" label-width="120px">
          <el-input v-model="updateData.gatewayName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关类型" label-width="120px">
          <el-select v-model="updateData.gatewayType" placeholder="选择网关类型">
            <el-option
              v-for="gt in gatewayType"
              :key="gt.id"
              :label="gt.gatewayTypeName"
              :value="gt.gatewayTypeName">
            </el-option>
          </el-select>
          <el-button type="primary" @click="typeAddVisible = true">+</el-button>
        </el-form-item>
        <el-form-item :label="GLOBAL.firstLevel" label-width="120px">
          <el-select v-model="updateData.city" @change="getUpdateFactory(updateData.city)" placeholder="选择城市">
            <el-option
              v-for="c in updateCity"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
          <el-button type="primary" @click="cityAddVisible = true">+</el-button>
        </el-form-item>
        <el-form-item :label="GLOBAL.secondLevel+'名称'" label-width="120px">
          <el-select v-model="updateData.factory" @change="getUpdateWorkshop(updateData.factory)" placeholder="选择工厂">
            <el-option
              v-for="f in updateFactory"
              :key="f.value"
              :label="f.label"
              :value="f.label">
            </el-option>
          </el-select>
          <el-button type="primary" @click="factoryAddVisible = true">+</el-button>
        </el-form-item>
        <el-form-item :label="GLOBAL.thirdLevel" label-width="120px">
          <el-select v-model="updateData.workshop" placeholder="选择车间">
            <el-option
              v-for="w in updateWorkshop"
              :key="w.value"
              :label="w.label"
              :value="w.label">
            </el-option>
          </el-select>
          <el-button type="primary" @click="workshopAddVisible = true">+</el-button>
        </el-form-item>
        <!--<el-form-item label="网关状态" label-width="120px">-->
          <!--<el-select v-model="updateData.gatewayState" placeholder="选择网关类型">-->
            <!--<el-option-->
              <!--v-for="gs in gatewayState"-->
              <!--:key="gs.id"-->
              <!--:label="gs.stateName"-->
              <!--:value="gs.stateName">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="网关图像链接" label-width="120px">
          <el-input v-model="updateData.imageUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="updateData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="部门" label-width="120px">-->
          <!--<el-select v-model="updateData.department" placeholder="选择网关类型">-->
            <!--<el-option-->
              <!--v-for="d in department"-->
              <!--:key="d.id"-->
              <!--:label="d.departmentName"-->
              <!--:value="d.departmentName">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item>
          <UploadImg></UploadImg>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增网关" :visible.sync="newFormVisible">
      <el-form :model="newGatewayData">
        <el-form-item label="网关编号" label-width="120px">
          <el-input v-model="newGatewayData.hardwareGatewayID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关名称" label-width="120px">
          <el-input v-model="newGatewayData.gatewayName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关类型" label-width="120px">
          <el-select v-model="newGatewayData.gatewayType" placeholder="选择网关类型">
            <el-option
              v-for="gt in gatewayType"
              :key="gt.gatewayTypeName"
              :label="gt.gatewayTypeName"
              :value="gt.gatewayTypeName">
            </el-option>
          </el-select>
          <el-button type="primary" @click="typeAddVisible = true">+</el-button>
        </el-form-item>
        <el-form-item :label="GLOBAL.firstLevel" label-width="120px">
          <el-select v-model="newGatewayData.city" @change="getNewFactory(newGatewayData.city)" placeholder="请选择">
            <el-option
              v-for="c in city"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
          <el-button type="primary" @click="cityAddVisible = true">+</el-button>
        </el-form-item>
        <el-form-item :label="GLOBAL.secondLevel+'名称'" label-width="120px">
          <el-select v-model="newGatewayData.factory" @change="getNewWorkshop(newGatewayData.factory)" placeholder="请选择">
            <el-option
              v-for="f in factory"
              :key="f.value"
              :label="f.label"
              :value="f.label">
            </el-option>
          </el-select>
          <el-button type="primary" @click="factoryAddVisible = true">+</el-button>
        </el-form-item>
        <el-form-item :label="GLOBAL.thirdLevel" label-width="120px">
          <el-select v-model="newGatewayData.workshop" placeholder="请选择">
            <el-option
              v-for="w in workshop"
              :key="w.value"
              :label="w.label"
              :value="w.label">
            </el-option>
          </el-select>
          <el-button type="primary" @click="workshopAddVisible = true">+</el-button>
        </el-form-item>
        <!--<el-form-item label="网关状态" label-width="120px">-->
          <!--<el-select v-model="newGatewayData.gatewayState" placeholder="选择网关状态">-->
            <!--<el-option-->
              <!--v-for="gs in gatewayState"-->
              <!--:key="gs.stateName"-->
              <!--:label="gs.stateName"-->
              <!--:value="gs.stateName">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="网关图像链接" label-width="120px">
          <el-input v-model="newGatewayData.imageUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="newGatewayData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="部门" label-width="120px">-->
          <!--<el-select v-model="newGatewayData.department" placeholder="选择部门">-->
            <!--<el-option-->
              <!--v-for="d in department"-->
              <!--:key="d.id"-->
              <!--:label="d.departmentName"-->
              <!--:value="d.departmentName">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item class="tag-center">-->
        <!--<el-tag-->
        <!--:key="tag"-->
        <!--v-for="tag in newGatewayData.dynamicTags"-->
        <!--closable-->
        <!--:disable-transitions="false"-->
        <!--@close="handleClose(tag)">-->
        <!--{{tag}}-->
        <!--</el-tag>-->
        <!--<el-input-->
        <!--class="input-new-tag"-->
        <!--v-if="newGatewayData.inputVisible"-->
        <!--v-model="newGatewayData.inputValue"-->
        <!--ref="saveTagInput"-->
        <!--size="small"-->
        <!--@keyup.enter.native="handleInputConfirm"-->
        <!--@blur="handleInputConfirm"-->
        <!--&gt;-->
        <!--</el-input>-->
        <!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item class="gateway-radio">-->
        <!--<el-radio v-model="newGatewayData.radio" label="gateway">网关设备</el-radio>-->
        <!--<el-radio v-model="newGatewayData.radio" label="device">物理设备</el-radio>-->
        <!--</el-form-item>-->
        <el-form-item>
          <UploadImg></UploadImg>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增网关类型" :visible.sync="typeAddVisible">
      <el-form :model="typeTable">
        <el-form-item label="网关类型名" label-width="120px">
          <el-input v-model="typeTable.type" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="typeAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addType">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增城市" :visible.sync="cityAddVisible">
      <el-form :model="cityTable">
        <el-form-item label="城市名" label-width="120px">
          <el-input v-model="cityTable.cityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="cityTable.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cityAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCity">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增工厂" :visible.sync="factoryAddVisible">
      <el-form :model="factoryTable">
        <el-form-item label="工厂名" label-width="120px">
          <el-input v-model="factoryTable.factoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工厂电话" label-width="120px">
          <el-input v-model="factoryTable.factoryPhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工厂地址" label-width="120px">
          <el-input v-model="factoryTable.factoryAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属城市名" label-width="120px">
          <el-select v-model="factoryTable.city" placeholder="请选择">
            <el-option
              v-for="c in city"
              :key="c.id"
              :label="c.cityName"
              :value="c.cityName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="factoryTable.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="factoryAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFactory">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增车间" :visible.sync="workshopAddVisible">
      <el-form :model="workshopTable">
        <el-form-item label="车间名" label-width="120px">
          <el-input v-model="workshopTable.workshopName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车间电话" label-width="120px">
          <el-input v-model="workshopTable.workshopPhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车间地址" label-width="120px">
          <el-input v-model="workshopTable.workshopAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属工厂名" label-width="120px">
          <el-select v-model="workshopTable.factory" placeholder="请选择">
            <el-option
              v-for="f in factory"
              :key="f.id"
              :label="f.factoryName"
              :value="f.factoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="workshopTable.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="workshopAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWorkshop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addCity, addFactory,
    addGatewayApi, addWorkshop, createGatewayType,
    deleteGatewayApi,
    deleteMultipleGatewayApi,
    getAllDepartments,
    getCity, getCityOptions,
    getFactory, getFactoryOptions, getGatewayByWorkshop,
    getGatewaysApi,
    getGatewayState,
    getGatewayType,
    getWorkshop, getWorkshopOptions,
    searchGatewaysApi,
    updateGatewayApi
  } from '../../api/api';
  import UploadImg from "../../components/UploadImg/index";
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    name: "GatewayEquipment",
    components: {UploadImg},
    data() {
      return {
        typeAddVisible: false,
        cityAddVisible: false,
        factoryAddVisible: false,
        workshopAddVisible:false,
        updateFormVisible: false,
        newFormVisible: false,
        city: [],
        factory: [],
        workshop: [],
        updateCity: [],
        updateFactory: [],
        updateWorkshop: [],
        department: [],
        gatewayState: [],
        gatewayType: [],
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
          "remark": "",
          "department": ""
        }],
        typeTable: {
          type: ''
        },
        cityTable: {
          cityName: "",
          remark: ""
        },
        factoryTable: {
          factoryName: "",
          factoryPhoneNumber: "",
          factoryAddress: "",
          remark: "",
          city: ""
        },
        workshopTable: {
          workshopName: "",
          workshopPhoneNumber: "",
          workshopAddress: "",
          remark: "",
          factory: ""
        },
        multipleSelection: [],
        updateData: {
          hardwareGatewayID: '',
          gatewayName: '',
          gatewayType: '',
          city: '',
          factory: '',
          workshop: '',
          gatewayState: '',
          imageUrl: '',
          remark: '',
          department: '',
        },
        newGatewayData: {
          hardwareGatewayID: '',
          gatewayName: '',
          gatewayType: '',
          city: '',
          factory: '',
          workshop: '',
          gatewayState: '',
          imageUrl: '',
          remark: '',
          department: '',


          // 标签
          inputVisible: false,
          inputValue: '',
          dynamicTags: ['标签一', '标签二', '标签三'],
        },
        searchGateway: {
          city: '上海',
          factory: '南洋万邦',
          workshop: '车间1',
        },
        cityOptions: [],
        factoryOptions: [],
        workshopOptions: [],
        searchData: {
          deviceID: '',
          deviceName: ''
        },
        fileList: [],
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
              "网关编号": "hardwareGatewayID",
              "网关名称": "gatewayName",
              "更新时间": "gatewayType",
              "城市": "city",
              "工厂": "factory",
              "车间": "workshop",
              "网关状态": "gatewayState",
              "上次连接时间": "lastConnectionTime",
              "网关图像链接": "imageUrl",
              "创建时间": "createTime",
              "更新时间": "updateTime",
              "描述": "remark",
              "部门": "department"
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
          wb = XLSX.utils.table_to_book(document.querySelector('#gateway-equipment-out-table').removeChild(fix));
          console.log("test");
          document.querySelector('#gateway-equipment-out-table').appendChild(fix);
        } else {
          wb = XLSX.utils.table_to_book(document.querySelector('#gateway-equipment-out-table'));
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
            '网关设备.xlsx'
          );
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout);
        }
        return wbout;
      },
      async searchGatewayByName() {
        const data = await searchGatewaysApi(this.searchData);
        this.tableData = data.data.d;
      },
      async add() {
        try {
          console.log(this.gatewayState);
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
      async addType() {
        try {
          const data = await createGatewayType(this.typeTable.type);
          this.typeAddVisible = false;
          if (data.data.d === "success") {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.gatewayType = (await getGatewayType()).data.d;
          }
        } catch (e) {
          this.typeAddVisible = false;
          this.$message.error('网关类型添加失败');
        }
      },
      async addCity() {
        try {
          const data = await addCity(this.cityTable);
          this.cityAddVisible = false;
          if (data.data.d === "success") {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.city = (await getCity()).data.d;
          }
        } catch (e) {
          this.cityAddVisible = false;
          this.$message.error('城市添加失败');
        }
      },
      async addFactory() {
        try {
          const data = await addFactory(this.factoryTable);
          this.factoryAddVisible = false;
          if (data.data.d === "success") {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.factory = (await getFactory()).data.d;
          }
        } catch (e) {
          this.factoryAddVisible = false;
          this.$message.error('工厂添加失败');
        }
      },
      async addWorkshop() {
        try {
          const data = await addWorkshop(this.workshopTable);
          this.workshopAddVisible = false;
          if (data.data.d === "success") {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.workshop = (await getWorkshop()).data.d;
          }
        } catch (e) {
          this.workshopAddVisible = false;
          this.$message.error('车间添加失败');
        }
      },
      async getUpdateFactory(city) {
        this.updateFactory = (await getFactoryOptions(city)).data.d;
      },
      async getUpdateWorkshop(factory) {
        this.updateWorkshop = (await getWorkshopOptions(factory)).data.d;
      },
      async getNewFactory(city) {
        this.factory = (await getFactoryOptions(city)).data.d;
      },
      async getNewWorkshop(factory) {
        this.workshop = (await getWorkshopOptions(factory)).data.d;
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
        console.log('test',row);
        this.updateData = JSON.parse(JSON.stringify(row));
        this.updateFormVisible = true
      },
      async deleteGateway(row) {
        try {
          this.$confirm('确认删除？')
            .then(async _ => {
              const data = await deleteGatewayApi(row.id);
              if (data.data.c === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                //再获取一次所有网关信息
                this.getGateways();
              }
            })
            .catch(_ => {
            });
        } catch (e) {
          console.log(e)
        }
      },
      async getGateways() {
        const data = await getGatewaysApi();
        this.tableData = data.data.d;
      },
      handleSelectionChange(val) {
        console.log('change', this.multipleSelection);
        this.multipleSelection = val;
      },
      async multipleDelete() {
        try {
          this.$confirm('确认删除？')
            .then(async _ => {
              this.deleteData.number = this.multipleSelection.map(el => el.id);
              const data = await deleteMultipleGatewayApi(this.deleteData);
              if (data.data.c === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                //再获取一次所有网关信息
                this.getGateways();
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
        this.newGatewayData.dynamicTags.splice(this.newGatewayData.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.newGatewayData.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.newGatewayData.inputValue;
        if (inputValue) {
          this.newGatewayData.dynamicTags.push(inputValue);
        }
        this.newGatewayData.inputVisible = false;
        this.newGatewayData.inputValue = '';
      },
      async filter(city, factory, workshop) {
        if(city !== '全部') {
          const data = await getGatewayByWorkshop(city, factory, workshop);
          this.tableData = data.data.d;
        } else {
          this.getGateways();
        }
        //调接口，传searchGateway参数
      },
      getCityList() {
        // 调获取城市接口
      },
      async getFactoryList(city) {
        if (city !== '全部') {
          this.factoryOptions = (await getFactoryOptions(city)).data.d;
          if (this.factoryOptions[0] != null) {
            this.searchGateway.factory = this.factoryOptions[0].value;
            this.getWorkshopList(this.searchGateway.factory);
          } else {
            this.searchGateway.factory = "";
            this.searchGateway.workshop = "";
            this.workshopOptions = [];
          }
        } else {
          this.factoryOptions = [];
          this.workshopOptions = [];
          this.searchGateway.factory = '全部';
          this.searchGateway.workshop = '全部';
        }
        // 调获取工厂接口，searchGateway.city参数
      },
      async getWorkshopList(factory) {
        this.workshopOptions = (await getWorkshopOptions(factory)).data.d;
        if (this.workshopOptions[0] != null) {
          this.searchGateway.workshop = this.workshopOptions[0].value;
        } else {
          this.searchGateway.workshop = "";
        }
        // 调获取车间接口，searchGateway.city，searchGateway.factory参数
      }
    }
    ,
    async mounted() {
      this.getCityList();
      //获取所有网关信息
      this.getGateways();
      this.cityOptions = (await getCityOptions()).data.d;
      this.searchGateway.city = "全部";
      this.searchGateway.factory = "全部";
      this.searchGateway.workshop = "全部";
      // if (this.cityOptions[0] != null) {
      //   this.searchGateway.city = this.cityOptions[0].value;
      //   this.getFactoryList(this.cityOptions[0].value);
      // } else {
      //   this.searchGateway.city = "";
      //   this.searchGateway.factory = "";
      //   this.searchGateway.workshop = "";
      //   this.cityOptions = [];
      //   this.factoryOptions = [];
      //   this.workshopOptions = [];
      // }
      this.city = (await getCityOptions()).data.d;
      this.updateCity = (await getCityOptions()).data.d;
      // this.factory = (await getFactory()).data.d;
      // this.workshop = (await getWorkshop()).data.d;
      this.gatewayState = (await getGatewayState()).data.d;
      this.gatewayType = (await getGatewayType()).data.d;
      this.department = (await getAllDepartments()).data.d;
    }
  }
</script>

<style scoped>
  .search-container, .addbutton-container, .table-container {
    margin: 1% 1%;
    text-align: left;
  }

  .gateway-radio {
    margin: 0 auto 10px;
    width: 200px;
  }

  .add-gateway-container {

  }

  /*标签处理*/
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
