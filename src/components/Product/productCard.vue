<template>
  

    <router-link :to="'/products/'+product._id" tag="span" class="cursor">
    <v-card
        class="mx-auto pt-2 px-2"
        hover
        height="100%"
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
           
            <div class="grey--text my-0 py-0">R {{product.price}}</div>
            
            <v-rating
                :value="product.rating"
                color="amber"
                dense
                class="float-right py-2"
                half-increments
                readonly
                size="17"
                v-if="product.rating"
            ></v-rating>

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