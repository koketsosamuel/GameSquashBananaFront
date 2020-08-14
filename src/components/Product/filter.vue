<template>
  
        

        <v-dialog
            v-model="mainDialog"
            class="white"
            color="white"
            transition="dialog-transition"
        >

            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    color="purple white--text" 
                    v-on="on"
                    v-bind="attrs"
                >
					<v-icon>mdi-tune</v-icon> Filter {{num}}
				</v-btn>
            </template>

            <div class="white pa-4 row">
                <div class="col-md-6 my-0 col-lg-4">
                    <h3 class="green--text">Price</h3>
                    <p>Limit to a specific price range</p>
                    
                    <v-select
                        :items="priceRanges"
                        v-model="priceRange"
                        label="Price range..."
                        filled
                        item-value="i"
                        item-text="text"
                        clearable
                        color="purple"
                    ></v-select>

                </div>

                <div class="col-md-6 my-0 col-lg-4">
                    <h3 class="green--text">Category</h3>
                    <p>Limit to a specific category</p>
                    
                    <v-select

                        :items="categories"
                        v-model="category"
                        label="Category ..."
                        filled
                        item-value="_id"
                        item-text="name"
                        class="my-0"
                        clearable
                        color="purple"
                    ></v-select>
                </div>

                <div class="col-md-6 my-0 col-lg-4">
                    <h3 class="green--text">Rating</h3>
                    <p>Limit to a specific minimum rating</p>
                    
                    <v-select
                        :items="ratingArr"
                        v-model="rating"
                        label="Rating ..."
                        filled
                        item-value="val"
                        item-text="text"
                        clearable
                        color="purple"
                    ></v-select>
                </div>
                <div class="col-md-6 my-0 py-0   col-lg-4">
                    <h3 class="green--text">In stock products only</h3>
                    <p>Get only products that are in stock</p>
                    <v-checkbox color="purple" label="In Stock" v-model="inStock" dense></v-checkbox>
                </div>
            

               <div class="col-12 py-0 mt-0 mb-5">
                    <v-btn @click="filter">Filter</v-btn>
                    <v-divider class="mx-2 white" vertical ></v-divider>
                    <v-btn color="pink" class="white--text" @click="mainDialog = false; reset()">Cancel</v-btn>
                    <v-divider class="mx-2 white" vertical ></v-divider>
                    <v-btn color="success" class="float-right" @click="clearFilter">Clear Filter</v-btn>
                    <div class="clear-float"></div>
               </div>

            </div>
        </v-dialog>
            
   
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import qs from "querystringify"

export default {
    name: "filterProducts",

    data: () => ({
        mainDialog: false,
        inStock: false,
        category: null,
        rating: null,
        ratingArr: [
            {
                text: "1+",
                val: 1
            },
            {
                text: "2+",
                val: 2
            },
            {
                text: "3+",
                val: 3
            },
            {
                text: "4+",
                val: 4
            },
            {
                text: "5",
                val: 5
            }
        ],
        priceRanges: [  
            {
                i: 0,
                maxPrice: 100,
                text: "under R100"
            },

            {
                i: 1,
                maxPrice: 200,
                minPrice: 100,
                text: "From R100 to R200"
            },
            {
                i: 2,
                maxPrice: 300,
                minPrice: 200,
                text: "From R200 to R300"
            },
            {
                i: 3,
                maxPrice: 500,
                minPrice: 300,
                text: "From R300 to R500"
            },
            {
                i: 4,
                maxPrice: 700,
                minPrice: 500,
                text: "From R500 to R700"
            },
            {
                i: 5,
                maxPrice: 1000,
                minPrice: 700,
                text: "From R700 to R1000"
            },
            {
                i: 6,
                maxPrice: 2000,
                minPrice: 1000,
                text: "From R1000 to R2000"
            },
            {
                i: 7,
                maxPrice: 3000,
                minPrice: 2000,
                text: "From R2000 to R3000"
            },
            {
                i: 8,
                maxPrice: 5000,
                minPrice: 3000,
                text: "From R3000 to R5000"
            },
            {
                i: 9,
                minPrice: 5000,
                text: "From R5000"
            },
        ],
        priceRange: null,
        num: ""


    }),

    computed: mapGetters(["categories"]),

    methods: {
        ...mapActions(["getCategories"]),

        reset() {

            this.category = null
            this.priceRange = null
            this.rating = null
            this.inStock = false

            if(this.$route.query.minPrice && this.$route.query.maxPrice) {
                for(let i = 0; i < 10; i++) {
                    if(
                        this.$route.query.minPrice == this.priceRanges[i].minPrice
                        && this.$route.query.maxPrice == this.priceRanges[i].maxPrice
                    ) {
                        this.priceRange = i
                    }
                }
            } else if(this.$route.query.minPrice) {
                this.priceRange = 9
            } else if(this.$route.query.maxPrice) {
                this.priceRange = 0
            }
                
            if(this.$route.query.category) this.category = this.$route.query.category
            if(this.$route.query.inStock) this.inStock = this.$route.query.inStock
            if(this.$route.query.rating) this.rating = Number(this.$route.query.rating)

        },

        clearFilter() {
            
            let query = {...this.$route.query}
            delete query.minPrice
            delete query.maxPrice
            delete query.rating
            delete query.inStock
            delete query.category

            this.rating = null
            this.category = null
            this.priceRange = null
            this.inStock = null

            this.$router.push({query: {...query}})
            this.mainDialog = false
            this.num = ""

        },

        filter() {
            
            let query = {}

            if(this.$route.query.sort) query.sort = this.$route.query.sort

            if(this.priceRange) {
                let range = this.priceRanges[this.priceRange]
                if(range.minPrice) query.minPrice = range.minPrice
                if(range.maxPrice) query.maxPrice = range.maxPrice
            }
            
            if(this.category) query.category = this.category
            if(this.inStock) query.inStock = this.inStock
            if(this.rating) query.rating = this.rating
            if(this.$route.query.s) query.s = this.$route.query.s

            this.$router.push({query}).catch(() => {

            })
            this.mainDialog = false
            this.filterCount()
            
        },

        filterCount() {

            let i = 0

            if(this.category) i = 1
            if(this.priceRange) i += 1 
            if(this.rating) i += 1
            if(this.inStock) i += 1

            if(i > 0) this.num = "["+i+"]"
            else this.num = ""

        }
    },

    created() {

        this.getCategories()
        this.reset()
        this.filterCount()
        
    }
}
</script>

<style>

</style>