import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import G6 from '@antv/g6'


Vue.config.productionTip = false
Vue.prototype.G6 = G6

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
