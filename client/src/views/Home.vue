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
          console.log('调用了...')
      },
      test() {
          let url = "http://localhost:3000";
          axios.get(url+'/produce')
              .then( (response) => {
                  console.log(response.data.data);
                  this.result = response.data.data.name;
              })
              .catch(function (error) {
                  console.log(error);
              });
      }
  },
  mounted() {
      this.temp = debounce(500, this.sendUrl);
      this.test();
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