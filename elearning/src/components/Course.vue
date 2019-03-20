<template>
  <div>
    <div class="list-group">
      <div v-if="err_msg" class="alert alert-danger" role="alert">{{message}}</div>
      <a
        class="list-group-item list-group-item-action flex-column align-items-start list-group-item-warning"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{this.course.name}}</h5>
          <button v-if="owner" class="ml-auto p-2 btn btn-warning" v-on:click="openEdit">Editar</button>
          <button v-if="owner" class="btn btn-warning" v-on:click="openNewPost">Nuevo post</button>
          <button
            v-if="this.course.enrolled == false && !owner"
            class="btn btn-warning"
            v-on:click="enroll"
          >Inscribirse</button>
        </div>
      </a>
      <div>
        <a
          v-for="post in posts"
          v-on:click="openDetails(post.id)"
          v-bind:key="post.id"
          class="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">
              <strong>{{post.title}}</strong>
            </h5>
            <small v-if="post.type == 0">Publicado el: {{post.timestamp}}</small>
            <small v-if="post.type == 1">Fecha limite: {{post.timestamp}}</small>
          </div>

          <p class="mb-1">
            <strong>{{post.content}}</strong>
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import PostsModal from "@/components/PostsModal";

export default {
  name: "Details",
  data() {
    return {
      owner: false,
      search: "",
      err_msg: false,
      message: "",
      course: {
        name: null,
        start: null,
        end: null,
        students: null
      },
      posts: [
        {
          id: -1,
          title: "No hay posts",
          content: null,
          timestamp: null,
          type: 0
        }
      ]
    };
  },
  methods: {
    enroll() {
      var request = {
        course: this.course.id,
        password: null
      };
      this.$http
        .post("/courses/enroll/", request)
        .then(response => {
          this.$router.go();
        })
        .catch(e => {
          this.$modal.show("dialog", {
            title: "Error",
            text: e.response.data.error,
            buttons: [
              {
                title: "Cerrar"
              }
            ]
          });
        });
    },
    refresh() {
      this.$http
        .get("/courses/get/" + this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.course = response.data;
          this.owner = response.data.owner;
        })
        .catch(e => {
          this.$modal.show("dialog", {
            title: "Error",
            text: e.response.data.error,
            buttons: [
              {
                title: "Cerrar"
              }
            ]
          });
          console.log(e);
        });
      this.$http
        .get("/courses/post/get/" + this.$route.params.id)
        .then(response => {
          console.log(response.data);
          if (response.data.posts.length > 0) {
            this.posts = response.data.posts;
          }
        })
        .catch(e => {
          this.$modal.show("dialog", {
            title: "Error",
            text: e.response.data.error,
            buttons: [
              {
                title: "Cerrar"
              }
            ]
          });
        });
    },
    openEdit() {
      this.$modal.show("edit-courses");
    },
    openNewPost() {
      this.$modal.show("create-post");
    },
    openDetails(id) {
      if (this.course.enrolled || this.owner) {
        this.$modal.show(
          PostsModal,
          {
            id: id,
            owner: this.owner
          },
          {
            width: 656,
            height: "auto"
          }
        );
      } else {
        this.$modal.show("dialog", {
          title: "Error",
          text: "Necesitas estar inscrito para acceder a este contenido",
          buttons: [
            {
              title: "Aceptar"
            }
          ]
        });
      }
    }
  },
  created() {
    if (this.$session.type != 3) {
      this.teacher = true;
    }
    this.refresh();
  }
};
</script>
<style scoped>
.list-group {
  margin-top: 7%;
}
</style>