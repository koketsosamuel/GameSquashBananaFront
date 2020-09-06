<template>
    <div>

        <h1 class="green--text">Order # {{order.orderNum}}</h1>
        <h3 class="purple--text">{{$getStatus(order.status)}}</h3>
        <h3 class="purple--text">{{$getDate(order.createdAt)}}</h3>

        <table class="pa-4 green white--text mt-4">
            <tbody>
                <tr>
                    <td>Total Amount</td>
                    <td> - R {{order.totalAmount}}</td>
                </tr>
                <tr>
                    <td>Delivery Fee</td>
                    <td> - {{order.deliveryFee > 0 ? 'R ' + order.deliveryFee : 'FREE'}}</td>
                </tr>
                <tr>
                    <td>Coupon</td>
                    <td> - {{order.coupon || "None"}}</td>
                </tr>
            </tbody>
        </table>

        <div class="purple pa-4 white--text mt-4">
            <h3 class="white--text">
                <v-icon color="white" >mdi-account</v-icon> {{address.recipientName}} 
                <v-icon color="white">mdi-phone</v-icon> {{address.recipientPhone}}
            </h3>
            <p>
                {{address.address1}},
                {{address.address2}}
                <span v-if="address.address2">,</span>
                {{address.surburb}},
                {{address.city}},
                {{address.postalCode}},
                {{address.province}}
            </p>
        </div>

        <div class="mt-4">

            <v-card v-for="item in order.items" :key="item._id" class="pa-4 mb-4 d-flex">
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

    </div>
</template>

<script>
export default {
    name: "singleOrder",

    data: () => ({
        order: {},
        address: {}
    }),

    async created() {

        let res = await this.$axios.get("/orders/one/"+this.$route.params.orderId)
        if(!res.data.err) this.order = res.data.results
        this.address = this.order.address

    }
}
</script>

<style>

</style>