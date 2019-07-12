<template>
  <div class="time-dimension-container">
    <el-table
      :data="tableData"
      border>
      <el-table-column
        prop="date"
        label="告警时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="deviceName"
        label="设备名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dataName"
        label="数据名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="content"
        label="告警内容"
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        label="告警类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="处理状态"
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
        prop="department"
        :label="GLOBAL.thirdLevel"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "DashboardAlarmHistory",
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-03 16:11:11',
          deviceName: '设备1',
          dataName: '告警1',
          content: '端口异常',
          type: ' 异常',
          status: '在线',
          city:'上海',
          factory:'工厂1',
          department:'车间1'
        },
          {
            date: '2016-05-03 16:11:11',
            deviceName: '设备1',
            dataName: '告警1',
            content: '端口异常',
            type: ' 异常',
            status: '在线',
            city:'上海',
            factory:'工厂1',
            department:'车间1'
          },{
            date: '2016-05-03 16:11:11',
            deviceName: '设备1',
            dataName: '告警1',
            content: '端口异常',
            type: ' 异常',
            status: '在线',
            city:'上海',
            factory:'工厂1',
            department:'车间1'
          },{
            date: '2016-05-03 16:11:11',
            deviceName: '设备1',
            dataName: '告警1',
            content: '端口异常',
            type: ' 异常',
            status: '在线',
            city:'上海',
            factory:'工厂1',
            department:'车间1'
          },{
            date: '2016-05-03 16:11:11',
            deviceName: '设备1',
            dataName: '告警1',
            content: '端口异常',
            type: ' 异常',
            status: '在线',
            city:'上海',
            factory:'工厂1',
            department:'车间1'
          }]
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
