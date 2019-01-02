<template>
  <div class="monitoring-device-card-container">
    <el-row>
      <el-col :span="8" :offset="1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <img src="../../assets/img/chilunzu.svg">
            <span>属性信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div  class="text item">
            {{'设备名称：'+deviceName}}
          </div>
          <div  class="text item">
            {{'设备编号：'+hardwareDeviceID}}
          </div>
          <div  class="text item">
            {{'设备类型：'+deviceType}}
          </div>
          <div  class="text item">
            {{'东经：    '+deviceName}}
          </div>
          <div  class="text item">
            {{'北纬：    '+deviceName}}
          </div>
          <div  class="text item">
            {{'设备状态：'+deviceState}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/img/cat.jpg" class="image">
          <div style="padding: 14px;">
            <span>设备快照</span>
            <div class="bottom clearfix">
              <time class="time">{{updateTime}}</time>
              <!--<el-button class="button">操作按钮</el-button>-->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MonitoringDeviceCard",
    data(){
      return {
        "id": "1",
        "hardwareDeviceID": "001",
        "deviceName": "设备1",
        "city": "上海",
        "factory": "某工厂",
        "workshop": "某车间",
        "deviceState": "正常",
        "LastConnectionTime": "2018-9-9",
        "imageUrl": "",
        "gatewayID": "T001",
        "mac": "",
        "deviceType": "类型1",
        "createTime": "2018-1-1",
        "updateTime": "2818-9-10",
        "remark": "描述描述"
      }
    }
  }
</script>

<style lang="scss" scoped>
  .monitoring-device-card-container {
    padding: 2%;
    .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
    .box-card{
      height: 100%;
    }
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      padding: 1%;
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }
  }
</style>
