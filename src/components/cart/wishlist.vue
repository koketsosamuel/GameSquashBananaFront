<template>
    <div>
        
        <h2 class="green--text"><v-icon color="green">mdi-heart</v-icon> Wishlist</h2>

        <div class="pt-2 pb-4">
            <v-btn color="pink" class="white--text" @click="remove">Remove</v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn color="purple" class="white--text" @click="movetowish">move to cart</v-btn>
        </div>

        <div v-for="item in wishlist" :key="item._id" class="d-flex pa-2 mb-2 grey lighten-4"> 

            <v-checkbox v-model="wishItems" color="purple" :value="item._id"></v-checkbox>

            <router-link :to="'/products/'+item.product._id">
                <v-img :src="$baseURL + item.product.thumb" inline max-height="100px" max-width="100px"></v-img>
            </router-link>

            <div class="pl-4">
                <h3>{{item.product.name}}</h3>
                <p class="pa-0 ma-0">
                    Price: <b class="purple--text">R {{item.product.price}}</b>
                </p>

                <span v-if="item.product.quantity <= 0">   
                    <b class="pink--text">Out of stock</b>
                    <br> 
                </span>
                

                </div>
            </div>

        
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {

    name: "cart",

    data: () => ({

        wishItems: []

    }),

    computed: mapGetters(["wishlist"]),

    methods: {

        ...mapActions(["getWishlist"]),

        async remove() {

            if(this.wishItems.length == 0) return this.$toast("No items selected")

            await this.$axios.post("/cartitems/remove", {
                items: this.wishItems
            })

            this.getWishlist()
            this.wishItems = []
        },

        async movetowish() {

            if(this.wishItems.length == 0) return this.$toast("No items selected")

            await this.$axios.put("/cartitems/wishtocart", {
                items: this.wishItems
            })

            this.getWishlist()
            this.wishItems = []

        },

    },

    created() {
        this.getWishlist()
    }

}
</script>

<style>

</style>