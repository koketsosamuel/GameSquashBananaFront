<template>
    
    <div>

        <div v-if="reviews.length > 0">
            <v-btn class="success" @click="approve">Approve</v-btn>
            <v-divider vertical class="mx-2 white"></v-divider>
            <v-btn class="pink white--text" @click="remove">Remove</v-btn>

            <v-simple-table dense class="mt-4">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-left" v-if="!productId">Product</th>
                            <th class="text-left">User's Name</th>
                            <th class="text-left">Rating</th>
                            <th class="text-left">Comment</th>
                            <th class="text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="r in reviews" 
                            :key="r._id" 
                        >
                            <td>
                                <v-checkbox v-model="selectedReviews" :value="r._id"></v-checkbox>
                            </td>
                            <td v-if="!productId">{{ r.productName }}</td>
                            <td>{{ r.nameOfUser }}</td>
                            <td>{{ r.rating }}</td>
                            <td>{{ r.comment}}</td>
                            <td>{{ $moment.fromNow(r.date) }}</td>
                            
                        </tr>	
                    </tbody>
                </template>
            </v-simple-table>

            <v-pagination 
                :length="nav.pages" 
                v-model="page" 
                :total-visible="6"
                right
                color="purple"
                class="d-inline py-4 mt-4"
            ></v-pagination>
        </div>
        <messageIcon message="No new reviews requiring approval" />

    </div>

</template>

<script>
export default {

    name: "reviewsList",

    props: ["productId"],

    data: () => ({
        reviews: [],
        page: 1,
        nav: {
            pages: 1
        },
        selectedReviews: []
    }),

    methods: {

        async getUnapprovedReviews() {
            
            let res = await this.$axios.get("/productreviews/unapproved?page="+this.page)
            if(res.data.err)  return false
            this.nav = res.data.nav
            this.reviews = res.data.results
            this.page = this.nav.page

        },

        async getReviews() {
            
            let res = await this.$axios.get("/productreviews/"+this.productId+"?page="+this.page)
            if(res.data.err)  return false
            this.nav = res.data.nav
            this.reviews = res.data.results
            this.page = this.nav.page

        },

        async approve() {

            if(this.selectedReviews.length < 1) return this.$toast("No item(s) selected")
            
            let res = await this.$axios.post("/productreviews/approve", {
                reviews: this.selectedReviews
            })

            this.selectedReviews = []
            if(this.productId) await this.getReviews()
            else this.getUnapprovedReviews()
            scroll(0,0)

        },

        async remove() {

            if(this.selectedReviews.length < 1) return this.$toast("No item(s) selected")

            let res = await this.$axios.post("/productreviews/remove", {
                reviews: this.selectedReviews
            })

            this.selectedReviews = []
            if(this.productId) await this.getReviews()
            else this.getUnapprovedReviews()
            scroll(0,0)

        }
    },

    created() {
        if(this.productId) this.getReviews()
        else this.getUnapprovedReviews()
    },

    watch: {

        async page() {
            if(this.productId) await this.getReviews()
            else await this.getUnapprovedReviews()
            this.$router.push({query: {page: this.page}})
            scroll(0,0)
        }

    }
}
</script>

<style>

</style>