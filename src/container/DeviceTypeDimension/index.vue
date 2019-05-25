<template>
  <div class="device-type-dimension-container">
    <div class="head-container">
      <!--选择车间-->
      <!--<el-cascader-->
      <!--:options="nameOptions"-->
      <!--v-model="selectedOptions"-->
      <!--@change="handleChange">-->
      <!--</el-cascader>-->
      <span class="demonstration">选择时间</span>
      <el-date-picker
        v-model="selectedDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
    </div>
    <el-row>
      <div class="report-statistic-daily-histogram">
      </div>
    </el-row>
    <!--<el-steps style="margin: 20px 0" simple>-->
    <!--<el-step title="资源类别统计" icon="el-icon-upload"></el-step>-->
    <!--</el-steps>-->
    <el-row>
      <el-col :span="12">
        <div class="report-statistic-daily-piechart1">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="report-statistic-daily-piechart2">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: "DeviceTypeDimension",
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
          color: ['#6c807b'],
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '平均在线时间'],
              ['传感器1', 42.4],
              ['传感器2', 92.4],
              ['传感器3', 79.4],
              ['传感器4', 43.3],
              ['传感器5', 83.1],
              ['传感器6', 86.4],
              ['传感器7', 42.4],
              ['传感器8', 92.4],
              ['传感器9', 79.4],
              ['传感器10', 43.3],
              ['传感器11', 83.1],
              // ['传感器12', 86.4],
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {type: 'bar'},
          ]
        },
        pieChartOption: {
          title : {
            text: '报警次数',
            x:'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show: true,
            y: 'bottom',
            feature: {
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
            {
              name: '饼图',
              type: 'pie',
              radius: '50%',
              selectedMode: 'single',
              label: {
                normal: {
                  position: 'outside',
                  formatter: '{b}\n{c}次',
                  textStyle: {
                    color: '',
                    fontSize: 14
                  }
                }
              },
              data: [
                {value: 200, name: '传感器1'},
                {value: 20, name: '传感器2'},
                {value: 790, name: '传感器3'},
                {value: 780, name: '传感器4'},
                {value: 550, name: '传感器5'},
                {value: 70, name: '传感器6'},
                {value: 80, name: '传感器7'},
                {value: 78, name: '传感器8'},
                {value: 7, name: '传感器9'},
                {value: 78, name: '传感器10'},
                {value: 780, name: '传感器11'},
                // {value: 780, name: '传感器12'},
              ]
            }
          ]
        },
        pieChartOption2: {
          title : {
            text: '设备数',
            x:'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show: true,
            y: 'bottom',
            feature: {
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
            {
              name: '饼图',
              type: 'pie',
              radius: '50%',
              selectedMode: 'single',
              label: {
                normal: {
                  position: 'outside',
                  formatter: '{b}\n{c}个',
                  textStyle: {
                    color: '',
                    fontSize: 14
                  }
                }
              },
              data: [
                {value: 200, name: '传感器1'},
                {value: 20, name: '传感器2'},
                {value: 780, name: '传感器3'},
                {value: 780, name: '传感器4'},
                {value: 780, name: '传感器5'},
                {value: 780, name: '传感器6'},
                {value: 780, name: '传感器7'},
                {value: 780, name: '传感器8'},
                {value: 780, name: '传感器9'},
                {value: 780, name: '传感器10'},
                {value: 780, name: '传感器11'},
                // {value: 780, name: '传感器12'},
              ]
            }
          ]
        }
      }
    },
    async mounted() {
      // 默认获取统计表
      // let histogramData = await getRegionalDimensionHistogram(this.selectedType, this.selectedSource, this.time);
      // this.histogramOption.dataset.source = histogramData.data.d;
      // let pieChartData = await getReportStaticDaithlyPieChart(this.selectedType, this.selectedSource, this.time);
      // this.pieChartOption.series[0].data = pieChartData.data.d;
      this.initTypeChart();
      this.initSubClassChartOne();
      this.initSubClassChartTwo();
    },
    methods: {
      initTypeChart() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-daily-histogram')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.histogramOption);
      },
      initSubClassChartOne() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-daily-piechart1')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.pieChartOption)
      },
      initSubClassChartTwo() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-daily-piechart2')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.pieChartOption2)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .device-type-dimension-container {
    .head-container {
      margin: 20px 50px;
    }

    .report-statistic-daily-histogram {
      height: 500px;
    }

    .report-statistic-daily-piechart1 {
      height: 400px;
    }
    .report-statistic-daily-piechart2 {
      height: 400px;
    }
  }
</style>
