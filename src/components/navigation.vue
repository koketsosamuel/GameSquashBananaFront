<template>
	<div>
    	<v-app-bar

			color="green"
			dark
			app
			elevate-on-scroll
		>
			<!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
			<router-link to="/" tag="span" class="cursor">
				<v-toolbar-title> GameSquashBanana</v-toolbar-title>
			</router-link>

			<v-spacer></v-spacer>

			<v-form @submit="searchProducts">
                <v-text-field
				name="searchProduct"
				label="Search Products"
				placeholder="Banana Pi	"
				v-model="search"
				single-line
				hide-details
				solo
				clearable
				light
				color="success"
				class="black--text"
			></v-text-field>
            </v-form>

			<v-divider vertical class="mx-2"></v-divider>

			<v-btn color="purple" to="/products?sort=-createdAt">				
				<v-icon>mdi-gamepad</v-icon> Games			
			</v-btn>

			<v-divider vertical class="mx-2"></v-divider>

			<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn				
					v-bind="attrs"
					v-on="on"
					color="purple"
					class="lighten-1f"
				>
					<v-icon>mdi-account</v-icon> {{user ? "My Account" : "Login"}}
				</v-btn>
			</template>
			<v-list>
				<v-list-item @click="registerDialog = true" v-if="!user">
					<v-list-item-title><v-icon>mdi-account-plus</v-icon> Register</v-list-item-title>
				</v-list-item>

				<v-list-item @click="loginDialog = true" v-if="!user">
					<v-list-item-title><v-icon>mdi-login</v-icon> Login</v-list-item-title>
				</v-list-item>

				<v-list-item v-if="user" to="/myorders">
					<v-list-item-title><v-icon>mdi-archive</v-icon> My Orders</v-list-item-title>
				</v-list-item>

				<v-list-item v-if="user" to="/myaccount">
					<v-list-item-title><v-icon>mdi-account</v-icon> My Account</v-list-item-title>
				</v-list-item>

				<v-list-item v-if="user && (user.isAdmin || user.isSuper)" to="/admin">
					<v-list-item-title><v-icon>mdi-settings-outline</v-icon> Admin Panel</v-list-item-title>
				</v-list-item>
				
				<v-list-item v-if="user && user.isOrderManager" to="/manageorders">
					<v-list-item-title><v-icon>mdi-clipboard-text</v-icon>Manage Orders</v-list-item-title>
				</v-list-item>


				<v-list-item v-if="user && user.isProductManager" to="/manageproducts">
					<v-list-item-title><v-icon>mdi-archive</v-icon> Manage Products</v-list-item-title>
				</v-list-item>

				<v-list-item v-if="user" @click="deauthenticateUser">
					<v-list-item-title><v-icon>mdi-logout</v-icon> Logout</v-list-item-title>
				</v-list-item>

			</v-list>
			</v-menu>

			<!-- <v-btn icon to="/wishlist">
				<v-icon>mdi-heart</v-icon>
			</v-btn> -->

			<v-divider class="mx-2" vertical></v-divider>

				
			<v-btn color="purple" to="/cart">				
				<v-icon>mdi-cart</v-icon> Cart			
			</v-btn>

			<v-divider vertical class="mx-1 green" ></v-divider>
			
		</v-app-bar>

		<v-dialog
			v-model="registerDialog"
			max-width="500px"
			transition="dialog-transition"
			
		>
			<register :done="doneRegistering" />
		</v-dialog>

		<v-dialog
			v-model="loginDialog"
			max-width="500px"
			transition="dialog-transition"
		>
			<login :done="doneLogin" />
		</v-dialog>
	</div>
</template>

<script>
import register from "./Auth/register"
import login from "./Auth/login"
import {mapGetters, mapActions} from "vuex"

export default {

	name: "navigation",
	
	components: {
		register,
		login
	},

	computed: mapGetters(["user", "cart"]),
    
    data: () => ({
		search: null,
		registerDialog: false,
		loginDialog: false
    }),

    methods: {

		...mapActions(["deauthenticate", "getCart"]),

		async deauthenticateUser() {
			await this.deauthenticate()
			this.$router.replace("/")
			this.getCart()
		},

        searchProducts(e) {
			
            
			e.preventDefault()
			
			let q = this.$route.query
			q.page = 1
            
            if(this.search != this.$route.query.s) 
                this.$router.push({
                    name: "Products", 
                    query: {...q, s: this.search}
                })

		},
		
		doneRegistering() {
			this.registerDialog = false
		},

		doneLogin() {
			this.loginDialog = false
			this.getCart()
		}
    },

    watch: {
        search() {

            
            if(!this.search && this.$route.name == "Products") {
                
                let query = {...this.$route.query}
                delete query.s
                
                this.$router.push({
                    name: "Products", 
                    query: {...query}
                })

            }
        }
    },

    created() {
        if(this.$route.query.s) this.search = this.$route.query.s
    }

}
</script>

<style>


</style>