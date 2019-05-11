<template>
  <div class="district-management-container">
    <div class="top-header">
      <span style="font-size: 25px">城市工厂管理</span>
    </div>
    <div class="search">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            选择城市
            <el-select v-model="city" :placeholder="选择城市">
              <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            选择工厂
            <el-select v-model="factory" :placeholder="选择工厂">
              <el-option
                v-for="item in factoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="search">查找</el-button>
            <el-button type="primary" class="float-right" @click="createNewDialogFormVisible=true">新建</el-button>
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
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="chargeName"
          label="负责人">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editAuthority(scope.row)" type="primary" size="small">修改</el-button>
            <!--<el-button @click="resetPassword(scope.row)" type="warning" size="small">重置随机密码</el-button>-->
            <el-button @click="deleteUser(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <!--<el-tag-->
      <!--:key="tag"-->
      <!--v-for="tag in dynamicTags"-->
      <!--closable-->
      <!--:disable-transitions="false"-->
      <!--@close="handleClose(tag)">-->
      <!--{{tag}}-->
      <!--</el-tag>-->
      <!--<el-select v-model="inputValue"-->
      <!--v-if="inputVisible"-->
      <!--ref="saveTagInput"-->
      <!--@keyup.enter.native="handleInputConfirm"-->
      <!--placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in options"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.label">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
      <el-form :model="editedDistrict">
        <el-form-item label="名称" label-width="120px">
          <el-input v-model="editedDistrict.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人" label-width="120px">
          <el-input v-model="editedDistrict.chargeName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editedDistrict.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editedDistrict.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="部门" label-width="120px">
          <el-select v-model="editedDistrict.department" placeholder="请选择部门">
            <el-option
              v-for="item in departmentOptions"
              :key="item.id"
              :label="item.departmentName"
              :value="item.departmentName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(currentID)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="createNewDialogFormVisible">
      <el-form :model="newDistrict">
        <el-form-item label="名称" label-width="120px">
          <el-input v-model="newDistrict.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人" label-width="120px">
          <el-input v-model="newDistrict.chargeName"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="newDistrict.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="newDistrict.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="newDistrict.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="部门"  label-width="120px">
          <el-select v-model="newDistrict.department" placeholder="请选择部门">
            <el-option
              v-for="item in departmentOptions"
              :key="item.id"
              :label="item.departmentName"
              :value="item.departmentName">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="权限" label-width="120px">-->
        <!--<el-tag-->
        <!--:key="tag"-->
        <!--v-for="tag in newUser.authorities"-->
        <!--closable-->
        <!--:disable-transitions="false"-->
        <!--@close="handleClose2(tag)">-->
        <!--{{tag}}-->
        <!--</el-tag>-->
        <!--<el-select v-model="inputValue"-->
        <!--v-if="inputVisible"-->
        <!--ref="saveTagInput"-->
        <!--@keyup.enter.native="handleInputConfirm2"-->
        <!--placeholder="请选择">-->
        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.label">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
        <!--</el-form-item>-->
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
  } from '../../api/api';

  export default {
    name: "DistrictManagement",
    data() {
      return {
        username: '',
        cityOptions: [{
          value: '选项1',
          label: '部门1'
        }, {
          value: '选项2',
          label: '部门2'
        }, {
          value: '选项3',
          label: '部门3'
        }, {
          value: '选项4',
          label: '部门4'
        }, {
          value: '选项5',
          label: '部门5'
        }],
        factoryOptions: [{
          value: '选项1',
          label: '部门1'
        }, {
          value: '选项2',
          label: '部门2'
        }, {
          value: '选项3',
          label: '部门3'
        }, {
          value: '选项4',
          label: '部门4'
        }, {
          value: '选项5',
          label: '部门5'
        }],
        city: '',
        factory:'',
        tableData: [{
          type: '城市',
          name: '上海',
          chargeName: '王小虎',
          email: 'xxsdads@sws.cdds',
          tel:'123213243',
          department:'部门1'
        }, {
          type: '城市',
          name: '上海',
          chargeName: '王小虎',
          email: 'xxsdads@sws.cdds',
          tel:'123213243',
          department:'部门1'
        }, {
          type: '城市',
          name: '上海',
          chargeName: '王小虎',
          email: 'xxsdads@sws.cdds',
          tel:'123213243',
          department:'部门1'
        }, {
          type: '城市',
          name: '上海',
          chargeName: '王小虎',
          email: 'xxsdads@sws.cdds',
          tel:'123213243',
          department:'部门1'
        }, {
          type: '城市',
          name: '上海',
          chargeName: '王小虎',
          email: 'xxsdads@sws.cdds',
          tel:'123213243',
          department:'部门1'
        }, ],
        currentID:'',
        dialogFormVisible: false,
        createNewDialogFormVisible:false,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        options: [],
        newDistrict:{
          name:'',
          chargeName:'',
          // password:'',
          email:'',
          phoneNumber: '',
          department:''
          // authorities:[]
        },
        editedDistrict: {
          name:'',
          chargeName:'',
          // password:'',
          email:'',
          phoneNumber: '',
          department:''
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
        this.currentID=row.id;
        this.editedUser = (await getUserById(this.currentID)).data.d;
        //this.dynamicTags = (await getAuthorities(row.id)).data.d;
      },
      async resetPassword(row) {
      },
      async deleteUser(row) {
        try {
          this.$confirm('确认删除？')
            .then(async _=> {
              if((await deleteUser(row.id)).data.c===200){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.tableData = (await getUserTable()).data.d;
              }else{
                this.$message.error('删除失败');
              }
            })
            .catch(_ => {});
        } catch (e) {
          console.log(e)
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
      async confirmEdit(row) {
        if((await editUser(this.currentID, this.editedUser)).data.c===200){
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.tableData = (await getUserTable()).data.d;
        }else{
          this.$message.error('更新失败');
        }
        this.dialogFormVisible = false;
      },
      async confirmCreateNew(){
        console.log(this.newUser);
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
      this.tableData = (await getUserTable(this.username, this.department)).data.d;
    }
  }
</script>

<style lang="scss" scoped>
  .district-management-container {
    margin: 10px;
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
