<template>
  <div class="login">
    <h1>{{ title }}</h1>
    <form class="form">
        <input type="text" placeholder="请输入账号" v-model="form.username">
        <input type="password" placeholder="请输入密码" v-model="form.password">
        <input type="button" value="登录" class="design" @click="design">
    </form>
  </div>
</template>

<script>
import { login } from "@/renderer/api/login";

export default {
    name: "login",
    data() {
        return {
            title: "登录",
            form: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        design(){
            let loginForm = {
                username: this.form.username,
                password: this.form.password,
            };
            login(loginForm).then(() => {
                alert(12);
            }).catch(()=> {
                alert(0);
            });
        },
    }
};
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .form {
        width: 40%;
        padding: 30px;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-sizing: border-box;
        input{
          width: 96%;
          height: 36px;
          padding: 0 10px;
          margin: 10px auto;
          border: 1px solid #ccc;
        }
        .design{
          width: 100%;
          background: none;
          border: 1px solid #ccc;
        }
    }
}
</style>
