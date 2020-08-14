<template>
    <div>

        <searchInfo />

        <div class="mb-2">
			<sortProducts />
			<v-divider class="mx-2 white" vertical color="grey"></v-divider>
			<productsFilter />
		</div>

        <div class="row" v-if="productsObj.products.length > 0">
            <div class="col-6 col-md-4 col-lg-3" v-for="product in productsObj.products" :key="product._id">
                <productSingle  :product="product" />
            </div>
        </div>

        <messageIcon message="No products found!" v-else />

        <div v-if="productsObj.nav.pages > 1">
            <div class="float-right">
                <productsPaginator />
            </div>
        </div>
    </div>
</template>

<script>
import productSingle from "./productCard"
import {mapGetters, mapActions} from "vuex"
import productsPaginator from "./paginator.vue"
import productsFilter from "./filter.vue"
import sortProducts from "./sort.vue"
import searchInfo from "./searchInfo"

export default {

    name: "viewProducts",

    components: {
        productSingle,
        productsFilter,
        productsPaginator,
        sortProducts,
        searchInfo
    },

    computed: mapGetters(["productsObj"]),

    methods: mapActions(["getProducts"]),

    async created() {
        await this.getProducts(this.$route.query)
        scroll(0,0)
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