<template>
  <header>
    <div class="navbar navbar-default">
      <div class="account-block" v-if="!mySession">
        <div class="sign-in header-div" v-on:click="signIn" v-bind:style="{ backgroundImage: signInPic}">
          <span>{{ loginTitle }}</span>
        </div>
        <div class="registration header-div" v-on:click="signIn" v-bind:style="{ backgroundImage: registrationPic}">
          <span>{{ registrationTitle }}</span>
        </div>
      </div>
      <div class="header-div" v-else>
        <button type="button" class v-on:click="signOut">
          <img class="photo" :src="mySession.photoURL" />
          <span>{{ signoutTitle }}</span>
        </button>
      </div>
      <div class="saved-products header-div" v-bind:style="{ backgroundImage: savedProductsPic}">
        <span>{{savedProducts }} <span class="circle-count"> {{ savedProductsCount }} </span> </span>
      </div>
      <router-link active-class="active" tag="div" class="cart" :to="{name: 'Cart'}">
        <span>{{ cartTitle }} <span class="circle-count">{{ cartItemCount || 0}} </span> {{ cartPrice|formatPrice }}</span>
      </router-link>
      <router-link active-class="active" tag="div" class="place-order" :to="{name: 'Cart'}">
        <span>{{ placeOrder }}</span>
      </router-link>
    </div>
  </header>
</template>
<script>
import firebase from "firebase";
export default {
  name: "my-header",
  data() {
    return {
      sitename: "",
      loginTitle: "Войти",
      registrationTitle: "Регистрация",
      savedProducts: "Отложенные",
      cartTitle: "Моя корзина",
      signoutTitle: "Выйти",
      savedProductsCount: 0,
      placeOrder: "Оформить заказ",
      signInPic: "url(images/Door_open.png)",
      registrationPic: "url(images/people_icon.png)",
      savedProductsPic: "url(images/starIcon.png)",
    };
  },
  props: {
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.commit("SET_SESSION", user || false);
    });
  },
  methods: {
    showCheckOut() {
      this.$router.push({ name: "Form" });
    },
    signIn() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log("signed in");
          result;
        })
        .catch(function(error) {
          console.log("error:" + error);
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("signed out!");
        })
        .catch(function(error) {
          console.log("error in sign out!" + error);
          // An error happened.
        });
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
  },
  computed: {
    mySession() {
      return this.$store.getters.session;
    },
    cartItemCount(){
      return this.$store.getters.cartItemCount;
    },
    cartPrice(){
      return this.$store.getters.cartPrice;
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
}

.photo {
  width: 25px;
  height: 25px;
}

.router-link-exact-active {
  color: black;
}

.navbar {
  padding: 20px 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 87px;
  box-shadow: 0px 4px 15.7px 2.3px rgba(0, 51, 102, 0.21);
  background-color: #ff9933;
}

.navbar span {
  width: 52px;
  height: 19px;
  font-family: Akrobat-bold;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}

.header-div {
  width: 185px;
}

.account-block {
  display: flex;
  flex-direction: row;
}

.sign-in, .registration, .saved-products, .cart, .place-order{
    background-repeat: no-repeat;
    background-size: 30px 40px;
    padding-left: 38px;
    padding-top: 24px;
}

.registration{
    padding-left: 40px;
}

.saved-products {
    padding-left: 32px;
    padding-top: 15px;
    width: 190px;
}

.cart {
  padding-left: 55px;
  padding-top: 15px;
  background-image: url(/images/recycleIcon.png);
  background-size: 51px 44px ;
}

span.circle-count{
    display: inline-block;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    padding: 8px;
    background: #fff;
    color:black;
    text-align: center;
}

</style>