<template>
  <div class="personal-info-container">
    <h2 style="margin: 20px">个人中心</h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="form" :model="staffInfo" label-width="80px">
          <el-form-item label="姓名">
            <el-card shadow="hover">
              {{staffInfo.name}}
            </el-card>
          </el-form-item>
          <el-form-item label="昵称">
            <el-card shadow="hover">
              昵称
            </el-card>
          </el-form-item>
          <el-form-item label="部门">
            <el-card shadow="hover">
              部门1
            </el-card>
          </el-form-item>
          <el-form-item label="所属公司">
            <el-card shadow="hover">
              公司1
            </el-card>
          </el-form-item>
          <el-form-item label="权限">
            <el-card shadow="hover">
              超级用户
            </el-card>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">修改密码</el-button>
            <!--<el-button>取消</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" :offset="3">
        <div>
          <!--<div class="block" v-for="fit in fits" :key="fit">-->
            <!--<span class="demonstration">{{ fit }}</span>-->
          <el-card>
            <img src="../../assets/img/cat.jpg" class="image">
            <div style="padding: 20px;">
              <span>个人头像</span>
            </div>
          </el-card>
        <!--<el-image :src="staffInfo.avatar"></el-image>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "PersonalInformation",
    data() {
      return {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .personal-info-container {
    .image {
      padding: 1%;
      width: 100%;
      display: block;
    }
  }
</style>
