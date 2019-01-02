<template>
  <div>
    <el-row>
      <el-col :span="3">
        <MonitoringTree></MonitoringTree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MonitoringTree from "../../components/MonitoringTree/index";

  export default {
    name: "MonitoringConfiguration",
    components: {MonitoringTree},
  }
</script>

<style scoped>

</style>
