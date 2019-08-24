<template>
  <div class="system-config-container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">设备类型配置</el-menu-item>
      <el-menu-item index="2">数据库配置</el-menu-item>
    </el-menu>
    <div v-if="currentPage==='1'"><device-type-config></device-type-config></div>
    <div v-if="currentPage==='2'"><database-config></database-config></div>
  </div>
</template>

<script>
    import DatabaseConfig from '../../components/DatabaseConfig/index';
    import DeviceTypeConfig from '../../components/DeviceTypeConfig/index';
    export default {
      name: "SystemConfig",
      data() {
        return {
          //翻页使用的变量
          activeIndex: '1',
          currentPage: '1',

        }
      },
        computed: {
          deviceData:{
            // getter
            get: function () {
              return this.$store.state.device.currentDeviceData;
            },
            // setter
            set: function (newValue) {
              console.log('newValue', newValue)
            }
          }
        },
        methods:{
          handleSelect(key)
          {
            this.currentPage = key;
            console.log('currentPage', typeof this.currentPage);
          }
        },
        components: {
        DeviceTypeConfig, DatabaseConfig
        }
    }
</script>

<style scoped>
  .system-config-container{
    margin-top: 10px;
    margin-left: 20px;
  }
</style>
