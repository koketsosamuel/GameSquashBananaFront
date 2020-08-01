<template>
  
    <div>
		<h1 class="my-3 green--text">Edit Category</h1>

		<v-form @submit="edit">
			
			<v-text-field
				name="name"
				label="Name"
				filled
				v-model="name"
			></v-text-field>

			<v-textarea
				name="desc"
				label="Description"
				filled
				v-model="desc"
			></v-textarea>

			<v-btn class="green white--text" type="submit">Submit</v-btn>
			<v-divider class="mx-2 white" vertical></v-divider>
			<v-btn class="pink white--text" @click="doneOrCancel" v-if="doneOrCancel">Cancel</v-btn>

		</v-form>

    </div>

</template>

<script>
import {mapActions} from "vuex"

export default {

	name: "editCategory",

	props: ["doneOrCancel"],

	data: () => ({
		name: "",
		desc: "",
		nameErr: null,
		descErr: null
	}),

	methods: {
		...mapActions(["getCategories"]),

		async edit(e) {

			e.preventDefault()

			if(!this.validate()) return false

			let res = await this.$axios.put("/categories/"+this.$route.params.categoryId, {
				name: this.name,
				description: this.desc
			})

			if(!res.data.err) {
				this.getCategories()
				if(this.done) this.doneOrCancel()
				else this.$router.push("/managecategories")
			}

		},

		validate() {

			let valid  = true

			if(this.name.length < 1) {
				valid = false
				this.nameErr = "name is required!"
			} else {
				this.nameErr = null
			}

			if(this.desc.length < 1) {
				valid = false
				this.descErr = "description is required!"
			} else {
				this.descErr = null
			}

			return valid

		}
    },
    
    async created() {
        let res = await this.$axios.get("/categories/"+this.$route.params.categoryId)
        this.name = res.data.results.name
        this.desc = res.data.results.description
    }

}
</script>

<style>

</style>