<template>
  
    <div>
     
        <div class="row">
            <div
                v-for="p in products"
                :key="p._id" 
                class="col-lg-3 col-md-4 col-6"
            >
                <productCard :product="p" />

            </div>
        </div>
    </div>

</template>

<script>
import productCard from "./productCard"

export default {

    name: "horizontalProducts",

    props: ["query"],

    components: {
        productCard
    },

    data: () => ({
        products: [],
        slide: null
    }),

    compoonents: {
        productCard
    }, 

    async created() {
        let res = await this.$axios.get("/products"+this.query)
        this.products = res.data.results
    }
}
</script>

<style>

</style>