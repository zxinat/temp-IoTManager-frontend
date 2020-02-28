<template>
  <div class="monitoring-map-container">

  </div>
</template>

<script>
  import echarts from 'echarts';
  import  'echarts/extension/bmap/bmap';
  import {getDeviceLocation, getOneCityByName} from "../../api/api";
  export default {
    name: "MonitoringMap",
    data(){
      return{
        mapOption :{
          // 这里是 ECharts 的配置项，接下来会说明
          bmap: {
            center: [121.47, 31.23], // 中心位置坐标
            zoom: 6, // 地图缩放比例
            roam: true // 开启用户缩放
          },
          visualMap: {	// 视觉映射组件
            type: 'continuous',
            min: 0,
            max: 200,
            calculable: true,
            inRange: {
              color: ['#d90516']
            },
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '设备地址',
              type: 'scatter',
              symbol: 'pin',
              symbolSize:50,
              coordinateSystem: 'bmap', // 坐标系使用bmap
              data: []//默认空
            }
          ]
        }
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
        }
      }
    },
    watch:{
      async deviceData(val){
        // this.mapOption.series[0].data=[{"name":val.city,"value":val.address}];
        // const city = (await getOneCityByName(val.city)).data.d;
        // console.log('city', val);
        if (typeof this.deviceData === 'string') {
          let deviceLocation = (await getDeviceLocation(val)).data.d;
          this.mapOption.bmap.center = [deviceLocation.longitude,
            deviceLocation.latitude];
          this.mapConfigure();
        }
      }
    },
    methods:{
      mapConfigure(){
        let bmapChart = echarts.init(document.getElementsByClassName('monitoring-map-container')[0]);
        bmapChart.setOption(this.mapOption, true);
        var bmap = bmapChart.getModel().getComponent('bmap').getBMap(); // 百度地图实例
        bmap.addControl(new BMap.NavigationControl()); // 缩放控件
        bmap.addControl(new BMap.ScaleControl()); // 比例尺
      }
    },
    async mounted(){
      if (typeof this.deviceData === 'string') {
        let deviceLocation = (await getDeviceLocation(this.deviceData)).data.d;
        this.mapOption.bmap.center = [deviceLocation.longitude, deviceLocation.latitude];
        this.mapConfigure();
      }
    }

  }


</script>

<style scoped>
  .monitoring-map-container {
      width: 100%;
    height: 30rem;
  }
</style>
