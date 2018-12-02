<template>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="1">选项1</el-menu-item>
          <el-menu-item index="2">选项2</el-menu-item>
          <el-menu-item index="3">选项3</el-menu-item>
          <el-menu-item index="4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航二</span>
          </template>
          <el-menu-item index="1">选项1</el-menu-item>
          <el-menu-item index="2">选项2</el-menu-item>
          <el-menu-item index="3">选项3</el-menu-item>
          <el-menu-item index="4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航三</span>
          </template>
          <el-menu-item index="1">选项1</el-menu-item>
          <el-menu-item index="2">选项2</el-menu-item>
          <el-menu-item index="3">选项3</el-menu-item>
          <el-menu-item index="4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航四</span>
          </template>
          <el-menu-item index="1">选项1</el-menu-item>
          <el-menu-item index="2">选项2</el-menu-item>
          <el-menu-item index="3">选项3</el-menu-item>
          <el-menu-item index="4">选项4</el-menu-item>
        </el-submenu>
      </el-menu>
</template>

<script>
    export default {
      name: "Sidebar",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
