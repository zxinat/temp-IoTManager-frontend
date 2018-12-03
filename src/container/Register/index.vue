<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-form">
        <h2>注册</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户类别">
            <el-select v-model="form.type" placeholder="请选择用户类别">
              <el-option label="普通用户" value="normal"></el-option>
              <el-option label="管理用户" value="management"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {signupApi} from './index.api';
    export default {
      name: "Register",
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
        async onSubmit(){
          await signupApi(this.form);
          this.$router.push('/registerSuccess');
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .register-container {
    width: 100%;
    height: 100%;
    margin: 0px auto;
    display: table;
    .register-box {
      display: table-cell;
      vertical-align: middle;
      .register-form {
        width: 25%;
        margin: auto;
        padding: 2% 2%;
        border: 1px solid gray;
        border-radius: 5rem;
      }
    }
  }
</style>
