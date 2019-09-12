<template>
  <div class="monitoring-device-card-container">
    <el-row>
      <el-col style="margin: 5px; width: 45%; float: left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <img src="../../assets/img/chilunzu.svg">
            <span>属性信息</span>
          </div>
          <div  class="text item">
            {{'设备名称：'+deviceData.deviceName}}
          </div>
          <div  class="text item">
            {{'设备编号：'+deviceData.hardwareDeviceID}}
          </div>
          <div  class="text item">
            {{'设备类型：'+deviceData.deviceType}}
          </div>
          <!--<div  class="text item">-->
            <!--{{'东经：    '+deviceData.deviceName}}-->
          <!--</div>-->
          <!--<div  class="text item">-->
            <!--{{'北纬：    '+deviceData.deviceName}}-->
          <!--</div>-->
          <div  class="text item">
            {{'设备状态：'+deviceData.deviceState}}
          </div>
        </el-card>
      </el-col>
      <el-col style="margin: 5px;  width: 45%; float: left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <img src="../../assets/img/chilunzu.svg">
            <span>设备状态</span>
          </div>
          <div  class="text item">
            {{'启动时间：'+deviceData.startTime}}
          </div>
          <div  class="text item">
            {{'运行时长：'+deviceData.runningTime}}
          </div>
          <div  class="text item">
            {{'报警次数：'+deviceData.alarmTimes}}
          </div>
          <div  class="text item">
            {{'最近报警时间：'+deviceData.recentAlarmTime}}
          </div>
          <!--<div  class="text item">-->
            <!--{{'温度：'+deviceData.temperature}}-->
          <!--</div>-->
          <!--<div  class="text item">-->
            <!--{{'湿度：'+deviceData.humidity}}-->
          <!--</div>-->
        </el-card>
      </el-col>
      <el-col style="margin: 5px; width: 30%; float: left;">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
        <div slot="header" class="clearfix" style="padding: 5px;">
          <img src="../../assets/img/chilunzu.svg">
          <span>设备快照</span>
        </div>
        <div>
          <!--<img v-if="!deviceData.imageUrl" src="../../assets/img/equipment.png" class="image">-->
          <img :src="deviceData['base64Image']" class="image">
        </div>
        </el-card>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          name="picture"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="handleUpload"
          :show-file-list="false">
          <el-button size="small" type="primary" class="upLoadButton">点击上传</el-button>
        </el-upload>
      </el-col>
      <el-col style="margin: 5px; width: 60%; float: left;">
        <el-card>
          <MonitoringMap></MonitoringMap>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import UploadImg from "../UploadImg/index";
  import MonitoringMap from "../MonitoringMap/index";
  import {getPicture, uploadPicture} from "../../api/api";
  export default {
    name: "MonitoringDeviceCard",
    components: {MonitoringMap, UploadImg},
    data(){
      return {
        imgData: '',
        deviceId: '',
        pic:'',
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
    watch:{
    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      async handleUpload(response, file) {
        let reader = new FileReader();
        let base64 = '';
        reader.readAsDataURL(file.raw);
        reader.onload = async () => {
          base64 = reader.result;
          const result = (await uploadPicture({deviceId: this.deviceData.hardwareDeviceID, picture: base64})).data.c;
          if (result === 200) {
            this.$message.success('上传成功');
          }
        };
      }
    },
    async mounted(){
    }
  }
</script>

<style lang="scss" scoped>
  .upLoadButton {
    margin-top: 5px;
    margin-left: 100px;

  }
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
      width: 80%;
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
