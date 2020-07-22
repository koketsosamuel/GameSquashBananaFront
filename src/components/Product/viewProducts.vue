<template>
    <div class="row">
        <div class="col-6 col-md-4 col-lg-3" v-for="product in productsObj.products" :key="product._id">
            <productSingle  :product="product" />
        </div>
    </div>
</template>

<script>
import productSingle from "./productCatalogue"
import {mapGetters, mapActions} from "vuex"

export default {

    name: "viewProducts",

    components: {
        productSingle
    },

    computed: mapGetters(["productsObj"]),

    methods: mapActions(["getProducts"]),

    created() {
        this.getProducts()
    }

}
</script>

<style>

</style>