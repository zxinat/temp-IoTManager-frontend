<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" class="header">
        <el-form-item>
          <h2 id="first">{{GLOBAL.firstLevel}}</h2>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-input v-model="searchCity" :placeholder=" '请输入' + GLOBAL.firstLevel + '名'"></el-input>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-button type="primary" @click="searchByCity">搜索</el-button>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_CREATE'])">
          <el-button type="primary" @click="newCityFormVisible = true">添加{{GLOBAL.firstLevel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container" v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
      <el-pagination background layout="prev, pager, next"
                     :total="cityTotalPage"
                     :current-page.sync="cityCurPage"
                     :page-size="6"
                     @current-change="cityPageChange()">
      </el-pagination>
      <el-table
        v-loading="loading"
        :data="cityData"
        border
        style="width: 100%"
        @sort-change="citySortChange">
        <el-table-column
          prop="cityName"
          :label="GLOBAL.firstLevel">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="longitude"
          label="经度"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="latitude"
          label="纬度"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" v-if="checkRegionAuth(['CONFIGURE_REGION_DELETE', 'CONFIGURE_REGION_UPDATE'])">
          <template slot-scope="scope">
            <el-button @click="openCityUpdateForm(scope.row)" type="text" size="small" v-if="checkRegionAuth(['CONFIGURE_REGION_UPDATE'])">修改</el-button>
            <el-button @click="deleteCity(scope.row)" type="text" size="small" v-if="checkRegionAuth(['CONFIGURE_REGION_DELETE'])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />

    <el-dialog :title="'修改'+GLOBAL.firstLevel" :visible.sync="updateCityFormVisible">
      <el-form :model="updateCityData" ref="updateCityData">
        <el-form-item :label="GLOBAL.firstLevel" prop="cityName" label-width="120px"
                      :rules="[{required: true, message:GLOBAL.firstLevel+ '不能为空'}]">
          <el-input v-model="updateCityData.cityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="updateCityData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCityFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCity('updateCityData')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'添加'+GLOBAL.firstLevel" :visible.sync="newCityFormVisible">
      <el-form :model="newCityData" ref="newCityData">
        <el-form-item :label="GLOBAL.firstLevel" prop="cityName" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.firstLevel+'不能为空'}]">
          <el-input v-model="newCityData.cityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="newCityData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newCityFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCity('newCityData')">确 定</el-button>
      </div>
    </el-dialog>


    <div class="search-container">
      <el-form :inline="true" class="header">
        <el-form-item>
          <h2 id="second">{{GLOBAL.secondLevel}}</h2>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-input v-model="searchBuilding" :placeholder=" '请输入' + GLOBAL.secondLevel + '名'"></el-input>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-button type="primary" @click="searchByBuilding">搜索</el-button>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_CREATE'])">
          <el-button type="primary" @click="newBuildingFormVisible = true">添加{{GLOBAL.secondLevel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container" v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
      <el-pagination background layout="prev, pager, next"
                     :total="factoryTotalPage"
                     :current-page.sync="factoryCurPage"
                     :page-size="6"
                     @current-change="factoryPageChange()">
      </el-pagination>
      <el-table
        v-loading="loading"
        :data="buildingData"
        border
        style="width: 100%"
        @sort-change="factorySortChange">
        <el-table-column
          prop="factoryName"
          :label="GLOBAL.secondLevel">
        </el-table-column>
        <el-table-column
          prop="factoryPhoneNumber"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="factoryAddress"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="city"
          :label="'所属'+GLOBAL.firstLevel">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" v-if="checkRegionAuth(['CONFIGURE_REGION_DELETE', 'CONFIGURE_REGION_UPDATE'])">
          <template slot-scope="scope">
            <el-button @click="openBuildingUpdateForm(scope.row)" type="text" size="small" v-if="checkRegionAuth(['CONFIGURE_REGION_UPDATE'])">修改</el-button>
            <el-button @click="deleteBuilding(scope.row)" type="text" size="small" v-if="checkRegionAuth(['CONFIGURE_REGION_DELETE'])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />

    <el-dialog :title="'修改'+GLOBAL.secondLevel" :visible.sync="updateBuildingFormVisible">
      <el-form :model="updateBuildingData" ref="updateBuildingData">
        <el-form-item :label="'所属'+GLOBAL.firstLevel" prop="city" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.firstLevel+'不能为空'}]">
          <el-select v-model="updateBuildingData.city" :placeholder="'选择'+GLOBAL.firstLevel">
            <el-option
              v-for="c in cityList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.secondLevel" prop="factoryName" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.secondLevel+'不能为空'}]">
          <el-input v-model="updateBuildingData.factoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="updateBuildingData.factoryPhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="updateBuildingData.factoryAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="updateBuildingData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBuildingFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBuilding('updateBuildingData')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'添加'+GLOBAL.secondLevel" :visible.sync="newBuildingFormVisible">
      <el-form :model="newBuildingData" ref="newBuildingData">
        <el-form-item :label="'所属'+GLOBAL.firstLevel" prop="city" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.firstLevel+'不能为空'}]">
          <el-select v-model="newBuildingData.city" :placeholder="'选择'+GLOBAL.firstLevel">
            <el-option
              v-for="c in cityList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.secondLevel" prop="factoryName" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.secondLevel+'不能为空'}]">
          <el-input v-model="newBuildingData.factoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="newBuildingData.factoryPhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="newBuildingData.factoryAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="newBuildingData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newBuildingFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBuilding('newBuildingData')">确 定</el-button>
      </div>
    </el-dialog>


    <div class="search-container">
      <el-form :inline="true" class="header">
        <el-form-item>
          <h2 id="third">{{GLOBAL.thirdLevel}}</h2>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-input  v-model="searchLab" :placeholder=" '请输入' + GLOBAL.thirdLevel + '名'"></el-input>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-button type="primary" @click="searchByLab">搜索</el-button>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_CREATE'])">
          <el-button type="primary" @click="newLabFormVisible = true">添加{{GLOBAL.thirdLevel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container" v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
      <el-pagination background layout="prev, pager, next"
                     :total="workshopTotalPage"
                     :current-page.sync="workshopCurPage"
                     :page-size="6"
                     @current-change="workshopPageChange()">
      </el-pagination>
      <el-table
        v-loading="loading"
        :data="labData"
        border
        style="width: 100%"
        @sort-change="workshopSortChange">
        <el-table-column
          prop="workshopName"
          :label="GLOBAL.thirdLevel">
        </el-table-column>
        <el-table-column
          prop="workshopPhoneNumber"
          label="电话">
        </el-table-column><el-table-column
          prop="workshopAddress"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="city"
          :label="'所属'+GLOBAL.firstLevel">
        </el-table-column>
        <el-table-column
          prop="factory"
          :label="'所属'+GLOBAL.secondLevel">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" v-if="checkRegionAuth(['CONFIGURE_REGION_DELETE', 'CONFIGURE_REGION_UPDATE'])">
          <template slot-scope="scope">
            <el-button @click="openLabUpdateForm(scope.row)" type="text" size="small" v-if="checkRegionAuth(['CONFIGURE_REGION_UPDATE'])">修改</el-button>
            <el-button @click="deleteLab(scope.row)" type="text" size="small" v-if="checkRegionAuth(['CONFIGURE_REGION_DELETE'])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />

    <el-dialog :title="'修改'+GLOBAL.thirdLevel" :visible.sync="updateLabFormVisible">
      <el-form :model="updateLabData" ref="updateLabData">
        <el-form-item :label="'所属'+GLOBAL.firstLevel" prop="city" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.firstLevel+'不能为空'}]">
          <el-select v-model="updateLabData.city" :placeholder="'选择'+GLOBAL.firstLevel" @change="getUpdateBuildingList(updateLabData.city)">
            <el-option
              v-for="c in cityList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'所属'+GLOBAL.secondLevel" prop="factory" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.secondLevel+'不能为空'}]">
          <el-select v-model="updateLabData.factory" :placeholder="'选择'+GLOBAL.secondLevel">
            <el-option
              v-for="c in buildingList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.thirdLevel" prop="workshopName" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.thirdLevel+'不能为空'}]">
          <el-input v-model="updateLabData.workshopName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="updateLabData.workshopPhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="updateLabData.workshopAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="updateLabData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateLabFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateLab('updateLabData')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'添加'+GLOBAL.thirdLevel" :visible.sync="newLabFormVisible">
      <el-form :model="newLabData" ref="newLabData">
        <el-form-item :label="'所属'+GLOBAL.firstLevel" prop="city" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.firstLevel+'不能为空'}]">
          <el-select v-model="newLabData.city" :placeholder="'选择'+GLOBAL.firstLevel" @change="getNewFactory(newLabData.city)">
            <el-option
              v-for="c in cityList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'所属'+GLOBAL.secondLevel" prop="factory" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.secondLevel+'不能为空'}]">
          <el-select v-model="newLabData.factory" :placeholder="'选择'+GLOBAL.secondLevel">
            <el-option
              v-for="c in factoryList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="GLOBAL.thirdLevel" prop="workshopName" label-width="120px"
                      :rules="[{required: true, message: GLOBAL.thirdLevel+'不能为空'}]">
          <el-input v-model="newLabData.workshopName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="newLabData.workshopPhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="newLabData.workshopAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="newLabData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newLabFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLab('newLabData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCityOptions,
    getCity,
    getCityNumber,
    getFactoryOptions,
    getFactory,
    getFactoryNumber,
    getWorkshopOptions,
    getWorkshop,
    getWorkshopNumber,
    updateCityApi,
    deleteCity,
    addCity,
    deleteFactory,
    addFactory,
    deleteWorkshop,
    addWorkshop,
    updateFactory,
    updateWorkshop,
    getCityByCityName,
    getFactoryByFactoryName,
    getWorkshopByWorkshopName,
    getCityAffiliateFactory,
    getCityAffiliateDevice,
    getCityAffiliateGateway,
    getFactoryAffiliateWorkshop,
    getFactoryAffiliateDevice,
    getFactoryAffiliateGateway,
    getWorkshopAffiliateGateway, getWorkshopAffiliateDevice,
    listWorkshopName,
  } from '../../api/api';
  import {checkAuth} from "../../common/util";


    export default {
      name: "RegionalConfig",
      data() {
          return{
            //city-search-container
            searchCity: '',
            //city-table-container
            cityTotalPage: 0,
            cityCurPage: 1,
            loading: false,
            cityData: [],
            //city修改el-dialog
            cityList: [],
            updateCityData: {
              cityName: '',
              remark: '',
              createTime: '',
              updateTime: '',
              longitude: '',
              latitude: '',
            },
            updateCityFormVisible: false,
            //city添加el-dialog
            newCityData: {
              cityName: '',
              remark: '',
            },
            newCityFormVisible: false,

            //factory-search-container
            searchBuilding: '',
            //factory-table-container
            factoryTotalPage: 0,
            factoryCurPage: 1,
            factoryCurSortColumn: '',
            factoryCurOrder: '',
            buildingData: [],
            //factory修改el-dialog
            buildingList: [],
            updateBuildingFormVisible: false,
            updateBuildingData: {
              factoryName:'',
              factoryPhoneNumber: '',
              factoryAddress: '',
              city: '',
              remark: '',
            },
            //factory添加el-dialog
            newBuildingFormVisible: false,
            newBuildingData: {
              factoryName:'',
              factoryPhoneNumber: '',
              factoryAddress: '',
              city: '',
              remark: '',
            },

            //workshop-search-container
            searchLab: '',
            //workshop-table-container
            workshopTotalPage: 0,
            workshopCurPage: 1,
            workshopCurSortColumn: '',
            workshopCurOrder: '',
            labData: [],

            changeCityForm: '',
            changeFactoryForm: '',
            changeWorkshopForm: '',
            pageMode: 1,
            
            
            cityCurSortColumn: '',
            cityCurOrder: '',

            
      
            
            
            
            
            
            
            
            factoryList:[],
            labList: [],
            updateLabFormVisible: false,
            newLabFormVisible: false,
            updateLabData: {
              workshopName: '',
              workshopPhoneNumber: '',
              workshopAddress: '',
              factory: '',
              city:'',
              remark:'',
            },
            newLabData: {
              workshopName: '',
              workshopPhoneNumber: '',
              workshopAddress: '',
              city:'',
              factory: '',
              remark:'',
            },
          }
      },
      methods: {
        //city-search-container
        checkRegionAuth(auth) {
          return checkAuth(auth);
        },
        async searchByCity(){
          if(this.searchCity !== "") {
            this.cityData = (await getCityByCityName(this.searchCity)).data.d;
          } else {
            this.cityData = this.getCity();
          }
        },
        //city-table-container
        async openCityUpdateForm(row){  //打开更新表单
            this.updateCityData = JSON.parse(JSON.stringify(row));
            this.updateCityFormVisible = true;
        },
        async deleteCity(row) {
          const affiliateFactory = (await getCityAffiliateFactory(row.id)).data.d;
          const affiliateDevice = (await getCityAffiliateDevice(row.id)).data.d;
          const affiliateGateway = (await getCityAffiliateGateway(row.id)).data.d;
          if (affiliateFactory === 0 && affiliateDevice === 0 && affiliateGateway === 0) {
            try {
              this.$confirm('确认删除？')
                .then(async _ => {
                  const data = await deleteCity(row.id);
                  if (data.data.c === 200) {
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    //再获取一次所有城市信息
                    this.getCity();
                  }
                })
                .catch(_ => {
                });
            } catch (e) {
              console.log(e);
            }
          } else {
            this.$msgbox('该城市有' + affiliateFactory +
              '个下属实验楼, ' + affiliateDevice +
              '个下属设备, ' + affiliateGateway + '个下属网关，无法被删除');
          }
        },
        async getCity() {
          this.loading = true;
          const orderMap = {ascending: 'asc', descending: 'desc'};
          const columnMap = {id: 'id', longitude: 'longitude', latitude: 'latitude', updateTime: 'updateTime', createTime: 'createTime'};
          const searchColumn = this.cityCurSortColumn === '' ? "id" : columnMap[this.cityCurSortColumn];
          const searchOrder = this.cityCurOrder === '' ? "asc" : orderMap[this.cityCurOrder];
          const searchCityName = this.searchCity === '全部' ? "all" : this.searchCity;
          const data = await getCity(this.cityCurPage, searchColumn, searchOrder, this.pageMode);
          this.cityData = data.data.d;
          this.getCityTotalPage('search', searchCityName);
          this.loading = false;
        },
        async cityPageChange() {
          this.getCity();
        },
        async getCityTotalPage(searchType, city='all') {
          if(searchType === 'all') {
            this.cityTotalPage = (await getCityNumber('all')).data.d;
          } else if(searchType === 'search') {
            const c = city === '全部' ? 'all' : city;
            this.cityTotalPage = (await getCityNumber('search', c)).data.d;
          }
        },
        async citySortChange(ob) {
          this.cityCurSortColumn = ob.prop;
          this.cityCurOrder = ob.order;
          this.getCity();
        },
        
        async updateCity(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                console.log(this.updateCityData);
                const data = await updateCityApi(this.updateCityData.id, this.updateCityData);
                this.updateCityFormVisible = false;
                if (data.data.c === 200) {
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                  //再获取一次所有城市信息
                  this.getCity();
                }
              } catch (e) {
                this.updateCityFormVisible = false;
                this.$message.error('更新城市未成功');
              }
            }
          });
        },
        async addCity(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                const data = await addCity(this.newCityData);
                this.newCityFormVisible = false;
                if (data.data.c === 200) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  //再获取一次所有城市信息
                  this.getCity();
                }
              } catch (e) {
                this.newCityFormVisible = false;
                this.$message.error('添加城市未成功');
              }
            }
          });
        },
        async searchByBuilding(){
          if(this.searchBuilding !== "") {
            this.buildingData = (await getFactoryByFactoryName(this.searchBuilding)).data.d;
          } else {
            this.buildingData = this.getFactory();
          }
        },
        async getNewFactory(city){
          
          this.factoryList=(await getFactoryOptions(city)).data.d;
          if(this.factoryList.length!=0){
            this.newLabData.factory=this.factoryList[0].value;
          }
          else{
            this.newLabData.factory=null;
          }
          
        },
        async getUpdateBuildingList(city){
          this.buildingList = (await getFactoryOptions(city)).data.d;
          console.log(this.updateLabData.city);
          if (this.buildingList!= null) {
            this.updateBuildingData.buildingName = this.buildingList[0].value;
            
          } else {
            this.updateBuildingData.buildingName = "";
            this.buildingList = [];
          }
        },
        async getFactory() {
          this.loading = true;
          const orderMap = {ascending: 'asc', descending: 'desc'};
          const columnMap = {id: 'id', updateTime: 'updateTime', createTime: 'createTime'};
          const searchColumn = this.factoryCurSortColumn === '' ? "id" : columnMap[this.factoryCurSortColumn];
          const searchOrder = this.factoryCurOrder === '' ? "asc" : orderMap[this.factoryCurOrder];
          const searchFactoryName = this.searchBuilding === '全部' ? "all" : this.searchBuilding ;
          const data = await getFactory(this.factoryCurPage, searchColumn, searchOrder, this.pageMode);
          this.buildingData = data.data.d;
          this.getFactoryTotalPage('search', searchFactoryName);
          this.loading = false;
        },
        async factoryPageChange() {
          this.getFactory();
        },
        async getFactoryTotalPage(searchType, factory='all') {
          if(searchType === 'all') {
            this.factoryTotalPage = (await getFactoryNumber('all')).data.d;
          } else if(searchType === 'search') {
            const f = factory === '全部' ? 'all' : factory;
            this.factoryTotalPage = (await getFactoryNumber('search', f)).data.d;
          }
        },
        async factorySortChange(ob) {
          this.factoryCurSortColumn = ob.prop;
          this.factoryCurOrder = ob.order;
          this.getFactory();
        },
        async updateBuilding(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                const data = await updateFactory(this.updateBuildingData.id, this.updateBuildingData);
                this.updateBuildingFormVisible = false;
                if (data.data.c === 200) {
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                  //再获取一次所有实验楼信息
                  this.getFactory();
                }
              } catch (e) {
                this.updateBuildingFormVisible = false;
                this.$message.error('更新实验楼未成功');
              }
            }
          });
        },
        async openBuildingUpdateForm(row){//打开更新表单
          this.updateBuildingData = JSON.parse(JSON.stringify(row));
          this.updateBuildingFormVisible = true;
        },
        async addBuilding(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                const data = await addFactory(this.newBuildingData);
                this.newBuildingFormVisible = false;
                if (data.data.c === 200) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  //再获取一次所有实验楼信息
                  this.getFactory();
                }
              } catch (e) {
                this.newBuildingFormVisible = false;
                this.$message.error('添加实验楼未成功');
              }
            }
          });
        },
        async deleteBuilding(row){
          const affiliateWorkshop = (await getFactoryAffiliateWorkshop(row.id)).data.d;
          const affiliateDevice = (await getFactoryAffiliateDevice(row.id)).data.d;
          const affiliateGateway = (await getFactoryAffiliateGateway(row.id)).data.d;
          if (affiliateWorkshop === 0 && affiliateDevice === 0 && affiliateGateway === 0) {
            try {
              this.$confirm('确认删除？')
                .then(async _ => {
                  const data = await deleteFactory(row.id);
                  if (data.data.c === 200) {
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    //再获取一次所有实验楼信息
                    this.getFactory();
                  }
                })
                .catch(_ => {
                });
            } catch (e) {
              console.log(e)
            }
          } else {
            this.$msgbox('该实验楼有' + affiliateWorkshop + '下属实验室, ' +
              affiliateDevice + '个下属设备， ' + affiliateGateway + '个下属网关, 无法被删除');
          }
        },

        async searchByLab(){
          console.log(this.searchLab);
          if(this.searchLab !== "") {
            this.labData = (await getWorkshopByWorkshopName(this.searchLab)).data.d;
          } else {
            this.labData = this.getWorkshop();
          }
        },
        async getUpdateLabList(city){
          this.LabList = (await getWorkshopOptions(city)).data.d;
          if (this.LabList[0] != null) {
            this.updateLabData.workshopName = this.labList[0].value;
          } else {
            this.updateLabData.workshopName = "";
            this.labList = [];
          }
        },

        async getWorkshop() {
          this.loading = true;
          const orderMap = {ascending: 'asc', descending: 'desc'};
          const columnMap = {id: 'id', updateTime: 'updateTime', createTime: 'createTime'};
          const searchColumn = this.workshopCurSortColumn === '' ? "id" : columnMap[this.workshopCurSortColumn];
          const searchOrder = this.workshopCurOrder === '' ? "asc" : orderMap[this.workshopCurOrder];
          const searchWorkshopName = this.searchLab === '全部' ? "all" : this.searchLab;
          const data = await getWorkshop(this.workshopCurPage, searchColumn, searchOrder, this.pageMode);
          this.labData = data.data.d;
          this.getWorkshopTotalPage('search', searchWorkshopName);
          this.loading = false;
        },
        async workshopPageChange() {
          this.getWorkshop();
        },
        async getWorkshopTotalPage(searchType, workshop='all') {
          if(searchType === 'all') {
            this.workshopTotalPage = (await getWorkshopNumber('all')).data.d;
          } else if(searchType === 'search') {
            const w = workshop === '全部' ? 'all' : workshop;
            this.workshopTotalPage = (await getWorkshopNumber('search', w)).data.d;
          }
        },
        async workshopSortChange(ob) {
          this.workshopCurSortColumn = ob.prop;
          this.workshopCurOrder = ob.order;
          this.getWorkshop();
        },

        async updateLab(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                const data = await updateWorkshop(this.updateLabData.id, this.updateLabData);
                this.updateLabFormVisible = false;
                if (data.data.c === 200) {
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                  //再获取一次所有实验室信息
                  this.getWorkshop();
                }
              } catch (e) {
                this.updateLabFormVisible = false;
                this.$message.error('更新实验室未成功');
              }
            }
          });
        },
        async openLabUpdateForm(row){//打开实验室更新表单
          this.updateLabData = JSON.parse(JSON.stringify(row));
          this.updateLabFormVisible = true;
          this.getUpdateBuildingList(this.updateLabData.city);
        },
        async addLab(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              try {
                const data = await addWorkshop(this.newLabData);
                this.newLabFormVisible = false;
                if (data.data.c === 200) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  //再获取一次所有实验室信息
                  this.getWorkshop();
                }
              } catch (e) {
                this.newLabFormVisible = false;
                this.$message.error('添加实验室未成功');
              }
            }
          });
        },
        async deleteLab(row){
          const affiliateDevice = (await getWorkshopAffiliateDevice(row.id)).data.d;
          const affiliateGateway = (await getWorkshopAffiliateGateway(row.id)).data.d;
          if (affiliateDevice === 0 && affiliateGateway === 0) {
            try {
              this.$confirm('确认删除？')
                .then(async _ => {
                  const data = await deleteWorkshop(row.id);
                  if (data.data.c === 200) {
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    //再获取一次所有实验室信息
                    this.getWorkshop();
                  }
                })
                .catch(_ => {
                });
            } catch (e) {
              console.log(e)
            }
          } else {
            this.$msgbox('该实验室有' + affiliateDevice + '个下属设备, ' + affiliateGateway + '个下属网关, 无法被删除');
          }
        },

      },

      async mounted() {
        this.getCityTotalPage('all');
        this.getCity(); //得到“城市管理”的表单数据
        this.getFactoryTotalPage('all');
        this.getFactory();
        this.getWorkshopTotalPage('all');
        this.getWorkshop();
        this.cityList = (await getCityOptions()).data.d;
        this.buildingList = (await getFactory(1, 'id', 'asc', 0)).data.d;
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
