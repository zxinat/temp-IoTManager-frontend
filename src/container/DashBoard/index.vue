<template>
    <div>
      <el-row>
        <el-col :span="12">
          <DashBoardMap></DashBoardMap>
        </el-col>
        <el-col :span="12">
          <DashboardLineChart></DashboardLineChart>
        </el-col>
      </el-row>

    </div>
</template>

<script>
    import DashBoardMap from "../../components/DashBoardMap/index";
    import DashboardLineChart from "../../components/DashboardLineChart/index";
    export default {
        name: "DashBoard",
      components: {DashboardLineChart, DashBoardMap}
    }
</script>

<style scoped>

</style>
