const state= {
    category_id: 1
}
const getters ={
    categoryId(){
        return state.category_id;
    }
}

const mutations ={
    switchCategory(state, category_id){
        state.category_id = category_id;
    }
}

const actions= {
    switchCategory(context, category_id){
        context.commit('switchCategory', category_id)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}