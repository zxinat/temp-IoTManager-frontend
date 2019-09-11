<template>
  <div>
    <el-row>
      <el-col :span="9">
        <DashBoardMap></DashBoardMap>
      </el-col>
      <el-col :span="15">
        <DashboardLineChart></DashboardLineChart>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <dashboard-alarm-history></dashboard-alarm-history>
      </el-col>
      <el-col :span="15">
        <dashboard-statistics></dashboard-statistics>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DashBoardMap from "../../components/DashBoardMap/index";
  import DashboardLineChart from "../../components/DashboardLineChart/index";
  import DashboardAlarmHistory from "../../components/DashboardAlarmHistory/index";
  import DashboardStatistics from "../../components/DashboardStatistics/index";

  export default {
    name: "DashBoard",
    components: {DashboardStatistics, DashboardAlarmHistory, DashboardLineChart, DashBoardMap}
  }
</script>

<style scoped>

</style>
