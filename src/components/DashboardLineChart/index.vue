<template>
  <div class="dashboard-line-chart">
    <div class="selector-container">
      设备
      <el-select v-model="tmpDeviceSelectorValue" filterable placeholder="请选择设备" @change="deviceChange">
        <el-option
          v-for="item in deviceSelectorOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      属性
      <el-select v-model="tmpPropertySelectorValue" multiple placeholder="请选择属性">
        <el-option
          v-for="item in propertySelectorOptions"
          :key="item.fieldId"
          :label="item.fieldName"
          :value="item.fieldId">
        </el-option>
      </el-select>
      <el-button type="primary" plain @click="searchLineChartData">确认</el-button>
    </div>
    <div class="dashboard-line-chart-container">
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
        data: [98, 97, 96, 99, 101, 106, 100],
        xAxisData: ['14:43:00', '14:43:01', '14:43:02', '14:43:03', '14:43:04', '14:43:05', '14:43:06'],
        deviceSelectorOptions: [],
        deviceSelectorValue: '',
        tmpDeviceSelectorValue: '',
        propertySelectorOptions: [],
        propertySelectorValue: '',
        tmpPropertySelectorValue: [],
        chart: null,
        option: {
          title: {
            text: 'Telemetry History'
          },
          tooltip: {},
          legend: {
            itemGap: 25,
            data: [
              // 'temperature', 'humidity'
            ],
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
              interval: 0
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
              name: 'Value',
              label: {
                show: true,
                // position: 'top'
              },
              itemStyle: {
                normal: {}
              },
              data: this.data
            }
            // ,
            //   {
            //   type: 'line',
            //   name: 'humidity',
            //   label: {
            //     show:true
            //   },
            //   data: [200.500, 382, 102, 267, 186, 315, 316]
            // }
          ]
        },
      }
    },
    async mounted() {
      this.initChart();
      this.deviceSelectorOptions = ((await getDevicesApi()).data.d).map(el => {
        return {
          value: el.hardwareDeviceID,
          label: el.deviceName
        }
      });
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
    watch: {
      async 'deviceSelectorValue'(newVal, oldVal) {
        // console.log('manmantest',newVal);
        this.propertySelectorOptions = ((await getDeviceProperty(newVal)).data.d).map(el => {
          return {
            value: el.devicePropertyId,
            label: el.propertyName
          }
        });
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
        if (this.tmpDeviceSelectorValue && this.tmpPropertySelectorValue) {
          this.deviceSelectorValue = this.tmpDeviceSelectorValue;
          this.propertySelectorValue = this.tmpPropertySelectorValue;
          setTimeout(async () => {
            let result = (await getDeviceMultiPropertyData(this.deviceSelectorValue, {str: this.propertySelectorValue})).data.d;
            this.setChart(result);
            // this.chart.setOption({xAxis: [{data: result.xAxis}], series: [{data: result.series}]});
          }, 200);
          setInterval(async () => {
            let result = (await getDeviceMultiPropertyData(this.deviceSelectorValue, {str: this.propertySelectorValue})).data.d;
            this.setChart(result);
            // this.chart.setOption({xAxis: [{data: result.xAxis}], series: [{data: result.series}]});
          }, 10000);
          // this.initChart();
        }
      },
      setChart(opt) {
        let s = [];
        opt.forEach(e => {
          s.push({type: 'line', data: e['series'], name: e['indexId'], label: {show: true}});
        });
        this.chart.setOption({xAxis:[{data: opt[0].xAxis}], series: s, legend: {data: this.propertySelectorValue}});
      },
      async deviceChange() {
        this.propertySelectorOptions = (await getAffiliateFields(this.tmpDeviceSelectorValue)).data.d;
        this.tmpPropertySelectorValue = [];
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
    margin: 10px 0 10px 10px
  }

  .dashboard-line-chart-container {
    height: $dashboard-block-height;
    margin: 10px;
    /*padding-top: 10px;*/
  }
</style>
