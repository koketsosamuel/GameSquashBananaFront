<template>
  

    <router-link :to="'/products/'+product._id" tag="span" class="cursor">
    <v-card
        class="mx-auto pt-2 px-2"
        hover
    >
        <v-img
            contain
            :src="$baseURL + product.thumb"
            lazy-src="@/assets/lazy.jpeg"
        ></v-img>


        <v-card-text>
        <div
            align="left"
            class="mx-0 my-0 py-0"
        >
            <h5 class="py-0">{{product.name}}</h5>
            
            <v-rating
                :value="products.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                v-if="product.rating"
            ></v-rating>

            <div class="grey--text my-0 py-0">R {{product.price}}</div>
        </div>

        </v-card-text>

    </v-card>
    </router-link>

</template>

<script>
export default {

    name: "singleProductCard",

    props: ["product"]

}
</script>

<style>

</style>