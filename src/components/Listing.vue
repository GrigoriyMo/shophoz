<template>
  <div class="hoz-container">
    <main>
      <div v-for="product in sortedProducts" :key="product.id">
        <div class="row">
          <div class="col">
            <figure>
              <img v-bind:src="product.image" />
            </figure>
          </div>
          <div class="col col-expand">
            <div class="flex-container">
              <!-- <p v-text="product.description"></p> -->
              <p class="price">{{ product.price | formatPrice }}</p>
              <button
                class
                v-on:click="addToCart(product)"
                v-if="canAddtoCart(product)"
                v-bind:style="{ backgroundImage: buttoncart}"
              ></button>
              <button class="disabled" v-bind:style="{ backgroundImage: buttoncart}" v-else></button>
            </div>
            <router-link tag="p" :to="{ name : 'Id', params: {id:product.id} }">{{product.title}}</router-link>
            <transition name="bounce" mode="out-in">
              <span
                class="invetory-message"
                v-if="product.avaialableStock - cartCount(product.id) === 0"
                key="0"
              >Товара нет складе</span>
              <span
                class="invetory-message"
                v-else-if="product.avaialableStock - cartCount(product.id) < 5"
                key
              >В наличии {{ product.avaialableStock - cartCount(product.id)}} шт.</span>
              <span class="invetory-message" v-else>Покупай сейчас!</span>
            </transition>
            <div class="rating">
              <span
                v-bind:class="{'rating-active': checkRating(n, product)}"
                v-for="n in 5"
                :key="n"
              >☆</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "listing",
  data() {
    return {
      products: new Array(),
      cart: new Array(),
      buttoncart:"url(images/korzinka.png)"
    };
  },
  props: ["category_id"],
  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      var newproduct = true;
        for(var i = 0; i < this.cart.length; i++){
          if(this.cart[i]){
              if(this.cart[i].price === aProduct.price){
                //increment already existing prdcxtr qty
                console.log('//increment already existing prdcxtr qty')
                this.cart[i].piece = this.cart[i].piece + 1;
                newproduct = false;
                break;
              }
            }
        }
        if(newproduct){
          //add new proudct in cart
          console.log('    //add new proudct in cart')
          this.cart.push({ 
            id: aProduct.id, 
            piece: 1, 
            price: aProduct.price,
            myindex: (this.cart.length)
          });
        }
      this.$emit('cartupdate', this.cart)
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
    },
    selectCategoryProductsById: function(products, category_id){
        for(var i = 0; i < 500;i++){
          var productCopy = {...products[0]};
            productCopy.id = i+2;
            products.push(productCopy)
        }
        for(var c = 504; c < 803; c++){
          var productCopy2 = {...products[1]};
            productCopy2.id = c+2;
            products.push(productCopy2)        
        }
        
        return products.filter(product=>product.category_id === category_id) ;
    }
  },
  created: function() {
    axios.get("/products.json").then(response => {
      this.products = response.data.products;
    });
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    sortedProducts() {
      if (this.products.length > 0) {
        let productsArray = this.products.slice(0);
        // eslint-disable-next-line no-inner-declarations
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }
        
        return this.selectCategoryProductsById(productsArray.sort(compare), this.category_id);
      }
    }
  },
  filters: {
    formatPrice: function(price) {
      if (!parseInt(price)) {
        return "";
      }
      if (price > 9999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split("").reverse();
        var index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ",");
          index += 4;
        }
        return  priceArray.reverse().join("") + "₽";
      } else {
        return (price / 100).toFixed(0) + "₽";
      }
    }
  }
};
</script>
<style scoped>
main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;
    background-repeat: no-repeat;
    background-size:100%;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable `input` types in iOS */
    -webkit-appearance: none;
    width: 47px;
    height: 40px;
}

.hoz-container {
  background-color: white;
  margin: 0 auto;
  flex-grow: 2;
  padding-top: 44px;
  padding-left: 129px;
}

.flex-container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
}

figure img {
  display: block;
  width: 181px;
  height: 209px;
  margin: 0 auto;
}

.price {
    font-size: 24px;
    margin: 0px;
    padding-top: 10px;
}
</style>