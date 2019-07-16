<template>
  <div class="dashboard-line-chart">
    <div class="selector-container">
      设备
      <el-select v-model="tmpDeviceSelectorValue" placeholder="请选择设备">
        <el-option
          v-for="item in deviceSelectorOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      属性
      <el-select v-model="tmpPropertySelectorValue" placeholder="请选择属性">
        <el-option
          v-for="item in propertySelectorOptions"
          :key="item.id"
          :label="item.fieldName"
          :value="item.fieldId">
        </el-option>
      </el-select>
      <el-button type="primary" plain @click="searchLineChartData">确认</el-button>
    </div>
    <div class="dashboard-line-chart-container">
    <!--<h2>-->
    <!--折线图-->
    <!--</h2>-->
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import io from 'socket.io-client';
  import {getDevicesApi, getDeviceProperty, getDevicePropertyData, getFields} from '../../api/api';
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
        tmpPropertySelectorValue: '',
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
              lineStyle: {
              },
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
              normal: {
              }
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
      // socket.emit('open');
      this.initChart();
      // socket.on('updateData', data => {
      //   this.option.series[0].data.shift();
      //   this.option.series[0].data.push(parseInt(data.value));
      //   this.option.xAxis.data.shift();
      //   this.option.xAxis.data.push(data.time);
      //   this.initChart();
      // });
      this.deviceSelectorOptions=((await getDevicesApi()).data.d).map(el=>{
        return {
          value: el.hardwareDeviceID,
          label: el.deviceName}
      });
      this.propertySelectorOptions=(await getFields()).data.d;
    },
    watch:{
      async 'deviceSelectorValue'(newVal,oldVal){
        // console.log('manmantest',newVal);
        this.propertySelectorOptions=((await getDeviceProperty(newVal)).data.d).map(el=>{
          return {
            value: el.devicePropertyId,
            label: el.propertyName}
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
      async searchLineChartData(){
        if(this.tmpDeviceSelectorValue&&this.tmpPropertySelectorValue){
          //获取数据
          // this.option.series=result.map(el=>{
          //   return {
          //     type: 'line',
          //     name: el.name,
          //     label: {
          //       show:true
          //     },
          //     data: el.data
          //   }
          // });
          // this.option.legend.data=result.map(el=>{
          //   return el.name;
          // });
          this.deviceSelectorValue = this.tmpDeviceSelectorValue;
          this.propertySelectorValue = this.tmpPropertySelectorValue;
          setTimeout(async () => {
            let result= (await getDevicePropertyData(this.deviceSelectorValue,this.propertySelectorValue)).data.d;
            this.chart.setOption({xAxis: [{data: result.xAxis}], series:[{data: result.series}]});
          }, 200);
          setInterval(async () => {
            let result= (await getDevicePropertyData(this.deviceSelectorValue,this.propertySelectorValue)).data.d;
            this.chart.setOption({xAxis: [{data: result.xAxis}], series:[{data: result.series}]});
          }, 10000);
          this.initChart();
        }

        // this.initChart();

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
  .selector-container{
    margin: 10px 0 10px 10px
  }
  .dashboard-line-chart-container {
    height: $dashboard-block-height;
    margin: 10px;
    /*padding-top: 10px;*/
  }
</style>
