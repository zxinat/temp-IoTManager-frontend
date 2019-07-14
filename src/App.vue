<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    height: 100%;
  }
  html,body{
    display: block;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }
  /*更改最大高度*/
  .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    max-height: 70px;
    overflow: auto;
  }
</style>
