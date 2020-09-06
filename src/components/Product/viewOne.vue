<template>
    <div>

        <div class="row">
            <div class="col-md-6 col-lg-8">
                <v-card>
                    
                <v-carousel
                    height="100%"
                    :show-arrows="images.length > 1"
                    raised
                    
                >
                    <v-carousel-item
                        v-for="(image, i) in images"
                        :key="i"
                    >
                        <v-img contain max-height="400px" :src="$baseURL + image.image" lazy-src="../../assets/lazy.jpeg" />

                    </v-carousel-item>

                    <v-carousel-item
                        v-if="images.length < 1"    
                    >
                        <v-img contain max-height="400px" lazy-src="../../assets/lazy.jpeg" />

                    </v-carousel-item>

                </v-carousel>
                </v-card>

            </div>

            <div class="col-md-6 col-lg-4">
                <v-card>
                    <v-card-title class="purple--text">
                        {{product.name}}
                    </v-card-title>
                    <v-card-text>
                        <h1>R {{product.price}}</h1>
                        <p v-if="product.quantity <= 0" class="pt-4 pink--text">
                            Out of stock
                        </p>
                        <p v-else-if="product.deletedAt || product.discontinued" class="pt-4 pink--text">
                            Product has been discontinued
                        </p>
                        <p v-else class="pt-4 green--text">
                            Available: {{product.quantity}}
                        </p>

                        
                        
                    </v-card-text>

                    <v-card-actions class="grey">
                        <v-btn 
                            color="green" 
                            class="white--text" 
                            :disabled="!(product.quantity > 0 && !product.discontinued)" 
                            @click="addToCart"
                        >
                            <v-icon>mdi-cart-plus</v-icon> add to cart
                        </v-btn>
                        <!-- <v-btn  color="pink" class="white--text" @click="addToWishlist">
                            <v-icon>mdi-heart</v-icon> wishlist
                        </v-btn> -->
                    </v-card-actions>


                </v-card>

                <v-card class="my-4 pa-4">
                    <h3 class="amber--text">
                        Rating
                    </h3>

                    <v-rating
                        :value="product.overallRating"
                        color="amber "
                        class="ml-0 mt-2 pl-0"
                        dense
                        half-increments
                        readonly
                        size="24"
                        v-if="product.overallRating"
                    ></v-rating>

                    <p v-else class="grey--text mt-2">No ratings yet</p>

                    <span 
                        class="amber--text pl-1" 
                        v-if="product.overallRating"
                    >
                        {{product.nReviews}} Review(s)
                    </span>

                    <v-btn color="success" class="mt-4" block @click="reviewDialog = true">Review</v-btn>

                </v-card>
            </div>

        </div>

        <v-tabs
            color="green"
            class="mt-4"
            slider-color="green"
        >

            <v-tab href="#prodDesc">
                <span>
                    Description
                </span>
            </v-tab>

            <v-tab href="#prodReviews">
                <span>
                    Reviews
                </span>
            </v-tab>

            <v-tab-item value="prodDesc">
                <div class="pa-2">
                    <markdown :source="product.description"></markdown>
                </div>
            </v-tab-item>

            <v-tab-item value="prodReviews">
                <div class="pa-2">
                    <productReviews :product="product._id" />
                </div>
            </v-tab-item>
            
        </v-tabs>


        <!-- REVIEW DIALOG -->
        <v-dialog
            v-model="reviewDialog"
            max-width="500px"
            transition="dialog-transition"
        >
            <div class="pa-4 white">
                <reviewProduct :product="product._id" :done="doneReviewing" />
            </div>
        </v-dialog>

    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import markdown from "vue-markdown"
import reviewProduct from "./reviewProduct"
import productReviews from "./productReviews"

export default {
    name: "singleProduct",

    components: {
        markdown,
        reviewProduct,
        productReviews
    },

    computed: mapGetters(["images", "user"]),

    data: () => ({
        product: {},
        reviewDialog: false
    }),

    methods: {
        
        ...mapActions(["getProductImages", "getCart", "getWishlist"]),

        async addToCart() {
            await this.$axios.post("/cartitems", {product: this.product._id})
            this.getCart()
        },

        async addToWishlist() {
            let res = await this.$axios.post("/cartitems/wish", {product: this.product._id})
            if(!res.data.err) this.getWishlist()
            alert(0)
        },

        doneReviewing() {
            this.reviewDialog = false
        }

    },

    async created() {
        this.getProductImages(this.$route.params.productId)
        let res = await this.$axios.get("/products/"+this.$route.params.productId)
        this.product = res.data.results
    }
}
</script>

<style>

</style>