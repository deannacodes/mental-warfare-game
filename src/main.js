import Vue from 'vue'
import App from './components/App.vue'
import Add from './components/Add.vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import { store } from './store.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'

Vue.use(BootstrapVue)
Vue.use(Vuex)


new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  store,
  computed: {
    ViewComponent() {
      let uri = window.location.href.split("/")
      let route = uri[uri.length-2]
      console.log(uri,route)
      if (route == "supersecret") {
        return App
      } else {
        return Add
      }      
    }
  },
  created() {
    this.$store.dispatch('getGameId')
  },
  render (h) { return h(this.ViewComponent) }
})


window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})