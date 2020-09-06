<template>
    <div>

        <h1 class="green--text">
            Checkout
        </h1>

        <v-stepper v-model="stepper">
			<v-stepper-header>
				<v-stepper-step :complete="stepper > 1 || stepper > 2" step="1" color="green">
                     Delivery
                </v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step :complete="stepper > 2" step="2" color="green">
                   Confirm Items
                </v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step step="3" color="green">
                    Payment
                </v-stepper-step>

			</v-stepper-header>

			<v-stepper-items class="greys" editable >
                
				<v-stepper-content step="1">	
                    <addressView :actionWhenDone="setAddress" />
				</v-stepper-content>

				<v-stepper-content step="2" editable>
                    <v-btn color="success" class="mb-4 ml-2" @click="stepper -= 1">Back</v-btn>
                    <items :address="address" :action="setTotalAndItems"/>
				</v-stepper-content>

				<v-stepper-content step="3">

                    <v-btn color="success" class="mb-4" @click="stepper -= 1">Back</v-btn>

                    <h3 class="mb-2 purple--text">Address</h3>
                    <v-card 
                        width="100%" 
                        class="pa-4 purple lighten-2 white--text"
                    >
                        <h3 class="white--text">
                            <v-icon color="white" >mdi-account</v-icon> {{address.recipientName}} 
                            <v-icon color="white">mdi-phone</v-icon> {{address.recipientPhone}}
                        </h3>
                        <p>
                            {{address.address1}},
                            {{address.address2}}
                            <span v-if="address.address2">,</span>
                            {{address.surburb}},
                            {{address.city}},
                            {{address.postalCode}},
                            {{address.province}}
                        </p>
                    </v-card>

                    <h3 class="mt-3 purple--text">Coupon</h3>
                    <v-text-field
                        name="coupon"
                        label="Coupon Code"
                        id="id"
                        filled
                        color="purple"
                        v-model="coupon"
                        :disabled="couponField"
                    ></v-text-field>

                    <v-btn color="success" @click="applyCoupon">Apply Coupon</v-btn>

                    <v-btn 
                        block 
                        class="my-4 purple white--text" 
                        x-large 
                        :loading="loading"
                        @click="pay"
                    >
                        Pay - R {{total}}
                    </v-btn>

				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>

    </div>
</template>

<script>
import address from "./checkout/address"
import items from "./checkout/items"

export default {
    name: "checkout",

    data: () => ({
        stepper: 1,
        address: {},
        coupon: "",
        total: 0,
        loading: false,
        items: [],
        query: "",
        couponField: false,
        couponObj: null
    }),

    components: {
        addressView: address,
        items
    },

    methods: {
        setAddress(addr) {

            this.address = addr
            this.stepper += 1

        },

        setTotalAndItems(num, items) {
            this.items = items
            this.total = num
            this.stepper += 1
        },

        async applyCoupon() {

            this.coupon = this.coupon.toUpperCase()

            let res = await this.$axios.get("/coupons/"+this.coupon)
            
            if(!res.data.err && res.data.results) {
                let coupon = res.data.results
                if(this.total >= coupon.minAmount) {
                    this.total -= coupon.amountOff
                    this.couponField = true
                    this.couponObj = res.data.results
                } else {
                    this.$toast("This coupon applies for a purchase with a minimum of R " + coupon.minAmount)
                }
                
            }else{
                this.$toast("Coupon does not exist")
            }
        },

        async pay() {

            this.loading = true
            let res = await this.$axios.post("/orders", {
                address: this.address,
                items: this.items,
                coupon: !this.couponField ? null : this.coupon,
                couponObj: this.couponObj
            })
            
           if(!res.data.err) this.$router.replace("/ordersuccess")

        }
    }

}
</script>

<style>

</style>