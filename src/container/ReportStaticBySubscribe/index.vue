<template>
  <div>
    <div class="block">
      <span class="demonstration">账单日期</span>
      <el-date-picker
        v-model="selectedDate"
        type="year"
        placeholder="选择年">
      </el-date-picker>
    </div>
    <el-steps  :active="1"  style="margin: 20px 0"  simple>
      <el-step title="按订阅费用统计" icon="el-icon-upload"></el-step>
    </el-steps>
    <!--表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="订阅名称"
        width="250">
      </el-table-column>
      <el-table-column
        fixed
        prop="fistQuarter"
        label="第一季度"
        width="150">
      </el-table-column>
      <el-table-column
        prop="secondQuarter"
        label="第二季度"
        width="150">
      </el-table-column>
      <el-table-column
        prop="thirdQuarter"
        label="第三季度"
        width="150">
      </el-table-column>
      <el-table-column
        prop="forthQuarter"
        label="第四季度"
        width="150">
      </el-table-column>
      <el-table-column
        prop="total"
        label="年度合计"
        width="150">
      </el-table-column>
      <el-table-column
        prop="accumulativeTotal"
        label="历史累计"
        width="150">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {getReportStaticBySubscribe} from '../../api/api';
    export default {
      name: "ReportStaticBySubscribe",
      data() {
        return {
          tableData: [
            {
              name:'IOT测试',
              fistQuarter:'27,358.02',
              secondQuarter:'.0.00',
              thirdQuarter:'0.00',
              forthQuarter:'0.00',
              total:'27,358.02',
              accumulativeTotal:'71,534.21'
            },
          ],
          selectedDate: '',
        }
      },
      async mounted(){
        // 默认获取今年的统计表
        let tableData=await getReportStaticBySubscribe((new Date()).getFullYear());
        this.tableData=tableData.data.d;
      },
      methods: {
      },
      watch:{
        async 'selectedDate'(newVal,oldVal){
          console.log('manmantest',newVal.getFullYear());
          let tableData=await getReportStaticBySubscribe(newVal.getFullYear());
          this.tableData=tableData.data.d;
          // this.propertySelectorOptions=((await getDeviceProperty(newVal)).data.d).map(el=>{
          //   return {
          //     value: el.devicePropertyId,
          //     label: el.propertyName}
          // });
        }
      },
    }
</script>

<style scoped>

</style>
