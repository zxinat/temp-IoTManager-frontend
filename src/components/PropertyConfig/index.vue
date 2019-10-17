<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" class="header">
        <el-form-item>
          <h2>设备属性</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchProperty" placeholder="请输入设备属性"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newFormVisible = true">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="properties"
        border
        style="width: 60%;">
        <el-table-column
          prop="fieldId"
          label="属性ID">
        </el-table-column>
        <el-table-column
          prop="fieldName"
          label="属性名称">
        </el-table-column>
        <el-table-column
          prop="device"
          label="所属设备">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="openUpdateForm(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteField(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="修改设备属性" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="属性ID" label-width="120px">
          <el-input v-model="updateData.fieldId" disabled></el-input>
        </el-form-item>
        <el-form-item label="属性名称" label-width="120px">
          <el-input v-model="updateData.fieldName"></el-input>
        </el-form-item>
        <el-form-item label="所属设备" label-width="120px">
          <el-select v-model="updateData.device" placeholder="请选择设备">
            <el-option
              v-for="d in devices"
              :key="d.id"
              :label="d.deviceName"
              :value="d.deviceName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取消</el-button>
        <el-button @click="update" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增设备属性" :visible.sync="newFormVisible">
      <el-form :model="newData">
        <el-form-item label="属性ID" label-width="120px">
          <el-input v-model="newData.fieldId"></el-input>
        </el-form-item>
        <el-form-item label="属性名称" label-width="120px">
          <el-input v-model="newData.fieldName"></el-input>
        </el-form-item>
        <el-form-item label="所属设备" label-width="120px">
          <el-select v-model="newData.device" placeholder="请选择设备">
            <el-option
              v-for="d in devices"
              :key="d.id"
              :label="d.deviceName"
              :value="d.deviceName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newFormVisible = false">取消</el-button>
        <el-button @click="add" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    createNewField,
    deleteField,
    getDevicesApi,
    getFieldAffiliateData,
    getFields,
    updateField
  } from "../../api/api";

  export default {
    name: "PropertyConfig",
    data() {
      return {
        updateFormVisible: false,
        newFormVisible: false,
        properties: [],
        devices: [],
        searchProperty: '',
        updateData: {
          id: 0,
          fieldId: '',
          fieldName: '',
          device: ''
        },
        newData: {
          id: 0,
          fieldId: '',
          fieldName: '',
          device: ''
        }
      }
    },
    methods: {
      async getAllProperties() {
        this.properties = (await getFields()).data.d;
        console.log(this.properties);
      },
      async getDevices() {
        this.devices = (await getDevicesApi('all')).data.d;
      },
      openUpdateForm(row) {
        this.updateData = JSON.parse(JSON.stringify(row));
        this.updateFormVisible = true;
      },
      async add() {
        try {
          console.log(this.newData);
          const data = await createNewField(this.newData);
          this.newFormVisible = false;
          if(data.data.c === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.properties = (await getFields()).data.d;
          }
        } catch (e) {
          this.newFormVisible = false;
          this.$message.error('添加失败')
        }
      },
      async update() {
        try {
          const data = await updateField(this.updateData.id, this.updateData);
          this.updateFormVisible = false;
          if (data.data.c === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.properties = (await getFields()).data.d;
          }
        } catch (e) {
          this.updateFormVisible = false;
          this.$message.error('更新未成功');
        }
      },
      async deleteField(row) {
        const affiliateData = (await getFieldAffiliateData(row.fieldId)).data.d;
        if (affiliateData === 0) {
          try {
            this.$confirm('确认删除?')
              .then(async _ => {
                const data = await deleteField(row.id);
                if (data.data.c === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  this.properties = (await getFields()).data.d;
                }
              });
          } catch (e) {
            console.log(e);
          }
        } else {
          this.$msgbox('该属性有' + affiliateData + '条数据，无法被删除');
        }
      }
    },
    async mounted() {
      this.getAllProperties();
      this.getDevices();
    }
  }
</script>

<style scoped>
  .search-container, .table-container, .deleteButton-container {
    margin: 1% 1%;
    text-align: left;
  }

  h2{
    display: inline;
  }
</style>
