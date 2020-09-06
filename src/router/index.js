import Vue from "vue"
import VueRouter from "vue-router"

import home from "../components/home"
import viewProducts from "../components/Product/viewProducts"
import oneProduct from "../components/Product/viewOne"
import cart from "../components/cart/cart"
import wishlist from "../components/cart/wishlist"
import checkout from "../components/checkout"
import myOrders from "../components/myOrders"
import orderSuccess from "../components/ordersuccess"
import four04 from "../components/404.vue"

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
		path: "/checkout",
		name: "checkout",
		component: checkout,
	},
	{
		path: "/myorders",
		name: "myOrders",
		component: myOrders
	},
	{
		path: "/ordersuccess",
		name: "orderSuccess",
		component: orderSuccess
	},
	{
		path: "/about",
		name: "About",
		component: () =>
			import("../views/About.vue"),
	},
	{
		path: "/order/:orderId",
		name: "singleOrder",
		component: () =>
			import("../components/Order/singleOrder.vue"),
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
		name: "manageProducts",
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
	{
		path: "/addcoupon",
		name: "addCoupon",
		component: () =>
			import(
				"../components/Manager/Coupon/addCoupon"
			),
	},
	{
		path: "/editcoupon/:couponId",
		name: "editCoupon",
		component: () =>
			import(
				"../components/Manager/Coupon/editCoupon"
			),
	},
	{
		path: "/managecoupons",
		name: "manageCoupons",
		component: () =>
			import(
				"../components/Manager/coupons"
			),
	},
	{
		path: "/addbanner",
		name: "addBanner",
		component: () =>
			import(
				"../components/Manager/Banner/addBanner"
			),
	},
	{
		path: "/editbanner/:bannerId",
		name: "editBanner",
		component: () =>
			import(
				"../components/Manager/Banner/editBanner"
			),
	},
	{
		path: "/managebanners",
		name: "manageBanners",
		component: () =>
			import(
				"../components/Manager/banners"
			),
	},
	{
		path: "/manageorders",
		name: "manageOrders",
		component: () =>
			import(
				"../components/Manager/orders"
			),
	},
	{
		path: "/reports",
		name: "reports",
		component: () =>
			import(
				"../components/Manager/reports"
			),
	},
	{
		path: "*",
		name: "404",
		component: four04
	}
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

export default router
