import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import './assets/styles/styles.scss'
import request from '@/utils/request'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  request,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
