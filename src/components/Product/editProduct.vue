<template>
	<div>
		<h1 class="my-3">Edit Product</h1>

		<v-stepper v-model="stepper" vertical class="pb-0">
			<v-stepper-header>
				<v-stepper-step
					:complete="stepper > 1"
					step="1"
					color="green"
					editable
					>Details</v-stepper-step
				>

				<v-divider></v-divider>

				<v-stepper-step
					:complete="stepper > 2"
					step="2"
					color="green"
					editable
					>Description</v-stepper-step
				>

				<v-divider></v-divider>

				<v-stepper-step step="3" color="green" editable
					>Images</v-stepper-step
				>
			</v-stepper-header>

			<v-stepper-items class="grey">
				<v-stepper-content step="1">
					<div class="row">
						<div class="col-md-4">
							<v-text-field
								label="Name"
								v-model="productObj.name"
								filled
								color="purple"
							></v-text-field>
						</div>
						<div class="col-md-4">
							<v-text-field
								label="Quantity"
								type="number"
								filled
								color="purple"
								v-model="productObj.quantity"
							></v-text-field>
						</div>
						<div class="col-md-4">
							<v-text-field
								label="Price"
								type="number"
								v-model="productObj.price"
								filled
								color="purple"
							></v-text-field>
						</div>
						<div class="col-md-12">
							<v-textarea
								label="Keywords"
								v-model="productObj.tags"
								filled
								color="purple"
							></v-textarea>
						</div>
						<div class="col-md-4">
							<v-select
								:items="categories"
								v-model="productObj.category"
								label="Category"
								item-text="name"
								item-value="_id"
								filled
								color="purple"
								@change="ch"
							></v-select>
						</div>
						<div class="col-md-4" v-if="subcategories.length > 0">
							<v-select
								:items="subcategories"
								v-model="productObj.subCategory"
								label="Sub Category"
								item-text="name"
								item-value="_id"
								filled
								persistent-hint="hello"
								color="purple"
								clearable
							></v-select>
						</div>
						<div class="col-md-4">
							<v-checkbox
								label="charge VAT on this product"
								v-model="productObj.vat"
								filled
								color="purple"
							></v-checkbox>
						</div>
					</div>

					<v-btn class="green white--text" @click="editProduct"
						>Update</v-btn
					>
				</v-stepper-content>

				<v-stepper-content step="2">
					
					<h2 class="subtitle mb-3">Edit Description</h2>

					<div class="py-3"></div>
					<markdown-editor v-model="productObj.description" />
					<div class="py-3"></div>
					<v-btn class="green white--text" @click="stepper = 1">Back</v-btn>
					<v-divider vertical class="mx-2"></v-divider>
					<v-btn class="green white--text" @click="editProduct">Next</v-btn>

				</v-stepper-content>

				<v-stepper-content step="3">
					<h2 class="subtitle">Edit Images For Product</h2>

					<manageImages />
					<v-btn class="green white--text my-5" to="/manageproducts"
						>Done</v-btn
					>
				</v-stepper-content>
			</v-stepper-items>

			<v-btn to="/manageproducts" class="ma-3">Finish</v-btn>
		</v-stepper>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex"
	import manageImages from "./manageImages"

	export default {
		name: "addProduct",

		components: {
			manageImages,
		},

		data: () => ({
			stepper: 1,
			subcategories: [],
			productObj: {},
			productId: null,
		}),

		methods: {
			ch() {
				for (let i of this.categories) {
					if (i._id == this.productObj.category) {
						this.subcategories = i.subs
						break
					}
				}
			},
			async editProduct() {
				let res = await this.$axios.put(
					"/products/" + this.productObj._id,
					this.productObj
				)
				if (res.data.err) return alert(res.data.err.msg)
				this.product = this.productObj._id
				this.stepper += 1
			},

			...mapActions(["getCategories"]),
		},

		computed: {
			...mapGetters(["categories"]),
			product: {
				get() {
					return this.productId
				},

				set(id) {
					this.productId = id
				},
			},
		},

		async created() {
			await this.getCategories()
			let res = await this.$axios.get(
				"/products/" + this.$route.params.productId
			)
			this.productObj = res.data.results
			this.ch()
		},
	}
</script>

<style scoped>
	.row div {
		margin-bottom: 0px !important;
		padding-bottom: 0px !important;
	}
</style>
