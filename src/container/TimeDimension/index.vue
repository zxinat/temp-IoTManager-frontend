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
      <el-col :span="22">
        <div class="report-statistic-daily-histogram">
        </div>
      </el-col>
    </el-row>
    <!--<el-steps style="margin: 20px 0" simple>-->
    <!--<el-step title="资源类别统计" icon="el-icon-upload"></el-step>-->
    <!--</el-steps>-->

    <el-row>
      <el-col :span="22">
        <div v-show="showMonth" class="report-statistic-daily-histogram2">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    name: "TimeDimension",
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
          xAxis: {
            type: 'category',
            data: ['2014', '2015', '2016', '2017', '2018', '2019']
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
            data: [43.3, 83.1, 86.4, 72.4, 72.40, 110],
            type: 'bar',
            barWidth: 20
          }, {
            name: '告警次数',
            data: [85.8, 73.4, 65.2, 53.9, 70, 11],
            type: 'bar',
            barWidth: 20
          }, {
            name: '设备数量',
            data: [93.7, 55.1, 82.5, 39.1, 70, 20],
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
                  var wb = XLSX.utils.table_to_book(document.querySelector('#report-statistic-daily-table'))
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
                  var table = '<table id="report-statistic-daily-table" border="1" class="table-bordered table-striped" style="width:80%;text-align:center" ><tbody><tr>' + tdHeads + ' </tr>';
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
        histogramOption2: {
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
            data: [43.3, 83.1, 86.4, 72.4, 72.40, 110, 43.3, 83.1, 86.4, 72.4, 72.40, 110],
            type: 'bar',
          }, {
            name: '告警次数',
            data: [85.8, 73.4, 65.2, 53.9, 70, 11, 85.8, 73.4, 65.2, 53.9, 70, 11],
            type: 'bar',
          }, {
            name: '设备数量',
            data: [93.7, 55.1, 82.5, 39.1, 70, 20, 93.7, 55.1, 82.5, 39.1, 70, 20],
            type: 'bar',
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
                  var wb = XLSX.utils.table_to_book(document.querySelector('#report-statistic-daily-table2'))
                  /* get binary string as output */
                  var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
                  try {
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '按月维度.xlsx')
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
                  var table = '<table id="report-statistic-daily-table2" border="1" class="table-bordered table-striped" style="width:80%;text-align:center" ><tbody><tr>' + tdHeads + ' </tr>';
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
        // 左边栏数据
        treeData: [{
          "label": "上海",
          "children": [{
            "label": "工厂1",
            "children": [{
              "label": "车间1",
            }]
          }, {
            "label": "工厂2",
            "children": [{
              "label": "车间2",
            }]
          }, {
            "label": "工厂3",
            "children": [{
              "label": "车间3",
            }]
          }]
        }, {
          "label": "长沙",
          "children": [{
            "label": "工厂1",
            "children": [{
              "label": "车间1",
            }]
          }, {
            "label": "工厂2",
            "children": [{
              "label": "车间2",
            }]
          }, {
            "label": "工厂3",
            "children": [{
              "label": "车间3",
            }]
          }]
        }, {
          "label": "武汉",
          "children": [{
            "label": "工厂1",
            "children": [{
              "label": "车间1",
            }]
          }, {
            "label": "工厂2",
            "children": [{
              "label": "车间2",
            }]
          }, {
            "label": "工厂3",
            "children": [{
              "label": "车间3"
            }]
          }]
        }],
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
        let vm = this;
        this.chart.on('click', function (params) {
          vm.showMonth = true;
          // 控制台打印数据的名称
          vm.histogramOption2.series[0].data = [43.3, 83.1, 86.4, 72.4, 72.40, 110, 43.3, 83.1, 86.4, 72.4, 72.40, 110];
          vm.histogramOption2.series[1].data = [85.8, 73.4, 65.2, 53.9, 70, 11, 85.8, 73.4, 65.2, 53.9, 70, 11];
          vm.histogramOption2.series[2].data = [93.7, 55.1, 82.5, 39.1, 70, 20, 93.7, 55.1, 82.5, 39.1, 70, 20];

          // 异步f防止bug
          vm.$nextTick(() => {
            vm.initSubClassChart();
          });
          console.log(params.name, vm);
        });
      },
      initSubClassChart() {
        this.chart = echarts.init(document.getElementsByClassName('report-statistic-daily-histogram2')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.histogramOption2)
      },
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

