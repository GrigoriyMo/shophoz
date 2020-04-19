<template>
    <div class="side-bar-container">
      <div class="m-text-container">
        <span class="m-text">
          {{listTitle}}
        </span>
      </div>
      <ul>
        <li v-for="item in menu" v-bind:key="item.id" v-on:click="switchCategory(item.id)">
             <div class="m-text">  {{item.name}}</div>
        </li>
      </ul>
      <div class="news-subscribe">
        <p class="news-subscribe-title">{{newsSubscribeTitle}}</p>
        <p class="news-subscribe-additional-info">{{newsSubscribeString}}</p>
        <div class="email-input-wrapper">
          <input type="email" placeholder="Email">
        </div>
        <div class="button-wrapper">
          <button>{{ buttonSubscribe }}</button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "side-bar",
  data() {
    return {
      newsSubscribeTitle: "Будьте в курсе!",
      newsSubscribeString: "новости, обзоры, акции",
      buttonSubscribe: "подписаться",
        menu:[
          {id:1,name:"Сантехника"},
          {id:2,name:"Электротовары"},
          {id:3,name:"Раздел1"},
          {id:4,name:"Раздел2"},
          {id:5,name:"Раздел3"},
          {id:6,name:"Раздел4"},
          {id:7,name:"Раздел5"},
          {id:8,name:"Раздел6"},
          {id:9,name:"Раздел7"},
          {id:10,name:"Раздел8"},
          {id:11,name:"Раздел9"}
        ],
        listTitle: "Каталог товаров" 
    };
  },
  methods:{
    switchCategory(id){
      this.$emit('categorychange', id)
    }
  }
};
</script>
<style scoped>





li div{
  width: 168px;
  height: 40px;
  border-radius: 5px;
  border: solid 2.5px #cccccc;
  background-color: #fffff7;
  margin-bottom: 4px;
}

.m-text-container{
  height: 45px;
}

.m-text{
  text-align: center;
  font-family: Akrobat;
  font-size: 18px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #000000;
  line-height: 45px;
}

.news-subscribe{
  width: 169px;
  height: 149px;
  background-color: #ffff99;
  padding-top: 8px;
  margin-bottom: 45px;
}

.button-wrapper, .email-input-wrapper {
   width: 146px;
   margin: 0 auto;
   padding:20px 0;
}

.email-input-wrapper {
  padding:0px;
}
.news-subscribe input {
  width: 152px;
  height: 28px;
  border-radius: 4px;
  background-color: #fffff7;
}

.news-subscribe-title{
  height: 22px;
  font-family: Akrobat;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 22px;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin: 0px;
}

.news-subscribe-additional-info{
  height: 15px;
  font-family: Akrobat;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 15px;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
}

button {
  width: 146px;
  height: 29px;
  border-radius: 5px;
  background-color: #ffcc33;
}

</style>