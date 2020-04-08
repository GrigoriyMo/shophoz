import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '@/components/Form'
import Main from '@/components/Main'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'iMain',
            component: Main,
            props: true
        },
        {
            path: '/form',
            name: 'Form',
            component: Form,
            props: true
        }
    ]
})