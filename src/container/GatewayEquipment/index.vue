<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="网关编号">
          <el-input v-model="searchData.hardwareGatewayID"></el-input>
        </el-form-item>
        <el-form-item label="网关名称">
          <el-input v-model="searchData.gatewayName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search"><img src="../../assets/img/find.svg">查询</el-button>
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
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
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
          prop="gatewayState"
          label="网关状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="imageUrl"
          label="网关图像链接"
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
        <el-form-item label="城市" label-width="120px">
          <el-select v-model="updateData.city" placeholder="选择网关类型">
            <el-option
              v-for="c in city"
              :key="c.id"
              :label="c.cityName"
              :value="c.cityName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工厂名称" label-width="120px">
          <el-select v-model="updateData.factory" placeholder="选择网关类型">
            <el-option
              v-for="f in factory"
              :key="f.id"
              :label="f.factoryName"
              :value="f.factoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" label-width="120px">
          <el-select v-model="updateData.workshop" placeholder="选择网关类型">
            <el-option
              v-for="w in workshop"
              :key="w.id"
              :label="w.workshopName"
              :value="w.workshopName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网关状态" label-width="120px">
          <el-select v-model="updateData.gatewayState" placeholder="选择网关类型">
            <el-option
              v-for="gs in gatewayState"
              :key="gs.id"
              :label="gs.stateName"
              :value="gs.stateName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网关图像链接" label-width="120px">
          <el-input v-model="updateData.imageUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="updateData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" label-width="120px">
          <el-select v-model="updateData.department" placeholder="选择网关类型">
            <el-option
              v-for="d in department"
              :key="d.id"
              :label="d.departmentName"
              :value="d.departmentName">
            </el-option>
          </el-select>
        </el-form-item>
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
              :key="gt.id"
              :label="gt.gatewayTypeName"
              :value="gt.gatewayTypeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" label-width="120px">
          <el-select v-model="newGatewayData.city" placeholder="选择城市">
            <el-option
              v-for="c in city"
              :key="c.id"
              :label="c.cityName"
              :value="c.cityName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工厂名称" label-width="120px">
          <el-select v-model="newGatewayData.factory" placeholder="选择工厂">
            <el-option
              v-for="f in factory"
              :key="f.id"
              :label="f.factoryName"
              :value="f.factoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" label-width="120px">
          <el-select v-model="newGatewayData.workshop" placeholder="选择车间">
            <el-option
              v-for="w in workshop"
              :key="w.id"
              :label="w.workshopName"
              :value="w.workshopName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网关状态" label-width="120px">
          <el-select v-model="newGatewayData.gatewayState" placeholder="选择网关状态">
            <el-option
              v-for="gs in gatewayState"
              :key="gs.id"
              :label="gs.stateName"
              :value="gs.stateName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网关图像链接" label-width="120px">
          <el-input v-model="newGatewayData.imageUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="newGatewayData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" label-width="120px">
          <el-select v-model="newGatewayData.department" placeholder="选择部门">
            <el-option
              v-for="d in department"
              :key="d.id"
              :label="d.departmentName"
              :value="d.departmentName">
            </el-option>
          </el-select>
        </el-form-item>
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
    getGatewaysApi,
    searchGatewaysApi,
    updateGatewayApi,
    deleteMultipleGatewayApi,
    getCity, getFactory, getGatewayType, getGatewayState, getAllDepartments, getWorkshop
  } from '../../api/api';
  import UploadImg from "../../components/UploadImg/index";

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
        searchData: {
          gatewayID: '',
          gatewayName: ''
        },
      }
    },

    methods: {
      async search() {
        const data = await searchGatewaysApi(this.searchData);
        this.tableData = data.data.d;
      },
      async add() {
        try {
          console.log('add',this.newGatewayData);
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
        this.updateData = row;
        this.updateFormVisible = true
      },
      async deleteGateway(row) {
        try {
          this.$confirm('确认删除？')
            .then(async _=> {
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
            .catch(_ => {});
        } catch (e) {
          console.log(e)
        }
      },
      async getGateways() {
        const data = await getGatewaysApi();
        this.tableData = data.data.d;
      },
      handleSelectionChange(val) {
        console.log('change',this.multipleSelection);
        this.multipleSelection = val;
      },
      async multipleDelete(){
        try {
          this.$confirm('确认删除？')
            .then(async _=> {
              const data = await deleteMultipleGatewayApi(this.multipleSelection.map(el=>el.id));
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
      }
    },
    async mounted() {
      //获取所有网关信息
      this.getGateways();
      this.city = (await getCity()).data.d;
      this.factory = (await getFactory()).data.d;
      this.workshop = (await  getWorkshop()).data.d;
      this.department = (await getAllDepartments()).data.d;
      this.gatewayState = (await getGatewayState()).data.d;
      this.gatewayType = (await getGatewayType()).data.d;
    }
  }
</script>

<style scoped>
  .search-container, .addbutton-container ,.table-container{
    margin:1% 1%;
    text-align: left;
  }
  .gateway-radio{
    margin: 0 auto 10px;
    width: 200px;
  }
  .add-gateway-container{

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
  .tag-center{
    text-align: center;
  }
</style>
