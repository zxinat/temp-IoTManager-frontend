<template>
    <el-menu
      class="el-menu-demo navigation-container"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffffff">
      <el-menu-item index="1">IoT管理平台</el-menu-item>
      <el-menu-item index="2" style="float: right">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="color: white">
          <img src="../../assets/img/yonghu.svg"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
</template>

<script>
  import {delCookie} from '../../../utils/package-cookies';
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
          delCookie('simulate');
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
}
</style>
