<template>
  
    <div>
        <div>
            

            <v-simple-table dense v-if="orders.length > 0">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">#</th>
                            <th class="text-left">Customer</th>
                            <th class="text-left">#Items</th>
                            <th class="text-left">Amount</th>
                            <th class="text-left">Delivery</th>
                            <th class="text-left">Coupon</th>
                            <th class="text-left">Placed On</th>
                            <th class="text-left">Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="o in orders" 
                            :key="o._id" 
                            :class="o.banned ? 'pink lighten-4' : ''"
                        >
                            <td>{{ o.orderNum }}</td>
                            <td>{{ o.userName + ", " + o.userEmail + ", " + o.userPhone }}</td>
                            <td>{{ o.items.length }}</td>
                            <td>R {{ o.totalAmount }}</td>
                            <td>R {{ o.deliveryFee }}</td>
                            <td>{{ o.coupon ||  "-" }}</td>
                            <td>{{$getDate(o.createdAt)}}</td>
                            <td>{{$getStatus(o.status)}}</td>

                            <td>
                                <v-menu bottom left>
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab icon v-bind="attrs" v-on="on" @click="order = {...o}">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item :to="'/order/'+o._id">
                                            <v-list-item-title>See Order</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="statusDialog = true">
                                            <v-list-item-title>Modify Status</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="addressDialog = true">
                                            <v-list-item-title>See Delivery Address</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </td>
                            
                        </tr>	
                    </tbody>
                </template>
            </v-simple-table>

            <messageIcon message="No Orders" v-else />

            <div class="my-4">
                <v-pagination 
                    :length="nav.pages" 
                    v-model="page" 
                    :total-visible="4"
                    right
                    color="purple"
                    class="d-inline py-4 mt-8"
                    v-if="orders.length > 15"
                ></v-pagination>
            </div>

            <v-dialog
                v-model="statusDialog"
                max-width="500px"
                transition="dialog-transition"
            >
                
                <div class="pa-4 white">

                    <h2 class="green--text">Change Status</h2>

                    <p>Current Status: {{$getStatus(order.status)}}</p>

                    <p class="pa-2 purple white--text">
                        0 - Cancelled <br>
                        1 - Awaiting Delivery <br>
                        2 - Delivered
                    </p>

                    <v-select
                        :items="[0,1,2]"
                        v-model="order.status"
                        label="Status"
                        color="purple"
                        filled
                    ></v-select>

                    <v-btn color="success" @click="statusConfirmDialog = true">Change</v-btn>
                    <v-divider class="mx-2" vertical></v-divider>
                    <v-btn color="pink" class="white--text" @click="statusDialog = false">Cancel</v-btn>

                </div>

            </v-dialog>

            <v-dialog
                v-model="statusConfirmDialog"
                max-width="500px"
                transition="dialog-transition"
            >
                <confirmAction :action="changeStatus" />
            </v-dialog>

            <v-dialog
                v-model="addressDialog"
                max-width="500px"
                transition="dialog-transition"
            >
                <div class="pa-4 white">
                    <h2 class="green--text mb-3">Address</h2>

                    <h3 class="purple--text">
                        To: 
                        {{order.address["recipientName"]}}, 
                        {{order.address["recipientPhone"]}}.

                    </h3>

                    <p class="ma-0">line 1: {{order.address["address1"]}}</p>
                    <p class="ma-0">line 2: {{order.address["address2"]}}</p>
                    <p class="ma-0">City: {{order.address["city"]}}</p>
                    <p class="ma-0">Surburb: {{order.address["surburb"]}}</p>
                    <p class="ma-0">Postal Code: {{order.address["postalCode"]}}</p>
                    <p class="ma-0">Province: {{order.address["province"]}}</p>

                    <v-btn class="pink white--text mt-3" @click="addressDialog = false">Close</v-btn>

                </div>
            </v-dialog>

    </div>
        </div>

</template>

<script>
import qs from "querystringify"

export default {
    name: "ordersList",
    data: () => ({
        statusDialog: false, 
        statusConfirmDialog: false,
        addressDialog: false,
        order: {
            address: {}
        },
        orders: [],
        page: 1,
        nav: {},
        filter: "All",
        filterRules: [

            {name: "All", value: 0},
            {name: "Awaiting Payment", value: 1},
            {name: "Awaiting Delivery", value: 2},
            {name: "Delivered", value: 3}

        ]
    }),
    methods: {
        
        async getOrders() {

            let res = await this.$axios.get("/orders" + qs.stringify(this.$route.query, true))
            this.orders = res.data.results
            this.nav = res.data.nav
            this.page = this.nav.page
            scroll(0,0)

        },

        paginate() {

            let query = {...this.$route.query}
            query.page = this.page
            this.$router.push({query})

        },

        filterRes() {
            let query = {...this.$route.query}
            query.page = 1
            query.filter = this.filter
            if(query.filter == "All") delete query.filter
            this.$router.push({query})
        }, 
        
        async changeStatus() {
           
            let res = await this.$axios.put("/orders/" + this.order._id, {status: this.order.status})
            if(!res.data.err) {
                this.getOrders()
                scroll(0,0)
                this.statusDialog = false
                this.statusConfirmDialog = false
            }
        }

    },

    async created() {
        await this.getOrders()
    },

    watch: {
        page() {
            this.paginate()
        },

        filter() {
            this.filterRes()
        },

        $route() {
            this.getOrders()
        }
    }
}
</script>

<style>

</style>