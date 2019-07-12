<template>
      <el-menu
        class="el-menu-vertical-demo scroll"
        @open="handleOpen"
        @close="handleClose"
        :background-color=mainColor
        text-color="#fff"
        active-text-color="#ffd04b">
        <router-link to="/dashBoard" class="hide-underline">
          <el-menu-item index="2">
            <!--<i class="el-icon-location"></i>-->
            <span>仪表盘</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="3">
          <template slot="title">
            <!--<i class="el-icon-location"></i>-->
            <span>设备管理</span>
          </template>
          <router-link to="/gatewayEquipment" class="hide-underline"><el-menu-item index="3-1">网关设备</el-menu-item></router-link>
          <router-link to="/physicalDevice" class="hide-underline"><el-menu-item index="3-2">物理设备</el-menu-item></router-link>
          <router-link to="/equipmentData" class="hide-underline"><el-menu-item index="3-3">设备数据</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <!--<i class="el-icon-location"></i>-->
            <span>监控告警</span>
          </template>
          <router-link to="/monitoringConfiguration"  class="hide-underline"><el-menu-item index="4-1">监控配置</el-menu-item></router-link>
          <router-link to="/warningMessage"  class="hide-underline"><el-menu-item index="4-2">告警信息</el-menu-item></router-link>
        </el-submenu>
        <!--<el-submenu index="5">-->
          <!--<template slot="title">-->
            <!--&lt;!&ndash;<i class="el-icon-location"></i>&ndash;&gt;-->
            <!--<span>数据智能</span>-->
          <!--</template>-->
          <!--<router-link to="/modelTraining"  class="hide-underline"><el-menu-item index="5-1">模型训练</el-menu-item></router-link>-->
          <!--<router-link to="/intelligentAnalysis"  class="hide-underline"><el-menu-item index="5-2">智能分析</el-menu-item></router-link>-->
        <!--</el-submenu>-->
        <el-submenu index="6">
          <template slot="title">
            <!--<i class="el-icon-location"></i>-->
            <span>报表中心</span>
          </template>
          <!--<router-link to="/reportCenter"  class="hide-underline"><el-menu-item index="6-1">概览</el-menu-item></router-link>-->
          <router-link to="/RegionalDimension"  class="hide-underline"><el-menu-item index="6-2">按地域维度</el-menu-item></router-link>
          <router-link to="/TimeDimension"  class="hide-underline"><el-menu-item index="6-3">按时间维度</el-menu-item></router-link>
          <router-link to="/DeviceTypeDimension"  class="hide-underline"><el-menu-item index="6-4">按设备类型维度</el-menu-item></router-link>
          <router-link to="/TagDimension"  class="hide-underline"><el-menu-item index="6-5">按标签维度</el-menu-item></router-link>
          <!--<router-link to="/ReportStaticByCategory"  class="hide-underline"><el-menu-item index="6-5">按资源类别费用统计</el-menu-item></router-link>-->
          <!--<router-link to="/ReportStaticBySubscribe"  class="hide-underline"><el-menu-item index="6-6">按订阅费用统计</el-menu-item></router-link>-->
          <!--<router-link to="/ReportOfMonthlyExpense"  class="hide-underline"><el-menu-item index="6-7">月度费用报告</el-menu-item></router-link>-->
        </el-submenu>
        <router-link to="/roleManagement"  class="hide-underline">
          <el-menu-item index="7">
            <!--<i class="el-icon-location"></i>-->
            <span>用户管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/districtManagement"  class="hide-underline">
          <el-menu-item index="8">
            <!--<i class="el-icon-location"></i>-->
            <span>配置管理</span>
          </el-menu-item>
        </router-link>
      </el-menu>
</template>

<script>
  import {mainColor} from '../../common/globalvariaties'

  export default {
      name: "Sidebar",
      data(){
        return{
          mainColor:mainColor?mainColor:'#409EFF'
        }
      },
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
  .scroll{
    overflow: auto;
  }
  .el-menu-vertical-demo{
    /*重载一些样式*/
    .el-menu-item{
      min-width: auto;
    }
    .hide-underline{
      text-decoration: none;
    }

  }
</style>
