<template>
  <div id="app">
    <my-header></my-header>
    <search-tab></search-tab>
    <navigation-tab></navigation-tab>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <page-footer></page-footer>
  </div>
</template>
<script>
import SearchTab from "./components/SearchTab.vue";
import MyHeader from "./components/Header.vue";
import PageFooter from "./components/Footer.vue";
import NavigationTab from "./components/NavigationTab.vue";
export default {
  name: "App",
   components: { MyHeader,NavigationTab, PageFooter, SearchTab },
};
</script>
<style>
#app {
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter,
.faed-leave-to {
  opacity: 0;
}
</style>
