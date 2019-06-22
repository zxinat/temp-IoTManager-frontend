<template>
  <div class="data-statistic-container">
    <el-date-picker
      v-model="timeDuration"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" @click="getData">确定</el-button>
    <div class="data-statistic-line-chart"></div>
    <el-row style="margin-left: 10px">
      <el-col :span="6">
        <el-button type="primary" @click="setTimeDuration">最近100个数据</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="setTimeDuration('day')">日数据</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="setTimeDuration('week')">周数据</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="setTimeDuration('month')">月数据</el-button>
      </el-col>
    </el-row>
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
        chartOption: {
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
        now: +new Date(),
        value: Math.random() * 1000
      }
    },
    methods: {
      initChart() {
        for (let i = 0; i < 1000; i++) {
          console.log(this.getData());
          this.chartOption.series[0].data.push(this.getData());
        }
        this.chart = echarts.init(document.getElementsByClassName('data-statistic-line-chart')[0]);
        // // 把配置和数据放这里
        this.chart.setOption(this.chartOption)
      },
      setTimeDuration(value) {
        switch (value) {
          case 'day':
            this.timeDuration=[new Date() - 86400000, new Date()];
            break;
          case 'week':
            this.timeDuration=[new Date() - 86400000 * 7, new Date()];
            break;
          case 'month':
            this.timeDuration=[new Date() - 86400000 * 30, new Date()];
            break;
          default:
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
        setInterval(function () {
          for (let i = 0; i < 5; i++) {
            vm.chartOption.series[0].data.shift();
            vm.chartOption.series[0].data.push(vm.getData());
          }
          vm.chart.setOption({
            series: [{
              data: vm.chartOption.series[0].data
            }]
          });
        }, 1000);
      }
    },
    mounted() {
      this.initChart();
      this.polling()
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
