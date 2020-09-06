<template>
    <div>
        <h1 class="green--text">
            Manage Orders
        </h1>

        <ordersList />

    </div>
</template>

<script>
import ordersList from "./Order/ordersList"

export default {
    name: "manageOrders",

    components: {
        ordersList
    }
}
</script>

<style>

</style>