<template>
    
    <v-form @submit="actionExecute">
        
        <div>

            <div>
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
          

            <div>
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

            <div>
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
        amountOff: "",
        minAmount: "",
      

        codeErr: null,
        amountOffErr: null,
        minAmountErr: null,
     
    }),

    methods: {

        async actionExecute(e) {
            e.preventDefault()
            if(!this.validate()) return false

            if(this.action == "add") {
                
                let res = await this.$axios.post("/coupons", {
                    code: this.code,
                    amountOff: this.amountOff,
                    minAmount: this.minAmount,
                })   
                if(!res.data.err) this.$router.push("/managecoupons?page=1")

            } else if(this.action = "edit") {
                let res = await this.$axios.put("/coupons/"+this.$route.params.couponId, {
                    code: this.code || "",
                    amountOff: this.amountOff || "",
                    minAmount: this.minAmount || "",
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


            if(!this.amountOff || this.amountOff <= 0 || !validator.isNumeric(this.amountOff)) {
                this.amountOffErr = "Enter valid amount"
                valid = false
            } else {
                this.amountOffErr = null
            }

            

            if(this.minAmount.length > 0){ 
                if( !validator.isNumeric(this.minAmount) || this.minAmount < 0) {
                    this.minAmountErr = "Enter valid minimum amount!"
                    valid = false
                } else {
                    this.minAmountErr = null
                }

            }
        

            return valid

        }

    },

    async created() {
        if(this.$route.params.couponId) {
            let res = await this.$axios.get("/coupons/"+this.$route.params.couponId)
            if(!res.data.err) {

                let _res = res.data.results

                this.code = _res.code || null
                this.amountOff = _res.amountOff || null
                this.minAmount = _res.minAmount || null

            }
        }

        //this.startDate = String(Date.now())
    }

}
</script>

<style>

</style>