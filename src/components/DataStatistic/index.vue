<template>
  <div class="data-statistic-container">
    <div>
      {{deviceData.deviceName}}
    </div>
    <el-date-picker
      v-if="curScale !== '100'"
      v-model="timeDuration"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-select v-if="curScale !== '100'" v-model="selectedField" placeholder="请选择属性">
      <el-option
        v-for="field in affiliateFields"
        :key="field.fieldName"
        :value="field.fieldId">
      </el-option>
    </el-select>
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
  import {
    get100DataInDataStatistic,
    getDataStatistic,
    getDayAggregateData, getDayAggregateDataInDataStatistic,
    getDeviceStatus,
    getFieldByDeviceName, getHourAggregateData, getMonthAggregateData
  } from "../../api/api";

  export default {
    name: "DataStatistic",
    data() {
      return {
        curScale: '100',
        affiliateFields: [],
        selectedField: '',
        timeDuration: [],
        // 折线图数据
        chart: {},
        tableData: [],
        loading: false,
        chartOption: {
          title: {
            text: ''
          },
          legend: {
            itemGap: 25,
            data: [],
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 30
            },
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
      clearChart() {
        this.chartOption.xAxis.data = [];
        this.chartOption.series = [];
        this.chartOption.legend.data = [];
        this.chartOption.title.text = '';
        this.chart.setOption(this.chartOption, true);
      },
      async initChart() {
        this.chart = echarts.init(document.getElementsByClassName('data-statistic-line-chart')[0]);
        this.clearChart();
        let tmpChartOption = {};
        if (typeof this.deviceData === 'string') {
          tmpChartOption = (await get100DataInDataStatistic(this.deviceData)).data.d;
        }
        this.chartOption.xAxis.data = tmpChartOption.xAxis;
        this.chartOption.series = tmpChartOption.series;
        this.chartOption.legend.data = tmpChartOption.legend;
        this.chartOption.title.text = '最近100个数据';
        this.chart.setOption(this.chartOption, true);
      },
      setTimeDuration(value) {
        switch (value) {
          case 'hour':
            this.curScale = 'hour';
            this.getData();
            break;
          case 'day':
            this.curScale = 'day';
            this.getData();
            break;
          case 'month':
            this.curScale = 'month';
            this.getData();
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
        const titleMap = {day: '日统计', hour: '时统计', month: '月统计'};
        if (this.timeDuration.length < 2 || this.selectedField === '') {
          this.clearChart();
          this.$alert('请选择日期和属性', '提示');
        } else {
          this.clearChart();
          let tmpChartOption = {};
          if (typeof this.deviceData === 'string') {
            let timeObj = {
              startTime: this.timeDuration[0],
              endTime: this.timeDuration[1]
            };
            if (this.curScale === 'hour') {
              tmpChartOption = (await getHourAggregateData(this.deviceData, this.selectedField, timeObj)).data.d;
            } else if (this.curScale === 'day') {
              tmpChartOption = (await getDayAggregateDataInDataStatistic(this.deviceData, this.selectedField, timeObj)).data.d;
            } else if (this.curScale === 'month') {
              tmpChartOption = (await getMonthAggregateData(this.deviceData, this.selectedField, timeObj)).data.d;
            }
          }
          let min = [];
          let avg = [];
          let max = [];
          let x = [];
          tmpChartOption.min.forEach(e => {
            min.push(e.min);
            let t = e.time.year + '-' + e.time.month;
            if (this.curScale === 'day') {
              t += '-';
              t += e.time.day;
            }
            if (this.curScale === 'hour') {
              t += ' ';
              t += e.time.hour;
            }
            x.push(t);
          });
          tmpChartOption.avg.forEach(e => {
            avg.push(e.avg);
          });
          tmpChartOption.max.forEach(e => {
            max.push(e.max);
          });
          let series = [];
          series.push({type: 'line', name: '最大值', data: max, connectNulls: true});
          series.push({type: 'line', name: '平均值', data: avg, connectNulls: true});
          series.push({type: 'line', name: '最小值', data: min, connectNulls: true});

          let legend = ['最大值', '平均值', '最小值'];

          this.chartOption.title.text = titleMap[this.curScale];
          this.chartOption.xAxis.data = x;
          this.chartOption.series = series;
          this.chartOption.legend.data = legend;

          this.chart.setOption(this.chartOption, true);
        }
      },
    },
    async mounted() {
      this.curScale = '100';
      if (typeof this.deviceData === 'string') {
        this.affiliateFields = (await getFieldByDeviceName(this.deviceData)).data.d;
      }
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
      async deviceData(val) {
        if (typeof this.deviceData === 'string') {
          this.affiliateFields = (await getFieldByDeviceName(val)).data.d;
        }
        console.log(this.affiliateFields);
        if (this.curScale === '100') {
          this.initChart();
        } else {
          this.getData();
        }
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
