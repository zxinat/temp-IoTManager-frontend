<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" class="header">
        <el-form-item>
          <h2>城市管理</h2>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-input v-model="searchCity" placeholder="请输入城市名"></el-input>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-button type="primary" @click="searchByCity">搜索</el-button>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_CREATE'])">
          <el-button type="primary" @click="newCityFormVisible = true">添加城市</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container" v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
      <el-pagination background layout="prev, pager, next"
                     :total="cityTotalPage"
                     :current-page.sync="cityCurPage"
                     :page-size="12"
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
          label="城市">
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

    <el-dialog title="修改城市" :visible.sync="updateCityFormVisible">
      <el-form :model="updateCityData">
        <el-form-item label="城市" label-width="120px">
          <el-input v-model="updateCityData.cityName" autocomplete="off"></el-input>
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
      <el-form :inline="true" class="header">
        <el-form-item>
          <h2>实验楼</h2>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-input v-model="searchBuilding" placeholder="请输入实验楼名"></el-input>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-button type="primary" @click="searchByBuilding">搜索</el-button>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_CREATE'])">
          <el-button type="primary" @click="newBuildingFormVisible = true">添加实验楼</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container" v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
      <el-pagination background layout="prev, pager, next"
                     :total="factoryTotalPage"
                     :current-page.sync="factoryCurPage"
                     :page-size="12"
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
          label="实验楼">
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
          label="所属城市">
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

    <el-dialog title="修改实验楼" :visible.sync="updateBuildingFormVisible">
      <el-form :model="updateBuildingData">
        <el-form-item label="所属城市" label-width="120px">
          <el-select v-model="updateBuildingData.city" placeholder="选择城市">
            <el-option
              v-for="c in cityList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验楼" label-width="120px">
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
        <el-button type="primary" @click="updateBuilding">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加实验楼" :visible.sync="newBuildingFormVisible">
      <el-form :model="newBuildingData">
        <el-form-item label="所属城市" label-width="120px">
          <el-select v-model="newBuildingData.city" placeholder="选择城市">
            <el-option
              v-for="c in cityList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验楼" label-width="120px">
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
        <el-button type="primary" @click="addBuilding">确 定</el-button>
      </div>
    </el-dialog>


    <div class="search-container">
      <el-form :inline="true" class="header">
        <el-form-item>
          <h2>实验室</h2>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-input  v-model="searchLab" placeholder="请输入实验室名"></el-input>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
          <el-button type="primary" @click="searchByLab">搜索</el-button>
        </el-form-item>
        <el-form-item v-if="checkRegionAuth(['CONFIGURE_REGION_CREATE'])">
          <el-button type="primary" @click="newLabFormVisible = true">添加实验室</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container" v-if="checkRegionAuth(['CONFIGURE_REGION_RETRIEVE'])">
      <el-pagination background layout="prev, pager, next"
                     :total="workshopTotalPage"
                     :current-page.sync="workshopCurPage"
                     :page-size="12"
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
          label="实验室">
        </el-table-column>
        <el-table-column
          prop="workshopPhoneNumber"
          label="电话">
        </el-table-column><el-table-column
          prop="workshopAddress"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="factory"
          label="所属实验楼">
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

    <el-dialog title="修改实验室" :visible.sync="updateLabFormVisible">
      <el-form :model="updateLabData">
        <el-form-item label="所属实验楼" label-width="120px">
          <el-select v-model="updateLabData.factory" placeholder="选择实验楼">
            <el-option
              v-for="c in buildingList"
              :key="c.value"
              :label="c.label"
              :value="c.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室" label-width="120px">
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
        <el-button type="primary" @click="updateLab">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加实验室" :visible.sync="newLabFormVisible">
      <el-form :model="newLabData">
        <el-form-item label="所属实验楼" label-width="120px">
          <el-select v-model="newLabData.factory" placeholder="选择实验楼">
            <el-option
              v-for="c in buildingList"
              :key="c.id"
              :label="c.factoryName"
              :value="c.factoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室" label-width="120px">
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
        <el-button type="primary" @click="addLab">确 定</el-button>
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
  } from '../../api/api';
  import {checkAuth} from "../../common/util";


    export default {
      name: "RegionalConfig",
      data() {
          return{
            loading: false,
            cityTotalPage: 0,
            cityCurPage: 1,
            cityCurSortColumn: '',
            cityCurOrder: '',
            searchCity: '',
            cityData: [],
            cityList: [],
            updateCityFormVisible: false,
            newCityFormVisible: false,
            updateCityData: {
              cityName: '',
              remark: '',
              createTime: '',
              updateTime: '',
              longitude: '',
              latitude: '',
            },
            newCityData: {
              cityName: '',
              remark: '',
            },
            factoryTotalPage: 0,
            factoryCurPage: 1,
            factoryCurSortColumn: '',
            factoryCurOrder: '',
            searchBuilding: '',
            buildingData: [],
            buildingList: [],
            updateBuildingFormVisible: false,
            newBuildingFormVisible: false,
            updateBuildingData: {
              factoryName:'',
              factoryPhoneNumber: '',
              factoryAddress: '',
              city: '',
              remark: '',
            },
            newBuildingData: {
              factoryName:'',
              factoryPhoneNumber: '',
              factoryAddress: '',
              city: '',
              remark: '',
            },
            workshopTotalPage: 0,
            workshopCurPage: 1,
            workshopCurSortColumn: '',
            workshopCurOrder: '',
            searchLab: '',
            labData: [],
            labList: [],
            updateLabFormVisible: false,
            newLabFormVisible: false,
            updateLabData: {
              workshopName: '',
              workshopPhoneNumber: '',
              workshopAddress: '',
              factory: '',
              remark:'',
            },
            newLabData: {
              workshopName: '',
              workshopPhoneNumber: '',
              workshopAddress: '',
              factory: '',
              remark:'',
            },
          }
      },
      methods: {
        checkRegionAuth(auth) {
          return checkAuth(auth);
        },
        async searchByCity(){
          if(this.searchCity !== "") {
            this.cityData = (await getCityByCityName(this.searchCity)).data.d;
          } else {
            this.cityData = (await getCity()).data.d;
          }
        },
        async openCityUpdateForm(row){  //打开更新表单
            this.updateCityData = JSON.parse(JSON.stringify(row));
            this.updateCityFormVisible = true;
        },
        async getCity() {
          this.loading = true;
          const orderMap = {ascending: 'asc', descending: 'desc'};
          const columnMap = {id: 'id', longitude: 'longitude', latitude: 'latitude', updateTime: 'updateTime', createTime: 'createTime'};
          const searchColumn = this.cityCurSortColumn === '' ? "id" : columnMap[this.cityCurSortColumn];
          const searchOrder = this.cityCurOrder === '' ? "asc" : orderMap[this.cityCurOrder];
          const searchCityName = this.searchCity === '全部' ? "all" : this.searchCity;
          const data = await getCity('search', this.cityCurPage, searchColumn, searchOrder, searchCityName);
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
        async updateCity(){
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
        },
        async addCity() {
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
        },
        async searchByBuilding(){
          if(this.searchBuilding !== "") {
            this.buildingData = (await getFactoryByFactoryName(this.searchBuilding)).data.d;
          } else {
            this.buildingData = (await getFactory()).data.d;
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
        async getFactory() {
          this.loading = true;
          const orderMap = {ascending: 'asc', descending: 'desc'};
          const columnMap = {id: 'id', updateTime: 'updateTime', createTime: 'createTime'};
          const searchColumn = this.factoryCurSortColumn === '' ? "id" : columnMap[this.factoryCurSortColumn];
          const searchOrder = this.factoryCurOrder === '' ? "asc" : orderMap[this.factoryCurOrder];
          const searchFactoryName = this.searchBuilding === '全部' ? "all" : this.searchBuilding ;
          const data = await getFactory('search', this.factoryCurPage, searchColumn, searchOrder, searchFactoryName);
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
        async updateBuilding(){
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

        },
        async openBuildingUpdateForm(row){//打开更新表单
          this.updateBuildingData = JSON.parse(JSON.stringify(row));
          this.updateBuildingFormVisible = true;
        },
        async addBuilding(){
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
            this.labData = (await getWorkshop()).data.d;
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

        async getWorkshop() {
          this.loading = true;
          const orderMap = {ascending: 'asc', descending: 'desc'};
          const columnMap = {id: 'id', updateTime: 'updateTime', createTime: 'createTime'};
          const searchColumn = this.workshopCurSortColumn === '' ? "id" : columnMap[this.workshopCurSortColumn];
          const searchOrder = this.workshopCurOrder === '' ? "asc" : orderMap[this.workshopCurOrder];
          const searchWorkshopName = this.searchLab === '全部' ? "all" : this.searchLab;
          const data = await getWorkshop('search', this.workshopCurPage, searchColumn, searchOrder, searchWorkshopName);
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

        async updateLab(){
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

        },
        async openLabUpdateForm(row){//打开更新表单
          this.updateLabData = JSON.parse(JSON.stringify(row));
          this.updateLabFormVisible = true;
        },
        async addLab(){
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
        this.buildingList = (await getFactory()).data.d;
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
