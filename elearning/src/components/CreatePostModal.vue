<template>
  <modal
    name="create-post"
    transition="pop-out"
    :width="modalWidth"
    :height="550"
    @before-open="beforeOpen"
  >
    <div class="box">
      <div class="partition" id="partition-register">
        <div class="partition-title">NUEVO POST</div>
        <div class="partition-form">
          <form autocomplete="false" v-on:submit="newPost">
            <div class="autocomplete-fix">
              <input type="password">
            </div>

            <input v-model="payload.title" type="text" placeholder="Titulo">
            <textarea class="form-control" v-model="payload.content" placeholder="Contenido"/>
            <datepicker
              v-if="payload.type == 1"
              :format="formatter"
              v-model="payload.limit"
              placeholder="Fecha Limite"
            ></datepicker>
            <select v-model="payload.type">
              <option value="0" selected="true">Post</option>
              <option value="1">Tarea</option>
            </select>
            <label>
              Archivo:
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
            </label>
          </form>

          <div style="margin-top: 42px"></div>

          <div class="button-set">
            <button v-on:click="newPost">Crear post</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
/* eslint-disable */

import Datepicker from "vuejs-datepicker";
import { en, es } from "vuejs-datepicker/dist/locale";
import moment from "moment";

const MODAL_WIDTH = 656;

export default {
  name: "CreateCourseModal",
  data() {
    return {
      file: "",
      payload: {
        title: null,
        content: null,
        type: null,
        limit: null
      },
      en: en,
      es: es,
      modalWidth: MODAL_WIDTH
    };
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  components: {
    Datepicker
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    newPost() {
      var request = {
        course: this.$route.params.id,
        title: this.payload.title,
        content: this.payload.content,
        type: this.payload.type,
        limit: moment(this.payload.limit).format("YYYY-MM-DD")
      };
      var formData = new FormData();
      formData.append("file", this.file);
      formData.append("request", JSON.stringify(request));

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
    },
    formatter(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="scss">
$background_color: #404142;
$github_color: #dba226;
$facebook_color: #3880ff;
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
  input[type="file"],
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