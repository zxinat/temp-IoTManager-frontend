<template>
  <div class="home-container">
    <Navigation class="nav-screen"></Navigation>
    <el-row class="tac sidebar-screen">
      <el-col :span="3" class="full-screen">
        <Sidebar class="full-screen adaptive">
        </Sidebar>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
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
  $nav-height: 60px;
  .home-container{
    height: 100%;
    .nav-screen{
      height: $nav-height;
    }
    .sidebar-screen{
      /*sass加变量*/
      height: calc(100% - #{$nav-height});
      .adaptive{
        min-width: 130px;
      }
    }
  }
  .full-screen{
    height: 100%;
  }
</style>
