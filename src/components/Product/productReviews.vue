<template>
    <div ref="top">

        <div v-for="r in reviews" :key="r._id" class="grey pa-3 lighten-2 mb-2">
            <div class>
                <h4 class="purple--text py-2">
                    <v-icon color="purple">mdi-account</v-icon>
                {{r.nameOfUser}} 
                </h4>
                <v-rating
                    color="amber "
                    class=" my-0 py-0 pl-0"
                    dense
                    half-increments
                    size="13"
                    readonly
                    :value="r.rating"
                ></v-rating>
            
            </div>
            <p class="">{{r.comment}}</p>
        </div>


        <v-pagination 
            :length="nav.pages " 
            v-model="page" 
            :total-visible="6"
            right
            color="purple"
            class="d-inline py-4"
            v-if="nav.pages > 1"
        ></v-pagination>

    </div>
</template>

<script>
import Vue from "vue"

export default {

    name: "productReviews",

    props: ["product"],

    data: () => ({
        reviews: [],
        nav: {},
        page: 1

    }),

    methods: {

        async fetch(page) {
            let res = await this.$axios.get("/productreviews/"+this.product+"?perpage=1&page="+page)
            if(res.data.err) return false
            this.reviews = res.data.results
            this.nav = res.data.nav
            this.page = res.data.nav.page
        },

    },

    async created() {

        await this.fetch(1)

    },

    watch: {

        page() {
            this.fetch(this.page)
            this.$vuetify.goTo(this.$refs.top, {
                duration: 300,
                offset: 0
            })
        }

    }

}
</script>

<style>

    .clear-float {
        clear: both;
    }

</style>