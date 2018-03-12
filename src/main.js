// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {form, formItem, Loading, input, row, col, Notification} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import fullpage from 'fullpage.js/dist/jquery.fullpage.min'
import App from './App'
import router from './router'
import './scss/global.scss';
import vueResource from 'vue-resource'

Vue.use(form)
Vue.use(formItem)
Vue.use(input)
Vue.use(row)
Vue.use(col)
Vue.component(Notification.name, Notification)
Vue.use(vueResource)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App: App }
})
