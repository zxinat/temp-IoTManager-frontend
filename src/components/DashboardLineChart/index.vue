<template>
  <div class="dashboard-line-chart-container">
    <!--<h2>-->
    <!--折线图-->
    <!--</h2>-->
  </div>
</template>

<script>
  import echarts from 'echarts';

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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
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
                // color: "#28ffb3",

              }
            },
            // areaStyle: { //区域填充样式
            //   normal: {
            //     //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //       offset: 0,
            //       color: 'rgba(0,154,120,1)'
            //     },
            //       {
            //         offset: 1,
            //         color: 'rgba(255,255,255,255)'
            //       }
            //     ], false),
            //     shadowColor: 'rgba(53,142,215, 0.5)', //阴影颜色
            //     shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            //   }
            //
            // },
            data: [393, 438, 485, 631, 689, 824, 987]
          }, {
            type: 'line',
            name: 'humidity',
            label: {
              show:true
            },
            data: [200.500, 382, 102, 267, 186, 315, 316]
          }]
        },
      }
    },
    mounted() {
      this.initChart();
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
