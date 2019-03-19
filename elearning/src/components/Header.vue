<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <router-link to="/" class="navbar-brand js-scroll-trigger">E-Learning a tu medida</router-link>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <router-link
              class="nav-item nav-link js-scroll-trigger text-white"
              v-for="routes in links"
              v-bind:key="routes.id"
              :to="`${routes.page}`"
            >{{routes.text}}</router-link>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
/* eslint-disable */

export default {
  name: "Header",
  data() {
    return {
      links: []
    };
  },
  methods: {
    updateLinks() {
      if (this.$session == null) {
        this.links = [
          {
            id: 1,
            text: "Iniciar sesión",
            page: "/login"
          },
          {
            id: 2,
            text: "Crear cuenta",
            page: "/signup"
          }
        ];
      } else {
        this.links = [
          {
            id: 0,
            text: "Todos los cursos",
            page: "/cursos"
          },
          {
            id: 1,
            text: "Mis Cursos",
            page: "/miscursos"
          },
          {
            id: 2,
            text: "Tareas",
            page: "/tareas"
          },
          {
            id: 3,
            text: "Cerrar sesión",
            page: "/logout"
          }
        ];
      }
    }
  },
  updated() {
    this.updateLinks();
  },
  created() {
    try {
      this.$session = this.$cookies.get("session");
      this.$http.defaults.headers.common = {
        Authorization: "Bearer " + this.$session.token
      };
    } catch (e) {}
    this.updateLinks();
  }
};
</script>
<style scoped>
.navbar {
  margin-bottom: 0px;
}
</style>
