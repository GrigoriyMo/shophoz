<template>
  <div>
    <div class="listing-group">
      <side-bar></side-bar>
      <listing></listing>
    </div>
  </div>
</template>
<script>
import Listing from "./Listing.vue";
import { mapGetters } from "vuex";
import SideBar from "./SideBar.vue";

export default {
  name: "imain",
  data() {
    return {
      cart: new Array()
    };
  },
  created: function() {},
    components: { Listing,SideBar},
  methods: {
    onCartUpdate(cart) {
      this.cart = cart;
    },
    showCheckOut() {
      this.showProduct = this.showProduct ? false : true;
    },
    submitForm() {
      alert("Submitted");
    }
  },
  computed: {
    ...mapGetters(["session"]),
    cartItemCount() {
      var count = null;
      for (var i = 0; i < this.cart.length; i++) {
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