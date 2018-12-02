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
          <img src="../../assets/yonghu.svg"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
</template>

<script>
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
        }
      }
    }
</script>

<style scoped>
.navigation-container{
  border: #545c64;
}
</style>
