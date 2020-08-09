<template>
    <div class="white pa-4 grey--text">

        <h2 class="mb-3 green--text"><v-icon color="green">mdi-account</v-icon> Login</h2>

        <v-form @submit="login">

            <v-text-field
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :error="emailErr ? true : false"
                :error-messages="emailErr"
                filled
                color="purple"
            ></v-text-field>

            <v-text-field
                name="password"
                label="Password"
                type="password"
                v-model="password"
                :error="passwordErr ? true : false"
                :error-messages="passwordErr"
                color="purple"
                filled
            ></v-text-field>

            <v-checkbox class="my-0" label="Keep logged in" v-model="keepMeLoggenId" color="purple" :value="true"></v-checkbox>


            <v-btn class="purple mb-3 white--text" type="submit">Submit</v-btn>
            <v-divider vertical class="mx-2 white my-0 pa-0"></v-divider>
            <v-btn v-if="done" class="pink mb-3 white--text" @click="reset">Cancel</v-btn>

        </v-form>

    </div>
</template>

<script>
import validator from "validator"
import {mapActions} from "vuex"

export default {

    name: "Login",

    props: ["done"],

    data: () => ({
        email: "",
        password: "",
        emailErr: null,
        passwordErr: null,
        keepMeLoggenId: false
    }),

    methods: {

        ...mapActions(["authenticate"]),

        async login(e)  {

            e.preventDefault()            

            if(!this.validate()) return false

            let res = await this.$axios.post("/users/login", {
                email: this.email,
                pwd: this.password
            })

            if(this.done && !res.data.err) {
                
                this.authenticate({...res.data.results})
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

            if(!this.password || this.password.length <= 5) {
                this.passwordErr = "length should be a minimun of 6 characters"
                valid = false
            } else {
                this.passwordErr = null
            }

            return valid

        },

        reset() {
            this.password = ""
            this.email = ""
            this.emailErr = null
            this.passwordErr = null

            if(this.done) this.done()
        }
    }

}
</script>

<style>

</style>