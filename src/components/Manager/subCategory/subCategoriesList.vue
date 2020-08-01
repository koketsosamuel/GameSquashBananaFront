<template>
    <div>
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Description</th>
                        <th>Action</th>                       
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="c in subCategories" 
                        :key="c._id" 
                    >
                        <td>{{ c.name }}</td>
                        <td>R {{ c.description }}</td>

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
                                    <v-list-item @click="$router.push(
                                        '/editsubcategory/'+
                                        c._id+
                                        '?categoryId='+
                                        $route.params.categoryId+
                                        '&categoryName='+
                                        $route.query.categoryName
                                    )">
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
            <confirmAction :action="remove" nb="All products in this sub category will be without a sub category! Action is irreversible!" />
        </v-dialog>

    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"

export default {

    name: "subCategoriesList",

    data: () => ({
        removeDialog: false,
        cat: null
    }),

    methods: {

        ...mapActions(["getSubCategories"]),

        async remove() {
            this.removeDialog = false
            await this.$axios.delete("/subcategories/"+this.cat._id)
            this.getSubCategories(this.$route.params.categoryId)
        }
    },

    computed: mapGetters(["subCategories"]),

    created() {
        this.getSubCategories(this.$route.params.categoryId)
    }

}
</script>

<style>

</style>