<template>
  <div class="time-dimension-container">
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
    <div class="report-statistic-daily-histogram">
    </div>
    <!--<el-steps style="margin: 20px 0" simple>-->
    <!--<el-step title="资源类别统计" icon="el-icon-upload"></el-step>-->
    <!--</el-steps>-->
    <!--<div v-show="showMonth" class="report-statistic-daily-histogram2">-->
    <!--</div>-->
  </div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: "TagDimension",
    data() {
      return {
        selectedType: '',
        // 时间戳数组
        selectedDate: '',
        histogramOption: {
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '平均在线时间', '告警次数', '设备数量'],
              ['tag1', 72.4, 53.9, 39.1],
              ['tag2', 72.4, 53.9, 39.1],
              ['tag3', 72.4, 53.9, 39.1],
              ['tag4', 43.3, 85.8, 93.7],
              ['tag5', 83.1, 73.4, 55.1],
              ['tag6', 86.4, 65.2, 82.5],
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {type: 'bar',barWidth : 30},
            {type: 'bar',barWidth : 30},
            {type: 'bar',barWidth : 30}
          ]
        },
        // histogramOption2: {
        //   legend: {},
        //   tooltip: {},
        //   dataset: {
        //     source: []
        //   },
        //   xAxis: {type: 'category'},
        //   yAxis: {},
        //   // Declare several bar series, each will be mapped
        //   // to a column of dataset.source by default.
        //   series: [
        //     {type: 'bar'},
        //     {type: 'bar'},
        //     {type: 'bar'}
        //   ]
        // },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        showMonth: false
      }
    },
    async mounted() {
      // 默认获取统计表
      // let histogramData = await getRegionalDimensionHistogram(this.selectedType, this.selectedSource, this.time);
      // this.histogramOption.dataset.source = histogramData.data.d;
      // let pieChartData = await getReportStaticDaithlyPieChart(this.selectedType, this.selectedSource, this.time);
      // this.pieChartOption.series[0].data = pieChartData.data.d;
      this.initTypeChart();
      // this.initSubClassChart();
    },
    methods: {
      initTypeChart() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-daily-histogram')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.histogramOption);
        // let vm = this;
        // this.chart.on('click', function (params) {
        //   vm.showMonth = true;
        //   // 控制台打印数据的名称
        //   vm.histogramOption2.dataset.source = [
        //     ['product', '平均在线时间', '告警次数', '设备数量'],
        //     ['1月', 72.4, 53.9, 39.1],
        //     ['2月', 72.4, 53.9, 39.1],
        //     ['3月', 72.4, 53.9, 39.1],
        //     ['4月', 43.3, 85.8, 93.7],
        //     ['5月', 83.1, 73.4, 55.1],
        //     ['6月', 86.4, 65.2, 82.5],
        //     ['7月', 72.4, 53.9, 39.1],
        //     ['8月', 72.4, 53.9, 39.1],
        //     ['9月', 72.4, 53.9, 39.1],
        //     ['10月', 43.3, 85.8, 93.7],
        //     ['11月', 83.1, 73.4, 55.1],
        //     ['12月', 86.4, 65.2, 82.5],
        //   ];
        //   // 异步f防止bug
        //   vm.$nextTick(() => {
        //     vm.initSubClassChart();
        //   });
        //   console.log(params.name, vm);
        // });
      },
      // initSubClassChart() {
      //   this.chart = echarts.init(document.getElementsByClassName('report-statistic-daily-histogram2')[0]);
      //   // 把配置和数据放这里
      //   this.chart.setOption(this.histogramOption2)
      // },
    },
  }
</script>

<style lang="scss" scoped>
  .time-dimension-container {
    .head-container {
      margin: 20px 50px;
    }

    .report-statistic-daily-histogram {
      height: 500px;
    }

    .report-statistic-daily-histogram2 {
      height: 500px;
    }
  }
</style>

