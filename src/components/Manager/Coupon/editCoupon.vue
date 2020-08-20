<template>
    
    <div>
        
        <h1 class="green--text">Edit Coupon</h1>

        <couponForm action="edit" />

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