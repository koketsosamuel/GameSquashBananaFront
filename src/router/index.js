import Vue from "vue"
import VueRouter from "vue-router"

import home from "../components/home"
import viewProducts from "../components/Product/viewProducts"
import oneProduct from "../components/Product/viewOne"
import cart from "../components/cart/cart.vue"
import wishlist from "../components/cart/wishlist.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "Home",
		component: home,
	},
	{
		path: "/products",
		name: "Products",
		component: viewProducts,
	},
	{
		path: "/products/:productId",
		name: "oneProduct",
		component: oneProduct,
	},
	{
		path: "/cart",
		name: "cart",
		component: cart,
	},
	{
		path: "/wishlist",
		name: "wishlist",
		component: wishlist,
	},
	{
		path: "/about",
		name: "About",
		component: () =>
			import("../views/About.vue"),
	},
	{
		path: "/addproduct",
		name: "addProduct",
		component: () =>
			import(
				"../components/Product/addProduct"
			),
	},
	{
		path: "/editproduct/:productId",
		name: "editProduct",
		component: () =>
			import(
				"../components/Product/editProduct"
			),
	},
	{
		path: "/manageproducts",
		name: "manageProduct",
		component: () =>
			import(
				"../components/Manager/products"
			),
	},
	{
		path: "/managecategories",
		name: "manageCategories",
		component: () =>
			import(
				"../components/Manager/categories"
			),
	},
	{
		path: "/addcategory",
		name: "addCategory",
		component: () =>
			import(
				"../components/Manager/Category/addCategory.vue"
			),
	},
	{
		path: "/editcategory/:categoryId",
		name: "editCategory",
		component: () =>
			import(
				"../components/Manager/Category/editCategory.vue"
			),
	},
	{
		path: "/managesubcategories/:categoryId",
		name: "manageSubCategories",
		component: () =>
			import(
				"../components/Manager/subCategories"
			),
	},
	{
		path: "/addsubcategory/:categoryId",
		name: "addSubCategory",
		component: () =>
			import(
				"../components/Manager/subCategory/addSubCategory.vue"
			),
	},
	{
		path: "/editsubcategory/:subCategoryId",
		name: "editSubCategory",
		component: () =>
			import(
				"../components/Manager/subCategory/editSubCategory.vue"
			),
	},
	{
		path: "/myaccount",
		name: "myAccount",
		component: () =>
			import(
				"../components/Auth/myAccount.vue"
			),
	},
	{
		path: "/manageunapprovedreviews",
		name: "manageUnapprovedReviews",
		component: () =>
			import(
				"../components/Manager/unapprovedReviews"
			),
	},
	{
		path: "/admin",
		name: "admin",
		component: () =>
			import(
				"../components/Manager/admin"
			),
	},
	{
		path: "/manageusers",
		name: "manageUsers",
		component: () =>
			import(
				"../components/Manager/users"
			),
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

export default router
