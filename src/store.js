import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      flowData:{
        graph:'',
        /*选中节点*/
        graphActive:{
          graphId:'',
          graphLabel:'',
          graphType:'',
        }
      }
  },
  mutations: {

  },
  actions: {

  }
})
