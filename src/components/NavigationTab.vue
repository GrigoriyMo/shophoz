<template>
  <div class="navigation-tab">
    <li v-for="tab in tab_options" v-bind:key="tab"> <span> {{tab}}</span></li>
  </div>
</template>
<script>
export default {
  name: "navigation-tab",
  data() {
    return {
      tab_options: [
        "Главная",
        "Каталог",
        "Производители",
        "Акции и скидки",
        "Новости",
        "Оплата",
        "Доставка",
        "Контакты"
      ]
    };
  }
};
</script>
<style scoped>
.navigation-tab {
  height: 35px;
  background-color: #ffff99;
}

li {
  display: inline-block;
  width: 125px;
  text-align: center;
  padding-top: 15px;
  background-color: #ffffcc;
  margin-left: 5px;
}

span {
  margin-left: 5px;
  font-family: Akrobat;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
}
</style>