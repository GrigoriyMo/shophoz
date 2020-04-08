<template>
    <header>
        <div class="navbar navbar-default"> 
            <div class="navbar-header">
                <h1> <router-link :to="{name: 'iMain'}">
                    {{ sitename }}
                    </router-link>
                </h1>
            </div>
        </div>
        <div class="nav navbar-nav navbar-right cart" >
            <router-link active-class="active" tag="button" class="btn btn-default btn-lg" :to="{name: 'Form'}">    
                <div class="cart"> {{ cartItemCount }} товаров в корзине </div> Оформить
            </router-link>
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

    .router-link-exact-active{
        color: blue;
    }
</style>