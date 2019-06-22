<template>
  <div class="alarm-record-container">
    <el-table
      :data="tableData"
      stripe
      style="width: 540px;margin: auto;transform: translateX(-50px)">
      <el-table-column
        prop="date"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="data"
        label="数据"
        width="180">
      </el-table-column>
      <el-table-column
        prop="alarm"
        label="报警(0正常1报警)"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "AlarmRecord",
    data() {
      return {
        tableData: [{
          date: '2016-05-02 20:40',
          data: '25',
          alarm: '0'
        }, {
          date: '2016-06-02 20:40',
          data: '25',
          alarm: '1'
        }, {
          date: '2016-07-02 20:40',
          data: '25',
          alarm: '1'
        }, {
          date: '2016-08-02 20:40',
          data: '25',
          alarm: '0'
        }]
      }
    }
  }
</script>

<style scoped>
  .alarm-record-container {
    margin: 10px;
  }
</style>
