<template>
	<div>
		<v-btn
			@click="$refs.imageFile.click()"
			class="white--text mb-3 purple"
		>
			<v-icon color="white">mdi-upload</v-icon>
			Upload
		</v-btn>

		<v-divider vertical class="mx-2"></v-divider>

		<v-btn
			@click="thumbDialog = true"
			color="green"
			class="white--text mb-3"
			v-if="images.length >= 1"
		>
			<v-icon color="white">mdi-image</v-icon>
			Make Thumb
		</v-btn>

		<v-divider vertical class="mx-2"></v-divider>

		<v-btn
			@click="removeDialog = true"
			color="pink"
			class="white--text mb-3"
			v-if="images.length >= 1"
		>
			<v-icon color="white">mdi-delete</v-icon>
			Remove
		</v-btn>

		<input type="file" ref="imageFile" v-show="false" @change="addImage" />

		<div v-if="images.length > 0">
			<v-img
				max-height="300"
				max-width="300"
				contain
				:src="$baseURL + images[index].image"
			></v-img>
		</div>

		<div class="d-flex mt-3">
			
				<v-img
					v-for="(image, i) in images"
					:key="image._id"
					max-height="400"
					max-width="100"
					contain
					class=" my-2 cursor"
					:src="$baseURL + (image.image || null)"
					@click="index = i"
					lazy-src="../../assets/lazy.jpeg" 
				></v-img>
	
		</div>

		<v-dialog
			v-model="removeDialog"
			max-width="500px"
			transition="dialog-transition"
		>
			<confirmAction :action="removeImage" />
		</v-dialog>

		<v-dialog
			v-model="thumbDialog"
			max-width="500px"
			transition="dialog-transition"
		>
			<confirmAction :action="makeThumb" />
		</v-dialog>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex"
	export default {
		name: "manageImagesForProduct",

		props: ["id"],

		data: () => ({
			index: 0,
			removeDialog: false,
			thumbDialog: false
		}),

		methods: {
			...mapActions(["getProductImages"]),

			async addImage() {
				let fd = new FormData()
				let file = this.$refs.imageFile.files[0]
				fd.append("image", file, file.name)

				let id = this.id || this.$route.params.productId

				let res = await this.$axios.post(
					"/productimages/" + id,
					fd
				)

				await this.getProductImages(id)

				if(this.images.length == 1) this.makeThumb()

			},

			async removeImage() {

				let id = this.id || this.$route.params.productId

				let res = await this.$axios.delete(
					"/productimages/" + this.images[this.index]._id
				)
				if (!res.data.err) {
					this.index = 0
					this.getProductImages(id)
				}
				this.removeDialog = false
			},

			makeThumb() {

				let id = this.id || this.$route.params.productId

				this.$axios.put("/products/thumb/"+id, {
					image: this.images[this.index]
				})
				this.thumbDialog = false
				this.getProductImages(id)
			}
		},

		computed: mapGetters(["images"]),

		watch: {
			id() {
				if (this.id) this.getProductImages(this.id)
			},
		},

		created() {
			if (this.id) this.getProductImages(this.id)
			
			else if(this.$route.params.productId) 
				this.getProductImages(this.$route.params.productId)
		},
	}
</script>

<style>

</style>
