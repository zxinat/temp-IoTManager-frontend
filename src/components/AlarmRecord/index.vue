<template>
  <div class="alarm-record-container">
    <h3>设备告警信息（只显示最新10条）</h3>
    <el-table
      :data="curDeviceData"
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
      <el-table-column
        prop="handlingStatus"
        label="处理状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getAlarmInfoInAlarmRecord} from "../../api/api";

  export default {
    name: "AlarmRecord",
    data() {
      return {
        curDeviceData: []
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
    },
    watch: {
      async deviceData(val) {
        if (typeof this.deviceData === 'string') {
          this.curDeviceData = (await getAlarmInfoInAlarmRecord(val)).data.d;
        }
      }
    },
    async mounted() {
      if (typeof this.deviceData === 'string') {
        this.curDeviceData = (await getAlarmInfoInAlarmRecord(this.deviceData)).data.d;
      }
    }
  }
</script>

<style scoped>
  .alarm-record-container {
    margin: 10px;
  }
</style>
