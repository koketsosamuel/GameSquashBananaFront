import axios from "axios"
import config from "../../config"

const state = {
	subCategories: [],
}

const actions = {
	async getSubCategories({ commit }, categoryId) {
		let res = await this._vm.$axios.get("/subcategories/"+categoryId)
		commit("setSubCategories", res.data.results)
	},
}

const getters = {
	subCategories: (state) => state.subCategories,
}

const mutations = {
	setSubCategories(state, data) {
		state.subCategories = data
	},
}

export default {
	state,
	actions,
	mutations,
	getters,
}
