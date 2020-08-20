<template>
    
    <div>

        <v-img :src="imgPrev" v-if="$route.params.bannerId"></v-img>


        <v-form @submit="actionExecute" class="mt-4">
            
            <v-text-field
                name="BannerTitle"
                label="Title"
                color="purple"
                v-model="title"
                filled
                :error="titleErr? true : false"
                :error-messages="titleErr"
            ></v-text-field>

            <v-text-field
                name="name"
                label="Link"
                filled
                v-model="link"
                :error="linkErr ? true : false"
                :error-messages="linkErr"
                color="purple"
            ></v-text-field>


            <input
                label="Image"
                filled
                prepend-icon="mdi-camera"
                color="purple"
                ref="image"
                type="file"
                v-show="false"
                @change="setImage"
            />

            <v-btn class="purple white--text" @click="$refs.image.click()"><v-icon>mdi-upload</v-icon> Image</v-btn> <span>{{image.name}}</span>

            

            <p class="mt-4 mb-0">Show until</p>
            <v-date-picker v-model="removeAt" :landscape="true" color="purple" :show-current="false"></v-date-picker>
            <br>
            <v-btn color="success" class="my-4" type="submit">Submit</v-btn>

        </v-form>
    </div>

</template>

<script>
import validator from "validator"

export default {

    name: "bannerForm",

    data: () => ({
        
        image: {},
        imgPrev: "",
        title: null,
        removeAt: null,
        link: null,

        titleErr: null,
        removeAtErr: null,
        linkErr: null,
    }),

    methods: {

        async actionExecute(e) {

            e.preventDefault()
            if(!this.validate()) return false
            //this.image = this.$refs.image.files[0]

            let fd = new FormData()
            fd.append("title", this.title)
            fd.append("removeAt", this.removeAt)
            fd.append("link", this.link)
            if(this.image.name) fd.append("banner", this.image, this.image.name)

            if(this.$route.params.bannerId) {
                let res = await this.$axios.put("/banners/"+this.$route.params.bannerId, fd)
                if(!res.data.err) this.$router.push("/managebanners")
            } else {
                let res = await this.$axios.post("/banners", fd)
                if(!res.data.err) this.$router.push("/managebanners")
            }

        },

        setImage() {
            
            this.image = this.$refs.image.files[0]

        },

        validate() {

            let valid = true

            if(!this.title || this.title.length < 1) {
                valid = false
                this.titleErr = "Enter valid title"
            } else {
                this.titleErr = null
            }

            if(!this.link || !validator.isURL(this.link)) {
                valid = false
                this.linkErr = "Enter valid link"
            } else {
                this.linkErr = null
            }

            if(this.removeAt && validator.isBefore(this.removeAt)) {
                valid = false
                this.$toast("Select date after today")
            }

            return valid

        }

    },


    async created() {
        if(this.$route.params.bannerId) {

            let res = await this.$axios.get("/banners/"+this.$route.params.bannerId)
            let banner = res.data.results

            this.link = banner.link
            this.imgPrev = this.$baseURL + banner.image.replace("./", "")
            this.title = banner.title
            this.removeAt = banner.removeAt || null

        }
    }

}
</script>

<style>

</style>