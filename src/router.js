import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'

const test = () => import('./views/test')
const test1 =()=> import('./views/test1')
const formDesign =()=>import('./views/formDesign')
const flowDesign =()=>import('./views/flowDesign')


const g6Editor =()=>import('./views/g6Editor')


Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path:'/formDesign',
            name:'formDesign',
            component:formDesign
        },
        {
            path:'/flowDesign',
            name:'flowDesign',
            component:flowDesign
		},
        {
            path:'/g6Editor',
            name:'g6Editor',
            component:g6Editor
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
