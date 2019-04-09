<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}
</style>

<script>
    import Home from './views/Home'
    const axios = require('axios');
    export default {
        name: 'app',
        components: {
            Home
        },
        data() {
            return {
            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>