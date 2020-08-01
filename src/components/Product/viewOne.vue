<template>
    <div>

        <div class="row">
            <div class="col-md-6">
                <v-card>
                    
                <v-carousel
                    height="400"
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
                    <v-card-title>
                        {{product.name}}
                    </v-card-title>
                    <v-card-text>
                        <h1>R {{product.price}}</h1>
                        <p v-if="product.quantity <= 0" class="pt-4 pink--text">Out of stock</p>
                        <p v-if="product.quantity > 0" class="pt-4 green--text">Available: {{product.quantity}}</p>

                        <v-rating
                            :value="product.rating"
                            color="amber "
                            class="ml-0 mt-2 pl-0"
                            dense
                            half-increments
                            readonly
                            size="24"
                            v-if="product.rating"
                        ></v-rating>
                    </v-card-text>

                    <v-card-actions class="grey">
                        <v-btn color="green" class="white--text" :disabled="!(product.quantity > 0 || product.quantity == null)" @click="addToCart">
                            <v-icon>mdi-cart-plus</v-icon> add to cart
                        </v-btn>
                        <v-btn  color="pink" class="white--text" @click="addToWishlist">
                            <v-icon>mdi-heart</v-icon> wishlist
                        </v-btn>
                    </v-card-actions>


                </v-card>

                <v-card class="my-4">
                    <v-card-title>
                        <v-icon>mdi-share-variant</v-icon> Share
                    </v-card-title>

                    <div class="pl-4 pb-4">
                        <v-btn class="blue">
                            <v-icon color="white">mdi-facebook</v-icon>
                        </v-btn>
                        <v-divider vertical class="mx-2"></v-divider>
                        <v-btn class="blue lighten-2">
                            <v-icon color="white">mdi-twitter</v-icon>
                        </v-btn>
                        <v-divider vertical class="mx-2"></v-divider>
                        <v-btn class="green lighten-2">
                            <v-icon color="white">mdi-whatsapp</v-icon>
                        </v-btn>
                    </div>

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

            <v-tab href="#prodRate">
                <span>
                    Reviews
                </span>
            </v-tab>

            <v-tab-item value="prodDesc">
                <div class="pa-2">
                    <markdown :source="product.description"></markdown>
                </div>
            </v-tab-item>
            
        </v-tabs>

    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import markdown from "vue-markdown"

export default {
    name: "singleProduct",

    components: {
        markdown
    },

    computed: mapGetters(["images", "user"]),

    data: () => ({
        product: {}
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