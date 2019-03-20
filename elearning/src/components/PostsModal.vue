<template>
  <div class="box">
    <div class="partition" id="partition-register">
      <div class="partition-title">{{payload.title}}</div>
      <div class="partition-form">
        <form autocomplete="false">
          <div class="autocomplete-fix">
            <input type="password">
          </div>

          <input v-if="editable" v-model="payload.title" type="text" placeholder="Titulo">
          <textarea
            :disabled="editable == 0"
            class="form-control"
            v-model="payload.content"
            placeholder="Contenido"
          />
          <select :disabled="editable == 0" v-model="payload.type">
            <option value="0" selected="true">Post</option>
            <option value="1">Tarea</option>
          </select>
        </form>
        <label v-if="this.payload.file != null">
          Archivo:
          <a :href="this.payload.file">{{this.payload.file}}</a>
          <input
            v-if="editable == 1"
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
          >
        </label>

        <div style="margin-top: 42px"></div>
        <div
          v-if="((!this.$props.owner) && this.payload.type == 1) && this.payload.response == null"
        >
          <label>
            Subir respuesta:
            <a :href="this.payload.file">{{this.payload.file}}</a>
            <input type="file" id="file" ref="file" v-on:change="handleAnsFileUpload()">
          </label>
          <button v-on:click="saveAns">Guardar respuesta</button>
        </div>
        <div
          v-if="((!this.$props.owner) && this.payload.type == 1) && this.payload.response != null"
        >
          <label v-if="this.payload.response.graded">Calificación: {{this.payload.response.grade}}</label>
          <label v-if="!this.payload.response.graded">Aún no ha sido calificado</label>
        </div>

        <div class="button-set">
          <button v-if="editable" v-on:click="newPost">Guardar post</button>
          <button v-if="this.$props.owner && !editable" v-on:click="editable = true">Editar post</button>
        </div>
        <div style="margin-top: 42px"></div>
        <div v-if="this.$props.owner">
          <a
            v-for="response in this.payload.response"
            v-bind:key="response.id"
            class="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div class="d-flex w-100">
              <label class="mb-1">
                Estudiante:
                <strong>{{response.student.name}}&nbsp;&nbsp;</strong>
              </label>
              <a :href="response.file">Archivo&nbsp;&nbsp;</a>
            </div>
            <label class="mb-1" v-if="response.graded">Ya ha sido calificado</label>
            <button
              class="button-small"
              v-if="!response.graded"
              v-on:click="grade(response.id)"
            >Calificar</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Datepicker from "vuejs-datepicker";
import { en, es } from "vuejs-datepicker/dist/locale";
import moment from "moment";
import GradeModal from "@/components/GradeModal";

const MODAL_WIDTH = 656;

export default {
  name: "PostsModal",
  props: ["id", "owner", "enrolled"],
  data() {
    return {
      response: {
        file: null
      },
      editable: false,
      payload: {
        title: null,
        content: null,
        type: null,
        file: null
      }
    };
  },
  created() {
    this.refresh();
  },
  components: {
    Datepicker
  },
  methods: {
    refresh() {
      console.log(this.$props.owner);
      this.$http
        .get("/courses/posts/get/one/" + this.$props.id)
        .then(response => {
          this.payload = response.data;
          console.log(this.payload);
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
    grade(id) {
      this.$modal.show(
        GradeModal,
        {
          id: id
        },
        {
          "before-close": event => {
            this.refresh();
          }
        }
      );
    },
    handleFileUpload() {
      this.payload.file = this.$refs.file.files[0];
    },
    handleAnsFileUpload() {
      this.response.file = this.$refs.file.files[0];
    },
    saveAns() {
      console.log(this.payload.id);
      var request = {
        homework: this.payload.id,
        answer: null,
        sent: true
      };
      var formData = new FormData();
      formData.append("request", JSON.stringify(request));
      formData.append("file", this.response.file);

      this.$http
        .post("/homework/response/new/", formData)
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
    newPost() {
      var request = {
        course: this.$route.params.id,
        title: this.payload.title,
        content: this.payload.content,
        type: this.payload.type
      };
      var formData = new FormData();
      formData.append("request", JSON.stringify(request));
      if (this.payload.file != null) {
        formData.append("file", this.payload.file);
      }

      this.$http
        .post("/courses/post/new/", formData)
        .then(response => {
          console.log(response.data);
          this.$modal.hide("create-post");
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
    beforeOpen(event) {
      this.payload = {
        title: null,
        content: null,
        type: null
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$background_color: #404142;
$github_color: #dba226;
$facebook_color: #3880ff;
.list-group {
  max-height: 100px;
  width: 656px;
  margin-bottom: 10px;
  overflow: scroll;

  -webkit-overflow-scrolling: touch;
}
.box {
  background: white;
  overflow: hidden;
  width: 656px;
  height: 550px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;

  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 100%;
    width: 50%;
  }
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #f38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  input[type="password"],
  input[type="text"] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 80%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }
  label,
  a {
    font-size: 13px;
  }
  select {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }
  textarea {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }
  button {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    outline: none;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .button-small {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 50px;
    margin-top: 0px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    outline: none;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .large-btn {
    width: 100%;
    background: white;
    span {
      font-weight: 600;
    }
    &:hover {
      color: white !important;
    }
  }
  .button-set {
    margin-bottom: 8px;
  }
  #register-btn,
  #signin-btn {
    margin-left: 8px;
  }
  .facebook-btn {
    border-color: $facebook_color;
    color: $facebook_color;
    &:hover {
      border-color: $facebook_color;
      background: $facebook_color;
    }
  }
  .github-btn {
    border-color: $github_color;
    color: $github_color;
    &:hover {
      border-color: $github_color;
      background: $github_color;
    }
  }
  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>