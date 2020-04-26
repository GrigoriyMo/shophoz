const state = {
    cart: new Array()
}

const getters = {
    cart(state){
        return state.cart;
    },

    cartItemCount(){
        var count=null;
        for(var i = 0; i < state.cart.length;i++){
            count = count + state.cart[i].piece;
        }
        return count;
    },
    cartPrice() {
        if (state.cart.length) {
            var sum = 0;
          for(var i=0;i<state.cart.length;i++){
              sum = sum + (state.cart[i].price*state.cart[i].piece);
          }
          return sum;
        } else {
          return 0;
        }
      },
}

const mutations = {
    addToCart(state, aProduct){
        var newproduct = true;
        for(var i = 0; i < state.cart.length; i++){
          if(state.cart[i]){
              if(state.cart[i].price === aProduct.price){
                //increment already existing prdcxtr qty
                console.log('//increment already existing prdcxtr qty')
                state.cart[i].piece = state.cart[i].piece + 1;
                newproduct = false;
                break;
              }
            }
        }
        if(newproduct){
          //add new proudct in cart
          console.log('    //add new proudct in cart')
          state.cart.push({ 
            id: aProduct.id, 
            piece: 1, 
            price: aProduct.price,
            myindex: (state.cart.length),
            description: aProduct.description,
            image: aProduct.image
          });
        }
    }
}

const actions = {
    addToCart(context,aProduct){
        context.commit('addToCart',aProduct)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}