<template>
    <div>

        <h1 class="green--text">Manage Coupons</h1>
        <v-divider class="my-3"></v-divider>
        <v-btn to="/addcoupon" class="mb-6"><v-icon>mdi-plus-box</v-icon> Coupon</v-btn>

        <couponsList />

    </div>
</template>

<script>
import couponsList from "./Coupon/listCoupons"

export default {    
    name: "manageCoupons",
    components: {
        couponsList
    }
}
</script>

<style>

</style>