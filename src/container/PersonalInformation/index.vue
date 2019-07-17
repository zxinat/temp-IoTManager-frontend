<template>
  <div class="personal-info-container">
    <el-row :gutter="20">
      <el-col>
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="姓名">
            <el-card shadow="hover">
              {{userInfo.userName}}
            </el-card>
          </el-form-item>
          <el-form-item label="昵称">
            <el-card shadow="hover">
              {{userInfo.displayName}}
            </el-card>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-card shadow="hover">
              {{userInfo.email}}
            </el-card>
          </el-form-item>
          <el-form-item label="电话">
            <el-card shadow="hover">
              {{userInfo.phoneNumber}}
            </el-card>
          </el-form-item>
          <el-form-item label="个人备注">
            <el-card shadow="hover">
              {{userInfo.remark}}
            </el-card>
          </el-form-item>
          <!--<el-form-item label="部门">-->
            <!--<el-card shadow="hover">-->
              <!--部门1-->
            <!--</el-card>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="所属公司">-->
            <!--<el-card shadow="hover">-->
              <!--公司1-->
            <!--</el-card>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="权限">-->
            <!--<el-card shadow="hover">-->
              <!--超级用户-->
            <!--</el-card>-->
          <!--</el-form-item>-->
          <el-form-item size="large">
            <el-button type="primary" @click="updatePasswordVisible = true">修改密码</el-button>
            <!--<el-button>取消</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>
      <!--<el-col :span="6" :offset="1">-->
        <!--<div>-->
          <!--&lt;!&ndash;<div class="block" v-for="fit in fits" :key="fit">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="demonstration">{{ fit }}</span>&ndash;&gt;-->
          <!--<el-card>-->
            <!--<img src="../../assets/img/cat.jpg" class="image">-->
            <!--<div style="padding: 20px;">-->
              <!--<span>个人头像</span>-->
            <!--</div>-->
          <!--</el-card>-->
        <!--&lt;!&ndash;<el-image :src="staffInfo.avatar"></el-image>&ndash;&gt;-->
        <!--</div>-->
      <!--</el-col>-->
    </el-row>
    <el-dialog title="修改密码" :visible.sync="updatePasswordVisible">
      <el-form :model="passwordForm">
        <el-form-item label="新密码" label-width="120px">
          <el-input v-model="passwordForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatePasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserByName, updatePassword} from "../../api/api";

  export default {
    name: "PersonalInformation",
    data() {
      return {
        updatePasswordVisible: false,
        userInfo: {},
        passwordForm: {
          password: ''
        },
        staffInfo: {
          name: '某员工',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          avatar:'../../assets/img/cat.jpg'
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      async changePassword(){
        try {
          const data = await updatePassword(this.userInfo.userName, this.passwordForm);
          this.updatePasswordVisible = false;
          if (data.data.d === "success") {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        } catch (e) {
          this.updatePasswordVisible = false;
          this.$message.error('密码修改失败');
        }
      }
    },
    async mounted() {

      this.userInfo = (await getUserByName(localStorage.getItem('userInfo').substr(1, localStorage.getItem('userInfo').length-2))).data.d;
      console.log(this.userInfo);
    }
  }
</script>

<style lang="scss" scoped>
  .personal-info-container {
    padding: 20px;
    .image {
      padding: 1%;
      width: 100%;
      display: block;
    }
  }
</style>
