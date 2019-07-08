<template>
  <div>
    <el-form :inline="true" :model="form" class="header">
      <el-form-item label="城市">
        <el-select v-model="form.city" @change="getFactoryList" placeholder="上海">
          <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工厂">
        <el-select v-model="form.factory" placeholder="南洋万邦">
          <el-option
            v-for="item in factoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="filter"><img src="../../assets/img/find.svg">筛选</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="showExportDeviceData = true">导出设备数据</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="showAlarmRules=true">定义报警规则</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择导出数据时间范围"
      :visible.sync="showExportDeviceData"
      width="30%"
      center>
      <el-date-picker
        v-model="exportDeviceTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showExportDeviceData = false">取 消</el-button>
    <el-button type="primary" @click="exportDeviceData()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建规则" :visible.sync="showAlarmRules">
      <el-form ref="alarmRulesForm" :model="alarmRules" label-width="80px">
        <el-form-item prop="name" label="规则名称" :rules="[{ required: true, message: '名称不能为空'}]">
          <el-input v-model="alarmRules.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规则描述">
          <el-input type="textarea" v-model="alarmRules.description"></el-input>
        </el-form-item>
        <el-form-item prop="deviceGroup" label="设备" :rules="[{ required: true, message: '项目必选'}]">
          <el-select  @change="getAffectNumber()" v-model="alarmRules.deviceGroup" placeholder="请选择设备">
            <el-option
              v-for="item in devices"
              :key="item.id"
              :label="item.deviceName"
              :value="item.hardwareDeviceID">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<template v-for="(item,index) in alarmRules.condition">-->
          <!--<h3 style="margin-left: 10px">规则{{index+1}}</h3>-->
          <!--<el-form-item :prop="'condition.' + index + '.field'" label="告警属性" :rules="[{ required: true, message: '属性名称必选'}]">-->
          <!--<el-form-item :prop="'condition.' + index + '.field'" label="告警属性" :rules="[{ required: true, message: '属性名称必选'}]">-->
          <el-form-item prop="field" label="告警属性" :rules="[{ required: true, message: '告警属性必选'}]">
            <el-select v-model="alarmRules.field" placeholder="请选择告警属性">
              <el-option
                v-for="item in fieldOptions"
                :key="item.id"
                :label="item.fieldName"
                :value="item.fieldId"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item :prop="'condition['+index+'].operator'" label="运算" :rules="[{ required: true, message: '运算方式必选'}]">-->
          <el-form-item prop="Operator" label="运算" :rules="[{ required: true, message: '运算方式必选'}]">
            <el-select v-model="alarmRules.Operator" placeholder="请选择运算">
              <el-option label="=" value="equal"></el-option>
              <el-option label=">" value="greater"></el-option>
              <el-option label="<" value="less"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item :prop="'condition['+index+'].value'" label="报警阈值" :rules="[{ required: true, message: '报警阈值必选'}]">-->
          <el-form-item prop="value" label="报警阈值" :rules="[{ required: true, message: '报警阈值必选'}]">
            <el-input v-model="alarmRules.value"></el-input>
          </el-form-item>
        <!--</template>-->
        <!--<el-form-item label="添加规则">-->
          <!--<el-button type="primary" @click="addCondition"><i class="el-icon-circle-plus-outline"></i></el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="严重等级">-->
          <!--<el-radio-group v-model="alarmRules.severityLevel">-->
            <!--<el-radio label="critical" name="critical"></el-radio>-->
            <!--<el-radio label="warning" name="warning"></el-radio>-->
            <!--<el-radio label="info" name="info"></el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="开启规则">-->
          <!--<el-switch v-model="alarmRules.ruleStatus"></el-switch>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="邮件通知">-->
          <!--<el-switch v-model="alarmRules.email"></el-switch>-->
        <!--</el-form-item>-->
      </el-form>
      <hr/>
      <h1>总结</h1>
      <h1 style="display: inline-block;margin-left: 10px">{{alarmRules.affectNumber}}</h1>个设备被此规则控制
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAlarmRules = false">取 消</el-button>
        <el-button type="primary" @click="submitAlarmRules">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-col :span="3">
        <MonitoringTree></MonitoringTree>
      </el-col>
      <el-col :span="21">
        <monitoring-config></monitoring-config>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MonitoringTree from "../../components/MonitoringTree/index";
  import MonitoringConfig from "../../components/MonitoringConfig/index";
  import {addRule, getDevicesApi, getFields} from "../../api/api";

  export default {
    name: "MonitoringConfiguration",
    data() {
      return {
        cityOptions: [{
          value: '选项1',
          label: '城市1'
        }, {
          value: '选项2',
          label: '城市2'
        }, {
          value: '选项3',
          label: '城市3'
        }, {
          value: '选项4',
          label: '城市4'
        }, {
          value: '选项5',
          label: '城市5'
        }],

        factoryOptions: [{
          value: '选项1',
          label: '工厂1'
        }, {
          value: '选项2',
          label: '工厂2'
        }, {
          value: '选项3',
          label: '工厂3'
        }, {
          value: '选项4',
          label: '工厂4'
        }, {
          value: '选项5',
          label: '工厂5'
        }],
        fieldOptions: [],
        devices: [],

        form: {
          city: '上海',
          factory: '南洋万邦',
        },
        // 弹框
        showExportDeviceData: false,
        exportDeviceTime: [],
        showAlarmRules: false,
        alarmRules: {
          name: '',
          description: '',
          deviceGroup: '',
          // condition: [{
          //   field: '',
          //   operator: '',
          //   value: '',
          //   severityLevel: '',
          //   ruleStatus: ''
          // }],
          field: '',
          Operator: '',
          value: '',
          // affectNumber: 0
        },
        deviceGroupOptions: [{
          value: '0',
          label: '全部设备'
        }, {
          value: '1',
          label: '温度传感器'
        },]
      }
    },
    methods: {
      filter() {
        console.log(this.form);
        //调接口，传form参数
      },
      getCityList() {
        // 调获取城市接口
      },
      getFactoryList() {
        console.log(this.form.city);
        // 调获取工厂接口，传form.city参数
      },
      exportDeviceData() {
        //导出设备数据接口，传入exportDeviceTime参数，返回内容格式如jsondata
        const jsonData = [
          {
            time: '2018-08-09',
            max: 80,
            min: 10,
            average: 30
          },
          {
            time: '2018-08-10',
            max: 80,
            min: 10,
            average: 30
          },
          {
            time: '2018-08-11',
            max: 80,
            min: 10,
            average: 30
          },
          {
            time: '2018-08-12',
            max: 80,
            min: 10,
            average: 30
          },
        ]
        //列标题，逗号隔开，每一个逗号就是隔开一个单元格
        let str = `日期,最大值,最小值,平均值\n`;
        //增加\t为了不让表格显示科学计数法或者其他格式
        for (let i = 0; i < jsonData.length; i++) {
          for (let item in jsonData[i]) {
            str += `${jsonData[i][item] + '\t'},`;
          }
          str += '\n';
        }
        console.log(str);
        //encodeURIComponent解决中文乱码
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        //通过创建a标签实现
        let link = document.createElement("a");
        link.href = uri;
        //对下载的文件命名
        link.download = "json数据表.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      submitForm(formName) {
        // console.log(this.$refs[formName]);
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(this.alarmRules);
            let res = await addRule(this.alarmRules);
            this.showAlarmRules=false;
            if(res.data.d === "success") {
              this.$message.success('新增规则成功');
            }
            return true;
          } else {
            return false;
          }
        });
      },
      submitAlarmRules() {
        this.submitForm('alarmRulesForm')
          // 调用提交规则接口，参数alarmRules。
      },
      addCondition() {
        this.alarmRules.condition.push({
          field: '',
          operator: '',
          value: '',
          severityLevel: '',
          ruleStatus: ''
        });
      },
      getAffectNumber() {
        // 接口，获取受影响的设备数，传入alarmRules.deviceGroup,获取的结果返回
        // let result = 13; //要被替换
        // this.alarmRules.affectNumber=result;
      },
      async getField() {
        this.fieldOptions = (await getFields()).data.d;
      },
      async getDevices() {
        this.devices = (await getDevicesApi()).data.d;
        console.log(this.devices);
      }
    },
    mounted() {
      this.getCityList();
      this.getField();
      this.getDevices();
    },
    components: {MonitoringConfig, MonitoringTree},
  }
</script>

<style scoped>
  .header {
    margin: 10px;
  }
</style>
