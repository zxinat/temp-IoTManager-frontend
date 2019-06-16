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
    </el-form>
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

        form:{
          city: '上海',
          factory: '南洋万邦',
        }

      }
    },
    methods:{
      filter(){
        console.log(this.form);
        //调接口，传form参数
      },
      getCityList(){
        // 调获取城市接口
      },
      getFactoryList(){
        console.log(this.form.city);
        // 调获取工厂接口，传form.city参数
      },
    },
    mounted() {
      this.getCityList();
    },
    components: {MonitoringConfig, MonitoringTree},
  }
</script>

<style scoped>
.header{
  margin: 10px;
}
</style>
