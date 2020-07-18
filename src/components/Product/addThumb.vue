<template>
	<div class="row">
		<div class="col-md-5 mx-0 px-0" v-if="product.thumb">
			<v-img
				:src="$baseURL + product.thumb"
				contain
				max-height="200px"
				max-width="200px"
				class="mx-0 px-0"
			/>
		</div>
		<div class="col-md-4 mx-0">
			<div class="upload text-center purple white--text py-5 ">
				<div @click="$refs.thumbFile.click()">
					<v-icon color="white" size="69px">mdi-upload</v-icon>
					<p class="text-center">Upload</p>
					<input
						type="file"
						ref="thumbFile"
						v-show="false"
						@change="addThumb"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex"

	export default {
		name: "addThumb",

		props: ["id"],

		methods: {
			async addThumb() {
				let fd = new FormData()
				let file = this.$refs.thumbFile.files[0]
				fd.append("thumb", file, file.name)

				let res = await this.$axios.put(
					"/products/thumb/" + this.id,
					fd
				)
				if (res.data.err) return alert(res.data.err.msg)
				alert(res.data.msg)
				this.getProduct(this.id)
			},

			...mapActions(["getProduct"]),
		},

		computed: mapGetters(["product"]),

		watch: {
			id() {
				if (this.id) this.getProduct(this.id)
			},
		},

		created() {
			if (this.id) this.getProduct(this.id)
		},
	}
</script>

<style scoped>
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
