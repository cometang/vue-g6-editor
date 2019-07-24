import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './commen/api'
import commen from './commen/commen'

Vue.use(ElementUI)
Vue.config.productionTip = false


Vue.prototype.$commen = commen.commen
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
