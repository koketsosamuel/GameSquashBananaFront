<template>
    <div>
        
        <h3 class="purple--text">Write Review</h3>

        <v-rating
            color="amber "
            class="ml-0 my-4 pl-0"
            dense
            half-increments
            size="24"
            v-model="rating"
        ></v-rating>

        <v-textarea
            name="comment"
            label="Comment"
            v-model="comment"
            color="purple"
            rows="3"
            filled
            :hint="len + ' characters left'"
            :persistent-hint="true"
            @keyup="atInput"
        ></v-textarea>

        <v-btn color="success" @click="review">Review</v-btn>
        <v-divider vertical class="mx-2 white" ></v-divider>
        <v-btn color="pink" class="white--text" @click="done">Cancel</v-btn>

    </div>
</template>

<script>
export default {

    name: "reviewProduct",

    props: ["product", "done"],

    data: () => ({
        comment: "",
        rating: 0,
        len: 300
    }),

    methods: {
        async review() {
            
            if(!this.validate()) return false

            let res = await this.$axios.post("/productreviews", {
                product: this.product,
                rating: this.rating,
                comment: this.comment
            })

            if(!res.data.err) {
                if(this.done) this.done()
                this.comment = ""
                this.rating = 0
                this.len = 300
            }

        },

        validate() {
            if(this.rating == 0 || this.comment.trim() == "" || this.comment.length < 1) {
                this.$toast.error("Both comment and rating are required")
                return false
            }
            return true
        },

        atInput() {
            this.len = 300 - this.comment.length
            if(this.len < 0) this.comment = this.comment.substr(0, 300)
            this.len = 300 - this.comment.length
        }
    }
}
</script>

<style>

</style>