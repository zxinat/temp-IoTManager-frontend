<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchCity" class="header">
        <el-form-item>
          <h2>城市管理</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchCity" placeholder="请输入城市名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchByCity">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newCityFormVisible = true">添加城市</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="cityData"
        border
        style="width: 60%">
        <el-table-column
          prop="cityName"
          label="城市">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="openCityUpdateForm(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteCity(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />

    <el-dialog title="修改城市" :visible.sync="updateCityFormVisible">
      <el-form :model="updateCityData">
        <el-form-item label="城市" label-width="120px">
          <el-select v-model="updateCityData.cityName" placeholder="选择城市">
          <el-option
            v-for="c in cityList"
            :key="c.value"
            :label="c.label"
            :value="c.label">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="updateCityData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCityFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCity">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加城市" :visible.sync="newCityFormVisible">
      <el-form :model="newCityData">
        <el-form-item label="城市" label-width="120px">
          <el-input v-model="newCityData.cityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="newCityData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newCityFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCity">确 定</el-button>
      </div>
    </el-dialog>


    <div class="search-container">
      <el-form :inline="true" :model="searchBuilding" class="header">
        <el-form-item>
          <h2>实验楼</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchBuilding" placeholder="请输入实验楼名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchByBuilding">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newBuildingFormVisible = true">添加实验楼</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="buildingData"
        border
        style="width: 100%">
        <el-table-column
          prop="buildingName"
          label="实验楼">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="associatedCity"
          label="所属城市">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="openBuildingUpdateForm(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteBuilding(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />

    <el-dialog title="修改实验楼" :visible.sync="updateBuildingFormVisible">
      <el-form :model="updateBuildingData">
        <el-form-item label="所属城市" label-width="120px">
          <el-select v-model="updateBuildingData.associatedCity" @change="getUpdateBuildingList(updateBuildingData.associatedCity)" placeholder="选择城市">
            <el-option
              v-for="c in cityList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验楼" label-width="120px">
          <el-select v-model="updateBuildingData.buildingName" placeholder="选择实验楼">
            <el-option
              v-for="c in buildingList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="updateBuildingData.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="updateBuildingData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="updateBuildingData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBuildingFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBuilding">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加实验楼" :visible.sync="newBuildingFormVisible">
      <el-form :model="newBuildingData">
        <el-form-item label="所属城市" label-width="120px">
          <el-select v-model="newBuildingData.associatedCity" placeholder="选择城市">
            <el-option
              v-for="c in cityList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验楼" label-width="120px">
          <el-input v-model="newBuildingData.buildingName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="newBuildingData.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="newBuildingData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="newBuildingData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newBuildingFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBuilding">确 定</el-button>
      </div>
    </el-dialog>


    <div class="search-container">
      <el-form :inline="true" :model="searchByLab" class="header">
        <el-form-item>
          <h2>实验室</h2>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入实验室名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchLab">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newLabFormVisible = true">添加实验室</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="labData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="实验室">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话">
        </el-table-column><el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="associatedBuilding"
          label="所属实验楼">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="openLabUpdateForm(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteLab(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />

    <el-dialog title="修改实验室" :visible.sync="updateLabFormVisible">
      <el-form :model="updateLabData">
        <el-form-item label="所属实验楼" label-width="120px">
          <el-select v-model="updateLabData.associatedBuilding" @change="getUpdateLabList(updateLabData.associatedBuilding)" placeholder="选择城市">
            <el-option
              v-for="c in buildingList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室" label-width="120px">
          <el-select v-model="updateLabData.labName" placeholder="选择实验室">
            <el-option
              v-for="c in labList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="updateLabData.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="updateLabData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="updateLabData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateLabFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateLab">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加实验室" :visible.sync="newLabFormVisible">
      <el-form :model="newLabData">
        <el-form-item label="所属实验楼" label-width="120px">
          <el-select v-model="newLabData.associatedBuilding" placeholder="选择实验楼">
            <el-option
              v-for="c in buildingList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室" label-width="120px">
          <el-input v-model="newLabData.labName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="newLabData.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="newLabData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="newLabData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newLabFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLab">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCityOptions, getCityDataApi,
    getFactoryOptions, getBuildingDataApi,//无BuilingDataApi
    getWorkshopOptions, getLabDataApi,
    //无：
    updateCityApi, deleteCityApi, addCityApi, searchCityApi,
    updateBuildingApi, deleteBuildingApi, addBuildingApi, searchBuildingApi,
    updateLabApi, deleteLabApi, addLabApi, searchLabApi,
  } from '../../api/api';


    export default {
      name: "RegionalConfig",
      data() {
          return{
            searchCity: "",
            cityData: [],
            cityList: [],
            updateCityFormVisible: false,
            newCityFormVisible: false,
            updateCityData: {
              cityName: '',
              remark: '',
            },
            newCityData: {
              cityName: '',
              remark: '',
            },
            searchBuilding: "",
            buildingData: [{
              "buildingName": "1号楼",
              "tel": "1888888888",
              "address": "华鑫科技园",
              "associatedCity": "上海",
              "remark": "",
            }],
            buildingList: [],
            updateBuildingFormVisible: false,
            newBuildingFormVisible: false,
            updateBuildingData: {
              buildingName: '',
              tel: '',
              address: '',
              associatedCity: '',
              remark:'',
            },
            newBuildingData: {
              buildingName:'',
              tel: '',
              address: '',
              associatedCity: '',
              remark: '',
            },
            searchLab: "",
            labData: [{
              "name": "101",
              "tel": "1888888888",
              "address": "华鑫科技园",
              "associatedBuilding": "1号楼",
              "remark": ""
            }],
            labList: [],
            updateLabFormVisible: false,
            newLabFormVisible: false,
            updateLabData: {
              labName: '',
              tel: '',
              address: '',
              associatedBuilding: '',
              remark:'',
            },
            newLabData: {
              labName:'',
              tel: '',
              address: '',
              associatedBuilding: '',
              remark: '',
            },



          }
      },
      methods: {
        async searchByCity(){
          if(this.searchCity !== "") {
            this.cityData = (await searchCityApi(this.searchCity)).data.d;
          } else {
            this.cityData = (await getCityDataApi()).data.d;
          }
        },
        async openCityUpdateForm(row){  //打开更新表单
            console.log('test', row);
            this.updateCityData = JSON.parse(JSON.stringify(row));
            this.updateCityFormVisible = true;
        },
        async deleteCity(row) {
          try {
            this.$confirm('确认删除？')
              .then(async _ => {
                const data = await deleteCityApi(row.id);
                if (data.data.c === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  //再获取一次所有城市信息
                  this.cityData = (await getCityDataApi()).data.d;
                }
              })
              .catch(_ => {
              });
          } catch (e) {
            console.log(e)
          }
        },
        async updateCity(){
          try {
            const data = await updateCityApi(this.updateCityData);
            this.updateCityFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              });
              //再获取一次所有城市信息
              this.cityData = (await getCityDataApi()).data.d;
            }
          } catch (e) {
            this.updateCityFormVisible = false;
            this.$message.error('更新城市未成功');
          }
        },
        async addCity() {
          try {
            const data = await addCityApi(this.newCityData);
            this.newCityFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              //再获取一次所有城市信息
              this.cityData = (await getCityDataApi()).data.d;
            }
          } catch (e) {
            this.newCityFormVisible = false;
            this.$message.error('添加城市未成功');
          }
        },
        async searchByBuilding(){
          if(this.searchBuilding !== "") {
            this.buildingData = (await searchBuildingApi(this.searchBuilding)).data.d;
          } else {
            this.buildingData = (await getBuildingDataApi()).data.d;
          }
        },
        async getUpdateBuildingList(city){
          this.buildingList = (await getFactoryOptions(city)).data.d;
          if (this.buildingList[0] != null) {
            this.updateBuildingData.buildingName = this.buildingList[0].value;
          } else {
            this.updateBuildingData.buildingName = "";
            this.buildingList = [];
          }
        },
        async updateBuilding(){
          try {
            const data = await updateBuildingApi(this.updateBuildingData);
            this.updateBuildingFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              });
              //再获取一次所有实验楼信息
              this.buildingData = (await getBuildingDataApi()).data.d;
            }
          } catch (e) {
            this.updateBuildingFormVisible = false;
            this.$message.error('更新实验楼未成功');
          }

        },
        async openBuildingUpdateForm(row){//打开更新表单
          console.log('test', row);
          this.updateBuildingData = JSON.parse(JSON.stringify(row));
          this.updateBuildingFormVisible = true;
        },
        async addBuilding(){
          try {
            const data = await addBuildingApi(this.newBuildingData);
            this.newBuildingFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              //再获取一次所有实验楼信息
              this.buildingData = (await getBuildingDataApi()).data.d;
            }
          } catch (e) {
            this.newBuildingFormVisible = false;
            this.$message.error('添加实验楼未成功');
          }

        },
        async deleteBuilding(row){
          try {
            this.$confirm('确认删除？')
              .then(async _ => {
                const data = await deleteBuildingApi(row.id);
                if (data.data.c === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  //再获取一次所有实验楼信息
                  this.buildingData = (await getBuildingDataApi()).data.d;
                }
              })
              .catch(_ => {
              });
          } catch (e) {
            console.log(e)
          }
        },


        async searchByLab(){
          if(this.searchLab !== "") {
            this.LabData = (await searchLabApi(this.searchLab)).data.d;
          } else {
            this.LabData = (await getLabDataApi()).data.d;
          }
        },
        async getUpdateLabList(city){
          this.LabList = (await getWorkshopOptions(city)).data.d;
          if (this.LabList[0] != null) {
            this.updateLabData.labName = this.labList[0].value;
          } else {
            this.updateLabData.labName = "";
            this.labList = [];
          }
        },
        async updateLab(){
          try {
            const data = await updateLabApi(this.updateLabData);
            this.updateLabFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              });
              //再获取一次所有实验室信息
              this.labData = (await getLabDataApi()).data.d;
            }
          } catch (e) {
            this.updateLabFormVisible = false;
            this.$message.error('更新实验室未成功');
          }

        },
        async openLabUpdateForm(row){//打开更新表单
          console.log('test', row);
          this.updateLabData = JSON.parse(JSON.stringify(row));
          this.updateLabFormVisible = true;
        },
        async addLab(){
          try {
            const data = await addLabApi(this.newLabData);
            this.newLabFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              //再获取一次所有实验室信息
              this.LabData = (await getLabDataApi()).data.d;
            }
          } catch (e) {
            this.newLabFormVisible = false;
            this.$message.error('添加实验室未成功');
          }

        },
        async deleteLab(row){
          try {
            this.$confirm('确认删除？')
              .then(async _ => {
                const data = await deleteLabApi(row.id);
                if (data.data.c === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  //再获取一次所有实验室信息
                  this.LabData = (await getLabDataApi()).data.d;
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
        this.cityList = (await getCityOptions()).data.d;
        this.cityData = (await getCityDataApi()).data.d; //得到“城市管理”的表单数据
        this.buildingData = (await getBuildingDataApi()).data.d;
        this.labData = (await getLabDataApi()).data.d;


      }
    }
</script>

<style lang="scss" scoped>
  h2 {
    display: inline;
  }

  .search-container, .table-container {
    margin: 1% 1%;
    text-align: left;
  }

</style>
