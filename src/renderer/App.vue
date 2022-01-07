<template>
  <div id="app">
    <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <Login/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Login from "@/renderer/views/login.vue";

export default {
    name: "App",
    components: {
        Login
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo{
  width: 10%;
}
</style>
