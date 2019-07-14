<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-form">
        <h2>登录</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item prop="name" label="用户名" :rules="[{ required: true, message: '用户名必填'}]">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="pwd" label="密码" :rules="[{ required: true, message: '密码必填'}]">
            <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <!--<el-form-item prop="pwd" label="确认密码" :rules="[{-->
                                                    <!--required:true,message:'确认密码',trigger:'blur'-->
                                                    <!--}]">-->
            <!--<el-input type="password" v-model="form.confirmPwd" autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<span class="right"><router-link to="/register" class="hide-underline">没有账号?注册一个</router-link></span>-->

          <!--<el-form-item prop="type"  style="text-align: left" label="用户类别" :rules="[{ required: true, message: '用户类别必填'}]">-->
            <!--<el-select v-model="form.type" placeholder="请选择用户类别">-->
              <!--<el-option label="用户" value="normal"></el-option>-->
              <!--<el-option label="管理" value="management"></el-option>-->
              <!--<el-option label="超级管理员" value="superManagement"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-button type="primary" @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginApi} from '../../api/api';
  import {setCookie} from '../../../utils/package-cookies';
  import {setItemToLocalstorage} from '../../../utils/package-localstorage';

  export default {
    name: 'Login',
    data() {
      return {
        form: {
          name: '',
          pwd: '',
          confirmPwd: '',
          type: 'normal',
        }
      }
    },
    computed: {},
    methods: {
      async login() {
          this.submitForm('form');
        // const res = await loginApi(this.form);
        //setCookie('userSessionID',res.data.d.sessionId,20);
        //setItemToLocalstorage('userInfo',res.data.d.user);
        //await this.$store.dispatch('userInfo/setUserInfo',this.form);
      },
      async submitForm(formName) {
        // console.log(this.$refs[formName]);
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const res = await loginApi(this.form);
            if(res.data.d === 'success') {
              console.log('success');
              setCookie('userSessionID',res.data.d.sessionId,20);//存储sessionID
              setItemToLocalstorage('userInfo',res.data.d.user);//存储用户信息
              await this.$store.dispatch('userInfo/setUserInfo',this.form);
              this.$router.push('/dashBoard');
            } else {
              this.$message.error('Wrong Username Or Password');
            }
            return true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login-container {
    text-align: center;
    width: 100%;
    height: 100%;
    margin: 0px auto;
    display: table;

    .login-box {
      display: table-cell;
      vertical-align: middle;

      .login-form {
        width: 25%;
        margin: auto;
        padding: 2% 2%;
        /*border: 1px solid gray;*/
        border-radius: 5rem;
        box-shadow: 0px 0px 15px #6c807b;

        .right {
          font-size: 14px;
          display: block;
          text-align: right;
        }
      }
    }
  }


</style>
