<template>
  <el-menu
    class="el-menu-vertical-demo scroll"
    @open="handleOpen"
    @close="handleClose"
    :background-color=mainColor
    text-color="#fff"
    active-text-color="#ffd04b">
    <router-link to="/dashBoard" class="hide-underline" v-if="checkSidebarAuth('dashboard')">
      <el-menu-item index="2">
        <!--<i class="el-icon-location"></i>-->
        <span>
          <img src="../../assets/img/dashboard.png" class="image" />
          仪表盘
        </span>
      </el-menu-item>
    </router-link>
    <el-submenu index="3" v-if="checkSidebarAuth('device_manage')">
      <template slot="title">
        <!--<i class="el-icon-location"></i>-->
        <span>
          <img src="../../assets/img/equipmentManager.png" class="image" />
          设备管理
        </span>
      </template>
      <router-link to="/gatewayEquipment" class="hide-underline" v-if="checkSidebarAuth('gateway')">
        <el-menu-item index="3-1">网关设备</el-menu-item>
      </router-link>
      <router-link to="/physicalDevice" class="hide-underline" v-if="checkSidebarAuth('device')">
        <el-menu-item index="3-2">物理设备</el-menu-item>
      </router-link>
      <router-link to="/equipmentData" class="hide-underline" v-if="checkSidebarAuth('deviceData')">
        <el-menu-item index="3-3">设备数据</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="4" v-if="checkSidebarAuth('monitor_alarm')">
    <template slot="title">
      <!--<i class="el-icon-location"></i>-->
      <span>
          <img src="../../assets/img/alert.png" class="image" />
          监控告警
        </span>
    </template>
    <router-link to="/monitoringConfiguration" class="hide-underline" v-if="checkSidebarAuth('monitor')">
      <el-menu-item index="4-1">监控配置</el-menu-item>
    </router-link>
    <router-link to="/warningRule" class="hide-underline" v-if="checkSidebarAuth('rule')">
      <el-menu-item index="4-2">告警规则</el-menu-item>
    </router-link>
    <router-link to="/warningMessage" class="hide-underline" v-if="checkSidebarAuth('alarminfo')">
      <el-menu-item index="4-3">告警信息</el-menu-item>
    </router-link>
  </el-submenu>
    <!--<el-submenu index="5">-->
    <!--<template slot="title">-->
    <!--&lt;!&ndash;<i class="el-icon-location"></i>&ndash;&gt;-->
    <!--<span>数据智能</span>-->
    <!--</template>-->
    <!--<router-link to="/modelTraining"  class="hide-underline"><el-menu-item index="5-1">模型训练</el-menu-item></router-link>-->
    <!--<router-link to="/intelligentAnalysis"  class="hide-underline"><el-menu-item index="5-2">智能分析</el-menu-item></router-link>-->
    <!--</el-submenu>-->
    <el-submenu index="6" v-if="checkSidebarAuth('report')">
      <template slot="title">
        <img src="../../assets/img/chart.png" class="image" />
        <span>报表中心</span>
      </template>
      <!--<router-link to="/reportCenter"  class="hide-underline"><el-menu-item index="6-1">概览</el-menu-item></router-link>-->
      <router-link to="/RegionalDimension" class="hide-underline" v-if="checkSidebarAuth('region_dimension')">
        <el-menu-item index="6-2">按地域维度</el-menu-item>
      </router-link>
      <router-link to="/TimeDimension" class="hide-underline" v-if="checkSidebarAuth('time_dimension')">
        <el-menu-item index="6-3">按时间维度</el-menu-item>
      </router-link>
      <router-link to="/DeviceTypeDimension" class="hide-underline" v-if="checkSidebarAuth('devicetype_dimension')">
        <el-menu-item index="6-4">按设备类型维度</el-menu-item>
      </router-link>
      <router-link to="/TagDimension" class="hide-underline" v-if="checkSidebarAuth('tag_dimension')">
        <el-menu-item index="6-5">按标签维度</el-menu-item>
      </router-link>
      <!--<router-link to="/ReportStaticByCategory"  class="hide-underline"><el-menu-item index="6-5">按资源类别费用统计</el-menu-item></router-link>-->
      <!--<router-link to="/ReportStaticBySubscribe"  class="hide-underline"><el-menu-item index="6-6">按订阅费用统计</el-menu-item></router-link>-->
      <!--<router-link to="/ReportOfMonthlyExpense"  class="hide-underline"><el-menu-item index="6-7">月度费用报告</el-menu-item></router-link>-->
    </el-submenu>
    <router-link to="/roleManagement" class="hide-underline" v-if="checkSidebarAuth('user')">
      <el-menu-item index="7">
        <!--<i class="el-icon-location"></i>-->
        <span>
          <img src="../../assets/img/users.png" class="image" />
          用户管理
        </span>
      </el-menu-item>
    </router-link>
    <el-submenu index="8" v-if="checkSidebarAuth('config')">
      <template slot="title">
        <span>
          <img src="../../assets/img/setting.png" class="image" />
          配置管理
        </span>
      </template>
      <router-link to="/regionalConfig" class="hide-underline" v-if="checkSidebarAuth('config_region')">
        <el-menu-item index="8-1">地域配置</el-menu-item>
      </router-link>
      <router-link to="/systemConfig" class="hide-underline" v-if="checkSidebarAuth('config_sys')">
        <el-menu-item index="8-2">系统配置</el-menu-item>
      </router-link>
    </el-submenu>
<!--    <router-link to="/districtManagement" class="hide-underline">-->
<!--      <el-menu-item index="8">-->
<!--        <i class="el-icon-location"></i>-->
<!--        <span>-->
<!--          <img src="../../assets/img/setting.png" class="image" />-->
<!--          配置管理-->
<!--        </span>-->
<!--      </el-menu-item>-->
<!--    </router-link>-->
  </el-menu>
</template>

<script>
  import {mainColor} from '../../common/globalvariaties'
  import {checkAuth} from "../../common/util";

  export default {
    name: "Sidebar",
    data() {
      return {
        mainColor: mainColor ? mainColor : '#409EFF'
      }
    },
    methods: {
      checkSidebarAuth(bar) {
        let barDict = {
          'dashboard': ['DASHBOARD_RETRIEVE'],
          'gateway': [
            'GATEWAY_RETRIEVE',
            'GATEWAY_EXPORT_EXCEL',
            'GATEWAY_IMPORT_EXCEL',
            'GATEWAY_CREATE',
            'GATEWAY_UPDATE',
            'GATEWAY_DELETE'
          ],
          'device': [
            'DEVICE_RETRIEVE',
            'DEVICE_EXPORT_EXCEL',
            'DEVICE_IMPORT_EXCEL',
            'DEVICE_CREATE',
            'DEVICE_UPDATE',
            'DEVICE_DELETE'
          ],
          'deviceData': [
            'DEVICEDATA_RETRIEVE',
            'DEVICEDATA_DELETE',
            'DEVICEDATA_UPDATE',
            'DEVICEDATA_EXPORT_EXCEL'
          ],
          'time_dimension': ['REPORT_TIME_RETRIEVE'],
          'region_dimension': ['REPORT_REGION_RETRIEVE'],
          'devicetype_dimension': ['REPORT_DEVICETYPE_RETRIEVE'],
          'tag_dimension': ['REPORT_TAG_RETRIEVE'],
          'monitor': [
            'MONITOR_RETRIEVE',
            'MONITOR_DEFINE_THRESHOLD',
            'MONITOR_EXPORT_DEVICEDATA'
          ],
          'rule': [
            'ALARMRULE_RETRIEVE',
            'ALARMRULE_UPDATE',
            'ALARMRULE_DELETE'
          ],
          'alarminfo': [
            'ALARMINFO_RETRIEVE',
            'ALARMINFO_DELETE',
            'ALARMINFO_UPDATE'
          ],
          'user': [
            'USER_RETRIEVE',
            'USER_UPDATE',
            'USER_DELETE',
            'USER_AUTH',
            'USER_CREATE'
          ],
          'config_region': [
            'CONFIGURE_REGION_RETRIEVE',
            'CONFIGURE_REGION_CREATE',
            'CONFIGURE_REGION_UPDATE',
            'CONFIGURE_REGION_DELETE',
            'CONFIGURE_REGION_BATCH_DELETE'
          ],
          'config_sys': [
            'CONFIGURE_SYSTEM_RETRIEVE',
            'CONFIGURE_SYSTEM_UPDATE',
            'CONFIGURE_SYSTEM_CREATE',
            'CONFIGURE_SYSTEM_DELETE'
          ],// big tag
          'device_manage': [
            'GATEWAY_RETRIEVE',
            'GATEWAY_EXPORT_EXCEL',
            'GATEWAY_IMPORT_EXCEL',
            'GATEWAY_CREATE',
            'GATEWAY_UPDATE',
            'GATEWAY_DELETE',
            'DEVICE_RETRIEVE',
            'DEVICE_EXPORT_EXCEL',
            'DEVICE_IMPORT_EXCEL',
            'DEVICE_CREATE',
            'DEVICE_UPDATE',
            'DEVICE_DELETE',
            'DEVICEDATA_RETRIEVE',
            'DEVICEDATA_DELETE',
            'DEVICEDATA_UPDATE',
            'DEVICEDATA_EXPORT_EXCEL'
          ],
          'monitor_alarm': [
            'MONITOR_RETRIEVE',
            'MONITOR_DEFINE_THRESHOLD',
            'MONITOR_EXPORT_DEVICEDATA',
            'ALARMRULE_RETRIEVE',
            'ALARMRULE_UPDATE',
            'ALARMRULE_DELETE',
            'ALARMINFO_RETRIEVE',
            'ALARMINFO_DELETE',
            'ALARMINFO_UPDATE'
          ],
          'report': [
            'REPORT_TIME_RETRIEVE',
            'REPORT_REGION_RETRIEVE',
            'REPORT_DEVICETYPE_RETRIEVE',
            'REPORT_TAG_RETRIEVE'
          ],
          'config': [
            'CONFIGURE_REGION_RETRIEVE',
            'CONFIGURE_REGION_CREATE',
            'CONFIGURE_REGION_UPDATE',
            'CONFIGURE_REGION_DELETE',
            'CONFIGURE_REGION_BATCH_DELETE',
            'CONFIGURE_SYSTEM_RETRIEVE',
            'CONFIGURE_SYSTEM_UPDATE',
            'CONFIGURE_SYSTEM_CREATE',
            'CONFIGURE_SYSTEM_DELETE'
          ]
        };
        return checkAuth(barDict[bar]);
      },
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
  .scroll {
    overflow: auto;
  }

  .el-menu-vertical-demo {
    /*重载一些样式*/
    .el-menu-item {
      min-width: auto;
    }
    .hide-underline {
      text-decoration: none;
    }

    .image{
      height: 30%;
    }

  }
</style>
