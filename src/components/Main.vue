<template>
    <div>
        <my-header :cartItemCount="cartItemCount"></my-header>
        <main>
            <div v-for="product in sortedProducts" :key="product">
                <div class="row">
                    <div class="col">
                        <figure>
                            <img v-bind:src="product.image">	
                        </figure>
                    </div>
                    <div class="col col-expand">	
                        <h1 v-text="product.title"></h1>	
                        <p v-text="product.description"></p>	
                        <p class="price">
                            {{ product.price | formatPrice }}
                        </p>
                        <button class="btn btn-primary btn-lg"
                            v-on:click="addToCart(product)" 
                            v-if="canAddtoCart(product)">Добавить в корзину</button>
                        <button class="btn btn-primary btn-lg disabled" v-else>Добавить в корзину</button>
                        <span class="invetory-message" v-if="product.avaialableStock - cartCount(product.id) === 0">Товара нет складе</span>
                        <span class="invetory-message" v-else-if="product.avaialableStock - cartCount(product.id) < 5">В наличии {{ product.avaialableStock  - cartCount(product.id)}}  шт.</span>
                        <span class="invetory-message" v-else>Покупай сейчас!</span>
                        <div class="rating">
                            <span  v-bind:class="{'rating-active': checkRating(n, product)}" v-for="n in 5" :key="n" >☆</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import axios from 'axios'
import MyHeader from './Header.vue';
export default {
    name: 'imain',
    data(){
        return{
            products: new Array({}),
            cart: new Array()
        }
    },
    components: {MyHeader},
    filters: {
        formatPrice: function (price) {
            if(!parseInt(price)){return "";}
            if(price>9999){
                var priceString = (price/100).toFixed(2);
                var priceArray = priceString.split("").reverse();
                var index = 3;
                while(priceArray.length>index+3){
                    priceArray.splice(index+3,0,",");
                    index += 4;
                }
                return "₽ " + priceArray.reverse().join("");
            } else {
                return "₽ " + (price/100).toFixed(2);
            }
        }
    },
    methods: {
        checkRating(n, myProduct) {
            return myProduct.rating - n >= 0;
        },
        addToCart(aProduct) {
            this.cart.push(aProduct.id);
        },
        showCheckOut() {
            this.showProduct = this.showProduct ? false : true;
        },
        submitForm() {
            alert('Submitted');
        },
        canAddtoCart(aProduct) {
            //return this.product.availableInventory > this.cartItemCount;
            return aProduct.avaialableStock > this.cartCount(aProduct.id);
        },
        cartCount(id) {
            let count = 0;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                count++;
                }
            }
            return count;
        }
    },
    computed: {
        cartItemCount() {
            return this.cart.length || '';
        },
        // eslint-disable-next-line vue/return-in-computed-property
        sortedProducts() {
            if (this.products.length > 0) {
            let productsArray = this.products.slice(0);
            console.log(productsArray);
            console.log(this.products);
            // eslint-disable-next-line no-inner-declarations
            function compare(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase())
                return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase())
                return 1;
                return 0;
            }
            return productsArray.sort(compare);
            }
        }
    },
    created: function() {	
        axios.get('static/products.json')
            .then((response) =>{
            this.products=response.data.products;
            console.log(this.products);
        });
    },	
    watch:{},
}
</script>
<style scoped>
</style>