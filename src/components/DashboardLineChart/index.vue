<template>
  <div class="dashboard-line-chart">
    <div class="selector-container">
      设备
      <el-select v-model="tmpDeviceSelectorValue" filterable placeholder="请选择设备" @change="deviceChange">
        <el-option
          v-for="item in computedDeviceOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      属性
      <el-select v-model="tmpPropertySelectorValue" multiple collapse-tags placeholder="请选择属性" @change="searchLineChartData">
        <el-option
          v-for="item in propertySelectorOptions"
          :key="item.fieldId"
          :label="item.fieldName"
          :value="item.fieldId">
        </el-option>
      </el-select>
      <el-button type="primary" v-if="lineChecked" @click="switchToBar">切换为柱状图</el-button>
      <el-button type="success" v-if="!lineChecked" @click="switchToLine">切换为折线图</el-button>
      <!--      <el-button type="primary" plain @click="searchLineChartData">确认</el-button>-->
    </div>
    <div v-loading="chartLoading" class="dashboard-line-chart-container">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import io from 'socket.io-client';
  import {
    getDevicesApi,
    getDeviceProperty,
    getDevicePropertyData,
    getFields,
    getAffiliateFields,
    getDeviceMultiPropertyData
  } from '../../api/api';
  // const socket = io('ws://localhost:3000')
  export default {
    name: "DashboardLineChart",
    data() {
      return {
        chartLoading: false,
        lineChecked: false,
        chartType: 'bar',
        data: [98, 97, 96, 99, 101, 106, 100],
        xAxisData: ['14:43:00', '14:43:01', '14:43:02', '14:43:03', '14:43:04', '14:43:05', '14:43:06'],
        deviceSelectorOptions: [],
        deviceSelectorValue: '',
        tmpDeviceSelectorValue: '',
        propertySelectorOptions: [],
        propertySelectorValue: '',
        tmpPropertySelectorValue: [],
        chart: null,
        pollInterval: {},
        option: {
          title: {
            text: ''
          },
          tooltip: {},
          legend: {
            itemGap: 25,
            data: [
              // 'temperature', 'humidity'
            ],
          },
          toolbox: {
            show: true,
            // feature: {
            //   magicType: {type: ['line', 'bar']},
            // }
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {},
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                margin: 15,
              },
              interval: 0,
              rotate: 30
            },
            axisTick: {
              show: false,
            },
            data: this.xAxisData
          }],
          yAxis: {},
          series: [
            {
              type: 'line',
              name: '',
              label: {
                show: true,
                // position: 'top'
              },
              itemStyle: {
                normal: {}
              },
              data: this.data
            }
          ]
        },
        nullOption: {
          title: {
            text: ''
          },
          tooltip: {},
          legend: {
            itemGap: 25,
            data: [
              // 'temperature', 'humidity'
            ],
          },
          toolbox: {
            show: true,
            // feature: {
            //   magicType: {type: ['line', 'bar']},
            // }
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {},
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                margin: 15,
              },
              interval: 0,
              rotate: 30
            },
            axisTick: {
              show: false,
            },
            data: this.xAxisData
          }],
          yAxis: {},
          series: [
            {
              type: 'line',
              name: '',
              label: {
                show: true,
                // position: 'top'
              },
              itemStyle: {
                normal: {}
              },
              data: this.data
            }
          ]
        },
      }
    },
    async mounted() {
      this.initChart();
      // this.deviceSelectorOptions = ((await getDevicesApi()).data.d).map(el => {
      //   return {
      //     value: el.hardwareDeviceID,
      //     label: el.deviceName
      //   }
      // });
      console.log(this.computedDeviceOption);
      if (this.computedDeviceOption[0] != null) {
        this.tmpDeviceSelectorValue = this.computedDeviceOption[0].value;
        this.propertySelectorOptions = (await getAffiliateFields(this.tmpDeviceSelectorValue)).data.d;
        if  (this.propertySelectorOptions[0] != null) {
          this.tmpPropertySelectorValue.push(this.propertySelectorOptions[0].fieldId);
          this.searchLineChartData();
        }
      }
      // if (this.deviceSelectorOptions[0] != null) {
      //   this.tmpDeviceSelectorValue = this.deviceSelectorOptions[0].value;
      //   this.propertySelectorOptions = (await getAffiliateFields(this.tmpDeviceSelectorValue)).data.d;
      //   if (this.propertySelectorOptions[0] != null) {
      //     console.log(this.propertySelectorOptions);
      //     // this.tmpPropertySelectorValue = this.propertySelectorOptions[0].fieldId;
      //   }
      // }
      //
      // if (this.deviceSelectorOptions[0] != null && this.propertySelectorOptions[0] != null) {
      //   this.tmpDeviceSelectorValue = this.deviceSelectorOptions[0].value;
      //   this.propertySelectorOptions = (await getAffiliateFields(this.deviceSelectorOptions[0].label)).data.d;
      //   // this.tmpPropertySelectorValue = this.propertySelectorOptions[0].fieldId;
      //   // this.searchLineChartData();
      //
      // }

    },
    computed: {
      computedDeviceOption: {
        get: function () {
          return this.$store.state.device.dashboardDeviceOption.map(el => {
            return {
              value: el.hardwareDeviceID,
              label: el.deviceName
            }
          });
        }
      }
    },
    watch: {
      async computedDeviceOption(val, oldVal) {
        console.log(val);
        if (this.computedDeviceOption.length > 0) {
          this.tmpDeviceSelectorValue = this.computedDeviceOption[0].value;
          this.propertySelectorOptions = (await getAffiliateFields(this.tmpDeviceSelectorValue)).data.d;
          if  (this.propertySelectorOptions[0] != null) {
            this.tmpPropertySelectorValue.push(this.propertySelectorOptions[0].fieldId);
            this.searchLineChartData();
          }
        } else {
          this.tmpDeviceSelectorValue = '';
          this.tmpPropertySelectorValue = [];
          clearInterval(this.pollInterval);
          this.chart.setOption(this.nullOption);
        }
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementsByClassName('dashboard-line-chart-container')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.option);
        // this.chart.setOption({series:[{data: this.data}]});
      },
      async searchLineChartData() {
        this.chartLoading = true;
        if (this.tmpDeviceSelectorValue && this.tmpPropertySelectorValue) {
          this.deviceSelectorValue = this.tmpDeviceSelectorValue;
          this.propertySelectorValue = this.tmpPropertySelectorValue;
          setTimeout(async () => {
            let result = (await getDeviceMultiPropertyData(this.deviceSelectorValue, {str: this.propertySelectorValue})).data.d;
            this.setChart(result);
            // this.chart.setOption({xAxis: [{data: result.xAxis}], series: [{data: result.series}]});
          }, 200);
          this.pollInterval = setInterval(async () => {
            let result = (await getDeviceMultiPropertyData(this.deviceSelectorValue, {str: this.propertySelectorValue})).data.d;
            this.setChart(result);
            // this.chart.setOption({xAxis: [{data: result.xAxis}], series: [{data: result.series}]});
          }, 10000);
          // this.initChart();
        }
        this.chartLoading = false;
      },
      setChart(opt) {
        if (opt.length > 0) {
          let s = [];
          opt.forEach(e => {
            s.push({type: this.chartType, barGap: '0', data: e['series'], name: e['indexId'], label: {show: true}});
          });
          this.option.xAxis[0].data = opt[0].xAxis;
          this.option.series = s;
          this.option.legend = {
            data: this.propertySelectorValue
          };
          this.chart.setOption(this.option, true);
        } else {
          this.option.xAxis[0].data = [];
          this.option.series = [];
          this.option.legend = {
            data: []
          };
          this.chart.setOption(this.option, true);
        }
      },
      async deviceChange() {
        this.propertySelectorOptions = (await getAffiliateFields(this.tmpDeviceSelectorValue)).data.d;
        this.tmpPropertySelectorValue = [];

        this.searchLineChartData();
      },
      switchToLine() {
        this.chartType = 'line';
        this.searchLineChartData();
        this.lineChecked = true;
      },
      switchToBar() {
        this.chartType = 'bar';
        this.searchLineChartData();
        this.lineChecked = false;
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

  .selector-container {
    margin: 10px 0 10px 15px
  }

  .dashboard-line-chart-container {
    height: $dashboard-block-height;
    margin: 10px;
    /*padding-top: 10px;*/
  }
</style>
