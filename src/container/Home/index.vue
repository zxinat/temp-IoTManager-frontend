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
    mounted(){//简单鉴权
      // // 查看是否登陆
      //   if (this.$store.state.userInfo.isLogin === false) {
      //     // 没登录的做处理
      //     alert('请先登录');
      //     this.$router.push('/login');
      //   }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $nav-height: 9%;
  .home-container{
    height: 100%;
    .nav-screen{
      height: $nav-height;
    }
    .sidebar-screen{
      height: 100%-$nav-height;
    }
  }
  .full-screen{
    height: 100%;
  }
</style>
