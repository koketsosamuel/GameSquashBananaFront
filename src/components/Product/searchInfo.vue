<template>
    <div v-if="$route.query.s" class="mb-4">
        <h2 class="sub-title"><v-icon>mdi-magnify</v-icon> {{$route.query.s}}</h2>
        <p class="ma-0">Results: {{productsObj.nav.total}}</p>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {

    name: "searchInfo",

    computed: mapGetters(["productsObj"])

}
</script>