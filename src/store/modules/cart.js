import jsCookie from "js-cookie"

const state = {
    cart: {
        items: [],
        total: 0,
        checkout: true
    }
}

const getters = {
    cart: state => state.cart
}

const actions = {

    
    async getCart({commit}) {

        try {
            let res = await this._vm.$axios.get("/cartitems")
            console.log(res)
            commit("setCart", res.data.results)
        } catch (error) {
            
        }

    }


}

const mutations = {

    async setCart(state, data) {
        
        state.cart = data
        state.cart.checkout = true

        for(let i of state.cart.items) {
            if(i.quantity > i.product.quantity) state.cart.checkout = false
            if(i.product.quantity <= 0) state.cart.checkout = false
        }

    }
}

export default {
    state,
    mutations,
    actions,
    getters
}