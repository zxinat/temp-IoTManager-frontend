<template>
  <div>
  <div class="search-container">
    <el-form :inline="true" :model="searchDeviceType" class="header">
      <el-form-item>
        <h2>设备类型</h2>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchDeviceType" placeholder="请输入设备类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchByDeviceType">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="newFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-container">
    <el-table
      :data="tableData"
      border
      style="width: 60%">
      <el-table-column
        prop="deviceType"
        label="设备类型">
      </el-table-column>
      <el-table-column
        prop="warningTime"
        label="超时告警时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="openUpdateForm(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="delete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
    export default {
      name: "DeviceTypeConfig",
      data() {
        return {
          tableData: [{
            "deviceType": "测试1",
            "warningTime": "30min",
          }],
          newFormVisible: false,
          updateFormVisible: false,
          searchDeviceType: '',

        }
      },

      methods: {
        delete(row){

        },
        openUpdateForm(row){

        },
        searchByDeviceType(){

        },


      },
      mounted() {

      },
    }
</script>

<style scoped>
  .search-container, .table-container {
    margin: 1% 1%;
    text-align: left;
  }

  h2{
    display: inline;
  }

</style>
