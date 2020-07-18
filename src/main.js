import Vue from "vue"
import App from "./App.vue"
import "./assets/bootstrap-grid.min.css"
import vuetify from "./plugins/vuetify"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@mdi/font/css/materialdesignicons.css"
import axios from "axios"
import store from "./store"
import router from "./router"
import prog from "vue-progressbar"
import confirmAction from "./components/confirmAction.vue"

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
	baseURL: "http://127.0.0.1:3000",
})

Vue.prototype.$loading = true
Vue.prototype.$baseURL = "http://127.0.0.1:3000/"

Vue.component("confirmAction", confirmAction)

Vue.use(prog, {
	color: "rgb(143, 255, 199)",
	failedColor: "red",
	height: "8px",
})

console.log(Vue)

// axios.interceptors.request.use(
// 	(config) => {
// 		Vue.prototype.$loading = true
// 		return config
// 	},
// 	(error) => {
// 		Vue.prototype.$loading = false
// 		return error
// 	}
// )

// axios.interceptors.response.use(
// 	(res) => {
// 		setTimeout(() => {
// 			console.log("res")
// 			Vue.prototype.$loading = false
// 		}, 5000)
// 		return res
// 	},
// 	(error) => {
// 		Vue.prototype.$loading = false
// 		return error
// 	}
// )

new Vue({
	vuetify,
	store,
	router,
	render: (h) => h(App),
}).$mount("#app")
