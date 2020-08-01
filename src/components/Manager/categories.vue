<template>
    <div>
        <h1 class="green--text">Manage Categories</h1>
		<v-divider class="my-3"></v-divider>
        <v-btn to="/addCategory" class="mb-6"><v-icon>mdi-plus-box</v-icon> Category</v-btn>
        <categoriesList />
    </div>
</template>

<script>
import categoriesList from "./Category/categoriesList"

export default {

    name: "manageCategories",

    components: {
        categoriesList
    },

    

}
</script>

<style>

</style>