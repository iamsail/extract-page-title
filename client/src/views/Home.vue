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
              console.log('1 ',response.data);
              return response.data;
          })
      },

      prettityTitle(title) {
          console.log('title',title);
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