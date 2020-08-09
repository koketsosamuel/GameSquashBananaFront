<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="purple"
          dark
          v-bind="attrs"
          v-on="on"
        >
            <v-icon>mdi-format-list-bulleted-square</v-icon>
            Sort
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in sorts"
          :key="index"
          @click="sort(item.val)"
          :class="item.val == $route.query.sort ? 'purple' : ''"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
    name: "sortProducts",

    data: () => ({
        sorts: [
            {
                name: "Latest",
                val: "-createdAt"
            },
            {
                name: "Best selling",
                val: "-sold"
            },
            {
                name: "Name: A - Z",
                val: "name"
            },
            {
                name: "Name: Z - A",
                val: "-name"   
            },
            {
                name: "Price: High - Low",
                val: "-price"
            },
            {
                name: "Price: Low - High",
                val: "price"
            },
            {
                name: "Rating: High - Low",
                val: "-overallRating"
            },
            {
                name: "Rating: Low - High",
                val: "overallRating"
            },
            
        ]
    }),

    methods: {
        sort(val, replace = false) {
            let query = {...this.$route.query}
            delete query.page
            query.sort = val
            if(replace) this.$router.replace({query})
            else this.$router.push({query})
        }
    },

    created() {
        if(!this.$route.query.sort) this.sort("-createdAt", true)
    }
}
</script>

<style>

</style>