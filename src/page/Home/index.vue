<template>
  <div class="home-container">
    <Navigation class="nav-screen"></Navigation>
    <div class="tac sidebar-screen">
      <div class="full-screen">
        <Sidebar class="full-screen adaptive">
        </Sidebar>
      </div>
      <div class="router-view">
        <router-view></router-view>
      </div>
    </div>
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
  /*sass加变量*/
  $nav-height: 60px;
  $sidebar-width:185px;
  .home-container{
    height: 100%;
    .nav-screen{
      position: fixed;
      width: 100%;
      height: $nav-height;
      z-index: 99;
    }
    .sidebar-screen{
      height: calc(100% - #{$nav-height});
      .adaptive{
        top:$nav-height;
        position: fixed;
        width: $sidebar-width;
        min-width: 130px;
      }
    }
  }
  .full-screen{
    height:  calc(100% -  #{$nav-height});
  }
  .router-view{
    position: absolute;
    top:$nav-height;
    right: 0;
    width: calc(100% - #{$sidebar-width});;
  }
</style>
