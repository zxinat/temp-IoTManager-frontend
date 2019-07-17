<template>
  <div class="data-statistic-container">
    <!--<el-date-picker-->
      <!--v-model="timeDuration"-->
      <!--type="daterange"-->
      <!--range-separator="至"-->
      <!--start-placeholder="开始日期"-->
      <!--end-placeholder="结束日期">-->
    <!--</el-date-picker>-->
    <!--<el-button type="primary" @click="getData">确定</el-button>-->
    <!--<div class="data-statistic-line-chart"></div>-->
    <!--<el-row style="margin-left: 10px">-->
      <!--<el-col :span="6">-->
        <!--<el-button type="primary" @click="setTimeDuration">最近100个数据</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
        <!--<el-button type="primary" @click="setTimeDuration('day')">日数据</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
        <!--<el-button type="primary" @click="setTimeDuration('week')">周数据</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
        <!--<el-button type="primary" @click="setTimeDuration('month')">月数据</el-button>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <el-table
      :data="deviceData.deviceData"
      stripe
      style="width: 80%; margin: 5px">
      <el-table-column
        prop="deviceId"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="indexName"
        label="设备属性">
      </el-table-column>
      <el-table-column
        prop="indexValue"
        label="属性数值">
      </el-table-column>
      <el-table-column
        prop="indexUnit"
        label="属性单位">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: "DataStatistic",
    data() {
      return {
        timeDuration: [new Date() - 86400000, new Date()],
        // 折线图数据
        chart: {},
        tableData: [],
        dynamicChartOption: {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: true
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0],
            splitLine: {
              show: true
            }
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: []
          }]
        },
        chartOption:{
            // color:[ '#d14a61', '#675bba'],
            xAxis: {
              type : 'category',
              data :  function (){
                var list = [];
                for (var i = 1; i <= 12; i++) {
                  list.push('11-' + i);
                }
                return list;
              }()
            },
            yAxis: {
              type : 'value'
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : ''        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function (params) {
                var min = params[0];
                var max = params[1];
                var ave = params[2];
                return min.name + '<br/>' + min.seriesName + ' : ' + min.value + '<br/>' + max.seriesName + ' : ' +(max.value+min.value) + '<br/>' + ave.seriesName + ' : ' + ave.value;
              }
            },
            series: [
              {
                name: '最小值',
                type: 'bar',
                stack:  '总量',
                itemStyle: {
                  normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,5,99,0)'
                  }
                },
                data: [800, 1700, 1400, 1200, 300, 0,800, 1700, 1400, 1200, 300, 0]
              },
              {
                name: '最大值',
                type: 'bar',
                stack: '总量',
                data:[2900, 900, 300, 200, 900, 300,2900, 900, 300, 200, 900, 300]
              },
              {
                name: '平均值',
                type: 'line',
                // stack: '总量',
                label: {
                  normal: {
                    show: true,
                  }
                },
                data:[1900, 1800, 1300, 1400, 500, 30,1900, 1800, 1300, 1400, 500, 30]
              }
            ]
        },
        now: +new Date(),
        value: Math.random() * 1000,
        tempSetInterval:null
      }
    },
    methods: {
      initChart() {
        // 获取动态数据接口
        for (let i = 0; i < 1000; i++) {
          this.dynamicChartOption.series[0].data.push(this.getData());
        }
        this.chart = echarts.init(document.getElementsByClassName('data-statistic-line-chart')[0]);
        // // 把配置和数据放这里
        this.chart.setOption(this.dynamicChartOption)
        this.polling()
      },
      initDynamicChart() {
        this.stopPolling();
        // 获取实时数据接口
        this.chart.setOption(this.dynamicChartOption,true);
        this.polling()
      },
      setTimeDuration(value) {
        switch (value) {
          case 'day':
            this.timeDuration=[new Date() - 86400000, new Date()];
            this.stopPolling();
            // 数据修改操作接口，传入快捷时间方式，返回min数组、max数组、ave数组、x轴数组
            this.chart.setOption(this.chartOption,true);
            break;
          case 'week':
            this.stopPolling();
            this.timeDuration=[new Date() - 86400000 * 7, new Date()];
            // 数据修改操作接口，传入快捷时间方式，返回min数组、max数组、ave数组、x轴数组
            this.chart.setOption(this.chartOption,true);
            break;
          case 'month':
            this.stopPolling();
            this.timeDuration=[new Date() - 86400000 * 30, new Date()];
            // 数据修改操作接口，传入快捷时间方式，返回min数组、max数组、ave数组、x轴数组
            this.chart.setOption(this.chartOption,true);
            break;
          default:
            // 数据修改操作接口，实时数据
            this.initDynamicChart();
            break;
        }
      },
      getData() {  // 替换为查询数据接口,参数为value(时间值)
        let oneDay = 24 * 3600 * 1000;
        this.now = new Date(+this.now + oneDay);
        this.value = this.value + Math.random() * 100 - 50;
        return {
          name: this.now.toString(),
          value: [
            [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
            Math.round(this.value)
          ]
        }
      },
      polling() { // 添加轮询接口
        let vm = this;
        this.tempSetInterval=setInterval(function () {
          for (let i = 0; i < 5; i++) {
            vm.dynamicChartOption.series[0].data.shift();
            vm.dynamicChartOption.series[0].data.push(vm.getData());
          }
          vm.chart.setOption({
            series: [{
              data: vm.dynamicChartOption.series[0].data
            }]
          });
        }, 1000);
      },
      stopPolling(){
        let vm=this;
        clearInterval(vm.tempSetInterval);
      }
    },
    mounted() {
      this.initChart();
    },
    computed:{
      deviceData:{
        // getter
        get: function () {
          return this.$store.state.device.currentDeviceData;
        },
        // setter
        set: function (newValue) {
          console.log('newvalue',newValue)
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
