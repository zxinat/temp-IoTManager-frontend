<template>
    <div class="monitoring-tree-container">
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
  import {getDeviceTreeApi} from '../../api/api';
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
        handleNodeClick(data) {

        },
        async getDeviceTree(){
          // await this.$store.dispatch('device/setDeviceTree');
          const data=await getDeviceTreeApi();
          this.treeData=data.data.d;
        }

      },
      mounted(){
        this.getDeviceTree();
      }
    }
</script>

<style scoped>
.monitoring-tree-container{
}
</style>
