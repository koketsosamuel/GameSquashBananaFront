<template>
    <div>

        <div class="row">
            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-account</v-icon>
                    <p>New Users</p>
                    <h2>{{reports.newUsers}}</h2>

                </v-card>
            </div>

            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-clipboard-text</v-icon>
                    <p>No. Orders</p>
                    <h2>{{reports.newOrders}}</h2>

                </v-card>
            </div>

            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-archive</v-icon>
                    <p>New Products</p>
                    <h2>{{reports.newProducts}}</h2>

                </v-card>
            </div>

            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-archive</v-icon>
                    <p>No. Categories</p>
                    <h2>{{reports.newCategories}}</h2>

                </v-card>
            </div>
        </div>

        <h1 class="green--text">Orders</h1>
        <div class="row">
            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-truck</v-icon>
                    <p>Delivered</p>
                    <h2>{{reports.deliveredOrders}}</h2>

                </v-card>
            </div>
            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-clipboard-text</v-icon>
                    <p>Awaiting Delivery</p>
                    <h2>{{reports.awaitingDeliveryOrders}}</h2>

                </v-card>
            </div>
            <div class="col-md-4 text-center">
                <v-card height="100%" class="pa-8">
                    
                    <v-icon color="purple" size="80">mdi-close</v-icon>
                    <p>Cancelled</p>
                    <h2>{{reports.cancelledOrders}}</h2>

                </v-card>
            </div>
        </div>

        <h1 class="green--text">Categories</h1>
        <div class="row">
            <div class="col-md-3 col-sm-4 col-6" v-for="(c, i) in reports.categoryProducts" :key="i">
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
    name: "perTimeFrame",
    data: () => ({
        reports: {
            categoryProducts: []
        }
    }),
    props: ['time'],
    async created() {
        let res = await this.$axios.get("/reports/time?time=" + this.time)
        this.reports = res.data.results
        console.log(this.reports.categoryProducts)
    }
}
</script>

<style>

</style>