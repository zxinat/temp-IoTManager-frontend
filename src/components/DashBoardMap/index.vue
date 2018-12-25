<template>
    <div class="dashboard-map-container" style="height: 500px;width: 500px">


    </div>
</template>

<script>
    import echarts from 'echarts';
    // 一定要引入才能正常显示
    import 'echarts/map/js/china';
    import option from './map-option';
    export default {
        name: "DashBoardMap",
      data() {
        return {
        };
      },
      mounted() {
        this.chinaConfigure();
      },
      methods: {
        chinaConfigure() {
          let myChart = echarts.init(document.getElementsByClassName('dashboard-map-container')[0]); //这里是为了获得容器所在位置
          window.onresize = myChart.resize;
          myChart.setOption(option)
        }
      }
    }
</script>

<style scoped>

</style>
