<template>

    <div>
		<h1>Manage Products</h1>
		<v-divider class="my-3"></v-divider>
        <v-btn to="/addProduct" class="mb-6"><v-icon>mdi-plus-box</v-icon> Product</v-btn>
        <productsList />
    </div>

</template>

<script>
import productsList from "./Product/productList"

export default {

    name: "manageProducts",

    components: {
        productsList
    }

}
</script>

<style>
</style>