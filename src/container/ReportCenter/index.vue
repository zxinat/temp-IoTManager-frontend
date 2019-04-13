<template>
  <div class="report-center-container">
    <h2>
      概览
    </h2>
    <el-col :span="12">
      <el-steps style="margin-top: 20px" simple>
        <el-step title="本月订阅费用TOP5" icon="el-icon-upload"></el-step>
      </el-steps>
      <div class="report-statistic-index-histogram1">
      </div>
      <el-steps style="margin-top: 20px" simple>
        <el-step title="本月资源类别费用TOP5" icon="el-icon-upload"></el-step>
      </el-steps>
      <div class="report-statistic-index-piechart1">
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <el-steps style="margin-top: 20px" simple>
          <el-step title="按资源列别费用统计"></el-step>
        </el-steps>
        <div class="report-statistic-index-histogram2"></div>
      </div>
      <div class="grid-content bg-purple">
        <el-steps style="margin-top: 20px" simple>
          <el-step title="资源小类费用统计"></el-step>
        </el-steps>
        <div class="report-statistic-index-piechart2"></div>
      </div>
    </el-col>
  </div>
</template>

<script>
  import {getReportStaticIndexHistogram1,getReportStaticIndexPieChart1,getReportStaticIndexHistogram2,getReportStaticIndexPieChart2} from '../../api/api';
  import echarts from 'echarts';
  export default {
    name: "ReportCenter",
    data(){
      return {
        histogramOption1: {
          dataset: {
            source: []
          },
          xAxis: {name: 'amount'},
          yAxis: {type: 'category'},
          grid: {containLabel: true},
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ['#D7DA8B', '#E15457']
            }
          },
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product'
              }
            }
          ]
        },
        pieChartOption1: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['60%', '40%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        histogramOption2: {
          dataset: {
            source: []
          },
          xAxis: {name: 'amount'},
          yAxis: {type: 'category'},
          grid: {containLabel: true},
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ['#D7DA8B', '#E15457']
            }
          },
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product'
              }
            }
          ]
        },
        pieChartOption2: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['60%', '40%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    async mounted() {
      // 默认获取统计表
      let histogramData = await getReportStaticIndexHistogram1(this.selectedType, this.selectedSource, this.time);
      this.histogramOption1.dataset.source = histogramData.data.d;
      let pieChartData = await getReportStaticIndexPieChart1(this.selectedType, this.selectedSource, this.time);
      this.pieChartOption1.series[0].data = pieChartData.data.d;
      histogramData = await getReportStaticIndexHistogram2(this.selectedType, this.selectedSource, this.time);
      this.histogramOption2.dataset.source = histogramData.data.d;
      pieChartData = await getReportStaticIndexPieChart2(this.selectedType, this.selectedSource, this.time);
      this.pieChartOption2.series[0].data = pieChartData.data.d;
      this.initHistogram1();
      this.initHistogram2();
      this.initPieChart1();
      this.initPieChart2();
    },
    methods: {
      initHistogram1() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-index-histogram1')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.histogramOption1)
      },
      initPieChart1() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-index-piechart1')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.pieChartOption1)
      },
      initHistogram2() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-index-histogram2')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.histogramOption1)
      },
      initPieChart2() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-index-piechart2')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.pieChartOption1)
      },
    },
  }
</script>

<style lang="scss" scoped>
.report-center-container{
  .report-statistic-index-histogram1{
    height: 500px;
  }
  .report-statistic-index-piechart1{
    height: 400px;
  }
  .report-statistic-index-histogram2{
    height: 500px;
  }
  .report-statistic-index-piechart2{
    height: 400px;
  }
}
</style>
