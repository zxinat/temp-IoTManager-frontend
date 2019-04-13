<template>
  <div class="report-statistic-monthly">
    <div class="head-container">
      订阅名称
      <el-select v-model="selectedType" placeholder="请选择">
        <el-option
          v-for="item in nameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      资源组
      <el-select v-model="selectedSource" placeholder="请选择">
        <el-option
          v-for="item in sourceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="demonstration">账单日期</span>
      <el-date-picker
        v-model="selectedDate"
        type="year"
        placeholder="选择年">
      </el-date-picker>
    </div>
    <el-steps style="margin: 20px 0" simple>
      <el-step title="按月费用统计" icon="el-icon-upload"></el-step>
    </el-steps>
    <div class="report-statistic-monthly-histogram">
    </div>
    <el-steps style="margin: 20px 0" simple>
      <el-step title="资源类别统计" icon="el-icon-upload"></el-step>
    </el-steps>
    <div class="report-statistic-monthly-piechart">
    </div>
  </div>
</template>

<script>
  import {getReportStaticMonthlyHistogram,getReportStaticMonthlyPieChart} from '../../api/api';
  import echarts from 'echarts';

  export default {
    name: "ReportStaticMonthly",
    data() {
      return {
        nameOptions: [{
          value: '选项1',
          label: '类型1'
        }, {
          value: '选项2',
          label: '类型2'
        }, {
          value: '选项3',
          label: '类型3'
        }, {
          value: '选项4',
          label: '类型4'
        }, {
          value: '选项5',
          label: '类型5'
        }],
        selectedType: '',
        sourceOptions: [{
          value: '选项1',
          label: '资源1'
        }, {
          value: '选项2',
          label: '资源2'
        }, {
          value: '选项3',
          label: '资源3'
        }, {
          value: '选项4',
          label: '资源4'
        }, {
          value: '选项5',
          label: '资源5'
        }],
        selectedSource: '',
        // 时间戳数组
        selectedDate: '',
        histogramOption: {
          dataset: {
            source: []
          },
          xAxis: {name: 'amount'},
          yAxis: {type: 'category'},
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
        pieChartOption: {
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
              center: ['60%', '30%'],
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
      let histogramData = await getReportStaticMonthlyHistogram(this.selectedType, this.selectedSource, this.time);
      this.histogramOption.dataset.source = histogramData.data.d;
      let pieChartData = await getReportStaticMonthlyPieChart(this.selectedType, this.selectedSource, this.time);
      this.pieChartOption.series[0].data = pieChartData.data.d;
      this.initTypeChart();
      this.initSubClassChart();
    },
    methods: {
      initTypeChart() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-monthly-histogram')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.histogramOption)
      },
      initSubClassChart() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-monthly-piechart')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.pieChartOption)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .report-statistic-monthly {
    .report-statistic-monthly-histogram {
      height: 500px;
    }

    .report-statistic-monthly-piechart {
      height: 400px;
    }
  }
</style>
