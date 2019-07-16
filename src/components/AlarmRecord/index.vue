<template>
  <div class="alarm-record-container">
    <h3>设备告警信息（只显示最新10条）</h3>
    <el-table
      :data="deviceData.alarmInfo"
      stripe
      style="width: 80%; margin: 5px">
      <el-table-column
        prop="deviceId"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="indexName"
        label="告警属性">
      </el-table-column>
      <el-table-column
        prop="indexValue"
        label="告警数值">
      </el-table-column>
      <el-table-column
        prop="thresholdValue"
        label="告警阈值">
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
    },
    computed:{
      deviceData:{
        // getter
        get: function () {
          return this.$store.state.device.currentDeviceData;
        },
        // setter
        set: function (newValue) {
          console.log('newvalue',newValue)
        }
      }
    }
  }
</script>

<style scoped>
  .alarm-record-container {
    margin: 10px;
  }
</style>
