<template>
  <div class="regional-dimension-container">
    <div class="head-container">
      选择车间
      <el-cascader
        :options="nameOptions"
        v-model="selectedOptions"
        @change="handleChange">
      </el-cascader>
      <span class="demonstration">选择日期</span>
      <el-date-picker
        v-model="selectedDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份">
      </el-date-picker>
    </div>
    <el-row>
      <div class="report-statistic-daily-histogram">
      </div>
    </el-row>

    <!--<el-steps style="margin: 20px 0" simple>-->
      <!--<el-step title="资源类别统计" icon="el-icon-upload"></el-step>-->
    <!--</el-steps>-->
    <!--<div class="report-statistic-daily-piechart">-->
    <!--</div>-->
  </div>
</template>

<script>
  import {getRegionalDimensionHistogram, getReportStaticDaithlyPieChart} from '../../api/api';
  import echarts from 'echarts';

  export default {
    name: "RegionalDimension",
    data() {
      return {
        nameOptions: [{
          value: 'shanghai',
          label: '上海',
          children: [{
            value: '111',
            label: '工厂1',
            children: [{
              value: '',
              label: '车间1'
            }, {
              value: 'fankui',
              label: '车间2'
            }, {
              value: 'xiaolv',
              label: '车间3'
            }, {
              value: 'kekong',
              label: '车间4'
            }]
          }, {
            value: 'daohang',
            label: '工厂2',
            children: [{
              value: 'cexiangdaohang',
              label: '车间1'
            }, {
              value: 'dingbudaohang',
              label: '车间2'
            }]
          }]
        }, {
          value: 'zujian',
          label: '长沙',
          children: [{
            value: 'basic',
            label: '工厂1',
            children: [{
              value: 'layout',
              label: '车间1'
            }, {
              value: 'color',
              label: '车间2'
            }, {
              value: 'typography',
              label: '车间3'
            }, {
              value: 'icon',
              label: '车间4'
            }, {
              value: 'button',
              label: '车间5'
            }]
          }, {
            value: 'form',
            label: '工厂2',
            children: [{
              value: 'radio',
              label: '车间1'
            }, {
              value: 'checkbox',
              label: '车间2'
            }, {
              value: 'input',
              label: '车间3'
            }, {
              value: 'input-number',
              label: '车间4'
            }, {
              value: 'select',
              label: '车间5'
            }]
          }, {
            value: 'data',
            label: '工厂3',
            children: [{
              value: 'table',
              label: '车间1'
            }, {
              value: 'tag',
              label: '车间2'
            }, {
              value: 'progress',
              label: '车间3'
            }, {
              value: 'tree',
              label: '车间4'
            }, {
              value: 'pagination',
              label: '车间5'
            }, {
              value: 'badge',
              label: '车间6'
            }]
          }, {
            value: 'notice',
            label: '工厂4',
            children: [{
              value: 'alert',
              label: '车间1'
            }, {
              value: 'loading',
              label: '车间2'
            }, {
              value: 'message',
              label: '车间3'
            }, {
              value: 'message-box',
              label: '车间4'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '武汉',
          children: [{
            value: 'notice',
            label: '工厂4',
            children: [{
              value: 'alert',
              label: '车间1'
            }, {
              value: 'loading',
              label: '车间2'
            }, {
              value: 'message',
              label: '车间3'
            }, {
              value: 'message-box',
              label: '车间4'
            }]
          }]
        }],
        selectedType: '',
        // 时间戳数组
        selectedDate: '',
        histogramOption: {
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '平均在线时间', '告警次数', '设备数量'],
              ['Matcha Latte', 43.3, 85.8, 93.7],
              ['Milk Tea', 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 86.4, 65.2, 82.5],
              ['Walnut Brownie', 72.4, 53.9, 39.1]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
          ]
        },
      }
    },
    async mounted() {
      // 默认获取统计表
      // let histogramData = await getRegionalDimensionHistogram(this.selectedType, this.selectedSource, this.time);
      // this.histogramOption.dataset.source = histogramData.data.d;
      // let pieChartData = await getReportStaticDaithlyPieChart(this.selectedType, this.selectedSource, this.time);
      // this.pieChartOption.series[0].data = pieChartData.data.d;
      this.initTypeChart();
      this.initSubClassChart();
    },
    methods: {
      initTypeChart() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-daily-histogram')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.histogramOption)
      },
      initSubClassChart() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-daily-piechart')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.pieChartOption)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .regional-dimension-container {
    .head-container{
      margin:20px;
    }
    .report-statistic-daily-histogram {
      height: 500px;
    }

    .report-statistic-daily-piechart {
      height: 400px;
    }
  }
</style>

