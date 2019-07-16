<template>
    <div class="monitoring-config-container">
        <h3>{{deviceData.deviceName}}</h3>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">设备概况</el-menu-item>
          <!--<el-menu-item index="2">设备状态</el-menu-item>-->
          <!--<el-menu-item index="3">设备属性</el-menu-item>-->
          <el-menu-item index="4">数据统计</el-menu-item>
          <el-menu-item index="5">报警记录</el-menu-item>
          <!--<el-menu-item index="6">维保记录</el-menu-item>-->
        </el-menu>
        <div v-if="currentPage==='1'"><monitoring-device-card></monitoring-device-card></div>
        <!--<div v-if="currentPage==='2'">2</div>-->
      <!--<div v-if="currentPage==='3'"><device-property></device-property></div>-->
      <div v-if="currentPage==='4'"><data-statistic></data-statistic></div>
      <div v-if="currentPage==='5'"><alarm-record></alarm-record></div>
        <!--<div v-if="currentPage==='6'">6</div>-->
        <!--<MonitoringMap></MonitoringMap>-->
    </div>
</template>

<script>
    import MonitoringMap from "../MonitoringMap/index";
    import MonitoringDeviceCard from "../MonitoringDeviceCard/index";
    import DeviceProperty from '../../components/DeviceProperty/index';
    import DataStatistic from "../DataStatistic/index";
    import AlarmRecord from "../AlarmRecord/index";
    export default {
      name: "MonitoringConfig",
      data(){
        return {
          //翻页使用的变量
          activeIndex: '1',
          currentPage: '1',
        }
      },
      computed:{
        deviceData:{
          // getter
          get: function () {
            return this.$store.state.device.currentDeviceData;
          },
          // setter
          set: function (newValue) {
            console.log('newvalue',newValue)
          }
        }
      },
      methods:{
        handleSelect(key, keyPath) {
          this.currentPage=key;
          console.log('currentpage',typeof this.currentPage);
        }
      },
      components: {AlarmRecord, DataStatistic, MonitoringDeviceCard, MonitoringMap,DeviceProperty}
    }
</script>

<style lang="scss" scoped>
.monitoring-config-container{
  padding-top: 1rem;
    h3{
      display: inline;
      font-family: "Adobe 黑体 Std R";
      color: #007fff;
    }
}
</style>
