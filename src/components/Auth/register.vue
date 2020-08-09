<template>
    <div class="white pa-4 grey--text">

        <h2 class="mb-3 green--text"><v-icon color="green">mdi-account</v-icon> Register</h2>

        <v-form @submit="register">
            
            <div class="row">
                <div class="col-12">
                    <v-text-field
                        name="name"
                        label="Name"
                        v-model="name"
                        :error="nameErr ? true : false"
                        :error-messages="nameErr"
                        filled
                        color="purple"
                    ></v-text-field>
                </div>
                <div class="col-12">
                    <v-text-field
                        name="phone"
                        label="Phone Number"
                        v-model="phone"
                        :error="phoneErr ? true : false"
                        :error-messages="phoneErr"
                        filled
                        color="purple"
                    ></v-text-field>
                </div>
                <div class="col-md-6">
                    <v-text-field
                        name="email"
                        label="Email"
                        type="email"
                        color="purple"
                        v-model="email"
                        :error="emailErr ? true : false"
                        :error-messages="emailErr"
                        filled
                    ></v-text-field>
                </div>
                <div class="col-md-6">
                    <v-text-field
                        color="purple"
                        name="confirmemail"
                        label="Confirm Email"
                        type="email"
                        v-model="confirmemail"
                        :error="confirmEmailErr ? true : false"
                        :error-messages="confirmEmailErr"
                        filled
                    ></v-text-field>
                </div>
                <div class="col-md-6">
                    <v-text-field
                        name="password"
                        label="Password"
                        type="password"
                        color="purple"
                    
                        v-model="password"
                        :error="passwordErr ? true : false"
                        :error-messages="passwordErr"
                        filled
                    ></v-text-field>
                </div>

                <div class="col-md-6">
                    <v-text-field
                        name="confirmpassword"
                        label="Confirm Password"
                        type="password"
                        :error="confirmPasswordErr ? true : false"
                        :error-messages="confirmPasswordErr"
                        filled
                        color="purple"
                        v-model="confirmpassword"
                    ></v-text-field>
                </div>
                <div class="col-md-6">
                    <v-btn class="purple mb-3 white--text" type="submit">Submit</v-btn>
                    <v-divider vertical class="mx-2 white my-0 pa-0"></v-divider>
                    <v-btn v-if="done" class="pink mb-3 white--text" @click="reset">Cancel</v-btn>
                    
                </div>
            </div>
        </v-form>

    </div>
</template>

<script>
import validator from "validator"

export default {

    name: "registerUser",

    props: ["done"],

    data: () => ({
        name: "",
        password: "",
        phone: "",
        email: "",
        confirmemail: "",
        confirmpassword: "",

        pwdErr: null,
        nameErr: null,
        phoneErr: null,
        emailErr: null,
        confirmEmailErr: null,
        confirmPasswordErr: null,
        passwordErr: null
    }),

    methods: {
        async register(e) {
            
            e.preventDefault()

            if(!this.validate()) return false

            let res = await this.$axios.post("/users/register", {
                name: this.name,
                pwd: this.password,
                phone: this.phone,
                email: this.email
            })

            if(this.done && !res.data.err) {
                
                this.reset()
                this.done()

            }

        },

        validate() {

            let valid = true

            if(!validator.isEmail(this.email)) {
                this.emailErr = "Invalid Email"
                valid = false
            } else {
                this.emailErr = null
            }

            if(!this.name || this.name.length < 3) {
                this.nameErr = "Enter valid name"
                valid = false
            } else {
                this.nameErr = null
            }

            if(this.email != this.confirmemail) {
                this.confirmEmailErr = "Emails dont match"
                valid = false
            } else {
                this.confirmEmailErr = null
            }

            let phonReg = new RegExp("[0|+27]{1}[0-9]{9,}")
            if(!phonReg.test(this.phone) || this.phone.length > 12) {
                this.phoneErr = "Enter valid RSA Phone number"
                valid = false
            } else {
                this.phoneErr = null
            }

            if(!this.password || this.password.length <= 5) {
                this.passwordErr = "length should be a minimun of 6 characters"
                valid = false
            } else {
                this.passwordErr = null
            }

            if(this.confirmpassword != this.password) {
                this.passwordConfirmErr = "passwords do not match"
                valid = false
            } else {
                this.confirmPasswordErr = null
            }

            return valid


        },

        reset() {
            this.name = ""
            this.password = ""
            this.phone = ""
            this.email = ""
            this.confirmemail = ""
            this.confirmpassword =""

            this.confirmEmailErr = null
            this.nameErr = null
            this.emailErr = null
            this.phoneErr = null
            this.passwordErr = null
            this.confirmPasswordErr = null

            if(this.done) this.done()
        }


    }

}
</script>

<style scoped>

    .row > div {
		padding-top: 0px!important;
		padding-bottom: 0px !important;
	}

</style>