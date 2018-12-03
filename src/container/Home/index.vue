<template>
  <div class="home-container">
    <Navigation class="nav-screen"></Navigation>
      <el-row class="tac sidebar-screen">
        <el-col :span="3" class="full-screen">
          <Sidebar class="full-screen">
          </Sidebar>
        </el-col>
        <el-col :span="20">
          <h1>具体内容</h1>
        </el-col>
      </el-row>
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
  .home-container{
    height: 100%;
  }
  .nav-screen{
    height: 10%;
  }
  .sidebar-screen{
    height: 90%;
  }
  .full-screen{
    height: 100%;
  }
</style>
