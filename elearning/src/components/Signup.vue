<template>
  <div class="container login-container">
    <div class="login-form-1">
      <div v-if="err_msg" class="alert alert-danger" role="alert">{{message}}</div>
      <h3>Registrarse</h3>
      <form v-on:submit="signup" action="#" method="post">
        <div class="form-group">
          <input
            v-model="user.email"
            type="text"
            class="form-control"
            placeholder="Tu Email *"
            value
          >
        </div>
        <div class="form-group">
          <input
            v-model="user.pass"
            type="password"
            class="form-control"
            placeholder="Tu Contraseña *"
            value
          >
        </div>
        <div class="form-group">
          <input
            v-model="user.code"
            type="text"
            class="form-control"
            placeholder="Tu Código *"
            value
          >
        </div>
        <div class="form-group">
          <input
            v-model="user.first_name"
            type="text"
            class="form-control"
            placeholder="Tu(s) Nombre *"
            value
          >
        </div>
        <div class="form-group">
          <input
            v-model="user.last_name"
            type="text"
            class="form-control"
            placeholder="Tu(s) Apellidos *"
            value
          >
        </div>
        <div class="form-group">
          <input type="submit" class="btnSubmit" value="Iniciar Sesión">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "Login",
  data() {
    return {
      err_msg: false,
      user: {
        pass: null,
        code: null,
        email: null,
        first_name: null,
        last_name: null
      },
      message: ""
    };
  },
  methods: {
    signup(event) {
      this.payload = {
        code: this.user.code,
        password: this.user.pass,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email
      };
      this.$http
        .post("/account/signup/", this.payload)
        .then(response => {
          this.err_msg = false;
          this.$session = response.data;
          this.$http.defaults.headers.common = {
            Authorization: "Bearer " + response.data.token
          };
          this.$cookies.set("session", this.$session);
          this.$router.go();
        })
        .catch(e => {
          this.message = e.response.data.error;
          this.$modal.show("dialog", {
            title: "Error",
            text: this.message,
            buttons: [
              {
                title: "Cerrar"
              }
            ]
          });
        });

      event.preventDefault();
    }
  },
  created() {
    if (this.$session != null) {
      window.location.href = "/#/";
      //this.$router.go("Index");
    }
  }
};
</script>
<style scoped>
.login-container {
  margin-top: 6%;
  margin-bottom: 0%;
  width: 100%;
}
.login-form-1 {
  padding: 5%;
}
.login-form-1 h3 {
  text-align: center;
  color: #333;
}
.login-container form {
  padding: 10%;
}
.btnSubmit {
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  border: none;
  cursor: pointer;
}
.login-form-1 .btnSubmit {
  font-weight: 600;
  color: #fff;
  background-color: #0062cc;
}
.login-form-2 .btnSubmit {
  font-weight: 600;
  color: #0062cc;
  background-color: #fff;
}
.login-form-2 .ForgetPwd {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.login-form-1 .ForgetPwd {
  color: #0062cc;
  font-weight: 600;
  text-decoration: none;
}
</style>
