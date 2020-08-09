<template>
    <div>
        <h1 class="green--text">My Account</h1>

        <p>
            Name: {{user.name || ""}}
            <br>
            Email: {{user.email || ""}}
            <br>
            Phone: {{user.phone || ""}}
        </p>

        <div class="row">
            <div class="col-lg-4">
                <v-card class="pa-4" height="100%">

                    <h3 class="purple--text mb-3">
                        Change Password
                    </h3>

                    <v-form autocomplete="off" @submit="changePwd">
                        <v-text-field
                            name="oldPwd"
                            label="Old Password"
                            type="password"
                            v-model="oldPwd"
                            autocomplete="off"
                            filled
                            color="purple"
                            required
                            :error="oldPwdErr ? true : false"
                            :error-messages="oldPwdErr"
                        ></v-text-field>
                        <v-text-field
                            name="newPwd"
                            label="New Password"
                            type="password"
                            filled
                            color="purple"
                            v-model="newPwd"
                            required
                            :error="newPwdErr ? true : false"
                            :error-messages="newPwdErr"
                        ></v-text-field>
                        <v-text-field
                            name="newPwd2"
                            label="Confirm New Password"
                            type="password"
                            v-model="newPwd2"
                            filled
                            color="purple"
                            required
                            :error="newPwd2Err ? true : false"
                            :error-messages="newPwd2Err"
                        ></v-text-field>

                        <v-btn color="success" type="submit">Submit</v-btn>
                    </v-form>
                </v-card>
            </div>
            <div class="col-lg-4">
                <v-card class="pa-4" height="100%">

                    <h3 class="purple--text mb-3">
                        Change Email
                    </h3>
                    <p>Current: <b class="green--text">{{user.email || ""}}</b></p>

                    <v-form autocomplete="off" @submit="changeEmail">
                        
                        <v-text-field
                            name="newEmail"
                            label="New Email"
                            type="email"
                            filled
                            color="purple"
                            v-model="newEmail"
                            required
                            :error="newEmailErr ? true : false"
                            :error-messages="newEmailErr"
                        ></v-text-field>
                        <v-text-field
                            name="newEmail2"
                            label="Confirm New Email"
                            type="email"
                            v-model="newEmail2"
                            filled
                            color="purple"
                            required
                            :error="newEmail2Err ? true : false"
                            :error-messages="newEmail2Err"
                        ></v-text-field>

                        <v-btn color="success" type="submit">Submit</v-btn>
                    </v-form>
                </v-card>
            </div>

            <div class="col-lg-4">
                <v-card class="pa-4" height="100%">

                    <h3 class="purple--text mb-3">
                        Change Phone
                    </h3>
                    <p>Current: <b class="green--text">{{user.phone || ""}}</b></p>

                    <v-form autocomplete="off" @submit="changePhone">
                        
                        <v-text-field
                            name="newPhone"
                            label="New Phone"
                            type="tel"
                            filled
                            color="purple"
                            v-model="newPhone"
                            required
                            :error="newPhoneErr ? true : false"
                            :error-messages="newPhoneErr"
                        ></v-text-field>
                        <v-text-field
                            name="newPhone2"
                            label="Confirm New Phone"
                            type="Phone"
                            v-model="newPhone2"
                            filled
                            required
                            color="purple"
                            :error="newPhone2Err ? true : false"
                            :error-messages="newPhone2Err"
                        ></v-text-field>

                        <v-btn color="success" type="submit">Submit</v-btn>
                    </v-form>
                </v-card>
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import validator from "validator"

export default {

    name: "myAccount",

    computed: mapGetters(["user"]),

    data: () => ({
        oldPwd: "",
        newPwd: "",
        newPwd2: "",
        newEmail: "",
        newEmail2: "",
        newPhone: "",
        newPhone2: "",

        oldPwdErr: null,
        newPwdErr: null,
        newPwd2Err: null,
        newEmailErr: null,
        newEmail2Err: null,
        newPhoneErr: null,
        newPhone2Err: null
    }),

    methods: {

        async changeEmail(e) {
            
            e.preventDefault()

            if(!this.validateEmail()) return false

            await this.$axios.put("/users/email", {
                newEmail: this.newEmail,
            })

            if(!res.data.err) {
                this.newEmail = ""
                this.newEmail2 = ""
                this.checkAuth()
            }

        },

        async changePhone(e) {
            
            e.preventDefault()

            if(!this.validatePhone()) return false

            let res = await this.$axios.put("/users/phone", {
                newPhone: this.newPhone,
            })

            if(!res.data.err) {
                this.newPhone = ""
                this.newPhone2 = ""
                this.checkAuth()
            }

        },

        async changePwd(e) {

            e.preventDefault()

            if(!this.validatePwd()) return false

            let res = await this.$axios.put("/users/password", {
                oldPwd: this.oldPwd,
                newPwd: this.newPwd
            })

            if(!res.data.err) {
                this.oldPwd = ""
                this.newPwd = ""
                this.newPwd2 = ""
            }

        },

        validateEmail() {

            let valid = true

            if(!validator.isEmail(this.newEmail)) {
                valid = false
                this.newEmailErr = "Enter valid email"
            } else {
                this.newEmailErr = null
            }

            if(this.newEmail != this.newEmail2) {
                valid = false
                this.newEmail2Err = "Emails do not match"
            } else {
                this.newEmail2Err = null
            }

            return valid

        },

        validatePhone() {

            let valid = true

            let phonReg = new RegExp("[0|+27]{1}[0-9]{8,}")
            if(!phonReg.test(this.newPhone) || this.newPhone.length > 12) {
                this.newPhoneErr = "Enter valid RSA Phone number"
                valid = false
            } else {
                this.newPhoneErr = null
            }

            if(this.newPhone != this.newPhone2) {
                valid = false
                this.newPhone2Err = "Phone numbers do not match"
            } else {
                this.newPhone2Err = null
            }

            return valid

        },

        validatePwd() {
            
            let valid = true

            if(!this.oldPwd || this.oldPwd.length <= 5) {
                this.oldPwdErr = "length should be a minimun of 6 characters"
                valid = false
            } else {
                this.oldPwdErr = null
            }
            
            if(!this.newPwd || this.newPwd.length <= 5) {
                this.newPwdErr = "length should be a minimun of 6 characters"
                valid = false
            } else {
                this.newPwdErr = null
            }

            if(this.newPwd2 != this.newPwd) {
                this.newPwd2Err = "passwords do not match"
                valid = false
            } else {
                this.newPwd2Err = null
            }

            return valid

        },

        ...mapActions(["checkAuth"])

    }



}
</script>

<style>

</style>