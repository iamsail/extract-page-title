<template>
  <div class="home">

    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">extract-page-title</el-menu-item>
    <el-menu-item index="3"><a href="https://github.com/iamsail" target="_blank">Github</a></el-menu-item>
    <el-menu-item index="2"><a href="http://www.sail.name/" target="_blank">博客</a></el-menu-item>
    </el-menu>

        
      <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 7}"
              placeholder="请输入要处理的URL"
              v-model="URL">
      </el-input>
      <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 7}"
              placeholder="处理结果"
              v-model="result">
      </el-input>


      <el-dialog
        title="错误信息"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <div class="errorInfo"><pre>{{errorInfo}}</pre></div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
</el-dialog>

  </div>
</template>

<script>
// @ is an alias to /src
import {throttle, debounce, debounceByAsync} from '../assets/js/common'
const axios = require('axios');
const API = `${process.env.VUE_APP_HOST}produce`;
const ULRREG = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/;

export default {
  name: 'home',
  components: {
  },
  data() {
      return {
          URL: '',
          result: null,
          centerDialogVisible: false,
          errorInfo: null,
          activeIndex: '1'
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
             if (!ULRREG.test(url)) {
                 this.result ="URL格式不对,请检查";
                 return false;
             }  

             return await axios.post(API, {url: url}).then((response) => {
              if (!response.data.code) {
                  this.handleError(response.data, "error！ 程序出错！");
              } else {
                  this.handleSuccess(response.data);
              }
              return response.data;
          })
      },

      handleError(msg, info) {
          this.centerDialogVisible = true;
          this.errorInfo = msg.data;
          this.result = info;
      },

      handleSuccess(msg) {
          this.prettityTitle(msg.data, this.URL);
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
      this.getTitle = debounceByAsync(300, this.getTitleFromUrl);
  },
  watch: {
      URL: function () {
          this.getTitle(this.URL);
      }
  }
}
</script>


<style>
    .home .el-textarea {
        width: 98%;
        margin-top: 40px;
    }

    .home .errorInfo {
        overflow: auto;
    }

    .home ul .el-menu-item {
        font-weight: 700;
    }

    .home ul .el-menu-item:nth-child(n+2) {
        float: right;
        font-weight: 700;
    }

     .home ul .el-menu-item a {
      font-size: 17px;
    }

     @media screen and (max-width: 639px) { 
        .home ul .el-menu-item a {
            font-size: 14px;
        }
     }

    .home ul .el-menu-item:nth-child(n+2) a {
        text-decoration: none;
    }

</style>
