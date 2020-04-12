<template>
    <div>
        <my-header :cartItemCount="cartItemCount"></my-header>
        <main>
            <div v-for="product in sortedProducts" :key="product.id">
                <div class="row">
                    <div class="col">
                        <figure>
                            <img v-bind:src="product.image">	
                        </figure>
                    </div>
                    <div class="col col-expand">	
                        <router-link
                            tag="h1"
                            :to="{ name : 'Id', params: {id:product.id} }"
                            >{{product.title}}
                        </router-link>	
                        <p v-text="product.description"></p>	
                        <p class="price">
                            {{ product.price | formatPrice }}
                        </p>
                        <button class="btn btn-primary btn-lg"
                            v-on:click="addToCart(product)" 
                            v-if="canAddtoCart(product)">Добавить в корзину</button>
                        <button class="btn btn-primary btn-lg disabled" v-else>Добавить в корзину</button>
                        <transition name="bounce" mode="out-in">
                            <span class="invetory-message" v-if="product.avaialableStock - cartCount(product.id) === 0" key="0">Товара нет складе</span>
                            <span class="invetory-message" v-else-if="product.avaialableStock - cartCount(product.id) < 5" key="">В наличии {{ product.avaialableStock  - cartCount(product.id)}}  шт.</span>
                            <span class="invetory-message" v-else>Покупай сейчас!</span>
                        </transition>
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
        axios.get('products.json')
            .then((response) =>{
            this.products=response.data.products;
            console.log(this.products);
        });
    },	
    watch:{},
}
</script>
<style scoped>
.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(.37,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
@keyframes shake {
  10%, 90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    color: red;
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>