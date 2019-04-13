<template>
  <div class="report-static-by-category-container">
    <div class="head-container">
      订阅名称
      <el-select v-model="selectedType" placeholder="请选择">
        <el-option
          v-for="item in nameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      资源组
      <el-select v-model="selectedSource" placeholder="请选择">
        <el-option
          v-for="item in sourceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="demonstration">账单日期</span>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <el-col :span="14">
      <div class="grid-content bg-purple"><el-steps style="margin-top: 20px"  simple>
        <el-step title="按订阅费用统计" icon="el-icon-upload"></el-step>
      </el-steps>
        <!--表格-->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="type"
            label="资源类别"
            width="490">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额(元)"
            width="150">
          </el-table-column>
          <el-table-column
            prop="proportion"
            label="占比"
            width="150">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="grid-content bg-purple"><el-steps style="margin-top: 20px"  simple>
        <el-step title="按资源列别费用统计"></el-step>
      </el-steps>
       <div class="category-static-type-container"></div>
      </div>
      <div class="grid-content bg-purple"><el-steps style="margin-top: 20px"  simple>
        <el-step title="资源小类费用统计"></el-step>
      </el-steps>
        <div class="category-static-subClass-container"></div>
      </div>
    </el-col>
  </div>
</template>

<script>
  import {getReportStaticByCategoryTable,getReportStaticByCategoryTypeHistogram,getReportStaticByCategorySubClassHistogram} from '../../api/api';
  import echarts from 'echarts';
  export default {
    name: "ReportStaticByCategory",
    data() {
      return {
        nameOptions: [{
          value: '选项1',
          label: '类型1'
        }, {
          value: '选项2',
          label: '类型2'
        }, {
          value: '选项3',
          label: '类型3'
        }, {
          value: '选项4',
          label: '类型4'
        }, {
          value: '选项5',
          label: '类型5'
        }],
        selectedType: '',
        sourceOptions: [{
          value: '选项1',
          label: '资源1'
        }, {
          value: '选项2',
          label: '资源2'
        }, {
          value: '选项3',
          label: '资源3'
        }, {
          value: '选项4',
          label: '资源4'
        }, {
          value: '选项5',
          label: '资源5'
        }],
        selectedSource: '',
        // 时间戳数组
        time: '',
        tableData: [
          {
            type:'IOT测试',
            money:'27,358.02',
            proportion:'20%'
          },
        ],
        typeOption:{
          legend: {},
          tooltip: {},
          dataset: {
            source: []
          },
          grid: {containLabel: true},
          xAxis: {type: 'category',
              axisLabel: {
                interval:0,
                rotate:40
              }
          },
          yAxis: {name: 'amount'},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'category',
                // Map the "product" column to Y axis
                y: 'amount'
              }
            },
          ],
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            // dimension: ,
            inRange: {
              color: ['#D7DA8B', '#E15457']
            }
          },
        },
        subClassOption:{
          color: ['#49cadb'],
          dataset: {
            source: []
          },
          grid: {containLabel: true},
          xAxis: {name: 'amount'},
          yAxis: {type: 'category'},
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product'
              }
            }
          ]
        }
      }
    },
    async mounted(){
      // 默认获取统计表
      let tableData=await getReportStaticByCategoryTable(this.selectedType,this.selectedSource,this.time);
      this.tableData=tableData.data.d;
      let histogramData=await getReportStaticByCategoryTypeHistogram(this.selectedType,this.selectedSource,this.time);
      this.typeOption.dataset.source=histogramData.data.d;
      let subClassHistogramData=await getReportStaticByCategorySubClassHistogram(this.selectedType,this.selectedSource,this.time);
      this.subClassOption.dataset.source=subClassHistogramData.data.d;
      this.initTypeChart();
      this.initSubClassChart();
    },
    methods:{
      initTypeChart() {
        this.chart = echarts.init(document.getElementsByClassName('category-static-type-container')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.typeOption)
      },
      initSubClassChart() {
        this.chart = echarts.init(document.getElementsByClassName('category-static-subClass-container')[0]);
        // 把配置和数据放这里
        this.chart.setOption(this.subClassOption)
      },
    },
    computed: {
      listenChange () {
        const {selectedType,selectedSource,time} = this
        return {selectedType,selectedSource,time}
      }
    },
    watch:{
      //监听所有的选择器
      async 'listenChange'(newVal,oldVal){
        let tableData=await getReportStaticByCategoryTable(newVal,this.selectedSource,this.time);
        this.tableData=tableData.data.d;
        let histogramData=await getReportStaticByCategoryTypeHistogram(this.selectedType,this.selectedSource,this.time);
        this.typeOption.dataset.source=histogramData.data.d;
        let subClassHistogramData=await getReportStaticByCategorySubClassHistogram(this.selectedType,this.selectedSource,this.time);
        this.subClassOption.dataset.source=subClassHistogramData.data.d;
        this.initTypeChart();
        this.initSubClassChart();
      }
    },
  }
</script>

<style lang="scss" scoped>
  .report-static-by-category-container {
    .head-container {
      margin-top: 20px;
    }
    .category-static-type-container{
      height: 300px;
    }
    .category-static-subClass-container{
      height: 600px;
    }
  }
</style>
