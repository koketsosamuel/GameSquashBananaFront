<template>
  
    <div>
        
        <v-card class="purple lighten-2 pa-4 mb-6 white--text">
            <ul>
                <li>
                    All deliveries under R 600, are charged a flat fee of <b>R 100</b>
                </li>
                <li>
                    Our deliveries take a maximum of 5 days in major cities. And a maximum of 10 days in other areas
                </li>
            </ul>
        </v-card>

        <div v-if="addresses.length > 0 && !newAddress">
            
            <h3 class="purple--text mb-3">Address</h3>

            <v-btn color="success" class="mb-4" @click="newAddress = true">New Address</v-btn>                        

            <v-card 
                width="100%" 
                v-for="a in addresses" 
                :key="a._id" 
                class="purple lighten-2 pa-4 mb-4"
                @click="actionWhenDone(a)"
            >
                <h3 class="white--text">
                    <v-icon color="white" >mdi-account</v-icon> {{a.recipientName}} 
                    <v-icon color="white">mdi-phone</v-icon> {{a.recipientPhone}}
                </h3>
                <p>
                    {{a.address1}},
                    {{a.address2}}
                    <span v-if="a.address2">,</span>
                    {{a.surburb}},
                    {{a.city}},
                    {{a.postalCode}},
                    {{a.province}}
                </p>
            </v-card>


        </div>

        <v-form @submit="addAddress" v-else>

            <v-btn 
                color="success" 
                class="mb-4" 
                @click="newAddress = false"
                v-if="addresses.length > 0 && newAddress"
            >   
                Old Addresses
            </v-btn>
            
            <h3 class="purple--text">Recipient</h3>
            <v-text-field
                name="RecipientName"
                label="Recipient Name*"
                filled
                color="purple"   
                v-model="recipientName"                     
            ></v-text-field>

            <v-text-field
                name="RecipientPhone"
                label="Recipient Phone*"
                filled
                color="purple"        
                v-model="recipientPhone"                
            ></v-text-field>

            <h3 class="purple--text">Address</h3>

            <v-text-field
                name="Address"
                label="Address Line 1*"
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
                label="City*"
                filled
                color="purple"   
                v-model="city"                     
            ></v-text-field>

            <v-text-field
                name="Surbub"
                label="Surburb*"
                filled
                color="purple"
                v-model="surburb"                        
            ></v-text-field>

            <v-text-field
                name="PostalCode*"
                label="Postal Code"
                type="number"
                filled
                color="purple" 
                v-model="code"                       
            ></v-text-field>

            <v-select
                :items="provinces"
                v-model="province"
                label="Province*"
                filled
                color="purple"
            ></v-select>

            <v-textarea
                name="name"
                label="Additional Info"
                id="id"
                filled
                v-model="additionalInfo"
                color="purple"
            ></v-textarea>

            <v-btn color="success" type="submit">Proceed</v-btn>
        </v-form>

    </div>

</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "addresses",

    props: ["actionWhenDone"],

    data: () => ({
        
        stepper: 1,
        addresses: [],
        newAddress: true,

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
        recipientName: null,
        recipientPhone: null,
        code: null,
        surburb: null,
        city: null

    }),

    computed: mapGetters(["user"]),

    methods: {
        async addAddress(e) {

            e.preventDefault()

            let res = await this.$axios.post("/addresses", {
                province: this.province,
                address1: this.address1,
                address2: this.address2,
                additionalInfo: this.additionalInfo,
                recipientPhone: this.recipientPhone,
                recipientName: this.recipientName,
                postalCode: this.code,
                surburb: this.surburb,
                city: this.city
            })

            if(!res.data.err) this.actionWhenDone(res.data.results)
           
        },

        async getAddresses() {
            let res = await this.$axios.get("/addresses")
            if(!res.data.err) this.addresses = res.data.results
        }
    },

    async created() {
        await this.getAddresses()
        this.recipientName = this.user.name
        this.recipientPhone = this.user.phone
    }
}
</script>

<style>

</style>