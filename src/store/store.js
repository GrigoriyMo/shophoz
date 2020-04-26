import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import cart from './modules/cart';
import category from './modules/category';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        products,
        cart,
        category
    }
})