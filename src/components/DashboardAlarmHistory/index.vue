<template>
  <div class="time-dimension-container">
    <el-table
      :data="tableData"
      border>
      <el-table-column
        prop="timestamp"
        label="告警时间">
      </el-table-column>
      <el-table-column
        prop="deviceId"
        label="设备编号">
      </el-table-column>
      <el-table-column
        prop="indexName"
        label="数据名称">
      </el-table-column>
      <el-table-column
        prop="indexValue"
        label="告警数值">
      </el-table-column>
      <el-table-column
        prop="thresholdValue"
        label="告警阈值">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="status"-->
        <!--label="处理状态"-->
        <!--width="120">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="city"-->
        <!--label="城市"-->
        <!--width="120">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="factory"-->
        <!--label="工厂"-->
        <!--width="120">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="department"-->
        <!--:label="GLOBAL.thirdLevel"-->
        <!--width="120">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--fixed="right"-->
        <!--label="操作"-->
        <!--width="100">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <!--<el-button type="text" size="small">编辑</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
  import {getDashboardAlarmInfo} from "../../api/api";

  export default {
    name: "DashboardAlarmHistory",
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    async mounted() {
      this.tableData = (await getDashboardAlarmInfo()).data.d;
    },

    data() {
      return {
        tableData: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variaties";

  .time-dimension-container {
    height: $dashboard-block-height;
    margin: 10px;
  }
</style>
