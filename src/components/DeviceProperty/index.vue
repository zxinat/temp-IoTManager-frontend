<template>
  <div class="container">
    <h3>设备数据信息（只显示最新10条）</h3>
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
        label="设备属性">
      </el-table-column>
      <el-table-column
        prop="indexValue"
        label="属性数值">
      </el-table-column>
      <el-table-column
        prop="indexUnit"
        label="属性单位">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getDeviceDataInDeviceProperty, updateDeviceApi} from '../../api/api';

  export default {
    name: "DeviceProperty",
    data() {
      return {
        curDeviceData: []
      }
    },
    computed: {
      deviceData: {
        // getter
        get: function () {
          return this.$store.state.device.currentDeviceData;
        },
        // setter
        set: function (newValue) {
          console.log('newvalue', newValue)
        }
      }
    },
    watch: {
      async deviceData(val) {
        if (typeof this.deviceData === 'string') {
          this.curDeviceData = (await getDeviceDataInDeviceProperty(val)).data.d;
        }
      }
    },
    async mounted() {
      if (typeof this.deviceData === 'string') {
        this.curDeviceData = (await getDeviceDataInDeviceProperty(this.deviceData)).data.d;
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 10px;
  }
</style>
