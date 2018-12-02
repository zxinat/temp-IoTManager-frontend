<template>
  <div class="home-container">
    <Navigation></Navigation>
    <div class="content-container">
      <el-row class="tac">
        <el-col :span="4">
          <Sidebar>
          </Sidebar>
        </el-col>
        <el-col :span="20">
          <h1>具体内容</h1>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import Navigation from "../../components/Navigation/index";
  import Sidebar from "../../components/Sidebar/index";
  export default {
    name: "Home",
    components: {Sidebar, Navigation},
  }
</script>

<style scoped>
</style>
