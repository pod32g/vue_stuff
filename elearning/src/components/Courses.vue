<template>
  <div class="list-group">
    <a
      class="list-group-item list-group-item-action flex-column align-items-start list-group-item-warning"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">Cursos</h5>
        <input
          type="text"
          class="form-control col-sm-4"
          v-model="search"
          placeholder="Buscar curso"
        >
        <button v-if="teacher" class="btn btn-warning" v-on:click="openNew">Nuevo Curso</button>
      </div>
    </a>
    <div v-if="err_msg" class="alert alert-danger" role="alert">{{message}}</div>
    <router-link
      v-for="course in filteredList"
      v-bind:key="course.id"
      :to="'/cursos/' + course.id"
      class="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">
          Profesor:
          <strong>{{course.professor.name}}</strong>
        </h5>
        <small>Termina el: {{course.end}}</small>
      </div>

      <p class="mb-1">
        <strong>{{course.name}}</strong>
      </p>
      <small>Requiere contraseña: {{course.password}}</small>
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */

import CreateCourseModal from "@/components/CreateCourseModal";

export default {
  name: "Courses",
  data() {
    return {
      teacher: false,
      search: "",
      err_msg: false,
      message: "",
      courses: [
        {
          id: -1,
          name: "No hay cursos",
          professor: {
            name: ""
          },
          end: "",
          password: false
        }
      ]
    };
  },
  methods: {
    refresh() {
      this.$http
        .get("/courses/get/all/")
        .then(response => {
          console.log(response.data);
          if (response.data.courses.length !== 0) {
            this.courses = response.data.courses;
          }
        })
        .catch(e => {
          this.message =
            "Ha ocurrido un error con el servidor, intente mas tarde.";
          this.err_msg = true;
          console.log(e);
        });
    },
    openNew() {
      this.$modal.show("create-courses");
    }
  },
  created() {
    if (this.$session.type != 3) {
      this.teacher = true;
    }
    this.refresh();
  },
  computed: {
    filteredList() {
      return this.courses.filter(course => {
        return course.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style scoped>
.list-group {
  margin-top: 7%;
}
</style>

