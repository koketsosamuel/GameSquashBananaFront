<template>
    
    <div>

        <h1 class="green--text">Reports</h1>  

        <v-tabs color="purple" v-model="tab">
            <v-tab>Overall</v-tab>
            <v-tab>Today</v-tab>
            <v-tab>Last 7 days</v-tab>
            <v-tab>Last 30 days</v-tab>
            <v-tab>Last 365 days</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>

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
                                
                                <v-icon color="purple" size="80">mdi-archive</v-icon>
                                <p>No. Products</p>
                                <h2>{{products.total}}</h2>

                            </v-card>
                        </div>

                        <div class="col-md-4 text-center">
                            <v-card height="100%" class="pa-8">
                                
                                <v-icon color="purple" size="80">mdi-archive</v-icon>
                                <p>Total Products quantity</p>
                                <h2>{{totProUnits}}</h2>

                            </v-card>
                        </div>
                        
                        <div class="col-md-4 text-center">
                            <v-card height="100%" class="pa-8">
                                
                                <v-icon color="purple" size="80">mdi-archive</v-icon>
                                <p>No. Categories</p>
                                <h2>{{categories.total}}</h2>

                            </v-card>
                        </div>

                        <div class="col-md-4 text-center">
                            <v-card height="100%" class="pa-8">
                                
                                <v-icon color="purple" size="80">mdi-clipboard-text</v-icon>
                                <p>No. Orders</p>
                                <h2>{{orders.total}}</h2>

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

                    <h3 class="purple--text">Products</h3>

                    <div class="row">
                        <div class="col-md-3 col-6 col-sm-4 h-100" v-for="p in allProducts" :key="p._id">
                            <v-card class="pa-4">
                                <p class="green--text">{{p.name}}</p>
                                <p>Quantity: {{p.quantity}}</p>
                            </v-card>
                        </div>
                    </div>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <perTimeFrame time="D" />
            </v-tab-item>
            <v-tab-item>
                <perTimeFrame time="W" />
            </v-tab-item>
            <v-tab-item>
                <perTimeFrame time="M" />
            </v-tab-item>
            <v-tab-item>
                <perTimeFrame time="Y" />
            </v-tab-item>
        </v-tabs-items>

        
    </div>

</template>

<script>
import perTimeFrame from "./Report/perTimeFrame"

export default {
    name: "reports",

    components: {
        perTimeFrame
    },

    data: () => ({
        users: {},
        products: {},
        orders: {},
        categories: {},
        tab: 0,
        allProducts: [],
        totProUnits: 0
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
        res = await this.$axios.get("/products")
        this.allProducts = res.data.results || []

        for(let i = 0; i < this.allProducts.length; i++) {
            this.totProUnits += this.allProducts[i].quantity
            console.log(i)
        }



    }
}
</script>

<style>

</style>