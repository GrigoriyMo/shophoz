<template>
    <header>
        <div class="navbar navbar-default"> 
            <h1> <router-link :to="{name: 'iMain'}">
                {{ sitename }}
                </router-link>
            </h1>
        </div>
        <div class="nav navbar-nav navbar-right cart" >
            <button type="button"
            class="btn btn-default btn-lg"
            v-on:click="showCheckOut">
            <div class="cart"> {{ cartItemCount }} товаров в корзине </div> Оформить
            </button>
        </div>
    </header>
</template>
<script>
export default {
    name: 'my-header',
    data(){
        return{
            sitename: "Магазин хозяйственных товаров"
        }
    },
    props: ['cartItemCount'],
    methods : {
        showCheckOut(){
            this.$router.push({name:'Form'})
        }
    }
}
</script>
<style scoped>
    a {
        text-decoration: none;
        color: black;
    }
</style>