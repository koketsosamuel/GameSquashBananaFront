<template>
  
    <div>

        <div class="pink pa-4 lighten-3" v-if="banners.length > 8">
            <p>You have more than 8 banners! Remove some to improve user experience!</p>
        </div>
        <div v-if="banners.length > 0">

            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Image</th>
                            <th class="text-left">Title</th>
                            <th class="text-left">Link</th>
                            <th class="text-left">Delete On</th>
                            <th class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="b in banners" 
                            :key="b._id"                         
                        >
                            <td>
                                <v-img :src="$baseURL + b.image" contain height="60" width="160px"></v-img>
                            </td>
                            <td>{{ b.title }}</td>
                            <td>{{ b.link }}</td>
                            <td>{{ b.removeAt != "null" && b.removeAt != "undefined" ? b.removeAt : "None" }}</td>
                            
                            <td>
                                <v-menu bottom left>
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab icon v-bind="attrs" v-on="on" @click="banner = b">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item :to="'/editbanner/'+b._id">
                                            <v-list-item-title>Edit</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="remDialog = true">
                                            <v-list-item-title>Remove</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </td>
                            
                        </tr>	
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        <messageIcon message="No Banners" v-else/>

        <v-dialog
            v-model="remDialog"
            max-width="500px"
            transition="dialog-transition"
        >
            <confirmAction :action="remove" />
        </v-dialog>

    </div>

</template>

<script>
export default {

    name: "bannerList",

    data: () => ({
        banners: [],
        banner: {},
        remDialog: false
    }),

    methods: {
        async getBanners() {
            let res = await this.$axios.get("/banners/")
            this.banners = res.data.results || []
        },

        async remove() {
            let res = await this.$axios.delete("/banners/"+this.banner._id)
            if(!res.data.err) {
                this.remDialog = false
                await this.getBanners()
                scroll(0,0)
            }
        }
    },

    async created() {
        await this.getBanners()
    }

}
</script>

<style>

</style>