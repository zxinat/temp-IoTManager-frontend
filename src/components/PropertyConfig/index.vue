<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" class="header">
        <el-form-item>
          <h2>设备属性</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchProperty" placeholder="请输入设备属性"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="properties"
        border
        style="width: 60%;">
        <el-table-column
          prop="fieldId"
          label="属性ID">
        </el-table-column>
        <el-table-column
          prop="fieldName"
          label="属性名称">
        </el-table-column>
        <el-table-column
          prop="device"
          label="所属设备">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getFields} from "../../api/api";

  export default {
    name: "PropertyConfig",
    data() {
      return {
        properties: [],
        searchProperty: '',
      }
    },
    methods: {
      async getAllProperties() {
        this.properties = (await getFields()).data.d;
        console.log(this.properties);
      }
    },
    async mounted() {
      this.getAllProperties();
    }
  }
</script>

<style scoped>
  .search-container, .table-container, .deleteButton-container {
    margin: 1% 1%;
    text-align: left;
  }

  h2{
    display: inline;
  }
</style>
