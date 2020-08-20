<template>
    <div>

        <h1 class="green--text">
            Checkout
        </h1>

        <v-stepper v-model="stepper">
			<v-stepper-header>
				<v-stepper-step :complete="stepper > 1 || stepper > 2" step="1" color="purple">
                     Delivery
                </v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step :complete="stepper > 2" step="2" color="green">
                    Items
                </v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step step="3" color="green">
                    Payment
                </v-stepper-step>

			</v-stepper-header>

			<v-stepper-items class="greys">
				<v-stepper-content step="1">			                    

                    <h3 class="purple--text">Recipient</h3>
                    <v-text-field
                        name="RecipientName"
                        label="Recipient Name"
                        filled
                        color="purple"   
                        v-model="recipientName"                     
                    ></v-text-field>

                    <v-text-field
                        name="RecipientPhone"
                        label="Recipient Phone "
                        filled
                        color="purple"        
                        v-model="recipientPhone"                
                    ></v-text-field>

                    <h3 class="purple--text">Address</h3>

                    <v-text-field
                        name="Address"
                        label="Address Line 1"
                        filled
                        color="purple"     
                        v-model="address1"                   
                    ></v-text-field>

                    <v-text-field
                        name="AddressLine2"
                        label="Address Line 2"
                        filled
                        color="purple"     
                        v-model="address2"                   
                    ></v-text-field>

                    <v-text-field
                        name="City"
                        label="City"
                        filled
                        color="purple"   
                        v-model="city"                     
                    ></v-text-field>

                    <v-text-field
                        name="Surbub"
                        label="Surburb"
                        filled
                        color="purple"
                        v-model="surburb"                        
                    ></v-text-field>

                    <v-text-field
                        name="PostalCode"
                        label="Postal Code"
                        type="number"
                        filled
                        color="purple" 
                        v-model="code"                       
                    ></v-text-field>

                    <v-select
                        :items="provinces"
                        v-model="province"
                        label="Province"
                        filled
                        color="purple"
                    ></v-select>

                    <v-btn color="success">Proceed</v-btn>

				</v-stepper-content>

				<v-stepper-content step="2">

				</v-stepper-content>

				<v-stepper-content step="3">
				
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>

    </div>
</template>

<script>
export default {
    name: "checkout",

    data: () => ({
        stepper: 1,
        addressStr: "",
        provinces: [
            "Gauteng",
            "KwaZulu-Natal",
            "Eastern Cape",
            "Limpopo",
            "North West",
            "Free State",
            "Mpumalanga",
            "Northern Cape",
            "Western Cape",
        ],
        province: null,
        address1: null,
        address2: null,
        additionalInfo: null,
        cellNo: null,
        recipientName: null,
        recipientPhone: null,
        code: null,
        surburb: null,
        city: null
        
    }),

    methods: {
        async findAddress() {
            let res = await this.$axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?key=<AIzaSyDguJa3-gMD0zIRhHE9GH8JdW9r6yRVL7k>&input="+this.addressStr)
            console.log(res, res.data)
        }
    }

}
</script>

<style>

</style>