<template>
  <div class="upload-img-container">
    <div class="upload-button"><input v-on:change="saveList" class="img-input" type="file" accept="image/*"/></div>
    <el-button type="primary" class="warp-button">选择文件</el-button>
    <div class="preview_box">
      <img class="preview" src="" alt="preview"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UploadImg",
    data() {
      return {
        imgData: ''
      }
    },
    watch: {
      imgData(val) {
        console.log('图片上传了', val);
      }
    },
    methods: {
      saveList(e) {
        const file = e.target.files[0];
        console.log('upload',file);
        if (!file.type.match('image.*')) {//只选择图片
          this.$message.error('请上传图片类型');
          return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (arg) {
          document.getElementsByClassName('preview')[0].src=arg.target.result;
          document.getElementsByClassName('preview')[0].style.display = 'block';
        }
        this.$emit('upload' , file);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-img-container {
    .upload-button{

    }
    .img-input {
        opacity: 0;//投机取巧
        display: block;
        margin: auto;
        padding-left: 4rem;
    }
    .warp-button{
      display: block;
      margin: -2rem auto 1rem auto;
    }
    .preview_box img {
      width: 200px;
      display: none;
      margin: auto;
    }
  }

</style>
