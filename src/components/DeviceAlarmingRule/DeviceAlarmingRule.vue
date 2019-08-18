<template>
  <div class="table-container">
    <el-table
      :data="deviceData.rules"
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
    import {getRulesByDeviceId} from "../../api/api";

    export default {
      name: "DeviceAlarmingRule",
      data(){
        return {
          rulesData: []
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

</style>
