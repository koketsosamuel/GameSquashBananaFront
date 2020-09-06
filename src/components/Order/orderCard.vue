<template>
  
    <div>
        <v-card class="pa-4 mb-4" :to="'/order/'+order._id">
            <h3 class="purple--text">#{{order.orderNum}} - {{$getStatus(order.status)}}</h3>
            <p class="ma-0">{{$getDate(order.createdAt)}}</p>
            <p class="ma-0">{{order.items.length}} Item(s)</p>
            <p class="ma-0">R {{order.totalAmount}}</p>
        </v-card>
    </div>

</template>

<script>
export default {

    name: "orderCard",

    props: ["order"],

}
</script>

<style>

</style>