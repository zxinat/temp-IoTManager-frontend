<template>
  <div>
    <div class="block">
      <span class="demonstration">地域筛选</span>
      <el-cascader
        :options="selectorOptions"
        v-model="searchCity"
        @change="areaFilter">
      </el-cascader>
      <div class="dashboard-map-container">
        <!--<h2>-->
        <!--中国地图-->
        <!--</h2>-->
      </div>
    </div>

  </div>

</template>

<script>
  // http://efe.baidu.com/blog/echarts-map-tutorial/
  // http://gallery.echartsjs.com/editor.html?c=xBJDR584vG
  import echarts from 'echarts';
  // 一定要引入才能正常显示
  import 'echarts/map/js/world';
  import {
    getDeviceAmount,
    getCityOptions,
    getGatewayByWorkshop,
    getFactoryOptions,
    getWorkshopOptions,
    getMapInfo,
    getCityCascaderOptions,
    getOneMapInfo,
    getDeviceByCity,
    getDevicesApi,
  } from "../../api/api";

  export default {
    name: "DashBoardMap",
    data() {
      return {
        chart: null,
        searchCity: ['全部'],
        option: {
          backgroundColor: '#404a59',  		// 图表背景色
          tooltip: {
            trigger: 'item',
            formatter: function (data)//对提示框的数据自定义
            {
              return data.seriesName + '<br/>' + data.name + '：' + (data.value[2]); //将小数转化为百分数显示

            }
          }, // 鼠标移到图里面的浮动提示框
          geo: { // 这个是重点配置区
            map: 'world', // 表示世界地图
            roam: true,
            itemStyle: {					// 定义样式
              normal: {					// 普通状态下的样式
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {					// 高亮状态下的样式
                areaColor: '#483636'
              }
            },
            center: [],
            zoom: 1
          },
          series: [
            {
              name: '设备分布', // series名称
              type: 'scatter', // series图表类型
              coordinateSystem: 'geo', // series坐标系类型
              data: [],
            }
          ]
        },
        mapInfo: [],
        selectorOptions: [],
        selectedArea: []
      };
    },
    async mounted() {
      this.setMapInfo();
      this.chinaConfigure();
      this.getDeviceOptions();
    },
    methods: {
      chinaConfigure() {
        let myChart = echarts.init(document.getElementsByClassName('dashboard-map-container')[0]); //这里是为了获得容器所在位置
        window.onresize = myChart.resize;
        myChart.setOption(this.option);
      },
      async areaFilter() {
        this.setMapInfo();
      },
      async setMapInfo() {
        let amount = [];
        let centerPos = [];
        if (this.searchCity[0] === '全部') {
          amount = (await getMapInfo()).data.d;
          this.option.geo.center = [];
          this.option.geo.zoom = 1;
        } else {
          amount = (await getOneMapInfo(this.searchCity[0])).data.d;
          centerPos.push(amount[0]['value'][0]);
          centerPos.push(amount[0]['value'][1]);
          this.option.geo.center = centerPos;
          this.option.geo.zoom = 8;
        }
        this.option.series = [
          {
            name: '设备分布', // series名称
            type: 'scatter', // series图表类型
            coordinateSystem: 'geo', // series坐标系类型
            data: amount,
          }
        ];
        this.chinaConfigure();

        let data = [];
        if (this.searchCity[0] === '全部') {
          data = (await getDevicesApi('all')).data.d;
        } else {
          data = (await getDeviceByCity(this.searchCity[0])).data.d;
        }
        this.$store.dispatch('device/setDashboardDeviceOption', data);
      },
      async getDeviceOptions() {
        this.selectorOptions = (await getCityCascaderOptions()).data.d;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variaties.scss";

  .block {
    margin: 10px;
  }

  .dashboard-map-container {
    margin-top: 7px;
    height: $dashboard-block-height;
  }

  .search-container {
    margin: 1% 1%;
    text-align: left;
  }
</style>
