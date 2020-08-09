<template>
	<div>
		<h1 class="my-3 green--text">Add Product</h1>

		<v-stepper v-model="stepper" vertical>
			<v-stepper-header>
				<v-stepper-step :complete="stepper > 1 || stepper > 2" step="1" color="green"
					>Details</v-stepper-step
				>

				<v-divider></v-divider>

				<v-stepper-step :complete="stepper > 2" step="2" color="green"
					>Description</v-stepper-step
				>

				<v-divider></v-divider>

				<v-stepper-step step="3" color="green">Images</v-stepper-step>
			</v-stepper-header>

			<v-stepper-items class="greys">
				<v-stepper-content step="1">
					<div class="row">
						<div class="col-md-4">
							<v-text-field
								label="Name"
								v-model="name"
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
								v-model="quantity"
							></v-text-field>
						</div>
						<div class="col-md-4">
							<v-text-field
								label="Price"
								type="number"
								v-model="price"
								filled
								color="purple"
							></v-text-field>
						</div>
						<div class="col-md-12">
							<v-textarea
								label="Keywords"
								v-model="tags"
								filled
								color="purple"
							></v-textarea>
						</div>
						<div class="col-md-4">
							<v-select
								:items="categories"
								v-model="category"
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
								v-model="subCategory"
								label="Sub Category"
								item-text="name"
								item-value="_id"
								filled
								color="purple"
								clearable
							></v-select>
						</div>
						<div class="col-md-4">
							<v-checkbox
								label="charge VAT on this product"
								v-model="vat"
								filled
								color="purple"
							></v-checkbox>
						</div>
					</div>

					<v-btn class="green white--text" @click="stepper = 2"
						>Next</v-btn
					>
				</v-stepper-content>

				<v-stepper-content step="2">
					<h2 class="subtitle">Add Description</h2>

					<div class="py-3"></div>

					<markdown-editor v-model="description" />

					<div class="py-3"></div>

					<v-btn class="green white--text" @click="stepper = 1">Back</v-btn>
					<v-divider vertical class="mx-2"></v-divider>
					<v-btn class="green white--text" @click="addProduct">Next</v-btn>

				</v-stepper-content>

				<v-stepper-content step="3">
					<h2 class="subtitle mb-3">Add Images For Product</h2>

					<manageImages :id="product" />
					<v-btn class="green white--text my-5" to="/manageproducts"
						>Done</v-btn
					>
				</v-stepper-content>
			</v-stepper-items>
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
			name: "",
			category: null,
			subCategory: null,
			vat: true,
			description: "",
			price: null,
			quantity: null,
			productId: null,
			tags: null
		}),

		methods: {
			ch() {
				for (let i of this.categories) {
					if (i._id == this.category) {
						this.subcategories = i.subs
						break
					}
				}
			},
			async addProduct() {
				let res = await this.$axios.post("/products", {
					name: this.name,
					category: this.category,
					subCategory: this.subCategory || null,
					price: this.price,
					vat: this.vat,
					description: this.description,
					quantity: this.quantity,
					tags: this.tags
				})
				this.product = res.data.results._id
				this.stepper = 3
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
		},
	}
</script>

<style scoped>
	.row div {
		margin-bottom: 0px !important;
		padding-bottom: 0px !important;
	}
</style>
