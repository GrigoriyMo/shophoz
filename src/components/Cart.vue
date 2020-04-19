<template>
  <div>
    <my-header :cartItemCount="cartItemCount" :cartPrice="cartPrice"></my-header>
    <search-tab></search-tab>
    <navigation-tab></navigation-tab>
    <div class="m-main">
      <div class="cart-detailed">
        <side-bar ></side-bar>
        <div class="cart-rows">
          <div class="cart-header-one">
            <h1>{{ CartTitle }}</h1>
          </div>
          <ul class="ul-cart">
            <li v-for="(product) in clearedRenderCartData" :key="product.key">
              <div class="cart-row">
                <div class="title-and-photo">
                  <div class="cart-title">{{ product.title }}</div> 
                  <div class="photo">
                    <img v-bind:src="product.image" />
                  </div>
                </div>
                <div class="description" v-html="product.description"></div>
                <div class="price">
                  <div class="price-title cart-title">{{ priceTitle }}</div>
                  <div class="price-amount">{{ product.price | formatPrice}}</div>
                </div>
                <div class="quantity">
                  <div class="quantity-title cart-title">{{ quantityTitle }}</div>
                  <div class="quantity-counter">{{ product.piece }}шт.</div>
                </div>
                <div class="row-total">
                  <div class="row-total-title cart-title">{{ rowTotalTitle }}</div>
                  <div class="row-total-value">{{ product.piece*product.price |  formatPrice}}</div>
                </div>
                <div class="delete-product" v-on:click="deleteProductFromCart(product.myindex)" v-bind:style="{ backgroundImage: recyclePic}"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<script>
import MyHeader from "./Header.vue";
import SideBar from "./SideBar.vue";
import SearchTab from "./SearchTab.vue";
import NavigationTab from "./NavigationTab.vue";
import PageFooter from "./Footer.vue";
import axios from "axios";

export default {
  name: "Cart",
  components: { MyHeader, SideBar, SearchTab, NavigationTab, PageFooter },
  data() {
    return {
      recyclePic: 'url(images/recycle.png)',
      products: null,
      clearedRenderCartData: new Array(),
      priceTitle: "Цена",
      quantityTitle: "Количество",
      rowTotalTitle: "Всего",
      CartTitle: "Корзина",
      tempArr:null
    };
  },
  props: {
    cartContent: Array,
    cartItemCount: Number,
    cartPrice: Number
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
  },
  created: function() {
    axios.get("/products.json").then(response => {
      this.products = response.data.products;
      for (var c = 0; c < this.cartContent.length; c++) {
        this.clearedRenderCartData.push(
          this.selectProductDataById(this.cartContent[c])
        );
      }
    });
  },
  methods: {
    deleteProductFromCart:function(index){
        console.log(index)
        console.log('deleteProductFromCart')
        for(var i =  0; i < this.clearedRenderCartData.length; i++) {
            if(this.clearedRenderCartData[i].myindex === index) {
                this.clearedRenderCartData.splice(i, 1);
            }
        }
        return;
    },
    selectProductDataById: function(productId) {
      var result;
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].price === productId.price) {
          result = this.products[i];
          result.piece = productId.piece;
          result.myindex = productId.myindex;
        }
      }
      return result;
    }
  }
};
</script>
<style scoped>
h1 {
  margin: 0 auto;
  text-align: center;
}

.m-main {
  font-family: Akrobat;
  font-size: 14px;
}

.cart-detailed {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding-top: 54px;
}

.ul-cart {
  padding-left: 35px;
}

.cart-rows {
  display: flex;
  flex-direction: column;
}
.cart-row {
  height: 160px;
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.cart-title {
  height: 65px;
  width: 105px;
  font-family: Akrobat;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
}

.photo {
  width: 92px;
  height: 85px;
}

.photo img {
  width: 100%;
  height: 100%;
}

.description {
  padding-top: 32.5px;
  padding-left: 55px;
}

.price-amount, .quantity-counter, .row-total-value{
    text-align: center;
}

.title-and-photo,
.price,
.quantity,
.row-total {
  display: flex;
  flex-direction: column;
}

.delete-product{
    padding-top: 80px;
    height: 19px;
    width: 16px;
    background-repeat: no-repeat;
    background-position: center bottom;
}
</style>