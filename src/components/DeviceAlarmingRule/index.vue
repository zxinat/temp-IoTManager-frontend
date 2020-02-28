<template>
  <div class="table-container">
    <el-table
      :data="curDeviceData"
      border>
      <el-table-column
        prop="name"
        label="规则名称">
      </el-table-column>
      <el-table-column
        prop="description"
        label="规则描述">
      </el-table-column>
      <el-table-column
        prop="conditionString"
        label="规则">
      </el-table-column>
      <el-table-column
        prop="severity"
        label="告警等级">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getRuleInDeviceAlarmingRule, getRulesByDeviceId} from "../../api/api";

    export default {
      name: "DeviceAlarmingRule",
      data(){
        return {
          curDeviceData: [],
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
            this.curDeviceData = (await getRuleInDeviceAlarmingRule(val)).data.d;
          }
        }
      },
      async mounted() {
        if (typeof this.deviceData === 'string') {
          this.curDeviceData = (await getRuleInDeviceAlarmingRule(this.deviceData)).data.d;
        }
      }
    }
</script>

<style scoped>

</style>
