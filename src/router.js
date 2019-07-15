import Vue from 'vue'
import Router from 'vue-router'
// import home from './views/home'

const test = () => import('./views/test')
const test1 =()=> import('./views/test1')


Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'test1',
            component: test1
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path:'/test1',
            name:'test1',
            component:test1
        }
    ]
})
