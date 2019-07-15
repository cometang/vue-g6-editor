import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import G6 from '@antv/g6'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.G6 = G6

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
