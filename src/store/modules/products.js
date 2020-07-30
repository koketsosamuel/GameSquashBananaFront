import qs from "querystringify"

const state = {
	productsObj: {
		products: [],
		nav: {
			page: 1,
			pages: 1,
			perpage: 18,
		},
	},
	product: {},
	images: [],
}

const actions = {
	async getProduct({ commit }, productId) {
		let res = await this._vm.$axios.get(
			"/products/" + productId
		)
		commit("setProduct", res.data.results)
	},

	async getProducts({ commit }, query) {
		let res = await this._vm.$axios.get(
			 
			"/products/" + 
			qs.stringify(query, true)
		)
		commit("setProducts", res.data)
	},

	async getProductImages({ commit }, id) {
		let res = await this._vm.$axios.get(
			 "/productimages/" + id
		)
		commit("setProductImages", res.data.results)
	},
}

const mutations = {
	setProduct(state, data) {
		state.product = data
	},
	setProducts(state, data) {
		state.productsObj.products = data.results
		state.productsObj.nav = data.nav
	},
	setProductImages(state, data) {
		state.images = data
	},
}

const getters = {
	product: (state) => state.product,
	images: (state) => state.images,
	productsObj: (state) => state.productsObj,
}

export default {
	actions,
	getters,
	mutations,
	state,
}
