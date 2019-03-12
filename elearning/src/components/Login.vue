<template>
  <div id="Login">
    <h4 v-if="err_msg">{{error.message}}</h4>
    <input type="text" name="username" v-model="input.username" placeholder="Username">
    <input type="password" name="password" v-model="input.password" placeholder="Password">
    <button type="button" v-on:click="login()">Login</button>
    {{data}}
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "Login",
  data() {
    return {
      data: {},
      err_msg: false,
      input: {
        username: "",
        password: ""
      },
      error: {
        message: ""
      }
    };
  },
  methods: {
    login() {
      this.payload = {
        username: this.input.username,
        password: this.input.password
      };
      this.$http
        .post("/account/login/", this.payload)
        .then(response => {
          this.err_msg = false;
          this.data = response.data;
          this.$http.defaults.headers.common = {
            Authorization: "bearer " + response.data.token
          };
          console.log(this.$http.defaults.headers.common);

          this.$http.get("courses/get/all/").then(response => {
            console.log(response.data);
          });
        })
        .catch(e => {
          this.err_msg = true;
          this.data = {};
          this.error.message = e.response.data.error;
        });
    }
  }
};
</script>
