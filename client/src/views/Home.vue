<template>
  <div class="home">
      <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入要处理的URL"
              v-model="URL">
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
          URL: '',
          result: null,
      }
  },
  methods: {
      /**
       * 获取页面title
       *
       * @param   str    待处理的字符串
       * @param   str    处理后的字符串
       */
      async getTitleFromUrl(url) {
          const API = "http://localhost:3000/produce";
          return await axios.post(API, `demo=${url}`).then((response) => {
              return response.data;
          })
      },


      /**
       * 去除字符串首尾空白
       *
       * @param   str    待处理的字符串
       * @param   str    处理后的字符串
       */
      trimStr(str){
          return str.replace(/(^\s*)|(\s*$)/g,"");
      },


      /**
       * 美化title, 调整格式
       *
       * @param   title    提取出的页面title
       * @param   url      对应页面的url(用户输入)
       */
      prettityTitle(title, url) {
          title = this.trimStr(title);
          this.result = `[${title}](${url})`;
      }
  },
  mounted() {
      this.getTitle = debounceByAsync(1500, this.getTitleFromUrl);
  },
  watch: {
      URL: function () {
          this.getTitle(this.URL).then(title => this.prettityTitle(title, this.URL));
      }
  }
}
</script>


<style>
    .home .el-textarea {
        margin-top: 20px;
    }
</style>