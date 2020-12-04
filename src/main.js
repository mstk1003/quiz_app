import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
