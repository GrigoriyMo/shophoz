import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Product from '@/components/Product'
import EditProduct from '@/components/EditProduct'
import Cart from '@/components/Cart'

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
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart,
            props: true
        },
        {
            path: '/product/:id',
            name: 'Id',
            component: Product,
            props: true,
            children: [
                {
                path: 'edit',
                name: 'Edit',
                component: EditProduct,
                props: true
                }
            ]
        },{
            path: '*',
            redirect: '/'
        }
    ]
})