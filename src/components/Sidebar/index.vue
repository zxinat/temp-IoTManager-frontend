<template>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <router-link to="/personalInformation"  class="hide-underline">
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span>个人信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="/dashBoard" class="hide-underline">
          <el-menu-item index="2">
            <i class="el-icon-location"></i>
            <span>仪表盘</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>设备管理</span>
          </template>
          <router-link to="/gatewayEquipment" class="hide-underline"><el-menu-item index="3-1">网关设备</el-menu-item></router-link>
          <router-link to="/physicalDevice" class="hide-underline"><el-menu-item index="3-2">物理设备</el-menu-item></router-link>
          <router-link to="/equipmentData" class="hide-underline"><el-menu-item index="3-3">设备数据</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>监控告警</span>
          </template>
          <router-link to="/monitoringConfiguration"  class="hide-underline"><el-menu-item index="4-1">监控配置</el-menu-item></router-link>
          <router-link to="/warningMessage"  class="hide-underline"><el-menu-item index="4-2">告警信息</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据智能</span>
          </template>
          <router-link to="/modelTraining"  class="hide-underline"><el-menu-item index="5-1">模型训练</el-menu-item></router-link>
          <router-link to="/intelligentAnalysis"  class="hide-underline"><el-menu-item index="5-2">智能分析</el-menu-item></router-link>
        </el-submenu>
        <router-link to="/reportCenter"  class="hide-underline">
          <el-menu-item index="6">
              <i class="el-icon-location"></i>
              <span>报表中心</span>
          </el-menu-item>
        </router-link>
      </el-menu>
</template>

<script>
    export default {
      name: "Sidebar",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu-vertical-demo{
    /*重载一些样式*/
    .el-menu-item{
      min-width: auto;
      text-align: left;
    }
    .el-submenu{
      text-align: left;
    }

    .hide-underline{
      text-decoration: none;
    }

  }
</style>
