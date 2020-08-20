<template>
    
    <div>
        
        <h1 class="green--text">Add Coupon</h1>

        <couponForm action="add" />

    </div>

</template>

<script>
import couponForm from "./form"

export default {

    name: "addCoupon",

    components: {
        couponForm
    }

}
</script>

<style>

</style>