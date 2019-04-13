<template>
    <div>
      <el-steps  :active="1" style="margin: 20px 0"  simple>
        <el-step title="月度费用报告" icon="el-icon-upload"></el-step>
      </el-steps>
      <!--表格-->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="order"
          label="序号"
          width="150">
        </el-table-column>
        <el-table-column
          fixed
          prop="date"
          label="月份"
          width="150">
        </el-table-column>
        <el-table-column
          prop="initialBalance"
          label="期初余额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="monthFree"
          label="本月费用"
          width="150">
        </el-table-column>
        <el-table-column
          prop="newPurchasesThisMonth"
          label="本月新购买"
          width="150">
        </el-table-column>
        <el-table-column
          prop="adjustThisMonth"
          label="本月调整"
          width="150">
        </el-table-column>
        <el-table-column
          prop="endingBalance"
          label="期末余额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="OverchargeThisMonth"
          label="本月超额费用"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="checkReport(scope.row)" type="primary" plain size="small">查看报告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--报表细节-->
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="monthlyReport">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
</template>

<script>
  import {getReportOfMonthlyExpense,checkMonthlyReport} from '../../api/api';
    export default {
      name: "ReportOfMonthlyExpense",
      data() {
        return {
          tableData: [],
          dialogTableVisible:false,
          monthlyReport: []
        }
      },
      async mounted(){
        let tableData=await getReportOfMonthlyExpense();
        this.tableData=tableData.data.d;
      },
      methods: {
        async checkReport(row) {
          let data=await checkMonthlyReport(row.order,row.date);
          console.log(data);
          this.monthlyReport=data.data.d;
          this.dialogTableVisible=true;
        }
      },
    }
</script>

<style scoped>

</style>
