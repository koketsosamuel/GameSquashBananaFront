const state = {
    cart: {
        items: [],
        total: 0,
        checkout: true
    },

    wishlist: []
}

const getters = {
    cart: state => state.cart,
    wishlist: state => state.wishlist
}

const actions = {

    
    async getCart({commit}) {

        try {
            let res = await this._vm.$axios.get("/cartitems")
            commit("setCart", res.data.results)
        } catch (error) {
            
        }

    },

    async getWishlist({commit}) {

        try {
            let res = await this._vm.$axios.get("/cartitems?wish=true")
            commit("setWishlist", res.data.results.items)
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

    },

    async setWishlist(state, data) {
        
        state.wishlist = data

    }
}

export default {
    state,
    mutations,
    actions,
    getters
}