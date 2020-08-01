<template>
    <div>
        <h1 class="green--text">Manage Sub Categories</h1>
		<h3 class="purple--text">{{$route.query.categoryName}}</h3>
		<v-divider class="my-3"></v-divider>
        <v-btn 
            :to="
                '/addSubCategory/'+
                $route.params.categoryId+
                '?categoryName='+
                $route.query.categoryName
            " 
            class="mb-6"
        >
            <v-icon>mdi-plus-box</v-icon>Sub Category
        </v-btn>

        <subCategoriesList />
    </div>
</template>

<script>
import subCategoriesList from "./subCategory/subCategoriesList"

export default {

    name: "manageCategories",

    components: {
        subCategoriesList
    },

    

}
</script>

<style>

</style>