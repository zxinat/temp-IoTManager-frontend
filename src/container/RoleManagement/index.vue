<template>
  <div class="role-management-container">
    <div class="top-header">
      <span style="font-size: 25px">用户管理</span>
      <el-button type="primary" class="float-right" @click="createNewDialogFormVisible=true">创建新用户</el-button>
    </div>
    <div class="search">
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple-dark">
            <el-input v-model="username" placeholder="全部用户"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark">
            <el-select v-model="department" placeholder="全部部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--<hr>-->
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="userID"
          label="用户id"
          width="100">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          width="100">
        </el-table-column>
        <el-table-column
          prop="authority"
          label="权限"
          width="700">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="editAuthority(scope.row)" type="primary" size="small">设置权限</el-button>
            <el-button @click="resetPassword(scope.row)" type="warning" size="small">重置随机密码</el-button>
            <el-button @click="deleteUser(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="修改权限" :visible.sync="dialogFormVisible">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-select v-model="inputValue"
                 v-if="inputVisible"
                 ref="saveTagInput"
                 @keyup.enter.native="handleInputConfirm"
                 placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加用户" :visible.sync="createNewDialogFormVisible">
      <el-form :model="newUser">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="newUser.userName"></el-input>
        </el-form-item>
        <el-form-item label="部门" label-width="120px">
          <el-select v-model="newUser.department" placeholder="请选择部门">
            <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" label-width="120px">
          <el-tag
            :key="tag"
            v-for="tag in newUser.authorities"
            closable
            :disable-transitions="false"
            @close="handleClose2(tag)">
            {{tag}}
          </el-tag>
          <el-select v-model="inputValue"
                     v-if="inputVisible"
                     ref="saveTagInput"
                     @keyup.enter.native="handleInputConfirm2"
                     placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createNewDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCreateNew">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    deleteUser,
    editAuthorities,
    getAllAuthorities,
    getAllDepartments,
    getAuthorities,
    getUserTable,
    createNewUser
  } from '../../api/api';

  export default {
    name: "RoleManagement",
    data() {
      return {
        username: '',
        departmentOptions: [],
        department: '',
        tableData: [],
        currentID:'',
        dialogFormVisible: false,
        createNewDialogFormVisible:false,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        options: [],
        newUser:{
          userName:'',
          department:'',
          authorities:[]
        }
      }
    },
    methods: {
      async search() {
        let result = (await getUserTable(this.username, this.department));
        if(result.data.c===200){
          this.$message({
            message: '查找成功',
            type: 'success'
          });
          this.tableData = result.data.d;
        }else{
          this.$message.error('查找失败');
        }
      },
      async editAuthority(row) {
        this.dialogFormVisible = true;
        this.currentID=row.userID;
        this.dynamicTags = (await getAuthorities(row.userID)).data.d;
      },
      async resetPassword(row) {
      },
      async deleteUser(row) {
        if((await deleteUser(row.userID)).data.c===200){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.tableData = (await getUserTable()).data.d;
        }else{
          this.$message.error('删除失败');
        }
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      handleClose2(tag){
        this.newUser.authorities.splice(this.newUser.authorities.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
      },
    async confirmEdit() {
      if((await editAuthorities(this.currentID,this.dynamicTags)).data.c===200){
        this.$message({
          message: '更新成功',
          type: 'success'
        });
      }else{
        this.$message.error('更新失败');
      }
      this.dialogFormVisible = false;
    },
      async confirmCreateNew(){
        if((await createNewUser(this.newUser)).data.c===200){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          //更新下面表格数据
          this.tableData = (await getUserTable()).data.d;
        }else{
          this.$message.error('添加失败');
        }
        this.createNewDialogFormVisible = false
      },
      //工具函数
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleInputConfirm2() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.newUser.authorities.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    async mounted() {
      // 获取所有部门和所有用户信息
      this.departmentOptions = (await getAllDepartments()).data.d;
      this.tableData = (await getUserTable()).data.d;
      this.options = (await getAllAuthorities()).data.d;
    }
  }
</script>

<style lang="scss" scoped>
  .role-management-container {
    .top-header {
      margin: 15px 0;

      .float-right {
        float: right;
      }
    }

    .search {
      margin: 15px 0;
    }

    .table {
      margin: 15px 0;
    }
  }
</style>
