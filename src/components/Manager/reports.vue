<template>
    
    <div>

        <h1 class="green--text">Reports</h1>

        <div class="row">
            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-account</v-icon>
                    <p>No. Users</p>
                    <h2>{{users.total}}</h2>

                </v-card>
            </div>

            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-account-plus</v-icon>
                    <p>New Users [TODAY]</p>
                    <h2>{{users.newToday}}</h2>

                </v-card>
            </div>

            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-account-alert</v-icon>
                    <p>No. Banned Users</p>
                    <h2>{{users.banned}}</h2>

                </v-card>
            </div>

            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-archive</v-icon>
                    <p>No. Products</p>
                    <h2>{{products.total}}</h2>

                </v-card>
            </div>

            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-archive</v-icon>
                    <p>Products Out of Stock</p>
                    <h2>{{products.outOfStock}}</h2>

                </v-card>
            </div>
            
            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-archive</v-icon>
                    <p>No. Categories</p>
                    <h2>{{categories.total}}</h2>

                </v-card>
            </div>

        </div>

        <h3 class="purple--text">Category Reports</h3>

        <div class="row">
            <div class="col-md-3 col-sm-4 col-6" v-for="(c, i) in categories.categoryProducts" :key="i">
                <v-card class="pa-4">
                    <p class="green--text">{{c.category}}</p>
                    <p>Products: {{c.products}}</p>
                </v-card>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    name: "reports",

    data: () => ({
        users: {},
        products: {},
        orders: {},
        categories: {},
        

    }),

    async created() {
        let res = await this.$axios.get("/reports/users")
        this.users = res.data.results
        res = await this.$axios.get("/reports/products")
        this.products = res.data.results
        res = await this.$axios.get("/reports/orders")
        this.orders = res.data.results
        res = await this.$axios.get("/reports/categories")
        this.categories = res.data.results

    }
}
</script>

<style>

</style>