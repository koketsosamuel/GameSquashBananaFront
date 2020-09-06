<template>
	<div>
		<v-app id="app">

			<navigation />

			<v-container>
				<div class="py-8"></div>
				<router-view />
			</v-container>

			<div class="pa-15 my-15"></div>

			<footerCompo />

		</v-app>
	</div>
</template>

<script>

	import navigation from "./components/navigation"
	import footerCompo from "./components/footer"
	import {mapActions} from "vuex"

	export default {
		
		name: "app",

		components: {
			navigation,
			footerCompo
		},

		methods: mapActions(["getCart", "checkAuth"]),

		created() {
			this.getCart()
			this.checkAuth()
		},

		watch: {

			$route() {

				let authRoutes = [
					"checkout", "myOrders",
					"orderSuccess", "singleOrder",
					"addProduct", "editProduct",
					"manageProducts", "manageCategories",
					"addCategory", "editCategory",
					"manageSubCategories", "addSubCategory",
					"editSubCategory", "myAccount",
					"manageUnapprovedReviews", "admin",
					"manageUsers", "addCoupon", "editCoupon",
					"manageCoupons", "addBanner",
					"editBanner", "manageBanners",
					"manageOrders"
				]

				let adminOrSuper = [
					"manageUnapprovedReviews", "admin",
					"manageUsers", "addCoupon", "editCoupon",
					"manageCoupons", "addBanner",
					"editBanner", "manageBanners",
					"manageOrders", "manageCategories",
					"addCategory", "editCategory",
					"manageSubCategories", "addSubCategory",
					"editSubCategory", "manageUnapprovedReviews"
				]

				let pManager = [
					"addProduct", "editProduct",
					"manageProducts"
				]

				let oManager = [
					"manageOrders"
				]

			}

		}
	}
</script>

<style>
	.cursor {
		cursor: pointer;
	}

	.d-inline {
		display: inline !important;
	}

	.btn {
		padding: 2px 6px;
		border-radius: 3px;
		background: #ccc;
		margin: 1px;
	}

	.btn-group {
		display: inline;
	}

	.clear-float {
		clear: both;
	}

</style>
