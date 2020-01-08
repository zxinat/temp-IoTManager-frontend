<template>
  <div class="nyam_loginbg">
    <div class="nyam_login_left"></div>
    <div class="nyam_login_right">
      <div class="nyam_login_logo">
        <img src="./Scripts/images/nylogo_cloud.png" class="nyam_login_logoimg pull-left"/>
        <div class="nyam_login_logotext pull-left">
          <span style="font-family: Consolas;">CloudWeaver</span>
        </div>
        <div class="clear"></div>
      </div>
      <div class="nyam_login_box">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="nyam_login_box_div">
            <div style="position: absolute; top: -24px; left: 230px; z-index: 2; color: rgba(255, 255, 255, 0.25); ">

            </div>
            <img src="./Scripts/images/user.png"/>
            <el-form-item prop="name" :rules="[{ required: true, message: '用户名必填'}]">
              <input class="form-control" type="text" v-model="form.name" placeholder="请输入用户名">
            </el-form-item>
          </div>
          <div class="nyam_login_box_div">
            <div style="position: absolute; top: -24px; left: 230px; z-index: 2; color: rgba(255, 255, 255, 0.25); ">

            </div>
            <img src="./Scripts/images/padlock.png"/>
            <el-form-item prop="password" :rules="[{ required: true, message: '密码必填'}]">
              <input class="form-control" type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码">
            </el-form-item>
          </div>
          <el-button class="btn btn-primary nyam_login_btn pull-left" style="background-color: #45a9ff;" @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAuthByUid, getRegionLevelMenu, loginApi} from '../../api/api';
  import {setCookie} from '../../../utils/package-cookies';
  import {setItemToLocalstorage} from '../../../utils/package-localstorage';
  import './Scripts/jquery/jquery-1.11.1.js';
  import './Scripts/bootstrap/js/bootstrap.min';

  export default {
    name: 'Login',
    data() {
      return {
        form: {
          name: '',
          password: ''
          // confirmPwd: '',
          // type: 'normal',
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
            if (res.data.d.status === 'success') {
              const auth = (await getAuthByUid(res.data.d.uid)).data.d;
              setCookie('userSessionID', res.data.d.sessionId, 20);//存储sessionID
              setItemToLocalstorage('userInfo', res.data.d.user);//存储用户信息
              setItemToLocalstorage('auth', auth);
              // const region = (await getRegionLevelMenu()).data.d;
              // firstLevel = region['first'];
              // secondLevel = region['second'];
              // thirdLevel = region['third'];
              await this.$store.dispatch('userInfo/setUserInfo', this.form);
              this.$router.push('/dashboard');
            } else {
              console.log(res.data.d);
              this.$message.error('用户名或密码错误');
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
  @import "./Scripts/bootstrap/css/bootstrap.min.css";

  @import "./Scripts/css/ny_bootstrap.css";
  @import "./Scripts/css/nyam_base.css";
  @import "./Scripts/css/nyam_layouts.css";



</style>
