import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify"
import confirmAction from "./components/confirmAction.vue"
import Editor from "v-markdown-editor"
import toast from "vue-toastification"
import progress from "vue-progress-indicator"

import "./assets/bootstrap-grid.min.css"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@mdi/font/css/materialdesignicons.css"
import "v-markdown-editor/dist/v-markdown-editor.css"
import "vue-toastification/dist/index.css"

import axios from "axios"
import store from "./store"
import router from "./router"

let axiosMod = axios.create({
	baseURL: "http://127.0.0.1:3000",
	withCredentials: true
})

// global register markdown register
Vue.use(Editor)
Vue.use(toast)
Vue.use(progress)

Vue.config.productionTip = false

// protos
Vue.prototype.$loading = true
Vue.prototype.$baseURL = "http://127.0.0.1:3000/"

Vue.component("confirmAction", confirmAction)

axiosMod.interceptors.request.use(
	(config) => {
		Vue.$progress.show()
		return config
	},
	(error) => {
		Vue.$toast.error(String(error))
		return error
	}
)
	
axiosMod.interceptors.response.use(
	(res) => {
		Vue.$progress.show()
		
		if (res.data.msg) Vue.$toast.success(res.data.msg)
		if(res.data.err) Vue.$toast.error(res.data.err.msg)
		return res
	},
	(error) => {
		Vue.$toast.error(String(error))
		return error
	}
)
		
Vue.prototype.$axios = axiosMod
		
new Vue({
	vuetify,
	store,
	router,
	render: (h) => h(App),
}).$mount("#app")
