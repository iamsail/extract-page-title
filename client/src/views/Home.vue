<template>
  <div class="home">
      <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入要处理的URL"
              v-model="textarea">
      </el-input>
      <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="处理结果"
              v-model="result">
      </el-input>
  </div>
</template>

<script>
// @ is an alias to /src
import {throttle, debounce, debounceByAsync} from '../assets/js/common'
const axios = require('axios');
export default {
  name: 'home',
  components: {
  },
  data() {
      return {
          textarea: '',
          result: null,
      }
  },
  methods: {
      async getTitleFromUrl() {
          let url = "http://localhost:3000/produce";
          return await axios.post(url, `demo=${this.textarea}`).then((response) => {
              return response.data;
          })
      },

      // [js实现去除首尾空格 - xiaobing_hope的专栏 - CSDN博客](https://blog.csdn.net/xiaobing_hope/article/details/50385485)
      trimStr(str){
          return str.replace(/(^\s*)|(\s*$)/g,"");
      },

      prettityTitle(title) {
          title = this.trimStr(title);
          this.result = `[${title}](${this.textarea})`;
      }
  },
  mounted() {
      this.getTitle = debounceByAsync(1500, this.getTitleFromUrl);
  },
  watch: {
      textarea: function () {
          this.getTitle().then(title => this.prettityTitle(title));
      }
  }
}
</script>


<style>
    .home .el-textarea {
        margin-top: 20px;
    }
</style>