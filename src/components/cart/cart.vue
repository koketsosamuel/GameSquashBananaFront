<template>
    <div>
        
        <h1 class="green--text"><v-icon color="green">mdi-cart</v-icon> Cart</h1>

        <table class="pa-4 purple white--text my-4" v-if="cart.items.length > 0">
            <tbody>
                <tr>
                    <td>Total Amount</td>
                    <td> - R {{cart.total}}</td>
                </tr>
                <tr>
                    <td>Delivery Fee</td>
                    <td> - {{(cart.total >= 600) ? 'FREE' : 'R 100'}}</td>
                </tr>
                <tr>
                    <td>Checkout Total</td>
                    <td> - R {{cart.total + ((cart.total >= 600) ? 0 : 100)}}</td>
                </tr>
            </tbody>
        </table>

        <div v-if="cart.items.length > 0">

            <div class="pt-2 pb-4">
                <v-btn color="pink" class="white--text" @click="remove">Remove</v-btn>
                <!-- <v-divider vertical class="mx-2"></v-divider>
                <v-btn color="purple" class="white--text" @click="movetowish">
                    <v-icon>mdi-cart</v-icon>
                    <v-icon>mdi-arrow-right</v-icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn> -->
            </div>

            <div v-for="item in cart.items" :key="item._id" class="d-flex pa-2 mb-2 grey lighten-4"> 

                <v-checkbox v-model="cartItems" color="purple" :value="item._id"></v-checkbox>

                <router-link :to="'/products/'+item.product._id">
                    <v-img :src="$baseURL + item.product.thumb" inline max-height="100px" max-width="100px"></v-img>
                </router-link>

                <v-divider vertical class="mx-2 green"> </v-divider>

                <div>
                    <h3>{{item.product.name}}</h3>
                    <p class="pa-0 ma-0">
                        Price (VAT included): <b class="purple--text">R {{item.product.taxedAmount}}</b> <br> 
                        Quantity: <b class="purple--text">{{item.quantity}} </b> <br>
                        Sub Total: <b class="purple--text">R {{item.quantity * item.product.taxedAmount}}</b>
                    </p>

                    <span v-if="item.product.quantity <= 0">   
                        <b class="pink--text">Out of stock</b>
                        <br> 
                    </span>

                    <span v-if="item.quantity > item.product.quantity && item.product.quantity > 0">   
                        <b class="pink--text">Only {{item.product.quantity}} available</b>
                        <br> 
                    </span>
                    

                    <v-btn class="my-2" @click="cartItem = {...item}; quantityDialog = true">change quantity</v-btn>
                    </div>
                </div>

        

            <v-btn 
                color="success" 
                to="/checkout"
                block  
                x-large 
                class="mt-5"
                :disabled="!cart.checkout || !user"
            ><v-icon>mdi-cash-100</v-icon> Checkout {{!user ? " - Login First" : ""}}</v-btn>

        </div>
        <messageIcon message="No items in your cart" v-else />

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

    computed: mapGetters(["cart", "user"]),

    methods: {

        ...mapActions(["getCart"]),

        async remove() {

            if(this.cartItems.length == 0) return this.$toast("No items selected")

            await this.$axios.post("/cartitems/remove", {
                items: this.cartItems
            })

            this.getCart()
            this.cartItems = []

        },

        async update(e) {

            e.preventDefault()

            if(this.cartItem.quantity > this.cartItem.product.quantity) 
                return this.quanErr = "Only " + this.cartItem.product.quantity + " available"
            
            if(this.cartItem.quantity <= 0)
                return this.quanErr = "Order 1 or more"

            this.quanErr = null

            let res = await this.$axios.put("/cartitems/one/"+this.cartItem._id, this.cartItem)
            if(!res.data.err) this.getCart()
            this.quantityDialog = false

        },

        async movetowish() {

            if(this.cartItems.length == 0) return this.$toast("No items selected")

            await this.$axios.put("/cartitems/carttowish", {
                items: this.cartItems
            })

            this.cartItems = []
            this.getCart()
        },

    },

    created() {
        this.getCart()
    }

}
</script>

<style>

</style>