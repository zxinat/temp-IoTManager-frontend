<template>
    <el-menu
      class="el-menu-demo navigation-container"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffffff">
      <el-menu-item index="1">南洋IoT管理平台</el-menu-item>
      <el-menu-item index="2" style="float: right">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="color: white">
          <img src="../../assets/img/yonghu.svg"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/personalInformation" style="text-decoration: none"><el-dropdown-item>用户信息</el-dropdown-item></router-link>
            <!--<el-dropdown-item>设置</el-dropdown-item>-->
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
</template>

<script>
  import {delCookie,getCookie} from '../../../utils/package-cookies';
  import {signOut} from '../../api/api';
    export default {
        name: "Navigation",
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          let sessionID=getCookie('userSessionID');
          signOut(sessionID);
          delCookie('userSessionID');
          this.$router.push('/login');
        }
      },
      mounted(){

      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../assets/scss/variaties";
.navigation-container{
  border: $main-color;
  .el-menu-item, .el-submenu__title {
    height: 100%;
  }
  .hide-underline{
    text-decoration: none;
  }
}
</style>
