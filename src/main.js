import Vue from "vue"
import Editor from "v-markdown-editor"
import toast from "vue-toastification"
import axios from "axios"
import store from "./store"
import router from "./router"
import vuetify from "./plugins/vuetify"
import progress from "vue-progress-indicator"
import moment from "moment"

import App from "./App.vue"
import confirmAction from "./components/confirmAction.vue"
import messageIcon from "./components/util/messageIcon.vue"

import "./assets/bootstrap-grid.min.css"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@mdi/font/css/materialdesignicons.css"
import "v-markdown-editor/dist/v-markdown-editor.css"
import "vue-toastification/dist/index.css"


let axiosMod = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: true
})

// global register markdown register
Vue.use(Editor)
Vue.use(toast, {})
Vue.use(progress)

Vue.config.productionTip = false

// protos
Vue.prototype.$loading = true
Vue.prototype.$baseURL = "http://localhost:3000/"

Vue.prototype.$getDate = function(date) {
	let d = new Date(date)
	let months = [
		"Jan",
		"Feb",
		"Mar",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec"
	]
	return d.getDate() + " - " + (months[d.getMonth()]).toString() + " - " + d.getFullYear()
}

Vue.prototype.$getStatus = function getStatus(num) {
	if(num == 1) return "Awaiting Delivery"
	if(num == 2) return "Delivered"
	if(num == 0) return "Cancelled"
}

Vue.component("confirmAction", confirmAction)
Vue.component("messageIcon", messageIcon)

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
