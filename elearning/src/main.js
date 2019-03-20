// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dialog: true, dynamic: true })
Vue.use(VueCookies)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const base = axios.create({
  baseURL: 'http://localhost:8000'
})

Vue.prototype.$cookies = VueCookies
Vue.prototype.$session = VueCookies.get('session')
Vue.prototype.$http = base

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
