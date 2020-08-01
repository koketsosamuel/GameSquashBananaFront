<template>
  
    <div>
		<h1 class="mt-3 green--text">Add Sub Category</h1>
		<h3 class="purple--text mb-3">{{$route.query.categoryName}}</h3>

		<v-form @submit="add">
			
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

	name: "addSubCategory",

	props: ["doneOrCancel"],

	data: () => ({
		name: "",
		desc: "",
		nameErr: null,
		descErr: null
	}),

	methods: {
		...mapActions(["getCategories"]),

		async add(e) {

			e.preventDefault()

			if(!this.validate()) return false

			let res = await this.$axios.post("/subcategories", {
				name: this.name,
				description: this.desc,
				category: this.$route.params.categoryId
			})

			if(!res.data.err) {
				this.getCategories()
				if(this.done) this.doneOrCancel()
				else this.$router.push(
					"/managesubcategories/"+
					this.$route.params.categoryId+
					"?categoryName="+
					this.$route.query.categoryName
				)
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
	}

}
</script>

<style>

</style>