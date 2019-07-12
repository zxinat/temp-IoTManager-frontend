<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchGateway" class="header">
        <el-form-item :label="GLOBAL.firstLevel">
          <el-select v-model="searchGateway.city" @change="getFactoryList" placeholder="上海">
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.secondLevel">
          <el-select v-model="searchGateway.factory" @change="getWorkshopList" placeholder="南洋万邦">
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
          <el-button type="primary" @click="filter"><img src="../../assets/img/find.svg">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出Excel</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="readExcel"
            :on-error="uploadFailed"
            :file-list="fileList">
            <el-button slot="trigger"
                       type="primary">导入excel
            </el-button>
          </el-upload>
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
        </el-form-item>
        <el-form-item :label="GLOBAL.firstLevel" label-width="120px">
          <el-select v-model="updateData.city" placeholder="选择网关类型">
            <el-option
              v-for="c in city"
              :key="c.id"
              :label="c.cityName"
              :value="c.cityName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.secondLevel+'名称'" label-width="120px">
          <el-select v-model="updateData.factory" placeholder="选择网关类型">
            <el-option
              v-for="f in factory"
              :key="f.id"
              :label="f.factoryName"
              :value="f.factoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.thirdLevel" label-width="120px">
          <el-select v-model="updateData.workshop" placeholder="选择网关类型">
            <el-option
              v-for="w in workshop"
              :key="w.id"
              :label="w.workshopName"
              :value="w.workshopName">
            </el-option>
          </el-select>
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
        </el-form-item>
        <el-form-item :label="GLOBAL.firstLevel" label-width="120px">
          <el-select v-model="newGatewayData.city" placeholder="请选择">
            <el-option
              v-for="c in city"
              :key="c.id"
              :label="c.cityName"
              :value="c.cityName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.secondLevel+'名称'" label-width="120px">
          <el-select v-model="newGatewayData.factory" placeholder="请选择">
            <el-option
              v-for="f in factory"
              :key="f.id"
              :label="f.factoryName"
              :value="f.factoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.thirdLevel" label-width="120px">
          <el-select v-model="newGatewayData.workshop" placeholder="请选择">
            <el-option
              v-for="w in workshop"
              :key="w.id"
              :label="w.workshopName"
              :value="w.workshopName">
            </el-option>
          </el-select>
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
  </div>
</template>

<script>
  import {
    addGatewayApi,
    deleteGatewayApi,
    deleteMultipleGatewayApi,
    getAllDepartments,
    getCity,
    getFactory,
    getGatewaysApi,
    getGatewayState,
    getGatewayType,
    getWorkshop,
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
        updateFormVisible: false,
        newFormVisible: false,
        city: [],
        factory: [],
        workshop: [],
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
        fileList: []
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
              const data = await deleteMultipleGatewayApi(this.multipleSelection.map(el => el.id));
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
      filter() {
        console.log(this.searchGateway);
        //调接口，传searchGateway参数
      },
      getCityList() {
        // 调获取城市接口
      },
      getFactoryList() {
        console.log(this.searchGateway.city);
        // 调获取工厂接口，searchGateway.city参数
      },
      getWorkshopList() {
        console.log(this.searchGateway.city, this.searchGateway.factory);
        // 调获取车间接口，searchGateway.city，searchGateway.factory参数
      }
    }
    ,
    async mounted() {
      this.getCityList();
      //获取所有网关信息
      this.getGateways();
      this.city = (await getCity()).data.d;
      this.factory = (await getFactory()).data.d;
      this.workshop = (await getWorkshop()).data.d;
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
