<template>
  <div>
    <div class="search-tab-main">
      <router-link :to="{name: 'iMain'}">
        <div class="tab-banner background-rules" v-bind:style="{ backgroundImage: tabBannerPic}"></div>
      </router-link>
      <div class="tab-search">
        <input
          v-model.trim="searchData"
          class="background-rules"
          placeholder="Используйте наш уникальный поиск"
          v-bind:style="{ backgroundImage: tabSearchPic}"
        />
      </div>
      <div class="tab-contacts">
        <div class="tab-phone">
          <a :href="`tel:+${shopPhone}`">+{{ shopPhone }}</a>
        </div>
        <div class="tab-email background-rules" v-bind:style="{ backgroundImage: tabEmailPic}">
          <a :href="`mailto:${shopEmail}`">{{shopEmail}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "search-tab",
  data() {
    return {
      tabBannerPic: "url(images/tabbanner.png)",
      tabSearchPic: "url(images/search.png)",
      tabEmailPic: "url(images/mail_icon.png)",
      searchData: "Используйте наш уникальный поиск",
      shopPhone: "7 999 999 999",
      shopEmail: "hoz@zakaz.ru"
    };
  }
};
</script>
<style scoped>
.search-tab-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 116px;
  padding: 5px 3%;
}

.background-rules {
  background-repeat: no-repeat;
  background-size: contain;
}

.tab-banner {
  width: 200px;
  height: 100px;
}

.tab-search {
  padding-top: 25px;
}

.tab-search input {
  width: 375px;
  height: 50px;
  padding-left: 65px;
  margin: 0 auto;
  border-radius: 8px;
  border: solid 1.9px #ff6600;
  background-color: #ffffff;
}

.tab-search input::placeholder {
  font-family: Akrobat;
  font-size: 15px;
  font-stretch: normal;
  font-style: italic;
  letter-spacing: normal;
  text-align: left;
  color: #cccccc;
}

.tab-contacts {
  width: 375px;
  height: 115px;
}

.tab-contacts a{
  width: 124px;
  height: 20px;
  font-family: Akrobat;
  font-size: 22.5px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #666666;
}

.tab-phone a{
    font-style: italic;
    font-size: 25px;
    text-align: justify
}

.tab-email{
    padding-left: 40px;
    text-align: left;
}

</style>