<template>
    <div>

        <v-form @submit="search">
            <v-text-field
                name="name"
                label="Search User"
                id="id"
                solo
                class="mt-4"         
                v-model="s"
                color="purple"
                
            ></v-text-field>
        </v-form>

        <v-btn class="purple white--text mb-4" @click="filterDialog = true"><v-icon>mdi-tune</v-icon> Filter</v-btn>

        <div v-if="users.length > 0">

            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Email</th>
                            <th class="text-left">Phone</th>
                            <th class="text-left">Roles</th>
                            <th class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="u in users" 
                            :key="u._id" 
                            :class="u.banned ? 'pink lighten-4' : ''"
                        >
                            <td>{{ u.name }}</td>
                            <td>{{ u.email }}</td>
                            <td>{{ u.phone }}</td>
                            
                            <td>
                                {{ u.isSuper ? "Super" : ""}}
                                <br v-if="u.isSuper" />
    
                                {{ u.isAdmin ? " Admin " : ""}}
                                <br v-if="u.isAdmin" />

                                {{ u.isProductManager ? " Product-Manager" : ""}}
                                <br v-if="u.isProductManager" />

                                {{ u.isOrderManager ? " Order-Manager " : ""}}
                                <br v-if="u.isOrderManager" />

                                {{ u.isDeliveryManager ? " Delivery-Manager " : ""}}
                                <br v-if="u.isDeliveryManager" />

                                Customer

                            </td>

                            <td>
                                <v-menu bottom left>
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab icon v-bind="attrs" v-on="on" @click="user = {...u}">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item @click="rolesDialog = true">
                                            <v-list-item-title>Modify Roles</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="banDialog = true">
                                            <v-list-item-title>{{u.banned ? "Unban" : "Ban"}}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </td>
                            
                        </tr>	
                    </tbody>
                </template>
            </v-simple-table>

            <v-pagination 
                :length="nav.pages" 
                v-model="page" 
                :total-visible="4"
                right
                color="purple"
                class="d-inline py-4 mt-4"
            ></v-pagination>

        </div>
        <messageIcon message="No users" v-else />

        <v-dialog
            v-model="banDialog"           
            max-width="500px"
            transition="dialog-transition"
        >
            <confirmAction :action="banUser" />
        </v-dialog>

        <v-dialog
            v-model="rolesDialog"           
            max-width="500px"
            transition="dialog-transition"
        >
            
            <div class="pa-4 white">

                <h2 class="green--text">User roles</h2>
                <p>Check the boxes to grant role, or uncheck to withdraw role</p>

                <v-checkbox label="Admin" v-model="user.isAdmin" color="purple" :value="true"></v-checkbox>
                <v-checkbox label="Product Manager" v-model="user.isProductManager" color="purple" :value="true"></v-checkbox>
                <v-checkbox label="Order Manager" v-model="user.isOrderManager" color="purple" :value="true"></v-checkbox>
                <v-checkbox label="Delivery Manager" v-model="user.isDeliveryManager" color="purple" :value="true"></v-checkbox>

                <p>Enter email of user to confirm. Email <b class="green--text">{{user.email}}</b></p>

                <v-text-field
                    label="Email"
                    v-model="emailConfirm"
                    filled
                    color="purple"
                ></v-text-field>

                <v-btn color="success" :disabled="emailConfirm != user.email" @click="roleUpdate">Update</v-btn>

            </div>

        </v-dialog>

        <v-dialog
            v-model="filterDialog"           
            max-width="500px"
            transition="dialog-transition"
        >
            
            <div class="pa-4 white">

                <h2 class="green--text">Filter</h2>

                <v-checkbox 
                    label="Admin" 
                    v-model="filterArr" 
                    color="purple" 
                    value="isAdmin"
                ></v-checkbox>

                <v-checkbox 
                    label="Product Manager" 
                    v-model="filterArr" 
                    color="purple" 
                    value="isProductManager"
                ></v-checkbox>

                <v-checkbox 
                    label="Order Manager" 
                    v-model="filterArr" 
                    color="purple" 
                    value="isOrderManager"
                ></v-checkbox>

                <v-checkbox 
                    label="Delivery Manager" 
                    v-model="filterArr" 
                    color="purple" 
                    value="isDeliveryManager"
                ></v-checkbox>

                <v-checkbox 
                    label="Banned" 
                    v-model="filterArr" 
                    color="purple" 
                    value="banned"
                ></v-checkbox>


                <v-btn color="success" @click="filter">Filter</v-btn>
                <v-divider class="mx-2 white" vertical></v-divider>
                <v-btn class="pink white--text" @click="filterArr = []; filter()">Clear Filter</v-btn>

            </div>

        </v-dialog>

    </div>
</template>

<script>
import qs from "querystringify"

export default {

    name: "userManage",

    data: () => ({
        banDialog: false,
        rolesDialog: false,
        filterDialog: false,
        user: {},
        nav: {},
        users: [],
        emailConfirm: "",
        s: "",
        page: 1,
        filterArr: []
    }),

    methods: {

        async getAll() {

            let res = await this.$axios.get("/users"+qs.stringify(this.$route.query,true))
            this.nav.page = Number(res.data.nav.page)
            this.nav.pages = Number(res.data.nav.pages)
            this.nav.perpage = Number(res.data.nav.perpage)
            this.users = res.data.results
            scroll(0,0)

        },

        async banUser() {
            let res = await this.$axios.put("/users/ban/"+this.user._id, {banned: !this.user.banned})
            if(!res.data.err) this.getAll()
            this.banDialog = false
        },


        async roleUpdate() {
            let res = await this.$axios.put("/users/roles/"+this.user._id, this.user)
            if(!res.data.err) this.getAll()
            this.rolesDialog = false
        },

        search(e) {

            e.preventDefault()

            let q = {...this.$route.query}

            if(this.s != "" && this.s != this.$route.query.s) {
                q.s = this.s
                this.$router.push({query: q})
            } else if(this.s == "" &&  this.$route.query.s) {
                delete q.s
                this.$router.push({query: q})
            }
        },

        filter() {

            let query = "?page=1"
            let counter = 0

            for(let i = 0; i < this.filterArr.length; i++) {
                query += "&" + this.filterArr[i] + "=true"
            }

            if(this.filterArr != Object.keys(this.$route.query)) {
                this.$router.push(this.$route.path+query)
            }
            this.filterDialog = false

        }


    },

    async created() {
        await this.getAll()
        let obj = {...this.$route.query}
        delete obj.page
        this.filterArr = Object.keys(obj)
    },

    watch: {
        $route() {
            this.getAll()
        },

        page() {
            
            if(this.page == this.$route.query.page) return false
            let query = {...this.$route.query}
            query.page = this.page
            this.$router.push({query})

        }
    }

}
</script>

<style>

</style>