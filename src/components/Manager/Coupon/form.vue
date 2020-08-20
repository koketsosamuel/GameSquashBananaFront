<template>
    
    <v-form @submit="actionExecute">
        
        <div class="row">

            <div class="col-md-6 col-lg-4">
                <v-text-field
                    name="ccode"
                    label="Coupon Code"
                    filled
                    color="purple"
                    :error="codeErr? true : false"
                    :error-messages="codeErr"
                    v-model="code"
                ></v-text-field>
            </div>

            <div class="col-md-6 col-lg-4">
                <v-checkbox label="Use percentage" v-model="usePerc" :value="true" color="purple"></v-checkbox>
            </div>

            <div class="col-md-6 col-lg-4" v-if="usePerc">
                <v-text-field
                    name="percOff"
                    label="Percentage Off"
                    filled
                    color="purple"
                    type="number"
                    v-model="percOff"
                    :error="percOffErr ? true : false"
                    :error-messages="percOffErr"
                ></v-text-field>
            </div>

            <div class="col-md-6 col-lg-4" v-else>
                <v-text-field
                    name="amountOff"
                    label="Amount Off"
                    filled
                    type="number"
                    color="purple"
                    v-model="amountOff"
                    :error="amountOffErr ? true : false"
                    :error-messages="amountOffErr"
                ></v-text-field>
            </div>

            <div class="col-md-6 col-lg-4">
                <v-text-field
                    name="minAmount"
                    label="Minimun Amount"
                    filled
                    type="number"
                    color="purple"
                    v-model="minAmount"
                    :error="minAmountErr? true : false"
                    :error-messages="minAmountErr"
                ></v-text-field>
            </div>

            <div class="col-md-6 col-lg-4" v-if="usePerc">
                <v-text-field
                    name="maxAmountOff"
                    label="Maximum Amount Off"
                    filled
                    type="number"
                    color="purple"
                    v-model="maxAmountOff"
                    :error="maxAmountOffErr ? true : false"
                    :error-messages="maxAmountOffErr"
                ></v-text-field>
            </div>

            <div class="col-md-6 col-lg-4 ">
                <v-text-field
                    name="maxUses"
                    label="Maximum Number of Uses"
                    filled
                    color="purple"
                    v-model="maxNUses"
                    type="number"
                    :error="maxNUsesErr? true : false"
                    :error-messages="maxNUsesErr"
                ></v-text-field>
            </div>

            <div class="col-md-4" v-if="!usePerc"></div>

            <div class="col-md-6 col-lg-6">
                <p>Start Date</p>
                <v-date-picker v-model="startDate" width="100%" color="purple"></v-date-picker>
            </div>

            <div class="col-md-6 col-lg-6">
                <p>End Date</p>
                <v-date-picker v-model="endDate" width="100%" color="purple"></v-date-picker>
            </div>

            


        </div>
        <v-btn color="success" type="submit" >Submit</v-btn>

    </v-form>

</template>

<script>
import validator from "validator"
export default {
    name: "couponForm",

    props: ["action"],

    data: () => ({
        code: "",
        percOff: "",
        amountOff: "",
        minAmount: "",
        maxAmountOff: "",
        startDate: "",
        endDate: "",
        maxNUses: "",
        usePerc: true,

        codeErr: null,
        percOffErr: null,
        amountOffErr: null,
        minAmountErr: null,
        maxAmountOffErr: null,
        maxNUsesErr: null
    }),

    methods: {

        async actionExecute(e) {
            e.preventDefault()
            if(!this.validate()) return false

            if(this.action == "add") {
                
                let res = await this.$axios.post("/coupons", {
                    code: this.code,
                    percOff: this.percOff,
                    amountOff: this.amountOff,
                    maxNUses: this.maxNUses,
                    minAmount: this.minAmount,
                    maxAmountOff: this.maxAmountOff,
                    startDate: this.startDate,
                    endDate: this.endDate
                })   
                if(!res.data.err) this.$router.push("/managecoupons?page=1")

            } else if(this.action = "edit") {
                let res = await this.$axios.put("/coupons/"+this.$route.params.couponId, {
                    code: this.code || "",
                    percOff: this.percOff || "",
                    amountOff: this.amountOff || "",
                    maxNUses: this.maxNUses || "",
                    minAmount: this.minAmount || "",
                    maxAmountOff: this.maxAmountOff || "",
                    startDate: this.startDate || "",
                    endDate: this.endDate || ""
                })
                if(!res.data.err) this.$router.push("/managecoupons?page=1")
            }

        },

        validate() {


            let valid = true

            if(!this.code || this.code === "" || this.code.length < 3) {
                this.codeErr = "Code required, should be 3 or more characters long"
                valid = false
            } else {
                this.code = ""+this.code.toUpperCase()
                this.codeErr = null
            }


            if(this.usePerc) {

                if (   
                        !this.percOff || 
                        !validator.isNumeric(this.percOff) || 
                        this.perc <= 0 || 
                        this.percOff > 100
                    ) {

                    this.percOffErr = "Valid percentage required!"
                    valid = false

                }else {
                    this.percOffErr = null
                }
            }

            if(!this.usePerc) {

                if(!this.amountOff || this.amountOff <= 0 || !validator.isNumeric(this.amountOff)) {
                    this.amountOffErr = "Enter valid amount"
                    valid = false
                } else {
                    this.amountOffErr = null
                }

            }

            if(this.minAmount.length > 0){ 
                if( !validator.isNumeric(this.minAmount) || this.minAmount < 0) {
                    this.minAmountErr = "Enter valid minimum amount!"
                    valid = false
                } else {
                    this.minAmountErr = null
                }

            }

            if(this.maxAmountOff && (!validator.isNumeric(this.maxAmountOff) || this.maxAmountOff < 0)) {
                this.maxAmountOffErr = "Enter valid maximum amount!"
                valid = false
            } else {
                this.maxAmountOffErr = null
            }

            if(this.maxNUses && (!validator.isNumeric(this.maxNUses) || this.maxNUses < 0)) {
                this.maxNUsesErr = "Enter valid maximum number of users!"
                valid = false
            } else {
                this.maxNUsesErr = null
            }

            if(!validator.isBefore(this.startDate, this.endDate) && this.endDate) {
                this.$toast("End date has to be after the starting date")
                valid = false
            }

            if(!this.startDate) {
                this.$toast("Start date is required")
                valid = false
            }

            return valid

        }

    },

    async created() {
        if(this.$route.params.couponId) {
            let res = await this.$axios.get("/coupons/"+this.$route.params.couponId)
            if(!res.data.err) {

                let _res = res.data.results

                if(_res.percOff) this.usePerc = true
                else this.usePerc = false

                this.code = _res.code || null
                this.percOff = _res.percOff || null
                this.amountOff = _res.amountOff || null
                this.minAmount = _res.minAmount || null
                this.maxAmountOff = _res.maxAmountOff || null
                this.maxNUses = _res.maxNUses || null
                this.startDate = _res.startDate || null
                this.endDate = _res.endDate || null

            }
        }

        //this.startDate = String(Date.now())
    }

}
</script>

<style>

</style>