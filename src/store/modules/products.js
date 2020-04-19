//import axios from 'axios';
import { initializeApp } from 'firebase';

const db = initializeApp({
    apiKey: "AIzaSyCgMQNeOVfEGzOI_DWiv8AcYIySt8JjHgw",
    authDomain: "shophoz.firebaseapp.com",
    databaseURL: "https://shophoz.firebaseio.com",
    projectId: "shophoz",
    storageBucket: "shophoz.appspot.com",
    messagingSenderId: "190483910921",
    appId: "1:190483910921:web:467ad486b90be4bb5543d8"
}).database();

const state = {
    products : {},
    session: false
}

const getters = {
    products: state => state.products,
    session: state => state.session
}

const actions = {
    initStore: ({commit}) => {
/*         axios.get('/products.json')
        .then((response) =>{
            console.log(response.data.products);
            commit('SET_STORE', response.data.products )
        });
 */
        console.log('initStore')
        db.ref('products').once('value').then( function(snapshot) {
            console.log(  snapshot.val() );
            console.log(1)
            commit('SET_STORE', snapshot.val()); 
          });
    }
}

const mutations = {
    'SET_STORE' (state, products) {
        state.products = products;
        
    },
    'SET_SESSION' (state, session){
        state.session = session;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}