const state = {
    user: null
}

const actions = {

    authenticate({commit}, data) {
        commit("setAuth", data)
    },

    async deauthenticate({commit}) {
        await this._vm.$axios.post("/users/logout", {})
        commit("remAuth")
    },

    async checkAuth({commit}) {
        try {
            let res = await this._vm.$axios.post("/users/checkauth", {})
            if(res.data.results != undefined || res.data.results != null) commit("setAuth", res.data.results)
        } catch (error) {
            
        }
    }

}

const mutations = {

    setAuth(state, data) {
        state.user = data
        console.log(data)
    },

    remAuth(state) {
        state.user = null
    }

}

const getters = {

    user: state => state.user

}


export default {
    state,
    actions,
    mutations, 
    getters
}