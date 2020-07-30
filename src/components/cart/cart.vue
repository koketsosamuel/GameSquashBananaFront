<template>
    <div>
        
        <h2 class="green--text"><v-icon color="green">mdi-cart</v-icon> Cart</h2>
        <h1>Total: R {{cart.total}}</h1>

        <div class="pt-2 pb-4">
            <v-btn color="pink" class="white--text" @click="remove">Remove</v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn color="purple" class="white--text">move to wishlist</v-btn>
        </div>

        <div v-for="item in cart.items" :key="item._id" class="d-flex pa-2 mb-2 grey lighten-4"> 

            <v-checkbox v-model="cartItems" color="purple" :value="item._id"></v-checkbox>

            <router-link :to="'/products/'+item.product._id">
                <v-img :src="$baseURL + item.product.thumb" inline max-height="100px" max-width="100px"></v-img>
            </router-link>

            <div class="pl-4">
                <h3>{{item.product.name}}</h3>
                <p class="pa-0 ma-0">
                    Price: <b class="purple--text">R {{item.product.price}}</b> | 
                    Quantity: <b class="purple--text">{{item.quantity}} </b>
                </p>

                <span v-if="item.product.quantity <= 0">   
                    <b class="pink--text">Out of stock</b>
                    <br> 
                </span>

                <span v-if="item.quantity > item.product.quantity && item.product.quantity > 0">   
                    <b class="pink--text">Only {{item.product.quantity}} available</b>
                    <br> 
                </span>
                

                <v-btn @click="cartItem = {...item}; quantityDialog = true">change quantity</v-btn>
                </div>
            </div>

     

        <v-btn color="success" block large :disabled="!cart.checkout"><v-icon>mdi-cash-100</v-icon> Checkout</v-btn>

        <v-dialog
            v-model="quantityDialog"
            max-width="500px"
            transition="dialog-transition"
        >

        <div class="white pa-4">

            <h2>Change Quantity</h2>
            <p class="py-2 green--text">{{cartItem.product.name}}</p>

            <v-form @submit="update">
                <v-text-field
                    name="name"
                    label="Quantity"
                    id="id"
                    filled
                    color="purple"
                    v-model="cartItem.quantity"
                    :error="quanErr ? true : false"
                    :error-messages="quanErr"
                ></v-text-field>


                <v-btn color="success" type="submit">Update</v-btn>
                <v-divider class="white mx-2" vertical></v-divider>
                <v-btn color="pink" class="white--text" @click="quantityDialog = false">Cancel</v-btn>

            </v-form>
        </div>
            
        </v-dialog>
        
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {

    name: "cart",

    data: () => ({

        cartItems: [],
        cartItem: {
            product: {}
        },
        quantityDialog: false,
        quanErr: null

    }),

    computed: mapGetters(["cart"]),

    methods: {

        ...mapActions(["getCart"]),

        async remove() {

            if(this.cartItems.length == 0) return this.$toast("No items selected")

            await this.$axios.post("/cartitems/remove", {
                items: this.cartItems
            })

            this.getCart()
        },

        async update(e) {

            e.preventDefault()

            if(this.cartItem.quantity > this.cartItem.product.quantity) 
                return this.quanErr = "Only " + this.cartItem.product.quantity + " available"
            
            if(this.cartItem.quantity <= 0)
                return this.quanErr = "Order 1 or more"

            this.quanErr = null

            let res = await this.$axios.put("/cartitems/"+this.cartItem._id, this.cartItem)
            if(!res.data.err) this.getCart()
            this.quantityDialog = false

        }

    },

    created() {
        this.getCart()
    }

}
</script>

<style>

</style>