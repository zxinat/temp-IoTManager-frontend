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
    <el-row>
      <div class="report-statistic-daily-histogram">
      </div>
    </el-row>
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
          xAxis: {
            type: 'category',
            data: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6','tag7','tag8']
          },
          legend: {
            show: true,
            data: ['平均在线时间', '告警次数', '设备数量']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '平均在线时间',
            data: [43.3, 83.1, 86.4, 72.4, 72.40, 110,43.3, 83.1],
            type: 'bar',
            barWidth: 20
          },{
            name: '告警次数',
            data: [43.3, 83.1, 6.4, 72.4, 72.40, 110,43.3, 3.1],
            type: 'bar',
            barWidth: 20
          },{
            name: '设备数量',
            data: [43.3, 83.1, 86.4, 2.4, 72.40, 110,43.3, 83.1],
            type: 'bar',
            barWidth: 20
          }],
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: true,
                title: '数据视图',
                //readOnly: true, //设置只读，会隐藏刷新按钮。
                lang: ['数据视图', '关闭', '导出Excel'],
                contentToOption: function (opts) {
                  /* generate workbook object from table */
                  var wb = XLSX.utils.table_to_book(document.querySelector('#tag-dimension-table'))
                  /* get binary string as output */
                  var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
                  try {
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '按年维度.xlsx')
                  } catch (e) {
                    if (typeof console !== 'undefined') console.log(e, wbout)
                  }
                  return wbout
                },
                optionToContent: function (opt) {
                  // console.log(opt);

                  var axisData = opt.xAxis[0].data; //坐标数据
                  var series = opt.series; //折线图数据
                  var tdHeads = '<td  style="padding: 0 10px">车间</td>'; //表头第一列
                  var tdBodys = ''; //表数据
                  //组装表头
                  var nameData = new Array('平均在线时间', '告警次数', '设备数量');
                  for (var i = 0; i < nameData.length; i++) {
                    tdHeads += '<td style="padding: 0 10px">' + nameData[i] + '</td>';
                  }
                  var table = '<table id="tag-dimension-table" border="1" class="table-bordered table-striped" style="width:80%;text-align:center" ><tbody><tr>' + tdHeads + ' </tr>';
                  //组装表数据
                  for (let i = 0, l = axisData.length; i < l; i++) {
                    for (let j = 0; j < series.length; j++) {
                      var temp = series[j].data[i];
                      if (temp != null && temp != undefined) {
                        tdBodys += '<td>' + temp.toFixed(2) + '</td>';
                      } else {
                        tdBodys += '<td></td>';
                      }
                    }
                    table += '<tr><td style="padding: 0 10px">' + axisData[i] + '</td>' + tdBodys + '</tr>';
                    tdBodys = '';
                  }
                  table += '</tbody></table>';
                  // console.log(table);
                  return table;
                }
              },
              saveAsImage: {show: true}
            }
          },
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

