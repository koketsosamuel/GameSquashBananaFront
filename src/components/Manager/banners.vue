<template>
    
    <div>

        <h1 class="green--text">Manage Banners</h1>
        <v-divider class="my-3"></v-divider>
        <v-btn to="/addbanner" class="mb-6"><v-icon>mdi-plus-box</v-icon> Banner</v-btn>
        <bannersList />

    </div>

</template>

<script>
import bannersList from "./Banner/bannersList"

export default {

    name: "manageBanners",

    components: {
        bannersList
    }

}
</script>

<style>

</style>