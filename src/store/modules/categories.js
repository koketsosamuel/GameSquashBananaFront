import axios from "axios"
import config from "../../config/"

const state = {
	categories: [],
}

const actions = {
	async getCategories({ commit }) {
		let res = await axios.get(config.axiosConf.baseURL + "/categories")
		commit("setCategories", res.data.results)
	},
}

const getters = {
	categories: (state) => state.categories,
}

const mutations = {
	setCategories(state, data) {
		state.categories = data
	},
}

export default {
	state,
	actions,
	mutations,
	getters,
}
