<template>
  <div class="data-statistic-container">
    <div>
      {{deviceData.deviceName}}
    </div>
    <el-date-picker
      v-if="curScale != '100'"
      v-model="timeDuration"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button v-if="curScale != '100'" type="primary" @click="getData">确定</el-button>
    <div v-loading="loading" class="data-statistic-line-chart"></div>
    <el-row style="margin-left: 10px">
      <el-col :span="6">
        <el-button type="primary" @click="setTimeDuration('100')">最近100个数据</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="setTimeDuration('hour')">时数据</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="setTimeDuration('day')">日数据</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="setTimeDuration('month')">月数据</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import {getDataStatistic, getDayAggregateData, getDeviceStatus} from "../../api/api";

  export default {
    name: "DataStatistic",
    data() {
      return {
        curScale: '100',
        timeDuration: [],
        // 折线图数据
        chart: {},
        tableData: [],
        loading: false,
        // dynamicChartOption: {
        //   title: {
        //     text: '数据统计',
        //     show: false
        //   },
        //   tooltip: {
        //     trigger: 'axis',
        //     formatter: function (params) {
        //       params = params[0];
        //       var date = new Date(params.name);
        //       return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        //     },
        //     axisPointer: {
        //       animation: false
        //     }
        //   },
        //   toolbox: {
        //     left: 'left',
        //     feature: {
        //       saveAsImage: {}
        //     }
        //   },
        //   xAxis: {
        //     type: 'time',
        //     splitLine: {
        //       show: true
        //     }
        //   },
        //   yAxis: {
        //     type: 'value',
        //     boundaryGap: [0, 0],
        //     splitLine: {
        //       show: true
        //     }
        //   },
        //   series: [{
        //     name: '模拟数据',
        //     type: 'line',
        //     showSymbol: false,
        //     hoverAnimation: false,
        //     data: []
        //   }]
        // },
        chartOption: {
          // color:[ '#d14a61', '#675bba'],
          title: {
            text: ''
          },
          legend: {
            itemGap: 25,
            data: [],
          },
          xAxis: {
            type: 'category',
            data: [],
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: ''        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          series: []
        },
        now: +new Date(),
        value: Math.random() * 1000,
        tempSetInterval: null
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementsByClassName('data-statistic-line-chart')[0]);
        console.log(this.deviceData['hundredData']);
        this.chartOption.series = [];
        this.chartOption.legend.data = [];
        this.chartOption.title.text = '最近100个数据';
        let flag = false;
        Object.keys(this.deviceData['hundredData']).forEach(v => {
          if (flag === false) {
            this.chartOption.xAxis.data = this.deviceData['hundredData'][v].map(e => {
              return e['timestamp']
            });
          }
          this.chartOption.series.push(
            {type: 'line', name: v, data: this.deviceData['hundredData'][v].map(e => {return e['indexValue']})}
          );
          this.chartOption.legend.data.push(v);
        });
        // this.chartOption.series = {type: 'line', data: this.deviceData['hundredData'].map(e => {return e['indexValue']})};
        // this.chartOption.xAxis.data = ['sa'];
        // this.chartOption.series = [1];
        this.chart.setOption(this.chartOption);
      },
      setTimeDuration(value) {
        switch (value) {
          case 'hour':
            this.curScale = 'hour';
            this.getData();
            // this.chart.setOption(this.chartOption,true);
            break;
          case 'day':
            this.curScale = 'day';
            this.getData();
            // this.chart.setOption(this.chartOption,true);
            break;
          case 'month':
            this.curScale = 'month';
            this.getData();
            // this.chart.setOption(this.chartOption,true);
            break;
          case '100':
            this.curScale = '100';
            this.initChart();
            break;
          default:
            this.initChart();
            break;
        }
      },
      async getData() {  // 替换为查询数据接口,参数为value(时间值)
        this.loading = true;
        this.$store.dispatch('device/setMonitorDate', this.timeDuration);
        let s = {};
        if (this.timeDuration.length > 0) {
          const result = (await getDeviceStatus(this.deviceData.id, {
            startTime: this.timeDuration[0],
            endTime: this.timeDuration[1]
          })).data.d;
          s = result;
        } else {
          const result = (await getDeviceStatus(this.deviceData.id, {
            startTime: new Date,
            endTime: new Date
          })).data.d;
          s = result;
        }
        console.log(s);
        this.$store.dispatch('device/setCurrentDeviceData', s);
        this.setChartOption(this.curScale);
        this.chart.setOption(this.chartOption, true);
        this.loading = false;
      },
      setChartOption(scale) {
        this.loading = true;
        const scaleMap = {day: 'aggregateDayResult', hour: 'aggregateHourResult', month: 'aggregateMonthResult'};
        const titleMap = {day: '日统计', hour: '时统计', month: '月统计'};
        if (this.$store.state.device.currentDeviceData[scaleMap[scale]] !== undefined
          && this.$store.state.device.currentDeviceData[scaleMap[scale]].length > 0) {
          this.chartOption.title.text = titleMap[scale];
          this.chartOption.xAxis.data = this.$store.state.device.currentDeviceData[scaleMap[scale]][0]['avg']
            .map(e => {
              if (scale === 'day') {
                return e['time']['year'] + '-' + e['time']['month'] + '-' + e['time']['day'];
              } else if (scale === 'hour') {
                return e['time']['year'] + '-' + e['time']['month'] + '-' + e['time']['day'] + ' ' + e['time']['hour'] + '时';
              } else if (scale === 'month') {
                return e['time']['year'] + '-' + e['time']['month'];
              }
            });
          const l = [];
          const value = this.$store.state.device.currentDeviceData[scaleMap[scale]]
            .map(e => {
              let obj = {};
              obj['name'] = e['index'];
              l.push(e['index']);
              obj['type'] = 'line';
              obj['data'] = e['avg'].map(t => {
                return t['avg'];
              });
              return obj;
            });
          this.chartOption.series = value;
          console.log(this.chartOption);
          this.chartOption.legend.data = l;
          this.chart.setOption(this.chartOption, true);
        } else {
          console.log('empty');
          this.chartOption.series = [];
          this.chartOption.xAxis.data = [];
          this.chart.setOption(this.chartOption, true);
        }
        this.loading = false;
      }
    },
    mounted() {
      this.initChart();
    },
    computed: {
      deviceData: {
        // getter
        get: function () {
          // this.setChartOption(this.curScale);
          return this.$store.state.device.currentDeviceData;
        },
        // setter
        set: function (newValue) {
          console.log('newvalue', newValue)
        }
      }
    },
    watch:{
      deviceData(val, oldVal) {
        this.loading = true;
        this.setChartOption(this.curScale);
        this.loading = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data-statistic-container {
    margin: 10px;

    .data-statistic-line-chart {
      height: 500px;
    }
  }
</style>
