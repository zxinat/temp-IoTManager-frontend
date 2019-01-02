<template>
  <div>
    <el-row>
      <el-col :span="3">
        <MonitoringTree></MonitoringTree>
      </el-col>
      <el-col :span="21">
        <monitoring-config></monitoring-config>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MonitoringTree from "../../components/MonitoringTree/index";
  import MonitoringConfig from "../../components/MonitoringConfig/index";

  export default {
    name: "MonitoringConfiguration",
    components: {MonitoringConfig, MonitoringTree},
  }
</script>

<style scoped>

</style>
