<template>
  <div>
     <div class="m-main">
        <div class="listing-group" >
            <side-bar @categorychange="onCategoryChange($event)" ></side-bar>
            <listing @cartupdate="onCartUpdate($event)" :category_id="cat_id"></listing>
        </div>
     </div>
  </div>
</template>
<script>
import Listing from "./Listing.vue";
import SideBar from "./SideBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "imain",
  data() {
    return {
      cart: new Array(),
      cat_id: this.category_id || 1
    };
  },
  props:{
      category_id: Number,
  },
  created: function(){

  },
  components: {    SideBar, Listing },
  methods: {
    onCategoryChange(category_id){
        this.cat_id = category_id;
    },
    onCartUpdate(cart){
        this.cart = cart;
    },
    showCheckOut() {
      this.showProduct = this.showProduct ? false : true;
    },
    submitForm() {
      alert("Submitted");
    },
  },
  computed: {
    ...mapGetters(["session"]),
    cartItemCount() {
        var count=null;
        for(var i = 0; i < this.cart.length;i++){
            count = count + this.cart[i].piece;
        }
        return count;
    }
  },
  watch: {}
};
</script>
<style scoped>
.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(0.37, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.listing-group{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: auto;
}

@keyframes shake {
  10%,
  90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    color: red;
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>