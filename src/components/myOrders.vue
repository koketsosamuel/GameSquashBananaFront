<template>
  
    <div>

        <h1 class="green--text mb-5">My Orders</h1>
       

        <div>
            <orderCard
                v-for="order in orders"
                :key="order._id"
                :order="order"
            ></orderCard>
        </div>

        <messageIcon message="No Order history, buy something!" v-if="orders.length <= 0" />

    </div>

</template>

<script>
import orderCard from "./Order/orderCard"

export default {
    name: "myOrders",

    data: () => ({
        orders: []
    }),

    components: {
        orderCard
    },

    

    async created() {

        let res = await this.$axios.get("/orders/myorders")
        if(!res.data.err) this.orders = res.data.results

    }

}
</script>

<style>

</style>