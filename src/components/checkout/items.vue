<template>
  
    <div>
          
        <table class="pa-4 purple white--text mt-4 mx-2">
            <tbody>
                <tr>
                    <td>Total Amount</td>
                    <td> - R {{cart.total + cart.delivery}}</td>
                </tr>
                <tr>
                    <td>Delivery Fee</td>
                    <td> - {{cart.delivery > 0 ? 'R ' + cart.delivery : 'FREE'}}</td>
                </tr>
                <tr>
                    <td>VAT</td>
                    <td> - R {{cart.taxTotal}}</td>
                </tr>
            </tbody>
        </table>


        <div class="mt-4 mx-2">


            <div>

                <v-card v-for="item in cart.items" :key="item._id" class="pa-4 mb-4 d-flex">
                    <v-img :src="$baseURL + item.product.thumb" max-width="100" contain=""/>
                    <v-divider vertical class="grey mx-2"></v-divider>
                    <div class="px-2">
                        <p class="ma-0">{{item.product.name}}</p>
                        <p class="ma-0">R {{item.product.taxedAmount}}</p>
                        <p class="ma-0">Quantity - {{item.quantity}}</p>
                        <p class="ma-0">Sub total - R {{item.quantity * item.product.taxedAmount}}</p>
                    </div>
                </v-card>

            </div>

            <v-btn color="success" @click="action(cart.total + cart.delivery, cart.items)">Confirm Items</v-btn>

            


        </div>


    </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {

    name: "items",

    props: ["address", "action"],

    methods: {
        ...mapActions(["getCart"])
    },

    computed: mapGetters(["cart"])

}
</script>

<style>

</style>