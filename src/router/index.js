import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import viewProducts from "../components/Product/viewProducts"

Vue.use(VueRouter)

const routes = [
	{
		path: "/products",
		name: "Products",
		component: viewProducts,
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
	{
		path: "/addproduct",
		name: "addProduct",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../components/Product/addProduct"
			),
	},
	{
		path: "/editproduct/:productId",
		name: "editProduct",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../components/Product/editProduct"
			),
	},
	{
		path: "/manageproducts",
		name: "manageProduct",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../components/Manager/Product/productList"
			),
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

export default router
