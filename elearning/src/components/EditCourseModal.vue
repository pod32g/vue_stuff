<template>
  <modal
    name="edit-courses"
    transition="pop-out"
    :width="modalWidth"
    :height="550"
    @before-open="beforeOpen"
  >
    <div class="box">
      <div class="partition" id="partition-register">
        <div class="partition-title">EDITAR CURSO</div>
        <div class="partition-form">
          <form autocomplete="false" v-on:submit="saveCourse">
            <div class="autocomplete-fix">
              <input type="password">
            </div>

            <input v-model="payload.name" type="text" placeholder="Titulo">
            <datepicker
              :format="formatter"
              :languaje="es"
              v-model="payload.start"
              placeholder="Inicio"
            ></datepicker>
            <datepicker :format="formatter" :languaje="es" v-model="payload.end" placeholder="Fin"></datepicker>
            <input v-model="payload.password" type="text" placeholder="Contraseña del curso">
          </form>

          <div style="margin-top: 42px"></div>

          <div class="button-set">
            <button v-on:click="saveCourse">Guardar</button>
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
  name: "EditCourseModal",
  data() {
    return {
      payload: {
        name: null,
        start: null,
        end: null,
        password: null
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
    saveCourse() {
      var request = {
        id: this.payload.id,
        name: this.payload.name,
        start: moment(this.payload.start).format("YYYY-MM-DD"),
        end: moment(this.payload.end).format("YYYY-MM-DD"),
        password: this.payload.password
      };
      this.$http
        .post("/courses/update/", request)
        .then(response => {
          console.log(response.data);
          this.$modal.hide("edit-courses");
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
      this.$http
        .get("/courses/get/" + this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.payload = response.data;
          this.payload = {
            id: response.data.id,
            name: response.data.name,
            start: response.data.start,
            end: response.data.end,
            password: response.data.password
          };
        })
        .catch(e => {
          this.payload = {
            name: null,
            start: null,
            end: null,
            password: null
          };
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