<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-form">
        <h2>登录</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="用户类别">-->
            <!--<el-select v-model="form.type" placeholder="请选择用户类别">-->
              <!--<el-option label="普通用户" value="normal"></el-option>-->
              <!--<el-option label="管理用户" value="management"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-button type="primary" @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginApi} from './index.api';
export default {
  name: 'Login',
  data(){
    return {
      form: {
        name: '',
        pwd: '',
        type:'',
      }
    }
  },
  computed:{

  },
  methods:{
    async login(){
      console.log(this.form.name)
      const res=await loginApi(this.form);
      await this.$store.dispatch('userInfo/setUserInfo',this.form);
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
  .login-container{
    width:100%;
    height:100%;
    margin: 0px auto;
    display: table;
  }
  .login-box{
    display: table-cell;
    vertical-align: middle;
  }
  .login-form{
    width: 25%;
    margin: auto;
    padding: 2% 2%;
    border: 1px solid gray;
    border-radius: 5rem;
  }
</style>
