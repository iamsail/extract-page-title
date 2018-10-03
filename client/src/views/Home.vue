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
import {throttle, debounce} from '../assets/js/common'
const axios = require('axios');
export default {
  name: 'home',
  components: {
  },
  data() {
      return {
          textarea: '',
          result: null,
          done: '1'
      }
  },
  methods: {
      sendUrl() {
          let url = "http://localhost:3000/produce";
          let datas = {
              temp: this.textarea
          };
          axios.post(url, `demo=${this.textarea}`).then((response) => {
              console.log(response.data);
          })
      },

  },
  mounted() {
      this.temp = debounce(1500, this.sendUrl);
  },
  watch: {
      textarea: function () {
          this.temp();
      }
  }
}
</script>


<style>
    .home .el-textarea {
        margin-top: 20px;
    }
</style>