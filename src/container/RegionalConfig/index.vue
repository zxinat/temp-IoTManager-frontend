<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchCity" class="header">
        <el-form-item>
          <h2 class="hh">城市管理</h2>
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
          <el-select v-model="updateCityData.name" placeholder="选择城市">
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
          <el-input v-model="newCityData.name" autocomplete="off"></el-input>
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
          <h2 class="hh">实验楼</h2>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入实验楼名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchBuilding">搜索</el-button>
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
          prop="name"
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
            <el-button @click="openUpdateForm(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteGateway(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />

    <div class="search-container">
      <el-form :inline="true" :model="searchLab" class="header">
        <el-form-item>
          <h2 class="hh">实验室</h2>
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
            <el-button @click="openUpdateForm(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteGateway(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
  </div>
</template>

<script>
    import {
      getCityOptions,
      //无：
      getCityDataApi, updateCityApi, deleteCityApi, addCityApi, searchCityApi,
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
              name: '',
              remark: '',
            },
            newCityData: {
              name: '',
              remark: '',
            },
            buildingData: [{
              "name": "1号楼",
              "tel": "1888888888",
              "address": "华鑫科技园",
              "associatedCity": "上海",
              "remark": "",
            }],
            labData: [{
              "name": "101",
              "tel": "1888888888",
              "address": "华鑫科技园",
              "associatedBuilding": "1号楼",
              "remark": ""
            }]



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
            this.updateData = JSON.parse(JSON.stringify(row));
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
            this.$message.error('更新网关未成功');
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

      },

      async mounted() {
        this.cityList = (await getCityOptions()).data.d;
        this.cityData = (await getCityDataApi()).data.d; //得到“城市管理”的表单数据
        console.log(this.cityData)


      }
    }
</script>

<style lang="scss" scoped>
  .hh{
    display: inline;
  }

  .search-container, .table-container {
    margin: 1% 1%;
    text-align: left;
  }

</style>
