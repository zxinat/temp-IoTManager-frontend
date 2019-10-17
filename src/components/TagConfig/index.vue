<template>
  <div>
    <div>
      <h2>设备标签</h2>
    </div>
    <div>
      <el-tag
        class="tag-container"
        v-for="tag in tags"
        :key="tag"
        closable>
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="addTag"
        @blur="addTag">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+新标签</el-button>
    </div>
  </div>
</template>

<script>
  import {getAllTags} from "../../api/api";

  export default {
    name: "TagConfig",
    data() {
      return {
        tags: [],
        inputVisible: false,
        inputValue: '',
      }
    },
    methods: {
      async getTags() {
        this.tags = (await getAllTags()).data.d;
      },
      async addTag() {
        this.inputVisible = false;
        this.inputValue = '';
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      }
    },
    async mounted() {
      this.getTags();
    }
  }
</script>

<style scoped>
  .tag-container {
    margin: 1% 1%;
    text-align: left;
  }

  .button-new-tag {
    margin: 1% 1%;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin: 1% 1%;
    vertical-align: bottom;
  }
</style>
