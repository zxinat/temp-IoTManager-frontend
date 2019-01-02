<template>
    <h1>注册成功，即将在{{this.time}}秒转到登陆界面······</h1>
</template>

<script>
    export default {
        name: "RegisterSuccess",
        data(){
          return {
            time:3
          }
        },
      mounted(){
          setTimeout(()=>{
            this.$router.push('/login');
          },this.time*1000);
      }
    }
</script>

<style scoped>

</style>
