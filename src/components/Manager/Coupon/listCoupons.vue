<template>
    <div>

        <div v-if="coupons.length > 0">

            <v-simple-table dense class="mb-4">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Code</th>
                            <th class="text-left">Amount Off</th>
                            <th class="text-left">Min. Amount</th>
                            <th class="text-left"></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr 
                            v-for="c in coupons" 
                            :key="c._id" 
                        >

                            <td>{{ c.code }}</td>
                            <td>{{ c.amountOff ? "R " + c.amountOff : "None" }}</td>
                            <td>{{ c.minAmount ? "R " + c.minAmount : "None" }}</td>

                            <td>
                                <v-menu bottom left>
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab icon v-bind="attrs" v-on="on" @click="coupon = c">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item :to="'/editcoupon/'+c._id">
                                            <v-list-item-title>Edit</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="removeDialog = true">
                                            <v-list-item-title>Remove</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </td>
                            
                          
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <v-pagination 
                :length="nav.pages" 
                v-model="page" 
                :total-visible="4"
                right
                color="purple"
                class="d-inline py-4 mt-8"
            ></v-pagination>

        </div>
        <messageIcon message="No Coupons" v-else />

        <v-dialog
            v-model="removeDialog"
            max-width="500px"
            transition="dialog-transition"
        >
            <confirmAction :action="remove" />
        </v-dialog>


    </div>
</template>

<script>
import qs from "querystringify"

export default {
    
    name: "couponsList",

    data: () => ({
        removeDialog: false,
        coupon: {},
        coupons: [],
        nav: {},
        page: 1,
        filterArr: []
    }),


    methods: {
        
        async getCoupons() {
            let res = await this.$axios.get("/coupons?"+qs.stringify(this.$route.query, true))
            this.coupons = res.data.results
            this.nav = res.data.nav
            this.page = this.nav.page
            scroll(0,0)
        },

        async remove() {
            let res = await this.$axios.delete("/coupons/"+this.coupon._id)
            if(!res.data.err) {
                this.removeDialog = false
                this.getCoupons()
            }   
        }

    },

    async created() {
        await this.getCoupons()
    },

    watch: {
        
        page() {
            if(this.page != this.$route.query.page) {

                let obj = {...this.$route.query}
                obj.page = this.page

                this.$router.push({query: obj})

            }
        },

        $route() {
            this.getCoupons()
        },

        filterArr() {

        }

    }

}
</script>

<style>

</style>