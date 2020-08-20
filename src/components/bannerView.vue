<template>
    <div>
        <v-carousel class="purple" cycle :show-arrows="false" min-height="300px" height="37.5%" width="100%">
            <v-carousel-item class="purple" v-for="b  in banners" :key="b._id" :to="b.link"
                :src="$baseURL + b.image"
            ></v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {

    name: "banners",

    data: () => ({
        banners: []
    }),

    async created() {
        let res = await this.$axios.get("/banners/")
        this.banners = res.data.results || []
         
    }

}
</script>

<style>

</style>