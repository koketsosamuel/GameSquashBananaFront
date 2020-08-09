<template>
  	<div>

		<v-form @submit="searchProduct">
			<v-text-field
				name="name"
				label="Find product..."
				v-model="search"
				type="search"
				solo
			></v-text-field>
		</v-form>

		<searchInfo />

	  	<div class="mb-10">
			<sortProducts />
			<v-divider class="mx-2 white" vertical color="grey"></v-divider>
			<productsFilter />
		</div>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Sold</th>
            <th class="text-left">VAT</th>
            <th class="text-left">Views</th>
            <th class="text-left">Rating</th>
            <th class="text-left">Status</th>
			<th></th>
          </tr>
        </thead>
        <tbody>
          	<tr 
				v-for="p in productsObj.products" 
				:key="p._id" 
				@click="$router.push('/products/'+p._id)"
				class="cursor"
			>
				<td>{{ p.name }}</td>
				<td>R {{ p.price }}</td>
				<td>{{ p.quantity }}</td>
				<td>{{ p.sold }}</td>
				<td>{{ p.vat ? "Yes" : "No" }}</td>
				<td>{{ p.views }}</td>
				<td>
					<v-icon color="amber" v-if="p.overallRating">mdi-star</v-icon>
					{{ p.overallRating ? p.overallRating : "None"}} 
				</td>
				<td 
					:class="p.discontinued ? 'pink--text' : 'green--text'"
				>{{ p.discontinued ? "discontinued" : "active"}}</td>

				<td>
					<v-menu bottom left>
						<template v-slot:activator="{ on, attrs }">
						<v-btn fab icon v-bind="attrs" v-on="on" @click="product = p">
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
						</template>

						<v-list>
							<v-list-item @click="quantityDialog = true">
								<v-list-item-title>Change Quantity</v-list-item-title>
							</v-list-item>
							<v-list-item @click="discontinueDialog = true" v-if="!p.discontinued">
								<v-list-item-title>Discontinue</v-list-item-title>
							</v-list-item>
							<v-list-item @click="continueDialog = true" v-else>
								<v-list-item-title>Continue</v-list-item-title>
							</v-list-item>
							<v-list-item @click="$router.push('/editproduct/'+p._id)">
								<v-list-item-title>Edit</v-list-item-title>
							</v-list-item>
							<v-list-item @click="removeDialog = true">
								<v-list-item-title>Remove</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</td>
			</tr>	
        </tbody>
      </template>
    </v-simple-table>

	
		
	<div>
		<div class="float-right my-4">
			<productsPaginator />	
		</div>
	</div>

    <v-dialog v-model="discontinueDialog" max-width="500px" transition="dialog-transition">
      	<confirmAction :action="discontinue" />
    </v-dialog>

	<v-dialog v-model="continueDialog" max-width="500px" transition="dialog-transition">
      	<confirmAction :action="continueP" />
    </v-dialog>

	<v-dialog v-model="removeDialog" max-width="500px" transition="dialog-transition">
      	<confirmAction :action="remove" />
    </v-dialog>

    <v-dialog v-model="quantityConfirmDialog" max-width="500px" transition="dialog-transition">
      	<confirmAction :action="changeQuantity" />
    </v-dialog>

	<v-dialog v-model="quantityDialog" max-width="500px" transition="dialog-transition">
		<div class="grey pa-4">
			<h1>Update quantity</h1>
			<p>NB: Action is irreversible</p>
			<v-text-field solo label="Quantity" v-model="product.quantity"></v-text-field>
			<v-btn @click="quantityConfirmDialog = true">Update</v-btn>
		</div>
    </v-dialog>
	
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import productsPaginator from "../../Product/paginator.vue"
import productsFilter from "../../Product/filter.vue"
import sortProducts from "../../Product/sort.vue"
import searchInfo from "../../Product/searchInfo"

export default {
	name: "manageSimpleProductList",

	components: {
		productsPaginator,
		productsFilter,
		sortProducts,
		searchInfo
	},

	data: () => ({
		product: {
			quantity: null
		},
		discontinueDialog: false,
		continueDialog: false,
		quantityDialog: false,
		removeDialog: false,
		quantityConfirmDialog: false,
		search: "",
		searchRes: ""
	}),

	methods: {
		...mapActions(["getProducts"]),

		async discontinue() {
			await this.$axios.put(
				"/products/discontinue/" + this.product._id
			)
			this.discontinueDialog = false
			this.getProducts()
		},

		async continueP() {
			await this.$axios.put(
				"/products/continue/" + this.product._id
			)
			this.continueDialog = false
			this.getProducts()
		},
		
		async changeQuantity() {
			await this.$axios.put("/products/quantity/" + this.product._id, {
				...this.product
			})
			this.discontinueDialog = false
			this.getProducts() 
			this.quantityDialog = false
			this.quantityConfirmDialog = false
		},

		searchProduct(e) {

			if(e) e.preventDefault()

			let query = {...this.$route.query}
			query.page = 1
			
			if(this.search == "") delete query.s
            else query.s = this.search
			this.$router.push({query})
			this.searchRes = this.search
		},

		cancelSearch() {
			
			if(this.search == "") return false
			this.search = ""
			this.searchProduct()
			this.searchRes = ""

		},

		async remove() {
			let res = await this.$axios.delete("/products/" + this.product._id)
			if(!res.data.err) this.getProducts()

		}
	},

	computed: mapGetters(["productsObj"]),

	async created() {
		await this.getProducts(this.$route.query)
	},

	watch: {
		async $route() {
			await this.getProducts(this.$route.query)
			scroll(0,0)
		}
	}
}
</script>

<style>
</style>