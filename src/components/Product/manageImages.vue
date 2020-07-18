<template>
	<div>
		<v-btn
			@click="$refs.imageFile.click()"
			color="purple"
			class="white--text mb-3"
		>
			<v-icon color="white">mdi-upload</v-icon>
			Upload
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
				class="green"
			></v-img>
		</div>

		<v-slide-group multiple show-arrows class=" mt-3">
			<v-slide-item
				v-for="(image, i) in images"
				:key="image._id"
				v-slot:default="{ active, toggle }"
			>
				<v-img
					max-height="100"
					max-width="100"
					contain
					class=" my-2 purple cursor"
					:src="$baseURL + image.image"
					:input-value="active"
					@click="
						toggle = true
						index = i
					"
				></v-img>
			</v-slide-item>
		</v-slide-group>

		<v-dialog
			v-model="removeDialog"
			max-width="500px"
			transition="dialog-transition"
		>
			<confirmAction :action="removeImage" />
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
		}),

		methods: {
			...mapActions(["getProductImages"]),

			async addImage() {
				let fd = new FormData()
				let file = this.$refs.imageFile.files[0]
				fd.append("image", file, file.name)

				let res = await this.$axios.post(
					"/productimages/" + this.id,
					fd
				)
				if (res.data.err) return alert(res.data.err.msg)
				alert(res.data.msg)
				this.getProductImages(this.id)
			},

			async removeImage() {
				let res = await this.$axios.delete(
					"/productimages/" + this.images[this.index]._id
				)
				if (!res.data.err) {
					this.index = 0
					this.getProductImages(this.id)
				}
				this.removeDialog = false
			},
		},

		computed: mapGetters(["images"]),

		watch: {
			id() {
				if (this.id) this.getProductImages(this.id)
			},
		},

		created() {
			if (this.id) this.getProductImages(this.id)
		},
	}
</script>

<style>
	.upload {
		height: 150px;
		width: 150px;
		align-content: center;
		align-items: center;
		text-align: center;
		cursor: pointer;
	}

	.upload > div {
		widows: 150px;
		height: 150px;
	}
</style>
