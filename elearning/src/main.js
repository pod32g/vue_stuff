// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSidebarMenu from 'vue-sidebar-menu'
import axios from 'axios'

Vue.use(VueSidebarMenu)
Vue.config.productionTip = false

const base = axios.create({
  baseURL: 'http://localhost:8000'
})

Vue.prototype.$http = base

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
