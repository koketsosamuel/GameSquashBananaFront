<template>
    <div>

        <div class="my-4">
            <banners />

        </div>

        <h1>Our Latest Stuff</h1>
        <horProds query="?sort=-createdAt&perpage=6" />

        <br>

        <h1>Best Selling</h1>
        <horProds query="?sort=-sold&perpage=6" />
    </div>
</template>

<script>
import horProds from "./Product/horizontalProducts"
import banners from "./bannerView"

export default {

    name: "home",

    components: {
        horProds,
        banners
    }

}
</script>

<style>

</style>