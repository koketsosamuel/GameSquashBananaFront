<template>
    <div>
        <v-pagination 
            :length="productsObj.nav.pages " 
            v-model="page" 
            :total-visible="6"
            right
            color="purple"
            class="d-inline py-4"
        ></v-pagination>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"

export default {
    name: "productsPagination",

    computed: mapGetters(["productsObj"]),

    data: () => ({
        page: 1
    }),

    created() {
        this.page = Number(this.productsObj.nav.page)
    },

    watch: {
        page () {
            //if(this.page == this.productsObj.nav.page) return false
            let params = {...this.$route.query}
            delete params.page
            this.$router.push({name: this.$route.name, query: {page: this.page, ...params}})
                .catch(() => {}) 
        }
    }
}
</script>

<style>

</style>