<template>
  <div class="monitoring-tree-container">
    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
  import {getDeviceTreeApi,getDeviceApi} from '../../api/api';

  export default {
    name: "MonitoringTree",
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      async handleNodeClick(data) {
        console.log(data);
          if(data.id){
            const result= (await getDeviceApi(data.id)).data.d;
            this.$store.dispatch('device/setCurrentDeviceData',result);
          }
      },
      async getDeviceTree() {
        // await this.$store.dispatch('device/setDeviceTree');
        const data = await getDeviceTreeApi();
        this.treeData = data.data.d;
      }

    },
    mounted() {
      this.getDeviceTree();
    }
  }
</script>

<style scoped>
  .monitoring-tree-container {
  }
</style>
