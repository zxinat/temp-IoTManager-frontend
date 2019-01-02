<template>
  <div class="monitoring-map-container">

  </div>
</template>

<script>
  import echarts from 'echarts';
  import  'echarts/extension/bmap/bmap';
  export default {
    name: "MonitoringMap",
    data(){
      return{
        mapData:[
          {name: '海门', value: [121.15, 31.89, 90]},
          {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
          {name: '招远', value: [120.38, 37.35, 142]},
          {name: '舟山', value: [122.207216, 29.985295, 123]},
        ],
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
              color: ['#50a3ba','#eac736','#d94e5d']
            },
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '销量',
              type: 'scatter',

              coordinateSystem: 'bmap', // 坐标系使用bmap

              data: this.mapData
            }
          ]
        }
      }
    },
    methods:{
      mapConfigure(){
        let bmapChart = echarts.init(document.getElementsByClassName('monitoring-map-container')[0]);
        bmapChart.setOption(this.mapOption);
        var bmap = bmapChart.getModel().getComponent('bmap').getBMap(); // 百度地图实例
        bmap.addControl(new BMap.NavigationControl()); // 缩放控件
        bmap.addControl(new BMap.ScaleControl()); // 比例尺
      }
    },
    mounted(){
      console.log("diaoyongle");
      this.mapConfigure();
    }

  }


</script>

<style scoped>
  .monitoring-map-container {
      width: 100%;
    height: 30rem;
  }
</style>
