import axios from "axios"
import config from "../../config/"

const state = {
	products: [],
	product: {},
	images: [],
}

const actions = {
	async getProduct({ commit }, id) {
		let res = await axios.get(config.axiosConf.baseURL + "/products/" + id)
		commit("setProduct", res.data.results)
	},

	async getProductImages({ commit }, id) {
		let res = await axios.get(
			config.axiosConf.baseURL + "/productimages/" + id
		)
		commit("setProductImages", res.data.results)
	},
}

const mutations = {
	setProduct(state, data) {
		state.product = data
	},
	setProductImages(state, data) {
		state.images = data
	},
}

const getters = {
	product: (state) => state.product,
	images: (state) => state.images,
}

export default {
	actions,
	getters,
	mutations,
	state,
}
