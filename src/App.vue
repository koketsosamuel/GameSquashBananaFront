<template>
	<v-app id="app">
		<v-container>
			<router-view />
		</v-container>

		<vue-progress-bar></vue-progress-bar>
	</v-app>
</template>

<script>
	export default {
		// watch: {
		// 	$loadi
		// }

		watch: {
			$loading: {
				handler: function(search) {
					if (this.$loading == true) {
						this.$Progress.start()
					} else {
						this.$Progress.finish()
					}

					console.log(this.$loading)
				},
				deep: true,
				immediate: true,
			},
		},
	}
</script>

<style>
	.cursor {
		cursor: pointer;
	}

	.d-inline {
		display: inline !important;
	}
</style>
