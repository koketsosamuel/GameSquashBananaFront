<template>
    <div>
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Description</th>
                        <th class="text-left">No. Sub Categories</th> 
                        <th>Action</th>                       
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="c in categories" 
                        :key="c._id" 
                        @click="$router.push('/managesubcategories/'+c._id+'?categoryName='+c.name)"
                        class="cursor"
                    >
                        <td>{{ c.name }}</td>
                        <td>R {{ c.description }}</td>
                        <td>{{ c.subs.length }}</td>

                        <td>
                            <v-menu bottom left>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn fab icon v-bind="attrs" v-on="on" @click="cat = c">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                                </template>

                                <v-list>                               
                                    <v-list-item @click="removeDialog = true">
                                        <v-list-item-title>Remove</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="$router.push('/editcategory/'+c._id)">
                                        <v-list-item-title>Edit</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>	
                </tbody>
            </template>
        </v-simple-table>

        <v-dialog v-model="removeDialog" max-width="500px" transition="dialog-transition">
            <confirmAction :action="remove" nb="Sub categories will also be removed, and all products in this category will be without a category! Action is irreversible!" />
        </v-dialog>

    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"

export default {

    name: "categoriesList",

    data: () => ({
        removeDialog: false,
        cat: null
    }),

    methods: {

        ...mapActions(["getCategories"]),

        async remove() {
            this.removeDialog = false
            await this.$axios.delete("/categories/"+this.cat._id)
            this.getCategories()
        }
    },

    computed: mapGetters(["categories"]),

    created() {
        this.getCategories()
    }

}
</script>

<style>

</style>