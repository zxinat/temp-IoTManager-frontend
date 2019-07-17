<template>
    <div class="container">
      <h3>设备数据信息（只显示最新10条）</h3>
      <el-table
        :data="deviceData.deviceData"
        stripe
        style="width: 80%; margin: 5px">
        <el-table-column
          prop="deviceId"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="indexName"
          label="设备属性">
        </el-table-column>
        <el-table-column
          prop="indexValue"
          label="属性数值">
        </el-table-column>
        <el-table-column
          prop="indexUnit"
          label="属性单位">
        </el-table-column>
      </el-table>
      <!--<el-row>-->
        <!--<el-col :span="8" :offset="6">-->
          <!--<el-form ref="form" :model="form" label-width="100px">-->
            <!--<el-form-item label="设备名称">-->
              <!--<el-input v-model="form.deviceName"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="设备编号">-->
              <!--<el-input v-model="form.hardwareDeviceID"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="设备类型">-->
              <!--<el-input v-model="form.deviceType"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="GLOBAL.firstLevel">-->
              <!--<el-input v-model="form.city"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="GLOBAL.secondLevel">-->
              <!--<el-input v-model="form.factory"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="报警容错次数">-->
              <!--<el-input v-model="form.faultTolerantNumber"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="保存分钟间隔">-->
              <!--<el-input v-model="form.saveInterval"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
              <!--<el-button type="primary" @click="onSubmit">保存修改</el-button>-->
              <!--<el-button>放弃修改</el-button>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        <!--</el-col>-->
      <!--</el-row>-->
    </div>
</template>

<script>
  import {updateDeviceApi} from '../../api/api';

  export default {
        name: "DeviceProperty",
      data(){
        return {
          form: {
            "id": "1",
            "hardwareDeviceID": "001",
            "deviceName": "拉丝设备",
            "city": "上海",
            "factory": "某工厂",
            "workshop": "某车间",
            "deviceState": "正常",
            "LastConnectionTime": "2018-9-9",
            "imageUrl": "",
            "gatewayID": "T001",
            "mac": "",
            "address": [121.47, 31.23],
            "deviceType": "类型1",
            "createTime": "2018-1-1",
            "updateTime": "2818-9-10",
            "remark": "描述描述",
            "startTime": "2018-9-9 14:00:00",
            "runningTime": "1:30:30s",
            "alarmTimes": "18次",
            "recentAlarmTime": "2019-5-9 14:00:00",
            "temperature": "25℃",
            "humidity": "80%",
            "faultTolerantNumber": '2',
            "saveInterval": '3s'
          }
        }
      },
    computed:{
      deviceData:{
        // getter
        get: function () {
          return this.$store.state.device.currentDeviceData;
        },
        // setter
        set: function (newValue) {
          console.log('newvalue',newValue)
        }
      }
    },
      methods: {
        onSubmit() {
          this.deviceData=this.form;
        }
      },
      mounted(){
        this.form=this.deviceData;
      }
    }
</script>

<style scoped>
.container{
  margin-top: 10px;
}
</style>
