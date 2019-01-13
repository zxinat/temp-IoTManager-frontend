<template>
  <div class="dashboard-line-chart-container">
    <!--<h2>-->
    <!--折线图-->
    <!--</h2>-->
  </div>
</template>

<script>
  import echarts from 'echarts';
  import io from 'socket.io-client';
  const socket = io('ws://localhost:3000')
  export default {
    name: "DashboardLineChart",
    data() {
      return {
        chart: null,
        option: {
          title: {
            text: 'Telemetry History'
          },
          tooltip: {},
          legend: {
            itemGap: 50,
            data: ['temperature', 'humidity'],
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                margin: 15,
              },
            },
            axisTick: {
              show: false,
            },
            data: ['14:43:00', '14:43:01', '14:43:02', '14:43:03', '14:43:04', '14:43:05', '14:43:06']
          },
          yAxis: {},
          series: [{
            type: 'line',
            name: 'temperature',
            label: {
              show: true,
              // position: 'top'
            },
            itemStyle: {
              normal: {
              }
            },
            data: [393, 438, 485, 631, 689, 824, 987]
          },
          //   {
          //   type: 'line',
          //   name: 'humidity',
          //   label: {
          //     show:true
          //   },
          //   data: [200.500, 382, 102, 267, 186, 315, 316]
          // }
          ]
        },
      }
    },
    mounted() {
      socket.emit('open');
      this.initChart();
      socket.on('updateData', data => {
        this.option.series[0].data.shift();
        this.option.series[0].data.push(parseInt(data.value));
        this.option.xAxis.data.shift();
        this.option.xAxis.data.push(data.time);
        this.initChart();
      })
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementsByClassName('dashboard-line-chart-container')[0]);
        // 把配置和数据放这里
        console.log(this.option);
        this.chart.setOption(this.option)
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variaties";
  .dashboard-line-chart-container {
    height: $dashboard-block-height;
    /*padding-top: 10px;*/
  }
</style>
